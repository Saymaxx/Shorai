import { z } from 'zod';
import { Database, StoredLead } from '../db/database.js';
import { EmailService } from './emailService.js';
import { ENV } from '../config/env.js';

export const LeadInputSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  contact: z.string().min(7, 'Contact number is too short'),
  organisation: z.string().optional().default(''),
  purpose: z.string().optional().default('School Innovation Lab Setup'),
  message: z.string().optional().default(''),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;

export class LeadService {
  /**
   * Process a new school inquiry
   */
  public static async processLead(input: unknown, meta?: { ip?: string; userAgent?: string }): Promise<{ success: boolean; lead?: StoredLead; errors?: string[] }> {
    const parseResult = LeadInputSchema.safeParse(input);

    if (!parseResult.success) {
      const errorMessages = parseResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
      return { success: false, errors: errorMessages };
    }

    const validData = parseResult.data;

    // 1. Save to persistent Database
    const storedLead = Database.insertLead({
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
    EmailService.sendAdminLeadNotification(storedLead).catch(err => {
      console.error('[LeadService] Admin email error:', err);
    });

    EmailService.sendUserConfirmation(storedLead).catch(err => {
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
}
