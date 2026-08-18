'use client';

import { motion } from 'framer-motion';
import { Bot, Cpu, MonitorPlay, Zap } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import ParallaxImage from '@/components/animations/ParallaxImage';

const features = [
  {
    icon: Bot,
    title: 'Humanoid Assembly',
    desc: 'Advanced biomechanics and multi-axis actuator testing facilities designed for industrial robotics.'
  },
  {
    icon: MonitorPlay,
    title: 'Simulation Matrix',
    desc: 'High-fidelity physics engines for pre-deployment neural network training and validation.'
  },
  {
    icon: Cpu,
    title: 'Custom Silicon',
    desc: 'In-house FPGA prototyping and embedded systems laboratory for low-latency AI.'
  },
  {
    icon: Zap,
    title: 'High-Voltage Testing',
    desc: 'Isolated environments for drone battery arrays, rapid charging, and motor drives.'
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function RoboticsLab() {
  return (
    <SectionReveal 
      id="robotics-lab" 
      className="relative bg-[#0B1020] overflow-hidden py-32 md:py-48 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-12 justify-between items-end mb-20 md:mb-32">
          <div className="max-w-2xl">
            <TextReveal className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">
              The Robotics Lab
            </TextReveal>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              Where code meets steel. State-of-the-art facilities equipped with the same hardware used by global tech giants.
            </motion.p>
          </div>
        </div>

        {/* Large Parallax Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[400px] md:h-[700px] w-full rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_-20px_rgba(255,107,0,0.2)] border border-white/10 mb-32"
        >
          {/* Parallax Image Container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-[#0B1020] z-0" />
            <ParallaxImage
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop"
              alt="Advanced Robotics Lab"
              fill
              sizes="100vw"
              containerClassName="absolute inset-0 z-10"
              imageClassName="opacity-50 mix-blend-overlay group-hover:opacity-70 transition-opacity duration-700"
            />
          </div>

          {/* Gradients to blend image edges */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-[#0B1020]/20 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020]/80 via-transparent to-transparent opacity-80" />
          
          {/* Internal badge */}
          <div className="absolute bottom-10 left-8 md:left-10 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3 text-white font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Lab Alpha Active
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-6 p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-500 text-white shadow-lg">
                <feat.icon className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-white mb-3 tracking-tight">{feat.title}</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SectionReveal>
  );
}
