'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  ArrowRight,
  Target,
  ShieldCheck
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

export default function WhySchoolsNeedShorai() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { content } = useContent();
  const whyData = content.home.whySchoolsNeedShorai;

  return (
    <section id="why-shorai" className="relative py-28 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-accent/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono font-bold text-accent mb-4">
              <Target className="w-3.5 h-3.5" />
              {whyData.badge}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="shorai-heading mb-4">
              {whyData.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA]">{whyData.titleGradient}</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="shorai-body max-w-2xl mx-auto mb-2 text-foreground/85 font-medium">
              {whyData.subtitle}
            </p>
          </SectionReveal>
        </div>

        {/* ── Visual Showcase: Image Left, Modern STEM Reasons Right ── */}
        <SectionReveal delay={0.12}>
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-sm mb-20 p-5 sm:p-7 lg:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Image Container on the Left (6 Cols) */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden group shadow-lg">
                <img
                  src="/images/why_schools_need_shorai.jpg"
                  alt="Indian students and teacher in AI and Robotics innovation lab learning modern STEM"
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Interactive Pill 1: NEP 2020 */}
                <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 max-w-[calc(100%-1.75rem)] z-10 px-3 sm:px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 text-[11px] sm:text-xs font-bold text-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">NEP 2020 Aligned Innovation Hub</span>
                </div>

                {/* Floating Interactive Pill 2: AI & Drones */}
                <div className="absolute bottom-3.5 sm:bottom-4 right-3.5 sm:right-4 max-w-[calc(100%-1.75rem)] z-10 px-3 sm:px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 text-[11px] sm:text-xs font-bold text-foreground">
                  <Bot className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">AI Robotics &amp; Autonomous Drones</span>
                </div>
              </div>

              {/* Text Explaining Why Schools Need Modern STEM on the Right (6 Cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
                    <ShieldCheck className="w-4 h-4" />
                    FUTURE-PROOF PEDAGOGY
                  </div>
                  
                  <h3 className="shorai-subheading text-2xl sm:text-3xl mb-4">
                    Why Modern Schools Need Robotics, AI, Coding &amp; Drones.
                  </h3>

                  {/* Big Highlighted Statement */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
                    <p className="shorai-subheading text-xl sm:text-2xl text-foreground">
                      By 2030, over <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA]">85% of high-growth careers</span> will require fluencies in automation, intelligent systems, and computational problem-solving.
                    </p>
                    <p className="shorai-body text-foreground/90 font-bold mt-3">
                      SHORAI brings these four critical pillars into your campus.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <MagneticWrapper>
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2 text-center"
                    >
                      <span>Request an On-Campus Lab Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </MagneticWrapper>
                </div>
              </div>

            </div>
          </div>
        </SectionReveal>

        {/* 4 By The Numbers Metrics Grid - DATA-DRIVEN INSIGHTS */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <SectionReveal>
              <h3 className="shorai-heading">
                DATA-DRIVEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA]">INSIGHTS</span>
              </h3>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="shorai-body max-w-2xl mx-auto mt-3">
                Key national metrics showing why hands-on AI and Robotics labs are now essential for modern institutions.
              </p>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyData.insights.map((item, idx) => {
              const colors = ['#7928CA', '#6366F1', '#00D4FF', '#FF6B00'];
              const itemColor = colors[idx % colors.length];
              return (
                <SectionReveal key={item.label} delay={0.08 * idx}>
                  <div className="p-7 sm:p-8 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div 
                        className="text-5xl sm:text-6xl font-black mb-4 tracking-tight"
                        style={{ color: itemColor }}
                      >
                        {item.stat}
                      </div>
                      <h4 className="shorai-subheading mb-2">{item.label}</h4>
                      <p className="shorai-body text-xs sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>

        {/* Slogan Banner with Contact Button */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#FF6B00]/15 via-[#FF3D7F]/15 to-[#7928CA]/15 border border-accent/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
            <div>
              <span className="shorai-eyebrow text-accent block mb-2">
                SHORAI TODAY. INNOVATORS TOMORROW.
              </span>
              <h3 className="shorai-subheading text-xl sm:text-2xl">
                Let&apos;s build future-ready schools that create future-ready citizens.
              </h3>
            </div>

            <div className="flex-shrink-0 w-full sm:w-auto">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full sm:w-auto px-6 sm:px-7 min-h-[48px] py-3 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(255,107,0,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-105 text-center"
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
