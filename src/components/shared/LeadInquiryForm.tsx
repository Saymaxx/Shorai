'use client';

import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Send, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { submitLeadToGoogleSheet } from '@/lib/leadSubmission';
import { siteConfig } from '@/config/siteConfig';

export interface LeadInquiryFormProps {
  variant?: 'modal' | 'inline' | 'page';
  defaultPurpose?: string;
  onSuccess?: () => void;
  submitButtonText?: string;
  className?: string;
}

export default function LeadInquiryForm({
  variant = 'inline',
  defaultPurpose,
  onSuccess,
  submitButtonText = 'Send Inquiry to STEM Team',
  className = '',
}: LeadInquiryFormProps) {
  const formId = useId();

  const [formData, setFormData] = useState({
    name: '',
    school: '',
    email: '',
    phone: '',
    purpose: defaultPurpose || siteConfig.programOptions[0],
    message: '',
    websiteHoneypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot bot protection: if hidden field is filled, silently ignore
    if (formData.websiteHoneypot) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLeadToGoogleSheet({
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
        organisation: formData.school,
        purpose: formData.purpose,
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2200);
      }
    } catch (err) {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      school: '',
      email: '',
      phone: '',
      purpose: defaultPurpose || siteConfig.programOptions[0],
      message: '',
      websiteHoneypot: '',
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-10 px-4 text-center flex flex-col items-center justify-center space-y-4"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shadow-lg border border-emerald-500/30 animate-pulse">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-foreground">Message Received!</h3>
        <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
          Thank you for reaching out. Our STEM Education team will contact you within 24 hours to schedule your campus consultation.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 rounded-xl bg-muted border border-border text-xs font-bold text-foreground hover:bg-muted/80 transition-all mt-2"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} aria-label="School Consultation Inquiry Form">
      {/* Anti-spam honeypot */}
      <input
        type="text"
        name="website_hp"
        tabIndex={-1}
        autoComplete="off"
        value={formData.websiteHoneypot}
        onChange={(e) => setFormData({ ...formData, websiteHoneypot: e.target.value })}
        className="hidden"
        aria-hidden="true"
      />
      
      {/* Name and School Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor={`${formId}-name`} 
            className="block text-xs font-semibold text-foreground/85 mb-1.5"
          >
            Your Name <span className="text-primary font-bold">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id={`${formId}-name`}
              type="text"
              required
              placeholder="Principal / Educator Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label 
            htmlFor={`${formId}-school`} 
            className="block text-xs font-semibold text-foreground/85 mb-1.5"
          >
            School / Institution <span className="text-primary font-bold">*</span>
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id={`${formId}-school`}
              type="text"
              required
              placeholder="e.g. Delhi Public School"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Phone and Email Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor={`${formId}-phone`} 
            className="block text-xs font-semibold text-foreground/85 mb-1.5"
          >
            Phone / WhatsApp <span className="text-primary font-bold">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id={`${formId}-phone`}
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label 
            htmlFor={`${formId}-email`} 
            className="block text-xs font-semibold text-foreground/85 mb-1.5"
          >
            Email Address <span className="text-primary font-bold">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id={`${formId}-email`}
              type="email"
              required
              placeholder="educator@school.edu.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      {/* Program / Purpose Field */}
      <div>
        <label 
          htmlFor={`${formId}-purpose`} 
          className="block text-xs font-semibold text-foreground/85 mb-1.5"
        >
          Interested Program / Objective
        </label>
        <select
          id={`${formId}-purpose`}
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-all"
        >
          {siteConfig.programOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message Textarea */}
      <div>
        <label 
          htmlFor={`${formId}-message`} 
          className="block text-xs font-semibold text-foreground/85 mb-1.5"
        >
          Message / Requirements
        </label>
        <div className="relative">
          <textarea
            id={`${formId}-message`}
            rows={variant === 'page' ? 4 : 3}
            placeholder="Tell us about your student strength, grades, or specific goals..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(99,102,241,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span>Sending your inquiry...</span>
        ) : (
          <>
            <span>{submitButtonText}</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
