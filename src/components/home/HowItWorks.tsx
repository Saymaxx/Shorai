'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';
import { Sparkles } from 'lucide-react';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'Students discover emerging tech through hands-on curiosity.' },
  { num: '02', title: 'LEARN', desc: 'Understand real engineering, logic & algorithmic concepts.' },
  { num: '03', title: 'BUILD', desc: 'Assemble physical robots, sensors & neural software models.' },
  { num: '04', title: 'EXPERIMENT', desc: 'Test, calibrate, troubleshoot and iterate independently.' },
  { num: '05', title: 'INNOVATE', desc: 'Build working inventions for competitions and patents.' },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-28 bg-background relative overflow-hidden border-t border-border transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              STUDENT LEARNING CYCLE
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              HOW SHORAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">WORKS</span>
            </h2>
          </SectionReveal>
        </div>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-8 left-0 w-full h-[3px] bg-muted hidden md:block rounded-full" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute top-8 left-0 h-[3px] bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hidden md:block rounded-full shadow-sm"
            style={{ width: lineWidth }}
          />

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-4 relative">
            {steps.map((step, index) => {
              return (
                <div key={step.num} className="flex-1 flex flex-col md:items-center text-left md:text-center relative group">
                  
                  {/* Node */}
                  <div className="relative z-10 flex items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-card border-2 border-primary/30 flex items-center justify-center relative shadow-md group-hover:border-primary group-hover:scale-110 transition-all">
                      <span className="font-mono text-sm font-black text-primary">{step.num}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <SectionReveal delay={index * 0.08}>
                    <div className="pl-4 md:pl-0">
                      <h3 className="text-base font-bold tracking-wide text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px] mx-auto">
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
