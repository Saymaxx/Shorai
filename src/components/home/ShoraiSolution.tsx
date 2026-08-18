'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';

const actionWords = [
  "BUILD IT.",
  "BREAK IT.",
  "UNDERSTAND IT.",
  "IMPROVE IT."
];

export default function ShoraiSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="py-32 bg-background relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.1),transparent_50%)]" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionReveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-8">
            TURN CLASSROOMS INTO <br className="hidden md:block" />
            <span className="text-primary">INNOVATION LABS.</span>
          </h2>
        </SectionReveal>
        
        <SectionReveal delay={0.1}>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            SHORAI integrates AI, robotics, coding and drone technology into practical school learning.
          </p>
          <p className="text-2xl md:text-3xl font-medium text-white mb-16">
            Students don&apos;t just watch technology. <br /> They:
          </p>
        </SectionReveal>

        <div className="flex flex-col items-center gap-4">
          {actionWords.map((word, index) => {
            // Calculate a staggered reveal based on scroll position
            const start = index * 0.15 + 0.2;
            const end = start + 0.15;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start, end], [20, 0]);

            return (
              <motion.div
                key={word}
                style={{ opacity, scale, y }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase"
              >
                {/* Add dynamic gradient text based on the word */}
                <span className={
                  index === 0 ? "text-white" :
                  index === 1 ? "text-destructive" :
                  index === 2 ? "text-secondary" :
                  "text-primary"
                }>
                  {word}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
