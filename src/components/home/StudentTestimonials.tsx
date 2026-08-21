'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Quote, 
  Sparkles, 
  Bot, 
  Cpu, 
  Plane, 
  Code2, 
  GraduationCap, 
  CheckCircle2 
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

const studentReviews = [
  {
    id: 1,
    name: 'Aarav Sharma',
    grade: 'Grade 9 • Delhi Public School',
    project: 'Autonomous Solar Rover',
    icon: Bot,
    color: '#7928CA',
    quote: 'Before Shorai Labs came to our school, coding was just memorizing syntax. Here I soldered my own microcontroller and programmed an autonomous rover with obstacle avoidance!',
    tag: 'Robotics & Microcontrollers',
  },
  {
    id: 2,
    name: 'Ananya Deshmukh',
    grade: 'Grade 11 • National Public School, Bangalore',
    project: 'AI Crop Disease Detector',
    icon: Cpu,
    color: '#6366F1',
    quote: 'Building neural network models on real cameras during our weekly Shorai AI lab inspired me to pursue Artificial Intelligence engineering. Our team won 1st place in the state hackathon!',
    tag: 'Computer Vision & AI',
  },
  {
    id: 3,
    name: 'Rohan Verma',
    grade: 'Grade 8 • Ryan International School',
    project: 'Quad-Rotor Delivery Drone',
    icon: Plane,
    color: '#00D4FF',
    quote: 'Assembling drone flight controllers and learning flight dynamics with telemetry in the school lab was the coolest experience of my school life. STEM is so exciting now.',
    tag: 'Drone Technology',
  },
  {
    id: 4,
    name: 'Meera Iyer',
    grade: 'Grade 10 • DAV Public School, Pune',
    project: 'Smart IoT Water Purifier',
    icon: Code2,
    color: '#FF6B00',
    quote: 'The mentors at Shorai are fantastic. They guided us step-by-step from breadboard circuit diagrams to full cloud telemetry dashboards.',
    tag: 'IoT & Embedded Systems',
  },
  {
    id: 5,
    name: 'Kabir Singhania',
    grade: 'Grade 7 • Birla Vidya Niketan',
    project: 'Robotic Bionic Arm',
    icon: Bot,
    color: '#10B981',
    quote: '3D printing our own gearboxes and programming servo motors made physics concepts so easy to understand. I love building things in the lab every Friday.',
    tag: '3D Prototyping',
  },
  {
    id: 6,
    name: 'Tanvi Nair',
    grade: 'Grade 12 • Kendriya Vidyalaya',
    project: 'NLP Smart School Assistant',
    icon: Sparkles,
    color: '#EC4899',
    quote: 'The Python curriculum and mentor masterclasses gave me real industry skills. I created an NLP conversational assistant that our school now uses for timetable queries!',
    tag: 'Python & NLP',
  },
];

export default function StudentTestimonials() {
  return (
    <section id="student-testimonials" className="relative py-24 sm:py-28 px-4 sm:px-6 bg-background overflow-hidden border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              STUDENT VOICES &amp; SUCCESS STORIES
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-5 leading-tight">
              HEAR FROM OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">YOUNG INNOVATORS</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Real Indian students discovering their passion for Robotics, AI, Coding, and Drones inside Shorai Innovation Labs.
            </p>
          </SectionReveal>
        </div>

        {/* 6 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {studentReviews.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SectionReveal key={item.id} delay={0.06 * idx}>
                <div className="relative p-7 sm:p-8 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                  
                  {/* Top: Project Tag & Star Rating */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span 
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{ background: `${item.color}15`, color: item.color }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-sm text-foreground/90 leading-relaxed font-medium mb-6 italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Student Details & Project Pill */}
                  <div className="pt-4 border-t border-border flex items-center gap-3.5">
                    <div 
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm"
                      style={{ background: `${item.color}20`, color: item.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-foreground">{item.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{item.grade}</p>
                      <span className="text-[11px] font-bold text-primary block mt-0.5">
                        Built: {item.project}
                      </span>
                    </div>
                  </div>

                </div>
              </SectionReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
