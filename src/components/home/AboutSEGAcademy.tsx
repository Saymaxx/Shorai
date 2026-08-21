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

export default function AboutSEGAcademy() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { navigate } = useRouter();

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
                    <div className="px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>SEG ACADEMY FACULTY</span>
                    </div>
                  </div>

                  {/* Bottom Floating Badge */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <div className="p-3.5 rounded-2xl bg-card/90 backdrop-blur-md border border-border shadow-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-foreground">SEG Academy Pvt. Ltd.</div>
                          <div className="text-[10px] font-mono text-muted-foreground font-semibold">Bengaluru, Karnataka &bull; Est. 15+ Yrs</div>
                        </div>
                      </div>
                      <div className="text-right pl-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      </div>
                    </div>
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
                <span>LEGACY &amp; PEDAGOGICAL BACKING</span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
                ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SEG ACADEMY</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-base sm:text-lg font-bold text-foreground/90 tracking-wide mb-3">
                Building Excellence in Education. Inspiring the Next Generation of Innovators.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                SEG Academy Pvt. Ltd. has been empowering learners through industry-oriented education, professional training, technology programs, and skill development across India. Today, this rich pedagogical heritage powers <strong>SHORAI</strong>—our flagship initiative bringing turnkey NEP 2020 AI, Robotics, Drone, and Coding Innovation Labs directly to school campuses.
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
                    &ldquo;Great schools don&apos;t just prepare students for exams. They prepare them for the future.&rdquo;
                  </p>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    — SEG Academy &amp; Shorai Philosophy
                  </span>
                </div>
              </div>
            </SectionReveal>

            {/* Action Buttons */}
            <SectionReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 w-full">
                <MagneticWrapper>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <span>To know more about us contact us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
