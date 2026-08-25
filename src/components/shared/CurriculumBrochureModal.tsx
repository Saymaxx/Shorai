'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  GraduationCap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { submitLeadToGoogleSheet } from '@/lib/leadSubmission';

interface CurriculumBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CurriculumBrochureModal({ isOpen, onClose }: CurriculumBrochureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    schoolName: '',
    websiteHoneypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await submitLeadToGoogleSheet({
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      organisation: formData.schoolName,
      purpose: 'Downloaded NEP 2020 STEM Curriculum Blueprint PDF',
      honeypot: formData.websiteHoneypot,
    });

    setLoading(false);
    setDownloaded(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92dvh] overflow-y-auto touch-scroll flex flex-col"
          >
            {/* Top Accent Gradient */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#FF3D7F] to-[#00D4FF]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8">
              {!downloaded ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3">
                      <FileText className="w-3.5 h-3.5" />
                      <span>INSTITUTIONAL CURRICULUM BLUEPRINT</span>
                    </div>

                    <h3 className="shorai-subheading text-2xl sm:text-3xl mb-2">
                      Get the 2026–27 NEP 2020 STEM &amp; AI Lab Blueprint
                    </h3>

                    <p className="shorai-body text-xs sm:text-sm max-w-lg mx-auto">
                      A comprehensive guide designed for Principals, Trustees, and Academic Directors to implement future-ready innovation labs.
                    </p>
                  </div>

                  {/* 4 Feature Highlights */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6 text-left">
                    <div className="p-2.5 rounded-xl bg-muted/30 border border-border flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs font-bold text-foreground">Grades 1–12 Scope &amp; Sequence</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/30 border border-border flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-bold text-foreground">12 Technology Domain Specs</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/30 border border-border flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="text-xs font-bold text-foreground">Master Trainer Model</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-muted/30 border border-border flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00D4FF] flex-shrink-0" />
                      <span className="text-xs font-bold text-foreground">NEP 2020 Compliance Checklist</span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                    {/* Invisible Honeypot Trap */}
                    <input
                      type="text"
                      name="websiteHoneypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.websiteHoneypot}
                      onChange={(e) => setFormData({ ...formData, websiteHoneypot: e.target.value })}
                      className="hidden opacity-0 pointer-events-none absolute -left-[9999px]"
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-foreground mb-1">
                          Official Email <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="principal@school.edu.in"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-foreground mb-1">
                          School / Institute Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. DPS Varanasi"
                          value={formData.schoolName}
                          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-all font-medium"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 mt-2"
                    >
                      {loading ? (
                        <span>Preparing Blueprint...</span>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Instant Download Curriculum Blueprint</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="shorai-subheading text-2xl mb-2">
                    Blueprint Ready!
                  </h3>
                  <p className="shorai-body text-xs sm:text-sm max-w-md mx-auto mb-6">
                    Thank you, {formData.name}. The NEP 2020 STEM &amp; AI Lab Curriculum Blueprint has been sent to your email and our academic director will reach out with customized lab packages.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold text-xs transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
