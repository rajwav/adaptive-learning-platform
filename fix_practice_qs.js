const fs = require('fs');

function fix(filePath) {
   let code = fs.readFileSync(filePath, 'utf8');
   code = code.replace(/q \=> moduleIds\.has\(q\.moduleId\) \|\| topics\.some\(t => t\.id === q\.topicId\)/g, 'q => topics.some(t => t.id === q.topicId)');
   fs.writeFileSync(filePath, code);
}
fix('src/app/toc/practice/page.tsx');
fix('src/app/os/practice/page.tsx');
