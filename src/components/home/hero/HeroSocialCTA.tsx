'use client';

import React from 'react';
import { ArrowUpRight, Sparkles, Users, Activity, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SectionReveal from '@/components/animations/SectionReveal';

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
    handle: '@shorai.in',
    tag: 'Careers & Insights',
    icon: LinkedInIcon,
    url: 'https://www.linkedin.com/company/shorai.in',
    color: '#0A66C2',
    bg: 'rgba(10, 102, 194, 0.1)',
    borderHover: 'hover:border-[#0A66C2]/60',
  },
  {
    name: 'YouTube',
    handle: '@ShoraiSTEM',
    tag: 'Robotics & AI Demos',
    icon: YouTubeIcon,
    url: 'https://youtube.com/@shorai-stem',
    color: '#FF0000',
    bg: 'rgba(255, 0, 0, 0.1)',
    borderHover: 'hover:border-[#FF0000]/60',
  },
  {
    name: 'Instagram',
    handle: '@shorai.in',
    tag: 'Student Inventions',
    icon: InstagramIcon,
    url: 'https://www.instagram.com/shorai.in?utm_source=qr&igsh=cW9odDRpemNqd2x2',
    color: '#E1306C',
    bg: 'rgba(225, 48, 108, 0.1)',
    borderHover: 'hover:border-[#E1306C]/60',
  },
  {
    name: 'Facebook',
    handle: '@ShoraiEducation',
    tag: 'School Community',
    icon: FacebookIcon,
    url: 'https://facebook.com',
    color: '#1877F2',
    bg: 'rgba(24, 119, 242, 0.1)',
    borderHover: 'hover:border-[#1877F2]/60',
  },
];

const tickerItems = [
  '⚡ 1000+ STUDENTS EMPOWERED',
  '🤖 50+ ACTIVE SCHOOL LABS',
  '🚀 100% NEP 2020 ALIGNED',
  '🧠 120+ AI & ML MODULES',
  '🏆 50+ NATIONAL STEM MEDALS',
  '🛸 AUTONOMOUS DRONE WORKSTATIONS',
  '💡 3D RAPID PROTOTYPING HUBS',
];

export default function HeroSocialCTA() {
  return (
    <section className="relative z-20 w-full py-8 px-4 sm:px-6 overflow-hidden bg-background border-y border-border transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-card border border-border shadow-sm mb-6">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left Info */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl">
              <SectionReveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  CONNECT WITH SHORAI
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground mb-2">
                  JOIN OUR GLOBAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">STEM COMMUNITY.</span>
                </h3>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Follow our live student robotics builds, watch AI project demos, and receive weekly STEM innovation updates.
                </p>
              </SectionReveal>
            </div>

            {/* Right Social Action Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full lg:w-auto">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <SectionReveal key={social.name} delay={0.08 * idx}>
                    <MagneticWrapper>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex flex-col items-start justify-between p-5 sm:p-6 rounded-3xl bg-card hover:bg-muted/50 border border-border ${social.borderHover} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl w-full sm:w-[170px] lg:w-[185px] min-h-[160px] overflow-hidden`}
                      >
                        {/* Top icon and link arrow */}
                        <div className="flex items-center justify-between w-full relative z-10">
                          <div
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-115 shadow-sm"
                            style={{ background: social.bg }}
                          >
                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300" style={{ color: social.color }} />
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                        </div>

                        {/* Bottom handle & title */}
                        <div className="relative z-10 mt-4 text-left">
                          <h4 className="text-base font-black text-foreground tracking-wide group-hover:text-primary transition-colors">
                            {social.name}
                          </h4>
                          <span className="text-xs font-mono text-muted-foreground block truncate mt-0.5">
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

        {/* ── MOTION GRAPHIC: Infinite Live Scrolling Marquee ── */}
        <div className="relative w-full overflow-hidden rounded-2xl py-3 bg-muted/30 border border-border/70 backdrop-blur-sm">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap min-w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs font-mono font-bold text-muted-foreground hover:text-primary transition-colors">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
