'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Bot, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  TrendingUp, 
  Target, 
  Building2, 
  Zap, 
  SlidersHorizontal,
  Compass,
  Laptop
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

interface ComparisonRow {
  id: string;
  feature: string;
  category: 'core' | 'support' | 'growth';
  icon: any;
  traditional: string;
  shorai: string;
  color: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    id: 'offering',
    feature: 'What they offer',
    category: 'core',
    icon: Layers,
    traditional: 'Just robotics kits / one-time workshops',
    shorai: 'End-to-end AI, Robotics, STEM, Coding & Innovation ecosystem',
    color: '#7928CA'
  },
  {
    id: 'trainer',
    feature: 'Trainer support',
    category: 'support',
    icon: Users,
    traditional: 'Occasional / visiting trainer',
    shorai: 'Dedicated on-ground trainers & mentors',
    color: '#00D4FF'
  },
  {
    id: 'curriculum',
    feature: 'Curriculum',
    category: 'core',
    icon: BookOpen,
    traditional: 'Generic content',
    shorai: 'Structured, grade-wise, NEP 2020-aligned curriculum',
    color: '#EC4899'
  },
  {
    id: 'lms',
    feature: 'Learning management',
    category: 'support',
    icon: Laptop,
    traditional: 'Not provided',
    shorai: 'AI-powered LMS with real-time tracking & reports',
    color: '#3B82F6'
  },
  {
    id: 'counselling',
    feature: 'Counselling & career guidance',
    category: 'growth',
    icon: Compass,
    traditional: 'Not included',
    shorai: 'Career mapping & soft-skills support',
    color: '#8B5CF6'
  },
  {
    id: 'teacher',
    feature: 'Teacher empowerment',
    category: 'support',
    icon: GraduationCap,
    traditional: 'Not provided',
    shorai: 'Continuous training, AI tools & certification',
    color: '#EA580C'
  },
  {
    id: 'parent',
    feature: 'Parent engagement',
    category: 'growth',
    icon: Users,
    traditional: 'Not included',
    shorai: 'Awareness sessions, workshops & updates',
    color: '#6366F1'
  },
  {
    id: 'competitions',
    feature: 'Competitions',
    category: 'growth',
    icon: Trophy,
    traditional: 'Not a focus',
    shorai: 'National & international competitions, hackathons',
    color: '#059669'
  },
  {
    id: 'branding',
    feature: 'School branding',
    category: 'growth',
    icon: Sparkles,
    traditional: 'Not provided',
    shorai: 'Media & social recognition support',
    color: '#E11D48'
  },
  {
    id: 'impact',
    feature: 'Long-term impact',
    category: 'core',
    icon: TrendingUp,
    traditional: 'Short-term activity',
    shorai: 'Future-ready students & a lasting innovation culture',
    color: '#FF6B00'
  }
];

export default function TransformationPartnerComparisonSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'support' | 'growth'>('all');
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { content } = useContent();
  const comp = content.schools.comparison;

  const filteredRows = activeCategory === 'all' 
    ? COMPARISON_DATA 
    : COMPARISON_DATA.filter(r => r.category === activeCategory);

  return (
    <section id="comparison" className="relative py-20 sm:py-28 bg-muted/20 overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── TOP 2-COLUMN HEADER: PHOTO LEFT + TITLE & TABS RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-18">
          
          {/* Left Column (5 Cols): Natural Indian Robotics Teacher Smart Classroom Photo */}
          <div className="lg:col-span-5 relative">
            <SectionReveal delay={0.05}>
              <div className="relative rounded-3xl overflow-hidden bg-card border-2 border-border shadow-2xl group">
                
                {/* Natural Photo Container */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="/images/robotics_teacher_smart_class.jpg"
                    alt="Indian robotics master teacher engaging students in smart innovation class"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* High Contrast Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-2 text-xs font-bold text-white font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>DEDICATED FACULTY</span>
                  </div>
                </div>

                {/* Floating Bottom Info Pill Over Photo */}
                <div className="p-4 sm:p-5 bg-card/90 backdrop-blur-md border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-foreground">
                      Full-Time Campus Master Trainer
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Continuous on-ground mentoring &amp; lab operations
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-mono text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>INCLUDED</span>
                  </div>
                </div>

              </div>
            </SectionReveal>
          </div>

          {/* Right Column (7 Cols): Heading, Subheading, Corner Accent & Category Filters */}
          <div className="lg:col-span-7 flex flex-col items-start relative">
            
            {/* Top-Right Decorative Geometric Corner Accent (Matching image) */}
            <div className="absolute -top-4 right-0 hidden sm:block pointer-events-none">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-primary">
                <path d="M40 8H16C11.5817 8 8 11.5817 8 16V40" stroke="url(#cornerGrad)" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="40" cy="8" r="3.5" fill="#FF6B00" />
                <defs>
                  <linearGradient id="cornerGrad" x1="8" y1="40" x2="40" y2="8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7928CA" />
                    <stop offset="1" stopColor="#FF6B00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Subheader Pill / Tag */}
            <SectionReveal>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-4 h-0.5 bg-primary" />
                <span className="text-xs font-mono font-black tracking-[0.2em] text-primary uppercase">
                  {comp.badge}
                </span>
              </div>
            </SectionReveal>

            {/* Main Headline */}
            <SectionReveal delay={0.08}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 leading-tight">
                {comp.title} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  {comp.titleGradient}
                </span>
              </h2>
            </SectionReveal>

            {/* Subtitle Description */}
            <SectionReveal delay={0.12}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium max-w-2xl mb-6">
                {comp.subtitle}
              </p>
            </SectionReveal>

            {/* Interactive Category Filter Pills */}
            <SectionReveal delay={0.16}>
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { id: 'all', label: 'All 10 Dimensions' },
                  { id: 'core', label: 'Core Pedagogy & Offering' },
                  { id: 'support', label: 'Trainer & LMS Support' },
                  { id: 'growth', label: 'Career, Competitions & Branding' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 ${
                      activeCategory === tab.id
                        ? 'bg-primary text-white border-primary shadow-md scale-105'
                        : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border-border'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </SectionReveal>

          </div>

        </div>

        {/* ── THE INTERACTIVE DECORATIVE COMPARISON TABLE ── */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl border-2 border-border/90 bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden mb-12">
            
            {/* Table Header Strip */}
            <div className="grid grid-cols-12 border-b-2 border-border/90 bg-muted/40 font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-muted-foreground">
              <div className="col-span-12 md:col-span-3 p-4 sm:p-5 flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                <span>FEATURE</span>
              </div>
              <div className="col-span-12 md:col-span-4 p-4 sm:p-5 border-t md:border-t-0 md:border-l border-border/80 text-muted-foreground/80 flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500/70" />
                <span>TRADITIONAL ROBOTICS COMPANY</span>
              </div>
              <div className="col-span-12 md:col-span-5 p-4 sm:p-5 border-t md:border-t-0 md:border-l-2 border-primary/40 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent text-primary flex items-center justify-between">
                <div className="flex items-center gap-2 font-black">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>SHORAI COMPLETE ECOSYSTEM</span>
                </div>
                <span className="hidden sm:inline px-2.5 py-0.5 rounded-full text-[10px] bg-primary/20 text-primary border border-primary/30 font-bold">
                  RECOMMENDED MODEL
                </span>
              </div>
            </div>

            {/* Table Body Rows */}
            <div className="divide-y divide-border/60">
              {filteredRows.map((row, idx) => {
                const Icon = row.icon;
                const isHovered = hoveredRowId === row.id;

                return (
                  <motion.div
                    key={row.id}
                    onMouseEnter={() => setHoveredRowId(row.id)}
                    onMouseLeave={() => setHoveredRowId(null)}
                    className={`grid grid-cols-12 transition-all duration-200 items-stretch ${
                      isHovered ? 'bg-muted/40' : idx % 2 === 1 ? 'bg-muted/15' : 'bg-transparent'
                    }`}
                  >
                    
                    {/* Col 1: Feature Name & Icon (3 Cols) */}
                    <div className="col-span-12 md:col-span-3 p-4 sm:p-5 flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm transition-transform duration-200"
                        style={{ backgroundColor: row.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-xs sm:text-sm font-black text-foreground leading-snug">
                        {row.feature}
                      </div>
                    </div>

                    {/* Col 2: Traditional Provider (4 Cols) */}
                    <div className="col-span-12 md:col-span-4 p-4 sm:p-5 border-t md:border-t-0 md:border-l border-border/80 flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground font-medium bg-rose-500/[0.02]">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 hidden sm:inline" />
                      <span className="leading-snug">{row.traditional}</span>
                    </div>

                    {/* Col 3: Shorai Complete Ecosystem (5 Cols - Glowing Highlight) */}
                    <div className={`col-span-12 md:col-span-5 p-4 sm:p-5 border-t md:border-t-0 md:border-l-2 border-primary/40 flex items-center justify-between gap-3 transition-colors duration-200 ${
                      isHovered ? 'bg-primary/10' : 'bg-primary/[0.03]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/40">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">
                          {row.shorai}
                        </span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Summary Bar Inside Table */}
            <div className="p-4 sm:p-5 bg-muted/60 border-t-2 border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>NEP 2020 Aligned &bull; Turnkey Institutional Transformation</span>
              </div>
              <div className="text-primary font-bold">
                100% Comprehensive Coverage across 10 Key Pillars
              </div>
            </div>

          </div>
        </SectionReveal>

        {/* ── HIGH-IMPACT PARTNERSHIP CALLOUT BANNER ── */}
        <SectionReveal delay={0.25}>
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg shrink-0">
                <Bot className="w-8 h-8 text-white animate-bounce" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 mb-1">
                  TRANSFORM YOUR SCHOOL TODAY
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight drop-shadow-md">
                  Choose a Partner Invested in Your Long-Term Legacy.
                </h3>
                <p className="text-xs sm:text-sm text-white/90 font-medium mt-1 max-w-xl">
                  Schedule an on-campus consultation to discover how Shorai seamlessly integrates into your existing timetable with zero faculty burnout.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto relative z-10">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full sm:w-auto px-8 h-13 rounded-2xl bg-white text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 hover:bg-white/95"
                >
                  <span>Book Transformation Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>
            </div>

          </div>
        </SectionReveal>

      </div>

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
