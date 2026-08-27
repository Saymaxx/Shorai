"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiChatService_js_1 = require("../services/aiChatService.js");
const router = (0, express_1.Router)();
/**
 * POST /api/chat - AI Chatbot Advisor consultation
 */
router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;
        if (!message || typeof message !== 'string') {
            res.status(400).json({ success: false, message: 'Message text is required.' });
            return;
        }
        const result = await aiChatService_js_1.AIChatService.generateResponse(message, history || []);
        res.json({
            success: true,
            reply: result.reply,
            leadSaved: result.leadSaved,
            leadDetails: result.leadDetails,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error('[Route /api/chat] Chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate response.',
            reply: 'I am here to help you learn about Shorai AI & Robotics labs! Please leave your contact details or call +91 7880630963.',
        });
    }
});
exports.default = router;
