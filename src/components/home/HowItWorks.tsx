'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'Students discover emerging technologies.' },
  { num: '02', title: 'LEARN', desc: 'Understand the concepts behind them.' },
  { num: '03', title: 'BUILD', desc: 'Create real projects.' },
  { num: '04', title: 'EXPERIMENT', desc: 'Test, fail, improve and iterate.' },
  { num: '05', title: 'INNOVATE', desc: 'Turn ideas into solutions.' },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 bg-[#050505] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-24 text-center">
            HOW SHORAI WORKS
          </h2>
        </SectionReveal>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-8 left-0 w-full h-[2px] bg-white/10 hidden md:block" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute top-8 left-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent hidden md:block"
            style={{ width: lineWidth }}
          />

          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative">
            {steps.map((step, index) => {
              // Node activation based on scroll
              const activationPoint = index / (steps.length - 1) - 0.1;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const nodeColor = useTransform(
                scrollYProgress,
                [activationPoint, activationPoint + 0.1],
                ["rgba(255,255,255,0.1)", "rgba(255,107,0,1)"]
              );

              return (
                <div key={step.num} className="flex-1 flex flex-col md:items-center text-left md:text-center relative group">
                  
                  {/* Vertical line for mobile */}
                  <div className="absolute left-6 top-16 bottom-[-3rem] w-[2px] bg-white/10 md:hidden" />
                  
                  {/* Node */}
                  <div className="relative z-10 flex items-center mb-6">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-[#050505] border-4 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                      style={{ borderColor: nodeColor }}
                    >
                      <span className="font-mono text-sm font-bold text-white">{step.num}</span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <SectionReveal delay={index * 0.1}>
                    <div className="pl-20 md:pl-0">
                      <h3 className="text-xl font-bold tracking-wide text-white mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px] mx-auto">
                        {step.desc}
                      </p>
                    </div>
                  </SectionReveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
