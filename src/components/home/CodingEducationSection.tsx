'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, Play, RotateCcw, CheckCircle2, Sparkles, Cpu, Bot, Plane, Layers, LucideIcon } from 'lucide-react';
import Coding3D from '@/components/3d/Coding3D';
import SectionReveal from '@/components/animations/SectionReveal';

type CodeLanguage = 'blocks' | 'python' | 'javascript';

interface LogicBlock {
  id: string;
  name: string;
  category: 'robot' | 'ai' | 'drone';
  pythonCode: string;
  jsCode: string;
  color: string;
  borderColor: string;
  icon: LucideIcon;
}

const AVAILABLE_BLOCKS: LogicBlock[] = [
  {
    id: 'b1',
    name: 'robot.initialize_sensors()',
    category: 'robot',
    pythonCode: 'robot.init_ultrasonic(pin=12)',
    jsCode: 'await robot.initSensors({ pin: 12 });',
    color: '#FF6B00',
    borderColor: 'border-[#FF6B00]/40',
    icon: Bot
  },
  {
    id: 'b2',
    name: 'ai.detect_objects(camera_feed)',
    category: 'ai',
    pythonCode: 'predictions = ai.detect(camera=0)',
    jsCode: 'const predictions = await ai.detect(0);',
    color: '#00BFFF',
    borderColor: 'border-[#00BFFF]/40',
    icon: Cpu
  },
  {
    id: 'b3',
    name: 'drone.arm_and_takeoff(alt=10)',
    category: 'drone',
    pythonCode: 'drone.takeoff(target_altitude=10.0)',
    jsCode: 'await drone.takeoff({ altitude: 10 });',
    color: '#00FF66',
    borderColor: 'border-[#00FF66]/40',
    icon: Plane
  },
  {
    id: 'b4',
    name: 'if obstacle_detected: drone.avoid()',
    category: 'drone',
    pythonCode: 'if robot.has_obstacle():\n    drone.evade_left()',
    jsCode: 'if (robot.hasObstacle()) {\n    await drone.evadeLeft();\n}',
    color: '#7B2DFF',
    borderColor: 'border-[#7B2DFF]/40',
    icon: Layers
  }
];

export default function CodingEducationSection() {
  const [language, setLanguage] = useState<CodeLanguage>('blocks');
  const [selectedBlocks, setSelectedBlocks] = useState<LogicBlock[]>([
    AVAILABLE_BLOCKS[0],
    AVAILABLE_BLOCKS[1],
    AVAILABLE_BLOCKS[2]
  ]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '>> Shorai 3D Code Environment v2.5 Ready.',
    '>> Drag or click logic blocks to assemble sequence.'
  ]);

  const handleAddBlock = (block: LogicBlock) => {
    setSelectedBlocks((prev) => [...prev, block]);
    setTerminalLogs((prev) => [...prev, `+ Appended logic block: ${block.name}`]);
  };

  const handleRemoveBlock = (index: number) => {
    setSelectedBlocks((prev) => prev.filter((_, i) => i !== index));
    setTerminalLogs((prev) => [...prev, `- Removed block at index [${index}]`]);
  };

  const handleRunProgram = () => {
    setIsExecuting(true);
    setTerminalLogs([
      '>> INITIATING PROGRAM COMPILATION...',
      `>> TARGET: SHORAI HARDWARE SUITE (${selectedBlocks.length} INSTRUCTIONS)`,
      '------------------------------------------------',
      '>> [1/3] Validating hardware pins...',
      '>> [2/3] Compiling syntax tree to byte-code...',
      '>> [3/3] Executing in 3D WebGL simulator...'
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        '>> [SUCCESS] Program executed with 0 errors.',
        '>> Output: Robot & Drone mission completed!'
      ]);
      setIsExecuting(false);
    }, 2800);
  };

  return (
    <section id="coding" className="py-28 bg-[#03060f] relative overflow-hidden text-white border-t border-white/10">
      
      {/* Background Neon Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-[#7B2DFF]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-[#00FF66]/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[#7B2DFF]/10 text-[#7B2DFF] border border-[#7B2DFF]/30 inline-flex items-center gap-1.5 mb-4">
              <Code2 className="w-3.5 h-3.5" />
              INTERACTIVE 3D CODING WORKSPACE
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              BUILDING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2DFF] via-[#00BFFF] to-[#00FF66]">SOFTWARE & LOGIC</span> FOR TOMORROW
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              From visual drag-and-drop block logic to real Python and JavaScript hardware scripts.
            </p>
          </div>
        </SectionReveal>

        {/* LANGUAGE SELECTOR SWITCHER */}
        <div className="flex justify-center gap-3 mb-10">
          {[
            { id: 'blocks', label: 'VISUAL LOGIC BLOCKS' },
            { id: 'python', label: 'PYTHON HARDWARE SCRIPT' },
            { id: 'javascript', label: 'JAVASCRIPT / NODE.JS' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setLanguage(item.id as CodeLanguage)}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                language === item.id
                  ? 'bg-[#7B2DFF] border-[#7B2DFF] text-white shadow-[0_0_20px_rgba(123,45,255,0.4)]'
                  : 'bg-black/40 border-white/10 text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* WORKSPACE GRID: 3D MODEL & CODE ASSEMBLY PANEL */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: 3D HOLOGRAPHIC CODING MODEL (5 Cols) */}
          <div className="lg:col-span-5 h-[480px] sm:h-[550px] bg-black/80 rounded-3xl border border-[#7B2DFF]/40 backdrop-blur-2xl relative overflow-hidden p-2 flex flex-col justify-between shadow-[0_0_50px_rgba(123,45,255,0.2)]">
            
            {/* Header overlay */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/80 border border-white/20 text-[#7B2DFF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                3D SYNTAX MATRIX
              </span>
              <span className="text-[10px] font-mono text-white/50 bg-black/60 px-2 py-1 rounded border border-white/10">
                {isExecuting ? 'COMPILING & RUNNING...' : 'READY'}
              </span>
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-full relative">
              <Coding3D isExecuting={isExecuting} language={language} />
            </div>

            {/* Terminal Output Logs */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/95 border border-white/15 rounded-2xl p-3 font-mono text-[10px] text-emerald-400 max-h-28 overflow-y-auto backdrop-blur-md">
              <div className="flex items-center gap-2 text-[9px] text-white/40 mb-1 border-b border-white/10 pb-1">
                <Terminal className="w-3 h-3 text-[#00FF66]" />
                SHORAI EMBEDDED CONSOLE TERMINAL
              </div>
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="leading-tight py-0.5">{log}</div>
              ))}
            </div>

          </div>

          {/* RIGHT: INTERACTIVE CODE ASSEMBLY & RUNNER (7 Cols) */}
          <div className="lg:col-span-7 bg-[#080D1A] border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative">
            
            <div>
              {/* Header & Run Button */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#7B2DFF]" />
                  <span className="text-base font-bold text-white tracking-wide">
                    {language === 'blocks' ? 'PROGRAM SEQUENCE BUILDER' : language === 'python' ? 'MAIN.PY SCRIPT' : 'APP.JS SCRIPT'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedBlocks([])}
                    className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    title="Clear Blocks"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleRunProgram}
                    disabled={isExecuting || selectedBlocks.length === 0}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs font-mono transition-all duration-300 ${
                      isExecuting
                        ? 'bg-emerald-500/50 text-white cursor-wait'
                        : 'bg-[#00FF66] text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(0,255,102,0.4)] scale-105'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isExecuting ? 'EXECUTING...' : 'RUN PROGRAM'}</span>
                  </button>
                </div>
              </div>

              {/* ACTIVE CODE SEQUENCE CONTAINER */}
              <div className="mb-6 space-y-2.5 min-h-[160px] bg-black/50 border border-white/10 rounded-2xl p-4">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                  EXECUTABLE LOGIC SEQUENCE ({selectedBlocks.length} STEPS):
                </div>

                {selectedBlocks.length === 0 ? (
                  <div className="text-xs text-white/30 font-mono py-8 text-center">
                    No logic blocks selected. Click blocks below to assemble your program!
                  </div>
                ) : (
                  selectedBlocks.map((block, idx) => {
                    const BlockIcon = block.icon;
                    return (
                      <motion.div
                        key={`${block.id}-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center justify-between p-3 rounded-xl border bg-black/80 font-mono text-xs ${block.borderColor}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-white/40 font-bold">{idx + 1}.</span>
                          <BlockIcon className="w-4 h-4" style={{ color: block.color }} />
                          <span className="text-white font-bold">
                            {language === 'python' ? block.pythonCode : language === 'javascript' ? block.jsCode : block.name}
                          </span>
                        </div>

                        <button
                          onClick={() => handleRemoveBlock(idx)}
                          className="text-white/40 hover:text-red-400 transition-colors text-xs font-bold px-2 py-0.5 rounded hover:bg-white/10"
                        >
                          ✕
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* AVAILABLE LOGIC BLOCKS PALETTE */}
              <div>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-3">
                  AVAILABLE HARDWARE INSTRUCTION BLOCKS (CLICK TO ADD):
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AVAILABLE_BLOCKS.map((block) => {
                    const BlockIcon = block.icon;
                    return (
                      <button
                        key={block.id}
                        onClick={() => handleAddBlock(block)}
                        className={`flex items-center gap-3 p-3 rounded-xl border bg-black/40 hover:bg-white/10 transition-all text-left font-mono text-xs text-white/90 ${block.borderColor}`}
                      >
                        <BlockIcon className="w-4 h-4 flex-shrink-0" style={{ color: block.color }} />
                        <span className="truncate">{block.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Curriculum Summary Bar */}
            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7B2DFF]" />
                <span>K-12 Block to Text Transition Curriculum</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
                <span>Direct Microcontroller Code Flashing</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
