'use client';

import { useState, useEffect } from 'react';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';
import { motion, useTransform } from 'framer-motion';
import { globalMouseX, globalMouseY } from '@/lib/mouse';

export default function HeroSection() {
  const [activeSection, setActiveSection] = useState('hero');

  // Hardware-accelerated ambient translations without React state re-renders
  const cloud1X = useTransform(globalMouseX, (v) => (v / (typeof window !== 'undefined' ? window.innerWidth || 1 : 1)) * -15);
  const cloud1Y = useTransform(globalMouseY, (v) => (v / (typeof window !== 'undefined' ? window.innerHeight || 1 : 1)) * -15);
  
  const cloud2X = useTransform(globalMouseX, (v) => (v / (typeof window !== 'undefined' ? window.innerWidth || 1 : 1)) * 15);
  const cloud2Y = useTransform(globalMouseY, (v) => (v / (typeof window !== 'undefined' ? window.innerHeight || 1 : 1)) * 15);

  const cloud3X = useTransform(globalMouseX, (v) => (v / (typeof window !== 'undefined' ? window.innerWidth || 1 : 1)) * 12);
  const cloud3Y = useTransform(globalMouseY, (v) => (v / (typeof window !== 'undefined' ? window.innerHeight || 1 : 1)) * 12);

  // Track scroll to pass section state to robot
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const sections: { id: string; key: string }[] = [
        { id: 'coding', key: 'coding' },
        { id: 'drones', key: 'drones' },
        { id: 'ai', key: 'ai' },
        { id: 'skills', key: 'transformation' },
        { id: 'innovation-labs', key: 'robotics' },
        { id: 'what-is-shorai', key: 'robotics' },
        { id: 'why-shorai', key: 'robotics' },
        { id: 'shorai-360-ecosystem', key: 'robotics' },
      ];
      let found = 'hero';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && scrollPos >= el.offsetTop) {
          found = s.key;
          break;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full bg-background overflow-hidden flex items-center pt-20 sm:pt-28 pb-8 sm:pb-14 transition-colors duration-300 min-h-0 lg:min-h-[calc(100vh-2rem)]"
    >
      {/* ── Soft & Cheerful Background Atmospherics ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Soft Violet/Purple cloud (top-left) */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] bg-primary/[0.07] rounded-full blur-[140px]"
          style={{ x: cloud1X, y: cloud1Y }}
        />
        {/* Sunny Peach/Orange glow (center-right) */}
        <motion.div
          className="absolute top-[15%] -right-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] bg-accent/[0.06] rounded-full blur-[150px]"
          style={{ x: cloud2X, y: cloud2Y }}
        />
        {/* Sky Blue / Cyan depth (bottom-left) */}
        <motion.div
          className="absolute bottom-[5%] left-[25%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] bg-secondary/[0.06] rounded-full blur-[130px]"
          style={{ x: cloud3X, y: cloud3Y }}
        />

        {/* Subtle playful grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(var(--primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </motion.div>

      {/* ── Main Hero Layout ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full relative z-20 grid lg:grid-cols-[48%_52%] gap-6 lg:gap-4 items-center">
        
        {/* LEFT — Student-focused value proposition */}
        <div className="relative z-30 pt-4 pb-2 lg:py-0">
          <HeroContent />
        </div>

        {/* RIGHT — Friendly, Interactive 3D Robot Companion */}
        <div className="relative z-20 w-full h-[360px] sm:h-[460px] lg:h-[640px] flex items-center justify-center">
          <HeroVisual activeSection={activeSection} />
        </div>

      </div>
    </section>
  );
}
