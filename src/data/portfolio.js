// ============================================================
//  PORTFOLIO DATA — Harshit Kumar
// ============================================================

export const personalInfo = {
  name: "Harshit Kumar",
  firstName: "Harshit",
  lastName: "Kumar",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Generative AI Engineer",
    "Problem Solver",
  ],
  headline: "Building AI-Powered Applications, Scalable Systems & Exceptional User Experiences",
  subheadline: "LeetCode Knight (1907 Rating, Top 4.23% Globally) specializing in Full-Stack Development, Generative AI, and Scalable Software Systems.",
  bio: "I am a Computer Science undergraduate specializing in Full-Stack Development and Generative AI. I build production-ready web applications using React, Node.js, MongoDB, FastAPI, and modern AI frameworks. My passion lies in solving challenging engineering problems, designing scalable systems, and transforming complex ideas into intuitive user experiences.",
  location: "Kolkata, West Bengal, India",
  email: "harshitkumar4840@gmail.com",
  phone: "+91 7301172455",
  github: "https://github.com/harshitkr13",
  linkedin: "https://www.linkedin.com/in/harshit-kumar-85b0542a6/",
  resumeUrl: "#", // Replace with actual resume URL
};

export const stats = [
  { value: 500, suffix: "+", label: "DSA Problems Solved", icon: "🧩", color: "#00d4ff" },
  { value: 1907, suffix: "", label: "LeetCode Rating", icon: "⚡", color: "#7c3aed" },
  { value: 4.23, suffix: "%", label: "Top Global Ranking", prefix: "Top ", icon: "🏆", color: "#f59e0b" },
  { value: 335, suffix: "+", label: "GFG Problems Solved", icon: "🎯", color: "#10b981" },
  { value: 40, suffix: "%", label: "Reduction in AI Errors", icon: "🤖", color: "#f59e0b" },
  { value: 35, suffix: "%", label: "Reduction in Validation Failures", icon: "✅", color: "#10b981" },
  { value: 8.0, suffix: "/10", label: "CGPA", icon: "🎓", color: "#00d4ff" },
  { value: 7042, suffix: "", label: "AIR — WBJEE 2023", prefix: "AIR ", icon: "📊", color: "#7c3aed" },
];

export const skills = {
  Languages: [
    { name: "C++", level: 90, color: "#00d4ff" },
    { name: "Python", level: 88, color: "#7c3aed" },
    { name: "Java", level: 80, color: "#f59e0b" },
    { name: "JavaScript", level: 92, color: "#10b981" },
    { name: "SQL", level: 82, color: "#00d4ff" },
  ],
  Frontend: [
    { name: "React.js", level: 93, color: "#00d4ff" },
    { name: "HTML5", level: 95, color: "#f59e0b" },
    { name: "CSS3", level: 90, color: "#7c3aed" },
    { name: "Tailwind CSS", level: 92, color: "#10b981" },
    { name: "Chart.js", level: 78, color: "#00d4ff" },
  ],
  Backend: [
    { name: "Node.js", level: 90, color: "#10b981" },
    { name: "Express.js", level: 88, color: "#00d4ff" },
    { name: "Django", level: 80, color: "#7c3aed" },
    { name: "FastAPI", level: 85, color: "#f59e0b" },
    { name: "REST APIs", level: 92, color: "#10b981" },
  ],
  "AI & GenAI": [
    { name: "LangChain", level: 85, color: "#7c3aed" },
    { name: "RAG", level: 83, color: "#00d4ff" },
    { name: "OpenAI API", level: 88, color: "#10b981" },
    { name: "Gemini API", level: 85, color: "#f59e0b" },
    { name: "Prompt Engineering", level: 87, color: "#7c3aed" },
  ],
  Databases: [
    { name: "MongoDB", level: 88, color: "#10b981" },
    { name: "MySQL", level: 82, color: "#00d4ff" },
  ],
  Tools: [
    { name: "Git", level: 92, color: "#f59e0b" },
    { name: "GitHub", level: 93, color: "#00d4ff" },
    { name: "Docker", level: 78, color: "#7c3aed" },
    { name: "Postman", level: 88, color: "#10b981" },
    { name: "Vercel", level: 85, color: "#00d4ff" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "AlgoForge",
    tagline: "AI-Powered DSA Coding Platform",
    description: "A full-stack coding platform inspired by LeetCode that combines adaptive assessments, AI-powered evaluation, automated test generation, and detailed solution analysis. Built for scale with a Dockerized microservices architecture.",
    longDescription: "Full-stack competitive coding platform combining AI-powered code evaluation, multi-language support, automated test case generation, and real-time analytics. Features Monaco Editor, Google OAuth, and a custom AI evaluation pipeline that reduced validation errors by 35%.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "FastAPI", "Docker", "Monaco Editor", "Google OAuth 2.0"],
    metrics: [
      { label: "Faster Integration", value: "40%" },
      { label: "Fewer Validation Errors", value: "35%" },
      { label: "Edge Cases Tested", value: "200+" },
    ],
    achievements: [
      "Reduced feature integration time by 40%",
      "Reduced solution validation errors by 35%",
      "Built multi-language AI evaluation pipeline",
      "Dockerized scalable microservices architecture",
      "Integrated Google OAuth 2.0 authentication",
    ],
    github: "https://github.com/harshitkr13/AlgoForge",
    live: "#",
    image: "/algoforge.png",
    color: "#00d4ff",
    featured: true,
  },
  {
    id: 2,
    title: "AI Study Planner",
    tagline: "Smart Learning Assistant Using RAG",
    description: "An AI-powered learning platform that leverages OpenAI, Gemini, and LangChain to generate quizzes, summarize PDFs, and provide personalized study assistance with Retrieval-Augmented Generation.",
    longDescription: "Intelligent study platform powered by RAG architecture. Integrates OpenAI and Google Gemini APIs through LangChain to deliver context-aware quiz generation, PDF summarization, and personalized learning paths. Includes analytics dashboard and secure JWT authentication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "LangChain", "OpenAI API", "Gemini API", "JWT Authentication", "Chart.js"],
    metrics: [
      { label: "Better AI Response Accuracy", value: "40%" },
    ],
    achievements: [
      "Reduced irrelevant AI responses by 40%",
      "Built secure JWT authentication system",
      "Created comprehensive analytics dashboard",
      "Implemented production-grade RAG architecture",
    ],
    github: "https://github.com/harshitkr13/Study-Helper",
    live: "#",
    image: "/studyplanner.png",
    color: "#7c3aed",
    featured: true,
  },
];

export const experience = [
  {
    id: 1,
    title: "Competitive Programmer & Software Developer",
    company: "Self-Directed Engineering",
    duration: "2022 — Present",
    type: "Technical Excellence",
    description: "Consistently competing and excelling across global programming platforms while building production-ready software projects.",
    highlights: [
      "LeetCode Knight with rating 1907 — Top 4.23% globally",
      "Solved 500+ DSA problems across major platforms",
      "Contest Rank 496 among 30,000+ participants",
      "Active on CodeChef, Codeforces, and GeeksforGeeks",
      "Strong foundation in System Design and Software Engineering",
      "Built production-ready AI-powered web applications",
    ],
    color: "#00d4ff",
  },
];

export const education = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Techno Main Salt Lake",
    duration: "2023 — 2027",
    cgpa: "8.0 / 10",
    location: "Kolkata, West Bengal",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Object-Oriented Programming",
      "Software Engineering",
    ],
    color: "#7c3aed",
  },
];

export const achievements = [
  {
    id: 1,
    platform: "LeetCode",
    title: "Knight Badge",
    subtitle: "Rating: 1907 · Top 4.23% Globally",
    details: ["500+ Problems Solved", "Contest Rank 496 among 30,000+", "Knight Badge Achieved"],
    icon: "⚡",
    color: "#f59e0b",
    badge: "Knight",
  },
  {
    id: 2,
    platform: "GeeksforGeeks",
    title: "3-Star Coder",
    subtitle: "Rating: 1819 · Top 4% at Institute",
    details: ["335+ Problems Solved", "3-Star Rating", "Institute Rank Top 4%"],
    icon: "🌿",
    color: "#10b981",
    badge: "3-Star",
  },
  {
    id: 3,
    platform: "WBJEE 2023",
    title: "AIR 7042",
    subtitle: "Top 6% among 120,000 Candidates",
    details: ["All India Rank 7042", "Top 6% nationally", "120,000+ candidates"],
    icon: "🏆",
    color: "#00d4ff",
    badge: "AIR 7042",
  },
];

export const certifications = [
  {
    id: 1,
    title: "Programming in Java",
    issuer: "NPTEL",
    grade: "Elite + Gold",
    score: "93%",
    icon: "☕",
    color: "#f59e0b",
  },
  {
    id: 2,
    title: "Database Management Systems",
    issuer: "NPTEL",
    grade: "Elite",
    score: "71%",
    icon: "🗄️",
    color: "#00d4ff",
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    grade: "Certified",
    score: "Passed",
    icon: "☁️",
    color: "#7c3aed",
  },
];
