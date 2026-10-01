const fs = require('fs');
let code = fs.readFileSync('src/lib/seed-toc.ts', 'utf8');

code = code.replace("import { MODULE_1_QUESTIONS } from './content/questions';", "import { MODULE_1_QUESTIONS } from './content/questions';\nimport { MODULE_2_QUESTIONS } from './content/questions2';");
code = code.replace("export const TOC_QUESTIONS: Question[] = MODULE_1_QUESTIONS;", "export const TOC_QUESTIONS: Question[] = [...MODULE_1_QUESTIONS, ...MODULE_2_QUESTIONS];");

fs.writeFileSync('src/lib/seed-toc.ts', code);
