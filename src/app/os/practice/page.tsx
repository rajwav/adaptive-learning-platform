'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Activity, ArrowRight, XCircle, CheckCircle2, Target, AlertTriangle } from 'lucide-react';
import { useLearningStore } from '@/store/useLearningStore';
import { Question, ConfidenceLevel, ErrorType } from '@/types';
import { selectNextQuestion } from '@/lib/engine';

type SessionPhase = 'START' | 'QUESTION' | 'SELF_EVAL' | 'FEEDBACK' | 'CONFIDENCE' | 'EXAM_GRADING' | 'COMPLETE';
type SessionMode = 'PRACTICE' | 'REVISION' | 'EXAM';

interface HistoryItem {
  q: Question;
  userAnswer: string;
  correct: boolean | null; // null if pending exam grading
  conf?: number;
}

export default function PracticeSession() {
  const store = useLearningStore();
  const { isInitialized, nextAction, errors, attempts, recordPractice, progress } = store;
  const modules = store.modules.filter(m => m.subjectId === 'os');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));
  const questions = store.questions.filter(q => topics.some(t => t.id === q.topicId));
  
  const [phase, setPhase] = useState<SessionPhase>('START');
  const [mode, setMode] = useState<SessionMode>('PRACTICE');
  const [targetTopicId, setTargetTopicId] = useState<string>('top_intro_fa');
  
  const [sessionAskedIds, setSessionAskedIds] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  const [sessionTotal] = useState(10);
  const [sessionHistory, setSessionHistory] = useState<HistoryItem[]>([]);
  
  // Current Interaction State
  const [userAnswerText, setUserAnswerText] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [examGradingIndex, setExamGradingIndex] = useState(0);

  useEffect(() => {
    if (isInitialized && nextAction?.topicId) {
      setTargetTopicId(nextAction.topicId);
    }
  }, [isInitialized, nextAction]);

  const loadNextQuestion = () => {
    const q = selectNextQuestion(questions, targetTopicId, sessionAskedIds, errors, attempts, mode);
    if (q) {
      if (sessionAskedIds.includes(q.id)) {
        const availableIds = questions.filter(x => x.topicId === targetTopicId).map(x => x.id);
        setSessionAskedIds(prev => prev.filter(id => !availableIds.includes(id)));
      }
      setCurrentQuestion(q);
      setSessionAskedIds(prev => [...prev, q.id]);
      setIsCorrect(null);
      setUserAnswerText('');
      setPhase('QUESTION');
    } else {
      setPhase('COMPLETE');
    }
  };

  const startSession = () => {
    setSessionHistory([]);
    setSessionAskedIds([]);
    loadNextQuestion();
  };

  // User submits answer on QUESTION screen
  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;
    
    if (mode === 'EXAM') {
      setSessionHistory(prev => [...prev, { q: currentQuestion, userAnswer: userAnswerText, correct: null }]);
      if (sessionHistory.length + 1 >= sessionTotal) {
        setExamGradingIndex(0);
        setPhase('EXAM_GRADING');
      } else {
        loadNextQuestion();
      }
      return;
    }

    if (currentQuestion.answerMode === 'MULTIPLE_CHOICE') {
      // Auto eval
      const correct = userAnswerText === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      setPhase('FEEDBACK');
    } else {
      // Self Eval mode
      setPhase('SELF_EVAL');
    }
  };

  const handleIDontKnow = () => {
    setUserAnswerText('I don\'t know');
    setIsCorrect(false);
    if (mode === 'EXAM') {
      setSessionHistory(prev => [...prev, { q: currentQuestion!, userAnswer: "I don't know", correct: false }]);
      if (sessionHistory.length + 1 >= sessionTotal) {
        setExamGradingIndex(0);
        setPhase('EXAM_GRADING');
      } else {
        loadNextQuestion();
      }
    } else {
      setPhase('FEEDBACK');
    }
  };

  const handleSelfEval = (correct: boolean) => {
    setIsCorrect(correct);
    setPhase('FEEDBACK');
  };

  const handleConfidence = async (conf: number) => {
    if (!currentQuestion || isCorrect === null) return;
    
    await recordPractice({
      id: `att_${Date.now()}`,
      questionId: currentQuestion.id,
      topicId: currentQuestion.topicId,
      userAnswer: userAnswerText,
      isCorrect: isCorrect,
      predictedConfidence: conf as ConfidenceLevel,
      errorType: !isCorrect ? 'CONCEPTUAL' : undefined,
      timestamp: Date.now()
    });

    setSessionHistory(prev => [...prev, { q: currentQuestion, userAnswer: userAnswerText, correct: isCorrect, conf }]);

    if (sessionHistory.length + 1 >= sessionTotal) {
      setPhase('COMPLETE');
    } else {
      loadNextQuestion();
    }
  };

  const handleExamGrading = async (correct: boolean, conf: number) => {
    const item = sessionHistory[examGradingIndex];
    if (!item) return;

    await recordPractice({
      id: `att_${Date.now()}`,
      questionId: item.q.id,
      topicId: item.q.topicId,
      userAnswer: item.userAnswer,
      isCorrect: correct,
      predictedConfidence: conf as ConfidenceLevel,
      errorType: !correct ? 'CONCEPTUAL' : undefined,
      timestamp: Date.now()
    });

    const newHistory = [...sessionHistory];
    newHistory[examGradingIndex] = { ...item, correct, conf };
    setSessionHistory(newHistory);

    if (examGradingIndex + 1 >= sessionHistory.length) {
      setPhase('COMPLETE');
    } else {
      setIsCorrect(null);
      setExamGradingIndex(prev => prev + 1);
    }
  };

  if (!isInitialized) return <div className="p-12 text-center text-slate-400">Loading Practice Engine...</div>;

  const topicName = topics.find(t => t.id === targetTopicId)?.title || targetTopicId;
  const topicProgress = progress.find(p => p.topicId === targetTopicId);
  
  const displayQNumber = phase === 'EXAM_GRADING' ? examGradingIndex + 1 : sessionHistory.length + 1;
  const gradedItems = sessionHistory.filter(h => h.correct !== null);
  const sessionAccuracy = gradedItems.length > 0 
    ? Math.round((gradedItems.filter(h => h.correct).length / gradedItems.length) * 100) 
    : 100;

  return (
    <div className="max-w-4xl mx-auto min-h-[85vh] flex flex-col pb-12">
      {/* HEADER */}
      {phase !== 'START' && phase !== 'COMPLETE' && (
        <header className="mb-8 border-b border-slate-800 pb-6 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Theory of Computation</p>
              <h1 className="text-xl font-medium text-slate-200">Module I · {topicName}</h1>
            </div>
            
            <div className="flex gap-6 text-sm font-mono bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="flex flex-col">
                <span className="text-slate-500 text-[10px]">{mode === 'EXAM' && phase === 'QUESTION' ? 'MODE' : 'ACCURACY'}</span>
                <span className="text-slate-300">{mode === 'EXAM' && phase === 'QUESTION' ? 'EXAM' : `${sessionAccuracy}%`}</span>
              </span>
              <span className="flex flex-col"><span className="text-slate-500 text-[10px]">{phase === 'EXAM_GRADING' ? 'GRADING' : 'PROGRESS'}</span><span className="text-slate-300">{displayQNumber} / {sessionTotal}</span></span>
            </div>
          </div>
          
          <div className="w-full bg-slate-900 h-1 mt-6 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(displayQNumber / sessionTotal) * 100}%` }}></div>
          </div>
        </header>
      )}

      <div className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* START SCREEN */}
          {phase === 'START' && (
            <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="border border-slate-800 bg-slate-900/40 p-10 md:p-16 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto w-full text-center">
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">Next Recommended Action</p>
              <h2 className="text-3xl font-light mb-8 text-slate-100">{topicName}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-10 text-left">
                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs font-mono text-slate-500 uppercase">Current Mastery</span>
                  <p className="text-xl font-medium mt-1">{topicProgress?.mastery || 0}%</p>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                  <span className="text-xs font-mono text-slate-500 uppercase">Practice Accuracy</span>
                  <p className="text-xl font-medium mt-1">{Math.round(topicProgress?.practiceAccuracy || 0)}%</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <select className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-3 outline-none focus:border-blue-500 cursor-pointer" value={mode} onChange={e => setMode(e.target.value as SessionMode)}>
                  <option value="PRACTICE">Adaptive Practice</option>
                  <option value="REVISION">Targeted Revision</option>
                  <option value="EXAM">Exam Simulation</option>
                </select>
                <button onClick={startSession} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto">
                  Start Session
                </button>
              </div>
            </motion.div>
          )}

          {/* QUESTION SCREEN */}
          {phase === 'QUESTION' && currentQuestion && (
            <motion.div key="question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded">
                  {currentQuestion.type || 'CONCEPT'}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest bg-slate-800 text-slate-400 border border-slate-700 px-2 py-1 rounded">
                  Difficulty: {currentQuestion.difficulty}/5
                </span>
              </div>

              <div className="border border-slate-800 bg-slate-900/30 p-8 md:p-12 rounded-2xl mb-8 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-slate-100 mb-8">
                  {currentQuestion.text}
                </h2>
                
                {currentQuestion.answerMode === 'MULTIPLE_CHOICE' && currentQuestion.options ? (
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setUserAnswerText(opt)}
                        className={`w-full text-left p-4 rounded-xl border transition-colors ${userAnswerText === opt ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={userAnswerText}
                    onChange={(e) => setUserAnswerText(e.target.value)}
                    placeholder="Type your reasoning or answer here..."
                    className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 outline-none focus:border-blue-500 resize-none"
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button onClick={handleIDontKnow} className="px-6 py-4 rounded-xl font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-300 border border-transparent hover:border-slate-800 transition-all">
                  I don't know
                </button>
                <button onClick={handleSubmitAnswer} disabled={!userAnswerText && currentQuestion.answerMode !== 'MULTIPLE_CHOICE'} className="px-8 py-4 rounded-xl font-medium bg-slate-100 hover:bg-white text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg">
                  {mode === 'EXAM' ? 'Next Question' : 'Submit Answer'}
                </button>
              </div>
            </motion.div>
          )}

          {/* SELF EVALUATION SCREEN */}
          {phase === 'SELF_EVAL' && currentQuestion && (
            <motion.div key="selfeval" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-6">
              <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl">
                <div className="mb-8">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">You provided:</span>
                  <p className="text-lg font-light text-slate-300 italic">"{userAnswerText}"</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-2 block">Expected Answer:</span>
                  <p className="text-xl font-medium text-slate-100">{currentQuestion.correctAnswer}</p>
                </div>
              </div>
              <div className="text-center py-4">
                <h3 className="text-xl font-light mb-6">Was your answer correct?</h3>
                <div className="flex justify-center gap-4">
                  <button onClick={() => handleSelfEval(false)} className="px-8 py-4 rounded-xl font-medium border border-red-500/50 text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors">
                    <XCircle className="w-5 h-5"/> Incorrect
                  </button>
                  <button onClick={() => handleSelfEval(true)} className="px-8 py-4 rounded-xl font-medium border border-green-500/50 text-green-400 hover:bg-green-500/10 flex items-center gap-2 transition-colors">
                    <CheckCircle2 className="w-5 h-5"/> Correct
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* FEEDBACK SCREEN */}
          {phase === 'FEEDBACK' && currentQuestion && (
            <motion.div key="feedback" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full space-y-6">
              
              <div className={`p-6 rounded-2xl border ${isCorrect ? 'bg-green-950/20 border-green-900/50' : 'bg-red-950/20 border-red-900/50'} flex flex-col md:flex-row items-start gap-4`}>
                {isCorrect ? <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" /> : <XCircle className="w-8 h-8 text-red-500 shrink-0" />}
                <div className="w-full">
                  <h3 className={`text-xl font-medium mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? 'CORRECT' : 'NOT QUITE'}
                  </h3>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50 mb-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Your Answer</span>
                    <p className="text-sm text-slate-300">"{userAnswerText}"</p>
                  </div>
                  {!isCorrect && (
                    <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Expected Answer</span>
                      <p className="text-sm text-slate-300">{currentQuestion.correctAnswer}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Why?</span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentQuestion.explanation || 'Explanation not authored yet.'}
                  </p>
                </div>

                {!isCorrect && (
                  <div className="bg-red-950/20 p-4 rounded-xl border border-red-900/30">
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3"/> Common Mistake
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {currentQuestion.commonMistake || 'Common mistake pattern not authored yet.'}
                    </p>
                  </div>
                )}
                
                <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800/50">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <BrainCircuit className="w-3 h-3"/> Key Idea
                  </span>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {currentQuestion.keyConcept || 'Key concept not explicitly mapped yet.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={() => setPhase('CONFIDENCE')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium transition-colors">
                  Continue <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            </motion.div>
          )}

          {/* CONFIDENCE SCREEN */}
          {phase === 'CONFIDENCE' && (
            <motion.div key="conf" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-xl mx-auto py-12">
              <h2 className="text-3xl font-light mb-8">How confident were you?</h2>
              <p className="text-slate-400 mb-10">This helps the adaptive engine schedule your next review.</p>
              
              <div className="flex justify-between gap-2 md:gap-4 mb-6">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button key={level} onClick={() => handleConfidence(level)} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center transition-all group">
                    <span className="text-xl font-medium text-slate-400 group-hover:text-blue-400">{level}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between text-xs font-mono text-slate-500 px-2 uppercase tracking-widest">
                <span>Very Unsure</span>
                <span>Very Confident</span>
              </div>
            </motion.div>
          )}

          {/* EXAM GRADING SCREEN */}
          {phase === 'EXAM_GRADING' && sessionHistory[examGradingIndex] && (
            <motion.div key="exam_grading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-light">Exam Review</h2>
                <p className="text-slate-400">Grade your answers to compute final score.</p>
              </div>

              <div className="border border-slate-800 bg-slate-900/50 p-8 rounded-2xl">
                <p className="text-sm text-slate-400 mb-6">{sessionHistory[examGradingIndex].q.text}</p>
                <div className="mb-8">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">You provided:</span>
                  <p className="text-lg font-light text-slate-300 italic">"{sessionHistory[examGradingIndex].userAnswer}"</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-2 block">Expected Answer:</span>
                  <p className="text-xl font-medium text-slate-100">{sessionHistory[examGradingIndex].q.correctAnswer}</p>
                </div>
              </div>
              
              <div className="text-center py-4">
                <h3 className="text-xl font-light mb-6">Was your answer correct?</h3>
                <div className="flex justify-center gap-4 mb-8">
                  <button onClick={() => setIsCorrect(false)} className={`px-8 py-4 rounded-xl font-medium border transition-colors flex items-center gap-2 ${isCorrect === false ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-red-500/50 text-red-400 hover:bg-red-500/10'}`}>
                    <XCircle className="w-5 h-5"/> Incorrect
                  </button>
                  <button onClick={() => setIsCorrect(true)} className={`px-8 py-4 rounded-xl font-medium border transition-colors flex items-center gap-2 ${isCorrect === true ? 'bg-green-500/20 border-green-500 text-green-400' : 'border-green-500/50 text-green-400 hover:bg-green-500/10'}`}>
                    <CheckCircle2 className="w-5 h-5"/> Correct
                  </button>
                </div>
                
                {isCorrect !== null && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Confidence level when answering?</h3>
                    <div className="flex justify-center gap-2 md:gap-4">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button key={level} onClick={() => handleExamGrading(isCorrect, level)} className="w-10 h-10 rounded-full border border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center transition-all group">
                          <span className="text-sm font-medium text-slate-400 group-hover:text-blue-400">{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* COMPLETE SCREEN */}
          {phase === 'COMPLETE' && (
            <motion.div key="complete" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto py-12">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-4xl font-light mb-2">Session Complete</h2>
              <p className="text-slate-400 mb-12">Adaptive practice session finished and synced to database.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Questions</span>
                  <p className="text-2xl font-medium mt-1">{sessionHistory.length}</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Correct</span>
                  <p className="text-2xl font-medium mt-1 text-green-400">{sessionHistory.filter(h => h.correct).length}</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Accuracy</span>
                  <p className="text-2xl font-medium mt-1">{sessionAccuracy}%</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Avg Conf</span>
                  <p className="text-2xl font-medium mt-1 text-blue-400">
                    {(sessionHistory.reduce((acc, h) => acc + (h.conf || 0), 0) / (sessionHistory.length || 1)).toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => window.location.href = `/os/topic/${targetTopicId}`} className="px-6 py-3 rounded-lg font-medium bg-slate-900 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-colors text-slate-300">
                  Return to Topic
                </button>
                <button onClick={startSession} className="px-6 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-500 transition-colors text-white">
                  Practice Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
