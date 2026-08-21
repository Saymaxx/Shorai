import React from 'react';
import { useRouter } from '@/context/RouterContext';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/home/hero/HeroSection';
import HeroSocialCTA from '@/components/home/hero/HeroSocialCTA';
import WhatIsShoraiSection from '@/components/home/WhatIsShoraiSection';
import WhySchoolsNeedShorai from '@/components/home/WhySchoolsNeedShorai';
import InnovationLabs from '@/components/home/InnovationLabs';
import ProjectShowcase from '@/components/home/ProjectShowcase';
import Footer from '@/components/shared/Footer';
import GlobalMouseFollower from '@/components/shared/GlobalMouseFollower';
import RobotGuideUI from '@/components/3d/RobotGuideUI';
import MotionGraphicsBackground from '@/components/animations/MotionGraphicsBackground';
import ShoraiLabsPage from '@/pages/ShoraiLabsPage';
import AboutUsPage from '@/pages/AboutUsPage';
import WhyShoraiPage from '@/pages/WhyShoraiPage';
import SchoolTransformationPage from '@/pages/SchoolTransformationPage';
import ContactPage from '@/pages/ContactPage';

export default function App() {
  const { pathname } = useRouter();

  if (pathname === '/contact') {
    return (
      <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary relative transition-colors duration-300">
        <Navbar />
        <MotionGraphicsBackground />
        <GlobalMouseFollower />
        <RobotGuideUI />
        <ContactPage />
      </main>
    );
  }

  if (pathname === '/about') {
    return (
      <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary relative transition-colors duration-300">
        <Navbar />
        <MotionGraphicsBackground />
        <GlobalMouseFollower />
        <RobotGuideUI />
        <AboutUsPage />
      </main>
    );
  }

  if (pathname === '/why-shorai') {
    return (
      <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary relative transition-colors duration-300">
        <Navbar />
        <MotionGraphicsBackground />
        <GlobalMouseFollower />
        <RobotGuideUI />
        <WhyShoraiPage />
      </main>
    );
  }

  if (pathname === '/schools' || pathname === '/transformation') {
    return (
      <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary relative transition-colors duration-300">
        <Navbar />
        <MotionGraphicsBackground />
        <GlobalMouseFollower />
        <RobotGuideUI />
        <SchoolTransformationPage />
      </main>
    );
  }

  if (pathname === '/labs') {
    return (
      <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary relative transition-colors duration-300">
        <Navbar />
        <MotionGraphicsBackground />
        <GlobalMouseFollower />
        <RobotGuideUI />
        <ShoraiLabsPage />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary relative transition-colors duration-300">
      {/* 0. Top Global Navigation Bar */}
      <Navbar />

      {/* Dynamic Animated Motion Graphics Background Layer */}
      <MotionGraphicsBackground />

      {/* 3D Interactive Mascot & Soft Ambient Follower */}
      <GlobalMouseFollower />
      <RobotGuideUI />

      {/* 1. Cinematic Hero Section with 3D Robot Mascot & SEG Academy Endorsement */}
      <HeroSection />

      {/* 2. Official Social Media Connection Strip */}
      <HeroSocialCTA />

      {/* 3. What is Shorai Section */}
      <WhatIsShoraiSection />

      {/* 4. Why Schools Need Shorai */}
      <WhySchoolsNeedShorai />

      {/* 5. Shorai Innovation Labs (Turnkey Robotics & AI Lab Infrastructure) */}
      <InnovationLabs />

      {/* 6. Real Student Inventions & Showcase */}
      <ProjectShowcase />

      {/* 7. Comprehensive Footer */}
      <Footer />
    </main>
  );
}
