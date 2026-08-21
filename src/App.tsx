import React from 'react';
import { useRouter } from '@/context/RouterContext';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/home/hero/HeroSection';
import HeroSocialCTA from '@/components/home/hero/HeroSocialCTA';
import AboutSEGAcademy from '@/components/home/AboutSEGAcademy';
import WhySchoolsNeedShorai from '@/components/home/WhySchoolsNeedShorai';
import Shorai360Ecosystem from '@/components/home/Shorai360Ecosystem';
import FutureSkillsEcosystem from '@/components/home/FutureSkillsEcosystem';
import InnovationLabs from '@/components/home/InnovationLabs';
import InteractiveTechnology from '@/components/home/InteractiveTechnology';
import ForSchoolsSection from '@/components/home/ForSchoolsSection';
import ProjectShowcase from '@/components/home/ProjectShowcase';
import FutureStudentSection from '@/components/home/FutureStudentSection';
import ImpactSection from '@/components/home/ImpactSection';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/shared/Footer';
import GlobalMouseFollower from '@/components/shared/GlobalMouseFollower';
import RobotGuideUI from '@/components/3d/RobotGuideUI';
import MotionGraphicsBackground from '@/components/animations/MotionGraphicsBackground';
import ShoraiLabsPage from '@/pages/ShoraiLabsPage';
import AboutUsPage from '@/pages/AboutUsPage';
import SchoolTransformationPage from '@/pages/SchoolTransformationPage';

export default function App() {
  const { pathname } = useRouter();

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

  if (pathname === '/transformation') {
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

      {/* 3. Institutional Legacy & Milestones (SEG Academy - 15+ Years) */}
      <AboutSEGAcademy />

      {/* 4. Why Schools Need Shorai (Data Grid, NEP 2020 & 6 Institutional Outcomes) */}
      <WhySchoolsNeedShorai />

      {/* 5. Shorai 360° Education Ecosystem (8 Interactive Pillars) */}
      <Shorai360Ecosystem />

      {/* 6. Future Skills Ecosystem (12 Modern Tech Domains) */}
      <FutureSkillsEcosystem />

      {/* 7. Shorai Innovation Labs (Turnkey Robotics & AI Lab Infrastructure) */}
      <InnovationLabs />

      {/* 8. 5-Step School Transformation Roadmap */}
      <InteractiveTechnology />

      {/* 10. Institutional School Partnership Proposition */}
      <ForSchoolsSection />

      {/* 11. Real Student Inventions & Career Horizons */}
      <ProjectShowcase />
      <FutureStudentSection />
      <ImpactSection />

      {/* 12. High-Impact Closing Call To Action */}
      <FinalCTA />

      {/* 13. Comprehensive Footer with Verified Address, Phone & Interactive Google Map */}
      <Footer />
    </main>
  );
}
