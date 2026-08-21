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

    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  const smoothX = useSpring(globalMouseX, { damping: 22, stiffness: 180, mass: 0.4 });
  const smoothY = useSpring(globalMouseY, { damping: 22, stiffness: 180, mass: 0.4 });

  const slowX = useSpring(globalMouseX, { damping: 35, stiffness: 60, mass: 1 });
  const slowY = useSpring(globalMouseY, { damping: 35, stiffness: 60, mass: 1 });

  const orbSize = 460;
  const dotSize = 10;

  const orbX = useTransform(slowX, (v) => v - orbSize / 2);
  const orbY = useTransform(slowY, (v) => v - orbSize / 2);
  const dotX = useTransform(smoothX, (v) => v - dotSize / 2);
  const dotY = useTransform(smoothY, (v) => v - dotSize / 2);

  if (!isMounted) return null;

  return (
    <>
      {/* Soft playful pastel follower aura */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-0 rounded-full hidden md:block"
        style={{
          width: orbSize,
          height: orbSize,
          x: orbX,
          y: orbY,
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(56,189,248,0.06) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(255,107,0,0.05) 50%, transparent 70%)',
          opacity: 0.9,
        }}
      />

      {/* Playful precision dot cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block"
        style={{
          width: dotSize,
          height: dotSize,
          x: dotX,
          y: dotY,
          background: isHovering ? '#FF6B00' : '#6366F1',
          boxShadow: isHovering
            ? '0 0 14px rgba(255,107,0,0.7)'
            : '0 0 14px rgba(99,102,241,0.7)',
        }}
        animate={{ scale: isHovering ? 1.7 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </>
  );
}
