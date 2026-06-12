import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════
   CAPABILITY SYSTEMS
   Each group answers: "What can Harshit BUILD?"
═══════════════════════════════════════════ */
const capabilities = [
  {
    id: 'frontend',
    label: 'Frontend Engineering',
    icon: '⬡',
    color: '#7c3aed',
    tagline: 'Build responsive, animated user interfaces',
    description: 'Crafting pixel-perfect, performant UIs with modern React patterns, smooth animations, and scalable design systems.',
    flagship: ['React.js', 'JavaScript', 'Tailwind CSS'],
    stack: ['HTML5', 'CSS3', 'Chart.js', 'Framer Motion', 'Vite'],
    builds: 'Interactive dashboards · Design systems · SPA architectures',
  },
  {
    id: 'backend',
    label: 'Backend Engineering',
    icon: '⚙',
    color: '#10b981',
    tagline: 'Design scalable APIs and server-side systems',
    description: 'Building production-grade REST APIs, authentication systems, and backend architectures that handle real-world load.',
    flagship: ['Node.js', 'Express.js', 'FastAPI'],
    stack: ['Django', 'REST APIs', 'JWT Auth', 'Microservices'],
    builds: 'REST APIs · Auth systems · Microservice architectures',
  },
  {
    id: 'ai',
    label: 'AI & GenAI Engineering',
    icon: '🤖',
    color: '#f59e0b',
    tagline: 'Build intelligent applications with LLMs and RAG',
    description: 'Engineering AI-powered products using LangChain, RAG pipelines, and LLM APIs — reducing errors by 35–40% in production.',
    flagship: ['LangChain', 'OpenAI API', 'RAG'],
    stack: ['Gemini API', 'Prompt Engineering', 'Vector DBs'],
    builds: 'RAG pipelines · AI assistants · Intelligent automation',
  },
  {
    id: 'databases',
    label: 'Data & Databases',
    icon: '🗄',
    color: '#ef4444',
    tagline: 'Design efficient data models and persistence layers',
    description: 'Structuring relational and document databases, designing schemas for scale, and implementing secure data pipelines.',
    flagship: ['MongoDB', 'MySQL'],
    stack: ['Schema Design', 'Aggregation Pipelines', 'Indexing'],
    builds: 'Data models · Query optimization · Persistence layers',
  },
  {
    id: 'languages',
    label: 'Programming',
    icon: '{ }',
    color: '#00d4ff',
    tagline: 'Solve complex algorithmic problems at scale',
    description: 'Multi-language proficiency with deep DSA knowledge — 500+ problems solved, LeetCode Knight, Top 4.23% globally.',
    flagship: ['C++', 'Python', 'JavaScript'],
    stack: ['Java', 'SQL'],
    builds: 'Competitive programming · System design · Algorithm design',
  },
  {
    id: 'tools',
    label: 'Developer Workflow',
    icon: '🔧',
    color: '#8b5cf6',
    tagline: 'Ship faster with a professional dev toolchain',
    description: 'Proficient in the full modern engineering workflow — from containerized development to cloud deployment and CI/CD.',
    flagship: ['Git', 'Docker', 'GitHub'],
    stack: ['Postman', 'Vercel', 'ESLint', 'npm'],
    builds: 'Containerized apps · CI/CD pipelines · Cloud deployments',
  },
];

/* ─── Full tech strip (bottom panel) ─── */
const allTech = [
  'C++', 'Python', 'Java', 'JavaScript', 'SQL',
  'React.js', 'Node.js', 'Express.js', 'Django', 'FastAPI',
  'MongoDB', 'MySQL', 'LangChain', 'OpenAI API', 'Gemini API',
  'RAG', 'Docker', 'Git', 'GitHub', 'Tailwind CSS',
  'REST APIs', 'JWT', 'Postman', 'Vercel', 'Chart.js',
];

/* ═══════════════════════════════════════════
   CAPABILITY CARD — premium glass + 3D tilt
═══════════════════════════════════════════ */
function CapabilityCard({ cap, isActive, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]),  { stiffness: 280, damping: 38 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 280, damping: 38 });
  const lightX  = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%']);
  const lightY  = useTransform(mouseY, [-0.5, 0.5], ['15%', '85%']);

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0); mouseY.set(0);
    setHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: 'blur(5px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1000px' }}
      className="relative"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl cursor-none"
      >
        {/* ── Glass base ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: isActive
              ? `linear-gradient(160deg, rgba(20,20,40,0.78) 0%, rgba(8,8,20,0.88) 100%)`
              : 'linear-gradient(160deg, rgba(14,14,28,0.62) 0%, rgba(5,5,15,0.72) 100%)',
            border: isActive
              ? `1px solid ${cap.color}50`
              : '1px solid rgba(255,255,255,0.07)',
            boxShadow: isActive
              ? [
                  '0 2px 4px rgba(0,0,0,0.35)',
                  '0 16px 48px rgba(0,0,0,0.55)',
                  `0 0 60px ${cap.color}14`,
                  `inset 0 1px 0 ${cap.color}20`,
                  'inset 0 -1px 0 rgba(0,0,0,0.25)',
                ].join(', ')
              : [
                  '0 2px 4px rgba(0,0,0,0.25)',
                  '0 8px 24px rgba(0,0,0,0.35)',
                  'inset 0 1px 0 rgba(255,255,255,0.07)',
                ].join(', '),
            backdropFilter: 'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            transition: 'border-color 0.35s ease, box-shadow 0.40s ease, background 0.35s ease',
          }}
        >
          {/* Inner glass sheen */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: 'linear-gradient(175deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 35%, transparent 55%)',
            }}
          />

          {/* Cursor spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: useTransform(
                [lightX, lightY],
                ([lx, ly]) => `radial-gradient(circle at ${lx} ${ly}, ${cap.color}18 0%, transparent 60%)`
              ),
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
            }}
          />

          {/* Top prismatic edge */}
          <motion.div
            className="absolute top-0 left-[8%] right-[8%] h-[1px] pointer-events-none rounded-full"
            animate={{ opacity: (isActive || hovered) ? 1 : 0, scaleX: (isActive || hovered) ? 1 : 0.35 }}
            transition={{ duration: 0.30, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: `linear-gradient(90deg, transparent, ${cap.color}CC, transparent)`,
              boxShadow: `0 0 10px ${cap.color}55`,
              transformOrigin: '50% 0',
            }}
          />

          {/* Card content */}
          <div className="p-5 relative z-10">
            {/* Header row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-base"
                    style={{ filter: `drop-shadow(0 0 6px ${cap.color}60)` }}
                  >
                    {cap.icon}
                  </span>
                  <h3
                    className="font-display font-semibold text-sm"
                    style={{
                      color: isActive ? '#f0f4ff' : 'rgba(255,255,255,0.75)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {cap.label}
                  </h3>
                </div>
                <p
                  className="text-[11px] font-mono leading-snug"
                  style={{ color: isActive ? cap.color : 'rgba(255,255,255,0.30)', letterSpacing: '0.02em' }}
                >
                  {cap.tagline}
                </p>
              </div>

              {/* Active indicator dot */}
              <motion.div
                className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: cap.color,
                  boxShadow: `0 0 8px ${cap.color}80`,
                }}
              />
            </div>

            {/* Flagship tech pills */}
            <div className="flex flex-wrap gap-1.5">
              {cap.flagship.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: `${cap.color}14`,
                    border: `1px solid ${cap.color}35`,
                    color: cap.color,
                    filter: `drop-shadow(0 0 4px ${cap.color}30)`,
                  }}
                >
                  {tech}
                </span>
              ))}
              {cap.stack.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.38)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   DETAIL PANEL — expanded view of active cap
═══════════════════════════════════════════ */
function DetailPanel({ cap }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      key={cap.id}
      initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.68) 0%, rgba(5,5,15,0.80) 100%)',
        border: `1px solid ${cap.color}35`,
        boxShadow: [
          '0 2px 4px rgba(0,0,0,0.30)',
          '0 20px 60px rgba(0,0,0,0.50)',
          `0 0 80px ${cap.color}10`,
          `inset 0 1px 0 ${cap.color}18`,
        ].join(', '),
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
      }}
    >
      {/* Inner glass sheen */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: 'linear-gradient(175deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 35%, transparent 55%)',
        }}
      />
      {/* Top prismatic edge */}
      <div
        className="absolute top-0 left-[6%] right-[6%] h-[1px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${cap.color}BB, transparent)`,
          boxShadow: `0 0 12px ${cap.color}55`,
        }}
      />
      {/* Corner accent glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${cap.color}10 0%, transparent 65%)`,
        }}
      />

      <div className="p-7 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: `radial-gradient(circle at 40% 35%, ${cap.color}28 0%, ${cap.color}0C 100%)`,
              border: `1px solid ${cap.color}40`,
              boxShadow: `inset 0 1px 0 ${cap.color}30, 0 0 20px ${cap.color}18`,
            }}
          >
            {cap.icon}
          </div>
          <div className="flex-1">
            <h3
              className="font-display font-bold text-lg mb-1"
              style={{ color: '#f0f4ff', letterSpacing: '-0.02em' }}
            >
              {cap.label}
            </h3>
            <p
              className="text-xs font-mono"
              style={{ color: cap.color, filter: `drop-shadow(0 0 6px ${cap.color}40)` }}
            >
              {cap.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.50)' }}>
          {cap.description}
        </p>

        {/* Flagship technologies */}
        <div className="mb-5">
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-3"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            Core Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {cap.flagship.map((tech) => (
              <motion.span
                key={tech}
                className="text-xs font-mono px-3 py-1.5 rounded-xl"
                style={{
                  background: `${cap.color}14`,
                  border: `1px solid ${cap.color}40`,
                  color: cap.color,
                  boxShadow: `inset 0 1px 0 ${cap.color}20`,
                  filter: `drop-shadow(0 0 6px ${cap.color}28)`,
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 4px 16px ${cap.color}30, inset 0 1px 0 ${cap.color}25` }}
                transition={{ duration: 0.15 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Supporting stack */}
        <div className="mb-6">
          <p
            className="text-[10px] font-mono uppercase tracking-widest mb-3"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            Supporting Stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {cap.stack.map((tech) => (
              <motion.span
                key={tech}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.42)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
                whileHover={{
                  background: `${cap.color}10`,
                  borderColor: `${cap.color}30`,
                  color: '#fff',
                }}
                transition={{ duration: 0.15 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* What I build */}
        <div
          className="px-4 py-3 rounded-xl"
          style={{
            background: `${cap.color}08`,
            border: `1px solid ${cap.color}20`,
          }}
        >
          <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: `${cap.color}80` }}>
            What I build
          </p>
          <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {cap.builds}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION
═══════════════════════════════════════════ */
export default function Skills() {
  const [activeId, setActiveId] = useState('frontend');
  const activeCap = capabilities.find((c) => c.id === activeId);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">

      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dynamic ambient glow — color follows active capability */}
        <motion.div
          key={activeId}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${activeCap.color}10, transparent 70%)`,
            filter: 'blur(80px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Static purple top-right */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        {/* Static cyan top-left */}
        <div
          className="absolute top-[20%] left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,212,255,1) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.60 }}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// Engineering Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.08, duration: 0.80, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            What I Can{' '}
            <span className="gradient-text">Build</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.22 }}
            className="max-w-md mx-auto text-sm"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            Six engineering disciplines — combined to ship production software products.
          </motion.p>
        </div>

        {/* ── Main Layout: Cards (left) + Detail Panel (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* Capability Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ delay: 0.10 + i * 0.08, duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
              >
                <CapabilityCard
                  cap={cap}
                  isActive={activeId === cap.id}
                  onClick={() => setActiveId(cap.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <DetailPanel key={activeId} cap={activeCap} />
            </AnimatePresence>
          </div>
        </div>

        {/* ── Full Tech Stack strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(14,14,28,0.58) 0%, rgba(5,5,15,0.68) 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.07)',
              '0 4px 32px rgba(0,0,0,0.35)',
            ].join(', '),
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Inner glass sheen */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: 'linear-gradient(175deg, rgba(255,255,255,0.045) 0%, transparent 45%)',
            }}
          />
          {/* Top edge */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
            }}
          />
          {/* Corner glows */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 0% 0%, rgba(0,212,255,0.06), transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 100% 100%, rgba(124,58,237,0.06), transparent 70%)' }} />

          <div className="p-8 relative z-10">
            <p className="text-center text-[10px] font-mono uppercase tracking-widest mb-6"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              Complete Technology Stack
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {allTech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.70 + i * 0.018, duration: 0.40, ease: [0.16, 1, 0.3, 1] }}
                  className="skill-badge cursor-none"
                  whileHover={{
                    scale: 1.08,
                    background: 'rgba(0,212,255,0.09)',
                    borderColor: 'rgba(0,212,255,0.32)',
                    color: '#00d4ff',
                    boxShadow: '0 4px 16px rgba(0,212,255,0.15)',
                    y: -2,
                  }}
                  transition={{ duration: 0.18 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
