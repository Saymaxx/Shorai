import fs from 'fs';
import path from 'path';
import { supabaseServer } from './supabase.js';

export interface StoredLead {
  id: string;
  name: string;
  email: string;
  contact: string;
  organisation: string;
  purpose: string;
  message?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'converted';
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  syncedToGoogleSheet: boolean;
}

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'leads.json');

export class Database {
  private static memoryLeads: StoredLead[] = [];
  private static initialized = false;

  private static safeEnsureDir() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    } catch {
      // Read-only filesystem in serverless environments (Vercel)
    }
  }

  private static readLeads(): StoredLead[] {
    if (this.initialized) {
      return this.memoryLeads;
    }

    try {
      this.safeEnsureDir();
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.memoryLeads = JSON.parse(raw) as StoredLead[];
      }
    } catch {
      // Keep memoryLeads
    }

    this.initialized = true;
    return this.memoryLeads;
  }

  private static writeLeads(leads: StoredLead[]): boolean {
    this.memoryLeads = leads;
    try {
      this.safeEnsureDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(leads, null, 2), 'utf-8');
      return true;
    } catch {
      // In serverless, in-memory state is preserved for the lifecycle
      return true;
    }
  }

  public static insertLead(leadData: Omit<StoredLead, 'id' | 'createdAt' | 'status' | 'syncedToGoogleSheet'>): StoredLead {
    const leads = this.readLeads();
    const newLead: StoredLead = {
      ...leadData,
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      status: 'new',
      syncedToGoogleSheet: false,
      createdAt: new Date().toISOString(),
    };

    leads.unshift(newLead);
    this.writeLeads(leads);

    // Asynchronously push to Supabase table
    Promise.resolve(
      supabaseServer
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
        })
    )
      .then((res: any) => {
        if (res?.error) {
          console.warn('[Supabase Sync] Lead insert note (check if table is created):', res.error.message);
        } else {
          console.log('[Supabase Sync] Lead successfully synced to Supabase database.');
        }
      })
      .catch((err: any) => {
        console.warn('[Supabase Sync] Async lead push error:', err?.message || err);
      });

    return newLead;
  }

  public static getAllLeads(): StoredLead[] {
    return this.readLeads();
  }

  public static getLeadById(id: string): StoredLead | undefined {
    const leads = this.readLeads();
    return leads.find(l => l.id === id);
  }

  public static updateLeadStatus(id: string, status: StoredLead['status']): boolean {
    const leads = this.readLeads();
    const lead = leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      return this.writeLeads(leads);
    }
    return false;
  }

  public static markGoogleSheetSynced(id: string): boolean {
    const leads = this.readLeads();
    const lead = leads.find(l => l.id === id);
    if (lead) {
      lead.syncedToGoogleSheet = true;
      return this.writeLeads(leads);
    }
    return false;
  }

  public static getStats() {
    const leads = this.readLeads();
    return {
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === 'new').length,
      contactedLeads: leads.filter(l => l.status === 'contacted').length,
      scheduledLeads: leads.filter(l => l.status === 'scheduled').length,
    };
  }
}
