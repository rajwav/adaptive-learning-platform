const fs = require('fs');
let code = fs.readFileSync('src/lib/seed-toc.ts', 'utf8');

code = code.replace(
  "// (For questions, we can just use an empty array for now or generate them)\nconst osQuestions: Question[] = [];",
  "import { osQuestions } from './content/os/osQuestions';"
);

fs.writeFileSync('src/lib/seed-toc.ts', code);
