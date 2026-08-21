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
  Layers,
  Star,
  Activity,
  Zap,
  ChevronRight
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SpiralFlipbook, { FlipbookPage } from '@/components/shared/SpiralFlipbook';

const ecosystemStory = [
  {
    id: 'curriculum',
    number: '01',
    chapter: 'CHAPTER I &bull; FOUNDATION',
    title: 'NEP 2020 Aligned Curriculum',
    tagline: 'Structured Grade 1 to 12 STEM Pedagogy',
    desc: 'Our curriculum bridges abstract classroom theory with applied technology. Designed with progressive difficulty levels, students master algorithmic thinking, electronics, physics simulations, and machine learning from early school years.',
    icon: BookOpen,
    color: '#7928CA',
    gradient: 'from-[#7928CA] to-[#6366F1]',
    highlights: [
      'Grade-by-Grade structured textbook and digital modules',
      'Integrated with CBSE, ICSE, and State Board frameworks',
      'Real-world problem-solving and coding paradigms'
    ],
    previewData: {
      type: 'Curriculum Framework',
      metrics: [
        { label: 'Grade Range', value: '1st - 12th' },
        { label: 'Modules', value: '120+ Units' },
        { label: 'Compliance', value: '100% NEP' }
      ],
      codeSnippet: `// Grade 6-8 Algorithm Logic\nloop (distanceSensor.read() > 10cm) {\n  motorLeft.setSpeed(80);\n  motorRight.setSpeed(80);\n  rgbRing.setGlow("CYAN");\n}`
    }
  },
  {
    id: 'robotics-lab',
    number: '02',
    chapter: 'CHAPTER II &bull; INFRASTRUCTURE',
    title: 'Turnkey Robotics & Innovation Lab',
    tagline: 'Industrial Workbenches, Kits & 3D Prototyping',
    desc: 'We transform empty classroom spaces into state-of-the-art technological discovery centers. Equipped with safety-certified microcontrollers, sensors, 3D printers, soldering stations, and drone testing cages.',
    icon: Bot,
    color: '#EC4899',
    gradient: 'from-[#EC4899] to-[#FF3D7F]',
    highlights: [
      'Safety-certified robotic hardware and mechanical components',
      'Modular 3D printing & rapid prototyping stations',
      'Smart storage racks and student experiment workbenches'
    ],
    previewData: {
      type: 'Lab Hardware Stack',
      metrics: [
        { label: 'Hardware Kits', value: '30+ Per Lab' },
        { label: 'Safety Level', value: 'ISO Certified' },
        { label: '3D Precision', value: '0.1mm Print' }
      ],
      codeSnippet: `// Hardware Pin Configuration\n#define MOTOR_PIN_A 5\n#define ULTRASONIC_ECHO 12\nservoGripper.attach(9);\nservoGripper.write(90); // Arm open`
    }
  },
  {
    id: 'ai-lms',
    number: '03',
    chapter: 'CHAPTER III &bull; INTELLIGENCE',
    title: 'AI-Powered Learning Platform (LMS)',
    tagline: 'Personalized Student Paths & Real-Time Analytics',
    desc: 'Every student receives an intelligent cloud dashboard that adapts to their learning speed. Teachers track student progress, review code submissions, and generate diagnostic reports with one click.',
    icon: Laptop,
    color: '#FF6B00',
    gradient: 'from-[#FF6B00] to-[#F59E0B]',
    highlights: [
      'Automated code evaluation and instant bug diagnostics',
      'Teacher progress dashboards with live class analytics',
      'Gamified badges, streaks, and student project portfolios'
    ],
    previewData: {
      type: 'Cloud LMS Engine',
      metrics: [
        { label: 'Auto-Grading', value: '< 200ms' },
        { label: 'Analytics', value: 'Live Telemetry' },
        { label: 'Uptime', value: '99.9% Cloud' }
      ],
      codeSnippet: `// Real-Time Student Performance Metric\nAI_LMS.evaluateSubmission({\n  studentId: "STU-8821",\n  concept: "Neural Classification",\n  score: 98.4,\n  badge: "ML Explorer"\n});`
    }
  },
  {
    id: 'teacher-training',
    number: '04',
    chapter: 'CHAPTER IV &bull; FACULTY',
    title: 'Certified Teacher Empowerment',
    tagline: 'Upskilling School Educators into STEM Mentors',
    desc: 'A lab is only as good as the teachers who inspire within it. We provide continuous certification programs, step-by-step lecture plans, and 24/7 dedicated engineering mentors to support your faculty.',
    icon: GraduationCap,
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#10B981]',
    highlights: [
      'Comprehensive on-campus and virtual faculty bootcamps',
      'Ready-to-use slide decks, lesson guides, and rubric sheets',
      'Ongoing on-call technical mentor support throughout the academic year'
    ],
    previewData: {
      type: 'Faculty Enablement',
      metrics: [
        { label: 'Training Hours', value: '40+ Hours' },
        { label: 'Certification', value: 'SEG Certified' },
        { label: 'Faculty Rating', value: '4.9 / 5.0' }
      ],
      codeSnippet: `// Teacher Dashboard Assessment Report\nClassReport report = new ClassReport("Grade 8-B");\nreport.setMastery("Robotics Kinematics", 92.5);\nreport.exportToPrincipalPortal();`
    }
  },
  {
    id: 'pbl',
    number: '05',
    chapter: 'CHAPTER V &bull; DISCOVERY',
    title: 'Project-Based Learning (PBL)',
    tagline: '100% Hands-On Prototyping & Invention',
    desc: 'Students do not memorize definitions—they build solutions for real-world problems. From automated smart irrigation systems to disaster-response quadcopters, learning is tangible and exciting.',
    icon: Cpu,
    color: '#10B981',
    gradient: 'from-[#10B981] to-[#00D4FF]',
    highlights: [
      'Hands-on construction of working hardware prototypes',
      'Interdisciplinary projects fusing Math, Physics, and Coding',
      'Collaborative team innovation sprints'
    ],
    previewData: {
      type: 'Project Inventions',
      metrics: [
        { label: 'Prototypes', value: '15+ / Student' },
        { label: 'Build Method', value: 'Design Thinking' },
        { label: 'Success Rate', value: '96% Working' }
      ],
      codeSnippet: `// Smart City Prototype Sensor Logic\nif (soilMoisture < 300) {\n  relayPump.activate(5000);\n  oledDisplay.print("Watering Crops...");\n  cloudIoT.sendAlert("PUMP_ON");\n}`
    }
  },
  {
    id: 'competitions',
    number: '06',
    chapter: 'CHAPTER VI &bull; GLORY',
    title: 'Competitions & Hackathons',
    tagline: 'National & Global Competitive Arenas',
    desc: 'We groom student teams to represent your school at prestigious national Olympiads, Atal Tinkering Marathons, World Robot Olympiad (WRO), and inter-school hackathons.',
    icon: Trophy,
    color: '#00D4FF',
    gradient: 'from-[#00D4FF] to-[#6366F1]',
    highlights: [
      'Direct guidance for national & international STEM olympiads',
      'Annual Shorai inter-school innovation championships',
      'Trophies, certificates, and national student recognition'
    ],
    previewData: {
      type: 'Competitive Record',
      metrics: [
        { label: 'Awards Won', value: '50+ Medals' },
        { label: 'National Rank', value: 'Top 1%' },
        { label: 'Hackathons', value: 'Year-Round' }
      ],
      codeSnippet: `// Competition Autonomous Route Flight Plan\nWaypoints route = DroneFlight.createAutonomousRoute();\nroute.addCoordinate(0.0, 0.0, 2.5); // Takeoff\nroute.navigateMazeObstacles(ultrasonicScan());\nroute.precisionLand();`
    }
  },
  {
    id: 'career',
    number: '07',
    chapter: 'CHAPTER VII &bull; HORIZONS',
    title: 'Career Guidance & Mentorship',
    tagline: 'Connecting Classrooms with Industry Engineers',
    desc: 'Students interact with leading tech engineers, AI researchers, and aerospace experts to discover future engineering careers early, building strong resumes and college portfolios.',
    icon: Compass,
    color: '#6366F1',
    gradient: 'from-[#6366F1] to-[#7928CA]',
    highlights: [
      'Interactive guest lectures with tech industry leaders',
      'Portfolio building for prestigious engineering universities',
      'Early exploration of emerging tech domains (AI, Aerospace, IoT)'
    ],
    previewData: {
      type: 'Career Mapping',
      metrics: [
        { label: 'Tech Domains', value: '12 Horizons' },
        { label: 'Mentors', value: 'Industry Pros' },
        { label: 'Portfolio', value: 'Verified PDF' }
      ],
      codeSnippet: `// Student Engineering Portfolio\nStudentProfile student = new StudentProfile("Aarav Sharma");\nstudent.addSkills(["Embedded C++", "Computer Vision", "ROS 2"]);\nstudent.generateVerifiedBadge();`
    }
  },
  {
    id: 'parent',
    number: '08',
    chapter: 'CHAPTER VIII &bull; COMMUNITY',
    title: 'Parent Community & Showcase Expos',
    tagline: 'Visible Output that Builds Lifelong Parent Trust',
    desc: 'We organize annual on-campus Innovation Days where parents see live robot races, drone flights, and AI demonstrations created by their children, solidifying the school’s premier reputation.',
    icon: HeartHandshake,
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#EC4899]',
    highlights: [
      'Annual on-campus Shorai STEM Innovation Day',
      'Live student project demonstrations and parent voting',
      'Transparent learning growth reports shared each term'
    ],
    previewData: {
      type: 'Community Trust',
      metrics: [
        { label: 'Parent Rating', value: '98.5% Positive' },
        { label: 'Attendance', value: '100% Capacity' },
        { label: 'Enrollments', value: '+35% Growth' }
      ],
      codeSnippet: `// Innovation Day Showcase Live Vote Stream\nExpoStream.broadcast({\n  stallId: "BOT-ROVER-04",\n  votes: 420,\n  audienceFeedback: "Remarkable student innovation!"\n});`
    }
  },
];

export default function Shorai360Ecosystem() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const activeChapter = ecosystemStory[activeStoryIdx];
  const ActiveIcon = activeChapter.icon;

  // Build flipbook pages
  const flipbookPages: FlipbookPage[] = ecosystemStory.map((item, idx) => {
    const Icon = item.icon;
    return {
      id: item.id,
      pageNumber: idx + 1,
      title: item.title,
      badge: item.chapter,
      color: item.color,
      content: (
        <div className="flex flex-col justify-between h-full py-1">
          {/* Header Specs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                style={{ background: item.color }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-foreground">
                  {item.previewData.type}
                </div>
                <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE TELEMETRY</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono font-bold text-primary">
                0{item.number} // 08
              </div>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {item.previewData.metrics.map((m, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-muted/40 border border-border text-center">
                <div className="text-xs sm:text-sm font-black text-foreground mb-0.5">
                  {m.value}
                </div>
                <div className="text-[8px] sm:text-[9px] font-mono font-bold text-muted-foreground uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Code / Blueprint Terminal */}
          <div className="rounded-xl bg-black/90 text-cyan-300 p-3 border border-white/10 font-mono text-xs shadow-inner overflow-hidden mb-3">
            <div className="flex items-center justify-between text-[9px] text-muted-foreground mb-1 pb-1 border-b border-white/10">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="ml-1 text-white/70">shorai_blueprint.ts</span>
              </div>
              <span className="text-white/40">v3.60</span>
            </div>
            <pre className="overflow-x-auto text-[10px] sm:text-[11px] leading-relaxed text-emerald-400">
              <code>{item.previewData.codeSnippet}</code>
            </pre>
          </div>

          {/* Bottom verified badge */}
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Turnkey Ecosystem</span>
            </div>
            <span className="text-primary font-bold">100% Practical</span>
          </div>
        </div>
      ),
    };
  });

  return (
    <section id="ecosystem" className="relative py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] max-w-[700px] bg-primary/[0.03] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[50vw] h-[50vw] max-w-[700px] bg-secondary/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono font-bold text-secondary mb-4 shadow-sm">
              <Layers className="w-3.5 h-3.5" />
              <span>INTERACTIVE FLIPBOOK &bull; 8-CHAPTER ECOSYSTEM</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              SHORAI 360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">EDUCATION ECOSYSTEM</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg font-bold text-foreground/90 tracking-wide mb-2">
              One Unified Ecosystem. 8 Powerful Chapters.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Turn through the interactive spiral binder to explore how Shorai empowers your school across curriculum, lab hardware, AI software, and faculty enablement.
            </p>
          </SectionReveal>
        </div>

        {/* ── 2-COLUMN LAYOUT: LEFT INFO + RIGHT SPIRAL FLIPBOOK ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          
          {/* LEFT: 5 Cols Narrative & Chapter Index */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold mb-4 border"
                style={{
                  background: `${activeChapter.color}15`,
                  borderColor: `${activeChapter.color}40`,
                  color: activeChapter.color,
                }}
              >
                <ActiveIcon className="w-3.5 h-3.5" />
                <span>{activeChapter.chapter}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-2 leading-tight">
                {activeChapter.title}
              </h3>

              <div className="text-xs font-mono font-bold text-primary mb-4 uppercase tracking-wider">
                {activeChapter.tagline}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {activeChapter.desc}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 mb-6">
                {activeChapter.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs font-semibold text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Chapter Index Quick Selector */}
              <div className="space-y-1.5 mb-8">
                <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  CHAPTER SELECTOR
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ecosystemStory.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveStoryIdx(idx)}
                      className={`text-center px-2 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        activeStoryIdx === idx
                          ? 'bg-card border-primary text-primary shadow-sm ring-1 ring-primary/20'
                          : 'bg-muted/40 hover:bg-muted border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-70 mr-1">0{item.number}</span>
                      <span className="truncate">{item.title.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <MagneticWrapper>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto px-7 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>To know more about us contact us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticWrapper>
          </div>

          {/* RIGHT: 7 Cols Spiral Flipbook */}
          <div className="lg:col-span-7 flex justify-center">
            <SpiralFlipbook
              pages={flipbookPages}
              activePageIndex={activeStoryIdx}
              onPageChange={(idx) => setActiveStoryIdx(idx)}
            />
          </div>

        </div>

        {/* What Makes It Powerful + Promise Box */}
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

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
