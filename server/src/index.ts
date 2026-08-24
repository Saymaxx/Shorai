import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';

// Import Routes
import healthRouter from './routes/health.js';
import leadsRouter from './routes/leads.js';
import chatRouter from './routes/chat.js';

const app: Express = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes Mounting
app.use('/api/health', healthRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/chat', chatRouter);

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

// Start Server
const server = app.listen(ENV.PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 SHORAI BACKEND API SERVER RUNNING`);
  console.log(`📡 URL: http://localhost:${ENV.PORT}`);
  console.log(`⚡ Environment: ${ENV.NODE_ENV}`);
  console.log(`=================================================\n`);
});

export default app;
