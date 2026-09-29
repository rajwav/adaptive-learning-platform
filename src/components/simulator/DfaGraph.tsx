import React from 'react';
import { motion } from 'framer-motion';

export interface NodeLayout {
  id: string;
  x: number;
  y: number;
}

export interface DfaGraphProps {
  states: string[];
  startState: string;
  acceptStates: string[];
  transitions: Record<string, Record<string, string>>;
  layout: NodeLayout[];
  currentState: string | null;
  activeTransition: { from: string; to: string; symbol: string } | null;
}

export default function DfaGraph({ states, startState, acceptStates, transitions, layout, currentState, activeTransition }: DfaGraphProps) {
  // SVG viewBox config
  const minX = Math.min(...layout.map(l => l.x)) - 100;
  const maxX = Math.max(...layout.map(l => l.x)) + 100;
  const minY = Math.min(...layout.map(l => l.y)) - 100;
  const maxY = Math.max(...layout.map(l => l.y)) + 100;
  const width = maxX - minX;
  const height = maxY - minY;

  const getNodePos = (id: string) => layout.find(l => l.id === id) || { x: 0, y: 0 };

  // Calculate edges with support for curved parallel lines and self-loops
  const renderEdges = () => {
    const edges: React.ReactNode[] = [];
    
    // Group transitions by from-to pair to handle bi-directional and multi-symbol edges
    const edgeGroups: Record<string, string[]> = {};
    Object.keys(transitions).forEach(from => {
      Object.keys(transitions[from]).forEach(symbol => {
        const to = transitions[from][symbol];
        const key = `${from}->${to}`;
        if (!edgeGroups[key]) edgeGroups[key] = [];
        edgeGroups[key].push(symbol);
      });
    });

    Object.keys(edgeGroups).forEach((key, index) => {
      const [from, to] = key.split('->');
      const symbols = edgeGroups[key].join(', ');
      const p1 = getNodePos(from);
      const p2 = getNodePos(to);
      const isActive = activeTransition?.from === from && activeTransition?.to === to && symbols.includes(activeTransition.symbol);

      if (from === to) {
        // Self-loop (draw a circle above the node)
        const radius = 25;
        const cx = p1.x;
        const cy = p1.y - 40;
        edges.push(
          <g key={`edge-${index}`} className={`transition-all duration-300 ${isActive ? 'text-blue-400' : 'text-slate-600'}`}>
            <path
              d={`M ${p1.x - 10} ${p1.y - 20} A ${radius} ${radius} 0 1 1 ${p1.x + 10} ${p1.y - 20}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={isActive ? "3" : "2"}
              markerEnd={`url(#arrowhead-${isActive ? 'active' : 'normal'})`}
            />
            <text x={cx} y={cy - 20} fill="currentColor" fontSize="14" textAnchor="middle" fontWeight="bold">
              {symbols}
            </text>
          </g>
        );
      } else {
        // Line between distinct nodes
        // Check if there's a reverse edge
        const reverseKey = `${to}->${from}`;
        const hasReverse = !!edgeGroups[reverseKey];
        
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Node radius is 25, adjust points to touch the edge
        const nx = dx / dist;
        const ny = dy / dist;
        
        let startX = p1.x + nx * 25;
        let startY = p1.y + ny * 25;
        let endX = p2.x - nx * 25;
        let endY = p2.y - ny * 25;

        let pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
        let textX = p1.x + dx / 2;
        let textY = p1.y + dy / 2 - 10;

        if (hasReverse) {
          // Curve the line
          const curveOffset = 30;
          const cx = textX - ny * curveOffset;
          const cy = textY + nx * curveOffset;
          pathD = `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;
          textX = cx - ny * 10;
          textY = cy + nx * 10;
        }

        edges.push(
          <g key={`edge-${index}`} className={`transition-all duration-300 ${isActive ? 'text-blue-400' : 'text-slate-600'}`}>
            <path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth={isActive ? "3" : "2"}
              markerEnd={`url(#arrowhead-${isActive ? 'active' : 'normal'})`}
            />
            <text x={textX} y={textY} fill="currentColor" fontSize="14" textAnchor="middle" fontWeight="bold">
              {symbols}
            </text>
          </g>
        );
      }
    });

    return edges;
  };

  return (
    <div className="w-full overflow-x-auto touch-pan-x cursor-grab active:cursor-grabbing bg-slate-900/50 rounded-2xl border border-slate-800">
      <svg 
        viewBox={`${minX} ${minY} ${width} ${height}`} 
        className="w-full h-auto min-w-[500px] min-h-[300px] max-h-[500px]"
      >
        <defs>
          <marker id="arrowhead-normal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
          </marker>
          <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
          </marker>
        </defs>

        {/* Start State Indicator */}
        {startState && (
          <g className="text-slate-500">
            <path 
              d={`M ${getNodePos(startState).x - 60} ${getNodePos(startState).y} L ${getNodePos(startState).x - 30} ${getNodePos(startState).y}`} 
              stroke="currentColor" 
              strokeWidth="2" 
              markerEnd="url(#arrowhead-normal)" 
            />
            <text x={getNodePos(startState).x - 80} y={getNodePos(startState).y + 4} fill="currentColor" fontSize="12" fontWeight="bold">
              start
            </text>
          </g>
        )}

        {/* Edges */}
        {renderEdges()}

        {/* Nodes */}
        {states.map(state => {
          const pos = getNodePos(state);
          const isAccept = acceptStates.includes(state);
          const isActive = currentState === state;
          
          return (
            <g key={state} transform={`translate(${pos.x}, ${pos.y})`}>
              <motion.circle
                initial={false}
                animate={{
                  r: 25,
                  fill: isActive ? '#1e3a8a' : '#0f172a',
                  stroke: isActive ? '#60a5fa' : '#334155',
                  strokeWidth: isActive ? 4 : 2
                }}
                className="transition-colors duration-300"
              />
              {isAccept && (
                <motion.circle
                  initial={false}
                  animate={{
                    r: 20,
                    fill: 'none',
                    stroke: isActive ? '#60a5fa' : '#334155',
                    strokeWidth: isActive ? 2 : 1
                  }}
                />
              )}
              <text 
                y="5" 
                textAnchor="middle" 
                className={`font-mono text-sm font-bold ${isActive ? 'fill-blue-200' : 'fill-slate-300'}`}
              >
                {state}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
