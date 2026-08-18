'use client';

import { useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps extends Omit<ImageProps, 'className'> {
  containerClassName?: string;
  imageClassName?: string;
}

export default function ParallaxImage({ containerClassName, imageClassName, ...imageProps }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Mask
      gsap.fromTo(containerRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );

      // Parallax effect on image
      gsap.fromTo(imageRef.current,
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName || ''}`}>
      <Image
        ref={imageRef}
        {...imageProps}
        className={`object-cover w-full h-full absolute inset-0 ${imageClassName || ''}`}
      />
    </div>
  );
}
