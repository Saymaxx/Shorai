'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  X, 
  Sparkles, 
  ExternalLink, 
  RotateCcw,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useTheme } from '@/context/ThemeContext';
import { submitLeadToGoogleSheet, LeadFormData } from '@/lib/leadSubmission';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  chips?: string[];
  linkUrl?: string;
  linkLabel?: string;
}

type FormStep = 'idle' | 'name' | 'email' | 'contact' | 'organisation' | 'purpose' | 'message' | 'submitting' | 'done';

const PURPOSE_CHIPS = [
  'Robotics Lab',
  'AI Curriculum',
  'Drone Lab',
  'Teacher Training',
  'Book a Demo',
];

const KNOWLEDGE_BASE: { keywords: string[]; answer: string; chips?: string[]; link?: { url: string; label: string } }[] = [
  {
    keywords: ['what is shorai', 'about', 'who are you', 'company', 'assistant'],
    answer: "Shorai equips K-12 schools with turnkey Robotics, AI, Drone, and Coding labs with hands-on curriculum and teacher training.",
    chips: ['Explore Labs', 'How to Partner', 'Get in Touch'],
    link: { url: '/about', label: 'About Us' }
  },
  {
    keywords: ['robotics', 'robot', 'hardware', 'kits', 'arduino'],
    answer: "Our Robotics Labs feature Arduino, Raspberry Pi, sensor kits, robotic arms, and autonomous rovers for hands-on building.",
    chips: ['Setup a Lab', 'Curriculum', 'Get in Touch'],
    link: { url: '/labs', label: 'View Labs' }
  },
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'vision'],
    answer: "We teach Computer Vision, Neural Networks, and smart algorithms with visual, age-appropriate interactive tools.",
    chips: ['AI Labs', 'School Program', 'Get in Touch'],
    link: { url: '/labs', label: 'Explore AI' }
  },
  {
    keywords: ['drone', 'drones', 'flight', 'aviation'],
    answer: "Students learn aerodynamics, autonomous flight navigation, and telemetry with safe indoor flight setups.",
    chips: ['Drone Lab Setup', 'Get in Touch'],
    link: { url: '/labs', label: 'Drone Labs' }
  },
  {
    keywords: ['coding', 'python', 'scratch', 'programming'],
    answer: "From visual Blockly to Python and app development, our progressive coding curriculum prepares students for future tech.",
    chips: ['Curriculum', 'Book a Demo'],
    link: { url: '/why-shorai', label: 'Curriculum' }
  },
  {
    keywords: ['partner', 'school', 'schools', 'transformation', 'setup', 'implement'],
    answer: "We provide complete end-to-end setup: lab design, hardware kits, teacher certification, and ongoing classroom support.",
    chips: ['Get in Touch', 'View Model'],
    link: { url: '/schools', label: 'School Model' }
  },
  {
    keywords: ['teacher', 'faculty', 'training'],
    answer: "Every school partnership includes certified Master Trainer workshops, structured lesson plans, and year-round support.",
    chips: ['Faculty Program', 'Get in Touch'],
    link: { url: '/schools', label: 'Teacher Training' }
  },
  {
    keywords: ['price', 'cost', 'quote', 'fees', 'proposal'],
    answer: "Lab packages are customized for your school's size and goals. Let's get your details so our advisor can send a proposal.",
    chips: ['Get in Touch', 'Book a Call'],
    link: { url: '/contact', label: 'Contact Page' }
  },
  {
    keywords: ['contact', 'email', 'phone', 'location', 'reach'],
    answer: "Reach us at contact@shorai.in or +91 78806 30963. You can also share your info here and we'll call you back!",
    chips: ['Get in Touch', 'Open Contact Page'],
    link: { url: '/contact', label: 'Contact Page' }
  }
];

// ── Cute Animated Robo Head Icon ─────────────────────────────
function AnimatedRoboHead({ size = 32 }: { size?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -2.5, 0],
        rotate: [0, 1.5, -1.5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Antenna Stem */}
        <line x1="24" y1="10" x2="24" y2="4" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Antenna Glowing Orb */}
        <circle cx="24" cy="4" r="3" fill="#FF6B00" />
        <circle cx="24" cy="4" r="5" fill="#FF6B00" opacity="0.35" className="animate-ping" />

        {/* Ears / Side Bolts */}
        <rect x="4" y="20" width="4" height="8" rx="2" fill="#818CF8" />
        <rect x="40" y="20" width="4" height="8" rx="2" fill="#818CF8" />

        {/* Robot Head Body */}
        <rect
          x="8"
          y="10"
          width="32"
          height="28"
          rx="8"
          fill="url(#robo-grad)"
          stroke="#4F46E5"
          strokeWidth="2"
        />

        {/* Gloss highlight on head */}
        <path
          d="M13 14C13 12.3431 14.3431 11 16 11H32C33.6569 11 35 12.3431 35 14V17H13V14Z"
          fill="white"
          fillOpacity="0.25"
        />

        {/* Visor Screen */}
        <rect
          x="12"
          y="18"
          width="24"
          height="14"
          rx="5"
          fill="#0F172A"
          stroke="#6366F1"
          strokeWidth="1"
        />

        {/* Animated Eyes */}
        <motion.circle
          cx="19"
          cy="24"
          r="2.5"
          fill="#00D4FF"
          animate={{
            scaleY: [1, 1, 0.15, 1, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            times: [0, 0.45, 0.5, 0.55, 1],
          }}
        />
        <motion.circle
          cx="29"
          cy="24"
          r="2.5"
          fill="#00D4FF"
          animate={{
            scaleY: [1, 1, 0.15, 1, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            times: [0, 0.45, 0.5, 0.55, 1],
          }}
        />

        {/* Cute Smile / Mouth Line */}
        <path
          d="M21 28.5Q24 30.5 27 28.5"
          stroke="#00D4FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="robo-grad" x1="8" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EEF2FF" />
            <stop offset="1" stopColor="#C7D2FE" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function ShoraiChatbot() {
  const { navigate } = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<FormStep>('idle');
  const [leadData, setLeadData] = useState<LeadFormData>({
    name: '',
    email: '',
    contact: '',
    organisation: '',
    purpose: 'Robotics & AI Lab',
    message: '',
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "👋 Hi! I'm **Shorai Assistant**.\n\nHow can I help you today with our Robotics, AI & Drone STEM programs?",
      chips: ['🤖 Explore Labs', '🏫 School Partnership', '📝 Get in Touch', '❓ Ask a Question'],
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenAssistant = () => {
      setIsOpen(true);
    };
    window.addEventListener('shorai:open-assistant', handleOpenAssistant);
    return () => window.removeEventListener('shorai:open-assistant', handleOpenAssistant);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, formStep]);

  const addBotMessage = (text: string, chips?: string[], link?: { url: string; label: string }) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text,
          chips,
          linkUrl: link?.url,
          linkLabel: link?.label,
        },
      ]);
    }, 450);
  };

  const startLeadFlow = () => {
    setFormStep('name');
    addBotMessage("Great! Let's get in touch. May I know your name?");
  };

  const handleStepInput = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: trimmed,
      },
    ]);
    setInputVal('');

    if (formStep === 'name') {
      setLeadData((prev) => ({ ...prev, name: trimmed }));
      setFormStep('email');
      addBotMessage(`Nice to meet you, ${trimmed}! What is your email address?`);
    } else if (formStep === 'email') {
      setLeadData((prev) => ({ ...prev, email: trimmed }));
      setFormStep('contact');
      addBotMessage("Thanks! What's the best phone / WhatsApp number to reach you?");
    } else if (formStep === 'contact') {
      setLeadData((prev) => ({ ...prev, contact: trimmed }));
      setFormStep('organisation');
      addBotMessage("Which school or organisation are you with?");
    } else if (formStep === 'organisation') {
      setLeadData((prev) => ({ ...prev, organisation: trimmed }));
      setFormStep('purpose');
      addBotMessage("What is your primary area of interest?", PURPOSE_CHIPS);
    } else if (formStep === 'purpose') {
      setLeadData((prev) => ({ ...prev, purpose: trimmed }));
      setFormStep('message');
      addBotMessage("Any specific questions or message for our team? (Or type 'None' to submit)");
    } else if (formStep === 'message') {
      const finalMsg = trimmed.toLowerCase() === 'none' ? '' : trimmed;
      const finalData: LeadFormData = {
        ...leadData,
        message: finalMsg,
      };
      setLeadData(finalData);
      setFormStep('submitting');

      setIsTyping(true);
      try {
        await submitLeadToGoogleSheet(finalData);
        setIsTyping(false);
        setFormStep('done');
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-done-${Date.now()}`,
            sender: 'bot',
            text: `✨ Thank you, **${finalData.name}**! Your request has been sent to our team. We'll be in touch soon.`,
            chips: ['🤖 Explore Labs', '🏫 School Model', '❓ Ask Another Question'],
            linkUrl: '/contact',
            linkLabel: 'View Contact Page',
          },
        ]);
      } catch {
        setIsTyping(false);
        setFormStep('idle');
        addBotMessage("There was an issue sending your details. Please email us at contact@shorai.in", ['Try Again', 'Open Contact Page'], { url: '/contact', label: 'Contact Page' });
      }
    }
  };

  const handleGeneralInput = async (text?: string) => {
    const query = (text || inputVal).trim();
    if (!query) return;

    if (formStep !== 'idle' && formStep !== 'done') {
      handleStepInput(query);
      return;
    }

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: query,
      },
    ]);
    setInputVal('');

    const lower = query.toLowerCase();

    if (
      lower.includes('get in touch') || 
      lower.includes('contact') || 
      lower.includes('demo') || 
      lower.includes('partner') ||
      lower.includes('reach') ||
      lower.includes('quote')
    ) {
      startLeadFlow();
      return;
    }

    setIsTyping(true);

    try {
      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        text: m.text,
      }));

      // 1. Try Backend /api/chat
      let responseText = '';
      let leadSaved = false;

      try {
        const chatRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: query,
            history: historyPayload
          }),
        });

        if (chatRes.ok) {
          const data = await chatRes.json();
          if (data?.reply) {
            responseText = data.reply;
            leadSaved = !!data.leadSaved;
          }
        }
      } catch {
        // Fall through to direct Gemini API
      }

      // 2. If backend was not reached, call Google Gemini 2.5-flash directly
      if (!responseText) {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB-80jwRI64mPOtSy_8fEpPYovgbCvj7Eg';
        if (apiKey) {
          const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [
            {
              role: 'user',
              parts: [{
                text: `You are the friendly, intelligent AI Academic Advisor for "SHORAI" (an initiative by SEG Academy).
Shorai provides K-12 schools with turnkey Robotics, AI, Autonomous Drones, IoT, and Coding Innovation Labs (Grades 1-12) across India, aligned with NEP 2020.
Centers: Varanasi (Sigra - Mahmoorganj Rd) & Kolkata (Khardaha HQ). Helpline: +91 7880630963, Email: contact@shorai.in.

Instructions:
- Answer ALL questions intelligently and accurately, whether general science/technology/curiosity questions (e.g. "what is www", "explain quantum computing", "how do drones fly", "what is photosynthesis") or specific inquiries about Shorai programs.
- Keep answers warm, encouraging, concise (2 to 4 sentences usually), clear, and nicely formatted in markdown.
- If the user shares contact details (name, email, phone, school), extract them at the end inside: <<<LEAD_JSON:{"name":"...","contact":"...","email":"...","organisation":"..."}>>>.`
              }]
            },
            {
              role: 'model',
              parts: [{ text: "Understood. I will answer any academic, tech, or school innovation question clearly, accurately and concisely as Shorai's AI Advisor." }]
            }
          ];

          for (const item of historyPayload) {
            if (!item.text) continue;
            formattedContents.push({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }

          formattedContents.push({
            role: 'user',
            parts: [{ text: query }]
          });

          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: formattedContents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 400,
                },
              }),
            }
          );

          if (geminiRes.ok) {
            const gData = await geminiRes.json();
            const gText = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (gText) {
              responseText = gText.trim();
              const leadMatch = responseText.match(/<<<LEAD_JSON:(.*?)>>>/s);
              if (leadMatch && leadMatch[1]) {
                try {
                  const leadJson = JSON.parse(leadMatch[1]);
                  responseText = responseText.replace(/<<<LEAD_JSON:.*?>>>/s, '').trim();
                  if (leadJson.name || leadJson.contact || leadJson.email) {
                    submitLeadToGoogleSheet({
                      name: leadJson.name || 'Visitor (Chat)',
                      email: leadJson.email || 'chat@shorai.lead',
                      contact: leadJson.contact || 'Direct Chat',
                      organisation: leadJson.organisation || 'K-12 School Inquiry',
                      purpose: 'AI Chatbot Inquiry',
                      message: `Query: "${query}"`,
                    });
                    leadSaved = true;
                  }
                } catch {
                  // Ignore JSON parse error
                }
              }
            }
          }
        }
      }

      if (responseText) {
        setIsTyping(false);
        const chips = leadSaved 
          ? ['✓ Inquiry Saved to Database', '🤖 Explore Labs', '🏫 School Model']
          : ['🤖 Explore Labs', '🏫 School Model', '📝 Get in Touch'];

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: responseText,
            chips,
            linkUrl: '/contact',
            linkLabel: 'Contact Page',
          },
        ]);
        return;
      }
    } catch {
      // Backend not available, fallback to local knowledge matcher
    }

    setIsTyping(false);
    const matched = KNOWLEDGE_BASE.find((item) =>
      item.keywords.some((k) => lower.includes(k))
    );

    if (matched) {
      addBotMessage(matched.answer, matched.chips, matched.link);
    } else {
      addBotMessage(
        "I can answer questions about our Robotics Labs, AI Curriculum, and school setups, or connect you with our team.",
        ['🤖 Explore Labs', '🏫 School Model', '📝 Get in Touch'],
        { url: '/contact', label: 'Contact Page' }
      );
    }
  };

  const handleChipClick = (chip: string) => {
    if (chip.includes('Get in Touch') || chip.includes('Try Again')) {
      startLeadFlow();
    } else if (chip.includes('Open Contact Page')) {
      navigate('/contact');
      setIsOpen(false);
    } else if (formStep === 'purpose') {
      handleStepInput(chip);
    } else {
      const clean = chip.replace(/^[^\w]+/, '').trim();
      handleGeneralInput(clean);
    }
  };

  const resetChat = () => {
    setFormStep('idle');
    setLeadData({
      name: '',
      email: '',
      contact: '',
      organisation: '',
      purpose: 'Robotics & AI Lab',
      message: '',
    });
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "👋 Hi! I'm **Shorai Assistant**.\n\nHow can I help you today with our Robotics, AI & Drone STEM programs?",
        chips: ['🤖 Explore Labs', '🏫 School Partnership', '📝 Get in Touch', '❓ Ask a Question'],
      },
    ]);
  };

  return (
    <div 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
        right: 'max(1rem, env(safe-area-inset-right, 1rem))',
      }}
    >
      
      {/* ── Chat Window ────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="clean-chat"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.94 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`mb-3 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[82dvh] rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all touch-scroll ${
              isDark 
                ? 'bg-slate-900/95 border border-slate-800 text-white shadow-black/60' 
                : 'bg-white/95 border border-indigo-100/90 text-slate-900 shadow-[0_20px_50px_rgba(99,102,241,0.18)]'
            }`}
            style={{ backdropFilter: 'blur(16px)' }}
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-sky-400 to-amber-500" />

            {/* Header */}
            <div className={`px-4 py-3 flex items-center justify-between border-b ${
              isDark ? 'border-slate-800/80 bg-slate-900/50' : 'border-slate-100 bg-white/90'
            }`}>
              <div className="flex items-center gap-2.5">
                <AnimatedRoboHead size={30} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold tracking-tight">Shorai Assistant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-slate-400 block leading-tight">Always online</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    navigate('/contact');
                    setIsOpen(false);
                  }}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 ${
                    isDark 
                      ? 'text-indigo-400 hover:bg-slate-800' 
                      : 'text-indigo-600 hover:bg-indigo-50 border border-indigo-100'
                  }`}
                  title="Open Contact Form"
                >
                  <span>Form</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  onClick={resetChat}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className={`flex-1 p-3.5 overflow-y-auto space-y-3 text-xs ${
              isDark ? 'bg-slate-950/30' : 'bg-slate-50/40'
            }`}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium shadow-sm rounded-br-xs'
                        : isDark
                          ? 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-bl-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.text.split('\n').map((line, idx) => {
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <div key={idx} className={idx > 0 ? 'mt-1' : ''}>
                            {parts.map((p, pIdx) => {
                              if (p.startsWith('**') && p.endsWith('**')) {
                                return (
                                  <strong key={pIdx} className={msg.sender === 'user' ? 'text-white' : isDark ? 'text-indigo-400' : 'text-indigo-600 font-semibold'}>
                                    {p.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return p;
                            })}
                          </div>
                        );
                      })}
                    </div>

                    {msg.linkUrl && (
                      <button
                        onClick={() => {
                          if (msg.linkUrl) navigate(msg.linkUrl);
                          setIsOpen(false);
                        }}
                        className={`mt-2 inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                          isDark ? 'text-indigo-400 hover:underline' : 'text-indigo-600 hover:underline'
                        }`}
                      >
                        <span>{msg.linkLabel || 'Learn More'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.chips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => handleChipClick(chip)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                            isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                              : 'bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 shadow-2xs'
                          }`}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Bot Typing indicator */}
              {isTyping && (
                <div className={`flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full max-w-[105px] ${
                  isDark ? 'bg-slate-800 text-slate-400' : 'bg-white border border-slate-200 text-slate-500'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span>Typing...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className={`p-2.5 border-t ${
              isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'
            }`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGeneralInput();
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    formStep === 'name' ? 'Your name...' :
                    formStep === 'email' ? 'Your email...' :
                    formStep === 'contact' ? 'Your contact number...' :
                    formStep === 'organisation' ? 'Your school/organisation...' :
                    formStep === 'purpose' ? 'Select or type purpose...' :
                    formStep === 'message' ? 'Your message...' :
                    'Type a message...'
                  }
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className={`flex-1 rounded-full px-3.5 py-2 text-xs focus:outline-none transition-colors border ${
                    isDark
                      ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-400'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white'
                  }`}
                />

                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xs flex-shrink-0"
                  title="Send"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Decorative Animated Robo Head Floating Launcher Button ── */}
      <motion.button
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex items-center gap-3 pl-3 pr-4.5 py-2.5 rounded-full transition-all border shadow-xl ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-indigo-500/40 text-white shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
            : 'bg-gradient-to-r from-white via-indigo-50/50 to-white border-indigo-200 text-slate-900 shadow-[0_12px_32px_rgba(99,102,241,0.22)] hover:border-indigo-400 hover:shadow-[0_16px_36px_rgba(99,102,241,0.3)]'
        }`}
        style={{
          backdropFilter: 'blur(20px)',
        }}
        aria-label="Open Shorai Assistant"
      >
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-sky-400/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xs -z-10" />

        {/* Animated Robo Head Icon */}
        <div className="relative">
          <AnimatedRoboHead size={34} />
          {/* Active online dot */}
          <span className="absolute 0 -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        {/* Button Text */}
        <div className="flex flex-col items-start leading-tight text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold tracking-tight text-slate-900 dark:text-white">
              {isOpen ? 'Close' : 'Shorai Assistant'}
            </span>
            {!isOpen && (
              <Sparkles className="w-3 h-3 text-amber-500 group-hover:rotate-12 transition-transform" />
            )}
          </div>
          <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
            {isOpen ? 'Minimize' : 'Chat & Get in Touch ▸'}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
