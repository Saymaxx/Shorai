import { Router, Request, Response } from 'express';
import { ContentStore } from '../db/contentStore.js';
import { ENV } from '../config/env.js';

const router = Router();

// Fallback baseline content
let cachedDefaultContent: any = null;

/**
 * GET /api/content - Fetch current live website content
 */
router.get('/', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
  const content = ContentStore.getContent(cachedDefaultContent || {});
  res.json({
    success: true,
    content,
    timestamp: new Date().toISOString(),
  });
});

/**
 * PUT /api/content - Update website content (Admin Protected)
 */
router.put('/', (req: Request, res: Response): void => {
  const authHeader = req.headers['authorization'] || req.query['secret'];
  if (authHeader !== `Bearer ${ENV.ADMIN_SECRET}` && authHeader !== ENV.ADMIN_SECRET) {
    res.status(401).json({ success: false, message: 'Unauthorized. Admin secret required.' });
    return;
  }

  const { content } = req.body;
  if (!content || typeof content !== 'object') {
    res.status(400).json({ success: false, message: 'Valid content object is required.' });
    return;
  }

  const saved = ContentStore.saveContent(content);
  if (saved) {
    res.json({ success: true, message: 'Site content updated live across all pages.', content });
  } else {
    res.status(500).json({ success: false, message: 'Failed to write content to storage.' });
  }
});

/**
 * POST /api/content/reset - Reset content to factory defaults
 */
router.post('/reset', (req: Request, res: Response): void => {
  const authHeader = req.headers['authorization'] || req.query['secret'];
  if (authHeader !== `Bearer ${ENV.ADMIN_SECRET}` && authHeader !== ENV.ADMIN_SECRET) {
    res.status(401).json({ success: false, message: 'Unauthorized. Admin secret required.' });
    return;
  }

  const { defaultContent } = req.body;
  if (!defaultContent) {
    res.status(400).json({ success: false, message: 'Default content payload required.' });
    return;
  }

  ContentStore.resetContent(defaultContent);
  res.json({ success: true, message: 'Content reset to factory defaults.', content: defaultContent });
});

export default router;
