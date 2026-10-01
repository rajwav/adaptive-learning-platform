const fs = require('fs');
let code = fs.readFileSync('src/lib/content/index.ts', 'utf8');

if (!code.includes('osContent')) {
  code = code.replace(
    "import { module2Content } from './module2';", 
    "import { module2Content } from './module2';\nimport { osContent } from './os/osContent';"
  );
  code = code.replace(
    "...module2Content,",
    "...module2Content,\n  ...osContent,"
  );
  fs.writeFileSync('src/lib/content/index.ts', code);
}
console.log("Patched content index");
