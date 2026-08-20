'use client';

import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Sparkles } from 'lucide-react';

const stats = [
  { label: 'Educational Excellence', value: '15+', icon: Award },
  { label: 'Students Empowered', value: '1000+', icon: Users },
  { label: 'Industry Programs', value: '50+', icon: BookOpen },
  { label: 'Future-Focused', value: '100%', icon: Sparkles },
];

export default function TrustMetrics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 pt-6 border-t border-border w-full"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <span className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            {stat.value}
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wider line-clamp-1">
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
