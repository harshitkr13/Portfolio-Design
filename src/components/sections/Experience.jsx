import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { experience, education } from '../../data/portfolio';

/* ═══════════════════════════════════════════
   STORY ARC — visual journey display
═══════════════════════════════════════════ */
const storyArc = [
  { label: 'CS Student',      color: '#00d4ff' },
  { label: 'CP Specialist',   color: '#f59e0b' },
  { label: 'Full-Stack Dev',  color: '#7c3aed' },
  { label: 'AI Engineer',     color: '#10b981' },
  { label: 'Future SWE',      color: '#00d4ff' },
];

function StoryArc({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="flex items-center justify-center flex-wrap gap-0 mb-16"
    >
      {storyArc.map((node, i) => (
        <div key={node.label} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap"
            style={{
              background: `${node.color}10`,
              border: `1px solid ${node.color}30`,
              color: node.color,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: node.color, boxShadow: `0 0 6px ${node.color}` }}
            />
            {node.label}
          </motion.div>
          {i < storyArc.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              className="w-6 h-px mx-1 origin-left"
              style={{ background: `linear-gradient(90deg, ${node.color}50, ${storyArc[i + 1].color}50)` }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   EXPERIENCE ITEM — premium glass card
═══════════════════════════════════════════ */
function ExperienceItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5 mb-6"
    >
      {/* ── Timeline spine ── */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        {/* Milestone dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
          className="relative w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${item.color}dd, ${item.color}55)`,
            boxShadow: `0 0 16px ${item.color}60, 0 0 32px ${item.color}25, inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-1.5 rounded-full"
            style={{ border: `1px solid ${item.color}35` }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.4 }}
          />
          {/* Inner highlight */}
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.8)' }}
          />
        </motion.div>

        {/* Connector line with travelling photon */}
        {!isLast && (
          <div className="relative flex-1 w-px mt-2 overflow-hidden" style={{ minHeight: 40 }}>
            {/* Static line */}
            <motion.div
              className="absolute inset-0"
              initial={{ scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.35, duration: 0.6 }}
              style={{
                background: `linear-gradient(to bottom, ${item.color}55, ${item.color}18, transparent)`,
              }}
            />
            {/* Photon */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-[3px] h-6 rounded-full"
              style={{
                background: `linear-gradient(to bottom, transparent, ${item.color}, transparent)`,
                boxShadow: `0 0 8px ${item.color}`,
              }}
              animate={inView ? { y: ['-100%', '400%'] } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1.5,
                delay: index * 0.3 + 0.6,
                ease: 'easeInOut',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Glass card ── */}
      <motion.div
        className="flex-1 rounded-2xl relative overflow-hidden mb-4 cursor-default"
        style={{
          background: 'linear-gradient(160deg, rgba(14,14,28,0.7), rgba(5,5,15,0.8))',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px) saturate(160%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{
          y: -4,
          boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.55), 0 0 50px ${item.color}12, inset 0 1px 0 rgba(255,255,255,0.07)`,
          transition: { duration: 0.3 },
        }}
      >
        {/* Top prismatic edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent 10%, ${item.color}90, ${item.color}40, transparent 90%)` }}
        />

        {/* Inner sheen */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
        />

        {/* Cursor spotlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: hovered
              ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${item.color}0d, transparent 70%)`
              : 'transparent',
            transition: 'background 0.15s ease',
          }}
        />

        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full"
          style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}30)` }}
          animate={hovered ? { opacity: 1, scaleY: 1 } : { opacity: 0.35, scaleY: 0.4 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner status dot */}
        <div
          className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: item.color,
            boxShadow: hovered ? `0 0 10px ${item.color}, 0 0 20px ${item.color}50` : `0 0 6px ${item.color}60`,
            opacity: hovered ? 1 : 0.45,
          }}
        />

        {/* ── Card content ── */}
        <div className="p-6 pl-7">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              {/* Type badge */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}35`,
                    color: item.color,
                  }}
                >
                  {item.type}
                </span>
              </div>
              {/* Role title */}
              <h3
                className="font-display font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(15px, 2vw, 18px)', letterSpacing: '-0.015em' }}
              >
                {item.title}
              </h3>
              {/* Company */}
              <p className="text-sm font-mono mt-1" style={{ color: `${item.color}cc` }}>
                {item.company}
              </p>
            </div>

            {/* Duration chip */}
            <div className="flex-shrink-0">
              <span
                className="text-xs px-3 py-1.5 rounded-full font-mono whitespace-nowrap"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {item.duration}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed mb-4 pl-0">
            {item.description}
          </p>

          {/* Highlights */}
          <div className="space-y-2 mb-5">
            {item.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.45 + i * 0.05 }}
                className="flex items-start gap-3 text-sm"
              >
                <motion.span
                  style={{ color: item.color, flexShrink: 0, marginTop: '2px' }}
                  animate={hovered ? { x: [0, 2, 0] } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  ◆
                </motion.span>
                <span className="text-white/60 leading-snug">{h}</span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div
            className="h-px mb-4"
            style={{ background: `linear-gradient(90deg, ${item.color}20, transparent)` }}
          />

          {/* Bottom row — Tech chips + Impact */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            {/* Tech chips */}
            {item.tech && (
              <div className="flex flex-wrap gap-1.5">
                {item.tech.map(t => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Impact metric */}
            {item.impact && (
              <motion.div
                className="flex items-center gap-2 flex-shrink-0"
                animate={hovered ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <span
                  className="text-[10px] px-2.5 py-1 rounded-full font-mono font-semibold"
                  style={{
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}40`,
                    color: item.color,
                  }}
                >
                  ↑ {item.impact}
                </span>
              </motion.div>
            )}
          </div>

          {/* Growth tag */}
          {item.growth && (
            <motion.div
              className="mt-3 flex items-start gap-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              <span className="text-[10px] font-mono text-white/25 mt-px uppercase tracking-wider flex-shrink-0">
                Growth →
              </span>
              <span
                className="text-[11px] font-mono italic"
                style={{ color: `${item.color}80` }}
              >
                {item.growth}
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   EDUCATION ITEM — matching premium glass
═══════════════════════════════════════════ */
function EducationItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5"
    >
      {/* Spine dot */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="relative w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${item.color}dd, ${item.color}55)`,
            boxShadow: `0 0 16px ${item.color}60, inset 0 1px 0 rgba(255,255,255,0.3)`,
          }}
        >
          <motion.div
            className="absolute -inset-1.5 rounded-full"
            style={{ border: `1px solid ${item.color}30` }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.8)' }} />
        </motion.div>
      </div>

      {/* Glass card */}
      <motion.div
        className="flex-1 rounded-2xl relative overflow-hidden cursor-default"
        style={{
          background: 'linear-gradient(160deg, rgba(14,14,28,0.7), rgba(5,5,15,0.8))',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px) saturate(160%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{
          y: -4,
          boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.55), 0 0 50px ${item.color}12, inset 0 1px 0 rgba(255,255,255,0.07)`,
          transition: { duration: 0.3 },
        }}
      >
        {/* Top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent 10%, ${item.color}90, ${item.color}40, transparent 90%)` }}
        />
        {/* Sheen */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.05) 0%, transparent 50%)' }}
        />
        {/* Cursor spotlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: hovered
              ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${item.color}0d, transparent 70%)`
              : 'transparent',
            transition: 'background 0.15s ease',
          }}
        />
        {/* Left bar */}
        <motion.div
          className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full"
          style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}30)` }}
          animate={hovered ? { opacity: 1, scaleY: 1 } : { opacity: 0.35, scaleY: 0.4 }}
          transition={{ duration: 0.3 }}
        />

        <div className="p-6 pl-7">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}35`,
                    color: item.color,
                  }}
                >
                  B.Tech · CSE
                </span>
              </div>
              <h3
                className="font-display font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(15px, 2vw, 18px)', letterSpacing: '-0.015em' }}
              >
                {item.degree}
              </h3>
              <p className="text-sm font-mono mt-0.5" style={{ color: `${item.color}cc` }}>
                {item.field}
              </p>
              <p className="text-sm text-white/40 mt-0.5">{item.institution}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <motion.div
                className="text-2xl font-display font-bold leading-none"
                style={{ color: item.color }}
                animate={hovered ? { textShadow: `0 0 24px ${item.color}80` } : { textShadow: 'none' }}
                transition={{ duration: 0.3 }}
              >
                {item.cgpa}
              </motion.div>
              <div className="text-[10px] text-white/30 font-mono mt-1">CGPA</div>
              <div className="text-[10px] text-white/25 font-mono mt-1">{item.duration}</div>
            </div>
          </div>

          {/* Coursework chips */}
          <div
            className="h-px mb-4"
            style={{ background: `linear-gradient(90deg, ${item.color}20, transparent)` }}
          />
          <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2">Core Coursework</p>
          <div className="flex flex-wrap gap-1.5">
            {item.coursework.map(c => (
              <motion.span
                key={c}
                className="text-[10px] px-2.5 py-1 rounded-full font-mono"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)',
                }}
                whileHover={{
                  background: `${item.color}12`,
                  borderColor: `${item.color}35`,
                  color: item.color,
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION DIVIDER
═══════════════════════════════════════════ */
function SectionDivider({ label, color, inView, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="flex items-center gap-4 mb-8"
    >
      <motion.span
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color}40)` }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.1, duration: 0.8 }}
      />
      <span
        className="text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-2"
        style={{ color: `${color}80` }}
      >
        <div className="w-1 h-1 rounded-full" style={{ background: color }} />
        {label}
        <div className="w-1 h-1 rounded-full" style={{ background: color }} />
      </span>
      <motion.span
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to left, transparent, ${color}40)` }}
        initial={{ scaleX: 0, originX: 1 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.1, duration: 0.8 }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   RECRUITER BADGE — closing statement
═══════════════════════════════════════════ */
function RecruiterBadge({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="mt-12 flex justify-center"
    >
      <div
        className="relative px-8 py-5 rounded-2xl max-w-lg w-full text-center overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, rgba(14,14,28,0.7), rgba(5,5,15,0.8))',
          border: '1px solid rgba(0,212,255,0.15)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(0,212,255,0.06)',
        }}
      >
        {/* Top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.7), transparent)' }}
        />
        {/* Sheen */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.04) 0%, transparent 50%)' }}
        />
        <div className="relative z-10">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">
            Engineering Readiness
          </p>
          <p className="text-white/80 text-sm leading-relaxed">
            Strong{' '}
            <span style={{ color: '#10b981' }}>AI engineering</span>,{' '}
            <span style={{ color: '#7c3aed' }}>full-stack architecture</span>, and{' '}
            <span style={{ color: '#f59e0b' }}>algorithmic depth</span>{' '}
            — ready to contribute to an engineering team from day one.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════ */
export default function Experience() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: '-40px' });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* ── Parallax ambient background ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.06), transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute bottom-20 right-1/4 w-[600px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.05), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-[400px] h-[300px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.04), transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </motion.div>

      <div className="max-w-3xl mx-auto px-6">
        {/* ── Section header ── */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// Engineering Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-0.02em' }}
          >
            Engineering <span className="gradient-text">Trajectory</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm max-w-md mx-auto"
          >
            From first principles to production systems — a journey built through
            consistent practice, real projects, and measurable results.
          </motion.p>
        </div>

        {/* ── Story arc ── */}
        <StoryArc inView={headerInView} />

        {/* ── Professional divider ── */}
        <SectionDivider
          label="Professional Experience"
          color="#00d4ff"
          inView={headerInView}
          delay={0.15}
        />

        {/* ── Experience cards ── */}
        {experience.map((item, i) => (
          <ExperienceItem
            key={item.id}
            item={item}
            index={i}
            isLast={i === experience.length - 1}
          />
        ))}

        {/* ── Education divider ── */}
        <SectionDivider
          label="Education"
          color="#7c3aed"
          inView={headerInView}
          delay={0.25}
        />

        {/* ── Education cards ── */}
        {education.map((item, i) => (
          <EducationItem key={item.id} item={item} index={i} />
        ))}

        {/* ── Closing badge ── */}
        <div ref={footerRef}>
          <RecruiterBadge inView={footerInView} />
        </div>
      </div>
    </section>
  );
}
