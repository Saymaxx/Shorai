// Unified Lead Submission Service (Express Backend + Google Sheets Fallback)
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
}

export async function submitLeadToGoogleSheet(data: LeadFormData): Promise<{ success: boolean; message?: string }> {
  // 1. First try submitting to our Express backend API
  try {
    const apiRes = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name || '',
        email: data.email || '',
        contact: data.contact || '',
        organisation: data.organisation || '',
        purpose: data.purpose || 'School Innovation Lab Setup',
        message: data.message || '',
      }),
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
      Name: data.name || '',
      Email: data.email || '',
      Contact: data.contact || '',
      Organisation: data.organisation || '',
      Purpose: data.purpose || '',
      Message: data.message || '',
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
    console.error('Error submitting lead:', error);
    return { success: false, message: 'Could not submit inquiry. Please call +91 7880630963.' };
  }
}
