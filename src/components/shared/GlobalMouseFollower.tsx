'use client';

import { globalMouseX, globalMouseY } from '@/lib/mouse';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function GlobalMouseFollower() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') || t.closest('[role="button"]'))) {
        setIsHovering(true);
      }
    };
    const onLeave = () => setIsHovering(false);

    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });
    return () => {
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  const smoothX = useSpring(globalMouseX, { damping: 25, stiffness: 200, mass: 0.3 });
  const smoothY = useSpring(globalMouseY, { damping: 25, stiffness: 200, mass: 0.3 });

  const slowX = useSpring(globalMouseX, { damping: 40, stiffness: 80, mass: 0.8 });
  const slowY = useSpring(globalMouseY, { damping: 40, stiffness: 80, mass: 0.8 });

  const orbSize = 400;
  const dotSize = 10;

  const orbX = useTransform(slowX, (v) => v - orbSize / 2);
  const orbY = useTransform(slowY, (v) => v - orbSize / 2);
  const dotX = useTransform(smoothX, (v) => v - dotSize / 2);
  const dotY = useTransform(smoothY, (v) => v - dotSize / 2);

  if (!isMounted) return null;

  return (
    <>
      {/* Soft hardware-accelerated pastel follower aura */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-0 rounded-full hidden md:block"
        style={{
          width: orbSize,
          height: orbSize,
          x: orbX,
          y: orbY,
          willChange: 'transform',
          transform: 'translateZ(0)',
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(56,189,248,0.04) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(255,107,0,0.04) 50%, transparent 70%)',
          opacity: 0.8,
        }}
      />

      {/* Hardware-accelerated precision dot cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block"
        style={{
          width: dotSize,
          height: dotSize,
          x: dotX,
          y: dotY,
          willChange: 'transform',
          transform: 'translateZ(0)',
          background: isHovering ? '#FF6B00' : '#6366F1',
          boxShadow: isHovering
            ? '0 0 12px rgba(255,107,0,0.6)'
            : '0 0 12px rgba(99,102,241,0.6)',
        }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
      />
    </>
  );
}
