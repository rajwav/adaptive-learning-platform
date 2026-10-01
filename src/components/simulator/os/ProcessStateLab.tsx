'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OsLabShell, { LabMode, SimStatus } from './OsLabShell';
import { useLearningStore } from '@/store/useLearningStore';

type ProcessState = 'NEW' | 'READY' | 'RUNNING' | 'WAITING' | 'TERMINATED';

export default function ProcessStateLab() {
  const [mode, setMode] = useState<LabMode>('LEARN');
  const [currentState, setCurrentState] = useState<ProcessState>('NEW');
  const [message, setMessage] = useState('Process is created and initialized.');

  const [prediction, setPrediction] = useState<ProcessState | ''>('');

  const { recordPractice } = useLearningStore();

  const handleTransition = (newState: ProcessState, msg: string) => {
    setCurrentState(newState);
    setMessage(msg);
  };

  const handleReset = () => {
    setCurrentState('NEW');
    setMessage('Process is created and initialized.');
    setPrediction('');
  };

  const handleChallengeSubmit = async () => {
    const isCorrect = prediction === 'WAITING'; // Example challenge: I/O request

    await recordPractice({
      id: `att_state_${Date.now()}`,
      questionId: `lab_state_io`,
      topicId: 'os_m1_14', // Process States
      userAnswer: prediction,
      isCorrect,
      predictedConfidence: 5,
      errorType: isCorrect ? undefined : 'CONCEPTUAL',
      timestamp: Date.now()
    });

    if (isCorrect) {
      handleTransition('WAITING', 'Correct! An I/O request moves the process to the WAITING state.');
    } else {
      setMessage(`Incorrect. The process actually moves to WAITING, not ${prediction}.`);
      setCurrentState('WAITING');
    }
  };

  const StateNode = ({ state, label, x, y }: { state: ProcessState, label: string, x: number, y: number }) => {
    const isActive = currentState === state;
    return (
      <div
        className={`absolute w-32 h-16 flex items-center justify-center rounded-2xl border-2 transition-all duration-500 font-bold tracking-wider text-sm shadow-lg z-20
          ${isActive ? 'bg-blue-600 border-blue-400 text-white shadow-blue-500/50 scale-110' : 'bg-slate-900 border-slate-700 text-slate-400'}
        `}
        style={{ left: x, top: y }}
      >
        {label}
      </div>
    );
  };

  const TransitionArrow = ({ fromX, fromY, toX, toY, active, label, curve }: { fromX: number, fromY: number, toX: number, toY: number, active: boolean, label: string, curve?: string }) => {
    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
        <defs>
          <marker id={`arrow-${label.replace(/\s+/g,'-')}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={active ? "#60A5FA" : "#334155"} />
          </marker>
        </defs>
        {curve ? (
          <path d={curve} fill="transparent" stroke={active ? "#60A5FA" : "#334155"} strokeWidth={active ? 3 : 2} markerEnd={`url(#arrow-${label.replace(/\s+/g,'-')})`} className="transition-all duration-500" />
        ) : (
          <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke={active ? "#60A5FA" : "#334155"} strokeWidth={active ? 3 : 2} markerEnd={`url(#arrow-${label.replace(/\s+/g,'-')})`} className="transition-all duration-500" />
        )}
        <text
          x={curve ? fromX + 30 : (fromX + toX)/2}
          y={curve ? fromY - 20 : (fromY + toY)/2 - 10}
          fill={active ? "#93C5FD" : "#64748B"}
          fontSize="10"
          textAnchor="middle"
          className="font-mono transition-all duration-500"
        >
          {label}
        </text>
      </svg>
    );
  };

  return (
    <OsLabShell
      title="Process State Machine"
      topicId="os_m1_14"
      description="Interactive visualization of the standard 5-state process model with transitions."
      mode={mode}
      setMode={(m) => { setMode(m); handleReset(); }}
      status="IDLE" // Always idle for this interactive click-through
      onRun={() => {}}
      onPause={() => {}}
      onReset={handleReset}
      learnContent={
        <div className="text-slate-300 text-sm">
          <p>The OS manages a process by moving it through a lifecycle. Click the buttons below in EXPERIMENT mode to trigger transitions.</p>
        </div>
      }
      experimentControls={
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button onClick={() => handleTransition('READY', 'admit: The process is placed in the ready queue.')} disabled={currentState !== 'NEW'} className="p-2 bg-slate-800 text-white rounded disabled:opacity-30">Admit</button>
          <button onClick={() => handleTransition('RUNNING', 'dispatch: The scheduler selects the process for CPU execution.')} disabled={currentState !== 'READY'} className="p-2 bg-slate-800 text-white rounded disabled:opacity-30">Scheduler Dispatch</button>
          <button onClick={() => handleTransition('READY', 'interrupt: A timer interrupt preempts the process.')} disabled={currentState !== 'RUNNING'} className="p-2 bg-slate-800 text-white rounded disabled:opacity-30">Interrupt</button>
          <button onClick={() => handleTransition('WAITING', 'I/O request: The process asks for an external resource.')} disabled={currentState !== 'RUNNING'} className="p-2 bg-slate-800 text-white rounded disabled:opacity-30">I/O or Event Wait</button>
          <button onClick={() => handleTransition('READY', 'I/O completion: The resource is available, the process is ready to run again.')} disabled={currentState !== 'WAITING'} className="p-2 bg-slate-800 text-white rounded disabled:opacity-30">I/O or Event Completion</button>
          <button onClick={() => handleTransition('TERMINATED', 'exit: The process finishes execution.')} disabled={currentState !== 'RUNNING'} className="p-2 bg-slate-800 text-white rounded disabled:opacity-30">Exit</button>
        </div>
      }
      challengeContent={
        <div className="text-center space-y-4">
          <p className="text-slate-400 text-sm mb-4">Current state: <strong className="text-white">RUNNING</strong></p>
          <h3 className="text-lg text-slate-200">The process makes a system call to read from the disk. What state does it enter next?</h3>
          <div className="flex justify-center flex-wrap gap-4">
            {['NEW', 'READY', 'RUNNING', 'WAITING', 'TERMINATED'].map(p => (
              <button
                key={p}
                onClick={() => setPrediction(p as ProcessState)}
                className={`px-4 py-2 rounded font-medium ${prediction === p ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button onClick={handleChallengeSubmit} disabled={!prediction} className="mt-4 px-6 py-2 bg-blue-600 rounded text-white disabled:opacity-50">Submit</button>
        </div>
      }
      visualizer={
        <div className="w-full relative h-[350px] flex items-center justify-center bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
          <div className="relative w-full max-w-3xl h-full mx-auto">
            {/* Arrows */}
            <TransitionArrow fromX={100} fromY={120} toX={180} toY={120} active={currentState === 'READY' && message.includes('admit')} label="admit" />

            {/* Dispatch & Interrupt curves */}
            <TransitionArrow fromX={300} fromY={100} toX={430} toY={100} active={currentState === 'RUNNING'} label="dispatch" curve="M 300 110 Q 365 70 430 110" />
            <TransitionArrow fromX={430} fromY={140} toX={300} toY={140} active={currentState === 'READY' && message.includes('interrupt')} label="interrupt" curve="M 430 130 Q 365 170 300 130" />

            <TransitionArrow fromX={480} fromY={152} toX={400} toY={250} active={currentState === 'WAITING'} label="I/O wait" />
            <TransitionArrow fromX={280} fromY={250} toX={220} toY={152} active={currentState === 'READY' && message.includes('completion')} label="I/O completion" />

            <TransitionArrow fromX={550} fromY={120} toX={620} toY={120} active={currentState === 'TERMINATED'} label="exit" />

            {/* Nodes */}
            <StateNode state="NEW" label="NEW" x={20} y={88} />
            <StateNode state="READY" label="READY" x={180} y={88} />
            <StateNode state="RUNNING" label="RUNNING" x={430} y={88} />
            <StateNode state="WAITING" label="WAITING" x={280} y={240} />
            <StateNode state="TERMINATED" label="TERMINATED" x={620} y={88} />
          </div>
          <div className="absolute bottom-4 w-11/12 max-w-lg text-center p-4 bg-slate-900 border border-slate-700 rounded-lg text-blue-400 font-mono text-sm shadow-xl z-30">
             {message}
          </div>
        </div>
      }
    />
  );
}
