import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

/* ═══════════════════════════════════════════
   JOURNEY DATA
═══════════════════════════════════════════ */
const journey = [
  {
    year: '2023',
    icon: '🎓',
    title: 'B.Tech CSE — Techno Main Salt Lake',
    description: 'Began Computer Science Engineering with a focus on DSA, OOP, and software engineering fundamentals. CGPA: 8.0/10.',
    color: '#00d4ff',
    tag: 'Education',
  },
  {
    year: '2023',
    icon: '⚡',
    title: 'Competitive Programming',
    description: 'Dived deep into competitive programming. Built consistency across LeetCode, CodeChef, and GeeksforGeeks — solving 500+ problems.',
    color: '#f59e0b',
    tag: 'CP',
  },
  {
    year: '2024',
    icon: '🚀',
    title: 'Full-Stack Engineering',
    description: 'Built production-ready MERN stack applications with REST API design, secure auth flows, and scalable backend architecture.',
    color: '#7c3aed',
    tag: 'Engineering',
  },
  {
    year: '2024',
    icon: '🤖',
    title: 'Generative AI Engineering',
    description: 'Mastered LangChain, RAG pipelines, OpenAI and Gemini APIs. Built AI-powered products that reduced errors by 35–40%.',
    color: '#10b981',
    tag: 'AI / GenAI',
  },
  {
    year: '2025',
    icon: '🏆',
    title: 'LeetCode Knight — Top 4.23% Globally',
    description: 'Achieved Knight badge with 1907 rating. Contest Rank 496 among 30,000+ participants. A milestone in algorithmic excellence.',
    color: '#f59e0b',
    tag: 'Milestone',
  },
  {
    year: '2025',
    icon: '🛠️',
    title: 'AlgoForge & AI Study Planner',
    description: 'Shipped two flagship products: an AI-powered DSA platform and an intelligent study assistant — both production-deployed with measurable impact.',
    color: '#00d4ff',
    tag: 'Products',
  },
];

/* ─── Identity stats — recruiter-instant scan ─── */
const identityStats = [
  { label: 'Institution',   value: 'Techno Main SL', icon: '🎓', color: '#00d4ff' },
  { label: 'CGPA',          value: '8.0 / 10',       icon: '📊', color: '#10b981' },
  { label: 'LeetCode',      value: 'Knight · 1907',  icon: '⚡', color: '#f59e0b' },
  { label: 'Problems',      value: '500+ Solved',    icon: '🧩', color: '#7c3aed' },
  { label: 'Speciality',    value: 'AI + Full-Stack', icon: '🤖', color: '#10b981' },
  { label: 'Location',      value: 'Kolkata, India', icon: '📍', color: '#00d4ff' },
];

/* ═══════════════════════════════════════════
   JOURNEY CARD — premium glass treatment
═══════════════════════════════════════════ */
function JourneyCard({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay: index * 0.10, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5"
    >
      {/* ── Timeline spine ── */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '40px' }}>

        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.10 + 0.18, type: 'spring', stiffness: 280, damping: 22 }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-base z-10 relative flex-shrink-0"
          style={{
            background: `radial-gradient(circle at 40% 35%, ${item.color}30 0%, ${item.color}10 60%, transparent 100%)`,
            border: `1px solid ${item.color}50`,
            boxShadow: [
              `0 0 0 4px ${item.color}08`,
              `0 0 20px ${item.color}25`,
              `inset 0 1px 0 ${item.color}40`,
            ].join(', '),
          }}
        >
          {item.icon}

          {/* Glow ripple */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${item.color}50` }}
            animate={{ scale: [1, 1.9], opacity: [0.55, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Connector glow line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.10 + 0.40, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 mt-2 relative"
            style={{ width: '1px', transformOrigin: 'top', minHeight: '32px' }}
          >
            {/* Base line */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${item.color}55 0%, ${item.color}18 60%, transparent 100%)`,
              }}
            />
            {/* Travelling photon */}
            <motion.div
              className="absolute left-0 right-0 h-4 rounded-full"
              style={{ background: `linear-gradient(to bottom, transparent, ${item.color}70, transparent)` }}
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.5 + 1, ease: 'linear', repeatDelay: 2 }}
            />
          </motion.div>
        )}
      </div>

      {/* ── Glass card ── */}
      <motion.div
        className="flex-1 mb-7 rounded-2xl relative overflow-hidden group cursor-default"
        style={{
          background: 'linear-gradient(160deg, rgba(14,14,28,0.65) 0%, rgba(5,5,15,0.75) 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: [
            '0 2px 4px rgba(0,0,0,0.30)',
            '0 8px 32px rgba(0,0,0,0.35)',
            'inset 0 1px 0 rgba(255,255,255,0.07)',
          ].join(', '),
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        }}
        whileHover={{
          background: `linear-gradient(160deg, rgba(20,20,40,0.72) 0%, rgba(8,8,20,0.82) 100%)`,
          borderColor: `${item.color}38`,
          boxShadow: [
            '0 2px 4px rgba(0,0,0,0.35)',
            '0 16px 48px rgba(0,0,0,0.50)',
            `0 0 60px ${item.color}10`,
            `inset 0 1px 0 ${item.color}18`,
          ].join(', '),
          y: -3,
          transition: { duration: 0.30, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {/* Inner glass sheen */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: 'linear-gradient(175deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 30%, transparent 55%)',
          }}
        />

        {/* Top prismatic edge — appears on hover */}
        <motion.div
          className="absolute top-0 left-[10%] right-[10%] h-[1px] pointer-events-none rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.color}BB, transparent)`,
            boxShadow: `0 0 8px ${item.color}50`,
          }}
          initial={{ opacity: 0, scaleX: 0.3 }}
          whileHover={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Card content */}
        <div className="p-5 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-[10px] font-mono px-2.5 py-0.5 rounded-full"
              style={{
                background: `${item.color}12`,
                border: `1px solid ${item.color}30`,
                color: item.color,
                letterSpacing: '0.06em',
              }}
            >
              {item.tag}
            </span>
            <span
              className="text-[10px] font-mono"
              style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.06em' }}
            >
              {item.year}
            </span>
          </div>

          <h3
            className="text-base font-semibold mb-2 font-display"
            style={{ color: '#f0f4ff', letterSpacing: '-0.01em' }}
          >
            {item.title}
          </h3>

          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.46)' }}>
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   IDENTITY STAT CHIP
═══════════════════════════════════════════ */
function StatChip({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.60, delay: 0.30 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl relative overflow-hidden group cursor-default"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.60) 0%, rgba(5,5,15,0.70) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.07)',
          '0 4px 16px rgba(0,0,0,0.30)',
        ].join(', '),
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Top sheen */}
      <div
        className="absolute top-0 left-4 right-4 h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }}
      />
      {/* Hover tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100"
        style={{ background: `${stat.color}06`, transition: 'opacity 0.25s ease' }}
      />

      <span className="text-base" style={{ filter: `drop-shadow(0 0 6px ${stat.color}50)` }}>{stat.icon}</span>
      <div className="relative z-10">
        <div
          className="text-xs font-semibold font-display"
          style={{ color: stat.color, filter: `drop-shadow(0 0 6px ${stat.color}40)` }}
        >
          {stat.value}
        </div>
        <div className="text-[10px] font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.32)', letterSpacing: '0.04em' }}>
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION
═══════════════════════════════════════════ */
export default function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">

      {/* ── Parallax atmospheric nebulas ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {/* Top-right purple */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '-5%', right: '-12%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Bottom-left cyan */}
        <div
          className="absolute w-[600px] h-[500px] rounded-full"
          style={{
            bottom: '0%', left: '-10%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Center amber — very faint, warmth */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* ── Parallax grid ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: gridY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '72px 72px',
            opacity: 0.018,
          }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// About Me</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.08, duration: 0.80, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            My{' '}
            <span className="gradient-text">Engineering Journey</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.22 }}
            className="max-w-md mx-auto text-sm"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            From student to AI engineer — a journey driven by curiosity, code, and craft.
          </motion.p>
        </div>

        {/* ── Identity Stats Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.30, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-16"
        >
          {identityStats.map((stat, i) => (
            <StatChip key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* ── Bio Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden mb-20 group cursor-default"
          style={{
            background: 'linear-gradient(160deg, rgba(14,14,28,0.65) 0%, rgba(5,5,15,0.78) 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.08)',
              '0 4px 24px rgba(0,0,0,0.40)',
              '0 20px 60px rgba(0,0,0,0.30)',
            ].join(', '),
            backdropFilter: 'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          }}
        >
          {/* Inner glass sheen */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: 'linear-gradient(175deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 35%, transparent 55%)',
            }}
          />
          {/* Top prismatic edge */}
          <div
            className="absolute top-0 left-[8%] right-[8%] h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.45), transparent)',
              boxShadow: '0 0 10px rgba(0,212,255,0.25)',
            }}
          />
          {/* Hover glow border transition */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100"
            style={{
              border: '1px solid rgba(0,212,255,0.18)',
              transition: 'opacity 0.35s ease',
            }}
          />

          <div className="p-8 relative z-10">
            {/* Identity row */}
            <div className="flex items-start gap-4 mb-6">
              {/* Avatar placeholder — initial circle */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold font-display flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.20) 0%, rgba(124,58,237,0.20) 100%)',
                  border: '1px solid rgba(0,212,255,0.25)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 0 24px rgba(0,212,255,0.12)',
                  color: '#00d4ff',
                  letterSpacing: '-0.02em',
                }}
              >
                HK
              </div>
              <div>
                <h3
                  className="font-display font-bold text-lg"
                  style={{ color: '#f0f4ff', letterSpacing: '-0.02em' }}
                >
                  {personalInfo.name}
                </h3>
                <p className="text-sm font-mono mt-0.5" style={{ color: 'rgba(0,212,255,0.80)' }}>
                  {personalInfo.roles.slice(0, 3).join(' · ')}
                </p>
                <p className="text-xs mt-1 font-mono" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  📍 {personalInfo.location}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.52)' }}>
              {personalInfo.bio}
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2">
              {['Full-Stack Development', 'Generative AI', 'System Design', 'DSA & Algorithms', 'Scalable Architecture', 'Cloud Computing'].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="text-[11px] px-3 py-1 rounded-full font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.42)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                  whileHover={{
                    background: 'rgba(0,212,255,0.08)',
                    borderColor: 'rgba(0,212,255,0.28)',
                    color: '#00d4ff',
                    boxShadow: '0 0 12px rgba(0,212,255,0.15)',
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Journey Timeline ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <div
              className="h-[1px] flex-1"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08))' }}
            />
            <span
              className="text-[11px] font-mono px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.08em',
              }}
            >
              ENGINEERING TIMELINE
            </span>
            <div
              className="h-[1px] flex-1"
              style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.08))' }}
            />
          </div>

          <div className="space-y-0">
            {journey.map((item, i) => (
              <JourneyCard key={i} item={item} index={i} isLast={i === journey.length - 1} />
            ))}
          </div>
        </motion.div>

        {/* ── Future Direction CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex justify-center"
        >
          <div
            className="relative rounded-3xl overflow-hidden px-8 py-6 text-center max-w-xl w-full"
            style={{
              background: 'linear-gradient(160deg, rgba(14,14,28,0.60) 0%, rgba(5,5,15,0.72) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: [
                'inset 0 1px 0 rgba(255,255,255,0.07)',
                '0 4px 32px rgba(0,0,0,0.35)',
              ].join(', '),
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Glass sheen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(175deg, rgba(255,255,255,0.045) 0%, transparent 50%)',
              }}
            />
            {/* Top edge glow — green, "future" energy */}
            <div
              className="absolute top-0 left-[15%] right-[15%] h-[1px] pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.50), transparent)',
                boxShadow: '0 0 10px rgba(16,185,129,0.25)',
              }}
            />

            <div className="relative z-10">
              <div className="text-2xl mb-3">🔭</div>
              <h3
                className="font-display font-bold text-base mb-2"
                style={{ color: '#f0f4ff', letterSpacing: '-0.01em' }}
              >
                Next Chapter
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.42)' }}>
                Actively seeking SDE internships and full-time opportunities where I can apply my skills in Full-Stack, AI, and scalable systems to ship products at real-world scale.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                {['Open to Internships', 'Full-Time Roles', 'Remote / Hybrid'].map((label) => (
                  <span
                    key={label}
                    className="text-[10px] font-mono px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(16,185,129,0.08)',
                      border: '1px solid rgba(16,185,129,0.22)',
                      color: '#10b981',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
