'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Bot, 
  Laptop, 
  GraduationCap, 
  Cpu, 
  Trophy, 
  Compass, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Layers
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const ecosystemPillars = [
  {
    id: 'curriculum',
    number: '01',
    title: 'CURRICULUM',
    badge: 'NEP Aligned',
    desc: 'Industry relevant & future-focused structured syllabus tailored for K-12 students with progressive difficulty grades.',
    icon: BookOpen,
    color: '#7928CA',
  },
  {
    id: 'robotics-lab',
    number: '02',
    title: 'ROBOTICS & INNOVATION LAB',
    badge: 'State-of-the-Art',
    desc: 'Turnkey lab setup with safety certified robotics kits, microcontrollers, sensors, 3D printers, and test workbenches.',
    icon: Bot,
    color: '#EC4899',
  },
  {
    id: 'ai-lms',
    number: '03',
    title: 'AI LEARNING PLATFORM (LMS)',
    badge: 'Smart Dashboards',
    desc: 'Personalized student learning paths, assignment tracking, automated assessments & real-time analytics for teachers.',
    icon: Laptop,
    color: '#FF6B00',
  },
  {
    id: 'teacher-training',
    number: '04',
    title: 'TEACHER EMPOWERMENT',
    badge: 'Faculty Training',
    desc: 'Comprehensive training, lesson plans, teaching aids & ongoing mentorship so educators can teach cutting-edge STEM confidently.',
    icon: GraduationCap,
    color: '#F59E0B',
  },
  {
    id: 'pbl',
    number: '05',
    title: 'PROJECT BASED LEARNING',
    badge: '100% Practical',
    desc: 'Hands-on projects where students design, build, and troubleshoot real working prototypes rather than just memorizing theory.',
    icon: Cpu,
    color: '#10B981',
  },
  {
    id: 'competitions',
    number: '06',
    title: 'COMPETITIONS & HACKATHONS',
    badge: 'Global Stages',
    desc: 'Direct access to national & international robotics Olympiads, AI challenges, science fairs, and inter-school hackathons.',
    icon: Trophy,
    color: '#00D4FF',
  },
  {
    id: 'career',
    number: '07',
    title: 'CAREER GUIDANCE & COUNSELLING',
    badge: 'Future Mapping',
    desc: 'Early career exploration, guest lectures with industry engineers, resume building & soft-skill development.',
    icon: Compass,
    color: '#6366F1',
  },
  {
    id: 'parent',
    number: '08',
    title: 'PARENT ENGAGEMENT',
    badge: 'Open Communication',
    desc: 'Regular innovation showcases, project exhibitions, learning progress updates & awareness sessions for parents.',
    icon: HeartHandshake,
    color: '#8B5CF6',
  },
];

export default function Shorai360Ecosystem() {
  const [activePillar, setActivePillar] = useState(ecosystemPillars[0]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="ecosystem" className="relative py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] bg-primary/[0.025] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono font-bold text-secondary mb-4">
              <Layers className="w-3.5 h-3.5" />
              INTEGRATED TRANSFORMATION MODEL
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              SHORAI 360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">EDUCATION ECOSYSTEM</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg font-bold text-foreground/90 tracking-wide mb-2">
              One Partner. Endless Possibilities.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              A complete, end-to-end solution that transforms schools into future-ready learning environments. From modern lab infrastructure to teacher empowerment and student development, Shorai delivers everything through one trusted partner.
            </p>
          </SectionReveal>
        </div>

        {/* 8-Pillars Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {ecosystemPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activePillar.id === pillar.id;

            return (
              <SectionReveal key={pillar.id} delay={0.06 * idx}>
                <div
                  onClick={() => setActivePillar(pillar)}
                  className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 h-full flex flex-col justify-between group relative overflow-hidden border ${
                    isSelected 
                      ? 'bg-card border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20 scale-[1.02]' 
                      : 'bg-card/70 hover:bg-card border-border hover:border-primary/40 shadow-sm'
                  }`}
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                        style={{ background: `${pillar.color}15`, color: pillar.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-muted-foreground/60">
                        {pillar.number}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span 
                        className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5"
                        style={{ background: `${pillar.color}15`, color: pillar.color }}
                      >
                        {pillar.badge}
                      </span>
                      <h4 className="text-base font-bold text-foreground leading-snug">
                        {pillar.title}
                      </h4>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono text-primary font-bold">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* What Makes It Powerful + Our Promise Box */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-12 bg-card border border-border shadow-sm mb-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase block mb-2">
                  WHAT MAKES IT POWERFUL?
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-4 leading-tight">
                  Complete End-to-End School Transformation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Unlike fragmented vendors who sell disconnected kits or software, Shorai takes 360° responsibility for school transformation: from curriculum and lab hardware to certified teacher training, AI platform management, and national hackathon participation.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 text-xs font-semibold text-foreground/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>NEP 2020 Compliant STEM Curriculum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Safety Certified Robotics Hardware</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Continuous Faculty Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Regular Parent &amp; Student Exhibitions</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent border border-primary/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-mono font-bold text-xs uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4" />
                    OUR PROMISE
                  </div>
                  <p className="text-base sm:text-lg font-bold text-foreground leading-snug mb-6">
                    &ldquo;Empowering schools with a unified ecosystem that inspires innovation, nurtures talent, and prepares every student for the future.&rdquo;
                  </p>
                </div>

                <MagneticWrapper>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <span>To know more about us contact us</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticWrapper>
              </div>

            </div>
          </div>
        </SectionReveal>

        {/* Bottom Slogan Banner */}
        <div className="text-center">
          <p className="text-base sm:text-xl font-bold text-foreground/90 tracking-tight">
            Together, Let&apos;s Build Future-Ready Schools for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00]">
              Future-Ready India.
            </span>
          </p>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
