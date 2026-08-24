import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipMap.entries()) {
    if (now > record.resetTime) {
      ipMap.delete(ip);
    }
  }
}, 60000);

export function rateLimit(options: { windowMs: number; max: number; message?: string }) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    const record = ipMap.get(ip);

    if (!record || now > record.resetTime) {
      ipMap.set(ip, {
        count: 1,
        resetTime: now + options.windowMs,
      });
      next();
      return;
    }

    if (record.count >= options.max) {
      res.status(429).json({
        success: false,
        message: options.message || 'Too many requests. Please slow down and try again later.',
      });
      return;
    }

    record.count += 1;
    next();
  };
}
