'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target as TargetIcon, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLearningStore } from '@/store/useLearningStore';
import { Target } from '@/types';

export default function TargetsCenter() {
  const store = useLearningStore();
  const { targets: allTargets, progress, updateTarget, deleteTarget, isInitialized } = store;
  const modules = store.modules.filter(m => m.subjectId === 'os');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));
  const targets = allTargets; // keeping original behavior
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isInitialized) return <div className="p-12 text-center text-slate-400">Loading Engine...</div>;

  // Dynamic progress calculation helper
  const calculateDynamicProgress = (t: Target) => {
    let current = 0;
    
    if (t.type === 'TOPIC' && t.topicIds) {
      // Check mastery of selected topics
      const mastered = t.topicIds.filter(id => {
        const p = progress.find(pr => pr.topicId === id);
        return p && p.mastery >= (t.targetValue || 90);
      });
      current = mastered.length;
      return { current, total: t.topicIds.length, percent: Math.round((current / t.topicIds.length) * 100) || 0 };
    }
    
    if (t.type === 'MODULE' && t.moduleId) {
      // Check mastery of topics in module
      const modTopics = topics.filter(top => top.moduleId === t.moduleId);
      const mastered = modTopics.filter(top => {
        const p = progress.find(pr => pr.topicId === top.id);
        return p && p.mastery >= (t.targetValue || 90);
      });
      current = mastered.length;
      return { current, total: modTopics.length, percent: Math.round((current / modTopics.length) * 100) || 0 };
    }

    if (t.type === 'SUBJECT') {
      const mastered = progress.filter(p => p.mastery >= (t.targetValue || 90)).length;
      return { current: mastered, total: topics.length, percent: Math.round((mastered / topics.length) * 100) || 0 };
    }

    return { current: t.currentValue, total: t.targetValue, percent: Math.round((t.currentValue / t.targetValue) * 100) || 0 };
  };

  const activeTargets = targets.filter(t => t.status === 'ACTIVE');
  const completedTargets = targets.filter(t => t.status === 'COMPLETED');

  // Intelligent Deadline pace analysis
  const getPaceAnalysis = (t: Target, progressPercent: number) => {
    if (!t.deadline || t.status === 'COMPLETED') return null;
    const daysLeft = Math.max(1, Math.round((t.deadline - Date.now()) / 86400000));
    const remainingPercent = 100 - progressPercent;
    if (remainingPercent <= 0) return { ok: true, msg: 'Target met' };
    
    const requiredPace = remainingPercent / daysLeft;
    // rough heuristic: if they need more than 20% a day, they're behind
    if (requiredPace > 20) return { ok: false, msg: 'Current pace is below the required pace to reach this target.' };
    return { ok: true, msg: 'Pace is sufficient.' };
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-light mb-2 flex items-center gap-3">
            <TargetIcon className="w-8 h-8 text-blue-500" />
            Target Center
          </h1>
          <p className="text-slate-400">Manage and track your learning objectives.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Target
        </button>
      </header>

      {/* ACTIVE TARGETS */}
      <section>
        <h2 className="text-sm font-mono text-slate-500 mb-4 tracking-widest uppercase">Active Targets</h2>
        
        {activeTargets.length === 0 ? (
          <div className="border border-slate-800/60 border-dashed rounded-2xl p-12 text-center text-slate-500">
            <TargetIcon className="w-8 h-8 mx-auto mb-4 opacity-50" />
            <p>You haven't created a target yet.</p>
            <button onClick={() => setIsModalOpen(true)} className="mt-4 text-blue-400 hover:text-blue-300 underline underline-offset-4">Create your first target</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTargets.map(t => {
              const { current, total, percent } = calculateDynamicProgress(t);
              const pace = getPaceAnalysis(t, percent);
              
              return (
                <div key={t.id} className="border border-slate-800 bg-slate-900/40 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-slate-200">{t.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{t.description}</p>
                    </div>
                    {t.deadline && (
                      <div className="flex items-center gap-1 text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-400 border border-slate-800">
                        <Clock className="w-3 h-3" />
                        {Math.round((t.deadline - Date.now()) / 86400000)}d
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 mb-2 flex justify-between text-xs font-mono text-slate-400">
                    <span>{current} / {total} {t.unit}</span>
                    <span className="text-blue-400">{percent}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${Math.min(100, percent)}%`}}></div>
                  </div>

                  {pace && !pace.ok && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-orange-400 bg-orange-950/20 p-2 rounded border border-orange-900/30">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {pace.msg}
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-slate-800/50 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => deleteTarget(t.id)} className="text-xs text-slate-500 hover:text-red-400">Delete</button>
                    {percent >= 100 && (
                      <button onClick={() => updateTarget({...t, status: 'COMPLETED'})} className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded">Mark Completed</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* COMPLETED TARGETS */}
      {completedTargets.length > 0 && (
        <section className="opacity-70">
          <h2 className="text-sm font-mono text-slate-500 mb-4 tracking-widest uppercase">Completed Targets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {completedTargets.map(t => (
              <div key={t.id} className="border border-green-900/30 bg-green-950/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-300">{t.title}</h3>
                  <span className="text-xs text-green-400 flex items-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3"/> Achieved</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODAL PLACEHOLDER (simplified for this demo) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-light mb-6">Create Target</h2>
              <p className="text-sm text-slate-400 mb-6">In a full production version, this would be a multi-step form to configure subject, modules, thresholds, and deadlines.</p>
              
              <button 
                onClick={() => {
                  updateTarget({
                    id: `tar_${Date.now()}`,
                    title: 'Master Module I',
                    description: 'All Module I topics mastered to 90%',
                    type: 'MODULE',
                    moduleId: 'mod_1',
                    priority: 'HIGH',
                    targetValue: 90,
                    currentValue: 0,
                    unit: 'topics',
                    status: 'ACTIVE',
                    deadline: Date.now() + 86400000 * 7, // 7 days
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                  });
                  setIsModalOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg mb-3"
              >
                Create Dummy Target
              </button>
              <button onClick={() => setIsModalOpen(false)} className="w-full border border-slate-700 hover:bg-slate-800 text-slate-300 py-3 rounded-lg">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
