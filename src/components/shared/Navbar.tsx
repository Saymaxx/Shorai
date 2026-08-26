'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ArrowRight, 
  Home, 
  Building2, 
  Sparkles, 
  School, 
  Phone,
  Image as ImageIcon,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from '@/context/RouterContext';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isHomeActive = pathname === '/' || pathname === '';
  const isAboutActive = pathname === '/about' || pathname.startsWith('/about');
  const isGalleryActive = pathname === '/gallery' || pathname.startsWith('/gallery');
  const isWhyActive = pathname === '/why-shorai' || pathname.startsWith('/why');
  const isSchoolsActive = pathname === '/schools' || pathname.startsWith('/schools') || pathname.startsWith('/transformation');
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog') || pathname.startsWith('/insights');
  const isContactActive = pathname === '/contact';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-3 sm:py-3.5 bg-background/95 dark:bg-background/95 backdrop-blur-2xl border-b border-border shadow-lg' 
            : 'py-4 sm:py-5 bg-background/90 dark:bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-sm'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* ── Brand Logo with SEG Academy Endorsement ── */}
          <Link href="/" className="relative z-50 flex items-center gap-3.5 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/40 bg-white dark:bg-[#0B0F19] p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
              <img src="/images/shorai_logo.png" alt="SHORAI" className="w-full h-full object-contain rounded-full" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                  SHORAI<span className="text-primary">.</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/15 text-primary border border-primary/30">
                  STEM LABS
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground tracking-tight hidden xs:block sm:block">
                An Initiative by SEG Academy
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation Pill Bar with About Dropdown ── */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center rounded-full p-1.5 bg-card/90 dark:bg-muted/80 border border-border shadow-md backdrop-blur-2xl gap-1">
              
              {/* Home */}
              <div className="relative">
                {isHomeActive && (
                  <motion.div
                    layoutId="nav-page-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25 border-2 border-primary/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  href="/"
                  className={`relative z-10 px-4 py-2 text-xs xl:text-sm font-black transition-all flex items-center gap-1.5 rounded-full ${
                    isHomeActive 
                      ? 'text-primary' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  <Home className={`w-4 h-4 ${isHomeActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Home</span>
                </Link>
              </div>

              {/* About Us (with Hover Dropdown for Gallery) */}
              <div 
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                {(isAboutActive || isGalleryActive) && (
                  <motion.div
                    layoutId="nav-page-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25 border-2 border-primary/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className={`relative z-10 px-4 py-2 text-xs xl:text-sm font-black transition-all flex items-center gap-1.5 rounded-full ${
                    isAboutActive || isGalleryActive
                      ? 'text-primary' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${isAboutActive || isGalleryActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>About Us</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {aboutDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl bg-card/95 dark:bg-[#0E1322]/95 border-2 border-border shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1"
                    >
                      <Link
                        href="/about"
                        onClick={() => setAboutDropdownOpen(false)}
                        className={`p-3 rounded-xl flex items-start gap-3 transition-colors ${
                          isAboutActive ? 'bg-primary/15 text-primary' : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black">About Shorai</div>
                          <div className="text-[10px] text-muted-foreground">Mission, leadership &amp; SEG Academy</div>
                        </div>
                      </Link>

                      <Link
                        href="/gallery"
                        onClick={() => setAboutDropdownOpen(false)}
                        className={`p-3 rounded-xl flex items-start gap-3 transition-colors ${
                          isGalleryActive ? 'bg-primary/15 text-primary' : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black flex items-center gap-1.5">
                            <span>Campus Gallery</span>
                            <span className="text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-1.5 py-0.5 rounded-full">VAULT</span>
                          </div>
                          <div className="text-[10px] text-muted-foreground">Photos, student rovers &amp; school launches</div>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Why Shorai */}
              <div className="relative">
                {isWhyActive && (
                  <motion.div
                    layoutId="nav-page-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25 border-2 border-primary/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  href="/why-shorai"
                  className={`relative z-10 px-4 py-2 text-xs xl:text-sm font-black transition-all flex items-center gap-1.5 rounded-full ${
                    isWhyActive 
                      ? 'text-primary' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${isWhyActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Why Shorai</span>
                </Link>
              </div>

              {/* Shorai for Schools */}
              <div className="relative">
                {isSchoolsActive && (
                  <motion.div
                    layoutId="nav-page-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25 border-2 border-primary/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  href="/schools"
                  className={`relative z-10 px-4 py-2 text-xs xl:text-sm font-black transition-all flex items-center gap-1.5 rounded-full ${
                    isSchoolsActive 
                      ? 'text-primary' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  <School className={`w-4 h-4 ${isSchoolsActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Shorai for Schools</span>
                </Link>
              </div>

              {/* Blog & Insights */}
              <div className="relative">
                {isBlogActive && (
                  <motion.div
                    layoutId="nav-page-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25 border-2 border-primary/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  href="/blog"
                  className={`relative z-10 px-4 py-2 text-xs xl:text-sm font-black transition-all flex items-center gap-1.5 rounded-full ${
                    isBlogActive 
                      ? 'text-primary' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 ${isBlogActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Blog &amp; Insights</span>
                </Link>
              </div>

              {/* Contact */}
              <div className="relative">
                {isContactActive && (
                  <motion.div
                    layoutId="nav-page-active-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25 border-2 border-primary/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  href="/contact"
                  className={`relative z-10 px-4 py-2 text-xs xl:text-sm font-black transition-all flex items-center gap-1.5 rounded-full ${
                    isContactActive 
                      ? 'text-primary' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  <Phone className={`w-4 h-4 ${isContactActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Contact</span>
                </Link>
              </div>

            </div>
          </nav>

          {/* ── Right Action Area (Theme Switcher + Contact Us Button) ── */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-card/90 hover:bg-card border border-border flex items-center justify-center text-foreground transition-all shadow-sm group backdrop-blur-md hover:scale-105"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Broader "Contact Us" CTA */}
            <div className="hidden sm:block">
              <MagneticWrapper>
                <Link
                  href="/contact"
                  className="group relative min-h-[44px] h-11 px-6 rounded-full font-black text-sm text-white overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.6)] flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                    Book Consultation
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-colors duration-300" />
                </Link>
              </MagneticWrapper>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-50 text-foreground min-w-[44px] min-h-[44px] p-2.5 rounded-2xl bg-card/90 border border-border backdrop-blur-md shadow-sm flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="fixed top-[65px] left-0 w-full max-h-[calc(100dvh-65px)] overflow-y-auto bg-card/98 backdrop-blur-3xl border-b border-border shadow-2xl lg:hidden z-40 touch-scroll"
            >
              <div className="p-5 sm:p-6 flex flex-col gap-2 pb-10">
                <div className="text-[11px] font-mono font-black text-muted-foreground uppercase tracking-widest px-2 mb-1">
                  Navigation
                </div>

                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-base font-black min-h-[48px] py-3 px-4 rounded-2xl transition-colors ${
                    isHomeActive ? 'bg-primary/15 text-primary border border-primary/30' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Home className={`w-5 h-5 ${isHomeActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Home</span>
                </Link>

                {/* About Accordion with Gallery */}
                <div className="rounded-2xl border border-border/70 overflow-hidden bg-muted/20">
                  <button
                    onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                    className="w-full flex items-center justify-between py-3 px-4 text-base font-black text-foreground hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                      <span>About Us &amp; Gallery</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileAboutExpanded && (
                    <div className="px-3 pb-3 space-y-1.5 pt-1 border-t border-border/40">
                      <Link
                        href="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-bold ${
                          isAboutActive ? 'bg-primary/15 text-primary font-black' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>About Shorai &amp; SEG Academy</span>
                      </Link>
                      <Link
                        href="/gallery"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-bold ${
                          isGalleryActive ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-black' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4" />
                        <span>Campus Stories &amp; Gallery Vault</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Why Shorai */}
                <Link
                  href="/why-shorai"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-base font-black min-h-[48px] py-3 px-4 rounded-2xl transition-colors ${
                    isWhyActive ? 'bg-primary/15 text-primary border border-primary/30' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Sparkles className={`w-5 h-5 ${isWhyActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Why Shorai</span>
                </Link>

                {/* Shorai for Schools */}
                <Link
                  href="/schools"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-base font-black min-h-[48px] py-3 px-4 rounded-2xl transition-colors ${
                    isSchoolsActive ? 'bg-primary/15 text-primary border border-primary/30' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <School className={`w-5 h-5 ${isSchoolsActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Shorai for Schools</span>
                </Link>

                {/* Blog & Insights */}
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-base font-black min-h-[48px] py-3 px-4 rounded-2xl transition-colors ${
                    isBlogActive ? 'bg-primary/15 text-primary border border-primary/30' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <BookOpen className={`w-5 h-5 ${isBlogActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Blog &amp; Insights</span>
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-base font-black min-h-[48px] py-3 px-4 rounded-2xl transition-colors ${
                    isContactActive ? 'bg-primary/15 text-primary border border-primary/30' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Phone className={`w-5 h-5 ${isContactActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>Contact</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl mt-4 w-full min-h-[48px] h-12 text-sm font-black text-white flex items-center justify-center gap-2 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                  }}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Interactive Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
