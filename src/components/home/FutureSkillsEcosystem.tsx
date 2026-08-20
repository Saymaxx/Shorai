'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Brain, 
  Code2, 
  Atom, 
  ShieldCheck, 
  Plane, 
  Radio, 
  Printer, 
  Glasses, 
  Cpu, 
  Lightbulb, 
  Rocket,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const skillsData = [
  {
    title: 'ROBOTICS',
    desc: 'Design, build and program robots. Learn automation and real-world applications.',
    icon: Bot,
    color: '#7928CA',
  },
  {
    title: 'ARTIFICIAL INTELLIGENCE',
    desc: 'Understand computer vision & AI concepts to build real AI-powered student projects.',
    icon: Brain,
    color: '#6366F1',
  },
  {
    title: 'CODING & PROGRAMMING',
    desc: 'Master computational thinking, Python, ROS 2 & app development with creativity.',
    icon: Code2,
    color: '#00D4FF',
  },
  {
    title: 'STEM LEARNING',
    desc: 'Hands-on practical activities integrating Science, Technology, Engineering & Math.',
    icon: Atom,
    color: '#10B981',
  },
  {
    title: 'CYBER SECURITY',
    desc: 'Building safe, smart, ethical & responsible digital citizens for the modern web.',
    icon: ShieldCheck,
    color: '#F59E0B',
  },
  {
    title: 'DRONE TECHNOLOGY',
    desc: 'Explore aerodynamics, autonomous flight principles, telemetry & sensor navigation.',
    icon: Plane,
    color: '#FF6B00',
  },
  {
    title: 'INTERNET OF THINGS (IOT)',
    desc: 'Connecting smart sensors, microcontrollers & cloud systems for smarter living.',
    icon: Radio,
    color: '#EC4899',
  },
  {
    title: '3D PRINTING & DESIGN',
    desc: 'Transforming CAD concepts into tangible physical prototypes through rapid innovation.',
    icon: Printer,
    color: '#8B5CF6',
  },
  {
    title: 'AR / VR IMMERSION',
    desc: 'Interactive augmented and virtual reality learning that extends beyond textbooks.',
    icon: Glasses,
    color: '#3B82F6',
  },
  {
    title: 'ELECTRONICS & CIRCUITS',
    desc: 'Learn microcontrollers, circuit logic, soldering basics & smart hardware.',
    icon: Cpu,
    color: '#14B8A6',
  },
  {
    title: 'DESIGN THINKING',
    desc: 'Empathy-driven problem solving, ideation frameworks & creative engineering.',
    icon: Lightbulb,
    color: '#EAB308',
  },
  {
    title: 'INNOVATION & STARTUP',
    desc: 'Build creative business models, pitch inventions & become future leaders.',
    icon: Rocket,
    color: '#EF4444',
  },
];

const pillars = [
  'Wide Range of Future Skills',
  'Practical & Hands-on',
  'Innovative & Engaging',
  'Real-World Applications',
];

export default function FutureSkillsEcosystem() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              SKILLS WE BUILD. FUTURES WE SHAPE.
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-6 leading-tight">
              FUTURE SKILLS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#00D4FF] to-[#FF6B00]">ECOSYSTEM</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Shorai&apos;s Future Skills Ecosystem is a comprehensive learning framework designed to prepare students for the rapidly evolving digital world. By integrating emerging technologies with hands-on, project-based learning, we equip learners with the knowledge, creativity, and problem-solving abilities needed to thrive.
            </p>
          </SectionReveal>
        </div>

        {/* 4 Feature Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 mb-16 max-w-4xl mx-auto">
          {pillars.map((p) => (
            <div 
              key={p} 
              className="p-3.5 rounded-2xl bg-card border border-border flex items-center justify-center gap-2 text-center text-xs font-bold text-foreground shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{p}</span>
            </div>
          ))}
        </div>

        {/* 12 Modern Domain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
          {skillsData.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <SectionReveal key={skill.title} delay={0.04 * idx}>
                <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-full">
                  <div>
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm"
                      style={{ background: `${skill.color}15`, color: skill.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-foreground tracking-wide mb-2">
                      {skill.title}
                    </h4>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Grade 1 - 12</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Quote Banner & Contact Us CTA */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 hidden sm:flex">
                <Quote className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-snug mb-2">
                  &ldquo;We don&apos;t just teach skills, we build innovators, creators and leaders who will shape the future.&rdquo;
                </p>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  — Shorai Future Skills Mission
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-[0_10px_25px_rgba(99,102,241,0.4)] flex items-center gap-2 transition-all hover:scale-105"
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
