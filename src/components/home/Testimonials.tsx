'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles, Building2, GraduationCap, Users, LucideIcon } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  institution: string;
  badge: string;
  badgeIcon: LucideIcon;
  image: string;
  quote: string;
  rating: number;
  tags: string[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sunita Kulkarni",
    role: "Principal",
    institution: "National Public School, Bengaluru",
    badge: "SCHOOL LEADERSHIP",
    badgeIcon: Building2,
    image: "/images/testimonials/principal_sunita.jpg",
    quote: "Partnering with Shorai and SEG Academy transformed our academic perception. Our students from Grade 6 onwards are now designing autonomous rovers and coding AI models with genuine confidence.",
    rating: 5,
    tags: ["Turnkey AI Labs", "NEP 2020 Aligned"]
  },
  {
    id: 2,
    name: "Rajesh Nair",
    role: "Head of STEM & Robotics Lab",
    institution: "Modern Academy, Delhi NCR",
    badge: "STEM FACULTY",
    badgeIcon: GraduationCap,
    image: "/images/testimonials/mentor_rajesh.jpg",
    quote: "The turnkey lab setup and master trainer enablement are exceptional. Unlike vendors who just drop hardware boxes, Shorai provides year-round lesson plans, rubrics, and faculty mentoring.",
    rating: 5,
    tags: ["Teacher Enablement", "Robotics Kits"]
  },
  {
    id: 3,
    name: "Pooja Agarwal",
    role: "Parent of Grade 9 Student & Tech Lead",
    institution: "Whitefield, Bengaluru",
    badge: "PARENT PERSPECTIVE",
    badgeIcon: Users,
    image: "/images/testimonials/parent_pooja.jpg",
    quote: "Seeing my daughter showcase her computer vision drone at the campus innovation day was breathtaking. Shorai is instilling applied engineering skills that traditional schools usually miss.",
    rating: 5,
    tags: ["Drone Technology", "Applied Coding"]
  },
  {
    id: 4,
    name: "Dr. Vikram Singh Rathore",
    role: "Managing Director & Trustee",
    institution: "Heritage International Academy, Jaipur",
    badge: "INSTITUTIONAL TRUSTEE",
    badgeIcon: Building2,
    image: "/images/testimonials/director_vikram.jpg",
    quote: "Shorai's 360° ecosystem gave our institution a distinct competitive edge. Parent trust has soared, and our innovation lab has become the absolute crown jewel of our campus.",
    rating: 5,
    tags: ["Campus Transformation", "Future Skills"]
  }
];

export default function Testimonials() {
  // Tripled items for smooth continuous infinite loop
  const tripled = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border">
      
      {/* CSS Animation Keyframes for 120fps hardware-accelerated marquee */}
      <style>{`
        @keyframes educatorTestimonialMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        .educator-testimonial-track {
          display: flex;
          width: max-content;
          animation: educatorTestimonialMarquee 34s linear infinite;
        }
        .educator-testimonial-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[40px] md:blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[40px] md:blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INSTITUTIONAL VOICES &amp; EXPERIENCES</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight">
              WHAT EDUCATORS &amp; PARENTS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                SAY ABOUT SHORAI
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Real feedback from Indian school leaders, STEM educators, and parents experiencing the transformative impact of Shorai Innovation Labs.
            </p>
          </SectionReveal>
        </div>

      </div>

      {/* ── Continuous Marquee Carousel (120fps Hardware Accelerated) ── */}
      <div className="relative w-full overflow-hidden z-10 py-2">
        
        {/* Edge Gradient Masks for Smooth Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Track */}
        <div className="educator-testimonial-track gap-5 sm:gap-6 px-4">
          {tripled.map((item, idx) => {
            const BadgeIcon = item.badgeIcon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-[320px] sm:w-[400px] flex-shrink-0 p-6 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-md hover:shadow-2xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Card Top: Reviewer Badge + 5 Stars */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border text-[10px] font-mono font-bold uppercase tracking-wider text-foreground">
                      <BadgeIcon className="w-3.5 h-3.5 text-primary" />
                      <span>{item.badge}</span>
                    </div>

                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bigger Review Quote with subtle quote icon */}
                  <div className="relative mb-5">
                    <Quote className="w-8 h-8 text-primary/10 absolute -top-2 -left-1 pointer-events-none" />
                    <p className="text-sm sm:text-base text-foreground font-semibold leading-relaxed relative z-10 pl-2">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary text-[11px] font-bold border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Reviewer Profile: Small Icon-Sized Avatar + Identity */}
                  <div className="pt-3.5 border-t border-border flex items-center gap-3">
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-primary/30 shadow-sm flex-shrink-0 bg-muted">
                      <img
                        src={item.image}
                        alt={`${item.name} portrait`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-sm font-black text-foreground truncate leading-tight">
                        {item.name}
                      </h4>
                      <div className="text-xs font-bold text-primary truncate mt-0.5">
                        {item.role}
                      </div>
                      <div className="text-[11px] font-medium text-muted-foreground truncate">
                        {item.institution}
                      </div>
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
