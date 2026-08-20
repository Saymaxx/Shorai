'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Wrench, Microscope, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const features = [
  {
    title: 'AI LABS',
    desc: 'Turnkey computer vision & AI workspaces equipped with intelligent learning tools.',
    icon: Brain,
    color: '#7928CA',
  },
  {
    title: 'ROBOTICS LABS',
    desc: 'Hands-on hardware engineering, microcontrollers, servos and programmable kits.',
    icon: Wrench,
    color: '#FF6B00',
  },
  {
    title: 'STEM PROGRAMS',
    desc: 'NEP 2020 aligned project-based curriculum spanning Grade 1 to 12.',
    icon: Microscope,
    color: '#00D4FF',
  },
  {
    title: 'INDUSTRY EXPOSURE',
    desc: 'Connect students with real engineers, hackathons, and national STEM Olympiads.',
    icon: Briefcase,
    color: '#10B981',
  },
];

export default function ForSchoolsSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="schools" className="py-28 bg-background relative overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                INSTITUTIONAL PARTNERSHIP
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-6 leading-tight">
                MAKE YOUR SCHOOL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  FUTURE-READY.
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                SHORAI (by SEG Academy) partners with progressive schools to establish technology-driven learning environments that empower students to build real robots, code AI models, and compete on national platforms.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="h-13 px-8 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>
            </SectionReveal>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 relative">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <SectionReveal key={feature.title} delay={0.08 + index * 0.08}>
                  <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-start group">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm"
                      style={{ background: `${feature.color}15`, color: feature.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
