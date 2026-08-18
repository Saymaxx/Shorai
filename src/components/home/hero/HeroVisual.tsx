'use client';

import { motion } from 'framer-motion';
import { Cpu, Bot, Code2, Plane, Sparkles } from 'lucide-react';
import FloatingTechNode from './FloatingTechNode';
import Robot3DCanvas from '@/components/3d/Robot3D';

export default function HeroVisual({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  // Parallax offsets based on mouse position
  const parallaxRingsX = (mousePosition.x - 0.5) * 15;
  const parallaxRingsY = (mousePosition.y - 0.5) * 15;
  
  const parallaxNodesX = (mousePosition.x - 0.5) * 25;
  const parallaxNodesY = (mousePosition.y - 0.5) * 25;
  
  const parallaxRobotX = (mousePosition.x - 0.5) * 35;
  const parallaxRobotY = (mousePosition.y - 0.5) * 35;

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
      
      {/* LAYER 1: Holographic Rings */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
        style={{ x: parallaxRingsX, y: parallaxRingsY }}
      >
        <motion.div 
          className="absolute w-[110%] aspect-square max-w-[700px] rounded-full border border-[#00BFFF]/20 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
        />
        <motion.div 
          className="absolute w-[130%] aspect-square max-w-[900px] rounded-full border border-[#7B2DFF]/15"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 100, ease: 'linear' }}
        />
        <motion.div 
          className="absolute w-[85%] aspect-square max-w-[500px] rounded-full border border-[#FF6B00]/10 border-dotted"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
        />
      </motion.div>

      {/* LAYER 2: Interactive 3D Robot Model */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full h-[520px] lg:h-[620px] flex items-center justify-center"
        style={{ x: parallaxRobotX, y: parallaxRobotY }}
      >
        {/* Holographic Platform Base Glow */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-72 h-16 bg-[#00BFFF]/20 rounded-full blur-xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-64 h-1 border border-[#00BFFF]/40 rounded-full shadow-[0_0_20px_#00BFFF] pointer-events-none" />

        {/* 3D Canvas */}
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
          <Robot3DCanvas activeSection="hero" />
        </div>
      </motion.div>

      {/* LAYER 3: STEM Orbit Floating Tech Badges */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute inset-0 z-20 pointer-events-auto"
        style={{ x: parallaxNodesX, y: parallaxNodesY }}
      >
        <FloatingTechNode
          id="ai"
          label="AI & ML"
          icon={Cpu}
          colorClass="text-[#00BFFF]"
          delay={0.9}
          position={{ x: '12%', y: '20%' }}
          animationProps={{ y: [-8, 8, -8] }}
          duration={5}
        />
        <FloatingTechNode
          id="robotics"
          label="ROBOTICS"
          icon={Bot}
          colorClass="text-[#FF6B00]"
          delay={1.0}
          position={{ x: '82%', y: '22%' }}
          animationProps={{ y: [8, -8, 8] }}
          duration={6}
        />
        <FloatingTechNode
          id="coding"
          label="CODING"
          icon={Code2}
          colorClass="text-[#7B2DFF]"
          delay={1.1}
          position={{ x: '10%', y: '70%' }}
          animationProps={{ y: [-5, 5, -5] }}
          duration={5.5}
        />
        <FloatingTechNode
          id="drones"
          label="DRONES"
          icon={Plane}
          colorClass="text-white"
          delay={1.2}
          position={{ x: '78%', y: '72%' }}
          animationProps={{ y: [10, -10, 10] }}
          duration={6.5}
        />
      </motion.div>

    </div>
  );
}
