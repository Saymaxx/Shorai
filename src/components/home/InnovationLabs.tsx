'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Brain, Wrench, Plane, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function InnovationLabs() {
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

  // Extremely subtle parallax as requested
  const parallaxGlowX = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 4; // +/- 2px conceptually
  const parallaxGlowY = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 4;
  
  const parallaxLabX = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 8; // +/- 4px
  const parallaxLabY = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 8; 

  const parallaxHUDX = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 14; // +/- 7px
  const parallaxHUDY = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 14;

  return (
    <section className="relative min-h-[85vh] bg-[#050505] overflow-hidden flex items-center pt-24 pb-20 border-t border-white/5">
      
      {/* Background Atmosphere - Animation 1 */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div 
          className="absolute top-[20%] right-[5%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#00BFFF]/5 rounded-full blur-[100px] mix-blend-screen"
          style={{ transform: `translate(${parallaxGlowX}px, ${parallaxGlowY}px)` }}
        />
        <div 
          className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#FF6B00]/5 rounded-full blur-[100px] mix-blend-screen"
          style={{ transform: `translate(${parallaxGlowX * -1}px, ${parallaxGlowY * -1}px)` }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-center mix-blend-overlay" />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center h-full gap-8 lg:gap-0">
        
        {/* LEFT: 40% - Content */}
        <div className="w-full lg:w-[40%] flex-shrink-0 relative z-20 flex flex-col items-start pt-4 lg:pt-0">
          
          {/* Eyebrow - Animation 2 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
              SHORAI INNOVATION LABS
            </span>
          </motion.div>

          {/* Headline - Animation 2 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-[900] tracking-tight leading-[1.05] mb-6 text-white flex flex-col"
            style={{ fontSize: 'clamp(48px, 5.5vw, 88px)' }}
          >
            <span>WHERE STUDENTS</span>
            <span className="flex items-center flex-wrap lg:flex-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#7B2DFF] to-[#00BFFF]">
                BUILD THE FUTURE.
              </span>
            </span>
          </motion.h2>

          {/* Technology line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 text-[14px] sm:text-[15px] font-bold tracking-[0.15em] text-muted-foreground"
          >
            AI &bull; ROBOTICS &bull; CODING &bull; DRONES
          </motion.div>

          {/* CTA - Animation 5 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="#programs" className="inline-block outline-none">
              <div className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
                {/* Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B00] via-[#7B2DFF] to-[#00BFFF] rounded-[12px] blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
                
                {/* Button */}
                <div className="relative flex items-center justify-center px-7 h-12 bg-[#0A0A0A] rounded-[10px] border border-white/10 group-hover:bg-gradient-to-r group-hover:from-[#FF6B00]/10 group-hover:via-[#7B2DFF]/10 group-hover:to-[#00BFFF]/10 transition-colors duration-300">
                  <span className="text-white font-bold tracking-wide mr-2 text-[14px]">
                    Explore Our Labs
                  </span>
                  <ArrowRight className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
          
        </div>

        {/* RIGHT: 60% - Visual Lab Scene */}
        <div className="w-full lg:w-[60%] relative z-10 flex items-center justify-center lg:justify-end h-[350px] sm:h-[450px] lg:h-[700px] pointer-events-none mt-10 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
          
          {/* Lab Image - Animation 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full lg:w-[135%] lg:h-[135%] flex items-center justify-center lg:-translate-x-[5%]"
            style={{ x: parallaxLabX, y: parallaxLabY }}
          >
            {/* CSS Masking for emergence from darkness */}
            <div className="relative w-full h-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_85%,transparent_100%),linear-gradient(to_top,transparent_0%,black_20%,black_85%,transparent_100%)] lg:[mask-composite:intersect]">
               <Image 
                src="/images/shorai-innovation-lab.png" 
                alt="Students building the future in SHORAI Innovation Labs" 
                fill 
                className="object-cover object-center lg:object-right mix-blend-screen opacity-95 drop-shadow-[0_0_40px_rgba(0,191,255,0.15)]"
              />
            </div>

            {/* HUD Markers - Animation 4 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ x: parallaxHUDX, y: parallaxHUDY }}
            >
              {/* AI Marker */}
              <div className="absolute top-[30%] left-[25%] lg:left-[35%] flex items-center gap-1.5 opacity-80 mix-blend-screen">
                <div className="w-5 h-5 rounded-sm border border-[#00BFFF]/40 bg-[#00BFFF]/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_10px_rgba(0,191,255,0.3)]">
                  <Brain className="w-3 h-3 text-[#00BFFF]" />
                </div>
                <span className="hidden sm:block text-[9px] font-mono tracking-wider text-[#00BFFF]">AI</span>
              </div>

              {/* ROBOTICS Marker */}
              <div className="absolute bottom-[30%] right-[30%] lg:right-[35%] flex items-center gap-1.5 opacity-80 mix-blend-screen">
                <div className="w-5 h-5 rounded-sm border border-[#FF6B00]/40 bg-[#FF6B00]/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_10px_rgba(255,107,0,0.3)]">
                  <Wrench className="w-3 h-3 text-[#FF6B00]" />
                </div>
                <span className="hidden sm:block text-[9px] font-mono tracking-wider text-[#FF6B00]">ROBOTICS</span>
              </div>

              {/* DRONES Marker */}
              <div className="absolute top-[20%] right-[20%] lg:right-[25%] flex items-center gap-1.5 opacity-80 mix-blend-screen">
                <div className="w-5 h-5 rounded-sm border border-white/30 bg-white/5 flex items-center justify-center backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  <Plane className="w-3 h-3 text-white/90" />
                </div>
                <span className="hidden sm:block text-[9px] font-mono tracking-wider text-white/70">DRONES</span>
              </div>

              {/* CODING Marker */}
              <div className="absolute bottom-[25%] left-[30%] lg:left-[45%] flex items-center gap-1.5 opacity-80 mix-blend-screen">
                <div className="w-5 h-5 rounded-sm border border-[#7B2DFF]/40 bg-[#7B2DFF]/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_10px_rgba(123,45,255,0.3)]">
                  <Code2 className="w-3 h-3 text-[#7B2DFF]" />
                </div>
                <span className="hidden sm:block text-[9px] font-mono tracking-wider text-[#7B2DFF]">&lt;/&gt; CODING</span>
              </div>
              
            </motion.div>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
