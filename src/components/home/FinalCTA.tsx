'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Sparkles, ShieldCheck, Zap, Rocket, Star } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import Link from 'next/link';

export default function FinalCTA() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-28 px-4 sm:px-6 bg-background border-t border-border transition-colors duration-300">
      
      {/* ── MOTION GRAPHIC: Rotating Cybernetic Concentric Warp Portal ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {/* Outer orbital ring */}
        <motion.div
          className="w-[680px] sm:w-[850px] h-[680px] sm:h-[850px] rounded-full border border-primary/20 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        {/* Mid reverse ring */}
        <motion.div
          className="absolute w-[500px] sm:w-[620px] h-[500px] sm:h-[620px] rounded-full border border-secondary/25 border-dotted"
          animate={{ rotate: -360, scale: [1, 1.05, 1] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner intense glowing core aura */}
        <motion.div
          className="absolute w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#7928CA]/20 via-[#6366F1]/25 to-[#00D4FF]/20 blur-[90px]"
          animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">

        {/* Robot Badge */}
        <SectionReveal>
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-8 bg-card border border-primary/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] text-primary group">
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <Bot className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTITUTIONAL ACCELERATION</span>
          </div>

          <h2
            className="font-black tracking-tight text-foreground mb-6"
            style={{ fontSize: 'clamp(38px, 6vw, 80px)', lineHeight: 1.05 }}
          >
            THE FUTURE WON&apos;T{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#00D4FF] to-[#FF6B00]">
              BUILD ITSELF.
            </span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Equip your school and students with turnkey robotics labs, NEP-aligned curricula, and hands-on AI sandboxes to lead tomorrow&apos;s world.
          </p>
        </SectionReveal>

        {/* Micro highlights pill */}
        <SectionReveal delay={0.16}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs font-mono font-semibold text-muted-foreground">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/40 border border-border">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Turnkey Setup</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/40 border border-border">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Zero Friction Deployment</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/40 border border-border">
              <Star className="w-3.5 h-3.5 text-primary" />
              <span>SEG Academy Certified</span>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            {/* Primary CTA */}
            <MagneticWrapper>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto h-14 px-8 sm:px-10 rounded-2xl text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(99,102,241,0.4)] transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                }}
              >
                <span>To know more about us contact us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticWrapper>

            {/* Secondary CTA */}
            <Link href="/labs" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold text-sm sm:text-base text-foreground bg-card border border-border hover:border-primary/40 transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                <Rocket className="w-4 h-4 text-primary" />
                <span>Explore Shorai Labs</span>
              </button>
            </Link>
          </div>
        </SectionReveal>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
