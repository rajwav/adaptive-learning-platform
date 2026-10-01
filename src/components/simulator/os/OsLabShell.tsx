'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, FlaskConical, Target, Play, Pause, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLearningStore } from '@/store/useLearningStore';

export type LabMode = 'LEARN' | 'EXPERIMENT' | 'CHALLENGE';
export type SimStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'ERROR';

interface OsLabShellProps {
  title: string;
  topicId: string;
  description: string;
  learnContent: React.ReactNode;
  experimentControls: React.ReactNode;
  challengeContent: React.ReactNode;
  visualizer: React.ReactNode;
  status: SimStatus;
  mode: LabMode;
  setMode: (m: LabMode) => void;
  onRun: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function OsLabShell({
  title,
  topicId,
  description,
  learnContent,
  experimentControls,
  challengeContent,
  visualizer,
  status,
  mode,
  setMode,
  onRun,
  onPause,
  onReset
}: OsLabShellProps) {

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
      {/* HEADER / TABS */}
      <div className="flex border-b border-slate-800 bg-slate-900/50">
        <button onClick={() => setMode('LEARN')} className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'LEARN' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>
          <Activity className="w-4 h-4 inline mr-2"/> Learn
        </button>
        <button onClick={() => setMode('EXPERIMENT')} className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'EXPERIMENT' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>
          <FlaskConical className="w-4 h-4 inline mr-2"/> Experiment
        </button>
        <button onClick={() => setMode('CHALLENGE')} className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'CHALLENGE' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>
          <Target className="w-4 h-4 inline mr-2"/> Challenge
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-8">

        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-2">{title}</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">{description}</p>
        </div>

        {/* CONTROLS AREA BASED ON MODE */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <AnimatePresence mode="wait">
            {mode === 'LEARN' && (
              <motion.div key="learn" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                {learnContent}
              </motion.div>
            )}
            {mode === 'EXPERIMENT' && (
              <motion.div key="experiment" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                {experimentControls}
              </motion.div>
            )}
            {mode === 'CHALLENGE' && (
              <motion.div key="challenge" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                {challengeContent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* VISUALIZER & TRACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800 p-6 rounded-xl flex flex-col justify-center items-center overflow-x-auto min-h-[300px]">
            {visualizer}

            {/* PLAYBACK CONTROLS */}
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={onReset} className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">
                <RotateCcw className="w-5 h-5"/>
              </button>
              {(mode !== 'CHALLENGE' || status !== 'IDLE') && (
                <button
                  onClick={status === 'RUNNING' ? onPause : onRun}
                  disabled={status === 'COMPLETED' || status === 'ERROR'}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {status === 'RUNNING' ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5"/>}
                  {status === 'RUNNING' ? 'Pause' : 'Run'}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-xl h-full flex flex-col">
              <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">Status</h3>
              <div className="flex items-center gap-3">
                 {status === 'COMPLETED' ? <CheckCircle2 className="text-green-400 w-5 h-5" /> :
                  status === 'ERROR' ? <AlertTriangle className="text-red-400 w-5 h-5" /> :
                  <Activity className="text-blue-400 w-5 h-5" />}
                 <span className="font-bold tracking-widest text-slate-200">{status}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
