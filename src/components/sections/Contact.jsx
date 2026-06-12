import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

/* ═══════════════════════════════════════════
   AVAILABILITY STATUS PANEL
   The first thing a recruiter should see
═══════════════════════════════════════════ */
function AvailabilityPanel({ inView }) {
  const roles = [
    { label: 'Software Engineering Internship', icon: '💼', color: '#10b981' },
    { label: 'Full-Time SWE Role',              icon: '🚀', color: '#10b981' },
    { label: 'Open Source Collaboration',        icon: '🤝', color: '#00d4ff' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: 'linear-gradient(160deg, rgba(10,22,14,0.80), rgba(5,12,8,0.85))',
        border: '1px solid rgba(16,185,129,0.22)',
        backdropFilter: 'blur(28px) saturate(160%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.55), 0 0 50px rgba(16,185,129,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Top prismatic edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(16,185,129,0.9), rgba(16,185,129,0.5) 70%, transparent 95%)' }}
      />
      {/* Inner sheen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, rgba(16,185,129,0.05) 0%, transparent 45%)' }}
      />

      <div className="p-5 relative">
        {/* Status header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex items-center justify-center">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: '#10b981', boxShadow: '0 0 8px #10b981, 0 0 16px #10b98160' }}
            />
            <motion.div
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{ background: '#10b981' }}
              animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Availability Status</div>
            <div className="text-sm font-display font-bold" style={{ color: '#10b981' }}>Open to Opportunities</div>
          </div>
        </div>

        <div className="space-y-2">
          {roles.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.07 }}
              className="flex items-center gap-3 py-2 px-3 rounded-xl"
              style={{
                background: `${r.color}08`,
                border: `1px solid ${r.color}18`,
              }}
            >
              <span className="text-sm flex-shrink-0">{r.icon}</span>
              <span className="text-xs font-mono" style={{ color: `${r.color}cc` }}>{r.label}</span>
              <div
                className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: r.color, boxShadow: `0 0 6px ${r.color}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SOCIAL CONTACT CARDS
   Primary action cards — not tiny icons
═══════════════════════════════════════════ */
const CONTACT_CHANNELS = [
  {
    name: 'Email',
    href: `mailto:${personalInfo.email}`,
    value: personalInfo.email,
    action: 'Send Direct Message',
    color: '#00d4ff',
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: personalInfo.linkedin,
    value: 'linkedin.com/in/harshit-kumar',
    action: 'Connect Professionally',
    color: '#0ea5e9',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: personalInfo.github,
    value: 'github.com/harshitkr13',
    action: 'View Projects & Code',
    color: '#a78bfa',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

function ContactCard({ channel, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.a
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden group"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.72), rgba(5,5,15,0.82))',
        border: `1px solid ${channel.color}18`,
        backdropFilter: 'blur(24px) saturate(160%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{
        x: 5,
        boxShadow: `0 4px 8px rgba(0,0,0,0.4), 0 20px 56px rgba(0,0,0,0.55), 0 0 40px ${channel.color}12, inset 0 1px 0 rgba(255,255,255,0.07)`,
        transition: { duration: 0.3 },
      }}
    >
      {/* Top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${channel.color}70, transparent)`,
          opacity: hovered ? 1 : 0.4,
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
            ? `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, ${channel.color}0c, transparent 70%)`
            : 'transparent',
          transition: 'background 0.15s ease',
        }}
      />
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full"
        style={{ background: `linear-gradient(to bottom, ${channel.color}, ${channel.color}30)` }}
        animate={hovered ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative"
        style={{
          background: `${channel.color}12`,
          border: `1px solid ${channel.color}25`,
          color: channel.color,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
        animate={hovered ? { scale: 1.08, boxShadow: `0 0 20px ${channel.color}35` } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {channel.icon}
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-0.5">{channel.name}</div>
        <div className="text-sm font-display font-semibold text-white/85 truncate">{channel.value}</div>
      </div>

      {/* Action label + arrow */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <span
          className="text-[10px] font-mono hidden sm:block whitespace-nowrap"
          style={{ color: `${channel.color}70` }}
        >
          {channel.action}
        </span>
        <motion.svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ color: `${channel.color}50` }}
          animate={hovered ? { x: 3, opacity: 1 } : { x: 0, opacity: 0.4 }}
          transition={{ duration: 0.25 }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </motion.svg>
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════
   CONTACT FORM
   Enhanced glass inputs with focus states
═══════════════════════════════════════════ */
function ContactForm({ inView }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = (field) => ({
    background: focused === field
      ? 'rgba(0,212,255,0.06)'
      : 'rgba(255,255,255,0.03)',
    border: focused === field
      ? '1px solid rgba(0,212,255,0.45)'
      : '1px solid rgba(255,255,255,0.08)',
    boxShadow: focused === field
      ? '0 0 24px rgba(0,212,255,0.12), inset 0 1px 0 rgba(0,212,255,0.08)'
      : 'inset 0 1px 0 rgba(255,255,255,0.03)',
    transition: 'all 0.25s ease',
    outline: 'none',
    color: '#fff',
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 32, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.72), rgba(5,5,15,0.82))',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(28px) saturate(160%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Top prismatic edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(0,212,255,0.8), rgba(124,58,237,0.6) 70%, transparent 95%)' }}
      />
      {/* Inner sheen */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.04) 0%, transparent 50%)' }}
      />
      {/* Focus ambient */}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{ background: 'radial-gradient(circle at 60% 30%, rgba(0,212,255,0.04), transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      <div className="p-7 relative">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(0,212,255,0.1))',
                  border: '1px solid rgba(16,185,129,0.3)',
                  boxShadow: '0 0 40px rgba(16,185,129,0.15)',
                }}
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 0.6 }}
              >
                ✉️
              </motion.div>
              <h3 className="font-display font-bold text-white text-xl mb-2" style={{ letterSpacing: '-0.02em' }}>
                Message Sent!
              </h3>
              <p className="text-white/45 text-sm mb-1">I'll get back to you within 24 hours.</p>
              <p className="text-white/25 text-xs font-mono mb-6">Response time is usually same day.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: 'rgba(0,212,255,0.7)',
                }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="mb-2">
                <div className="text-xs font-mono text-white/25 uppercase tracking-widest mb-1">Direct Message</div>
                <div className="text-base font-display font-semibold text-white/70" style={{ letterSpacing: '-0.01em' }}>
                  Start a Conversation
                </div>
              </div>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-white/35 uppercase tracking-widest mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm placeholder-white/20 font-mono"
                    style={inputStyle('name')}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/35 uppercase tracking-widest mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm placeholder-white/20 font-mono"
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-[10px] font-mono text-white/35 uppercase tracking-widest mb-2 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project, role, or collaboration idea..."
                  className="w-full px-4 py-3 rounded-xl text-sm placeholder-white/20 resize-none font-mono"
                  style={inputStyle('message')}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={!sending ? {
                  scale: 1.01,
                  boxShadow: '0 16px 48px rgba(0,212,255,0.45)',
                } : {}}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-display font-bold text-white text-sm relative overflow-hidden"
                style={{
                  background: sending
                    ? 'rgba(0,212,255,0.15)'
                    : 'linear-gradient(135deg, rgba(0,212,255,1), rgba(124,58,237,1))',
                  boxShadow: sending ? 'none' : '0 8px 32px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  transition: 'all 0.3s',
                  letterSpacing: '-0.01em',
                }}
              >
                {/* Shimmer */}
                {!sending && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  />
                )}

                <motion.span
                  animate={sending ? { opacity: 0 } : { opacity: 1 }}
                  className="flex items-center justify-center gap-2 relative z-10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  Send Message
                </motion.span>

                {sending && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  </motion.div>
                )}
              </motion.button>

              <p className="text-center text-[10px] font-mono text-white/20">
                Or reach me directly at{' '}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="transition-colors duration-200"
                  style={{ color: 'rgba(0,212,255,0.5)' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(0,212,255,0.9)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(0,212,255,0.5)'}
                >
                  {personalInfo.email}
                </a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CLOSING STATEMENT
   Final conversion moment
═══════════════════════════════════════════ */
function ClosingStatement({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="mt-12 relative rounded-2xl overflow-hidden text-center"
      style={{
        background: 'linear-gradient(160deg, rgba(14,14,28,0.65), rgba(5,5,15,0.75))',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(0,212,255,0.04)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), rgba(124,58,237,0.5), transparent)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(175deg, rgba(255,255,255,0.03) 0%, transparent 50%)' }}
      />
      <div className="p-6 relative">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-3">
          Why Reach Out
        </p>
        <p className="text-white/55 text-sm leading-relaxed max-w-lg mx-auto">
          Early-career engineer with{' '}
          <span style={{ color: '#10b981' }}>production-grade AI systems</span>,{' '}
          <span style={{ color: '#7c3aed' }}>full-stack architecture</span>, and{' '}
          <span style={{ color: '#f59e0b' }}>top 4.23% algorithmic ability</span>{' '}—
          ready to contribute from day one, not after months of onboarding.
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════ */
export default function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, margin: '-40px' });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* ── Parallax ambient background ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.12), rgba(0,212,255,0.05) 50%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute top-0 right-1/4 w-[500px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.06), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/2 left-0 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.05), transparent 70%)',
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
            <span className="section-tag">// Let's Connect</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)', letterSpacing: '-0.02em' }}
          >
            Ready for the{' '}
            <span className="gradient-text">Next Challenge</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-md mx-auto text-sm leading-relaxed"
          >
            Whether you're hiring, collaborating, or building something ambitious —
            I'm one message away. Response within 24 hours, guaranteed.
          </motion.p>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT — Status + Contact channels ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Availability panel */}
            <AvailabilityPanel inView={headerInView} />

            {/* Contact channel cards */}
            <div className="space-y-3">
              {CONTACT_CHANNELS.map((ch, i) => (
                <ContactCard key={ch.name} channel={ch} index={i} inView={headerInView} />
              ))}
            </div>

            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span className="text-[11px] font-mono text-white/30">{personalInfo.location}</span>
              <span className="text-[11px] font-mono text-white/15 mx-1">·</span>
              <span className="text-[11px] font-mono text-white/30">IST (UTC +5:30)</span>
            </motion.div>
          </div>

          {/* ── RIGHT — Contact form ── */}
          <div className="lg:col-span-3">
            <ContactForm inView={headerInView} />
          </div>
        </div>

        {/* ── Closing statement ── */}
        <div ref={footerRef}>
          <ClosingStatement inView={footerInView} />
        </div>

        {/* ── Portfolio footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-white/20 text-sm font-display mb-1">
            Designed & Built by{' '}
            <span className="text-white/40 font-medium">{personalInfo.name}</span>
          </p>
          <p className="text-white/10 text-xs font-mono">
            © {new Date().getFullYear()} · Software Engineer · Full-Stack Developer · Generative AI Engineer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
