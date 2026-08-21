'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  Award, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import AboutSEGAcademy from '@/components/home/AboutSEGAcademy';
import Shorai360Ecosystem from '@/components/home/Shorai360Ecosystem';
import InteractiveTechnology from '@/components/home/InteractiveTechnology';
import ImpactSection from '@/components/home/ImpactSection';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SectionReveal from '@/components/animations/SectionReveal';

export default function AboutUsPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* About Us Hero Header */}
      <section className="relative pt-36 pb-16 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#7928CA]/20 via-[#6366F1]/20 to-[#00D4FF]/20 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono font-bold text-primary mb-6 shadow-sm">
              <Building2 className="w-4 h-4" />
              <span>ABOUT SEG ACADEMY &bull; SHORAI INITIATIVE</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 
              className="font-black tracking-tight text-foreground mb-6 leading-tight max-w-4xl mx-auto"
              style={{ fontSize: 'clamp(38px, 5vw, 68px)' }}
            >
              PIONEERING FUTURE SKILLS &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                STEM EDUCATION FOR INDIA.
              </span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              With 15+ years of pedagogical excellence and over 1,000+ empowered learners, SEG Academy launched Shorai to revolutionize K-12 school education with turnkey AI and Robotics labs.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-foreground/90">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>15+ Years Track Record</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>NEP 2020 Aligned</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Certified STEM Master Trainers</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Main About SEG Academy Content (Timeline, Legacy & Philosophy) */}
      <AboutSEGAcademy />

      {/* Shorai 360° Education Ecosystem */}
      <Shorai360Ecosystem />

      {/* How Shorai Transforms Schools (5-Step Roadmap) */}
      <InteractiveTechnology />

      {/* Institutional Impact Strip */}
      <ImpactSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Closing CTA Strip */}
      <section className="py-20 bg-card border-t border-border relative overflow-hidden text-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-4">
              Partner With SEG Academy &amp; Shorai Today
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Let&apos;s build an innovation lab on your campus and empower your students with 21st-century technological fluency.
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
