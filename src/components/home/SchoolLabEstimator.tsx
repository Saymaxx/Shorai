'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export default function SchoolLabEstimator() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="institutional-blueprint" className="relative py-20 sm:py-24 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[650px] bg-primary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* Recommended Blueprint Card */}
        <div className="bg-gradient-to-b from-card via-card to-primary/[0.04] border-2 border-primary/30 p-6 sm:p-10 lg:p-12 rounded-[2.5rem] shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
            <div>
              <span className="shorai-eyebrow text-primary block text-xs font-mono font-bold tracking-widest uppercase">
                RECOMMENDED BLUEPRINT
              </span>
              <h3 className="shorai-subheading text-2xl sm:text-3xl font-black text-foreground mt-1">
                Institutional Summary
              </h3>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>NEP 2020 READY // CBSE &amp; ICSE</span>
            </div>
          </div>

          {/* 4 Metric Output Boxes */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            
            <div className="p-5 rounded-2xl bg-muted/40 border border-border text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-black text-foreground font-mono mb-1">
                Dedicated
              </div>
              <div className="text-xs font-bold text-muted-foreground">Full-Time Master Trainers</div>
              <div className="text-[11px] text-primary font-mono mt-1.5">On-Campus Mentorship</div>
            </div>

            <div className="p-5 rounded-2xl bg-muted/40 border border-border text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-black text-foreground font-mono mb-1">
                100+
              </div>
              <div className="text-xs font-bold text-muted-foreground">Modular Hardware Kits</div>
              <div className="text-[11px] text-emerald-500 font-mono mt-1.5">Plug &amp; Play Workbenches</div>
            </div>

            <div className="p-5 rounded-2xl bg-muted/40 border border-border text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-black text-foreground font-mono mb-1">
                30k+
              </div>
              <div className="text-xs font-bold text-muted-foreground">Student Lab Hours / Yr</div>
              <div className="text-[11px] text-secondary font-mono mt-1.5">Hands-On Practice</div>
            </div>

            <div className="p-5 rounded-2xl bg-muted/40 border border-border text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-black text-foreground font-mono mb-1">
                100%
              </div>
              <div className="text-xs font-bold text-muted-foreground">Curriculum Alignment</div>
              <div className="text-[11px] text-[#00D4FF] font-mono mt-1.5">CBSE, ICSE &amp; NEP</div>
            </div>

          </div>

          {/* Included Services Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs text-muted-foreground font-medium p-4 rounded-2xl bg-muted/20 border border-border">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Turnkey Lab Interior &amp; Workstations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Faculty Training &amp; Certification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Olympiad &amp; WRO Mentorship</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="max-w-md mx-auto">
            <MagneticWrapper>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Custom Institutional Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticWrapper>

            <p className="text-[11px] text-center text-muted-foreground mt-3 font-mono">
              ⚡ Lab packages are customized to your campus budget and school size.
            </p>
          </div>

        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
