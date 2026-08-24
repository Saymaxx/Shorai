import { Router, Request, Response } from 'express';
import { LeadService } from '../services/leadService.js';
import { ENV } from '../config/env.js';

const router = Router();

/**
 * POST /api/leads - Create new lead inquiry
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const meta = {
      ip: req.ip || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    };

    const result = await LeadService.processLead(req.body, meta);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.errors,
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'School enquiry received successfully. Our academic director will reach out within 24 hours.',
      leadId: result.lead?.id,
    });
  } catch (error) {
    console.error('[Route /api/leads] Error processing lead:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing your inquiry.',
    });
  }
});

/**
 * GET /api/leads - List all leads (Protected by Admin secret / Authorization header)
 */
router.get('/', (req: Request, res: Response): void => {
  const authHeader = req.headers['authorization'] || req.query['secret'];
  
  if (authHeader !== `Bearer ${ENV.ADMIN_SECRET}` && authHeader !== ENV.ADMIN_SECRET) {
    res.status(401).json({ success: false, message: 'Unauthorized. Admin secret required.' });
    return;
  }

  const leads = LeadService.getLeads();
  const stats = LeadService.getStats();

  res.json({
    success: true,
    stats,
    count: leads.length,
    leads,
  });
});

/**
 * GET /api/leads/stats - Public summary stats
 */
router.get('/stats', (req: Request, res: Response): void => {
  const stats = LeadService.getStats();
  res.json({ success: true, stats });
});

export default router;
