'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Bot, 
  Cpu, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Rocket, 
  GraduationCap, 
  CheckCircle2, 
  Code2, 
  Award 
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const pillars = [
  {
    id: 'labs',
    title: 'Turnkey School Innovation Labs',
    badge: 'HARDWARE & WORKSTATIONS',
    desc: 'Complete on-campus STEM infrastructure equipped with robotics kits, microcontrollers (Arduino, ESP32, Raspberry Pi), AI vision cameras, and 3D printing stations.',
    icon: Cpu,
    color: '#7928CA',
    bg: 'rgba(121, 40, 202, 0.08)',
    borderHover: 'hover:border-[#7928CA]/50',
    tags: ['Robotics Arena', '3D Workstations', 'IoT Sensors'],
  },
  {
    id: 'curriculum',
    title: 'NEP 2020 Aligned K-12 Curriculum',
    badge: 'STRUCTURED PEDAGOGY',
    desc: '120+ progressive modular lesson plans spanning Grades 1 to 12. Seamlessly transitions young learners from visual logic blocks to Python, AI algorithms, and ROS 2.',
    icon: BookOpen,
    color: '#6366F1',
    bg: 'rgba(99, 102, 241, 0.08)',
    borderHover: 'hover:border-[#6366F1]/50',
    tags: ['Grade 1-12 Syllabi', 'Interactive LMS', 'Project Guides'],
  },
  {
    id: 'experiential',
    title: '100% Practical Experiential Learning',
    badge: 'ACTIVE BUILDING',
    desc: 'Moving far beyond theoretical textbook memorization. Students build real-world autonomous rovers, smart home devices, drone flight systems, and generative AI models.',
    icon: Bot,
    color: '#00D4FF',
    bg: 'rgba(0, 212, 255, 0.08)',
    borderHover: 'hover:border-[#00D4FF]/50',
    tags: ['Live Prototyping', 'Circuit Soldering', 'AI Computer Vision'],
  },
  {
    id: 'teacher',
    title: 'Certified Faculty Enablement',
    badge: 'EDUCATOR EMPOWERMENT',
    desc: 'Comprehensive training workshops and continuous certification programs that empower existing school educators to confidently teach emerging high-tech domains.',
    icon: GraduationCap,
    color: '#FF6B00',
    bg: 'rgba(255, 107, 0, 0.08)',
    borderHover: 'hover:border-[#FF6B00]/50',
    tags: ['Master Certifications', 'Teaching Slide Decks', '24/7 Mentor Support'],
  },
];

export default function WhatIsShoraiSection() {
  return (
    <section id="what-is-shorai" className="relative py-24 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              INTRODUCING SHORAI
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-6 leading-tight">
              WHAT IS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SHORAI?</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-semibold mb-4">
              The Next-Generation STEM, Robotics &amp; AI Innovation Ecosystem for Future-Ready Schools.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Developed as a premier education innovation initiative by <strong>SEG Academy</strong>, SHORAI bridges the critical gap between traditional school curricula and the technological demands of the 21st century. We empower K-12 schools with complete turnkey infrastructure, practical kits, and certified training to transform everyday classrooms into advanced technological beacons.
            </p>
          </SectionReveal>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <SectionReveal key={pillar.id} delay={0.08 * idx}>
                <div 
                  className={`relative p-7 sm:p-9 rounded-3xl bg-card border border-border ${pillar.borderHover} shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full`}
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div 
                        className="w-13 h-13 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                        style={{ background: pillar.bg, color: pillar.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span 
                        className="text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{ background: pillar.bg, color: pillar.color }}
                      >
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Feature Tags Strip */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/80">
                    {pillar.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[11px] font-medium text-foreground/80 px-2.5 py-1 rounded-lg bg-muted/60 border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Closing Highlight Strip with Action Links */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left">
            <div className="flex items-center gap-4 max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 hidden sm:flex">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                  Ready to Empower Your Students with Real-World STEM Skills?
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Partner with SHORAI to install a future-ready innovation lab on your campus.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 flex-shrink-0">
              <MagneticWrapper>
                <Link
                  href="/schools"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7928CA] to-[#6366F1] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore School Labs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </MagneticWrapper>

              <MagneticWrapper>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-2xl bg-card border border-border text-foreground hover:text-primary font-bold text-xs shadow-sm hover:border-primary/40 transition-all flex items-center gap-2"
                >
                  <span>Schedule School Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </MagneticWrapper>
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
