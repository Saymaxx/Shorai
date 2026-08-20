'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, PenTool, Cpu, Users, Rocket, ArrowRight, Sparkles } from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const steps = [
  {
    num: "01",
    title: "ASSESS",
    desc: "Evaluate your school infrastructure, student strength, and NEP goals.",
    icon: Search,
    image: "/images/assess_card.png",
    color: "#7928CA"
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Architect a customized AI, Robotics & STEM Innovation Lab layout.",
    icon: PenTool,
    image: "/images/design_card.png",
    color: "#6366F1"
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Deliver safety-certified robotic kits, microcontrollers & 3D workstations.",
    icon: Cpu,
    image: "/images/build_card.png",
    color: "#00D4FF"
  },
  {
    num: "04",
    title: "ENABLE",
    desc: "Train educators and empower students with hands-on lesson plans.",
    icon: Users,
    image: "/images/enable_card.png",
    color: "#10B981"
  },
  {
    num: "05",
    title: "TRANSFORM",
    desc: "Launch student projects, hackathons, and build a premier STEM brand.",
    icon: Rocket,
    image: "/images/transform_card.png",
    color: "#FF6B00"
  }
];

export default function InteractiveTechnology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  return (
    <section 
      ref={containerRef} 
      id="technology" 
      className="relative bg-muted/20 overflow-hidden flex flex-col items-center py-28 px-4 sm:px-6 border-t border-border transition-colors duration-300"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] max-w-[500px] bg-primary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              METHODOLOGY &bull; 5-STEP ROADMAP
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
              HOW SHORAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">TRANSFORMS SCHOOLS</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              From initial audit to fully active STEM competitions, our seamless 5-step roadmap ensures rapid, high-impact institutional transformation.
            </p>
          </SectionReveal>
        </div>

        {/* 5-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <SectionReveal key={step.num} delay={0.06 * idx}>
                <div className="p-6 rounded-3xl bg-card border border-border hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="text-xs font-mono font-black px-2.5 py-1 rounded-lg shadow-sm"
                        style={{ background: `${step.color}15`, color: step.color }}
                      >
                        STEP {step.num}
                      </span>
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    <h4 className="text-base font-black text-foreground mb-2 tracking-wide">
                      {step.title}
                    </h4>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      {step.desc}
                    </p>
                  </div>

                  {/* Card Visual preview */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-muted border border-border">
                    <Image 
                      src={step.image} 
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <MagneticWrapper>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-md inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>To know more about us contact us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticWrapper>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
