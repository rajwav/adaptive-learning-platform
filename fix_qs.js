const fs = require('fs');
let code = fs.readFileSync('src/lib/content/os/osQuestions.ts', 'utf8');
code = code.replace(/type: 'MULTIPLE_CHOICE'/g, "answerMode: 'MULTIPLE_CHOICE',\n    type: 'Problem Solving'");
fs.writeFileSync('src/lib/content/os/osQuestions.ts', code);
