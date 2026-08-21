'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { submitLeadToGoogleSheet } from '@/lib/leadSubmission';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitLeadToGoogleSheet({
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      organisation: formData.schoolName,
      purpose: formData.purpose,
      message: formData.message,
    });

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
  };

  return (
    <section id="get-in-touch" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-muted/20 overflow-hidden border-t border-border">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[45vw] h-[45vw] max-w-[600px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -right-20 w-[45vw] h-[45vw] max-w-[600px] bg-secondary/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── Side-by-Side: Designer "Get In Touch" Left & Designer Form Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          
          {/* Left Column: Designer Typography (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                CONNECT WITH SHORAI
              </div>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-6 leading-[1.05]">
                Get in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                  Touch.
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                Have questions or ready to launch an AI &amp; Robotics innovation lab on your campus? Reach out to our STEM team today.
              </p>
            </SectionReveal>
          </div>

          {/* Right Column: Designer Form (7 Cols) */}
          <div className="lg:col-span-7">
            <SectionReveal delay={0.14}>
              <div className="p-7 sm:p-10 rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden">
                
                {/* Subtle Ambient Card Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

                {isSubmitted ? (
                  <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-foreground">Message Received!</h3>
                    <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                      Thank you for reaching out. Our STEM innovation director will contact you within 24 hours to schedule your consultation.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-muted border border-border text-xs font-bold text-foreground hover:bg-muted/80 transition-all mt-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="text-[11px] font-mono font-bold text-foreground uppercase tracking-wider block mb-1.5">
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
                        <label className="text-[11px] font-mono font-bold text-foreground uppercase tracking-wider block mb-1.5">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="text-[11px] font-mono font-bold text-foreground uppercase tracking-wider block mb-1.5">
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
                        <label className="text-[11px] font-mono font-bold text-foreground uppercase tracking-wider block mb-1.5">
                          School / Organization
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
                      <label className="text-[11px] font-mono font-bold text-foreground uppercase tracking-wider block mb-1.5">
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
                      <label className="text-[11px] font-mono font-bold text-foreground uppercase tracking-wider block mb-1.5">
                        Message / Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your student strength, goals, or requirements..."
                        className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:border-primary focus:outline-none text-sm text-foreground transition-all resize-none"
                      />
                    </div>

                    <MagneticWrapper>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
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

        </div>

      </div>
    </section>
  );
}
