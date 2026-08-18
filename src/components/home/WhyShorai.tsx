'use client';

import { motion } from 'framer-motion';
import { Shield, Cpu, Lightbulb, Rocket } from 'lucide-react';

const features = [
  {
    title: 'Enterprise-Grade Curriculum',
    description: 'Learn using the exact same frameworks and architectural patterns utilized by top-tier tech companies.',
    icon: Shield,
  },
  {
    title: 'Hardware Acceleration',
    description: 'Access to high-performance computing clusters and advanced robotic hardware for your projects.',
    icon: Cpu,
  },
  {
    title: 'Innovation Lab',
    description: 'A dedicated space to prototype, test, and build your wildest ideas without constraints.',
    icon: Lightbulb,
  },
  {
    title: 'Career Launchpad',
    description: 'Direct connections to industry recruiters and a portfolio built on real-world engineering.',
    icon: Rocket,
  }
];

export default function WhyShorai() {
  return (
    <section className="section bg-secondary/5 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why <span className="gradient-text">SHORAI</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The SHORAI advantage goes beyond traditional learning.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
