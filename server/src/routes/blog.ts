import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ENV } from '../config/env.js';

const router = Router();
const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const BLOG_FILE = path.join(DATA_DIR, 'blog.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getBlogData(): any {
  ensureFile();
  if (fs.existsSync(BLOG_FILE)) {
    try {
      const raw = fs.readFileSync(BLOG_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

function saveBlogData(data: any): boolean {
  ensureFile();
  try {
    fs.writeFileSync(BLOG_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

/**
 * GET /api/blog - Fetch all articles, authors, and categories
 */
router.get('/', (req: Request, res: Response) => {
  const data = getBlogData();
  res.json(data || {});
});

/**
 * GET /api/blog/:slug - Fetch a single article by slug
 */
router.get('/:slug', (req: Request, res: Response): void => {
  const data = getBlogData();
  if (data && data.articles) {
    const article = data.articles.find((a: any) => a.slug === req.params.slug);
    if (article) {
      res.json({ success: true, article });
      return;
    }
  }
  res.status(404).json({ success: false, message: 'Article not found' });
});

/**
 * PUT /api/blog - Update full blog data (Admin)
 */
router.put('/', (req: Request, res: Response): void => {
  const authHeader = req.headers['authorization'] || req.query['secret'];
  if (authHeader !== `Bearer ${ENV.ADMIN_SECRET}` && authHeader !== ENV.ADMIN_SECRET) {
    res.status(401).json({ success: false, message: 'Unauthorized. Admin secret required.' });
    return;
  }

  const data = req.body;
  if (saveBlogData(data)) {
    res.json({ success: true, message: 'Blog data updated successfully.' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to write blog data.' });
  }
});

export default router;
