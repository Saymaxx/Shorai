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
        { id: 'programs', key: 'transformation' },
        { id: 'robotics', key: 'robotics' },
        { id: 'innovation-labs', key: 'robotics' },
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
      className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex items-center pt-20"
    >
      {/* ── Background atmospherics ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Cyan atmosphere — left */}
        <div
          className="absolute top-[5%] -left-[15%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] bg-[#00d4ff]/5 rounded-full blur-[140px]"
          style={{ transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px)` }}
        />
        {/* Orange atmosphere — right */}
        <div
          className="absolute top-[20%] -right-[15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-[#FF6B00]/4 rounded-full blur-[160px]"
          style={{ transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)` }}
        />
        {/* Purple depth — center-right */}
        <div
          className="absolute top-[45%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#7B2DFF]/6 rounded-full blur-[130px]"
          style={{ transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * 18}px)` }}
        />

        {/* Subtle technical grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* ── Main layout ───────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 w-full relative z-20 grid lg:grid-cols-[48%_52%] items-center min-h-screen py-16 lg:py-0">

        {/* LEFT — content (z-30 so content is sharp & accessible) */}
        <div className="relative z-30 py-12 lg:py-0">
          <HeroContent />
        </div>

        {/* RIGHT — 3D Robot Head visual composition */}
        <div className="relative z-20 w-full h-[540px] sm:h-[620px] lg:h-[720px] flex items-center justify-center">
          <HeroVisual mousePosition={mousePosition} activeSection={activeSection} />
        </div>

      </div>
    </section>
  );
}
