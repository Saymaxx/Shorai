'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCw, AlertTriangle, Home, Phone } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-6 text-foreground font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl bg-card border-2 border-border shadow-2xl text-center relative overflow-hidden">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7928CA] via-[#6366F1] to-[#00D4FF]" />

            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black tracking-tight text-foreground mb-2">
              Something went unexpected
            </h2>
            
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
              We encountered a minor display glitch while rendering the 3D interactive engine. Reloading will reset the canvas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all"
              >
                <RotateCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex-1 py-3 px-4 rounded-xl bg-muted hover:bg-muted/80 border border-border text-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span>SHORAI STEM PLATFORM</span>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="text-primary hover:underline flex items-center gap-1 font-bold">
                <Phone className="w-3 h-3" />
                <span>Support</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
