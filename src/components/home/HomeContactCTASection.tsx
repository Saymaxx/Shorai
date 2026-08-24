'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import LeadInquiryForm from '@/components/shared/LeadInquiryForm';
import { useContent } from '@/context/ContentContext';

export default function HomeContactCTASection() {
  const { content } = useContent();
  const cta = content.home.getInTouch;

  return (
    <section id="get-in-touch" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── Side-by-Side: Designer "Get In Touch" Left & Designer Form Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-10">
          
          {/* Left Column: Designer Typography (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {cta.badge}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-6 leading-[1.05]">
                {cta.titleLine1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  {cta.titleGradient}
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md font-medium">
                {cta.subtitle}
              </p>
            </SectionReveal>
          </div>

          {/* Right Column: Designer Form (7 Cols) */}
          <div className="lg:col-span-7">
            <SectionReveal delay={0.14}>
              <div className="p-6 sm:p-9 rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden">
                
                {/* Subtle Ambient Card Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-foreground">{cta.formTitle}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{cta.formSubtitle}</p>
                  </div>

                  <LeadInquiryForm 
                    variant="inline"
                    submitButtonText="Send Message to STEM Team"
                  />
                </div>

              </div>
            </SectionReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
