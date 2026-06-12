import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../../data/portfolio';

function useCounter(target, isActive, duration = 2200, isDecimal = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Elastic ease-out
      const eased    = 1 - Math.pow(1 - progress, 4);
      const current  = target * eased;
      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isActive, target, duration, isDecimal]);

  return count;
}

function StatCounter({ stat, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);
  const isDecimal = !Number.isInteger(stat.value);
  const count     = useCounter(stat.value, inView, 2000 + index * 100, isDecimal);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.88 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="stat-card relative overflow-hidden group cursor-none"
      style={{
        '--stat-color': stat.color,
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.4), 0 0 40px ${stat.color}20`
          : '0 4px 20px rgba(0,0,0,0.15)',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s',
      }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% -20%, ${stat.color}18, transparent 65%)` }}
      />

      {/* Shimmer sweep on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${stat.color}12 50%, transparent 60%)`,
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
          transition={{ duration: 1.5, ease: 'linear' }}
        />
      )}

      {/* Icon with glow */}
      <motion.div
        className="text-3xl mb-3"
        animate={hovered ? { scale: 1.2, rotate: [0, -5, 5, 0] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {stat.icon}
      </motion.div>

      {/* Animated counter value */}
      <div className="flex items-end justify-center gap-0.5 mb-2">
        {stat.prefix && (
          <span className="font-display font-bold text-xl" style={{ color: stat.color }}>
            {stat.prefix}
          </span>
        )}
        <motion.span
          className="font-display font-bold leading-none"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: stat.color }}
          animate={inView && hovered ? { textShadow: `0 0 30px ${stat.color}80` } : { textShadow: 'none' }}
        >
          {count}
        </motion.span>
        {stat.suffix && (
          <span className="font-display font-bold text-xl pb-1" style={{ color: stat.color }}>
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <div className="text-xs text-white/50 font-body leading-snug">{stat.label}</div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-2 right-2 w-2 h-2 rounded-full transition-opacity duration-300"
        style={{ background: stat.color, boxShadow: `0 0 6px ${stat.color}`, opacity: hovered ? 0.8 : 0.2 }}
      />
    </motion.div>
  );
}

export default function Stats() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="stats" aria-label="Key Statistics" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated top border */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, transparent)' }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Animated bottom border */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #00d4ff, transparent)' }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,212,255,0.9) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Center glow */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.05), transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header — UNCHANGED */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// Proof of Skill</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}
          >
            Numbers That <span className="gradient-text">Define Excellence</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
