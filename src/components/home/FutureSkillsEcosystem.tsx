'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Brain, 
  Code2, 
  Atom, 
  ShieldCheck, 
  Plane, 
  Radio, 
  Printer, 
  Glasses, 
  Cpu, 
  Lightbulb, 
  Rocket,
  Sparkles,
  ArrowRight,
  Activity,
  Zap,
  Star
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

type SkillCategory = 'all' | 'hardware' | 'software' | 'future';

const skillsData = [
  {
    id: 'robotics',
    title: 'ROBOTICS',
    category: 'hardware',
    badge: 'KINEMATICS & MOTORS',
    desc: 'Design, assemble, and program multi-axis robots. Master servo automation, sensors, and kinematics.',
    icon: Bot,
    color: '#7928CA',
    mastery: '96% Hands-On',
    level: 'Advanced'
  },
  {
    id: 'ai',
    title: 'ARTIFICIAL INTELLIGENCE',
    category: 'software',
    badge: 'NEURAL NETS & CV',
    desc: 'Understand computer vision, NLP, and machine learning models to build real-time smart student applications.',
    icon: Brain,
    color: '#6366F1',
    mastery: '98% Accuracy',
    level: 'Advanced'
  },
  {
    id: 'coding',
    title: 'CODING & PROGRAMMING',
    category: 'software',
    badge: 'PYTHON, C++ & ROS 2',
    desc: 'Master computational thinking, algorithm optimization, embedded firmware, and autonomous robotics nodes.',
    icon: Code2,
    color: '#00D4FF',
    mastery: '100% Practical',
    level: 'Core'
  },
  {
    id: 'stem',
    title: 'STEM LEARNING',
    category: 'hardware',
    badge: 'APPLIED SCIENCES',
    desc: 'Experiential science experiments fusing physics laws, mathematics formulas, and real engineering kits.',
    icon: Atom,
    color: '#10B981',
    mastery: '94% Concept Rate',
    level: 'Core'
  },
  {
    id: 'cyber',
    title: 'CYBER SECURITY',
    category: 'software',
    badge: 'ETHICAL HACKING',
    desc: 'Network protection, encryption protocols, safe web practices, and defensive cyber architecture.',
    icon: ShieldCheck,
    color: '#F59E0B',
    mastery: '92% Certified',
    level: 'Specialized'
  },
  {
    id: 'drones',
    title: 'DRONE TECHNOLOGY',
    category: 'hardware',
    badge: 'AVIONICS & FLIGHT',
    desc: 'Explore quadcopter aerodynamics, PID flight controllers, live telemetry, and autonomous waypoint routing.',
    icon: Plane,
    color: '#FF6B00',
    mastery: '95% Autonomous',
    level: 'Advanced'
  },
  {
    id: 'iot',
    title: 'INTERNET OF THINGS (IOT)',
    category: 'hardware',
    badge: 'SMART SENSORS',
    desc: 'Connect microcontrollers to cloud APIs, create smart home prototypes, and build live telemetry dashboards.',
    icon: Radio,
    color: '#EC4899',
    mastery: '93% Connected',
    level: 'Intermediate'
  },
  {
    id: '3d-printing',
    title: '3D PRINTING & CAD',
    category: 'future',
    badge: 'RAPID PROTOTYPING',
    desc: 'Transform 3D CAD design models into tangible physical prototypes using high-precision extrusion printers.',
    icon: Printer,
    color: '#8B5CF6',
    mastery: '0.1mm Precision',
    level: 'Intermediate'
  },
  {
    id: 'ar-vr',
    title: 'AR / VR IMMERSION',
    category: 'future',
    badge: 'SPATIAL COMPUTING',
    desc: 'Interactive augmented and virtual reality modules that bring complex microscopic and planetary systems to life.',
    icon: Glasses,
    color: '#3B82F6',
    mastery: '360° Spatial',
    level: 'Future'
  },
  {
    id: 'electronics',
    title: 'ELECTRONICS & CIRCUITS',
    category: 'hardware',
    badge: 'EMBEDDED LOGIC',
    desc: 'Master circuit board breadboarding, soldering techniques, microcontrollers, logic ICs, and power distribution.',
    icon: Cpu,
    color: '#14B8A6',
    mastery: '97% Circuit Lab',
    level: 'Core'
  },
  {
    id: 'design-thinking',
    title: 'DESIGN THINKING',
    category: 'future',
    badge: 'CREATIVE IDEATION',
    desc: 'Empathy-led problem definition, structured user research, iterative prototyping, and user testing.',
    icon: Lightbulb,
    color: '#EAB308',
    mastery: '100% Creative',
    level: 'Methodology'
  },
  {
    id: 'startup',
    title: 'INNOVATION & STARTUP',
    category: 'future',
    badge: 'ENTREPRENEURSHIP',
    desc: 'Pitching student inventions, building viable product roadmaps, and preparing young minds for global leadership.',
    icon: Rocket,
    color: '#EF4444',
    mastery: 'National Pitch',
    level: 'Leadership'
  },
];

const categories = [
  { id: 'all', label: 'All 12 Tech Domains' },
  { id: 'hardware', label: 'Robotics & Hardware' },
  { id: 'software', label: 'AI & Software' },
  { id: 'future', label: 'Future Tech & Prototyping' },
];

export default function FutureSkillsEcosystem() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { content } = useContent();
  const skills = content.whyShorai.futureSkills;

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              {skills.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">{skills.titleGradient}</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {skills.subtitle}
            </p>
          </SectionReveal>
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as SkillCategory)}
                className={`relative px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isSelected 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground bg-card/60 hover:bg-card border border-border'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-skill-cat"
                    className="absolute inset-0 rounded-2xl bg-card border border-primary/40 shadow-md ring-2 ring-primary/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 12 Skills Dynamic Animated Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => {
              const Icon = skill.icon;
              const isHovered = hoveredSkill === skill.id;

              return (
                <motion.div
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="p-6 rounded-3xl bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
                >
                  {/* Glowing background gradient on hover */}
                  <div 
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-25 transition-opacity pointer-events-none"
                    style={{ background: skill.color }}
                  />

                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                        style={{ background: `${skill.color}15`, color: skill.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <span 
                        className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border shadow-sm"
                        style={{ 
                          background: `${skill.color}10`, 
                          borderColor: `${skill.color}30`,
                          color: skill.color 
                        }}
                      >
                        {skill.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-black text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                      {skill.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      {skill.desc}
                    </p>
                  </div>

                  {/* Bottom Metric Pill & Level */}
                  <div className="pt-3.5 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1 text-foreground font-bold">
                      <Activity className="w-3 h-3 text-emerald-500" />
                      {skill.mastery}
                    </span>
                    <span className="text-primary font-bold">{skill.level}</span>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-12 bg-card border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase block mb-1">
                COMPREHENSIVE K-12 COVERAGE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                All 12 domains integrated into a single unified school curriculum.
              </h3>
            </div>

            <MagneticWrapper>
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105 whitespace-nowrap"
              >
                <span>To know more about us contact us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticWrapper>
          </div>
        </SectionReveal>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
