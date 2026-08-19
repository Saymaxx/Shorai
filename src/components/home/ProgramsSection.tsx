'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Bot, Code2, Plane } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

const programs = [
  {
    id: 'ai-program',
    number: '01',
    title: 'ARTIFICIAL\nINTELLIGENCE',
    shortTitle: 'AI',
    desc: 'Learn how machines think, learn and make decisions with real neural networks.',
    cta: 'Explore AI',
    accentColor: '#00d4ff',
    icon: Cpu,
    image: '/assets/ai_brain_3d_1785409079051.png',
  },
  {
    id: 'robotics-program',
    number: '02',
    title: 'ROBOTICS',
    shortTitle: 'ROBOTICS',
    desc: 'Design, build and program intelligent machines with hands-on kits.',
    cta: 'Explore Robotics',
    accentColor: '#FF6B00',
    icon: Bot,
    image: '/assets/robotics_3d_1785409091384.png',
  },
  {
    id: 'coding-program',
    number: '03',
    title: 'CODING &\nSOFTWARE',
    shortTitle: 'CODING',
    desc: 'Turn ideas into software, systems and intelligent solutions.',
    cta: 'Explore Coding',
    accentColor: '#7B2DFF',
    icon: Code2,
    image: '/assets/kids_learning_3d_1785409112448.png',
  },
  {
    id: 'drones-program',
    number: '04',
    title: 'DRONE\nTECHNOLOGY',
    shortTitle: 'DRONES',
    desc: 'Understand flight, automation, sensors and autonomous aerial navigation.',
    cta: 'Explore Drones',
    accentColor: '#FF6B00',
    icon: Plane,
    image: '/assets/drone_3d_1785409102213.png',
  },
];

function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setTilt({ x, y });
    const sx = ((e.clientX - rect.left) / rect.width) * 100;
    const sy = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x: sx, y: sy, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <SectionReveal delay={index * 0.1}>
      <div
        ref={cardRef}
        id={program.id}
        className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer"
        style={{
          transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.12s ease-out',
          background: 'rgba(8,14,26,0.95)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Program image — revealed on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40 opacity-20"
          style={{
            backgroundImage: `url(${program.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />

        {/* Spotlight hover effect */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 200px at ${spotlight.x}% ${spotlight.y}%, ${program.accentColor}18 0%, transparent 70%)`,
            opacity: spotlight.opacity,
          }}
        />

        {/* Bottom gradient for content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/70 to-transparent" />

        {/* Hover border accent */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ border: `1px solid ${program.accentColor}35` }}
        />

        {/* Number + icon — top-left */}
        <div className="absolute top-5 left-5 flex items-center gap-2.5">
          <span
            className="text-[11px] font-mono font-bold tracking-[0.25em]"
            style={{ color: `${program.accentColor}70` }}
          >
            {program.number}
          </span>
          <div
            className="w-px h-3 opacity-30"
            style={{ background: program.accentColor }}
          />
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: `${program.accentColor}15`,
              border: `1px solid ${program.accentColor}30`,
            }}
          >
            <program.icon className="w-3.5 h-3.5" style={{ color: program.accentColor }} />
          </div>
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Title */}
          <h3
            className="text-2xl md:text-[26px] font-black tracking-tight text-white mb-2 leading-tight whitespace-pre-line"
          >
            {program.title}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-white/45 leading-relaxed mb-5 max-w-[280px]">
            {program.desc}
          </p>

          {/* CTA */}
          <div
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 group-hover:gap-2.5"
            style={{ color: program.accentColor }}
          >
            <span>{program.cta}</span>
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{
                background: `${program.accentColor}20`,
                border: `1px solid ${program.accentColor}40`,
              }}
            >
              <ArrowUpRight className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-28 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section identity */}
        <SectionReveal>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-6 h-px bg-[#00d4ff]/40" />
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#00d4ff]/60 uppercase">
                04 // PROGRAMS
              </span>
              <div className="w-6 h-px bg-[#00d4ff]/40" />
            </div>
            <h2
              className="font-black tracking-tight text-white mb-4"
              style={{ fontSize: 'clamp(34px, 4.5vw, 56px)', lineHeight: 1.05 }}
            >
              LEARN WHAT THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#00d4ff]">
                FUTURE NEEDS.
              </span>
            </h2>
            <p className="text-white/45 text-[15px] max-w-md font-normal leading-relaxed">
              Four disciplines. One platform. Built for the next generation of builders.
            </p>
          </div>
        </SectionReveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {programs.map((program, i) => (
            <ProgramCard key={program.id} program={program} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
