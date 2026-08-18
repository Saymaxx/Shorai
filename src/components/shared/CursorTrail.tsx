'use client';

import { useEffect, useRef } from 'react';
import { globalMouseX, globalMouseY } from '@/lib/mouse';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: { x: number, y: number, age: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mx = globalMouseX.get();
      const my = globalMouseY.get();

      // Add new point
      points.push({ x: mx, y: my, age: 0 });

      // Update and draw points
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age += 1;

        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }

      // Draw the path
      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.4)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 217, 255, 0.8)';
        ctx.stroke();
      }

      // Filter out old points
      points = points.filter(p => p.age < 20);

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]" 
    />
  );
}
