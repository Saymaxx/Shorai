'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Volume2, VolumeX, Sparkles, ChevronRight, X, MessageSquare, Compass, Play } from 'lucide-react';
import Robot3DCanvas from './Robot3D';

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
    title: 'WELCOME TO SHORAI',
    badge: 'AI & ROBOTICS GUIDE',
    speech: "Hello! I'm Shorai-Bot, your interactive guide. We equip schools with cutting-edge 3D Robotics, AI, Drones, and Coding education for K-12 students!",
    tips: [
      'Interactive 3D Robotics Labs',
      'Hands-on AI & Drone Flight Simulator',
      'Complete School STEM Transformation'
    ]
  },
  robotics: {
    id: 'robotics',
    title: 'ROBOTICS EDUCATION',
    badge: 'HARDWARE & SENSORS',
    speech: "In our Robotics Labs, students construct real-world robots, assemble microcontrollers, wire sensors, and write logic to solve real problems!",
    tips: [
      'Arduino & Raspberry Pi Kits',
      'Bipedal & Rover Mechanics',
      'Industrial Pick & Place Arms'
    ]
  },
  ai: {
    id: 'ai',
    title: 'ARTIFICIAL INTELLIGENCE',
    badge: 'NEURAL NETWORKS & VISION',
    speech: "AI isn't magic—it's math and algorithms! We teach students Computer Vision, Machine Learning models, and Neural Networks with interactive 3D simulations.",
    tips: [
      'Computer Vision Gesture Tracking',
      'Train Neural Nets in Real-Time',
      'Voice Assistant & NLP Bots'
    ]
  },
  drones: {
    id: 'drones',
    title: 'DRONE TECHNOLOGY',
    badge: 'AERIAL ROBOTICS & HUD',
    speech: "Fly high with our Drone curriculum! Students learn flight aerodynamics, telemetry, autonomous GPS flight paths, and obstacle detection sensors.",
    tips: [
      '3D Flight Telemetry & HUD Controls',
      'Autonomous Waypoint Navigation',
      'LiDAR & Aerial Sensor Mapping'
    ]
  },
  coding: {
    id: 'coding',
    title: 'CODING & SOFTWARE',
    badge: 'LOGIC & FULL-STACK',
    speech: "Code is the universal language of innovation! From visual block programming to Python and JavaScript, students build apps, games, and hardware scripts.",
    tips: [
      'Blockly to Python Progression',
      'Interactive 3D Visual Code Execution',
      'Real-world Algorithm Challenges'
    ]
  },
  transformation: {
    id: 'transformation',
    title: 'SCHOOL TRANSFORMATION',
    badge: 'FUTURE-READY LABS',
    speech: "We assist schools through 5 streamlined stages: Assess, Design, Build, Enable, and Transform. Join 100+ schools empowering the next generation!",
    tips: [
      'Custom Robotics Lab Setup',
      'Comprehensive Teacher Training',
      'Global Competition Preparation'
    ]
  }
};

export default function RobotGuideUI() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);

  // Detect active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      const heroEl = document.getElementById('home');
      const roboticsEl = document.getElementById('robotics') || document.getElementById('innovation-labs');
      const aiEl = document.getElementById('ai') || document.getElementById('programs');
      const dronesEl = document.getElementById('drones') || document.getElementById('technology');
      const codingEl = document.getElementById('coding');

      if (codingEl && scrollPos >= codingEl.offsetTop) {
        setActiveSection('coding');
      } else if (dronesEl && scrollPos >= dronesEl.offsetTop) {
        setActiveSection('drones');
      } else if (aiEl && scrollPos >= aiEl.offsetTop) {
        setActiveSection('ai');
      } else if (roboticsEl && scrollPos >= roboticsEl.offsetTop) {
        setActiveSection('robotics');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const guide = SECTION_GUIDES[activeSection] || SECTION_GUIDES.hero;

  // Speak speech synthesis if sound enabled
  const speakDialogue = (text: string) => {
    if (!soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const toggleSound = () => {
    if (soundEnabled) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setSoundEnabled(false);
    } else {
      setSoundEnabled(true);
      speakDialogue(guide.speech);
    }
  };

  const handleNextSection = (secKey: string) => {
    setActiveSection(secKey);
    speakDialogue(SECTION_GUIDES[secKey]?.speech || '');
  };

  return (
    <>
      {/* FLOATING BOT WIDGET (Bottom Right on Desktop) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto max-w-[calc(100vw-2rem)]">
        
        {/* SPEECH BUBBLE MODAL */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#090D16]/95 border border-[#00BFFF]/30 backdrop-blur-xl p-5 shadow-[0_0_50px_rgba(0,191,255,0.25)] relative overflow-hidden"
            >
              {/* Futuristic Top Bar Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00BFFF] via-[#FF6B00] to-[#7B2DFF]" />

              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Close Guide"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  {guide.badge}
                </span>
                <span className="text-[10px] font-mono text-white/40">AI ASSISTANT</span>
              </div>

              {/* Speech Text */}
              <div className="relative mb-4 bg-black/40 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white/90 leading-relaxed">
                <p>{guide.speech}</p>
              </div>

              {/* Highlights / Tips Pills */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">KEY FOCUS AREAS:</div>
                {guide.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              {/* Section Quick Switcher Tabs */}
              <div className="grid grid-cols-5 gap-1 pt-2 border-t border-white/10 text-[10px] font-mono">
                {[
                  { key: 'hero', label: 'HUB' },
                  { key: 'robotics', label: 'ROBOT' },
                  { key: 'ai', label: 'AI' },
                  { key: 'drones', label: 'DRONE' },
                  { key: 'coding', label: 'CODE' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNextSection(item.key)}
                    className={`py-1.5 px-1 rounded text-center transition-all ${
                      activeSection === item.key
                        ? 'bg-[#00BFFF] text-black font-bold shadow-[0_0_10px_rgba(0,191,255,0.5)]'
                        : 'bg-white/5 text-white/60 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM TRIGGER BUTTON WITH MINI 3D CANVA EMBED */}
        <div className="flex items-center gap-3">
          {/* Voice Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className={`p-3 rounded-full border backdrop-blur-md transition-all shadow-lg ${
              soundEnabled
                ? 'bg-[#FF6B00]/20 border-[#FF6B00]/50 text-[#FF6B00] hover:bg-[#FF6B00]/40 shadow-[0_0_20px_rgba(255,107,0,0.3)]'
                : 'bg-black/60 border-white/10 text-white/40 hover:text-white'
            }`}
            title={soundEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Bot Avatar Button */}
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (!isExpanded) speakDialogue(guide.speech);
            }}
            className="group relative flex items-center gap-3 pl-3 pr-4 py-2 rounded-full bg-[#090D16] border border-[#00BFFF]/40 shadow-[0_0_30px_rgba(0,191,255,0.3)] hover:border-[#00BFFF] hover:scale-105 transition-all duration-300"
          >
            {/* 3D Mini Canvas Preview inside button */}
            <div className="w-10 h-10 rounded-full bg-black/60 border border-[#00BFFF]/50 overflow-hidden relative flex-shrink-0">
              <Robot3DCanvas activeSection={activeSection} />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                SHORAI BOT
                <span className="w-2 h-2 rounded-full bg-[#00BFFF] animate-ping" />
              </span>
              <span className="text-[10px] text-[#00BFFF] font-mono">
                {isExpanded ? 'Click to Minimize' : 'Click to Guide'}
              </span>
            </div>
          </button>
        </div>

      </div>
    </>
  );
}
