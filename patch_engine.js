const fs = require('fs');
let code = fs.readFileSync('src/lib/engine.ts', 'utf8');

const newFn = `export function selectNextQuestion(
  questions: Question[],
  targetTopicId: string,
  sessionAskedIds: string[],
  errors: ErrorRecord[],
  attempts: PracticeAttempt[],
  mode: 'PRACTICE' | 'REVISION' | 'EXAM' = 'PRACTICE'
): Question | null {
  let available = questions.filter(q => q.topicId === targetTopicId);
  if (available.length === 0) available = questions;
  if (available.length === 0) return null;

  let eligible = available.filter(q => !sessionAskedIds.includes(q.id));
  if (eligible.length === 0) {
    eligible = available; 
  }

  if (mode === 'EXAM') {
    return eligible[Math.floor(Math.random() * eligible.length)];
  }

  const scoredQuestions = eligible.map(q => {
    let score = 10;
    const qAttempts = attempts.filter(a => a.questionId === q.id);
    const qErrors = errors.filter(e => e.questionId === q.id);
    
    if (qAttempts.length === 0) {
      score += (mode === 'REVISION' ? 0 : 20);
    } else {
      qAttempts.sort((a, b) => b.timestamp - a.timestamp);
      const recent = qAttempts[0];
      
      if (!recent.isCorrect) score += (mode === 'REVISION' ? 50 : 30);
      else score -= (mode === 'REVISION' ? 9 : 5);
      
      score += (qErrors.length * (mode === 'REVISION' ? 10 : 5));
      
      if (!recent.isCorrect && recent.predictedConfidence && recent.predictedConfidence >= 4) {
        score += (mode === 'REVISION' ? 30 : 15);
      }
    }
    
    return { question: q, score: Math.max(1, score) };
  });

  const totalWeight = scoredQuestions.reduce((sum, sq) => sum + sq.score, 0);
  let randomVal = Math.random() * totalWeight;
  
  for (const sq of scoredQuestions) {
    randomVal -= sq.score;
    if (randomVal <= 0) return sq.question;
  }
  return eligible[0];
}`;

code = code.replace(/export function selectNextQuestion[\s\S]+$/, newFn);
fs.writeFileSync('src/lib/engine.ts', code);
