'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Building2, 
  Navigation,
  Compass
} from 'lucide-react';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

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

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer id="contact" className="bg-card border-t border-border pt-20 pb-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[40vw] h-[300px] bg-primary/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[300px] bg-secondary/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Grid: Brand & Contact Info Left + Innovation Center & Actions Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-border items-start">
          
          {/* Col 1: Brand & Verified Contact Details (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-5 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7928CA] via-[#6366F1] to-[#00D4FF] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
                  <span className="text-white font-black text-2xl tracking-tighter">S</span>
                </div>
                <div>
                  <span className="text-2xl font-black tracking-tight text-foreground block leading-tight">
                    SHORAI<span className="text-primary">.</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                    Building Future Innovators
                  </span>
                </div>
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-5">
                <Building2 className="w-4 h-4" />
                An Initiative by SEG Academy Pvt. Ltd.
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
                Transforming K-12 school education across India through turnkey AI &amp; Robotics Innovation Labs, NEP-aligned STEM curriculum, and certified faculty empowerment.
              </p>

              {/* Verified Contact Details */}
              <div className="space-y-3.5 text-xs text-foreground/90 font-medium">
                <a 
                  href="tel:+917880630963"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <span>+91 7880630963</span>
                </a>

                <a 
                  href="mailto:contact@shorai.in"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <span>contact@shorai.in / info@shorai.in</span>
                </a>

                <a 
                  href="https://www.shorai.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Globe className="w-4.5 h-4.5" />
                  </div>
                  <span>www.shorai.in</span>
                </a>

                <div className="flex items-start gap-3 text-muted-foreground pt-1">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <span className="leading-snug max-w-md">
                    119/114, Ramkrishna Road, Khudiram, Khardaha, Kolkata, North 24 Parganas, West Bengal 700116.
                  </span>
                </div>
              </div>
            </div>

            {/* Extra Big Social CTA Icons */}
            <div className="mt-8">
              <span className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase block mb-3">
                CONNECT ON SOCIAL
              </span>
              <div className="flex items-center gap-3.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-muted hover:bg-[#0A66C2]/20 border border-border hover:border-[#0A66C2]/50 text-foreground hover:text-[#0A66C2] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-5.5 h-5.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-muted hover:bg-[#FF0000]/20 border border-border hover:border-[#FF0000]/50 text-foreground hover:text-[#FF0000] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-5.5 h-5.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-muted hover:bg-[#E1306C]/20 border border-border hover:border-[#E1306C]/50 text-foreground hover:text-[#E1306C] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5.5 h-5.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-muted hover:bg-[#1877F2]/20 border border-border hover:border-[#1877F2]/50 text-foreground hover:text-[#1877F2] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-5.5 h-5.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Interactive Google Map + Dual Action Buttons (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-mono font-bold tracking-[0.2em] text-foreground uppercase">
                  OUR INNOVATION CENTER
                </h4>
                <a
                  href="https://maps.google.com/?q=Ramkrishna+Road,+Khardaha,+Kolkata+700116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Interactive Google Map */}
              <div className="relative w-full h-[240px] sm:h-[260px] rounded-3xl overflow-hidden border border-border bg-muted shadow-inner group">
                <iframe
                  title="Shorai SEG Academy Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14725.753380486844!2d88.3756184!3d22.7212457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89c666a01d51f%3A0x6b13e8e19b027d14!2sKhardaha%2C%20West%20Bengal%20700116!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Map Overlay Badge */}
                <div className="absolute bottom-3.5 left-3.5 p-3 rounded-2xl bg-card/90 border border-border backdrop-blur-md text-xs shadow-lg max-w-[300px]">
                  <div className="font-bold text-foreground flex items-center gap-2 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    Shorai STEM Center
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-tight">
                    Khardaha, Kolkata, West Bengal 700116
                  </div>
                </div>
              </div>
            </div>

            {/* Dual CTA Buttons: "To know more about us contact us" + "Visit Us" */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>

              <MagneticWrapper>
                <a
                  href="https://maps.google.com/?q=Ramkrishna+Road,+Khardaha,+Kolkata+700116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-14 rounded-2xl bg-card hover:bg-muted border border-border hover:border-primary/50 text-foreground font-bold text-xs tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Navigation className="w-4 h-4 text-primary" />
                  <span>Visit Us</span>
                </a>
              </MagneticWrapper>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SHORAI (SEG Academy Pvt. Ltd.). All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground/60">NEP 2020 Aligned</span>
            <span className="text-muted-foreground/60">STEM Certified</span>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-foreground transition-colors">
              Contact School Director
            </button>
          </div>
        </div>

      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
}
