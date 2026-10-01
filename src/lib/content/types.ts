
export interface AlgorithmVariant {
  variantName: string;
  selectionRule?: string;
  preemptionBehavior?: 'Non-Preemptive' | 'Preemptive' | 'N/A';
  ganttChartProcedure?: string[];
  workedExamples?: {
    problem: string;
    solution: string;
    explanation?: string;
  }[];
}

export interface TopicContent {
  hasContent: boolean;
  overview: string; // Used as CONCEPT
  formal: string;
  intuition: string;
  detailedExplanation?: string;
  notation?: string;
  coreProperties?: string[];
  keyPoints?: string[];
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
  revisionSummary?: string; // Used as QUICK REVISION
  examNotes?: string;
  sourceIndicator?: string;

  // Batch 2 Deep Algorithm Extensions
  textbookReference?: string;
  learningObjectives?: string[];
  prerequisites?: string[];
  whenItIsUsed?: string;
  selectionRule?: string;
  preemptionBehavior?: 'Non-Preemptive' | 'Preemptive' | 'N/A';
  metricsFormulas?: Record<string, string>;
  ganttChartProcedure?: string[];
  labIntegrationPrompt?: string;
  variants?: AlgorithmVariant[];
}
