export const siteConfig = {
  name: 'SHORAI',
  brandFullName: 'SHORAI STEM LABS',
  tagline: 'Building Future Innovators with AI & Robotics',
  initiative: 'An Initiative by Skill and Employability Generation Academy (SEG Academy)',
  cin: 'U80902WB2021PTC247995',
  url: 'https://www.shorai.in',
  
  contact: {
    phone: '+91 7880630963',
    phoneDisplay: '+91 7880630963',
    whatsapp: '+91 7880630963',
    whatsappUrl: 'https://wa.me/917880630963?text=Hi%20Shorai%20Team%2C%20I%20am%20interested%20in%20setting%20up%20a%20Robotics%20%26%20AI%20Innovation%20Lab%20at%20our%20school.',
    whatsappSchoolUrl: 'https://wa.me/917880630963?text=Hi%20Shorai%20Team%2C%20I%20would%20like%20to%20request%20an%20on-campus%20STEM%20Lab%20demo.',
    email: 'contact@shorai.in',
    segEmail: 'info@segacademy.com',
    segWebsite: 'https://www.segacademy.in',
    hours: 'Mon – Sat: 9:00 AM – 6:00 PM IST',
  },

  locations: {
    varanasi: {
      tag: 'SEG ACADEMY CENTER',
      title: 'Skill and Employability Generation Academy',
      subtitle: 'Workshops • Training • Placements (CIN: U80902WB2021PTC247995)',
      address: '59/98, 3rd floor, Sampoornand, UBI Building, Sigra - Mahmoorganj Rd, Near Punjab National Bank Mahmoorganj ATM, Mahmoorganj, Varanasi, Uttar Pradesh 221010',
      email: 'info@segacademy.com',
      website: 'www.segacademy.in',
      mapUrl: 'https://maps.app.goo.gl/qvjXQxgRQHyB5vqLA',
      embedMapUrl: 'https://maps.google.com/maps?q=59%2F98%2C+3rd+floor%2C+Sampoornand%2C+UBI+Building%2C+Sigra+-+Mahmoorganj+Rd%2C+Mahmoorganj%2C+Varanasi%2C+Uttar+Pradesh+221010&t=&z=16&ie=UTF8&iwloc=&output=embed',
    },
    kolkata: {
      tag: 'INNOVATION & STEM LABS HQ',
      title: 'Shorai STEM Innovation Center',
      subtitle: 'Robotics, AI & Autonomous Drone Research Campus',
      address: '119/114, Ramkrishna Road, Khudiram, Khardaha, Kolkata, North 24 Parganas, West Bengal 700116',
      email: 'contact@shorai.in',
      website: 'www.shorai.in',
      mapUrl: 'https://maps.google.com/?q=Ramkrishna+Road,+Khardaha,+Kolkata+700116',
      embedMapUrl: 'https://maps.google.com/maps?q=Ramkrishna+Road,+Khardaha,+Kolkata+700116&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
  },

  social: {
    instagram: 'https://www.instagram.com/shorai.in?utm_source=qr&igsh=cW9odDRpemNqd2x2',
    linkedin: 'https://www.linkedin.com/company/shorai.in',
    youtube: 'https://youtube.com/@shorai-stem',
    facebook: 'https://facebook.com/shorai.stem',
  },

  programOptions: [
    'School Lab Setup (AI & Robotics)',
    'Complete Shorai 360° Ecosystem',
    'K-12 STEM Curriculum Partnership',
    'Autonomous Drone Technology & Aviation',
    'Teacher Enablement & Certification',
    'Student Hackathon & Competition Mentoring',
    'General Institutional Inquiry',
  ],

  pages: {
    home: {
      title: 'Shorai | AI, Robotics & Autonomous Drone STEM Labs for Schools',
      description: 'Turnkey NEP 2020 aligned AI, Robotics, Drone & Coding Labs for modern schools across India. Powered by SEG Academy.',
    },
    about: {
      title: 'About Us | Shorai - Powered by SEG Academy',
      description: 'Learn about Shorai and SEG Academy Pvt. Ltd., empowering over 10,000 students and leading educational transformation.',
    },
    whyShorai: {
      title: 'Why Shorai | 360° Future-Ready School Ecosystem',
      description: 'Explore why schools choose Shorai for experiential STEM education, AI Learning Platform (LMS), and hands-on innovation labs.',
    },
    schools: {
      title: 'Shorai for Schools | Turnkey STEM Transformation & Partnership Tracks',
      description: 'Comprehensive 30-day turnkey school transformation, Grade 1-12 STEM curriculum, and customizable partnership tracks for schools.',
    },
    labs: {
      title: 'Innovation Labs | Robotics, AI, Drone & Coding Infrastructure',
      description: 'State-of-the-art turnkey hardware, modular electronics, autonomous UAV flight simulators, and AI computing stations.',
    },
    contact: {
      title: 'Contact Us | Schedule On-Campus School Lab Consultation',
      description: 'Connect with our academic directors to request an on-campus demonstration, NEP lab audit, or curriculum consultation.',
    },
    gallery: {
      title: 'Campus Gallery & Stories | Shorai STEM Inventions & Lab Milestones',
      description: 'Explore real moments from partner school campuses across India — students building autonomous drones, robotics kits, and turnkey lab inaugurations.',
    },
    blog: {
      title: 'Blog & Insights | K-12 STEM, NEP 2020 & Robotics Education Radar',
      description: 'Editorial thought leadership on NEP 2020 frameworks, experiential STEM pedagogy, and AI robotics curriculum for Indian schools.',
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
