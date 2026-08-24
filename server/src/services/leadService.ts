import { z } from 'zod';
import { Database, StoredLead } from '../db/database.js';
import { EmailService } from './emailService.js';
import { ENV } from '../config/env.js';

// Extremely forgiving schema that accepts phone/contact, school/organisation, etc.
export const LeadInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().optional().default(''),
  contact: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  organisation: z.string().optional().default(''),
  school: z.string().optional().default(''),
  purpose: z.string().optional().default('School Innovation Lab Setup'),
  message: z.string().optional().default(''),
});

export class LeadService {
  /**
   * Process a new school inquiry
   */
  public static async processLead(input: any, meta?: { ip?: string; userAgent?: string }): Promise<{ success: boolean; lead?: StoredLead; errors?: string[] }> {
    console.log('[LeadService] Incoming lead payload:', input);

    const parseResult = LeadInputSchema.safeParse(input);

    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
      console.warn('[LeadService] Validation error:', errorMessages);
      return { success: false, errors: errorMessages };
    }

    const data = parseResult.data;
    const finalContact = data.contact || data.phone || 'Not Provided';
    const finalOrg = data.organisation || data.school || '';

    // 1. Save to persistent Database
    const storedLead = Database.insertLead({
      name: data.name.trim(),
      email: (data.email || '').trim(),
      contact: finalContact.trim(),
      organisation: finalOrg.trim(),
      purpose: (data.purpose || 'School Innovation Lab Setup').trim(),
      message: (data.message || '').trim(),
      ipAddress: meta?.ip,
      userAgent: meta?.userAgent,
    });

    console.log(`[LeadService] Successfully saved lead: ${storedLead.id} for ${storedLead.name}`);

    // 2. Dispatch automated emails (non-blocking)
    EmailService.sendAdminLeadNotification(storedLead).catch(err => {
      console.error('[LeadService] Admin email error:', err);
    });

    if (storedLead.email) {
      EmailService.sendUserConfirmation(storedLead).catch(err => {
        console.error('[LeadService] User confirmation email error:', err);
      });
    }

    // 3. Asynchronously sync to Google Sheets Webhook backup
    this.syncToGoogleSheet(storedLead).catch(err => {
      console.warn('[LeadService] Google Sheet sync notice:', err);
    });

    return { success: true, lead: storedLead };
  }

  /**
   * Sync lead to Google Sheets
   */
  private static async syncToGoogleSheet(lead: StoredLead): Promise<void> {
    if (!ENV.GOOGLE_SCRIPT_URL) return;

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

      await fetch(ENV.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      Database.markGoogleSheetSynced(lead.id);
      console.log(`[LeadService] Synced lead ${lead.id} to Google Sheets`);
    } catch (err) {
      console.warn('[LeadService] Google Sheets sync failed:', err);
    }
  }

  public static getLeads() {
    return Database.getAllLeads();
  }

  public static getStats() {
    return Database.getStats();
  }

  public static batchImport(leadsList: Array<{ name: string; email?: string; contact?: string; organisation?: string; purpose?: string; message?: string; createdAt?: string }>) {
    let count = 0;
    for (const item of leadsList) {
      if (item.name) {
        Database.insertLead({
          name: item.name,
          email: item.email || '',
          contact: item.contact || '',
          organisation: item.organisation || '',
          purpose: item.purpose || 'School Innovation Lab Setup',
          message: item.message || '',
        });
        count++;
      }
    }
    return count;
  }
}
