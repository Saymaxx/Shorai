'use client';

import React, { useState } from 'react';
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
  LucideIcon
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export interface EcosystemPillar {
  id: string;
  number: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  badge: string;
  deliverables: string[];
}

const pillars: EcosystemPillar[] = [
  {
    id: 'curriculum',
    number: 1,
    title: 'CURRICULUM',
    shortDesc: 'NEP Aligned, Industry Relevant & Future Focused',
    longDesc: 'Structured Grade 1-12 STEM curriculum bridging abstract school science and math with applied coding, electronics, kinematics, and artificial intelligence.',
    icon: BookOpen,
    color: '#8B5CF6',
    gradient: 'from-[#7928CA] to-[#8B5CF6]',
    badge: 'GRADE 1 - 12 PEDAGOGY',
    deliverables: ['CBSE & ICSE Aligned Courseware', 'Algorithmic Thinking & Coding', 'Hands-On Experiment Workbooks']
  },
  {
    id: 'robotics-lab',
    number: 2,
    title: 'ROBOTICS & INNOVATION LAB',
    shortDesc: 'State-of-the-art labs with advanced kits & safety standards',
    longDesc: 'Complete turnkey hardware infrastructure with certified microcontrollers, robotic arms, sensor packs, 3D printers, and drone flight testing equipment.',
    icon: Bot,
    color: '#EC4899',
    gradient: 'from-[#EC4899] to-[#F43F5E]',
    badge: 'TURNKEY HARDWARE',
    deliverables: ['ISO-Safety Certified Kits', 'Modular 3D Printing Station', 'Autonomous Drone Test Bays']
  },
  {
    id: 'ai-lms',
    number: 3,
    title: 'AI LEARNING PLATFORM (LMS)',
    shortDesc: 'Smart dashboards, real-time tracking & insights for all.',
    longDesc: 'Cloud-native student coding portal and school diagnostic dashboard providing live assessment telemetry, code auto-evaluations, and student portfolios.',
    icon: Laptop,
    color: '#F97316',
    gradient: 'from-[#EA580C] to-[#F97316]',
    badge: 'CLOUD INTELLIGENCE',
    deliverables: ['Instant Code Diagnostic Engine', 'Live Principal & Teacher Telemetry', 'Gamified Skill Streaks & Badges']
  },
  {
    id: 'teacher-empowerment',
    number: 4,
    title: 'TEACHER EMPOWERMENT',
    shortDesc: 'Training, resources & ongoing academic support.',
    longDesc: 'Continuous faculty upskilling bootcamps, lesson plan slides, grading rubrics, and 24/7 on-call engineering master trainers to support school educators.',
    icon: GraduationCap,
    color: '#EA580C',
    gradient: 'from-[#F97316] to-[#FB923C]',
    badge: 'FACULTY CERTIFICATION',
    deliverables: ['Accredited STEM Certification', 'Complete Lesson & Rubric Decks', '24/7 Dedicated Mentor Hotline']
  },
  {
    id: 'pbl',
    number: 5,
    title: 'PROJECT BASED LEARNING',
    shortDesc: 'Hands-on projects that build creativity & problem solving.',
    longDesc: 'Students tackle real societal challenges by designing smart irrigation systems, home automation hubs, autonomous rovers, and computer vision detectors.',
    icon: Lightbulb,
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#EAB308]',
    badge: '100% HANDS-ON',
    deliverables: ['Real-World Prototype Challenges', 'Design Thinking Framework', 'Interdisciplinary Problem Solving']
  },
  {
    id: 'competitions',
    number: 6,
    title: 'COMPETITIONS & HACKATHONS',
    shortDesc: 'National & international opportunities to showcase talent.',
    longDesc: 'Structured grooming for student teams to represent their school at the World Robot Olympiad (WRO), Atal Tinkering Marathons, and national robotics championships.',
    icon: Trophy,
    color: '#0D9488',
    gradient: 'from-[#0D9488] to-[#14B8A6]',
    badge: 'NATIONAL RECOGNITION',
    deliverables: ['Olympiad & WRO Mentorship', 'Annual Shorai Innovation Championship', 'Student Medals & Credentials']
  },
  {
    id: 'career-guidance',
    number: 7,
    title: 'CAREER GUIDANCE & COUNSELLING',
    shortDesc: 'Expert counselling, career mapping & soft skills development.',
    longDesc: 'Early exposure to future career trajectories in Aerospace, Machine Learning, Embedded IoT, and Robotics through masterclasses and verified student portfolios.',
    icon: Target,
    color: '#0284C7',
    gradient: 'from-[#0284C7] to-[#38BDF8]',
    badge: 'FUTURE HORIZONS',
    deliverables: ['Masterclasses with Tech Leaders', 'Early University Resume Portfolio', 'Industry Skill Pathways']
  },
  {
    id: 'parent-engagement',
    number: 8,
    title: 'PARENT ENGAGEMENT',
    shortDesc: 'Regular updates, awareness sessions & strong communication.',
    longDesc: 'Periodic progress reports and on-campus annual STEM Innovation Expos where parents witness live robot races, student inventions, and tangible progress.',
    icon: Users,
    color: '#6366F1',
    gradient: 'from-[#4F46E5] to-[#6366F1]',
    badge: 'COMMUNITY TRUST',
    deliverables: ['Annual Campus STEM Expo', 'Regular Digital Growth Reports', 'Parent Awareness Masterclasses']
  },
];

// Helper to calculate SVG path for annular sector (pie slice with inner radius)
function getDonutSlicePath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngleDeg: number,
  endAngleDeg: number
) {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const startAngle = toRad(startAngleDeg);
  const endAngle = toRad(endAngleDeg);

  const x1 = cx + rOuter * Math.cos(startAngle);
  const y1 = cy + rOuter * Math.sin(startAngle);
  const x2 = cx + rOuter * Math.cos(endAngle);
  const y2 = cy + rOuter * Math.sin(endAngle);

  const x3 = cx + rInner * Math.cos(endAngle);
  const y3 = cy + rInner * Math.sin(endAngle);
  const x4 = cx + rInner * Math.cos(startAngle);
  const y4 = cy + rInner * Math.sin(startAngle);

  const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
}

export default function Shorai360Ecosystem() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const activePillar = pillars[activeIdx];
  const ActiveIcon = activePillar.icon;

  // 8 segments = 45 degrees each. Start from top (-22.5 to 22.5) for Segment 1 (Curriculum)
  const segmentAngle = 45;
  const sliceGap = 1.8; // degrees gap between segments

  return (
    <section id="ecosystem" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] max-w-[700px] bg-primary/[0.03] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[50vw] h-[50vw] max-w-[700px] bg-secondary/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>360° INSTITUTIONAL BLUEPRINT</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              SHORAI 360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">EDUCATION ECOSYSTEM</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              A comprehensive, end-to-end framework that transforms school campuses into future-ready STEM &amp; AI innovation hubs.
            </p>
          </SectionReveal>
        </div>

        {/* ── Main Showcase: Radial Wheel Diagram (Left) + Detail Card (Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          
          {/* LEFT: Interactive 360° Radial Wheel (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <SectionReveal delay={0.1}>
              <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] max-w-full flex items-center justify-center select-none">
                
                {/* SVG 360 Wheel */}
                <svg viewBox="0 0 600 600" className="w-full h-full filter drop-shadow-2xl">
                  <defs>
                    {pillars.map((p) => (
                      <linearGradient key={p.id} id={`grad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={p.color} stopOpacity="1" />
                        <stop offset="100%" stopColor={p.color} stopOpacity="0.8" />
                      </linearGradient>
                    ))}
                    <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ffffff" floodOpacity="0.35" />
                    </filter>
                  </defs>

                  {/* Outer Ring & Slices */}
                  {pillars.map((pillar, idx) => {
                    const startAngle = idx * segmentAngle - 22.5 + sliceGap / 2;
                    const endAngle = (idx + 1) * segmentAngle - 22.5 - sliceGap / 2;
                    const isSelected = activeIdx === idx;

                    // Mid angle for placing icon & label
                    const midAngleDeg = idx * segmentAngle;
                    const midAngleRad = ((midAngleDeg - 90) * Math.PI) / 180;
                    const iconRadius = 215;
                    const textRadius = 150;

                    const iconX = 300 + iconRadius * Math.cos(midAngleRad);
                    const iconY = 300 + iconRadius * Math.sin(midAngleRad);
                    const textX = 300 + textRadius * Math.cos(midAngleRad);
                    const textY = 300 + textRadius * Math.sin(midAngleRad);

                    const IconComp = pillar.icon;

                    return (
                      <g
                        key={pillar.id}
                        className="cursor-pointer transition-all duration-300 group"
                        onClick={() => setActiveIdx(idx)}
                      >
                        {/* Slice Segment */}
                        <path
                          d={getDonutSlicePath(300, 300, isSelected ? 290 : 280, 110, startAngle, endAngle)}
                          fill={pillar.color}
                          opacity={isSelected ? 1 : 0.88}
                          stroke={isSelected ? '#ffffff' : 'rgba(255,255,255,0.25)'}
                          strokeWidth={isSelected ? 3 : 1.5}
                          className="transition-all duration-300 hover:opacity-100"
                          style={{
                            transformOrigin: '300px 300px',
                            transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                            filter: isSelected ? 'drop-shadow(0 0 12px rgba(0,0,0,0.3))' : 'none',
                          }}
                        />

                        {/* White Circular Icon Bubble */}
                        <circle
                          cx={iconX}
                          cy={iconY}
                          r={isSelected ? 24 : 20}
                          fill="#ffffff"
                          stroke={pillar.color}
                          strokeWidth={2.5}
                          className="shadow-md transition-all duration-300"
                        />

                        {/* ForeignObject Icon inside Bubble */}
                        <foreignObject
                          x={iconX - (isSelected ? 14 : 11)}
                          y={iconY - (isSelected ? 14 : 11)}
                          width={isSelected ? 28 : 22}
                          height={isSelected ? 28 : 22}
                          className="pointer-events-none"
                        >
                          <div 
                            className="w-full h-full flex items-center justify-center font-bold"
                            style={{ color: pillar.color }}
                          >
                            <IconComp className="w-full h-full" />
                          </div>
                        </foreignObject>

                        {/* Segment Title on Wheel */}
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#ffffff"
                          fontSize="9.5"
                          fontWeight="800"
                          letterSpacing="0.4px"
                          className="pointer-events-none drop-shadow-md select-none font-sans"
                        >
                          {pillar.title.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}

                  {/* Central Hub (School Transformation Badge) */}
                  <g className="select-none">
                    {/* Center White Circle */}
                    <circle
                      cx="300"
                      cy="300"
                      r="100"
                      fill="#ffffff"
                      stroke="#e2e8f0"
                      strokeWidth="3"
                      className="shadow-2xl"
                    />

                    {/* Gradient Logo "S" Icon Bubble */}
                    <foreignObject x="270" y="222" width="60" height="60">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7928CA] via-[#6366F1] to-[#00D4FF] flex items-center justify-center shadow-lg">
                          <span className="text-white font-black text-2xl tracking-tight">S</span>
                        </div>
                      </div>
                    </foreignObject>

                    {/* Center Texts */}
                    <text
                      x="300"
                      y="302"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#0f172a"
                      fontSize="17"
                      fontWeight="900"
                      letterSpacing="0.8px"
                      className="font-sans font-black"
                    >
                      SCHOOL
                    </text>

                    <text
                      x="300"
                      y="322"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#64748b"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="0.3px"
                      className="font-sans font-bold"
                    >
                      Future-Ready Transformation
                    </text>
                  </g>
                </svg>

              </div>
            </SectionReveal>
          </div>

          {/* RIGHT: Active Pillar Details Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <SectionReveal delay={0.2}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="p-7 sm:p-9 rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden"
                >
                  
                  {/* Subtle Top Gradient Accent */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ background: activePillar.color }}
                  />

                  {/* Header: Icon, Number, Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                        style={{ background: activePillar.color }}
                      >
                        <ActiveIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span 
                          className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider block w-max mb-1"
                          style={{ background: `${activePillar.color}15`, color: activePillar.color }}
                        >
                          {activePillar.badge}
                        </span>
                        <div className="text-xs font-mono font-bold text-muted-foreground">
                          PILLAR 0{activePillar.number} / 08
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-2 leading-tight">
                    {activePillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-primary mb-4">
                    {activePillar.shortDesc}
                  </p>

                  {/* Long Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
                    {activePillar.longDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-border mb-8">
                    <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      KEY DELIVERABLES &amp; IMPACT
                    </div>
                    {activePillar.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pillar Selector Pills */}
                  <div className="grid grid-cols-4 gap-1.5 mb-6">
                    {pillars.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => setActiveIdx(i)}
                        className={`p-2 rounded-xl text-center text-[10px] font-bold transition-all border ${
                          activeIdx === i
                            ? 'bg-primary/10 border-primary text-primary font-black shadow-sm'
                            : 'bg-muted/40 hover:bg-muted border-border text-muted-foreground'
                        }`}
                      >
                        0{p.number}
                      </button>
                    ))}
                  </div>

                  {/* CTA Action */}
                  <MagneticWrapper>
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                      <span>To know more about us contact us</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </MagneticWrapper>

                </motion.div>
              </AnimatePresence>
            </SectionReveal>
          </div>

        </div>

        {/* ── 8 Pillars Responsive Cards Grid (Mobile/Tablet Friendly) ────────── */}
        <div className="mt-16">
          <SectionReveal>
            <div className="text-center mb-10">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                ALL 8 PILLARS AT A GLANCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                Complete End-to-End Institutional Transformation
              </h3>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              const isCurrent = activeIdx === idx;

              return (
                <SectionReveal key={item.id} delay={0.05 * idx}>
                  <div
                    onClick={() => setActiveIdx(idx)}
                    className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer h-full flex flex-col justify-between group ${
                      isCurrent
                        ? 'bg-card border-primary ring-2 ring-primary/20 shadow-lg'
                        : 'bg-card/70 hover:bg-card border-border hover:border-primary/40 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div 
                          className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
                          style={{ background: item.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-muted-foreground">
                          0{item.number}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium mb-4">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-bold text-primary">
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
