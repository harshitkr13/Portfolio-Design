import { useRef, useState, useCallback } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion';
import { projects } from '../../data/portfolio';

/* ═══════════════════════════════════════════
   SHARED GLASS TOKENS (mirrors Hero system)
═══════════════════════════════════════════ */
const cardGlass = {
  idle: {
    background: 'linear-gradient(160deg, rgba(14,14,28,0.70) 0%, rgba(5,5,15,0.80) 100%)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: [
      '0 2px 4px rgba(0,0,0,0.35)',
      '0 8px 32px rgba(0,0,0,0.40)',
      'inset 0 1px 0 rgba(255,255,255,0.08)',
      'inset 0 -1px 0 rgba(0,0,0,0.20)',
    ].join(', '),
  },
};

/* ─── Scanline + image layer ─── */
function ImageLayer({ project, isHovered }) {
  return (
    <div className="relative overflow-hidden" style={{ height: '240px' }}>
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.07 : 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Multi-stop gradient overlay — creates depth between image and content */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(5,5,15,0.05) 0%,
            rgba(5,5,15,0.20) 50%,
            rgba(5,5,15,0.96) 100%
          )`,
        }}
      />

      {/* Color tint on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isHovered ? 0.12 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: project.color, mixBlendMode: 'overlay' }}
      />

      {/* Scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-[1.5px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}90, transparent)` }}
        animate={isHovered ? { top: ['0%', '100%'], opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Corner brackets */}
      <motion.div
        className="absolute inset-3 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {[
          { top: 0, left: 0, borderTop: true, borderLeft: true },
          { top: 0, right: 0, borderTop: true, borderRight: true },
          { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
          { bottom: 0, right: 0, borderBottom: true, borderRight: true },
        ].map((corner, i) => (
          <div
            key={i}
            className="absolute w-4 h-4"
            style={{
              ...corner,
              borderTopWidth:    corner.borderTop    ? '1.5px' : 0,
              borderBottomWidth: corner.borderBottom ? '1.5px' : 0,
              borderLeftWidth:   corner.borderLeft   ? '1.5px' : 0,
              borderRightWidth:  corner.borderRight  ? '1.5px' : 0,
              borderStyle: 'solid',
              borderColor: `${project.color}CC`,
            }}
          />
        ))}
      </motion.div>

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 left-4">
          <span
            className="text-[10px] font-mono px-3 py-1 rounded-full"
            style={{
              background: `${project.color}18`,
              border: `1px solid ${project.color}45`,
              color: project.color,
              backdropFilter: 'blur(12px)',
              boxShadow: `0 0 16px ${project.color}20`,
              letterSpacing: '0.08em',
            }}
          >
            ✦ Featured
          </span>
        </div>
      )}

      {/* Icon links */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
        transition={{ duration: 0.25 }}
        className="absolute top-4 right-4 flex gap-2"
      >
        {[
          { href: project.github, label: 'GitHub', icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          )},
          ...(project.live !== '#' ? [{ href: project.live, label: 'Live', icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          )}] : []),
        ].map(({ href, label, icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, boxShadow: `0 4px 16px rgba(0,0,0,0.5)` }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl"
            style={{
              background: 'rgba(5,5,15,0.88)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)',
            }}
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Single Project Card ─── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]),  { stiffness: 300, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 40 });
  const lightX  = useTransform(mouseX, [-0.5, 0.5], ['15%', '85%']);
  const lightY  = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%']);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.90, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-3xl cursor-none overflow-hidden"
      >
        {/* ── PREMIUM GLASS CARD BASE ── */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: isHovered
              ? `linear-gradient(160deg, rgba(20,20,40,0.80) 0%, rgba(8,8,20,0.90) 100%)`
              : cardGlass.idle.background,
            border: isHovered
              ? `1px solid ${project.color}45`
              : cardGlass.idle.border,
            boxShadow: isHovered
              ? [
                '0 2px 4px rgba(0,0,0,0.40)',
                '0 20px 60px rgba(0,0,0,0.60)',
                '0 40px 100px rgba(0,0,0,0.35)',
                `0 0 80px ${project.color}18`,
                'inset 0 1px 0 rgba(255,255,255,0.12)',
                'inset 0 -1px 0 rgba(0,0,0,0.35)',
              ].join(', ')
              : cardGlass.idle.boxShadow,
            transition: 'border-color 0.4s ease, box-shadow 0.45s ease, background 0.4s ease',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          }}
        >
          {/* Inner glass sheen — the "real glass" feel */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl z-10"
            style={{
              background: 'linear-gradient(175deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 30%, transparent 55%, rgba(0,0,0,0.08) 100%)',
            }}
          />

          {/* Cursor-following spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
            style={{
              background: useTransform(
                [lightX, lightY],
                ([lx, ly]) => `radial-gradient(circle at ${lx} ${ly}, ${project.color}20 0%, transparent 55%)`
              ),
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.30s ease',
            }}
          />

          {/* Top prismatic edge on hover */}
          <motion.div
            className="absolute top-0 left-[8%] right-[8%] h-[1px] pointer-events-none z-20 rounded-full"
            animate={{ opacity: isHovered ? 1 : 0, scaleX: isHovered ? 1 : 0.4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}CC, transparent)`,
              boxShadow: `0 0 12px ${project.color}60`,
              transformOrigin: '50% 0',
            }}
          />

          {/* Moving shimmer sweep on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
            }}
            animate={isHovered ? { backgroundPosition: ['-200% 0', '200% 0'] } : {}}
            transition={{ duration: 1.4, ease: 'linear', repeat: isHovered ? Infinity : 0, repeatDelay: 0.8 }}
          />

          {/* Image with effects */}
          <ImageLayer project={project} isHovered={isHovered} />

          {/* ── CONTENT ── */}
          <div className="p-7 relative z-20">
            {/* Title row */}
            <div className="mb-4">
              <h3
                className="font-display font-bold text-xl mb-1"
                style={{
                  color: '#f0f4ff',
                  letterSpacing: '-0.02em',
                  textShadow: isHovered ? `0 0 30px ${project.color}30` : 'none',
                  transition: 'text-shadow 0.4s',
                }}
              >
                {project.title}
              </h3>
              <p className="text-sm font-mono" style={{ color: project.color, filter: `drop-shadow(0 0 8px ${project.color}60)` }}>
                {project.tagline}
              </p>
            </div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.48)' }}>
              {project.description}
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2.5 mb-5">
              {project.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  className="flex flex-col px-3 py-2 rounded-xl relative overflow-hidden"
                  style={{
                    background: `${project.color}08`,
                    border: `1px solid ${project.color}22`,
                    boxShadow: `inset 0 1px 0 ${project.color}15`,
                  }}
                  whileHover={{
                    scale: 1.04,
                    background: `${project.color}14`,
                    boxShadow: `0 4px 16px ${project.color}25, inset 0 1px 0 ${project.color}20`,
                  }}
                  transition={{ duration: 0.18 }}
                >
                  <span className="font-display font-bold text-lg" style={{ color: project.color, lineHeight: 1, filter: `drop-shadow(0 0 6px ${project.color}50)` }}>
                    {m.value}
                  </span>
                  <span className="text-[10px] text-white/35 leading-tight mt-0.5 font-mono">{m.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map((t, i) => (
                <motion.span
                  key={t}
                  className="text-[11px] px-2.5 py-1 rounded-full font-mono relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.45)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  whileHover={{
                    background: `${project.color}10`,
                    borderColor: `${project.color}35`,
                    color: '#fff',
                    boxShadow: `0 0 12px ${project.color}20`,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex gap-3">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold font-display relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: 'rgba(255,255,255,0.68)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{
                  background: `${project.color}12`,
                  borderColor: `${project.color}38`,
                  color: '#fff',
                  boxShadow: `0 4px 20px ${project.color}22, inset 0 1px 0 ${project.color}20`,
                  y: -1,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                {/* Top glass highlight */}
                <div className="absolute top-0 left-6 right-6 h-[1px]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.75 }}>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </motion.a>

              {project.live && project.live !== '#' && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold font-display text-white relative overflow-hidden"
                  style={{
                    background: `linear-gradient(130deg, ${project.color}90, ${project.color}50)`,
                    border: `1px solid ${project.color}50`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 16px ${project.color}25`,
                  }}
                  whileHover={{
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.20), 0 8px 28px ${project.color}45`,
                    y: -1,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  {/* Inner glass sheen */}
                  <div className="absolute inset-0 rounded-xl"
                    style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.12) 0%, transparent 50%)' }} />
                  <span className="relative">Live Demo</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION
═══════════════════════════════════════════ */
export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">

      {/* ── Parallax atmospheric background ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {/* Left nebula */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '10%', left: '-15%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Right nebula */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            bottom: '10%', right: '-15%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Center ambient glow */}
        <div
          className="absolute w-[500px] h-[300px] rounded-full"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// Featured Projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.08, duration: 0.80, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            Products I've{' '}
            <span className="gradient-text">Engineered</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.20 }}
            className="max-w-lg mx-auto text-sm"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            Production-ready applications with measurable impact, built for scale
          </motion.p>
        </div>

        {/* ── Project Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://github.com/harshitkr13"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-semibold font-display text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(14,14,28,0.70) 0%, rgba(5,5,15,0.80) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(24px) saturate(180%)',
              boxShadow: [
                'inset 0 1px 0 rgba(255,255,255,0.10)',
                'inset 0 -1px 0 rgba(0,0,0,0.15)',
                '0 4px 20px rgba(0,0,0,0.35)',
              ].join(', '),
            }}
            whileHover={{
              background: 'linear-gradient(160deg, rgba(0,212,255,0.08) 0%, rgba(99,102,241,0.08) 100%)',
              borderColor: 'rgba(0,212,255,0.28)',
              y: -2,
              boxShadow: [
                'inset 0 1px 0 rgba(255,255,255,0.12)',
                '0 12px 40px rgba(0,0,0,0.45)',
                '0 0 40px rgba(0,212,255,0.10)',
              ].join(', '),
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            {/* Top glass line */}
            <div className="absolute top-0 left-10 right-10 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }} />

            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.04) 50%, transparent 62%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
            />

            <svg width="17" height="17" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.65 }}>
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="relative">Explore All Projects on GitHub</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.45 }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
