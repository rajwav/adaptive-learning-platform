const fs = require('fs');

function replaceStore(filePath, subjectId) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // TOC page
  if (code.includes('const { isInitialized, topics, modules, progress, nextAction, errors, targets } = useLearningStore();')) {
    code = code.replace(
      'const { isInitialized, topics, modules, progress, nextAction, errors, targets } = useLearningStore();',
      `const { isInitialized, topics: allTopics, modules: allModules, progress, nextAction, errors, targets } = useLearningStore();
  const modules = allModules.filter(m => m.subjectId === '${subjectId}');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = allTopics.filter(t => moduleIds.has(t.moduleId));`
    );
  }

  // Syllabus page
  if (code.includes('const { isInitialized, modules, topics, progress } = useLearningStore();')) {
    code = code.replace(
      'const { isInitialized, modules, topics, progress } = useLearningStore();',
      `const { isInitialized, modules: allModules, topics: allTopics, progress } = useLearningStore();
  const modules = allModules.filter(m => m.subjectId === '${subjectId}');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = allTopics.filter(t => moduleIds.has(t.moduleId));`
    );
  }

  // Practice page
  if (code.includes('const { isInitialized, questions, topics, nextAction, errors, attempts, recordPractice, progress } = useLearningStore();')) {
    code = code.replace(
      'const { isInitialized, questions, topics, nextAction, errors, attempts, recordPractice, progress } = useLearningStore();',
      `const store = useLearningStore();
  const { isInitialized, nextAction, errors, attempts, recordPractice, progress } = store;
  const modules = store.modules.filter(m => m.subjectId === '${subjectId}');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));
  const questions = store.questions.filter(q => moduleIds.has(q.moduleId) || topics.some(t => t.id === q.topicId));`
    );
  }

  // Errors page
  if (code.includes('const { errors, topics, updateErrorType, isInitialized } = useLearningStore();')) {
    code = code.replace(
      'const { errors, topics, updateErrorType, isInitialized } = useLearningStore();',
      `const store = useLearningStore();
  const { errors, updateErrorType, isInitialized } = store;
  const modules = store.modules.filter(m => m.subjectId === '${subjectId}');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));`
    );
  }

  // Graph page
  if (code.includes('const { topics, progress } = useLearningStore();')) {
    code = code.replace(
      'const { topics, progress } = useLearningStore();',
      `const store = useLearningStore();
  const { progress } = store;
  const modules = store.modules.filter(m => m.subjectId === '${subjectId}');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));`
    );
  }

  // Targets page
  if (code.includes('const { targets, topics, progress, updateTarget, deleteTarget, isInitialized } = useLearningStore();')) {
    code = code.replace(
      'const { targets, topics, progress, updateTarget, deleteTarget, isInitialized } = useLearningStore();',
      `const store = useLearningStore();
  const { targets: allTargets, progress, updateTarget, deleteTarget, isInitialized } = store;
  const modules = store.modules.filter(m => m.subjectId === '${subjectId}');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));
  const targets = allTargets; // keeping original behavior`
    );
  }

  // Topic page
  if (code.includes('const { isInitialized, topics, progress, updateTopicStatus, updateTopicChecklist, updateTopicNotes } = useLearningStore();')) {
    code = code.replace(
      'const { isInitialized, topics, progress, updateTopicStatus, updateTopicChecklist, updateTopicNotes } = useLearningStore();',
      `const store = useLearningStore();
  const { isInitialized, progress, updateTopicStatus, updateTopicChecklist, updateTopicNotes } = store;
  const modules = store.modules.filter(m => m.subjectId === '${subjectId}');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));`
    );
  }

  fs.writeFileSync(filePath, code);
}

const tocFiles = [
  'src/app/toc/page.tsx',
  'src/app/toc/syllabus/page.tsx',
  'src/app/toc/practice/page.tsx',
  'src/app/toc/errors/page.tsx',
  'src/app/toc/graph/page.tsx',
  'src/app/toc/targets/page.tsx',
  'src/app/toc/topic/[topicId]/page.tsx'
];

tocFiles.forEach(f => replaceStore(f, 'sub_toc'));

console.log("Patched TOC");
