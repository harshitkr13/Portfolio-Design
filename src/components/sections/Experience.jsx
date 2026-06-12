import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { experience, education } from '../../data/portfolio';

function ExperienceItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 mb-8 group"
    >
      {/* Left — dot + animated line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 280 }}
          className="w-4 h-4 rounded-full flex-shrink-0 mt-1 relative"
          style={{
            background: `radial-gradient(circle, ${item.color}, ${item.color}50)`,
            boxShadow: `0 0 20px ${item.color}70, 0 0 40px ${item.color}30`,
          }}
        >
          {/* Ping ring */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: item.color, opacity: 0.25, animationDuration: '2.5s' }}
          />
          {/* Secondary pulse */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{ border: `1px solid ${item.color}40` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          />
        </motion.div>
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.4, duration: 0.7 }}
          className="flex-1 w-px mt-2"
          style={{
            background: `linear-gradient(to bottom, ${item.color}60, ${item.color}15, transparent)`,
          }}
        />
      </div>

      {/* Right — glass card */}
      <motion.div
        className="flex-1 p-6 rounded-2xl mb-4 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          background: `${item.color}06`,
          borderColor: `${item.color}35`,
          y: -3,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${item.color}10`,
          transition: { duration: 0.35 },
        }}
      >
        {/* Top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: `linear-gradient(90deg, ${item.color}70, ${item.color}20, transparent)`,
          }}
        />

        {/* Left side accent bar */}
        <motion.div
          className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
          style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}30)` }}
          animate={hovered ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner accent dot */}
        <div
          className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full transition-opacity duration-300"
          style={{
            background: item.color,
            boxShadow: `0 0 8px ${item.color}`,
            opacity: hovered ? 0.9 : 0.3,
          }}
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 pl-2">
          <div>
            <h3 className="font-display font-bold text-white text-base" style={{ letterSpacing: '-0.01em' }}>
              {item.title}
            </h3>
            <p className="text-sm font-mono mt-0.5" style={{ color: item.color }}>{item.company}</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2">
            <span
              className="text-xs px-3 py-1 rounded-full font-mono"
              style={{
                background: `${item.color}12`,
                border: `1px solid ${item.color}30`,
                color: item.color,
              }}
            >
              {item.type}
            </span>
            <span className="text-xs text-white/30 font-mono whitespace-nowrap">{item.duration}</span>
          </div>
        </div>

        <p className="text-sm text-white/50 mb-4 leading-relaxed pl-2">{item.description}</p>

        {/* Highlights with animated arrows */}
        <div className="space-y-2 pl-2">
          {item.highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.12 + 0.5 + i * 0.06 }}
              className="flex items-start gap-3 text-sm"
            >
              <motion.span
                style={{ color: item.color, flexShrink: 0 }}
                animate={hovered ? { x: [0, 3, 0] } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                ◆
              </motion.span>
              <span className="text-white/60 leading-snug">{h}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function EducationItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-6 group"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 280 }}
          className="w-4 h-4 rounded-full flex-shrink-0 mt-1 relative"
          style={{
            background: `radial-gradient(circle, ${item.color}, ${item.color}50)`,
            boxShadow: `0 0 20px ${item.color}70, 0 0 40px ${item.color}30`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: item.color, opacity: 0.2, animationDuration: '3s' }}
          />
        </motion.div>
      </div>

      <motion.div
        className="flex-1 p-6 rounded-2xl relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          background: `${item.color}06`,
          borderColor: `${item.color}35`,
          y: -3,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${item.color}10`,
          transition: { duration: 0.35 },
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, ${item.color}70, ${item.color}20, transparent)` }}
        />

        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
          style={{ background: `linear-gradient(to bottom, ${item.color}, ${item.color}30)` }}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 pl-2">
          <div>
            <h3 className="font-display font-bold text-white text-base">{item.degree}</h3>
            <p className="text-sm mt-0.5" style={{ color: item.color }}>{item.field}</p>
            <p className="text-sm text-white/50 mt-0.5">{item.institution}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <motion.div
              className="text-2xl font-display font-bold"
              style={{ color: item.color }}
              animate={hovered ? { textShadow: `0 0 20px ${item.color}80` } : { textShadow: 'none' }}
            >
              {item.cgpa}
            </motion.div>
            <div className="text-xs text-white/30 font-mono">CGPA</div>
            <div className="text-xs text-white/30 font-mono mt-1">{item.duration}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pl-2">
          {item.coursework.map(c => (
            <motion.span
              key={c}
              className="text-[11px] px-2.5 py-1 rounded-full font-mono"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.5)',
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
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Parallax ambient background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07), transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.06), transparent 70%)', filter: 'blur(80px)' }}
        />
      </motion.div>

      {/* Vertical timeline gradient line */}
      <div
        className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.08) 20%, rgba(124,58,237,0.08) 80%, transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header — UNCHANGED content */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// Experience & Education</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            Engineering <span className="gradient-text">Trajectory</span>
          </motion.h2>
        </div>

        {/* Professional divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest flex items-center gap-3">
            <motion.span
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.4))' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            Professional
            <motion.span
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.4))' }}
              initial={{ scaleX: 0, originX: 1 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </p>
        </motion.div>

        {experience.map((item, i) => (
          <ExperienceItem key={item.id} item={item} index={i} />
        ))}

        {/* Education divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-6 mt-4"
        >
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest flex items-center gap-3">
            <motion.span
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.4))' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            Education
            <motion.span
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to left, transparent, rgba(124,58,237,0.4))' }}
              initial={{ scaleX: 0, originX: 1 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </p>
        </motion.div>

        {education.map((item, i) => (
          <EducationItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
