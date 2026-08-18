'use client';

import { useEffect, useRef } from 'react';

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, r: number, alpha: number, vy: number, maxLife: number, life: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push(createParticle(true));
      }
    };

    const createParticle = (initial = false) => {
      return {
        x: Math.random() * canvas.width,
        y: initial ? Math.random() * canvas.height : canvas.height + 10,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        vy: Math.random() * -0.5 - 0.1,
        maxLife: Math.random() * 600 + 400,
        life: initial ? Math.random() * 400 : 0
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.life += 1;
        
        let currentAlpha = p.alpha;
        const progress = p.life / p.maxLife;
        if (progress > 0.8) {
          currentAlpha = p.alpha * (1 - (progress - 0.8) * 5); 
        }

        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = createParticle(false);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, currentAlpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      }

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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[4] pointer-events-none" />;
}
