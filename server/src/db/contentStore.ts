import fs from 'fs';
import path from 'path';

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
      console.log('[ContentStore] Site content updated successfully.');
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
      return true;
    } catch (err) {
      console.error('[ContentStore] Error resetting content:', err);
      return false;
    }
  }
}
