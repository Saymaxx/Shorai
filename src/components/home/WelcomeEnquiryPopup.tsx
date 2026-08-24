'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles
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

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function WelcomeEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    institute: '',
    purpose: 'School Innovation Lab Setup',
    message: '',
  });

  useEffect(() => {
    const hasDismissed = sessionStorage.getItem('shorai_welcome_popup_dismissed');
    const timer = setTimeout(() => {
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('shorai_welcome_popup_dismissed', 'true');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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
        handleClose();
      }, 2400);
    } catch {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Subtle clean backdrop without heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Spacious & Clean Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 25 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-3xl overflow-hidden bg-card border-2 border-primary/30 shadow-[0_25px_70px_rgba(0,0,0,0.4)] z-10 my-6"
          >
            {/* Top Multi-Color Neon Accent Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-muted/80 hover:bg-muted border border-border flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-105 transition-all shadow-sm"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-7 sm:p-10 relative">
              
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-2.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SHORAI STEM PARTNERSHIP</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  Enquiry <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">Form</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1 font-medium max-w-md mx-auto">
                  Connect with our academic team for turnkey school lab setup &amp; programs.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shadow-md border border-emerald-500/40 animate-pulse">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black text-foreground">Enquiry Received!</h4>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    Thank you! Our STEM team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                /* Spacious, Clean Form with name, email, contact, institute, purpose, message */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Email (Side-by-side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-muted/50 hover:bg-muted/70 focus:bg-background border border-border focus:border-primary text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-muted/50 hover:bg-muted/70 focus:bg-background border border-border focus:border-primary text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Contact & Institute (Side-by-side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Contact / WhatsApp *"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-muted/50 hover:bg-muted/70 focus:bg-background border border-border focus:border-primary text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Institute / School Name"
                        value={formData.institute}
                        onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-muted/50 hover:bg-muted/70 focus:bg-background border border-border focus:border-primary text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Purpose Selection */}
                  <div>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-muted/50 hover:bg-muted/70 focus:bg-background border border-border focus:border-primary text-sm sm:text-base text-foreground focus:outline-none transition-all shadow-sm"
                    >
                      <option value="School Innovation Lab Setup">School Innovation Lab Setup (AI &amp; Robotics)</option>
                      <option value="K-12 STEM Curriculum Partnership">K-12 STEM Curriculum Partnership</option>
                      <option value="Drone Technology & Aviation">Drone Technology &amp; Aviation</option>
                      <option value="Teacher Enablement & Certification">Teacher Enablement &amp; Certification</option>
                      <option value="General Inquiry">General Partnership Inquiry</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Your Message / Specific Requirements (Optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-muted/50 hover:bg-muted/70 focus:bg-background border border-border focus:border-primary text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-all resize-none shadow-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 mt-2"
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

              {/* Social Media Action Buttons (Footer) */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground font-bold uppercase">
                  Follow Shorai:
                </span>

                <div className="flex items-center gap-2.5">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-muted hover:bg-[#E1306C]/15 border border-border hover:border-[#E1306C]/40 text-muted-foreground hover:text-[#E1306C] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-muted hover:bg-[#FF0000]/15 border border-border hover:border-[#FF0000]/40 text-muted-foreground hover:text-[#FF0000] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-muted hover:bg-[#1877F2]/15 border border-border hover:border-[#1877F2]/40 text-muted-foreground hover:text-[#1877F2] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-muted hover:bg-[#0A66C2]/15 border border-border hover:border-[#0A66C2]/40 text-muted-foreground hover:text-[#0A66C2] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
