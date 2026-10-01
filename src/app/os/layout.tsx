'use client';

import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Compass, BarChart, Settings, BookOpen, BrainCircuit, Target as TargetIcon, AlertOctagon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLearningStore } from '@/store/useLearningStore';

export default function OSLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const init = useLearningStore(state => state.init);
  const isInitialized = useLearningStore(state => state.isInitialized);

  useEffect(() => {
    init();
  }, [init]);

  const navItems = [
    { name: 'Dashboard', icon: Compass, href: '/os' },
    { name: 'Targets', icon: TargetIcon, href: '/os/targets' },
    { name: 'Syllabus', icon: BookOpen, href: '/os/syllabus' },
    { name: 'Practice', icon: BrainCircuit, href: '/os/practice' },
    { name: 'Error Lab', icon: AlertOctagon, href: '/os/errors' },
    { name: 'Knowledge Graph', icon: Share2, href: '/os/graph' },
    { name: 'Analytics', icon: BarChart, href: '/os/analytics' },
    { name: 'Settings', icon: Settings, href: '/os/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30 flex">
      {/* Scientific/Mathematical Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800/50 bg-slate-950/50 backdrop-blur-xl relative z-20 flex flex-col">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-blue-400">Σ</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide text-slate-100">OS Lab</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Formal Systems</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}>
                  <item.icon className="w-4 h-4" />
                  <span className={isActive ? 'font-medium' : 'font-light'}>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800/50">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>ENGINE: ACTIVE</span>
            <span className="text-blue-500">v1.0.4</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="p-10 max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
