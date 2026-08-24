"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadService = exports.LeadInputSchema = void 0;
const zod_1 = require("zod");
const database_js_1 = require("../db/database.js");
const emailService_js_1 = require("./emailService.js");
const env_js_1 = require("../config/env.js");
exports.LeadInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    contact: zod_1.z.string().min(7, 'Contact number is too short'),
    organisation: zod_1.z.string().optional().default(''),
    purpose: zod_1.z.string().optional().default('School Innovation Lab Setup'),
    message: zod_1.z.string().optional().default(''),
});
class LeadService {
    /**
     * Process a new school inquiry
     */
    static async processLead(input, meta) {
        const parseResult = exports.LeadInputSchema.safeParse(input);
        if (!parseResult.success) {
            const errorMessages = parseResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
            return { success: false, errors: errorMessages };
        }
        const validData = parseResult.data;
        // 1. Save to persistent Database
        const storedLead = database_js_1.Database.insertLead({
            name: validData.name,
            email: validData.email,
            contact: validData.contact,
            organisation: validData.organisation,
            purpose: validData.purpose,
            message: validData.message,
            ipAddress: meta?.ip,
            userAgent: meta?.userAgent,
        });
        console.log(`[LeadService] Saved lead: ${storedLead.id} for ${storedLead.name} (${storedLead.organisation || 'N/A'})`);
        // 2. Dispatch automated emails (non-blocking)
        emailService_js_1.EmailService.sendAdminLeadNotification(storedLead).catch(err => {
            console.error('[LeadService] Admin email error:', err);
        });
        emailService_js_1.EmailService.sendUserConfirmation(storedLead).catch(err => {
            console.error('[LeadService] User confirmation email error:', err);
        });
        // 3. Asynchronously sync to Google Sheets Webhook backup
        this.syncToGoogleSheet(storedLead).catch(err => {
            console.warn('[LeadService] Google Sheet sync notice:', err);
        });
        return { success: true, lead: storedLead };
    }
    /**
     * Sync lead to Google Sheets
     */
    static async syncToGoogleSheet(lead) {
        if (!env_js_1.ENV.GOOGLE_SCRIPT_URL)
            return;
        try {
            const payload = {
                Name: lead.name,
                Email: lead.email,
                Contact: lead.contact,
                Organisation: lead.organisation,
                Purpose: lead.purpose,
                Message: lead.message || '',
                Timestamp: new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            };
            await fetch(env_js_1.ENV.GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload),
            });
            database_js_1.Database.markGoogleSheetSynced(lead.id);
            console.log(`[LeadService] Synced lead ${lead.id} to Google Sheets`);
        }
        catch (err) {
            console.warn('[LeadService] Google Sheets sync failed:', err);
        }
    }
    static getLeads() {
        return database_js_1.Database.getAllLeads();
    }
    static getStats() {
        return database_js_1.Database.getStats();
    }
}
exports.LeadService = LeadService;
