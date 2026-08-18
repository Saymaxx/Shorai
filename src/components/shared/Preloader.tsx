'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // GSAP Reveal Animation
        const tl = gsap.timeline({
          onComplete: () => setIsComplete(true)
        });
        
        tl.to(textRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut"
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut"
        }, "-=0.4");
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0A1022] overflow-hidden"
    >
      <div ref={textRef} className="flex flex-col items-center gap-4">
        <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#FF6B00]">
          {progress}%
        </div>
        <div className="text-[#B8C0D0] tracking-[0.3em] text-sm uppercase">
          Initializing Systems
        </div>
      </div>
    </div>
  );
}
