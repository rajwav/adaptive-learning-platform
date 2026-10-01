const fs = require('fs');

let code = fs.readFileSync('src/lib/seed-toc.ts', 'utf8');

code = code.replace("const osQuestions = [];", "const osQuestions: Question[] = [];");
code = code.replace("status: 'NOT_STARTED',", "status: 'NOT_STARTED' as any,");

fs.writeFileSync('src/lib/seed-toc.ts', code);
