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
  exportData: () => Promise<string>;
  importData: (data: string, mode: 'MERGE' | 'REPLACE') => Promise<void>;
  resetLearningData: () => Promise<void>;
}

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
    const { progress } = get();
    const item = progress.find(p => p.topicId === topicId);
    if (!item) return;
    
    // Only update if it's moving forward, or manually set
    // E.g. we don't want to downgrade MASTERED to PRACTICING unless forced
    const updated = { 
      ...item, 
      status,
      lastStudied: Date.now()
    };
    await progressRepo.save(updated);
    
    const newProgress = progress.map(p => p.topicId === topicId ? updated : p);
    set({ progress: newProgress, nextAction: calculateNextAction(newProgress, get().errors, get().targets) });
  },

  recordPractice: async (attempt) => {
    await attemptsRepo.save(attempt);
    
    // Auto-update progress based on attempt
    const { progress, errors } = get();
    const p = progress.find(x => x.topicId === attempt.topicId);
    let newErrors = errors;
    
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
      newErrors = [...errors, err];
    }

    let newProgress = progress;
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
      
      // Auto transition to reviewing if mastered criteria met
      if (updated.status === 'PRACTICING' && updated.practiceAccuracy > 85 && updated.questionsAttempted > 5) {
        updated.status = 'REVIEWING';
        updated.mastery = 50; // Arbitrary jump to indicate moving from practice to review
      }
      
      await progressRepo.save(updated);
      newProgress = progress.map(x => x.topicId === attempt.topicId ? updated : x);
    }

    const newAttempts = [...get().attempts, attempt];
    set({ 
      attempts: newAttempts, 
      errors: newErrors, 
      progress: newProgress,
      nextAction: calculateNextAction(newProgress, newErrors, get().targets)
    });
  },

  updateTarget: async (target) => {
    await targetsRepo.save(target);
    const { targets } = get();
    const newTargets = targets.find(t => t.id === target.id) 
      ? targets.map(t => t.id === target.id ? target : t)
      : [...targets, target];
    
    set({ targets: newTargets, nextAction: calculateNextAction(get().progress, get().errors, newTargets) });
  },

  deleteTarget: async (targetId) => {
    await targetsRepo.remove(targetId);
    const newTargets = get().targets.filter(t => t.id !== targetId);
    set({ targets: newTargets, nextAction: calculateNextAction(get().progress, get().errors, newTargets) });
  },

  updateErrorType: async (errorId, errorType) => {
    const { errors } = get();
    const error = errors.find(e => e.id === errorId);
    if (!error) return;
    
    const updated = { ...error, errorType };
    await errorsRepo.save(updated);
    
    const newErrors = errors.map(e => e.id === errorId ? updated : e);
    set({ errors: newErrors });
  },

  updateTopicNotes: async (topicId, notes) => {
    const { progress } = get();
    const p = progress.find(x => x.topicId === topicId);
    if (!p) return;
    const updated = { ...p, notes };
    await progressRepo.save(updated);
    set({ progress: progress.map(x => x.topicId === topicId ? updated : x) });
  },

  updateTopicChecklist: async (topicId, checklist) => {
    const { progress } = get();
    const p = progress.find(x => x.topicId === topicId);
    if (!p) return;
    const updated = { ...p, checklist };
    await progressRepo.save(updated);
    set({ progress: progress.map(x => x.topicId === topicId ? updated : x) });
  },

  updateSettings: async (newSettings) => {
    const { settings } = get();
    const updated = { ...settings, ...newSettings } as UserSettings;
    await settingsRepo.set(updated);
    set({ settings: updated });
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
