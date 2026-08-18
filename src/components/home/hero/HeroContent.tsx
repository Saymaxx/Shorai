'use client';

import { motion } from 'framer-motion';
import HeroCTA from './HeroCTA';
import TrustMetrics from './TrustMetrics';

export default function HeroContent() {
  return (
    <div className="flex flex-col items-start pt-20 lg:pt-0 z-20 relative w-full pr-0 md:pr-10">
      
      {/* Eyebrow */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-xl"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#FF6B00]" />
        <span className="text-[10px] font-bold tracking-[0.25em] text-white/80 uppercase">
          THE FUTURE OF STEM EDUCATION
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="font-[900] tracking-tight leading-[1.05] mb-6 flex flex-col text-white"
        style={{ fontSize: 'clamp(56px, 6vw, 92px)' }}
      >
        <span>BUILD THE NEXT</span>
        <span className="flex items-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF2A6D] via-[#7B2DFF] to-[#00BFFF]">
            GENERATION
          </span>
          <span className="ml-[0.1em]">OF</span>
        </span>
        <span className="flex items-center">
          INNOVATORS
          <span className="text-[#FF6B00] drop-shadow-[0_0_15px_rgba(255,107,0,0.8)] leading-[0.5] -translate-y-[0.05em]">.</span>
        </span>
      </motion.h1>

      {/* Supporting Text */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-1.5 mb-10"
      >
        <h3 className="text-xl md:text-[22px] font-semibold text-white/95 tracking-wide">
          Future-ready STEM education for schools.
        </h3>
        <p className="text-[17px] text-muted-foreground/90 max-w-md leading-relaxed font-medium">
          Hands-on learning powered by AI, Robotics, Coding & Drones.
        </p>
      </motion.div>

      {/* CTAs */}
      <HeroCTA />

      {/* Trust Metrics */}
      <TrustMetrics />
      
    </div>
  );
}
