'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  User, 
  MessageSquare,
  Bot
} from 'lucide-react';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    email: '',
    phone: '',
    program: 'Robotics & AI Labs',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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

                  <h3 className="text-2xl sm:text-3xl font-black text-foreground mb-3 tracking-tight">
                    Let&apos;s Build Future-Ready Innovators.
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    Have questions about setting up an AI & Robotics Innovation Lab in your school? Our academic directors are ready to assist.
                  </p>

                  {/* Direct details */}
                  <div className="space-y-4">
                    <a
                      href="tel:+917880630963"
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Call or WhatsApp</div>
                        <div className="text-sm font-bold text-foreground">+91 7880630963</div>
                      </div>
                    </a>

                    <a
                      href="mailto:contact@shorai.in"
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Official Email</div>
                        <div className="text-sm font-bold text-foreground">contact@shorai.in</div>
                      </div>
                    </a>

                    <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Innovation Center</div>
                        <div className="text-xs text-foreground/80 leading-snug">
                          119/114, Ramkrishna Road, Khudiram, Khardaha, Kolkata, North 24 Parganas, West Bengal 700116.
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
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4 border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Message Received!</h4>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Thank you for reaching out. Our STEM Education team will contact you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2">
                      <h4 className="text-lg font-bold text-foreground">Request School Consultation</h4>
                      <p className="text-xs text-muted-foreground">Fill in the details below to receive program guides and a customized STEM lab plan.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Your Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            required
                            type="text"
                            placeholder="Principal / Educator Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground/80 mb-1.5">School / Institution *</label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            required
                            type="text"
                            placeholder="School Name, City"
                            value={formData.school}
                            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Phone Number *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            required
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Email Address *</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            required
                            type="email"
                            placeholder="educator@school.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-muted/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Interested Program</label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="Complete Shorai 360° Ecosystem">Complete Shorai 360° Ecosystem</option>
                        <option value="Robotics & AI Innovation Lab">Robotics & AI Innovation Lab</option>
                        <option value="K-12 STEM Curriculum & Kits">K-12 STEM Curriculum & Kits</option>
                        <option value="Drone Technology & Aviation">Drone Technology & Aviation</option>
                        <option value="Teacher Training & Upskilling">Teacher Training & Upskilling</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Message / Requirements</label>
                      <div className="relative">
                        <textarea
                          rows={3}
                          placeholder="Tell us about your student strength, grades, or specific requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full p-3 rounded-xl bg-muted/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.01]"
                    >
                      <span>To Know More About Us Contact Us</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
