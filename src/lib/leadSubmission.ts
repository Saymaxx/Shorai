// Google Sheets Lead Submission Service
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

    // Send data to Google Apps Script Web App
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
