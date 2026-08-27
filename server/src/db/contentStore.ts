import fs from 'fs';
import path from 'path';
import { supabaseServer } from './supabase';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'siteContent.json');

export class ContentStore {
  private static ensureFile(defaultContent: any) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CONTENT_FILE)) {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf-8');
    }
  }

  public static getContent(defaultFallback: any): any {
    try {
      this.ensureFile(defaultFallback);
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('[ContentStore] Error reading content, using fallback:', err);
      return defaultFallback;
    }
  }

  public static saveContent(updatedContent: any): boolean {
    try {
      this.ensureFile(updatedContent);
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(updatedContent, null, 2), 'utf-8');
      console.log('[ContentStore] Site content updated locally.');

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
          } else {
            console.log('[Supabase Content Sync] Site content synchronized to Supabase.');
          }
        })
        .catch((err: any) => {
          console.warn('[Supabase Content Sync] Error:', err?.message || err);
        });

      return true;
    } catch (err) {
      console.error('[ContentStore] Error saving content:', err);
      return false;
    }
  }

  public static resetContent(defaultContent: any): boolean {
    try {
      this.ensureFile(defaultContent);
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2), 'utf-8');
      console.log('[ContentStore] Site content reset to factory defaults.');

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
    } catch (err) {
      console.error('[ContentStore] Error resetting content:', err);
      return false;
    }
  }
}
