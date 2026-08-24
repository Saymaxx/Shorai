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
  const [aiConfidence, setAiConfidence] = useState('99.4%');

  // 3. CODING DEMO STATE
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'blocks'>('python');
  const [activeCodeBlock, setActiveCodeBlock] = useState('bot.arm_motors(power=100)');
  const [codeOutput, setCodeOutput] = useState('System ready. Initializing microcontrollers...');
  const [isCodeRunning, setIsCodeRunning] = useState(false);

  // 4. MARS ROVER DEMO STATE
  const [roverMode, setRoverMode] = useState<'idle' | 'drive' | 'scan' | 'sample'>('drive');
  const [roverSpeed, setRoverSpeed] = useState('0.8 m/s');
  const [obstacleDistance, setObstacleDistance] = useState('1.8 m');
  const [armStatus, setArmStatus] = useState<'idle' | 'scanning' | 'sampling'>('scanning');

  const runCodeSimulation = () => {
    setIsCodeRunning(true);
    setCodeOutput('Compiling syntax and transmitting to embedded hardware...');
    setTimeout(() => {
      setCodeOutput('Execution SUCCESS: Motors armed at 100% duty cycle. Telemetry stream active.');
      setIsCodeRunning(false);
    }, 1200);
  };

  return (
    <section id="at-shorai-we-build" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-10 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00D4FF]/[0.02] rounded-full blur-[180px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-black text-primary uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {cms.badge}
            </div>
          </SectionReveal>

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
              <div className="p-4 sm:p-5 border-b border-border bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/15 text-sky-500 flex items-center justify-center font-bold shadow-sm">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-sky-500 uppercase tracking-widest">3D AVIONICS MODEL</div>
                    <h3 className="text-base sm:text-lg font-black text-foreground">Autonomous Drone Simulator</h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsDroneFlying(!isDroneFlying)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    isDroneFlying 
                      ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' 
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isDroneFlying ? 'bg-emerald-500 animate-ping' : 'bg-muted-foreground'}`} />
                  <span>{isDroneFlying ? 'AIRBORNE' : 'STANDBY'}</span>
                </button>
              </div>

              {/* 3D Model Viewport (Interactive Three.js Canvas) */}
              <div className="relative h-[240px] sm:h-[270px] bg-slate-950/95 border-b border-border overflow-hidden">
                <Suspense fallback={<CanvasLoadingSpinner />}>
                  <Drone3D 
                    flightMode={droneMode} 
                    propSpeed={isDroneFlying ? 1.5 : 0} 
                    laserActive={droneMode === 'scan'}
                  />
                </Suspense>

                {/* 3D Canvas Overlay HUD */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-sky-500/30 text-[10px] font-mono text-sky-400 pointer-events-none flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>DRAG TO ROTATE 3D MODEL</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-2 text-[10px] font-mono text-slate-300 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-700 flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-emerald-400" /> 5.8 GHz
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-700 flex items-center gap-1">
                    <Battery className="w-3 h-3 text-emerald-400" /> 94%
                  </span>
                </div>
              </div>

              {/* Interactive Flight Controls Body */}
              <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                
                {/* Flight Mode Selector Buttons */}
                <div>
                  <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase mb-2">Switch 3D Flight Pattern:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'hover', label: 'Stable Hover' },
                      { id: 'orbit', label: '360° Orbit' },
                      { id: 'scan', label: 'LiDAR Scan' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setDroneMode(m.id as any)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold font-mono transition-all border ${
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

                {/* Telemetry Strip */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 px-3 bg-muted/40 rounded-xl border border-border">
                  <div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase">ALTITUDE</div>
                    <div className="text-xs font-black text-sky-500 font-mono">14.8 m</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase">VELOCITY</div>
                    <div className="text-xs font-black text-emerald-500 font-mono">3.4 m/s</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase">PATTERN</div>
                    <div className="text-xs font-black text-foreground font-mono uppercase">{droneMode}</div>
                  </div>
                </div>

              </div>

              {/* Bottom Tag */}
              <div className="p-3 px-5 border-t border-border bg-muted/20 text-xs font-medium text-muted-foreground flex items-center justify-between">
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
              <div className="p-4 sm:p-5 border-b border-border bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold shadow-sm">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-purple-500 uppercase tracking-widest">3D NEURAL CORE MODEL</div>
                    <h3 className="text-base sm:text-lg font-black text-foreground">AI Neural Network Inspector</h3>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-purple-500/15 text-purple-500 border border-purple-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>SYNAPSE ACTIVE</span>
                </div>
              </div>

              {/* 3D Model Viewport (Interactive Three.js Canvas) */}
              <div className="relative h-[240px] sm:h-[270px] bg-slate-950/95 border-b border-border overflow-hidden">
                <Suspense fallback={<CanvasLoadingSpinner />}>
                  <AIBrain3D mode={aiTask} speed={1.2} />
                </Suspense>

                {/* 3D Canvas Overlay HUD */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-purple-500/30 text-[10px] font-mono text-purple-400 pointer-events-none flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>INTERACTIVE 3D NEURAL SPHERE</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 border border-slate-700 text-[10px] font-mono text-purple-300 pointer-events-none">
                  1.2 ms Edge Latency
                </div>
              </div>

              {/* Interactive AI Controls Body */}
              <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                
                {/* AI Model Task Switcher */}
                <div>
                  <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase mb-2">Switch 3D Neural Architecture:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'vision', label: 'Vision CNN', conf: '99.4%' },
                      { id: 'nlp', label: 'NLP Speech', conf: '98.1%' },
                      { id: 'neural', label: 'Deep MLP', conf: '96.8%' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setAiTask(t.id as any);
                          setAiConfidence(t.conf);
                        }}
                        className={`py-2 px-2 rounded-xl text-xs font-bold font-mono transition-all border ${
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

                {/* Confidence Bar */}
                <div className="p-3 bg-muted/40 rounded-xl border border-border">
                  <div className="flex justify-between text-xs font-mono text-foreground mb-1">
                    <span>Classification Accuracy</span>
                    <span className="text-emerald-500 font-bold">{aiConfidence}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 rounded-full"
                      animate={{ width: aiConfidence }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

              </div>

              {/* Bottom Tag */}
              <div className="p-3 px-5 border-t border-border bg-muted/20 text-xs font-medium text-muted-foreground flex items-center justify-between">
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
              <div className="p-4 sm:p-5 border-b border-border bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold shadow-sm">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">3D LOGIC ENGINE MODEL</div>
                    <h3 className="text-base sm:text-lg font-black text-foreground">Robot Logic &amp; Code Compiler</h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-muted p-1 rounded-xl border border-border text-xs font-mono">
                  {(['python', 'javascript'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                        selectedLanguage === lang
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {lang === 'python' ? 'PY' : 'JS'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Model Viewport (Interactive Three.js Canvas) */}
              <div className="relative h-[240px] sm:h-[270px] bg-slate-950/95 border-b border-border overflow-hidden">
                <Suspense fallback={<CanvasLoadingSpinner />}>
                  <Coding3D 
                    isExecuting={isCodeRunning} 
                    language={selectedLanguage} 
                    activeCodeBlock={activeCodeBlock}
                  />
                </Suspense>

                {/* 3D Canvas Overlay HUD */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-400 pointer-events-none flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3D HOLOGRAPHIC LOGIC CUBE</span>
                </div>

                <button
                  onClick={runCodeSimulation}
                  disabled={isCodeRunning}
                  className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 text-[11px] font-bold font-mono flex items-center gap-1.5 hover:bg-emerald-400 transition-all shadow-lg disabled:opacity-50"
                >
                  <Play className="w-3 h-3" />
                  <span>{isCodeRunning ? 'Compiling 3D...' : 'Run 3D Code'}</span>
                </button>
              </div>

              {/* Interactive Coding Sandbox Body */}
              <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                
                {/* Logic Block Buttons */}
                <div>
                  <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase mb-2">Inject Embedded Logic:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { code: 'bot.arm_motors(power=100)', label: 'Arm Motors' },
                      { code: 'bot.evade_obstacle(dist=2.0)', label: 'Evade Obstacle' },
                      { code: 'bot.track_target(camera=1)', label: 'Vision Track' },
                      { code: 'bot.transmit_telemetry()', label: 'Send Telemetry' },
                    ].map((b) => (
                      <button
                        key={b.label}
                        onClick={() => {
                          setActiveCodeBlock(b.code);
                          setCodeOutput(`Injected: ${b.code}\nClick 'Run 3D Code' to trigger Hologram.`);
                        }}
                        className={`p-2 rounded-xl text-xs font-mono font-bold text-left transition-all border truncate ${
                          activeCodeBlock === b.code
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-500 shadow-sm'
                            : 'bg-muted/50 text-muted-foreground hover:text-foreground border-border'
                        }`}
                      >
                        + {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output log */}
                <div className="p-2.5 px-3 bg-muted/40 rounded-xl border border-border text-[11px] font-mono text-muted-foreground flex items-center justify-between">
                  <span className="truncate">{codeOutput}</span>
                  <span className="text-emerald-500 font-bold ml-2 shrink-0">ONLINE</span>
                </div>

              </div>

              {/* Bottom Tag */}
              <div className="p-3 px-5 border-t border-border bg-muted/20 text-xs font-medium text-muted-foreground flex items-center justify-between">
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
              <div className="p-4 sm:p-5 border-b border-border bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">3D ROBOTICS &amp; SPACE MODEL</div>
                    <h3 className="text-base sm:text-lg font-black text-foreground">Mars Rover Explorer &amp; Radar</h3>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>ROCKER-BOGIE 6WD</span>
                </div>
              </div>

              {/* 3D Model Viewport (Interactive Three.js Canvas) */}
              <div className="relative h-[240px] sm:h-[270px] bg-slate-950/95 border-b border-border overflow-hidden">
                <Suspense fallback={<CanvasLoadingSpinner />}>
                  <MarsRover3D 
                    status={armStatus} 
                    speed={roverSpeed === '0.8 m/s' ? 1.5 : roverSpeed === '0.2 m/s' ? 0.6 : 0} 
                  />
                </Suspense>

                {/* 3D Canvas Overlay HUD */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-amber-500/30 text-[10px] font-mono text-amber-400 pointer-events-none flex items-center gap-1.5">
                  <Radar className="w-3.5 h-3.5 text-amber-400" />
                  <span>DRAG TO ROTATE 3D ROVER</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 border border-slate-700 text-[10px] font-mono text-amber-300 pointer-events-none">
                  Deep Space Telemetry
                </div>
              </div>

              {/* Interactive Rover Sandbox Body */}
              <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                
                {/* Rover Action Triggers */}
                <div>
                  <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase mb-2">Execute 3D Rover Maneuver:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Surface Drive', speed: '0.8 m/s', dist: '3.4 m', arm: 'idle' },
                      { label: 'Scan Terrain', speed: '0.2 m/s', dist: '1.2 m', arm: 'scanning' },
                      { label: 'Sample Rock', speed: '0.0 m/s', dist: '0.4 m', arm: 'sampling' },
                    ].map((act) => (
                      <button
                        key={act.label}
                        onClick={() => {
                          setRoverSpeed(act.speed);
                          setObstacleDistance(act.dist);
                          setArmStatus(act.arm as any);
                        }}
                        className={`py-2 px-2 rounded-xl text-xs font-bold font-mono transition-all border truncate ${
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

                {/* Telemetry Strip */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 px-3 bg-muted/40 rounded-xl border border-border">
                  <div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase">OBSTACLE</div>
                    <div className="text-xs font-black text-amber-500 font-mono">{obstacleDistance}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase">SPEED</div>
                    <div className="text-xs font-black text-emerald-500 font-mono">{roverSpeed}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase">ARM STATE</div>
                    <div className="text-xs font-black text-foreground font-mono uppercase">{armStatus}</div>
                  </div>
                </div>

              </div>

              {/* Bottom Tag */}
              <div className="p-3 px-5 border-t border-border bg-muted/20 text-xs font-medium text-muted-foreground flex items-center justify-between">
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
