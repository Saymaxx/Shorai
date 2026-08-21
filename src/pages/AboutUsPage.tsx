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
      <section className="relative pt-36 pb-20 sm:pb-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/3 left-1/4 w-[700px] h-[350px] bg-gradient-to-tr from-[#7928CA]/20 via-[#6366F1]/20 to-[#00D4FF]/20 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Narrative & Credentials (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <SectionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono font-bold text-primary mb-6 shadow-sm">
                  <Building2 className="w-4 h-4" />
                  <span>ABOUT SEG ACADEMY &bull; SHORAI INITIATIVE</span>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <h1 
                  className="font-black tracking-tight text-foreground mb-6 leading-tight"
                  style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}
                >
                  PIONEERING FUTURE SKILLS &amp; <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                    STEM EDUCATION FOR INDIA.
                  </span>
                </h1>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  With 15+ years of pedagogical excellence and over 1,000+ empowered learners, SEG Academy launched Shorai to revolutionize K-12 school education with turnkey AI, Robotics, Drone, and Coding innovation hubs.
                </p>
              </SectionReveal>

              {/* Key Credentials Pills */}
              <SectionReveal delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-foreground">15+ Years Track Record</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-bold text-foreground">NEP 2020 Aligned Labs</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="text-xs font-bold text-foreground">Master STEM Trainers</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-card border border-border shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#00D4FF] flex-shrink-0" />
                    <span className="text-xs font-bold text-foreground">Turnkey Infrastructure</span>
                  </div>
                </div>
              </SectionReveal>

              {/* CTA Action */}
              <SectionReveal delay={0.25}>
                <MagneticWrapper>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl inline-flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <span>Connect With Our Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticWrapper>
              </SectionReveal>
            </div>

            {/* Right Column: Authentic Indian Organisation Image Showcase (6 Cols) */}
            <div className="lg:col-span-6">
              <SectionReveal delay={0.15}>
                <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl group">
                  
                  {/* The Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src="/images/about_organisation_stem.jpg"
                      alt="SEG Academy & Shorai STEM and Robotics Educators Mentoring Indian Students"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Subtle Overlay Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 text-xs font-mono font-bold text-primary">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>SEG ACADEMY &bull; AI &amp; ROBOTICS CELL</span>
                      </div>
                    </div>

                    {/* Bottom Floating Card */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="p-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border shadow-xl flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-black text-foreground mb-0.5">Hands-On Innovation Pedagogy</h4>
                          <p className="text-xs text-muted-foreground font-medium">Mentoring next-gen coders, roboticists &amp; drone engineers across India</p>
                        </div>
                        <div className="hidden sm:flex w-10 h-10 rounded-xl bg-primary/10 text-primary items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </SectionReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Main About SEG Academy Content (Timeline, Legacy & Philosophy) */}
      <AboutSEGAcademy />

      {/* Shorai 360° Education Ecosystem */}
      <Shorai360Ecosystem />

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
