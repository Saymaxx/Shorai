'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className }: { children: string, className?: string }) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const words = textRef.current.querySelectorAll('.reveal-word');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(words, 
        { y: 50, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  const words = children.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden pb-2 mr-2">
      <span className="reveal-word inline-block origin-bottom">{word}</span>
    </span>
  ));

  return (
    <div ref={textRef} className={className}>
      {words}
    </div>
  );
}
