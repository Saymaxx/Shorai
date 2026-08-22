'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Bot, 
  Cpu, 
  Plane, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

interface CatalogTier {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
  turnaround: string;
  color: string;
  accentIcon: any;
  bulletPoints: string[];
}

const CATALOGS: CatalogTier[] = [
  {
    id: 'primary',
    badge: 'GRADES 1 – 5',
    title: 'Foundation STEM Lab',
    tagline: 'Visual Coding & Modular Electronics',
    image: '/images/shorai-catalog-primary.jpg',
    alt: 'Indian primary school students learning modular STEM and visual coding',
    turnaround: '14-Day Setup',
    color: '#7928CA',
    accentIcon: Bot,
    bulletPoints: [
      '20+ Modular Sensor & Logic Kits',
      'Interactive Scratch Visual Coding',
      '100% NEP Foundational Stage'
    ]
  },
  {
    id: 'middle',
    badge: 'GRADES 6 – 8',
    title: 'Robotics & IoT Sandbox',
    tagline: 'Arduino, Circuits & 3D Prototyping',
    image: '/images/shorai-catalog-robotics-iot.jpg',
    alt: 'Indian middle school students assembling Arduino robots and IoT sensors',
    turnaround: '21-Day Setup',
    color: '#6366F1',
    accentIcon: Cpu,
    bulletPoints: [
      '30+ Microcontroller Workbench Stations',
      'Dual-Extruder 3D Printer Hub',
      '100% NEP Vocational Middle Stage'
    ]
  },
  {
    id: 'high',
    badge: 'GRADES 9 – 12',
    title: 'AI, Drones & Advanced ROS',
    tagline: 'Deep Tech, UAV Avionics & 6-Axis Arms',
    image: '/images/shorai-catalog-ai-drone.jpg',
    alt: 'Indian high school students calibrating drones and AI computer vision',
    turnaround: '25-Day Setup',
    color: '#00D4FF',
    accentIcon: Plane,
    bulletPoints: [
      'AI GPU Workstations & Computer Vision',
      'Autonomous Drone Swarms & Avionics',
      'National Hackathon & Olympiad Mentorship'
    ]
  },
  {
    id: 'flagship',
    badge: 'K–12 COMPLETE',
    title: '360° Innovation Campus',
    tagline: 'Full Multi-Room STEM Center',
    image: '/images/shorai-catalog-flagship-campus.jpg',
    alt: 'Flagship multi-zone school STEM innovation center with robotics and drones in India',
    turnaround: '30-Day Turnkey',
    color: '#FF6B00',
    accentIcon: Sparkles,
    bulletPoints: [
      'All 3 Lab Tiers + Drone Flight Arena',
      'Permanent On-Campus Master Faculty',
      'Annual Innovation Expo & PR Showcase'
    ]
  }
];

export default function ForSchoolsSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="schools" className="py-20 sm:py-28 bg-background relative overflow-hidden border-t border-border transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[50vw] h-[50vw] max-w-[650px] bg-primary/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[650px] bg-secondary/[0.04] rounded-full blur-[150px]" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>4 INSTITUTIONAL CATALOGS &bull; TURNKEY SETUP</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4 leading-tight">
              MAKE YOUR SCHOOL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                FUTURE-READY.
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
              Explore our turnkey lab packages tailored for every grade band. Complete hardware, curriculum, teacher enablement, and certification included.
            </p>
          </SectionReveal>
        </div>

        {/* ── 4 CATALOGS GRID (LESS TEXT, BIGGER TYPOGRAPHY, NATURAL PHOTOS) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {CATALOGS.map((catalog, idx) => {
            const Icon = catalog.accentIcon;
            return (
              <SectionReveal key={catalog.id} delay={0.1 + idx * 0.08}>
                <div className="group rounded-3xl overflow-hidden bg-card border-2 border-border/90 hover:border-primary/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full ring-1 ring-border/50 hover:-translate-y-1.5">
                  
                  {/* Big Natural Photograph */}
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden bg-muted">
                    <Image
                      src={catalog.image}
                      alt={catalog.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-106"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                        <span>{catalog.badge}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/90 backdrop-blur-md text-xs font-mono font-bold text-white shadow-lg">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{catalog.turnaround}</span>
                      </div>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none z-10">
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-md">
                        {catalog.title}
                      </h3>
                      <p className="text-sm sm:text-base font-bold text-white/90 drop-shadow-md mt-0.5">
                        {catalog.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Content with Bigger, Punchy Text */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    
                    {/* 3 Core Deliverables (Less Text, Bigger Size) */}
                    <div className="space-y-3.5 mb-8">
                      {catalog.bulletPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </div>
                          <span className="text-base sm:text-lg font-bold text-foreground/95 leading-snug">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Card Action Button */}
                    <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                      <button
                        onClick={() => setIsContactOpen(true)}
                        className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm sm:text-base tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      >
                        <span>Request Catalog Proposal</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom Trust & Contact Ribbon */}
        <div className="rounded-3xl p-6 sm:p-8 bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-foreground">
                Need a Custom Proposal For Your School Strength?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Our STEM academic directors provide complimentary on-campus infrastructure surveys &amp; customized proposals.
              </p>
            </div>
          </div>

          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 h-13 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wide shadow-md flex items-center gap-2 flex-shrink-0 transition-all hover:scale-105"
            >
              <span>Schedule Free Campus Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
