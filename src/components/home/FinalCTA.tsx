'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import Link from 'next/link';

export default function FinalCTA() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-28 px-4 sm:px-6 bg-background border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-full h-[350px] rounded-full mix-blend-screen"
          style={{ background: 'var(--purple-glow)', filter: 'blur(120px)' }}
          animate={{ x: ['0%', '20%', '0%'], y: ['0%', '15%', '0%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-full h-[350px] rounded-full mix-blend-screen"
          style={{ background: 'var(--glow-soft)', filter: 'blur(130px)' }}
          animate={{ x: ['0%', '-20%', '0%'], y: ['0%', '-15%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">

        {/* Robot Badge */}
        <SectionReveal>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-8 bg-primary/10 border border-primary/25 shadow-lg text-primary">
            <Bot className="w-7 h-7" />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-primary/40" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-primary uppercase">
              START TODAY
            </span>
            <div className="w-6 h-px bg-primary/40" />
          </div>
          <h2
            className="font-black tracking-tight text-foreground mb-6"
            style={{ fontSize: 'clamp(38px, 6vw, 80px)', lineHeight: 1.05 }}
          >
            THE FUTURE WON&apos;T{' '}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#00D4FF] to-[#FF6B00]">
              BUILD ITSELF.
            </span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
            Equip your school and students with the practical tools, curriculum, and innovation labs to lead tomorrow&apos;s world.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            {/* Primary "To know more about us contact us" */}
            <MagneticWrapper>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto h-14 px-8 sm:px-10 rounded-2xl text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(99,102,241,0.4)] transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                }}
              >
                <span>To know more about us contact us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticWrapper>

            {/* Secondary CTA */}
            <Link href="#ecosystem" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-14 px-8 rounded-2xl font-semibold text-sm sm:text-base text-foreground bg-card border border-border hover:border-primary/40 transition-all duration-300 backdrop-blur-md shadow-sm">
                Explore 360° Ecosystem
              </button>
            </Link>
          </div>
        </SectionReveal>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
