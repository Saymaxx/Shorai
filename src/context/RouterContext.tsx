'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  pathname: string;
  navigate: (path: string) => void;
  prefetch: (path: string) => void;
}

const ROUTE_LOADERS: Record<string, () => Promise<any>> = {
  '/': () => import('@/pages/HomePage'),
  '/about': () => import('@/pages/AboutUsPage'),
  '/why-shorai': () => import('@/pages/WhyShoraiPage'),
  '/schools': () => import('@/pages/SchoolTransformationPage'),
  '/labs': () => import('@/pages/ShoraiLabsPage'),
  '/contact': () => import('@/pages/ContactPage'),
  '/admin': () => import('@/pages/AdminPage'),
};

const prefetchedRoutes = new Set<string>();

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  navigate: () => {},
  prefetch: () => {},
});

export function normalizePath(path: string): string {
  if (!path || path === '' || path === '/') return '/';
  if (path.startsWith('/about')) return '/about';
  if (path.startsWith('/why-shorai') || path.startsWith('/why')) return '/why-shorai';
  if (path.startsWith('/schools') || path.startsWith('/for-schools') || path.startsWith('/transformation')) return '/schools';
  if (path.startsWith('/contact')) return '/contact';
  if (path.startsWith('/labs')) return '/labs';
  if (path.startsWith('/admin')) return '/admin';
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

  const prefetch = (path: string) => {
    const normalized = normalizePath(path);
    if (prefetchedRoutes.has(normalized)) return;
    
    const loader = ROUTE_LOADERS[normalized];
    if (loader) {
      prefetchedRoutes.add(normalized);
      // Low priority background prefetch
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => loader().catch(() => {}));
      } else {
        setTimeout(() => loader().catch(() => {}), 1);
      }
    }
  };

  const navigate = (path: string) => {
    const normalized = normalizePath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', normalized);
      setPathname(normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate, prefetch }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
