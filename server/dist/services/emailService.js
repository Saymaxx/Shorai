"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_js_1 = require("../config/env.js");
let transporter = null;
if (env_js_1.ENV.SMTP_USER && env_js_1.ENV.SMTP_PASS) {
    transporter = nodemailer_1.default.createTransport({
        host: env_js_1.ENV.SMTP_HOST,
        port: env_js_1.ENV.SMTP_PORT,
        secure: env_js_1.ENV.SMTP_PORT === 465,
        auth: {
            user: env_js_1.ENV.SMTP_USER,
            pass: env_js_1.ENV.SMTP_PASS,
        },
    });
}
class EmailService {
    /**
     * Send notification to Shorai Admin about a new school lead
     */
    static async sendAdminLeadNotification(lead) {
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #7928CA, #6366F1, #00D4FF); padding: 15px; border-radius: 8px; color: white; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">🚀 New School Lead Captured!</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Shorai STEM & Robotics Innovation Platform</p>
        </div>
        
        <div style="padding: 20px 0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 35%;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>School/Institute:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${lead.organisation || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Phone/WhatsApp:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;"><a href="tel:${lead.contact}">${lead.contact}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${lead.email}">${lead.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Interest/Program:</strong></td>
              <td style="padding: 8px 0; color: #6366f1; font-weight: bold;">${lead.purpose}</td>
            </tr>
            ${lead.message ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Message:</strong></td>
              <td style="padding: 8px 0; color: #334155; background: #f8fafc; padding: 10px; border-radius: 6px;">${lead.message}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; color: #64748b;"><strong>Submitted At:</strong></td>
              <td style="padding: 8px 0; color: #64748b; font-size: 12px;">${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          Shorai • Skill and Employability Generation Academy (SEG Academy)
        </div>
      </div>
    `;
        if (!transporter) {
            console.log(`[EmailService] SMTP not configured. Lead email logged for ${lead.name} (${lead.email})`);
            return true;
        }
        try {
            await transporter.sendMail({
                from: `"Shorai Portal" <${env_js_1.ENV.SMTP_USER}>`,
                to: env_js_1.ENV.ADMIN_EMAIL,
                subject: `[New Lead] ${lead.name} - ${lead.organisation || 'School Inquiry'}`,
                html: htmlContent,
            });
            return true;
        }
        catch (err) {
            console.error('[EmailService] Failed to send admin email:', err);
            return false;
        }
    }
    /**
     * Send instant welcome & confirmation email to educator/principal
     */
    static async sendUserConfirmation(lead) {
        if (!lead.email)
            return false;
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #7928CA, #6366F1, #00D4FF); padding: 20px; border-radius: 8px; color: white; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">Welcome to Shorai!</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px;">Building Future Innovators with AI & Robotics</p>
        </div>

        <div style="padding: 20px 0; color: #334155; line-height: 1.6; font-size: 14px;">
          <p>Dear <strong>${lead.name}</strong>,</p>
          <p>Thank you for expressing interest in bringing Shorai's <strong>turnkey AI, Robotics, Autonomous Drone, and Coding Labs</strong> to <strong>${lead.organisation || 'your school'}</strong>.</p>
          
          <p>Our Academic & STEM Implementation Director has received your enquiry and will connect with you within <strong>24 business hours</strong> to share tailored NEP 2020 curriculum guides and schedule an on-campus demonstration.</p>

          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin: 0 0 8px 0; color: #0f172a;">Your Inquiry Summary:</h4>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px;">
              <li><strong>Program Selected:</strong> ${lead.purpose}</li>
              <li><strong>Contact Number:</strong> ${lead.contact}</li>
            </ul>
          </div>

          <p>If you have urgent questions, feel free to call our direct helpline at <strong>+91 7880630963</strong> or reply directly to this email.</p>
        </div>

        <div style="text-align: center; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          © ${new Date().getFullYear()} Shorai • Powered by Skill and Employability Generation Academy (SEG Academy).
        </div>
      </div>
    `;
        if (!transporter) {
            console.log(`[EmailService] User confirmation email logged for ${lead.email}`);
            return true;
        }
        try {
            await transporter.sendMail({
                from: `"Shorai STEM Labs" <${env_js_1.ENV.SMTP_USER}>`,
                to: lead.email,
                subject: `Thank you for contacting Shorai - STEM & AI Lab Consultation`,
                html: htmlContent,
            });
            return true;
        }
        catch (err) {
            console.error('[EmailService] Failed to send user confirmation email:', err);
            return false;
        }
    }
}
exports.EmailService = EmailService;
