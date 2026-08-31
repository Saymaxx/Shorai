import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ENV } from '../config/env.js';

const router = Router();
const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const BLOG_FILE = path.join(DATA_DIR, 'blog.json');

let memoryBlogData: any = null;

function safeEnsureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Read-only filesystem in serverless environments
  }
}

function getBlogData(): any {
  if (memoryBlogData) {
    return memoryBlogData;
  }

  try {
    safeEnsureDir();
    if (fs.existsSync(BLOG_FILE)) {
      const raw = fs.readFileSync(BLOG_FILE, 'utf-8');
      memoryBlogData = JSON.parse(raw);
      return memoryBlogData;
    }
  } catch {
    // Read-only fs fallback
  }
  return null;
}

function saveBlogData(data: any): boolean {
  memoryBlogData = data;
  try {
    safeEnsureDir();
    fs.writeFileSync(BLOG_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return true;
  }
}

/**
 * GET /api/blog - Fetch articles with optional pagination & filtering
 * Query params: ?page=1&limit=10&category=pedagogy&featured=true
 */
router.get('/', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
  const data = getBlogData() || {};

  const page = parseInt(req.query.page as string, 10);
  const limit = parseInt(req.query.limit as string, 10);
  const category = req.query.category as string | undefined;
  const isFeatured = req.query.featured === 'true';

  if (!isNaN(page) && !isNaN(limit) && Array.isArray(data.articles)) {
    let filteredArticles = data.articles;
    if (category && category !== 'all') {
      filteredArticles = filteredArticles.filter((a: any) => a.category === category);
    }
    if (isFeatured) {
      filteredArticles = filteredArticles.filter((a: any) => a.isFeatured);
    }

    const total = filteredArticles.length;
    const startIndex = (page - 1) * limit;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + limit);

    res.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      articles: paginatedArticles,
      categories: data.categories || [],
      authors: data.authors || [],
      pedagogyStages: data.pedagogyStages || [],
    });
    return;
  }

  res.json(data);
});

/**
 * GET /api/blog/:slug - Fetch a single article by slug
 */
router.get('/:slug', (req: Request, res: Response): void => {
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=900, stale-while-revalidate=1800');
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
