'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles, Phone, ArrowRight, MessageSquare } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ContactModal from '@/components/shared/ContactModal';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

const navLinks = [
  { name: 'About Us', href: '#about-seg' },
  { name: 'Why Shorai', href: '#why-shorai' },
  { name: '360° Ecosystem', href: '#ecosystem' },
  { name: 'Future Skills', href: '#skills' },
  { name: '3D Labs', href: '#technology' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 180) {
          current = section.getAttribute('id') || '';
        }
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 100) setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center rounded-full px-1.5 py-1 bg-muted/60 border border-border backdrop-blur-md">
              {navLinks.map((link) => {
                const linkId = link.href.replace('#', '');
                const isActive = activeSection === linkId;
                
                return (
                  <div key={link.name} className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-card shadow-sm border border-border"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Link
                      href={link.href}
                      className={`relative z-10 px-4 py-2 text-xs font-semibold transition-colors block rounded-full ${
                        isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.name}
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

            {/* Mobile Toggle */}
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
                  Navigation
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
                      activeSection === link.href.replace('#', '') 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

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
