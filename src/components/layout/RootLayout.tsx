'use client';

import React, { ReactNode } from 'react';
import Navbar from '@/components/shared/Navbar';
import GlobalMouseFollower from '@/components/shared/GlobalMouseFollower';
import ShoraiChatbot from '@/components/chat/ShoraiChatbot';
import MotionGraphicsBackground from '@/components/animations/MotionGraphicsBackground';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary relative transition-colors duration-300">
      {/* 0. Top Global Navigation Bar */}
      <Navbar />

      {/* Global Fixed Landscape SHORAI Background Watermark (Static on Scroll Across All Pages) */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden" 
        aria-hidden="true"
      >
        <span 
          className="text-[20vw] sm:text-[24vw] lg:text-[26vw] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#00D4FF]/35 via-[#7928CA]/25 to-[#00D4FF]/20 dark:from-[#00D4FF]/40 dark:via-[#7928CA]/30 dark:to-[#00D4FF]/22 leading-none select-none"
          style={{ 
            letterSpacing: '-0.04em',
            maxWidth: '100vw',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          SHORAI
        </span>
      </div>

      {/* Dynamic Animated Motion Graphics Background Layer */}
      <MotionGraphicsBackground />

      {/* Interactive AI Chatbot & Ambient Follower */}
      <GlobalMouseFollower />
      <ShoraiChatbot />

      {/* Active Page Route Content */}
      <div className="flex-grow relative z-10">
        {children}
      </div>
    </main>
  );
}
