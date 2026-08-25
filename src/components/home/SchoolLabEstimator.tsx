'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Sparkles, 
  Users, 
  Bot, 
  Cpu, 
  Plane, 
  Code, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  GraduationCap
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

interface LabModule {
  id: string;
  name: string;
  desc: string;
  icon: any;
  kitsIncluded: number;
}

const LAB_MODULES: LabModule[] = [
  { id: 'robotics', name: 'Robotics & Microcontrollers', desc: 'Arduino, ESP32, Sensor Kits & Robotic Arms', icon: Bot, kitsIncluded: 15 },
  { id: 'ai', name: 'AI & Computer Vision', desc: 'Neural Networks, OpenCV, Vision Sensors & Edge AI', icon: Cpu, kitsIncluded: 12 },
  { id: 'drone', name: 'Autonomous Drones', desc: 'Flight Telemetry, Aerodynamics & Indoor Drones', icon: Plane, kitsIncluded: 8 },
  { id: 'coding', name: 'Coding & Algorithm Lab', desc: 'Blockly to Python, Web & App Development', icon: Code, kitsIncluded: 20 },
  { id: '3d', name: '3D Printing & Prototyping', desc: 'CAD Modeling, 3D Printers & Rapid Prototyping', icon: Printer, kitsIncluded: 6 },
];

export default function SchoolLabEstimator() {
  const [studentStrength, setStudentStrength] = useState<number>(800);
  const [selectedGrades, setSelectedGrades] = useState<'primary' | 'middle' | 'senior' | 'all'>('all');
  const [selectedModules, setSelectedModules] = useState<string[]>(['robotics', 'ai', 'drone', 'coding']);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      if (selectedModules.length > 1) {
        setSelectedModules(selectedModules.filter(m => m !== id));
      }
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  // Dynamic Calculated Metrics
  const trainersNeeded = studentStrength > 1200 ? 2 : 1;
  const totalKits = selectedModules.reduce((sum, modId) => {
    const mod = LAB_MODULES.find(m => m.id === modId);
    return sum + (mod ? mod.kitsIncluded : 0);
  }, 0) * (studentStrength > 1000 ? 2 : 1);
  
  const annualLabHours = studentStrength * 36; // 36 weeks of hands-on lab sessions

  return (
    <section id="lab-estimator" className="relative py-24 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Calculator className="w-3.5 h-3.5" />
              <span className="shorai-eyebrow text-primary">INTERACTIVE SCHOOL LAB ESTIMATOR</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="shorai-heading mb-4">
              Configure Your School&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">Innovation Lab</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="shorai-body max-w-2xl mx-auto">
              Select your student strength and desired STEM disciplines to view recommended hardware kits, on-campus trainer allocation, and curriculum scope.
            </p>
          </SectionReveal>
        </div>

        {/* ── Main Interactive Configurator (2-Column Grid) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            
            {/* Control 1: Student Strength Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>1. Student Strength on Campus</span>
                </label>
                <span className="text-base sm:text-lg font-black text-primary font-mono bg-primary/10 px-3 py-1 rounded-xl border border-primary/20">
                  {studentStrength} Students
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={3000}
                step={50}
                value={studentStrength}
                onChange={(e) => setStudentStrength(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-2">
                <span>200 Students</span>
                <span>1,500 Students</span>
                <span>3,000+ Students</span>
              </div>
            </div>

            {/* Control 2: Target Grade Focus */}
            <div>
              <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-secondary" />
                <span>2. Grade Level Scope</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'primary', label: 'Primary (Grades 1–5)' },
                  { id: 'middle', label: 'Middle (Grades 6–8)' },
                  { id: 'senior', label: 'Senior (Grades 9–12)' },
                  { id: 'all', label: 'Full K–12 (Grades 1–12)' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrades(g.id as any)}
                    className={`p-3 rounded-2xl text-xs font-bold transition-all text-center border ${
                      selectedGrades === g.id
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-muted/40 hover:bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Desired Tech Modules */}
            <div>
              <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00D4FF]" />
                <span>3. Select Lab Disciplines ({selectedModules.length} Selected)</span>
              </label>
              <div className="space-y-2.5">
                {LAB_MODULES.map((mod) => {
                  const isSelected = selectedModules.includes(mod.id);
                  const Icon = mod.icon;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border text-left ${
                        isSelected 
                          ? 'bg-primary/10 border-primary/40 shadow-sm' 
                          : 'bg-muted/30 hover:bg-muted/60 border-border opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-foreground">{mod.name}</div>
                          <div className="text-[11px] text-muted-foreground">{mod.desc}</div>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${isSelected ? 'bg-primary border-primary text-white' : 'border-border text-transparent'}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Live Calculated Blueprint & Action (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-card via-card to-primary/[0.04] border-2 border-primary/30 p-6 sm:p-8 rounded-3xl shadow-xl sticky top-24">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
              <div>
                <span className="shorai-eyebrow text-primary block">RECOMMENDED BLUEPRINT</span>
                <h3 className="shorai-subheading text-xl">Institutional Summary</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NEP 2020 READY</span>
              </div>
            </div>

            {/* 4 Metric Output Boxes */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              
              <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                <div className="text-2xl sm:text-3xl font-black text-foreground font-mono mb-0.5">
                  {trainersNeeded}
                </div>
                <div className="text-[11px] font-bold text-muted-foreground">Full-Time Master Trainers</div>
                <div className="text-[10px] text-primary font-mono mt-1">Dedicated On-Campus</div>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                <div className="text-2xl sm:text-3xl font-black text-foreground font-mono mb-0.5">
                  {totalKits}+
                </div>
                <div className="text-[11px] font-bold text-muted-foreground">Modular Hardware Kits</div>
                <div className="text-[10px] text-emerald-500 font-mono mt-1">Plug &amp; Play Workbenches</div>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                <div className="text-2xl sm:text-3xl font-black text-foreground font-mono mb-0.5">
                  {(annualLabHours / 1000).toFixed(1)}k
                </div>
                <div className="text-[11px] font-bold text-muted-foreground">Student Lab Hours / Yr</div>
                <div className="text-[10px] text-secondary font-mono mt-1">Hands-On Practice</div>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                <div className="text-2xl sm:text-3xl font-black text-foreground font-mono mb-0.5">
                  100%
                </div>
                <div className="text-[11px] font-bold text-muted-foreground">Curriculum Alignment</div>
                <div className="text-[10px] text-[#00D4FF] font-mono mt-1">CBSE, ICSE &amp; NEP</div>
              </div>

            </div>

            {/* Included Services Checklist */}
            <div className="space-y-2 mb-6 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Turnkey Lab Interior &amp; Workstation Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Annual Faculty Training &amp; Master Certification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Inter-School Robotics Competition Prep &amp; Mentorship</span>
              </div>
            </div>

            {/* CTA Button */}
            <MagneticWrapper>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Custom Institutional Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticWrapper>

            <p className="text-[10px] text-center text-muted-foreground mt-3 font-mono">
              ⚡ Lab packages are customized to your campus budget and school size.
            </p>

          </div>

        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
