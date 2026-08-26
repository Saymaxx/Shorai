'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Check, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  BookOpen,
  MessageSquare,
  Copy,
  ExternalLink,
  Zap,
  Flame,
  Layers,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/shared/Footer';
import ContactModal from '@/components/shared/ContactModal';
import { usePageMeta } from '@/hooks/usePageMeta';
import { defaultBlogData } from '@/config/defaultBlogData';
import { defaultGalleryData } from '@/config/defaultGalleryData';
import { BlogArticle, Author } from '@/types/blog';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface ArticleReaderPageProps {
  slug?: string;
}

export default function ArticleReaderPage({ slug }: ArticleReaderPageProps) {
  const [blogData] = useState(defaultBlogData);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Find matching article
  const article = useMemo(() => {
    return blogData.articles.find(a => a.slug === slug) || blogData.articles[0];
  }, [blogData.articles, slug]);

  const author = useMemo(() => {
    return blogData.authors.find(a => a.id === article.authorId) || blogData.authors[0];
  }, [blogData.authors, article]);

  // Related school story if any
  const relatedSchoolStory = useMemo(() => {
    if (!article.relatedSchoolSlug) return null;
    return defaultGalleryData.albums.find(a => a.slug === article.relatedSchoolSlug);
  }, [article.relatedSchoolSlug]);

  // Related articles
  const relatedArticles = useMemo(() => {
    return blogData.articles
      .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
      .slice(0, 3);
  }, [blogData.articles, article]);

  // Page meta
  usePageMeta({
    title: article.seo?.metaTitle || `${article.title} | Shorai Insights`,
    description: article.seo?.metaDescription || article.excerpt,
  });

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${article.title}\n\nRead more on Shorai Insights: ${typeof window !== 'undefined' ? window.location.href : ''}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${article.title} via @shorai_stem`);
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  // Structured Data Schema Injection for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.coverImage,
    'datePublished': article.publishedDate,
    'dateModified': article.updatedDate || article.publishedDate,
    'author': {
      '@type': 'Person',
      'name': author.name,
      'jobTitle': author.designation,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'SHORAI STEM LABS',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.shorai.in/images/shorai_logo.png',
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pt-28 sm:pt-36 overflow-x-hidden">
      
      {/* ── Dynamic JSON-LD Structured Data Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Fixed Reading Progress Bar with Luminous Glow ── */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-border/40 pointer-events-none">
        <div 
          className="h-full transition-all duration-150 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
          }}
        />
      </div>

      {/* ── Breadcrumb Navigation ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-primary transition-colors">Insights</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-bold">{article.categoryName}</span>
        </div>
      </div>

      {/* ── Article Header ── */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border-2 border-primary/30 text-xs font-mono font-black text-primary shadow-sm">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>{article.categoryName}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.12]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
          {article.excerpt}
        </p>

        {/* Metadata & Author Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-primary/50 shadow-md flex-shrink-0">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{author.name}</div>
              <div className="text-xs text-muted-foreground font-mono">{author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{article.publishedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{article.readingTimeMinutes} min read</span>
            </div>
          </div>
        </div>

        {/* Social Share Floating Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <span className="text-xs font-mono font-bold text-muted-foreground mr-1">Share Insight:</span>
          <button
            onClick={handleWhatsAppShare}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <span>WhatsApp</span>
          </button>
          <button
            onClick={handleLinkedInShare}
            className="px-3.5 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </button>
          <button
            onClick={handleTwitterShare}
            className="px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-mono font-bold flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
            <span>X</span>
          </button>
          <button
            onClick={handleCopyShare}
            className="px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ml-auto hover:scale-105"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>
      </header>

      {/* ── Main Cover Visual with Glowing Frame ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] shadow-[0_12px_40px_rgba(99,102,241,0.25)]">
          <div className="relative aspect-[16/9] rounded-[1.9rem] overflow-hidden bg-black">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </div>
      </div>

      {/* ── Article Content Body ── */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 text-foreground">
        
        {/* Key Takeaways Box with Holographic Gradient Border */}
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-purple-500/40 via-indigo-500/40 to-cyan-500/40 shadow-lg">
          <div className="p-6 sm:p-7 rounded-[22px] bg-card space-y-3">
            <div className="text-xs font-mono font-black text-primary uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>EXECUTIVE SUMMARY FOR SCHOOL TRUSTEES &amp; DIRECTORS</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground/90 font-medium list-disc list-inside">
              <li>NEP 2020 mandates experiential vocational coding &amp; robotics starting from Grade 6.</li>
              <li>Hands-on tactile micro-controllers build 3x deeper conceptual understanding than screen-only apps.</li>
              <li>Turnkey lab infrastructure models eliminate hardware procurement and faculty recruitment bottlenecks.</li>
            </ul>
          </div>
        </div>

        {/* Formatted Content Body */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
          {article.content.split('\n\n').map((paragraph, pIdx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={pIdx} className="text-2xl sm:text-3xl font-black text-foreground tracking-tight pt-8 pb-2 border-b border-border">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={pIdx} className="text-xl sm:text-2xl font-black text-foreground tracking-tight pt-5">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={pIdx} className="p-6 rounded-2xl bg-muted/40 border-l-4 border-primary text-base sm:text-lg italic text-foreground my-5 shadow-sm">
                  &ldquo;{paragraph.replace('> ', '')}&rdquo;
                </blockquote>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              const lines = paragraph.split('\n');
              return (
                <ul key={pIdx} className="space-y-2.5 my-4 pl-4 list-disc text-sm sm:text-base">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx} className="text-foreground/90">
                      {line.replace(/^[0-9]+\.\s+/, '').replace(/^-\s+/, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={pIdx} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* ── Contextual In-Article School Demo CTA ── */}
        <div className="my-12 relative rounded-[2rem] p-[2px] bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF] shadow-2xl">
          <div className="p-6 sm:p-10 rounded-[1.9rem] bg-card space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase">
              <Building2 className="w-4 h-4" />
              <span>PARTNER WITH SHORAI</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground">
              Bring Turnkey AI &amp; Robotics Labs to Your School Campus
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Schedule an on-campus demonstration with our academic directors. We provide complete hardware infrastructure, teacher enablement, and NEP 2020 curriculum in 30 days.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#7928CA] to-[#00D4FF] text-white text-xs font-black shadow-lg hover:opacity-95 transition-all flex items-center gap-2 hover:scale-105"
              >
                <span>Schedule On-Campus Lab Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Related School Campus Story (If applicable) ── */}
        {relatedSchoolStory && (
          <div className="p-6 sm:p-7 rounded-3xl bg-muted/20 border-2 border-border space-y-4 my-8 shadow-sm">
            <div className="text-[11px] font-mono font-bold text-primary uppercase">SEE THIS IN ACTION AT PARTNER SCHOOL</div>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-full sm:w-44 aspect-[16/10] rounded-2xl overflow-hidden flex-shrink-0 border border-border bg-black">
                <Image
                  src={relatedSchoolStory.heroImage}
                  alt={relatedSchoolStory.schoolName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 text-left flex-1">
                <h4 className="text-base font-black text-foreground">{relatedSchoolStory.headline}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{relatedSchoolStory.subtitle}</p>
                <Link
                  href={`/gallery/${relatedSchoolStory.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:underline pt-1"
                >
                  <span>Explore School Story &amp; Photos →</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground font-bold mr-1">Filed under:</span>
          {article.tags.map((tag, tIdx) => (
            <span key={tIdx} className="px-3 py-1 rounded-xl bg-muted border border-border text-xs font-mono font-semibold text-foreground">
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border flex flex-col sm:flex-row items-start sm:items-center gap-5 my-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl overflow-hidden relative border-2 border-primary/40 flex-shrink-0 shadow-md">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1 flex-1">
            <div className="text-xs font-mono font-bold text-primary uppercase">WRITTEN BY</div>
            <h4 className="text-base font-black text-foreground">{author.name}</h4>
            <div className="text-xs font-mono text-muted-foreground">{author.designation}</div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">{author.bio}</p>
          </div>
        </div>

      </article>

      {/* ── Related Articles Section ── */}
      {relatedArticles.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 border-t border-border mt-12">
          <div className="mb-8">
            <span className="text-[11px] font-mono font-black text-primary uppercase tracking-widest">
              CONTINUE READING
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mt-0.5">
              Related Insights
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group p-5 rounded-3xl bg-card border-2 border-border hover:border-primary/50 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-2.5">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-primary">{rel.categoryName}</span>
                  <h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>

                <div className="text-[11px] font-mono text-muted-foreground pt-4 border-t border-border/80 flex items-center justify-between">
                  <span>{rel.readingTimeMinutes} min read</span>
                  <span className="text-primary font-bold group-hover:translate-x-1 transition-transform">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
