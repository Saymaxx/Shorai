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
  Phone 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from '@/context/RouterContext';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';
import { siteConfig } from '@/config/siteConfig';

const navPages = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About Us', href: '/about', icon: Building2 },
  { name: 'Why Shorai', href: '/why-shorai', icon: Sparkles },
  { name: 'Shorai for Schools', href: '/schools', icon: School },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isPageActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname.startsWith(href);
  };

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
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/40 bg-white dark:bg-[#0B0F19] p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
              <img src="/images/shorai_logo.png" alt="SHORAI" className="w-full h-full object-contain rounded-full" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-foreground">
                  SHORAI<span className="text-primary">.</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/15 text-primary border border-primary/30">
                  STEM LABS
                </span>
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground tracking-tight hidden sm:block">
                An Initiative by SEG Academy
              </span>
            </div>
          </Link>

          {/* ── Desktop Broader Navigation Pill Bar ── */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center rounded-full p-1.5 bg-card/90 dark:bg-muted/80 border border-border shadow-md backdrop-blur-2xl gap-1.5">
              {navPages.map((page) => {
                const active = isPageActive(page.href);
                const Icon = page.icon;
                
                return (
                  <div key={page.name} className="relative">
                    {active && (
                      <motion.div
                        layoutId="nav-page-active-pill"
                        className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25 border-2 border-primary/40 shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Link
                      href={page.href}
                      className={`relative z-10 px-5 py-2.5 text-sm font-black transition-all flex items-center gap-2 rounded-full ${
                        active 
                          ? 'text-primary' 
                          : 'text-foreground/80 hover:text-foreground hover:bg-muted/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="whitespace-nowrap">{page.name}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* ── Right Action Area (Theme Switcher + Broader Contact Us Button) ── */}
          <div className="flex items-center gap-3.5">
            
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-11 h-11 rounded-2xl bg-card/90 hover:bg-card border border-border flex items-center justify-center text-foreground transition-all shadow-sm group backdrop-blur-md hover:scale-105"
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
                    exit={{ scale: 0, rotate: -90 }}
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
                  className="group relative h-11 px-6 rounded-full font-black text-sm text-white overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_30px_rgba(99,102,241,0.6)] flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                    Contact Us
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-colors duration-300" />
                </Link>
              </MagneticWrapper>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-50 text-foreground p-2.5 rounded-2xl bg-card/90 border border-border backdrop-blur-md shadow-sm"
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
              className="absolute top-full left-0 w-full bg-card/95 backdrop-blur-3xl border-b border-border shadow-2xl lg:hidden overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-3">
                <div className="text-xs font-mono font-black text-muted-foreground uppercase tracking-widest px-2">
                  Navigation Pages
                </div>
                {navPages.map((page) => {
                  const active = isPageActive(page.href);
                  const Icon = page.icon;

                  return (
                    <Link
                      key={page.name}
                      href={page.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 text-base font-black py-3.5 px-4 rounded-2xl transition-colors ${
                        active 
                          ? 'bg-primary/15 text-primary border border-primary/30' 
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span>{page.name}</span>
                    </Link>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl mt-4 w-full h-13 text-sm font-black text-white flex items-center justify-center gap-2 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                  }}
                >
                  <span>Contact Us</span>
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
