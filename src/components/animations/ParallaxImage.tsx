'use client';

import { useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps extends Omit<ImageProps, 'className'> {
  containerClassName?: string;
  imageClassName?: string;
}

export default function ParallaxImage({ containerClassName, imageClassName, ...imageProps }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className={`relative overflow-hidden ${containerClassName || ''}`}
    >
      <motion.div style={{ y, scale }} className="w-full h-full absolute inset-0">
        <Image
          {...imageProps}
          className={`object-cover w-full h-full ${imageClassName || ''}`}
        />
      </motion.div>
    </motion.div>
  );
}
