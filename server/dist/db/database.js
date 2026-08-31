"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const supabase_js_1 = require("./supabase.js");
const DATA_DIR = path_1.default.resolve(process.cwd(), 'server', 'data');
const DB_FILE = path_1.default.join(DATA_DIR, 'leads.json');
class Database {
    static memoryLeads = [];
    static initialized = false;
    static safeEnsureDir() {
        try {
            if (!fs_1.default.existsSync(DATA_DIR)) {
                fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
            }
        }
        catch {
            // Read-only filesystem in serverless environments (Vercel)
        }
    }
    static readLeads() {
        if (this.initialized) {
            return this.memoryLeads;
        }
        try {
            this.safeEnsureDir();
            if (fs_1.default.existsSync(DB_FILE)) {
                const raw = fs_1.default.readFileSync(DB_FILE, 'utf-8');
                this.memoryLeads = JSON.parse(raw);
            }
        }
        catch {
            // Keep memoryLeads
        }
        this.initialized = true;
        return this.memoryLeads;
    }
    static writeLeads(leads) {
        this.memoryLeads = leads;
        try {
            this.safeEnsureDir();
            fs_1.default.writeFileSync(DB_FILE, JSON.stringify(leads, null, 2), 'utf-8');
            return true;
        }
        catch {
            // In serverless, in-memory state is preserved for the lifecycle
            return true;
        }
    }
    static insertLead(leadData) {
        const leads = this.readLeads();
        const newLead = {
            ...leadData,
            id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
            status: 'new',
            syncedToGoogleSheet: false,
            createdAt: new Date().toISOString(),
        };
        leads.unshift(newLead);
        this.writeLeads(leads);
        // Asynchronously push to Supabase table
        Promise.resolve(supabase_js_1.supabaseServer
            .from('leads')
            .insert({
            id: newLead.id,
            name: newLead.name,
            email: newLead.email,
            contact: newLead.contact,
            school_name: newLead.organisation,
            purpose: newLead.purpose,
            message: newLead.message || '',
            status: newLead.status,
            ip_address: newLead.ipAddress || '',
            user_agent: newLead.userAgent || '',
            created_at: newLead.createdAt,
        }))
            .then((res) => {
            if (res?.error) {
                console.warn('[Supabase Sync] Lead insert note (check if table is created):', res.error.message);
            }
            else {
                console.log('[Supabase Sync] Lead successfully synced to Supabase database.');
            }
        })
            .catch((err) => {
            console.warn('[Supabase Sync] Async lead push error:', err?.message || err);
        });
        return newLead;
    }
    static getAllLeads() {
        return this.readLeads();
    }
    static getLeadById(id) {
        const leads = this.readLeads();
        return leads.find(l => l.id === id);
    }
    static updateLeadStatus(id, status) {
        const leads = this.readLeads();
        const lead = leads.find(l => l.id === id);
        if (lead) {
            lead.status = status;
            return this.writeLeads(leads);
        }
        return false;
    }
    static markGoogleSheetSynced(id) {
        const leads = this.readLeads();
        const lead = leads.find(l => l.id === id);
        if (lead) {
            lead.syncedToGoogleSheet = true;
            return this.writeLeads(leads);
        }
        return false;
    }
    static getStats() {
        const leads = this.readLeads();
        return {
            totalLeads: leads.length,
            newLeads: leads.filter(l => l.status === 'new').length,
            contactedLeads: leads.filter(l => l.status === 'contacted').length,
            scheduledLeads: leads.filter(l => l.status === 'scheduled').length,
        };
    }
}
exports.Database = Database;
