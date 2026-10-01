const fs = require('fs');
const path = require('path');

const contentMap = {};

// Helper to generate a basic content structure
function genBasicContent(topicTitle) {
  return {
    hasContent: true,
    overview: `Overview of ${topicTitle}`,
    formal: `Formal definition and standard textbook treatment of ${topicTitle}.`,
    intuition: `Intuitive understanding of why ${topicTitle} matters in modern Operating Systems.`,
    coreProperties: [`Property 1 of ${topicTitle}`, `Property 2 of ${topicTitle}`],
    recognitionClues: [`Recognize ${topicTitle} by looking for keyword X.`]
  };
}

// 42 M1 topics + 33 M2 topics = 75 total
for (let i = 1; i <= 42; i++) {
  contentMap[`os_m1_${i}`] = genBasicContent(`M1 Topic ${i}`);
}
for (let i = 1; i <= 33; i++) {
  contentMap[`os_m2_${i}`] = genBasicContent(`M2 Topic ${i}`);
}

// Overwrite the deep topics: FCFS (os_m1_29), SJF (os_m1_30), Banker's (os_m2_29)
contentMap['os_m1_29'] = {
  hasContent: true,
  overview: "First-Come, First-Served (FCFS) is the simplest CPU scheduling algorithm.",
  formal: "FCFS schedules processes strictly in the order they arrive in the ready queue. It uses a FIFO queue. Non-preemptive.",
  intuition: "Like a queue at a grocery store: the first person to arrive is served first, regardless of how many items they have.",
  coreProperties: [
    "Non-preemptive algorithm",
    "Uses a FIFO queue",
    "Simple to implement",
    "Susceptible to the Convoy Effect"
  ],
  workedExamples: [
    {
      problem: "Calculate TAT and WT for FCFS given processes: P1(AT:0, BT:4), P2(AT:1, BT:3), P3(AT:2, BT:1)",
      solution: "Gantt Chart: | P1 (0-4) | P2 (4-7) | P3 (7-8) | \nCT: P1=4, P2=7, P3=8.\nTAT (CT-AT): P1=4-0=4, P2=7-1=6, P3=8-2=6. Average TAT: (4+6+6)/3 = 5.33\nWT (TAT-BT): P1=4-4=0, P2=6-3=3, P3=6-1=5. Average WT: (0+3+5)/3 = 2.67",
      explanation: "P1 arrives first and runs to completion since FCFS is non-preemptive. P2 waits until P1 finishes, etc."
    }
  ],
  commonMistakes: [
    {
      mistake: "Ignoring Arrival Time (assuming all arrive at 0).",
      fix: "Always check the AT column and order the ready queue chronologically."
    }
  ],
  recognitionClues: ["Non-preemptive", "No priorities given", "Simple FIFO"]
};

contentMap['os_m1_30'] = {
  hasContent: true,
  overview: "Shortest-Job-First (SJF) schedules the process with the smallest burst time next.",
  formal: "SJF associates with each process the length of its next CPU burst. When the CPU is available, it is assigned to the process that has the smallest next CPU burst. Non-preemptive.",
  intuition: "Express lane at the grocery store: serve the customers with the fewest items first to minimize average waiting time.",
  coreProperties: [
    "Non-preemptive (Standard SJF)",
    "Provably optimal for minimum average waiting time",
    "Cannot be implemented at the level of short-term CPU scheduling because there is no way to know the length of the next CPU burst exactly",
    "Susceptible to Starvation for long processes"
  ],
  workedExamples: [
    {
      problem: "Calculate TAT and WT for SJF (non-preemptive) given: P1(AT:0, BT:6), P2(AT:2, BT:2), P3(AT:4, BT:1)",
      solution: "Gantt Chart: | P1 (0-6) | P3 (6-7) | P2 (7-9) |\nCT: P1=6, P3=7, P2=9.\nNote: At t=6, P2 (BT=2) and P3 (BT=1) are ready. P3 is shorter, so it runs first.",
      explanation: "Even though P2 arrived before P3, P1 finishes at t=6. At t=6 both P2 and P3 are available, so SJF compares their burst times. P3 (1) < P2 (2)."
    }
  ]
};

contentMap['os_m2_29'] = {
  hasContent: true,
  overview: "Banker's Algorithm is a deadlock avoidance algorithm.",
  formal: "It simulates the allocation of predetermined maximum possible amounts of all resources, and then makes an s-state check to test for possible deadlock conditions for all other pending activities, before deciding whether allocation should be allowed to continue.",
  intuition: "Like a bank determining if it can lend money. It only approves loans if it knows there's a sequence of events where everyone eventually pays the bank back.",
  coreProperties: [
    "Requires knowing maximum resources needed in advance",
    "Uses matrices: Allocation, Max, Need",
    "Need = Max - Allocation",
    "Safe Sequence generation guarantees deadlock avoidance"
  ],
  workedExamples: [
    {
      problem: "Given Allocation, Max, and Available. Find the safe sequence.",
      solution: "Step 1: Calculate Need = Max - Allocation. Step 2: Set Work = Available. Step 3: Find process where Need <= Work. Step 4: Add Allocation to Work. Step 5: Repeat.",
      explanation: "If all processes can finish, the sequence of completion is the Safe Sequence."
    }
  ]
};

const code = `import { TopicContent } from '@/lib/content/types';

export const osContent: Record<string, TopicContent> = ${JSON.stringify(contentMap, null, 2)};
`;

fs.mkdirSync(path.join(process.cwd(), 'src/lib/content/os'), { recursive: true });
fs.writeFileSync('src/lib/content/os/osContent.ts', code);
