const fs = require('fs');

const files = [
  'src/app/toc/syllabus/page.tsx',
  'src/app/os/syllabus/page.tsx',
  'src/app/toc/page.tsx',
  'src/app/os/page.tsx'
];

function patchFile(file, subjectId, title) {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');

  // Replace 'TOC' with title in headers
  if (subjectId === 'os') {
    code = code.replace(/TOC/g, 'OS');
    code = code.replace(/toc/g, 'os'); // href="/toc/..." to href="/os/..."
    // Fix the store usage if needed
  }

  // Filter modules
  if (code.includes('const { isInitialized, modules, topics, progress } = useLearningStore();')) {
     code = code.replace(
       'const { isInitialized, modules, topics, progress } = useLearningStore();',
       `const { isInitialized, modules: allModules, topics, progress } = useLearningStore();\n  const modules = allModules.filter(m => m.subjectId === '${subjectId}');`
     );
  } else if (code.includes('const { isInitialized, modules, progress, nextAction } = useLearningStore();')) {
     code = code.replace(
       'const { isInitialized, modules, progress, nextAction } = useLearningStore();',
       `const { isInitialized, modules: allModules, progress, nextAction } = useLearningStore();\n  const modules = allModules.filter(m => m.subjectId === '${subjectId}');`
     );
  } else if (code.includes('const { isInitialized, modules, topics, progress, errors, attempts, nextAction } = useLearningStore();')) {
     code = code.replace(
       'const { isInitialized, modules, topics, progress, errors, attempts, nextAction } = useLearningStore();',
       `const { isInitialized, modules: allModules, topics, progress, errors, attempts, nextAction } = useLearningStore();\n  const modules = allModules.filter(m => m.subjectId === '${subjectId}');`
     );
  }

  fs.writeFileSync(file, code);
}

patchFile('src/app/toc/syllabus/page.tsx', 'toc', 'TOC');
patchFile('src/app/os/syllabus/page.tsx', 'os', 'OS');
patchFile('src/app/toc/page.tsx', 'toc', 'TOC');
patchFile('src/app/os/page.tsx', 'os', 'OS');

console.log("Patched filters!");
