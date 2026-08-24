'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Rocket, 
  CheckCircle2, 
  Cpu, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export default function WhatIsShoraiSection() {
  return (
    <section id="what-is-shorai" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── 2-Column Side-by-Side: Content Left & Quarter-Circle Image Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: What is Shorai Narrative & Points (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                INTRODUCING SHORAI
              </div>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 leading-tight">
                WHAT IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SHORAI?</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-semibold mb-3">
                The Next-Generation STEM, Robotics &amp; AI Innovation Ecosystem for Future-Ready Schools.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                Developed as a flagship education innovation initiative by <strong>SEG Academy</strong>, SHORAI bridges the critical gap between traditional school curricula and the technological demands of the 21st century. We empower K-12 schools with complete turnkey infrastructure, practical kits, and certified training to transform everyday classrooms into advanced technological beacons.
              </p>
            </SectionReveal>

            {/* Key Deliverable Badges */}
            <SectionReveal delay={0.16}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-foreground">Turnkey Robotics &amp; AI Labs</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-foreground">NEP 2020 K-12 Curriculum</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-foreground">Autonomous Drones &amp; Code</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-foreground">Master Faculty Certification</span>
                </div>
              </div>
            </SectionReveal>

            {/* Action CTAs */}
            <SectionReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticWrapper>
                  <Link
                    href="/schools"
                    className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#7928CA] to-[#6366F1] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Explore School Labs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticWrapper>

                <MagneticWrapper>
                  <Link
                    href="/contact"
                    className="px-7 py-3.5 rounded-2xl bg-card border border-border text-foreground hover:text-primary font-bold text-xs sm:text-sm shadow-sm hover:border-primary/40 transition-all flex items-center gap-2"
                  >
                    <span>Schedule School Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticWrapper>
              </div>
            </SectionReveal>

          </div>

          {/* Right Column: Architectural Quarter-Circle Image Frame (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <SectionReveal delay={0.14}>
              <div className="relative w-full max-w-[500px]">
                
                {/* Decorative Ambient Aura Behind the Quarter Circle */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#7928CA]/20 via-[#6366F1]/20 to-[#00D4FF]/20 rounded-[180px_28px_28px_28px] blur-xl opacity-70 pointer-events-none" />

                {/* Quarter Circle Masked Image Container */}
                <div className="relative rounded-[160px_28px_28px_28px] overflow-hidden border-2 border-primary/20 shadow-2xl bg-card aspect-[4/4.5] group">
                  <img
                    src="/images/robotics_teacher_smart_class.jpg"
                    alt="Indian STEM teacher teaching robotics mechanisms and circuit diagrams on interactive smart board to students"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Badge 1 (Top Left in the Quarter-Circle curve) */}
                  <div className="absolute top-6 left-6 z-10 px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 text-xs font-bold text-foreground">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Smart Robotics Class</span>
                  </div>

                  {/* Floating Badge 2 (Bottom Right) */}
                  <div className="absolute bottom-5 right-5 z-10 px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 text-xs font-bold text-foreground">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                    <span>Autonomous Robotics &amp; Drones</span>
                  </div>
                </div>

              </div>
            </SectionReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
