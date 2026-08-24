'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Rocket, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  SlidersHorizontal,
  Calendar,
  GraduationCap,
  Bot,
  Flame,
  Award,
  ChevronRight,
  Target,
  Users,
  Compass,
  Check
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

interface PartnershipTrack {
  id: string;
  trackNum: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  accentColor: string;
  gradient: string;
  glowColor: string;
  borderGlow: string;
  icon: any;
  quickStats: {
    trainer: string;
    grades: string;
    lab: string;
  };
  features: string[];
}

const PARTNERSHIP_TRACKS: PartnershipTrack[] = [
  {
    id: 'spark',
    trackNum: 'TRACK 01',
    name: 'Spark',
    tagline: 'Foundation track — for schools starting their future-skills journey',
    accentColor: '#00D4FF',
    gradient: 'from-[#00D4FF] via-[#0284C7] to-[#2563EB]',
    glowColor: 'rgba(0, 212, 255, 0.25)',
    borderGlow: 'hover:border-[#00D4FF]/60 hover:shadow-[0_0_35px_rgba(0,212,255,0.22)]',
    icon: Flame,
    quickStats: {
      trainer: '1 Day / Week',
      grades: 'Grades 3–8',
      lab: 'Shared Kit Lab',
    },
    features: [
      'On-campus trainer, 1 day / week',
      'Curriculum for Grades 3–8',
      'Shared Robotics & Coding kit lab',
      'AI-powered LMS progress tracking',
      'One teacher-training workshop / term',
      'Annual in-school innovation showcase'
    ]
  },
  {
    id: 'ascend',
    trackNum: 'TRACK 02',
    name: 'Ascend',
    tagline: 'Growth track — for schools scaling a full innovation lab',
    badge: 'RECOMMENDED START',
    isPopular: true,
    accentColor: '#7928CA',
    gradient: 'from-[#7928CA] via-[#6366F1] to-[#EC4899]',
    glowColor: 'rgba(121, 40, 202, 0.35)',
    borderGlow: 'border-[#7928CA]/60 shadow-[0_0_40px_rgba(121,40,202,0.3)] hover:border-[#6366F1] hover:shadow-[0_0_55px_rgba(99,102,241,0.4)]',
    icon: Rocket,
    quickStats: {
      trainer: '2 Days / Week',
      grades: 'Grades 1–12',
      lab: 'Dedicated AI Lab',
    },
    features: [
      'On-campus trainers, 2 days / week',
      'Curriculum for Grades 1–12',
      'Dedicated Robotics & AI Innovation Lab',
      'Monthly career guidance & counselling',
      'Teacher certification programme',
      'Regional competitions & hackathons',
      'Termly parent-engagement workshops'
    ]
  },
  {
    id: 'pinnacle',
    trackNum: 'TRACK 03',
    name: 'Pinnacle',
    tagline: 'Signature track — complete transformation & recognition',
    accentColor: '#FF6B00',
    gradient: 'from-[#FF6B00] via-[#FF3D7F] to-[#F59E0B]',
    glowColor: 'rgba(255, 107, 0, 0.25)',
    borderGlow: 'hover:border-[#FF6B00]/60 hover:shadow-[0_0_35px_rgba(255,107,0,0.25)]',
    icon: Crown,
    quickStats: {
      trainer: 'Daily Presence',
      grades: 'Full K-12 + 360°',
      lab: 'Advanced Tech & VR',
    },
    features: [
      'Daily on-campus trainer presence',
      'Full Shorai 360° ecosystem',
      'Drone Tech, AR/VR & Cyber Security modules',
      'National & international competition mentoring',
      'School branding & media support',
      'Dedicated relationship manager',
      'Annual Shorai Innovation Fest on campus'
    ]
  }
];

const COMPARISON_ROWS = [
  { feature: 'On-Campus Trainer Presence', spark: '1 Day / Week', ascend: '2 Days / Week', pinnacle: 'Daily Full-Time' },
  { feature: 'Target Grade Level', spark: 'Grades 3–8', ascend: 'Grades 1–12', pinnacle: 'Grades 1–12 (Full 360°)' },
  { feature: 'Hardware & Lab Infrastructure', spark: 'Shared Robotics & Coding Kits', ascend: 'Dedicated Robotics & AI Lab', pinnacle: 'Turnkey Signature Lab + Drones & VR' },
  { feature: 'LMS & Progress Monitoring', spark: 'AI-Powered Digital LMS', ascend: 'Real-time AI Analytics + Parent Portal', pinnacle: 'Comprehensive 360° Institutional Dashboard' },
  { feature: 'Teacher Upskilling', spark: '1 Workshop / Term', ascend: 'Termly Certification Programme', pinnacle: 'Continuous Master Mentorship' },
  { feature: 'Competition Exposure', spark: 'In-School Showcase', ascend: 'Regional Hackathons & Olympiads', pinnacle: 'National & International Championships' },
  { feature: 'Institutional Branding & Fest', spark: 'Standard Certificates', ascend: 'Parent Workshops & Media Kit', pinnacle: 'Annual On-Campus Fest + Media Support' },
];

export default function PartnershipTracksSection() {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('ascend');
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  return (
    <section id="partnership-tracks" className="relative py-20 sm:py-28 bg-background overflow-hidden border-b border-border transition-colors duration-300">
      
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-secondary/[0.05] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-20">
          
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7928CA]/15 via-[#6366F1]/15 to-[#00D4FF]/15 border border-[#6366F1]/30 text-xs font-mono font-bold text-primary mb-4 shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>ENGAGEMENT MODELS &bull; STARTING TRACKS</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-tight">
              Three Ways to Begin the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                Partnership
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl mb-8">
              Every school&apos;s infrastructure, grade strength and goals are different, so exact scope and investment are finalised together at the <span className="text-foreground font-bold underline decoration-primary/50 underline-offset-4">Discovery Meeting &mdash; Step 1 of our Implementation Roadmap</span>. These three tracks are our starting point for conversations with schools across Eastern Uttar Pradesh.
            </p>
          </SectionReveal>

          {/* Interactive Actions Header Strip */}
          <SectionReveal delay={0.16}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-300 flex items-center gap-2 shadow-sm ${
                  showComparison 
                    ? 'bg-primary text-white border-primary shadow-lg scale-105' 
                    : 'bg-card text-foreground hover:bg-muted border-border'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{showComparison ? 'Hide Feature Matrix' : 'Compare All Tracks Side-by-Side'}</span>
              </button>

              <button
                onClick={() => setIsContactOpen(true)}
                className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-muted/70 hover:bg-muted text-foreground border border-border transition-all flex items-center gap-2"
              >
                <Target className="w-4 h-4 text-emerald-500" />
                <span>Book Step 1 Discovery Meeting</span>
              </button>
            </div>
          </SectionReveal>

        </div>

        {/* ── 3 INTERACTIVE TRACK CARDS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PARTNERSHIP_TRACKS.map((track, idx) => {
            const Icon = track.icon;
            const isSelected = selectedTrackId === track.id;

            return (
              <SectionReveal key={track.id} delay={0.08 * (idx + 1)}>
                <motion.div
                  onClick={() => setSelectedTrackId(track.id)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 bg-card border-2 transition-all duration-300 cursor-pointer h-full ${
                    track.isPopular
                      ? track.borderGlow
                      : isSelected
                        ? 'border-primary shadow-xl ring-2 ring-primary/20'
                        : `border-border ${track.borderGlow}`
                  }`}
                  style={{
                    background: track.isPopular 
                      ? 'linear-gradient(180deg, var(--card) 0%, rgba(121,40,202,0.03) 100%)'
                      : undefined
                  }}
                >
                  
                  {/* Top Popular Badge (Recommended Start) */}
                  {track.badge && (
                    <div className="absolute -top-3.5 right-6 z-20">
                      <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#EC4899] text-white text-[10px] sm:text-xs font-mono font-black tracking-wider uppercase shadow-lg flex items-center gap-1.5 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{track.badge}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    {/* Track Header Details */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Track Number Badge */}
                      <span 
                        className="text-xs font-mono font-black tracking-widest uppercase px-3 py-1 rounded-xl bg-muted/80 border border-border"
                        style={{ color: track.accentColor }}
                      >
                        {track.trackNum}
                      </span>

                      {/* Icon Avatar */}
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `linear-gradient(135deg, ${track.accentColor}, #4338CA)` }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Track Title */}
                    <h3 className="text-3xl sm:text-4xl font-black text-foreground mb-2.5 tracking-tight flex items-center gap-2">
                      <span>{track.name}</span>
                      {isSelected && (
                        <div 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: track.accentColor }}
                        />
                      )}
                    </h3>

                    {/* Track Tagline */}
                    <p className="text-sm font-medium text-muted-foreground leading-snug mb-6">
                      {track.tagline}
                    </p>

                    {/* Quick Metric Pills */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-muted/40 border border-border mb-6">
                      <div className="text-center">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">Trainer</div>
                        <div className="text-xs font-black text-foreground truncate">{track.quickStats.trainer}</div>
                      </div>
                      <div className="text-center border-x border-border">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">Grades</div>
                        <div className="text-xs font-black text-foreground truncate">{track.quickStats.grades}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase font-bold">Lab Setup</div>
                        <div className="text-xs font-black text-foreground truncate">{track.quickStats.lab}</div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-border/80 mb-6" />

                    {/* Features List with Rich Colored Dashes/Bullets */}
                    <div className="space-y-3.5 mb-8">
                      {track.features.map((feature, fIdx) => (
                        <div 
                          key={fIdx} 
                          className="flex items-start gap-3 text-xs sm:text-sm font-medium text-foreground/90 leading-snug group"
                        >
                          <div 
                            className="w-4 h-0.5 rounded-full mt-2 shrink-0 transition-all group-hover:w-6"
                            style={{ backgroundColor: track.accentColor }}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-border/70 mt-auto">
                    <MagneticWrapper>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsContactOpen(true);
                        }}
                        className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 flex items-center justify-center gap-2 group ${
                          track.isPopular
                            ? 'bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white hover:opacity-95 hover:shadow-lg'
                            : 'bg-muted hover:bg-primary hover:text-white text-foreground border border-border'
                        }`}
                      >
                        <span>Start with {track.name} Track</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </MagneticWrapper>
                  </div>

                </motion.div>
              </SectionReveal>
            );
          })}
        </div>

        {/* ── SIDE-BY-SIDE INTERACTIVE COMPARISON MATRIX (TOGGLEABLE) ── */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mb-16"
            >
              <div className="rounded-3xl p-6 sm:p-8 bg-card border-2 border-primary/30 shadow-2xl">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                      Comprehensive Track Comparison Matrix
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Explore detailed deliverables across all three partnership tiers.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>NEP 2020 Compliant</span>
                  </div>
                </div>

                {/* Table Layout */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border/80 text-muted-foreground font-mono uppercase text-[11px]">
                        <th className="py-3 px-4">Deliverables &amp; Inclusions</th>
                        <th className="py-3 px-4 text-[#00D4FF] font-bold">Spark (Track 01)</th>
                        <th className="py-3 px-4 text-[#7928CA] font-bold">Ascend (Track 02) ★</th>
                        <th className="py-3 px-4 text-[#FF6B00] font-bold">Pinnacle (Track 03)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {COMPARISON_ROWS.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-foreground">{row.feature}</td>
                          <td className="py-3.5 px-4 text-muted-foreground font-medium">{row.spark}</td>
                          <td className="py-3.5 px-4 text-primary font-bold bg-primary/[0.03]">{row.ascend}</td>
                          <td className="py-3.5 px-4 text-muted-foreground font-medium">{row.pinnacle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Matrix Action */}
                <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground italic">
                    * Exact grade distribution and kit counts will be tuned during the Step 1 Discovery Meeting.
                  </p>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7928CA] to-[#6366F1] text-white text-xs font-bold shadow-md hover:scale-105 transition-transform"
                  >
                    Schedule Custom Consultation
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── DISCOVERY MEETING BANNER (STEP 1 OF ROADMAP) ── */}
        <SectionReveal delay={0.25}>
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-card via-muted/40 to-card border-2 border-border shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7928CA] via-[#6366F1] to-[#00D4FF] flex items-center justify-center text-white shadow-lg shrink-0">
                <Compass className="w-7 h-7 animate-spin" style={{ animationDuration: '16s' }} />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary uppercase mb-1">
                  <span>STEP 1 IN ACTION</span> &bull; <span>DISCOVERY MEETING</span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-foreground leading-tight">
                  Not Sure Which Track Suits Your School?
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1 max-w-xl">
                  Our academic experts will visit your campus or meet virtually to audit your existing computer labs, student numbers, and curriculum priorities at no cost.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full sm:w-auto px-7 h-12 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <span>Request Free Discovery Meeting</span>
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
