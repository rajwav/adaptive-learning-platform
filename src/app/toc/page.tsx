'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Activity, Calendar, Compass, Share2, AlertOctagon, Target as TargetIcon, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useLearningStore } from '@/store/useLearningStore';

export default function TOCDashboard() {
  const { isInitialized, topics, modules, progress, nextAction, errors, targets } = useLearningStore();

  if (!isInitialized) return <div className="p-12 text-center text-slate-400">Loading Engine...</div>;

  // OVERALL PROGRESS
  const startedTopics = progress.filter(p => p.status !== 'NOT_STARTED').length;
  const completedTopics = progress.filter(p => p.status === 'COMPLETED' || p.status === 'MASTERED').length;
  const masteredTopics = progress.filter(p => p.status === 'MASTERED').length;
  
  // WHAT REMAINS
  const remainsByModule = modules.map(m => {
    const modTopics = topics.filter(t => t.moduleId === m.id);
    const incomplete = modTopics.filter(t => {
      const p = progress.find(x => x.topicId === t.id);
      return !p || (p.status !== 'COMPLETED' && p.status !== 'MASTERED');
    });
    return { title: m.description, remaining: incomplete.length };
  }).filter(m => m.remaining > 0);

  // NEXT SYLLABUS ITEM logic
  let recommendedTopicId = nextAction?.topicId;
  let recommendedReason = nextAction?.reason[0];
  let isCurriculumProgression = true;
  
  if (recommendedTopicId) {
    const p = progress.find(x => x.topicId === recommendedTopicId);
    if (p && (p.status === 'COMPLETED' || p.status === 'MASTERED')) {
      isCurriculumProgression = false;
    }
  }

  if (!recommendedTopicId) {
    const nextIncomplete = topics.sort((a,b) => a.order - b.order).find(t => {
      const p = progress.find(x => x.topicId === t.id);
      return !p || (p.status !== 'COMPLETED' && p.status !== 'MASTERED');
    });
    if (nextIncomplete) {
      recommendedTopicId = nextIncomplete.id;
      recommendedReason = "Next syllabus item in sequence.";
      isCurriculumProgression = true;
    } else {
      const nextPractice = topics.sort((a,b) => {
        const pa = progress.find(x => x.topicId === a.id)?.mastery || 0;
        const pb = progress.find(x => x.topicId === b.id)?.mastery || 0;
        return pa - pb;
      })[0];
      if (nextPractice && (progress.find(x => x.topicId === nextPractice.id)?.mastery || 0) < 90) {
        recommendedTopicId = nextPractice.id;
        recommendedReason = "Continue practicing to reach mastery.";
        isCurriculumProgression = false;
      }
    }
  }

  const recTopic = topics.find(t => t.id === recommendedTopicId);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-light mb-2">Theory of Computation</h1>
          <p className="text-slate-400">Personal Learning Laboratory</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-1">Today</div>
          <div className="text-lg text-slate-200">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</div>
        </div>
      </header>

      {/* OVERALL PROGRESS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Topics Started</h3>
          <p className="text-3xl font-light text-blue-400">{startedTopics} <span className="text-slate-500 text-lg">/ {topics.length}</span></p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Topics Completed</h3>
          <p className="text-3xl font-light text-green-400">{completedTopics} <span className="text-slate-500 text-lg">/ {topics.length}</span></p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Topics Mastered</h3>
          <p className="text-3xl font-light text-yellow-500">{masteredTopics} <span className="text-slate-500 text-lg">/ {topics.length}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* NEXT SYLLABUS ITEM / ADAPTIVE ENGINE */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-900/30 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BrainCircuit className="w-32 h-32 text-blue-400" />
            </div>
            
            <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> {isCurriculumProgression ? 'Next Syllabus Item' : 'Recommended Practice'}
            </h2>
            
            {recTopic ? (
              <>
                <h3 className="text-2xl font-light text-slate-100 mb-2">{recTopic.title}</h3>
                <p className="text-slate-400 max-w-md mb-8">{recommendedReason}</p>
                
                <div className="flex gap-4">
                  <Link href={`/toc/topic/${recTopic.id}`} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                    Open Topic <ArrowRight className="w-4 h-4"/>
                  </Link>
                  {nextAction?.action === 'PRACTICE' && (
                    <Link href="/toc/practice" className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors">
                      Start Practice
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <p className="text-slate-400">You have mastered the entire syllabus.</p>
            )}
          </section>

          {/* WHAT REMAINS */}
          <section>
            <h2 className="text-sm font-mono text-slate-500 mb-4 tracking-widest uppercase">What Remains</h2>
            <div className="grid grid-cols-2 gap-4">
              {remainsByModule.map((m, i) => (
                <div key={i} className="border border-slate-800 bg-slate-900/20 rounded-xl p-5 flex justify-between items-center">
                  <span className="font-medium text-slate-300">{m.title}</span>
                  <span className="text-sm text-slate-500">{m.remaining} topics</span>
                </div>
              ))}
              {remainsByModule.length === 0 && (
                <div className="col-span-2 text-slate-500 text-center py-4 border border-slate-800/60 border-dashed rounded-xl">
                  {masteredTopics === topics.length ? "All modules mastered." : "All topics completed. Continue practicing to reach mastery."}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <div className="space-y-4">
          <h2 className="text-sm font-mono text-slate-500 mb-4 tracking-widest uppercase">Laboratory Access</h2>
          
          <Link href="/toc/syllabus" className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 transition-colors group">
            <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
            <div>
              <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">Master Syllabus</div>
              <div className="text-xs text-slate-500">Curriculum checklist</div>
            </div>
          </Link>

          <Link href="/toc/targets" className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 transition-colors group">
            <TargetIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
            <div>
              <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">Target Center</div>
              <div className="text-xs text-slate-500">{targets.filter(t => t.status === 'ACTIVE').length} active targets</div>
            </div>
          </Link>

          <Link href="/toc/practice" className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 transition-colors group">
            <Activity className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
            <div>
              <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">Practice Engine</div>
              <div className="text-xs text-slate-500">Adaptive retrieval</div>
            </div>
          </Link>

          <Link href="/toc/errors" className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 transition-colors group">
            <AlertOctagon className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
            <div>
              <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">Error Lab</div>
              <div className="text-xs text-slate-500">{errors.length} recorded mistakes</div>
            </div>
          </Link>

          <Link href="/toc/graph" className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 transition-colors group">
            <Share2 className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
            <div>
              <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">Knowledge Graph</div>
              <div className="text-xs text-slate-500">Visual dependencies</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
