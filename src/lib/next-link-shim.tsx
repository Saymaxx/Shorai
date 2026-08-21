'use client';

import React from 'react';
import { useRouter } from '@/context/RouterContext';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, onClick, ...props }, ref) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    
    // Internal route navigation
    if (!e.defaultPrevented && (href.startsWith('/') || href === '')) {
      // If it's a hash anchor on the same page
      if (href.startsWith('/#') || href.startsWith('#')) {
        return; // Allow standard hash jump
      }
      e.preventDefault();
      router.navigate(href);
    }
  };

  return (
    <a href={href} ref={ref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;
