'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Rocket, 
  CheckCircle2 
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

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

        {/* ── Featured Visual Showcase: Indian Students in STEM Innovation Lab ── */}
        <SectionReveal delay={0.12}>
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-sm mb-16 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Image Container with Interactive Floating Badges (7 Cols) */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group shadow-md">
                <img
                  src="/images/indian_students_stem_lab.jpg"
                  alt="Indian students in modern school innovation lab learning AI, drones, coding and robotics"
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Floating Interactive Pill 1: AI & Python */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 text-xs font-bold text-foreground">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>AI &amp; Neural Code Lab</span>
                </div>

                {/* Floating Interactive Pill 2: Autonomous Drone */}
                <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 text-xs font-bold text-foreground">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  <span>Autonomous Robotics &amp; Drones</span>
                </div>
              </div>

              {/* Showcase Description & Key Value Points (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-xs font-mono font-bold text-accent mb-3">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    EXPERIENTIAL CLASSROOMS
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-3 leading-tight">
                    Where Indian Students Build the Future.
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    From soldering microcontrollers and configuring sensor telemetry to training computer vision AI models and launching drones, SHORAI turns passive students into fearless technological creators.
                  </p>

                  <div className="space-y-3 text-xs sm:text-sm font-semibold text-foreground">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Hands-on Robotics kits with real microcontrollers</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Live autonomous drone flight &amp; aerodynamics</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                      <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span>Python, AI Neural Networks &amp; Computer Vision</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/schools"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider group"
                  >
                    <span>Discover how our school labs work</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </SectionReveal>

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
