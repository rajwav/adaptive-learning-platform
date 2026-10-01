import { create } from 'zustand';
import { 
  Topic, Module, TopicProgress, Target, ErrorRecord, 
  PracticeAttempt, UserSettings, Subject, Question, ErrorType
} from '@/types';
import { 
  subjectsRepo, modulesRepo, topicsRepo, progressRepo, 
  targetsRepo, errorsRepo, attemptsRepo, settingsRepo, questionsRepo
} from '@/lib/repositories';
import { initializeSeedData } from '@/lib/seed-toc';
import { calculateNextAction, NextActionRecommendation } from '@/lib/engine';

interface LearningState {
  isInitialized: boolean;
  subjects: Subject[];
  modules: Module[];
  topics: Topic[];
  questions: Question[];
  progress: TopicProgress[];
  targets: Target[];
  errors: ErrorRecord[];
  attempts: PracticeAttempt[];
  settings: UserSettings | null;
  nextAction: NextActionRecommendation | null;
  
  init: () => Promise<void>;
  updateTopicStatus: (topicId: string, status: TopicProgress['status']) => Promise<void>;
  recordPractice: (attempt: PracticeAttempt) => Promise<void>;
  updateTarget: (target: Target) => Promise<void>;
  deleteTarget: (targetId: string) => Promise<void>;
  updateErrorType: (errorId: string, errorType: ErrorType) => Promise<void>;
  updateTopicNotes: (topicId: string, notes: string) => Promise<void>;
  updateTopicChecklist: (topicId: string, checklist: Record<string, boolean>) => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  syncFromStorage: () => Promise<void>;
  exportData: () => Promise<string>;
  importData: (data: string, mode: 'MERGE' | 'REPLACE') => Promise<void>;
  resetLearningData: () => Promise<void>;
}


const broadcastSync = () => {
  if (typeof window !== 'undefined') {
    const ch = new BroadcastChannel('lms_sync');
    ch.postMessage('SYNC');
    ch.close();
  }
};

export const useLearningStore = create<LearningState>((set, get) => ({
  isInitialized: false,
  subjects: [],
  modules: [],
  topics: [],
  questions: [],
  progress: [],
  targets: [],
  errors: [],
  attempts: [],
  settings: null,
  nextAction: null,

  
  syncFromStorage: async () => {
    const progress = await progressRepo.getAll();
    const targets = await targetsRepo.getAll();
    const errors = await errorsRepo.getAll();
    const attempts = await attemptsRepo.getAll();
    const settings = await settingsRepo.get();
    const nextAction = calculateNextAction(progress, errors, targets);

    set({ progress, targets, errors, attempts, settings, nextAction });
  },

  init: async () => {
    await initializeSeedData();
    
    const subjects = await subjectsRepo.getAll();
    const modules = await modulesRepo.getAll();
    const topics = await topicsRepo.getAll();
    const questions = await questionsRepo.getAll();
    const progress = await progressRepo.getAll();
    const targets = await targetsRepo.getAll();
    const errors = await errorsRepo.getAll();
    const attempts = await attemptsRepo.getAll();
    const settings = await settingsRepo.get();

    const nextAction = calculateNextAction(progress, errors, targets);

    set({
      isInitialized: true,
      subjects, modules, topics, questions, progress, targets, errors, attempts, settings, nextAction
    });
  },

  updateTopicStatus: async (topicId, status) => {
    const progressList = await progressRepo.getAll();
    const item = progressList.find(p => p.topicId === topicId);
    if (!item) return;
    
    const updated = { 
      ...item, 
      status,
      lastStudied: Date.now()
    };
    await progressRepo.save(updated);
    
    await get().syncFromStorage();
    broadcastSync();
  },

  recordPractice: async (attempt) => {
    await attemptsRepo.save(attempt);
    
    const progressList = await progressRepo.getAll();
    const p = progressList.find(x => x.topicId === attempt.topicId);
    
    if (!attempt.isCorrect && attempt.errorType) {
      const err: ErrorRecord = {
        id: `err_${Date.now()}`,
        questionId: attempt.questionId,
        topicId: attempt.topicId,
        userAnswer: attempt.userAnswer,
        correctAnswer: '...', // Should come from question
        predictedConfidence: attempt.predictedConfidence,
        difficulty: 1,
        errorType: attempt.errorType,
        timestamp: attempt.timestamp
      };
      await errorsRepo.save(err);
    }

    if (p) {
      const updated = { ...p };
      updated.questionsAttempted += 1;
      if (attempt.isCorrect) {
        updated.questionsCorrect += 1;
        updated.successCount += 1;
      } else {
        updated.failureCount += 1;
      }
      updated.practiceAccuracy = (updated.questionsCorrect / updated.questionsAttempted) * 100;
      
      if (updated.status === 'PRACTICING' && updated.practiceAccuracy > 85 && updated.questionsAttempted > 5) {
        updated.status = 'REVIEWING';
        updated.mastery = 50; 
      }
      
      await progressRepo.save(updated);
    }

    await get().syncFromStorage();
    broadcastSync();
  },

  updateTarget: async (target) => {
    await targetsRepo.save(target);
    await get().syncFromStorage();
    broadcastSync();
  },

  deleteTarget: async (targetId) => {
    await targetsRepo.remove(targetId);
    await get().syncFromStorage();
    broadcastSync();
  },

  updateErrorType: async (errorId, errorType) => {
    const errorsList = await errorsRepo.getAll();
    const error = errorsList.find(e => e.id === errorId);
    if (!error) return;
    
    const updated = { ...error, errorType };
    await errorsRepo.save(updated);
    
    await get().syncFromStorage();
    broadcastSync();
  },

  updateTopicNotes: async (topicId, notes) => {
    const progressList = await progressRepo.getAll();
    const p = progressList.find(x => x.topicId === topicId);
    if (!p) return;
    const updated = { ...p, notes };
    await progressRepo.save(updated);
    await get().syncFromStorage();
    broadcastSync();
  },

  updateTopicChecklist: async (topicId, checklist) => {
    const progressList = await progressRepo.getAll();
    const p = progressList.find(x => x.topicId === topicId);
    if (!p) return;
    const updated = { ...p, checklist };
    await progressRepo.save(updated);
    await get().syncFromStorage();
    broadcastSync();
  },

  updateSettings: async (newSettings) => {
    const currentSettings = await settingsRepo.get();
    const updated = { ...currentSettings, ...newSettings } as UserSettings;
    await settingsRepo.set(updated);
    await get().syncFromStorage();
    broadcastSync();
  },

  exportData: async () => {
    const state = get();
    const exportObj = {
      progress: state.progress,
      targets: state.targets,
      errors: state.errors,
      attempts: state.attempts,
      settings: state.settings,
      version: 1
    };
    return JSON.stringify(exportObj, null, 2);
  },

  importData: async (data, mode) => {
    try {
      const parsed = JSON.parse(data);
      if (!parsed.progress || !parsed.settings) throw new Error('Invalid schema');
      
      if (mode === 'REPLACE') {
        await progressRepo.setAll(parsed.progress || []);
        await targetsRepo.setAll(parsed.targets || []);
        await errorsRepo.setAll(parsed.errors || []);
        await attemptsRepo.setAll(parsed.attempts || []);
        if (parsed.settings) await settingsRepo.set(parsed.settings);
      } else {
        // Simple merge: for demo, just loop save
        const savePromises = [
          ...(parsed.progress || []).map((p: any) => progressRepo.save(p)),
          ...(parsed.targets || []).map((t: any) => targetsRepo.save(t)),
          ...(parsed.errors || []).map((e: any) => errorsRepo.save(e)),
          ...(parsed.attempts || []).map((a: any) => attemptsRepo.save(a))
        ];
        await Promise.all(savePromises);
        if (parsed.settings) await settingsRepo.set({ ...get().settings, ...parsed.settings });
      }
      await get().init();
    } catch (e) {
      console.error('Import failed', e);
      throw e;
    }
  },

  resetLearningData: async () => {
    await progressRepo.clear();
    await targetsRepo.clear();
    await errorsRepo.clear();
    await attemptsRepo.clear();
    // Keep settings, subjects, modules, topics, questions
    // Re-seed empty progress
    await initializeSeedData();
    await get().init();
  }
}));

if (typeof window !== 'undefined') {
  const syncChannel = new BroadcastChannel('lms_sync');
  syncChannel.onmessage = (event) => {
    if (event.data === 'SYNC') {
      useLearningStore.getState().syncFromStorage();
    }
  };
}
