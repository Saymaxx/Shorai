'use client';

import React from 'react';
import HeroSection from '@/components/home/hero/HeroSection';
import HeroSocialCTA from '@/components/home/hero/HeroSocialCTA';
import WhatIsShoraiSection from '@/components/home/WhatIsShoraiSection';
import WhySchoolsNeedShorai from '@/components/home/WhySchoolsNeedShorai';
import InnovationLabs from '@/components/home/InnovationLabs';
import SchoolLabEstimator from '@/components/home/SchoolLabEstimator';
import StudentTestimonials from '@/components/home/StudentTestimonials';
import InstitutionalFAQSection from '@/components/home/InstitutionalFAQSection';
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

      {/* 6. Interactive School Lab & ROI Estimator */}
      <SchoolLabEstimator />

      {/* 7. Student Testimonials (Young Innovators Voices) */}
      <StudentTestimonials />

      {/* 8. Frequently Asked Questions (Institutional Decision Makers) */}
      <InstitutionalFAQSection />

      {/* 9. Get in Touch Form & High-Impact Closing CTA */}
      <HomeContactCTASection />

      {/* 10. Comprehensive Footer */}
      <Footer />
    </>
  );
}
