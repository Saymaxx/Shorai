'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Search, PenTool, Cpu, Users, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    num: "01",
    title: "ASSESS",
    desc: "Understand your school needs.",
    icon: Search,
    image: "/images/assess_card.png"
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Plan the right Robotics Lab.",
    icon: PenTool,
    image: "/images/design_card.png"
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Build the lab with advanced technology.",
    icon: Cpu,
    image: "/images/build_card.png"
  },
  {
    num: "04",
    title: "ENABLE",
    desc: "Train teachers. Empower students.",
    icon: Users,
    image: "/images/enable_card.png"
  },
  {
    num: "05",
    title: "TRANSFORM",
    desc: "Create a future-ready school.",
    icon: Rocket,
    image: "/images/transform_card.png"
  }
];

export default function InteractiveTechnology() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} id="technology" className="relative bg-[#050505] overflow-hidden flex flex-col items-center pt-32 pb-24 border-t border-white/5">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#00BFFF]/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-[#FF6B00]/5 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#7B2DFF]/3 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center mix-blend-overlay" />
      </div>

      <div className="max-w-[1400px] xl:max-w-[1600px] mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Headers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-[11px] font-bold tracking-[0.25em] text-white/70 uppercase"
        >
          OUR PROCESS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-[900] tracking-tight leading-[1.1] mb-4 text-white text-4xl sm:text-5xl md:text-[56px]"
        >
          HOW <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF2D7B]">SHORAI</span> TRANSFORMS SCHOOLS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-white/60 mb-24 max-w-2xl font-medium"
        >
          From Traditional Classrooms to Future-Ready Robotics Labs
        </motion.p>

        {/* The Transformation Journey */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between relative pb-10 gap-8 md:gap-3 lg:gap-6">
          
          {/* Connector Line (Desktop/Tablet) */}
          <div className="hidden md:block absolute top-[70px] lg:top-[90px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-white/5 via-[#00BFFF]/30 to-white/5 -z-10 shadow-[0_0_15px_rgba(0,191,255,0.2)]" />
          
          {/* Animated particle along the line */}
          <motion.div 
            className="hidden md:block absolute top-[70px] lg:top-[90px] left-[10%] h-[2px] w-16 bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent -z-10 -translate-y-[0.5px] rounded-full blur-[1px]"
            animate={{ left: ["10%", "90%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Vertical Connector Line (Mobile) */}
          <div className="md:hidden absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-white/5 via-[#00BFFF]/20 to-white/5 -z-10" />

          {/* Traditional School */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center relative group w-full md:w-[13%]"
          >
            <div className="w-40 h-40 md:w-full md:aspect-square max-w-[180px] rounded-[20px] bg-[#0A0A0A] border border-white/5 overflow-hidden mb-5 relative shadow-2xl transition-all duration-500 group-hover:border-white/20 group-hover:-translate-y-2">
              <Image src="/images/traditional_school.png" alt="Traditional School" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase text-center">FROM</span>
            <span className="text-sm font-bold text-white text-center mt-1 leading-tight">TRADITIONAL<br/>SCHOOL</span>
          </motion.div>

          {/* Middle Steps */}
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                className="flex flex-col items-center relative group w-full md:w-[13%]"
              >
                {/* Node on line (Desktop) */}
                <div className="hidden md:flex absolute top-[70px] lg:top-[90px] -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00BFFF]/20 border border-[#00BFFF]/50 items-center justify-center z-10 transition-all duration-300 group-hover:scale-150 group-hover:bg-[#00BFFF]/40 group-hover:shadow-[0_0_15px_rgba(0,191,255,0.6)]">
                   <div className="w-1 h-1 rounded-full bg-[#00BFFF] group-hover:bg-white transition-colors duration-300" />
                </div>

                {/* Card */}
                <div className="relative z-20 w-44 md:w-full max-w-[180px] rounded-[16px] bg-[#0A0A0A] border border-white/10 flex flex-col items-start justify-start overflow-hidden shadow-lg transition-all duration-500 group-hover:-translate-y-[6px] group-hover:scale-[1.02] group-hover:border-[#00BFFF]/50 group-hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] md:mt-[30px] lg:mt-[50px]">
                  <div className="w-full aspect-square relative bg-black">
                    <Image src={step.image} alt={step.title} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  </div>
                  <div className="p-4 w-full flex flex-col pt-0 relative z-10 -mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#00BFFF] font-bold group-hover:text-white transition-colors duration-300">{step.num}</span>
                      <Icon className="w-3 h-3 text-white/40 group-hover:text-[#00BFFF] transition-colors duration-300" />
                    </div>
                    <h3 className="text-xs font-bold text-white tracking-wider mb-1">{step.title}</h3>
                    <p className="text-[10px] text-white/50 leading-tight">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Future Ready School */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center relative group w-full md:w-[13%]"
          >
            <div className="w-40 h-40 md:w-full md:aspect-square max-w-[180px] rounded-[20px] bg-[#0A0A0A] border border-white/5 overflow-hidden mb-5 relative shadow-[0_0_40px_rgba(0,191,255,0.1)] transition-all duration-500 group-hover:border-[#00BFFF]/40 group-hover:shadow-[0_0_50px_rgba(0,191,255,0.3)] group-hover:-translate-y-2">
              <Image src="/images/future_school.png" alt="Future-Ready School" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#00BFFF] uppercase text-center">TO</span>
            <span className="text-sm font-bold text-white text-center mt-1 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">FUTURE-READY<br/>SCHOOL</span>
          </motion.div>

        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col items-center mt-16"
        >
          <h3 className="text-xs font-bold tracking-[0.2em] text-white/80 mb-6 uppercase">LET'S BUILD THE FUTURE TOGETHER</h3>
          
          <Link href="#contact" className="inline-block outline-none mb-6">
            <div className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-[2px]">
              {/* Gradient Border Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B00] via-[#FF2D7B] to-[#7B2DFF] rounded-[14px] blur opacity-50 group-hover:opacity-100 transition duration-300" />
              
              {/* Button Body */}
              <div className="relative flex items-center justify-center px-8 h-14 bg-gradient-to-r from-[#FF6B00] to-[#FF2D7B] rounded-[12px] shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-white font-bold tracking-widest mr-3 text-sm">
                  TRANSFORM YOUR SCHOOL
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 text-white transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="#consultation" className="text-xs text-white/50 hover:text-white transition-colors duration-300 underline underline-offset-4">
            Book a Free Consultation
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
