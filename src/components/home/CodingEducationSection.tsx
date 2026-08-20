'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, Play, RotateCcw, CheckCircle2, Sparkles, Cpu, Bot, Plane, Layers, LucideIcon, ArrowRight } from 'lucide-react';
import Coding3D from '@/components/3d/Coding3D';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

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
    color: '#0284C7',
    borderColor: 'border-[#0284C7]/40',
    icon: Cpu
  },
  {
    id: 'b3',
    name: 'drone.arm_and_takeoff(alt=10)',
    category: 'drone',
    pythonCode: 'drone.takeoff(target_altitude=10.0)',
    jsCode: 'await drone.takeoff({ altitude: 10 });',
    color: '#10B981',
    borderColor: 'border-[#10B981]/40',
    icon: Plane
  },
  {
    id: 'b4',
    name: 'if obstacle: robot.evade_left()',
    category: 'drone',
    pythonCode: 'if robot.has_obstacle():\n    robot.turn_left(angle=45)',
    jsCode: 'if (robot.hasObstacle()) {\n    await robot.turnLeft(45);\n}',
    color: '#7928CA',
    borderColor: 'border-[#7928CA]/40',
    icon: Bot
  },
  {
    id: 'b5',
    name: 'while True: stream_telemetry()',
    category: 'ai',
    pythonCode: 'while True:\n    cloud.publish(robot.get_state())',
    jsCode: 'while (true) {\n    await cloud.publish(robot.state);\n}',
    color: '#6366F1',
    borderColor: 'border-[#6366F1]/40',
    icon: Layers
  }
];

export default function CodingEducationSection() {
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>(['b1', 'b2', 'b3']);
  const [activeLanguage, setActiveLanguage] = useState<CodeLanguage>('python');
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string[]>([]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleBlock = (id: string) => {
    if (selectedBlocks.includes(id)) {
      if (selectedBlocks.length > 1) {
        setSelectedBlocks(selectedBlocks.filter(b => b !== id));
      }
    } else {
      setSelectedBlocks([...selectedBlocks, id]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setExecutionOutput(['>> Compiling logic pipeline...', '>> Connecting to 3D Robot & Drone runtime...']);

    setTimeout(() => {
      setExecutionOutput(prev => [
        ...prev,
        '>> [SYS_OK] Sensors initialized (Ultrasonic + LiDAR).',
        '>> [AI_OK] YOLOv8 Neural Camera feed online.',
        '>> [ROBOT_OK] Motors engaged, waypoint navigation active!'
      ]);
      setIsRunning(false);
    }, 1200);
  };

  const resetPipeline = () => {
    setSelectedBlocks(['b1', 'b2', 'b3']);
    setExecutionOutput([]);
  };

  return (
    <section id="coding" className="relative py-28 bg-background overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[45vw] h-[45vw] max-w-[650px] bg-primary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              PYTHON &bull; ROS 2 &bull; BLOCK CODING
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              INTERACTIVE CODING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SANDBOX</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Drag and drop visual logic blocks, inspect compiled Python and ROS 2 hardware commands, and watch the 3D machine execute your code in real-time.
            </p>
          </SectionReveal>

          {/* Language Selector */}
          <div className="flex items-center gap-2 mt-6 p-1.5 rounded-2xl bg-muted/60 border border-border">
            {(['blocks', 'python', 'javascript'] as CodeLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all uppercase font-mono ${
                  activeLanguage === lang
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN SANDBOX GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT: Logic Block Palette (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                AVAILABLE LOGIC MODULES
              </span>
              <button
                onClick={resetPipeline}
                className="text-xs font-mono text-primary flex items-center gap-1 hover:underline"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-3">
              {AVAILABLE_BLOCKS.map((block) => {
                const Icon = block.icon;
                const isSelected = selectedBlocks.includes(block.id);
                return (
                  <motion.div
                    key={block.id}
                    onClick={() => toggleBlock(block.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-card border-primary/60 shadow-md shadow-primary/5'
                        : 'bg-card/60 border-border hover:border-primary/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: `${block.color}15`, color: block.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-foreground">
                          {block.name}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground">
                          CATEGORY: {block.category.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-primary border-primary text-white' : 'border-border'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] mt-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isRunning ? 'EXECUTING PIPELINE...' : 'EXECUTE CODE ON 3D ROBOT'}</span>
            </button>
          </div>

          {/* RIGHT: Code Editor & 3D Execution Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Code Output Window */}
            <div className="rounded-3xl bg-card border border-border shadow-md overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-muted/40 text-xs font-mono">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>COMPILED SCRIPT ({activeLanguage.toUpperCase()})</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold">SYNTAX VERIFIED</span>
              </div>

              <div className="p-5 font-mono text-xs text-foreground/90 bg-muted/10 overflow-x-auto max-h-[160px]">
                <pre>
                  {selectedBlocks.map((bId) => {
                    const block = AVAILABLE_BLOCKS.find(b => b.id === bId);
                    if (!block) return null;
                    return (
                      <div key={bId} className="leading-relaxed">
                        <span className="text-primary font-bold"># {block.name}</span>
                        {'\n'}
                        <span className="text-foreground">
                          {activeLanguage === 'python' ? block.pythonCode : block.jsCode}
                        </span>
                        {'\n'}
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>

            {/* 3D Simulation Canvas */}
            <div className="h-[300px] sm:h-[340px] rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden p-2">
              <Coding3D isExecuting={isRunning} language={activeLanguage} />
            </div>

            {/* Console Log Terminal */}
            {executionOutput.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-card border border-border font-mono text-xs text-muted-foreground space-y-1 shadow-sm"
              >
                {executionOutput.map((log, i) => (
                  <div key={i} className="text-foreground/80">{log}</div>
                ))}
              </motion.div>
            )}

          </div>

        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>To know more about us contact us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
