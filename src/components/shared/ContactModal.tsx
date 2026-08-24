'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import LeadInquiryForm from '@/components/shared/LeadInquiryForm';
import { siteConfig } from '@/config/siteConfig';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-card border border-border/80 shadow-[0_25px_70px_rgba(0,0,0,0.5)] z-10 my-8"
          >
            {/* Top Subtle Gradient Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted border border-border flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-105 transition-all"
              aria-label="Close Contact Dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border/60">
              
              {/* LEFT: Minimalist Info & Quick Connect Channels */}
              <div className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-muted/30">
                <div>
                  {/* Brand & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/40 bg-white dark:bg-[#0B0F19] p-0.5 shadow-sm shrink-0">
                      <img src="/images/shorai_logo.png" alt="SHORAI" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <div>
                      <span className="text-base font-black text-foreground block leading-tight">SHORAI<span className="text-primary">.</span></span>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">STEM Labs &amp; AI</span>
                    </div>
                  </div>

                  <h3 id="contact-modal-title" className="text-xl sm:text-2xl font-black text-foreground mb-1.5 tracking-tight">
                    Get in Touch
                  </h3>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-medium">
                    Let&apos;s build future-ready innovators in your school. Connect directly with our academic team:
                  </p>

                  {/* 4 Minimalist Channels */}
                  <div className="space-y-2.5">
                    
                    {/* WhatsApp */}
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[9px] font-mono text-muted-foreground uppercase font-bold">WhatsApp / Phone</div>
                          <div className="text-xs font-bold text-foreground group-hover:text-emerald-500 transition-colors">{siteConfig.contact.phoneDisplay}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                    </a>

                    {/* Instagram */}
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border hover:border-pink-500/50 hover:bg-pink-500/5 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <InstagramIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[9px] font-mono text-muted-foreground uppercase font-bold">Instagram</div>
                          <div className="text-xs font-bold text-foreground group-hover:text-pink-500 transition-colors">@shorai_stem</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-pink-500 transition-colors" />
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[9px] font-mono text-muted-foreground uppercase font-bold">Email</div>
                          <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{siteConfig.contact.email}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>

                    {/* Locations */}
                    <a
                      href={siteConfig.locations.varanasi.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border hover:border-secondary/50 hover:bg-secondary/5 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[9px] font-mono text-muted-foreground uppercase font-bold">Locations</div>
                          <div className="text-xs font-bold text-foreground group-hover:text-secondary transition-colors">Varanasi • Kolkata</div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-secondary transition-colors" />
                    </a>

                  </div>
                </div>

                {/* Subtle Footer Note */}
                <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span>SEG ACADEMY INITIATIVE</span>
                  <span>NEP 2020 ALIGNED</span>
                </div>
              </div>

              {/* RIGHT: Clean Streamlined Inquiry Form */}
              <div className="md:col-span-7 p-6 sm:p-7 bg-card flex flex-col justify-center">
                <div className="mb-3.5">
                  <h4 className="text-base font-bold text-foreground">Request School Consultation</h4>
                  <p className="text-[11px] text-muted-foreground">Fill in the details below to receive program guides and a customized STEM lab plan.</p>
                </div>

                <LeadInquiryForm 
                  variant="modal" 
                  onSuccess={onClose}
                  submitButtonText="Submit Consultation Request"
                />
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
