import React, { forwardRef } from 'react';

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  src: string | { src: string };
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  unoptimized?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const RESPONSIVE_WIDTHS = [480, 768, 1200];

function generateSrcSet(basePath: string, targetExt: 'avif' | 'webp'): string {
  const cleanPath = basePath.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  const sources: string[] = [];
  for (const w of RESPONSIVE_WIDTHS) {
    sources.push(`${cleanPath}-${w}w.${targetExt} ${w}w`);
  }
  sources.push(`${cleanPath}.${targetExt} 1600w`);
  return sources.join(', ');
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality: _quality,
  unoptimized = false,
  className = '',
  style,
  onLoad,
  ...restProps
}, ref) => {
  const rawSrc = typeof src === 'string' ? src : src?.src || '';

  const isLocalJpegPng =
    !unoptimized && rawSrc.startsWith('/') && /\.(jpg|jpeg|png)$/i.test(rawSrc);

  // For fill mode: parent div MUST have position:relative.
  // We render a plain <img> that fills its nearest positioned ancestor.
  if (fill) {
    const fillStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      ...style,
    };

    const primarySrc = isLocalJpegPng
      ? rawSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      : rawSrc;

    const webpSrcSet = isLocalJpegPng ? generateSrcSet(rawSrc, 'webp') : undefined;

    return (
      <img
        ref={ref}
        src={primarySrc}
        srcSet={webpSrcSet}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        style={fillStyle}
        onLoad={onLoad}
        onError={(e) => {
          // Native zero-re-render fallback to original JPEG/PNG
          const target = e.currentTarget;
          if (target.srcset) target.srcset = '';
          if (target.src !== rawSrc) target.src = rawSrc;
        }}
        {...restProps}
      />
    );
  }

  // Non-fill mode with explicit dimensions
  const isOptimizable = !unoptimized && rawSrc.startsWith('/') && /\.(jpg|jpeg|png)$/i.test(rawSrc);

  if (!isOptimizable) {
    return (
      <img
        ref={ref}
        src={rawSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        style={style}
        onLoad={onLoad}
        {...restProps}
      />
    );
  }

  const avifSrcSet = generateSrcSet(rawSrc, 'avif');
  const webpSrcSet = generateSrcSet(rawSrc, 'webp');

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        ref={ref}
        src={rawSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        style={style}
        onLoad={onLoad}
        {...restProps}
      />
    </picture>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
export default OptimizedImage;
