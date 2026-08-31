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
  Compass,
  Award,
  ShieldCheck
} from 'lucide-react';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { siteConfig } from '@/config/siteConfig';
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

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeMapLocation, setActiveMapLocation] = useState<'varanasi' | 'kolkata'>('varanasi');
  const { content } = useContent();
  const foot = content.footer;
  const cLoc = content.contact.locations;

  const varanasiLoc = siteConfig.locations.varanasi;
  const kolkataLoc = siteConfig.locations.kolkata;

  return (
    <footer id="contact" className="bg-transparent border-t border-border pt-20 pb-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[40vw] h-[300px] bg-primary/[0.03] rounded-full blur-[40px] md:blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[300px] bg-secondary/[0.03] rounded-full blur-[40px] md:blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Grid: Brand & Dual Addresses Left + Interactive Google Map Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-border items-start">
          
          {/* Col 1: Brand, Registration, & Dual Official Addresses (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3.5 mb-4 group">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40 bg-white dark:bg-[#0B0F19] p-0.5 shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
                  <img src="/images/shorai_logo.png" alt="SHORAI" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-2xl font-black tracking-tight text-foreground block leading-tight">
                    {foot.brandName}<span className="text-primary">.</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                    {foot.tagline}
                  </span>
                </div>
              </Link>

              {/* Dual Address Cards */}
              <div className="space-y-4 mb-6">
                
                {/* 1. Varanasi Center Card (From Provided Image) */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border hover:border-primary/40 transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                      SEG ACADEMY CENTER // VARANASI
                    </span>
                    <a
                      href={varanasiLoc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Get Pinpoint</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-foreground/90 font-medium">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      {cLoc.varanasiAddress}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2.5 pt-2 border-t border-border/60 text-[11px] font-mono text-muted-foreground">
                    <span>Email: <a href={`mailto:${cLoc.varanasiEmail}`} className="text-foreground hover:text-primary font-bold">{cLoc.varanasiEmail}</a></span>
                    <span>Web: <a href="https://www.segacademy.in" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary font-bold">www.segacademy.in</a></span>
                  </div>
                </div>

                {/* 2. Kolkata STEM Innovation Center */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border hover:border-primary/40 transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-black text-sky-500 uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20">
                      INNOVATION &amp; STEM HQ // KOLKATA
                    </span>
                    <a
                      href={kolkataLoc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Get Pinpoint</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-foreground/90 font-medium">
                    <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      {cLoc.kolkataAddress}
                    </span>
                  </div>
                </div>

              </div>

              {/* Direct Phone & Email Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-foreground/90">
                <a 
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>

                <a 
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8">
              <span className="text-[11px] font-mono font-bold tracking-widest text-muted-foreground uppercase block mb-3">
                CONNECT ON SOCIAL
              </span>
              <div className="flex items-center gap-3.5">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-muted hover:bg-[#0A66C2]/20 border border-border hover:border-[#0A66C2]/50 text-foreground hover:text-[#0A66C2] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-muted hover:bg-[#FF0000]/20 border border-border hover:border-[#FF0000]/50 text-foreground hover:text-[#FF0000] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-muted hover:bg-[#E1306C]/20 border border-border hover:border-[#E1306C]/50 text-foreground hover:text-[#E1306C] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-muted hover:bg-[#1877F2]/20 border border-border hover:border-[#1877F2]/50 text-foreground hover:text-[#1877F2] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Interactive Google Map Pinpoint View (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              
              {/* Map Header with Location Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-foreground uppercase">
                    PINPOINT LOCATION:
                  </span>
                  <div className="flex items-center bg-muted p-1 rounded-xl border border-border text-xs font-mono">
                    <button
                      onClick={() => setActiveMapLocation('varanasi')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        activeMapLocation === 'varanasi'
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Varanasi (Main)
                    </button>
                    <button
                      onClick={() => setActiveMapLocation('kolkata')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        activeMapLocation === 'kolkata'
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Kolkata (HQ)
                    </button>
                  </div>
                </div>

                <a
                  href={activeMapLocation === 'varanasi' ? varanasiLoc.mapUrl : kolkataLoc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span>Open Exact Pin</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded Interactive Google Map with Direct Pinpoint Overlay */}
              <div className="relative w-full h-[280px] sm:h-[310px] rounded-3xl overflow-hidden border-2 border-border bg-muted shadow-xl group">
                <iframe
                  title="SEG Academy Varanasi & Kolkata Pinpoint Map"
                  src={activeMapLocation === 'varanasi' ? varanasiLoc.embedMapUrl : kolkataLoc.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Clickable Overlay to Open Exact Pinpoint */}
                <a
                  href={activeMapLocation === 'varanasi' ? varanasiLoc.mapUrl : kolkataLoc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-2xl bg-card/95 border border-border backdrop-blur-md text-xs shadow-2xl flex items-center justify-between group-hover:border-primary/50 transition-all"
                >
                  <div>
                    <div className="font-black text-foreground flex items-center gap-2 mb-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      {activeMapLocation === 'varanasi' ? 'SEG Academy • Varanasi Center' : 'Shorai STEM Center • Kolkata'}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-tight line-clamp-1">
                      {activeMapLocation === 'varanasi' ? varanasiLoc.address : kolkataLoc.address}
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-primary text-white text-[11px] font-bold font-mono flex items-center gap-1 shrink-0 ml-3 shadow-md">
                    <span>Directions</span>
                    <Navigation className="w-3 h-3" />
                  </div>
                </a>
              </div>
            </div>

            {/* Dual CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full min-h-[52px] py-3 px-3.5 rounded-2xl bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] text-center"
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </MagneticWrapper>

              <MagneticWrapper>
                <a
                  href={varanasiLoc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[52px] py-3 px-3.5 rounded-2xl bg-card hover:bg-muted border border-border hover:border-primary/50 text-foreground font-bold text-xs tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] text-center"
                >
                  <Navigation className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Get Exact Pinpoint Directions</span>
                </a>
              </MagneticWrapper>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {foot.copyrightText}</p>
          
          <div className="flex items-center gap-6">
            <span className="text-muted-foreground/60">NEP 2020 Aligned</span>
            <span className="text-muted-foreground/60">STEM Certified</span>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-foreground transition-colors font-bold">
              Contact School Director
            </button>
          </div>
        </div>

      </div>

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
}
