import React from 'react';

export default function OsDiagrams({ topicId }: { topicId: string }) {
  switch (topicId) {
    case 'os_m1_14': // Process States
      return (
        <div className="my-8 p-6 bg-slate-900 border border-slate-700 rounded-xl overflow-x-auto text-center">
          <h4 className="text-sm font-mono text-slate-400 mb-4 uppercase">Process State Transition Diagram</h4>
          <svg width="600" height="250" viewBox="0 0 600 250" className="mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#3b82f6" strokeWidth="2" fill="#1e293b">
              <rect x="50" y="100" width="80" height="40" rx="20"/>
              <text x="90" y="125" fill="#93c5fd" fontSize="12" textAnchor="middle" stroke="none">NEW</text>

              <rect x="200" y="100" width="80" height="40" rx="20"/>
              <text x="240" y="125" fill="#93c5fd" fontSize="12" textAnchor="middle" stroke="none">READY</text>

              <rect x="350" y="100" width="80" height="40" rx="20"/>
              <text x="390" y="125" fill="#93c5fd" fontSize="12" textAnchor="middle" stroke="none">RUNNING</text>

              <rect x="500" y="100" width="80" height="40" rx="20"/>
              <text x="540" y="125" fill="#93c5fd" fontSize="12" textAnchor="middle" stroke="none">TERM</text>

              <rect x="275" y="180" width="80" height="40" rx="20"/>
              <text x="315" y="205" fill="#93c5fd" fontSize="12" textAnchor="middle" stroke="none">WAITING</text>
            </g>
            <g stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)">
              {/* New -> Ready */}
              <line x1="130" y1="120" x2="190" y2="120"/>
              {/* Ready -> Running */}
              <line x1="280" y1="115" x2="340" y2="115"/>
              {/* Running -> Ready */}
              <line x1="340" y1="125" x2="280" y2="125"/>
              {/* Running -> Term */}
              <line x1="430" y1="120" x2="490" y2="120"/>
              {/* Running -> Waiting */}
              <line x1="390" y1="140" x2="335" y2="180"/>
              {/* Waiting -> Ready */}
              <line x1="295" y1="180" x2="240" y2="140"/>
            </g>
            <g fill="#94a3b8" fontSize="10">
              <text x="160" y="110" textAnchor="middle">admitted</text>
              <text x="310" y="105" textAnchor="middle">scheduler dispatch</text>
              <text x="310" y="140" textAnchor="middle">interrupt</text>
              <text x="460" y="110" textAnchor="middle">exit</text>
              <text x="390" y="170" textAnchor="middle">I/O or event wait</text>
              <text x="240" y="170" textAnchor="middle">I/O or event completion</text>
            </g>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
              </marker>
            </defs>
          </svg>
        </div>
      );
      
    case 'os_m1_19': // Thread vs Process
      return (
        <div className="my-8 p-6 bg-slate-900 border border-slate-700 rounded-xl overflow-x-auto">
          <h4 className="text-sm font-mono text-slate-400 mb-4 uppercase text-center">Process vs Thread Memory Model</h4>
          <div className="flex justify-center gap-12 text-xs font-mono">
            <div className="border border-blue-500 rounded p-4 w-48 text-center bg-slate-800">
              <div className="font-bold text-blue-400 mb-2">Process (Single Thread)</div>
              <div className="border border-slate-600 p-2 mb-1 bg-slate-700 text-slate-300">Code / Text</div>
              <div className="border border-slate-600 p-2 mb-1 bg-slate-700 text-slate-300">Data (Globals)</div>
              <div className="border border-slate-600 p-2 mb-1 bg-slate-700 text-slate-300">Heap (Dynamic)</div>
              <div className="border border-slate-600 p-2 mt-4 bg-slate-600 text-white">Stack</div>
              <div className="border border-slate-600 p-2 mt-1 bg-slate-600 text-white">Registers / PC</div>
            </div>
            
            <div className="border border-green-500 rounded p-4 w-64 text-center bg-slate-800">
              <div className="font-bold text-green-400 mb-2">Process (Multi-Threaded)</div>
              <div className="border border-slate-600 p-2 mb-1 bg-slate-700 text-slate-300">Code / Text (Shared)</div>
              <div className="border border-slate-600 p-2 mb-1 bg-slate-700 text-slate-300">Data / Heap (Shared)</div>
              <div className="flex justify-between mt-4 gap-2">
                <div className="w-1/2">
                  <div className="border border-slate-600 p-2 bg-slate-600 text-white">Stack T1</div>
                  <div className="border border-slate-600 p-2 mt-1 bg-slate-600 text-white">Reg T1</div>
                </div>
                <div className="w-1/2">
                  <div className="border border-slate-600 p-2 bg-slate-600 text-white">Stack T2</div>
                  <div className="border border-slate-600 p-2 mt-1 bg-slate-600 text-white">Reg T2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'os_m2_24': // RAG
      return (
        <div className="my-8 p-6 bg-slate-900 border border-slate-700 rounded-xl overflow-x-auto text-center">
          <h4 className="text-sm font-mono text-slate-400 mb-4 uppercase">Resource Allocation Graph (Deadlock Cycle)</h4>
          <svg width="400" height="200" viewBox="0 0 400 200" className="mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)">
              <line x1="130" y1="70" x2="190" y2="70"/>
              <line x1="210" y1="90" x2="210" y2="130"/>
              <line x1="190" y1="150" x2="130" y2="150"/>
              <line x1="110" y1="130" x2="110" y2="90"/>
            </g>
            <g fill="#1e293b" stroke="#3b82f6" strokeWidth="2">
              <circle cx="110" cy="70" r="20"/>
              <circle cx="210" cy="150" r="20"/>
              <rect x="190" y="50" width="40" height="40"/>
              <rect x="90" y="130" width="40" height="40"/>
            </g>
            <g fill="#93c5fd" fontSize="12" textAnchor="middle">
              <text x="110" y="74">P1</text>
              <text x="210" y="154">P2</text>
              <text x="210" y="74">R1</text>
              <text x="110" y="154">R2</text>
            </g>
            <defs>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
          <p className="text-xs font-mono text-slate-500 mt-2">P1 requests R1 (held by P2). P2 requests R2 (held by P1). Circular wait = Deadlock.</p>
        </div>
      );

    default:
      return null;
  }
}
