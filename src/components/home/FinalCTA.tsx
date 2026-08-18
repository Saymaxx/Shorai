'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionReveal from '@/components/animations/SectionReveal';

export default function FinalCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] py-32">
      {/* Background Neural Network / Energy */}
      <div className="absolute inset-0 z-0 opacity-40">
         {/* Subtle moving orange energy */}
         <motion.div 
           className="absolute top-1/4 -left-1/4 w-full h-[200px] bg-primary/20 blur-[100px] rounded-full mix-blend-screen"
           animate={{
             x: ['0%', '50%', '0%'],
             y: ['0%', '20%', '0%'],
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
         />
         <motion.div 
           className="absolute bottom-1/4 -right-1/4 w-full h-[200px] bg-secondary/10 blur-[100px] rounded-full mix-blend-screen"
           animate={{
             x: ['0%', '-50%', '0%'],
             y: ['0%', '-20%', '0%'],
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
         />
         
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        <SectionReveal>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 drop-shadow-2xl">
            THE FUTURE WON&apos;T <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-300%">BUILD ITSELF.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto">
            Give students the tools to build what comes next.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button className="h-16 px-10 rounded-full bg-card hover:bg-card border border-primary/30 shadow-[0_0_30px_rgba(255,107,0,0.2)] hover:shadow-[0_0_50px_rgba(255,107,0,0.4)] text-white text-lg font-bold group transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Build the Future With Us
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 group-hover:opacity-100 opacity-0 transition-opacity" />
            </Button>
            
            <Button variant="outline" className="h-16 px-10 rounded-full bg-transparent border-white/20 hover:border-white text-white text-lg font-semibold group transition-all duration-300 backdrop-blur-md">
              Talk to SHORAI
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
