export interface SiteContent {
  home: {
    hero: {
      badge: string;
      titleLine1: string;
      titleGradient: string;
      tagline: string;
      subtitle: string;
      primaryButtonText: string;
      secondaryButtonText: string;
    };
    whatIsShorai: {
      badge: string;
      title: string;
      titleGradient: string;
      leadSentence: string;
      description1: string;
      description2: string;
      imageUrl: string;
      deliverables: Array<{ title: string }>;
    };
    whySchoolsNeedShorai: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
      reasons: Array<{ title: string; desc: string }>;
      insights: Array<{ stat: string; label: string; desc: string }>;
    };
    innovationLabs: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
      labs: Array<{
        id: string;
        title: string;
        subtitle: string;
        tag: string;
        image: string;
      }>;
    };
    testimonials: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
      reviews: Array<{
        id: number;
        name: string;
        grade: string;
        project: string;
        quote: string;
        tag: string;
      }>;
    };
    getInTouch: {
      badge: string;
      titleLine1: string;
      titleGradient: string;
      subtitle: string;
      formTitle: string;
      formSubtitle: string;
    };
  };

  whyShorai: {
    hero: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
      primaryButtonText: string;
      secondaryButtonText: string;
    };
    banner: {
      badge: string;
      title: string;
      titleGradient: string;
      narrative: string;
      quote: string;
      bottomStatement: string;
    };
    atShoraiWeBuild: {
      badge: string;
      title: string;
      subtitle: string;
      droneTitle: string;
      droneDesc: string;
      aiTitle: string;
      aiDesc: string;
      codingTitle: string;
      codingDesc: string;
      roverTitle: string;
      roverDesc: string;
    };
    ecosystem360: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
    };
    futureSkills: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
    };
    finalCta: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
      primaryButtonText: string;
      secondaryButtonText: string;
    };
  };

  schools: {
    hero: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
    };
    curriculum: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
      levels: Array<{
        grades: string;
        tier: string;
        description: string;
        topics: string[];
      }>;
    };
    comparison: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
    };
    partnershipTracks: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
      tracks: Array<{
        name: string;
        tagline: string;
        badge?: string;
        features: string[];
      }>;
    };
    methodology: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
    };
    closingCta: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
  };

  about: {
    hero: {
      titleLine1: string;
      titleGradient: string;
      titleLine2: string;
      quote: string;
      mission: string;
      primaryButtonText: string;
      secondaryButtonText: string;
    };
    segAcademy: {
      badge: string;
      title: string;
      titleGradient: string;
      narrative1: string;
      narrative2: string;
      quote: string;
    };
    impact: {
      stat1Value: string;
      stat1Label: string;
      stat2Value: string;
      stat2Label: string;
      stat3Value: string;
      stat3Label: string;
    };
    meetTeam: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
    };
    closingCta: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
  };

  contact: {
    hero: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
    };
    form: {
      badge: string;
      title: string;
      subtitle: string;
    };
    directReach: {
      title: string;
      subtitle: string;
      phone1: string;
      phone1Label: string;
      phone2: string;
      phone2Label: string;
      email: string;
      emailLabel: string;
      hours: string;
    };
    reachUs: {
      badge: string;
      title: string;
      titleGradient: string;
      subtitle: string;
    };
    locations: {
      varanasiTitle: string;
      varanasiSubtitle: string;
      varanasiAddress: string;
      varanasiPhone: string;
      varanasiEmail: string;
      kolkataTitle: string;
      kolkataSubtitle: string;
      kolkataAddress: string;
      kolkataPhone: string;
      kolkataEmail: string;
    };
  };

  footer: {
    brandName: string;
    tagline: string;
    segEndorsement: string;
    cin: string;
    copyrightText: string;
  };
}

export const defaultSiteContent: SiteContent = {
  home: {
    hero: {
      badge: 'AN EDUCATION INNOVATION INITIATIVE BY SEG ACADEMY',
      titleLine1: 'BUILDING FUTURE',
      titleGradient: 'INNOVATORS',
      tagline: 'AI • ROBOTICS • STEM • CODING • INNOVATION LABS',
      subtitle: 'We empower K-12 students with practical, project-based STEM education, real robotics kits, interactive 3D learning, and industry-grade innovation labs.',
      primaryButtonText: 'Transform Your School',
      secondaryButtonText: 'Explore 3D Labs',
    },
    whatIsShorai: {
      badge: 'INTRODUCING SHORAI',
      title: 'WHAT IS ',
      titleGradient: 'SHORAI?',
      leadSentence: 'The Next-Generation STEM, Robotics & AI Innovation Ecosystem for Future-Ready Schools.',
      description1: 'Developed as a flagship education innovation initiative by SEG Academy, SHORAI bridges the critical gap between traditional school curricula and the technological demands of the 21st century.',
      description2: 'We empower K-12 schools with complete turnkey infrastructure, practical kits, and certified training to transform everyday classrooms into advanced technological beacons.',
      imageUrl: '/images/robotics_teacher_smart_class.jpg',
      deliverables: [
        { title: 'Turnkey Robotics & AI Labs' },
        { title: 'NEP 2020 K-12 Curriculum' },
        { title: 'Autonomous Drones & Code' },
        { title: 'Master Faculty Certification' },
      ],
    },
    whySchoolsNeedShorai: {
      badge: 'THE CRUCIAL NEED',
      title: 'WHY SCHOOLS NEED ',
      titleGradient: 'SHORAI',
      subtitle: 'Traditional education teaches theory. Shorai provides the physical infrastructure, teacher enablement, and experiential learning tools to prepare students for tomorrow.',
      reasons: [
        { title: 'Turnkey 30-Day Setup', desc: 'Complete physical lab transformation with zero operational burden on school management.' },
        { title: 'Grade 1-12 Curriculum', desc: 'Structured progressive STEM pedagogy aligned with CBSE, ICSE, and NEP 2020 standards.' },
        { title: 'Dedicated Master Trainers', desc: 'Full-time, certified on-campus robotics faculty provided and managed by Shorai.' },
        { title: 'National Competition Mentoring', desc: 'Hands-on mentoring for World Robot Olympiad (WRO), ATL Marathons, and Hackathons.' },
      ],
      insights: [
        { stat: '9 in 10', label: 'Parents Demand Future Skills', desc: 'Parents actively seek schools that provide hands-on AI & robotics education.' },
        { stat: '77%', label: 'Jobs Require Digital Skills', desc: 'Nearly 80% of future job roles will require coding, automation & digital literacy.' },
        { stat: '65%', label: 'Brand-New Job Types', desc: 'Students today will work in careers and technology domains that don’t even exist yet.' },
        { stat: '2X', label: 'Higher Career Growth', desc: 'Students with early practical STEM exposure are twice as likely to excel in high-growth industries.' },
      ],
    },
    innovationLabs: {
      badge: 'INNOVATION LABS',
      title: 'WHERE STUDENTS ',
      titleGradient: 'BUILD THE FUTURE',
      subtitle: 'Explore our 4 flagship school lab environments designed for experiential discovery.',
      labs: [
        {
          id: 'ai',
          title: 'AI & Machine Learning Lab',
          subtitle: 'Neural Nets • Computer Vision • Predictive Models',
          tag: 'AI LAB',
          image: '/images/shorai-quadrant-ai.jpg',
        },
        {
          id: 'drone',
          title: 'Drone & Aerospace Aviation Lab',
          subtitle: 'Aeromodelling • UAV Flight Telemetry • LiDAR',
          tag: 'DRONE LAB',
          image: '/images/shorai-quadrant-drone.jpg',
        },
        {
          id: 'robotics',
          title: 'Robotics & Automation Lab',
          subtitle: '6-Axis Arms • Microcontrollers • Mechatronics',
          tag: 'ROBOTICS LAB',
          image: '/images/shorai-quadrant-robotics.jpg',
        },
        {
          id: 'coding',
          title: 'Coding & Software Engineering Lab',
          subtitle: 'Python • Logic Compilers • IoT Cloud Systems',
          tag: 'CODING LAB',
          image: '/images/shorai-quadrant-coding.jpg',
        },
      ],
    },
    testimonials: {
      badge: 'HEAR FROM OUR YOUNG INNOVATORS',
      title: 'What Students Say About ',
      titleGradient: 'Shorai Labs',
      subtitle: 'Real stories from young inventors who transformed theoretical concepts into working robots, drones, and AI algorithms.',
      reviews: [
        {
          id: 1,
          name: 'Aarav Sharma',
          grade: 'Grade 9 • DPS Delhi',
          project: 'Solar Rover',
          quote: 'Soldering my own microcontroller and coding an autonomous obstacle rover was the best part of this semester!',
          tag: 'Robotics',
        },
        {
          id: 2,
          name: 'Ananya Deshmukh',
          grade: 'Grade 10 • NPS Bangalore',
          project: 'Delivery Drone',
          quote: 'Assembling drone flight controllers and learning aerodynamics in our school lab inspired me to pursue aerospace.',
          tag: 'Drones',
        },
        {
          id: 3,
          name: 'Meera Iyer',
          grade: 'Grade 11 • DAV Pune',
          project: 'Bionic AI Arm',
          quote: 'Building neural network models on real cameras during our Shorai AI lab gave me hands-on practical AI skills.',
          tag: 'AI & Vision',
        },
        {
          id: 4,
          name: 'Rohan Verma',
          grade: 'Grade 8 • St. Jude’s High',
          project: 'Smart IoT Sensor',
          quote: 'The mentors guided us step-by-step from breadboard wiring to live cloud telemetry dashboards.',
          tag: 'IoT & Sensors',
        },
      ],
    },
    getInTouch: {
      badge: 'CONNECT WITH SHORAI',
      titleLine1: 'Get in ',
      titleGradient: 'Touch.',
      subtitle: 'Have questions or ready to launch an AI & Robotics innovation lab on your campus? Reach out to our STEM team today.',
      formTitle: 'Schedule a School Lab Consultation',
      formSubtitle: 'Tell us about your campus and we will prepare an NEP-compliant proposal.',
    },
  },

  whyShorai: {
    hero: {
      badge: 'THE FUTURE OF STEM EDUCATION // POWERED BY SHORAI',
      title: 'WHY SCHOOLS CHOOSE ',
      titleGradient: 'SHORAI LABS',
      subtitle: 'Empowering schools across India with world-class AI, Autonomous Drone, 6-Axis Robotics & Modern Coding Labs.',
      primaryButtonText: 'Book School Demonstration',
      secondaryButtonText: 'Explore Lab Packages',
    },
    banner: {
      badge: 'SHORAI ECOSYSTEM',
      title: 'Why Shorai ',
      titleGradient: 'for Schools',
      narrative: 'Shorai bridges the gap between classroom learning and real-world innovation by providing a comprehensive future-skills ecosystem. Through hands-on experiences, industry-aligned programs, and modern learning solutions, we empower students to become creators, problem-solvers, and future leaders.',
      quote: 'The best time to prepare for the future was yesterday. The next best time is RIGHT NOW.',
      bottomStatement: 'The world is changing faster than ever, driven by Artificial Intelligence, automation, digital transformation, and emerging technologies. Today\'s students need more than traditional education—they need practical skills, innovative thinking, and the confidence to thrive in a technology-driven future.',
    },
    atShoraiWeBuild: {
      badge: 'INTERACTIVE 3D LAB EXPERIENCES',
      title: 'AT SHORAI, we build.',
      subtitle: 'Interact directly with live 3D models of the autonomous drones, neural AI architectures, code compilers, and planetary Mars rovers built and coded by K-12 students.',
      droneTitle: 'Autonomous Drone Simulator',
      droneDesc: 'Avionics, LiDAR mapping, and aerodynamic flight physics for Grades 6-12.',
      aiTitle: 'AI Neural Network Inspector',
      aiDesc: 'Convolutional neural networks, computer vision, and machine learning models.',
      codingTitle: 'Robot Logic & Code Compiler',
      codingDesc: 'Block-to-Python real-time compiler with embedded hardware execution.',
      roverTitle: 'Mars Rover Explorer & Radar',
      roverDesc: '6-wheel Rocker-Bogie chassis with sampling arm and obstacle avoidance radar.',
    },
    ecosystem360: {
      badge: 'HOLISTIC STEM IMPLEMENTATION',
      title: 'Shorai 360° ',
      titleGradient: 'Education Ecosystem',
      subtitle: 'A complete 360-degree integration framework empowering schools with equipment, syllabus, master faculty, competitions, and LMS.',
    },
    futureSkills: {
      badge: 'COMPREHENSIVE FUTURE SKILLS',
      title: 'Skills That Transform ',
      titleGradient: 'Students into Creators',
      subtitle: 'Master essential modern disciplines from robotics and neural vision to aeromodelling and IoT systems.',
    },
    finalCta: {
      badge: 'INSTITUTIONAL ACCELERATION',
      title: 'THE FUTURE WON\'T ',
      titleGradient: 'BUILD ITSELF.',
      subtitle: 'Equip your school and students with turnkey robotics labs, NEP-aligned curricula, and hands-on AI sandboxes to lead tomorrow\'s world.',
      primaryButtonText: 'To know more about us contact us',
      secondaryButtonText: 'Explore Shorai Labs',
    },
  },

  schools: {
    hero: {
      badge: 'INSTITUTIONAL ROADMAP • TRANSFORMATION',
      title: 'TRANSFORM YOUR CAMPUS INTO A ',
      titleGradient: 'FUTURE-READY STEM HUB.',
      subtitle: 'A turnkey, frictionless 5-step implementation lifecycle that integrates AI, Robotics, Coding, and teacher enablement into your school within 30 days.',
    },
    curriculum: {
      badge: 'GRADE-WISE PEDAGOGY',
      title: 'Structured K-12 STEM Curriculum',
      titleGradient: 'Continuous Learning Journey',
      subtitle: 'Progressive learning pathways designed for every stage of student development from pre-primary to senior high.',
      levels: [
        {
          grades: 'Grades 1 – 2',
          tier: 'Foundation Stage',
          description: 'Introduction to computational logic, visual sequencing, and tangible robotic manipulatives.',
          topics: ['Visual Block Sequencing', 'Basic Sensor Exploration', 'Spatial Kinematics', 'Story-Driven STEM Challenges'],
        },
        {
          grades: 'Grades 3 – 5',
          tier: 'Explorers Stage',
          description: 'Sensor-driven robotics, modular electronics, and visual-to-syntax block compilation.',
          topics: ['Block-to-Code Compilers', 'Ultrasonic & IR Sensors', 'Smart Motor Control', 'Game Design Logic'],
        },
        {
          grades: 'Grades 6 – 8',
          tier: 'Innovators Stage',
          description: 'Autonomous microcontrollers, Python programming, IoT breadboarding, and UAV flight physics.',
          topics: ['Embedded Python Programming', 'Microcontroller Architecture', 'IoT Smart Home Prototypes', 'Drone Flight Physics'],
        },
        {
          grades: 'Grades 9 – 12',
          tier: 'Advanced Engineers',
          description: 'Computer vision CNNs, autonomous planetary rovers, edge AI computing, and hackathons.',
          topics: ['Computer Vision & OpenCV', 'Neural Network Architectures', 'Autonomous UAV Piloting', 'Olympiad & Hackathon Projects'],
        },
      ],
    },
    comparison: {
      badge: 'BEYOND BASIC VENDORS',
      title: 'Not a Vendor. A Dedicated ',
      titleGradient: 'Transformation Partner.',
      subtitle: 'Compare traditional hardware kit providers with Shorai\'s 360-degree institutional transformation model.',
    },
    partnershipTracks: {
      badge: 'FLEXIBLE COLLABORATION',
      title: 'Three Ways to Begin ',
      titleGradient: 'Your Partnership',
      subtitle: 'Tailored engagement models to match your school infrastructure, student strength, and academic vision.',
      tracks: [
        {
          name: 'Spark Track (Curriculum & Enablement)',
          tagline: 'Ideal for schools with existing lab infrastructure',
          features: [
            'Complete Grade 1-12 NEP 2020 Syllabus',
            'Teacher Training & Master Certification',
            'Digital Workbooks & Lesson Plans',
            'Quarterly Academic Review & Audits',
          ],
        },
        {
          name: 'Ignite Track (Turnkey Lab Setup)',
          tagline: 'Complete physical lab fitout & hardware deployment',
          badge: 'MOST POPULAR',
          features: [
            'Robotics, AI, Drone & Coding Hardware Kits',
            '30-Day Complete Lab Interior & Branded Fitout',
            'Full-Time On-Campus Dedicated Trainer',
            'Shorai AI Learning Platform (LMS) Access',
            'Annual Maintenance & Component Replacement',
          ],
        },
        {
          name: 'Nexus Track (Center of Excellence)',
          tagline: 'The ultimate flagship STEM & Robotics campus',
          features: [
            'All Turnkey Lab Hardware & Dual Dedicated Trainers',
            'Autonomous UAV Flight Arena & Mars Rover Testbed',
            'International Olympiad & WRO Mentoring',
            'Student Incubation & Patent Filing Guidance',
            'Exclusive Annual STEM Expo & Hackathon Hosting',
          ],
        },
      ],
    },
    methodology: {
      badge: '5-STEP DEPLOYMENT ROADMAP',
      title: 'From Day 1 to Full Launch in ',
      titleGradient: '30 Days.',
      subtitle: 'A structured, battle-tested school onboarding methodology executed with precision and zero academic disruption.',
    },
    closingCta: {
      title: 'Ready To Schedule Your School Transformation Audit?',
      subtitle: 'Our master STEM consultants will assess your campus, design an NEP-compliant lab layout, and customize a proposal tailored for your student strength.',
      buttonText: 'To know more about us contact us',
    },
  },

  about: {
    hero: {
      titleLine1: 'SCHOOL ',
      titleGradient: 'INNOVATION',
      titleLine2: '& FUTURE SKILLS',
      quote: 'A future-school ecosystem designed to connect technology, teachers, student development and innovation.',
      mission: 'Empowering Young Minds with Technology, Creativity & Confidence.',
      primaryButtonText: 'Connect With Shorai',
      secondaryButtonText: 'Why Shorai',
    },
    segAcademy: {
      badge: 'OUR HERITAGE & FOUNDATION',
      title: 'About ',
      titleGradient: 'SEG Academy',
      narrative1: 'Skill and Employability Generation Academy (SEG Academy) was established with a singular vision: to empower students with industry-relevant skills and foster genuine technological literacy.',
      narrative2: 'SHORAI is a subsidiary brand of SEG ACADEMY and our specialized institutional initiative, delivering turnkey STEM, AI, and Robotics innovation hubs to forward-thinking schools across India.',
      quote: 'We don\'t just supply equipment; we build a continuous culture of hands-on invention that elevates the school\'s reputation and students\' futures.',
    },
    impact: {
      stat1Value: '360°',
      stat1Label: 'Complete School Transformation Model',
      stat2Value: '12+',
      stat2Label: 'Future Skills Technology Domains',
      stat3Value: '1000+',
      stat3Label: 'Young Innovators Empowered',
    },
    meetTeam: {
      badge: 'LEADERSHIP & PEDAGOGY EXPERTS',
      title: 'Meet the Minds Behind ',
      titleGradient: 'Shorai & SEG Academy',
      subtitle: 'A collective of senior educators, roboticists, AI researchers, and institutional mentors dedicated to transforming classroom learning.',
    },
    closingCta: {
      title: 'Partner With SEG Academy & Shorai Today',
      subtitle: 'Let\'s build an innovation lab on your campus and empower your students with 21st-century technological fluency.',
      buttonText: 'To know more about us',
    },
  },

  contact: {
    hero: {
      badge: 'CONNECT & PARTNER',
      title: 'GET IN TOUCH WITH ',
      titleGradient: 'SHORAI',
      subtitle: 'Have questions about setting up a Robotics & AI Lab in your school? Fill out the form below or visit our innovation centers.',
    },
    form: {
      badge: 'DIRECT REACH OUT',
      title: 'Send Us a Message',
      subtitle: 'Our STEM education advisors will get back to you within 24 hours.',
    },
    directReach: {
      title: 'Direct Reach Out',
      subtitle: 'Prefer direct communication? Connect with our senior education consultants right away:',
      phone1: '+91 78806 30963',
      phone1Label: 'Direct Phone / Helpline',
      phone2: '+91 97899 44439',
      phone2Label: 'Institutional Advisory',
      email: 'contact@shorai.in',
      emailLabel: 'Official Inquiries',
      hours: 'Monday – Saturday: 9:00 AM – 6:30 PM IST',
    },
    reachUs: {
      badge: 'OUR LOCATIONS',
      title: 'HOW TO ',
      titleGradient: 'REACH US',
      subtitle: 'Visit our innovation headquarters and experience center to test live robotics workstations, AI neural kits, and flight simulation bays.',
    },
    locations: {
      varanasiTitle: 'SEG Academy / SHORAI Innovation Hub',
      varanasiSubtitle: 'Advanced STEM Development Center & Robotics Research Facility',
      varanasiAddress: '59/98, 3rd floor, Sampoornand, UBI Building, Sigra - Mahmoorganj Rd, Mahmoorganj, Varanasi, UP 221010',
      varanasiPhone: '+91 7880630963',
      varanasiEmail: 'contact@shorai.in',
      kolkataTitle: 'Innovation & STEM HQ // Kolkata',
      kolkataSubtitle: 'Eastern Region Institutional Partnerships & Curriculum Development',
      kolkataAddress: '119/114, Ramkrishna Road, Khudiram, Khardaha, Kolkata, West Bengal 700116',
      kolkataPhone: '+91 7880630963',
      kolkataEmail: 'contact@shorai.in',
    },
  },

  footer: {
    brandName: 'SHORAI',
    tagline: 'Building Future Innovators',
    segEndorsement: 'Skill and Employability Generation Academy (SEG Academy)',
    cin: 'U80902UP2020PTC139035',
    copyrightText: 'SHORAI • Skill and Employability Generation Academy. All Rights Reserved.',
  },
};
