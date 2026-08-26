'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  TrendingUp,
  User,
  X,
  Share2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Tag,
  Zap,
  Flame,
  Bookmark,
  Award,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Play,
  Pause,
  Eye,
  GraduationCap,
  Bot,
  Brain,
  Cpu,
  Rocket,
  Check,
  Target,
  LineChart,
  Building2,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { siteConfig } from '@/config/siteConfig';
import { defaultBlogData } from '@/config/defaultBlogData';
import { Author, ArticleCategory } from '@/types/blog';

const CATEGORY_COLORS: Record<string, { gradient: string; badge: string; border: string; glow: string; text: string }> = {
  'all': {
    gradient: 'from-[#7928CA] via-[#6366F1] to-[#00D4FF]',
    badge: 'bg-primary/10 text-primary border-primary/20',
    border: 'border-primary/40',
    glow: 'rgba(121,40,202,0.3)',
    text: 'text-primary'
  },
  'nep-2020-policy': {
    gradient: 'from-[#6366F1] to-[#00D4FF]',
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    border: 'border-indigo-500/40',
    glow: 'rgba(99,102,241,0.3)',
    text: 'text-indigo-400'
  },
  'robotics-ai-labs': {
    gradient: 'from-[#7928CA] to-[#EC4899]',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    border: 'border-purple-500/40',
    glow: 'rgba(121,40,202,0.3)',
    text: 'text-purple-400'
  },
  'pedagogy-curriculum': {
    gradient: 'from-[#10B981] to-[#00D4FF]',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    border: 'border-emerald-500/40',
    glow: 'rgba(16,185,129,0.3)',
    text: 'text-emerald-400'
  },
  'school-case-studies': {
    gradient: 'from-[#FF6B00] to-[#FF3D7F]',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    border: 'border-amber-500/40',
    glow: 'rgba(255,107,0,0.3)',
    text: 'text-amber-400'
  },
  'drone-aviation': {
    gradient: 'from-[#00D4FF] to-[#38BDF8]',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    border: 'border-cyan-500/40',
    glow: 'rgba(0,212,255,0.3)',
    text: 'text-cyan-400'
  }
};

const RESEARCH_TOPICS_MARQUEE = [
  'NEP 2020 Mandated Hands-On STEM',
  'Autonomous Drone Telemetry & ESCs',
  '360° School Ecosystem vs Vendor Kits',
  'Viksit Bharat @2047 Future Readiness',
  '5-Stage Progressive Learning Cycle',
  'CBSE Skill Subjects (Coding & AI)',
  'World Robot Olympiad (WRO) Pathways',
  'Turnkey 21-30 Day Lab Deployment'
];

const PEDAGOGY_STAGES = [
  {
    stage: '01',
    name: 'Pre-Primary (Grades 1–2)',
    focus: 'Curiosity & Confidence',
    color: 'from-purple-500 to-indigo-500',
    border: 'border-purple-500/40',
    icon: Sparkles,
    desc: 'Sensory STEM discovery, tangible block robotics, basic spatial mechanics, and color-coded logic that builds lifelong enthusiasm.',
    kitHighlight: 'Tactile Sensory Robotics & Basic Mechanics Kits',
    outcome: '100% Student Participation & Foundational Motor Skills'
  },
  {
    stage: '02',
    name: 'Primary (Grades 3–5)',
    focus: 'Interest & Exploration',
    color: 'from-indigo-500 to-cyan-500',
    border: 'border-indigo-500/40',
    icon: Bot,
    desc: 'Visual Scratch block programming, modular motor chassis, ultrasonic sensors, and foundational problem-solving through play.',
    kitHighlight: 'Modular Robotic Chassis & Sensor Kits',
    outcome: 'Self-Driven Creation of 10+ Interactive Working Models'
  },
  {
    stage: '03',
    name: 'Middle School (Grades 6–8)',
    focus: 'Skills & Understanding',
    color: 'from-cyan-500 to-emerald-500',
    border: 'border-cyan-500/40',
    icon: Cpu,
    desc: 'Python programming, Arduino & ESP32 microcontrollers, IoT sensor telemetry, and beginner drone aerodynamics.',
    kitHighlight: 'IoT Microcontrollers, Circuit Breadboards & Drone Kits',
    outcome: 'Working Smart Automation & Environmental IoT Projects'
  },
  {
    stage: '04',
    name: 'Secondary (Grades 9–10)',
    focus: 'Application & Innovation',
    color: 'from-amber-500 to-rose-500',
    border: 'border-amber-500/40',
    icon: Brain,
    desc: 'Machine learning computer vision, 3D CAD additive printing, autonomous line-following algorithms, and CBSE skill subjects.',
    kitHighlight: 'Edge AI Cameras, 3D Printers & Telemetry Kits',
    outcome: 'National Hackathon & ATL Innovation Showcase Entries'
  },
  {
    stage: '05',
    name: 'Senior Secondary (Grades 11–12)',
    focus: 'Expertise & Leadership',
    color: 'from-rose-500 to-purple-600',
    border: 'border-rose-500/40',
    icon: Rocket,
    desc: 'Advanced neural network models, patent-ready prototype development, World Robot Olympiad (WRO) participation, and venture pitch.',
    kitHighlight: 'Enterprise Drone Rig, Cloud AI LMS & Rapid Prototyping',
    outcome: 'Gold Medals in International Robotics Olympiads & IP Filing'
  }
];

export default function BlogPage() {
  usePageMeta(siteConfig.pages.blog);

  const [blogData, setBlogData] = useState(defaultBlogData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  
  // 5-Stage Progressive Pedagogy automated slideshow state
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isStageAutoPlaying, setIsStageAutoPlaying] = useState(true);
  const [isStageHovered, setIsStageHovered] = useState(false);
  const [stageProgress, setStageProgress] = useState(0);

  // Automated Featured Spotlight Carousel
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  // Load from local storage or backend if available
  useEffect(() => {
    try {
      const cached = localStorage.getItem('shorai_blog_data');
      if (cached) {
        setBlogData(JSON.parse(cached));
      }
    } catch { }

    fetch('/api/blog')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.articles) {
          setBlogData(data);
          localStorage.setItem('shorai_blog_data', JSON.stringify(data));
        }
      })
      .catch(() => { });
  }, []);

  const authorsMap = useMemo(() => {
    const map = new Map<string, Author>();
    blogData.authors.forEach(a => map.set(a.id, a));
    return map;
  }, [blogData.authors]);

  const featuredArticles = useMemo(() => {
    return blogData.articles.filter(a => a.status === 'published');
  }, [blogData.articles]);

  const currentFeatured = featuredArticles[activeFeaturedIndex] || featuredArticles[0];

  // Automated slideshow timer for 5-Stage Progressive Learning Cycle (pauses on hover)
  useEffect(() => {
    if (!isStageAutoPlaying || isStageHovered) return;

    const intervalTime = 4500;
    const stepTime = 50;
    let currentStep = 0;
    const totalSteps = intervalTime / stepTime;

    const timer = setInterval(() => {
      currentStep += 1;
      setStageProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        currentStep = 0;
        setStageProgress(0);
        setActiveStageIndex((prev) => (prev + 1) % PEDAGOGY_STAGES.length);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isStageAutoPlaying, isStageHovered, activeStageIndex]);

  // Auto-playing timer for featured article spotlight (pauses on hover)
  useEffect(() => {
    if (!isAutoPlaying || isFeaturedHovered || featuredArticles.length <= 1) return;

    const intervalTime = 5000;
    const stepTime = 50;
    let currentStep = 0;
    const totalSteps = intervalTime / stepTime;

    const timer = setInterval(() => {
      currentStep += 1;
      setSlideProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        currentStep = 0;
        setSlideProgress(0);
        setActiveFeaturedIndex((prev) => (prev + 1) % featuredArticles.length);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isFeaturedHovered, featuredArticles.length, activeFeaturedIndex]);

  const filteredArticles = useMemo(() => {
    return blogData.articles.filter(article => {
      if (article.status !== 'published') return false;

      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesAuthor = selectedAuthor === 'all' || article.authorId === selectedAuthor;

      return matchesCategory && matchesAuthor;
    });
  }, [blogData.articles, selectedCategory, selectedAuthor]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const activeStage = PEDAGOGY_STAGES[activeStageIndex];

  const handlePrevStage = () => {
    setStageProgress(0);
    setActiveStageIndex((prev) => (prev === 0 ? PEDAGOGY_STAGES.length - 1 : prev - 1));
  };

  const handleNextStage = () => {
    setStageProgress(0);
    setActiveStageIndex((prev) => (prev + 1) % PEDAGOGY_STAGES.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">

      {/* ── 1. CINEMATIC EDITORIAL HERO WITH FLOATING RESEARCH PRISMS ── */}
      <section className="relative pt-36 sm:pt-44 pb-16 overflow-hidden border-b border-border">
        {/* Giant Glowing SHORAI Text Watermark (Matching Contact Page) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[15vw] sm:text-[18vw] lg:text-[20vw] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#00D4FF]/20 via-[#7928CA]/15 to-transparent leading-none"
            style={{ 
              filter: 'blur(0.5px)',
              letterSpacing: '-0.05em',
              maxWidth: '100%'
            }}
          >
            SHORAI
          </motion.span>
        </div>

        {/* Holographic Glowing Orbs with hardware-accelerated rendering */}
        <div className="absolute inset-0 pointer-events-none will-change-transform">
          <div
            className="absolute top-10 left-1/3 w-[520px] h-[520px] bg-[#7928CA]/25 rounded-full blur-[130px] animate-pulse"
            style={{ animationDuration: '8s', transform: 'translateZ(0)' }}
          />
          <div
            className="absolute top-20 right-1/4 w-[480px] h-[480px] bg-[#00D4FF]/25 rounded-full blur-[130px] animate-pulse"
            style={{ animationDuration: '10s', transform: 'translateZ(0)' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800e_1px,transparent_1px),linear-gradient(to_bottom,#8080800e_1px,transparent_1px)] bg-[size:36px_36px]" />
        </div>

        {/* Flanking Interactive Research Highlights (Large Screens) */}
        <div className="hidden 2xl:block absolute left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <Link
            href="/blog/why-schools-need-stem-ecosystem"
            className="group relative block w-72 p-5 rounded-3xl bg-card/90 backdrop-blur-xl border-2 border-primary/40 hover:border-primary shadow-xl hover:shadow-[0_0_30px_rgba(121,40,202,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span className="text-[10px] font-mono font-black text-purple-400 uppercase tracking-wider">
                CORE RESEARCH // SEG ACADEMY
              </span>
            </div>
            <h4 className="text-xs font-black text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              Why Indian K-12 Schools Need a 360° STEM Ecosystem, Not Just Vendor Hardware Kits
            </h4>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/80 pt-2">
              <span>Mr. Sandip</span>
              <span className="text-cyan-400 font-bold flex items-center gap-0.5">Read Paper →</span>
            </div>
          </Link>
        </div>

        <div className="hidden 2xl:block absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <Link
            href="/blog/progressive-stem-learning-journey"
            className="group relative block w-72 p-5 rounded-3xl bg-card/90 backdrop-blur-xl border-2 border-cyan-400/40 hover:border-cyan-400 shadow-xl hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-wider">
                5-STAGE ROADMAP
              </span>
            </div>
            <h4 className="text-xs font-black text-foreground group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
              The 5-Stage Progressive Learning Journey: From Curiosity in Pre-Primary to Patent-Ready Innovation
            </h4>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/80 pt-2">
              <span>Mr. Asish</span>
              <span className="text-cyan-400 font-bold flex items-center gap-0.5">Read Paper →</span>
            </div>
          </Link>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            {/* Giant Headline */}
            <SectionReveal delay={0.08}>
              <h1
                className="font-black tracking-tight text-foreground mb-6 leading-[1.06]"
                style={{ fontSize: 'clamp(38px, 5.4vw, 72px)' }}
              >
                THOUGHT LEADERSHIP &amp; <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] drop-shadow-sm">
                  THE FUTURE OF EDUCATION.
                </span>
              </h1>
            </SectionReveal>

            {/* Subheading */}
            <SectionReveal delay={0.12}>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Curated research, blueprints, and implementation guides for Indian school trustees, principals, and curriculum coordinators.
              </p>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* ── 2. CONTINUOUS RESEARCH MARQUEE TAPE ── */}
      <div className="gallery-marquee-container py-3.5 px-4 bg-primary/10 border-b border-primary/20 overflow-hidden flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono font-black text-primary px-3.5 py-1 rounded-full bg-primary/20 flex-shrink-0 border border-primary/30 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>RESEARCH DISPATCH</span>
        </div>

        <div className="flex overflow-hidden whitespace-nowrap mask-gradient">
          <div className="gallery-marquee-left flex items-center gap-8 text-xs font-mono text-foreground font-semibold">
            {[...RESEARCH_TOPICS_MARQUEE, ...RESEARCH_TOPICS_MARQUEE].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 flex-shrink-0">
                <span className="text-foreground">{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. AUTOMATED 5-STAGE PROGRESSIVE LEARNING JOURNEY EXPLORER ── */}
      <section 
        onMouseEnter={() => setIsStageHovered(true)}
        onMouseLeave={() => setIsStageHovered(false)}
        className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-gradient-to-b from-background via-muted/15 to-background"
      >
        <div className="max-w-[1440px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-mono font-black">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>PEDAGOGY FLOW // LEARN → BUILD → TEST → SOLVE → PRESENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                5-Stage Progressive Learning Cycle
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Automatically cycling through each progressive grade band. Hover anywhere to pause and explore details.
              </p>
            </div>

            {/* Slideshow Controls */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={() => setIsStageAutoPlaying(!isStageAutoPlaying)}
                className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-mono font-bold flex items-center gap-1.5 hover:border-primary transition-colors shadow-sm"
              >
                {isStageAutoPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isStageAutoPlaying ? 'Pause Cycle' : 'Play Cycle'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevStage}
                  className="w-8 h-8 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors shadow-sm"
                  aria-label="Previous Stage"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-muted-foreground px-1.5">
                  {activeStageIndex + 1} / {PEDAGOGY_STAGES.length}
                </span>
                <button
                  onClick={handleNextStage}
                  className="w-8 h-8 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors shadow-sm"
                  aria-label="Next Stage"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Stage Selector Tabs with Dynamic Progress Fill */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8">
            {PEDAGOGY_STAGES.map((s, idx) => {
              const active = activeStageIndex === idx;
              const Icon = s.icon;
              return (
                <button
                  key={s.stage}
                  onClick={() => {
                    setStageProgress(0);
                    setActiveStageIndex(idx);
                  }}
                  className={`relative overflow-hidden px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 border ${
                    active
                      ? `bg-gradient-to-r ${s.color} text-white shadow-lg scale-105 border-white/20 font-black`
                      : 'bg-card hover:bg-muted text-muted-foreground border-border hover:text-foreground'
                  }`}
                >
                  {/* Active Tab Linear Progress Indicator */}
                  {active && isStageAutoPlaying && !isStageHovered && (
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-white/40 transition-all duration-75"
                      style={{ width: `${stageProgress}%` }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-primary'}`} />
                  <span>Stage {s.stage}: {s.focus}</span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Animated Bento Feature Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStageIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] shadow-[0_12px_40px_rgba(99,102,241,0.25)] max-w-4xl mx-auto overflow-hidden"
            >
              {/* Top Smooth Progress Bar */}
              {isStageAutoPlaying && !isStageHovered && (
                <div className="w-full h-1 bg-black/20">
                  <div 
                    className="h-full bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] transition-all duration-75"
                    style={{ width: `${stageProgress}%` }}
                  />
                </div>
              )}

              <div className="rounded-[2.4rem] bg-card p-6 sm:p-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-primary uppercase">
                      Stage {activeStage.stage} • {activeStage.name}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground mt-0.5">
                      {activeStage.focus}
                    </h3>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-muted/60 border border-border text-xs font-mono text-cyan-400 font-bold w-fit">
                    ⚡ Turnkey Lab Curriculum
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {activeStage.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-1">
                    <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      <span>Hardware &amp; Kits Spec</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-foreground">
                      {activeStage.kitHighlight}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-1">
                    <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Key Measurable Outcome</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400">
                      {activeStage.outcome}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── 4. AUTO-ADVANCING FEATURED ESSAY CAROUSEL WITH DYNAMIC PROGRESS ── */}
      {currentFeatured && (
        <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-border bg-gradient-to-b from-muted/20 to-background">
          <div className="max-w-[1440px] mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-black">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>FEATURED PUBLICATION // SPOTLIGHT ({activeFeaturedIndex + 1}/{featuredArticles.length})</span>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-mono font-bold flex items-center gap-1.5 hover:border-primary transition-colors"
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  <span>{isAutoPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <div className="flex items-center gap-1">
                  {featuredArticles.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveFeaturedIndex(idx);
                        setSlideProgress(0);
                      }}
                      className={`h-2 rounded-full transition-all ${activeFeaturedIndex === idx ? 'w-6 bg-primary' : 'w-2 bg-muted hover:bg-muted-foreground'
                        }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Glowing Gradient Container Frame with Hover Pause */}
            <div 
              onMouseEnter={() => setIsFeaturedHovered(true)}
              onMouseLeave={() => setIsFeaturedHovered(false)}
              className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] shadow-[0_12px_45px_rgba(99,102,241,0.25)]"
            >
              <div className="rounded-[2.4rem] bg-card overflow-hidden transition-all duration-300">
                
                {/* Progress bar */}
                {isAutoPlaying && (
                  <div className="w-full h-1 bg-muted">
                    <div 
                      className="h-full bg-gradient-to-r from-[#7928CA] to-[#00D4FF] transition-all duration-75"
                      style={{ width: `${slideProgress}%` }}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
                  
                  {/* Left Column: Image */}
                  <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border-2 border-border group bg-black">
                    <Image
                      src={currentFeatured.coverImage}
                      alt={currentFeatured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-white border border-white/20">
                      {currentFeatured.categoryName}
                    </div>
                  </div>

                  {/* Right Column: Editorial Text */}
                  <div className="lg:col-span-6 space-y-4">
                    
                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                      <span>{currentFeatured.publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        {currentFeatured.readingTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-tight">
                      {currentFeatured.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {currentFeatured.excerpt}
                    </p>

                    {/* Author Chip & CTA */}
                    <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-4">
                      {authorsMap.get(currentFeatured.authorId) && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden relative border border-primary/40">
                            <Image
                              src={authorsMap.get(currentFeatured.authorId)!.avatar}
                              alt={authorsMap.get(currentFeatured.authorId)!.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-foreground">
                              {authorsMap.get(currentFeatured.authorId)!.name}
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground">
                              {authorsMap.get(currentFeatured.authorId)!.role}
                            </div>
                          </div>
                        </div>
                      )}

                      <Link
                        href={`/blog/${currentFeatured.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white text-xs font-black shadow-lg hover:opacity-95 transition-all hover:scale-105"
                      >
                        <span>Read Full Publication</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── 5. FOUNDING EDITORIAL VOICES (AUTHORS SHOWCASE) ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-mono font-black">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>RESEARCH DIRECTORS &amp; PEDAGOGY LEADS</span>
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              Founding Editorial Leadership
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Penned by educators and robotics engineers driving innovation across 200+ Indian schools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogData.authors.map((author) => {
              const active = selectedAuthor === author.id;
              const articleCount = blogData.articles.filter(a => a.authorId === author.id).length;

              return (
                <div
                  key={author.id}
                  onClick={() => setSelectedAuthor(active ? 'all' : author.id)}
                  className={`p-6 rounded-[2rem] bg-card border-2 cursor-pointer transition-all duration-300 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                    active ? 'border-primary ring-2 ring-primary/40 scale-105' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden relative border-2 border-primary/40 flex-shrink-0 shadow-md">
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-foreground">{author.name}</h4>
                      <div className="text-[11px] font-mono text-primary font-bold">{author.role}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{articleCount} Research Papers</div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {author.bio}
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-mono">
                    <span className="text-muted-foreground">{author.designation.split(',')[0]}</span>
                    <span className={`font-bold ${active ? 'text-primary' : 'text-cyan-400'}`}>
                      {active ? 'Showing Papers ✓' : 'Filter Papers →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 6. VIKSIT BHARAT @2047 & KEY INSTITUTIONAL METRICS ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-border bg-muted/15">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            
            <div className="p-6 rounded-3xl bg-card border-2 border-border space-y-2 shadow-sm hover:border-purple-500/50 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">9/10</div>
              <div className="text-xs sm:text-sm font-bold text-foreground">Parents Demand STEM</div>
              <div className="text-[11px] text-muted-foreground leading-snug">Prioritize hands-on future tech skills over rote book learning</div>
            </div>

            <div className="p-6 rounded-3xl bg-card border-2 border-border space-y-2 shadow-sm hover:border-indigo-500/50 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono">77%</div>
              <div className="text-xs sm:text-sm font-bold text-foreground">Digital-First Jobs</div>
              <div className="text-[11px] text-muted-foreground leading-snug">Future careers will mandate AI, robotics &amp; digital intelligence</div>
            </div>

            <div className="p-6 rounded-3xl bg-card border-2 border-border space-y-2 shadow-sm hover:border-cyan-500/50 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">2×</div>
              <div className="text-xs sm:text-sm font-bold text-foreground">Career Likelihood</div>
              <div className="text-[11px] text-muted-foreground leading-snug">Higher STEM competition &amp; engineering career success</div>
            </div>

            <div className="p-6 rounded-3xl bg-card border-2 border-border space-y-2 shadow-sm hover:border-emerald-500/50 transition-all hover:scale-105">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">21-30</div>
              <div className="text-xs sm:text-sm font-bold text-foreground">Day Turnkey Delivery</div>
              <div className="text-[11px] text-muted-foreground leading-snug">Complete future-ready school innovation lab transformation</div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. ARTICLE BENTO ARCHIVE (FULL-BLEED WITH HOVER-ONLY INFO) ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-[1440px] mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-mono font-black text-primary uppercase tracking-widest">
                RESEARCH &amp; BLUEPRINTS ARCHIVE
              </span>
              <h2 className="text-3xl font-black text-foreground tracking-tight mt-0.5">
                {selectedAuthor !== 'all' 
                  ? `Publications by ${authorsMap.get(selectedAuthor)?.name} (${filteredArticles.length})` 
                  : 'Recent Publications'}
              </h2>
            </div>

            {selectedAuthor !== 'all' && (
              <button
                onClick={() => setSelectedAuthor('all')}
                className="text-xs font-mono text-primary font-bold hover:underline w-fit"
              >
                Clear Author Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {displayedArticles.map((article, aIdx) => {
              const author = authorsMap.get(article.authorId);
              const isBookmarked = bookmarkedIds.includes(article.id);

              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (aIdx % 3) * 0.08 }}
                >
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group block relative rounded-[2rem] bg-card border-2 border-border hover:border-primary/80 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                  >
                    {/* Full-Bleed Cover Image Container */}
                    <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-black w-full">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      {/* Top Bookmark Button */}
                      <button
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform z-10"
                        aria-label="Bookmark"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'text-amber-400 fill-amber-400' : 'text-white'}`} />
                      </button>

                      {/* Hover Info Reveal Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 sm:p-6 text-left">
                        <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="px-2.5 py-0.5 rounded-full bg-primary/80 text-white text-[10px] font-mono font-bold uppercase backdrop-blur-md">
                              {article.categoryName}
                            </span>
                            <span className="text-white/80 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-cyan-400" />
                              {article.readingTimeMinutes} min read
                            </span>
                          </div>

                          <h3 className="text-base font-black text-white leading-snug line-clamp-2">
                            {article.title}
                          </h3>

                          <p className="text-xs text-white/85 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>

                          {/* Author & Action */}
                          <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                            {author && (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden relative border border-white/40 flex-shrink-0">
                                  <Image
                                    src={author.avatar}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-[11px] font-bold text-white/90 truncate max-w-[120px]">
                                  {author.name}
                                </span>
                              </div>
                            )}
                            <span className="text-xs font-mono font-black text-cyan-400 flex items-center gap-1">
                              <span>Read Article</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Load More */}
          {filteredArticles.length > visibleCount && (
            <div className="text-center pt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-10 py-4 rounded-full bg-card border-2 border-primary hover:bg-primary text-foreground hover:text-white text-xs font-mono font-black transition-all shadow-md hover:scale-105"
              >
                Load More Insights ({filteredArticles.length - visibleCount} remaining)
              </button>
            </div>
          )}

        </div>
      </section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
