'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Brain, 
  Code2, 
  Bot, 
  Play, 
  Sparkles, 
  Compass, 
  Wifi, 
  Battery, 
  Cpu, 
  Terminal, 
  Activity, 
  ArrowRight,
  Radar,
  Radio,
  Zap,
  RotateCw
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

// Real 3D Interactive Canvas Models
import Drone3D from '@/components/3d/Drone3D';
import AIBrain3D from '@/components/3d/AIBrain3D';
import Coding3D from '@/components/3d/Coding3D';
import MarsRover3D from '@/components/3d/MarsRover3D';

function CanvasLoadingSpinner() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <RotateCw className="w-5 h-5 animate-spin text-primary" />
      <span className="text-[10px] font-mono font-bold tracking-wider">INITIALIZING 3D ENGINE...</span>
    </div>
  );
}

export default function AtShoraiWeBuildSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { content } = useContent();
  const cms = content.whyShorai.atShoraiWeBuild;

  // 1. DRONE DEMO STATE
  const [droneMode, setDroneMode] = useState<'hover' | 'orbit' | 'scan'>('hover');
  const [isDroneFlying, setIsDroneFlying] = useState(true);

  // 2. AI DEMO STATE
  const [aiTask, setAiTask] = useState<'neural' | 'vision' | 'nlp'>('vision');

  // 3. CODING DEMO STATE
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'blocks'>('python');
  const [isCodeRunning, setIsCodeRunning] = useState(false);

  // 4. MARS ROVER DEMO STATE
  const [roverSpeed, setRoverSpeed] = useState('0.8 m/s');
  const [armStatus, setArmStatus] = useState<'idle' | 'scanning' | 'sampling'>('scanning');

  return (
    <section id="at-shorai-we-build" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-transparent overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-10 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00D4FF]/[0.02] rounded-full blur-[180px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          
          <SectionReveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 leading-tight">
              {cms.title}
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium max-w-2xl">
              {cms.subtitle}
            </p>
          </SectionReveal>

        </div>

        {/* ── 4 INTERACTIVE 3D DEMO CARDS (2x2 GRID) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">

          {/* ═══════════════════════════════════════════════════════════════
              DEMO 1: 3D AUTONOMOUS DRONE SIMULATOR
             ═══════════════════════════════════════════════════════════════ */}
          <SectionReveal delay={0.05}>
            <div className="rounded-3xl bg-card border-2 border-border hover:border-sky-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between h-full group">
              
              {/* Card Header */}
              <div className="p-4 sm:p-6 border-b border-border bg-muted/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-500 flex items-center justify-center font-bold shadow-sm flex-shrink-0">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-sky-500 uppercase tracking-widest">3D AVIONICS MODEL</div>
                    <h3 className="text-lg sm:text-xl font-black text-foreground">Autonomous Drone Simulator</h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsDroneFlying(!isDroneFlying)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                    isDroneFlying 
                      ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' 
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${isDroneFlying ? 'bg-emerald-500 animate-ping' : 'bg-muted-foreground'}`} />
                  <span>{isDroneFlying ? 'AIRBORNE' : 'STANDBY'}</span>
                </button>
              </div>

              {/* 3D Model Viewport (Interactive Three.js Canvas) */}
              <div className="relative h-[250px] sm:h-[290px] bg-slate-950/95 border-b border-border overflow-hidden">
                <Suspense fallback={<CanvasLoadingSpinner />}>
                  <Drone3D 
                    flightMode={droneMode} 
                    propSpeed={isDroneFlying ? 1.5 : 0} 
                    laserActive={droneMode === 'scan'}
                  />
                </Suspense>

                {/* 3D Canvas Overlay HUD */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-sky-500/30 text-xs font-mono text-sky-400 pointer-events-none flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>DRAG TO ROTATE 3D MODEL</span>
                </div>

                <div className="absolute top-3.5 right-3.5 flex items-center gap-2 text-xs font-mono text-slate-300 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 border border-slate-700 flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" /> 5.8 GHz
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 border border-slate-700 flex items-center gap-1.5">
                    <Battery className="w-3.5 h-3.5 text-emerald-400" /> 94%
                  </span>
                </div>
              </div>

              {/* Interactive Flight Controls Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                {/* 3D Model Overview Description */}
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed bg-muted/40 p-4 rounded-2xl border border-border/80">
                  <strong className="font-bold text-foreground">What Students Learn: </strong>
                  Build, calibrate, and program quadcopter UAVs with LiDAR sensors and telemetry algorithms for autonomous waypoint navigation, aerodynamics, and aerial flight testing.
                </div>

                {/* Flight Mode Selector Buttons */}
                <div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-muted-foreground uppercase mb-2.5">Switch 3D Flight Pattern:</div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'hover', label: 'Stable Hover' },
                      { id: 'orbit', label: '360° Orbit' },
                      { id: 'scan', label: 'LiDAR Scan' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setDroneMode(m.id as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all border ${
                          droneMode === m.id
                            ? 'bg-sky-500 text-white border-sky-500 shadow-md scale-105'
                            : 'bg-muted/50 text-muted-foreground hover:text-foreground border-border'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Tag */}
              <div className="p-3.5 px-6 border-t border-border bg-muted/20 text-xs sm:text-sm font-medium text-muted-foreground flex items-center justify-between">
                <span>Autonomous Flight &amp; Telemetry</span>
                <span className="text-primary font-bold">K-12 Aviation</span>
              </div>

            </div>
          </SectionReveal>


          {/* ═══════════════════════════════════════════════════════════════
              DEMO 2: 3D AI NEURAL & VISION BRAIN
             ═══════════════════════════════════════════════════════════════ */}
          <SectionReveal delay={0.1}>
            <div className="rounded-3xl bg-card border-2 border-border hover:border-purple-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between h-full group">
              
              {/* Card Header */}
              <div className="p-4 sm:p-6 border-b border-border bg-muted/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold shadow-sm flex-shrink-0">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-purple-500 uppercase tracking-widest">3D NEURAL CORE MODEL</div>
                    <h3 className="text-lg sm:text-xl font-black text-foreground">AI Neural Network Inspector</h3>
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-purple-500/15 text-purple-500 border border-purple-500/30 text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 flex-shrink-0">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>SYNAPSE ACTIVE</span>
                </div>
              </div>

              {/* 3D Model Viewport (Interactive Three.js Canvas) */}
              <div className="relative h-[250px] sm:h-[290px] bg-slate-950/95 border-b border-border overflow-hidden">
                <Suspense fallback={<CanvasLoadingSpinner />}>
                  <AIBrain3D mode={aiTask} speed={1.2} />
                </Suspense>

                {/* 3D Canvas Overlay HUD */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-purple-500/30 text-xs font-mono text-purple-400 pointer-events-none flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>INTERACTIVE 3D NEURAL SPHERE</span>
                </div>

                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-black/70 border border-slate-700 text-xs font-mono text-purple-300 pointer-events-none">
                  1.2 ms Edge Latency
                </div>
              </div>

              {/* Interactive AI Controls Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                {/* 3D Model Overview Description */}
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed bg-muted/40 p-4 rounded-2xl border border-border/80">
                  <strong className="font-bold text-foreground">What Students Learn: </strong>
                  Explore neural network architectures, train Computer Vision models for real-time edge object detection, and deploy deep learning natural language classifiers.
                </div>

                {/* AI Model Task Switcher */}
                <div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-muted-foreground uppercase mb-2.5">Switch 3D Neural Architecture:</div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'vision', label: 'Vision CNN' },
                      { id: 'nlp', label: 'NLP Speech' },
                      { id: 'neural', label: 'Deep MLP' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setAiTask(t.id as any);
                        }}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all border ${
                          aiTask === t.id
                            ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-105'
                            : 'bg-muted/50 text-muted-foreground hover:text-foreground border-border'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Tag */}
              <div className="p-3.5 px-6 border-t border-border bg-muted/20 text-xs sm:text-sm font-medium text-muted-foreground flex items-center justify-between">
                <span>Computer Vision &amp; Generative AI</span>
                <span className="text-primary font-bold">Grade 6-12</span>
              </div>

            </div>
          </SectionReveal>


          {/* ═══════════════════════════════════════════════════════════════
              DEMO 3: 3D HOLOGRAPHIC CODE CUBE & LOGIC COMPILER
             ═══════════════════════════════════════════════════════════════ */}
          <SectionReveal delay={0.15}>
            <div className="rounded-3xl bg-card border-2 border-border hover:border-emerald-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between h-full group">
              
              {/* Card Header */}
              <div className="p-4 sm:p-6 border-b border-border bg-muted/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold shadow-sm flex-shrink-0">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest">3D LOGIC ENGINE MODEL</div>
                    <h3 className="text-lg sm:text-xl font-black text-foreground">Robot Logic &amp; Code Compiler</h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-muted p-1.5 rounded-xl border border-border text-xs sm:text-sm font-mono flex-shrink-0">
                  {(['python', 'javascript'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsCodeRunning(true);
                        setTimeout(() => setIsCodeRunning(false), 2400);
                      }}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        selectedLanguage === lang
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {lang === 'python' ? 'Python' : 'JS'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Model Viewport (Interactive Three.js Canvas) */}
              <div className="relative h-[250px] sm:h-[290px] bg-slate-950/95 border-b border-border overflow-hidden">
                <Suspense fallback={<CanvasLoadingSpinner />}>
                  <Coding3D 
                    isExecuting={isCodeRunning} 
                    language={selectedLanguage} 
                  />
                </Suspense>

                {/* 3D Canvas Overlay HUD */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-emerald-500/30 text-xs font-mono text-emerald-400 pointer-events-none flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>3D HOLOGRAPHIC LOGIC CUBE</span>
                </div>

                <button
                  onClick={() => {
                    setIsCodeRunning(true);
                    setTimeout(() => setIsCodeRunning(false), 3000);
                  }}
                  disabled={isCodeRunning}
                  className="absolute top-3.5 right-3.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs sm:text-sm font-bold font-mono flex items-center gap-1.5 hover:bg-emerald-400 transition-all shadow-lg disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isCodeRunning ? 'Compiling 3D...' : 'Run 3D Code'}</span>
                </button>
              </div>

              {/* Interactive Coding Sandbox Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                {/* 3D Model Overview Description */}
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed bg-muted/40 p-4 rounded-2xl border border-border/80">
                  <strong className="font-bold text-foreground">What Students Learn: </strong>
                  Transition from visual block coding to full-stack Python &amp; JavaScript, compiling live algorithms that control robotics microcontrollers and sensors in real time.
                </div>

                {/* 3D Active Execution Buttons */}
                <div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-muted-foreground uppercase mb-2.5">Trigger 3D Logic Simulation:</div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'arm', label: 'Arm Motors' },
                      { id: 'evade', label: 'Evade Obstacle' },
                      { id: 'orbit', label: 'Execute Loop' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          setIsCodeRunning(true);
                          setTimeout(() => setIsCodeRunning(false), 3000);
                        }}
                        className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all border text-center ${
                          isCodeRunning
                            ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md font-black scale-105'
                            : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted border-border'
                        }`}
                      >
                        ⚡ {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Tag */}
              <div className="p-3.5 px-6 border-t border-border bg-muted/20 text-xs sm:text-sm font-medium text-muted-foreground flex items-center justify-between">
                <span>Block to Python &amp; JS Real-time Compiler</span>
                <span className="text-primary font-bold">Grade 3-12</span>
              </div>

            </div>
          </SectionReveal>


          {/* ═══════════════════════════════════════════════════════════════
              DEMO 4: 3D MARS ROVER EXPLORER & SENSOR RADAR
             ═══════════════════════════════════════════════════════════════ */}
          <SectionReveal delay={0.2}>
            <div className="rounded-3xl bg-card border-2 border-border hover:border-amber-500/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between h-full group">
              
              {/* Card Header */}
              <div className="p-4 sm:p-6 border-b border-border bg-muted/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold shadow-sm flex-shrink-0">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">3D ROBOTICS &amp; SPACE MODEL</div>
                    <h3 className="text-lg sm:text-xl font-black text-foreground">Mars Rover Explorer &amp; Radar</h3>
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 text-xs sm:text-sm font-mono font-bold flex items-center gap-1.5 flex-shrink-0">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>ROCKER-BOGIE 6WD</span>
                </div>
              </div>

              {/* 3D Model Viewport (Interactive Three.js Canvas) */}
              <div className="relative h-[250px] sm:h-[290px] bg-slate-950/95 border-b border-border overflow-hidden">
                <Suspense fallback={<CanvasLoadingSpinner />}>
                  <MarsRover3D 
                    status={armStatus} 
                    speed={roverSpeed === '0.8 m/s' ? 1.5 : roverSpeed === '0.2 m/s' ? 0.6 : 0} 
                  />
                </Suspense>

                {/* 3D Canvas Overlay HUD */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-amber-500/30 text-xs font-mono text-amber-400 pointer-events-none flex items-center gap-2">
                  <Radar className="w-4 h-4 text-amber-400" />
                  <span>DRAG TO ROTATE 3D ROVER</span>
                </div>

                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-lg bg-black/70 border border-slate-700 text-xs font-mono text-amber-300 pointer-events-none">
                  Deep Space Telemetry
                </div>
              </div>

              {/* Interactive Rover Sandbox Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                {/* 3D Model Overview Description */}
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed bg-muted/40 p-4 rounded-2xl border border-border/80">
                  <strong className="font-bold text-foreground">What Students Learn: </strong>
                  Engineer 6-wheel-drive Rocker-Bogie chassis rovers equipped with ultrasonic radar distance calculation, robotic arm sampling, and planetary exploration logic.
                </div>

                {/* Rover Action Triggers */}
                <div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-muted-foreground uppercase mb-2.5">Execute 3D Rover Maneuver:</div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { label: 'Surface Drive', speed: '0.8 m/s', arm: 'idle' },
                      { label: 'Scan Terrain', speed: '0.2 m/s', arm: 'scanning' },
                      { label: 'Sample Rock', speed: '0.0 m/s', arm: 'sampling' },
                    ].map((act) => (
                      <button
                        key={act.label}
                        onClick={() => {
                          setRoverSpeed(act.speed);
                          setArmStatus(act.arm as any);
                        }}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all border truncate ${
                          armStatus === act.arm
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-black scale-105'
                            : 'bg-muted/50 text-muted-foreground hover:text-foreground border-border'
                        }`}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Tag */}
              <div className="p-3.5 px-6 border-t border-border bg-muted/20 text-xs sm:text-sm font-medium text-muted-foreground flex items-center justify-between">
                <span>Autonomous Planetary Navigation</span>
                <span className="text-primary font-bold">Robotics &amp; Space</span>
              </div>

            </div>
          </SectionReveal>

        </div>

        {/* ── BOTTOM CTA AUDIT STRIP ── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7928CA] to-[#6366F1] text-white flex items-center justify-center shadow-lg flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-foreground">
                Want to bring these 4 interactive 3D labs to your school?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Schedule an on-campus demonstration and experiential lab walkthrough for your teachers and students.
              </p>
            </div>
          </div>

          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap flex items-center gap-2"
            >
              <span>Schedule Live School Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
