'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Heart, Cpu, Code2, Rocket, Zap, Activity, Radio, Shield } from 'lucide-react';
import Robot3DCanvas from '@/components/3d/Robot3D';

interface HeroVisualProps {
  mousePosition: { x: number; y: number };
  activeSection?: string;
}

const DIALOGUES = [
  "Hello! Welcome to Shorai 👋",
  "Ready to build real robots? 🤖",
  "Let's code our first AI model! 🧠",
  "Fly autonomous drones today! 🚀",
  "STEM learning is super fun! ✨",
];

const STEM_BADGES = [
  { label: 'AI Projects', icon: Cpu, color: '#6366F1', bg: 'rgba(99,102,241,0.15)', x: '-40%', y: '-26%' },
  { label: 'Robotics Lab', icon: Bot, color: '#FF6B00', bg: 'rgba(255,107,0,0.15)', x: '40%', y: '-20%' },
  { label: 'Python & ROS 2', icon: Code2, color: '#7928CA', bg: 'rgba(121,40,202,0.15)', x: '-42%', y: '28%' },
  { label: 'Drone Flight', icon: Rocket, color: '#0284C7', bg: 'rgba(2,132,199,0.15)', x: '38%', y: '30%' },
];

export default function HeroVisual({ activeSection = 'hero' }: HeroVisualProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

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
    const colors = ['#7928CA', '#6366F1', '#00D4FF', '#FF6B00', '#10B981'];
    const newSparks = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setSparks((prev) => [...prev.slice(-15), ...newSparks]);
    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);
  };

  return (
    <div
      className="relative w-full h-full min-h-[500px] sm:min-h-[580px] lg:min-h-[680px] flex items-center justify-center pointer-events-auto select-none overflow-visible"
      onClick={handleContainerClick}
    >
      {/* ── MOTION GRAPHIC: Rotating Concentric Holographic HUD Rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {/* Outer dashed orbital ring */}
        <motion.div
          className="w-[480px] sm:w-[560px] h-[480px] sm:h-[560px] rounded-full border border-primary/20 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        {/* Middle reverse rotating tech ring with tick markers */}
        <motion.div
          className="absolute w-[380px] sm:w-[440px] h-[380px] sm:h-[440px] rounded-full border border-secondary/25 border-dotted"
          animate={{ rotate: -360, scale: [1, 1.04, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner pulsing energetic glow sphere */}
        <motion.div
          className="absolute w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] rounded-full bg-gradient-to-tr from-primary/10 via-secondary/15 to-transparent blur-[50px]"
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── SPEECH BUBBLE (Interactive Friendly Robot Greeting) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogueIndex}
          initial={{ opacity: 0, y: 12, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.92 }}
          transition={{ type: 'spring', damping: 18, stiffness: 260 }}
          className="absolute -top-7 sm:-top-5 z-30 px-5 py-2.5 rounded-2xl bg-card/95 border border-primary/30 shadow-[0_12px_30px_rgba(99,102,241,0.25)] backdrop-blur-2xl flex items-center gap-2.5 pointer-events-none whitespace-nowrap"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight">
            {DIALOGUES[dialogueIndex]}
          </span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-b border-r border-primary/30 rotate-45" />
        </motion.div>
      </AnimatePresence>

      {/* ── MOTION GRAPHIC: Click Sparks / Particle Bursts ── */}
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 2.2, 
            y: -80, 
            x: (Math.random() - 0.5) * 80 
          }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute z-40 pointer-events-none flex items-center justify-center"
          style={{ left: s.x, top: s.y, color: s.color }}
        >
          <Sparkles className="w-5 h-5 fill-current" />
        </motion.div>
      ))}

      {/* ── 3D ROBOT CANVAS ── */}
      <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center">
        <Robot3DCanvas activeSection={activeSection} />
      </div>

      {/* ── FLOATING ANIMATED STEM BADGES WITH HOVER MOTION ── */}
      {STEM_BADGES.map((badge, idx) => {
        const BadgeIcon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            className="absolute z-25 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/90 border border-border shadow-lg backdrop-blur-md pointer-events-none whitespace-nowrap"
            style={{
              top: `calc(50% + ${badge.y})`,
              left: `calc(50% + ${badge.x})`,
            }}
            animate={{
              y: [0, idx % 2 === 0 ? -9 : 9, 0],
              rotate: [0, idx % 2 === 0 ? 2 : -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5 + idx * 0.4,
              ease: 'easeInOut',
            }}
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ background: badge.bg, color: badge.color }}
            >
              <BadgeIcon className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-bold tracking-wide text-foreground">
              {badge.label}
            </span>
          </motion.div>
        );
      })}

      {/* ── MOTION GRAPHIC HUD: Live Telemetry & Digital Equalizer ── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        aria-hidden="true"
      >
        {/* Top-right: AI ROBOT ONLINE status */}
        <div className="absolute top-[2%] right-[2%] flex items-center gap-2 px-3.5 py-1 rounded-full bg-card/90 border border-border shadow-md backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-foreground/85 tracking-wider">
            AI ROBOT ONLINE // 3D CORE
          </span>
        </div>

        {/* Bottom-left: Digital Soundwave Equalizer */}
        <div className="absolute bottom-[3%] left-[2%] hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-card/85 border border-border shadow-sm backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-primary" />
          <div className="flex items-end gap-1 h-3.5">
            {[40, 90, 60, 100, 75, 45, 85].map((h, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-primary to-secondary"
                animate={{ height: [`${h}%`, `${100 - h}%`, `${h}%`] }}
                transition={{ duration: 0.8 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-muted-foreground font-bold ml-1">
            SYNAPSE: 99.8%
          </span>
        </div>

        {/* Bottom-right: Interactive Click Hint */}
        <div className="absolute bottom-[3%] right-[2%] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] font-mono font-bold shadow-sm backdrop-blur-md">
          <Zap className="w-3 h-3 text-amber-400 animate-bounce" />
          <span>CLICK TO ENGAGE</span>
        </div>
      </motion.div>
    </div>
  );
}
