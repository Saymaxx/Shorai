'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function GlobalMouseFollower() {
  const orbRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let orbX = -100;
    let orbY = -100;
    let dotX = -100;
    let dotY = -100;
    let isHovering = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.closest('[role="button"]'))) {
        isHovering = true;
      }
    };

    const handleMouseOut = () => {
      isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    const animate = () => {
      // Fluid linear interpolation for buttery smooth 60/120fps tracking
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;

      orbX += (mouseX - orbX) * 0.12;
      orbY += (mouseY - orbY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 5}px, ${dotY - 5}px, 0) scale(${isHovering ? 1.6 : 1})`;
        dotRef.current.style.backgroundColor = isHovering ? '#FF6B00' : '#6366F1';
      }

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${orbX - 220}px, ${orbY - 220}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Soft ambient ambient aura */}
      <div
        ref={orbRef}
        className="pointer-events-none fixed top-0 left-0 z-0 rounded-full hidden md:block w-[440px] h-[440px] will-change-transform"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(56,189,248,0.04) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(255,107,0,0.04) 50%, transparent 70%)',
          opacity: 0.8,
        }}
      />

      {/* Playful precision dot cursor */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block w-2.5 h-2.5 will-change-transform transition-transform duration-75 ease-out shadow-[0_0_12px_rgba(99,102,241,0.6)]"
      />
    </>
  );
}
