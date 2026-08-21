'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  School,
  Settings,
  GraduationCap
} from 'lucide-react';
import InteractiveTechnology from '@/components/home/InteractiveTechnology';
import ForSchoolsSection from '@/components/home/ForSchoolsSection';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SectionReveal from '@/components/animations/SectionReveal';

export default function SchoolTransformationPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Transformation Hero Header with Advanced STEM Classroom Background */}
      <section className="relative pt-36 pb-20 sm:pb-28 overflow-hidden border-b border-border">
        {/* Background Image Layer with Atmospheric Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/advanced_stem_classroom.jpg"
            alt="Advanced STEM and AI School Innovation Lab"
            className="w-full h-full object-cover object-center filter brightness-[0.45] dark:brightness-[0.25] scale-105 transition-transform duration-1000"
          />
          {/* Subtle multi-layer gradient overlays for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#7928CA]/20 via-[#6366F1]/20 to-[#00D4FF]/20 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-xs font-mono font-bold text-white dark:text-primary mb-6 shadow-lg backdrop-blur-md">
              <Rocket className="w-4 h-4 text-primary" />
              <span>INSTITUTIONAL ROADMAP &bull; TRANSFORMATION</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 
              className="font-black tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto drop-shadow-md"
              style={{ fontSize: 'clamp(38px, 5vw, 68px)' }}
            >
              TRANSFORM YOUR CAMPUS INTO A <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                FUTURE-READY STEM HUB.
              </span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-white/90 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 font-medium drop-shadow-sm">
              A turnkey, frictionless 5-step implementation lifecycle that integrates AI, Robotics, Coding, and teacher enablement into your school within 30 days.
            </p>
          </SectionReveal>

          {/* Key Advantage Badges */}
          <SectionReveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
              <div className="px-4 py-2 rounded-2xl bg-card/80 backdrop-blur-md border border-white/20 dark:border-border text-xs font-bold text-foreground shadow-sm flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>30-Day Turnkey Lab Setup</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-card/80 backdrop-blur-md border border-white/20 dark:border-border text-xs font-bold text-foreground shadow-sm flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>NEP 2020 Aligned Pedagogy</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-card/80 backdrop-blur-md border border-white/20 dark:border-border text-xs font-bold text-foreground shadow-sm flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Certified Master Trainers</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Make Your School Future-Ready Proposition */}
      <ForSchoolsSection />

      {/* 5-Step Methodology Section */}
      <InteractiveTechnology />

      {/* How It Works Detailed Workflow */}
      <HowItWorks />

      {/* Educator Testimonials */}
      <Testimonials />

      {/* Closing CTA */}
      <section className="py-20 bg-card border-t border-border relative overflow-hidden text-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-4">
              Ready To Schedule Your School Transformation Audit?
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Our master STEM consultants will assess your campus, design an NEP-compliant lab layout, and customize a proposal tailored for your student strength.
            </p>
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
      </section>

      {/* Footer */}
      <Footer />

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
