'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Heart, Cpu, Code2, Rocket } from 'lucide-react';
import Robot3DCanvas from '@/components/3d/Robot3D';

interface HeroVisualProps {
  mousePosition: { x: number; y: number };
  activeSection?: string;
}

const DIALOGUES = [
  "Hello! I'm Shorai-1 👋",
  "Ready to build the future? 🚀",
  "AI & Robotics are super fun! 🤖",
  "Let's code something awesome! 💻",
  "STEM learning made magical! ✨",
];

const STEM_BADGES = [
  { label: 'AI Powered', icon: Cpu, color: '#00d4ff', x: '-42%', y: '-30%' },
  { label: 'Robotics', icon: Bot, color: '#FF6B00', x: '42%', y: '-24%' },
  { label: 'Coding', icon: Code2, color: '#a83aff', x: '-44%', y: '30%' },
  { label: 'Drones', icon: Rocket, color: '#FF3D7F', x: '40%', y: '32%' },
];

export default function HeroVisual({ activeSection = 'hero' }: HeroVisualProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Rotate dialogue periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHearts((prev) => [...prev.slice(-6), { id: Date.now(), x, y }]);
    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);
  };

  return (
    <div
      className="relative w-full h-full min-h-[500px] sm:min-h-[580px] lg:min-h-[680px] flex items-center justify-center pointer-events-auto select-none"
      onClick={handleContainerClick}
    >
      {/* ── AMBIENT NEON GLOWS ────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[80%] aspect-square rounded-full bg-[#00d4ff]/10 blur-[130px] animate-pulse" />
        <div className="w-[65%] aspect-square rounded-full bg-[#FF6B00]/8 blur-[110px]" />
        <div className="w-[50%] aspect-square rounded-full bg-[#7B2DFF]/10 blur-[90px]" />
      </div>

      {/* ── SPEECH BUBBLE (Interactive AI Dialogue) ────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogueIndex}
          initial={{ opacity: 0, y: 10, scale: 0.90 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.94 }}
          transition={{ type: 'spring', damping: 20, stiffness: 240 }}
          className="absolute -top-8 sm:-top-6 z-30 px-4 py-2 rounded-2xl bg-[#0b101d]/95 border border-[#00d4ff]/40 shadow-[0_0_25px_rgba(0,212,255,0.3)] backdrop-blur-xl flex items-center gap-2 pointer-events-none whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
          <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            {DIALOGUES[dialogueIndex]}
          </span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0b101d]/95 border-b border-r border-[#00d4ff]/40 rotate-45" />
        </motion.div>
      </AnimatePresence>

      {/* ── FLOATING HEARTS (on click reaction) ─────────────────────── */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 1.8, y: -90, x: (Math.random() - 0.5) * 60 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute z-40 pointer-events-none text-[#FF3D7F]"
          style={{ left: h.x, top: h.y }}
        >
          <Heart className="w-6 h-6 fill-[#FF3D7F]" />
        </motion.div>
      ))}

      {/* ── 3D REAL WEBGL ROBOT HEAD & CELESTIAL TECH CANVAS ────────── */}
      <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
        <Robot3DCanvas activeSection={activeSection} />
      </div>

      {/* ── FLOATING STEM BADGES (Orbiting outer perimeter) ─────────── */}
      {STEM_BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            className="absolute z-25 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080d1a]/85 border shadow-lg backdrop-blur-md pointer-events-none whitespace-nowrap"
            style={{
              top: `calc(50% + ${badge.y})`,
              left: `calc(50% + ${badge.x})`,
              borderColor: `${badge.color}45`,
              boxShadow: `0 0 18px ${badge.color}20`,
            }}
            animate={{
              y: [0, idx % 2 === 0 ? -8 : 8, 0],
              rotate: [0, idx % 2 === 0 ? 2 : -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5 + idx * 0.6,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-3 h-3" style={{ color: badge.color }} />
            <span className="text-[10px] font-mono font-bold tracking-wider text-white/85">
              {badge.label}
            </span>
          </motion.div>
        );
      })}

      {/* ── HUD CORNER LABELS ────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        aria-hidden="true"
      >
        {/* Top-right: SYSTEM ONLINE badge */}
        <div className="absolute top-[4%] right-[2%] flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-white/40 uppercase">
              SHORAI-AI
            </span>
            <span className="text-[11px] font-bold tracking-widest text-[#00d4ff] uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#00d4ff]" /> ONLINE
            </span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff] animate-ping" />
        </div>

        {/* Bottom-right: STATUS badge */}
        <div className="absolute bottom-[6%] right-[2%] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />
          <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">
            3D CORE ACTIVE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
