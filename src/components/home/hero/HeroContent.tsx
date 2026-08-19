'use client';

import { motion } from 'framer-motion';
import HeroCTA from './HeroCTA';
import TrustMetrics from './TrustMetrics';

export default function HeroContent() {
  return (
    <div className="flex flex-col items-start z-20 relative w-full pr-0 md:pr-8">

      {/* Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.10] mb-8 backdrop-blur-xl"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_10px_#FF6B00] animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.28em] text-white/75 uppercase font-mono">
          THE FUTURE OF STEM EDUCATION
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="font-[900] tracking-[-0.02em] leading-[1.02] mb-7 flex flex-col text-white"
        style={{ fontSize: 'clamp(52px, 5.8vw, 88px)' }}
      >
        <span className="text-white">BUILD THE NEXT</span>
        <span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7B2DFF]">
            GENERATION
          </span>
          <span className="text-white"> OF</span>
        </span>
        <span className="flex items-baseline">
          <span className="text-white">INNOVATORS</span>
          <span
            className="text-[#FF6B00] ml-0.5"
            style={{ textShadow: '0 0 18px rgba(255,107,0,0.7)' }}
          >
            .
          </span>
        </span>
      </motion.h1>

      {/* Horizontal rule accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-px bg-gradient-to-r from-[#00d4ff] to-transparent mb-7 origin-left"
      />

      {/* Sub-headline */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-1.5 mb-10"
      >
        <h2 className="text-xl md:text-[21px] font-semibold text-white/92 tracking-tight">
          Future-ready STEM education for schools.
        </h2>
        <p className="text-[16px] text-white/50 max-w-[400px] leading-relaxed font-normal">
          Hands-on learning powered by AI, Robotics, Coding&nbsp;&amp; Drones —
          built for the K-12 classroom.
        </p>
      </motion.div>

      {/* CTAs */}
      <HeroCTA />

      {/* Trust Metrics */}
      <TrustMetrics />

    </div>
  );
}
