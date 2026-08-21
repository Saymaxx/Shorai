// Google Sheets Lead Submission Service
// Replace with your deployed Google Apps Script Web App URL or set VITE_GOOGLE_SCRIPT_URL in .env
export const GOOGLE_SCRIPT_WEB_APP_URL = 
  ((import.meta as unknown as { env?: { VITE_GOOGLE_SCRIPT_URL?: string } }).env?.VITE_GOOGLE_SCRIPT_URL) || 
  'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';

export interface LeadFormData {
  name: string;
  email: string;
  contact: string;
  organisation?: string;
  purpose?: string;
  message?: string;
}

export async function submitLeadToGoogleSheet(data: LeadFormData): Promise<{ success: boolean; message?: string }> {
  try {
    const payload = {
      Name: data.name || '',
      Email: data.email || '',
      Contact: data.contact || '',
      Organisation: data.organisation || '',
      Purpose: data.purpose || '',
      Message: data.message || '',
      Timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // If still using default placeholder, simulate network delay
    if (GOOGLE_SCRIPT_WEB_APP_URL.includes('YOUR_SCRIPT_ID_HERE')) {
      console.info('[Lead Submission Ready - Set Deployed Web App URL]:', payload);
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true };
    }

    // Google Apps Script requires text/plain or no-cors mode to avoid browser CORS preflight blocks
    await fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead to Google Sheet:', error);
    return { success: false, message: 'Could not connect to Google Sheet' };
  }
}
