'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  Search, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { siteConfig } from '@/config/siteConfig';

interface FAQItem {
  question: string;
  answer: string;
  category: 'setup' | 'trainer' | 'curriculum' | 'warranty';
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'setup',
    question: 'How much campus space is required to set up a SHORAI Innovation Lab?',
    answer: 'A standard classroom of 500 to 800 sq. ft. is ideal to accommodate 30–40 students per batch across 6–8 modular workbenches. SHORAI provides complete turnkey interior layout guidance, branding wall art, and ergonomic workstation blueprints.'
  },
  {
    category: 'trainer',
    question: 'Who provides and manages the dedicated on-ground Master Trainer?',
    answer: 'SHORAI deploys certified STEM & Robotics Master Trainers directly to your campus. We handle hiring, background verification, continuous pedagogy upskilling, and daily lab operations so your school administration experiences zero management overhead.'
  },
  {
    category: 'curriculum',
    question: 'How does SHORAI curriculum integrate with CBSE, ICSE, and NEP 2020?',
    answer: 'Our curriculum is structured grade-wise from Grade 1 to 12. It seamlessly integrates with regular academic timetables (1–2 periods/week) and strictly maps to NEP 2020 computational thinking, experiential learning, and coding mandates.'
  },
  {
    category: 'warranty',
    question: 'What happens if hardware kits, sensors, or robotic parts get damaged during lab sessions?',
    answer: 'All SHORAI lab equipment comes with a Comprehensive Maintenance & Replacement Warranty. Our on-campus trainer maintains buffer inventory on-site, ensuring zero downtime for students.'
  },
  {
    category: 'setup',
    question: 'How quickly can the lab be inaugurated and operational on campus?',
    answer: 'Once the partnership agreement is finalized, hardware delivery, interior setup, curriculum dispatch, and trainer deployment typically take just 10 to 14 business days.'
  },
  {
    category: 'curriculum',
    question: 'Do students receive certifications and competition mentorship?',
    answer: 'Yes! Every academic year, students earn verified skill certificates issued by SEG Academy & SHORAI. We also train and mentor school teams for national and international robotics competitions (WRO, FLL, ATL Marathons).'
  },
];

export default function InstitutionalFAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'setup' | 'trainer' | 'curriculum' | 'warranty'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="relative py-24 sm:py-28 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="shorai-eyebrow text-primary">FREQUENTLY ASKED QUESTIONS</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <h2 className="shorai-heading mb-4">
              Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">Clarifications &amp; FAQs</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <p className="shorai-body max-w-2xl mx-auto">
              Everything school trustees, principals, and academic coordinators need to know about lab infrastructure, trainer deployment, and curriculum integration.
            </p>
          </SectionReveal>
        </div>

        {/* ── Search Bar & Category Filters ── */}
        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions (e.g. trainer, warranty, space, NEP 2020)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary shadow-sm transition-all"
            />
          </div>

          {/* Filter Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'setup', label: 'Lab Setup & Space' },
              { id: 'trainer', label: 'Master Trainers' },
              { id: 'curriculum', label: 'Curriculum & NEP' },
              { id: 'warranty', label: 'Warranty & Maintenance' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-card hover:bg-muted text-muted-foreground border-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* ── FAQ Accordion List ── */}
        <div className="max-w-3xl mx-auto space-y-3.5 mb-16">
          {filteredFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <SectionReveal key={faq.question} delay={0.05 * idx}>
                <div className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? 'bg-card border-primary/40 shadow-md' : 'bg-card/70 hover:bg-card border-border'}`}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold"
                  >
                    <span className="shorai-subheading text-base sm:text-lg text-foreground">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary text-white' : 'text-muted-foreground'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm shorai-body text-foreground/80 border-t border-border/40 mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            );
          })}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm font-medium">
              No matching questions found for &ldquo;{searchQuery}&rdquo;. Call our helpline for immediate answers.
            </div>
          )}
        </div>

        {/* ── Bottom Direct Contact Banner ── */}
        <SectionReveal delay={0.2}>
          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#7928CA]/15 via-[#6366F1]/15 to-[#00D4FF]/15 border border-primary/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="shorai-eyebrow text-primary block mb-1.5">
                HAVE A SPECIFIC ACADEMIC QUERY?
              </span>
              <h3 className="shorai-subheading text-xl sm:text-2xl mb-1">
                Speak directly with our Chief Academic Officer
              </h3>
              <p className="shorai-body text-xs sm:text-sm">
                Get customized answers regarding lab space, budget, and timetable scheduling.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <MagneticWrapper>
                <a
                  href={siteConfig.contact.whatsappSchoolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 transition-all hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Academic Desk</span>
                </a>
              </MagneticWrapper>

              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-card hover:bg-muted border border-border text-foreground font-bold text-xs sm:text-sm tracking-wide shadow-sm flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Book Campus Visit</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </button>
              </MagneticWrapper>
            </div>
          </div>
        </SectionReveal>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
