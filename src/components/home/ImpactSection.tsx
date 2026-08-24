'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';
import { useContent } from '@/context/ContentContext';

export default function ImpactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { content } = useContent();
  const imp = content.about.impact;

  const stats = [
    { value: imp.stat1Value, label: imp.stat1Label },
    { value: imp.stat2Value, label: imp.stat2Label },
    { value: imp.stat3Value, label: imp.stat3Label },
  ];

  return (
    <section ref={ref} className="py-20 bg-card border-t border-b border-border relative overflow-hidden transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 md:gap-0 relative z-10 text-center divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, index) => (
            <SectionReveal key={index} delay={index * 0.1}>
              <div className="flex flex-col items-center justify-center py-4 md:py-0 md:px-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.8, delay: index * 0.15, type: "spring", bounce: 0.3 }}
                  className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider max-w-[240px]">
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
