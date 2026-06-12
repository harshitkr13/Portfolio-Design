import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/* Trail dots rendered via canvas instead of React hook array */
function TrailCanvas({ mouseX, mouseY, isHovering }) {
  const canvasRef = useRef(null);
  const trail = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const unsubX = mouseX.on('change', (x) => {
      const y = mouseY.get();
      trail.current.push({ x, y, age: 0 });
      if (trail.current.length > 10) trail.current.shift();
    });
    const unsubY = mouseY.on('change', (y) => {
      const x = mouseX.get();
      trail.current.push({ x, y, age: 0 });
      if (trail.current.length > 10) trail.current.shift();
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!isHovering.current) {
        trail.current.forEach((pt, i) => {
          const ratio  = i / trail.current.length;
          const radius = Math.max(0.5, 2.5 * ratio);
          const alpha  = ratio * 0.5;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.shadowBlur  = 8;
          ctx.shadowColor = 'rgba(0,212,255,0.6)';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99985,
      }}
    />
  );
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText]  = useState('');
  const [isClicking, setIsClicking]  = useState(false);
  const [isMobile,   setIsMobile]    = useState(false);

  const isHoveringRef = useRef(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const outerX = useSpring(mouseX, { damping: 28, stiffness: 180, mass: 0.9 });
  const outerY = useSpring(mouseY, { damping: 28, stiffness: 180, mass: 0.9 });
  const dotX   = useSpring(mouseX, { damping: 12, stiffness: 500 });
  const dotY   = useSpring(mouseY, { damping: 12, stiffness: 500 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move  = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    const down  = ()  => setIsClicking(true);
    const up    = ()  => setIsClicking(false);

    const enter = (e) => {
      const el = e.target.closest('[data-cursor], a, button');
      if (el) {
        setIsHovering(true);
        isHoveringRef.current = true;
        setCursorText(el.dataset?.cursor || '');
      }
    };
    const leave = () => {
      setIsHovering(false);
      isHoveringRef.current = false;
      setCursorText('');
    };

    window.addEventListener('mousemove', move,  { passive: true });
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);

    const targets = document.querySelectorAll('a, button, [data-cursor]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  const outerSize = isClicking ? 26 : isHovering ? (cursorText ? 86 : 50) : 34;

  return (
    <>
      {/* Trail canvas (avoids React hook array violation) */}
      <TrailCanvas mouseX={mouseX} mouseY={mouseY} isHovering={isHoveringRef} />

      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          left:  outerX,
          top:   outerY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99998,
          pointerEvents: 'none',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
        }}
        animate={{
          width:  outerSize,
          height: outerSize,
          backgroundColor: isHovering ? 'rgba(0, 212, 255, 0.10)' : 'transparent',
          borderColor: isClicking
            ? '#00d4ff'
            : isHovering
              ? 'rgba(0,212,255,0.85)'
              : 'rgba(0,212,255,0.45)',
          rotate: isHovering ? 45 : 0,
          boxShadow: isHovering
            ? '0 0 20px rgba(0,212,255,0.25), inset 0 0 10px rgba(0,212,255,0.08)'
            : '0 0 10px rgba(0,212,255,0.12)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 300, mass: 0.6 }}
        className="rounded-full border flex items-center justify-center"
      >
        {cursorText && (
          <span
            style={{
              fontSize: '8px',
              fontFamily: 'JetBrains Mono, monospace',
              color: '#00d4ff',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="rounded-full"
        style={{
          position: 'fixed',
          left:  dotX,
          top:   dotY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99999,
          pointerEvents: 'none',
          backgroundColor: '#00d4ff',
          boxShadow: '0 0 12px rgba(0,212,255,0.9)',
        }}
        animate={{
          width:   isClicking ? 3 : isHovering ? 4 : 7,
          height:  isClicking ? 3 : isHovering ? 4 : 7,
          opacity: isHovering ? 0.4 : 1,
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 600 }}
      />
    </>
  );
}
