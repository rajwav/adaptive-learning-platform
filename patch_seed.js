const fs = require('fs');

let code = fs.readFileSync('src/lib/seed-toc.ts', 'utf8');

// Add imports for OS
const osImportStr = `
import { osSubject, osModules } from './seed-os';
import { osTopics } from './seed-os-topics';
// (For questions, we can just use an empty array for now or generate them)
const osQuestions = [];
`;

code = code.replace("export async function initializeSeedData() {", osImportStr + "\nexport async function initializeSeedData() {");

// Change the check to see if both are seeded, but since users might already have TOC seeded, we need to append.
code = code.replace(
`  const existing = await subjectsRepo.getAll();
  if (existing.length === 0) {
    await subjectsRepo.setAll([TOC_SUBJECT]);
    await modulesRepo.setAll(TOC_MODULES);
    await topicsRepo.setAll(TOC_TOPICS);
    await questionsRepo.setAll(TOC_QUESTIONS);
    
    const initialProgress: TopicProgress[] = TOC_TOPICS.map(t => ({
      topicId: t.id,
      status: 'NOT_STARTED',
      confidence: 0,
      mastery: 0,
      practiceAccuracy: 0,
      questionsAttempted: 0,
      questionsCorrect: 0,
      reviewCount: 0,
      successCount: 0,
      failureCount: 0
    }));
    await progressRepo.setAll(initialProgress);`,

`  const existing = await subjectsRepo.getAll();
  let subjectsToSeed = [];
  let modulesToSeed = [];
  let topicsToSeed = [];
  let questionsToSeed = [];
  
  if (!existing.find(s => s.id === 'toc')) {
    subjectsToSeed.push(TOC_SUBJECT);
    modulesToSeed.push(...TOC_MODULES);
    topicsToSeed.push(...TOC_TOPICS);
    questionsToSeed.push(...TOC_QUESTIONS);
  }
  
  if (!existing.find(s => s.id === 'os')) {
    subjectsToSeed.push(osSubject);
    modulesToSeed.push(...osModules);
    topicsToSeed.push(...osTopics);
    questionsToSeed.push(...osQuestions);
  }

  if (subjectsToSeed.length > 0) {
    const existingSubjects = await subjectsRepo.getAll();
    await subjectsRepo.setAll([...existingSubjects, ...subjectsToSeed]);
    
    const existingModules = await modulesRepo.getAll();
    await modulesRepo.setAll([...existingModules, ...modulesToSeed]);
    
    const existingTopics = await topicsRepo.getAll();
    await topicsRepo.setAll([...existingTopics, ...topicsToSeed]);
    
    const existingQuestions = await questionsRepo.getAll();
    await questionsRepo.setAll([...existingQuestions, ...questionsToSeed]);
    
    const initialProgress = topicsToSeed.map(t => ({
      topicId: t.id,
      status: 'NOT_STARTED',
      confidence: 0,
      mastery: 0,
      practiceAccuracy: 0,
      questionsAttempted: 0,
      questionsCorrect: 0,
      reviewCount: 0,
      successCount: 0,
      failureCount: 0
    }));
    const existingProgress = await progressRepo.getAll();
    await progressRepo.setAll([...existingProgress, ...initialProgress]);
`
);

fs.writeFileSync('src/lib/seed-toc.ts', code);
