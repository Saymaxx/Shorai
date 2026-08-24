import { Router, Request, Response } from 'express';
import { AIChatService } from '../services/aiChatService.js';

const router = Router();

/**
 * POST /api/chat - AI Chatbot Advisor consultation
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ success: false, message: 'Message text is required.' });
      return;
    }

    const reply = await AIChatService.generateResponse(message, history || []);

    res.json({
      success: true,
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Route /api/chat] Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate response.',
      reply: 'I am here to help you learn about Shorai AI & Robotics labs! Please leave your contact details or call +91 7880630963.',
    });
  }
});

export default router;
