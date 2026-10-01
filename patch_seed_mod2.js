const fs = require('fs');
let code = fs.readFileSync('src/lib/seed-toc.ts', 'utf8');

const mod2Granular = `  // Module II - Granular Topics
  { id: 'top_re_intro', moduleId: 'mod_2', title: 'Introduction to Regular Expression', description: '', order: 17, prerequisites: [] },
  { id: 'top_re_identities', moduleId: 'mod_2', title: 'Identities of Regular Expressions', description: '', order: 18, prerequisites: ['top_re_intro'] },
  { id: 'top_fa_and_re', moduleId: 'mod_2', title: 'Finite Automata and Regular Expressions', description: '', order: 19, prerequisites: ['top_re_identities'] },
  { id: 'top_dfa_to_re', moduleId: 'mod_2', title: 'Converting from DFA\\'s to Regular Expressions', description: '', order: 20, prerequisites: ['top_fa_and_re'] },
  { id: 'top_re_to_fa', moduleId: 'mod_2', title: 'Converting Regular Expressions to Automata', description: '', order: 21, prerequisites: ['top_fa_and_re'] },
  { id: 'top_re_apps', moduleId: 'mod_2', title: 'Applications of Regular Expressions', description: '', order: 22, prerequisites: ['top_re_to_fa'] },
  { id: 'top_rg_def', moduleId: 'mod_2', title: 'Regular Grammars Definition', description: '', order: 23, prerequisites: [] },
  { id: 'top_rg_and_fa', moduleId: 'mod_2', title: 'Regular Grammars and FA', description: '', order: 24, prerequisites: ['top_rg_def'] },
  { id: 'top_fa_to_rg', moduleId: 'mod_2', title: 'FA for Regular Grammar', description: '', order: 25, prerequisites: ['top_rg_and_fa'] },
  { id: 'top_rg_to_fa', moduleId: 'mod_2', title: 'Regular Grammar for FA', description: '', order: 26, prerequisites: ['top_rg_and_fa'] },
  { id: 'top_pump_rl', moduleId: 'mod_2', title: 'Proving languages to be non-regular - Pumping Lemma', description: '', order: 27, prerequisites: ['top_re_intro'] },
  { id: 'top_pump_rl_apps', moduleId: 'mod_2', title: 'Applications of Pumping Lemma', description: '', order: 28, prerequisites: ['top_pump_rl'] },
  { id: 'top_closure_rl', moduleId: 'mod_2', title: 'Closure Properties of Regular Languages', description: '', order: 29, prerequisites: ['top_re_intro'] },`;

code = code.replace(/\/\/ Module II - Granular Topics[\s\S]*?(?=\/\/ Module III)/, mod2Granular + '\n\n');

// Adjust orders for Mod 3 and 4
code = code.replace(/{ id: 'top_cfg', moduleId: 'mod_3', title: 'Context-Free Grammar \\(CFG\\)', description: '', order: 29/g, "{ id: 'top_cfg', moduleId: 'mod_3', title: 'Context-Free Grammar (CFG)', description: '', order: 30");
code = code.replace(/{ id: 'top_parse', moduleId: 'mod_3', title: 'Parse Trees and Ambiguity', description: '', order: 30/g, "{ id: 'top_parse', moduleId: 'mod_3', title: 'Parse Trees and Ambiguity', description: '', order: 31");
code = code.replace(/{ id: 'top_cnf', moduleId: 'mod_3', title: 'Chomsky Normal Form \\(CNF\\)', description: '', order: 31/g, "{ id: 'top_cnf', moduleId: 'mod_3', title: 'Chomsky Normal Form (CNF)', description: '', order: 32");
code = code.replace(/{ id: 'top_gnf', moduleId: 'mod_3', title: 'Greibach Normal Form \\(GNF\\)', description: '', order: 32/g, "{ id: 'top_gnf', moduleId: 'mod_3', title: 'Greibach Normal Form (GNF)', description: '', order: 33");

code = code.replace(/{ id: 'top_pda', moduleId: 'mod_4', title: 'Pushdown Automata \\(PDA\\)', description: '', order: 33/g, "{ id: 'top_pda', moduleId: 'mod_4', title: 'Pushdown Automata (PDA)', description: '', order: 34");
code = code.replace(/{ id: 'top_pda_cfg', moduleId: 'mod_4', title: 'Equivalence of PDA and CFG', description: '', order: 34/g, "{ id: 'top_pda_cfg', moduleId: 'mod_4', title: 'Equivalence of PDA and CFG', description: '', order: 35");
code = code.replace(/{ id: 'top_pump_cfl', moduleId: 'mod_4', title: 'Pumping Lemma for CFL', description: '', order: 35/g, "{ id: 'top_pump_cfl', moduleId: 'mod_4', title: 'Pumping Lemma for CFL', description: '', order: 36");
code = code.replace(/{ id: 'top_tm', moduleId: 'mod_4', title: 'Turing Machines \\(TM\\)', description: '', order: 36/g, "{ id: 'top_tm', moduleId: 'mod_4', title: 'Turing Machines (TM)', description: '', order: 37");
code = code.replace(/{ id: 'top_tm_vars', moduleId: 'mod_4', title: 'Variations of Turing Machines', description: '', order: 37/g, "{ id: 'top_tm_vars', moduleId: 'mod_4', title: 'Variations of Turing Machines', description: '', order: 38");
code = code.replace(/{ id: 'top_undec', moduleId: 'mod_4', title: 'Undecidability and Halting Problem', description: '', order: 38/g, "{ id: 'top_undec', moduleId: 'mod_4', title: 'Undecidability and Halting Problem', description: '', order: 39");

fs.writeFileSync('src/lib/seed-toc.ts', code);
