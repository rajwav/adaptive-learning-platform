import { Subject, Module, Topic, TopicProgress, Question } from '@/types';
import { subjectsRepo, modulesRepo, topicsRepo, progressRepo, questionsRepo } from './repositories';

export const TOC_SUBJECT: Subject = {
  id: 'sub_toc',
  name: 'Theory of Computation',
  description: 'Mathematical study of computing machines and their capabilities.',
  slug: 'toc'
};

export const TOC_MODULES: Module[] = [
  { id: 'mod_1', subjectId: 'sub_toc', title: 'Finite Automata', description: 'Module I', order: 1 },
  { id: 'mod_2', subjectId: 'sub_toc', title: 'Regular Expressions', description: 'Module II', order: 2 },
  { id: 'mod_3', subjectId: 'sub_toc', title: 'Context-Free Grammar', description: 'Module III', order: 3 },
  { id: 'mod_4', subjectId: 'sub_toc', title: 'Pushdown Automata and Turing Machines', description: 'Module IV', order: 4 },
];

export const TOC_TOPICS: Topic[] = [
  // Module I - 16 Granular Topics
  { id: 'top_intro_fa', moduleId: 'mod_1', title: 'Introduction to Finite Automata', description: '', order: 1, prerequisites: [] },
  { id: 'top_dfa_formal', moduleId: 'mod_1', title: 'DFA — Formal Definition', description: '', order: 2, prerequisites: ['top_intro_fa'] },
  { id: 'top_dfa_notations', moduleId: 'mod_1', title: 'DFA — Simple Notations', description: '', order: 3, prerequisites: ['top_dfa_formal'] },
  { id: 'top_dfa_diagram', moduleId: 'mod_1', title: 'DFA — State Transition Diagram', description: '', order: 4, prerequisites: ['top_dfa_notations'] },
  { id: 'top_dfa_table', moduleId: 'mod_1', title: 'DFA — State Transition Table', description: '', order: 5, prerequisites: ['top_dfa_diagram'] },
  { id: 'top_dfa_lang', moduleId: 'mod_1', title: 'DFA — Language of a DFA', description: '', order: 6, prerequisites: ['top_dfa_diagram'] },
  { id: 'top_nfa', moduleId: 'mod_1', title: 'Nondeterministic Finite Automata (NFA)', description: '', order: 7, prerequisites: ['top_dfa_lang'] },
  { id: 'top_nfa_dfa', moduleId: 'mod_1', title: 'Equivalence of DFA and NFA', description: '', order: 8, prerequisites: ['top_nfa'] },
  { id: 'top_fa_equiv', moduleId: 'mod_1', title: 'Equivalence of Finite Automata', description: '', order: 9, prerequisites: ['top_dfa_lang'] },
  { id: 'top_eps_nfa', moduleId: 'mod_1', title: 'Finite Automata with ε-transitions', description: '', order: 10, prerequisites: ['top_nfa'] },
  { id: 'top_eps_elim', moduleId: 'mod_1', title: 'Eliminating ε-transitions', description: '', order: 11, prerequisites: ['top_eps_nfa'] },
  { id: 'top_min', moduleId: 'mod_1', title: 'Minimization of DFA', description: '', order: 12, prerequisites: ['top_dfa_lang', 'top_fa_equiv'] },
  { id: 'top_fa_output', moduleId: 'mod_1', title: 'Finite Automata with Output', description: '', order: 13, prerequisites: ['top_intro_fa'] },
  { id: 'top_moore', moduleId: 'mod_1', title: 'Moore Machine', description: '', order: 14, prerequisites: ['top_fa_output'] },
  { id: 'top_mealy', moduleId: 'mod_1', title: 'Mealy Machine', description: '', order: 15, prerequisites: ['top_fa_output'] },
  { id: 'top_moore_mealy', moduleId: 'mod_1', title: 'Interconversion of Moore and Mealy Machines', description: '', order: 16, prerequisites: ['top_moore', 'top_mealy'] },
  
    // Module II - Granular Topics
  { id: 'top_re_intro', moduleId: 'mod_2', title: 'Introduction to Regular Expression', description: '', order: 17, prerequisites: [] },
  { id: 'top_re_identities', moduleId: 'mod_2', title: 'Identities of Regular Expressions', description: '', order: 18, prerequisites: ['top_re_intro'] },
  { id: 'top_fa_and_re', moduleId: 'mod_2', title: 'Finite Automata and Regular Expressions', description: '', order: 19, prerequisites: ['top_re_identities'] },
  { id: 'top_dfa_to_re', moduleId: 'mod_2', title: 'Converting from DFA\'s to Regular Expressions', description: '', order: 20, prerequisites: ['top_fa_and_re'] },
  { id: 'top_re_to_fa', moduleId: 'mod_2', title: 'Converting Regular Expressions to Automata', description: '', order: 21, prerequisites: ['top_fa_and_re'] },
  { id: 'top_re_apps', moduleId: 'mod_2', title: 'Applications of Regular Expressions', description: '', order: 22, prerequisites: ['top_re_to_fa'] },
  { id: 'top_rg_def', moduleId: 'mod_2', title: 'Regular Grammars Definition', description: '', order: 23, prerequisites: [] },
  { id: 'top_rg_and_fa', moduleId: 'mod_2', title: 'Regular Grammars and FA', description: '', order: 24, prerequisites: ['top_rg_def'] },
  { id: 'top_fa_to_rg', moduleId: 'mod_2', title: 'FA for Regular Grammar', description: '', order: 25, prerequisites: ['top_rg_and_fa'] },
  { id: 'top_rg_to_fa', moduleId: 'mod_2', title: 'Regular Grammar for FA', description: '', order: 26, prerequisites: ['top_rg_and_fa'] },
  { id: 'top_pump_rl', moduleId: 'mod_2', title: 'Proving languages to be non-regular - Pumping Lemma', description: '', order: 27, prerequisites: ['top_re_intro'] },
  { id: 'top_pump_rl_apps', moduleId: 'mod_2', title: 'Applications of Pumping Lemma', description: '', order: 28, prerequisites: ['top_pump_rl'] },
  { id: 'top_closure_rl', moduleId: 'mod_2', title: 'Closure Properties of Regular Languages', description: '', order: 29, prerequisites: ['top_re_intro'] },

// Module III
  { id: 'top_cfg', moduleId: 'mod_3', title: 'Context-Free Grammar (CFG)', description: '', order: 29, prerequisites: [] },
  { id: 'top_parse', moduleId: 'mod_3', title: 'Parse Trees and Ambiguity', description: '', order: 31, prerequisites: ['top_cfg'] },
  { id: 'top_cnf', moduleId: 'mod_3', title: 'Chomsky Normal Form (CNF)', description: '', order: 31, prerequisites: ['top_cfg'] },
  { id: 'top_gnf', moduleId: 'mod_3', title: 'Greibach Normal Form (GNF)', description: '', order: 32, prerequisites: ['top_cnf'] },

  // Module IV
  { id: 'top_pda', moduleId: 'mod_4', title: 'Pushdown Automata (PDA)', description: '', order: 33, prerequisites: ['top_cfg'] },
  { id: 'top_pda_cfg', moduleId: 'mod_4', title: 'Equivalence of PDA and CFG', description: '', order: 35, prerequisites: ['top_pda', 'top_cfg'] },
  { id: 'top_pump_cfl', moduleId: 'mod_4', title: 'Pumping Lemma for CFL', description: '', order: 36, prerequisites: ['top_cfg'] },
  { id: 'top_tm', moduleId: 'mod_4', title: 'Turing Machines (TM)', description: '', order: 36, prerequisites: ['top_pda'] },
  { id: 'top_tm_vars', moduleId: 'mod_4', title: 'Variations of Turing Machines', description: '', order: 38, prerequisites: ['top_tm'] },
  { id: 'top_undec', moduleId: 'mod_4', title: 'Undecidability and Halting Problem', description: '', order: 39, prerequisites: ['top_tm'] },
];

import { MODULE_1_QUESTIONS } from './content/questions';
import { MODULE_2_QUESTIONS } from './content/questions2';

export const TOC_QUESTIONS: Question[] = [...MODULE_1_QUESTIONS, ...MODULE_2_QUESTIONS];

export async function initializeSeedData() {
  const existing = await subjectsRepo.getAll();
  if (existing.length === 0) {
    await subjectsRepo.setAll([TOC_SUBJECT]);
    await modulesRepo.setAll(TOC_MODULES);
    await topicsRepo.setAll(TOC_TOPICS);
    await questionsRepo.setAll(TOC_QUESTIONS);
    
    const initialProgress: TopicProgress[] = TOC_TOPICS.map(t => ({
      topicId: t.id,
      status: 'NOT_STARTED',
      confidence: 0,
      mastery: 0,
      practiceAccuracy: 0,
      questionsAttempted: 0,
      questionsCorrect: 0,
      reviewCount: 0,
      successCount: 0,
      failureCount: 0
    }));
    await progressRepo.setAll(initialProgress);
  } else {
    // SYNC LOGIC: Ensure curriculum updates propagate to IDB without deleting user progress
    await subjectsRepo.setAll([TOC_SUBJECT]);
    await modulesRepo.setAll(TOC_MODULES);
    
    // Merge topics (hard replace topics so titles/order match code exactly)
    await topicsRepo.setAll(TOC_TOPICS);
    await questionsRepo.setAll(TOC_QUESTIONS);

    const existingProgress = await progressRepo.getAll();
    const existingProgressMap = new Map(existingProgress.map(p => [p.topicId, p]));
    
    let needsUpdate = false;
    for (const topic of TOC_TOPICS) {
      if (!existingProgressMap.has(topic.id)) {
        needsUpdate = true;
        existingProgress.push({
          topicId: topic.id,
          status: 'NOT_STARTED',
          confidence: 0,
          mastery: 0,
          practiceAccuracy: 0,
          questionsAttempted: 0,
          questionsCorrect: 0,
          reviewCount: 0,
          successCount: 0,
          failureCount: 0
        });
      }
    }
    
    if (needsUpdate) {
      await progressRepo.setAll(existingProgress);
    }
  }
}
