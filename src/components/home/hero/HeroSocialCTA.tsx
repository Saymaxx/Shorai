'use client';

import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SectionReveal from '@/components/animations/SectionReveal';

// High-fidelity vector brand icons
function LinkedInIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function YouTubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.41 4.81c.23.86.91 1.54 1.77 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42c.86-.23 1.54-.91 1.76-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}

function InstagramIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: 'LinkedIn',
    handle: '@shorai-stem',
    tag: 'Careers & Insights',
    icon: LinkedInIcon,
    url: 'https://linkedin.com',
    color: '#00d4ff',
    accentGlow: 'rgba(0, 212, 255, 0.35)',
    borderHover: 'hover:border-[#00d4ff]/60',
    bgHover: 'group-hover:bg-[#00d4ff]/15',
  },
  {
    name: 'YouTube',
    handle: '@ShoraiSTEM',
    tag: 'Robotics & AI Demos',
    icon: YouTubeIcon,
    url: 'https://youtube.com',
    color: '#FF0055',
    accentGlow: 'rgba(255, 0, 85, 0.35)',
    borderHover: 'hover:border-[#FF0055]/60',
    bgHover: 'group-hover:bg-[#FF0055]/15',
  },
  {
    name: 'Instagram',
    handle: '@shorai.labs',
    tag: 'Student Inventions',
    icon: InstagramIcon,
    url: 'https://instagram.com',
    color: '#FF2A85',
    accentGlow: 'rgba(255, 42, 133, 0.35)',
    borderHover: 'hover:border-[#FF2A85]/60',
    bgHover: 'group-hover:bg-[#FF2A85]/15',
  },
  {
    name: 'Facebook',
    handle: '@ShoraiEducation',
    tag: 'School Community',
    icon: FacebookIcon,
    url: 'https://facebook.com',
    color: '#1877F2',
    accentGlow: 'rgba(24, 119, 242, 0.35)',
    borderHover: 'hover:border-[#1877F2]/60',
    bgHover: 'group-hover:bg-[#1877F2]/15',
  },
];

export default function HeroSocialCTA() {
  return (
    <section className="relative z-20 w-full py-12 px-6 overflow-hidden bg-[#050505] border-y border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[150px] bg-[#00d4ff]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[40vw] h-[150px] bg-[#FF6B00]/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1440px] mx-auto">
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Subtle top laser line */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left Info / CTA message */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
              <SectionReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-3 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#00d4ff] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/80 uppercase">
                    CONNECT WITH SHORAI
                  </span>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                  JOIN OUR GLOBAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#8B5CF6] to-[#FF6B00]">STEM COMMUNITY.</span>
                </h3>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  Follow our live robotics labs, watch student AI projects, and receive weekly STEM innovation updates across our official channels.
                </p>
              </SectionReveal>
            </div>

            {/* Right Social Action Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full lg:w-auto">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <SectionReveal key={social.name} delay={0.1 + idx * 0.08}>
                    <MagneticWrapper>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="button"
                        data-cursor-text={social.name}
                        className={`group relative flex flex-col items-start justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 ${social.borderHover} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full sm:w-[150px] lg:w-[160px] min-h-[140px] overflow-hidden`}
                        style={{
                          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                      >
                        {/* Hover glow background */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${social.accentGlow} 0%, transparent 70%)`,
                          }}
                        />

                        {/* Top icon and link arrow */}
                        <div className="flex items-center justify-between w-full relative z-10">
                          <div
                            className={`w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${social.bgHover}`}
                          >
                            <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: social.color }} />
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>

                        {/* Bottom handle & title */}
                        <div className="relative z-10 mt-3 text-left">
                          <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-white transition-colors">
                            {social.name}
                          </h4>
                          <span className="text-[11px] font-mono text-white/50 block group-hover:text-white/80 transition-colors truncate">
                            {social.handle}
                          </span>
                        </div>
                      </a>
                    </MagneticWrapper>
                  </SectionReveal>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
