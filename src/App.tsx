'use client';

import React, { lazy, Suspense } from 'react';
import { useRouter } from '@/context/RouterContext';
import RootLayout from '@/components/layout/RootLayout';
import PageLoadingFallback from '@/components/shared/PageLoadingFallback';
import ErrorBoundary from '@/components/shared/ErrorBoundary';

// Route-based Code Splitting with React.lazy
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutUsPage = lazy(() => import('@/pages/AboutUsPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const CampusStoryPage = lazy(() => import('@/pages/CampusStoryPage'));
const WhyShoraiPage = lazy(() => import('@/pages/WhyShoraiPage'));
const SchoolTransformationPage = lazy(() => import('@/pages/SchoolTransformationPage'));
const ShoraiLabsPage = lazy(() => import('@/pages/ShoraiLabsPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const ArticleReaderPage = lazy(() => import('@/pages/ArticleReaderPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));

export default function App() {
  const { pathname } = useRouter();

  const renderCurrentPage = () => {
    if (pathname === '/admin') {
      return <AdminPage />;
    }

    if (pathname === '/contact') {
      return <ContactPage />;
    }

    if (pathname === '/about') {
      return <AboutUsPage />;
    }

    if (pathname === '/gallery') {
      return <GalleryPage />;
    }

    if (pathname.startsWith('/gallery/')) {
      const albumSlug = pathname.replace('/gallery/', '').replace('album/', '');
      return <CampusStoryPage slug={albumSlug} />;
    }

    if (pathname === '/blog' || pathname === '/insights') {
      return <BlogPage />;
    }

    if (pathname.startsWith('/blog/') || pathname.startsWith('/insights/')) {
      const articleSlug = pathname.replace('/blog/', '').replace('/insights/', '');
      return <ArticleReaderPage slug={articleSlug} />;
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
    <ErrorBoundary>
      <RootLayout>
        <Suspense fallback={<PageLoadingFallback />}>
          {renderCurrentPage()}
        </Suspense>
      </RootLayout>
    </ErrorBoundary>
  );
}
