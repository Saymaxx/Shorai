'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import MagneticWrapper from '@/components/shared/MagneticWrapper';

type NavLink = {
  name: string;
  href?: string;
  dropdown?: any[];
};

const navLinks: NavLink[] = [
  { name: 'AI Demo', href: '#ai' },
  { name: 'Drone Demo', href: '#drones' },
  { name: 'Coding Demo', href: '#coding' },
  { name: 'Programs', href: '#programs' },
  { name: 'For Schools', href: '#schools' },
  { name: 'Process', href: '#technology' },
  { name: 'About', href: '#about' },
];

const DropdownItem = ({ item, isActive }: { item: any, isActive: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative z-10" 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive || isOpen ? 'text-white' : 'text-muted-foreground hover:text-white'}`}
        aria-expanded={isOpen}
      >
        {item.name}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72" 
          >
            <div className="bg-[#0B1020]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full opacity-50" />
              <div className="relative z-10">
                {item.dropdown.map((subItem: any) => (
                  <Link 
                    key={subItem.name} 
                    href={subItem.href}
                    className="flex flex-col p-3 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{subItem.name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{subItem.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileDropdown = ({ item, setMobileMenuOpen }: { item: any, setMobileMenuOpen: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col py-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between text-lg font-medium text-white py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2"
        aria-expanded={isOpen}
      >
        {item.name}
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-3 pl-4 border-l border-white/10 ml-2 mb-2">
              {item.dropdown.map((sub: any) => (
                <Link
                  key={sub.name}
                  href={sub.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  <div className="text-base font-medium">{sub.name}</div>
                  <div className="text-xs mt-0.5 opacity-70">{sub.description}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id') || '';
        }
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 100) setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 text-2xl font-bold tracking-tighter text-white flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)] group-hover:shadow-[0_0_25px_rgba(255,107,0,0.6)] transition-all">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          SHORAI<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center relative">
          <div className={`flex items-center rounded-full p-1 border transition-all duration-500 ${scrolled ? 'bg-white/5 border-white/10 backdrop-blur-md' : 'bg-transparent border-transparent'}`}>
            {navLinks.map((link) => {
              const linkId = link.href ? link.href.replace('#', '') : link.name.toLowerCase();
              const isActive = activeSection === linkId;
              
              return (
                <div key={link.name} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.dropdown ? (
                    <DropdownItem item={link} isActive={isActive} />
                  ) : (
                    <Link
                      href={link.href || '#'}
                      className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors block rounded-full ${isActive ? 'text-white' : 'text-muted-foreground hover:text-white'}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <MagneticWrapper>
            <Button className="rounded-full h-10 px-6 font-medium bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all group">
              Partner With Us
              <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </MagneticWrapper>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 text-white p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-b border-white/10 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="p-6 max-h-[80vh] overflow-y-auto flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-white/10 last:border-0 pb-2 last:pb-0">
                  {link.dropdown ? (
                    <MobileDropdown item={link} setMobileMenuOpen={setMobileMenuOpen} />
                  ) : (
                    <Link
                      href={link.href || '#'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-lg font-medium py-3 ${activeSection === (link.href ? link.href.replace('#', '') : '') ? 'text-primary' : 'text-white'}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button className="rounded-full mt-6 w-full h-12 text-base font-semibold bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] group">
                Partner With Us <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
