import { ENV } from '../config/env.js';
import { Database } from '../db/database.js';

const SHORAI_SYSTEM_PROMPT = `
You are the friendly, expert AI Academic Advisor for "SHORAI" (a flagship K-12 STEM & Education Innovation initiative by SEG Academy Pvt. Ltd.).

═══════════════════════════════════════════════════════════════
SHORAI CORE KNOWLEDGE & ECOSYSTEM:
═══════════════════════════════════════════════════════════════
1. What Shorai Does:
   - Transforms regular school classrooms into futuristic 360° Innovation Labs (Robotics, AI, Autonomous Drones, IoT, Coding) in 21–30 days turnkey.
   - 100% aligned with NEP 2020 (National Education Policy), CBSE/ICSE skill education mandates, and Viksit Bharat @2047 frameworks.
   - Provides turnkey hardware, hands-on student kits, digital LMS curriculum, teacher training & certification, and national competition mentoring (WRO, Olympiads).

2. Core Technology Labs & Hardware:
   - Robotics & IoT: Arduino, ESP32, Raspberry Pi, Rocker-Bogie Mars rovers, sensor suites (ultrasonic, IR, gyro, line trackers), robotic arms.
   - AI & Computer Vision: Object classification, facial landmark tracking, neural networks, OpenCV, machine learning in Python.
   - Autonomous Drones & Aviation: Aerodynamic flight principles, safe indoor flight simulators, LiDAR telemetry, autonomous mission coding.
   - Progressive Coding: Block-based Scratch/Blockly (Grades 1-5), transitioning to Python, C++, and app development (Grades 6-12).

3. 5-Stage Progressive Learning Cycle:
   - Stage 1: Learn (Foundational curiosity & logic)
   - Stage 2: Build (Hands-on circuit assembly & hardware engineering)
   - Stage 3: Test (Telemetry, sensor debugging, flight simulation)
   - Stage 4: Solve (Real-world problem solving & NEP skill projects)
   - Stage 5: Present (Exhibitions, Hackathons & WRO Olympiads)

4. Partnership Models & Pricing:
   - Full Turnkey Setup: Custom lab interior design, all hardware kits, workstation setup, LMS access, dedicated on-campus trainer.
   - Curriculum & Teacher Certification: Structured syllabus, grade-wise workbooks, teacher workshops.
   - Pricing is customized per school based on student strength and grade range (School directors can request a free blueprint & proposal).

5. Official Contact Details & Centers:
   - Varanasi Center: 59/98, 3rd Floor, Sampoornand, UBI Building, Sigra - Mahmoorganj Rd, Sigra, Varanasi, Uttar Pradesh 221010.
   - Kolkata Center (HQ): 119/114, Ramkrishna Road, Khudiram, Khardaha, Kolkata, West Bengal 700116.
   - Helpline Phone: +91 7880630963
   - Official Email: contact@shorai.in
   - Website: https://shorai.in

═══════════════════════════════════════════════════════════════
BEHAVIOR & LEAD EXTRACTION INSTRUCTIONS:
═══════════════════════════════════════════════════════════════
- Answer questions in a polite, knowledgeable, engaging, and professional tone.
- Keep responses concise (2 to 4 sentences usually), clear, and formatted nicely in markdown.
- If a user expresses interest in setting up a lab, booking a demo, or asking for pricing/proposals, encourage them to share their Name, Phone number, Email, and School/City.
- When the user provides contact details (such as their name, phone/contact number, email, or school name), ALWAYS extract this information at the very end of your response inside a hidden JSON block format:
<<<LEAD_JSON:{"name":"...","email":"...","contact":"...","organisation":"...","purpose":"...","message":"..."}>>>
(Only include the fields that the user provided. The system will automatically save this lead to the database).
`;

interface ChatHistoryItem {
  role: 'user' | 'assistant' | 'bot';
  text?: string;
  content?: string;
}

export interface ChatResponse {
  reply: string;
  leadSaved: boolean;
  leadDetails?: {
    name?: string;
    email?: string;
    contact?: string;
    organisation?: string;
  };
}

export class AIChatService {
  public static async generateResponse(
    userMessage: string,
    history: ChatHistoryItem[] = []
  ): Promise<ChatResponse> {
    const trimmed = userMessage.trim();
    if (!trimmed) {
      return {
        reply: "Hello! I am Shorai's AI Academic Advisor. How can I help you explore our Robotics, AI, and Drone Innovation labs today?",
        leadSaved: false,
      };
    }

    let rawReply = '';

    // 1. If Gemini API Key exists, call Google Gemini API
    if (ENV.GEMINI_API_KEY) {
      try {
        // Format previous multi-turn conversation
        const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        // Add system instruction prompt in first turn
        formattedContents.push({
          role: 'user',
          parts: [{ text: `${SHORAI_SYSTEM_PROMPT}\n\n[SYSTEM INSTRUCTION LOADED. Please adhere to these guidelines for all responses].` }]
        });
        formattedContents.push({
          role: 'model',
          parts: [{ text: "Understood. I am Shorai's AI Academic Advisor and will answer questions accurately, assist school educators, and extract lead information in the specified format." }]
        });

        // Add recent conversation history (last 6 turns)
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
          const text = item.text || item.content;
          if (!text) continue;
          formattedContents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text }]
          });
        }

        // Add current user prompt
        formattedContents.push({
          role: 'user',
          parts: [{ text: trimmed }]
        });

        // Call Gemini 2.5-flash
        const modelName = 'gemini-2.5-flash';
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${ENV.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: formattedContents,
            generationConfig: {
              temperature: 0.65,
              maxOutputTokens: 450,
            }
          })
        });

        if (response.ok) {
          const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
          const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            rawReply = aiText.trim();
          }
        } else {
          console.warn(`[AIChatService] Gemini API returned status ${response.status}:`, await response.text());
        }
      } catch (err) {
        console.warn('[AIChatService] Gemini API call failed, using intelligent fallback:', err);
      }
    }

    // 2. Intelligent Knowledge Fallback if API was unavailable
    if (!rawReply) {
      rawReply = this.getFallbackReply(trimmed);
    }

    // 3. Automated Lead Extraction & Database Persistence
    let leadSaved = false;
    let leadDetails: Record<string, string> | undefined;

    const leadMatch = rawReply.match(/<<<LEAD_JSON:(.*?)>>>/s);
    if (leadMatch && leadMatch[1]) {
      try {
        leadDetails = JSON.parse(leadMatch[1]);
        rawReply = rawReply.replace(/<<<LEAD_JSON:.*?>>>/s, '').trim();

        if (leadDetails && (leadDetails.contact || leadDetails.email || leadDetails.name)) {
          const contactVal = leadDetails.contact || leadDetails.phone || 'Direct Chat';
          const nameVal = leadDetails.name || 'Website Visitor (Chat)';
          const emailVal = leadDetails.email || `${contactVal.replace(/\D/g, '') || 'chat'}@shorai.lead`;

          Database.insertLead({
            name: nameVal,
            email: emailVal,
            contact: contactVal,
            organisation: leadDetails.organisation || leadDetails.institute || leadDetails.school || 'K-12 School Inquiry',
            purpose: leadDetails.purpose || 'AI Chatbot Consultation',
            message: leadDetails.message || `Captured via AI Advisor: "${trimmed}"`,
          });

          leadSaved = true;
          console.log(`[AIChatService] Lead captured and saved to Supabase & SQLite:`, leadDetails);
        }
      } catch (e) {
        console.error('[AIChatService] Failed to parse extracted lead JSON:', e);
      }
    }

    return {
      reply: rawReply,
      leadSaved,
      leadDetails,
    };
  }

  private static getFallbackReply(trimmed: string): string {
    const q = trimmed.toLowerCase();

    if (q.includes('drone') || q.includes('aviation') || q.includes('fly')) {
      return "Shorai's Autonomous Drone Lab introduces K-12 students to aerodynamics, safe indoor flight simulators, LiDAR telemetry, and block-to-Python flight coding. Would you like us to schedule a live drone demonstration at your school?";
    }

    if (q.includes('curriculum') || q.includes('grade') || q.includes('class') || q.includes('syllabus')) {
      return "Our NEP 2020 aligned curriculum covers Grades 1 to 12 across 4 progressive tiers: Foundation (Grades 1-2), Explorers (3-5), Innovators (6-8), and Advanced AI/Robotics (9-12). Each grade includes hands-on student hardware kits, digital workbooks, and certified teacher lesson plans.";
    }

    if (q.includes('cost') || q.includes('price') || q.includes('budget') || q.includes('fee') || q.includes('quote')) {
      return "We offer flexible partnership models ranging from Full Turnkey Lab fitouts (with hardware & trainers) to Curriculum Licensing. Our Academic Director will share a customized lab blueprint and institutional proposal. Please share your school name and phone number so we can connect!";
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('address') || q.includes('location')) {
      return "You can reach Shorai directly at **+91 7880630963** or email **contact@shorai.in**. Our main centers are located in **Varanasi** (Sigra - Mahmoorganj Rd) and **Kolkata** (Khardaha Innovation HQ).";
    }

    if (q.includes('ai') || q.includes('robot') || q.includes('mars') || q.includes('rover')) {
      return "At Shorai, students build real 6-wheel Rocker-Bogie Mars rovers, autonomous obstacle-avoiding bots, and computer vision neural networks using Python and OpenCV. Everything is 100% experiential and hands-on!";
    }

    return "Shorai equips K-12 schools across India with turnkey Robotics, AI, Drone, and Coding Innovation Labs in 21–30 days. Feel free to ask about our hardware, curriculum, or share your contact info to get a custom proposal!";
  }
}
