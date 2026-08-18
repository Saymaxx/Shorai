'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import TextReveal from '@/components/animations/TextReveal';
import SectionReveal from '@/components/animations/SectionReveal';

const testimonials = [
  {
    id: 1,
    name: "Dr. Elena Rostova",
    role: "Lead AI Researcher at NexaTech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote: "Shorai’s curriculum is simply unmatched. Our newest recruits from their programs are deploying neural networks in production within their first month.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Senior Robotics Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote: "The hands-on experience with industrial actuators and embedded systems gave me the edge I needed to transition into autonomous vehicle development.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Founder, AeroDrones",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    quote: "I learned more about swarm intelligence and flight control algorithms in 6 months at Shorai than I did during my entire master's degree.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Park",
    role: "IoT Systems Architect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote: "Building full-stack IoT solutions from sensor to cloud is rarely taught comprehensively. Shorai nails it perfectly. Absolutely game changing.",
    rating: 5,
  },
  {
    id: 5,
    name: "Amara Okonkwo",
    role: "Product Lead, Quantum Core",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote: "The emphasis on ethical AI and safety mechanisms inside the curriculum ensures that Shorai students build responsibly from day one.",
    rating: 5,
  }
];

export default function Testimonials() {
  // Duplicate array for infinite scroll loop
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <SectionReveal id="testimonials" className="relative bg-[#050814] overflow-hidden py-32 md:py-48 border-t border-white/5">
       {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-20 md:mb-32">
        <div className="text-center max-w-3xl mx-auto">
          <TextReveal 
            className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-6"
          >
            Don't just take our word for it.
          </TextReveal>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-light"
          >
            Hear from industry leaders and alumni who are shaping the future.
          </motion.p>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div className="relative w-full overflow-hidden flex z-10">
        
        {/* Left/Right Gradient Masks to fade edges smoothly */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#050814] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#050814] to-transparent z-20 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          className="flex gap-6 w-max"
        >
          {doubledTestimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="w-[320px] md:w-[450px] shrink-0 p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative group hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-500 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]"
            >
              {/* Subtle Quote Icon */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors duration-500" />
              
              {/* Rating */}
              <div className="flex gap-1.5 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary drop-shadow-[0_0_10px_rgba(255,107,0,0.4)]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-light italic">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                  <Image 
                    src={testimonial.image} 
                    alt={`${testimonial.name} avatar`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-lg">{testimonial.name}</span>
                  <span className="text-sm text-primary tracking-wide font-medium">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </SectionReveal>
  );
}
