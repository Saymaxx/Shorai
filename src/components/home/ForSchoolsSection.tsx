'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Bot, 
  Cpu, 
  Plane, 
  Brain, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  GraduationCap,
  ChevronRight,
  Star,
  Activity
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SpiralFlipbook, { FlipbookPage } from '@/components/shared/SpiralFlipbook';

interface LabTier {
  id: string;
  name: string;
  badge: string;
  targetGrades: string;
  description: string;
  hardware: string;
  software: string;
  mentorship: string;
  nepCompliance: string;
  turnkeyTime: string;
  color: string;
  gradient: string;
  accentIcon: any;
  items: string[];
}

const LAB_TIERS: LabTier[] = [
  {
    id: 'foundation',
    name: 'Foundation STEM Lab',
    badge: 'GRADES 1 - 5',
    targetGrades: 'Primary School (Ages 6-10)',
    description: 'Nurtures foundational curiosity, algorithmic logic, block-based visual coding, and introductory mechanical builds with child-safe modular blocks.',
    hardware: '20+ Modular Logic & Sensor Kits',
    software: 'Visual Block Coding IDE & Gamified Challenges',
    mentorship: '2 Certified Primary STEM Mentors',
    nepCompliance: '100% Foundational Stage NEP',
    turnkeyTime: '14 Days On-Campus Setup',
    color: '#7928CA',
    gradient: 'from-[#7928CA] to-[#6366F1]',
    accentIcon: Bot,
    items: [
      'Visual Block-Coding with scratch-style animation',
      'Child-safe battery and gear mechanism kits',
      'Logic gate puzzles and spatial reasoning games',
      'Teacher handbook with 36 illustrated lesson plans'
    ]
  },
  {
    id: 'robotics-iot',
    name: 'Robotics & IoT Sandbox',
    badge: 'GRADES 6 - 8',
    targetGrades: 'Middle School (Ages 11-14)',
    description: 'Hands-on embedded hardware engineering. Students program real microcontrollers (Arduino/ESP32), wire sensors, solder circuits, and design 3D printable CAD models.',
    hardware: '30+ Microcontroller Stations & 3D Printer Hub',
    software: 'Embedded C++ IDE, Cloud IoT Dashboard & Tinkercad',
    mentorship: '3 Certified Hardware & Electronics Trainers',
    nepCompliance: '100% Middle Stage NEP Vocational',
    turnkeyTime: '21 Days On-Campus Setup',
    color: '#6366F1',
    gradient: 'from-[#6366F1] to-[#00D4FF]',
    accentIcon: Cpu,
    items: [
      'Arduino, ESP32 & Raspberry Pi microcontrollers',
      'Ultrasonic, IR, PIR, Temp and Soil sensor arrays',
      'Dual-extruder 3D printer for student inventions',
      'Live IoT smart cloud telemetry dashboards'
    ]
  },
  {
    id: 'ai-drone',
    name: 'AI, Drones & Advanced ROS',
    badge: 'GRADES 9 - 12',
    targetGrades: 'High School (Ages 15-18)',
    description: 'Industrial-grade deep tech. Students train Convolutional Neural Networks (CNNs), program autonomous quadcopters with PID loops, and run Python ROS 2 robotic nodes.',
    hardware: 'AI GPU Workstations, Drone Avionics & 6-Axis Arms',
    software: 'Python ML, OpenCV, ROS 2 & Flight Simulator',
    mentorship: 'Senior AI & Aerospace Master Mentors',
    nepCompliance: '100% Secondary Stage NEP Advanced',
    turnkeyTime: '25 Days On-Campus Setup',
    color: '#00D4FF',
    gradient: 'from-[#00D4FF] to-[#10B981]',
    accentIcon: Plane,
    items: [
      'Computer Vision camera tracking with OpenCV',
      'Autonomous Drone flight controllers with gyro telemetry',
      '6-Axis robotic arm kinematics and pick-and-place logic',
      'National Hackathon & Olympiad competition mentorship'
    ]
  },
  {
    id: 'full-campus',
    name: '360° Flagship Innovation Campus',
    badge: 'K-12 COMPLETE SETUP',
    targetGrades: 'Full Campus Ecosystem (Grades 1-12)',
    description: 'The ultimate institutional transformation. Comprehensive end-to-end multi-room innovation lab, full faculty certification, AI LMS campus-wide license, and annual expo management.',
    hardware: 'Complete Multi-Domain Labs + Drone Arena + 3D Hub',
    software: 'Full Enterprise AI LMS + All Compiler Suites',
    mentorship: 'Dedicated On-Campus Master STEM Director',
    nepCompliance: '100% Comprehensive K-12 NEP Model',
    turnkeyTime: '30 Days Turnkey Deployment',
    color: '#FF6B00',
    gradient: 'from-[#FF6B00] via-[#FF3D7F] to-[#7928CA]',
    accentIcon: Sparkles,
    items: [
      'All 3 lab tiers unified into a world-class STEM center',
      'Permanent on-campus Shorai Master Trainer',
      'Annual Shorai Innovation Day & Parent Expo management',
      'Guaranteed National Hackathon representation & media PR'
    ]
  }
];

export default function ForSchoolsSection() {
  const [activeTierIdx, setActiveTierIdx] = useState(3);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const activeTier = LAB_TIERS[activeTierIdx];
  const ActiveIcon = activeTier.accentIcon;

  // Build flipbook pages
  const flipbookPages: FlipbookPage[] = LAB_TIERS.map((tier, idx) => {
    const TierIcon = tier.accentIcon;
    return {
      id: tier.id,
      pageNumber: idx + 1,
      title: tier.name,
      badge: tier.badge,
      color: tier.color,
      content: (
        <div className="flex flex-col justify-between h-full py-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                style={{ background: tier.color }}
              >
                <TierIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-foreground">
                  {tier.name}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  {tier.targetGrades}
                </div>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-muted border border-border text-[10px] font-mono font-bold text-primary">
              {tier.turnkeyTime}
            </div>
          </div>

          {/* Technical Telemetry Stack */}
          <div className="space-y-2.5 mb-4 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
              <div className="text-[9px] text-muted-foreground uppercase mb-0.5">
                HARDWARE DELIVERABLES
              </div>
              <div className="text-xs font-bold text-foreground truncate">
                {tier.hardware}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
              <div className="text-[9px] text-muted-foreground uppercase mb-0.5">
                SOFTWARE &amp; LMS
              </div>
              <div className="text-xs font-bold text-foreground truncate">
                {tier.software}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
              <div className="text-[9px] text-muted-foreground uppercase mb-0.5">
                FACULTY MENTORSHIP
              </div>
              <div className="text-xs font-bold text-foreground truncate">
                {tier.mentorship}
              </div>
            </div>
          </div>

          {/* Bottom NEP Pill */}
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              {tier.nepCompliance}
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      ),
    };
  });

  return (
    <section id="schools" className="py-28 bg-background relative overflow-hidden border-t border-border transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[50vw] h-[50vw] max-w-[650px] bg-primary/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[650px] bg-secondary/[0.03] rounded-full blur-[150px]" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE FLIPBOOK &bull; 4 CAMPUS TIERS</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              MAKE YOUR SCHOOL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                FUTURE-READY.
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              Explore our turnkey lab configurations on the interactive spiral notebook. Select your grade levels to see instant deliverables, hardware specs, and rollout timelines.
            </p>
          </SectionReveal>
        </div>

        {/* ── 2-COLUMN LAYOUT: LEFT INFO + RIGHT SPIRAL FLIPBOOK ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* LEFT: 5 Cols Info & Tier Switcher */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold mb-4 border"
                style={{
                  background: `${activeTier.color}15`,
                  borderColor: `${activeTier.color}40`,
                  color: activeTier.color,
                }}
              >
                <ActiveIcon className="w-3.5 h-3.5" />
                <span>{activeTier.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-2 leading-tight">
                {activeTier.name}
              </h3>

              <div className="text-xs font-mono text-muted-foreground mb-4">
                Target: <span className="text-foreground font-bold">{activeTier.targetGrades}</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {activeTier.description}
              </p>

              {/* Checklist */}
              <div className="space-y-2.5 mb-6">
                {activeTier.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tier Quick Selector */}
              <div className="space-y-1.5 mb-8">
                <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  SELECT CAMPUS TIER
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {LAB_TIERS.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTierIdx(idx)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-between ${
                        activeTierIdx === idx
                          ? 'bg-card border-primary text-primary shadow-sm ring-1 ring-primary/20'
                          : 'bg-muted/40 hover:bg-muted border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="truncate">{t.name.split(' ')[0]}</span>
                      <span className="text-[10px] font-mono ml-1 opacity-70">P{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>

              <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Free On-Site Audit</span>
              </div>
            </div>
          </div>

          {/* RIGHT: 7 Cols Spiral Flipbook */}
          <div className="lg:col-span-7 flex justify-center">
            <SpiralFlipbook
              pages={flipbookPages}
              activePageIndex={activeTierIdx}
              onPageChange={(idx) => setActiveTierIdx(idx)}
            />
          </div>

        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
