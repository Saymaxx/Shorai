'use client';

import { motion } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';
import { Cpu, Bot, Code2, Plane } from 'lucide-react';

const categories = [
  {
    title: 'AI',
    desc: 'Artificial Intelligence',
    icon: Cpu,
    color: 'group-hover:text-primary',
    border: 'group-hover:border-primary',
  },
  {
    title: 'ROBOTICS',
    desc: 'Build & Automate',
    icon: Bot,
    color: 'group-hover:text-secondary',
    border: 'group-hover:border-secondary',
  },
  {
    title: 'CODING',
    desc: 'Think & Create',
    icon: Code2,
    color: 'group-hover:text-accent',
    border: 'group-hover:border-accent',
  },
  {
    title: 'DRONES',
    desc: 'Explore & Engineer',
    icon: Plane,
    color: 'group-hover:text-primary',
    border: 'group-hover:border-primary',
  },
];

export default function TrustImpactStrip() {
  return (
    <section className="py-20 bg-[#0A0A0A] border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionReveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">
              THE CLASSROOM IS CHANGING.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Technology is no longer just something students use. <br className="hidden md:block" />
              <span className="text-white font-medium">It&apos;s something they should understand, build and shape.</span>
            </p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 hidden md:block -z-10" />
          
          {categories.map((cat, index) => (
            <SectionReveal key={cat.title} delay={0.2 + index * 0.1}>
              <div className="flex flex-col items-center text-center group cursor-default">
                <div className={`w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden transition-all duration-500 ${cat.border} group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500" />
                  <cat.icon className={`w-8 h-8 text-muted-foreground transition-colors duration-500 ${cat.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
