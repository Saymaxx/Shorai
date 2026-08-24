'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Search, 
  PenTool, 
  Cpu, 
  Users, 
  Rocket, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Zap,
  Play,
  Pause
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

interface TransformationStep {
  num: string;
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  deliverable: string;
  icon: any;
  color: string;
  gradient: string;
  image: string;
  alt: string;
  bulletPoints: string[];
}

const STEPS: TransformationStep[] = [
  {
    num: "01",
    id: "assess",
    title: "ASSESS & AUDIT",
    subtitle: "Campus Infrastructure & NEP Gap Analysis",
    tagline: "Free on-site evaluation of student strength, available space, and curriculum readiness.",
    duration: "Day 1 – 3",
    deliverable: "Customized Feasibility & NEP Compliance Report",
    icon: Search,
    color: "#7928CA",
    gradient: "from-[#7928CA] to-[#6366F1]",
    image: "/images/shorai-step-assess.jpg",
    alt: "Shorai consultants conducting campus STEM audit with school principal and faculty",
    bulletPoints: [
      "Room dimensions, electrical safety & power load analysis",
      "Grade-wise student strength and syllabus mapping",
      "Tailored equipment list and budgetary proposal"
    ]
  },
  {
    num: "02",
    id: "design",
    title: "ARCHITECT & DESIGN",
    subtitle: "3D CAD Lab Blueprint & Safety Layout",
    tagline: "Bespoke architectural layout optimized for student collaboration, safety, and ergonomics.",
    duration: "Day 4 – 7",
    deliverable: "Interactive 3D Walkthrough & Electrical Schematics",
    icon: PenTool,
    color: "#6366F1",
    gradient: "from-[#6366F1] to-[#00D4FF]",
    image: "/images/shorai-step-design.jpg",
    alt: "Engineers reviewing 3D architectural CAD model of school innovation lab",
    bulletPoints: [
      "Dedicated zones: Robotics, Drone Arena, 3D Hub & AI Workstations",
      "Ergonomic student workbenches with anti-static surfaces",
      "Institutional branding, signage & inspirational wall graphics"
    ]
  },
  {
    num: "03",
    id: "build",
    title: "DEPLOY & CALIBRATE",
    subtitle: "Turnkey Hardware & Robotic Stations Setup",
    tagline: "Delivery, assembly, safety testing, and calibration of all industrial-grade kits.",
    duration: "Day 8 – 18",
    deliverable: "100% Operational & Safety-Certified Lab",
    icon: Cpu,
    color: "#00D4FF",
    gradient: "from-[#00D4FF] to-[#10B981]",
    image: "/images/shorai-catalog-flagship-campus.jpg",
    alt: "Fully deployed school STEM innovation lab with robotic arms and drone stations",
    bulletPoints: [
      "6-axis robotic arms, flight simulators & drone flight cages",
      "3D printers, IoT sensors, microcontrollers & tools",
      "Safety certification and student protective equipment setup"
    ]
  },
  {
    num: "04",
    id: "enable",
    title: "ENABLE & TRAIN",
    subtitle: "Faculty Upskilling & LMS Cloud Onboarding",
    tagline: "Comprehensive hands-on training for teachers plus turnkey day-by-day lesson plans.",
    duration: "Day 19 – 25",
    deliverable: "Accredited STEM Faculty Certification & LMS Access",
    icon: Users,
    color: "#10B981",
    gradient: "from-[#10B981] to-[#FF6B00]",
    image: "/images/shorai-catalog-robotics-iot.jpg",
    alt: "Master trainer conducting hands-on robotics enablement with school teachers",
    bulletPoints: [
      "40 hours of intensive faculty pedagogy & practical training",
      "Day-by-day curriculum guides and student workbooks",
      "Campus-wide Shorai AI LMS access with auto-grading"
    ]
  },
  {
    num: "05",
    id: "transform",
    title: "TRANSFORM & LAUNCH",
    subtitle: "Annual Expos, Hackathons & Global Competitions",
    tagline: "Ignite student inventions, host parent innovation expos, and lead regional hackathons.",
    duration: "Day 26 – 30 & Ongoing",
    deliverable: "National STEM Brand Prestige & Student Patents",
    icon: Rocket,
    color: "#FF6B00",
    gradient: "from-[#FF6B00] via-[#FF3D7F] to-[#7928CA]",
    image: "/images/shorai-catalog-ai-drone.jpg",
    alt: "Indian school students competing and presenting AI drone projects",
    bulletPoints: [
      "Grand campus inauguration and Parent Innovation Day expo",
      "Direct mentorship for National Robotics & AI Olympiads",
      "School spotlight in regional press and educational media"
    ]
  }
];

export default function InteractiveTechnology() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const { content } = useContent();
  const meth = content.schools.methodology;

  const activeStep = STEPS[activeIdx];
  const ActiveIcon = activeStep.icon;

  // Optional auto-cycle
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STEPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section 
      id="technology" 
      className="relative bg-background overflow-hidden py-20 sm:py-28 px-4 sm:px-6 border-t border-border transition-colors duration-300"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] max-w-[500px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{meth.badge}</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 leading-tight">
              {meth.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                {meth.titleGradient}
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
              {meth.subtitle}
            </p>
          </SectionReveal>
        </div>

        {/* ── INTERACTIVE 5-STAGE PROGRESSION RAIL ── */}
        <div className="mb-10 sm:mb-14 overflow-x-auto pb-4 no-scrollbar">
          <div className="min-w-[700px] flex items-center justify-between relative px-6">
            
            {/* Background connecting track */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-border -translate-y-1/2 -z-0 rounded-full" />
            
            {/* Active connecting bar */}
            <div 
              className="absolute top-1/2 left-8 h-1 bg-gradient-to-r from-primary to-[#00D4FF] -translate-y-1/2 -z-0 rounded-full transition-all duration-500"
              style={{ width: `${(activeIdx / (STEPS.length - 1)) * 92}%` }}
            />

            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeIdx === idx;
              const isPast = idx < activeIdx;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    setIsAutoPlaying(false);
                  }}
                  className="group relative z-10 flex flex-col items-center focus:outline-none transition-all duration-300"
                >
                  {/* Step Circle Node */}
                  <div 
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 border-2 shadow-lg ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary scale-110 ring-4 ring-primary/20 shadow-primary/30'
                        : isPast
                        ? 'bg-card border-primary text-primary'
                        : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Node Label */}
                  <div className="mt-3 text-center">
                    <div className={`text-xs font-mono font-black tracking-wider uppercase ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      STAGE {step.num}
                    </div>
                    <div className="text-xs font-bold text-foreground truncate max-w-[120px]">
                      {step.title.split(' ')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── DYNAMIC SPLIT-PANEL TRANSFORMATION COCKPIT ── */}
        <div className="rounded-3xl bg-card border-2 border-border/80 shadow-2xl p-6 sm:p-10 lg:p-12 mb-14 ring-1 ring-border/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              {/* LEFT: 6 Cols Detailed Value & Deliverables */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  
                  {/* Top Phase Header Tag */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div 
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border shadow-sm"
                      style={{
                        background: `${activeStep.color}15`,
                        borderColor: `${activeStep.color}35`,
                        color: activeStep.color,
                      }}
                    >
                      <ActiveIcon className="w-4 h-4" />
                      <span>STAGE {activeStep.num} // {activeStep.title}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted border border-border text-xs font-mono font-bold text-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{activeStep.duration}</span>
                    </div>
                  </div>

                  {/* Main Stage Headline */}
                  <h3 className="text-2xl sm:text-4xl font-black text-foreground mb-3 leading-tight">
                    {activeStep.subtitle}
                  </h3>

                  <p className="text-base text-muted-foreground leading-relaxed mb-6 font-medium">
                    {activeStep.tagline}
                  </p>

                  {/* Deliverable Callout Card */}
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border mb-6">
                    <div className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider mb-1">
                      KEY DELIVERABLE &bull; {activeStep.duration}
                    </div>
                    <div className="text-base font-bold text-foreground">
                      {activeStep.deliverable}
                    </div>
                  </div>

                  {/* Core Milestones */}
                  <div className="space-y-3 mb-8">
                    {activeStep.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        </div>
                        <span className="text-sm sm:text-base font-semibold text-foreground/90 leading-snug">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* CTAs & Navigation */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                  <MagneticWrapper>
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <span>Inquire About Stage {activeStep.num}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </MagneticWrapper>

                  <button
                    onClick={() => setActiveIdx((prev) => (prev + 1) % STEPS.length)}
                    className="px-5 h-13 rounded-2xl bg-muted hover:bg-muted/80 border border-border text-foreground font-bold text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all"
                  >
                    <span>NEXT STAGE</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* RIGHT: 6 Cols High-Fidelity Cinematic Photograph */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden bg-muted border-2 border-border shadow-2xl aspect-[16/10] group">
                  <Image
                    src={activeStep.image}
                    alt={activeStep.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />

                  {/* Contrast Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Live Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg">
                      <ActiveIcon className="w-4 h-4 text-primary" />
                      <span>STAGE {activeStep.num} IN ACTION</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/90 backdrop-blur-md text-xs font-mono font-bold text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>{activeStep.duration}</span>
                    </div>
                  </div>

                  {/* Bottom Image Tag */}
                  <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none z-10">
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
                      100% TURNKEY IMPLEMENTATION
                    </div>
                    <div className="text-base sm:text-lg font-bold drop-shadow-md">
                      {activeStep.deliverable}
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Fast-Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeIdx === idx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsAutoPlaying(false);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-card border-primary ring-2 ring-primary/30 shadow-lg -translate-y-1'
                    : 'bg-card/50 hover:bg-card border-border hover:border-primary/30 text-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="text-xs sm:text-sm font-black text-foreground line-clamp-1">
                  {step.title}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground mt-1">
                  {step.duration}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
