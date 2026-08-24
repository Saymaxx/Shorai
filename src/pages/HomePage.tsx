'use client';

import React from 'react';
import HeroSection from '@/components/home/hero/HeroSection';
import HeroSocialCTA from '@/components/home/hero/HeroSocialCTA';
import WhatIsShoraiSection from '@/components/home/WhatIsShoraiSection';
import WhySchoolsNeedShorai from '@/components/home/WhySchoolsNeedShorai';
import InnovationLabs from '@/components/home/InnovationLabs';
import StudentTestimonials from '@/components/home/StudentTestimonials';
import HomeContactCTASection from '@/components/home/HomeContactCTASection';
import Footer from '@/components/shared/Footer';
import WelcomeEnquiryPopup from '@/components/home/WelcomeEnquiryPopup';
import { usePageMeta } from '@/hooks/usePageMeta';
import { siteConfig } from '@/config/siteConfig';

export default function HomePage() {
  usePageMeta(siteConfig.pages.home);

  return (
    <>
      {/* 0. Automated Landing Page Welcome Enquiry Modal Popup */}
      <WelcomeEnquiryPopup />

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

      {/* 6. Student Testimonials (Young Innovators Voices) */}
      <StudentTestimonials />

      {/* 7. Get in Touch Form & High-Impact Closing CTA */}
      <HomeContactCTASection />

      {/* 8. Comprehensive Footer */}
      <Footer />
    </>
  );
}
