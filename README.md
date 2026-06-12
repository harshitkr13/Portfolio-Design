# 🌌 Futuristic Developer Portfolio

A premium, interactive, and high-fidelity developer portfolio built to showcase advanced technical capabilities, algorithm rankings, and production-grade applications. Tailored specifically for **Harshit Kumar**, a Full-Stack & Generative AI Engineer, and LeetCode Knight (1907 Rating, Top 4.23% Globally).

Developed with **React, Vite, Tailwind CSS, Framer Motion, GSAP, and Three.js (React Three Fiber)**.

---

## ✨ Design & Experience Highlights

- **🔮 Premium Glassmorphism:** Utilizes a custom glassmorphism color palette, multi-stop atmospheric glows, dynamic overlays, and micro-reflective layers that simulate real glass.
- **✨ Interactive Spotlight & Parallax:** Hovering over project cards triggers cursor-following radial gradient spotlights, 3D card tilt transformations, scanline sweeps, and section-level parallax backdrops.
- **⚡ Performance First:** Built on top of **Vite** and styled using modular utilities for lightning-fast loads, sub-second Hot Module Replacement (HMR), and efficient production builds.
- **📱 Fluid Responsiveness:** A design system optimized for all screen sizes, from mobile screens to ultrawide monitors.
- **🌐 Smooth Interactivity:** Utilizes **Lenis** smooth scrolling alongside custom Framer Motion transitions for elegant transitions.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 19 (Functional Components, Hooks)
- **Build System:** Vite 8 (Highly-optimized builds & tree shaking)
- **Styling & Design System:** Tailwind CSS, PostCSS, and Custom CSS variables
- **Animations & Visual Effects:** 
  - **Framer Motion:** Micro-interactions, spring physics, dynamic entry transitions, and scroll-bound animations.
  - **Three.js & React Three Fiber (@react-three/fiber & @react-three/drei):** 3D background elements and postprocessing effects.
  - **GSAP (GreenSock Animation Platform):** High-precision timeline orchestration.
- **Iconography:** Lucide React & custom SVG pathing.

---

## 📂 Project Structure

```bash
Portfolio/
├── public/                 # Static assets (images, logos, resume)
├── src/
│   ├── assets/             # Vector graphics and UI elements
│   ├── components/
│   │   ├── layout/         # Navigation, Header, Footer
│   │   ├── sections/       # Hero, About, Projects, Experience, Stats, Contact
│   │   └── ui/             # Reusable animated buttons, cards, spotlights
│   ├── data/
│   │   └── portfolio.js    # Centralized data model (projects, stats, skills)
│   ├── App.css             # Main styling rules
│   ├── App.jsx             # Section layout and main page container
│   ├── index.css           # Global CSS variables, custom animations, Tailwind directives
│   └── main.jsx            # Application entry point
├── package.json            # Scripts & project dependencies
├── tailwind.config.js      # Custom themes, spacing, and brand animations
└── vite.config.js          # Vite configuration and plugins
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v18+ recommended) and **npm** installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshitkr13/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the portfolio.

4. **Build the production bundle:**
   ```bash
   npm run build
   ```
   This generates a highly-optimized, static `dist` folder ready for deployment on platforms like Vercel, Netlify, or GitHub Pages.

---

## 👨‍💻 Author & Contributions

- **Name:** Harshit Kumar
- **GitHub:** [@harshitkr13](https://github.com/harshitkr13)
- **LinkedIn:** [Harshit Kumar](https://www.linkedin.com/in/harshit-kumar-85b0542a6/)
- **Email:** harshitkumar4840@gmail.com
