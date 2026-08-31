import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Google Sheets Webhook fallback
  GOOGLE_SCRIPT_URL: process.env.GOOGLE_SCRIPT_URL || 
    'https://script.google.com/macros/s/AKfycbxA-MijWckNTGLdZIcn768XLjn75ktRMcHYEqB2rTwHRQRiTwZNwvnkjWy8zGvGFTMwAA/exec',

  // Email Notification Config (SMTP / Nodemailer)
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'contact@shorai.in',

  // Gemini / AI API Key
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '',

  // Admin API Secret for accessing leads dashboard (configured via server environment variable)
  ADMIN_SECRET: process.env.ADMIN_SECRET || process.env.VITE_ADMIN_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'dev_admin_local_secret'),

  // Supabase Configuration
  SUPABASE_URL: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://lyxwbkbehnlqychblifz.supabase.co',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_MnAyQM4EC1gTdNS1Oe2SdQ_D-d0E3Zp',
};
