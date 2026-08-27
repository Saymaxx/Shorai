'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Bot, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

export default function AboutHeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { content } = useContent();
  const hero = content.about.hero;

  return (
    <section className="relative pt-20 sm:pt-24 pb-10 sm:pb-12 bg-transparent overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Background Circuit & Atmospheric Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/6 w-[50vw] h-[50vw] max-w-[650px] bg-gradient-to-tr from-[#FF3D7F]/15 via-[#7928CA]/15 to-[#00D4FF]/15 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── MAIN HERO GRID (BROCHURE COVER LAYOUT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 sm:mb-10">
          
          {/* LEFT COLUMN: TYPOGRAPHY + SUBTITLE BOX + ACTION CTAS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Main Headline */}
            <SectionReveal>
              <div className="space-y-1 mb-5">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
                  {hero.titleLine1} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D7F] via-[#D946EF] to-[#7928CA]">
                    {hero.titleGradient}
                  </span> <br />
                  <span className="text-[#4F46E5] dark:text-[#818CF8]">
                    {hero.titleLine2}
                  </span>
                </h1>
              </div>
            </SectionReveal>

            {/* Framed Definition Box */}
            <SectionReveal delay={0.08}>
              <div className="p-4 sm:p-5 rounded-2xl bg-card border-2 border-primary/20 shadow-md mb-5 relative overflow-hidden max-w-xl">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF3D7F] to-[#7928CA]" />
                <p className="text-base sm:text-lg text-foreground font-semibold italic pl-2 leading-relaxed">
                  &ldquo;{hero.quote}&rdquo;
                </p>
              </div>
            </SectionReveal>

            {/* Mission Tagline */}
            <SectionReveal delay={0.12}>
              <div className="pl-4 border-l-4 border-[#7928CA] mb-6">
                <p className="text-sm sm:text-base font-bold text-foreground/90">
                  {hero.mission}
                </p>
              </div>
            </SectionReveal>

            {/* Action CTAs */}
            <SectionReveal delay={0.16}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticWrapper>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-xl flex items-center gap-2.5 transition-all hover:scale-105"
                  >
                    <span>{hero.primaryButtonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticWrapper>

                <Link
                  href="/why-shorai"
                  className="px-6 h-13 rounded-2xl bg-card hover:bg-muted border border-border text-foreground font-bold text-sm tracking-wide shadow-sm flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>{hero.secondaryButtonText}</span>
                </Link>
              </div>
            </SectionReveal>

          </div>

          {/* RIGHT COLUMN: LARGE DIAGONAL FLOATING ROUNDED IMAGES (5 Cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]">
            
            {/* Ambient Background Decorative Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7928CA]/25 via-[#FF3D7F]/25 to-[#00D4FF]/25 rounded-full blur-[100px] pointer-events-none" />

            {/* Top-Left Diagonal Floating Large Rounded Image */}
            <SectionReveal delay={0.1}>
              <div className="relative w-[280px] sm:w-[340px] lg:w-[380px] h-[280px] sm:h-[340px] lg:h-[380px] rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl bg-card hover:scale-105 transition-all duration-500 group sm:-translate-x-8 sm:-translate-y-4 z-10">
                <Image
                  src="/images/shorai-catalog-robotics-iot.jpg"
                  alt="Indian students learning coding and robotics"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 360px, 420px"
                  priority
                />
              </div>
            </SectionReveal>

            {/* Bottom-Right Diagonal Overlapping Large Rounded Image */}
            <SectionReveal delay={0.16}>
              <div className="relative w-[240px] sm:w-[300px] lg:w-[330px] h-[240px] sm:h-[300px] lg:h-[330px] rounded-full overflow-hidden border-4 border-[#FF3D7F]/60 shadow-2xl bg-card hover:scale-105 transition-all duration-500 group sm:translate-x-12 sm:-translate-y-20 z-20">
                <Image
                  src="/images/shorai-quadrant-robotics.jpg"
                  alt="Indian student assembling robotics chassis"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 320px, 360px"
                  priority
                />
              </div>
            </SectionReveal>

          </div>

        </div>

        {/* ── BOT SLANTED BANNER: BUILDING FUTURE-READY SCHOOLS ── */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-white/10 mb-0 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            
            {/* Ambient Circuit Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#7928CA] to-[#00D4FF] flex items-center justify-center shrink-0 shadow-lg">
                <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D4FF] mb-1">
                  FUTURE-SCHOOL ECOSYSTEM
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#00D4FF]">Future-Ready</span> Schools.
                </h3>
              </div>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 hover:bg-white/90 transition-all hover:scale-105"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </SectionReveal>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
