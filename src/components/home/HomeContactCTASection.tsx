'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Rocket, 
  ShieldCheck, 
  Bot 
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export default function HomeContactCTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    schoolName: '',
    purpose: 'School Innovation Lab Setup',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        contact: '',
        schoolName: '',
        purpose: 'School Innovation Lab Setup',
        message: '',
      });
    }, 900);
  };

  return (
    <section id="get-in-touch" className="relative py-24 sm:py-28 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4 shadow-sm">
              <Mail className="w-3.5 h-3.5" />
              GET IN TOUCH WITH SHORAI
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-5 leading-tight">
              LET&apos;S BUILD YOUR SCHOOL&apos;S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                INNOVATION LAB TOGETHER.
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Reach out to our master STEM consultants to discuss turnkey lab setup, curriculum customization, and teacher enablement for your institution.
            </p>
          </SectionReveal>
        </div>

        {/* ── Form + Quick Contact Information ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
          
          {/* Left Column: Interactive Form (7 Cols) */}
          <div className="lg:col-span-7">
            <SectionReveal delay={0.12}>
              <div className="p-7 sm:p-10 rounded-3xl bg-card border border-border shadow-sm">
                
                {isSubmitted ? (
                  <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground">Message Received!</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Thank you for reaching out. Our institutional STEM director will contact you within 24 hours to schedule your consultation.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-muted border border-border text-xs font-bold hover:bg-muted/80 transition-all mt-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block mb-2">
                          Your Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Dr. Rajesh Sharma"
                          className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:border-primary focus:outline-none text-sm text-foreground transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block mb-2">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rajesh@schoolname.edu.in"
                          className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:border-primary focus:outline-none text-sm text-foreground transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block mb-2">
                          Contact / WhatsApp <span className="text-primary">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:border-primary focus:outline-none text-sm text-foreground transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block mb-2">
                          School / Organization Name
                        </label>
                        <input
                          type="text"
                          value={formData.schoolName}
                          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                          placeholder="e.g. Delhi Public School"
                          className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:border-primary focus:outline-none text-sm text-foreground transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block mb-2">
                        Primary Purpose
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:border-primary focus:outline-none text-sm text-foreground transition-all"
                      >
                        <option value="School Innovation Lab Setup">School Innovation Lab Setup (AI / Robotics / STEM)</option>
                        <option value="NEP 2020 Curriculum Integration">NEP 2020 Curriculum Integration</option>
                        <option value="Teacher Enablement & Certification">Teacher Enablement &amp; Certification</option>
                        <option value="Student Robotics Olympiad Prep">Student Robotics Olympiad Prep</option>
                        <option value="General Inquiry">General Partnership Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold text-foreground uppercase tracking-wider block mb-2">
                        Your Message / Requirements
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your student strength, campus requirements, or goals..."
                        className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:border-primary focus:outline-none text-sm text-foreground transition-all resize-none"
                      />
                    </div>

                    <MagneticWrapper>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Sending your message...</span>
                        ) : (
                          <>
                            <span>Send Message to STEM Team</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </MagneticWrapper>

                  </form>
                )}

              </div>
            </SectionReveal>
          </div>

          {/* Right Column: Direct Info Cards & Credentials (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <SectionReveal delay={0.16}>
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-foreground mb-1">Corporate Headquarters</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    SEG Academy Pvt. Ltd. &bull; SHORAI Initiative<br />
                    Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103
                  </p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-foreground mb-1">Direct Phone &amp; WhatsApp</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Institutional Hotline: <strong>+91 98765 43210</strong><br />
                    Direct Support: +91 80 4123 4567
                  </p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.24}>
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-foreground mb-1">Official Emails</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    General: <strong>contact@shorai.education</strong><br />
                    Institutional Partnerships: <strong>schools@segacademy.com</strong>
                  </p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.28}>
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent border border-primary/20">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SEG ACADEMY PEDAGOGICAL BACKING</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Backed by 15+ years of pedagogical excellence, 1,000+ empowered students, and certified Master Trainers across India.
                </p>
              </div>
            </SectionReveal>

          </div>

        </div>

        {/* ── Closing High-Impact Call To Action Banner ─────────────────── */}
        <SectionReveal delay={0.2}>
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#7928CA]/15 via-[#6366F1]/15 to-[#00D4FF]/15 border border-primary/30 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left shadow-xl">
            
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3">
                <Rocket className="w-3.5 h-3.5" />
                SHORAI INNOVATION MISSION
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-3">
                Transform Your Campus Into An Innovation Powerhouse.
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Join forward-thinking Indian schools pioneering NEP 2020 Robotics, AI, Coding, and Drone education.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 flex-shrink-0">
              <MagneticWrapper>
                <Link
                  href="/schools"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Explore School Labs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticWrapper>

              <MagneticWrapper>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-2xl bg-card border border-border text-foreground hover:text-primary font-bold text-sm tracking-wide shadow-sm hover:border-primary/40 transition-all flex items-center gap-2"
                >
                  <span>Visit Contact Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticWrapper>
            </div>

          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
