'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function TrustMetrics() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col mt-4 pt-6 border-t border-white/5 w-full max-w-md"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
        <span className="text-white/90 text-[13px] font-semibold tracking-wide">Built for future-ready schools</span>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-muted-foreground/70">
        <span>Future-ready skills</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span>Real-world projects</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span>Technology-first learning</span>
      </div>
    </motion.div>
  );
}
