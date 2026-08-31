'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import Link from 'next/link';

interface HeroCTAProps {
  onContactClick?: () => void;
}

export default function HeroCTA({ onContactClick }: HeroCTAProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
      
      {/* Primary CTA: "To know more about us contact us" */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full sm:w-auto"
      >
        <button
          onClick={onContactClick}
          className="relative group cursor-pointer w-full sm:w-auto outline-none"
        >
          {/* Glowing Aura */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#00D4FF] to-[#FF6B00] rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition duration-500" />
          
          {/* Button Body */}
          <div className="relative flex items-center justify-center px-7 h-13 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] rounded-xl shadow-[0_10px_30px_rgba(99,102,241,0.4)] overflow-hidden">
            <span className="relative text-white font-bold tracking-wide mr-2 text-sm sm:text-[15px] drop-shadow">
              To know more about us contact us
            </span>
            <ArrowRight className="relative w-4 h-4 text-white transform transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </button>
      </motion.div>

      {/* Secondary CTA: Explore Innovation Labs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full sm:w-auto"
      >
        <Link 
          href="#innovation-labs" 
          className="w-full sm:w-auto flex items-center justify-center px-6 h-13 rounded-xl border border-border bg-card/80 hover:bg-card text-foreground font-semibold text-sm tracking-wide transition-all duration-300 backdrop-blur-md shadow-sm hover:border-primary/40 outline-none"
        >
          Explore Innovation Labs
        </Link>
      </motion.div>
      
    </div>
  );
}
