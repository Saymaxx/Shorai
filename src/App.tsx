import React from 'react';
import HeroSection from '@/components/home/hero/HeroSection';
import HeroSocialCTA from '@/components/home/hero/HeroSocialCTA';
import AboutSEGAcademy from '@/components/home/AboutSEGAcademy';
import WhySchoolsNeedShorai from '@/components/home/WhySchoolsNeedShorai';
import Shorai360Ecosystem from '@/components/home/Shorai360Ecosystem';
import FutureSkillsEcosystem from '@/components/home/FutureSkillsEcosystem';
import InnovationLabs from '@/components/home/InnovationLabs';
import AIEducationSection from '@/components/home/AIEducationSection';
import DroneEducationSection from '@/components/home/DroneEducationSection';
import CodingEducationSection from '@/components/home/CodingEducationSection';
import InteractiveTechnology from '@/components/home/InteractiveTechnology';
import ForSchoolsSection from '@/components/home/ForSchoolsSection';
import HowItWorks from '@/components/home/HowItWorks';
import ProjectShowcase from '@/components/home/ProjectShowcase';
import FutureStudentSection from '@/components/home/FutureStudentSection';
import ImpactSection from '@/components/home/ImpactSection';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/shared/Footer';
import GlobalMouseFollower from '@/components/shared/GlobalMouseFollower';
import RobotGuideUI from '@/components/3d/RobotGuideUI';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-white relative transition-colors duration-300">
      {/* 3D Interactive Elements & Mouse Follower */}
      <GlobalMouseFollower />
      <RobotGuideUI />

      {/* 1. Hero Section with 3D Robot & Layman-friendly Value Proposition */}
      <HeroSection />

      {/* 2. Social Media Connection CTA Strip */}
      <HeroSocialCTA />

      {/* 3. About SEG Academy (15+ Yrs, 1000+ Students, Milestones Timeline) */}
      <AboutSEGAcademy />

      {/* 4. Why Schools Need Shorai (Data, Solution Hub, 6 School Outcomes) */}
      <WhySchoolsNeedShorai />

      {/* 5. Shorai 360° Education Ecosystem (8 Pillars Model) */}
      <Shorai360Ecosystem />

      {/* 6. Future Skills Ecosystem (12 Modern Tech Domains) */}
      <FutureSkillsEcosystem />

      {/* 7. Interactive 3D STEM Labs & Real Technology Demonstrations */}
      <InnovationLabs />
      <AIEducationSection />
      <DroneEducationSection />
      <CodingEducationSection />

      {/* 8. School Transformation Process & Methodology */}
      <InteractiveTechnology />
      <ForSchoolsSection />
      <HowItWorks />

      {/* 9. Student Inventions & Career Horizons */}
      <ProjectShowcase />
      <FutureStudentSection />
      <ImpactSection />

      {/* 10. High-Impact Closing Call To Action */}
      <FinalCTA />

      {/* 11. Comprehensive Footer with Verified Location & Interactive Google Map */}
      <Footer />
    </main>
  );
}
