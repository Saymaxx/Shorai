import { supabase } from './supabaseClient';

// Unified Lead Submission Service (Express Backend + Supabase + Google Sheets Fallback)
export const GOOGLE_SCRIPT_WEB_APP_URL = 
  ((import.meta as unknown as { env?: { VITE_GOOGLE_SCRIPT_URL?: string } }).env?.VITE_GOOGLE_SCRIPT_URL) || 
  'https://script.google.com/macros/s/AKfycbxA-MijWckNTGLdZIcn768XLjn75ktRMcHYEqB2rTwHRQRiTwZNwvnkjWy8zGvGFTMwAA/exec';

export interface LeadFormData {
  name: string;
  email: string;
  contact: string;
  organisation?: string;
  purpose?: string;
  message?: string;
  honeypot?: string; // Invisible bot trap field
}

function sanitize(str?: string): string {
  if (!str) return '';
  return str.trim().slice(0, 1000);
}

export async function submitLeadToGoogleSheet(data: LeadFormData): Promise<{ success: boolean; message?: string }> {
  // 🛡️ Invisible Honeypot Trap: If a spam bot filled the invisible decoy field, drop silently
  if (data.honeypot && data.honeypot.trim().length > 0) {
    console.warn('[LeadSubmission] Spam bot detected via honeypot trap, dropped silently.');
    return { success: true, message: 'Enquiry submitted successfully.' };
  }

  const cleanData: LeadFormData = {
    name: sanitize(data.name),
    email: sanitize(data.email),
    contact: sanitize(data.contact),
    organisation: sanitize(data.organisation),
    purpose: sanitize(data.purpose) || 'School Innovation Lab Setup',
    message: sanitize(data.message),
  };

  // 1. Write directly to Supabase 'leads' table (non-blocking)
  try {
    supabase.from('leads').insert([
      {
        name: cleanData.name,
        email: cleanData.email,
        contact: cleanData.contact,
        organisation: cleanData.organisation || '',
        purpose: cleanData.purpose,
        message: cleanData.message || '',
        status: 'new'
      }
    ]).then(({ error }) => {
      if (error) {
        console.warn('[LeadSubmission] Supabase insert note:', error.message);
      } else {
        console.log('[LeadSubmission] Successfully saved lead to Supabase!');
      }
    });
  } catch (sbErr) {
    console.warn('[LeadSubmission] Supabase direct client error:', sbErr);
  }

  // 2. Try submitting to Express backend API
  try {
    const apiRes = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanData),
    });

    if (apiRes.ok) {
      const resJson = await apiRes.json();
      return { success: true, message: resJson.message };
    }
  } catch (backendErr) {
    console.warn('[LeadSubmission] Express backend unavailable, falling back to direct Google Sheets:', backendErr);
  }

  // 2. Fallback directly to Google Apps Script Web App
  try {
    const payload = {
      Name: cleanData.name,
      Email: cleanData.email,
      Contact: cleanData.contact,
      Organisation: cleanData.organisation || '',
      Purpose: cleanData.purpose || '',
      Message: cleanData.message || '',
      Timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: 'Enquiry submitted successfully.' };
  } catch (error) {
    console.error('[LeadSubmission] Direct Google Script error, saving offline backup:', error);

    // Save offline backup in localStorage
    try {
      if (typeof window !== 'undefined') {
        const queue = JSON.parse(localStorage.getItem('shorai_offline_leads') || '[]');
        queue.push({ ...cleanData, timestamp: new Date().toISOString() });
        localStorage.setItem('shorai_offline_leads', JSON.stringify(queue.slice(-20)));
      }
    } catch {
      // Ignore localStorage quotas
    }

    return { success: true, message: 'Enquiry saved. Our director will contact you shortly.' };
  }
}
