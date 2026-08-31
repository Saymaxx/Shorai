'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  CheckCircle2, 
  MessageCircle
} from 'lucide-react';
import { submitLeadToGoogleSheet } from '@/lib/leadSubmission';
import { siteConfig } from '@/config/siteConfig';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.41 4.81c.23.86.91 1.54 1.77 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42c.86-.23 1.54-.91 1.76-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    institute: '',
    purpose: 'School Innovation Lab Setup (AI & Robotics)',
    message: '',
  });

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLeadToGoogleSheet({
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        organisation: formData.institute,
        purpose: formData.purpose,
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 2200);
    } catch {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle light backdrop with reduced blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/35 backdrop-blur-[2px]"
          />

          {/* Minimalist & Colorful 2-Column Modal */}
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto touch-scroll rounded-3xl bg-card border-2 border-primary/40 shadow-[0_25px_80px_rgba(0,0,0,0.5)] z-10 my-auto"
          >
            {/* Top Multi-Color Neon Accent Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#FF3D7F] to-[#00D4FF] sticky top-0 z-40" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="sticky sm:absolute top-3.5 right-3.5 ml-auto mr-3.5 sm:mr-0 z-50 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-muted/90 hover:bg-muted border border-border flex items-center justify-center text-foreground/80 hover:text-foreground hover:scale-105 transition-all shadow-sm"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-0 md:min-h-[460px]">
              
              {/* ═══════════════════════════════════════════════════════════════
                  LEFT: CENTERED LOGO + TAGLINE + COLORFUL GRADIENT + SOCIALS
                 ═══════════════════════════════════════════════════════════════ */}
              <div className="md:col-span-5 p-5 sm:p-8 relative overflow-hidden flex flex-col justify-between text-white text-center bg-gradient-to-br from-[#7928CA] via-[#6366F1] to-[#00D4FF]">
                
                {/* Colorful Glow Lighting Elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-pink-500/30 blur-[40px] pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-amber-400/30 blur-[40px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  
                  {/* Centered Shorai Logo */}
                  <div className="relative group mb-3 sm:mb-5">
                    <div className="absolute -inset-1.5 rounded-full bg-white/40 opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
                    <div className="relative w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl flex items-center justify-center border-2 border-white/60 overflow-hidden">
                      <img 
                        src="/images/shorai_logo.png" 
                        alt="SHORAI" 
                        className="w-full h-full object-cover rounded-full scale-[1.04]"
                      />
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-4">
                    <span className="text-xl sm:text-3xl font-black tracking-tight text-white block leading-none mb-1">SHORAI</span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/90 font-bold uppercase tracking-wider block">
                      A Subsidiary of SEG Academy
                    </span>
                  </div>

                  {/* 2-Line Tagline Headline */}
                  <div className="space-y-1 sm:space-y-1.5 max-w-xs mx-auto">
                    <h3 className="text-lg sm:text-2xl font-black text-white leading-tight tracking-tight">
                      Future-Ready Education
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-relaxed">
                      Empowering forward-thinking schools with turnkey robotics, AI, and coding innovation hubs.
                    </p>
                  </div>
                </div>

                {/* Left Bottom: Icon-only Direct Connect Row */}
                <div className="relative z-10 pt-3 sm:pt-4 mt-3 sm:mt-0 border-t border-white/25 flex items-center justify-center gap-3">
                  {/* WhatsApp Icon Button */}
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#25D366] border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#E1306C] border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#FF0000] border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label="YouTube"
                    title="YouTube"
                  >
                    <YouTubeIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-[#0A66C2] border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                </div>

              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  RIGHT: MINIMALIST COLORFUL ENQUIRY FORM
                 ═══════════════════════════════════════════════════════════════ */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-card">
                
                <div>
                  {/* Form Header */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                      Quick Enquiry <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">Form</span>
                    </h3>
                  </div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center flex flex-col items-center justify-center space-y-3"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shadow-md border border-emerald-500/40 animate-bounce">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-black text-foreground">Enquiry Received!</h4>
                      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                        Thank you for reaching out. Our STEM academic director will contact you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-foreground mb-1">
                            Your Name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dr. Rajesh Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all shadow-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-foreground mb-1">
                            Email Address <span className="text-primary">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@school.edu.in"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Contact & Institute */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-foreground mb-1">
                            Contact / WhatsApp <span className="text-primary">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all shadow-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-foreground mb-1">
                            School / Institute Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Delhi Public School"
                            value={formData.institute}
                            onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Purpose Selection */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-foreground mb-1">
                          Purpose
                        </label>
                        <select
                          value={formData.purpose}
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground focus:outline-none transition-all shadow-sm"
                        >
                          <option value="School Innovation Lab Setup (AI & Robotics)">School Innovation Lab Setup (AI &amp; Robotics)</option>
                          <option value="K-12 STEM Curriculum Partnership">K-12 STEM Curriculum Partnership</option>
                          <option value="Drone Technology & Aviation">Drone Technology &amp; Aviation Lab</option>
                          <option value="Teacher Enablement & Certification">Teacher Enablement &amp; STEM Certification</option>
                          <option value="General Inquiry">General Partnership Inquiry</option>
                        </select>
                      </div>

                      {/* Message Textarea */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-foreground mb-1">
                          Your Message / Requirements (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Tell us about student strength, target grades, or lab setup requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all resize-none shadow-sm"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 mt-2"
                      >
                        {isSubmitting ? (
                          <span>Sending Request...</span>
                        ) : (
                          <>
                            <span>Submit Enquiry</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                    </form>
                  )}
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

