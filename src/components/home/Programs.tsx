'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Bot, Navigation, Terminal, Wifi, Network, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import TextReveal from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';

const programs = [
  {
    title: 'Artificial Intelligence',
    desc: 'Master the fundamentals of AI, neural networks, and generative models to solve complex problems.',
    icon: BrainCircuit,
    href: '#ai',
  },
  {
    title: 'Robotics Engineering',
    desc: 'Design, build, and program autonomous robots for real-world industrial and personal applications.',
    icon: Bot,
    href: '#robotics',
  },
  {
    title: 'Drone Technology',
    desc: 'Learn aerospace dynamics and flight programming to build intelligent autonomous UAVs.',
    icon: Navigation,
    href: '#drone',
  },
  {
    title: 'Advanced Coding',
    desc: 'Deep dive into algorithmic thinking, data structures, and enterprise-scale software architecture.',
    icon: Terminal,
    href: '#coding',
  },
  {
    title: 'Internet of Things (IoT)',
    desc: 'Connect the physical and digital worlds by building smart sensors and embedded systems.',
    icon: Wifi,
    href: '#iot',
  },
  {
    title: 'Machine Learning',
    desc: 'Train models on vast datasets to predict trends, automate tasks, and create intelligent systems.',
    icon: Network,
    href: '#ml',
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function Programs() {
  return (
    <SectionReveal id="programs" className="relative bg-[#050814] overflow-hidden py-32 md:py-48 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-24 md:mb-32"
        >
          <TextReveal className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-6">
            Explore our Programs.
          </TextReveal>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground font-light">
            Comprehensive learning paths designed to turn curious minds into industry-leading innovators.
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {programs.map((prog, idx) => (
            <motion.div key={idx} variants={fadeUp} className="h-full">
              <Link href={prog.href} className="block h-full group">
                <div className="h-full p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20 relative overflow-hidden flex flex-col">
                  
                  {/* Subtle hover background gradient */}
                  <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                  
                  {/* Icon */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:text-primary transition-all duration-500 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(255,107,0,0.3)]"
                  >
                    <prog.icon className="w-8 h-8" />
                  </motion.div>
                  
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">{prog.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {prog.desc}
                    </p>
                  </div>
                  
                  {/* Learn More Link */}
                  <div className="mt-auto self-start">
                    <MagneticWrapper>
                      <div className="flex items-center text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300 py-2">
                        <span className="mr-2 relative">
                          Learn More
                          {/* Underline effect */}
                          <span className="absolute left-0 -bottom-1 w-full h-[1.5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </MagneticWrapper>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SectionReveal>
  );
}
