import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ENV } from '../config/env.js';

const router = Router();
const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getGalleryData(): any {
  ensureFile();
  if (fs.existsSync(GALLERY_FILE)) {
    try {
      const raw = fs.readFileSync(GALLERY_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

function saveGalleryData(data: any): boolean {
  ensureFile();
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

/**
 * GET /api/gallery - Fetch all gallery items, albums, and milestones
 */
router.get('/', (req: Request, res: Response) => {
  const data = getGalleryData();
  res.json(data || {});
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
