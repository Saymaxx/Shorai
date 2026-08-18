'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';

const stats = [
  { value: '01', label: 'Future-ready ecosystem' },
  { value: '04', label: 'Core technology domains' },
  { value: '∞', label: 'Ideas waiting to be built' },
];

export default function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="py-24 bg-[#0A0A0A] border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
      <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
      <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 md:gap-0 relative z-10 text-center">
          {stats.map((stat, index) => (
            <SectionReveal key={index} delay={index * 0.1}>
              <div className="flex flex-col items-center justify-center md:px-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2, type: "spring", bounce: 0.4 }}
                  className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4"
                >
                  {stat.value}
                </motion.div>
                <div className="text-lg font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
