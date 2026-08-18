'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Brain, Code2, Wrench, Plane, Cpu, Bot, Mic, Hand, Rocket } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    id: 'mars-rover',
    title: 'MARS ROVER EXPLORER',
    copy: ['Explore.', 'Sense.', 'Move.'],
    icon: Cpu, // representing rover electronics
    image: '/images/projects/mars-rover.png',
    accentColor: 'from-[#FF6B00]/20 to-transparent',
    borderColor: 'border-[#FF6B00]/30',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]',
    iconColor: 'text-[#FF6B00]'
  },
  {
    id: 'robotic-picker',
    title: 'ROBOTIC PICKER ARM',
    copy: ['Pick.', 'Place.', 'Repeat.'],
    icon: Wrench,
    image: '/images/projects/robotic-picker.png',
    accentColor: 'from-[#FF6B00]/20 to-[#7B2DFF]/20',
    borderColor: 'border-[#FF6B00]/30',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(255,107,0,0.3)]',
    iconColor: 'text-[#FF6B00]'
  },
  {
    id: 'voice-bot',
    title: 'VOICE CONTROLLED BOT',
    copy: ['Talk to your bot.', 'Watch it respond.'],
    icon: Mic,
    image: '/images/projects/voice-bot.png',
    accentColor: 'from-[#7B2DFF]/20 to-transparent',
    borderColor: 'border-[#7B2DFF]/30',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(123,45,255,0.4)]',
    iconColor: 'text-[#7B2DFF]'
  },
  {
    id: 'gesture-robot',
    title: 'HAND GESTURE ROBOT',
    copy: ['Move your hand.', 'Control the robot.'],
    icon: Hand,
    image: '/images/projects/gesture-robot.png',
    accentColor: 'from-[#7B2DFF]/20 to-[#00BFFF]/20',
    borderColor: 'border-[#7B2DFF]/30',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(123,45,255,0.3)]',
    iconColor: 'text-[#7B2DFF]'
  },
  {
    id: 'mini-drone',
    title: 'MINI DRONE TECH',
    copy: ['Build.', 'Fly.', 'Explore.'],
    icon: Plane,
    image: '/images/projects/mini-drone.png',
    accentColor: 'from-[#00BFFF]/20 to-transparent',
    borderColor: 'border-[#00BFFF]/30',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(0,191,255,0.4)]',
    iconColor: 'text-[#00BFFF]'
  }
];

export default function ProjectShowcase() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const px = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 10;
  const py = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 10;

  return (
    <section className="relative w-full bg-[#050505] overflow-hidden pt-32 pb-24 border-t border-white/5 flex flex-col items-center">
      
      {/* 1. TOP AREA: HERO */}
      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center min-h-[70vh] mb-24">
        
        {/* Left Typography */}
        <div className="w-full lg:w-[40%] flex-shrink-0 relative z-20 flex flex-col items-start pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-white/70 uppercase">
              THE SHORAI TECHNOLOGY ECOSYSTEM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[900] tracking-tight leading-[1.05] mb-8 text-white flex flex-col"
            style={{ fontSize: 'clamp(48px, 5vw, 86px)' }}
          >
            <span>TECHNOLOGY</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF2A6D] via-[#7B2DFF] to-[#00BFFF]">
              COMES ALIVE.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 text-[14px] sm:text-[15px] font-bold tracking-[0.2em] text-muted-foreground"
          >
            AI &bull; ROBOTICS &bull; CODING &bull; DRONES
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="#explore" className="inline-block outline-none">
              <div className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-[2px]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B00] via-[#7B2DFF] to-[#00BFFF] rounded-[14px] blur opacity-30 group-hover:opacity-70 transition duration-300" />
                <div className="relative flex items-center justify-center px-8 h-14 bg-[#0A0A0A] rounded-[12px] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_5px_20px_rgba(0,0,0,0.6)]">
                  <span className="text-white font-bold tracking-wide mr-2 text-[15px]">
                    Explore Technology
                  </span>
                  <ArrowRight className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Right Cinematic Visual */}
        <div className="w-full lg:w-[60%] relative z-10 flex items-center justify-center lg:justify-end h-[400px] sm:h-[500px] lg:h-[700px] mt-10 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full lg:w-[140%] lg:h-[140%] flex items-center justify-center lg:-translate-x-[5%]"
          >
             {/* Masking for the Image to emerge from black */}
             <motion.div 
               className="relative w-full h-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_30%,black_85%,transparent_100%),linear-gradient(to_top,transparent_0%,black_20%,black_85%,transparent_100%)] lg:[mask-composite:intersect]"
               style={{ x: px * 0.5, y: py * 0.5 }}
             >
               <Image 
                src="/images/shorai-student-robotics-lab.png" 
                alt="SHORAI Indian Students building Robotics" 
                fill 
                className="object-cover object-center lg:object-right mix-blend-screen opacity-[0.9]"
                priority
              />
            </motion.div>

            {/* HUD Callouts Overlaid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ x: px * 0.8, y: py * 0.8 }}
            >
              {/* AI Callout */}
              <div className="absolute top-[25%] left-[15%] lg:left-[25%] flex flex-col gap-1 opacity-90 drop-shadow-md">
                <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(0,191,255,0.2)]">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-3 h-3 text-[#00BFFF]" />
                    <span className="text-[10px] font-bold text-white tracking-widest">AI</span>
                  </div>
                  <div className="text-[9px] text-white/70 leading-tight">
                    Think. Learn.<br/>Solve smarter.
                  </div>
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent ml-6" />
              </div>

              {/* CODING Callout */}
              <div className="absolute bottom-[20%] left-[25%] lg:left-[40%] flex flex-col gap-1 opacity-90 drop-shadow-md">
                 <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-white/30 ml-6 -mt-12" />
                <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(123,45,255,0.2)] mt-12">
                  <div className="flex items-center gap-2 mb-1">
                    <Code2 className="w-3 h-3 text-[#7B2DFF]" />
                    <span className="text-[10px] font-bold text-white tracking-widest">CODING</span>
                  </div>
                  <div className="text-[9px] text-white/70 leading-tight">
                    Code ideas.<br/>Build solutions.
                  </div>
                </div>
              </div>

              {/* ROBOTICS Callout */}
              <div className="absolute bottom-[30%] right-[10%] lg:right-[15%] flex flex-col items-end gap-1 opacity-90 drop-shadow-md text-right">
                <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="text-[10px] font-bold text-white tracking-widest">ROBOTICS</span>
                    <Wrench className="w-3 h-3 text-[#FF6B00]" />
                  </div>
                  <div className="text-[9px] text-white/70 leading-tight">
                    Build. Program.<br/>Bring ideas to life.
                  </div>
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-t from-white/30 to-transparent mr-6" />
              </div>

              {/* DRONES Callout */}
              <div className="absolute top-[10%] right-[30%] lg:right-[40%] flex flex-col items-end gap-1 opacity-90 drop-shadow-md text-right">
                 <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/30 mr-6 -mt-12" />
                <div className="px-3 py-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(0,191,255,0.2)] mt-12">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="text-[10px] font-bold text-white tracking-widest">DRONES</span>
                    <Plane className="w-3 h-3 text-[#00BFFF]" />
                  </div>
                  <div className="text-[9px] text-white/70 leading-tight">
                    Fly. Explore.<br/>Go beyond.
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 2. BOTTOM AREA: PROJECTS SHOWCASE */}
      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-20">
        
        {/* Horizontal scroll container for the 5 cards */}
        <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory hide-scrollbar">
          {projects.map((project, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={project.id}
              className={`group flex-none w-[280px] sm:w-[300px] h-[400px] relative rounded-[18px] overflow-hidden bg-[#0A0A0A] border border-white/5 transition-all duration-300 hover:-translate-y-2 snap-center ${project.glowColor} cursor-pointer`}
            >
              {/* Background gradient hint */}
              <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${project.accentColor}`} />
              
              {/* Large Image covering most of card */}
              <div className="absolute top-0 left-0 w-full h-[60%] overflow-hidden rounded-t-[18px]">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {/* Soft gradient fade into card body */}
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              </div>

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10 h-full pointer-events-none">
                {/* Small Tech Icon */}
                <div className={`w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border ${project.borderColor} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                  <project.icon className={`w-4 h-4 ${project.iconColor}`} />
                </div>
                
                <h3 className="text-white font-bold tracking-wider text-[13px] mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                
                <div className="text-muted-foreground text-[12px] leading-relaxed font-medium">
                  {project.copy.map((line, i) => (
                    <div key={i} className="opacity-70 group-hover:opacity-100 transition-opacity">{line}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Creative Bottom Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center justify-center mt-12 text-center"
        >
          <div className="flex items-center gap-2 text-white/50 mb-1">
            <span className="font-mono text-sm tracking-widest italic opacity-80">&quot;Big ideas start small.&quot;</span>
            <Rocket className="w-4 h-4 text-[#FF6B00] animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/20">
            We help students build them.
          </span>
        </motion.div>
        
      </div>
    </section>
  );
}
