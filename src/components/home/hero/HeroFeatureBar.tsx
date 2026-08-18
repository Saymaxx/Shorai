'use client';

import { motion } from 'framer-motion';
import { Sparkles, Hammer, BookOpen, TrendingUp } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

const features = [
  {
    icon: Sparkles,
    title: 'Future-Ready Skills',
    desc: 'AI, Robotics, Coding, Drones & more.',
    color: 'text-primary'
  },
  {
    icon: Hammer,
    title: 'Hands-On Learning',
    desc: 'Real projects. Real impact.',
    color: 'text-secondary'
  },
  {
    icon: BookOpen,
    title: 'Industry-Aligned',
    desc: 'Built for tomorrow.',
    color: 'text-accent'
  },
  {
    icon: TrendingUp,
    title: 'Proven Outcomes',
    desc: 'Stronger skills. Smarter careers.',
    color: 'text-primary'
  }
];

export default function HeroFeatureBar() {
  return (
    <SectionReveal delay={0.8}>
      <motion.div 
        className="hidden md:flex w-full max-w-6xl mx-auto glass-panel border border-white/10 rounded-2xl p-6 items-center justify-between shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] relative z-20 backdrop-blur-3xl bg-black/60"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-50" />
        
        {features.map((feature, index) => (
          <div key={feature.title} className="flex items-center gap-4 relative z-10 px-4">
            {index !== 0 && (
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/10 hidden lg:block" />
            )}
            
            <div className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${feature.color}`}>
              <feature.icon className="w-5 h-5" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-wide">{feature.title}</span>
              <span className="text-xs text-muted-foreground">{feature.desc}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </SectionReveal>
  );
}
