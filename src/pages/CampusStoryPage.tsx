'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Award,
  Maximize2,
  Zap,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '@/components/animations/SectionReveal';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { defaultGalleryData } from '@/config/defaultGalleryData';
import { GalleryItem } from '@/types/gallery';

interface CampusStoryPageProps {
  slug?: string;
}

export default function CampusStoryPage({ slug }: CampusStoryPageProps) {
  const [galleryData] = useState(defaultGalleryData);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Find matching album
  const album = useMemo(() => {
    return galleryData.albums.find(a => a.slug === slug) || galleryData.albums[0];
  }, [galleryData.albums, slug]);

  usePageMeta({
    title: `${album.schoolName} × Shorai | Campus Innovation Story`,
    description: album.subtitle,
  });

  // Photos belonging to this album
  const albumPhotos = useMemo(() => {
    return galleryData.items.filter(item => 
      album.galleryItemIds.includes(item.id) || item.schoolSlug === album.slug || item.school.toLowerCase().includes(album.schoolName.toLowerCase().split(' ')[0])
    );
  }, [galleryData.items, album]);

  const activePhoto = selectedPhotoIndex !== null ? albumPhotos[selectedPhotoIndex] : null;

  const handleCopyShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pt-28 sm:pt-36 overflow-x-hidden">
      
      {/* ── Top Breadcrumb Strip ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Campus Media Vault</span>
        </Link>
      </div>

      {/* ── Hero Section with Glowing Frame ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] shadow-[0_12px_45px_rgba(99,102,241,0.25)]">
          <div className="rounded-[2.4rem] bg-card p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-mono font-black border border-primary/30 shadow-sm">
                    CAMPUS TRANSFORMATION SPOTLIGHT
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-muted text-foreground text-xs font-mono font-bold border border-border flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{album.city}, {album.state}</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
                  {album.headline}
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {album.subtitle}
                </p>

                {/* Key stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
                    <div className="text-xs font-bold text-muted-foreground uppercase font-mono">Launch Date</div>
                    <div className="text-sm font-black text-foreground mt-0.5">{album.implementationDate}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border">
                    <div className="text-xs font-bold text-muted-foreground uppercase font-mono">Students Active</div>
                    <div className="text-sm font-black text-primary mt-0.5">850+ Innovators</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border col-span-2 sm:col-span-1">
                    <div className="text-xs font-bold text-muted-foreground uppercase font-mono">Status</div>
                    <div className="text-sm font-black text-emerald-400 mt-0.5">100% Operational</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#7928CA] to-[#00D4FF] text-white text-xs font-black shadow-lg hover:opacity-95 transition-all hover:scale-105"
                  >
                    Setup Similar Lab for Your School
                  </button>

                  <button
                    onClick={handleCopyShare}
                    className="px-4 py-3.5 rounded-2xl bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-400" />}
                    <span>{copiedLink ? 'Link Copied' : 'Share Album'}</span>
                  </button>
                </div>

              </div>

              {/* Right Hero Visual */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-black">
                  <Image
                    src={album.heroImage}
                    alt={album.schoolName}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-mono font-bold text-white">
                    {album.schoolName}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── Narrative & Implementation Outcomes ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
              <div className="text-xs font-mono font-black text-primary uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>THE TRANSFORMATION NARRATIVE</span>
              </div>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
                {album.storyNarrative}
              </p>
            </div>

            {/* Principal Quote */}
            {album.principalQuote && (
              <div className="p-6 sm:p-8 rounded-3xl bg-primary/[0.04] border-2 border-primary/25 space-y-3">
                <div className="text-xs font-mono font-bold text-primary uppercase">LEADERSHIP VERDICT</div>
                <blockquote className="text-base sm:text-lg font-medium italic text-foreground leading-relaxed">
                  &quot;{album.principalQuote.quote}&quot;
                </blockquote>
                <div className="pt-2 text-xs font-mono font-bold text-primary">
                  — {album.principalQuote.author}, {album.principalQuote.designation}
                </div>
              </div>
            )}
          </div>

          {/* Right Outcomes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border space-y-4 shadow-sm">
              <div className="text-xs font-mono font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>KEY IMPLEMENTATION OUTCOMES</span>
              </div>

              <div className="space-y-3">
                {album.outcomes.map((outcome, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-muted/40 border border-border flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workstations Covered */}
            <div className="p-6 rounded-3xl bg-card border-2 border-border space-y-3 shadow-sm">
              <div className="text-xs font-mono font-bold text-muted-foreground uppercase">Workstations Installed</div>
              <div className="flex flex-wrap gap-2">
                {album.technologiesCovered.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-muted text-xs font-mono font-bold text-foreground border border-border">
                    ⚡ {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Dedicated Campus Photo Grid ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-8">
          <span className="text-[11px] font-mono font-black text-primary uppercase tracking-widest block">
            CAMPUS VAULT ({albumPhotos.length} PHOTOGRAPHS)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mt-1">
            Moments from {album.schoolName}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albumPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="group relative rounded-3xl overflow-hidden bg-card border-2 border-border hover:border-primary/60 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>

              <div className="p-4 space-y-1">
                <div className="text-[11px] font-mono text-muted-foreground">{photo.date}</div>
                <h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {photo.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Photo Lightbox Modal ── */}
      <AnimatePresence>
        {activePhoto && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden bg-card border-2 border-primary/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-card border-t border-border flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-foreground">{activePhoto.title}</h3>
                  <p className="text-xs text-muted-foreground">{activePhoto.caption}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPhotoIndex((selectedPhotoIndex - 1 + albumPhotos.length) % albumPhotos.length)}
                    className="p-2 rounded-xl bg-muted text-foreground hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % albumPhotos.length)}
                    className="p-2 rounded-xl bg-muted text-foreground hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
