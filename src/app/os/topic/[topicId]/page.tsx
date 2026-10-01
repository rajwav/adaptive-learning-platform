'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, BookOpen, Clock, AlertTriangle, Target, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import OsDiagrams from '@/components/OsDiagrams';
import { useLearningStore } from '@/store/useLearningStore';
import { getTopicContent } from '@/lib/content';
import OsLaboratoryRegistry from '@/components/simulator/os/OsLaboratoryRegistry';
import { TopicStatus } from '@/types';

export default function TopicPage() {
  const { topicId } = useParams() as { topicId: string };
  const router = useRouter();

  const store = useLearningStore();
  const { isInitialized, progress, updateTopicStatus, updateTopicChecklist, updateTopicNotes } = store;
  const modules = store.modules.filter(m => m.subjectId === 'os');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));

  const [examMode, setExamMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [learningConfidence, setLearningConfidence] = useState(0);
  const [notes, setNotes] = useState('');
  const [notesTemp, setNotesTemp] = useState('');

  useEffect(() => {
    if (isInitialized) {
      const p = progress.find(x => x.topicId === topicId);
      if (p) {

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
        <Link href="/os" className="hover:text-blue-400 transition-colors">OS</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/os/syllabus" className="hover:text-blue-400 transition-colors">Syllabus</Link>
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
                <span className="text-slate-300">{isComplete ? 100 : 0}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${isComplete ? 100 : 0}%` }} />
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

        <Link href="/os/practice" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
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

            <OsDiagrams topicId={topicId as string} />

            {content.labIntegrationPrompt && (
              <section className="bg-blue-950/20 p-6 rounded-2xl border border-blue-900/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-900/50 rounded-xl text-blue-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Laboratory Activity</h2>
                    <p className="text-slate-300 leading-relaxed">{content.labIntegrationPrompt}</p>
                  </div>
                </div>
              </section>
            )}


            {content.formal && (
              <section>
                <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Formal Definition</h2>
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto text-blue-200">
                  {content.formal}
                </div>
              </section>
            )}


            {content.variants && content.variants.length > 0 && (
              <div className="space-y-8">
                {content.variants.map((variant, vIdx) => (
                  <section key={vIdx} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                    <h2 className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-4">Variant: {variant.variantName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {variant.selectionRule && (
                        <div>
                          <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Selection Rule</h3>
                          <p className="text-slate-300">{variant.selectionRule}</p>
                        </div>
                      )}
                      {variant.preemptionBehavior && (
                        <div>
                          <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Preemption</h3>
                          <p className="text-slate-300">{variant.preemptionBehavior}</p>
                        </div>
                      )}
                    </div>
                    {variant.ganttChartProcedure && (
                      <div className="mt-6 pt-6 border-t border-slate-800">
                        <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Procedure</h3>
                        <ul className="space-y-2">
                          {variant.ganttChartProcedure.map((step, idx) => (
                            <li key={idx} className="text-slate-300 text-sm flex gap-3">
                              <span className="text-purple-500 opacity-50 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                              {step.replace(/^\d+\.\s*/, '')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}

{(content.selectionRule || content.preemptionBehavior || content.metricsFormulas) && (
              <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h2 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-4">Algorithm Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.selectionRule && (
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Selection Rule</h3>
                      <p className="text-slate-300">{content.selectionRule}</p>
                    </div>
                  )}
                  {content.preemptionBehavior && (
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Preemption</h3>
                      <p className="text-slate-300">{content.preemptionBehavior}</p>
                    </div>
                  )}
                  {content.whenItIsUsed && (
                    <div className="md:col-span-2">
                      <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">When to Use</h3>
                      <p className="text-slate-300">{content.whenItIsUsed}</p>
                    </div>
                  )}
                </div>
                {content.metricsFormulas && (
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Metrics & Formulas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm">
                      {Object.entries(content.metricsFormulas).map(([key, val]) => (
                        <div key={key} className="bg-slate-950 p-3 rounded border border-slate-800">
                          <span className="text-green-400 font-bold">{key}:</span> <span className="text-slate-400">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {content.ganttChartProcedure && (
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Procedure</h3>
                    <ul className="space-y-2">
                      {content.ganttChartProcedure.map((step, idx) => (
                        <li key={idx} className="text-slate-300 text-sm flex gap-3">
                          <span className="text-blue-500 opacity-50 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                          {step.replace(/^d+.s*/, '')}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}


            {content.detailedExplanation && (
              <section>
                <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Detailed Explanation</h2>
                <div className="text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {content.detailedExplanation}
                </div>
              </section>
            )}

            {content.keyPoints && content.keyPoints.length > 0 && (
              <section>
                <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Key Points</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  {content.keyPoints.map((point, idx) => (
                    <li key={idx} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
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

            {!examMode && (
              <section className="pt-8">
                <OsLaboratoryRegistry topicId={topicId} />
              </section>
            )}
          </div>
        )}

        <section className="border border-slate-800 bg-slate-900/40 rounded-2xl p-8">
          <h2 className="text-xl font-light mb-6">Learning Workflow</h2>



          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-800 pt-6">
            <div className="text-sm text-slate-400">
              {status === 'COMPLETED' || status === 'MASTERED' ? (
                <span className="text-green-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> You have completed this topic's workflow.</span>
              ) : isComplete ? (
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
                disabled={false}
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
          <Link href={`/os/topic/${prevTopic.id}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{prevTopic.title}</span>
          </Link>
        ) : <div />}

        {nextTopic ? (
          <Link href={`/os/topic/${nextTopic.id}`} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-right">
            <span className="text-sm">{nextTopic.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </footer>
    </div>
  );
}
