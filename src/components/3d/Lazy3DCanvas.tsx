'use client';

import React, { useState, useEffect, useRef, ReactNode, Suspense } from 'react';
import { RotateCw } from 'lucide-react';

interface Lazy3DCanvasProps {
  children: ReactNode;
  fallbackText?: string;
  minHeight?: string | number;
  rootMargin?: string;
  className?: string;
}

export default function Lazy3DCanvas({
  children,
  fallbackText = 'INITIALIZING 3D ENGINE...',
  minHeight = '280px',
  rootMargin = '400px',
  className = 'w-full h-full relative',
}: Lazy3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      setHasMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          setHasMounted(true);
        } else {
          // Pause rendering when far out of viewport
          setIsInViewport(false);
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  const fallback = (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/80 bg-slate-950/60 rounded-2xl"
      style={{ minHeight }}
    >
      <RotateCw className="w-5 h-5 animate-spin text-primary" />
      <span className="text-[10px] font-mono font-bold tracking-wider">{fallbackText}</span>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight }}
    >
      <Suspense fallback={fallback}>
        {hasMounted && isInViewport ? (
          children
        ) : (
          fallback
        )}
      </Suspense>
    </div>
  );
}

