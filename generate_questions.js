const fs = require('fs');

const topics = [
  'top_intro_fa', 'top_dfa_formal', 'top_dfa_notations', 'top_dfa_diagram',
  'top_dfa_table', 'top_dfa_lang', 'top_nfa', 'top_nfa_dfa', 'top_fa_equiv',
  'top_eps_nfa', 'top_eps_elim', 'top_min', 'top_fa_output', 'top_moore',
  'top_mealy', 'top_moore_mealy'
];

let out = `import { Question } from '@/types';\n\nexport const MODULE_1_QUESTIONS: Question[] = [\n`;

let qId = 1;

const templates = [
  { text: "What is the primary purpose of this concept?", diff: 1, type: "Recall" },
  { text: "Which of the following best describes the formal properties?", diff: 2, type: "Understanding" },
  { text: "Given the formal definition, which symbol represents the transition function?", diff: 1, type: "Recall" },
  { text: "Construct a basic example. What happens when input is '01'?", diff: 3, type: "Application" },
  { text: "If we alter the initial state, how does the behavior change?", diff: 3, type: "Application" },
  { text: "Trace the execution of the standard algorithm. What is the intermediate step?", diff: 4, type: "Problem Solving" },
  { text: "Convert the given representation into its equivalent form. What is the result?", diff: 4, type: "Problem Solving" },
  { text: "Identify the common mistake in the following flawed implementation:", diff: 3, type: "Understanding" },
  { text: "University Exam Question: Prove or disprove the equivalence in this edge case.", diff: 5, type: "Exam" },
  { text: "Which language class does this specific automaton variation ultimately recognize?", diff: 2, type: "Recall" },
];

for (const topic of topics) {
  for (let i = 0; i < 10; i++) {
    const t = templates[i];
    out += `  {
    id: "q_mod1_${qId}",
    topicId: "${topic}",
    text: "${topic} - ${t.text}",
    correctAnswer: "Detailed answer for ${topic} question ${i+1}.",
    difficulty: ${t.diff}
  },\n`;
    qId++;
  }
}

out += `];\n`;
fs.writeFileSync('src/lib/content/questions.ts', out);
