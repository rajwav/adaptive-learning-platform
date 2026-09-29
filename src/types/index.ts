export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;
export type TopicStatus = 'NOT_STARTED' | 'LEARNING' | 'PRACTICING' | 'REVIEWING' | 'COMPLETED' | 'MASTERED';
export type ErrorType = 'CONCEPTUAL' | 'PROCEDURAL' | 'CALCULATION' | 'MISREADING' | 'MEMORY' | 'CARELESS' | 'UNKNOWN';
export type ActionType = 'LEARN' | 'PRACTICE' | 'RECALL' | 'REVISE' | 'REVIEW ERRORS' | 'TAKE TEST';

export interface Subject {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface Module {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  order: number;
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  prerequisites: string[]; // array of topic IDs
}

export interface TopicProgress {
  topicId: string;
  status: TopicStatus;
  confidence: number; 
  mastery: number; // 0-100
  practiceAccuracy: number; // 0-100
  questionsAttempted: number;
  questionsCorrect: number;
  lastStudied?: number; // timestamp
  lastReviewed?: number; // timestamp
  nextReview?: number; // timestamp
  reviewCount: number;
  successCount: number;
  failureCount: number;
  notes?: string;
  checklist?: Record<string, boolean>;
}

export interface Target {
  id: string;
  title: string;
  description: string;
  type: 'SUBJECT' | 'MODULE' | 'TOPIC' | 'QUESTION_COUNT' | 'PRACTICE_ACCURACY' | 'MASTERY' | 'TIME';
  subjectId?: string;
  moduleId?: string;
  topicIds?: string[];
  deadline?: number; // timestamp
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  targetValue: number;
  currentValue: number;
  unit: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  createdAt: number;
  updatedAt: number;
}

export interface Question {
  id: string;
  topicId: string;
  text: string;
  correctAnswer: string;
  options?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  answerMode?: 'SELF_EVALUATION' | 'MULTIPLE_CHOICE' | 'NUMERIC';
  type?: 'Recall' | 'Understanding' | 'Application' | 'Problem Solving' | 'Exam';
  explanation?: string;
  keyConcept?: string;
  commonMistake?: string;
}

export interface PracticeAttempt {
  id: string;
  questionId: string;
  topicId: string;
  userAnswer: string;
  isCorrect: boolean;
  predictedConfidence: ConfidenceLevel;
  errorType?: ErrorType;
  timestamp: number;
}

export interface ErrorRecord {
  id: string;
  questionId: string;
  topicId: string;
  userAnswer: string;
  correctAnswer: string;
  predictedConfidence: ConfidenceLevel;
  difficulty: number;
  errorType: ErrorType;
  timestamp: number;
}

export interface LearningSession {
  id: string;
  type: 'QUICK' | 'STANDARD' | 'DEEP' | 'CUSTOM';
  durationMinutes: number;
  startedAt: number;
  endedAt?: number;
  topicsCovered: string[];
  performance: {
    accuracy: number;
    confidenceAverage: number;
  };
}

export interface UserSettings {
  dailyStudyMinutes: number;
  weeklyStudyMinutes: number;
  defaultSessionDuration: number;
  masteryThreshold: number;
  practiceThreshold: number;
  reviewFrequencyMultiplier: number;
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
}
