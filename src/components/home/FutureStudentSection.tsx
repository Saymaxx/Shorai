'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Brain, Wrench, Code2, Plane, Settings2, Eye, Sparkles } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const careers = [
  {
    id: 'ai-engineer',
    title: 'AI ENGINEER',
    desc: 'Build neural networks & smart systems',
    icon: Brain,
    color: '#7928CA',
    bg: 'rgba(121,40,202,0.1)',
  },
  {
    id: 'robotics-dev',
    title: 'ROBOTICS DEVELOPER',
    desc: 'Design autonomous robots & kinematics',
    icon: Wrench,
    color: '#FF6B00',
    bg: 'rgba(255,107,0,0.1)',
  },
  {
    id: 'ai-dev',
    title: 'COMPUTER VISION SPECIALIST',
    desc: 'Teach machines to see & understand',
    icon: Eye,
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    id: 'drone-eng',
    title: 'DRONE & AVIONICS ENGINEER',
    desc: 'Design autonomous flight algorithms',
    icon: Plane,
    color: '#0284C7',
    bg: 'rgba(2,132,199,0.1)',
  },
  {
    id: 'auto-eng',
    title: 'AUTOMATION & IOT ARCHITECT',
    desc: 'Build connected smart factory systems',
    icon: Settings2,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)',
  },
];

export default function FutureStudentSection() {
  const [activeCareer, setActiveCareer] = useState(careers[0]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative py-28 bg-background overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[45vw] h-[45vw] max-w-[650px] bg-primary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              CAREER HORIZONS
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              WHAT WILL YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">STUDENT BECOME?</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              By introducing hands-on AI, Robotics, and Coding early, students develop the foundational skills for the highest-growth technology careers of tomorrow.
            </p>
          </SectionReveal>
        </div>

        {/* 5 Career Pathway Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
          {careers.map((c, idx) => {
            const Icon = c.icon;
            const isSelected = activeCareer.id === c.id;

            return (
              <SectionReveal key={c.id} delay={0.06 * idx}>
                <div
                  onClick={() => setActiveCareer(c)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 h-full flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-card border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20 scale-105'
                      : 'bg-card/70 hover:bg-card border-border hover:border-primary/40 shadow-sm'
                  }`}
                >
                  <div>
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm"
                      style={{ background: c.bg, color: c.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h4 className="text-sm sm:text-base font-black text-foreground mb-2">
                      {c.title}
                    </h4>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-border/50 text-[11px] font-mono font-bold text-primary flex items-center justify-between">
                    <span>Career Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>To know more about us contact us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
