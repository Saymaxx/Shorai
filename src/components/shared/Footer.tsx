'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = [
  { name: 'Programs', href: '#programs' },
  { name: 'For Schools', href: '#schools' },
  { name: 'Technology', href: '#technology' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20">
          
          <div className="max-w-sm">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)] group-hover:shadow-[0_0_25px_rgba(255,107,0,0.6)] transition-all">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              SHORAI<span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed">
              AI & Robotics Education for Future-Ready Schools
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              {footerLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <Button className="rounded-full h-10 px-6 font-semibold bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 transition-all group">
              Partner With SHORAI
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 SHORAI. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
