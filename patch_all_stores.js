const fs = require('fs');

function patchFile(filePath, subjectId) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Replace standard store fetch with the filtered one
  // First, find the exact useLearningStore statement.
  const regex = /const \{([^}]+)\}\s*=\s*useLearningStore\(\);/g;
  let match;
  while ((match = regex.exec(code)) !== null) {
    const originalLine = match[0];
    const vars = match[1].split(',').map(s => s.trim());
    
    // Check if we already patched this one
    if (originalLine.includes('allModules')) continue;
    if (!vars.some(v => ['modules', 'topics', 'progress', 'questions', 'errors', 'targets'].includes(v))) continue;
    
    // We need to alias the arrays to allX
    let newVars = [];
    let filterLines = [];
    
    let hasModules = false;
    let hasTopics = false;

    for (const v of vars) {
      if (['modules', 'topics', 'progress', 'questions', 'errors', 'targets', 'attempts'].includes(v)) {
        newVars.push(`${v}: all${v.charAt(0).toUpperCase() + v.slice(1)}`);
      } else {
        newVars.push(v);
      }
    }

    const replacementLine = `const { ${newVars.join(', ')} } = useLearningStore();`;
    
    filterLines.push(`  const modules = typeof allModules !== 'undefined' ? allModules.filter(m => m.subjectId === '${subjectId}') : [];`);
    filterLines.push(`  const moduleIds = new Set(modules.map(m => m.id));`);
    filterLines.push(`  const topics = typeof allTopics !== 'undefined' ? allTopics.filter(t => moduleIds.has(t.moduleId)) : [];`);
    filterLines.push(`  const topicIds = new Set(topics.map(t => t.id));`);
    filterLines.push(`  const progress = typeof allProgress !== 'undefined' ? allProgress.filter(p => topicIds.has(p.topicId)) : [];`);
    filterLines.push(`  const questions = typeof allQuestions !== 'undefined' ? allQuestions.filter(q => topicIds.has(q.topicId)) : [];`);
    filterLines.push(`  const errors = typeof allErrors !== 'undefined' ? allErrors.filter(e => topicIds.has(e.topicId)) : [];`);
    filterLines.push(`  const targets = typeof allTargets !== 'undefined' ? allTargets.filter(t => topicIds.has(t.topicId)) : [];`);
    filterLines.push(`  const attempts = typeof allAttempts !== 'undefined' ? allAttempts.filter(a => topicIds.has(a.topicId)) : [];`);

    // Remove the ones not requested in original
    let finalFilterLines = [];
    if (vars.includes('modules')) finalFilterLines.push(filterLines[0]);
    if (vars.includes('topics')) {
        if (!vars.includes('modules')) {
             finalFilterLines.push(`  const _modules = (typeof allModules !== 'undefined' ? allModules : useLearningStore.getState().modules).filter(m => m.subjectId === '${subjectId}');`);
             finalFilterLines.push(`  const moduleIds = new Set(_modules.map(m => m.id));`);
        } else {
             finalFilterLines.push(filterLines[1]);
        }
        finalFilterLines.push(filterLines[2]);
    }
    
    const arrayNames = ['progress', 'questions', 'errors', 'targets', 'attempts'];
    for (const arr of arrayNames) {
        if (vars.includes(arr)) {
            if (!vars.includes('topics')) {
                 if (!vars.includes('modules')) {
                     finalFilterLines.push(`  const _modules = useLearningStore.getState().modules.filter(m => m.subjectId === '${subjectId}');`);
                     finalFilterLines.push(`  const moduleIds = new Set(_modules.map(m => m.id));`);
                 }
                 finalFilterLines.push(`  const _topics = useLearningStore.getState().topics.filter(t => moduleIds.has(t.moduleId));`);
                 finalFilterLines.push(`  const topicIds = new Set(_topics.map(t => t.id));`);
                 vars.push('topics'); // hack to prevent doing this twice
            } else if (!finalFilterLines.some(l => l.includes('const topicIds'))) {
                 finalFilterLines.push(filterLines[3]);
            }
            finalFilterLines.push(filterLines[arrayNames.indexOf(arr) + 4]);
        }
    }

    const finalReplacement = replacementLine + '\n' + finalFilterLines.join('\n');
    code = code.replace(originalLine, finalReplacement);
  }
  
  // Specific fix for syllabus which I manually patched before
  if (code.includes('const modules = allModules.filter(m => m.subjectId === \'toc\');')) {
      code = code.replace('const modules = allModules.filter(m => m.subjectId === \'toc\');', '');
      code = code.replace("const { isInitialized, modules: allModules, topics, progress } = useLearningStore();", "const { isInitialized, modules, topics, progress } = useLearningStore();");
      // Now let the regex handle it on the next run or I'll just run it twice. Wait, if I do this I need to make sure the regex runs after.
  }
  
  fs.writeFileSync(filePath, code);
}

// First clean up syllabus manual patches from before
const cleanUpSyllabus = (filePath) => {
   if (!fs.existsSync(filePath)) return;
   let code = fs.readFileSync(filePath, 'utf8');
   code = code.replace(/const modules = allModules\.filter\(m => m\.subjectId === '[^']+'\);\n/g, '');
   code = code.replace(/modules: allModules/g, 'modules');
   fs.writeFileSync(filePath, code);
};
cleanUpSyllabus('src/app/toc/syllabus/page.tsx');
cleanUpSyllabus('src/app/os/syllabus/page.tsx');

const files = [
  'src/app/toc/page.tsx',
  'src/app/toc/syllabus/page.tsx',
  'src/app/toc/practice/page.tsx',
  'src/app/toc/errors/page.tsx',
  'src/app/toc/graph/page.tsx',
  'src/app/toc/targets/page.tsx',
  'src/app/toc/topic/[topicId]/page.tsx'
];

files.forEach(f => patchFile(f, 'sub_toc'));
files.forEach(f => patchFile(f.replace('toc', 'os'), 'os'));

console.log("Patched all stores");
