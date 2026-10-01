'use client';

import React, { useState } from 'react';
import OsLabShell, { LabMode } from './OsLabShell';
import { runWait, runSignal, SemaphoreState, SemaphoreType } from '@/lib/simulator/os/semaphoreEngine';
import { useLearningStore } from '@/store/useLearningStore';

export default function SemaphoreLab() {
  const [mode, setMode] = useState<LabMode>('LEARN');

  const [state, setState] = useState<SemaphoreState>({
    type: 'COUNTING',
    value: 3,
    readyQueue: ['P1', 'P2', 'P3', 'P4', 'P5'],
    executing: [],
    blockedQueue: []
  });

  const [prediction, setPrediction] = useState<number | ''>('');

  const { recordPractice } = useLearningStore();

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      value: prev.type === 'BINARY' ? 1 : 3,
      readyQueue: ['P1', 'P2', 'P3', 'P4', 'P5'],
      executing: [],
      blockedQueue: []
    }));
    setPrediction('');
  };

  const handleTypeChange = (t: SemaphoreType) => {
    setState({
      type: t,
      value: t === 'BINARY' ? 1 : 3,
      readyQueue: ['P1', 'P2', 'P3', 'P4', 'P5'],
      executing: [],
      blockedQueue: []
    });
    setPrediction('');
  };

  const handleWait = () => {
    const res = runWait(state);
    setState(res.newState);
  };

  const handleSignal = () => {
    const res = runSignal(state);
    setState(res.newState);
  };

  const handleChallengeSubmit = async () => {
    const isCorrect = prediction === -1;

    await recordPractice({
      id: `att_sem_${Date.now()}`,
      questionId: `lab_sem_val`,
      topicId: 'os_m2_14',
      userAnswer: String(prediction),
      isCorrect,
      predictedConfidence: 5,
      errorType: isCorrect ? undefined : 'CALCULATION',
      timestamp: Date.now()
    });
  };

  return (
    <OsLabShell
      title="Semaphore Playground"
      topicId="os_m2_14"
      description="Interactive visualization of COUNTING and BINARY semaphores with explicit OS semantics."
      mode={mode}
      setMode={(m) => { setMode(m); handleReset(); }}
      status="IDLE"
      onRun={() => {}}
      onPause={() => {}}
      onReset={handleReset}
      learnContent={
        <div className="text-slate-300 text-sm space-y-4">
          <select value={state.type} onChange={e => handleTypeChange(e.target.value as SemaphoreType)} className="bg-slate-800 text-white p-2 rounded mb-4">
             <option value="COUNTING">COUNTING SEMAPHORE</option>
             <option value="BINARY">BINARY SEMAPHORE</option>
          </select>
          {state.type === 'COUNTING' ? (
            <>
              <p>The <strong>Counting Semaphore</strong> uses the classic Dijkstra Negative-Value model:</p>
              <ul className="list-disc ml-6 mt-2 font-mono text-xs space-y-2 text-slate-400">
                <li><strong className="text-red-400">wait(S):</strong> S = S - 1. If S &lt; 0, the process is added to the blocked queue.</li>
                <li><strong className="text-green-400">signal(S):</strong> S = S + 1. If S &lt;= 0, a process is removed from the blocked queue and unblocked.</li>
              </ul>
              <p className="italic text-slate-500">Note: If S is negative, its magnitude |S| is exactly the number of processes currently waiting in the blocked queue.</p>
            </>
          ) : (
            <>
              <p>The <strong>Binary Semaphore (Lock)</strong> restricts S to values 0 and 1:</p>
              <ul className="list-disc ml-6 mt-2 font-mono text-xs space-y-2 text-slate-400">
                <li><strong className="text-red-400">wait(S):</strong> If S === 0, block. If S === 1, S = 0 (acquire lock).</li>
                <li><strong className="text-green-400">signal(S):</strong> If queue is not empty, unblock 1 process (lock transfers directly, S remains 0). Otherwise, S = 1 (release lock).</li>
              </ul>
              <p className="italic text-slate-500">Note: The Binary semaphore does not go negative.</p>
            </>
          )}
        </div>
      }
      experimentControls={
        <div className="flex gap-4">
          <button onClick={handleWait} disabled={state.readyQueue.length === 0} className="px-6 py-3 bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-700 rounded-lg font-mono disabled:opacity-50">wait()</button>
          <button onClick={handleSignal} disabled={state.executing.length === 0 && state.blockedQueue.length === 0} className="px-6 py-3 bg-green-900/50 hover:bg-green-800 text-green-200 border border-green-700 rounded-lg font-mono disabled:opacity-50">signal()</button>
        </div>
      }
      challengeContent={
        <div className="text-center space-y-4">
          <p className="text-slate-400 text-sm">Initial State: Counting Semaphore S = 3. Four processes sequentially call <code>wait(S)</code>.</p>
          <h3 className="text-lg text-slate-200">What is the final value of the semaphore?</h3>
          <div className="flex justify-center gap-4">
            {[1, 0, -1, -2].map(p => (
              <button
                key={p}
                onClick={() => setPrediction(p)}
                className={`px-6 py-2 rounded font-medium font-mono ${prediction === p ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button onClick={handleChallengeSubmit} disabled={prediction === ''} className="mt-4 px-6 py-2 bg-blue-600 rounded text-white disabled:opacity-50">Submit</button>
        </div>
      }
      visualizer={
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center shadow-xl">
            <h4 className="text-slate-400 font-mono mb-4 tracking-widest">{state.type} SEMAPHORE S</h4>
            <div className={`text-7xl font-black ${state.value < 0 ? 'text-red-500' : 'text-blue-500'}`}>
              {state.value}
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
               <h4 className="text-slate-500 font-mono mb-3 tracking-widest">EXECUTING (In Critical Section)</h4>
               <div className="flex flex-wrap gap-2 min-h-[40px]">
                 {state.executing.length === 0 && <span className="text-slate-600 italic">None</span>}
                 {state.executing.map((p, i) => <div key={`${p}-${i}`} className="px-4 py-2 bg-blue-900 border border-blue-700 text-blue-100 rounded font-bold shadow-lg">{p}</div>)}
               </div>
             </div>
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
               <h4 className="text-slate-500 font-mono mb-3 tracking-widest">BLOCKED QUEUE</h4>
               <div className="flex flex-wrap gap-2 min-h-[40px]">
                 {state.blockedQueue.length === 0 && <span className="text-slate-600 italic">Empty</span>}
                 {state.blockedQueue.map((p, i) => <div key={`${p}-${i}`} className="px-4 py-2 bg-red-950 border border-red-800 text-red-300 rounded font-bold shadow-lg">{p}</div>)}
               </div>
             </div>
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
               <h4 className="text-slate-500 font-mono mb-3 tracking-widest">READY QUEUE</h4>
               <div className="flex flex-wrap gap-2 min-h-[40px]">
                 {state.readyQueue.length === 0 && <span className="text-slate-600 italic">Empty</span>}
                 {state.readyQueue.map((p, i) => <div key={`${p}-${i}`} className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded font-bold shadow-lg">{p}</div>)}
               </div>
             </div>
          </div>
        </div>
      }
    />
  );
}
