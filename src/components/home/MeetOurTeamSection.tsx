'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Users, 
  Target, 
  Lightbulb, 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  color: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mr. Sandip",
    role: "Founder & Academic Director",
    image: "/images/testimonials/director_vikram.jpg",
    color: "#7928CA"
  },
  {
    name: "Mr. Asish",
    role: "Head of STEM Pedagogy",
    image: "/images/testimonials/mentor_rajesh.jpg",
    color: "#6366F1"
  },
  {
    name: "Mr. Ashutosh",
    role: "Lead AI & Robotics Architect",
    image: "/images/testimonials/director_vikram.jpg",
    color: "#0284C7"
  },
  {
    name: "Mr. Shivam",
    role: "Director of Institutional Alliances",
    image: "/images/testimonials/mentor_rajesh.jpg",
    color: "#7C3AED"
  },
  {
    name: "Mr. Jitendra",
    role: "Lead Hardware & Electronics Trainer",
    image: "/images/testimonials/director_vikram.jpg",
    color: "#EA580C"
  },
  {
    name: "Mr. Akash",
    role: "Senior Robotics & Drone Mentor",
    image: "/images/testimonials/mentor_rajesh.jpg",
    color: "#D946EF"
  },
  {
    name: "Mr. Gaurav",
    role: "Curriculum & Operations Specialist",
    image: "/images/testimonials/director_vikram.jpg",
    color: "#059669"
  },
  {
    name: "Mr. Dev",
    role: "AI LMS & Cloud Platform Lead",
    image: "/images/testimonials/mentor_rajesh.jpg",
    color: "#2563EB"
  }
];

const CORE_VALUES = [
  {
    title: "Expertise",
    desc: "Industry & academic experts with deep subject knowledge.",
    icon: Users,
    color: "#7928CA"
  },
  {
    title: "Passion",
    desc: "Driven by passion to inspire and empower students.",
    icon: Target,
    color: "#0284C7"
  },
  {
    title: "Innovation",
    desc: "Committed to innovative teaching and future skills.",
    icon: Lightbulb,
    color: "#6366F1"
  },
  {
    title: "Mentorship",
    desc: "Guiding students with personalized mentorship.",
    icon: HeartHandshake,
    color: "#EA580C"
  },
  {
    title: "Collaboration",
    desc: "Strong team working together for excellence.",
    icon: Users,
    color: "#EC4899"
  },
  {
    title: "Integrity",
    desc: "We uphold trust, transparency & responsibility.",
    icon: ShieldCheck,
    color: "#059669"
  }
];

export default function MeetOurTeamSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { content } = useContent();
  const team = content.about.meetTeam;

  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-[15%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ── TOP HEADER: EMBLEM + TITLE + HEXAGONAL TEAM PHOTO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Left Column: Brand Emblem + Title */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            <SectionReveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#7928CA]/15 via-[#6366F1]/15 to-[#00D4FF]/15 border border-[#6366F1]/30 mb-6 shadow-sm">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/40 bg-white dark:bg-[#0B0F19] p-0.5 shadow-md flex-shrink-0">
                  <img src="/images/shorai_logo.png" alt="SHORAI" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <div className="text-xs font-mono font-black text-foreground tracking-wider uppercase">
                    {team.badge}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground font-semibold">
                    Building Future Innovators with AI &amp; Robotics
                  </div>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-4 leading-none">
                {team.title} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF3D7F] to-[#7928CA]">
                  {team.titleGradient}
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-medium mb-6">
                {team.subtitle}
              </p>
            </SectionReveal>

          </div>

          {/* Right Column: Hexagonal Team Hero Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SectionReveal delay={0.15}>
              <div className="relative w-[300px] sm:w-[380px] h-[280px] sm:h-[340px] rounded-3xl sm:rounded-[36px] overflow-hidden border-4 border-primary/40 shadow-2xl bg-card group">
                <Image
                  src="/images/seg_academy_team_quadrant.jpg"
                  alt="Shorai and SEG Academy leadership and master mentor team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 300px, 380px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 text-center px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg">
                  MASTER STEM &amp; ROBOTICS MENTORS
                </div>
              </div>
            </SectionReveal>
          </div>

        </div>

        {/* ── 6 CORE VALUE PILLARS (ROW) ── */}
        <div className="rounded-3xl p-6 sm:p-8 bg-card border-2 border-border shadow-xl mb-14 sm:mb-18">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-muted/40 border border-border/80 flex flex-col items-center text-center justify-between gap-3 hover:scale-105 hover:bg-card hover:border-primary/40 transition-all duration-300 shadow-sm"
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: val.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-foreground mb-1">
                      {val.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground font-medium leading-tight">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 8 TEAM MEMBERS HEXAGONAL GRID ── */}
        <div className="mb-14 sm:mb-18">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE LEADERSHIP &amp; MASTER TRAINERS</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-foreground">
              Passionate Minds Driving Innovation
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div 
                key={idx}
                className="group rounded-3xl p-5 bg-card border-2 border-border/80 hover:border-primary/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1.5"
              >
                {/* Hexagon Photo Frame */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 rounded-3xl overflow-hidden border-3 shadow-lg group-hover:scale-105 transition-transform duration-500" style={{ borderColor: member.color }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                <h4 
                  className="text-lg sm:text-xl font-black tracking-tight leading-tight mb-1"
                  style={{ color: member.color }}
                >
                  {member.name}
                </h4>
                <p className="text-xs font-semibold text-muted-foreground">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM STATS BANNER: TOGETHER, WE BUILD TOMORROW ── */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#FF6B00] text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 mb-2">
                TOGETHER, WE
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-3">
                BUILD TOMORROW
              </h3>
              <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                A team united by purpose, driven by passion, and committed to shaping the innovators of tomorrow.
              </p>
            </div>

            {/* Right Metrics Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">20+</div>
                <div className="text-[11px] font-mono font-bold text-white/80 uppercase mt-0.5">Team Members</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">10+</div>
                <div className="text-[11px] font-mono font-bold text-white/80 uppercase mt-0.5">Expert Trainers</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">200+</div>
                <div className="text-[11px] font-mono font-bold text-white/80 uppercase mt-0.5">Partner Schools</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-2">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">10,000+</div>
                <div className="text-[11px] font-mono font-bold text-white/80 uppercase mt-0.5">Students Impacted</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
