'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useLearningStore } from '@/store/useLearningStore';
import { ArrowRight, Cpu, Network } from 'lucide-react';

export default function SubjectSelection() {
  const router = useRouter();
  const setTransitioning = useAppStore((state) => state.setTransitioning);
  const { isInitialized, subjects, init } = useLearningStore();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      init();
    }
  }, [isInitialized, init]);

  const handleSelect = (slug: string, name: string) => {
    setSelectedSlug(slug);
    setSelectedName(name);
    setTransitioning(true);
    
    // Simulate cinematic transition delay before navigating
    setTimeout(() => {
      router.push('/' + slug);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col items-center justify-center p-8 overflow-hidden relative">
      
      {/* Background static nodes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900 rounded-full mix-blend-screen filter blur-[100px]" />
      </div>

      <AnimatePresence>
        {!selectedSlug && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="z-10 flex flex-col items-center max-w-2xl w-full"
          >
            <p className="text-neutral-400 tracking-[0.3em] text-sm mb-4 uppercase">Scientific Learning Engine</p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
              WHAT ARE YOU LEARNING?
            </h1>

            <div className="w-full max-w-sm flex flex-col gap-6">
              {!isInitialized ? (
                 <div className="p-12 text-center text-slate-400">Loading Engine...</div>
              ) : (
                subjects.map((subject, index) => (
                  <button
                    key={subject.id}
                    onClick={() => handleSelect(subject.slug, subject.name)}
                    className="group relative w-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/50 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 overflow-hidden text-left"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-blue-400 tracking-wider">SUBJECT 0{index + 1}</span>
                        <Cpu className="w-5 h-5 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                      
                      <h2 className="text-3xl font-medium tracking-tight mb-2">{subject.slug.toUpperCase()}</h2>
                      <p className="text-neutral-400 font-light mb-8">{subject.name}</p>
                      
                      <div className="flex items-center text-sm text-neutral-300 group-hover:text-blue-300 transition-colors">
                        Explore Environment <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Transition Overlay */}
      <AnimatePresence>
        {selectedSlug && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950"
          >
            {/* Grid background that fades in */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Animating State Nodes */}
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-16 h-16 border-2 border-blue-500 rounded-full flex items-center justify-center bg-neutral-950 z-20 relative"
              >
                <div className="w-12 h-12 border border-blue-500/50 rounded-full" />
              </motion.div>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 150 }}
                transition={{ delay: 0.8, duration: 0.7, ease: "easeInOut" }}
                className="h-[2px] bg-blue-500/50 origin-left z-10"
              />

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="w-16 h-16 border-2 border-double border-blue-400 rounded-full flex items-center justify-center bg-neutral-950 z-20"
              >
                <Network className="w-6 h-6 text-blue-400" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute bottom-1/4 text-center"
            >
              <h2 className="text-2xl font-light tracking-[0.2em] text-blue-100">{selectedName?.toUpperCase()}</h2>
              <p className="text-blue-500/70 text-sm tracking-widest mt-2 uppercase font-mono">Initializing Environment...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
