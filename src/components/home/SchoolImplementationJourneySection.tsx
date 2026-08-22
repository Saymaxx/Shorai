'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Users, 
  ClipboardCheck, 
  Compass, 
  Wrench, 
  GraduationCap, 
  BookOpen, 
  Smile, 
  Lightbulb, 
  TrendingUp, 
  Trophy, 
  ShieldCheck, 
  Headphones, 
  Cpu, 
  Cog, 
  Target, 
  Bot, 
  Sparkles, 
  ArrowRight,
  Quote,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

interface RoadmapStep {
  num: string;
  title: string;
  desc: string;
  outcome: string;
  icon: any;
  color: string;
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    num: "01",
    title: "DISCOVERY MEETING",
    desc: "We understand your school's vision, current setup, goals and expectations.",
    outcome: "Clear understanding of needs & goals",
    icon: Users,
    color: "#7928CA"
  },
  {
    num: "02",
    title: "NEEDS ASSESSMENT",
    desc: "Detailed evaluation of infrastructure, faculty readiness and student learning levels.",
    outcome: "Customized plan for your school",
    icon: ClipboardCheck,
    color: "#EC4899"
  },
  {
    num: "03",
    title: "CUSTOMIZED PLANNING",
    desc: "We design a tailored roadmap including curriculums, labs, training and timelines.",
    outcome: "Personalized implementation plan",
    icon: Compass,
    color: "#0284C7"
  },
  {
    num: "04",
    title: "LAB SETUP & INFRASTRUCTURE",
    desc: "Setup of Robotics, AI & Coding Labs with tools, kits and digital infrastructure.",
    outcome: "State-of-the-art learning environment",
    icon: Wrench,
    color: "#EA580C"
  },
  {
    num: "05",
    title: "TEACHER TRAINING",
    desc: "Hands-on training for teachers to deliver future-ready education confidently.",
    outcome: "Empowered educators",
    icon: GraduationCap,
    color: "#7C3AED"
  },
  {
    num: "06",
    title: "CURRICULUM ROLL-OUT",
    desc: "Structured, grade-wise curriculum integrated into school's academic schedule.",
    outcome: "Engaging & relevant learning experience",
    icon: BookOpen,
    color: "#E11D48"
  },
  {
    num: "07",
    title: "STUDENT ONBOARDING",
    desc: "Orientation sessions, introductory activities and hands-on experiences for students.",
    outcome: "Excited & curious young learners",
    icon: Smile,
    color: "#2563EB"
  },
  {
    num: "08",
    title: "PROJECT & ACTIVITY EXECUTION",
    desc: "Students work on real-world projects, innovations and challenges.",
    outcome: "Practical knowledge & innovation",
    icon: Lightbulb,
    color: "#D97706"
  },
  {
    num: "09",
    title: "ASSESSMENT & PROGRESS TRACKING",
    desc: "Continuous evaluation, feedback and digital reports through our AI-Powered LMS.",
    outcome: "Measurable growth & improvement",
    icon: TrendingUp,
    color: "#059669"
  },
  {
    num: "10",
    title: "COMPETITIONS & CERTIFICATIONS",
    desc: "Participation in national/international competitions and certification programs.",
    outcome: "Recognition, exposure & future opportunities",
    icon: Trophy,
    color: "#DC2626"
  }
];

const UNIQUE_FEATURES = [
  { label: "Customized Approach", icon: Target, color: "#7928CA" },
  { label: "AI-Powered Monitoring", icon: Cpu, color: "#EC4899" },
  { label: "Continuous Mentorship", icon: Users, color: "#EA580C" },
  { label: "Hands-on Learning", icon: Cog, color: "#0284C7" },
  { label: "Quality Assurance", icon: ShieldCheck, color: "#059669" },
  { label: "Ongoing Support", icon: Headphones, color: "#E11D48" },
];

export default function SchoolImplementationJourneySection() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── TOP HEADER SECTION: LOGO + TITLES + HEXAGONAL IMAGE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Left Column: Brand Emblem + Title */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Shorai Brand Header Pill */}
            <SectionReveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#7928CA]/15 via-[#6366F1]/15 to-[#00D4FF]/15 border border-[#6366F1]/30 mb-6 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7928CA] to-[#00D4FF] flex items-center justify-center text-white font-black text-base shadow-md">
                  S
                </div>
                <div>
                  <div className="text-xs font-mono font-black text-foreground tracking-wider uppercase">
                    SHORAI ROADMAP
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground font-semibold">
                    Building Future Innovators with AI &amp; Robotics
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Main Title & Subtitle */}
            <SectionReveal delay={0.08}>
              <div className="text-sm font-mono font-bold tracking-[0.2em] text-primary uppercase mb-2">
                SCHOOL IMPLEMENTATION
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-4 leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00]">
                  JOURNEY
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                A Seamless Path to Future-Ready Transformation.
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-medium mb-6">
                <span className="text-primary font-bold">SHORAI</span> follows a proven implementation process to ensure smooth onboarding, effective training, and measurable outcomes for every school.
              </p>
            </SectionReveal>

          </div>

          {/* Right Column: Hexagonal Framed Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SectionReveal delay={0.15}>
              <div className="relative w-[300px] sm:w-[380px] h-[280px] sm:h-[340px] rounded-3xl sm:rounded-[36px] overflow-hidden border-4 border-primary/40 shadow-2xl bg-card group">
                <Image
                  src="/images/shorai-catalog-robotics-iot.jpg"
                  alt="Indian students wiring microcontrollers and coding laptops in classroom"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 300px, 380px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </SectionReveal>
          </div>

        </div>

        {/* ── MAIN CONTENT: 10-STEP ROADMAP (LEFT 8 COLS) + NARRATIVE CALLOUT (RIGHT 4 COLS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-12 sm:mb-16 items-start">
          
          {/* LEFT 8 COLS: 10-Step Timeline Box */}
          <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-card border-2 border-border shadow-xl">
            
            {/* Header Ribbon */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA] text-white font-mono font-black text-xs sm:text-sm tracking-wider uppercase shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>10 STEP IMPLEMENTATION ROADMAP</span>
              </div>
            </div>

            {/* 10 Steps List */}
            <div className="space-y-4">
              {ROADMAP_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-4 sm:p-4.5 rounded-2xl border border-border/80 bg-background/60 hover:bg-background transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-primary/50 shadow-sm hover:shadow-md"
                  >
                    {/* Left: Step Number, Icon, Title, Description */}
                    <div className="flex items-start sm:items-center gap-3.5 flex-grow">
                      
                      {/* Step Number Circle */}
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-mono font-black text-xs shadow-md shrink-0 mt-0.5 sm:mt-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.num}
                      </div>

                      {/* Step Hexagon/Square Icon */}
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Text details */}
                      <div>
                        <h4 
                          className="text-sm sm:text-base font-black tracking-tight uppercase leading-tight"
                          style={{ color: step.color }}
                        >
                          {step.title}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5 max-w-md">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right: Outcome Tag */}
                    <div className="flex items-center gap-2 pl-12 sm:pl-0 shrink-0 w-full sm:w-auto justify-start sm:justify-end">
                      <ChevronRight className="w-4 h-4 text-muted-foreground/60 hidden sm:inline" />
                      <div className="px-3 py-1.5 rounded-xl bg-muted/60 border border-border text-[11px] sm:text-xs font-bold text-foreground flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{step.outcome}</span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT 4 COLS: Core Narrative Callout & Quote Mascot */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Big Narrative Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-card via-muted/30 to-card border-2 border-primary/25 shadow-xl">
              <p className="text-xl sm:text-2xl font-black text-foreground leading-snug tracking-tight">
                Shorai follows a <span className="text-primary underline underline-offset-4">structured implementation process</span> that ensures smooth integration of future skills into your school&apos;s academic ecosystem with <span className="text-[#FF6B00]">minimal disruption</span> and <span className="text-emerald-500">maximum impact</span>.
              </p>
            </div>

            {/* Quote Card with Mascot */}
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <Quote className="w-8 h-8 text-white/50 mb-3 rotate-180" />
                <p className="text-lg sm:text-xl font-black leading-snug drop-shadow-sm mb-4">
                  &ldquo;We don&apos;t just implement programs, we build long-term partnerships.&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/20 relative z-10">
                <div className="text-xs font-mono font-bold text-white/90">
                  SHORAI PARTNERSHIP
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                  <Bot className="w-7 h-7 text-white animate-bounce" />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── WHAT MAKES OUR IMPLEMENTATION UNIQUE? (6 FEATURE PILLARS) ── */}
        <div className="rounded-3xl p-6 sm:p-8 bg-card border-2 border-border shadow-lg mb-8">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-mono font-bold text-xs uppercase">
              WHAT MAKES OUR IMPLEMENTATION UNIQUE?
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {UNIQUE_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-muted/40 border border-border/80 flex flex-col items-center text-center justify-center gap-2.5 transition-all hover:scale-105 hover:bg-card hover:border-primary/40 shadow-sm"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: feat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-foreground leading-tight">
                    {feat.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── BOTTOM BANNER WITH LIGHTBULB: FROM PLANNING TO EXCELLENCE ── */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00] text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md shrink-0">
              <Lightbulb className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div className="text-base sm:text-xl lg:text-2xl font-black tracking-tight drop-shadow-md">
              FROM PLANNING TO EXCELLENCE &ndash; <span className="text-amber-300 italic">WE WALK WITH YOU Every Step of the Way.</span>
            </div>
          </div>

          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 h-11 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105 hover:bg-white/95"
            >
              <span>Schedule Implementation Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
