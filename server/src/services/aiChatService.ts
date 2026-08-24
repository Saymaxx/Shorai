import { ENV } from '../config/env.js';

const SHORAI_KNOWLEDGE_BASE = `
You are the official AI Academic Advisor for SHORAI (an initiative by Skill and Employability Generation Academy - SEG Academy Pvt. Ltd., CIN: U80902WB2021PTC247995).

Key Information about Shorai:
1. Core Mission: Transforming K-12 school education across India with NEP 2020-aligned experiential AI, Robotics, Autonomous Drone Aviation, and Coding Labs.
2. What We Build:
   - Robotics & IoT Labs (modular microcontrollers, Arduino, ESP32, sensors, actuators, Rocker-Bogie Mars rovers).
   - Autonomous Drone Aviation Labs (UAV aerodynamics, flight simulators, LiDAR scanning, drone coding).
   - AI & Computer Vision Labs (Neural networks, OpenCV, NLP, machine learning models for students).
   - Coding & Microcontrollers (Scratch Block coding for Primary, Python & C++ for Middle/High School).
3. Grade-Wise Curriculum Tracks:
   - Grades 1-2 (Foundation): Visual block coding, basic sensors, computational logic.
   - Grades 3-5 (Explorers): Sensor-driven robots, block-to-code compiler, game logic.
   - Grades 6-8 (Innovators): Autonomous robotics, Python programming, IoT breadboarding, beginner aerodynamics.
   - Grades 9-12 (Advanced Engineers): Neural vision CNNs, autonomous UAV piloting, Raspberry Pi robotics, hackathons.
4. School Partnership Tracks:
   - Full Turnkey Setup (Hardware + 30-day Lab fitout + Dedicated on-campus trainer + LMS).
   - Curriculum & Teacher Enablement (Syllabus licensing + Teacher certification).
   - Experiential STEM Workshops & Bootcamps.
5. Locations & Contacts:
   - Varanasi Center: 59/98, 3rd floor, Sampoornand, UBI Building, Sigra - Mahmoorganj Rd, Mahmoorganj, Varanasi, Uttar Pradesh 221010.
   - Kolkata HQ: 119/114, Ramkrishna Road, Khardaha, Kolkata, West Bengal 700116.
   - Helpline: +91 7880630963 | Email: contact@shorai.in / info@segacademy.com.

Guidelines for Answers:
- Keep answers warm, encouraging, professional, concise, and structured.
- Invite teachers/principals to schedule a live on-campus demonstration or lab consultation.
`;

export class AIChatService {
  public static async generateResponse(userMessage: string, history: Array<{ role: 'user' | 'assistant'; text: string }> = []): Promise<string> {
    const trimmed = userMessage.trim();
    if (!trimmed) return "Hello! How can I help you learn more about Shorai's AI & Robotics school programs today?";

    // 1. If Gemini API Key exists, call Google Gemini API
    if (ENV.GEMINI_API_KEY) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ENV.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${SHORAI_KNOWLEDGE_BASE}\n\nUser Question: ${trimmed}` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 300,
            }
          })
        });

        if (response.ok) {
          const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
          const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) return aiText.trim();
        }
      } catch (err) {
        console.warn('[AIChatService] Gemini API call failed, falling back to knowledge matcher:', err);
      }
    }

    // 2. Intelligent Knowledge Matcher Fallback
    const q = trimmed.toLowerCase();

    if (q.includes('drone') || q.includes('aviation') || q.includes('fly')) {
      return "Shorai's Drone Aviation Lab introduces students in Grades 6–12 to UAV aerodynamics, flight simulator physics, block-to-Python flight coding, and autonomous LiDAR scanning. Would you like to schedule a drone demonstration at your school?";
    }

    if (q.includes('curriculum') || q.includes('grade') || q.includes('class') || q.includes('syllabus')) {
      return "Our NEP 2020 aligned curriculum spans Grades 1 to 12 in 4 distinct tiers: Foundation (Grades 1-2), Explorers (3-5), Innovators (6-8), and Advanced AI/Robotics (9-12). Each grade includes hands-on student project kits, digital workbooks, and teacher lesson plans.";
    }

    if (q.includes('cost') || q.includes('price') || q.includes('budget') || q.includes('fee')) {
      return "We offer flexible partnership models ranging from Full Turnkey Lab Setups to Curriculum Licensing. Our Academic Director will provide a customized quote and lab blueprint based on your student enrollment. Please submit our quick enquiry form or call +91 7880630963.";
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('address') || q.includes('location')) {
      return "You can reach us directly at +91 7880630963 or email contact@shorai.in. Our main centers are located in Varanasi (Sigra - Mahmoorganj Rd) and Kolkata (Khardaha Innovation HQ).";
    }

    if (q.includes('ai') || q.includes('robot') || q.includes('mars') || q.includes('rover')) {
      return "At Shorai, students build real 6-wheel Rocker-Bogie Mars rovers, autonomous obstacle-avoiding bots, and computer vision neural networks using Python and OpenCV. Everything is 100% hands-on!";
    }

    return "Thank you for reaching out! Shorai provides turnkey AI, Robotics, Drone & Coding Labs for K-12 schools across India. You can submit an enquiry on our homepage or call +91 7880630963 to schedule a free on-campus demonstration.";
  }
}
