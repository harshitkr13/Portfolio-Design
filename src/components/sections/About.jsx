import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

const journey = [
  {
    year: '2023',
    icon: '🎓',
    title: 'Started B.Tech at Techno Main Salt Lake',
    description: 'Began Computer Science Engineering journey with a focus on building strong fundamentals in DSA, OOP, and software engineering.',
    color: '#00d4ff',
    tag: 'Education',
  },
  {
    year: '2023',
    icon: '⚡',
    title: 'Competitive Programming Journey',
    description: 'Dived deep into competitive programming. Started solving DSA problems consistently across LeetCode, CodeChef, and GeeksforGeeks.',
    color: '#f59e0b',
    tag: 'CP',
  },
  {
    year: '2024',
    icon: '🚀',
    title: 'Full-Stack Development',
    description: 'Built production-ready applications using React, Node.js, and MongoDB. Mastered the MERN stack and REST API design.',
    color: '#7c3aed',
    tag: 'Engineering',
  },
  {
    year: '2024',
    icon: '🤖',
    title: 'Generative AI Engineering',
    description: 'Explored LangChain, RAG architectures, OpenAI and Gemini APIs. Built AI-powered products that reduce errors and enhance user experience.',
    color: '#10b981',
    tag: 'AI / GenAI',
  },
  {
    year: '2025',
    icon: '🏆',
    title: 'LeetCode Knight Achievement',
    description: 'Achieved Knight badge on LeetCode with 1907 rating — Top 4.23% globally. Contest Rank 496 among 30,000+ participants.',
    color: '#f59e0b',
    tag: 'Milestone',
  },
  {
    year: '2025',
    icon: '🛠️',
    title: 'AlgoForge & AI Study Planner',
    description: 'Built two flagship products: an AI-powered coding platform (AlgoForge) and an intelligent study assistant — both with measurable engineering impact.',
    color: '#00d4ff',
    tag: 'Products',
  },
];

function JourneyCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6"
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.09 + 0.2, type: 'spring', stiffness: 300 }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 z-10 relative"
          style={{
            background: `radial-gradient(circle, ${item.color}35, ${item.color}12)`,
            border: `1px solid ${item.color}45`,
            boxShadow: `0 0 24px ${item.color}30, 0 0 8px ${item.color}15 inset`,
          }}
        >
          {item.icon}
          {/* Ripple */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${item.color}60` }}
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
          />
        </motion.div>
        {index < journey.length - 1 && (
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.09 + 0.4, duration: 0.7 }}
            className="flex-1 w-[1px] mt-2"
            style={{
              background: `linear-gradient(to bottom, ${item.color}60, ${item.color}10, transparent)`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 mb-8 p-6 rounded-2xl relative overflow-hidden group"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        whileHover={{
          background: `${item.color}06`,
          borderColor: `${item.color}30`,
          y: -3,
          boxShadow: `0 20px 60px ${item.color}10, 0 0 30px ${item.color}08`,
          transition: { duration: 0.35 },
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: `linear-gradient(90deg, transparent, ${item.color}70, transparent)` }}
        />

        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-mono px-3 py-1 rounded-full"
            style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}
          >
            {item.tag}
          </span>
          <span className="text-xs font-mono text-white/30">{item.year}</span>
        </div>
        <h3 className="text-base font-semibold text-white mb-2 font-display">{item.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  // Section parallax
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Parallax grid background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: gridY }}
      >
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)', filter: 'blur(80px)' }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07), transparent 70%)', filter: 'blur(80px)' }}
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header — UNCHANGED content */}
        <div ref={headerRef} className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-6"
          >
            <span className="section-tag">// About Me</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            My <span className="gradient-text">Engineering Journey</span>
          </motion.h2>

          {/* Bio card — enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto p-6 rounded-2xl relative overflow-hidden text-left"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
            whileHover={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(0,212,255,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(0,212,255,0.06)',
              transition: { duration: 0.4 },
            }}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)' }} />

            <p className="text-white/60 leading-relaxed text-sm mb-4">{personalInfo.bio}</p>
            <p className="text-white/60 leading-relaxed text-sm">
              I continuously explore emerging technologies in Artificial Intelligence, Software Engineering, and Cloud Computing while strengthening my foundations in Data Structures, Algorithms, System Design, and Computer Science fundamentals.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['System Design', 'AI Engineering', 'Scalable Architecture', 'DSA', 'Cloud Computing'].map(tag => (
                <motion.span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full font-mono"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
                  whileHover={{ background: 'rgba(0,212,255,0.08)', borderColor: 'rgba(0,212,255,0.25)', color: '#00d4ff' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Journey timeline */}
        <div className="space-y-0">
          {journey.map((item, i) => (
            <JourneyCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
