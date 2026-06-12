import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolio';

const categories = Object.keys(skills);

const categoryIcons = {
  Languages:   '{ }',
  Frontend:    '⬡',
  Backend:     '⚙',
  'AI & GenAI':'🤖',
  Databases:   '🗄',
  Tools:       '🔧',
};

const categoryColors = {
  Languages:   '#00d4ff',
  Frontend:    '#7c3aed',
  Backend:     '#10b981',
  'AI & GenAI':'#f59e0b',
  Databases:   '#ef4444',
  Tools:       '#8b5cf6',
};

function SkillItem({ skill, index, categoryColor }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-4 rounded-2xl cursor-none overflow-hidden"
      style={{
        background: hovered ? `${skill.color}09` : 'rgba(255,255,255,0.02)',
        border: hovered ? `1px solid ${skill.color}45` : '1px solid rgba(255,255,255,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? `0 16px 40px ${skill.color}18, 0 0 0 1px ${skill.color}20 inset`
          : 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top glow edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${skill.color}70, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Ambient inner glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}10, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="flex items-center justify-between mb-3 relative">
        <span className="text-sm font-display font-semibold text-white/80">{skill.name}</span>
        <motion.span
          className="text-xs font-mono font-bold"
          style={{ color: skill.color }}
          animate={hovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.05 + 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
            boxShadow: hovered ? `0 0 12px ${skill.color}80, 0 0 24px ${skill.color}30` : `0 0 8px ${skill.color}40`,
          }}
        >
          {/* Animated shimmer on bar */}
          {hovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Languages');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const activeSkills = skills[activeCategory] || [];
  const activeColor = categoryColors[activeCategory];

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Ambient + grid */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
          style={{ background: `radial-gradient(ellipse, ${activeColor}12, transparent 70%)`, filter: 'blur(70px)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px]"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)', filter: 'blur(60px)' }}
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,212,255,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header — UNCHANGED */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// Technical Arsenal</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-lg mx-auto text-sm"
          >
            A comprehensive toolkit for building production-ready applications
          </motion.p>
        </div>

        {/* Category Tabs — enhanced active state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="relative px-5 py-2.5 rounded-full text-sm font-medium font-display overflow-hidden"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${categoryColors[cat]}30, ${categoryColors[cat]}12)`
                    : 'rgba(255,255,255,0.03)',
                  border: isActive
                    ? `1px solid ${categoryColors[cat]}55`
                    : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                  boxShadow: isActive
                    ? `0 4px 24px ${categoryColors[cat]}25, inset 0 1px 0 rgba(255,255,255,0.15)`
                    : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Active glow top edge */}
                {isActive && (
                  <span
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${categoryColors[cat]}, transparent)` }}
                  />
                )}
                <span className="mr-2">{categoryIcons[cat]}</span>
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid — enhanced items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {activeSkills.map((skill, i) => (
              <SkillItem key={skill.name} skill={skill} index={i} categoryColor={activeColor} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Full Tech Stack — UNCHANGED content, enhanced visuals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 rounded-3xl relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Subtle corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 0% 0%, rgba(0,212,255,0.06), transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 100% 100%, rgba(124,58,237,0.06), transparent 70%)' }} />

          <p className="text-center text-xs font-mono text-white/30 uppercase tracking-widest mb-6">
            Full Technology Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'C++', 'Python', 'Java', 'JavaScript', 'SQL',
              'React.js', 'Node.js', 'Express.js', 'Django', 'FastAPI',
              'MongoDB', 'MySQL', 'LangChain', 'OpenAI API', 'Gemini API',
              'RAG', 'Docker', 'Git', 'GitHub', 'Tailwind CSS',
              'REST APIs', 'JWT', 'Postman', 'Vercel', 'Chart.js',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.02 }}
                whileHover={{
                  scale: 1.08,
                  background: 'rgba(0,212,255,0.1)',
                  borderColor: 'rgba(0,212,255,0.35)',
                  color: '#00d4ff',
                  boxShadow: '0 4px 16px rgba(0,212,255,0.15)',
                  y: -2,
                }}
                className="skill-badge cursor-none"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
