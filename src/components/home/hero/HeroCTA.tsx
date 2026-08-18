'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 mt-4 mb-10 w-full sm:w-auto">
      
      {/* Primary CTA - 650ms delay */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full sm:w-auto"
      >
        <Link href="#schools" className="block w-full sm:w-auto outline-none">
          <motion.div 
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer w-full"
          >
            {/* Elegant Glow Base */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B00] via-[#7B2DFF] to-[#00BFFF] rounded-[16px] blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
            
            {/* Button Surface with Internal Depth */}
            <div className="relative flex items-center justify-center px-8 h-14 bg-gradient-to-r from-[#FF6B00] via-[#7B2DFF] to-[#00BFFF] rounded-[14px] shadow-[inset_0_3px_5px_rgba(255,255,255,0.2),0_5px_15px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Overlay for subtle hover shift */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              
              <span className="relative text-white font-bold tracking-wide mr-2 text-[15px] drop-shadow-md">
                Bring SHORAI to Your School
              </span>
              <ArrowRight className="relative w-4 h-4 text-white drop-shadow-md transform transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Secondary CTA - 750ms delay */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full sm:w-auto"
      >
        <Link href="#programs" className="block w-full sm:w-auto outline-none">
          <button className="w-full sm:w-auto flex items-center justify-center px-6 h-14 rounded-[14px] border border-white/10 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white font-semibold tracking-wide transition-all duration-300 backdrop-blur-sm">
            Explore Programs
          </button>
        </Link>
      </motion.div>
      
    </div>
  );
}
