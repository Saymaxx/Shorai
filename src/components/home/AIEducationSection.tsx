'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Eye, MessageSquare, Zap, Activity, Sliders, Play, CheckCircle2, RefreshCw, LucideIcon, ArrowRight, Sparkles } from 'lucide-react';
import AIBrain3D from '@/components/3d/AIBrain3D';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

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
    color: '#6366F1',
    borderColor: 'border-[#6366F1]/40',
    shadowColor: 'shadow-[0_0_30px_rgba(99,102,241,0.2)]',
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
    borderColor: 'border-[#FF6B00]/40',
    shadowColor: 'shadow-[0_0_30px_rgba(255,107,0,0.2)]',
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
    badge: 'TRANSFORMERS & ATTENTION',
    description: 'Understand Large Language Models, tokenization, self-attention mechanisms, and deploy custom fine-tuned chatbots for robotics.',
    icon: MessageSquare,
    color: '#00D4FF',
    borderColor: 'border-[#00D4FF]/40',
    shadowColor: 'shadow-[0_0_30px_rgba(0,212,255,0.2)]',
    accuracy: '97.4%',
    latency: '8.4 ms',
    parameters: '7B Token Embeddings',
    features: [
      'Self-Attention Matrix Visualization',
      'Tokenization, Embeddings & Vector Stores',
      'Fine-Tuning on Custom STEM Datasets',
      'Conversational AI Subsystem for Humanoid Robot'
    ],
    sampleCode: `tokenizer = AutoTokenizer.from_pretrained('shorai-llm')\ninputs = tokenizer("Robot, navigate to checkpoint B", return_tensors='pt')\nresponse = model.generate(**inputs, max_new_tokens=64)`
  }
};

export default function AIEducationSection() {
  const [activeMode, setActiveMode] = useState<AIMode>('neural');
  const [density, setDensity] = useState(60);
  const [speed, setSpeed] = useState(1.0);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const currentMode = MODES[activeMode];

  return (
    <section id="ai" className="relative py-28 bg-background overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              INTERACTIVE 3D AI LAB
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              AI &amp; MACHINE LEARNING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">DEMO</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Step inside our AI neural architecture sandbox. Rotate the 3D neural brain, click nodes to view synaptic weight transfers, and experiment with real machine learning algorithms.
            </p>
          </SectionReveal>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {(Object.keys(MODES) as AIMode[]).map((modeKey) => {
              const m = MODES[modeKey];
              const Icon = m.icon;
              const isActive = activeMode === modeKey;
              return (
                <button
                  key={modeKey}
                  onClick={() => setActiveMode(modeKey)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-card border-2 shadow-lg shadow-primary/10 text-foreground scale-105'
                      : 'bg-muted/60 border border-border text-muted-foreground hover:text-foreground'
                  }`}
                  style={isActive ? { borderColor: m.color } : {}}
                >
                  <Icon className="w-4 h-4" style={{ color: m.color }} />
                  <span>{m.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN 3D DISPLAY & CONTROL PANEL GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* LEFT: 3D CANVAS INTERACTIVE MODEL (7 Cols) */}
          <div className="lg:col-span-7 h-[460px] sm:h-[540px] bg-card rounded-3xl border border-border shadow-xl relative overflow-hidden p-2 flex flex-col justify-between group">
            
            {/* Holographic Header Bar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-xl text-[11px] font-mono font-bold bg-card/90 border border-border text-foreground flex items-center gap-2 shadow-sm">
                <Activity className="w-3.5 h-3.5 animate-pulse text-primary" />
                3D NEURAL CANVAS: {currentMode.badge}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground bg-card/80 px-2.5 py-1 rounded-lg border border-border shadow-sm">
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
            <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 gap-2 bg-card/90 border border-border rounded-2xl p-3 text-center backdrop-blur-md shadow-md">
              <div>
                <div className="text-[10px] font-mono text-muted-foreground">ACCURACY</div>
                <div className="text-sm font-bold text-primary">{currentMode.accuracy}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-foreground">LATENCY</div>
                <div className="text-sm font-bold text-accent">{currentMode.latency}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-foreground">SYNAPSES</div>
                <div className="text-sm font-bold text-secondary">{density * 18} Nodes</div>
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
                    className="bg-card border border-border rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="p-3 rounded-2xl shadow-sm"
                        style={{ background: `${currentMode.color}15`, color: currentMode.color }}
                      >
                        <CurrentIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-wider block">AI CURRICULUM</span>
                        <h3 className="text-xl font-bold text-foreground">{currentMode.title}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {currentMode.description}
                    </p>

                    {/* Feature Checklist */}
                    <div className="space-y-2 mb-6">
                      {currentMode.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/85">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Real-time Parameter Sliders */}
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-foreground">
                        <span className="flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-primary" />
                          NEURAL DENSITY
                        </span>
                        <span className="text-primary">{density} Nodes</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="120"
                        value={density}
                        onChange={(e) => setDensity(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />

                      <div className="flex items-center justify-between text-xs font-mono font-bold text-foreground pt-1">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-accent" />
                          LEARNING SPEED
                        </span>
                        <span className="text-accent">{speed.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="3.0"
                        step="0.2"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

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
