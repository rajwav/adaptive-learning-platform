'use client';

import { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronRight, Activity, ArrowRight, Target } from 'lucide-react';
import { useLearningStore } from '@/store/useLearningStore';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SyllabusPage() {
  const { isInitialized, modules: allModules, topics: allTopics, progress } = useLearningStore();
  const modules = allModules.filter(m => m.subjectId === 'os');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = allTopics.filter(t => moduleIds.has(t.moduleId));
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({'mod_1': true});

  if (!isInitialized) return <div className="p-12 text-center text-slate-400">Loading Syllabus...</div>;

  const toggleModule = (id: string) => setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));

  const workflowItems = ['understand', 'explain', 'solveBasic', 'solveExam'];

  const getTopicStatusBadge = (status: string) => {
    switch (status) {
      case 'MASTERED': return <span className="text-[10px] px-2 py-0.5 bg-yellow-950/50 text-yellow-500 border border-yellow-900/50 rounded font-mono font-bold tracking-widest">★ MASTERED</span>;
      case 'COMPLETED': return <span className="text-[10px] px-2 py-0.5 bg-green-950/50 text-green-400 border border-green-900/50 rounded font-mono font-bold tracking-widest">✓ COMPLETED</span>;
      case 'LEARNING':
      case 'PRACTICING':
      case 'REVIEWING': return <span className="text-[10px] px-2 py-0.5 bg-blue-950/50 text-blue-400 border border-blue-900/50 rounded font-mono font-bold tracking-widest">◉ LEARNING</span>;
      default: return <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded font-mono font-bold tracking-widest">○ NOT STARTED</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-light mb-2 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-500" />
          Master Syllabus
        </h1>
        <p className="text-slate-400">Official OS curriculum and learning status.</p>
      </header>

      <div className="space-y-6">
        {modules.sort((a,b) => a.order - b.order).map(mod => {
          const modTopics = topics.filter(t => t.moduleId === mod.id).sort((a,b) => a.order - b.order);
          const isExpanded = !!expandedModules[mod.id];
          
          let completedTopics = 0;
          let masteredTopics = 0;
          
          modTopics.forEach(t => {
            const p = progress.find(x => x.topicId === t.id);
            if (p?.status === 'COMPLETED' || p?.status === 'MASTERED') completedTopics++;
            if (p?.status === 'MASTERED') masteredTopics++;
          });

          const learningProgress = modTopics.length > 0 ? Math.round((completedTopics / modTopics.length) * 100) : 0;
          const masteryProgress = modTopics.length > 0 ? Math.round((masteredTopics / modTopics.length) * 100) : 0;

          return (
            <div key={mod.id} className="border border-slate-800 bg-slate-900/20 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between p-6 bg-slate-900/50 hover:bg-slate-900 transition-colors text-left"
              >
                <div>
                  <h2 className="text-xl font-medium text-slate-200">{mod.description} — {mod.title}</h2>
                  <div className="flex gap-6 mt-3 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-2"><Activity className="w-3 h-3 text-blue-400"/> Workflow: {learningProgress}%</span>
                    <span className="flex items-center gap-2"><Target className="w-3 h-3 text-green-400"/> Mastery: {masteryProgress}%</span>
                  </div>
                </div>
                {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-500"/> : <ChevronRight className="w-5 h-5 text-slate-500"/>}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="p-2 space-y-2 bg-slate-950/50">
                      {modTopics.map((topic, index) => {
                        const p = progress.find(x => x.topicId === topic.id);
                        const status = p?.status || 'NOT_STARTED';
                        const mastery = p?.mastery || 0;
                        
                        let checkedCount = 0;
                        if (p && p.checklist) {
                          const checklist = p.checklist;
                          workflowItems.forEach(wi => {
                            if (checklist[wi as keyof typeof checklist]) checkedCount++;
                          });
                        }
                        const topicWorkflowPercent = Math.round((checkedCount / workflowItems.length) * 100);

                        return (
                          <div key={topic.id} className="border border-slate-800/50 bg-slate-900 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-slate-500 font-mono text-xs">{index + 1}.</span>
                                <h3 className="font-medium text-slate-300">{topic.title}</h3>
                                {getTopicStatusBadge(status)}
                              </div>
                              <div className="flex gap-6 text-[10px] font-mono text-slate-500 uppercase ml-7">
                                <span>Workflow {topicWorkflowPercent}%</span>
                                <span>Mastery {mastery}%</span>
                              </div>
                            </div>
                            
                            <div className="ml-7 sm:ml-0 shrink-0">
                              <Link href={`/os/topic/${topic.id}`} className="inline-flex items-center gap-2 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors border border-slate-700 hover:border-blue-500">
                                Open Topic <ArrowRight className="w-3 h-3"/>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
