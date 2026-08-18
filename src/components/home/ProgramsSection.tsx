'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Bot, Code2, Plane } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

const programs = [
  {
    title: 'ARTIFICIAL INTELLIGENCE',
    desc: 'Learn how machines think, learn and make decisions.',
    cta: 'Explore AI',
    color: 'from-primary/20 to-primary/5',
    accent: 'text-primary',
    border: 'group-hover:border-primary/50',
    icon: Cpu,
    visual: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
        <div className="w-32 h-32 relative">
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full blur-[2px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-primary rounded-full blur-[2px] animate-pulse delay-100" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full blur-[2px] animate-pulse delay-200" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_#FF6B00]" />
          <svg className="absolute inset-0 w-full h-full text-primary/30" viewBox="0 0 100 100">
             <line x1="50" y1="5" x2="10" y2="90" stroke="currentColor" strokeWidth="1" />
             <line x1="50" y1="5" x2="90" y2="90" stroke="currentColor" strokeWidth="1" />
             <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="1" />
             <line x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="1" />
             <line x1="50" y1="50" x2="10" y2="90" stroke="currentColor" strokeWidth="1" />
             <line x1="50" y1="50" x2="90" y2="90" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>
    )
  },
  {
    title: 'ROBOTICS',
    desc: 'Design, build and program intelligent machines.',
    cta: 'Explore Robotics',
    color: 'from-secondary/20 to-secondary/5',
    accent: 'text-secondary',
    border: 'group-hover:border-secondary/50',
    icon: Bot,
    visual: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
        <div className="w-24 h-32 border-2 border-secondary/40 rounded-xl relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-secondary/60 rounded-full" />
          <div className="absolute top-8 left-2 right-2 h-[1px] bg-secondary/40" />
          <motion.div 
            className="absolute top-12 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_#00BFFF]"
            animate={{ x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>
    )
  },
  {
    title: 'CODING',
    desc: 'Turn ideas into software, systems and intelligent solutions.',
    cta: 'Explore Coding',
    color: 'from-accent/20 to-accent/5',
    accent: 'text-accent',
    border: 'group-hover:border-accent/50',
    icon: Code2,
    visual: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
        <div className="w-32 h-24 bg-black/50 border border-accent/30 rounded-lg p-3 font-mono text-xs text-accent/70 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, -40] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          >
            <div>function build() {'{'}</div>
            <div className="pl-2">const future = new World();</div>
            <div className="pl-2">future.init(AI);</div>
            <div className="pl-2">return future;</div>
            <div>{'}'}</div>
            <div className="mt-2 text-accent">{'>> Executing...'}</div>
          </motion.div>
        </div>
      </div>
    )
  },
  {
    title: 'DRONE TECHNOLOGY',
    desc: 'Understand flight, automation, sensors and aerial technology.',
    cta: 'Explore Drones',
    color: 'from-primary/20 to-primary/5',
    accent: 'text-primary',
    border: 'group-hover:border-primary/50',
    icon: Plane,
    visual: (
      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
        <motion.div 
          className="w-24 h-24 relative"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-8 bg-primary/40 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-8 bg-primary/40 rounded-full" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-2 bg-primary/40 rounded-full" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-2 bg-primary/40 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full shadow-[0_0_20px_#FF6B00]" />
        </motion.div>
      </div>
    )
  }
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-32 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-16 text-center">
            LEARN WHAT THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">FUTURE NEEDS.</span>
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <SectionReveal key={program.title} delay={index * 0.1}>
              <div className={`group relative h-[400px] rounded-3xl overflow-hidden glass-panel border-white/5 transition-all duration-500 hover:-translate-y-2 ${program.border}`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Abstract Visuals */}
                {program.visual}

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <program.icon className={`w-6 h-6 ${program.accent}`} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    {program.desc}
                  </p>
                  
                  <div className={`inline-flex items-center font-semibold text-sm ${program.accent}`}>
                    {program.cta}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
