'use client';

import { motion } from 'framer-motion';
import { Network, CheckCircle2, AlertCircle, ZoomIn, ZoomOut, Maximize, RotateCcw, Target } from 'lucide-react';
import { useLearningStore } from '@/store/useLearningStore';
import Link from 'next/link';
import { useState, useRef, useEffect, MouseEvent, WheelEvent } from 'react';

// Dynamic layering calculation
function calculateLayers(topics: any[]) {
  const nodeLevels: Record<string, number> = {};
  let changed = true;
  
  // Init
  topics.forEach(t => nodeLevels[t.id] = 0);

  // Iterate to find max depth
  while(changed) {
    changed = false;
    topics.forEach(t => {
      let maxPre = -1;
      t.prerequisites.forEach((p: string) => {
        if (nodeLevels[p] > maxPre) maxPre = nodeLevels[p];
      });
      if (maxPre + 1 > nodeLevels[t.id]) {
        nodeLevels[t.id] = maxPre + 1;
        changed = true;
      }
    });
  }

  // Group by layer
  const layers: any[][] = [];
  topics.forEach(t => {
    const l = nodeLevels[t.id];
    if (!layers[l]) layers[l] = [];
    layers[l].push(t);
  });
  
  return layers;
}

export default function KnowledgeGraph() {
  const store = useLearningStore();
  const { progress } = store;
  const modules = store.modules.filter(m => m.subjectId === 'os');
  const moduleIds = new Set(modules.map(m => m.id));
  const topics = store.topics.filter(t => moduleIds.has(t.moduleId));
  const [filterMod, setFilterMod] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [transform, setTransform] = useState({ x: 0, y: 50, scale: 0.8 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Filter topics
  const filteredTopics = topics.filter(t => {
    if (filterMod !== 'ALL' && t.moduleId !== filterMod) return false;
    const p = progress.find(pr => pr.topicId === t.id);
    const status = p?.status || 'NOT_STARTED';
    if (filterStatus === 'NOT_STARTED' && status !== 'NOT_STARTED') return false;
    if (filterStatus === 'LEARNING' && status !== 'LEARNING') return false;
    if (filterStatus === 'WEAK' && status !== 'PRACTICING' && status !== 'LEARNING') return false;
    if (filterStatus === 'MASTERED' && status !== 'MASTERED') return false;
    return true;
  });

  // 2. Layout
  const layers = calculateLayers(filteredTopics);
  
  const NODE_WIDTH = 220;
  const NODE_HEIGHT = 90;
  const X_SPACING = 250;
  const Y_SPACING = 160;

  const nodes: { t: any; x: number; y: number }[] = [];
  const positions: Record<string, {x: number, y: number}> = {};

  layers.forEach((layerTopics, layerIdx) => {
    if (!layerTopics) return;
    const totalWidth = (layerTopics.length - 1) * X_SPACING;
    const startX = -totalWidth / 2;
    
    layerTopics.forEach((t, i) => {
      const x = startX + (i * X_SPACING);
      const y = layerIdx * Y_SPACING;
      positions[t.id] = { x, y };
      nodes.push({ t, x, y });
    });
  });

  const edges: { source: {x: number, y: number}; target: {x: number, y: number}; id: string }[] = [];
  filteredTopics.forEach(t => {
    t.prerequisites.forEach((pre: string) => {
      if (positions[pre] && positions[t.id]) {
        edges.push({ source: positions[pre], target: positions[t.id], id: pre+'-'+t.id });
      }
    });
  });

  const getStatusStyle = (status: string, mastery: number) => {
    if (status === 'MASTERED') return 'border-yellow-500/50 bg-yellow-950/40 text-yellow-300';
    if (status === 'COMPLETED') return 'border-green-500/50 bg-green-950/40 text-green-300';
    if (status === 'REVIEWING') return 'border-blue-500/50 bg-blue-950/40 text-blue-300';
    if (status === 'PRACTICING' || status === 'LEARNING') return 'border-blue-500/50 bg-blue-950/40 text-blue-300';
    return 'border-slate-700 bg-slate-900/50 text-slate-400';
  };

  const getStatusText = (status: string) => {
    if (status === 'MASTERED') return '★ MASTERED';
    if (status === 'COMPLETED') return '✓ COMPLETED';
    if (status === 'LEARNING' || status === 'PRACTICING' || status === 'REVIEWING') return '◉ LEARNING';
    return '○ NOT STARTED';
  };

  // Interaction handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAdjust = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform(prev => ({ ...prev, scale: Math.max(0.2, Math.min(prev.scale * scaleAdjust, 3)) }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTransform(prev => ({ ...prev, x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y }));
  };

  const handleMouseUp = () => setIsDragging(false);
  
  const zoomIn = () => setTransform(prev => ({...prev, scale: Math.min(prev.scale * 1.2, 3)}));
  const zoomOut = () => setTransform(prev => ({...prev, scale: Math.max(prev.scale * 0.8, 0.2)}));
  const resetZoom = () => setTransform({ x: 0, y: 50, scale: 0.8 });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-[85vh]">
      <header className="mb-6 flex-shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light mb-2">Knowledge Graph</h1>
          <p className="text-slate-400">Deterministic dependency mapping of the Theory of Computation syllabus.</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Module</span>
            <select className="bg-slate-900 border border-slate-700 rounded p-1 text-sm outline-none focus:border-blue-500" value={filterMod} onChange={e => setFilterMod(e.target.value)}>
              <option value="ALL">All Modules</option>
              {modules.map(m => (
                <option key={m.id} value={m.id}>{m.title.split(':')[0]}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Status</span>
            <select className="bg-slate-900 border border-slate-700 rounded p-1 text-sm outline-none focus:border-blue-500" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="ALL">All Status</option>
              <option value="NOT_STARTED">Not Started</option>
              <option value="LEARNING">Learning</option>
              <option value="WEAK">Weak / Practicing</option>
              <option value="MASTERED">Mastered</option>
            </select>
          </div>
        </div>
      </header>
      
      <div 
        ref={containerRef}
        className="relative flex-grow border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
        
        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex gap-2 z-20 bg-slate-900/80 p-2 rounded-lg border border-slate-800 backdrop-blur-sm">
          <button onClick={zoomOut} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><ZoomOut className="w-4 h-4"/></button>
          <button onClick={zoomIn} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><ZoomIn className="w-4 h-4"/></button>
          <button onClick={resetZoom} className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"><RotateCcw className="w-4 h-4"/></button>
        </div>

        {/* Canvas */}
        <div 
          className="absolute inset-0 origin-center transition-transform duration-75"
          style={{ transform: `translate(calc(50% + ${transform.x}px), calc(${transform.y}px)) scale(${transform.scale})` }}
        >
          {/* Edges */}
          <svg className="absolute inset-0 overflow-visible pointer-events-none z-0">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
              </marker>
            </defs>
            {edges.map((edge) => {
              // Path from bottom of source to top of target
              const sx = edge.source.x;
              const sy = edge.source.y + (NODE_HEIGHT / 2);
              const tx = edge.target.x;
              const ty = edge.target.y - (NODE_HEIGHT / 2) - 4; // offset for arrow
              return (
                <path
                  key={edge.id}
                  d={`M ${sx} ${sy} C ${sx} ${sy + 40}, ${tx} ${ty - 40}, ${tx} ${ty}`}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                  opacity={0.6}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(({t, x, y}) => {
            const p = progress.find(pr => pr.topicId === t.id);
            const status = p?.status || 'NOT_STARTED';
            const mastery = p?.mastery || 0;
            const style = getStatusStyle(status, mastery);

            return (
              <Link href={`/os/topic/${t.id}`} key={t.id}>
                <div 
                  className={`absolute flex flex-col justify-center border shadow-xl rounded-xl p-4 transition-all duration-200 hover:ring-2 hover:ring-blue-500/50 hover:shadow-blue-900/20 hover:z-20 group bg-slate-900 backdrop-blur-md ${style}`}
                  style={{ 
                    width: NODE_WIDTH, 
                    height: NODE_HEIGHT,
                    left: x - (NODE_WIDTH / 2),
                    top: y - (NODE_HEIGHT / 2)
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider opacity-70 truncate max-w-[120px]">{t.id}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/20 uppercase">{getStatusText(status)}</span>
                  </div>
                  <h3 className="font-medium text-sm leading-tight line-clamp-2 text-slate-100 group-hover:text-white">{t.title}</h3>
                  <div className="absolute bottom-0 left-0 h-1 bg-black/20 w-full rounded-b-xl overflow-hidden">
                    <div className="h-full bg-blue-500/50" style={{ width: `${mastery}%` }}></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
