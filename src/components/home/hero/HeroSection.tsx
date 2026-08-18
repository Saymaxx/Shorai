'use client';

import { useState, useEffect } from 'react';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Small optimization: only update state if moved significantly, or use rAF, but this is fine for now
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] lg:min-h-[95vh] w-full bg-[#050505] overflow-hidden flex items-center pt-24 pb-12"
    >
      {/* LAYER 1: Background & Cinematic Gradients (0ms load) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Dark cyan/blue atmosphere (Left) */}
        <div 
          className="absolute top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#00BFFF]/5 rounded-full blur-[130px] mix-blend-screen transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)` }}
        />
        
        {/* Dark orange atmosphere (Right) */}
        <div 
          className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-[#FF6B00]/5 rounded-full blur-[150px] mix-blend-screen transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` }}
        />

        {/* Deep electric blue glow behind student */}
        <div 
          className="absolute top-[50%] right-[15%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#7B2DFF]/10 rounded-full blur-[120px] mix-blend-screen transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
        />
        
        {/* Subtle Star/Particle Layer */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-center mix-blend-overlay" />
      </motion.div>

      {/* Main 45/55 Layout */}
      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center h-full">
        
        {/* LEFT: Content & Conversion (45%) */}
        <div className="w-full lg:w-[45%] xl:w-[42%] flex-shrink-0 relative z-20">
          <HeroContent />
        </div>

        {/* RIGHT: Immersive Visual Experience (55%) */}
        {/* Using absolute positioning on desktop so it bleeds naturally and overlaps toward center */}
        <div className="w-full lg:w-[55%] xl:w-[58%] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 h-[500px] lg:h-[120%] flex items-center justify-end pointer-events-none z-10 mt-12 lg:mt-0">
          <HeroVisual mousePosition={mousePosition} />
        </div>

      </div>
    </section>
  );
}
