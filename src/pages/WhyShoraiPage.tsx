'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award, Target, Users, BookOpen } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import FutureSkillsEcosystem from '@/components/home/FutureSkillsEcosystem';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/shared/Footer';

export default function WhyShoraiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 transition-colors duration-300">
      
      {/* ── Top Header Banner ────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden border-b border-border bg-muted/20">
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              THE FUTURE OF STEM EDUCATION
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4">
              WHY SCHOOLS CHOOSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SHORAI</span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover how our turn-key Robotics &amp; AI innovation labs, NEP-aligned curriculum, and accredited teacher enablement empower schools to lead the next generation of innovators.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Key Why Shorai Sections ──────────────────────────────────── */}
      <FutureSkillsEcosystem />

      {/* ── Closing CTA (The Future Won't Build Itself) & Footer ─── */}
      <FinalCTA />
      <Footer />

    </div>
  );
}
