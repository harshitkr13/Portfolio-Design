import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements, certifications } from '../../data/portfolio';

function AchievementCapsule({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 rounded-3xl overflow-hidden cursor-none"
      style={{
        background: hovered ? `${item.color}09` : 'rgba(255,255,255,0.02)',
        border: hovered ? `1px solid ${item.color}45` : '1px solid rgba(255,255,255,0.07)',
        transform: hovered ? 'translateY(-7px)' : 'none',
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.55), 0 0 50px ${item.color}18, inset 0 1px 0 rgba(255,255,255,0.08)`
          : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Inner ambient orb */}
      <div
        className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full pointer-events-none transition-opacity duration-400"
        style={{
          background: `radial-gradient(circle, ${item.color}25, transparent 70%)`,
          opacity: hovered ? 1 : 0.3,
          filter: 'blur(20px)',
        }}
      />

      {/* Shimmer sweep on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 35%, ${item.color}08 50%, transparent 65%)`,
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
          transition={{ duration: 1.6, ease: 'linear' }}
        />
      )}

      {/* Header row */}
      <div className="flex items-center justify-between mb-4 relative">
        <div className="flex items-center gap-3">
          <motion.span
            className="text-2xl"
            animate={hovered ? { scale: 1.2, rotate: [-5, 5, 0] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {item.icon}
          </motion.span>
          <div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest">{item.platform}</div>
            <div className="text-sm font-display font-bold text-white">{item.title}</div>
          </div>
        </div>
        <motion.span
          className="text-xs px-3 py-1 rounded-full font-mono font-bold"
          style={{
            background: `${item.color}15`,
            border: `1px solid ${item.color}30`,
            color: item.color,
          }}
          animate={hovered ? { boxShadow: `0 0 16px ${item.color}40` } : { boxShadow: 'none' }}
        >
          {item.badge}
        </motion.span>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-white/50 mb-4 font-body">{item.subtitle}</p>

      {/* Details */}
      <div className="space-y-1.5 relative">
        {item.details.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.55, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-2 text-xs"
          >
            <motion.span
              style={{ color: item.color }}
              animate={hovered ? { x: [0, 2, 0] } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              ▸
            </motion.span>
            <span className="text-white/60">{d}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CertCard({ cert, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-4 rounded-2xl relative overflow-hidden"
      style={{
        background: hovered ? `${cert.color}06` : 'rgba(255,255,255,0.02)',
        border: hovered ? `1px solid ${cert.color}35` : '1px solid rgba(255,255,255,0.06)',
        transform: hovered ? 'translateX(4px)' : 'none',
        boxShadow: hovered ? `0 8px 30px ${cert.color}12` : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Left color accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full transition-opacity duration-300"
        style={{
          background: `linear-gradient(to bottom, transparent, ${cert.color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
        animate={hovered ? { scale: 1.1, boxShadow: `0 0 20px ${cert.color}30` } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {cert.icon}
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-display font-semibold text-white truncate">{cert.title}</div>
        <div className="text-xs text-white/40 font-mono">{cert.issuer}</div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-sm font-bold font-display" style={{ color: cert.color }}>{cert.score}</div>
        <div className="text-[10px] text-white/30 font-mono">{cert.grade}</div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)', filter: 'blur(80px)' }}
          animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07), transparent 70%)', filter: 'blur(80px)' }}
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Floating trophies */}
        {['⭐', '🏆', '✦', '◆'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-[0.04] pointer-events-none select-none"
            style={{
              left: `${15 + i * 22}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header — UNCHANGED content */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// Achievements</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            Recognition & <span className="gradient-text">Excellence</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Achievements Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6 flex items-center gap-3"
            >
              <span className="flex-1 h-px bg-white/10" />
              Competitive Programming
              <span className="flex-1 h-px bg-white/10" />
            </motion.p>
            <div className="space-y-4">
              {achievements.map((item, i) => (
                <AchievementCapsule key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Certifications Right */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6 flex items-center gap-3"
            >
              <span className="flex-1 h-px bg-white/10" />
              Certifications
              <span className="flex-1 h-px bg-white/10" />
            </motion.p>

            <div className="space-y-3 mb-8">
              {certifications.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4 flex items-center gap-3"
            >
              <span className="flex-1 h-px bg-white/10" />
              Core CS Mastery
              <span className="flex-1 h-px bg-white/10" />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {[
                'DSA & Algorithms',
                'System Design',
                'OOP Principles',
                'DBMS',
                'OS Concepts',
                'Software Engineering',
                'SDLC',
                'REST Architecture',
              ].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={headerInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  whileHover={{
                    background: 'rgba(245,158,11,0.1)',
                    borderColor: 'rgba(245,158,11,0.3)',
                    color: '#f59e0b',
                    y: -2,
                    boxShadow: '0 4px 16px rgba(245,158,11,0.12)',
                  }}
                  className="skill-badge text-xs cursor-none"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
