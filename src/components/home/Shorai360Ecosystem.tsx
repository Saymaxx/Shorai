'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  Bot, 
  Laptop, 
  GraduationCap, 
  Lightbulb, 
  Trophy, 
  Target, 
  Users, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Quote,
  Zap,
  Globe
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export interface EcosystemPillar {
  id: string;
  number: number;
  title: string;
  shortDesc: string;
  icon: any;
  color: string;
  gradient: string;
}

const PILLARS: EcosystemPillar[] = [
  {
    id: 'curriculum',
    number: 1,
    title: 'CURRICULUM',
    shortDesc: 'NEP Aligned, Industry Relevant & Future Focused',
    icon: BookOpen,
    color: '#8B5CF6',
    gradient: 'from-[#7928CA] to-[#8B5CF6]'
  },
  {
    id: 'robotics-lab',
    number: 2,
    title: 'ROBOTICS & INNOVATION LAB',
    shortDesc: 'State-of-the-art labs with advanced kits & safety standards',
    icon: Bot,
    color: '#EC4899',
    gradient: 'from-[#EC4899] to-[#F43F5E]'
  },
  {
    id: 'ai-lms',
    number: 3,
    title: 'AI LEARNING PLATFORM (LMS)',
    shortDesc: 'Smart dashboards, real-time tracking & insights for all.',
    icon: Laptop,
    color: '#EA580C',
    gradient: 'from-[#EA580C] to-[#F97316]'
  },
  {
    id: 'teacher-empowerment',
    number: 4,
    title: 'TEACHER EMPOWERMENT',
    shortDesc: 'Training, resources & ongoing academic support.',
    icon: GraduationCap,
    color: '#F97316',
    gradient: 'from-[#F97316] to-[#FB923C]'
  },
  {
    id: 'pbl',
    number: 5,
    title: 'PROJECT BASED LEARNING',
    shortDesc: 'Hands-on projects that build creativity & problem solving.',
    icon: Lightbulb,
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#EAB308]'
  },
  {
    id: 'competitions',
    number: 6,
    title: 'COMPETITIONS & HACKATHONS',
    shortDesc: 'National & International opportunities to showcase talent.',
    icon: Trophy,
    color: '#06B6D4',
    gradient: 'from-[#06B6D4] to-[#0EA5E9]'
  },
  {
    id: 'career-guidance',
    number: 7,
    title: 'CAREER GUIDANCE & COUNSELLING',
    shortDesc: 'Expert counselling, career mapping & soft skills development.',
    icon: Target,
    color: '#3B82F6',
    gradient: 'from-[#3B82F6] to-[#6366F1]'
  },
  {
    id: 'parent-engagement',
    number: 8,
    title: 'PARENT ENGAGEMENT',
    shortDesc: 'Regular updates, awareness sessions & strong communication.',
    icon: Users,
    color: '#6366F1',
    gradient: 'from-[#6366F1] to-[#7928CA]'
  }
];

export default function Shorai360Ecosystem() {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] max-w-[650px] bg-primary/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── TOP HEADER: EMBLEM + TITLE + SUBTITLE ── */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-18">
          
          <SectionReveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#7928CA]/15 via-[#6366F1]/15 to-[#00D4FF]/15 border border-[#6366F1]/30 mb-6 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7928CA] to-[#00D4FF] flex items-center justify-center text-white font-black text-sm shadow-md">
                S
              </div>
              <div className="text-left">
                <div className="text-xs font-mono font-black text-foreground tracking-wider uppercase">
                  SHORAI 360°
                </div>
                <div className="text-[10px] font-mono text-muted-foreground font-semibold">
                  Building Future Innovators with AI &amp; Robotics
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-4 leading-none">
              SHORAI 360° <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00]">
                EDUCATION ECOSYSTEM
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="text-base sm:text-xl text-muted-foreground font-medium mb-3">
              A Complete, Integrated &amp; Future-Ready School Transformation Model
            </p>
            <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
              One Partner. Endless Possibilities.
            </div>
          </SectionReveal>

        </div>

        {/* ── 360° 8-SPOKE WHEEL & LAB SHOWCASE GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14 sm:mb-18">
          
          {/* Left Column (7 Cols): The 8-Spoke Interactive Wheel */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* 8 Spokes Grid in Circular Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
              {PILLARS.map((p, idx) => {
                const Icon = p.icon;
                const isActive = activePillar === idx;

                return (
                  <div
                    key={p.id}
                    onClick={() => setActivePillar(idx)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-3.5 shadow-sm group ${
                      isActive 
                        ? 'bg-card border-2 shadow-lg -translate-y-1' 
                        : 'bg-card/70 border-border/80 hover:bg-card hover:border-primary/40'
                    }`}
                    style={{ borderColor: isActive ? p.color : undefined }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: p.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h4 
                        className="text-xs sm:text-sm font-black tracking-tight uppercase leading-tight mb-1"
                        style={{ color: p.color }}
                      >
                        {p.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-muted-foreground font-semibold leading-snug">
                        {p.shortDesc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Central School Hub Badge */}
            <div className="mt-6 p-4 px-6 rounded-2xl bg-gradient-to-r from-[#7928CA]/15 via-[#6366F1]/15 to-[#00D4FF]/15 border border-[#6366F1]/30 flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7928CA] to-[#00D4FF] flex items-center justify-center text-white font-black text-lg shadow-md">
                S
              </div>
              <div className="text-left">
                <div className="text-sm font-black text-foreground uppercase tracking-wide">
                  SCHOOL INNOVATION HUB
                </div>
                <div className="text-xs font-mono font-bold text-primary">
                  Future-Ready Transformation at Campus Core
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 Cols): What Makes It Powerful + Lab Image */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Highlighted Banner Callout */}
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#FF3D7F] via-[#FF6B00] to-[#EA580C] text-white shadow-2xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/25 text-white font-mono font-black text-xs uppercase mb-3 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHAT MAKES IT POWERFUL?</span>
              </div>

              <p className="text-sm sm:text-base font-bold leading-relaxed drop-shadow-sm">
                Shorai 360° Education Ecosystem is a complete, end-to-end solution that transforms schools into future-ready learning environments. From advanced technology education and modern lab infrastructure to teacher empowerment, student development, and digital learning, Shorai delivers everything through one trusted partner.
              </p>
            </div>

            {/* Natural Student Lab Image */}
            <div className="relative rounded-3xl overflow-hidden border-3 border-primary/30 shadow-xl bg-card group aspect-[16/10]">
              <Image
                src="/images/why_schools_need_shorai.jpg"
                alt="Indian students collaborating in Shorai Innovation Lab with smart rover and tablets"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-4 right-4 text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/20 text-center">
                SHORAI INNOVATION LAB &bull; 360° ECOSYSTEM
              </div>
            </div>

          </div>

        </div>

        {/* ── OUR PROMISE BANNER (WITH ROBOT MASCOT) ── */}
        <div className="rounded-3xl p-6 sm:p-7 bg-card border-2 border-border shadow-xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-foreground">
                Our Promise
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-semibold max-w-2xl leading-relaxed">
                Empowering schools with a unified ecosystem that inspires innovation, nurtures talent, and prepares every student for the future.
              </p>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7928CA] to-[#00D4FF] flex items-center justify-center shrink-0 shadow-lg">
            <Bot className="w-8 h-8 text-white animate-bounce" />
          </div>
        </div>

        {/* ── BOTTOM BANNER: TOGETHER, LET'S BUILD FUTURE-READY SCHOOLS ── */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00] text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Quote className="w-6 h-6 text-amber-300 shrink-0 rotate-180" />
            <div className="text-base sm:text-xl lg:text-2xl font-black tracking-tight drop-shadow-md">
              Together, Let&apos;s Build Future-Ready Schools <span className="text-amber-300 italic font-serif">for Future-Ready India.</span>
            </div>
          </div>

          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 h-11 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105 hover:bg-white/95"
            >
              <span>Explore 360° Lab Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
