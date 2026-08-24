'use client';

import React from 'react';

export default function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 py-24">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-black text-primary">
          S
        </div>
      </div>
      <div className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest animate-pulse">
        Loading Shorai Experience...
      </div>
    </div>
  );
}
