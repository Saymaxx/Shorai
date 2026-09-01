import { BlogData } from '@/types/blog';

export const defaultBlogData: BlogData = {
  authors: [
    {
      id: 'author-sandip',
      name: 'Mr. Sandip',
      role: 'Founding Director & Strategy Lead',
      designation: 'Leadership Team, Shorai & SEG Academy Pvt. Ltd.',
      avatar: '/images/shorai-images/shorai-smart-class-coding-lecture.jpg',
      bio: 'Pioneering future-focused technology education across India with 15+ years of institutional excellence under SEG Academy.',
      linkedinUrl: 'https://linkedin.com',
    },
    {
      id: 'author-asish',
      name: 'Mr. Asish',
      role: 'Head of Academic Ecosystems',
      designation: 'Director of School Partnerships, Shorai',
      avatar: '/images/shorai-images/shorai-robotics-summer-camp-workshop.jpg',
      bio: 'Leading 200+ partner school transformations, teacher enablement programs, and NEP 2020 curriculum integrations across India.',
      linkedinUrl: 'https://linkedin.com',
    },
    {
      id: 'author-ashutosh',
      name: 'Mr. Ashutosh',
      role: 'Chief Technology Architect',
      designation: 'Lead Hardware & Robotics Engineer, Shorai Labs',
      avatar: '/images/shorai-images/shorai-students-robotics-kit-lab.jpg',
      bio: 'Specialist in autonomous drone telemetry, edge AI microcontrollers, and turnkey school lab infrastructure setup.',
      linkedinUrl: 'https://linkedin.com',
    },
    {
      id: 'author-shivam',
      name: 'Mr. Shivam',
      role: 'Lead STEM Pedagogy & WRO Mentor',
      designation: 'Senior Competition & Curriculum Mentor, Shorai',
      avatar: '/images/shorai-images/shorai-matrix-school-robot-team.jpg',
      bio: 'Mentoring student teams to gold medals in national robotics olympiads, hackathons, and Atal Tinkering Marathons.',
      linkedinUrl: 'https://linkedin.com',
    },
  ],

  categories: [
    {
      id: 'cat-nep',
      slug: 'nep-2020-policy',
      name: 'NEP 2020 & Policy',
      description: 'Regulatory mandates, CBSE skill subjects, and Viksit Bharat @2047 frameworks for school leadership.',
      count: 4,
    },
    {
      id: 'cat-robotics',
      slug: 'robotics-ai-labs',
      name: 'Robotics & AI Labs',
      description: 'Hands-on hardware kits, computer vision, and neural network pedagogy.',
      count: 6,
    },
    {
      id: 'cat-pedagogy',
      slug: 'pedagogy-curriculum',
      name: 'Pedagogy & Curriculum',
      description: 'The 5-stage progressive learning journey, 12 skill domains, and lesson plans.',
      count: 5,
    },
    {
      id: 'cat-cases',
      slug: 'school-case-studies',
      name: 'School Case Studies',
      description: 'Real transformation stories and impact metrics from partner schools across India.',
      count: 3,
    },
    {
      id: 'cat-drones',
      slug: 'drone-aviation',
      name: 'Drone & Aviation',
      description: 'Aeromodelling, UAV flight principles, telemetry, and ESC tuning in school labs.',
      count: 4,
    },
  ],

  articles: [
    {
      id: 'art-1',
      slug: 'nep-2020-robotics-coding-mandate-schools-india',
      title: 'How NEP 2020 & Viksit Bharat @2047 are Reshaping STEM, AI, and Robotics in Indian Schools',
      excerpt: 'A comprehensive strategic blueprint for School Principals and Trustees on integrating the 12 Future-Skill Domains and experiential coding into regular academic timetables.',
      category: 'nep-2020-policy',
      categoryName: 'NEP 2020 & Policy',
      tags: ['NEP 2020', 'Viksit Bharat 2047', 'CBSE Guidelines', 'STEM Labs', 'School Leadership'],
      authorId: 'author-sandip',
      coverImage: '/images/shorai-images/shorai-smart-class-coding-lecture.jpg',
      readingTimeMinutes: 6,
      publishedDate: 'August 22, 2026',
      updatedDate: 'August 26, 2026',
      status: 'published',
      featured: true,
      trending: true,
      viewsCount: 1840,
      relatedSchoolSlug: 'dps-varanasi-robotics-ai-ecosystem',
      seo: {
        metaTitle: 'NEP 2020 & Viksit Bharat 2047 Robotics Mandate for Indian Schools | Shorai',
        metaDescription: 'Discover how the National Education Policy (NEP 2020) and Viksit Bharat @2047 require experiential STEM, AI, and robotics labs in K-12 schools across India.',
      },
      content: `## The Paradigm Shift: From Exam Preparation to Future Capability

"Great schools don't just prepare students for exams. They prepare them for the future."

The world is changing faster than ever, driven by Artificial Intelligence, automation, digital transformation, and emerging technologies. Today's students need more than traditional rote instruction—they need practical skills, innovative thinking, and the confidence to thrive in a technology-driven future.

India's long-term vision under **Viksit Bharat @2047** places youth, skills, innovation, and technology at the heart of the nation's journey toward becoming a developed superpower. The question for school leadership is no longer whether technology belongs in education—it is how intelligently and sustainably it is integrated.

### By the Numbers: Why Future-Skills Cannot Wait

Widely cited global and national research reveals urgent trends that school trustees and directors must address:

- **9 in 10 Parents** actively want future skills & technology education integrated into regular school hours.
- **77% of Future Jobs** are projected to require digital fluency and computational problem-solving.
- **65% of Today's Primary Students** will work in entirely new job categories that do not exist today.
- **2× Career Trajectory:** Students with structured early STEM & robotics exposure are 2x more likely to pursue high-growth future careers.

---

## The 12 Future-Skill Domains Every School Needs

Shorai's Future Skills Ecosystem, backed by **SEG Academy's 15+ years of educational excellence**, is structured across twelve interconnected domains:

1. **Robotics:** Design, assemble, and program autonomous robots; master mechanics and motor control.
2. **Artificial Intelligence:** Understand machine learning concepts, computer vision, and build working AI models.
3. **Coding & Programming:** Progressive transition from visual block logic (Scratch/Blockly) to text-based Python and C++.
4. **STEM Activities:** Hands-on integration of Science, Technology, Engineering, and Mathematics principles.
5. **Cyber Security:** Cultivating safe, smart, and responsible digital citizens aware of privacy and digital ethics.
6. **Drone Technology:** Exploring aerodynamic principles, flight mechanics, and telemetry controls.
7. **Internet of Things (IoT):** Connecting smart sensors and microcontrollers to log real-time environmental data.
8. **3D Printing & Design:** Transforming abstract ideas into physical prototypes through additive manufacturing.
9. **AR / VR Experiences:** Immersive spatial simulations that extend experiential learning beyond classroom walls.
10. **Electronics & Microcontrollers:** Understanding circuit theory, breadboard prototyping, and embedded logic.
11. **Design Thinking:** Structured methodology to solve real-world community and industrial problems.
12. **Innovation & Entrepreneurship:** Guiding student models from idea → problem → prototype → value creation.

---

## Transitioning from Isolated Classes to Coordinated 360° Ecosystems

Historically, schools attempted to satisfy technology demands through disconnected after-school clubs or one-off hobby workshops. However, genuine institutional capability requires:

> "From Consumers → To Creators: Students should understand technology well enough to build, question, and improve. From Knowledge → To Capability: Future readiness comes from applying concepts to real situations."

Under the **Shorai 360° Education Ecosystem**, schools receive complete curriculum alignment, modern lab infrastructure, AI-powered LMS tracking, monthly career guidance, continuous teacher enablement, and direct entry into national/international competitions (including WRO and Atal Tinkering Marathons).

Let us build future-ready schools that create future-ready citizens.`,
    },
    {
      id: 'art-2',
      slug: 'shorai-360-ecosystem-vs-traditional-robotics-vendors',
      title: 'Why Rote Robotics Kits Fail: The Shorai 360° Ecosystem vs Traditional Vendor Classrooms',
      excerpt: 'A critical analysis for school leadership on the key differences between superficial kit vendors and an integrated school innovation partnership with dedicated mentors and AI LMS.',
      category: 'pedagogy-curriculum',
      categoryName: 'Pedagogy & Curriculum',
      tags: ['Shorai 360 Ecosystem', 'School Transformation', 'Vendor Comparison', 'STEM Infrastructure'],
      authorId: 'author-asish',
      coverImage: '/images/shorai-images/shorai-students-robotics-kit-lab.jpg',
      readingTimeMinutes: 5,
      publishedDate: 'August 24, 2026',
      updatedDate: 'August 26, 2026',
      status: 'published',
      featured: false,
      trending: true,
      viewsCount: 1250,
      relatedSchoolSlug: 'lucknow-public-school-ai-coding',
      seo: {
        metaTitle: 'Shorai 360° Ecosystem vs Traditional Robotics Vendors | School Guide',
        metaDescription: 'Compare the Shorai complete future-school ecosystem against traditional robotics kit companies. Learn how dedicated trainers, AI LMS, and teacher enablement create lasting impact.',
      },
      content: `## Not Just a Program. A Complete School Transformation.

Across India, many institutions have experienced the disappointment of traditional robotics vendors who supply hardware boxes, conduct a handful of introductory workshops, and leave school faculty stranded with unused equipment.

Schools don't just need technology—they need a partner who transforms technology into meaningful, continuous learning.

### Feature-by-Feature Comparison

| Capability | Traditional Robotics Vendor | Shorai 360° Complete Ecosystem |
| :--- | :--- | :--- |
| **What They Offer** | Just plastic kits / one-time hobby workshops | Complete End-to-End AI, Robotics, STEM, Coding & Innovation Ecosystem |
| **Trainer Support** | Occasional / visiting temporary trainer | Dedicated on-ground trainers & full-time mentors deployed on campus |
| **Curriculum** | Generic, unverified content | Structured, 5-stage, NEP 2020-aligned curriculum from Pre-Primary to Grade 12 |
| **Learning Management** | Not provided | AI-Powered LMS with real-time student tracking, automated reports & parent portals |
| **Teacher Enablement** | None; vendor locks school into dependencies | Continuous teacher training, AI tools for educators, and professional certification |
| **Career & Counselling** | Not included | Monthly career guidance, soft-skills development & industry mentorship |
| **Parent Engagement** | Zero transparency | Termly parent awareness workshops, project showcases & innovation open days |
| **Competitions** | Not a focus | Mentorship for World Robot Olympiad (WRO), Atal Tinkering Marathons & Hackathons |
| **School Branding** | Not provided | Social media, press releases, student success stories & institutional differentiation |
| **Long-Term Impact** | Short-term novelty activity | Future-ready students, deep innovation culture & measurable academic excellence |

---

## Our Core USP: We Build Innovators for Tomorrow

A sustainable future-school model cannot depend entirely on visiting trainers. SHORAI is designed to strengthen the school's own educators while providing dedicated on-ground mentorship.

> "The goal is not to replace teachers with technology. It is to give teachers better tools to prepare students for a rapidly changing world."

### 8 Pillars of the Shorai 360° Model:
1. **NEP 2020 Aligned Curriculum:** Progressive grade-by-grade frameworks.
2. **Turnkey Innovation Labs:** Modular hexagonal workbenches, flight cages, 3D printers, and safety standards.
3. **AI-Powered Learning Platform (LMS):** Real-time skill analytics for students, teachers, and principals.
4. **Teacher Empowerment:** Practical AI tools for lesson planning and classroom workflows.
5. **Project-Based Learning:** Practical experiments that cultivate critical problem-solving.
6. **Competitions & Hackathons:** National and global platforms to showcase student capability.
7. **Career Guidance & Counselling:** Emerging career mapping and soft skills.
8. **Parent Engagement:** Visible evidence of hands-on student projects.`,
    },
    {
      id: 'art-3',
      slug: '10-step-school-implementation-roadmap-30-days',
      title: 'The 10-Step School Transformation Roadmap: From Classroom to Innovation Lab in 30 Days',
      excerpt: 'Explore Shorai’s structured implementation methodology that ensures smooth onboarding, faculty enablement, and zero academic disruption.',
      category: 'school-case-studies',
      categoryName: 'School Case Studies',
      tags: ['Implementation Roadmap', 'Lab Setup', 'Teacher Training', '30 Day Launch'],
      authorId: 'author-ashutosh',
      coverImage: '/images/shorai-images/shorai-robotics-summer-camp-workshop.jpg',
      readingTimeMinutes: 7,
      publishedDate: 'August 25, 2026',
      updatedDate: 'August 26, 2026',
      status: 'published',
      featured: false,
      trending: true,
      viewsCount: 980,
      relatedSchoolSlug: 'kolkata-stem-innovation-center',
      seo: {
        metaTitle: '10-Step School Implementation Roadmap (30 Days) | Shorai',
        metaDescription: 'Step-by-step implementation guide detailing how Shorai transforms school spaces into turnkey AI and robotics labs in 30 days with minimal disruption.',
      },
      content: `## A Proven, Seamless Path to Future-Ready Transformation

Implementing advanced technology infrastructure into an active school campus requires precision, safety compliance, and structured academic integration. 

Shorai follows a battle-tested **10-Step Implementation Roadmap** to ensure smooth onboarding, effective teacher training, and measurable student outcomes with minimal disruption.

---

### The 10-Step Implementation Process

### 01. Discovery Meeting
We meet with the school management, principal, and academic coordinators to understand your institution's vision, current setup, grade strength, and specific goals.
→ *Outcome: Clear understanding of institutional priorities & custom requirements.*

### 02. Needs Assessment
Our technical engineers conduct an on-campus evaluation of electrical infrastructure, room dimensions, student learning levels, and faculty readiness.
→ *Outcome: Comprehensive baseline assessment report.*

### 03. Customised Planning
We design a tailored roadmap covering timetables, grade-wise modules, lab layout blueprints, trainer deployment schedules, and milestone timelines.
→ *Outcome: Personalized school implementation roadmap.*

### 04. Lab Setup & Infrastructure (Turnkey Delivery)
Installation of modular workbenches, robotics component racks, safety gear, 3D printers, AI vision workstations, and drone flight cages.
→ *Outcome: State-of-the-art innovation environment delivered in 21–30 days.*

### 05. Teacher Training & AI Enablement
Rigorous hands-on training for school science and computer faculty in facilitating project-based robotics and leveraging AI tools for lesson planning.
→ *Outcome: Certified, confident educators.*

### 06. Curriculum Roll-out
Structured, grade-wise learning modules seamlessly integrated into the school's weekly academic timetable.
→ *Outcome: Engaging, uninterrupted learning experience.*

### 07. Student Onboarding & Orientation
Exciting orientation sessions, interactive robotics demonstrations, and introductory hands-on challenges for students across grades.
→ *Outcome: High student curiosity, enthusiasm, and engagement.*

### 08. Project & Activity Execution
Students work on real-world collaborative projects—building line-following rovers, environmental IoT sensors, and autonomous drones.
→ *Outcome: Practical knowledge, problem-solving, and creative confidence.*

### 09. Assessment & Progress Tracking via AI-Powered LMS
Continuous skill evaluations, digital attendance, project portfolios, and automated report cards generated through the Shorai LMS.
→ *Outcome: Transparent, measurable growth visible to school leadership and parents.*

### 10. Competitions & Certifications
Student squads are mentored to participate in regional, national, and international competitions (WRO, Atal Tinkering Marathons) and earn certificates.
→ *Outcome: Institutional prestige, awards, and enhanced school branding.*

---

## 3 Engagement Models: Choosing Your School's Track

1. **Track 01: Spark (Foundation Track):** On-campus trainer 1 day/week, Grades 3–8 curriculum, shared kit lab, LMS tracking, annual showcase.
2. **Track 02: Ascend (Growth Track — Recommended):** On-campus trainers 2 days/week, Grades 1–12 curriculum, dedicated Innovation Lab, monthly career guidance, teacher certification, regional competition entries.
3. **Track 03: Pinnacle (Signature Track — Complete Transformation):** Daily on-campus trainer presence, full 360° ecosystem, Drone & Cyber Security modules, national/international WRO mentoring, campus Innovation Fest.

We do not force every school into the same package. Contact us for a free, no-obligation on-campus Discovery Meeting.`,
    },
    {
      id: 'art-4',
      slug: '5-stage-progressive-learning-journey-grade-by-grade',
      title: 'From Early Explorers to Future Leaders: The 5-Stage Progressive Learning Journey',
      excerpt: 'How Shorai structures age-appropriate technology education from Pre-Primary curiosity to Senior Secondary AI, robotics engineering, and entrepreneurship.',
      category: 'pedagogy-curriculum',
      categoryName: 'Pedagogy & Curriculum',
      tags: ['Progressive Curriculum', 'K-12 STEM', 'Age Appropriate Learning', 'Pedagogy'],
      authorId: 'author-shivam',
      coverImage: '/images/shorai-images/shorai-smartboard-ai-vision-coding.jpg',
      readingTimeMinutes: 6,
      publishedDate: 'August 26, 2026',
      updatedDate: 'August 26, 2026',
      status: 'published',
      featured: false,
      trending: false,
      viewsCount: 760,
      relatedSchoolSlug: 'dps-varanasi-robotics-ai-ecosystem',
      seo: {
        metaTitle: '5-Stage Progressive Learning Journey (Grade-Wise) | Shorai',
        metaDescription: 'Explore the 5 progressive learning stages of Shorai curriculum from Pre-Primary play-based robotics to Senior Secondary AI and drone engineering.',
      },
      content: `## Right Learning Today. Limitless Possibilities Tomorrow.

At Shorai, we believe learning must follow a continuous, structured progression. Rote coding exercises alienate young learners; our curriculum pairs tactile exploration with progressively challenging engineering tasks across five distinct educational stages.

Our learning methodology follows a continuous cycle:

> **LEARN → BUILD → TEST → SOLVE → PRESENT**

---

### Stage 01: Pre-Primary (Age 3–5 Years)
- **Focus:** Play-based learning, basic motor skills, logical thinking, spatial awareness, simple making.
- **Key Modules:** Tangible block sequences, directional storytelling, tactile mechanical toys.
- **We Build:** *Curiosity & Confidence.*

### Stage 02: Primary (Grade 1–5)
- **Focus:** Basic coding foundations, fun with robotics, hands-on STEM experiments, visual programming.
- **Key Modules:** Scratch/Blockly animations, basic motorized mechanisms, simple sensor interactions.
- **We Build:** *Interest & Exploration.*

### Stage 03: Middle School (Grade 6–8)
- **Focus:** Transition to text programming, robotics mechanics, electronics circuitry, microcontrollers, AI fundamentals.
- **Key Modules:** Python scripting, Arduino boards, ultrasonic rovers, IoT environmental sensors.
- **We Build:** *Skills & Understanding.*

### Stage 04: Secondary (Grade 9–10)
- **Focus:** Mobile app development, IoT automation, AI computer vision, data analytics, real-world engineering challenges.
- **Key Modules:** Edge ML models, autonomous drone aerodynamics, smart city prototypes, sensor fusion.
- **We Build:** *Application & Innovation.*

### Stage 05: Senior Secondary (Grade 11–12)
- **Focus:** Advanced AI & Machine Learning, robotics engineering, cyber security, patent ideation, entrepreneurship.
- **Key Modules:** Neural network training, UAV telemetry controllers, industry internships, startup modeling.
- **We Build:** *Expertise & Leadership.*

---

## The Teacher is Part of the Technology

Every grade level is supported by comprehensive teacher guides, slide decks, hardware inventories, and automated progress analytics through the Shorai AI LMS.

Every grade is a step closer to a brighter future with SHORAI.`,
    },
  ],
};
