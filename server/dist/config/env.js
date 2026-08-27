"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env from project root
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env.local') });
exports.ENV = {
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
    // Admin API Secret for accessing leads dashboard
    ADMIN_SECRET: process.env.ADMIN_SECRET || 'shorai_admin_secret_2026',
    // Supabase Configuration
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://lyxwbkbehnlqychblifz.supabase.co',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_MnAyQM4EC1gTdNS1Oe2SdQ_D-d0E3Zp',
};
