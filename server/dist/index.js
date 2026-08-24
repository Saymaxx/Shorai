"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_js_1 = require("./config/env.js");
// Import Routes
const health_js_1 = __importDefault(require("./routes/health.js"));
const leads_js_1 = __importDefault(require("./routes/leads.js"));
const chat_js_1 = __importDefault(require("./routes/chat.js"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json({ limit: '5mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '5mb' }));
// Request Logger
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    });
    next();
});
// API Routes Mounting
app.use('/api/health', health_js_1.default);
app.use('/api/leads', leads_js_1.default);
app.use('/api/chat', chat_js_1.default);
// Root Health Fallback
app.get('/', (req, res) => {
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
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` });
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[Server Error]', err);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});
// Start Server
const server = app.listen(env_js_1.ENV.PORT, () => {
    console.log(`\n=================================================`);
    console.log(`🚀 SHORAI BACKEND API SERVER RUNNING`);
    console.log(`📡 URL: http://localhost:${env_js_1.ENV.PORT}`);
    console.log(`⚡ Environment: ${env_js_1.ENV.NODE_ENV}`);
    console.log(`=================================================\n`);
});
exports.default = app;
