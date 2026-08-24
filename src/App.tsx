'use client';

import React, { lazy, Suspense } from 'react';
import { useRouter } from '@/context/RouterContext';
import RootLayout from '@/components/layout/RootLayout';
import PageLoadingFallback from '@/components/shared/PageLoadingFallback';

// Route-based Code Splitting with React.lazy
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutUsPage = lazy(() => import('@/pages/AboutUsPage'));
const WhyShoraiPage = lazy(() => import('@/pages/WhyShoraiPage'));
const SchoolTransformationPage = lazy(() => import('@/pages/SchoolTransformationPage'));
const ShoraiLabsPage = lazy(() => import('@/pages/ShoraiLabsPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

export default function App() {
  const { pathname } = useRouter();

  const renderCurrentPage = () => {
    if (pathname === '/contact') {
      return <ContactPage />;
    }

    if (pathname === '/about') {
      return <AboutUsPage />;
    }

    if (pathname === '/why-shorai') {
      return <WhyShoraiPage />;
    }

    if (pathname === '/schools' || pathname === '/transformation') {
      return <SchoolTransformationPage />;
    }

    if (pathname === '/labs') {
      return <ShoraiLabsPage />;
    }

    return <HomePage />;
  };

  return (
    <RootLayout>
      <Suspense fallback={<PageLoadingFallback />}>
        {renderCurrentPage()}
      </Suspense>
    </RootLayout>
  );
}
