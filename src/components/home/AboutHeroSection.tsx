'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Bot, 
  Cpu, 
  Atom, 
  Code2, 
  GraduationCap, 
  TrendingUp, 
  Globe, 
  Phone, 
  MapPin, 
  ArrowRight,
  Quote,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const CORE_PILLARS = [
  { name: 'AI', icon: Cpu, color: '#3B82F6', bg: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
  { name: 'ROBOTICS', icon: Bot, color: '#8B5CF6', bg: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
  { name: 'STEM', icon: Atom, color: '#06B6D4', bg: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30' },
  { name: 'CODING', icon: Code2, color: '#EC4899', bg: 'bg-pink-500/10 text-pink-500 border-pink-500/30' },
  { name: 'TEACHER ENABLEMENT', icon: GraduationCap, color: '#6366F1', bg: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30' },
  { name: 'STUDENT DEVELOPMENT', icon: TrendingUp, color: '#F97316', bg: 'bg-orange-500/10 text-orange-500 border-orange-500/30' },
];

export default function AboutHeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative pt-32 sm:pt-36 pb-20 sm:pb-28 bg-background overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Background Circuit & Atmospheric Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/6 w-[50vw] h-[50vw] max-w-[650px] bg-gradient-to-tr from-[#FF3D7F]/15 via-[#7928CA]/15 to-[#00D4FF]/15 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── MAIN HERO GRID (BROCHURE COVER LAYOUT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          
          {/* LEFT COLUMN: TYPOGRAPHY + SUBTITLE BOX + ACTION CTAS (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Main Headline */}
            <SectionReveal>
              <div className="space-y-1 mb-6">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
                  SCHOOL <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D7F] via-[#D946EF] to-[#7928CA]">
                    INNOVATION
                  </span> <br />
                  <span className="text-[#4F46E5] dark:text-[#818CF8]">
                    &amp; FUTURE SKILLS
                  </span>
                </h1>
              </div>
            </SectionReveal>

            {/* Framed Definition Box */}
            <SectionReveal delay={0.08}>
              <div className="p-5 sm:p-6 rounded-2xl bg-card border-2 border-primary/20 shadow-md mb-6 relative overflow-hidden max-w-xl">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF3D7F] to-[#7928CA]" />
                <p className="text-base sm:text-lg text-foreground font-semibold italic pl-2 leading-relaxed">
                  &ldquo;A future-school ecosystem designed to connect technology, teachers, student development and innovation.&rdquo;
                </p>
              </div>
            </SectionReveal>

            {/* Mission Tagline */}
            <SectionReveal delay={0.12}>
              <div className="pl-4 border-l-4 border-[#7928CA] mb-8">
                <p className="text-sm sm:text-base font-bold text-foreground/90">
                  Empowering Young Minds with Technology, Creativity &amp; Confidence.
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
                    <span>Connect With Shorai</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticWrapper>

                <Link
                  href="/why-shorai"
                  className="px-6 h-13 rounded-2xl bg-card hover:bg-muted border border-border text-foreground font-bold text-sm tracking-wide shadow-sm flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Why Shorai</span>
                </Link>
              </div>
            </SectionReveal>

          </div>

          {/* RIGHT COLUMN: LARGE DIAGONAL FLOATING ROUNDED IMAGES (5 Cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[480px] sm:min-h-[560px] lg:min-h-[620px]">
            
            {/* Ambient Background Decorative Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7928CA]/25 via-[#FF3D7F]/25 to-[#00D4FF]/25 rounded-full blur-[100px] pointer-events-none" />

            {/* Top-Left Diagonal Floating Large Rounded Image */}
            <SectionReveal delay={0.1}>
              <div className="relative w-[280px] sm:w-[360px] lg:w-[420px] h-[280px] sm:h-[360px] lg:h-[420px] rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl bg-card hover:scale-105 transition-all duration-500 group sm:-translate-x-8 sm:-translate-y-6 z-10">
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
              <div className="relative w-[240px] sm:w-[320px] lg:w-[360px] h-[240px] sm:h-[320px] lg:h-[360px] rounded-full overflow-hidden border-4 border-[#FF3D7F]/60 shadow-2xl bg-card hover:scale-105 transition-all duration-500 group sm:translate-x-14 sm:-translate-y-24 z-20">
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
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-white/10 mb-16 sm:mb-20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            
            {/* Ambient Circuit Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7928CA] to-[#00D4FF] flex items-center justify-center shrink-0 shadow-lg">
                <Bot className="w-10 h-10 text-white animate-pulse" />
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

        {/* ── 6 CORE DOMAINS (AI, ROBOTICS, STEM, CODING, TEACHER ENABLEMENT, STUDENT DEVELOPMENT) ── */}
        <SectionReveal delay={0.24}>
          <div className="rounded-3xl p-6 sm:p-8 bg-card border-2 border-border shadow-xl mb-12">
            
            <div className="text-center mb-8">
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase mb-2">
                CORE DOMAINS
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-foreground">
                BUILD THE FUTURE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA]">STARTING TODAY.</span>
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-1">
                SHORAI &bull; School Innovation &amp; Future Skills Partner
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {CORE_PILLARS.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-muted/40 border border-border/80 flex flex-col items-center text-center justify-center gap-3 transition-all hover:scale-105 hover:bg-card hover:border-primary/40 shadow-sm group"
                  >
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110"
                      style={{ backgroundColor: p.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-black text-foreground tracking-tight leading-tight">
                      {p.name}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </SectionReveal>

        {/* ── PARTNER RIBBON & OFFICIAL CONTACT BAR ── */}
        <SectionReveal delay={0.28}>
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00] text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Contact Details */}
              <div className="lg:col-span-8 flex flex-col gap-3">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                  OFFICIAL CONTACT &amp; LOCATION
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-white/95">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>Website:</strong> www.shorai.in</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>Phone:</strong> +91 7430659053</span>
                  </div>
                  <div className="sm:col-span-2 flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Address:</strong> 119/114, Ramkrishna Road, Khudiram, Khardaha, Kolkata, North 24 Parganas, West Bengal - 700116</span>
                  </div>
                </div>
              </div>

              {/* Right Quote */}
              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/25 pt-4 lg:pt-0 lg:pl-6 text-left">
                <Quote className="w-7 h-7 text-amber-300 rotate-180 mb-1" />
                <p className="text-lg sm:text-xl font-black italic tracking-tight text-white drop-shadow-sm">
                  Build the future. <br />Starting today.
                </p>
              </div>

            </div>
          </div>
        </SectionReveal>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
