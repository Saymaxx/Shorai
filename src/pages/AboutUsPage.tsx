'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  Award, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import AboutHeroSection from '@/components/home/AboutHeroSection';
import AboutSEGAcademy from '@/components/home/AboutSEGAcademy';
import ImpactSection from '@/components/home/ImpactSection';
import Testimonials from '@/components/home/Testimonials';
import MeetOurTeamSection from '@/components/home/MeetOurTeamSection';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import SectionReveal from '@/components/animations/SectionReveal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { siteConfig } from '@/config/siteConfig';
import { useContent } from '@/context/ContentContext';

export default function AboutUsPage() {
  usePageMeta(siteConfig.pages.about);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { content } = useContent();
  const cta = content.about.closingCta;

  return (
    <div className="min-h-screen bg-transparent text-foreground transition-colors duration-300">
      {/* Redesigned Hero Section from Brochure Cover */}
      <AboutHeroSection />

      {/* Main About SEG Academy Content (Timeline, Legacy & Philosophy) */}
      <AboutSEGAcademy />

      {/* Institutional Impact Strip */}
      <ImpactSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Meet Our Team Leadership & Mentors Section */}
      <MeetOurTeamSection />

      {/* Closing CTA Strip: Partner With SEG Academy & Shorai Today */}
      <section className="py-24 bg-transparent border-t border-border relative overflow-hidden text-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-4">
              {cta.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 font-medium">
              {cta.subtitle}
            </p>
            <MagneticWrapper>
              <a
                href="https://www.segacademy.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 h-13 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg inline-flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>{cta.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </MagneticWrapper>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
