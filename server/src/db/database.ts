import fs from 'fs';
import path from 'path';

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

// Ensure data directory and database file exist
function initDB() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

initDB();

export class Database {
  private static readLeads(): StoredLead[] {
    try {
      initDB();
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw) as StoredLead[];
    } catch (err) {
      console.error('[DB] Failed to read database:', err);
      return [];
    }
  }

  private static writeLeads(leads: StoredLead[]): boolean {
    try {
      initDB();
      fs.writeFileSync(DB_FILE, JSON.stringify(leads, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('[DB] Failed to write database:', err);
      return false;
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
