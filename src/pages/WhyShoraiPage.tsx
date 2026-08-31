'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Brain, Plane, Code2, Bot, CheckCircle2, Rocket } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import FutureSkillsEcosystem from '@/components/home/FutureSkillsEcosystem';
import WhySchoolsNeedShoraiBanner from '@/components/home/WhySchoolsNeedShoraiBanner';
import AtShoraiWeBuildSection from '@/components/home/AtShoraiWeBuildSection';
import Shorai360Ecosystem from '@/components/home/Shorai360Ecosystem';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { usePageMeta } from '@/hooks/usePageMeta';
import { siteConfig } from '@/config/siteConfig';
import { useContent } from '@/context/ContentContext';

// Big, natural booming technology slide deck
const techSlides = [
  {
    id: 'ai-boom',
    title: 'Generative AI & LLMs',
    category: 'ARTIFICIAL INTELLIGENCE',
    description: 'Neural models, deep learning vision & supercomputing inference',
    image: '/images/shorai-booming-ai.jpg',
    alt: 'Indian researchers and students working on booming AI supercomputing models',
    icon: Brain,
    badgeBg: 'bg-purple-600/90 text-white border-purple-400/50',
    borderColor: 'border-purple-500/50 shadow-purple-500/20',
  },
  {
    id: 'drone-boom',
    title: 'Autonomous UAV & Swarm Drones',
    category: 'DRONE AEROSPACE',
    description: 'Swarm dynamics, flight simulators & aerial telemetry analysis',
    image: '/images/shorai-booming-drone.jpg',
    alt: 'Autonomous drone swarm testing and flight analytics in aerospace lab',
    icon: Plane,
    badgeBg: 'bg-cyan-600/90 text-white border-cyan-400/50',
    borderColor: 'border-cyan-500/50 shadow-cyan-500/20',
  },
  {
    id: 'robotics-boom',
    title: 'Humanoids & 6-Axis Arms',
    category: 'ADVANCED ROBOTICS',
    description: 'Industrial kinematics, robotic motion control & IoT microcontrollers',
    image: '/images/shorai-booming-robotics.jpg',
    alt: 'Advanced humanoid robots and 6-axis articulated arms in modern robotics lab',
    icon: Bot,
    badgeBg: 'bg-amber-600/90 text-white border-amber-400/50',
    borderColor: 'border-amber-500/50 shadow-amber-500/20',
  },
  {
    id: 'coding-lab',
    title: 'Full-Stack & Python Logic',
    category: 'SOFTWARE ENGINEERING',
    description: 'Algorithmic thinking, web applications & cloud computing',
    image: '/images/shorai-quadrant-coding.jpg',
    alt: 'Indian student coding algorithms and software applications',
    icon: Code2,
    badgeBg: 'bg-emerald-600/90 text-white border-emerald-400/50',
    borderColor: 'border-emerald-500/50 shadow-emerald-500/20',
  },
  {
    id: 'ai-vision',
    title: 'Computer Vision & Edge AI',
    category: 'EDGE AI LABS',
    description: 'Facial detection, model weights & machine learning pipelines',
    image: '/images/shorai-quadrant-ai.jpg',
    alt: 'Indian student learning computer vision and neural networks',
    icon: Brain,
    badgeBg: 'bg-indigo-600/90 text-white border-indigo-400/50',
    borderColor: 'border-indigo-500/50 shadow-indigo-500/20',
  },
  {
    id: 'drone-uav',
    title: 'Aeromodelling & Flight Dynamics',
    category: 'UAV ENGINEERING',
    description: 'Quadcopter tuning, ESC calibration & aerodynamic flight testing',
    image: '/images/shorai-quadrant-drone.jpg',
    alt: 'Indian student assembling and calibrating educational quadcopter drone',
    icon: Plane,
    badgeBg: 'bg-sky-600/90 text-white border-sky-400/50',
    borderColor: 'border-sky-500/50 shadow-sky-500/20',
  },
  {
    id: 'robotics-arm',
    title: 'Smart Automation & IoT',
    category: 'ROBOTICS & EMBEDDED',
    description: 'Circuitry, sensor actuation & precision robotics programming',
    image: '/images/shorai-quadrant-robotics.jpg',
    alt: 'Indian student programming robotic arm and IoT microcontroller circuit',
    icon: Bot,
    badgeBg: 'bg-orange-600/90 text-white border-orange-400/50',
    borderColor: 'border-orange-500/50 shadow-orange-500/20',
  },
];

export default function WhyShoraiPage() {
  usePageMeta(siteConfig.pages.whyShorai);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { content } = useContent();
  const hero = content.whyShorai.hero;

  // Duplicate for seamless infinite marquee loop
  const carouselItems = [...techSlides, ...techSlides];

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-20 sm:pt-24 transition-colors duration-300">
      
      {/* ── Hero Section with Continuous Moving Panoramic Carousel BEHIND ── */}
      <section className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-center items-center py-8 sm:py-12 overflow-hidden border-b border-border bg-transparent">
        
        {/* CSS Hardware-Accelerated Jitter-Free Marquee Style */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes marqueeContinuous {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .shorai-carousel-track {
              display: flex;
              width: max-content;
              animation: marqueeContinuous 52s linear infinite;
              transform: translate3d(0, 0, 0);
              backface-visibility: hidden;
              perspective: 1000px;
            }
            .shorai-carousel-track:hover {
              animation-play-state: paused;
            }
          `
        }} />

        {/* ── Background Moving Carousel Layer (Directly Behind Hero) ── */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center">
          
          {/* Continuous Moving Hardware-Accelerated Track */}
          <div className="shorai-carousel-track flex gap-6 sm:gap-8 items-center shrink-0">
            {carouselItems.map((slide, index) => {
              const Icon = slide.icon;
              return (
                <div
                  key={`${slide.id}-${index}`}
                  className={`relative shrink-0 w-[460px] sm:w-[620px] md:w-[760px] lg:w-[860px] h-[340px] sm:h-[440px] md:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden border-2 ${slide.borderColor} shadow-2xl group transition-all duration-500 hover:scale-[1.015] bg-card`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 460px, (max-width: 1024px) 760px, 860px"
                    priority={index < 3}
                  />

                  {/* High Contrast Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between pointer-events-none z-10">
                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl backdrop-blur-md border text-xs font-mono font-bold shadow-xl ${slide.badgeBg}`}>
                      <Icon className="w-4 h-4" />
                      <span>{slide.category}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-xs font-mono text-emerald-400 border border-emerald-500/40 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold">ACTIVE LAB</span>
                    </div>
                  </div>

                  {/* Bottom Slide Info Box */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white pointer-events-none z-10">
                    <h3 className="text-lg sm:text-2xl font-black tracking-tight drop-shadow-lg">
                      {slide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 font-medium mt-0.5 line-clamp-1 drop-shadow-md">
                      {slide.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* High-contrast solid soft white shield glow directly behind hero typography */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.85)_40%,rgba(255,255,255,0.45)_70%,transparent_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(6,9,19,0.95)_0%,rgba(6,9,19,0.85)_40%,rgba(6,9,19,0.45)_70%,transparent_100%)] pointer-events-none z-10" />
        </div>

        {/* ── Foreground Hero Content (Overlaying Directly Over the Carousel with High Clarity) ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full text-center relative z-20 my-auto">
          
          <SectionReveal delay={0.08}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-4 leading-[1.1] drop-shadow-sm">
              {hero.title} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                {hero.titleGradient}
              </span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="text-base sm:text-xl text-foreground max-w-2xl mx-auto leading-relaxed mb-6 font-bold drop-shadow-sm">
              {hero.subtitle}
            </p>
          </SectionReveal>

          {/* Quick Highlight Metrics */}
          <SectionReveal delay={0.16}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 max-w-3xl mx-auto text-xs font-semibold">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background/95 backdrop-blur-md border border-border text-foreground shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>100% Practical Hands-on Labs</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background/95 backdrop-blur-md border border-border text-foreground shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>NEP 2020 Aligned Curriculum</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background/95 backdrop-blur-md border border-border text-foreground shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Certified Teacher Training</span>
              </div>
            </div>
          </SectionReveal>

          {/* CTAs */}
          <SectionReveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-xl flex items-center gap-2.5 transition-all hover:scale-105"
                >
                  <Rocket className="w-4 h-4" />
                  <span>{hero.primaryButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>

              <Link
                href="/labs"
                className="px-8 h-13 rounded-2xl bg-background/90 hover:bg-muted border border-border text-foreground font-bold text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105 backdrop-blur-md"
              >
                <span>{hero.secondaryButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionReveal>

        </div>

        {/* Carousel Micro-Footer Info */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full mt-6 relative z-20">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground border-t border-border/80 pt-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-bold text-foreground">LIVE LAB DEMOS:</span>
              <span className="hidden sm:inline">AI &bull; DRONES &bull; ROBOTICS &bull; CODING</span>
            </div>
            <div className="text-[11px] bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 font-semibold">
              Hover background cards to pause &amp; inspect
            </div>
          </div>
        </div>

      </section>

      {/* ── Why Schools Need Shorai Banner (Exact Brochure Match) ── */}
      <WhySchoolsNeedShoraiBanner />

      {/* ── AT SHORAI WE BUILD (Compact 4 Interactive Demos) ── */}
      <AtShoraiWeBuildSection />

      {/* ── Shorai 360° Education Ecosystem (Moved & Redesigned) ── */}
      <Shorai360Ecosystem />

      {/* ── Key Why Shorai Sections ── */}
      <FutureSkillsEcosystem />

      {/* ── Closing CTA & Footer ─── */}
      <FinalCTA />
      <Footer />

      {/* Contact & Demo Request Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

    </div>
  );
}
