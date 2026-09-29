export interface TopicContent {
  hasContent: boolean;
  overview: string;
  formal: string;
  intuition: string;
  notation?: string;
  coreProperties?: string[];
  workedExamples?: {
    problem: string;
    solution: string;
    explanation?: string;
  }[];
  commonMistakes?: {
    mistake: string;
    fix: string;
  }[];
  recognitionClues?: string[];
  revisionSummary?: string;
}
