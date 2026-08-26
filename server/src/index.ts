import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';

// Import Routes & Middleware
import healthRouter from './routes/health.js';
import leadsRouter from './routes/leads.js';
import chatRouter from './routes/chat.js';
import contentRouter from './routes/content.js';
import galleryRouter from './routes/gallery.js';
import blogRouter from './routes/blog.js';
import { rateLimit } from './middleware/rateLimiter.js';

const app: Express = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Security Headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes Mounting with Rate Limiting
app.use('/api/health', healthRouter);
app.use('/api/content', contentRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/blog', blogRouter);
app.use('/api/leads', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many lead submissions from this IP. Please try again later.' }), leadsRouter);
app.use('/api/chat', rateLimit({ windowMs: 1 * 60 * 1000, max: 30, message: 'Chat rate limit reached. Please wait a moment.' }), chatRouter);

// Root Health Fallback
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Shorai API Server',
    endpoints: {
      health: '/api/health',
      leads: '/api/leads',
      chat: '/api/chat',
    },
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Server Error]', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Start Server (only when running as standalone Node process, not in Vercel serverless)
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  app.listen(ENV.PORT, () => {
    console.log(`\n=================================================`);
    console.log(`🚀 SHORAI BACKEND API SERVER RUNNING`);
    console.log(`📡 URL: http://localhost:${ENV.PORT}`);
    console.log(`⚡ Environment: ${ENV.NODE_ENV}`);
    console.log(`=================================================\n`);
  });
}

export default app;
