import React, { forwardRef } from 'react';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  src: string | { src: string };
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  quality?: number;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(({
  src,
  alt,
  width,
  height,
  fill,
  quality,
  priority,
  placeholder,
  blurDataURL,
  unoptimized,
  className,
  style,
  ...props
}, ref) => {
  const imgSrc = typeof src === 'string' ? src : src?.src;
  
  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(fill ? { position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' } : {}),
  };

  return (
    <img
      ref={ref}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={mergedStyle}
      {...props}
    />
  );
});

Image.displayName = 'Image';
export default Image;
