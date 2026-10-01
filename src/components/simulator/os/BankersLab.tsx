'use client';

import React, { useState, useEffect } from 'react';
import OsLabShell, { LabMode, SimStatus } from './OsLabShell';
import { runSafetyAlgorithm, handleResourceRequest, BankersState, SafetyResult, RequestResult } from '@/lib/simulator/os/bankersEngine';
import { useLearningStore } from '@/store/useLearningStore';

const DEFAULT_STATE: BankersState = {
  numProcesses: 5,
  numResources: 3,
  available: [3, 3, 2],
  max: [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]
  ],
  allocation: [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
  ],
  need: [
    [7, 4, 3],
    [1, 2, 2],
    [6, 0, 0],
    [0, 1, 1],
    [4, 3, 1]
  ]
};

export default function BankersLab() {
  const [mode, setMode] = useState<LabMode>('LEARN');
  const [status, setStatus] = useState<SimStatus>('IDLE');

  const [state, setState] = useState<BankersState>(DEFAULT_STATE);
  const [safetyResult, setSafetyResult] = useState<SafetyResult | null>(null);

  // Resource Request state
  const [reqProcess, setReqProcess] = useState<number>(1);
  const [reqVector, setReqVector] = useState<number[]>([1, 0, 2]);
  const [reqResult, setReqResult] = useState<RequestResult | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [prediction, setPrediction] = useState<'SAFE' | 'UNSAFE' | ''>('');

  const { recordPractice } = useLearningStore();

  const handleRunSafety = () => {
    if (status === 'IDLE' || status === 'PAUSED') {
      const res = runSafetyAlgorithm(state);
      setSafetyResult(res);
      setStatus('RUNNING');
    }
  };

  const handleRunRequest = () => {
    const res = handleResourceRequest(state, reqProcess, reqVector);
    setReqResult(res);
    if (res.granted && res.newState) {
      setState(res.newState);
    }
    setStatus('COMPLETED');
  };

  useEffect(() => {
    let interval: any;
    if (status === 'RUNNING' && safetyResult) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= safetyResult.trace.length - 1) {
            setStatus('COMPLETED');
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [status, safetyResult]);

  const handleReset = () => {
    setStatus('IDLE');
    setCurrentStep(0);
    setSafetyResult(null);
    setReqResult(null);
    setPrediction('');
  };

  const handleMatrixChange = (matrixName: 'max' | 'allocation', i: number, j: number, val: string) => {
    const num = Math.max(0, parseInt(val) || 0);
    const newState = { ...state };
    newState[matrixName] = newState[matrixName].map((row, rIdx) =>
      rIdx === i ? row.map((c, cIdx) => cIdx === j ? num : c) : [...row]
    );
    newState.need = newState.max.map((r, rIdx) => r.map((c, cIdx) => Math.max(0, c - newState.allocation[rIdx][cIdx])));
    setState(newState);
    handleReset();
  };

  const handleAvailableChange = (j: number, val: string) => {
    const num = Math.max(0, parseInt(val) || 0);
    const newState = { ...state };
    newState.available = newState.available.map((c, idx) => idx === j ? num : c);
    setState(newState);
    handleReset();
  };

  const handleReqVectorChange = (j: number, val: string) => {
    const num = Math.max(0, parseInt(val) || 0);
    const newVec = [...reqVector];
    newVec[j] = num;
    setReqVector(newVec);
  };

  const handleChallengeSubmit = async () => {
    const res = runSafetyAlgorithm(state);
    const actual = res.isSafe ? 'SAFE' : 'UNSAFE';
    const isCorrect = prediction === actual;

    await recordPractice({
      id: `att_banker_${Date.now()}`,
      questionId: `lab_banker_safety`,
      topicId: 'os_m2_29',
      userAnswer: prediction,
      isCorrect,
      predictedConfidence: 5,
      errorType: isCorrect ? undefined : 'CALCULATION',
      timestamp: Date.now()
    });

    setSafetyResult(res);
    setCurrentStep(res.trace.length - 1);
    setStatus('COMPLETED');
  };

  const currentTrace = safetyResult?.trace[currentStep];

  return (
    <OsLabShell
      title="Banker's Algorithm Laboratory"
      topicId="os_m2_29"
      description="Step-by-step matrix simulation of the Banker's Safety and Resource-Request algorithms."
      mode={mode}
      setMode={(m) => { setMode(m); handleReset(); }}
      status={status}
      onRun={handleRunSafety}
      onPause={() => setStatus('PAUSED')}
      onReset={handleReset}
      learnContent={
        <div className="text-slate-300 text-sm">
          <p>Banker's Algorithm prevents deadlock by dynamically checking if a safe sequence exists before granting resources.</p>
          <p className="mt-2 text-green-400 font-mono">Need[i,j] = Max[i,j] - Allocation[i,j]</p>
        </div>
      }
      experimentControls={
        <div className="text-slate-300 text-sm space-y-4">
          <p>Edit matrices directly in the visualizer. Need is calculated automatically.</p>

          <div className="bg-slate-900 p-4 border border-slate-700 rounded-lg">
            <h4 className="font-mono text-blue-400 mb-2 font-bold">RESOURCE REQUEST ALGORITHM</h4>
            <div className="flex items-center gap-4 mb-4">
              <label>Process:
                <select value={reqProcess} onChange={e => setReqProcess(Number(e.target.value))} className="ml-2 bg-slate-800 p-1 rounded text-white">
                  {state.allocation.map((_, i) => <option key={i} value={i}>P{i}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2">Request Vector:
                {reqVector.map((v, j) => (
                   <input key={j} type="number" value={v} onChange={e => handleReqVectorChange(j, e.target.value)} className="w-12 bg-slate-800 text-center rounded p-1" />
                ))}
              </label>
            </div>
            <button onClick={handleRunRequest} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-xs font-bold font-mono transition-colors">EVALUATE REQUEST</button>

            {reqResult && (
              <div className={`mt-4 p-3 rounded font-mono text-xs ${reqResult.granted ? 'bg-green-900/30 border border-green-700 text-green-300' : 'bg-red-900/30 border border-red-700 text-red-300'}`}>
                <div className="font-bold mb-1">{reqResult.granted ? 'REQUEST GRANTED' : 'REQUEST DENIED'}</div>
                <div>{reqResult.message}</div>
              </div>
            )}
          </div>
        </div>
      }
      challengeContent={
        <div className="text-center space-y-4">
          <h3 className="text-lg text-slate-200">Is this system state safe?</h3>
          <div className="flex justify-center gap-4">
            <button onClick={() => setPrediction('SAFE')} className={`px-6 py-2 rounded font-medium ${prediction === 'SAFE' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400'}`}>SAFE</button>
            <button onClick={() => setPrediction('UNSAFE')} className={`px-6 py-2 rounded font-medium ${prediction === 'UNSAFE' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'}`}>UNSAFE</button>
          </div>
          <button onClick={handleChallengeSubmit} disabled={!prediction || status !== 'IDLE'} className="mt-4 px-6 py-2 bg-blue-600 rounded text-white disabled:opacity-50">Check Answer</button>
        </div>
      }
      visualizer={
        <div className="w-full text-xs font-mono">
          <div className="flex flex-wrap gap-8 mb-8 overflow-x-auto justify-center">
            {/* Allocation Matrix */}
            <div>
              <h4 className="text-slate-500 mb-2">ALLOCATION</h4>
              <table className="border-collapse">
                <thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead>
                <tbody>
                  {state.allocation.map((row, i) => (
                    <tr key={i} className={currentTrace?.selectedProcess === i ? 'bg-blue-900/50' : ''}>
                      <td className="pr-2 py-1 text-slate-400">P{i}</td>
                      {row.map((val, j) => (
                        <td key={j} className="px-1 py-1">
                          <input type="number" value={val} disabled={mode!=='EXPERIMENT'} onChange={e => handleMatrixChange('allocation', i, j, e.target.value)} className="w-10 bg-slate-900 border border-slate-700 text-center rounded p-1" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Max Matrix */}
            <div>
              <h4 className="text-slate-500 mb-2">MAX</h4>
              <table className="border-collapse">
                <thead><tr><th>A</th><th>B</th><th>C</th></tr></thead>
                <tbody>
                  {state.max.map((row, i) => (
                    <tr key={i} className={currentTrace?.selectedProcess === i ? 'bg-blue-900/50' : ''}>
                      {row.map((val, j) => (
                        <td key={j} className="px-1 py-1">
                          <input type="number" value={val} disabled={mode!=='EXPERIMENT'} onChange={e => handleMatrixChange('max', i, j, e.target.value)} className="w-10 bg-slate-900 border border-slate-700 text-center rounded p-1" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Need Matrix (Read Only) */}
            <div>
              <h4 className="text-slate-500 mb-2 text-green-400">NEED</h4>
              <table className="border-collapse">
                <thead><tr><th>A</th><th>B</th><th>C</th></tr></thead>
                <tbody>
                  {state.need.map((row, i) => (
                    <tr key={i} className={currentTrace?.selectedProcess === i ? 'bg-blue-900/50' : ''}>
                      {row.map((val, j) => <td key={j} className="px-2 py-2 text-center text-green-300 font-bold">{val}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Available */}
            <div>
               <h4 className="text-slate-500 mb-2">AVAILABLE</h4>
               <div className="flex gap-1">
                  {state.available.map((val, j) => (
                    <input key={j} type="number" value={val} disabled={mode!=='EXPERIMENT'} onChange={e => handleAvailableChange(j, e.target.value)} className="w-10 bg-slate-900 border border-slate-700 text-center rounded p-1" />
                  ))}
               </div>
            </div>
          </div>

          {/* Current Trace State */}
          {currentTrace && (
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6 max-w-2xl mx-auto shadow-2xl">
              <div className="flex justify-between items-start gap-8">
                <div>
                  <span className="text-slate-500 block mb-2 font-bold tracking-widest">WORK VECTOR</span>
                  <div className="flex gap-2">
                    {currentTrace.work.map((w, i) => <div key={i} className="w-10 h-10 flex items-center justify-center bg-blue-900 text-blue-200 rounded border border-blue-700 text-lg font-bold">{w}</div>)}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block mb-2 font-bold tracking-widest">FINISH ARRAY</span>
                  <div className="flex gap-2">
                    {currentTrace.finish.map((f, i) => (
                      <div key={i} className={`w-10 h-10 flex flex-col items-center justify-center rounded border ${f ? 'bg-green-900/30 border-green-700 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                        <span className="text-[9px]">P{i}</span>
                        <span className="font-bold leading-none">{f ? 'T' : 'F'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-orange-400 pt-4 border-t border-slate-800 font-mono text-sm leading-relaxed">
                {currentTrace.message}
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
