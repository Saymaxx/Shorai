'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Bot, 
  Code2, 
  Cpu, 
  Users, 
  Laptop, 
  Compass, 
  Award, 
  Building2, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight,
  Target,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Star,
  Activity,
  ChevronRight
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SpiralFlipbook, { FlipbookPage } from '@/components/shared/SpiralFlipbook';

const numbersData = [
  {
    stat: '9 in 10',
    label: 'Parents Demand Future Skills',
    desc: 'Parents actively seek schools that provide hands-on AI & robotics education.',
    color: '#7928CA',
  },
  {
    stat: '77%',
    label: 'Jobs Require Digital Skills',
    desc: 'Nearly 80% of future job roles will require coding, automation & digital literacy.',
    color: '#6366F1',
  },
  {
    stat: '65%',
    label: 'Brand-New Job Types',
    desc: 'Students today will work in careers and technology domains that don’t even exist yet.',
    color: '#00D4FF',
  },
  {
    stat: '2X',
    label: 'Higher Career Growth',
    desc: 'Students with early practical STEM exposure are twice as likely to excel in high-growth industries.',
    color: '#FF6B00',
  },
];

const solutions = [
  {
    title: 'AI & Robotics Education',
    desc: 'Hands-on learning with real-world applications & hardware kits.',
    icon: Bot,
    color: '#7928CA',
  },
  {
    title: 'STEM & Coding Programs',
    desc: 'Build logical thinking, algorithmic creativity & problem solving.',
    icon: Code2,
    color: '#6366F1',
  },
  {
    title: 'Innovation Labs',
    desc: 'Encouraging active experimentation, curiosity & invention.',
    icon: Cpu,
    color: '#00D4FF',
  },
  {
    title: 'Experienced Trainers',
    desc: 'Industry experts making technical learning engaging & practical.',
    icon: Users,
    color: '#10B981',
  },
  {
    title: 'AI-Powered LMS',
    desc: 'Smart dashboards, progress tracking, assessments & analytics.',
    icon: Laptop,
    color: '#F59E0B',
  },
  {
    title: 'Career Readiness',
    desc: 'Expert counselling, soft skills & future career navigation.',
    icon: Compass,
    color: '#EC4899',
  },
];

const schoolOutcomes = [
  {
    id: 'reputation',
    title: 'Future-Ready Reputation',
    subtitle: 'PREMIER 21ST-CENTURY BRAND',
    metric: '+100%',
    metricLabel: 'Admissions Brand Appeal',
    desc: 'Establishes your school as an elite technological beacon in the city, driving parent trust and high enrollment interest.',
    icon: Building2,
    gradient: 'from-[#7928CA] to-[#6366F1]',
    accentColor: '#7928CA',
    deliverables: ['Custom Branded Lab Signage', 'Regional Press & Media PR', 'NEP 2020 Compliance Certificate']
  },
  {
    id: 'engagement',
    title: 'Transformative Student Engagement',
    subtitle: 'ACTIVE HANDS-ON LEARNING',
    metric: '10x',
    metricLabel: 'Practical STEM Retention',
    desc: 'Replaces passive rote memorization with experiential lab sessions where students design, solder, wire, and program real prototypes.',
    icon: Users,
    gradient: 'from-[#6366F1] to-[#00D4FF]',
    accentColor: '#6366F1',
    deliverables: ['100% Practical Experiments', 'Real Hardware & Robotics Kits', 'Gamified Coding Challenges']
  },
  {
    id: 'academic',
    title: 'Academic & Analytical Excellence',
    subtitle: 'SCIENCE & MATH MASTERY',
    metric: '94%',
    metricLabel: 'Higher Concept Clarity',
    desc: 'Directly boosts scientific problem-solving, mathematical intuition, and algorithmic logic through applied engineering projects.',
    icon: TrendingUp,
    gradient: 'from-[#00D4FF] to-[#10B981]',
    accentColor: '#00D4FF',
    deliverables: ['Integrated STEM Syllabus', 'Continuous LMS Assessments', 'Project-Based Homework Modules']
  },
  {
    id: 'parent-trust',
    title: 'Unshakeable Parent Trust',
    subtitle: 'VISIBLE STUDENT CREATIONS',
    metric: '98%',
    metricLabel: 'Parent Satisfaction Rate',
    desc: 'Parents witness tangible robots, IoT smart devices, and software applications built by their children during annual innovation expos.',
    icon: HeartHandshake,
    gradient: 'from-[#FF6B00] to-[#FF3D7F]',
    accentColor: '#FF6B00',
    deliverables: ['Annual School Innovation Day', 'Student Portfolio Certificates', 'Live Showcase Demos']
  },
  {
    id: 'competitions',
    title: 'National & Global Competitions',
    subtitle: 'OLYMPIADS & HACKATHONS',
    metric: '50+',
    metricLabel: 'National STEM Awards',
    desc: 'Direct mentorship for national robotics competitions, ATL marathons, AI olympiads, and international student hackathons.',
    icon: Award,
    gradient: 'from-[#F59E0B] to-[#FF6B00]',
    accentColor: '#F59E0B',
    deliverables: ['Competition Mentorship', 'Inter-School Hackathons', 'Robotics Olympiad Training']
  },
  {
    id: 'teacher-empowerment',
    title: 'Faculty Empowerment & Upskilling',
    subtitle: 'CONFIDENT MASTER EDUCATORS',
    metric: '100%',
    metricLabel: 'Certified STEM Teachers',
    desc: 'Upskills your existing school teachers with continuous certification, structured lesson aids, and 24/7 technical mentor support.',
    icon: Sparkles,
    gradient: 'from-[#EC4899] to-[#7928CA]',
    accentColor: '#EC4899',
    deliverables: ['Teacher Certification Modules', 'Ready-to-Teach Slide Decks', 'Ongoing On-Demand Support']
  },
];

export default function WhySchoolsNeedShorai() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeOutcomeIdx, setActiveOutcomeIdx] = useState(0);
  const activeOutcome = schoolOutcomes[activeOutcomeIdx];
  const ActiveIcon = activeOutcome.icon;

  // Build pages for SpiralFlipbook
  const flipbookPages: FlipbookPage[] = schoolOutcomes.map((item, idx) => {
    const Icon = item.icon;
    return {
      id: item.id,
      pageNumber: idx + 1,
      title: item.title,
      badge: item.subtitle,
      color: item.accentColor,
      content: (
        <div className="flex flex-col justify-between h-full py-2">
          {/* Top Metric Header */}
          <div className="flex items-center justify-between mb-5">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${item.accentColor}25, ${item.accentColor}10)`,
                borderColor: `${item.accentColor}50`,
                borderWidth: 1,
                color: item.accentColor,
              }}
            >
              <Icon className="w-7 h-7" />
            </div>

            <div className="text-right">
              <div 
                className="text-3xl sm:text-4xl font-black tracking-tight"
                style={{ color: item.accentColor }}
              >
                {item.metric}
              </div>
              <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase">
                {item.metricLabel}
              </div>
            </div>
          </div>

          {/* Outcome Title & Subtitle */}
          <div className="mb-4">
            <h4 className="text-xl sm:text-2xl font-black text-foreground mb-1 leading-snug">
              {item.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </div>

          {/* Key Deliverables on Notebook Page */}
          <div className="p-4 rounded-2xl bg-muted/40 border border-border">
            <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Star className="w-3 h-3 text-amber-500" />
              <span>Verified Deliverables</span>
            </div>
            <div className="space-y-2">
              {item.deliverables.map((deliv, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <section id="why-shorai" className="relative py-28 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-accent/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono font-bold text-accent mb-4">
              <Target className="w-3.5 h-3.5" />
              THE CRUCIAL NEED
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-6 leading-tight">
              WHY SCHOOLS NEED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA]">SHORAI</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-medium mb-4">
              The world is changing faster than ever, driven by Artificial Intelligence, automation, and digital transformation.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Today&apos;s students need more than traditional education—they need practical skills, innovative thinking, and the confidence to thrive in a technology-driven future. Shorai bridges the gap between classroom theory and real-world innovation.
            </p>
          </SectionReveal>
        </div>

        {/* 4 By The Numbers Metrics Grid */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-muted-foreground uppercase">
              DATA-DRIVEN INSIGHTS
            </span>
            <h3 className="text-2xl font-black text-foreground mt-1">
              By The Numbers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {numbersData.map((item, idx) => (
              <SectionReveal key={item.label} delay={0.08 * idx}>
                <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    <div 
                      className="text-4xl sm:text-5xl font-black mb-3 tracking-tight"
                      style={{ color: item.color }}
                    >
                      {item.stat}
                    </div>
                    <h4 className="text-base font-bold text-foreground mb-2">{item.label}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* Shorai Is The Solution Hub */}
        <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-card border border-border mb-28 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase block mb-2">
              COMPREHENSIVE FRAMEWORK
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground">
              SHORAI Is The Complete Solution
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <SectionReveal key={sol.title} delay={0.06 * idx}>
                  <div className="p-6 rounded-2xl bg-muted/40 border border-border hover:border-primary/50 transition-all duration-300 group flex items-start gap-4 h-full">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm"
                      style={{ background: `${sol.color}15`, color: sol.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground mb-1.5">{sol.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{sol.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>

        {/* ── REDESIGNED: LEFT INFO + RIGHT SPIRAL FLIPBOOK ── */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono font-bold text-secondary mb-3 shadow-sm">
              <Zap className="w-3.5 h-3.5" />
              <span>INTERACTIVE FLIPBOOK &bull; 6 KEY OUTCOMES</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-3">
              Measurable Outcomes For Schools
            </h3>
            <p className="text-sm text-muted-foreground">
              Flip through the interactive outcome sheets to explore tangible institutional returns in admissions, academic prestige, and parent satisfaction.
            </p>
          </div>

          {/* Main 2-Column Layout (Left Info + Right Spiral Flipbook) */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT: 5 Columns Narrative & Jump Tabs */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold mb-4 border"
                  style={{
                    background: `${activeOutcome.accentColor}15`,
                    borderColor: `${activeOutcome.accentColor}40`,
                    color: activeOutcome.accentColor,
                  }}
                >
                  <ActiveIcon className="w-3.5 h-3.5" />
                  <span>{activeOutcome.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-3 leading-tight">
                  {activeOutcome.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {activeOutcome.desc}
                </p>

                {/* Big Metric Box */}
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase block mb-0.5">
                      IMPACT SCORECARD
                    </span>
                    <div className="text-xs font-bold text-foreground">
                      {activeOutcome.metricLabel}
                    </div>
                  </div>
                  <div 
                    className="text-3xl font-black font-mono tracking-tight"
                    style={{ color: activeOutcome.accentColor }}
                  >
                    {activeOutcome.metric}
                  </div>
                </div>

                {/* Quick Page Jump Selector */}
                <div className="space-y-1.5 mb-8">
                  <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    SELECT OUTCOME SHEET
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {schoolOutcomes.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveOutcomeIdx(idx)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border truncate flex items-center justify-between ${
                          activeOutcomeIdx === idx
                            ? 'bg-card border-primary text-primary shadow-sm ring-1 ring-primary/20'
                            : 'bg-muted/40 hover:bg-muted border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        <span className="text-[10px] font-mono ml-1 opacity-70">P{idx + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full sm:w-auto px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>
            </div>

            {/* RIGHT: 7 Columns 3D Spiral Flipbook */}
            <div className="lg:col-span-7 flex justify-center">
              <SpiralFlipbook
                pages={flipbookPages}
                activePageIndex={activeOutcomeIdx}
                onPageChange={(idx) => setActiveOutcomeIdx(idx)}
              />
            </div>

          </div>
        </div>

        {/* Slogan Banner with Contact Button */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#FF6B00]/15 via-[#FF3D7F]/15 to-[#7928CA]/15 border border-accent/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-2">
                SHORAI TODAY. INNOVATORS TOMORROW.
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Let&apos;s build future-ready schools that create future-ready citizens.
              </h3>
            </div>

            <div className="flex-shrink-0">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-[0_10px_25px_rgba(255,107,0,0.4)] flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>
            </div>
          </div>
        </SectionReveal>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
