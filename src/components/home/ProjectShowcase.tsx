'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Brain, Code2, Wrench, Plane, Cpu, Bot, Mic, Hand, Rocket, Sparkles } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const projects = [
  {
    id: 'mars-rover',
    title: 'MARS ROVER EXPLORER',
    copy: ['Explore.', 'Sense.', 'Navigate terrain.'],
    icon: Cpu,
    image: '/images/projects/mars-rover.png',
    color: '#FF6B00',
    bg: 'rgba(255,107,0,0.1)'
  },
  {
    id: 'robotic-picker',
    title: 'ROBOTIC PICKER ARM',
    copy: ['Pick.', 'Sort.', 'Kinematic control.'],
    icon: Wrench,
    image: '/images/projects/robotic-picker.png',
    color: '#7928CA',
    bg: 'rgba(121,40,202,0.1)'
  },
  {
    id: 'voice-bot',
    title: 'VOICE CONTROLLED BOT',
    copy: ['Speech-to-text.', 'NLP reasoning.', 'Move.'],
    icon: Mic,
    image: '/images/projects/voice-bot.png',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.1)'
  },
  {
    id: 'gesture-robot',
    title: 'HAND GESTURE ROBOT',
    copy: ['Vision tracking.', 'Gesture ML.', 'Actuate.'],
    icon: Hand,
    image: '/images/projects/gesture-robot.png',
    color: '#0284C7',
    bg: 'rgba(2,132,199,0.1)'
  },
  {
    id: 'mini-drone',
    title: 'MINI DRONE TECH',
    copy: ['Build.', 'Fly.', 'Autonomous waypoint.'],
    icon: Plane,
    image: '/images/projects/mini-drone.png',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.1)'
  }
];

export default function ProjectShowcase() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative py-28 bg-muted/20 overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[45vw] h-[45vw] max-w-[650px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[45vw] h-[45vw] max-w-[650px] bg-secondary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              STUDENT INVENTIONS &amp; CREATIONS
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              TECHNOLOGY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">COMES ALIVE</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Real projects designed and built by K-12 students using Shorai robotics hardware, computer vision kits, and Python controllers.
            </p>
          </SectionReveal>
        </div>

        {/* 5 Real Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-16">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <SectionReveal key={project.id} delay={0.06 * idx}>
                <div className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                  
                  {/* Top Image Preview */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <Image 
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center mb-3 shadow-sm"
                        style={{ background: project.bg, color: project.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <h4 className="text-xs sm:text-sm font-black text-foreground tracking-wide mb-2">
                        {project.title}
                      </h4>

                      <div className="space-y-1 text-xs text-muted-foreground">
                        {project.copy.map((c, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-mono font-bold text-primary flex items-center justify-between">
                      <span>Working Prototype</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
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
