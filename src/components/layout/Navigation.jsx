import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      if (currentY < 100) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 10) {
        setVisible(false);
        setMenuOpen(false);
      } else if (currentY < lastScrollY.current - 5) {
        setVisible(true);
      }
      lastScrollY.current = currentY;

      const sections = navItems.map(item => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.getElementById(href.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Animated scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0% 50%',
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '2px',
          zIndex: 10001,
          background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #f59e0b)',
          boxShadow: '0 0 12px rgba(0,212,255,0.6)',
        }}
      />

      {/* Navbar */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -110, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed top-3 left-1/2 z-[999]"
            style={{ transform: 'translateX(-50%)' }}
          >
            {/* Desktop nav */}
            <div
              className="hidden md:flex items-center gap-0.5 px-2.5 py-1.5 rounded-full relative"
              style={{
                background: scrolled ? 'rgba(8,10,20,0.82)' : 'rgba(8,10,20,0.55)',
                backdropFilter: 'blur(40px) saturate(200%)',
                WebkitBackdropFilter: 'blur(40px) saturate(200%)',
                border: scrolled ? '1px solid rgba(255,255,255,0.11)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: scrolled
                  ? [
                    '0 8px 40px rgba(0,0,0,0.70)',
                    'inset 0 1px 0 rgba(255,255,255,0.12)',
                    'inset 0 -1px 0 rgba(0,0,0,0.20)',
                    '0 0 0 1px rgba(99,102,241,0.06)',
                  ].join(', ')
                  : [
                    '0 4px 24px rgba(0,0,0,0.45)',
                    'inset 0 1px 0 rgba(255,255,255,0.08)',
                    'inset 0 -1px 0 rgba(0,0,0,0.15)',
                  ].join(', '),
                transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Top reflection line */}
              <div
                className="absolute top-0 left-8 right-8 h-[1px] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
              />

              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    className="relative px-3.5 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    }}
                    whileHover={{ color: '#fff', scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(124,58,237,0.18))',
                          border: '1px solid rgba(0,212,255,0.35)',
                          boxShadow: '0 0 16px rgba(0,212,255,0.15)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                );
              })}

              {/* Divider */}
              <div className="w-px h-5 bg-white/10 mx-1" />

              {/* Hire Me CTA */}
              <motion.a
                href="mailto:harshitkumar4840@gmail.com"
                className="relative px-3.5 py-1.5 rounded-full text-sm font-semibold text-white ml-1 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
                whileHover={{ scale: 1.06, boxShadow: '0 4px 24px rgba(0,212,255,0.45)' }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                />
                <span className="relative z-10">Hire Me</span>
              </motion.a>
            </div>

            {/* Mobile nav */}
            <motion.div
              className="md:hidden flex items-center gap-3 px-3.5 py-2.5 rounded-full"
              style={{
                background: 'rgba(5,5,5,0.9)',
                backdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Logo / initials */}
              <span
                className="text-white font-bold text-sm px-1"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="gradient-text">HK</span>
              </span>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col gap-1 p-1"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-[1.5px] bg-white origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-[1.5px] bg-white"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-[1.5px] bg-white origin-center"
                />
              </button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile fullscreen menu — enhanced */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[998] flex items-center justify-center md:hidden"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(30px)' }}
          >
            {/* Decorative orbs inside menu */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)', filter: 'blur(60px)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)', filter: 'blur(60px)' }} />

            <div className="flex flex-col items-center gap-8 relative">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(item.href)}
                  className="text-3xl font-bold text-white/60 hover:text-white transition-all duration-300 relative group"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.href.replace('#', '') && (
                    <motion.span
                      layoutId="mobile-active"
                      className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{ background: '#00d4ff', boxShadow: '0 0 10px #00d4ff' }}
                    />
                  )}
                  {item.label}
                </motion.button>
              ))}

              {/* CTA in mobile menu */}
              <motion.a
                href="mailto:harshitkumar4840@gmail.com"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.07 + 0.1 }}
                className="mt-4 px-8 py-3 rounded-full font-semibold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', fontFamily: 'Space Grotesk, sans-serif' }}
                whileHover={{ scale: 1.06, boxShadow: '0 4px 30px rgba(0,212,255,0.5)' }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
