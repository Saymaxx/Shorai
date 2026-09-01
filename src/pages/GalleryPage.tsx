'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Share2,
  Check,
  ArrowRight,
  Building2,
  Layers,
  Award,
  Maximize2,
  SlidersHorizontal,
  Bot,
  Plane,
  Code2,
  GraduationCap,
  Zap,
  Eye,
  Camera,
  Activity,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  Play,
  Pause,
  Radio,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { siteConfig } from '@/config/siteConfig';
import { defaultGalleryData } from '@/config/defaultGalleryData';
import { GalleryItem, ExperienceCategory, CampusStoryAlbum } from '@/types/gallery';

const CATEGORY_TABS: {
  id: ExperienceCategory;
  label: string;
  icon: any;
  color: string;
  glow: string;
  borderActive: string;
  badgeBg: string;
}[] = [
    {
      id: 'all',
      label: 'All Moments',
      icon: Layers,
      color: 'from-[#7928CA] to-[#00D4FF]',
      glow: 'rgba(99, 102, 241, 0.4)',
      borderActive: 'border-primary',
      badgeBg: 'bg-primary/20 text-primary'
    },
    {
      id: 'robotics_ai',
      label: 'Robotics & AI',
      icon: Bot,
      color: 'from-[#7928CA] to-[#9333EA]',
      glow: 'rgba(147, 51, 234, 0.4)',
      borderActive: 'border-purple-500',
      badgeBg: 'bg-purple-500/20 text-purple-400'
    },
    {
      id: 'drone_aviation',
      label: 'Drone & Aviation',
      icon: Plane,
      color: 'from-[#00D4FF] to-[#0284C7]',
      glow: 'rgba(0, 212, 255, 0.4)',
      borderActive: 'border-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-400'
    },
    {
      id: 'coding_stem',
      label: 'Coding & STEM',
      icon: Code2,
      color: 'from-[#10B981] to-[#059669]',
      glow: 'rgba(16, 185, 129, 0.4)',
      borderActive: 'border-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      id: 'inaugurations_atl',
      label: 'School Launches',
      icon: Building2,
      color: 'from-[#F59E0B] to-[#D97706]',
      glow: 'rgba(245, 158, 11, 0.4)',
      borderActive: 'border-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-400'
    },
    {
      id: 'competitions_wro',
      label: 'Competitions & WRO',
      icon: Award,
      color: 'from-[#F43F5E] to-[#E11D48]',
      glow: 'rgba(244, 63, 94, 0.4)',
      borderActive: 'border-rose-400',
      badgeBg: 'bg-rose-500/20 text-rose-400'
    },
    {
      id: 'workshops_training',
      label: 'Faculty Training',
      icon: GraduationCap,
      color: 'from-[#6366F1] to-[#4F46E5]',
      glow: 'rgba(99, 102, 241, 0.4)',
      borderActive: 'border-indigo-400',
      badgeBg: 'bg-indigo-500/20 text-indigo-400'
    },
  ];

const LIVE_DISPATCHES = [
  '⚡ DPS Varanasi: Grade 8 students successfully programmed a 6-axis AI robotic arm for object classification.',
  '✈️ Lucknow Public Collegiate: 42 students flight-tested autonomous telemetry drones on campus grounds.',
  '🤖 Shorai Kolkata STEM Hub: 15-school robotics challenge completed with 120 custom robot entries.',
  '🏆 Heritage Global School: First prize in Regional Atal Tinkering Marathon 2026 for solar-powered micro-rover.',
  '🔬 Modern Academy Noida: 30 new IoT smart sensors deployed across Grade 6-10 STEM physics labs.',
];

export default function GalleryPage() {
  usePageMeta(siteConfig.pages.gallery);

  const [galleryData, setGalleryData] = useState(defaultGalleryData);
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Automated Featured Spotlight Carousel
  const [featuredSpotlightIndex, setFeaturedSpotlightIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Interactive Transformation comparison toggle
  const [activeTransformationTab, setActiveTransformationTab] = useState<'after' | 'before'>('after');

  // Load from local storage or backend if available
  useEffect(() => {
    try {
      const cached = localStorage.getItem('shorai_gallery_data');
      if (cached) {
        setGalleryData(JSON.parse(cached));
      }
    } catch { }

    fetch('/api/gallery')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.items) {
          setGalleryData(data);
          localStorage.setItem('shorai_gallery_data', JSON.stringify(data));
        }
      })
      .catch(() => { });
  }, []);

  const featuredAlbum = galleryData.albums[0];
  const spotlightPhotos = useMemo(() => {
    return galleryData.items.filter(i => featuredAlbum?.galleryItemIds.includes(i.id)) || [];
  }, [galleryData.items, featuredAlbum]);

  // Automated slideshow timer for Spotlight (single interval without re-rendering progress loops)
  useEffect(() => {
    if (!isAutoPlaying || spotlightPhotos.length <= 1) return;

    const timer = setInterval(() => {
      setFeaturedSpotlightIndex((prev) => (prev + 1) % spotlightPhotos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, spotlightPhotos.length]);

  const filteredItems = useMemo(() => {
    return galleryData.items.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.caption.toLowerCase().includes(query) ||
        item.school.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [galleryData.items, selectedCategory, searchQuery]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  const activeLightboxItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  const handleCopyShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Double items for infinite marquee
  const marqueeItemsRow1 = useMemo(() => {
    return [...galleryData.items, ...galleryData.items];
  }, [galleryData.items]);

  const marqueeItemsRow2 = useMemo(() => {
    return [...galleryData.items.slice().reverse(), ...galleryData.items.slice().reverse()];
  }, [galleryData.items]);

  return (
    <div className="min-h-screen bg-transparent text-foreground transition-colors duration-300 overflow-x-hidden">

      {/* ── 1. CINEMATIC HERO WITH MOVING TECH GRID & PARTICLES ── */}
      <section className="relative z-10 pt-36 sm:pt-44 pb-14 overflow-hidden border-b border-border bg-background">

        {/* Floating Holographic Ambient Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-10 left-1/4 w-72 md:w-[480px] h-72 md:h-[480px] bg-[#7928CA]/25 rounded-full blur-[50px] md:blur-[120px] animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <div
            className="absolute top-28 right-1/4 w-72 md:w-[500px] h-72 md:h-[500px] bg-[#00D4FF]/25 rounded-full blur-[50px] md:blur-[120px] animate-pulse"
            style={{ animationDuration: '10s' }}
          />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 md:w-[550px] h-48 md:h-[250px] bg-[#6366F1]/15 rounded-full blur-[40px] md:blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800e_1px,transparent_1px),linear-gradient(to_bottom,#8080800e_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* ── FLANKING ROTATING SEMICIRCLE GRADIENT SHOWCASE CARDS ── */}
        {/* Left Side: Robotics & AI Smart Class (Harmonized Violet/Purple/Indigo Palette) */}
        <div className="hidden xl:block absolute -left-3 2xl:left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.06, x: 20 }}
            onClick={() => setSelectedImageIndex(0)}
            className="group relative cursor-pointer"
          >
            {/* Continuous Rotating Outer Gradient Ring - Customized to Robotics/AI Purple & Magenta Lighting */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3.5 rounded-r-full p-[4px] bg-[conic-gradient(from_0deg,#7928CA,#A855F7,#6366F1,#C084FC,#EC4899,#7928CA)] opacity-95 group-hover:opacity-100 blur-[2px] transition-opacity"
            />

            {/* Glowing Large True Semicircle Container Frame */}
            <div className="relative p-[4px] bg-gradient-to-r from-[#7928CA] via-[#9333EA] to-[#6366F1] rounded-r-full shadow-[0_20px_60px_rgba(121,40,202,0.65)]">
              <div className="relative w-64 lg:w-72 xl:w-[290px] h-[512px] lg:h-[576px] xl:h-[580px] rounded-r-full overflow-hidden bg-black flex items-center">
                {/* Rotating Tech HUD Dial Background - Harmonized Purple */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute -left-28 w-[580px] h-[580px] rounded-full border-2 border-[#A855F7]/40 border-dashed pointer-events-none opacity-45 group-hover:opacity-85"
                />

                <Image
                  src="/images/shorai-images/shorai-smart-class-coding-lecture.jpg"
                  alt="Autonomous Robotics Lab"
                  fill
                  className="object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 border-2 border-purple-300/30 rounded-r-full pointer-events-none" />
              </div>
            </div>

            {/* Ambient Reactive Glow Aura - Tailored to Robotics Violet */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#7928CA]/70 via-[#9333EA]/55 to-transparent rounded-r-full blur-3xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>

        {/* Right Side: Tactile Breadboard & STEM Electronics */}
        <div className="hidden xl:block absolute -right-3 2xl:right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            whileHover={{ scale: 1.06, x: -20 }}
            onClick={() => setSelectedImageIndex(1)}
            className="group relative cursor-pointer"
          >
            {/* Continuous Reverse Rotating Outer Gradient Ring - Customized to STEM Cyan/Teal */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3.5 rounded-l-full p-[4px] bg-[conic-gradient(from_180deg,#00D4FF,#0EA5E9,#06B6D4,#10B981,#38BDF8,#00D4FF)] opacity-95 group-hover:opacity-100 blur-[2px] transition-opacity"
            />

            {/* Glowing Large True Semicircle Container Frame */}
            <div className="relative p-[4px] bg-gradient-to-l from-[#00D4FF] via-[#0EA5E9] to-[#06B6D4] rounded-l-full shadow-[0_20px_60px_rgba(0,212,255,0.65)]">
              <div className="relative w-64 lg:w-72 xl:w-[290px] h-[512px] lg:h-[576px] xl:h-[580px] rounded-l-full overflow-hidden bg-black flex items-center">
                {/* Rotating Tech HUD Dial Background - Harmonized Cyan/Teal */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute -right-28 w-[580px] h-[580px] rounded-full border-2 border-[#00D4FF]/45 border-dashed pointer-events-none opacity-45 group-hover:opacity-85"
                />

                <Image
                  src="/images/shorai-images/shorai-student-breadboard-wiring.jpg"
                  alt="Tactile STEM Electronics Lab"
                  fill
                  className="object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 border-2 border-cyan-300/30 rounded-l-full pointer-events-none" />
              </div>
            </div>

            {/* Ambient Reactive Glow Aura - Tailored to Drone Cyan */}
            <div className="absolute -inset-4 bg-gradient-to-l from-[#00D4FF]/70 via-[#0EA5E9]/55 to-transparent rounded-l-full blur-3xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

            {/* Giant Headline */}
            <SectionReveal delay={0.08}>
              <h1
                className="font-black tracking-tight text-foreground mb-6 leading-[1.05]"
                style={{ fontSize: 'clamp(38px, 5.5vw, 74px)' }}
              >
                SEE THE FUTURE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] drop-shadow-sm">
                  BUILT BY INDIAN STUDENTS.
                </span>
              </h1>
            </SectionReveal>

            {/* Subheading */}
            <SectionReveal delay={0.12}>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Explore real, unfiltered moments from 50+ school campuses across India — students constructing autonomous rovers, flight-testing educational drones, and creating AI computer vision models.
              </p>
            </SectionReveal>

            {/* Interactive CTAs */}
            <SectionReveal delay={0.16}>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                <MagneticWrapper>
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="group relative px-8 py-4 rounded-full font-black text-sm text-white overflow-hidden shadow-[0_8px_30px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.7)] transition-all duration-300 flex items-center gap-2.5 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                    }}
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
                    <span>Bring This Lab to Your School</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </MagneticWrapper>

                <a
                  href="#moving-stream"
                  className="px-7 py-4 rounded-full font-bold text-sm bg-card hover:bg-muted/80 border-2 border-border hover:border-primary text-foreground transition-all shadow-sm flex items-center gap-2 group"
                >
                  <Camera className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>Watch Live Photo Stream</span>
                </a>
              </div>
            </SectionReveal>

            {/* Key Verified Performance Counters */}
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-4">

                <div className="group relative p-5 rounded-3xl bg-card/80 backdrop-blur-xl border-2 border-primary/25 hover:border-primary transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.08)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(99,102,241,0.25)]">
                  <div className="w-9 h-9 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {galleryData.stats.totalMilestones}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase mt-1">
                    Documented Moments
                  </div>
                </div>

                <div className="group relative p-5 rounded-3xl bg-card/80 backdrop-blur-xl border-2 border-cyan-500/25 hover:border-cyan-500 transition-all duration-300 shadow-[0_4px_20px_rgba(0,212,255,0.08)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,212,255,0.25)]">
                  <div className="w-9 h-9 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-3">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight">
                    {galleryData.stats.activeCampusLabs}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase mt-1">
                    Active Campus Labs
                  </div>
                </div>

                <div className="group relative p-5 rounded-3xl bg-card/80 backdrop-blur-xl border-2 border-indigo-500/25 hover:border-indigo-500 transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.08)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(99,102,241,0.25)]">
                  <div className="w-9 h-9 rounded-2xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-3">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-foreground tracking-tight group-hover:text-indigo-400 transition-colors">
                    {galleryData.stats.studentsReached}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase mt-1">
                    Students Empowered
                  </div>
                </div>

                <div className="group relative p-5 rounded-3xl bg-card/80 backdrop-blur-xl border-2 border-emerald-500/25 hover:border-emerald-500 transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.08)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)]">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                    {galleryData.stats.competitionsWon}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase mt-1">
                    Competition Medals
                  </div>
                </div>

              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* ── 2. CONTINUOUS AUTOMATED LIVE DISPATCH BROADCAST TICKER ── */}
      <div className="py-3 px-4 bg-primary/10 border-b border-primary/20 overflow-hidden flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono font-black text-primary px-3 py-1 rounded-full bg-primary/20 flex-shrink-0 border border-primary/30 shadow-sm">
          <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span>LIVE BROADCAST</span>
        </div>

        <div className="flex overflow-hidden whitespace-nowrap mask-gradient">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-8 text-xs font-mono text-foreground font-semibold"
          >
            {[...LIVE_DISPATCHES, ...LIVE_DISPATCHES].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── 3. DUAL-ROW INFINITE MOVING CAMPUS MOMENTS REEL (CONTINUOUS MARQUEE WITH HOVER PAUSE & 2-LINE INFO) ── */}
      <section id="moving-stream" className="py-14 bg-transparent border-b border-border overflow-hidden gallery-marquee-wrapper">
        <div className="max-w-[1440px] mx-auto px-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-black text-primary uppercase tracking-wider">
              CONTINUOUS LIVE PHOTO STREAM (HOVER TO PAUSE &amp; EXPAND)
            </span>
          </div>

          <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline-block">
            Auto-scrolling 120+ active lab moments • Hover to inspect
          </span>
        </div>

        {/* Row 1: Moving Left */}
        <div className="relative w-full overflow-hidden py-3">
          <div className="gallery-marquee-stream-left flex items-center gap-5 w-max cursor-pointer">
            {marqueeItemsRow1.map((item, idx) => (
              <div
                key={`r1-${idx}`}
                onClick={() => setSelectedImageIndex(idx % galleryData.items.length)}
                className="group relative w-80 sm:w-96 lg:w-[420px] h-52 sm:h-64 lg:h-72 rounded-3xl overflow-hidden bg-card border-2 border-border hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 hover:scale-105"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 320px, 420px"
                />

                {/* Brief 2-line info reveal on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-left">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2.5 py-0.5 rounded-md bg-primary text-white text-[10px] font-black uppercase shadow-sm">
                        {item.school}
                      </span>
                      <span className="text-white/80 text-[10px] font-semibold">{item.city}</span>
                    </div>
                    <h4 className="text-sm font-black text-white leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moving Right */}
        <div className="relative w-full overflow-hidden py-3 mt-2">
          <div className="gallery-marquee-stream-right flex items-center gap-5 w-max cursor-pointer">
            {marqueeItemsRow2.map((item, idx) => (
              <div
                key={`r2-${idx}`}
                onClick={() => setSelectedImageIndex(idx % galleryData.items.length)}
                className="group relative w-80 sm:w-96 lg:w-[420px] h-52 sm:h-64 lg:h-72 rounded-3xl overflow-hidden bg-card border-2 border-border hover:border-cyan-400 shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 hover:scale-105"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 320px, 420px"
                />

                {/* Brief 2-line info reveal on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-left">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-500 text-white text-[10px] font-black uppercase shadow-sm">
                        {item.school}
                      </span>
                      <span className="text-white/80 text-[10px] font-semibold">{item.city}</span>
                    </div>
                    <h4 className="text-sm font-black text-white leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AUTO-ADVANCING SPOTLIGHT SLIDESHOW WITH DYNAMIC PROGRESS BAR ── */}
      {featuredAlbum && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="max-w-[1440px] mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-mono font-black text-primary mb-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>FLAGSHIP CAMPUS SPOTLIGHT // AUTOMATED STORY</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  {featuredAlbum.schoolName}
                </h2>
              </div>

              {/* Slideshow Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="px-4 py-2 rounded-full bg-card border-2 border-border hover:border-primary text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pause Auto-Play</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Resume Auto-Play</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/gallery/${featuredAlbum.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-mono font-black shadow-md hover:scale-105 transition-all"
                >
                  <span>Open Full Album</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Glowing Gradient Frame */}
            <div className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] shadow-[0_10px_40px_rgba(99,102,241,0.25)]">
              <div className="rounded-[2.4rem] bg-card p-6 sm:p-8 lg:p-10">

                {/* Auto-play hardware-accelerated progress bar */}
                {isAutoPlaying && (
                  <div className="w-full h-1 bg-muted rounded-full mb-6 overflow-hidden">
                    <div
                      key={featuredSpotlightIndex}
                      className="h-full w-full bg-gradient-to-r from-[#7928CA] to-[#00D4FF] origin-left"
                      style={{
                        animation: 'shoraiProgress 4s linear forwards',
                      }}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                  {/* Left Interactive Animated Image Reel */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border-2 border-border shadow-lg bg-black">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={featuredSpotlightIndex}
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.45 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={spotlightPhotos[featuredSpotlightIndex]?.imageUrl || featuredAlbum.heroImage}
                            alt={featuredAlbum.schoolName}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Thumbnail Switcher Strip */}
                    {spotlightPhotos.length > 1 && (
                      <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                        {spotlightPhotos.map((photo, pIdx) => (
                          <button
                            key={photo.id}
                            onClick={() => setFeaturedSpotlightIndex(pIdx)}
                            className={`relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${featuredSpotlightIndex === pIdx
                                ? 'border-primary ring-2 ring-primary/40 scale-105'
                                : 'border-border opacity-60 hover:opacity-100'
                              }`}
                          >
                            <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Details */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 text-xs font-mono font-bold border border-purple-500/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{featuredAlbum.implementationDate} • 30-Day Turnkey Setup</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-tight">
                      {featuredAlbum.headline}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {featuredAlbum.storyNarrative}
                    </p>



                    {/* Principal Endorsement */}
                    {featuredAlbum.principalQuote && (
                      <div className="p-4 rounded-2xl bg-muted/40 border-l-4 border-primary text-xs italic text-muted-foreground">
                        &quot;{featuredAlbum.principalQuote.quote}&quot;
                        <div className="text-[11px] font-bold font-mono text-foreground not-italic mt-1.5">
                          — {featuredAlbum.principalQuote.author}, {featuredAlbum.principalQuote.designation}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <Link
                        href={`/gallery/${featuredAlbum.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7928CA] to-[#00D4FF] text-white text-xs font-black shadow-lg hover:opacity-95 transition-all hover:scale-105"
                      >
                        <span>Open School Photo Vault</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── 5. INTERACTIVE "FROM CLASSROOM TO CREATION" BEFORE & AFTER EXPERIENCE ── */}
      {galleryData.transformations && galleryData.transformations.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-transparent">
          <div className="max-w-[1440px] mx-auto">

            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                <Activity className="w-3.5 h-3.5" />
                <span>MEASURABLE IMPACT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                From Classroom to Creation
              </h2>
              <p className="text-sm text-muted-foreground">
                Witness how ordinary school classrooms turn into state-of-the-art innovation hubs in under 30 days.
              </p>

              {/* Interactive Comparison Switcher */}
              <div className="pt-4 flex items-center justify-center">
                <div className="p-1.5 rounded-full bg-muted border border-border inline-flex items-center gap-1 text-xs font-mono font-bold">
                  <button
                    onClick={() => setActiveTransformationTab('after')}
                    className={`px-5 py-2 rounded-full transition-all flex items-center gap-1.5 ${activeTransformationTab === 'after'
                        ? 'bg-emerald-500 text-white shadow-md font-black'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Shorai Innovation Lab (After)</span>
                  </button>
                  <button
                    onClick={() => setActiveTransformationTab('before')}
                    className={`px-5 py-2 rounded-full transition-all flex items-center gap-1.5 ${activeTransformationTab === 'before'
                        ? 'bg-amber-500 text-white shadow-md font-black'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    <span>Traditional Room (Before)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Transformation Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {galleryData.transformations.map((trans) => (
                <div key={trans.id} className="rounded-3xl bg-card border-2 border-border p-6 sm:p-8 shadow-lg hover:border-primary/50 transition-all space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div>
                      <h3 className="text-lg font-black text-foreground">{trans.school}</h3>
                      <div className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span>{trans.city}</span>
                      </div>
                    </div>

                    <div className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {trans.impactMetrics.studentsTrained} Students
                    </div>
                  </div>

                  {/* Interactive Dynamic Visual Panel */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-border shadow-inner bg-black">
                    <AnimatePresence mode="wait">
                      {activeTransformationTab === 'after' ? (
                        <motion.div
                          key="after"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={trans.afterImage}
                            alt="After Shorai Setup"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="before"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={trans.beforeImage}
                            alt="Before Setup"
                            fill
                            className="object-cover grayscale"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {activeTransformationTab === 'after' ? trans.afterDescription : trans.beforeDescription}
                  </p>

                  {/* Impact pill badges */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border text-center">
                    <div className="p-2 rounded-xl bg-muted/40 border border-border">
                      <div className="text-xs font-black text-foreground">{trans.impactMetrics.studentsTrained}</div>
                      <div className="text-[9px] font-mono text-muted-foreground uppercase">Trained</div>
                    </div>
                    <div className="p-2 rounded-xl bg-muted/40 border border-border">
                      <div className="text-xs font-black text-primary">{trans.impactMetrics.projectsBuilt}</div>
                      <div className="text-[9px] font-mono text-muted-foreground uppercase">Projects Built</div>
                    </div>
                    <div className="p-2 rounded-xl bg-muted/40 border border-border">
                      <div className="text-xs font-black text-emerald-400">{trans.impactMetrics.competitionsWon}</div>
                      <div className="text-[9px] font-mono text-muted-foreground uppercase">Awards</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}



      {/* ── 6. MAIN PHOTO VAULT & CATEGORY TABS ── */}
      <section id="gallery-grid" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-[1440px] mx-auto">

          <div className="space-y-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-black text-primary uppercase tracking-widest block">
                  EXPLORE ARCHIVE
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mt-1">
                  Campus Photo Vault
                </h2>
              </div>

              {/* Search Radar Input */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by school, city, project, tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 rounded-2xl bg-card border-2 border-border focus:border-primary text-xs sm:text-sm focus:outline-none transition-all shadow-sm font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden px-4 py-3 rounded-2xl bg-card border-2 border-border flex items-center gap-2 text-xs font-mono font-bold text-foreground shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Desktop Glowing Category Filter Bar */}
            <div className="hidden lg:flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-card border-2 border-border shadow-sm">
              {CATEGORY_TABS.map((tab) => {
                const active = selectedCategory === tab.id;
                const Icon = tab.icon;
                const count = tab.id === 'all'
                  ? galleryData.items.length
                  : galleryData.items.filter(i => i.category === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${active
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105 font-black`
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-white/25 text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Reset Filter Button if active */}
            {(selectedCategory !== 'all' || searchQuery) && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-1 font-mono"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}

          </div>

          {/* ── BENTO MASONRY PHOTO CARDS (HOVER-ONLY TEXT REVEAL) ── */}
          {displayedItems.length === 0 ? (
            <div className="py-24 text-center rounded-3xl bg-card border-2 border-border p-8 space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-foreground">No moments found</h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                No photographs match your selected filter criteria. Try resetting your search query or selecting &quot;All Moments&quot;.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-black font-mono shadow-md hover:scale-105 transition-transform"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {displayedItems.map((item, idx) => {
                const catObj = CATEGORY_TABS.find(c => c.id === item.category) || CATEGORY_TABS[0];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
                    className="break-inside-avoid relative rounded-[2rem] overflow-hidden bg-card border-2 border-border hover:border-primary/80 group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                    onClick={() => setSelectedImageIndex(idx)}
                  >
                    {/* Visual Aspect Container (Full-Bleed Photo Card) */}
                    <div className={`relative w-full overflow-hidden bg-black ${item.aspectRatio === 'portrait' ? 'aspect-[3/4]' :
                        item.aspectRatio === 'square' ? 'aspect-square' :
                          'aspect-[16/10]'
                      }`}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Hover Info Reveal Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 sm:p-6 text-left">
                        <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase text-white shadow-sm ${catObj.badgeBg}`}>
                              {catObj.label}
                            </span>
                            <span className="text-white/80 font-semibold">{item.date}</span>
                          </div>

                          <h4 className="text-base font-black text-white tracking-tight leading-snug">
                            {item.title}
                          </h4>

                          <div className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{item.school} • {item.city}</span>
                          </div>

                          <p className="text-xs text-white/85 line-clamp-2 leading-relaxed">
                            {item.caption}
                          </p>

                          {/* Tags & Action */}
                          <div className="flex items-center justify-between pt-2 border-t border-white/20">
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags.slice(0, 2).map((tag, tIdx) => (
                                <span key={tIdx} className="px-2 py-0.5 rounded-md bg-white/15 text-[10px] font-mono text-white/90 font-semibold backdrop-blur-md">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs font-mono font-black text-cyan-400 flex items-center gap-1">
                              <span>Expand</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Load More Button */}
          {filteredItems.length > visibleCount && (
            <div className="text-center pt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 9)}
                className="px-10 py-4 rounded-full bg-card border-2 border-primary hover:bg-primary text-foreground hover:text-white text-xs font-mono font-black transition-all shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:scale-105"
              >
                Load More Moments ({filteredItems.length - visibleCount} remaining)
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ── 7. ACCESSIBLE PRO LIGHTBOX ── */}
      <AnimatePresence>
        {activeLightboxItem && selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20 pointer-events-auto">
              <div className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg">
                Photo {selectedImageIndex + 1} of {filteredItems.length}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyShare();
                  }}
                  className="px-4 py-2 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all shadow-lg"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </button>

                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all shadow-lg"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/75 hover:bg-black border border-white/25 flex items-center justify-center text-white z-20 transition-all hover:scale-110 shadow-2xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/75 hover:bg-black border border-white/25 flex items-center justify-center text-white z-20 transition-all hover:scale-110 shadow-2xl"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Frame */}
            <div
              className="relative w-full max-w-5xl max-h-[90dvh] overflow-y-auto rounded-3xl bg-card border-2 border-primary/40 shadow-[0_0_60px_rgba(99,102,241,0.3)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo / Video Display */}
              <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[520px] bg-black flex items-center justify-center">
                {activeLightboxItem.videoUrl ? (
                  <video
                    src={activeLightboxItem.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <Image
                    src={activeLightboxItem.imageUrl}
                    alt={activeLightboxItem.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                )}
              </div>

              {/* Sidebar Metadata */}
              <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between space-y-4 border-t lg:border-t-0 lg:border-l border-border bg-card">
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs font-mono font-black border border-primary/20">
                      {activeLightboxItem.school}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {activeLightboxItem.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight leading-snug">
                    {activeLightboxItem.title}
                  </h3>

                  <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{activeLightboxItem.city}, {activeLightboxItem.state}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    {activeLightboxItem.caption}
                  </p>

                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold mb-1.5">Tagged Keywords:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeLightboxItem.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-0.5 rounded-lg bg-muted text-[10px] font-mono text-foreground font-semibold border border-border">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-border">
                  {activeLightboxItem.albumId && (
                    <Link
                      href={`/gallery/${activeLightboxItem.schoolSlug || 'dps-varanasi-robotics-ai-ecosystem'}`}
                      onClick={() => setSelectedImageIndex(null)}
                      className="w-full py-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground text-xs font-mono font-bold text-center block transition-colors border border-border"
                    >
                      View Full School Story Album →
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setSelectedImageIndex(null);
                      setIsContactModalOpen(true);
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white text-xs font-black text-center shadow-lg hover:opacity-95 transition-all hover:scale-102"
                  >
                    Setup Similar Lab on Your Campus
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 8. MOBILE FILTER DRAWER ── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden flex items-end justify-center"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-h-[85vh] overflow-y-auto bg-card rounded-t-3xl border-t-2 border-border p-6 space-y-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="text-base font-black text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span>Filter Media Vault</span>
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-muted-foreground uppercase">Categories</div>
                <div className="grid grid-cols-1 gap-2">
                  {CATEGORY_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedCategory(tab.id);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left text-xs font-mono font-bold flex items-center justify-between transition-all ${selectedCategory === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-md font-black`
                          : 'bg-muted/60 text-foreground'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                      <span className="text-[10px] opacity-80 font-mono">
                        {tab.id === 'all' ? galleryData.items.length : galleryData.items.filter(i => i.category === tab.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-4 rounded-2xl bg-primary text-white font-black text-xs shadow-lg"
                >
                  Show Results ({filteredItems.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
