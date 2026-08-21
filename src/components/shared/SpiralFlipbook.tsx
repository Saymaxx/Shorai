'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

export interface FlipbookPage {
  id: string;
  pageNumber: number;
  title: string;
  badge?: string;
  color?: string;
  content: React.ReactNode;
}

interface SpiralFlipbookProps {
  pages: FlipbookPage[];
  activePageIndex: number;
  onPageChange: (index: number) => void;
  className?: string;
}

const pageVariants: Variants = {
  enter: (direction: 'next' | 'prev') => ({
    opacity: 0,
    rotateY: direction === 'next' ? 45 : -45,
    scale: 0.95,
    transformOrigin: 'left center',
  }),
  center: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transformOrigin: 'left center',
  },
  exit: (direction: 'next' | 'prev') => ({
    opacity: 0,
    rotateY: direction === 'next' ? -45 : 45,
    scale: 0.95,
    transformOrigin: 'left center',
  }),
};

export default function SpiralFlipbook({
  pages,
  activePageIndex,
  onPageChange,
  className = '',
}: SpiralFlipbookProps) {
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const currentPage = pages[activePageIndex] || pages[0];

  const handleNext = () => {
    if (activePageIndex < pages.length - 1) {
      setFlipDirection('next');
      onPageChange(activePageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activePageIndex > 0) {
      setFlipDirection('prev');
      onPageChange(activePageIndex - 1);
    }
  };

  // Generate spiral rings (12 rings down the spine)
  const ringCount = 12;
  const rings = Array.from({ length: ringCount });

  return (
    <div className={`relative w-full max-w-[580px] mx-auto select-none ${className}`}>
      
      {/* 3D Perspective Book Container */}
      <div 
        className="relative perspective-[1400px] w-full"
        style={{ perspective: 1400 }}
      >
        
        {/* Layered Under-Pages (Stack Depth Effect) */}
        <div className="absolute inset-0 bg-card/60 rounded-3xl border border-border translate-x-3 translate-y-3 shadow-lg pointer-events-none -z-20" />
        <div className="absolute inset-0 bg-card/80 rounded-3xl border border-border translate-x-1.5 translate-y-1.5 shadow-md pointer-events-none -z-10" />

        {/* Main Spiral Notebook Wrapper */}
        <div className="relative rounded-3xl bg-card border border-border shadow-2xl overflow-hidden pl-10 sm:pl-12 pr-6 sm:pr-8 py-7 sm:py-8 min-h-[460px] sm:min-h-[500px] flex flex-col justify-between">
          
          {/* ── REALISTIC 3D SPIRAL SPINE RINGS (Left Edge) ── */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-12 bg-gradient-to-r from-muted/80 via-muted/40 to-transparent border-r border-border/60 flex flex-col justify-around items-center py-5 pointer-events-none z-30">
            {rings.map((_, i) => (
              <div key={i} className="relative flex items-center justify-center w-full my-0.5">
                {/* Spiral Hole on paper */}
                <div className="w-2.5 h-2.5 rounded-full bg-background border border-border shadow-inner" />
                
                {/* 3D Metallic Spiral Loop */}
                <div className="absolute left-1 w-6 sm:w-7 h-3 rounded-full border-t-2 border-l-2 border-r-2 border-foreground/30 shadow-[0_2px_4px_rgba(0,0,0,0.25)] bg-gradient-to-b from-white/40 via-muted to-black/20 transform -rotate-12" />
                
                {/* Spiral Shadow */}
                <div className="absolute left-2.5 w-4 h-1 bg-black/20 rounded-full blur-[1px]" />
              </div>
            ))}
          </div>

          {/* ── FLIPPING PAGE CONTENT WITH 3D TURNING ANIMATION ── */}
          <div className="relative z-20 flex-1 flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait" custom={flipDirection}>
              <motion.div
                key={currentPage.id}
                custom={flipDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="w-full flex-1 flex flex-col justify-between"
              >
                {/* Top Page Header Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/70">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider border shadow-sm"
                      style={{
                        background: currentPage.color ? `${currentPage.color}15` : 'var(--primary)/10',
                        borderColor: currentPage.color ? `${currentPage.color}35` : 'var(--primary)/25',
                        color: currentPage.color || 'var(--primary)',
                      }}
                    >
                      {currentPage.badge || 'INTERACTIVE SHEET'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>PAGE {String(currentPage.pageNumber).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Custom Page Body */}
                <div className="flex-1">
                  {currentPage.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── FLIPBOOK FOOTER CONTROLS ── */}
          <div className="relative z-20 pt-4 mt-4 border-t border-border/70 flex items-center justify-between">
            {/* Prev Button */}
            <button
              disabled={activePageIndex === 0}
              onClick={handlePrev}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-border bg-muted/40 hover:bg-muted disabled:opacity-30 disabled:pointer-events-none text-foreground transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev Page</span>
            </button>

            {/* Page Navigation Dots */}
            <div className="flex items-center gap-1.5">
              {pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setFlipDirection(idx > activePageIndex ? 'next' : 'prev');
                    onPageChange(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activePageIndex === idx
                      ? 'w-6 bg-primary shadow-sm'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                  }`}
                  aria-label={`Jump to page ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              disabled={activePageIndex === pages.length - 1}
              onClick={handleNext}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              aria-label="Next Page"
            >
              <span className="hidden sm:inline">Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
