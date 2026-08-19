'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

export default function FinalCTA() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-32" style={{ background: '#050505' }}>
      
      {/* Background energy fields */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-full h-[280px] rounded-full mix-blend-screen"
          style={{ background: 'rgba(255,107,0,0.12)', filter: 'blur(100px)' }}
          animate={{ x: ['0%', '30%', '0%'], y: ['0%', '15%', '0%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-full h-[280px] rounded-full mix-blend-screen"
          style={{ background: 'rgba(0,212,255,0.08)', filter: 'blur(120px)' }}
          animate={{ x: ['0%', '-30%', '0%'], y: ['0%', '-15%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">

        {/* Robot icon badge */}
        <SectionReveal>
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-8"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              boxShadow: '0 0 30px rgba(0,212,255,0.15)',
            }}
          >
            <Bot className="w-6 h-6 text-[#00d4ff]" />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-[#FF6B00]/50" />
            <span className="section-number">FINAL CALL</span>
            <div className="w-6 h-px bg-[#FF6B00]/50" />
          </div>
          <h2
            className="font-black tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(42px, 7vw, 88px)', lineHeight: 1.02 }}
          >
            THE FUTURE WON&apos;T{' '}
            <br className="hidden md:block" />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #FF6B00, #7B2DFF, #00d4ff)' }}
            >
              BUILD ITSELF.
            </span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <p className="text-[17px] text-white/45 mb-14 max-w-lg mx-auto leading-relaxed">
            Give students the tools, environment, and guidance to build what comes next.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Primary */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative h-14 px-10 rounded-full text-white font-bold text-[15px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF6B00, #7B2DFF)',
                boxShadow: '0 0 30px rgba(255,107,0,0.35)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Bring SHORAI to Your School
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            </motion.button>

            {/* Secondary */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-9 rounded-full font-semibold text-[15px] text-white/80 hover:text-white transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              Talk to SHORAI
            </motion.button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
