import React, { forwardRef } from 'react';
import OptimizedImage, { OptimizedImageProps } from '@/components/common/OptimizedImage';

export interface ImageProps extends OptimizedImageProps {
  placeholder?: string;
  blurDataURL?: string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  return <OptimizedImage ref={ref} {...props} />;
});

Image.displayName = 'Image';
export default Image;
