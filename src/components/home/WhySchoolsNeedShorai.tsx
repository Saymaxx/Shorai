'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Quote,
  Target
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

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

const outcomes = [
  {
    title: 'Future-Ready Reputation',
    desc: 'Establishes the school as a progressive 21st-century institution.',
    icon: Building2,
  },
  {
    title: 'Higher Student Engagement',
    desc: 'Transformative hands-on learning increases student interest & retention.',
    icon: Users,
  },
  {
    title: 'Academic & Innovation Excellence',
    desc: 'Boosts analytical problem-solving and science/math understanding.',
    icon: TrendingUp,
  },
  {
    title: 'Stronger Parent Trust',
    desc: 'Parents see tangible project output, robots and practical creations.',
    icon: HeartHandshake,
  },
  {
    title: 'Competitions & Hackathons',
    desc: 'Prepares students for national & international Olympiads & STEM awards.',
    icon: Award,
  },
  {
    title: 'School Brand Differentiation',
    desc: 'Stand out in admissions with cutting-edge robotics & AI lab infrastructure.',
    icon: Sparkles,
  },
];

export default function WhySchoolsNeedShorai() {
  const [isContactOpen, setIsContactOpen] = useState(false);

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
        <div className="mb-20">
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
        <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-card border border-border mb-20 shadow-sm">
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

        {/* 6 Measurable Outcomes for Partner Schools */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-secondary uppercase block mb-2">
              INSTITUTIONAL VALUE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground">
              Outcomes For Schools
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {outcomes.map((out, idx) => {
              const Icon = out.icon;
              return (
                <SectionReveal key={out.title} delay={0.06 * idx}>
                  <div className="p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 shadow-sm transition-all duration-300 group h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-foreground mb-2">{out.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{out.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
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
