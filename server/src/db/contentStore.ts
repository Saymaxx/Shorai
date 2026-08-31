import fs from 'fs';
import path from 'path';
import { supabaseServer } from './supabase.js';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'siteContent.json');

export class ContentStore {
  private static memoryCache: any = null;

  private static safeEnsureDir() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    } catch {
      // Read-only filesystem in serverless environments (Vercel)
    }
  }

  public static getContent(defaultFallback: any): any {
    if (this.memoryCache) {
      return this.memoryCache;
    }

    try {
      this.safeEnsureDir();
      if (fs.existsSync(CONTENT_FILE)) {
        const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
        this.memoryCache = JSON.parse(raw);
        return this.memoryCache;
      }
    } catch {
      // Fallback on read-only environments
    }

    this.memoryCache = defaultFallback;
    return defaultFallback;
  }

  public static saveContent(updatedContent: any): boolean {
    this.memoryCache = updatedContent;

    try {
      this.safeEnsureDir();
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(updatedContent, null, 2), 'utf-8');
    } catch {
      // Read-only filesystem on serverless lambda - in-memory and Supabase store active
    }

    // Async upsert to Supabase
    Promise.resolve(
      supabaseServer
        .from('site_content')
        .upsert({
          id: 'main',
          content: updatedContent,
          updated_at: new Date().toISOString(),
        })
    )
      .then((res: any) => {
        if (res?.error) {
          console.warn('[Supabase Content Sync] Upsert note:', res.error.message);
        }
      })
      .catch((err: any) => {
        console.warn('[Supabase Content Sync] Error:', err?.message || err);
      });

    return true;
  }

  public static resetContent(defaultContent: any): boolean {
    this.memoryCache = defaultContent;

    try {
      this.safeEnsureDir();
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf-8');
    } catch {
      // Read-only filesystem on serverless
    }

    Promise.resolve(
      supabaseServer
        .from('site_content')
        .upsert({
          id: 'main',
          content: defaultContent,
          updated_at: new Date().toISOString(),
        })
    )
      .then(() => {})
      .catch(() => {});

    return true;
  }
}
