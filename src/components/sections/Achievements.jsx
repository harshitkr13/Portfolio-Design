import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { achievements, certifications } from '../../data/portfolio';

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════ */
function Counter({ to, decimals = 0, duration = 1.8, inView }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3); // cubic ease-out
      setVal(parseFloat((eased * to).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, decimals, duration]);

  return <>{val.toFixed(decimals)}</>;
}

/* ═══════════════════════════════════════════
   TIER 1 — LEETCODE HERO PANEL
   Headline showcase treatment
═══════════════════════════════════════════ */
function LeetCodeHero({ inView }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const stats = [
    { value: 1907, suffix: '', label: 'Rating', decimals: 0, color: '#f59e0b' },
    { value: 4.23, suffix: '%', label: 'Global Rank', prefix: 'Top ', decimals: 2, color: '#00d4ff' },
    { value: 500, suffix: '+', label: 'Problems', decimals: 0, color: '#10b981' },
    { value: 496, suffix: '', label: 'Contest Rank', prefix: '#', decimals: 0, color: '#7c3aed' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden mb-6 cursor-default"
      style={{
        background: 'linear-gradient(160deg, rgba(20,14,10,0.85), rgba(12,8,5,0.9))',
        border: '1px solid rgba(245,158,11,0.2)',
        backdropFilter: 'blur(32px) saturate(180%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.6), 0 0 60px rgba(245,158,11,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{
        boxShadow: '0 4px 8px rgba(0,0,0,0.5), 0 28px 80px rgba(0,0,0,0.65), 0 0 80px rgba(245,158,11,0.12), inset 0 1px 0 rgba(255,255,255,0.09)',
        transition: { duration: 0.35 },
      }}
    >
      {/* Top prismatic edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(245,158,11,0.9), rgba(245,158,11,0.5) 70%, transparent 95%)' }}
      />
      {/* Inner sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, rgba(245,158,11,0.04) 0%, transparent 45%)' }}
      />
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hovered
            ? `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245,158,11,0.08), transparent 70%)`
            : 'transparent',
          transition: 'background 0.15s ease',
        }}
      />
      {/* Ambient corner glow */}
      <div
        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)', filter: 'blur(30px)' }}
      />

      <div className="relative p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Tier 1 · Signature Achievement</div>
                <div className="text-lg font-display font-bold text-white leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  LeetCode Knight
                </div>
              </div>
            </div>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              Elite algorithmic problem-solving capability — proven at scale under contest pressure.
            </p>
          </div>
          <motion.div
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-mono font-bold"
            style={{
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.4)',
              color: '#f59e0b',
            }}
            animate={hovered ? { boxShadow: '0 0 20px rgba(245,158,11,0.4)' } : { boxShadow: 'none' }}
            transition={{ duration: 0.3 }}
          >
            Knight
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              className="rounded-2xl p-3 text-center relative overflow-hidden"
              style={{
                background: `${s.color}0a`,
                border: `1px solid ${s.color}20`,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }}
              />
              <div
                className="font-display font-bold text-xl leading-none mb-1"
                style={{ color: s.color, letterSpacing: '-0.02em' }}
              >
                {s.prefix || ''}
                <Counter to={s.value} decimals={s.decimals} inView={inView} />
                {s.suffix}
              </div>
              <div className="text-[10px] font-mono text-white/35 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Proof line */}
        <div
          className="h-px mb-4"
          style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.25), transparent)' }}
        />
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Proves →</span>
          <span className="text-[11px] font-mono italic" style={{ color: 'rgba(245,158,11,0.7)' }}>
            Elite algorithmic thinking — top {`<`}5% globally
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   TIER 2 — ACHIEVEMENT CAPSULE
   Secondary achievements
═══════════════════════════════════════════ */
function AchievementCapsule({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  // What each achievement proves
  const proofMap = {
    'GeeksforGeeks': 'Multi-platform consistency — not a one-platform specialist',
    'WBJEE 2023':    'Competitive academic performance at a national scale',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.72), rgba(5,5,15,0.82))',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(24px) saturate(160%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -4,
        boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.55), 0 0 50px ${item.color}10, inset 0 1px 0 rgba(255,255,255,0.07)`,
        transition: { duration: 0.3 },
      }}
    >
      {/* Top prismatic edge — always visible */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent 10%, ${item.color}80, ${item.color}40, transparent 90%)`,
          opacity: hovered ? 1 : 0.5,
        }}
      />
      {/* Inner sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.04) 0%, transparent 50%)' }}
      />
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hovered
            ? `radial-gradient(260px circle at ${mousePos.x}px ${mousePos.y}px, ${item.color}0d, transparent 70%)`
            : 'transparent',
          transition: 'background 0.15s ease',
        }}
      />
      {/* Ambient corner orb */}
      <div
        className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle, ${item.color}18, transparent 70%)`,
          filter: 'blur(24px)',
          opacity: hovered ? 1 : 0.3,
        }}
      />
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full"
        style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}30)` }}
        animate={hovered ? { opacity: 1, scaleY: 1 } : { opacity: 0.3, scaleY: 0.4 }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-5 pl-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-xl"
              animate={hovered ? { scale: 1.2, rotate: [-5, 5, 0] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {item.icon}
            </motion.span>
            <div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{item.platform}</div>
              <div className="text-sm font-display font-bold text-white">{item.title}</div>
            </div>
          </div>
          <motion.span
            className="text-[10px] px-2.5 py-1 rounded-full font-mono font-bold flex-shrink-0"
            style={{
              background: `${item.color}15`,
              border: `1px solid ${item.color}35`,
              color: item.color,
            }}
            animate={hovered ? { boxShadow: `0 0 14px ${item.color}40` } : { boxShadow: 'none' }}
            transition={{ duration: 0.3 }}
          >
            {item.badge}
          </motion.span>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-white/45 mb-3 font-mono">{item.subtitle}</p>

        {/* Details */}
        <div className="space-y-1.5 mb-4">
          {item.details.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3 + i * 0.05 }}
              className="flex items-center gap-2 text-xs"
            >
              <span style={{ color: item.color, flexShrink: 0 }}>◆</span>
              <span className="text-white/55">{d}</span>
            </motion.div>
          ))}
        </div>

        {/* Proof line */}
        {proofMap[item.platform] && (
          <>
            <div
              className="h-px mb-3"
              style={{ background: `linear-gradient(90deg, ${item.color}20, transparent)` }}
            />
            <div className="flex items-start gap-2">
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest flex-shrink-0 mt-px">Proves →</span>
              <span className="text-[10px] font-mono italic" style={{ color: `${item.color}70` }}>
                {proofMap[item.platform]}
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   TIER 3 — CERTIFICATION CARD
   Professional credential treatment
═══════════════════════════════════════════ */
function CertCard({ cert, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 p-4 rounded-2xl relative overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.65), rgba(5,5,15,0.75))',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px) saturate(150%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        x: 4,
        boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.5), 0 0 30px ${cert.color}10, inset 0 1px 0 rgba(255,255,255,0.07)`,
        transition: { duration: 0.3 },
      }}
    >
      {/* Top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${cert.color}70, transparent)`,
          opacity: hovered ? 0.9 : 0.35,
        }}
      />
      {/* Left color accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-r-full"
        style={{ background: `linear-gradient(to bottom, transparent, ${cert.color}, transparent)` }}
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{
          background: `${cert.color}12`,
          border: `1px solid ${cert.color}25`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
        animate={hovered ? { scale: 1.08, boxShadow: `0 0 18px ${cert.color}30` } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {cert.icon}
      </motion.div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-display font-semibold text-white/90 truncate">{cert.title}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="text-[10px] text-white/35 font-mono">{cert.issuer}</div>
          <div className="w-0.5 h-0.5 rounded-full bg-white/20" />
          <div
            className="text-[10px] font-mono"
            style={{ color: `${cert.color}80` }}
          >
            Professional Credential
          </div>
        </div>
      </div>

      {/* Score + Grade */}
      <div className="text-right flex-shrink-0">
        <div className="text-sm font-bold font-display leading-tight" style={{ color: cert.color }}>
          {cert.score}
        </div>
        <div
          className="text-[10px] font-mono mt-0.5 px-1.5 py-0.5 rounded-full"
          style={{
            background: `${cert.color}12`,
            border: `1px solid ${cert.color}25`,
            color: `${cert.color}90`,
          }}
        >
          {cert.grade}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION DIVIDER
═══════════════════════════════════════════ */
function Divider({ label, color, inView, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="flex items-center gap-4 mb-6"
    >
      <motion.span
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${color}35)` }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.1, duration: 0.8 }}
      />
      <span
        className="text-[10px] font-mono uppercase tracking-[0.18em] whitespace-nowrap flex items-center gap-2"
        style={{ color: `${color}70` }}
      >
        <div className="w-1 h-1 rounded-full" style={{ background: color }} />
        {label}
        <div className="w-1 h-1 rounded-full" style={{ background: color }} />
      </span>
      <motion.span
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to left, transparent, ${color}35)` }}
        initial={{ scaleX: 0, originX: 1 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.1, duration: 0.8 }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CLOSING CREDIBILITY STATEMENT
═══════════════════════════════════════════ */
function CredibilityStatement({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4, duration: 0.7 }}
      className="mt-10 relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.7), rgba(5,5,15,0.8))',
        border: '1px solid rgba(245,158,11,0.12)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 0 40px rgba(245,158,11,0.04)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.03) 0%, transparent 50%)' }}
      />
      <div className="p-6 text-center relative">
        <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">
          Candidate Differentiation
        </p>
        <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto">
          Top{' '}<span style={{ color: '#f59e0b' }}>4.23% globally on LeetCode</span>,{' '}
          <span style={{ color: '#10b981' }}>500+ problems solved</span>, nationally ranked
          at{' '}<span style={{ color: '#00d4ff' }}>WBJEE AIR 7042</span>, and certified by{' '}
          <span style={{ color: '#7c3aed' }}>NPTEL & AWS</span>{' '}—
          consistently demonstrating excellence across every engineering dimension.
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CP ANALYTICS DASHBOARD
   Inserted above existing achievement tiers.
   Uses ONLY verified data from portfolio.js:
   LeetCode: 1907 · Top 4.23% · 500+ · #496 · #556
   GFG: 1819 · 3-Star · 335+ · Top 4% Institute
   Combined: 835+
═══════════════════════════════════════════ */

const CP_MILESTONES = [
  {
    icon: '🚀',
    label: 'Started Competitive Programming',
    detail: 'Joined LeetCode · GeeksforGeeks · CodeChef',
    year: '2023',
    color: '#00d4ff',
    badge: null,
  },
  {
    icon: '📈',
    label: 'Consistent Problem Solving',
    detail: '835+ problems across platforms — building algorithmic fluency',
    year: '2023 – 24',
    color: '#7c3aed',
    badge: '835+',
  },
  {
    icon: '⚔️',
    label: 'Knight Badge Achieved',
    detail: 'Crossed 1600 threshold — entered top competitive tier on LeetCode',
    year: '2024',
    color: '#f59e0b',
    badge: 'Knight',
  },
  {
    icon: '🏆',
    label: 'Current Peak: Rating 1907',
    detail: 'Top 4.23% globally · Contest Rank #496 among 30,000+ participants',
    year: '2025',
    color: '#10b981',
    badge: '1907',
  },
];

const CP_PLATFORMS = [
  {
    name: 'LeetCode',
    icon: '⚡',
    badge: 'Knight',
    color: '#f59e0b',
    proof: 'Elite problem-solving — top <5% globally',
    stats: [
      { label: 'Rating',      value: '1907'     },
      { label: 'Global Rank', value: 'Top 4.23%' },
      { label: 'Problems',    value: '500+'      },
      { label: 'Best Rank',   value: '#496'      },
    ],
  },
  {
    name: 'GeeksforGeeks',
    icon: '🌿',
    badge: '3-Star',
    color: '#10b981',
    proof: 'Multi-platform consistency proven',
    stats: [
      { label: 'Rating',    value: '1819'   },
      { label: 'Level',     value: '3-Star' },
      { label: 'Problems',  value: '335+'   },
      { label: 'Institute', value: 'Top 4%' },
    ],
  },
];

const CP_METRICS = [
  { icon: '⚡', label: 'LeetCode Rating',  value: 1907, suffix: '',  prefix: '',      decimals: 0, color: '#f59e0b' },
  { icon: '🌐', label: 'Global Ranking',   value: 4.23, suffix: '%', prefix: 'Top ', decimals: 2, color: '#00d4ff' },
  { icon: '🧩', label: 'LC Problems',      value: 500,  suffix: '+', prefix: '',      decimals: 0, color: '#10b981' },
  { icon: '🌿', label: 'GFG Rating',       value: 1819, suffix: '',  prefix: '',      decimals: 0, color: '#10b981' },
  { icon: '🎯', label: 'GFG Problems',     value: 335,  suffix: '+', prefix: '',      decimals: 0, color: '#7c3aed' },
  { icon: '🏆', label: 'Total Problems',   value: 835,  suffix: '+', prefix: '',      decimals: 0, color: '#00d4ff' },
];

function CPMetricCard({ metric, index, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.05 + index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl p-4 text-center overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.72), rgba(5,5,15,0.82))',
        border: `1px solid ${metric.color}18`,
        backdropFilter: 'blur(24px) saturate(160%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -4,
        boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 20px 56px rgba(0,0,0,0.55), 0 0 36px ${metric.color}12, inset 0 1px 0 rgba(255,255,255,0.07)`,
        transition: { duration: 0.28 },
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${metric.color}70, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.04) 0%, transparent 50%)' }}
      />
      <div className="text-lg mb-1.5">{metric.icon}</div>
      <div
        className="font-display font-bold leading-none mb-1.5"
        style={{ color: metric.color, letterSpacing: '-0.025em', fontSize: 'clamp(18px, 2.5vw, 24px)' }}
      >
        {metric.prefix}
        <Counter to={metric.value} decimals={metric.decimals} inView={inView} />
        {metric.suffix}
      </div>
      <div className="text-[10px] font-mono text-white/35 uppercase tracking-wider leading-tight">
        {metric.label}
      </div>
    </motion.div>
  );
}

function CPRatingJourney({ inView }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-1 rounded-full" style={{ background: '#f59e0b', boxShadow: '0 0 6px #f59e0b' }} />
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.18em]">Rating Journey</span>
      </div>
      <div className="relative">
        {/* Vertical spine */}
        <div
          className="absolute left-[9px] top-3 bottom-3 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.25), rgba(245,158,11,0.35), rgba(16,185,129,0.25))' }}
        />
        <div className="space-y-0">
          {CP_MILESTONES.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              {/* Milestone dot */}
              <div className="relative flex-shrink-0 mt-0.5">
                <div
                  className="w-[18px] h-[18px] rounded-full flex items-center justify-center relative z-10"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${m.color}dd, ${m.color}55)`,
                    boxShadow: `0 0 12px ${m.color}50, inset 0 1px 0 rgba(255,255,255,0.25)`,
                  }}
                >
                  <span style={{ fontSize: '8px' }}>{m.icon}</span>
                </div>
                {/* Pulse on current milestone */}
                {i === CP_MILESTONES.length - 1 && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${m.color}50` }}
                    animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-xs font-display font-semibold text-white/85">{m.label}</span>
                  {m.badge && (
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                      style={{
                        background: `${m.color}15`,
                        border: `1px solid ${m.color}35`,
                        color: m.color,
                      }}
                    >
                      {m.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/35 leading-snug font-mono">{m.detail}</p>
                <div className="text-[9px] font-mono mt-1" style={{ color: `${m.color}60` }}>{m.year}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CPPlatformCard({ platform, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.72), rgba(5,5,15,0.82))',
        border: `1px solid ${platform.color}18`,
        backdropFilter: 'blur(24px) saturate(160%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -4,
        boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.55), 0 0 40px ${platform.color}10, inset 0 1px 0 rgba(255,255,255,0.07)`,
        transition: { duration: 0.3 },
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 10%, ${platform.color}80, ${platform.color}40, transparent 90%)`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.3s',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.04) 0%, transparent 50%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hovered
            ? `radial-gradient(260px circle at ${mousePos.x}px ${mousePos.y}px, ${platform.color}0c, transparent 70%)`
            : 'transparent',
          transition: 'background 0.15s ease',
        }}
      />
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full"
        style={{ background: `linear-gradient(to bottom, ${platform.color}, ${platform.color}30)` }}
        animate={hovered ? { opacity: 1, scaleY: 1 } : { opacity: 0.3, scaleY: 0.4 }}
        transition={{ duration: 0.3 }}
      />
      <div className="p-5 pl-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
              style={{
                background: `${platform.color}12`,
                border: `1px solid ${platform.color}25`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {platform.icon}
            </div>
            <div>
              <div className="text-sm font-display font-bold text-white/90">{platform.name}</div>
              <div className="text-[10px] font-mono" style={{ color: `${platform.color}80` }}>harshitkr13</div>
            </div>
          </div>
          <motion.span
            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
            style={{
              background: `${platform.color}15`,
              border: `1px solid ${platform.color}35`,
              color: platform.color,
            }}
            animate={hovered ? { boxShadow: `0 0 14px ${platform.color}40` } : { boxShadow: 'none' }}
            transition={{ duration: 0.3 }}
          >
            {platform.badge}
          </motion.span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {platform.stats.map(s => (
            <div
              key={s.label}
              className="rounded-xl p-2.5 text-center"
              style={{
                background: `${platform.color}08`,
                border: `1px solid ${platform.color}14`,
              }}
            >
              <div
                className="font-display font-bold text-sm leading-tight mb-0.5"
                style={{ color: platform.color, letterSpacing: '-0.01em' }}
              >
                {s.value}
              </div>
              <div className="text-[9px] font-mono text-white/30 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="h-px mb-3" style={{ background: `linear-gradient(90deg, ${platform.color}20, transparent)` }} />
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest flex-shrink-0">Proves →</span>
          <span className="text-[10px] font-mono italic" style={{ color: `${platform.color}65` }}>{platform.proof}</span>
        </div>
      </div>
    </motion.div>
  );
}

function CPConsistencyPanel({ inView }) {
  const indicators = [
    { label: 'Total Problems Solved', value: '835+',  color: '#10b981', icon: '🧩', sub: 'LeetCode 500+ · GFG 335+' },
    { label: 'Active Platforms',      value: '3+',    color: '#00d4ff', icon: '🌐', sub: 'LeetCode · GFG · CodeChef' },
    { label: 'Contest Appearances',   value: '10+',   color: '#f59e0b', icon: '⚔️', sub: 'Best Rank #496 of 30,000+' },
    { label: 'Peak LeetCode Rating',  value: '1907',  color: '#7c3aed', icon: '📈', sub: 'Knight Tier · Top 4.23%' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.65), rgba(5,5,15,0.75))',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.03) 0%, transparent 50%)' }}
      />
      <div className="p-5 relative">
        <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-4">
          Problem Solving Consistency
        </div>
        <div className="space-y-3">
          {indicators.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.45 + i * 0.06 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: `${ind.color}12`, border: `1px solid ${ind.color}20` }}
              >
                {ind.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-white/45 truncate">{ind.label}</span>
                  <span className="text-sm font-display font-bold flex-shrink-0" style={{ color: ind.color }}>
                    {ind.value}
                  </span>
                </div>
                <div className="text-[9px] font-mono text-white/20 mt-0.5">{ind.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Platform breakdown bar */}
        <div className="mt-4 pt-3 border-t border-white/[0.05]">
          <div className="flex justify-between text-[9px] font-mono text-white/25 mb-2">
            <span>Platform Distribution</span>
            <span style={{ color: '#10b981' }}>835+ Total</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="h-full flex">
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #f59e0b, #f59e0b90)', boxShadow: '0 0 6px #f59e0b60', borderRadius: '9999px 0 0 9999px' }}
                initial={{ width: '0%' }}
                animate={inView ? { width: '60%' } : {}}
                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #10b98190, #10b981)', boxShadow: '0 0 6px #10b98160', borderRadius: '0 9999px 9999px 0' }}
                initial={{ width: '0%' }}
                animate={inView ? { width: '40%' } : {}}
                transition={{ delay: 0.72, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-1.5">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f59e0b' }} />
              <span className="text-[9px] font-mono text-white/25">LeetCode 500+</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981' }} />
              <span className="text-[9px] font-mono text-white/25">GFG 335+</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CPDashboard({ inView }) {
  return (
    <div className="mb-16">
      {/* Dashboard label + title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }}
          />
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Analytics Dashboard</span>
        </div>
        <h3
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(18px, 3vw, 26px)', letterSpacing: '-0.02em' }}
        >
          Competitive Programming{' '}
          <span style={{ color: '#00d4ff' }}>Analytics</span>
        </h3>
        <p className="text-[11px] text-white/30 mt-1 font-mono">
          Verified metrics only · LeetCode · GeeksforGeeks
        </p>
      </motion.div>

      {/* Hero metrics — 2×3 mobile, 6 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {CP_METRICS.map((m, i) => (
          <CPMetricCard key={m.label} metric={m} index={i} inView={inView} />
        ))}
      </div>

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Left — Rating Journey + Consistency */}
        <div className="lg:col-span-2 space-y-5">
          <div
            className="relative rounded-2xl overflow-hidden p-5"
            style={{
              background: 'linear-gradient(160deg, rgba(14,14,28,0.72), rgba(5,5,15,0.82))',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(24px) saturate(160%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.35), 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.7), rgba(16,185,129,0.5), transparent)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.04) 0%, transparent 50%)' }}
            />
            <CPRatingJourney inView={inView} />
          </div>
          <CPConsistencyPanel inView={inView} />
        </div>

        {/* Right — Platform cards + Contest quick stats */}
        <div className="lg:col-span-3 space-y-4">
          {CP_PLATFORMS.map((p, i) => (
            <CPPlatformCard key={p.name} platform={p} index={i} inView={inView} />
          ))}

          {/* Contest performance quick row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.55 }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { label: 'Best Contest Rank', value: '#496', sub: '30,000+ participants', color: '#f59e0b', icon: '🏆' },
              { label: 'Contest Rank',      value: '#556', sub: 'Biweekly Contest',     color: '#00d4ff', icon: '🎯' },
            ].map(c => (
              <div
                key={c.label}
                className="relative rounded-xl p-4 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, rgba(14,14,28,0.65), rgba(5,5,15,0.75))',
                  border: `1px solid ${c.color}18`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.color}60, transparent)` }}
                />
                <div className="text-base mb-2">{c.icon}</div>
                <div
                  className="font-display font-bold text-xl leading-none mb-1"
                  style={{ color: c.color, letterSpacing: '-0.02em' }}
                >
                  {c.value}
                </div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">{c.label}</div>
                <div className="text-[9px] font-mono text-white/20 mt-0.5">{c.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════ */
export default function Achievements() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: '-40px' });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  // Filter out LeetCode from the achievement capsules (it gets the hero treatment)
  const secondaryAchievements = achievements.filter(a => a.platform !== 'LeetCode');

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* ── Parallax ambient background ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute top-0 right-1/4 w-[700px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.07), transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.05), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/2 left-0 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.04), transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── Section header ── */}
        <div ref={headerRef} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// Recognition & Excellence</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-0.02em' }}
          >
            Proof of <span className="gradient-text">Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm max-w-md mx-auto"
          >
            Every achievement here is a verifiable signal of engineering capability —
            not a claim, a credential.
          </motion.p>
        </div>

        {/* ── CP Analytics Dashboard ── */}
        <CPDashboard inView={headerInView} />

        <Divider label="Achievement Highlights" color="#f59e0b" inView={headerInView} delay={0.05} />

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── LEFT COLUMN — Achievements (wider) ── */}
          <div className="lg:col-span-3">
            {/* Tier 1 */}
            <Divider label="Tier 1 — Signature Achievement" color="#f59e0b" inView={headerInView} delay={0.1} />
            <LeetCodeHero inView={headerInView} />

            {/* Tier 2 */}
            <Divider label="Tier 2 — Competitive Excellence" color="#10b981" inView={headerInView} delay={0.2} />
            <div className="space-y-4">
              {secondaryAchievements.map((item, i) => (
                <AchievementCapsule key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Certifications (narrower) ── */}
          <div className="lg:col-span-2">
            <Divider label="Tier 3 — Certifications" color="#7c3aed" inView={headerInView} delay={0.15} />
            <div className="space-y-3 mb-8">
              {certifications.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} />
              ))}
            </div>

            {/* Academic proof panel */}
            <Divider label="Academic Standing" color="#00d4ff" inView={headerInView} delay={0.25} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, rgba(14,14,28,0.65), rgba(5,5,15,0.75))',
                border: '1px solid rgba(0,212,255,0.12)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.7), transparent)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.03) 0%, transparent 50%)' }}
              />
              <div className="relative space-y-4">
                {[
                  { label: 'CGPA', value: '8.0 / 10', sub: 'Techno Main Salt Lake', color: '#00d4ff' },
                  { label: 'WBJEE 2023', value: 'AIR 7042', sub: 'Top 6% · 120,000+ candidates', color: '#7c3aed' },
                  { label: 'GFG Rating', value: '1819', sub: 'Top 4% at Institute · 3-Star', color: '#10b981' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={headerInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.07 }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</div>
                      <div className="text-[10px] text-white/25 font-mono">{stat.sub}</div>
                    </div>
                    <div
                      className="text-sm font-display font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Closing credibility statement ── */}
        <div ref={footerRef}>
          <CredibilityStatement inView={footerInView} />
        </div>
      </div>
    </section>
  );
}
