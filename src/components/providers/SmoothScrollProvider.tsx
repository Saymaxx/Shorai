import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.12, 
        duration: 0.9, 
        smoothWheel: true, 
        wheelMultiplier: 1.0, 
        touchMultiplier: 1.2, 
        autoResize: true 
      }}
    >
      {children}
    </ReactLenis>
  );
}
