'use client';

import React, { useState, useEffect, useRef } from 'react';
import OsLabShell, { LabMode, SimStatus } from './OsLabShell';
import { runScheduler, SchedulerProcess, SchedulingAlgorithm, GanttBlock, TraceEvent } from '@/lib/simulator/os/cpuSchedulerEngine';
import { useLearningStore } from '@/store/useLearningStore';

const DEFAULT_PROCESSES: SchedulerProcess[] = [
  { id: 'P1', arrivalTime: 0, burstTime: 6, priority: 3, remainingTime: 6, startTime: -1, completionTime: -1 },
  { id: 'P2', arrivalTime: 1, burstTime: 4, priority: 1, remainingTime: 4, startTime: -1, completionTime: -1 },
  { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4, remainingTime: 2, startTime: -1, completionTime: -1 }
];

export default function CpuSchedulerLab() {
  const [mode, setMode] = useState<LabMode>('LEARN');
  const [status, setStatus] = useState<SimStatus>('IDLE');
  const [algo, setAlgo] = useState<SchedulingAlgorithm>('FCFS');
  const [quantum, setQuantum] = useState<number>(2);
  const [processes, setProcesses] = useState<SchedulerProcess[]>(DEFAULT_PROCESSES);

  const [currentTraceIndex, setCurrentTraceIndex] = useState(0);
  const [gantt, setGantt] = useState<GanttBlock[]>([]);
  const [trace, setTrace] = useState<TraceEvent[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  const [prediction, setPrediction] = useState<string>('');
  const [challengeQuestion, setChallengeQuestion] = useState('');
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const { recordPractice } = useLearningStore();

  const generateChallenge = () => {
    const res = runScheduler(processes, algo, quantum);
    setGantt(res.gantt);
    setTrace(res.trace);
    setMetrics({ processes: res.processes, avgWT: res.avgWT, avgTAT: res.avgTAT });

    // Pick a random question type based on Gantt
    const p1 = res.processes[0];
    const qTypes = [
      { q: `What is the Completion Time (CT) of ${p1.id}?`, a: String(p1.completionTime) },
      { q: `What is the Turnaround Time (TAT) of ${p1.id}?`, a: String(p1.completionTime - p1.arrivalTime) },
      { q: `Which process runs first at t=0?`, a: res.gantt[0]?.processId }
    ];
    const pick = qTypes[Math.floor(Math.random() * qTypes.length)];
    setChallengeQuestion(pick.q);
    setChallengeAnswer(pick.a);
    setPrediction('');
  };

  useEffect(() => {
    if (mode === 'CHALLENGE') {
      generateChallenge();
      setStatus('IDLE');
    }
  }, [mode, algo, processes, quantum]);

  const handleRun = () => {
    if (status === 'IDLE' || status === 'PAUSED') {
      setStatus('RUNNING');
      if (currentTraceIndex === 0) {
         const res = runScheduler(processes, algo, quantum);
         setGantt(res.gantt);
         setTrace(res.trace);
         setMetrics({
           processes: res.processes,
           avgWT: res.avgWT,
           avgTAT: res.avgTAT,
           avgRT: res.avgRT,
           contextSwitches: res.contextSwitches
         });
      }
    }
  };

  useEffect(() => {
    let timer: any;
    if (status === 'RUNNING') {
      timer = setInterval(() => {
        setCurrentTraceIndex(prev => {
          if (prev >= trace.length - 1) {
            setStatus('COMPLETED');
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, trace.length]);

  const handlePause = () => setStatus('PAUSED');

  const handleReset = () => {
    setStatus('IDLE');
    setCurrentTraceIndex(0);
    setGantt([]);
    setTrace([]);
    setMetrics(null);
    if (mode === 'CHALLENGE') generateChallenge();
  };

  const handleChallengeSubmit = async () => {
    const isCorrect = prediction.trim().toLowerCase() === challengeAnswer.trim().toLowerCase();

    await recordPractice({
      id: `att_sched_${Date.now()}`,
      questionId: `lab_sched_${algo}`,
      topicId: 'os_m1_23', // General scheduling
      userAnswer: prediction,
      isCorrect,
      predictedConfidence: 5,
      errorType: isCorrect ? undefined : 'CALCULATION',
      timestamp: Date.now()
    });

    setStatus('COMPLETED');
    setCurrentTraceIndex(trace.length - 1);
  };

  const currentEvent = trace[currentTraceIndex];

  // Calculate which parts of Gantt to show based on current time
  const currentTime = currentEvent?.time || 0;
  const visibleGantt = gantt.filter(g => g.start <= currentTime).map(g => {
    if (g.end > currentTime) {
      return { ...g, end: currentTime, isPartial: true };
    }
    return g;
  });

  return (
    <OsLabShell
      title="CPU Scheduling Simulator"
      topicId="os_m1_23"
      description="Interactive step-by-step visualization of CPU scheduling algorithms with precise tracing."
      mode={mode}
      setMode={setMode}
      status={status}
      onRun={handleRun}
      onPause={handlePause}
      onReset={handleReset}
      learnContent={
        <div className="text-slate-300 text-sm">
          <select value={algo} onChange={e => {setAlgo(e.target.value as SchedulingAlgorithm); handleReset();}} className="bg-slate-800 text-white p-2 rounded mb-4">
            <option value="FCFS">First Come First Serve</option>
            <option value="SJF">Shortest Job First (Non-Preemptive)</option>
            <option value="SRTF">Shortest Remaining Time First (Preemptive)</option>
            <option value="PRIORITY_NON">Priority (Non-Preemptive)</option>
            <option value="PRIORITY_PRE">Priority (Preemptive)</option>
            <option value="RR">Round Robin</option>
          </select>
          <p>Watch how <strong>{algo}</strong> evaluates the Ready Queue at each time step. Notice the tie-breaking rules if burst or arrival times are equal.</p>
        </div>
      }
      experimentControls={
        <div className="text-slate-300 text-sm space-y-4">
          <div className="flex gap-4">
            <select value={algo} onChange={e => {setAlgo(e.target.value as SchedulingAlgorithm); handleReset();}} className="bg-slate-800 text-white p-2 rounded">
              <option value="FCFS">FCFS</option>
              <option value="SJF">SJF (NP)</option>
              <option value="SRTF">SRTF (Pre)</option>
              <option value="PRIORITY_NON">Priority (NP)</option>
              <option value="PRIORITY_PRE">Priority (Pre)</option>
              <option value="RR">Round Robin</option>
            </select>
            {algo === 'RR' && (
              <label className="flex items-center gap-2">Quantum:
                <input type="number" min="1" value={quantum} onChange={e => setQuantum(Number(e.target.value))} className="w-16 bg-slate-800 p-1 rounded text-center"/>
              </label>
            )}
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-700">
            <h4 className="font-mono text-xs text-slate-500 mb-2">PROCESSES</h4>
            {processes.map((p, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input value={p.id} onChange={(e) => {
                  const np = [...processes]; np[i].id = e.target.value; setProcesses(np); handleReset();
                }} className="w-12 bg-slate-800 p-1 rounded text-center font-mono"/>
                <label className="text-xs text-slate-500">AT:</label>
                <input type="number" min="0" value={p.arrivalTime} onChange={(e) => {
                  const np = [...processes]; np[i].arrivalTime = Number(e.target.value); setProcesses(np); handleReset();
                }} className="w-12 bg-slate-800 p-1 rounded text-center"/>
                <label className="text-xs text-slate-500">BT:</label>
                <input type="number" min="1" value={p.burstTime} onChange={(e) => {
                  const np = [...processes]; np[i].burstTime = Number(e.target.value); setProcesses(np); handleReset();
                }} className="w-12 bg-slate-800 p-1 rounded text-center"/>
                {(algo.includes('PRIORITY')) && (
                  <>
                    <label className="text-xs text-slate-500">PR:</label>
                    <input type="number" min="1" value={p.priority} onChange={(e) => {
                      const np = [...processes]; np[i].priority = Number(e.target.value); setProcesses(np); handleReset();
                    }} className="w-12 bg-slate-800 p-1 rounded text-center"/>
                  </>
                )}
                <button onClick={() => {
                  if (processes.length > 1) {
                    setProcesses(processes.filter((_, idx) => idx !== i));
                    handleReset();
                  }
                }} className="text-red-400 hover:text-red-300 ml-2">×</button>
              </div>
            ))}
            <button onClick={() => {
               setProcesses([...processes, { id: `P${processes.length+1}`, arrivalTime: 0, burstTime: 1, priority: 1, remainingTime: 1, startTime:-1, completionTime:-1 }]);
               handleReset();
            }} className="text-blue-400 text-xs hover:underline">+ Add Process</button>
          </div>
        </div>
      }
      challengeContent={
        <div className="text-center space-y-4">
          <h3 className="text-lg text-slate-200">{challengeQuestion}</h3>
          <input
            type="text"
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            className="bg-slate-800 text-white p-2 rounded text-center w-full max-w-[200px]"
            placeholder="Your answer"
          />
          <div>
            <button onClick={handleChallengeSubmit} disabled={!prediction || status === 'COMPLETED'} className="mt-4 px-6 py-2 bg-blue-600 rounded text-white disabled:opacity-50">Submit Prediction</button>
          </div>
          {status === 'COMPLETED' && (
             <div className="mt-4 text-sm">
                The correct answer was: <strong className="text-green-400">{challengeAnswer}</strong>
             </div>
          )}
        </div>
      }
      visualizer={
        <div className="w-full flex flex-col gap-6 text-sm">
          {/* GANTT */}
          <div>
            <h4 className="text-xs font-mono text-slate-500 mb-2">GANTT CHART</h4>
            <div className="flex border border-slate-700 h-12 rounded overflow-hidden">
               {visibleGantt.length === 0 && <div className="flex-1 bg-slate-900/50 flex items-center justify-center text-slate-600 text-xs">Awaiting Execution</div>}
               {visibleGantt.map((block, i) => (
                  <div key={i} style={{ flexGrow: Math.max(1, block.end - block.start) }} className={`flex flex-col justify-center items-center border-r border-slate-700 ${block.processId === 'IDLE' ? 'bg-slate-800/50 text-slate-500' : 'bg-blue-900/50 text-blue-200'}`}>
                    <span className="font-bold">{block.processId}</span>
                  </div>
               ))}
            </div>
            {/* Timeline markers */}
            <div className="flex text-[10px] text-slate-500 mt-1 relative h-4">
               {visibleGantt.map((block, i) => (
                 <React.Fragment key={i}>
                   {i === 0 && <div className="absolute" style={{ left: '0%' }}>{block.start}</div>}
                   <div className="absolute" style={{ left: '100%', marginLeft: '-8px' }}>{block.end}</div>
                 </React.Fragment>
               ))}
            </div>
          </div>

          {/* TRACE / STATE */}
          {currentEvent && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-blue-400 font-mono text-xs">Time: t = {currentEvent.time}</span>
                 <span className="text-slate-400 font-mono text-xs">Running: {currentEvent.runningProcess}</span>
               </div>
               <div className="mb-3">
                 <span className="text-slate-500 text-xs block mb-1">READY QUEUE</span>
                 <div className="flex gap-2 min-h-[30px]">
                   {currentEvent.readyQueue.length === 0 ? <span className="text-slate-600 text-xs italic">Empty</span> : currentEvent.readyQueue.map(p => <div key={p} className="bg-slate-700 px-2 py-1 rounded text-xs">{p}</div>)}
                 </div>
               </div>
               <div className="text-green-400 font-mono text-xs border-t border-slate-800 pt-3">
                 &gt; {currentEvent.event}
               </div>
            </div>
          )}

          {/* METRICS */}
          {metrics && status === 'COMPLETED' && (
            <div className="mt-4">
              <h4 className="text-xs font-mono text-slate-500 mb-2">FINAL METRICS</h4>
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2">Process</th><th className="py-2">AT</th><th className="py-2">BT</th><th className="py-2">CT</th><th className="py-2">TAT</th><th className="py-2">WT</th><th className="py-2">RT</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.processes.map((p: any) => {
                    const tat = p.completionTime - p.arrivalTime;
                    const wt = tat - p.burstTime;
                    const rt = p.startTime - p.arrivalTime;
                    return (
                      <tr key={p.id} className="border-b border-slate-800/50">
                        <td className="py-2 font-bold">{p.id}</td><td className="py-2">{p.arrivalTime}</td><td className="py-2">{p.burstTime}</td>
                        <td className="py-2 text-blue-300">{p.completionTime}</td><td className="py-2">{tat}</td><td className="py-2">{wt}</td><td className="py-2">{rt}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="flex gap-4 mt-4 text-xs text-slate-400 justify-center">
                <span>Avg TAT: <strong className="text-slate-200">{metrics.avgTAT}</strong></span>
                <span>Avg WT: <strong className="text-slate-200">{metrics.avgWT}</strong></span>
                <span>Context Switches: <strong className="text-slate-200">{metrics.contextSwitches}</strong></span>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
