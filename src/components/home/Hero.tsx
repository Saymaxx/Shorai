'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import CountUp from '@/components/shared/CountUp';
import { globalMouseX, globalMouseY } from '@/lib/mouse';
import ParticlesCanvas from '@/components/home/ParticlesCanvas';
import HeroCanvas from '@/components/home/HeroCanvas';
import CursorTrail from '@/components/shared/CursorTrail';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Fade Up Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.hero-reveal', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  const smoothY1 = useSpring(y1, { stiffness: 50, damping: 20 });
  const smoothY2 = useSpring(y2, { stiffness: 50, damping: 20 });

  // Calculate local mouse Y by adding scroll position to global mouse Y
  const localMouseY = useTransform(() => globalMouseY.get() + scrollY.get());
  const mouseBackground = useMotionTemplate`radial-gradient(800px circle at ${globalMouseX}px ${localMouseY}px, rgba(0, 217, 255, 0.08), transparent 50%)`;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A1022]"
    >
      <CursorTrail />
      <HeroCanvas />

      {/* 1. Mouse Follow Radial Glow (Overlay on top of Canvas for UI integration) */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{
          background: mouseBackground
        }}
      />

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="container max-w-[1400px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 pt-24 lg:pt-0">
        
        {/* LEFT COLUMN: Typography & Actions */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="lg:col-span-6 flex flex-col justify-center text-left relative z-20"
        >
          {/* Badge */}
          <div className="hero-reveal inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-[#B8C0D0] text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)] self-start border-l-[#00D9FF] border-l-2">
            🚀 Future Ready AI Education
          </div>

          {/* Heading */}
          <h1 className="hero-reveal text-5xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.04em] mb-6 text-white leading-[1.05]">
            Building The Next Generation Of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B00] via-[#ff9900] to-[#FF6B00] animate-gradient-x">
              AI Innovators
            </span>
          </h1>

          {/* Description */}
          <p className="hero-reveal text-lg sm:text-xl text-[#B8C0D0] mb-10 max-w-xl font-light leading-relaxed tracking-[-0.01em]">
            Empowering schools and students with <strong className="text-white font-medium">AI, Robotics, Coding, Drone Technology</strong> and Future Skills through immersive hands-on learning.
          </p>

          {/* Buttons */}
          <div className="hero-reveal flex flex-col sm:flex-row items-center justify-start gap-4 mb-14">
            <MagneticWrapper>
              <Button size="lg" className="h-[56px] px-8 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#ff4500] hover:from-[#ff8533] hover:to-[#ff6600] text-white font-semibold text-base shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:shadow-[0_0_45px_rgba(255,107,0,0.6)] transition-all duration-300 border-none">
                Explore Programs
              </Button>
            </MagneticWrapper>
            <MagneticWrapper>
              <Button variant="outline" size="lg" className="h-[56px] px-8 rounded-full bg-white/[0.05] border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 text-white font-medium text-base transition-all duration-300 gap-3 group shadow-xl">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                Watch Demo
              </Button>
            </MagneticWrapper>
          </div>

          {/* Stats Counters */}
          <div className="hero-reveal grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Students', value: 10000, suffix: '+' },
              { label: 'Schools', value: 250, suffix: '+' },
              { label: 'Robotics Kits', value: 500, suffix: '+' },
              { label: 'Satisfaction', value: 98, suffix: '%' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 backdrop-blur-md hover:bg-white/[0.04] transition-colors">
                <div className="text-2xl font-bold text-white flex items-baseline">
                  <CountUp to={stat.value} />
                  <span className="text-[#00D9FF] text-xl ml-0.5">{stat.suffix}</span>
                </div>
                <div className="text-sm text-[#B8C0D0] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Floating Orbiting Cards (3D objects are behind) */}
        <div className="lg:col-span-6 relative h-[700px] w-full hidden lg:flex items-center justify-center perspective-[2000px] pointer-events-none">

          {/* Floating Orbiting Skill Cards */}
          {[
            { title: "AI", icon: "🧠", top: "15%", left: "5%", delay: 0 },
            { title: "Robotics", icon: "🤖", top: "25%", right: "0%", delay: 1 },
            { title: "Drone", icon: "🚁", bottom: "35%", left: "0%", delay: 2 },
            { title: "Coding", icon: "💻", top: "5%", right: "30%", delay: 0.5 },
            { title: "Machine Learning", icon: "⚙️", bottom: "20%", right: "10%", delay: 1.5 },
            { title: "IoT", icon: "📡", bottom: "10%", left: "20%", delay: 2.5 }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="absolute z-30 flex items-center gap-3 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:border-[#00D9FF]/50 hover:bg-[#00D9FF]/10 transition-all duration-300 pointer-events-auto cursor-default"
              style={{ top: card.top, left: card.left, right: card.right, bottom: card.bottom }}
              animate={{ 
                y: [0, -15, 0],
                x: [0, 5, 0],
                rotateZ: [-2, 2, -2]
              }}
              transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
              whileHover={{ scale: 1.1, zIndex: 40 }}
            >
              <span className="text-xl filter drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]">{card.icon}</span>
              <span className="text-sm font-semibold text-white tracking-wide">{card.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------------- SCROLL INDICATOR ---------------- */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-[#B8C0D0]/40 rounded-full flex justify-center p-1 relative overflow-hidden backdrop-blur-sm bg-black/20">
          <motion.div 
            className="w-1 h-2 bg-[#00D9FF] rounded-full shadow-[0_0_8px_#00D9FF]"
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8C0D0] font-semibold">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
