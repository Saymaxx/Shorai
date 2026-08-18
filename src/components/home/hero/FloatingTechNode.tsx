'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FloatingTechNodeProps {
  id: string;
  label: string;
  icon: LucideIcon;
  colorClass: string;
  delay: number;
  position: { x: string; y: string };
  animationProps?: { y: number[], x?: number[], rotate?: number[] };
  duration?: number;
}

export default function FloatingTechNode({
  label,
  icon: Icon,
  colorClass,
  delay,
  position,
  animationProps = { y: [-10, 10, -10] },
  duration = 5,
}: FloatingTechNodeProps) {
  return (
    <div
      className="absolute z-30"
      style={{ left: position.x, top: position.y }}
    >
      <motion.div
        animate={animationProps}
        transition={{ repeat: Infinity, duration, ease: 'easeInOut' }}
        className="relative group cursor-default"
      >
        {/* Subtle connecting line to center (abstract visual) */}
        <div className="absolute top-1/2 -left-12 w-12 h-[1px] bg-gradient-to-r from-transparent to-white/20 hidden md:block" />

        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors hover:bg-black/50 hover:border-white/20">
          <div className="relative flex items-center justify-center">
            <div className={`absolute inset-0 blur-sm opacity-50 ${colorClass.replace('text-', 'bg-')}`} />
            <Icon className={`relative w-3.5 h-3.5 ${colorClass}`} />
          </div>
          <span className="text-[11px] font-bold tracking-widest text-white/90 whitespace-nowrap uppercase">
            {label}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
