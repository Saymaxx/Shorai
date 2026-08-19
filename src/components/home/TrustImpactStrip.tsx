'use client';

import { motion } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';
import { Cpu, Bot, Code2, Plane } from 'lucide-react';

const categories = [
  { title: 'AI', desc: 'Artificial Intelligence', icon: Cpu, accent: '#00d4ff' },
  { title: 'ROBOTICS', desc: 'Build & Automate', icon: Bot, accent: '#FF6B00' },
  { title: 'CODING', desc: 'Think & Create', icon: Code2, accent: '#7B2DFF' },
  { title: 'DRONES', desc: 'Explore & Engineer', icon: Plane, accent: '#FF6B00' },
];

export default function TrustImpactStrip() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'rgba(8,12,22,0.98)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-6 h-px bg-[#00d4ff]/40" />
              <span className="section-number">THE FUTURE IS NOW</span>
              <div className="w-6 h-px bg-[#00d4ff]/40" />
            </div>
            <h2
              className="font-black tracking-tight text-white mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05 }}
            >
              THE CLASSROOM IS CHANGING.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="text-[16px] text-white/45 max-w-xl mx-auto leading-relaxed">
              Technology is no longer just something students use.{' '}
              <span className="text-white/70 font-medium">
                It&apos;s something they build and shape.
              </span>
            </p>
          </SectionReveal>
        </div>

        {/* Category pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <SectionReveal key={cat.title} delay={0.15 + i * 0.1}>
              <div
                className="flex flex-col items-center text-center group cursor-default rounded-2xl p-6 transition-all duration-400"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110"
                  style={{
                    background: `${cat.accent}12`,
                    border: `1px solid ${cat.accent}25`,
                    boxShadow: `0 0 0 0 ${cat.accent}00`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${cat.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${cat.accent}00`;
                  }}
                >
                  <cat.icon className="w-6 h-6" style={{ color: cat.accent }} />
                </div>
                <h3 className="text-sm font-black tracking-[0.2em] text-white mb-1.5">{cat.title}</h3>
                <p className="text-[12px] text-white/35 font-mono tracking-wide">{cat.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-px bg-gradient-to-r from-transparent via-[#FF6B00]/20 to-transparent" />
    </section>
  );
}
