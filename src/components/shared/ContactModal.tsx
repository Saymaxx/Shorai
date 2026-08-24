'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import LeadInquiryForm from '@/components/shared/LeadInquiryForm';
import { siteConfig } from '@/config/siteConfig';

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
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-card border border-border shadow-[0_25px_70px_rgba(0,0,0,0.6)] z-10 my-8"
          >
            {/* Top Laser Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#7928CA] via-[#00D4FF] to-[#FF6B00]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-105 transition-all shadow-md"
              aria-label="Close Contact Dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border">
              
              {/* LEFT: Contact Info & Address */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-muted/40">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    CONNECT WITH US
                  </div>

                  <h3 id="contact-modal-title" className="text-2xl sm:text-3xl font-black text-foreground mb-3 tracking-tight">
                    Let&apos;s Build Future-Ready Innovators.
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-medium">
                    Have questions about setting up an AI &amp; Robotics Innovation Lab in your school? Our academic directors are ready to assist.
                  </p>

                  {/* Direct details */}
                  <div className="space-y-4">
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Call or WhatsApp</div>
                        <div className="text-sm font-bold text-foreground">{siteConfig.contact.phoneDisplay}</div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Official Email</div>
                        <div className="text-sm font-bold text-foreground">{siteConfig.contact.email}</div>
                      </div>
                    </a>

                    <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">SEG Academy • Varanasi</div>
                        <div className="text-xs text-foreground/80 leading-snug">
                          {siteConfig.locations.varanasi.address}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500 flex-shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Shorai STEM HQ • Kolkata</div>
                        <div className="text-xs text-foreground/80 leading-snug">
                          {siteConfig.locations.kolkata.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>SEG ACADEMY INITIATIVE</span>
                  <span>WWW.SHORAI.IN</span>
                </div>
              </div>

              {/* RIGHT: Inquiry Form */}
              <div className="md:col-span-7 p-6 sm:p-8 bg-card flex flex-col justify-center">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-foreground">Request School Consultation</h4>
                  <p className="text-xs text-muted-foreground">Fill in the details below to receive program guides and a customized STEM lab plan.</p>
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
