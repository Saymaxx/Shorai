'use client';

import { globalMouseX, globalMouseY } from '@/lib/mouse';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GlobalMouseFollower() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Detect interactive element hover for cursor scaling
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

  // Smooth spring
  const smoothX = useSpring(globalMouseX, { damping: 22, stiffness: 150, mass: 0.4 });
  const smoothY = useSpring(globalMouseY, { damping: 22, stiffness: 150, mass: 0.4 });

  // Slow-following larger orb
  const slowX = useSpring(globalMouseX, { damping: 35, stiffness: 60, mass: 1 });
  const slowY = useSpring(globalMouseY, { damping: 35, stiffness: 60, mass: 1 });

  // Center the orbs
  const orbSize = 480;
  const dotSize = 10;

  const orbX = useTransform(slowX, (v) => v - orbSize / 2);
  const orbY = useTransform(slowY, (v) => v - orbSize / 2);
  const dotX = useTransform(smoothX, (v) => v - dotSize / 2);
  const dotY = useTransform(smoothY, (v) => v - dotSize / 2);

  if (!isMounted) return null;

  return (
    <>
      {/* Large slow-following glow orb */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-0 rounded-full mix-blend-screen hidden md:block"
        style={{
          width: orbSize,
          height: orbSize,
          x: orbX,
          y: orbY,
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(255,107,0,0.04) 45%, transparent 70%)',
          opacity: 0.9,
        }}
      />

      {/* Precise dot cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block"
        style={{
          width: dotSize,
          height: dotSize,
          x: dotX,
          y: dotY,
          background: isHovering ? '#FF6B00' : '#00d4ff',
          boxShadow: isHovering
            ? '0 0 12px rgba(255,107,0,0.8)'
            : '0 0 12px rgba(0,212,255,0.8)',
          scale: isHovering ? 1.5 : 1,
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
        animate={{ scale: isHovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </>
  );
}
