'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Bot, 
  Laptop, 
  GraduationCap, 
  Lightbulb, 
  Trophy, 
  Target, 
  Users, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Quote,
  Zap,
  Globe,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

export interface EcosystemPillar {
  id: string;
  number: number;
  title: string;
  lines: string[];
  shortDesc: string;
  descLines: string[];
  icon: any;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  details: {
    keyBenefit: string;
    deliverable: string;
  };
}

const PILLARS: EcosystemPillar[] = [
  {
    id: 'curriculum',
    number: 1,
    title: 'CURRICULUM',
    lines: ['CURRICULUM'],
    shortDesc: 'NEP Aligned, Industry Relevant & Future Focused',
    descLines: ['NEP Aligned,', 'Industry Relevant', '& Future Focused'],
    icon: BookOpen,
    color: '#7C3AED',
    gradientFrom: '#8B5CF6',
    gradientTo: '#6D28D9',
    startAngle: -112.5,
    endAngle: -67.5,
    midAngle: -90,
    details: {
      keyBenefit: 'Grade-wise progression from Grade 1 to 12 with real-world context',
      deliverable: 'Physical workbooks, digital LMS guides, lesson plans & rubric assessments'
    }
  },
  {
    id: 'robotics-lab',
    number: 2,
    title: 'ROBOTICS & INNOVATION LAB',
    lines: ['ROBOTICS &', 'INNOVATION LAB'],
    shortDesc: 'State-of-the-art labs with advanced kits & safety standards',
    descLines: ['State-of-the-art labs', 'with advanced kits', '& safety standards'],
    icon: Bot,
    color: '#DB2777',
    gradientFrom: '#EC4899',
    gradientTo: '#BE185D',
    startAngle: -67.5,
    endAngle: -22.5,
    midAngle: -45,
    details: {
      keyBenefit: 'Turnkey on-campus lab with industrial microcontrollers and modular sensors',
      deliverable: 'Robotics kits, IoT hardware, 3D printers, safety stations & lab branding'
    }
  },
  {
    id: 'ai-lms',
    number: 3,
    title: 'AI LEARNING PLATFORM (LMS)',
    lines: ['AI LEARNING', 'PLATFORM (LMS)'],
    shortDesc: 'Smart dashboards, real-time tracking & insights for all.',
    descLines: ['Smart dashboards,', 'real-time tracking &', 'insights for all.'],
    icon: Laptop,
    color: '#E11D48',
    gradientFrom: '#F43F5E',
    gradientTo: '#BE123C',
    startAngle: -22.5,
    endAngle: 22.5,
    midAngle: 0,
    details: {
      keyBenefit: 'Automated student progress tracking with AI skill mapping and analytics',
      deliverable: 'Principal dashboard, teacher grading portal & parent progress view'
    }
  },
  {
    id: 'teacher-empowerment',
    number: 4,
    title: 'TEACHER EMPOWERMENT',
    lines: ['TEACHER', 'EMPOWERMENT'],
    shortDesc: 'Training, resources & ongoing academic support.',
    descLines: ['Training, resources', '& ongoing academic', 'support.'],
    icon: GraduationCap,
    color: '#EA580C',
    gradientFrom: '#F97316',
    gradientTo: '#C2410C',
    startAngle: 22.5,
    endAngle: 67.5,
    midAngle: 45,
    details: {
      keyBenefit: 'Continuous faculty capacity building to independently lead STEM classes',
      deliverable: 'Certified teacher training workshops, masterclasses & on-demand mentors'
    }
  },
  {
    id: 'pbl',
    number: 5,
    title: 'PROJECT BASED LEARNING',
    lines: ['PROJECT BASED', 'LEARNING'],
    shortDesc: 'Hands-on projects that build creativity & problem solving.',
    descLines: ['Hands-on projects', 'that build creativity', '& problem solving.'],
    icon: Lightbulb,
    color: '#D97706',
    gradientFrom: '#F59E0B',
    gradientTo: '#B45309',
    startAngle: 67.5,
    endAngle: 112.5,
    midAngle: 90,
    details: {
      keyBenefit: 'Real-world problem solving solving community and scientific challenges',
      deliverable: 'Over 120+ experiential projects spanning AI, Drones, IoT & Green Energy'
    }
  },
  {
    id: 'competitions',
    number: 6,
    title: 'COMPETITIONS & HACKATHONS',
    lines: ['COMPETITIONS &', 'HACKATHONS'],
    shortDesc: 'National & International opportunities to showcase talent.',
    descLines: ['National & International', 'opportunities to', 'showcase talent.'],
    icon: Trophy,
    color: '#0D9488',
    gradientFrom: '#06B6D4',
    gradientTo: '#0F766E',
    startAngle: 112.5,
    endAngle: 157.5,
    midAngle: 135,
    details: {
      keyBenefit: 'Prestigious student exposure at regional, national and global STEM olympiads',
      deliverable: 'Hackathon mentoring, project incubation & national competition sponsorship'
    }
  },
  {
    id: 'career-guidance',
    number: 7,
    title: 'CAREER GUIDANCE & COUNSELLING',
    lines: ['CAREER GUIDANCE &', 'COUNSELLING'],
    shortDesc: 'Expert counselling, career mapping & soft skills development.',
    descLines: ['Expert counselling,', 'career mapping &', 'soft skills development.'],
    icon: Target,
    color: '#2563EB',
    gradientFrom: '#3B82F6',
    gradientTo: '#1D4ED8',
    startAngle: 157.5,
    endAngle: 202.5,
    midAngle: 180,
    details: {
      keyBenefit: 'Structured career pathways into future tech fields like AI, Robotics & Space',
      deliverable: '1-on-1 career mapping, industry expert guest lectures & portfolio building'
    }
  },
  {
    id: 'parent-engagement',
    number: 8,
    title: 'PARENT ENGAGEMENT',
    lines: ['PARENT', 'ENGAGEMENT'],
    shortDesc: 'Regular updates, awareness sessions & strong communication.',
    descLines: ['Regular updates,', 'awareness sessions &', 'strong communication.'],
    icon: Users,
    color: '#4F46E5',
    gradientFrom: '#6366F1',
    gradientTo: '#4338CA',
    startAngle: 202.5,
    endAngle: 247.5,
    midAngle: 225,
    details: {
      keyBenefit: 'Building strong parent confidence through tangible evidence of student learning',
      deliverable: 'Termly innovation showcases, live parent workshops & digital milestone cards'
    }
  }
];

// Helper function to create SVG pie slice path
function createSlicePath(
  cx: number, 
  cy: number, 
  rIn: number, 
  rOut: number, 
  startDeg: number, 
  endDeg: number,
  gapDeg: number = 1.2
) {
  const sDeg = startDeg + gapDeg;
  const eDeg = endDeg - gapDeg;
  
  const rad = Math.PI / 180;
  const sRad = sDeg * rad;
  const eRad = eDeg * rad;
  
  const x1 = cx + rOut * Math.cos(sRad);
  const y1 = cy + rOut * Math.sin(sRad);
  const x2 = cx + rOut * Math.cos(eRad);
  const y2 = cy + rOut * Math.sin(eRad);
  
  const x3 = cx + rIn * Math.cos(eRad);
  const y3 = cy + rIn * Math.sin(eRad);
  const x4 = cx + rIn * Math.cos(sRad);
  const y4 = cy + rIn * Math.sin(sRad);
  
  const largeArc = eDeg - sDeg > 180 ? 1 : 0;
  
  return `M ${x4} ${y4} L ${x1} ${y1} A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 ${largeArc} 0 ${x4} ${y4} Z`;
}

export default function Shorai360Ecosystem() {
  const [activePillarIdx, setActivePillarIdx] = useState<number>(0);
  const [hoveredPillarIdx, setHoveredPillarIdx] = useState<number | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const { content } = useContent();
  const eco = content.whyShorai.ecosystem360;

  const currentIdx = hoveredPillarIdx !== null ? hoveredPillarIdx : activePillarIdx;
  const currentPillar = PILLARS[currentIdx];

  // SVG wheel geometry constants
  const size = 660;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 265;
  const rInner = 112;
  const rIcon = 275;
  const rText = 188;
  const rDesc = 152;
  const rDot = 126;

  return (
    <section id="shorai-360-ecosystem" className="relative py-20 sm:py-28 bg-background overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-[55vw] h-[55vw] max-w-[650px] bg-primary/[0.04] rounded-full blur-[40px] md:blur-[120px]" />
        <div className="absolute bottom-[15%] right-[8%] w-[50vw] h-[50vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[40px] md:blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-[700px] h-80 md:h-[700px] bg-accent/[0.02] rounded-full blur-[40px] md:blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── TOP HEADER: TITLE + SUBTITLE ── */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          
          <SectionReveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 leading-tight">
              {eco.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00]">
                {eco.titleGradient}
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="text-base sm:text-xl text-muted-foreground font-medium mb-3 max-w-2xl mx-auto">
              {eco.subtitle}
            </p>
            <div className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
              One Partner. Endless Possibilities.
            </div>
          </SectionReveal>

        </div>

        {/* ── 360° 8-SPOKE CIRCULAR WHEEL & DETAILS SHOWCASE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14 sm:mb-18">
          
          {/* Left Column (7 Cols): Authentic 360° Circular Ecosystem Wheel */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Interactive 3D SVG Circular Infographic Wheel */}
            <div className="relative w-full max-w-[580px] aspect-square flex items-center justify-center select-none">
              
              {/* Outer decorative halo ring */}
              <div 
                className="absolute inset-2 rounded-full transition-all duration-700 pointer-events-none opacity-40 blur-xl"
                style={{ backgroundColor: currentPillar.color }}
              />

              <svg
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                <defs>
                  {/* Radial gradients for each slice */}
                  {PILLARS.map((p, idx) => (
                    <linearGradient
                      key={`grad-${p.id}`}
                      id={`grad-${p.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={p.gradientFrom} />
                      <stop offset="100%" stopColor={p.gradientTo} />
                    </linearGradient>
                  ))}

                  {/* Drop Shadow filter for center hub */}
                  <filter id="hub-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.25" />
                  </filter>
                  
                  {/* Drop Shadow for outer badges */}
                  <filter id="badge-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.2" />
                  </filter>
                </defs>

                {/* Background Outer Border Ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={rOuter + 3}
                  fill="none"
                  stroke="currentColor"
                  className="text-border/60"
                  strokeWidth="2"
                />

                {/* 8 Radial Slices */}
                {PILLARS.map((p, idx) => {
                  const isHovered = hoveredPillarIdx === idx;
                  const isActive = activePillarIdx === idx;
                  const isCurrent = currentIdx === idx;
                  
                  const path = createSlicePath(cx, cy, rInner, rOuter, p.startAngle, p.endAngle, 1.2);
                  
                  // Text and dot coordinates
                  const rad = p.midAngle * (Math.PI / 180);
                  
                  // Title position
                  const tx = cx + rText * Math.cos(rad);
                  const ty = cy + rText * Math.sin(rad);

                  // Dot position
                  const dx = cx + rDot * Math.cos(rad);
                  const dy = cy + rDot * Math.sin(rad);

                  return (
                    <g
                      key={p.id}
                      onClick={() => setActivePillarIdx(idx)}
                      onMouseEnter={() => setHoveredPillarIdx(idx)}
                      onMouseLeave={() => setHoveredPillarIdx(null)}
                      className="cursor-pointer transition-all duration-300 group"
                      style={{
                        transformOrigin: `${cx}px ${cy}px`,
                        transform: isCurrent ? `scale(1.025)` : 'scale(1)',
                        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      {/* Wedge Slice */}
                      <path
                        d={path}
                        fill={`url(#grad-${p.id})`}
                        className="transition-all duration-300"
                        style={{
                          filter: isCurrent ? 'brightness(1.12) drop-shadow(0 0 16px rgba(255,255,255,0.4))' : 'brightness(0.98)',
                          stroke: isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                          strokeWidth: isCurrent ? 2.5 : 1
                        }}
                      />

                      {/* Little Inner Dot Separator */}
                      <circle
                        cx={dx}
                        cy={dy}
                        r={isCurrent ? 4 : 3}
                        fill="#FFFFFF"
                        className="transition-all duration-300"
                        opacity={isCurrent ? 1 : 0.85}
                      />

                      {/* Pillar Title Inside Slice */}
                      <text
                        x={tx}
                        y={ty}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#FFFFFF"
                        className="font-black tracking-wider text-[11px] sm:text-[12px] select-none pointer-events-none"
                        style={{
                          textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                          fontWeight: 900
                        }}
                      >
                        {p.lines.map((line, lIdx) => (
                          <tspan
                            key={lIdx}
                            x={tx}
                            dy={lIdx === 0 ? (p.lines.length > 1 ? '-0.55em' : '0.3em') : '1.15em'}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                {/* Outer Circular Icon Badges along perimeter */}
                {PILLARS.map((p, idx) => {
                  const Icon = p.icon;
                  const rad = p.midAngle * (Math.PI / 180);
                  const bx = cx + (rOuter + 14) * Math.cos(rad);
                  const by = cy + (rOuter + 14) * Math.sin(rad);
                  const isCurrent = currentIdx === idx;

                  return (
                    <g
                      key={`badge-${p.id}`}
                      onClick={() => setActivePillarIdx(idx)}
                      onMouseEnter={() => setHoveredPillarIdx(idx)}
                      onMouseLeave={() => setHoveredPillarIdx(null)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      {/* Outer White Badge Circle */}
                      <circle
                        cx={bx}
                        cy={by}
                        r={isCurrent ? 24 : 20}
                        fill="#FFFFFF"
                        stroke={p.color}
                        strokeWidth={isCurrent ? 3.5 : 2.5}
                        filter="url(#badge-shadow)"
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

                {/* ── Central White 3D Glossy Hub ── */}
                <g filter="url(#hub-shadow)">
                  {/* Outer Hub Ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rInner + 4}
                    fill="#FFFFFF"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                    className="dark:fill-[#0B0F19] dark:stroke-slate-700/80"
                  />
                  
                  {/* Inner Hub Disc with Subtle Gradient */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rInner}
                    fill="#FFFFFF"
                    className="dark:fill-[#0F172A]"
                  />
                </g>
              </svg>

              {/* ── Center Hub Official Shorai Logo Emblem ── */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
                style={{ zIndex: 10 }}
              >
                {/* Official Circular Logo */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-white dark:bg-[#0B0F19] shadow-[0_8px_30px_rgba(121,40,202,0.4)] border-2 border-primary/40 flex items-center justify-center transition-transform duration-300">
                  <img 
                    src="/images/shorai_logo.png" 
                    alt="SHORAI - Building Future Innovators with AI & Robotics" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>

              {/* Outer HTML Floating Icons Overlay for perfect rendering */}
              {PILLARS.map((p, idx) => {
                const Icon = p.icon;
                const rad = p.midAngle * (Math.PI / 180);
                // Normalized position 0 to 1
                const nx = (cx + (rOuter + 14) * Math.cos(rad)) / size;
                const ny = (cy + (rOuter + 14) * Math.sin(rad)) / size;
                const isCurrent = currentIdx === idx;

                return (
                  <div
                    key={`html-icon-${p.id}`}
                    onClick={() => setActivePillarIdx(idx)}
                    onMouseEnter={() => setHoveredPillarIdx(idx)}
                    onMouseLeave={() => setHoveredPillarIdx(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-all duration-300"
                    style={{
                      left: `${nx * 100}%`,
                      top: `${ny * 100}%`,
                    }}
                  >
                    <div 
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-slate-900 border-2 flex items-center justify-center shadow-lg transition-transform duration-300 ${
                        isCurrent ? 'scale-125 ring-4' : 'scale-100 hover:scale-110'
                      }`}
                      style={{ 
                        borderColor: p.color,
                        boxShadow: isCurrent ? `0 0 20px ${p.color}60` : undefined
                      }}
                    >
                      <Icon 
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-colors"
                        style={{ color: p.color }}
                      />
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Mobile Touch Instruction Note */}
            <p className="text-[11px] font-mono text-muted-foreground mt-4 text-center">
              💡 Tap or hover any spoke on the wheel to explore its full school deliverables.
            </p>

          </div>

          {/* Right Column (5 Cols): Dynamic Active Pillar Inspector & Callouts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Active Pillar Highlight Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl p-6 sm:p-8 bg-card border-2 shadow-xl relative overflow-hidden"
                style={{ borderColor: `${currentPillar.color}50` }}
              >
                {/* Accent Top Border Strip */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: currentPillar.color }}
                />

                <div className="flex items-center justify-between mb-4 mt-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-sm" style={{ backgroundColor: currentPillar.color }}>
                    <span>PILLAR 0{currentPillar.number} OF 08</span>
                  </div>

                  <div className="text-xs font-mono font-bold text-muted-foreground">
                    SHORAI 360° WHEEL
                  </div>
                </div>

                <h3 
                  className="text-2xl sm:text-3xl font-black tracking-tight mb-2 uppercase"
                  style={{ color: currentPillar.color }}
                >
                  {currentPillar.title}
                </h3>

                <p className="text-base sm:text-lg font-bold text-foreground mb-4 leading-snug">
                  {currentPillar.shortDesc}
                </p>

                <div className="space-y-3 pt-3 border-t border-border mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentPillar.color }} />
                    <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                      <strong className="font-bold text-foreground">Core Impact:</strong> {currentPillar.details.keyBenefit}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentPillar.color }} />
                    <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                      <strong className="font-bold text-foreground">Inclusions:</strong> {currentPillar.details.deliverable}
                    </span>
                  </div>
                </div>

                <MagneticWrapper>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full py-3 px-5 rounded-2xl text-white font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${currentPillar.gradientFrom}, ${currentPillar.gradientTo})`
                    }}
                  >
                    <span>Request {currentPillar.title} Implementation Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticWrapper>
              </motion.div>
            </AnimatePresence>

            {/* WHAT MAKES IT POWERFUL? Banner (Exact match with image context) */}
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#FF3D7F] via-[#FF6B00] to-[#EA580C] text-white shadow-2xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/25 text-white font-mono font-black text-xs uppercase mb-3 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHAT MAKES IT POWERFUL?</span>
              </div>

              <p className="text-sm sm:text-base font-bold leading-relaxed drop-shadow-sm">
                Shorai 360° Education Ecosystem is a complete, end-to-end solution that transforms schools into future-ready learning environments. From advanced technology education and modern lab infrastructure to teacher empowerment, student development, and digital learning, Shorai delivers everything through one trusted partner.
              </p>
            </div>

          </div>

        </div>

        {/* ── BOTTOM BANNER: TOGETHER, LET'S BUILD FUTURE-READY SCHOOLS ── */}
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00] text-white shadow-xl flex flex-wrap items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-3">
            <Quote className="w-6 h-6 text-amber-300 shrink-0 rotate-180" />
            <div className="text-base sm:text-xl lg:text-2xl font-black tracking-tight drop-shadow-md">
              Together, Let&apos;s Build Future-Ready Schools <span className="text-amber-300 italic font-serif">for Future-Ready India.</span>
            </div>
          </div>

          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 h-11 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105 hover:bg-white/95"
            >
              <span>Explore 360° Lab Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
