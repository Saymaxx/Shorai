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
  FlaskConical, 
  Home, 
  Building2, 
  Rocket 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from '@/context/RouterContext';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const navPages = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shorai Labs', href: '/labs', icon: FlaskConical },
  { name: 'About Us', href: '/about', icon: Building2 },
  { name: 'Transformation', href: '/transformation', icon: Rocket },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
            ? 'py-2.5 bg-background/85 backdrop-blur-2xl border-b border-border shadow-md' 
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo with SEG Academy Endorsement */}
          <Link href="/" className="relative z-50 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7928CA] via-[#6366F1] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="text-white font-black text-xl tracking-tighter">S</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-foreground">
                  SHORAI<span className="text-primary">.</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                  STEM LABS
                </span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground tracking-tight hidden sm:block">
                An Initiative by SEG Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Pages Only) */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center rounded-full p-1 bg-muted/60 border border-border backdrop-blur-md gap-1">
              {navPages.map((page) => {
                const active = isPageActive(page.href);
                const Icon = page.icon;
                
                return (
                  <div key={page.name} className="relative">
                    {active && (
                      <motion.div
                        layoutId="nav-page-active-pill"
                        className="absolute inset-0 rounded-full bg-card shadow-sm border border-border"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Link
                      href={page.href}
                      className={`relative z-10 px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 rounded-full ${
                        active 
                          ? 'text-primary' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span>{page.name}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Right Action Area (Theme Switcher + Contact Us Button) */}
          <div className="flex items-center gap-3">
            
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-9 h-9 rounded-xl bg-muted/80 hover:bg-muted border border-border flex items-center justify-center text-foreground/80 hover:text-foreground transition-all shadow-sm group"
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
                    <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* "To Know More About Us Contact Us" CTA */}
            <div className="hidden sm:block">
              <MagneticWrapper>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="group relative h-9 px-4 sm:px-5 rounded-full font-bold text-xs text-white overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_25px_rgba(99,102,241,0.5)] flex items-center gap-1.5"
                  style={{
                    background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    To know more about us contact us
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-colors duration-300" />
                </button>
              </MagneticWrapper>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-50 text-foreground p-2 rounded-xl bg-muted border border-border"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest px-2">
                  Pages
                </div>
                {navPages.map((page) => {
                  const active = isPageActive(page.href);
                  const Icon = page.icon;

                  return (
                    <Link
                      key={page.name}
                      href={page.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 text-base font-bold py-3 px-4 rounded-xl transition-colors ${
                        active 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span>{page.name}</span>
                    </Link>
                  );
                })}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsContactModalOpen(true);
                  }}
                  className="rounded-xl mt-4 w-full h-12 text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #7928CA 0%, #6366F1 50%, #00D4FF 100%)',
                  }}
                >
                  <span>To know more about us contact us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
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
