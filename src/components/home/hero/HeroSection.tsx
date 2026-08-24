'use client';

import { useState, useEffect } from 'react';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll to pass section state to robot
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const sections: { id: string; key: string }[] = [
        { id: 'coding', key: 'coding' },
        { id: 'drones', key: 'drones' },
        { id: 'ai', key: 'ai' },
        { id: 'skills', key: 'transformation' },
        { id: 'ecosystem', key: 'robotics' },
        { id: 'technology', key: 'robotics' },
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
      className="relative min-h-[calc(100vh-2rem)] w-full bg-background overflow-hidden flex items-center pt-24 sm:pt-28 pb-10 sm:pb-14 transition-colors duration-300"
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
        <div
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] bg-primary/[0.07] rounded-full blur-[140px]"
          style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
        />
        {/* Sunny Peach/Orange glow (center-right) */}
        <div
          className="absolute top-[15%] -right-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] bg-accent/[0.06] rounded-full blur-[150px]"
          style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
        />
        {/* Sky Blue / Cyan depth (bottom-left) */}
        <div
          className="absolute bottom-[5%] left-[25%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] bg-secondary/[0.06] rounded-full blur-[130px]"
          style={{ transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)` }}
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full relative z-20 grid lg:grid-cols-[48%_52%] items-center min-h-[calc(100vh-6rem)]">
        
        {/* LEFT — Student-focused value proposition */}
        <div className="relative z-30 py-8 lg:py-0">
          <HeroContent />
        </div>

        {/* RIGHT — Friendly, Interactive 3D Robot Companion */}
        <div className="relative z-20 w-full h-[520px] sm:h-[600px] lg:h-[680px] flex items-center justify-center">
          <HeroVisual mousePosition={mousePosition} activeSection={activeSection} />
        </div>

      </div>
    </section>
  );
}
