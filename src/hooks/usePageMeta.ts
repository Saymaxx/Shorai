import { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';

interface PageMetaOptions {
  title?: string;
  description?: string;
  url?: string;
}

export function usePageMeta({ title, description, url }: PageMetaOptions = {}) {
  useEffect(() => {
    // Update Title
    if (title) {
      document.title = title;
    }

    // Update or create Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) {
      ogTitle.setAttribute('content', title);
    }

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) {
      ogDesc.setAttribute('content', description);
    }
  }, [title, description, url]);
}
