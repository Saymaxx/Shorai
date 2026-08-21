'use client';

import React from 'react';
import { 
  Star, 
  Quote, 
  Sparkles, 
  Bot, 
  Cpu, 
  Plane, 
  Code2 
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

const studentReviews = [
  {
    id: 1,
    name: 'Aarav Sharma',
    grade: 'Grade 9 • DPS Delhi',
    project: 'Solar Rover',
    image: '/images/students/aarav_rover.jpg',
    icon: Bot,
    color: '#7928CA',
    quote: 'Soldering my own microcontroller and coding an autonomous obstacle rover was the best part of this semester!',
    tag: 'Robotics',
  },
  {
    id: 2,
    name: 'Ananya Deshmukh',
    grade: 'Grade 10 • NPS Bangalore',
    project: 'Delivery Drone',
    image: '/images/students/ananya_drone.jpg',
    icon: Plane,
    color: '#00D4FF',
    quote: 'Assembling drone flight controllers and learning aerodynamics in our school lab inspired me to pursue aerospace.',
    tag: 'Drones',
  },
  {
    id: 3,
    name: 'Meera Iyer',
    grade: 'Grade 11 • DAV Pune',
    project: 'Bionic AI Arm',
    image: '/images/students/meera_robotarm.jpg',
    icon: Cpu,
    color: '#6366F1',
    quote: 'Building neural network models on real cameras during our Shorai AI lab gave me hands-on practical AI skills.',
    tag: 'AI & Vision',
  },
  {
    id: 4,
    name: 'Rohan Verma',
    grade: 'Grade 8 • St. Jude’s High',
    project: 'Smart IoT Sensor',
    image: '/images/students/rohan_iot.jpg',
    icon: Code2,
    color: '#10B981',
    quote: 'The mentors guided us step-by-step from breadboard wiring to live cloud telemetry dashboards.',
    tag: 'IoT & Sensors',
  },
];

export default function StudentTestimonials() {
  // Repeated items for seamless infinite loop
  const carouselItems = [...studentReviews, ...studentReviews, ...studentReviews];

  return (
    <section id="student-testimonials" className="relative py-20 sm:py-24 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      
      {/* CSS Animation Keyframes for 120fps hardware-accelerated pause-on-hover */}
      <style>{`
        @keyframes testimonialMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        .testimonial-marquee-track {
          display: flex;
          width: max-content;
          animation: testimonialMarquee 26s linear infinite;
          will-change: transform;
        }
        .testimonial-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              STUDENT VOICES &amp; SUCCESS STORIES
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-3 leading-tight">
              HEAR FROM OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">YOUNG INNOVATORS</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Real Indian school students discovering their passion for Robotics, AI, Coding, and Drones inside Shorai Innovation Labs.
            </p>
          </SectionReveal>
        </div>

      </div>

      {/* ── Compact Side-Moving Portrait Carousel ──────────────────────────── */}
      <div className="relative w-full overflow-hidden z-10 py-2">
        
        {/* Left & Right Gradient Soft Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* Continuous Side-Scrolling Track */}
        <div className="testimonial-marquee-track gap-4 sm:gap-5 px-4">
          {carouselItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-[220px] sm:w-[250px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              >
                
                {/* 1. Compact Portrait Image of Indian Student */}
                <div className="relative aspect-[3/3.2] w-full overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={`${item.name} - ${item.project}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badge: Domain Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span 
                      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm text-white border border-white/20"
                      style={{ background: `${item.color}cc` }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Bottom of Image: Project Pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
                    <div className="px-2.5 py-1.5 rounded-xl bg-background/90 backdrop-blur-md border border-border shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-[11px] font-bold text-foreground truncate">
                          {item.project}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. Compact Bottom Half: Student Quote & Identity */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
                  
                  {/* Quote */}
                  <p className="text-[11px] sm:text-xs text-foreground/90 leading-relaxed font-medium mb-3 italic line-clamp-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Student Credentials */}
                  <div className="pt-2.5 border-t border-border flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-foreground leading-snug">{item.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-medium">{item.grade}</p>
                    </div>
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      <Quote className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
