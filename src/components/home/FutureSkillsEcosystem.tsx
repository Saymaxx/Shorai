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
  Star,
  CheckCircle2,
  X,
  Layers,
  Wrench,
  GraduationCap
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { useContent } from '@/context/ContentContext';

type SkillCategory = 'all' | 'hardware' | 'software' | 'future';

export interface TechDomain {
  id: string;
  title: string;
  category: 'hardware' | 'software' | 'future';
  badge: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  mastery: string;
  level: string;
  projects: string[];
  tools: string[];
  nepFocus: string;
}

const skillsData: TechDomain[] = [
  {
    id: 'robotics',
    title: 'ROBOTICS',
    category: 'hardware',
    badge: 'KINEMATICS & MOTORS',
    desc: 'Design, assemble, and program multi-axis robots. Master servo automation, sensors, and kinematics.',
    icon: Bot,
    color: '#7928CA',
    mastery: '96% Hands-On',
    level: 'Advanced',
    projects: ['Articulated 4-DOF Robotic Arm', 'Autonomous Line & Obstacle Rover', 'Bionic Prosthetic Hand'],
    tools: ['Arduino Mega', 'Servo Actuators', 'Ultrasonic Sensors', 'Metal Chassis'],
    nepFocus: 'NEP 2020 Hands-on Vocational Engineering'
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
    level: 'Advanced',
    projects: ['Real-Time Facial & Object Detector', 'AI Voice Assistant with Speech NLP', 'Gesture-Controlled Interface'],
    tools: ['Python 3', 'OpenCV', 'TensorFlow Lite', 'Edge Vision Cameras'],
    nepFocus: 'Foundational AI & Computational Logic'
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
    level: 'Core',
    projects: ['Autonomous Drone Flight Script', 'Multi-threaded Maze Solver Algorithm', 'Full-Stack Student Web App'],
    tools: ['Python', 'C++', 'Blockly to Text IDE', 'Linux ROS 2'],
    nepFocus: 'Computational Thinking (Grade 3-12)'
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
    level: 'Core',
    projects: ['Hydraulic Lift & Pressure Simulator', 'Solar-Powered Smart Irrigation', 'Centrifugal Planetary Orbit Rig'],
    tools: ['Pneumatic Actuators', 'Solar Panels', 'Dynamometers', 'Physics Kits'],
    nepFocus: 'Applied Experiential Sciences'
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
    level: 'Specialized',
    projects: ['Safe Penetration Testing Sandbox', 'Data Packet & Network Sniffer', 'RSA Encryption Decoder'],
    tools: ['Wireshark', 'Python Crypto Lib', 'Firewall Simulator', 'Linux Kali'],
    nepFocus: 'Digital Safety & Ethical Security'
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
    level: 'Advanced',
    projects: ['Indoor Safe Drone Flight Obstacle Run', 'LiDAR 3D Topography Mapping', 'Swarm Telemetry Relay'],
    tools: ['Quadcopter Kits', 'ESC Controllers', '2.4GHz Telemetry', 'Flight Simulators'],
    nepFocus: 'Aviation & Aeromodelling'
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
    level: 'Intermediate',
    projects: ['Smart Campus Weather Station', 'Automated RFID Attendance Gate', 'Soil Moisture IoT Pipeline'],
    tools: ['ESP32 / NodeMCU', 'DHT22 Sensors', 'MQTT Broker', 'Cloud Dashboard'],
    nepFocus: 'Smart Connected Systems'
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
    level: 'Intermediate',
    projects: ['Custom Robot Chassis & Gears', 'Aerodynamic Drone Propeller Design', 'Architectural School Blueprint'],
    tools: ['TinkerCAD / Fusion 360', 'FDM 3D Printers', 'PLA Filaments', 'Cura Slicer'],
    nepFocus: 'Design, Manufacturing & Prototyping'
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
    level: 'Future',
    projects: ['3D Human Anatomy VR Explorer', 'Solar System Augmented Overlay', 'Virtual Robotics Assembly Lab'],
    tools: ['Unity Engine', 'WebXR', 'AR Core', 'VR Headsets'],
    nepFocus: 'Spatial & Immersive Learning'
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
    level: 'Core',
    projects: ['Traffic Light Logic Controller', 'Sound-Reactive LED VU Meter', 'Solar Inverter Circuit Breadboard'],
    tools: ['Soldering Stations', 'Breadboards', 'Multimeters', 'Logic Gates (AND/OR/NOT)'],
    nepFocus: 'Hardware & Circuit Engineering'
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
    level: 'Methodology',
    projects: ['Community Clean Energy Solution', 'Smart Assistive Device for Seniors', 'Ergonomic Classroom Desks'],
    tools: ['Stanford d.school Framework', 'User Journey Canvas', 'Rapid Cardboard Prototypes'],
    nepFocus: 'Creative Problem Solving & Empathy'
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
    level: 'Leadership',
    projects: ['Student EdTech Business Pitch Deck', 'Patent Blueprint for Robotics Invention', 'School Shark Tank Demo'],
    tools: ['Lean Canvas', 'Pitch Decks', 'Financial Modeling Sheets', 'Prototyping Kits'],
    nepFocus: 'Leadership, Pitching & Innovation'
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
  const [selectedDomain, setSelectedDomain] = useState<TechDomain | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);
  const { content } = useContent();
  const skills = content.whyShorai.futureSkills;

  // Split into 2 continuous moving rows (6 in Row 1, 6 in Row 2)
  const row1Skills = skillsData.slice(0, 6);
  const row2Skills = skillsData.slice(6, 12);

  // Triple for seamless continuous infinite marquee
  const row1Tripled = [...row1Skills, ...row1Skills, ...row1Skills];
  const row2Tripled = [...row2Skills, ...row2Skills, ...row2Skills];

  const renderSkillCard = (skill: TechDomain, index: number, isReversed: boolean = false) => {
    const Icon = skill.icon;
    const isCategoryActive = activeCategory === 'all' || activeCategory === skill.category;
    const isHovered = hoveredDomain === skill.id;

    return (
      <div
        key={`${skill.id}-${index}-${isReversed ? 'rev' : 'fwd'}`}
        onClick={() => setSelectedDomain(skill)}
        onMouseEnter={() => setHoveredDomain(skill.id)}
        onMouseLeave={() => setHoveredDomain(null)}
        className={`w-[290px] sm:w-[330px] lg:w-[350px] shrink-0 p-5 sm:p-6 rounded-3xl bg-card/85 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden select-none ${
          isCategoryActive ? 'opacity-100' : 'opacity-40 grayscale-[50%]'
        } ${
          isHovered 
            ? 'border-primary/80 shadow-2xl scale-[1.03] -translate-y-1.5' 
            : 'border-border/90 hover:border-primary/40 shadow-sm'
        }`}
        style={{
          boxShadow: isHovered ? `0 20px 40px -15px ${skill.color}40` : undefined
        }}
      >
        {/* Glowing background gradient on hover */}
        <div 
          className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{ background: skill.color }}
        />

        {/* Top Tag & Header */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm flex-shrink-0"
              style={{ background: `${skill.color}18`, color: skill.color }}
            >
              <Icon className="w-6 h-6" />
            </div>
            
            <span 
              className="text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border shadow-sm"
              style={{ 
                background: `${skill.color}12`, 
                borderColor: `${skill.color}35`,
                color: skill.color 
              }}
            >
              {skill.badge}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-black text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight flex items-center justify-between">
            <span>{skill.title}</span>
            <span className="text-xs font-mono font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Details <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {skill.desc}
          </p>

          {/* Key Sample Project Tag */}
          <div className="mb-4 px-3 py-1.5 rounded-xl bg-muted/60 border border-border/80 text-[11px] font-mono text-foreground/90 flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate font-semibold">{skill.projects[0]}</span>
          </div>
        </div>

        {/* Bottom Metric Pill & Level */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground font-semibold">
          <span className="flex items-center gap-1 text-foreground font-bold">
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            {skill.mastery}
          </span>
          <span className="font-bold px-2 py-0.5 rounded-md bg-muted text-primary">{skill.level}</span>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-transparent overflow-hidden border-t border-border transition-colors duration-300">
      
      {/* CSS Hardware-Accelerated 120fps Infinite Seamless Marquee Styles */}
      <style>{`
        @keyframes skillsMarqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        @keyframes skillsMarqueeRight {
          0% {
            transform: translate3d(-33.333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .skills-marquee-track-left {
          display: flex;
          width: max-content;
          animation: skillsMarqueeLeft 36s linear infinite;
        }
        .skills-marquee-track-right {
          display: flex;
          width: max-content;
          animation: skillsMarqueeRight 36s linear infinite;
        }
        .skills-marquee-track-left:hover,
        .skills-marquee-track-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{skills.badge || '12 FUTURE TECH DOMAINS'}</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              {skills.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">{skills.titleGradient}</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
              {skills.subtitle}
            </p>
          </SectionReveal>
        </div>

        {/* Dynamic Category Filter Tabs (Focuses/Highlights matching cards in continuous carousel) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as SkillCategory)}
                className={`relative px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground bg-card hover:bg-muted border border-border shadow-sm'
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

      </div>

      {/* ── CONTINUOUS MOVING 2-ROW MARQUEE CAROUSEL ── */}
      <div className="relative w-full overflow-hidden z-10 space-y-6 sm:space-y-8 py-2">
        
        {/* Left & Right Edge Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-background/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-background/60 to-transparent z-20 pointer-events-none" />

        {/* Row 1: Continuous Moving Left Track */}
        <div className="skills-marquee-track-left gap-5 sm:gap-6 px-4">
          {row1Tripled.map((skill, idx) => renderSkillCard(skill, idx, false))}
        </div>

        {/* Row 2: Continuous Moving Right Track */}
        <div className="skills-marquee-track-right gap-5 sm:gap-6 px-4">
          {row2Tripled.map((skill, idx) => renderSkillCard(skill, idx, true))}
        </div>

      </div>

      {/* ── BOTTOM SUMMARY CTA STRIP ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-14 relative z-10">
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-6 sm:p-10 bg-card/75 backdrop-blur-xl border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase block mb-1">
                COMPREHENSIVE K-12 COVERAGE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                All 12 tech domains integrated into a single unified school STEM curriculum.
              </h3>
            </div>

            <MagneticWrapper>
              <a
                href="https://www.segacademy.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md inline-flex items-center gap-2 transition-all hover:scale-105 whitespace-nowrap"
              >
                <span>To know more about us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticWrapper>
          </div>
        </SectionReveal>
      </div>

      {/* ── INTERACTIVE DOMAIN INSPECTION MODAL ── */}
      <AnimatePresence>
        {selectedDomain && (
          <div 
            className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDomain(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-card border-2 shadow-2xl z-10 my-6"
              style={{ borderColor: `${selectedDomain.color}60` }}
            >
              {/* Header Colored Strip */}
              <div 
                className="h-2.5 w-full"
                style={{ background: `linear-gradient(to right, ${selectedDomain.color}, #00D4FF)` }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedDomain(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-muted/80 hover:bg-muted border border-border flex items-center justify-center text-foreground hover:scale-105 transition-all shadow-sm"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                
                {/* Top Badge & Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                    style={{ background: `${selectedDomain.color}20`, color: selectedDomain.color }}
                  >
                    {React.createElement(selectedDomain.icon, { className: 'w-8 h-8' })}
                  </div>

                  <div>
                    <span 
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border mb-1.5 inline-block"
                      style={{ 
                        background: `${selectedDomain.color}15`, 
                        borderColor: `${selectedDomain.color}40`,
                        color: selectedDomain.color 
                      }}
                    >
                      {selectedDomain.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                      {selectedDomain.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium mb-6">
                  {selectedDomain.desc}
                </p>

                {/* Hands-On Student Projects */}
                <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase">
                    <Layers className="w-4 h-4" />
                    <span>Hands-On Student Projects Built In Lab:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDomain.projects.map((proj, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground bg-card p-2.5 rounded-xl border border-border/60">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hardware Kits & NEP Standard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/80">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground uppercase mb-2">
                      <Wrench className="w-3.5 h-3.5 text-primary" />
                      <span>Hardware Kits &amp; Tools:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDomain.tools.map((tool, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-card border border-border font-mono font-medium text-foreground">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground uppercase mb-2">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Curriculum &amp; Standard:</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-foreground">
                      {selectedDomain.nepFocus}
                    </p>
                    <span className="text-[11px] font-mono text-emerald-500 font-bold mt-1">
                      ● {selectedDomain.mastery}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-border">
                  <button
                    onClick={() => setSelectedDomain(null)}
                    className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-xs sm:text-sm font-bold text-foreground transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDomain(null);
                      setIsContactOpen(true);
                    }}
                    className="px-6 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2"
                    style={{ background: `linear-gradient(to right, ${selectedDomain.color}, #6366F1)` }}
                  >
                    <span>Request Lab Setup For This Domain</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
