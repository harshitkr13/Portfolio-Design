import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

const socials = [
  {
    name: 'GitHub',
    href: personalInfo.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: '#ffffff',
  },
  {
    name: 'LinkedIn',
    href: personalInfo.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077b5',
  },
  {
    name: 'Email',
    href: `mailto:${personalInfo.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: '#00d4ff',
  },
];

export default function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

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

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Layered atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.14) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)' }}
        />

        {/* Animated floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${50 + i * 25}px`,
              height: `${50 + i * 25}px`,
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              background: i % 3 === 0
                ? 'radial-gradient(circle, rgba(0,212,255,0.12), transparent 70%)'
                : i % 3 === 1
                  ? 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)'
                  : 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)',
              filter: 'blur(15px)',
            }}
            animate={{
              y: [0, -(18 + i * 4), 0],
              x: [0, (i % 2 === 0 ? 8 : -8), 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Horizontal light ray */}
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{
            top: '15%',
            background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), rgba(124,58,237,0.15), transparent)',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Header — UNCHANGED content */}
        <div ref={headerRef} className="text-center mb-16">
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
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.02em' }}
          >
            Let's Build Something{' '}
            <span className="gradient-text">Amazing Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed"
          >
            Whether it's software engineering, AI-powered products, or innovative ideas —
            I'm always open to discussing new opportunities and collaborations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info card — enhanced glass */}
            <motion.div
              className="p-6 rounded-3xl relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(0,212,255,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,212,255,0.06)',
                transition: { duration: 0.4 },
              }}
            >
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)' }} />

              <h3 className="font-display font-bold text-white text-base mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,212,255,0.3)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <div className="text-xs text-white/30 font-mono mb-0.5">Email</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm text-white/80 hover:text-[#00d4ff] transition-colors font-body"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </motion.div>
                  <div>
                    <div className="text-xs text-white/30 font-mono mb-0.5">Location</div>
                    <span className="text-sm text-white/80 font-body">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social links — enhanced */}
            <div className="space-y-3">
              {socials.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -24 }}
                  animate={headerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl group relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  whileHover={{
                    background: `${social.color}08`,
                    borderColor: `${social.color}35`,
                    x: 4,
                    boxShadow: `0 8px 30px ${social.color}12`,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Left accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to bottom, transparent, ${social.color}, transparent)` }}
                  />

                  <div className="text-white/50 group-hover:text-white transition-colors duration-300 ml-1">
                    {social.icon}
                  </div>
                  <span className="text-sm font-display font-medium text-white/60 group-hover:text-white transition-colors duration-300">
                    {social.name}
                  </span>
                  <motion.svg
                    width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="ml-auto text-white/20 group-hover:text-white/60"
                    animate={{}}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form — enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="lg:col-span-3"
          >
            <div
              className="p-8 rounded-3xl relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), rgba(124,58,237,0.4), transparent)' }} />

              {/* Inner corner glows */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 100% 0%, rgba(0,212,255,0.04), transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 100%, rgba(124,58,237,0.04), transparent 70%)' }} />

              {/* Focus ambient blur */}
              <AnimatePresence>
                {focused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none rounded-3xl"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.04), transparent 70%)' }}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      🚀
                    </motion.div>
                    <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm">I'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-xs font-mono text-white/30 hover:text-white/60 transition-colors underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5 relative"
                  >
                    {/* Name */}
                    <div>
                      <label className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2 block">
                        Name
                      </label>
                      <motion.input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white font-body placeholder-white/20"
                        style={{
                          background: focused === 'name' ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.03)',
                          border: focused === 'name' ? '1px solid rgba(0,212,255,0.45)' : '1px solid rgba(255,255,255,0.08)',
                          boxShadow: focused === 'name' ? '0 0 24px rgba(0,212,255,0.12), inset 0 1px 0 rgba(0,212,255,0.08)' : 'none',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2 block">
                        Email
                      </label>
                      <motion.input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white font-body placeholder-white/20"
                        style={{
                          background: focused === 'email' ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.03)',
                          border: focused === 'email' ? '1px solid rgba(0,212,255,0.45)' : '1px solid rgba(255,255,255,0.08)',
                          boxShadow: focused === 'email' ? '0 0 24px rgba(0,212,255,0.12), inset 0 1px 0 rgba(0,212,255,0.08)' : 'none',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2 block">
                        Message
                      </label>
                      <motion.textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        placeholder="Tell me about your project or opportunity..."
                        className="w-full px-4 py-3 rounded-xl text-sm text-white font-body placeholder-white/20 resize-none"
                        style={{
                          background: focused === 'message' ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.03)',
                          border: focused === 'message' ? '1px solid rgba(0,212,255,0.45)' : '1px solid rgba(255,255,255,0.08)',
                          boxShadow: focused === 'message' ? '0 0 24px rgba(0,212,255,0.12), inset 0 1px 0 rgba(0,212,255,0.08)' : 'none',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(0,212,255,0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl font-display font-bold text-white text-sm relative overflow-hidden"
                      style={{
                        background: sending ? 'rgba(0,212,255,0.2)' : 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                        boxShadow: sending ? 'none' : '0 8px 32px rgba(0,212,255,0.3)',
                        transition: 'all 0.3s',
                      }}
                    >
                      {/* Shimmer overlay */}
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
                        className="flex items-center justify-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                        Let's Connect
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
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Footer — UNCHANGED content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-20 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-white/20 text-sm font-body mb-2">
            Designed & Built by{' '}
            <span className="text-white/40 font-display font-medium">{personalInfo.name}</span>
          </p>
          <p className="text-white/10 text-xs font-mono">
            © 2025 · Software Engineer · Full-Stack Developer · AI Engineer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
