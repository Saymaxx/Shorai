import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ENV } from '../config/env.js';

const router = Router();
const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

let memoryGalleryData: any = null;

function safeEnsureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // Read-only filesystem in serverless environments
  }
}

function getGalleryData(): any {
  if (memoryGalleryData) {
    return memoryGalleryData;
  }

  try {
    safeEnsureDir();
    if (fs.existsSync(GALLERY_FILE)) {
      const raw = fs.readFileSync(GALLERY_FILE, 'utf-8');
      memoryGalleryData = JSON.parse(raw);
      return memoryGalleryData;
    }
  } catch {
    // Read-only fs fallback
  }
  return null;
}

function saveGalleryData(data: any): boolean {
  memoryGalleryData = data;
  try {
    safeEnsureDir();
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return true; // Memory cache updated
  }
}

/**
 * GET /api/gallery - Fetch gallery items with optional pagination & filtering
 * Query params: ?page=1&limit=12&category=robotics
 */
router.get('/', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
  const data = getGalleryData() || {};

  const page = parseInt(req.query.page as string, 10);
  const limit = parseInt(req.query.limit as string, 10);
  const category = req.query.category as string | undefined;

  // If pagination is requested
  if (!isNaN(page) && !isNaN(limit) && Array.isArray(data.albums)) {
    let filteredAlbums = data.albums;
    if (category && category !== 'all') {
      filteredAlbums = filteredAlbums.filter((a: any) => a.category === category);
    }

    const total = filteredAlbums.length;
    const startIndex = (page - 1) * limit;
    const paginatedAlbums = filteredAlbums.slice(startIndex, startIndex + limit);

    res.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      albums: paginatedAlbums,
      categories: data.categories || [],
      milestones: data.milestones || [],
    });
    return;
  }

  res.json(data);
});

/**
 * PUT /api/gallery - Update full gallery data (Admin)
 */
router.put('/', (req: Request, res: Response): void => {
  const authHeader = req.headers['authorization'] || req.query['secret'];
  if (authHeader !== `Bearer ${ENV.ADMIN_SECRET}` && authHeader !== ENV.ADMIN_SECRET) {
    res.status(401).json({ success: false, message: 'Unauthorized. Admin secret required.' });
    return;
  }

  const data = req.body;
  if (saveGalleryData(data)) {
    res.json({ success: true, message: 'Gallery data updated successfully.' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to write gallery data.' });
  }
});

export default router;
