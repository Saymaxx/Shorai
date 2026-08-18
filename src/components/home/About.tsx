'use client';

import { motion, Variants } from 'framer-motion';
import { BrainCircuit, Globe, Rocket, Eye } from 'lucide-react';
import CountUp from '@/components/shared/CountUp';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import TextReveal from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';
import ParallaxImage from '@/components/animations/ParallaxImage';

const timeline = [
  { 
    year: '2022', 
    title: 'The Vision Begins', 
    desc: 'Shorai was founded with a singular vision: to democratize advanced AI education.' 
  },
  { 
    year: '2024', 
    title: 'Curriculum Launch', 
    desc: 'Introduced our flagship Future Ready syllabus to over 10,000 students globally.' 
  },
  { 
    year: '2026', 
    title: 'Enterprise Expansion', 
    desc: 'Partnering with global tech giants to build the next generation of engineers.' 
  },
];

const stats = [
  { value: 50, suffix: 'K+', label: 'Students Empowered' },
  { value: 99, suffix: '%', label: 'Future Ready' },
  { value: 120, suffix: '+', label: 'AI Models Built' },
];

const cards = [
  { 
    icon: BrainCircuit, 
    title: 'AI Education', 
    desc: 'Deep dive into neural networks, machine learning, and generative AI.' 
  },
  { 
    icon: Rocket, 
    title: 'Future Ready', 
    desc: 'Equipping students with technical and ethical skills for the next century.' 
  },
  { 
    icon: Globe, 
    title: 'Global Impact', 
    desc: 'Connecting learners worldwide to solve humanity’s grand challenges.' 
  },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function About() {
  return (
    <SectionReveal id="about" className="relative bg-background overflow-hidden py-32 md:py-48">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header: Mission & Vision */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-32 md:mb-48"
        >
          <TextReveal className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-8">
            Shaping the minds that will shape tomorrow.
          </TextReveal>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
            Our mission is to bridge the gap between human potential and artificial intelligence. 
            We envision a world where every student is not just a consumer of technology, but a masterful creator.
          </motion.p>
        </motion.div>

        {/* Image & Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-40 md:mb-56">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[500px] md:h-[700px] w-full rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/10"
          >
            {/* Fallback background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2235] to-[#0B1020]" />
            <ParallaxImage
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
              alt="AI Education at Shorai"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              containerClassName="absolute inset-0 z-10"
              imageClassName="opacity-80 mix-blend-overlay group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
            />
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent opacity-80 z-20 pointer-events-none" />
            
            {/* Vision Tag */}
            <div className="absolute bottom-10 left-8 right-8 md:left-10 md:right-auto p-6 rounded-[1.5rem] bg-white/5 backdrop-blur-xl border border-white/10 max-w-[320px] z-30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="font-semibold text-white tracking-wide">Vision 2030</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To become the global standard for AI and robotics education, setting the curriculum for a new era.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          >
            <div className="sm:col-span-2 mb-4">
              <TextReveal className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                The numbers behind the revolution.
              </TextReveal>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg">
                Measurable impact driving the next generation of builders.
              </motion.p>
            </div>
            
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-40 md:mb-56">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 md:mb-32"
          >
            <h3 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">Our Journey</h3>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[31px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
            
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 mb-20 last:mb-0 ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-8 ring-[#0B1020] shadow-[0_0_20px_var(--primary)] z-10" />
                
                {/* Content */}
                <div className={`pl-20 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                    <span className="text-primary font-bold text-xl md:text-2xl tracking-tight mb-2">{item.year}</span>
                    <h4 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">{item.title}</h4>
                    <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Pillars Cards */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="p-10 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute -inset-px bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                <card.icon className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-semibold text-white mb-4 tracking-tight">{card.title}</h4>
              <p className="text-muted-foreground text-lg leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </SectionReveal>
  );
}
