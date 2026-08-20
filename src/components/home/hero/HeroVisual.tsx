'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Heart, Cpu, Code2, Rocket, PartyPopper } from 'lucide-react';
import Robot3DCanvas from '@/components/3d/Robot3D';

interface HeroVisualProps {
  mousePosition: { x: number; y: number };
  activeSection?: string;
}

const DIALOGUES = [
  "Hello! I'm Shorai-1 👋",
  "Ready to build real robots? 🤖",
  "Let's code our first AI model! 🧠",
  "Fly autonomous drones today! 🚀",
  "STEM learning is super fun! ✨",
];

const STEM_BADGES = [
  { label: 'AI Projects', icon: Cpu, color: '#6366F1', bg: 'rgba(99,102,241,0.1)', x: '-42%', y: '-28%' },
  { label: 'Robotics Lab', icon: Bot, color: '#FF6B00', bg: 'rgba(255,107,0,0.1)', x: '42%', y: '-22%' },
  { label: 'Python & ROS 2', icon: Code2, color: '#7928CA', bg: 'rgba(121,40,202,0.1)', x: '-44%', y: '30%' },
  { label: 'Drone Flight', icon: Rocket, color: '#0284C7', bg: 'rgba(2,132,199,0.1)', x: '40%', y: '32%' },
];

export default function HeroVisual({ activeSection = 'hero' }: HeroVisualProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Rotate dialogue periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);
    }, 4500);
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
      className="relative w-full h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[660px] flex items-center justify-center pointer-events-auto select-none"
      onClick={handleContainerClick}
    >
      {/* ── Soft Ambient Radial Glows ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[85%] aspect-square rounded-full bg-primary/[0.08] blur-[120px] animate-pulse" />
        <div className="w-[70%] aspect-square rounded-full bg-secondary/[0.08] blur-[100px]" />
        <div className="w-[55%] aspect-square rounded-full bg-accent/[0.06] blur-[90px]" />
      </div>

      {/* ── SPEECH BUBBLE (Interactive Friendly Robot Greeting) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogueIndex}
          initial={{ opacity: 0, y: 10, scale: 0.90 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.94 }}
          transition={{ type: 'spring', damping: 20, stiffness: 240 }}
          className="absolute -top-6 sm:-top-4 z-30 px-4 py-2 rounded-2xl bg-card border border-border shadow-[0_10px_25px_rgba(99,102,241,0.15)] backdrop-blur-xl flex items-center gap-2 pointer-events-none whitespace-nowrap"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight">
            {DIALOGUES[dialogueIndex]}
          </span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-b border-r border-border rotate-45" />
        </motion.div>
      </AnimatePresence>

      {/* ── FLOATING HEARTS / SPARKS (Click Interaction) ── */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 1.8, y: -90, x: (Math.random() - 0.5) * 60 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute z-40 pointer-events-none text-rose-500"
          style={{ left: h.x, top: h.y }}
        >
          <Heart className="w-6 h-6 fill-rose-500" />
        </motion.div>
      ))}

      {/* ── 3D ROBOT CANVAS ── */}
      <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
        <Robot3DCanvas activeSection={activeSection} />
      </div>

      {/* ── FLOATING PLAYFUL STEM BADGES ── */}
      {STEM_BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            className="absolute z-25 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-md backdrop-blur-md pointer-events-none whitespace-nowrap"
            style={{
              top: `calc(50% + ${badge.y})`,
              left: `calc(50% + ${badge.x})`,
              boxShadow: `0 4px 15px rgba(0,0,0,0.06)`,
            }}
            animate={{
              y: [0, idx % 2 === 0 ? -7 : 7, 0],
              rotate: [0, idx % 2 === 0 ? 1.5 : -1.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + idx * 0.5,
              ease: 'easeInOut',
            }}
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: badge.bg, color: badge.color }}
            >
              <Icon className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-bold tracking-wide text-foreground/90">
              {badge.label}
            </span>
          </motion.div>
        );
      })}

      {/* ── HUD CORNER LABELS ── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        aria-hidden="true"
      >
        {/* Top-right: SYSTEM ONLINE badge */}
        <div className="absolute top-[4%] right-[2%] flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-foreground/80 tracking-wider">
            AI ROBOT ONLINE
          </span>
        </div>

        {/* Bottom-right: Interactive hint */}
        <div className="absolute bottom-[6%] right-[2%] flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold shadow-sm">
          <Sparkles className="w-3 h-3 animate-spin" />
          <span>CLICK ME TO CHAT</span>
        </div>
      </motion.div>
    </div>
  );
}
