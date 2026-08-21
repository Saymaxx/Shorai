'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionReveal({ children, className, id, delay = 0 }: { children: ReactNode, className?: string, id?: string, delay?: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div id={id} ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
