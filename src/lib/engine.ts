import { TopicProgress, ActionType, Target, ErrorRecord, Question, PracticeAttempt } from '@/types';

export interface NextActionRecommendation {
  topicId: string;
  action: ActionType;
  reason: string[];
}

export function calculateNextAction(
  progresses: TopicProgress[],
  errors: ErrorRecord[],
  targets: Target[]
): NextActionRecommendation | null {
  if (!progresses.length) return null;

  const now = Date.now();

  // 1. Check for Due Reviews (Spaced Repetition)
  const dueReviews = progresses.filter(p => p.status === 'REVIEWING' || p.status === 'MASTERED')
    .filter(p => p.nextReview && p.nextReview <= now)
    .sort((a, b) => (a.nextReview || 0) - (b.nextReview || 0));

  if (dueReviews.length > 0) {
    const target = dueReviews[0];
    return {
      topicId: target.topicId,
      action: 'REVISE',
      reason: [
        'Spaced review is due',
        `Current mastery: ${target.mastery}%`
      ]
    };
  }

  // 2. Check for recent poor performance or repeated errors (Error Review / Practice)
  const weakTopics = progresses.filter(p => p.status === 'PRACTICING' || p.status === 'LEARNING')
    .filter(p => p.practiceAccuracy < 70 && p.questionsAttempted > 3)
    .sort((a, b) => a.practiceAccuracy - b.practiceAccuracy);

  if (weakTopics.length > 0) {
    const target = weakTopics[0];
    const recentErrors = errors.filter(e => e.topicId === target.topicId).length;
    return {
      topicId: target.topicId,
      action: 'PRACTICE',
      reason: [
        `Practice accuracy is low (${Math.round(target.practiceAccuracy)}%)`,
        `${recentErrors} recorded mistakes`,
        `Confidence reported as ${target.confidence}/5`
      ]
    };
  }

  // 3. Look for active topic targets
  const activeTargets = targets.filter(t => t.status === 'ACTIVE' && t.type === 'TOPIC' && t.topicIds && t.topicIds.length > 0);
  if (activeTargets.length > 0) {
    const targetTopicId = activeTargets[0].topicIds![0];
    const p = progresses.find(p => p.topicId === targetTopicId);
    if (p) {
      if (p.status === 'NOT_STARTED') {
        return {
          topicId: targetTopicId,
          action: 'LEARN',
          reason: ['Target deadline approaching', 'Topic not yet started']
        };
      }
      return {
        topicId: targetTopicId,
        action: 'PRACTICE',
        reason: ['Active target requirement', `Current mastery: ${p.mastery}%`]
      };
    }
  }

  // 4. Default to next NOT_STARTED or LEARNING topic
  const nextLearning = progresses.find(p => p.status === 'NOT_STARTED' || p.status === 'LEARNING');
  if (nextLearning) {
    return {
      topicId: nextLearning.topicId,
      action: nextLearning.status === 'NOT_STARTED' ? 'LEARN' : 'PRACTICE',
      reason: ['Next sequential topic in syllabus']
    };
  }

  return null;
}

export function selectNextQuestion(
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
}