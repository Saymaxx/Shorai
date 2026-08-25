'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import GlobalMouseFollower from '@/components/shared/GlobalMouseFollower';
import ShoraiChatbot from '@/components/chat/ShoraiChatbot';
import MotionGraphicsBackground from '@/components/animations/MotionGraphicsBackground';
import CurriculumBrochureModal from '@/components/shared/CurriculumBrochureModal';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  useEffect(() => {
    // 1. Custom event trigger
    const handleOpenBrochure = () => setIsBrochureOpen(true);
    window.addEventListener('shorai:open-brochure', handleOpenBrochure);

    // 2. Intelligent Desktop Exit-Intent trigger (at most once per session)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !sessionStorage.getItem('shorai_exit_intent_shown')) {
        sessionStorage.setItem('shorai_exit_intent_shown', 'true');
        setIsBrochureOpen(true);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 15000);

    return () => {
      window.removeEventListener('shorai:open-brochure', handleOpenBrochure);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary relative transition-colors duration-300">
      {/* 0. Top Global Navigation Bar */}
      <Navbar />

      {/* Dynamic Animated Motion Graphics Background Layer */}
      <MotionGraphicsBackground />

      {/* Interactive AI Chatbot & Ambient Follower */}
      <GlobalMouseFollower />
      <ShoraiChatbot />

      {/* Institutional Curriculum Brochure Modal */}
      <CurriculumBrochureModal 
        isOpen={isBrochureOpen} 
        onClose={() => setIsBrochureOpen(false)} 
      />

      {/* Active Page Route Content */}
      <div className="flex-grow">
        {children}
      </div>
    </main>
  );
}
