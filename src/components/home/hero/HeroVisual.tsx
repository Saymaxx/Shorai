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
  { label: 'AI Powered', icon: Cpu, color: '#00d4ff', x: '-38%', y: '-26%' },
  { label: 'Robotics', icon: Bot, color: '#FF6B00', x: '38%', y: '-20%' },
  { label: 'Coding', icon: Code2, color: '#7B2DFF', x: '-40%', y: '26%' },
  { label: 'Drones', icon: Rocket, color: '#FF3D7F', x: '36%', y: '32%' },
];

export default function HeroVisual({ activeSection = 'hero' }: HeroVisualProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Rotate dialogue periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);
    }, 4800);
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
      className="relative w-full h-full min-h-[520px] sm:min-h-[600px] lg:min-h-[720px] flex items-center justify-center pointer-events-auto select-none"
      onClick={handleContainerClick}
    >
      {/* ── AMBIENT NEON GLOWS ────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[75%] aspect-square rounded-full bg-[#00d4ff]/10 blur-[130px] animate-pulse" />
        <div className="w-[60%] aspect-square rounded-full bg-[#FF6B00]/8 blur-[110px]" />
        <div className="w-[45%] aspect-square rounded-full bg-[#7B2DFF]/10 blur-[90px]" />
      </div>

      {/* ── CONCENTRIC HOLOGRAPHIC ORBITAL RINGS ─────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {/* Outer dashed ring */}
        <motion.div
          className="absolute w-[86%] aspect-square max-w-[580px] rounded-full border border-[#00d4ff]/20 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
        />
        {/* Middle gradient ring */}
        <motion.div
          className="absolute w-[68%] aspect-square max-w-[450px] rounded-full border border-[#FF6B00]/25"
          style={{ boxShadow: '0 0 30px rgba(255,107,0,0.1)' }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
        />
        {/* Inner purple ring */}
        <motion.div
          className="absolute w-[50%] aspect-square max-w-[330px] rounded-full border border-[#7B2DFF]/25 border-dotted"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
        />

        {/* Orbit Node Markers */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_12px_#00d4ff]"
            style={{
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 43}%)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 43}%)`,
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.8, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* ── SPEECH BUBBLE (Interactive AI Dialogue) ────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogueIndex}
          initial={{ opacity: 0, y: 15, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.9 }}
          transition={{ type: 'spring', damping: 18, stiffness: 220 }}
          className="absolute top-4 sm:top-8 z-30 px-5 py-2.5 rounded-2xl bg-[#0e1424]/95 border border-[#00d4ff]/40 shadow-[0_0_30px_rgba(0,212,255,0.3)] backdrop-blur-xl flex items-center gap-2.5 pointer-events-none whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
          <span className="text-sm font-semibold text-white tracking-wide">
            {DIALOGUES[dialogueIndex]}
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0e1424]/95 border-b border-r border-[#00d4ff]/40 rotate-45" />
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

      {/* ── 3D REAL WEBGL ROBOT CANVAS ───────────────────────────────── */}
      <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
        <Robot3DCanvas activeSection={activeSection} />
      </div>

      {/* ── FLOATING STEM BADGES (Orbiting around the 3D Robot) ──────── */}
      {STEM_BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            className="absolute z-25 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0f1d]/90 border shadow-lg backdrop-blur-md pointer-events-none whitespace-nowrap"
            style={{
              top: `calc(50% + ${badge.y})`,
              left: `calc(50% + ${badge.x})`,
              borderColor: `${badge.color}45`,
              boxShadow: `0 0 22px ${badge.color}25`,
            }}
            animate={{
              y: [0, idx % 2 === 0 ? -12 : 12, 0],
              rotate: [0, idx % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5 + idx * 0.6,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: badge.color }} />
            <span className="text-[11px] font-mono font-bold tracking-wider text-white/90">
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
        <div className="absolute top-[12%] right-[6%] flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/40 uppercase">
              SHORAI-AI
            </span>
            <span className="text-xs font-bold tracking-widest text-[#00d4ff] uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00d4ff]" /> ONLINE
            </span>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff] animate-ping" />
        </div>

        {/* Bottom-right: STATUS badge */}
        <div className="absolute bottom-[16%] right-[4%] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            3D COMPANION ACTIVE
          </span>
        </div>
      </motion.div>
    </div>
  );
}
