'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Quote, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  Brain, 
  Zap, 
  ShieldCheck, 
  Target, 
  GraduationCap 
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export default function WhySchoolsNeedShoraiBanner() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] max-w-[500px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── TOP 2-COLUMN SECTION: TEXT LEFT + IMAGE & QUOTE RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          
          {/* Left Column (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Shorai Brand Header Pill */}
            <SectionReveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#7928CA]/15 via-[#6366F1]/15 to-[#00D4FF]/15 border border-[#6366F1]/30 mb-6 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7928CA] to-[#00D4FF] flex items-center justify-center text-white font-black text-sm shadow-md">
                  S
                </div>
                <div>
                  <div className="text-xs font-mono font-black text-foreground tracking-wider uppercase">
                    SHORAI ECOSYSTEM
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">
                    Building Future Innovators with AI &amp; Robotics
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Section Main Title */}
            <SectionReveal delay={0.08}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-tight">
                WHY SCHOOLS NEED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  SHORAI
                </span>
              </h2>
            </SectionReveal>

            {/* Core Narrative Text */}
            <SectionReveal delay={0.12}>
              <p className="text-base sm:text-lg lg:text-xl text-foreground/90 leading-relaxed font-semibold mb-8">
                Shorai bridges the gap between classroom learning and real-world innovation by providing a comprehensive future-skills ecosystem. Through hands-on experiences, industry-aligned programs, and modern learning solutions, we empower students to become creators, problem-solvers, and future leaders.
              </p>
            </SectionReveal>

            {/* 4 Feature Value Pills */}
            <SectionReveal delay={0.16}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 w-full">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border text-xs sm:text-sm font-bold text-foreground shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Hands-on Experiential Labs</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border text-xs sm:text-sm font-bold text-foreground shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Industry-Aligned Programs</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border text-xs sm:text-sm font-bold text-foreground shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Turnkey Learning Solutions</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border text-xs sm:text-sm font-bold text-foreground shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Empowering Future Leaders</span>
                </div>
              </div>
            </SectionReveal>

            {/* Action CTA Button */}
            <SectionReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticWrapper>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-xl flex items-center gap-2.5 transition-all hover:scale-105"
                  >
                    <span>Connect With Shorai</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticWrapper>

                <Link
                  href="/labs"
                  className="px-6 h-13 rounded-2xl bg-card hover:bg-muted border border-border text-foreground font-bold text-sm tracking-wide shadow-sm flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Explore Labs</span>
                </Link>
              </div>
            </SectionReveal>

          </div>

          {/* Right Column (6 Cols) - Natural Student Photograph with Floating Purple Quote */}
          <div className="lg:col-span-6 relative">
            <SectionReveal delay={0.12}>
              <div className="relative rounded-3xl overflow-hidden bg-card border-2 border-border shadow-2xl group">
                
                {/* Natural Student Photo */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                  <Image
                    src="/images/shorai-catalog-robotics-iot.jpg"
                    alt="Indian students learning robotics and IoT building intelligent rovers"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-2 text-xs font-bold text-white font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>PRACTICAL INNOVATION</span>
                  </div>
                </div>

                {/* Floating Purple Quote Box */}
                <div className="relative sm:absolute sm:bottom-4 sm:right-4 sm:left-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#7928CA] via-[#6366F1] to-[#4F46E5] text-white shadow-2xl border border-white/20 backdrop-blur-xl m-3 sm:m-0">
                  <div className="flex items-start gap-3">
                    <Quote className="w-7 h-7 text-white/70 shrink-0 rotate-180 mt-0.5" />
                    <div>
                      <p className="text-sm sm:text-base font-black leading-snug drop-shadow-sm">
                        &ldquo;The best time to prepare for the future was yesterday. The next best time is <span className="text-[#00D4FF] font-black underline underline-offset-2">RIGHT NOW</span>.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </SectionReveal>
          </div>

        </div>

        {/* ── PROMINENT BOTTOM STATEMENT BANNER ── */}
        <SectionReveal delay={0.18}>
          <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-card via-muted/30 to-card border-2 border-primary/25 shadow-xl overflow-hidden text-center">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/[0.08] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-secondary/[0.08] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
              <p className="text-lg sm:text-2xl lg:text-3xl font-black text-foreground leading-snug sm:leading-relaxed">
                The world is changing faster than ever, driven by{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  Artificial Intelligence, automation, digital transformation, and emerging technologies
                </span>
                . Today&apos;s students need more than traditional education—they need{' '}
                <span className="text-primary font-black">
                  practical skills, innovative thinking, and the confidence to thrive
                </span>{' '}
                in a technology-driven future.
              </p>
            </div>

          </div>
        </SectionReveal>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
