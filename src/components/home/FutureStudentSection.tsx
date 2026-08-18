'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Brain, Wrench, Code2, Plane, Settings2, Eye } from 'lucide-react';
import Link from 'next/link';

const careers = [
  {
    id: 'ai-engineer',
    title: 'AI ENGINEER',
    desc: 'Build intelligent systems',
    icon: Brain,
    color: 'text-[#00BFFF]',
    borderColor: 'border-[#00BFFF]/30',
    glowColor: 'shadow-[0_0_20px_rgba(0,191,255,0.3)]',
    bgColor: 'bg-[#00BFFF]/10',
    // Constellation placement relative to center (0,0)
    x: -35, y: -35,
  },
  {
    id: 'robotics-dev',
    title: 'ROBOTICS DEVELOPER',
    desc: 'Make machines move',
    icon: Wrench,
    color: 'text-[#FF6B00]',
    borderColor: 'border-[#FF6B00]/30',
    glowColor: 'shadow-[0_0_20px_rgba(255,107,0,0.3)]',
    bgColor: 'bg-[#FF6B00]/10',
    x: 35, y: -25,
  },
  {
    id: 'ai-dev',
    title: 'AI DEVELOPER',
    desc: 'Create intelligent software',
    icon: Code2,
    color: 'text-[#7B2DFF]',
    borderColor: 'border-[#7B2DFF]/30',
    glowColor: 'shadow-[0_0_20px_rgba(123,45,255,0.3)]',
    bgColor: 'bg-[#7B2DFF]/10',
    x: -45, y: 0,
  },
  {
    id: 'drone-eng',
    title: 'DRONE ENGINEER',
    desc: 'Design autonomous flight',
    icon: Plane,
    color: 'text-[#00BFFF]',
    borderColor: 'border-[#00BFFF]/30',
    glowColor: 'shadow-[0_0_20px_rgba(0,191,255,0.3)]',
    bgColor: 'bg-[#00BFFF]/10',
    x: 40, y: 15,
  },
  {
    id: 'auto-eng',
    title: 'AUTOMATION ENGINEER',
    desc: 'Build smart systems',
    icon: Settings2,
    color: 'text-[#FF6B00]',
    borderColor: 'border-[#FF6B00]/30',
    glowColor: 'shadow-[0_0_20px_rgba(255,107,0,0.3)]',
    bgColor: 'bg-[#FF6B00]/10',
    x: -30, y: 35,
  },
  {
    id: 'cv-dev',
    title: 'COMPUTER VISION',
    desc: 'Teach machines to see',
    icon: Eye,
    color: 'text-[#7B2DFF]',
    borderColor: 'border-[#7B2DFF]/30',
    glowColor: 'shadow-[0_0_20px_rgba(123,45,255,0.3)]',
    bgColor: 'bg-[#7B2DFF]/10',
    x: 30, y: 45,
  }
];

export default function FutureStudentSection() {
  const [hoveredCareer, setHoveredCareer] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden pt-32 pb-24 border-t border-white/5 flex items-center">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Orange Glow behind student (right center) */}
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#FF6B00]/10 rounded-full blur-[150px] mix-blend-screen" />
        
        {/* Faint Purple/Cyan Ambient Lighting */}
        <div className="absolute bottom-[10%] left-[20%] w-[30vw] h-[30vw] bg-[#7B2DFF]/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[30%] w-[25vw] h-[25vw] bg-[#00BFFF]/5 rounded-full blur-[100px] mix-blend-screen" />
        
        {/* Minimal Grid/Particles */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-center" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between h-full gap-16 lg:gap-8">
        
        {/* LEFT: 40% - Typography & Content */}
        <div className="w-full lg:w-[40%] flex-shrink-0 flex flex-col items-start pt-10 lg:pt-0">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-white/70 uppercase">
              THE FUTURE STARTS HERE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[900] tracking-tight leading-[1.05] mb-6 text-white flex flex-col"
            style={{ fontSize: 'clamp(44px, 5vw, 76px)' }}
          >
            <span>WHAT WILL YOUR</span>
            <span>STUDENT</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF2A6D] via-[#7B2DFF] to-[#00BFFF] pb-2">
              BECOME?
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 text-[16px] md:text-[18px] text-muted-foreground leading-relaxed max-w-md border-l border-[#7B2DFF]/50 pl-4"
          >
            Today&apos;s curiosity. <br/>
            <span className="text-white font-medium">Tomorrow&apos;s career.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="#explore" className="inline-block outline-none">
              <div className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-[2px]">
                {/* Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B00] via-[#7B2DFF] to-[#00BFFF] rounded-[12px] blur-sm opacity-40 group-hover:opacity-80 transition duration-300" />
                
                {/* Dark Premium Button */}
                <div className="relative flex items-center justify-center px-7 h-12 bg-[#0A0A0A] rounded-[10px] border border-white/10 group-hover:bg-gradient-to-r group-hover:from-[#FF6B00]/5 group-hover:via-[#7B2DFF]/5 group-hover:to-[#00BFFF]/5 transition-colors duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.6)]">
                  <span className="text-white font-bold tracking-wide mr-2 text-[14px]">
                    EXPLORE FUTURE PATHS
                  </span>
                  <ArrowRight className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: 60% - Constellation Visual */}
        <div className="w-full lg:w-[60%] relative flex items-center justify-center min-h-[500px] sm:min-h-[600px] lg:min-h-[800px]">
          
          {/* Main Cinematic Image (Centered loosely in this right area) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            {/* We apply a strong gradient mask so it blends beautifully with the constellation cards */}
            <div className="relative w-full h-[120%] lg:w-[140%] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]">
              <Image
                src="/images/shorai-future-career-student.png"
                alt="Student standing among future possibilities"
                fill
                className="object-contain lg:object-cover mix-blend-screen opacity-90 drop-shadow-[0_0_40px_rgba(255,107,0,0.1)]"
                priority
              />
            </div>
          </motion.div>

          {/* Holographic HTML/CSS Constellation Cards overlaying the image */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 21 }}>
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 107, 0, 0.5)" />
                  <stop offset="50%" stopColor="rgba(123, 45, 255, 0.5)" />
                  <stop offset="100%" stopColor="rgba(0, 191, 255, 0.5)" />
                </linearGradient>
              </defs>
              {careers.map((career) => (
                <motion.line
                  key={`line-${career.id}`}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${career.x}%)`}
                  y2={`calc(50% + ${career.y}%)`}
                  stroke="url(#line-gradient)"
                  strokeWidth="1.5"
                  className="transition-all duration-500"
                  initial={{ opacity: 0, strokeDasharray: 100, strokeDashoffset: 100 }}
                  whileInView={{ opacity: hoveredCareer === career.id ? 1 : hoveredCareer ? 0.1 : 0.3, strokeDashoffset: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  strokeLinecap="round"
                />
              ))}
            </svg>

            {/* Glowing Student Center Node (Optional, mostly for visual connection anchoring) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50 blur-[2px] z-22" />

            {/* Floating Career Cards */}
            {careers.map((career, idx) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                className="absolute pointer-events-auto"
                style={{
                  left: `calc(50% + ${career.x}%)`,
                  top: `calc(50% + ${career.y}%)`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredCareer(career.id)}
                onMouseLeave={() => setHoveredCareer(null)}
              >
                <div 
                  className={`relative flex items-center gap-3 p-3 lg:p-4 rounded-2xl bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 transition-all duration-500 cursor-pointer
                    ${hoveredCareer === career.id ? `${career.borderColor} ${career.glowColor} scale-110 z-30` : ''}
                    ${hoveredCareer && hoveredCareer !== career.id ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100'}
                  `}
                >
                  {/* Icon Box */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 transition-colors duration-500 ${hoveredCareer === career.id ? career.bgColor : 'bg-black/50'}`}>
                    <career.icon className={`w-5 h-5 transition-colors duration-500 ${hoveredCareer === career.id ? career.color : 'text-white/70'}`} />
                  </div>
                  
                  {/* Copy */}
                  <div className="flex flex-col">
                    <span className={`text-[10px] lg:text-[11px] font-bold tracking-widest transition-colors duration-500 ${hoveredCareer === career.id ? 'text-white' : 'text-white/80'}`}>
                      {career.title}
                    </span>
                    <span className={`text-[10px] lg:text-[11px] font-medium transition-colors duration-500 ${hoveredCareer === career.id ? career.color : 'text-muted-foreground'}`}>
                      {career.desc}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
