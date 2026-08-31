'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  MapPin, 
  Building2, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Navigation, 
  ShieldCheck, 
  Headphones, 
  Calendar,
  HelpCircle,
  School,
  Bot,
  Zap,
  MessageCircle,
  Check,
  Copy,
  ChevronDown
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import Footer from '@/components/shared/Footer';
import { submitLeadToGoogleSheet } from '@/lib/leadSubmission';
import { siteConfig } from '@/config/siteConfig';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useContent } from '@/context/ContentContext';

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

const purposeOptions = siteConfig.programOptions;

export default function ContactPage() {
  usePageMeta(siteConfig.pages.contact);
  const { content } = useContent();
  const cHero = content.contact.hero;
  const cForm = content.contact.form;
  const cDirect = content.contact.directReach;
  const cReach = content.contact.reachUs;
  const cLoc = content.contact.locations;

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    contact: string;
    purpose: string;
    schoolName: string;
    message: string;
    websiteHoneypot: string;
  }>({
    name: '',
    email: '',
    contact: '',
    purpose: purposeOptions[0],
    schoolName: '',
    message: '',
    websiteHoneypot: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeLocationTab, setActiveLocationTab] = useState<'varanasi' | 'kolkata'>('varanasi');

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await submitLeadToGoogleSheet({
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      organisation: formData.schoolName,
      purpose: formData.purpose,
      message: formData.message,
      honeypot: formData.websiteHoneypot,
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      contact: '',
      purpose: purposeOptions[0],
      schoolName: '',
      message: '',
      websiteHoneypot: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-20 transition-colors duration-300 overflow-x-hidden">
      
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO HEADER WITH GIANT "SHORAI" LIGHT BLUE/VIOLET WATERMARK
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background/40 to-transparent">

        {/* Ambient Glowing Color Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-[#7928CA]/25 via-[#6366F1]/20 to-[#00D4FF]/25 blur-[90px] pointer-events-none" />
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#00D4FF]/20 blur-[70px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#FF3D7F]/15 blur-[80px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 border border-primary/30 text-xs font-mono font-bold text-primary mb-5 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="shorai-eyebrow text-primary">{cHero.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 className="shorai-heading mb-5">
              {cHero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#FF3D7F] to-[#00D4FF]">{cHero.titleGradient}</span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="shorai-body max-w-2xl mx-auto">
              {cHero.subtitle}
            </p>
          </SectionReveal>

          {/* Interactive Fast Contact Pill Bar */}
          <SectionReveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {siteConfig.contact.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all hover:scale-105 shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{siteConfig.contact.email}</span>
              </a>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-muted/60 border border-border text-muted-foreground font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. COLORFUL CONTACT FORM & QUICK REACH OUT CARDS
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        
        {/* Subtle Background Mesh Highlights */}
        <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-[#00D4FF]/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#7928CA]/10 blur-[80px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Col: The Main Interactive Form (7 Cols) */}
            <div className="lg:col-span-7 bg-card border-2 border-primary/20 hover:border-primary/40 rounded-3xl p-6 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all">
              
              {/* Top Colorful Neon Accent Line */}
              <div className="h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#FF3D7F] to-[#00D4FF]" />

              <div className="mb-7 mt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{cForm.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  {cForm.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
                  {cForm.subtitle}
                </p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4 border border-emerald-500/40 animate-bounce">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
                    Your request for <strong>&ldquo;{formData.purpose}&rdquo;</strong> has been successfully received. Our academic STEM director will connect with you within 24 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* 🛡️ Invisible Honeypot Trap for Spam Bots */}
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
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-foreground mb-1.5">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Rajesh Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-foreground mb-1.5">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="name@school.edu.in"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Contact Number & School Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-foreground mb-1.5">
                        Contact / WhatsApp <span className="text-primary">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* School / Institution Name */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-foreground mb-1.5">
                        School / Institute Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                          <School className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. Delhi Public School"
                          value={formData.schoolName}
                          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Purpose Selector */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-foreground mb-1.5">
                      Purpose
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {purposeOptions.map((opt) => {
                        const isSelected = formData.purpose === opt;
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => setFormData({ ...formData, purpose: opt })}
                            className={`p-3 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#7928CA]/10 via-[#6366F1]/10 to-[#00D4FF]/10 border-primary text-primary font-bold shadow-sm ring-1 ring-primary/30'
                                : 'bg-muted/30 border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 ml-1.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-foreground mb-1.5">
                      Your Message / Requirements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about student strength, target grades, or lab setup requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2 bg-gradient-to-r from-[#7928CA] via-[#6366F1] via-[#FF3D7F] to-[#00D4FF]"
                  >
                    {loading ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Submit Consultation Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Your contact details are strictly confidential and protected.</span>
                  </div>

                </form>
              )}

            </div>

            {/* Right Col: Quick Reach Out Channels & Benefits (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Direct Info Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-primary/20 shadow-sm relative overflow-hidden">
                
                {/* Ambient glow in card */}
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#00D4FF]/20 blur-[40px] pointer-events-none" />

                <h3 className="text-xl font-black text-foreground mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7928CA] to-[#00D4FF] text-white flex items-center justify-center shadow-md">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <span>{cDirect.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed font-medium">
                  {cDirect.subtitle}
                </p>

                <div className="space-y-3">
                  
                  {/* WhatsApp Direct (with Copy button) */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
                    <a 
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase block font-bold">
                          WhatsApp / Primary Phone
                        </span>
                        <span className="text-sm font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                          {cDirect.phone1}
                        </span>
                      </div>
                    </a>

                    <button
                      onClick={() => handleCopy(cDirect.phone1, 'phone1')}
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Secondary Phone 2 */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group">
                    <a 
                      href={`tel:${cDirect.phone2.replace(/\s+/g, '')}`}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase block font-bold">
                          {cDirect.phone2Label}
                        </span>
                        <span className="text-sm font-bold text-foreground group-hover:text-indigo-500 transition-colors">
                          {cDirect.phone2}
                        </span>
                      </div>
                    </a>

                    <button
                      onClick={() => handleCopy(cDirect.phone2, 'phone2')}
                      className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-colors"
                      title="Copy Secondary Phone"
                    >
                      {copiedField === 'phone2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-pink-500/5 border border-pink-500/20 hover:border-pink-500/40 transition-all group">
                    <a 
                      href={`mailto:${cDirect.email}`}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-pink-600 dark:text-pink-400 uppercase block font-bold">
                          {cDirect.emailLabel}
                        </span>
                        <span className="text-sm font-bold text-foreground group-hover:text-pink-500 transition-colors">
                          {cDirect.email}
                        </span>
                      </div>
                    </a>

                    <button
                      onClick={() => handleCopy(cDirect.email, 'email')}
                      className="p-2 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 transition-colors"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Operational Hours */}
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/40 border border-border">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
                        Operational Hours (Mon – Sat)
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {cDirect.hours}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Social Connect Icons Row */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                    Connect on Socials:
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-muted/60 hover:bg-pink-500 hover:text-white border border-border flex items-center justify-center text-foreground/70 transition-all hover:scale-110 shadow-sm"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>

                    <a
                      href={siteConfig.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-muted/60 hover:bg-red-600 hover:text-white border border-border flex items-center justify-center text-foreground/70 transition-all hover:scale-110 shadow-sm"
                      aria-label="YouTube"
                    >
                      <YouTubeIcon className="w-4 h-4" />
                    </a>

                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-muted/60 hover:bg-[#0A66C2] hover:text-white border border-border flex items-center justify-center text-foreground/70 transition-all hover:scale-110 shadow-sm"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

              {/* SEG Academy Heritage Card with Gradient Border */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#7928CA]/10 via-[#6366F1]/5 to-[#00D4FF]/10 border-2 border-primary/30 relative overflow-hidden">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-white p-1 shadow-md border border-white/50 flex items-center justify-center">
                    <img src="/images/shorai_logo.png" alt="SHORAI" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-foreground">SEG Academy Initiative</h4>
                    <span className="text-xs font-mono font-bold text-primary">15+ Years STEM Heritage</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  SHORAI is a subsidiary institutional initiative by SEG Academy, deploying turnkey Robotics, AI, Coding, and Drones Innovation Hubs across leading schools in India.
                </p>
                <div className="mt-4 pt-3 border-t border-primary/20 flex items-center justify-between text-xs font-bold">
                  <a
                    href="https://www.segacademy.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <span>Visit SEG Academy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    NEP 2020 Aligned
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. "HOW TO REACH US" (INTERACTIVE MAP & CAMPUS HUBS)
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 bg-muted/30 border-y border-border relative overflow-hidden">
        
        {/* Background Subtle Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#7928CA]/10 via-[#00D4FF]/10 to-[#FF3D7F]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7928CA]/10 to-[#00D4FF]/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{cReach.badge}</span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4 break-words">
                {cReach.title}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">{cReach.titleGradient}</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                {cReach.subtitle}
              </p>
            </SectionReveal>
          </div>

          {/* Interactive Campus Selector Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-card border border-border shadow-sm">
              <button
                onClick={() => setActiveLocationTab('varanasi')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeLocationTab === 'varanasi'
                    ? 'bg-gradient-to-r from-[#7928CA] to-[#6366F1] text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Varanasi Innovation Hub</span>
              </button>

              <button
                onClick={() => setActiveLocationTab('kolkata')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeLocationTab === 'kolkata'
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#00D4FF] text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Kolkata Regional HQ</span>
              </button>
            </div>
          </div>

          {/* Big Map + Location Details Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Big Interactive Map (7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-lg bg-card flex flex-col min-h-[420px]">
              <div className="p-4 bg-muted/50 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Navigation className="w-4 h-4 text-primary animate-pulse" />
                  <span>
                    {activeLocationTab === 'varanasi' ? 'Varanasi Central Campus Map' : 'Kolkata Regional HQ Map'}
                  </span>
                </div>
                <a
                  href={activeLocationTab === 'varanasi' ? siteConfig.locations.varanasi.mapUrl : siteConfig.locations.kolkata.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-bold hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* The Map Embed Container */}
              <div className="relative flex-1 w-full min-h-[380px] bg-muted/40">
                <iframe
                  title="SHORAI & SEG Academy Location Map"
                  src={activeLocationTab === 'varanasi' ? siteConfig.locations.varanasi.embedMapUrl : siteConfig.locations.kolkata.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[25%] contrast-110 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Location Address Details Cards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Primary Varanasi Center */}
              <div 
                onClick={() => setActiveLocationTab('varanasi')}
                className={`p-6 sm:p-7 rounded-3xl bg-card border-2 cursor-pointer transition-all ${
                  activeLocationTab === 'varanasi' 
                    ? 'border-primary shadow-lg ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 via-card to-card' 
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
                      VARANASI MAIN HUB
                    </span>
                    {activeLocationTab === 'varanasi' && (
                      <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Active View
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-foreground mb-1">
                    {cLoc.varanasiTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 font-medium">
                    {cLoc.varanasiSubtitle}
                  </p>

                  <div className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{cLoc.varanasiAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <a
                    href={siteConfig.locations.varanasi.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7928CA] to-[#6366F1] text-white text-xs font-bold transition-all hover:scale-105 shadow-sm"
                  >
                    <span>Get Directions</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[11px] font-mono text-muted-foreground font-semibold">
                    Phone: {cLoc.varanasiPhone}
                  </span>
                </div>
              </div>

              {/* Kolkata Regional Center */}
              <div 
                onClick={() => setActiveLocationTab('kolkata')}
                className={`p-6 sm:p-7 rounded-3xl bg-card border-2 cursor-pointer transition-all ${
                  activeLocationTab === 'kolkata' 
                    ? 'border-secondary shadow-lg ring-2 ring-secondary/20 bg-gradient-to-br from-secondary/5 via-card to-card' 
                    : 'border-border hover:border-secondary/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-mono font-bold">
                      KOLKATA HQ
                    </span>
                    {activeLocationTab === 'kolkata' && (
                      <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Active View
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-foreground mb-1">
                    {cLoc.kolkataTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 font-medium">
                    {cLoc.kolkataSubtitle}
                  </p>

                  <div className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{cLoc.kolkataAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <a
                    href={siteConfig.locations.kolkata.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#00D4FF] text-white text-xs font-bold transition-all hover:scale-105 shadow-sm"
                  >
                    <span>Open Pinpoint</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] font-mono text-muted-foreground font-semibold">
                    Phone: {cLoc.kolkataPhone}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── 4. Full Footer with All Details ─────────────────────────── */}
      <Footer />

    </div>
  );
}

