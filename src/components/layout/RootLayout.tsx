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

      {/* Dynamic Animated Motion Graphics Background Layer */}
      <MotionGraphicsBackground />

      {/* Interactive AI Chatbot & Ambient Follower */}
      <GlobalMouseFollower />
      <ShoraiChatbot />

      {/* Active Page Route Content */}
      <div className="flex-grow">
        {children}
      </div>
    </main>
  );
}
