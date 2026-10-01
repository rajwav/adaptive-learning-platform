const fs = require('fs');
let code = fs.readFileSync('src/lib/content/index.ts', 'utf8');

if (!code.includes('module2Content')) {
  code = code.replace("import { module1Content } from './module1';", "import { module1Content } from './module1';\nimport { module2Content } from './module2';");
  code = code.replace("...module1Content,", "...module1Content,\n  ...module2Content,");
  fs.writeFileSync('src/lib/content/index.ts', code);
}
