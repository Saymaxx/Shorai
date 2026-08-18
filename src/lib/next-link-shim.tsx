import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, ...props }, ref) => {
  return (
    <a href={href} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;
