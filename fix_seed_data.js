const fs = require('fs');

let code = fs.readFileSync('src/lib/seed-toc.ts', 'utf8');

const newSeedLogic = `export async function initializeSeedData() {
  // Fetch existing
  const existingSubjects = await subjectsRepo.getAll();
  const existingModules = await modulesRepo.getAll();
  const existingTopics = await topicsRepo.getAll();
  const existingQuestions = await questionsRepo.getAll();
  const existingProgress = await progressRepo.getAll();

  // 1. Deduplicate everything currently in IndexedDB
  const uniqueSubjects = new Map();
  existingSubjects.forEach(s => uniqueSubjects.set(s.id, s));
  
  const uniqueModules = new Map();
  existingModules.forEach(m => uniqueModules.set(m.id, m));
  
  const uniqueTopics = new Map();
  existingTopics.forEach(t => uniqueTopics.set(t.id, t));
  
  const uniqueQuestions = new Map();
  existingQuestions.forEach(q => uniqueQuestions.set(q.id, q));
  
  const uniqueProgress = new Map();
  existingProgress.forEach(p => {
    const existing = uniqueProgress.get(p.topicId);
    if (!existing) {
      uniqueProgress.set(p.topicId, p);
    } else {
      // Keep the one with actual progress if duplicates exist
      if ((p.mastery || 0) > (existing.mastery || 0) || (p.questionsAttempted || 0) > (existing.questionsAttempted || 0) || (p.status !== 'NOT_STARTED' && existing.status === 'NOT_STARTED')) {
        uniqueProgress.set(p.topicId, p);
      }
    }
  });

  // 2. Ensure all hardcoded seed data is merged in
  const allSeedSubjects = [TOC_SUBJECT, osSubject];
  const allSeedModules = [...TOC_MODULES, ...osModules];
  const allSeedTopics = [...TOC_TOPICS, ...osTopics];
  const allSeedQuestions = [...TOC_QUESTIONS, ...osQuestions];
  
  let changed = false;

  for (const s of allSeedSubjects) {
    if (!uniqueSubjects.has(s.id)) {
      uniqueSubjects.set(s.id, s);
      changed = true;
    }
  }

  for (const m of allSeedModules) {
    if (!uniqueModules.has(m.id)) {
      uniqueModules.set(m.id, m);
      changed = true;
    }
  }

  for (const t of allSeedTopics) {
    if (!uniqueTopics.has(t.id)) {
      uniqueTopics.set(t.id, t);
      // Initialize progress if topic is completely new
      if (!uniqueProgress.has(t.id)) {
        uniqueProgress.set(t.id, {
          topicId: t.id,
          status: 'NOT_STARTED' as any,
          confidence: 0,
          mastery: 0,
          practiceAccuracy: 0,
          questionsAttempted: 0,
          questionsCorrect: 0,
          reviewCount: 0,
          successCount: 0,
          failureCount: 0
        });
      }
      changed = true;
    }
  }

  for (const q of allSeedQuestions) {
    if (!uniqueQuestions.has(q.id)) {
      uniqueQuestions.set(q.id, q);
      changed = true;
    }
  }

  // If there were duplicates removed OR new data added, update IndexedDB
  if (changed || existingSubjects.length !== uniqueSubjects.size || existingTopics.length !== uniqueTopics.size || existingProgress.length !== uniqueProgress.size) {
    await subjectsRepo.setAll(Array.from(uniqueSubjects.values()));
    await modulesRepo.setAll(Array.from(uniqueModules.values()));
    await topicsRepo.setAll(Array.from(uniqueTopics.values()));
    await questionsRepo.setAll(Array.from(uniqueQuestions.values()));
    await progressRepo.setAll(Array.from(uniqueProgress.values()));
  }
}
`;

// Now replace the old initializeSeedData with the new one
const startIndex = code.indexOf('export async function initializeSeedData() {');
if (startIndex !== -1) {
    code = code.substring(0, startIndex) + newSeedLogic;
} else {
    console.error("Could not find initializeSeedData function");
}

fs.writeFileSync('src/lib/seed-toc.ts', code);
