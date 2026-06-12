import { useRef, Suspense, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

/* ─── Role badge icons ─── */
const roleIcons = {
  'Software Engineer':      '</>',
  'Full-Stack Developer':   '≋',
  'Generative AI Engineer': '⊕',
  'Problem Solver':         '◈',
};

/* ─── Stats data ─── */
const heroStats = [
  { value: '500+',      label: 'Problems Solved',    sub: 'DSA',      icon: '</>' },
  { value: '1907',      label: 'LeetCode Rating',    sub: 'Knight',   icon: '🏆' },
  { value: 'Top 4.23%', label: 'Global Ranking',     sub: 'LeetCode', icon: '↗'  },
  { value: 'AIR 7042',  label: 'WBJEE 2023',         sub: 'Top 6%',   icon: '◎'  },
  { value: '8.0 CGPA',  label: 'CSE Undergraduate',  sub: 'B.Tech',   icon: '🎓' },
];

/* ═══════════════════════════════════════════
   GLASS MATERIAL SYSTEM
   Consistent premium glass properties reused across all glass surfaces
═══════════════════════════════════════════ */
const glass = {
  // Base glass — availability badge, role pills
  soft: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  },
  // Medium glass — nav, secondary button
  medium: {
    background: 'rgba(8,10,20,0.65)',
    border: '1px solid rgba(255,255,255,0.10)',
    backdropFilter: 'blur(40px) saturate(200%)',
    WebkitBackdropFilter: 'blur(40px) saturate(200%)',
  },
  // Deep glass — stats card
  deep: {
    background: 'linear-gradient(160deg, rgba(15,15,30,0.75) 0%, rgba(5,5,15,0.85) 100%)',
    border: '1px solid rgba(255,255,255,0.07)',
    backdropFilter: 'blur(48px) saturate(220%)',
    WebkitBackdropFilter: 'blur(48px) saturate(220%)',
  },
};

/* ═══════════════════════════════════════════
   3-D SCENE — purposeful, compositional
═══════════════════════════════════════════ */

/* Wireframe sphere — left framing device */
function WireframeSphere({ position }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.006;
    ref.current.rotation.x = s.clock.elapsedTime * 0.003;
  });
  return (
    <Float speed={0.4} floatIntensity={0.6} rotationIntensity={0}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshStandardMaterial
          color="#4f88f8"
          wireframe
          transparent
          opacity={0.055}
          emissive="#4f88f8"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

/* Corner geometries — depth framing devices */
function CornerGeometry({ position, color, type }) {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.007;
    ref.current.rotation.z = s.clock.elapsedTime * 0.004;
  });
  return (
    <Float speed={0.5} floatIntensity={0.4} rotationIntensity={0}>
      <mesh ref={ref} position={position}>
        {type === 'oct' && <octahedronGeometry args={[1.1]} />}
        {type === 'tet' && <tetrahedronGeometry args={[1.1]} />}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.045}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  );
}

/* ── IMPROVEMENT 2: 3-layer atmospheric particle field ── */
function AtmosphericParticles() {
  const count = 320;

  /* Layer 1 — very distant (slow) */
  const distantPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 20;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos((Math.random() * 2) - 1);
      arr[i * 3]     = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p) - 12;
    }
    return arr;
  }, []);

  /* Layer 2 — midground nebula particles */
  const midPositions = useMemo(() => {
    const arr = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      const r = 8 + Math.random() * 10;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos((Math.random() * 2) - 1);
      arr[i * 3]     = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p) - 6;
    }
    return arr;
  }, []);

  const distantColors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [[0.31, 0.53, 0.97], [0.49, 0.23, 0.93], [0.22, 0.75, 0.96]];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c[0]; arr[i * 3 + 1] = c[1]; arr[i * 3 + 2] = c[2];
    }
    return arr;
  }, []);

  const midColors = useMemo(() => {
    const arr = new Float32Array(80 * 3);
    const palette = [[0.38, 0.74, 1], [0.60, 0.40, 1]];
    for (let i = 0; i < 80; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c[0]; arr[i * 3 + 1] = c[1]; arr[i * 3 + 2] = c[2];
    }
    return arr;
  }, []);

  const distantRef = useRef();
  const midRef     = useRef();

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    /* different rotation speeds = parallax depth */
    if (distantRef.current) distantRef.current.rotation.y = t * 0.008;
    if (midRef.current)     midRef.current.rotation.y     = t * 0.018;
  });

  return (
    <>
      {/* Layer 1 — very distant, small */}
      <points ref={distantRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={distantPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={count} array={distantColors}    itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.5} sizeAttenuation />
      </points>
      {/* Layer 2 — midground, slightly larger, brighter */}
      <points ref={midRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={80} array={midPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={80} array={midColors}    itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.09} vertexColors transparent opacity={0.7} sizeAttenuation />
      </points>
    </>
  );
}

/* ── IMPROVEMENT 7: Spring-based camera movement ── */
function MouseCamera() {
  const { camera } = useThree();
  const targetX = useRef(0);
  const targetY = useRef(0);
  const curX    = useRef(0);
  const curY    = useRef(0);

  useEffect(() => {
    const fn = (e) => {
      targetX.current = (e.clientX / window.innerWidth  - 0.5) * 0.7;
      targetY.current = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  useFrame(() => {
    /* spring-like lerp — feels physical, not linear */
    const friction = 0.025;
    curX.current += (targetX.current - curX.current) * friction;
    curY.current += (targetY.current - curY.current) * friction;
    camera.position.x = curX.current;
    camera.position.y = curY.current;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.06} />
      {/* Primary cinematic light — behind the heading position */}
      <pointLight position={[0, 2, 4]}   intensity={1.2} color="#6366f1" distance={20} decay={2} />
      {/* Secondary fill — left side */}
      <pointLight position={[-12, 4, -6]} intensity={0.5} color="#38bdf8" distance={30} decay={2} />
      {/* Rim light — right edge */}
      <pointLight position={[12, -4, -8]} intensity={0.3} color="#9168f0" distance={30} decay={2} />

      {/* Stars — 3 layers at different radii for depth */}
      <Stars radius={80}  depth={60} count={3000} factor={3}   saturation={0}   fade speed={0.2} />
      <Stars radius={140} depth={40} count={2000} factor={2.5} saturation={0.1} fade speed={0.12} />

      <AtmosphericParticles />

      {/* Compositional framing geometry */}
      <WireframeSphere position={[-10, 0.5, -14]} />
      <CornerGeometry  position={[-12, -5.5, -15]} color="#4f88f8" type="tet" />
      <CornerGeometry  position={[12,  -5.5, -15]} color="#9168f0" type="oct" />

      <MouseCamera />

      {/* IMPROVEMENT 3: stronger bloom on lights */}
      <EffectComposer>
        <Bloom
          intensity={0.75}
          luminanceThreshold={0.35}
          luminanceSmoothing={0.85}
          blendFunction={BlendFunction.SCREEN}
        />
      </EffectComposer>
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN HERO COMPONENT
═══════════════════════════════════════════ */
export default function Hero() {
  const roles = personalInfo.roles;
  const [statsHover, setStatsHover] = useState(null);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.10, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
    show:   { opacity: 1, y: 0,  filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{
        justifyContent: 'center',
        paddingTop: '64px',
        background: 'radial-gradient(ellipse 90% 70% at 50% 48%, rgba(124,58,237,0.18) 0%, rgba(0,212,255,0.06) 45%, #050505 72%)',
      }}
    >
      {/* ── 3-D Canvas ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 9], fov: 56 }}
            style={{ background: 'transparent' }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            performance={{ min: 0.5 }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* ═══════════════════════════════════════
          IMPROVEMENT 2 — 3-layer CSS atmospheric depth
      ═══════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Depth Layer 1 — very far, almost static nebula */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '800px', height: '600px',
            top: '-20%', left: '-18%',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)',
            filter: 'blur(120px)',
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Depth Layer 2 — midground, moves slightly */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            top: '15%', right: '-12%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
          animate={{ x: [0, -12, 0], y: [0, 10, 0], opacity: [0.25, 0.40, 0.25] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        {/* Depth Layer 3 — foreground atmosphere, warmer */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '400px', height: '280px',
            bottom: '8%', left: '50%', transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse, rgba(79,136,248,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 7 }}
        />

        {/* IMPROVEMENT 3 — Primary volumetric light behind heading */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '760px', height: '420px',
            top: '20%', left: '50%', transform: 'translateX(-50%)',
            /* two-color radial: indigo core → cyan halo */
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.22) 0%, rgba(56,189,248,0.09) 55%, transparent 75%)',
            filter: 'blur(55px)',
          }}
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.035, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Soft ambient edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,5,15,0.45) 100%)',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════
          CONTENT LAYER
      ═══════════════════════════════════════ */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full flex flex-col items-center px-6"
        style={{ maxWidth: '960px', margin: '0 auto' }}
      >

        {/* 1 — AVAILABILITY BADGE — IMPROVEMENT 1 + 8 */}
        <motion.div variants={fadeUp} className="mb-7">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full relative overflow-hidden"
            style={{
              ...glass.soft,
              border: '1px solid rgba(0,212,255,0.18)',
              boxShadow: [
                '0 0 0 1px rgba(0,212,255,0.06)',
                '0 0 28px rgba(0,212,255,0.10)',
                'inset 0 1px 0 rgba(255,255,255,0.12)',
                'inset 0 -1px 0 rgba(0,0,0,0.15)',
              ].join(', '),
            }}
          >
            {/* IMPROVEMENT 8 — animated highlight sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
            />
            {/* Top inner glass highlight */}
            <div className="absolute top-0 left-6 right-6 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />

            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ background: '#22c55e' }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.9), 0 0 4px rgba(34,197,94,0.6)' }} />
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10.5px',
              letterSpacing: '0.13em',
              color: 'rgba(255,255,255,0.68)',
              textTransform: 'uppercase',
            }}>
              Available for Opportunities
            </span>
          </div>
        </motion.div>

        {/* 2 — NAME — IMPROVEMENT 3 + 8 */}
        <motion.div variants={fadeUp} className="mb-7 text-center relative">
          {/* Volumetric light bloom behind heading */}
          <div className="absolute pointer-events-none" style={{
            inset: '-60px -100px',
            background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(99,102,241,0.20) 0%, rgba(56,189,248,0.08) 50%, transparent 75%)',
            filter: 'blur(28px)',
            zIndex: -1,
          }} />
          {/* Soft white halo just behind text */}
          <div className="absolute pointer-events-none" style={{
            inset: '0 -20px',
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.025), transparent 70%)',
            zIndex: -1,
          }} />

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(56px, 10.5vw, 120px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            color: '#f0f4ff',
            /* Subtle white text glow — feels illuminated */
            textShadow: '0 0 60px rgba(255,255,255,0.07), 0 2px 4px rgba(0,0,0,0.5)',
          }}>
            Harshit{' '}
            <span style={{
              background: 'linear-gradient(125deg, #60c8ff 0%, #818cf8 38%, #b09dff 68%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              /* IMPROVEMENT 8 — glow on gradient text */
              filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.50)) drop-shadow(0 0 8px rgba(96,200,255,0.25))',
            }}>
              Kumar
            </span>
          </h1>
        </motion.div>

        {/* 3 — ROLE BADGES — IMPROVEMENT 1: true glass chips */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center mb-7"
          style={{ gap: '8px' }}
        >
          {roles.map((role) => (
            <motion.span
              key={role}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full relative overflow-hidden"
              style={{
                ...glass.soft,
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: [
                  'inset 0 1px 0 rgba(255,255,255,0.10)',
                  'inset 0 -1px 0 rgba(0,0,0,0.12)',
                  '0 2px 8px rgba(0,0,0,0.20)',
                ].join(', '),
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                fontWeight: 450,
                color: 'rgba(255,255,255,0.62)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.005em',
              }}
              whileHover={{
                background: 'rgba(99,102,241,0.10)',
                borderColor: 'rgba(99,102,241,0.30)',
                color: 'rgba(255,255,255,0.90)',
                boxShadow: '0 0 20px rgba(99,102,241,0.14), inset 0 1px 0 rgba(255,255,255,0.14)',
                y: -1,
              }}
              transition={{ duration: 0.18 }}
            >
              {/* Per-badge top highlight */}
              <div className="absolute top-0 left-4 right-4 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)' }} />
              <span style={{ fontSize: '11px', opacity: 0.5, fontFamily: 'monospace' }}>
                {roleIcons[role] || '</>'}
              </span>
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* 4 — TAGLINE — IMPROVEMENT 5: better visual flow */}
        <motion.div variants={fadeUp} className="mb-10 text-center" style={{ maxWidth: '700px' }}>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(17px, 2.3vw, 23px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.65,
            letterSpacing: '-0.01em',
          }}>
            {personalInfo.headline}
          </p>
        </motion.div>

        {/* 5 — STATS CARD — IMPROVEMENT 1 + 4 + 8 */}
        <motion.div variants={fadeUp} className="w-full mb-9">
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              ...glass.deep,
              boxShadow: [
                /* Outer depth shadow */
                '0 2px 4px rgba(0,0,0,0.4)',
                '0 8px 32px rgba(0,0,0,0.55)',
                '0 24px 80px rgba(0,0,0,0.35)',
                /* Inner top highlight — glass feels solid */
                'inset 0 1px 0 rgba(255,255,255,0.13)',
                /* Inner bottom — optical depth */
                'inset 0 -1px 0 rgba(0,0,0,0.35)',
                /* Subtle edge glow */
                '0 0 0 1px rgba(255,255,255,0.04)',
                '0 0 60px rgba(99,102,241,0.05)',
              ].join(', '),
            }}
          >
            {/* IMPROVEMENT 4 + 8 — Inner glass reflection sheen */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
              background: 'linear-gradient(175deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 25%, transparent 55%, rgba(0,0,0,0.10) 100%)',
            }} />

            {/* Top prismatic edge highlight */}
            <div className="absolute top-0 left-[8%] right-[8%] h-[1px]" style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.80) 25%, rgba(56,189,248,0.80) 75%, transparent 100%)',
              boxShadow: '0 0 16px rgba(99,102,241,0.35), 0 0 4px rgba(56,189,248,0.25)',
            }} />

            {/* Bottom inner shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background: 'rgba(0,0,0,0.5)' }} />

            {/* IMPROVEMENT 8 — slow animated highlight sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.035) 50%, transparent 75%)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
            />

            <div className="hero-stats-grid grid grid-cols-5 divide-x divide-white/[0.05]">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.value}
                  className="flex flex-col items-center justify-center py-7 px-3 relative overflow-hidden"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.50 + i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  onHoverStart={() => setStatsHover(i)}
                  onHoverEnd={() => setStatsHover(null)}
                >
                  {/* Per-column hover: radial indigo glow */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: statsHover === i ? 1 : 0 }}
                    transition={{ duration: 0.30 }}
                    style={{
                      background: 'radial-gradient(ellipse at 50% 35%, rgba(99,102,241,0.13), transparent 70%)',
                    }}
                  />
                  {/* Per-column top micro-line on hover */}
                  <motion.div
                    className="absolute top-0 left-[15%] right-[15%] h-[1px]"
                    animate={{ opacity: statsHover === i ? 1 : 0, scaleX: statsHover === i ? 1 : 0 }}
                    style={{ background: 'rgba(99,102,241,0.6)', transformOrigin: '50% 0' }}
                    transition={{ duration: 0.25 }}
                  />

                  {/* Icon */}
                  <span className="mb-2 relative block" style={{
                    color: '#60c8ff',
                    fontSize: '16px',
                    fontFamily: 'monospace',
                    filter: 'drop-shadow(0 0 10px rgba(96,200,255,0.55))',
                    transition: 'filter 0.3s',
                  }}>
                    {stat.icon}
                  </span>

                  {/* Value */}
                  <motion.span
                    className="relative font-bold leading-none mb-1.5"
                    animate={{ color: statsHover === i ? '#ffffff' : '#f0f4ff' }}
                    transition={{ duration: 0.20 }}
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'clamp(17px, 2.2vw, 24px)',
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {stat.value}
                  </motion.span>

                  {/* Label */}
                  <span className="relative text-center leading-tight" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.40)',
                    fontWeight: 400,
                  }}>
                    {stat.label}
                  </span>

                  {/* Sub-label */}
                  <span className="relative text-center leading-tight mt-1" style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '9.5px',
                    color: 'rgba(255,255,255,0.22)',
                    letterSpacing: '0.05em',
                  }}>
                    {stat.sub}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 6 — CTA BUTTONS — IMPROVEMENT 1: better glass on secondary */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center" style={{ gap: '14px' }}>
          <MagneticBtn
            href="#projects"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            primary
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
            Explore My Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticBtn>

          <MagneticBtn href={personalInfo.resumeUrl} download>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Resume
          </MagneticBtn>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <motion.span
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 9, 0], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '38px',
            background: 'linear-gradient(to bottom, rgba(99,102,241,0.7), transparent)',
            borderRadius: '1px',
          }}
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAGNETIC CTA BUTTON — IMPROVEMENT 1 + 7 + 8
═══════════════════════════════════════════ */
function MagneticBtn({ children, href, primary, onClick, download }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 18 });
  const springY = useSpring(y, { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width  / 2) * 0.20);
    y.set((e.clientY - rect.top  - rect.height / 2) * 0.24);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const primaryStyle = {
    padding: '13px 26px',
    borderRadius: '100px',
    background: 'linear-gradient(130deg, #4f88f8 0%, #6366f1 45%, #9168f0 100%)',
    border: '1px solid rgba(255,255,255,0.14)',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '14.5px',
    fontWeight: 600,
    color: '#fff',
    cursor: 'none',
    boxShadow: [
      '0 1px 0 rgba(255,255,255,0.15) inset',
      '0 -1px 0 rgba(0,0,0,0.20) inset',
      '0 6px 28px rgba(99,102,241,0.38)',
      '0 2px 8px rgba(0,0,0,0.25)',
    ].join(', '),
    textDecoration: 'none',
    letterSpacing: '0.01em',
  };

  const secondaryStyle = {
    padding: '13px 26px',
    borderRadius: '100px',
    background: 'rgba(255,255,255,0.045)',
    border: '1px solid rgba(255,255,255,0.13)',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '14.5px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.78)',
    cursor: 'none',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    textDecoration: 'none',
    letterSpacing: '0.01em',
    boxShadow: [
      'inset 0 1px 0 rgba(255,255,255,0.10)',
      'inset 0 -1px 0 rgba(0,0,0,0.12)',
      '0 2px 12px rgba(0,0,0,0.20)',
    ].join(', '),
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2.5 relative overflow-hidden"
      style={{
        ...(primary ? primaryStyle : secondaryStyle),
        x: springX,
        y: springY,
      }}
      whileHover={
        primary
          ? { boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset, 0 10px 40px rgba(99,102,241,0.52), 0 3px 10px rgba(0,0,0,0.3)' }
          : { background: 'rgba(255,255,255,0.075)', borderColor: 'rgba(255,255,255,0.22)', color: '#fff',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 4px 20px rgba(0,0,0,0.25)' }
      }
      transition={{ duration: 0.22 }}
    >
      {/* Top inner glass highlight line */}
      <div className="absolute top-0 left-8 right-8 h-[1px] pointer-events-none"
        style={{ background: primary
          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)'
          : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

      {/* IMPROVEMENT 8 — shimmer sweep on primary */}
      {primary && (
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.14) 50%, transparent 62%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.a>
  );
}
