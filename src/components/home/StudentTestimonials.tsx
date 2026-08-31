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
import { useContent } from '@/context/ContentContext';

const DEFAULT_AVATARS: Record<string, string> = {
  Robotics: '/images/students/aarav_rover.jpg',
  Drones: '/images/students/ananya_drone.jpg',
  'AI & Vision': '/images/students/meera_robotarm.jpg',
  'IoT & Sensors': '/images/students/rohan_iot.jpg',
};

const ICONS_MAP: Record<string, any> = {
  Robotics: Bot,
  Drones: Plane,
  'AI & Vision': Cpu,
  'IoT & Sensors': Code2,
};

const COLORS_MAP: Record<string, string> = {
  Robotics: '#7928CA',
  Drones: '#00D4FF',
  'AI & Vision': '#6366F1',
  'IoT & Sensors': '#10B981',
};

export default function StudentTestimonials() {
  const { content } = useContent();
  const testData = content.home.testimonials;

  const reviewsList = testData.reviews.map(r => ({
    ...r,
    image: DEFAULT_AVATARS[r.tag] || '/images/students/aarav_rover.jpg',
    icon: ICONS_MAP[r.tag] || Bot,
    color: COLORS_MAP[r.tag] || '#7928CA',
  }));

  // Repeated items for seamless infinite loop
  const carouselItems = [...reviewsList, ...reviewsList, ...reviewsList];

  return (
    <section id="student-testimonials" className="relative py-20 sm:py-24 px-4 sm:px-6 bg-transparent overflow-hidden border-t border-border">
      
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
        }
        .testimonial-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 md:w-[700px] h-48 md:h-[350px] bg-gradient-to-tr from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 rounded-full blur-[40px] md:blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {testData.badge}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
              {testData.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">{testData.titleGradient}</span>
            </h2>
          </SectionReveal>

          {testData.subtitle && (
            <SectionReveal delay={0.12}>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 font-medium">
                {testData.subtitle}
              </p>
            </SectionReveal>
          )}
        </div>

      </div>

      {/* ── Compact Side-Moving Portrait Carousel ──────────────────────────── */}
      <div className="relative w-full overflow-hidden z-10 py-2">
        
        {/* Left & Right Gradient Soft Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-r from-background/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-l from-background/60 to-transparent z-20 pointer-events-none" />

        {/* Continuous Side-Scrolling Track */}
        <div className="testimonial-marquee-track gap-5 sm:gap-6 px-4">
          {carouselItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-[320px] sm:w-[380px] shrink-0 rounded-3xl p-6 sm:p-7 bg-card/85 backdrop-blur-md border border-border/80 hover:border-primary/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                {/* Subtle top color highlight */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5 opacity-80"
                  style={{ background: item.color }}
                />

                <div>
                  {/* Top Bar: Domain Tag + 5 Stars */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border text-[10px] font-mono font-bold uppercase tracking-wider text-foreground">
                      <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                      <span>{item.tag}</span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
                      ))}
                    </div>
                  </div>

                  {/* Project Highlight Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-bold mb-3">
                    <span>{item.project}</span>
                  </div>

                  {/* Bigger, High-Legibility Student Quote */}
                  <div className="relative mb-5">
                    <Quote className="w-8 h-8 text-primary/10 absolute -top-2 -left-1 pointer-events-none" />
                    <p className="text-sm sm:text-base text-foreground font-semibold leading-relaxed relative z-10 pl-2">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom Student Profile: Small Icon-Sized Avatar + Identity */}
                <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Small Icon-Sized Avatar Image */}
                    <div 
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 shadow-sm shrink-0 bg-muted"
                      style={{ borderColor: item.color }}
                    >
                      <img
                        src={item.image}
                        alt={`${item.name}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-foreground truncate leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">
                        {item.grade}
                      </p>
                    </div>
                  </div>

                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-4 h-4" />
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
