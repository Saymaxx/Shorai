'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  BookOpen, 
  Rocket, 
  CheckCircle2, 
  Calendar, 
  GraduationCap, 
  Cpu, 
  Handshake, 
  Sparkles, 
  ArrowRight,
  Quote
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const stats = [
  {
    value: '15+',
    unit: 'YEARS',
    label: 'Educational Excellence',
    desc: 'Deep pedagogical experience in industry training',
    color: '#7928CA',
    icon: Award,
  },
  {
    value: '1000+',
    unit: 'STUDENTS',
    label: 'Empowered Learners',
    desc: 'Hands-on training in emerging technologies',
    color: '#6366F1',
    icon: Users,
  },
  {
    value: '50+',
    unit: 'PROGRAMS',
    label: 'Industry Courses',
    desc: 'NEP aligned future-ready STEM curricula',
    color: '#00D4FF',
    icon: BookOpen,
  },
  {
    value: 'FUTURE',
    unit: 'FOCUSED',
    label: 'Innovation Mindset',
    desc: 'Practical, project-based engineering labs',
    color: '#FF6B00',
    icon: Rocket,
  },
];

const timelineSteps = [
  {
    year: '2020',
    title: 'Established with Vision',
    desc: 'Founded to transform education through industry-oriented practical training.',
    icon: Calendar,
    color: '#7928CA',
  },
  {
    year: '2021',
    title: 'Career & Skill Programs',
    desc: 'Launched specialized technical training and professional skill development.',
    icon: GraduationCap,
    color: '#6366F1',
  },
  {
    year: '2022',
    title: 'Technology Education',
    desc: 'Introduced hands-on AI, Robotics, Coding & STEM learning initiatives.',
    icon: Cpu,
    color: '#00D4FF',
  },
  {
    year: '2023',
    title: 'Teacher Training',
    desc: 'Upskilling hundreds of school educators for modern digital classrooms.',
    icon: Users,
    color: '#10B981',
  },
  {
    year: '2024',
    title: 'Industry Collaboration',
    desc: 'Partnered with technology experts, robotics industries & institutions.',
    icon: Handshake,
    color: '#F59E0B',
  },
  {
    year: '2025',
    title: 'Launch of SHORAI',
    desc: 'Dedicated initiative to build complete future-ready school innovation labs.',
    icon: Sparkles,
    color: '#FF6B00',
  },
  {
    year: '2026+',
    title: 'Future Schools Mission',
    desc: 'Empowering millions of young learners across India with future skills.',
    icon: Rocket,
    color: '#EC4899',
  },
];

export default function AboutSEGAcademy() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="about-seg" className="relative py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              LEGACY &amp; EXCELLENCE
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-6 leading-tight">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SEG ACADEMY</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium mb-4">
              Building Excellence in Education. Inspiring the Next Generation of Innovators.
            </p>
            <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-2xl">
              SEG Academy Pvt. Ltd. has been empowering learners through industry-oriented education, professional training, technology programs, and skill development. Today, this legacy continues through <strong>SHORAI</strong>—our dedicated initiative to transform schools into future-ready learning ecosystems powered by AI, Robotics, STEM, and Coding.
            </p>
          </SectionReveal>
        </div>

        {/* 4 Stat Cards from Brochure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <SectionReveal key={stat.label} delay={0.1 + idx * 0.08}>
                <div className="relative p-6 sm:p-7 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                      style={{ background: `${stat.color}15`, color: stat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span 
                      className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: `${stat.color}10`, color: stat.color }}
                    >
                      {stat.unit}
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-foreground mb-1 tracking-tight">
                      {stat.value}
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-1.5">{stat.label}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{stat.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Journey of Impact Timeline */}
        <div className="rounded-3xl p-6 sm:p-10 bg-card border border-border mb-16 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase block mb-2">
              MILESTONES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground">
              Our Journey of Impact
            </h3>
          </div>

          {/* Horizontal / Grid Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 relative">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <SectionReveal key={step.title} delay={0.05 * idx}>
                  <div className="relative p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border hover:border-primary/50 transition-all group flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="text-xs font-mono font-black px-2 py-0.5 rounded-md"
                          style={{ background: `${step.color}20`, color: step.color }}
                        >
                          {step.year}
                        </span>
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground mb-1 leading-snug">{step.title}</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>

        {/* Inspiring Quote Callout & CTA Button */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 border border-primary/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 hidden sm:flex">
                <Quote className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-snug mb-2">
                  &ldquo;Great schools don&apos;t just prepare students for exams. They prepare them for the future.&rdquo;
                </p>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  — SEG Academy &amp; Shorai Philosophy
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] to-[#6366F1] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-[0_10px_25px_rgba(99,102,241,0.4)] flex items-center gap-2 transition-all hover:scale-105"
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
