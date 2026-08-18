'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Brain, Wrench, Microscope, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionReveal from '@/components/animations/SectionReveal';

const features = [
  {
    title: 'AI LABS',
    desc: 'Build intelligent learning environments.',
    icon: Brain,
    color: 'text-secondary',
  },
  {
    title: 'ROBOTICS LABS',
    desc: 'Hands-on engineering and automation.',
    icon: Wrench,
    color: 'text-primary',
  },
  {
    title: 'STEM PROGRAMS',
    desc: 'Project-based future skills.',
    icon: Microscope,
    color: 'text-accent',
  },
  {
    title: 'INDUSTRY EXPOSURE',
    desc: 'Connect students with real-world technology.',
    icon: Briefcase,
    color: 'text-white',
  },
];

export default function ForSchoolsSection() {
  return (
    <section id="schools" className="py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className="flex flex-col items-start">
            <SectionReveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
                MAKE YOUR SCHOOL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">FUTURE-READY.</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                SHORAI partners with schools to create technology-driven learning environments that prepare students for tomorrow&apos;s opportunities.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 font-semibold group transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Bring SHORAI to Your School
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </SectionReveal>
          </div>

          {/* Right Features */}
          <div className="grid sm:grid-cols-2 gap-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-3xl -z-10" />
            
            {features.map((feature, index) => (
              <SectionReveal key={feature.title} delay={0.1 + index * 0.1}>
                <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors duration-300 h-full flex flex-col items-start group">
                  <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold tracking-wide text-white mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
