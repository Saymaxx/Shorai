'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Eye, MessageSquare, Zap, Activity, Sliders, Play, CheckCircle2, RefreshCw, LucideIcon } from 'lucide-react';
import AIBrain3D from '@/components/3d/AIBrain3D';
import SectionReveal from '@/components/animations/SectionReveal';

type AIMode = 'neural' | 'vision' | 'nlp';

interface ModeDetails {
  id: AIMode;
  title: string;
  badge: string;
  description: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  shadowColor: string;
  accuracy: string;
  latency: string;
  parameters: string;
  features: string[];
  sampleCode: string;
}

const MODES: Record<AIMode, ModeDetails> = {
  neural: {
    id: 'neural',
    title: 'Deep Neural Networks & ML',
    badge: 'MULTILAYER PERCEPTRON',
    description: 'Students design, train, and test multi-layer artificial neural networks using forward propagation and gradient descent backpropagation.',
    icon: Cpu,
    color: '#00BFFF',
    borderColor: 'border-[#00BFFF]/50',
    shadowColor: 'shadow-[0_0_30px_rgba(0,191,255,0.3)]',
    accuracy: '98.6%',
    latency: '1.2 ms',
    parameters: '12.4M Weights',
    features: [
      'Multi-Layer Perceptron (MLP) Architecture',
      'Activation Functions (ReLU, Softmax, Sigmoid)',
      'Real-Time Backpropagation Loss Curves',
      'Hyperparameter Tuning (Learning Rate, Batch Size)'
    ],
    sampleCode: `model = Sequential([\n  Dense(128, activation='relu', input_shape=(784,)),\n  Dropout(0.2),\n  Dense(10, activation='softmax')\n])\nmodel.compile(optimizer='adam', loss='categorical_crossentropy')`
  },
  vision: {
    id: 'vision',
    title: 'Computer Vision & Tracking',
    badge: 'CONVOLUTIONAL NETS (CNN)',
    description: 'Teach machines to see! Students build object detection, facial recognition, gesture control, and autonomous camera tracking algorithms.',
    icon: Eye,
    color: '#FF6B00',
    borderColor: 'border-[#FF6B00]/50',
    shadowColor: 'shadow-[0_0_30px_rgba(255,107,0,0.3)]',
    accuracy: '99.2%',
    latency: '3.8 ms',
    parameters: '25.1M Conv Filters',
    features: [
      'Real-Time Camera Stream Object Detection',
      'Hand & Gesture Tracking for Robot Control',
      'Bounding Box & Feature Map Extraction',
      'Edge Detection & Optical Flow Physics'
    ],
    sampleCode: `detector = YOLOv8('shorai-vision.pt')\nresults = detector.track(source=0, show=True)\nfor r in results:\n    boxes = r.boxes.xyxy\n    labels = r.names`
  },
  nlp: {
    id: 'nlp',
    title: 'Generative AI & LLMs',
    badge: 'TRANSFORMER ARCHITECTURE',
    description: 'Students explore how Large Language Models generate human speech, understand context vectors, and power interactive voice assistants.',
    icon: MessageSquare,
    color: '#7B2DFF',
    borderColor: 'border-[#7B2DFF]/50',
    shadowColor: 'shadow-[0_0_30px_rgba(123,45,255,0.3)]',
    accuracy: '97.4%',
    latency: '8.5 ms',
    parameters: '1.5B Attention Tokens',
    features: [
      'Self-Attention Mechanism & Query-Key-Value Vectors',
      'Tokenization & High-Dimensional Embeddings',
      'Fine-Tuning Domain Voice Assistants',
      'Sentiment Analysis & Intent Classification'
    ],
    sampleCode: `transformer = ShoraiLLM(vocab_size=32000, d_model=512)\noutput = transformer.generate("Explain robotics to students", max_tokens=100)`
  }
};

export default function AIEducationSection() {
  const [activeMode, setActiveMode] = useState<AIMode>('neural');
  const [density, setDensity] = useState<number>(70);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string | null>(null);

  const currentMode = MODES[activeMode];

  return (
    <section id="ai" className="py-28 bg-[#040810] relative overflow-hidden text-white border-t border-white/10">
      
      {/* Background Neon Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-[#00BFFF]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] bg-[#7B2DFF]/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/30 inline-flex items-center gap-1.5 mb-4">
              <Zap className="w-3.5 h-3.5" />
              INTERACTIVE 3D AI DEMO
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              DEMONSTRATING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] via-[#FF6B00] to-[#7B2DFF]">ARTIFICIAL INTELLIGENCE</span> IN SCHOOLS
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Explore how machines learn, visualize neural pathways in 3D space, and test real AI models live.
            </p>
          </div>
        </SectionReveal>

        {/* MODE SWITCHER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(Object.keys(MODES) as AIMode[]).map((modeKey) => {
            const m = MODES[modeKey];
            const ModeIcon = m.icon;
            const isActive = activeMode === modeKey;
            return (
              <button
                key={modeKey}
                onClick={() => {
                  setActiveMode(modeKey);
                  setSelectedNodeInfo(null);
                }}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 border ${
                  isActive
                    ? `${m.borderColor} bg-white/10 text-white ${m.shadowColor} scale-105`
                    : 'border-white/10 bg-black/40 text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <ModeIcon className="w-5 h-5" style={{ color: m.color }} />
                <span>{m.title}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN 3D DISPLAY & CONTROL PANEL GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: 3D CANVAS INTERACTIVE MODEL (7 Cols) */}
          <div className="lg:col-span-7 h-[480px] sm:h-[550px] bg-black/60 rounded-3xl border border-white/10 backdrop-blur-2xl relative overflow-hidden p-2 flex flex-col justify-between group shadow-2xl">
            
            {/* Holographic Header Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-black/80 border border-white/20 text-white/90 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 animate-pulse text-[#00BFFF]" />
                3D NEURAL CANVAS: {currentMode.badge}
              </span>
              <span className="text-[10px] font-mono text-white/50 bg-black/60 px-2 py-1 rounded border border-white/10">
                DRAG TO ROTATE
              </span>
            </div>

            {/* 3D Brain Canvas Component */}
            <div className="w-full h-full relative">
              <AIBrain3D
                mode={activeMode}
                density={density}
                speed={speed}
                onNodeClick={(id, info) => setSelectedNodeInfo(info)}
              />
            </div>

            {/* Live Model Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 gap-2 bg-black/80 border border-white/15 rounded-xl p-3 text-center backdrop-blur-md">
              <div>
                <div className="text-[10px] font-mono text-white/50">MODEL ACCURACY</div>
                <div className="text-sm font-bold text-[#00BFFF]">{currentMode.accuracy}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/50">INFERENCE LATENCY</div>
                <div className="text-sm font-bold text-[#FF6B00]">{currentMode.latency}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/50">SYNAPTIC COUNT</div>
                <div className="text-sm font-bold text-[#7B2DFF]">{density * 18} Synapses</div>
              </div>
            </div>

          </div>

          {/* RIGHT: INTERACTIVE CONTROL & CURRICULUM DETAILS (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Mode Overview Card */}
            <AnimatePresence mode="wait">
              {(() => {
                const CurrentIcon = currentMode.icon;
                return (
                  <motion.div
                    key={activeMode}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#090D16] border border-white/10 rounded-3xl p-6 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <CurrentIcon className="w-6 h-6" style={{ color: currentMode.color }} />
                      </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-white/50 tracking-wider">VERTICAL DEMO</span>
                    <h3 className="text-xl font-bold text-white">{currentMode.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  {currentMode.description}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2 mb-6">
                  {currentMode.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: currentMode.color }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Real-time Parameter Sliders */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#00BFFF]" />
                      NEURAL DENSITY
                    </span>
                    <span className="text-[#00BFFF]">{density} Nodes</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    value={density}
                    onChange={(e) => setDensity(Number(e.target.value))}
                    className="w-full accent-[#00BFFF] cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white/80 pt-2">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#FF6B00]" />
                      PULSE / LEARNING SPEED
                    </span>
                    <span className="text-[#FF6B00]">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.2"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full accent-[#FF6B00] cursor-pointer"
                  />
                </div>

                {/* Code Snippet Preview */}
                <div className="mt-4 p-3 rounded-xl bg-black/80 border border-white/10 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                  <div className="text-[9px] text-white/40 mb-1 font-sans font-bold">PYTHON MODEL CODE:</div>
                  <pre className="whitespace-pre">{currentMode.sampleCode}</pre>
                </div>

              </motion.div>
                );
              })()}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
