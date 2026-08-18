'use client';

import SectionReveal from '@/components/animations/SectionReveal';

export default function AboutShorai() {
  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <SectionReveal>
          <div className="text-xs font-semibold tracking-widest text-primary uppercase mb-8">
            About SHORAI
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-tight mb-12">
            WE BELIEVE CURIOSITY <br className="hidden md:block" />
            IS A <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">SUPERPOWER.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            SHORAI exists to make future technology accessible, practical and exciting for students.
          </p>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-16">
            Our approach combines technology, creativity and hands-on experimentation to help young minds move from <span className="text-muted-foreground line-through decoration-primary">consuming technology</span> to creating with it.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {['AI', 'ROBOTICS', 'CODING', 'DRONES'].map((tech) => (
              <div 
                key={tech} 
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-wider text-white hover:bg-white/10 hover:border-primary/50 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
