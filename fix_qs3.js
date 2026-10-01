const fs = require('fs');
let code = fs.readFileSync('src/lib/content/os/osQuestions.ts', 'utf8');
code = code.replace(/"moduleId": "os-mod-[12]",\n/g, '');
fs.writeFileSync('src/lib/content/os/osQuestions.ts', code);
