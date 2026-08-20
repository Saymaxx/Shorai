'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import HeroCTA from './HeroCTA';
import TrustMetrics from './TrustMetrics';
import ContactModal from '@/components/shared/ContactModal';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function HeroContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="flex flex-col items-start z-20 relative w-full pr-0 lg:pr-6">
      
      {/* SEG Academy Eyebrow badge */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-6 backdrop-blur-xl shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase font-mono">
          AN EDUCATION INNOVATION INITIATIVE BY SEG ACADEMY
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-black tracking-[-0.03em] leading-[1.04] mb-6 flex flex-col text-foreground"
        style={{ fontSize: 'clamp(44px, 5.2vw, 76px)' }}
      >
        <span>BUILDING FUTURE</span>
        <span className="flex items-center flex-wrap">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#00D4FF] to-[#FF6B00]">
            INNOVATORS
          </span>
        </span>
        <span className="flex items-baseline">
          <span>WITH AI &amp; ROBOTICS</span>
          <span className="text-primary ml-0.5">.</span>
        </span>
      </motion.h1>

      {/* Key Focus Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-primary mb-5 uppercase"
      >
        AI &bull; ROBOTICS &bull; STEM &bull; CODING &bull; INNOVATION LABS
      </motion.div>

      {/* Layman-friendly Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="flex flex-col gap-1.5 mb-8"
      >
        <h2 className="text-lg md:text-xl font-semibold text-foreground/95 tracking-tight">
          Transforming schools into future-ready learning ecosystems.
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed font-normal">
          We empower K-12 students with practical, project-based STEM education, real robotics kits, interactive 3D learning, and industry-grade innovation labs.
        </p>
      </motion.div>

      {/* Primary & Secondary CTAs including "To know more about us contact us" */}
      <HeroCTA onContactClick={() => setIsContactOpen(true)} />

      {/* Trust Metrics from Brochure */}
      <TrustMetrics />

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
