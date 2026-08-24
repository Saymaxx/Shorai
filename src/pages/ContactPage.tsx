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
  School
} from 'lucide-react';
import SectionReveal from '@/components/animations/SectionReveal';
import Footer from '@/components/shared/Footer';
import { submitLeadToGoogleSheet } from '@/lib/leadSubmission';
import { siteConfig } from '@/config/siteConfig';
import { usePageMeta } from '@/hooks/usePageMeta';

const purposeOptions = siteConfig.programOptions;

export default function ContactPage() {
  usePageMeta(siteConfig.pages.contact);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    contact: string;
    purpose: string;
    schoolName: string;
    message: string;
  }>({
    name: '',
    email: '',
    contact: '',
    purpose: purposeOptions[0],
    schoolName: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 transition-colors duration-300">
      
      {/* ── 1. Hero Header Banner ───────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden border-b border-border bg-muted/20">
        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              CONNECT & PARTNER
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4">
              GET IN TOUCH WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">SHORAI</span>
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions about setting up a Robotics &amp; AI Lab in your school? Fill out the form below or visit our innovation centers.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── 2. Contact Form & Quick Info Section ────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Col: The Main Interactive Form (7 Cols) */}
            <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase block mb-1">
                  DIRECT REACH OUT
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Our STEM education advisors will get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 sm:p-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
                    Your request for <strong>&ldquo;{formData.purpose}&rdquo;</strong> has been received. Our team will reach out to you shortly at <strong>{formData.email || formData.contact}</strong>.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Rajesh Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="rajesh@schoolname.edu"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Contact Number & School Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    
                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        Contact / WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* School / Institution Name */}
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        School / Institution Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                          <School className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. Greenwood International"
                          value={formData.schoolName}
                          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Purpose Selector */}
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1.5">
                      Purpose of Contact <span className="text-rose-500">*</span>
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
                                ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm'
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
                    <label className="block text-xs font-bold text-foreground mb-1.5">
                      Additional Details / Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your student strength, current STEM setup, or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-foreground placeholder:text-muted-foreground/60 transition-all font-medium resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-13 rounded-2xl font-bold text-sm text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                    }}
                  >
                    {loading ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
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
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct Info Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-primary" />
                  Direct Reach Out
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                  Prefer direct communication? Connect with our senior education consultants right away:
                </p>

                <div className="space-y-4">
                  
                  {/* Phone */}
                  <a 
                    href="tel:+917880630963"
                    className="flex items-start gap-4 p-3.5 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
                        Direct Phone / Helpline
                      </span>
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        +91 78806 30963
                      </span>
                    </div>
                  </a>

                  {/* Secondary Phone */}
                  <a 
                    href="tel:+919789944439"
                    className="flex items-start gap-4 p-3.5 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
                        Institutional Advisory
                      </span>
                      <span className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">
                        +91 97899 44439
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:info@segacademy.in"
                    className="flex items-start gap-4 p-3.5 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
                        Official Inquiries
                      </span>
                      <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                        info@segacademy.in
                      </span>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-muted/40 border border-border">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
                        Operational Hours
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        Monday – Saturday: 9:00 AM – 6:30 PM IST
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* SEG Academy Credential Badge */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-black text-sm">
                    S
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">SEG Academy Pvt. Ltd.</h4>
                    <span className="text-[11px] text-muted-foreground">15+ Years in Technology &amp; STEM Training</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                  SHORAI is a dedicated initiative by SEG Academy to deploy next-generation AI, Robotics, and STEM labs across schools in India.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 3. "How to Reach Us" Section (Big Map & Address) ────────── */}
      <section className="py-20 px-4 sm:px-6 bg-muted/30 border-y border-border">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3">
                <MapPin className="w-3.5 h-3.5" />
                OUR LOCATIONS
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
                HOW TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]">REACH US</span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Visit our innovation headquarters and experience center to test live robotics workstations, AI neural kits, and flight simulation bays.
              </p>
            </SectionReveal>
          </div>

          {/* Big Map + Location Details Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Big Interactive Map (7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-border shadow-md bg-card flex flex-col min-h-[420px]">
              <div className="p-4 bg-muted/60 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Navigation className="w-4 h-4 text-primary" />
                  <span>Interactive Campus &amp; Innovation Center Map</span>
                </div>
                <a
                  href="https://maps.google.com/?q=SEG+Academy+Pvt+Ltd"
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.75114757303!2d77.6329!3d12.9234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae148b598b9f1d%3A0x2897e93540ffbb0!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:contrast-100 transition-all duration-500"
                />
              </div>
            </div>

            {/* Location Address Details Cards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Primary Innovation HQ */}
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold mb-3">
                    HEADQUARTERS &amp; LAB
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    SEG Academy / SHORAI Innovation Hub
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Advanced STEM Development Center &amp; Robotics Research Facility
                  </p>

                  <div className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Plot No. 14, 5th Main Road, Sector 6, HSR Layout, Bengaluru, Karnataka 560102, India.
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>
                        Landmark: Near Innovation Corridor &amp; Outer Ring Road
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-border flex items-center justify-between">
                  <a
                    href="https://maps.google.com/?q=HSR+Layout+Bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors"
                  >
                    <span>Get Directions</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[11px] font-mono text-muted-foreground">
                    Metro: Green / Yellow Line
                  </span>
                </div>
              </div>

              {/* Delhi NCR Regional Center */}
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-mono font-bold mb-3">
                    REGIONAL LIAISON OFFICE
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Northern Region Support Center
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Institutional Partnerships &amp; School Deployment Cell
                  </p>

                  <div className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>
                        Block B, Knowledge Park III, Greater Noida, Delhi NCR 201306, India.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                  <a
                    href="tel:+917880630963"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-bold transition-colors"
                  >
                    <span>Call Northern Cell</span>
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Mon - Sat (9 AM - 6 PM)
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
