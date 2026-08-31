'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Volume2, VolumeX, X, ChevronRight } from 'lucide-react';

interface SectionGuideContent {
  id: string;
  title: string;
  badge: string;
  speech: string;
  tips: string[];
}

const SECTION_GUIDES: Record<string, SectionGuideContent> = {
  hero: {
    id: 'hero',
    title: 'WELCOME',
    badge: 'SYSTEM HUB',
    speech: "Hello. I'm Shorai-1 — your AI guide. We equip schools with Robotics, AI, Drone, and Coding education for the K-12 generation.",
    tips: ['Interactive 3D Robotics Labs', 'AI & Drone Flight Simulation', 'Complete STEM Transformation'],
  },
  robotics: {
    id: 'robotics',
    title: 'ROBOTICS',
    badge: 'HARDWARE MODULE',
    speech: "Students construct real-world robots, assemble microcontrollers, wire sensors, and write logic to solve real engineering problems.",
    tips: ['Arduino & Raspberry Pi Kits', 'Bipedal & Rover Mechanics', 'Industrial Automation Arms'],
  },
  ai: {
    id: 'ai',
    title: 'ARTIFICIAL INTELLIGENCE',
    badge: 'NEURAL MODULE',
    speech: "AI is math and algorithms. We teach Computer Vision, Machine Learning, and Neural Networks with live 3D simulations.",
    tips: ['Computer Vision Gesture Tracking', 'Real-Time Neural Net Training', 'Voice & NLP Systems'],
  },
  drones: {
    id: 'drones',
    title: 'DRONE TECHNOLOGY',
    badge: 'AERIAL MODULE',
    speech: "Students learn aerodynamics, telemetry, autonomous GPS navigation, and obstacle detection sensor systems.",
    tips: ['3D Telemetry & HUD Controls', 'Autonomous Waypoint Nav', 'LiDAR & Aerial Mapping'],
  },
  coding: {
    id: 'coding',
    title: 'CODING',
    badge: 'SOFTWARE MODULE',
    speech: "From visual block programming to Python and JavaScript — students build apps, games, and hardware control systems.",
    tips: ['Blockly → Python Progression', 'Visual Code Execution', 'Algorithm Design Challenges'],
  },
  transformation: {
    id: 'transformation',
    title: 'SCHOOL TRANSFORMATION',
    badge: 'DEPLOYMENT',
    speech: "5 streamlined stages: Assess, Design, Build, Enable, Transform. We've empowered 100+ schools to become future-ready.",
    tips: ['Custom Robotics Lab Setup', 'Teacher Training Program', 'Global Competition Prep'],
  },
};

const SECTION_TABS = [
  { key: 'hero', label: 'HUB' },
  { key: 'robotics', label: 'BOT' },
  { key: 'ai', label: 'AI' },
  { key: 'drones', label: 'FLY' },
  { key: 'coding', label: 'CODE' },
];

export default function RobotGuideUI() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isExpanded, setIsExpanded] = useState<boolean>(false); // start collapsed
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Auto-detect scroll section with RAF batching
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.scrollY + window.innerHeight / 3;
          const sectionMap: { id: string; key: string }[] = [
            { id: 'coding', key: 'coding' },
            { id: 'drones', key: 'drones' },
            { id: 'ai', key: 'ai' },
            { id: 'programs', key: 'transformation' },
            { id: 'robotics', key: 'robotics' },
            { id: 'innovation-labs', key: 'robotics' },
          ];
          let found = 'hero';
          for (const s of sectionMap) {
            const el = document.getElementById(s.id);
            if (el && scrollPos >= el.offsetTop) {
              found = s.key;
              break;
            }
          }
          setActiveSection(found);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const guide = SECTION_GUIDES[activeSection] ?? SECTION_GUIDES.hero;

  const speak = (text: string) => {
    if (!soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1.1;
    window.speechSynthesis.speak(u);
  };

  const toggleSound = () => {
    if (soundEnabled) {
      window.speechSynthesis?.cancel();
      setSoundEnabled(false);
    } else {
      setSoundEnabled(true);
      speak(guide.speech);
    }
  };

  const handleTab = (key: string) => {
    setActiveSection(key);
    speak(SECTION_GUIDES[key]?.speech ?? '');
  };

  return (
    <div 
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto max-w-[calc(100vw-1.5rem)]"
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
        right: 'max(1.25rem, env(safe-area-inset-right, 1.25rem))',
      }}
    >

      {/* ── Expanded HUD Panel ─────────────────────────────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="guide-panel"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-2.5 w-72 sm:w-80 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(6, 10, 20, 0.92)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px rgba(0,212,255,0.12), 0 20px 40px rgba(0,0,0,0.6)',
            }}
          >
            {/* Top accent bar */}
            <div className="h-[2px] bg-gradient-to-r from-[#00d4ff] via-[#FF6B00] to-[#7B2DFF]" />

            <div className="p-4">
              {/* Header row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-[#00d4ff]/10 border border-[#00d4ff]/30">
                    <Bot className="w-3 h-3 text-[#00d4ff]" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#00d4ff]/70 uppercase">
                      {guide.badge}
                    </div>
                    <div className="text-[10px] font-bold tracking-wider text-white/90 uppercase leading-tight">
                      {guide.title}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/30 hover:text-white/70 transition-colors p-1 rounded hover:bg-white/5"
                  aria-label="Close guide"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Speech text */}
              <div
                className="mb-3 rounded-lg p-3 text-[12px] text-white/75 leading-relaxed"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={guide.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {guide.speech}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Tips */}
              <div className="space-y-1.5 mb-3">
                <div className="text-[9px] font-mono tracking-[0.2em] text-white/35 uppercase">
                  FOCUS AREAS
                </div>
                {guide.tips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-white/60">
                    <ChevronRight className="w-2.5 h-2.5 text-[#00d4ff]/50 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              {/* Section tabs */}
              <div
                className="grid grid-cols-5 gap-1 pt-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                {SECTION_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => handleTab(tab.key)}
                    className={`py-1.5 rounded text-[9px] font-mono font-bold tracking-wider transition-all ${
                      activeSection === tab.key
                        ? 'bg-[#00d4ff] text-black shadow-[0_0_8px_rgba(0,212,255,0.4)]'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger bar ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Sound toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSound}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
            soundEnabled
              ? 'bg-[#FF6B00]/15 border-[#FF6B00]/40 text-[#FF6B00] shadow-[0_0_14px_rgba(255,107,0,0.25)]'
              : 'bg-black/50 border-white/10 text-white/30 hover:text-white/60'
          }`}
          title={soundEnabled ? 'Mute' : 'Enable voice'}
        >
          {soundEnabled
            ? <Volume2 className="w-3.5 h-3.5" />
            : <VolumeX className="w-3.5 h-3.5" />
          }
        </motion.button>

        {/* Main trigger button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setIsExpanded((v) => !v);
            if (!isExpanded) speak(guide.speech);
          }}
          className="flex items-center gap-2.5 pl-2.5 pr-3.5 h-10 rounded-full transition-all"
          style={{
            background: 'rgba(6, 10, 20, 0.90)',
            border: `1px solid ${isExpanded ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.25)'}`,
            backdropFilter: 'blur(16px)',
            boxShadow: isExpanded
              ? '0 0 20px rgba(0,212,255,0.25)'
              : '0 0 12px rgba(0,0,0,0.4)',
          }}
        >
          {/* Bot avatar icon */}
          <div className="w-6 h-6 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center flex-shrink-0">
            <Bot className="w-3.5 h-3.5 text-[#00d4ff]" />
          </div>

          <div className="flex flex-col items-start leading-none">
            <span className="text-[11px] font-bold text-white tracking-wide">
              SHORAI-1
            </span>
            <span className="text-[9px] font-mono text-[#00d4ff]/70 mt-0.5">
              {isExpanded ? 'CLOSE PANEL' : 'AI GUIDE ▸'}
            </span>
          </div>

          {/* Live indicator */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse ml-0.5" />
        </motion.button>
      </div>
    </div>
  );
}
