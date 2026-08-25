'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  BookOpen,
  Rocket,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Quote,
  ShieldCheck,
  Building2
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useRouter } from '@/context/RouterContext';
import { useContent } from '@/context/ContentContext';

export default function AboutSEGAcademy() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { navigate } = useRouter();
  const { content } = useContent();
  const seg = content.about.segAcademy;

  return (
    <section id="about-seg" className="relative py-24 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── 2-COLUMN LAYOUT: QUADRANT IMAGE LEFT + NARRATIVE & ACTIONS RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Quadrant-Shaped Professional Team Image (5.5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <SectionReveal delay={0.1}>
              <div className="relative w-full max-w-[460px] group">
                
                {/* Ambient glow behind quadrant */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#7928CA]/30 via-[#6366F1]/20 to-[#00D4FF]/30 rounded-[60px] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Quadrant Framed Image */}
                <div className="relative aspect-square w-full rounded-tl-[120px] rounded-br-[120px] rounded-tr-3xl rounded-bl-3xl overflow-hidden border-2 border-border/80 bg-card shadow-2xl">
                  <img
                    src="/images/seg_academy_team_quadrant.jpg"
                    alt="SEG Academy Professional STEM Leadership & Mentorship Team"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-5 right-5 z-10">
                    <div className="px-3.5 py-1.5 rounded-full bg-card/90 border border-border backdrop-blur-md text-[10px] font-mono font-bold text-primary shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>LEGACY OF EXCELLENCE</span>
                    </div>
                  </div>

                  {/* Bottom Strip Badge */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 p-3 rounded-2xl bg-card/90 backdrop-blur-md border border-border flex items-center justify-between text-xs font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Govt. Registered (MCA)</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">15+ YEARS</span>
                  </div>

                </div>

              </div>
            </SectionReveal>
          </div>

          {/* RIGHT: Text & Action Buttons (6.5 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-5 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>{seg.badge}</span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SEG Academy</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-base sm:text-lg font-bold text-foreground/90 tracking-wide mb-3">
                {seg.narrative1}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                SHORAI is a subsidiary brand of SEG ACADEMY and our specialized institutional initiative, delivering turnkey STEM, AI, and Robotics innovation hubs to forward-thinking schools across India.
              </p>
            </SectionReveal>

            {/* 4 Feature Credentials Grid */}
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-foreground">15+ Years Track Record</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-bold text-foreground">1,000+ Empowered Students</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-xs font-bold text-foreground">Certified STEM Master Trainers</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#00D4FF] flex-shrink-0" />
                  <span className="text-xs font-bold text-foreground">Pan-India School Network</span>
                </div>
              </div>
            </SectionReveal>

            {/* Inspiring Philosophy Quote */}
            <SectionReveal delay={0.25}>
              <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border mb-8 flex items-start gap-3 w-full">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Quote className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground italic mb-1">
                    &ldquo;{seg.quote}&rdquo;
                  </p>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    — SEG Academy (Parent Brand) &amp; SHORAI Educational Philosophy
                  </span>
                </div>
              </div>
            </SectionReveal>

            {/* Action Buttons */}
            <SectionReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 w-full">
                <MagneticWrapper>
                  <a
                    href="https://www.segacademy.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md inline-flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <span>To know more about us</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </MagneticWrapper>

                <MagneticWrapper>
                  <button
                    onClick={() => navigate('/schools')}
                    className="px-6 h-13 rounded-2xl bg-card hover:bg-muted border border-border text-foreground font-bold text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <span>Explore School Labs</span>
                    <Rocket className="w-4 h-4 text-primary" />
                  </button>
                </MagneticWrapper>
              </div>
            </SectionReveal>

          </div>

        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
