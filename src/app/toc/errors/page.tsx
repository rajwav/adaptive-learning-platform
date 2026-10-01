'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, Brain, Activity, RefreshCw } from 'lucide-react';
import { useLearningStore } from '@/store/useLearningStore';
import { ErrorType } from '@/types';

export default function ErrorLab() {
  const store = useLearningStore();
  const { errors, updateErrorType, isInitialized } = store;
  const modules = store.modules.filter(m => m.subjectId === 'sub_toc');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));
  const [selectedError, setSelectedError] = useState<string | null>(null);

  if (!isInitialized) return <div className="p-12 text-center text-slate-400">Loading Engine...</div>;

  // Analysis
  const getTopicName = (id: string) => topics.find(t => t.id === id)?.title || id;

  const errorsByTopic = errors.reduce((acc, err) => {
    acc[err.topicId] = (acc[err.topicId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const repeatedTopicIds = Object.entries(errorsByTopic).filter(([_, count]) => count >= 3).map(([id]) => id);
  
  const highConfidenceErrors = errors.filter(e => e.predictedConfidence >= 4).length;

  return (
    <div className="space-y-12">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-light mb-2 flex items-center gap-3">
          <AlertOctagon className="w-8 h-8 text-red-500" />
          Error Lab
        </h1>
        <p className="text-slate-400">Understand where your learning breaks down.</p>
      </header>

      {/* OVERVIEW STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <p className="text-4xl font-light text-slate-100">{errors.length}</p>
          <p className="text-xs font-mono text-slate-500 uppercase mt-2">Total Errors</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <p className="text-4xl font-light text-orange-400">{repeatedTopicIds.length}</p>
          <p className="text-xs font-mono text-slate-500 uppercase mt-2">Repeated Topic Errors</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <p className="text-4xl font-light text-blue-400">{highConfidenceErrors}</p>
          <p className="text-xs font-mono text-slate-500 uppercase mt-2">High-Confidence Errors</p>
        </div>
      </div>

      {/* REPEATED ERROR DETECTION */}
      {repeatedTopicIds.length > 0 && (
        <section className="bg-orange-950/20 border border-orange-900/30 rounded-2xl p-6">
          <h2 className="text-sm font-mono text-orange-400 mb-4 tracking-widest uppercase flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Repeated Difficulty Detected
          </h2>
          <div className="space-y-4">
            {repeatedTopicIds.map(topicId => (
              <div key={topicId} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-200">{getTopicName(topicId)}</h3>
                  <p className="text-sm text-slate-400">{errorsByTopic[topicId]} recent incorrect answers</p>
                </div>
                <button className="bg-slate-800 hover:bg-slate-700 text-sm px-4 py-2 rounded-lg">Practice Topic</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ERROR RECORDS */}
      <section>
        <h2 className="text-sm font-mono text-slate-500 mb-4 tracking-widest uppercase">Error History</h2>
        
        {errors.length === 0 ? (
          <div className="border border-slate-800/60 border-dashed rounded-2xl p-12 text-center text-slate-500">
            <Activity className="w-8 h-8 mx-auto mb-4 opacity-50" />
            <p>Your error lab is quiet.</p>
            <p className="text-sm mt-1">No recorded mistakes yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {errors.slice().reverse().map(err => (
              <div key={err.id} className="border border-slate-800 bg-slate-900/40 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{getTopicName(err.topicId)}</span>
                  <span className="text-xs text-slate-500">{new Date(err.timestamp).toLocaleTimeString()}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-xs text-slate-500 mb-1">Your Answer</h4>
                    <p className="text-red-400 line-through">{err.userAnswer}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 mb-1">Correct Answer</h4>
                    <p className="text-green-400">{err.correctAnswer}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/50 pt-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">Confidence: {err.predictedConfidence}/5</span>
                    </div>
                    {err.predictedConfidence >= 4 && (
                      <span className="text-xs text-orange-400 bg-orange-950/20 px-2 py-1 rounded">Possible Overconfidence</span>
                    )}
                  </div>
                  
                  <div className="relative">
                    <select 
                      value={err.errorType || 'UNKNOWN'}
                      onChange={(e) => updateErrorType(err.id, e.target.value as ErrorType)}
                      className="bg-slate-950 border border-slate-700 text-xs rounded p-1.5 text-slate-300 focus:outline-none focus:border-blue-500"
                    >
                      <option value="CONCEPTUAL">Conceptual</option>
                      <option value="PROCEDURAL">Procedural</option>
                      <option value="CALCULATION">Calculation</option>
                      <option value="MEMORY">Memory</option>
                      <option value="MISREADING">Misreading</option>
                      <option value="CARELESS">Careless</option>
                      <option value="UNKNOWN">Unknown</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
