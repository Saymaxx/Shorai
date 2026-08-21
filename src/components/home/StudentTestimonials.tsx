'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Quote, 
  Sparkles, 
  Bot, 
  Cpu, 
  Plane, 
  Code2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

const studentReviews = [
  {
    id: 1,
    name: 'Aarav Sharma',
    grade: 'Grade 9 • Delhi Public School',
    project: 'Autonomous Solar Rover',
    image: '/images/students/aarav_rover.jpg',
    icon: Bot,
    color: '#7928CA',
    quote: 'Before Shorai Labs came to our school, coding was just memorizing syntax. Here I soldered my own microcontroller and programmed an autonomous rover with obstacle avoidance!',
    tag: 'Robotics & Microcontrollers',
  },
  {
    id: 2,
    name: 'Ananya Deshmukh',
    grade: 'Grade 10 • National Public School, Bangalore',
    project: 'Autonomous Delivery Drone',
    image: '/images/students/ananya_drone.jpg',
    icon: Plane,
    color: '#00D4FF',
    quote: 'Assembling drone flight controllers and learning aerodynamics in our school lab was the coolest experience. We won 1st place in the state STEM challenge!',
    tag: 'Drone Technology',
  },
  {
    id: 3,
    name: 'Meera Iyer',
    grade: 'Grade 11 • DAV Public School, Pune',
    project: 'AI Robotic Bionic Arm',
    image: '/images/students/meera_robotarm.jpg',
    icon: Cpu,
    color: '#6366F1',
    quote: 'Building neural network computer vision models on real cameras during our Shorai AI lab inspired me to pursue Artificial Intelligence engineering.',
    tag: 'Computer Vision & AI',
  },
  {
    id: 4,
    name: 'Rohan Verma',
    grade: 'Grade 8 • St. Jude’s High School',
    project: 'Smart IoT Climate Monitor',
    image: '/images/students/rohan_iot.jpg',
    icon: Code2,
    color: '#10B981',
    quote: 'The mentors at Shorai are fantastic. They guided us step-by-step from breadboard circuit wiring to full cloud telemetry dashboards.',
    tag: 'IoT & Embedded Systems',
  },
];

export default function StudentTestimonials() {
  const [isPaused, setIsPaused] = useState(false);

  // Doubled array for infinite side-moving continuous loop
  const carouselItems = [...studentReviews, ...studentReviews];

  return (
    <section id="student-testimonials" className="relative py-24 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              STUDENT VOICES &amp; SUCCESS STORIES
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              HEAR FROM OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">YOUNG INNOVATORS</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Real Indian school students discovering their passion for Robotics, AI, Coding, and Drones inside Shorai Innovation Labs.
            </p>
          </SectionReveal>
        </div>

      </div>

      {/* ── Side-Moving Portrait Carousel ────────────────────────────────── */}
      <div 
        className="relative w-full overflow-hidden z-10 py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Left & Right Gradient Soft Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* Continuous Side-Scrolling Track */}
        <motion.div
          animate={isPaused ? { x: undefined } : { x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
          className="flex gap-6 sm:gap-8 w-max px-4"
        >
          {carouselItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-[290px] sm:w-[350px] lg:w-[370px] shrink-0 rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                
                {/* 1. Top Half: Portrait Image of Indian Student with Project */}
                <div className="relative aspect-[3/3.6] w-full overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={`${item.name} - ${item.project}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badge: Domain Tag */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span 
                      className="text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md text-white border border-white/20"
                      style={{ background: `${item.color}cc` }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Bottom of Image: Project Pill */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                    <div className="px-3.5 py-2 rounded-2xl bg-background/90 backdrop-blur-md border border-border shadow-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs font-bold text-foreground truncate">
                          Built: {item.project}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. Bottom Half: Student Quote & Identity */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  
                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium mb-5 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Student Credentials */}
                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-foreground">{item.name}</h4>
                      <p className="text-[11px] text-muted-foreground font-medium">{item.grade}</p>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </motion.div>

      </div>

    </section>
  );
}
