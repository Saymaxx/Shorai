'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Brain, Plane, Code2, Sparkles, CheckCircle2, Bot, Zap } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

const quadrants = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    subtitle: 'Neural Nets • Computer Vision',
    icon: Brain,
    image: '/images/shorai-quadrant-ai.jpg',
    alt: 'Indian student learning Artificial Intelligence and computer vision',
    accentColor: '#8B5CF6',
    badgeBg: 'bg-purple-500/90 text-white',
    ringColor: 'group-hover:ring-purple-500/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]',
    tag: 'AI LAB',
  },
  {
    id: 'drone',
    title: 'Drone Technology',
    subtitle: 'Aeromodelling • UAV Flight',
    icon: Plane,
    image: '/images/shorai-quadrant-drone.jpg',
    alt: 'Indian student tuning educational drone in aerospace lab',
    accentColor: '#06B6D4',
    badgeBg: 'bg-cyan-500/90 text-white',
    ringColor: 'group-hover:ring-cyan-500/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]',
    tag: 'DRONE LAB',
  },
  {
    id: 'robotics',
    title: 'Robotics & Automation',
    subtitle: '6-Axis Arms • Microcontrollers',
    icon: Bot,
    image: '/images/shorai-quadrant-robotics.jpg',
    alt: 'Indian student programming robotic arm in robotics lab',
    accentColor: '#F59E0B',
    badgeBg: 'bg-amber-500/90 text-white',
    ringColor: 'group-hover:ring-amber-500/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]',
    tag: 'ROBOTICS LAB',
  },
  {
    id: 'coding',
    title: 'Coding & Software',
    subtitle: 'Python • Logic • Web Apps',
    icon: Code2,
    image: '/images/shorai-quadrant-coding.jpg',
    alt: 'Indian student coding algorithms and web applications',
    accentColor: '#10B981',
    badgeBg: 'bg-emerald-500/90 text-white',
    ringColor: 'group-hover:ring-emerald-500/60',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]',
    tag: 'CODING LAB',
  },
];

export default function InnovationLabs() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { content } = useContent();
  const labsData = content.home.innovationLabs;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const parallaxLabX = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 8;
  const parallaxLabY = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 8;

  return (
    <section 
      id="innovation-labs" 
      onMouseMove={handleMouseMove}
      className="relative py-28 bg-transparent overflow-hidden border-t border-border transition-colors duration-300"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[50vw] h-[50vw] max-w-[650px] bg-secondary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] bg-primary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: 45% - Content */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionReveal delay={0.1}>
              <h2 
                className="font-black tracking-tight text-foreground mb-6 leading-tight"
                style={{ fontSize: 'clamp(38px, 4.8vw, 64px)' }}
              >
                {labsData.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  {labsData.titleGradient}
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                {labsData.subtitle}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.25}>
              <div className="space-y-3 mb-8 text-xs font-semibold text-foreground/90">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Turnkey lab setup with student safety certification</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Integrated with Shorai AI cloud learning platform</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Expert trainers and ongoing technical mentorship</span>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <Link
                  href="/labs"
                  className="w-full sm:w-auto px-6 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 text-center"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Launch Shorai Labs &amp; Demos</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>

                <MagneticWrapper>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full sm:w-auto px-6 h-13 rounded-2xl bg-card hover:bg-muted border border-border text-foreground font-bold text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <span>Contact Us</span>
                  </button>
                </MagneticWrapper>
              </div>
            </SectionReveal>
          </div>

          {/* RIGHT: 55% - 4-Quadrant Visual Matrix */}
          <div className="lg:col-span-7 relative">
            <SectionReveal delay={0.15}>
              <div 
                className="relative rounded-3xl p-3 sm:p-4 bg-card/60 backdrop-blur-md border border-border/80 shadow-2xl ring-1 ring-border/50"
                style={{ transform: `translate(${parallaxLabX}px, ${parallaxLabY}px)` }}
              >
                {/* 2x2 Quadrant Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {quadrants.map((quad) => {
                    const Icon = quad.icon;
                    return (
                      <div
                        key={quad.id}
                        onMouseEnter={() => setActiveQuadrant(quad.id)}
                        onMouseLeave={() => setActiveQuadrant(null)}
                        className={`group relative rounded-2xl overflow-hidden bg-background border border-border/80 transition-all duration-500 aspect-[4/3] ring-1 ring-border/40 hover:ring-2 ${quad.ringColor} ${quad.glowColor} hover:-translate-y-1`}
                      >
                        {/* Student Photograph */}
                        <Image 
                          src={quad.image} 
                          alt={quad.alt} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-108"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                        />

                        {/* High-contrast gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

                        {/* Top Category Badge */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md shadow-md text-[11px] font-mono font-bold ${quad.badgeBg}`}>
                            <Icon className="w-3.5 h-3.5" />
                            <span>{quad.tag}</span>
                          </div>
                          
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                        </div>

                        {/* Bottom Information */}
                        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 flex flex-col justify-end text-white pointer-events-none">
                          <div className="text-sm sm:text-base font-bold leading-tight group-hover:text-white transition-colors drop-shadow-sm flex items-center gap-1.5">
                            {quad.title}
                          </div>
                          <p className="text-[11px] sm:text-xs text-white/80 font-medium tracking-wide mt-0.5 line-clamp-1 drop-shadow-sm">
                            {quad.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Central Floating Badge */}
                <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-xl border border-primary/40 shadow-2xl text-[11px] font-mono font-black text-foreground">
                  <Zap className="w-3.5 h-3.5 text-primary animate-bounce" />
                  <span>SHORAI 4-PILLAR LABS</span>
                </div>

                {/* Bottom Footer Ribbon */}
                <div className="mt-3 sm:mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>100% PRACTICAL HANDS-ON LEARNING</span>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-[11px]">
                    NEP 2020 COMPLIANT
                  </div>
                </div>

              </div>
            </SectionReveal>
          </div>

        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
