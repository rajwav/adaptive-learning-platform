'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw, Activity, ShieldAlert, CheckCircle2, FlaskConical, Target } from 'lucide-react';
import { DFA, stepDfa, validateInputString } from '@/lib/automata/dfa';
import DfaGraph, { NodeLayout } from './DfaGraph';
import { useLearningStore } from '@/store/useLearningStore';

interface Preset {
  name: string;
  dfa: DFA;
  layout: NodeLayout[];
}

const PRESETS: Preset[] = [
  {
    name: "Ends in '1'",
    dfa: {
      states: ["q0", "q1"],
      alphabet: ["0", "1"],
      startState: "q0",
      acceptStates: ["q1"],
      transitions: {
        "q0": { "0": "q0", "1": "q1" },
        "q1": { "0": "q0", "1": "q1" }
      }
    },
    layout: [
      { id: "q0", x: 100, y: 150 },
      { id: "q1", x: 300, y: 150 }
    ]
  },
  {
    name: "Even number of '0's",
    dfa: {
      states: ["q0", "q1"],
      alphabet: ["0", "1"],
      startState: "q0",
      acceptStates: ["q0"],
      transitions: {
        "q0": { "0": "q1", "1": "q0" },
        "q1": { "0": "q0", "1": "q1" }
      }
    },
    layout: [
      { id: "q0", x: 100, y: 150 },
      { id: "q1", x: 300, y: 150 }
    ]
  }
];

export default function DfaSimulator() {
  const { recordPractice } = useLearningStore();

  const [activePreset, setActivePreset] = useState<number>(0);
  const currentDfa = PRESETS[activePreset].dfa;
  const currentLayout = PRESETS[activePreset].layout;

  const [mode, setMode] = useState<'LEARN' | 'EXPERIMENT' | 'CHALLENGE'>('LEARN');
  
  // Simulator State
  const [inputString, setInputString] = useState<string>('10101');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentState, setCurrentState] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'PAUSED' | 'ACCEPTED' | 'REJECTED' | 'INVALID'>('IDLE');
  
  // Trace table
  const [trace, setTrace] = useState<{ step: number; state: string; symbol: string }[]>([]);
  
  // Challenge State
  const [prediction, setPrediction] = useState<'ACCEPT' | 'REJECT' | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);

  // Interval Ref for Auto Run
  const runInterval = useRef<NodeJS.Timeout | null>(null);

  const reset = () => {
    setCurrentIndex(0);
    setCurrentState(currentDfa.startState);
    setStatus('IDLE');
    setTrace([{ step: 0, state: currentDfa.startState, symbol: '' }]);
    if (runInterval.current) clearInterval(runInterval.current);
  };

  // Initialize on mount or preset change
  useEffect(() => {
    reset();
  }, [activePreset]);

  // Handle auto-run cleanup
  useEffect(() => {
    return () => { if (runInterval.current) clearInterval(runInterval.current); };
  }, []);

  const handleInputStringChange = (val: string) => {
    setInputString(val);
    reset();
    setPrediction(null);
    setConfidence(null);
  };

  const step = () => {
    if (status === 'ACCEPTED' || status === 'REJECTED' || status === 'INVALID') return;
    
    // Validate first
    const val = validateInputString(currentDfa, inputString);
    if (!val.isValid) {
      setStatus('INVALID');
      return;
    }

    if (currentIndex >= inputString.length) {
      // Reached the end
      const finalState = currentState || currentDfa.startState;
      const isAccepted = currentDfa.acceptStates.includes(finalState);
      setStatus(isAccepted ? 'ACCEPTED' : 'REJECTED');
      
      // If in challenge mode, check prediction and record learning event
      if (mode === 'CHALLENGE' && prediction && confidence) {
        const actual = isAccepted ? 'ACCEPT' : 'REJECT';
        const isCorrect = prediction === actual;
        
        recordPractice({
          id: `att_dfa_${Date.now()}`,
          questionId: `dfa_challenge_${Date.now()}`,
          topicId: 'top_dfa',
          userAnswer: prediction,
          isCorrect: isCorrect,
          predictedConfidence: confidence as any,
          errorType: isCorrect ? undefined : 'CONCEPTUAL',
          timestamp: Date.now()
        });
      }
      return;
    }

    const symbol = inputString[currentIndex];
    try {
      const stateToUse = currentState || currentDfa.startState;
      const nextState = stepDfa(currentDfa, stateToUse, symbol);
      
      setCurrentState(nextState);
      setCurrentIndex(prev => prev + 1);
      setTrace(prev => [...prev, { step: prev.length, state: nextState, symbol }]);
      
      if (status === 'IDLE') setStatus('PAUSED');
    } catch (e) {
      setStatus('INVALID');
    }
  };

  const run = () => {
    if (status === 'IDLE' || status === 'PAUSED') {
      setStatus('RUNNING');
      runInterval.current = setInterval(() => {
        // We need to use functional state updates or a ref to ensure fresh state inside setInterval
      }, 800);
    }
  };

  // A more React-friendly way to handle the run loop without stale closures
  useEffect(() => {
    if (status === 'RUNNING') {
      runInterval.current = setInterval(() => {
        step();
      }, 800);
    } else {
      if (runInterval.current) clearInterval(runInterval.current);
    }
    return () => { if (runInterval.current) clearInterval(runInterval.current); };
  }, [status, currentIndex, currentState, inputString, currentDfa, mode, prediction, confidence]);

  const activeTransition = currentState && currentIndex > 0 && currentIndex <= inputString.length
    ? { from: trace[trace.length - 2].state, to: currentState, symbol: inputString[currentIndex - 1] }
    : null;

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
      {/* HEADER / TABS */}
      <div className="flex border-b border-slate-800 bg-slate-900/50">
        <button onClick={() => setMode('LEARN')} className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'LEARN' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:bg-slate-800/50'}`}><Activity className="w-4 h-4 inline mr-2"/> Learn</button>
        <button onClick={() => setMode('EXPERIMENT')} className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'EXPERIMENT' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400 hover:bg-slate-800/50'}`}><FlaskConical className="w-4 h-4 inline mr-2"/> Experiment</button>
        <button onClick={() => setMode('CHALLENGE')} className={`flex-1 py-3 text-sm font-medium transition-colors ${mode === 'CHALLENGE' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-slate-400 hover:bg-slate-800/50'}`}><Target className="w-4 h-4 inline mr-2"/> Challenge</button>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        
        {/* PRESET SELECTOR & STRING INPUT */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-2">Preset DFA</label>
            <select 
              value={activePreset} 
              onChange={(e) => setActivePreset(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {PRESETS.map((p, i) => <option key={i} value={i}>{p.name}</option>)}
            </select>
          </div>
          
          <div className="flex-2 w-full md:w-2/3">
            <label className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-2">Input String</label>
            <input 
              type="text" 
              value={inputString}
              onChange={(e) => handleInputStringChange(e.target.value)}
              disabled={status === 'RUNNING' || (mode === 'CHALLENGE' && status !== 'IDLE')}
              placeholder="e.g. 10101"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-xl text-blue-400 tracking-widest focus:outline-none focus:border-blue-500 disabled:opacity-50"
            />
          </div>
        </div>

        {/* CHALLENGE CONTROLS */}
        {mode === 'CHALLENGE' && status === 'IDLE' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-orange-950/20 border border-orange-900/30 p-6 rounded-xl text-center space-y-6">
            <h3 className="text-lg font-light text-slate-200">Will this DFA accept the string <strong className="font-mono text-orange-400">{inputString || 'ε'}</strong>?</h3>
            <div className="flex justify-center gap-4">
              <button onClick={() => setPrediction('ACCEPT')} className={`px-6 py-2 rounded-lg font-medium transition-colors ${prediction === 'ACCEPT' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Accept</button>
              <button onClick={() => setPrediction('REJECT')} className={`px-6 py-2 rounded-lg font-medium transition-colors ${prediction === 'REJECT' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Reject</button>
            </div>
            {prediction && (
              <div>
                <p className="text-sm text-slate-400 mb-3">Confidence in your answer:</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button key={level} onClick={() => setConfidence(level)} className={`w-10 h-10 rounded-full font-medium transition-colors ${confidence === level ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{level}</button>
                  ))}
                </div>
              </div>
            )}
            {prediction && confidence && (
              <button onClick={step} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium mt-4">Start Simulation</button>
            )}
          </motion.div>
        )}

        {/* MAIN VISUALIZATION AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            
            {/* INPUT STRING TAPE */}
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-center gap-2 overflow-x-auto">
              {inputString.split('').map((char, i) => (
                <div key={i} className={`w-10 h-12 flex flex-col items-center justify-center rounded border font-mono text-lg transition-colors ${
                  i < currentIndex ? 'bg-slate-800 border-slate-700 text-slate-500' :
                  i === currentIndex ? 'bg-blue-900/30 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]' :
                  'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  {char}
                </div>
              ))}
              {inputString.length === 0 && <div className="text-slate-500 font-mono">ε (Empty String)</div>}
            </div>

            {/* SVG GRAPH */}
            <DfaGraph 
              {...currentDfa} 
              layout={currentLayout} 
              currentState={currentState} 
              activeTransition={activeTransition}
            />

            {/* CONTROLS */}
            <div className="flex justify-center gap-4">
              <button onClick={reset} className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"><RotateCcw className="w-5 h-5"/></button>
              {(mode !== 'CHALLENGE' || status !== 'IDLE') && (
                <>
                  <button onClick={status === 'RUNNING' ? () => setStatus('PAUSED') : run} disabled={status === 'ACCEPTED' || status === 'REJECTED' || status === 'INVALID'} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                    {status === 'RUNNING' ? <Pause className="w-5 h-5"/> : <Play className="w-5 h-5"/>}
                    {status === 'RUNNING' ? 'Pause' : 'Run'}
                  </button>
                  <button onClick={step} disabled={status === 'RUNNING' || status === 'ACCEPTED' || status === 'REJECTED' || status === 'INVALID'} className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors disabled:opacity-50">
                    <SkipForward className="w-5 h-5"/> Step
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* EXPLANATION PANEL */}
            {(mode === 'LEARN' || mode === 'CHALLENGE') && (
              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-xl h-full flex flex-col">
                <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4">Explanation</h3>
                
                <AnimatePresence mode="wait">
                  {status === 'IDLE' ? (
                     <motion.div key="idle" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-slate-400 text-sm leading-relaxed">
                       Ready to process. The DFA will start in <strong className="text-slate-200">{currentDfa.startState}</strong>.
                     </motion.div>
                  ) : status === 'INVALID' ? (
                     <motion.div key="inv" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-red-400 text-sm leading-relaxed flex items-center gap-2">
                       <ShieldAlert className="w-4 h-4"/> Input contains invalid symbols not in alphabet {`{${currentDfa.alphabet.join(',')}}`}.
                     </motion.div>
                  ) : (status === 'ACCEPTED' || status === 'REJECTED') ? (
                     <motion.div key="fin" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-sm leading-relaxed space-y-4">
                       <p className="text-slate-300">Input fully consumed.</p>
                       <p className="text-slate-300">Final state: <strong className="text-blue-300">{currentState}</strong>.</p>
                       <div className={`p-4 rounded-lg flex items-center gap-3 ${status === 'ACCEPTED' ? 'bg-green-950/30 text-green-400 border border-green-900/50' : 'bg-red-950/30 text-red-400 border border-red-900/50'}`}>
                         {status === 'ACCEPTED' ? <CheckCircle2 className="w-5 h-5"/> : <ShieldAlert className="w-5 h-5"/>}
                         <span className="font-bold tracking-widest">{status}</span>
                       </div>
                       {mode === 'CHALLENGE' && prediction && (
                         <div className="pt-4 border-t border-slate-800">
                           <p className="text-xs font-mono text-slate-500 mb-2">Your Prediction: {prediction}</p>
                           {prediction === (status === 'ACCEPTED' ? 'ACCEPT' : 'REJECT') 
                             ? <p className="text-green-400 text-sm">Correct! Excellent understanding.</p>
                             : <p className="text-red-400 text-sm">Incorrect. This has been logged in your Error Lab.</p>
                           }
                         </div>
                       )}
                     </motion.div>
                  ) : (
                     <motion.div key={`step-${currentIndex}`} initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-5}} className="space-y-4">
                       <p className="text-slate-300 text-sm">Read symbol <strong className="font-mono text-blue-300 bg-blue-900/30 px-1 rounded">{inputString[currentIndex-1]}</strong>.</p>
                       <p className="text-slate-300 text-sm">The DFA was in <strong className="font-mono text-slate-100">{trace[trace.length-2]?.state}</strong>.</p>
                       
                       <div className="bg-slate-950 border border-slate-800 p-3 rounded font-mono text-xs text-center text-blue-300">
                         δ({trace[trace.length-2]?.state}, {inputString[currentIndex-1]}) = {currentState}
                       </div>
                       
                       <p className="text-slate-300 text-sm">Moved to <strong className="font-mono text-slate-100">{currentState}</strong>.</p>
                     </motion.div>
                  )}
                </AnimatePresence>

                {/* COMPUTATION TRACE */}
                <div className="mt-8 flex-1">
                  <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Computation Trace</h3>
                  <div className="bg-slate-950 border border-slate-800 rounded overflow-hidden max-h-[200px] overflow-y-auto">
                    <table className="w-full text-xs font-mono text-left">
                      <thead className="bg-slate-900 text-slate-500 sticky top-0">
                        <tr><th className="p-2">Step</th><th className="p-2">Sym</th><th className="p-2">State</th></tr>
                      </thead>
                      <tbody>
                        {trace.map((tr, i) => (
                          <tr key={i} className={`border-t border-slate-800/50 ${i === trace.length - 1 ? 'bg-blue-900/20 text-blue-300' : 'text-slate-400'}`}>
                            <td className="p-2">{tr.step}</td>
                            <td className="p-2">{tr.symbol || '-'}</td>
                            <td className="p-2">{tr.state}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
