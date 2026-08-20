import React from 'react';
import HeroSection from '@/components/home/hero/HeroSection';
import HeroSocialCTA from '@/components/home/hero/HeroSocialCTA';
import TrustImpactStrip from '@/components/home/TrustImpactStrip';
import InnovationLabs from '@/components/home/InnovationLabs';
import AIEducationSection from '@/components/home/AIEducationSection';
import DroneEducationSection from '@/components/home/DroneEducationSection';
import CodingEducationSection from '@/components/home/CodingEducationSection';
import ShoraiSolution from '@/components/home/ShoraiSolution';
import ProgramsSection from '@/components/home/ProgramsSection';
import InteractiveTechnology from '@/components/home/InteractiveTechnology';
import ForSchoolsSection from '@/components/home/ForSchoolsSection';
import HowItWorks from '@/components/home/HowItWorks';
import ProjectShowcase from '@/components/home/ProjectShowcase';
import FutureStudentSection from '@/components/home/FutureStudentSection';
import AboutShorai from '@/components/home/AboutShorai';
import ImpactSection from '@/components/home/ImpactSection';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/shared/Footer';
import GlobalMouseFollower from '@/components/shared/GlobalMouseFollower';
import RobotGuideUI from '@/components/3d/RobotGuideUI';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-white relative">
      <GlobalMouseFollower />
      <RobotGuideUI />
      <HeroSection />
      <HeroSocialCTA />
      <TrustImpactStrip />
      <InnovationLabs />
      <AIEducationSection />
      <DroneEducationSection />
      <CodingEducationSection />
      <ShoraiSolution />
      <ProgramsSection />
      <InteractiveTechnology />
      <ForSchoolsSection />
      <HowItWorks />
      <ProjectShowcase />
      <FutureStudentSection />
      <AboutShorai />
      <ImpactSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
