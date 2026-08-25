'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  GraduationCap, 
  Blocks, 
  Pencil, 
  Lightbulb, 
  Cog, 
  Target, 
  CheckCircle2, 
  Quote, 
  Rocket, 
  ArrowRight,
  Bot,
  Brain,
  Search,
  Zap,
  Award
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

interface GradeStage {
  num: string;
  stage: string;
  grades: string;
  icon: any;
  color: string;
  bgGradient: string;
  pillColor: string;
  points: string[];
  footerIcon: any;
  footerText: string;
}

const STAGES: GradeStage[] = [
  {
    num: "01",
    stage: "PRE PRIMARY",
    grades: "Age 3 - 5 Years",
    icon: Blocks,
    color: "#7928CA",
    bgGradient: "from-purple-500/10 to-indigo-500/10",
    pillColor: "bg-[#7928CA]",
    points: [
      "Play-based Learning",
      "Basic Motor Skills",
      "Logical Thinking",
      "Creativity",
      "Introduction to Technology"
    ],
    footerIcon: Lightbulb,
    footerText: "We Build Curiosity & Confidence"
  },
  {
    num: "02",
    stage: "PRIMARY",
    grades: "Grade 1 - 5",
    icon: Pencil,
    color: "#D946EF",
    bgGradient: "from-fuchsia-500/10 to-pink-500/10",
    pillColor: "bg-[#D946EF]",
    points: [
      "Basic Coding Concepts",
      "Fun with Robotics",
      "STEM Activities",
      "Visual Programming",
      "Problem Solving"
    ],
    footerIcon: Search,
    footerText: "We Build Interest & Exploration"
  },
  {
    num: "03",
    stage: "MIDDLE SCHOOL",
    grades: "Grade 6 - 8",
    icon: Brain,
    color: "#0284C7",
    bgGradient: "from-sky-500/10 to-blue-500/10",
    pillColor: "bg-[#0284C7]",
    points: [
      "Advanced Coding (Python/Block)",
      "Robotics Mechanics",
      "Electronics Basics",
      "AI & Machine Thinking",
      "Project Based Learning"
    ],
    footerIcon: Brain,
    footerText: "We Build Skills & Understanding"
  },
  {
    num: "04",
    stage: "SECONDARY",
    grades: "Grade 9 - 10",
    icon: Cog,
    color: "#EA580C",
    bgGradient: "from-orange-500/10 to-amber-500/10",
    pillColor: "bg-[#EA580C]",
    points: [
      "App Development",
      "IoT & Automation",
      "AI Fundamentals",
      "Data & Analytics",
      "Real-world Projects"
    ],
    footerIcon: Rocket,
    footerText: "We Build Application & Innovation"
  },
  {
    num: "05",
    stage: "SENIOR SECONDARY",
    grades: "Grade 11 - 12",
    icon: Target,
    color: "#6366F1",
    bgGradient: "from-indigo-500/10 to-purple-500/10",
    pillColor: "bg-[#6366F1]",
    points: [
      "Advanced AI & ML",
      "Robotics Engineering",
      "Cyber Security",
      "Entrepreneurship",
      "Industry Projects & Internships"
    ],
    footerIcon: Award,
    footerText: "We Build Expertise & Leadership"
  }
];

export default function GradeWiseCurriculumSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { content } = useContent();
  const curr = content.schools.curriculum;

  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-[15%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── TOP HEADER SECTION: TITLE + WIDE RECTANGULAR STUDENT HERO IMAGE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-18">
          
          {/* Left Column: Titles & Description */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Main Title & Subtitle */}
            <SectionReveal delay={0.05}>
              <div className="text-xs font-mono font-bold text-primary mb-2 uppercase tracking-wider">
                {curr.badge}
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-4 leading-[1.08]">
                {curr.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  {curr.titleGradient}
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-medium mb-6">
                {curr.subtitle}
              </p>
            </SectionReveal>

          </div>

          {/* Right Column: Wide Rectangular Indian Student Photo with Floating Badge */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <SectionReveal delay={0.15} className="w-full flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-[540px]">
                
                {/* Wide Rectangular Photo Container */}
                <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[330px] rounded-3xl overflow-hidden border-4 border-primary/40 shadow-2xl bg-card">
                  <img
                    src="/images/shorai-quadrant-robotics.jpg"
                    alt="Indian student learning robotics and building smart rovers in Shorai lab"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Purple Hexagon / Shield Badge */}
                <div className="absolute -bottom-5 -left-3 sm:-left-6 z-20 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white shadow-2xl border border-white/30 backdrop-blur-xl max-w-[220px]">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/90">
                      NEP 2020
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm font-black leading-tight">
                    Building Future-Ready Thinkers at Every Stage
                  </p>
                </div>

              </div>
            </SectionReveal>
          </div>

        </div>

        {/* ── 5 CONTINUOUS LEARNING STAGES ── */}
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-card border-2 border-border shadow-xl mb-14 sm:mb-18">
          
          {/* Header Pill */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA] text-white font-mono font-black text-xs sm:text-sm tracking-wider uppercase shadow-md">
              <Zap className="w-4 h-4" />
              <span>A CONTINUOUS LEARNING JOURNEY</span>
            </div>
          </div>

          {/* 5 Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const FooterIcon = stage.footerIcon;

              return (
                <div 
                  key={stage.num}
                  className="rounded-2xl border border-border/80 bg-background/70 backdrop-blur-sm shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 relative cursor-pointer"
                  onClick={() => setIsContactOpen(true)}
                  style={{
                    borderColor: undefined
                  }}
                >
                  {/* Top Header with Stage Number & Hexagon Icon */}
                  <div className="p-4 sm:p-5 pb-3 border-b border-border/60">
                    
                    {/* Stage Circle Number */}
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-mono font-black text-xs shadow-md transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: stage.color }}
                      >
                        {stage.num}
                      </div>

                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{ backgroundColor: stage.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Stage Title & Grade Subtitle */}
                    <h4 
                      className="text-base sm:text-lg font-black leading-tight tracking-tight uppercase"
                      style={{ color: stage.color }}
                    >
                      {stage.stage}
                    </h4>
                    <div className="text-xs font-mono font-bold text-muted-foreground mt-0.5">
                      {stage.grades}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="p-4 sm:p-5 py-4 space-y-2.5 flex-grow text-xs sm:text-sm font-semibold text-foreground/90">
                    {stage.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 shrink-0" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Footer Pill & Hover "Know More" Button Container */}
                  <div className="relative overflow-hidden h-11">
                    {/* Default State: Footer Icon & Text */}
                    <div 
                      className="absolute inset-0 p-3 text-white text-xs font-bold flex items-center gap-2 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-full"
                      style={{ backgroundColor: stage.color }}
                    >
                      <FooterIcon className="w-4 h-4 shrink-0" />
                      <span className="leading-tight text-[11px] sm:text-xs truncate">
                        {stage.footerText}
                      </span>
                    </div>

                    {/* Hover State: Know More Action Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsContactOpen(true);
                      }}
                      className="absolute inset-0 w-full h-full text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 shadow-lg"
                      style={{ 
                        backgroundColor: stage.color,
                        backgroundImage: `linear-gradient(135deg, ${stage.color}, #6366F1)`
                      }}
                    >
                      <span>Know More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ── OUR LEARNING METHODOLOGY BOX ── */}
        <div className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-muted/30 border-2 border-border shadow-md mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR LEARNING METHODOLOGY</span>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-foreground font-semibold max-w-4xl mx-auto leading-relaxed">
            At Shorai, we believe students learn best through{' '}
            <span className="text-primary font-black">
              hands-on experiences, real-world challenges, and collaborative innovation
            </span>
            . Our curriculum is designed to build knowledge progressively while fostering creativity, critical thinking, and future-ready skills.
          </p>
        </div>

        {/* ── WHAT STUDENTS GAIN AT EVERY LEVEL (SPLIT CALLOUTS) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-10">
          
          {/* Left: Purple Framed Quote Box */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-transparent border-2 border-purple-500/30 shadow-lg relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-mono font-bold text-xs uppercase mb-4">
              WHAT STUDENTS GAIN AT EVERY LEVEL
            </div>

            <div className="flex items-start gap-4">
              <Quote className="w-10 h-10 text-purple-500/40 shrink-0 rotate-180" />
              <p className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-snug tracking-tight">
                &ldquo;Every Level Builds Skills. Every Project Builds Confidence. Every Student Builds the Future.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Vibrant Gradient Mascot Card */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white shadow-xl flex items-center justify-between gap-4">
            <div>
              <Quote className="w-8 h-8 text-white/40 mb-2 rotate-180" />
              <p className="text-base sm:text-lg font-black leading-snug drop-shadow-sm">
                Every grade is a step closer to a brighter future with <span className="underline underline-offset-2">SHORAI</span>.
              </p>
            </div>
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-lg">
              <Bot className="w-10 h-10 text-white animate-bounce" />
            </div>
          </div>

        </div>

        {/* ── BOTTOM BANNER WITH ROCKET: RIGHT LEARNING TODAY ── */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00] text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-amber-300 animate-pulse shrink-0" />
            <div className="text-base sm:text-xl lg:text-2xl font-black tracking-tight drop-shadow-md">
              Right Learning Today. <span className="text-amber-300 italic">Limitless Possibilities Tomorrow.</span>
            </div>
          </div>

          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 h-11 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105 hover:bg-white/95"
            >
              <span>Want to know more?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
