'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Brain, Wrench, Plane, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export default function InnovationLabs() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const parallaxLabX = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 8;
  const parallaxLabY = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 8;

  return (
    <section 
      id="innovation-labs" 
      onMouseMove={handleMouseMove}
      className="relative py-28 bg-background overflow-hidden border-t border-border transition-colors duration-300"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[50vw] h-[50vw] max-w-[650px] bg-secondary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] bg-primary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: 45% - Content */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                SHORAI INNOVATION LABS
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 
                className="font-black tracking-tight text-foreground mb-6 leading-tight"
                style={{ fontSize: 'clamp(38px, 4.8vw, 64px)' }}
              >
                WHERE STUDENTS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  BUILD THE FUTURE.
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-primary mb-6 uppercase">
                AI &bull; ROBOTICS &bull; CODING &bull; DRONES
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                Equipped with industrial-grade microcontrollers, 6-axis robotic arms, autonomous flight simulators, and intelligent computer vision terminals—giving every student the tools to invent and discover.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.25}>
              <div className="space-y-3 mb-8 text-xs font-semibold text-foreground/90">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Turnkey lab setup with student safety certification</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Integrated with Shorai AI cloud learning platform</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Expert trainers and ongoing technical mentorship</span>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>
            </SectionReveal>
          </div>

          {/* RIGHT: 55% - Visual Lab Scene */}
          <div className="lg:col-span-7 relative">
            <SectionReveal delay={0.15}>
              <div 
                className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl aspect-[16/11]"
                style={{ transform: `translate(${parallaxLabX}px, ${parallaxLabY}px)` }}
              >
                <Image 
                  src="/images/shorai-innovation-lab.png" 
                  alt="Students building the future in SHORAI Innovation Labs" 
                  fill 
                  className="object-cover"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating interactive tags */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white border border-white/15">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>LAB ACTIVE // 100% HANDS-ON</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-primary/80 backdrop-blur-md text-white font-bold">
                    K-12 INNOVATION
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
