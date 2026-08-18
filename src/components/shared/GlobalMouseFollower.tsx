'use client';

import { globalMouseX, globalMouseY } from '@/lib/mouse';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function GlobalMouseFollower() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const smoothX = useSpring(globalMouseX, { damping: 25, stiffness: 120, mass: 0.5 });
  const smoothY = useSpring(globalMouseY, { damping: 25, stiffness: 120, mass: 0.5 });

  // Center the 600px orb
  const translateX = useTransform(smoothX, (latest) => latest - 300);
  const translateY = useTransform(smoothY, (latest) => latest - 300);

  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-0 w-[600px] h-[600px] rounded-full mix-blend-screen opacity-15 md:opacity-20 hidden md:block"
      style={{
        x: translateX,
        y: translateY,
        background: 'radial-gradient(circle, rgba(0, 217, 255, 0.5) 0%, rgba(255, 107, 0, 0.1) 40%, transparent 70%)',
      }}
    />
  );
}
