'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  pathname: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  navigate: () => {},
});

export function normalizePath(path: string): string {
  if (!path || path === '' || path === '/') return '/';
  if (path.startsWith('/about')) return '/about';
  if (path.startsWith('/why-shorai') || path.startsWith('/why')) return '/why-shorai';
  if (path.startsWith('/schools') || path.startsWith('/for-schools') || path.startsWith('/transformation')) return '/schools';
  if (path.startsWith('/contact')) return '/contact';
  if (path.startsWith('/labs')) return '/labs';
  return '/';
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    const normalized = normalizePath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', normalized);
      setPathname(normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
