import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// ... (rest of imports and type definitions remain intact)
import { defaultSiteContent, SiteContent } from '@/config/defaultContent';

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent, secret?: string) => Promise<{ success: boolean; message?: string }>;
  resetToDefaults: (secret?: string) => Promise<{ success: boolean; message?: string }>;
  isLoading: boolean;
  isCustomized: boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultSiteContent,
  updateContent: async () => ({ success: false }),
  resetToDefaults: async () => ({ success: false }),
  isLoading: false,
  isCustomized: false,
});

function deepMerge(target: any, source: any): any {
  if (!source || typeof source !== 'object') return target;
  if (!target || typeof target !== 'object') return source;

  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      output[key] = source[key];
    }
  }
  return output;
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('shorai_site_content');
        if (cached) {
          const parsed = JSON.parse(cached);
          return deepMerge(defaultSiteContent, parsed);
        }
      } catch {
        // fallback
      }
    }
    return defaultSiteContent;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCustomized, setIsCustomized] = useState<boolean>(false);

  // Fetch live content from backend API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          if (data?.content && typeof data.content === 'object') {
            const merged = deepMerge(defaultSiteContent, data.content);
            setContent(merged);
            setIsCustomized(true);
            localStorage.setItem('shorai_site_content', JSON.stringify(merged));
          }
        }
      } catch {
        // Use local fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const updateContent = useCallback(async (newContent: SiteContent, secret?: string): Promise<{ success: boolean; message?: string }> => {
    // 1. Immediately update local state & localStorage for instant preview
    setContent(newContent);
    localStorage.setItem('shorai_site_content', JSON.stringify(newContent));
    setIsCustomized(true);

    // 2. Persist to backend server if secret provided
    const authSecret = secret || sessionStorage.getItem('shorai_admin_secret') || '';

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authSecret}`,
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (res.ok) {
        const json = await res.json();
        return { success: true, message: json.message || 'Content saved successfully.' };
      }
      return { success: true, message: 'Saved locally in browser.' };
    } catch {
      return { success: true, message: 'Saved locally in browser.' };
    }
  }, []);

  const resetToDefaults = useCallback(async (secret?: string): Promise<{ success: boolean; message?: string }> => {
    setContent(defaultSiteContent);
    localStorage.removeItem('shorai_site_content');
    setIsCustomized(false);

    const authSecret = secret || sessionStorage.getItem('shorai_admin_secret') || '';

    try {
      await fetch('/api/content/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authSecret}`,
        },
        body: JSON.stringify({ defaultContent: defaultSiteContent }),
      });
      return { success: true, message: 'Reset all site content to original defaults.' };
    } catch {
      return { success: true, message: 'Reset locally.' };
    }
  }, []);

  const contextValue = useMemo(() => ({
    content,
    updateContent,
    resetToDefaults,
    isLoading,
    isCustomized,
  }), [content, updateContent, resetToDefaults, isLoading, isCustomized]);

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
