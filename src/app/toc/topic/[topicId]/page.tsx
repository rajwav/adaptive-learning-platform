'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, BookOpen, Clock, AlertTriangle, Target, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useLearningStore } from '@/store/useLearningStore';
import { getTopicContent } from '@/lib/content';
import DfaSimulator from '@/components/simulator/DfaSimulator';
import { TopicStatus } from '@/types';

export default function TopicPage() {
  const { topicId } = useParams() as { topicId: string };
  const router = useRouter();
  
  const { isInitialized, topics, progress, updateTopicStatus, updateTopicChecklist, updateTopicNotes } = useLearningStore();
  
  const [examMode, setExamMode] = useState(false);
  const [checklist, setChecklist] = useState({
    understand: false,
    explain: false,
    solveBasic: false,
    solveExam: false
  });
  const [learningConfidence, setLearningConfidence] = useState(0);
  const [notes, setNotes] = useState('');
  const [notesTemp, setNotesTemp] = useState('');

  useEffect(() => {
    if (isInitialized) {
      const p = progress.find(x => x.topicId === topicId);
      if (p) {
        if (p.checklist) {
          setChecklist({
            understand: p.checklist.understand || false,
            explain: p.checklist.explain || false,
            solveBasic: p.checklist.solveBasic || false,
            solveExam: p.checklist.solveExam || false
          });
        }
        setNotes(p.notes || '');
        
        // If not started, move to LEARNING immediately upon opening
        if (p.status === 'NOT_STARTED') {
          updateTopicStatus(topicId, 'LEARNING');
        }
      }
    }
  }, [isInitialized, topicId, progress, updateTopicStatus]);

  const handleNotesBlur = () => {
    if (notesTemp !== notes) {
      setNotes(notesTemp);
      updateTopicNotes(topicId, notesTemp);
    }
  };

  const handleChecklistToggle = async (key: keyof typeof checklist, checked: boolean) => {
    const next = { ...checklist, [key]: checked };
    setChecklist(next);
    await updateTopicChecklist(topicId, next);
  };

  if (!isInitialized) return <div className="p-12 text-slate-400">Loading topic...</div>;

  const topicIndex = topics.findIndex(t => t.id === topicId);
  const topic = topics[topicIndex];
  
  if (!topic) {
    return <div className="p-12 text-red-400">Topic not found.</div>;
  }

  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;
  const content = getTopicContent(topicId);
  const p = progress.find(x => x.topicId === topicId);
  const status = p?.status || 'LEARNING';
  const mastery = p?.mastery || 0;

  const checklistItems = [
    { id: 'understand', label: '1. Learn concept' },
    { id: 'explain', label: '2. Understand formal definition' },
    { id: 'solveBasic', label: '3. Study examples' },
    { id: 'solveExam', label: '4. Practice questions' }
  ];
  
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const workflowPercent = Math.round((checkedCount / checklistItems.length) * 100);
  const isWorkflowComplete = checkedCount === checklistItems.length;

  const handleToggleComplete = async () => {
    if (status === 'COMPLETED' || status === 'MASTERED') {
      await updateTopicStatus(topicId, 'LEARNING');
    } else {
      await updateTopicStatus(topicId, 'COMPLETED');
    }
  };

  const getStatusBadge = () => {
    if (status === 'MASTERED') return <span className="px-3 py-1 bg-yellow-950/50 text-yellow-500 border border-yellow-900/50 rounded-full text-xs font-mono font-bold tracking-widest">★ MASTERED</span>;
    if (status === 'COMPLETED') return <span className="px-3 py-1 bg-green-950/50 text-green-400 border border-green-900/50 rounded-full text-xs font-mono font-bold tracking-widest">✓ COMPLETED</span>;
    if (status === 'LEARNING' || status === 'PRACTICING' || status === 'REVIEWING') return <span className="px-3 py-1 bg-blue-950/50 text-blue-400 border border-blue-900/50 rounded-full text-xs font-mono font-bold tracking-widest">◉ LEARNING</span>;
    return <span className="px-3 py-1 bg-slate-800 text-slate-400 border border-slate-700 rounded-full text-xs font-mono font-bold tracking-widest">○ NOT STARTED</span>;
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-8">
        <Link href="/toc" className="hover:text-blue-400 transition-colors">TOC</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/toc/syllabus" className="hover:text-blue-400 transition-colors">Syllabus</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-300 truncate max-w-[200px]">{topic.title}</span>
      </nav>

      <header className="mb-12 border-b border-slate-800 pb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-light text-slate-100 mb-4">{topic.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              {getStatusBadge()}
            </div>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
              {topic.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-64 shrink-0 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-500 uppercase mb-1">
                <span>Workflow</span>
                <span className="text-slate-300">{workflowPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${workflowPercent}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-500 uppercase mb-1">
                <span>Mastery</span>
                <span className="text-slate-300">{mastery}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${mastery}%` }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-1 rounded-lg">
          <button onClick={() => setExamMode(false)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!examMode ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'}`}>Study Mode</button>
          <button onClick={() => setExamMode(true)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${examMode ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'}`}>Exam Focus</button>
        </div>
        
        <Link href="/toc/practice" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Target className="w-4 h-4"/> Practice Topic
        </Link>
      </div>

      <main className="space-y-16">
        {!content || !content.hasContent ? (
          <div className="p-12 border border-slate-800 rounded-2xl bg-slate-900/30 text-center">
            <Clock className="w-8 h-8 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">Content Under Development</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              The detailed syllabus content for this topic is currently being authored. 
              You can still practice questions related to this topic in the Practice Engine.
            </p>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-500">
            <section>
              <h2 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-4">Core Concept</h2>
              <div className="text-lg text-slate-200 leading-relaxed font-light">
                {content.intuition || content.overview}
              </div>
            </section>

            {content.formal && (
              <section>
                <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Formal Definition</h2>
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-blue-200">
                  {content.formal}
                </div>
              </section>
            )}

            {!examMode && content.workedExamples && content.workedExamples.length > 0 && (
              <section>
                <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Worked Examples</h2>
                <div className="space-y-6">
                  {content.workedExamples.map((ex, idx) => (
                    <div key={idx} className="border border-slate-800 rounded-xl p-6 bg-slate-900/30">
                      <h3 className="font-mono text-xs text-slate-500 uppercase mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-400"/> Problem {idx + 1}
                      </h3>
                      <p className="text-slate-300 mb-6 font-medium">{ex.problem}</p>
                      
                      <div className="pl-4 border-l-2 border-blue-900/50 space-y-4">
                        <h4 className="text-xs font-mono text-slate-500 uppercase">Solution</h4>
                        <div className="text-slate-400 whitespace-pre-wrap font-mono text-sm">{ex.solution}</div>
                        
                        {ex.explanation && (
                          <div className="mt-4 bg-blue-950/20 text-blue-200/70 p-4 rounded-lg text-sm border border-blue-900/30">
                            <strong>Note:</strong> {ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!examMode && content.commonMistakes && content.commonMistakes.length > 0 && (
              <section>
                <h2 className="text-sm font-mono text-red-400 uppercase tracking-widest mb-4">Common Mistakes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.commonMistakes.map((m, i) => (
                    <div key={i} className="border border-red-900/30 bg-red-950/10 p-5 rounded-xl">
                      <p className="font-medium text-red-300 mb-2">{m.mistake}</p>
                      <p className="text-sm text-slate-400">{m.fix}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!examMode && topicId === 'top_dfa_diagram' && (
              <section className="pt-8">
                <h2 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-4">Interactive Laboratory</h2>
                <p className="text-slate-400 text-sm mb-6">Explore how a deterministic finite automaton processes a string mathematically.</p>
                <DfaSimulator />
              </section>
            )}
          </div>
        )}

        <section className="border border-slate-800 bg-slate-900/40 rounded-2xl p-8">
          <h2 className="text-xl font-light mb-6">Learning Workflow</h2>
          
          <div className="space-y-3 mb-8">
            {checklistItems.map(item => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  checklist[item.id as keyof typeof checklist] ? 'bg-blue-500 border-blue-500' : 'border-slate-600 group-hover:border-blue-400'
                }`}>
                  {checklist[item.id as keyof typeof checklist] && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${checklist[item.id as keyof typeof checklist] ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {item.label}
                </span>
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={checklist[item.id as keyof typeof checklist]}
                  onChange={(e) => handleChecklistToggle(item.id as keyof typeof checklist, e.target.checked)}
                />
              </label>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800 pt-6">
            <div className="text-sm text-slate-400">
              {status === 'COMPLETED' || status === 'MASTERED' ? (
                <span className="text-green-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> You have completed this topic's workflow.</span>
              ) : isWorkflowComplete ? (
                <div>
                  <span className="text-blue-400 block">Workflow requirements met. You can mark this topic as completed.</span>
                  {mastery > 0 && <span className="text-xs text-slate-500 italic block mt-1">Topic reopened for further study. Previous mastery data is preserved.</span>}
                </div>
              ) : (
                <div>
                  <span className="block">Complete the required learning steps first to mark this topic complete.</span>
                  {mastery > 0 && <span className="text-xs text-slate-500 italic block mt-1">Topic reopened for further study. Previous mastery data is preserved.</span>}
                </div>
              )}
            </div>
            
            {status === 'COMPLETED' || status === 'MASTERED' ? (
              <button 
                onClick={handleToggleComplete}
                className="w-full md:w-auto px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4"/> Reopen Topic
              </button>
            ) : (
              <button 
                onClick={handleToggleComplete}
                disabled={!isWorkflowComplete}
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all"
              >
                Mark Topic Complete
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="flex items-center justify-between border-t border-slate-800 pt-8 mt-16">
        {prevTopic ? (
          <Link href={`/toc/topic/${prevTopic.id}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{prevTopic.title}</span>
          </Link>
        ) : <div />}
        
        {nextTopic ? (
          <Link href={`/toc/topic/${nextTopic.id}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-right">
            <span className="text-sm">{nextTopic.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </footer>
    </div>
  );
}
