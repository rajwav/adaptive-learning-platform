import { get, set, update } from 'idb-keyval';
import { 
  Subject, Module, Topic, TopicProgress, Target, 
  PracticeAttempt, ErrorRecord, LearningSession, UserSettings, Question 
} from '@/types';

// Generic repository factory
function createRepository<T>(storeKey: string) {
  return {
    getAll: async (): Promise<T[]> => {
      const data = await get<T[]>(storeKey);
      return data || [];
    },
    setAll: async (data: T[]): Promise<void> => {
      await set(storeKey, data);
    },
    save: async (item: T & { id?: string | number }): Promise<T[]> => {
      let finalData: T[] = [];
      await update(storeKey, (val: any) => {
        const data = val || [];
        const index = data.findIndex((d: any) => (d.id === (item as any).id) || (d.topicId === (item as any).topicId && !(item as any).id));
        if (index >= 0) {
          data[index] = item;
        } else {
          data.push(item);
        }
        finalData = data;
        return data;
      });
      return finalData;
    },
    remove: async (id: string | number): Promise<void> => {
      const data = await get<T[]>(storeKey) || [];
      const filtered = data.filter((d: any) => d.id !== id);
      await set(storeKey, filtered);
    },
    clear: async (): Promise<void> => {
      await set(storeKey, []);
    }
  };
}

export const subjectsRepo = createRepository<Subject>('lms_subjects');
export const modulesRepo = createRepository<Module>('lms_modules');
export const topicsRepo = createRepository<Topic>('lms_topics');
export const questionsRepo = createRepository<Question>('lms_questions');
export const progressRepo = {
  ...createRepository<TopicProgress>('lms_progress'),
  getByTopicId: async (topicId: string): Promise<TopicProgress | null> => {
    const data = await get<TopicProgress[]>('lms_progress') || [];
    return data.find(p => p.topicId === topicId) || null;
  }
};
export const targetsRepo = createRepository<Target>('lms_targets');
export const attemptsRepo = createRepository<PracticeAttempt>('lms_attempts');
export const errorsRepo = createRepository<ErrorRecord>('lms_errors');
export const sessionsRepo = createRepository<LearningSession>('lms_sessions');

export const settingsRepo = {
  get: async (): Promise<UserSettings> => {
    const defaultSettings: UserSettings = {
      dailyStudyMinutes: 60,
      weeklyStudyMinutes: 300,
      defaultSessionDuration: 50,
      masteryThreshold: 90,
      practiceThreshold: 80,
      reviewFrequencyMultiplier: 1.0,
      theme: 'dark',
      reducedMotion: false
    };
    const data = await get<UserSettings>('lms_settings');
    return data || defaultSettings;
  },
  set: async (settings: UserSettings): Promise<void> => {
    await set('lms_settings', settings);
  }
};
