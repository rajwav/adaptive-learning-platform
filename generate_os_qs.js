const fs = require('fs');

const qs = [
  {
    id: 'os_q1',
    topicId: 'os_m1_29',
    moduleId: 'os-mod-1',
    text: "Given 3 processes arriving at t=0 with burst times P1=5, P2=3, P3=8. Under FCFS, what is the completion time of P2?",
    type: 'MULTIPLE_CHOICE',
    difficulty: 1,
    options: ["3", "5", "8", "11"],
    correctAnswer: "8",
    explanation: "Under FCFS, P1 executes first (0 to 5). Then P2 executes (5 to 8). So CT of P2 is 8."
  },
  {
    id: 'os_q2',
    topicId: 'os_m1_30',
    moduleId: 'os-mod-1',
    text: "Given 3 processes arriving at t=0 with burst times P1=5, P2=3, P3=8. Under non-preemptive SJF, what is the completion time of P1?",
    type: 'MULTIPLE_CHOICE',
    difficulty: 2,
    options: ["3", "5", "8", "16"],
    correctAnswer: "8",
    explanation: "At t=0, SJF selects P2 (burst=3). P2 runs 0 to 3. Then P1 (burst=5) runs 3 to 8. So CT of P1 is 8."
  },
  {
    id: 'os_q3',
    topicId: 'os_m2_29',
    moduleId: 'os-mod-2',
    text: "In Banker's Algorithm, if Max is [5, 4, 3] and Allocation is [2, 1, 1], what is the Need matrix for this process?",
    type: 'MULTIPLE_CHOICE',
    difficulty: 1,
    options: ["[2, 1, 1]", "[3, 3, 2]", "[5, 4, 3]", "[7, 5, 4]"],
    correctAnswer: "[3, 3, 2]",
    explanation: "Need = Max - Allocation. [5-2, 4-1, 3-1] = [3, 3, 2]."
  }
];

const code = `import { Question } from '@/types';

export const osQuestions: Question[] = ${JSON.stringify(qs, null, 2)};
`;

fs.writeFileSync('src/lib/content/os/osQuestions.ts', code);
