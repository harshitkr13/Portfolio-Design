import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import CustomCursor from './components/layout/CustomCursor';
import FloatingParticles from './components/ui/FloatingParticles';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Stats from './components/sections/Stats';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';

/* Thin shimmer divider between sections */
function SectionDivider({ color = '#00d4ff', reverse = false }) {
  return (
    <div className="relative h-px overflow-visible pointer-events-none" style={{ zIndex: 5 }}>
      <div
        className="absolute inset-0"
        style={{
          background: reverse
            ? `linear-gradient(90deg, transparent, ${color}50, transparent)`
            : `linear-gradient(90deg, transparent, ${color}30, transparent)`,
        }}
      />
      {/* Dot at center */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    /* Lenis smooth scroll */
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        return () => lenis.destroy();
      } catch {
        console.warn('Lenis smooth scroll not available');
      }
    };
    initLenis();
  }, []);

  return (
    <div className="relative bg-[#050505] min-h-screen overflow-x-hidden">
      {/* ── Global deep-space ambient background ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Primary purple nebula — top left */}
        <motion.div
          className="absolute top-0 left-1/4 w-[900px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.12), transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cyan nebula — bottom right */}
        <motion.div
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.08), transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{ x: [0, -25, 0], y: [0, -20, 0], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        {/* Amber accent — center right */}
        <motion.div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.05), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ y: [0, -40, 0], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        />
      </div>

      {/* Particles */}
      <FloatingParticles />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main sections */}
      <main className="relative" style={{ zIndex: 10 }}>
        <Hero />
        <SectionDivider color="#7c3aed" />
        <Stats />
        <SectionDivider color="#00d4ff" reverse />
        <About />
        <SectionDivider color="#f59e0b" />
        <Skills />
        <SectionDivider color="#00d4ff" reverse />
        <Projects />
        <SectionDivider color="#10b981" />
        <Experience />
        <SectionDivider color="#f59e0b" reverse />
        <Achievements />
        <SectionDivider color="#00d4ff" />
        <Contact />
      </main>
    </div>
  );
}
