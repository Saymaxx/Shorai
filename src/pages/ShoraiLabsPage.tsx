'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Plane, 
  Code2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Compass, 
  ChevronRight,
  Terminal,
  Activity
} from 'lucide-react';
import AIEducationSection from '@/components/home/AIEducationSection';
import DroneEducationSection from '@/components/home/DroneEducationSection';
import CodingEducationSection from '@/components/home/CodingEducationSection';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SectionReveal from '@/components/animations/SectionReveal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { siteConfig } from '@/config/siteConfig';

export default function ShoraiLabsPage() {
  usePageMeta(siteConfig.pages.labs);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToDemo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground transition-colors duration-300">
      {/* 1. Futuristic Shorai Labs Hero Header */}
      <section className="relative pt-40 sm:pt-48 pb-20 overflow-hidden border-b border-border">
        {/* Ambient background glow & grid pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#7928CA]/20 via-[#6366F1]/20 to-[#00D4FF]/20 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Top Badge */}
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono font-bold text-primary mb-6 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>SHORAI LABS // LIVE INTERACTIVE SUITE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              </div>
            </SectionReveal>

            {/* Headline */}
            <SectionReveal delay={0.1}>
              <h1 
                className="font-black tracking-tight text-foreground mb-6 leading-[1.08]"
                style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
              >
                EXPERIENCE THE FUTURE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  OF HANDS-ON LEARNING.
                </span>
              </h1>
            </SectionReveal>

            {/* Subheading */}
            <SectionReveal delay={0.15}>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                Explore real-time interactive sandboxes for schools. Train neural networks, simulate drone avionics physics, and write live embedded hardware code right from your browser.
              </p>
            </SectionReveal>

            {/* Quick Demo Navigation Pills */}
            <SectionReveal delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                <button
                  onClick={() => scrollToDemo('ai-lab')}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-foreground">AI &amp; Neural Nets</div>
                    <div className="text-[10px] text-muted-foreground font-mono">Live Sandbox</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToDemo('drone-lab')}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-card border border-border hover:border-cyan-500/50 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-foreground">Drone Technology</div>
                    <div className="text-[10px] text-muted-foreground font-mono">Flight Sim</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToDemo('coding-lab')}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-card border border-border hover:border-purple-500/50 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-foreground">Coding &amp; ROS 2</div>
                    <div className="text-[10px] text-muted-foreground font-mono">Live Compiler</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </SectionReveal>

            {/* Quick Stat Pill */}
            <SectionReveal delay={0.25}>
              <div className="inline-flex items-center gap-6 px-6 py-2.5 rounded-full bg-muted/60 border border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  <span>3 Live Interactive Engines</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>NEP 2020 Aligned</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>100% Hands-on Practice</span>
                </div>
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* 2. DEMO 1: AI & Machine Learning Demo */}
      <div id="ai-lab">
        <AIEducationSection />
      </div>

      {/* 3. DEMO 2: Drone Technology Demo */}
      <div id="drone-lab">
        <DroneEducationSection />
      </div>

      {/* 4. DEMO 3: Interactive Coding Sandbox */}
      <div id="coding-lab">
        <CodingEducationSection />
      </div>

      {/* 5. Closing Lab CTA Strip */}
      <section className="py-24 bg-card border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              BRING SHORAI LABS TO YOUR CAMPUS
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-5 tracking-tight">
              Ready to Upgrade Your School With Shorai Innovation Labs?
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Get complete end-to-end setup including 3D printers, robotic arm kits, AI compute workstations, certified teacher training, and customized NEP curriculum.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <Footer />

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
