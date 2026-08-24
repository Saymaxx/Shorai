"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leadService_js_1 = require("../services/leadService.js");
const env_js_1 = require("../config/env.js");
const router = (0, express_1.Router)();
/**
 * POST /api/leads - Create new lead inquiry
 */
router.post('/', async (req, res) => {
    try {
        const meta = {
            ip: req.ip || req.socket.remoteAddress,
            userAgent: req.headers['user-agent'],
        };
        const result = await leadService_js_1.LeadService.processLead(req.body, meta);
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
    }
    catch (error) {
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
router.get('/', (req, res) => {
    const authHeader = req.headers['authorization'] || req.query['secret'];
    if (authHeader !== `Bearer ${env_js_1.ENV.ADMIN_SECRET}` && authHeader !== env_js_1.ENV.ADMIN_SECRET) {
        res.status(401).json({ success: false, message: 'Unauthorized. Admin secret required.' });
        return;
    }
    const leads = leadService_js_1.LeadService.getLeads();
    const stats = leadService_js_1.LeadService.getStats();
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
router.get('/stats', (req, res) => {
    const stats = leadService_js_1.LeadService.getStats();
    res.json({ success: true, stats });
});
exports.default = router;
