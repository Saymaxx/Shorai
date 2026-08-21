'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  BookOpen,
  Rocket,
  CheckCircle2,
  Calendar,
  GraduationCap,
  Cpu,
  Handshake,
  Sparkles,
  ArrowRight,
  Quote
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export default function AboutSEGAcademy() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="about-seg" className="relative py-20 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              LEGACY &amp; EXCELLENCE
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-6 leading-tight">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SEG ACADEMY</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium mb-4">
              Building Excellence in Education. Inspiring the Next Generation of Innovators.
            </p>
            <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-2xl">
              SEG Academy Pvt. Ltd. has been empowering learners through industry-oriented education, professional training, technology programs, and skill development. Today, this legacy continues through <strong>SHORAI</strong>—our dedicated initiative to transform schools into future-ready learning ecosystems powered by AI, Robotics, STEM, and Coding.
            </p>
          </SectionReveal>
        </div>

        {/* Inspiring Quote Callout & CTA Button */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 border border-primary/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 hidden sm:flex">
                <Quote className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-snug mb-2">
                  &ldquo;Great schools don&apos;t just prepare students for exams. They prepare them for the future.&rdquo;
                </p>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  — SEG Academy &amp; Shorai Philosophy
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] to-[#6366F1] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-[0_10px_25px_rgba(99,102,241,0.4)] flex items-center gap-2 transition-all hover:scale-105"
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
