'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScratchCardProps {
  label: string;
  value: string;
  subText?: string;
  size?: number;
  onRevealed: () => void;
}

/* ─── Individual Scratch Card ──────────────────── */
function ScratchCard({ label, value, subText, size = 140, onRevealed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const revealedRef = useRef(false);

  // Draw the gold foil scratch overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Radial gold gradient overlay
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 10, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, '#d4af37');
    gradient.addColorStop(0.4, '#c5993a');
    gradient.addColorStop(0.7, '#b8860b');
    gradient.addColorStop(1, '#96700a');
    ctx.fillStyle = gradient;

    // Draw circle
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Add sparkle pattern
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * (size / 2 - 4);
      const x = size / 2 + Math.cos(angle) * r;
      const y = size / 2 + Math.sin(angle) * r;
      ctx.fillStyle = Math.random() > 0.5 ? '#ffe082' : '#fff9ea';
      ctx.fillRect(x, y, 1.5, 1.5);
    }
    ctx.globalAlpha = 1;

    // Add "SCRATCH" label
    ctx.fillStyle = '#3a0d12';
    ctx.font = `bold ${Math.round(size * 0.09)}px "Cinzel", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH ✦', size / 2, size / 2);
  }, [size]);

  // Calculate how much has been scratched
  const checkRevealPercentage = useCallback(() => {
    if (revealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }

    if (transparent / total > 0.4) {
      revealedRef.current = true;
      setIsRevealed(true);
      onRevealed();
    }
  }, [onRevealed]);

  // Scratch handler
  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || revealedRef.current) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const x = (clientX - rect.left) * dpr;
      const y = (clientY - rect.top) * dpr;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22 * dpr, 0, Math.PI * 2);
      ctx.fill();

      checkRevealPercentage();
    },
    [checkRevealPercentage]
  );

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawingRef.current = true;
    scratch(e.clientX, e.clientY);
  };
  const handleMouseUp = () => {
    isDrawingRef.current = false;
    checkRevealPercentage();
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawingRef.current) {
      scratch(e.clientX, e.clientY);
    }
  };

  // Touch events — use native listeners with { passive: false } so preventDefault works
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      if (e.touches[0]) {
        scratch(e.touches[0].clientX, e.touches[0].clientY);
      }
      isDrawingRef.current = true;
    };
    const onTouchEnd = () => {
      isDrawingRef.current = false;
      checkRevealPercentage();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDrawingRef.current && e.touches[0]) {
        if (e.cancelable) {
          e.preventDefault();
        }
        scratch(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [scratch, checkRevealPercentage]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      {/* Label above card */}
      <span
        style={{
          fontFamily: 'var(--font-heading, "Cinzel", serif)',
          fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--gold-antique, #b88a35)',
        }}
      >
        {label}
      </span>

      {/* Scratch Card Container */}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(212, 175, 55, 0.5)',
          boxShadow: isRevealed
            ? '0 0 40px rgba(212, 175, 55, 0.6), inset 0 0 20px rgba(212, 175, 55, 0.15)'
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'box-shadow 0.6s ease',
        }}
      >
        {/* Revealed content underneath */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle, rgba(58, 13, 18, 0.95) 0%, rgba(35, 7, 10, 1) 100%)',
            borderRadius: '50%',
            padding: '8px',
          }}
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              fontFamily: 'var(--font-heading, "Cinzel", serif)',
              fontSize:
                value.length > 2
                  ? `clamp(${size * 0.22}px, 4.5vw, ${size * 0.26}px)`
                  : `clamp(${size * 0.3}px, 6vw, ${size * 0.36}px)`,
              fontWeight: 700,
              color: 'var(--gold-bright, #d4af37)',
              textShadow: '0 2px 20px rgba(212, 175, 55, 0.5)',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            {value}
          </motion.span>
          {subText && (
            <motion.span
              initial={{ opacity: 0, y: 3 }}
              animate={isRevealed ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 3 }}
              transition={{ delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-heading, "Cinzel", serif)',
                fontSize: `clamp(${size * 0.075}px, 1.5vw, ${size * 0.09}px)`,
                letterSpacing: '0.22em',
                color: 'var(--gold-antique, #b88a35)',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              {subText}
            </motion.span>
          )}
        </div>

        {/* Scratch canvas overlay */}
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          /* touch events handled via native addEventListener for passive: false */
          style={{
            position: 'absolute',
            inset: 0,
            width: size,
            height: size,
            cursor: isRevealed ? 'default' : 'grab',
            touchAction: 'none',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Confetti Particle ──────────────────────── */
function ConfettiParticle({ delay, color, left }: { delay: number; color: string; left: string }) {
  return (
    <motion.div
      initial={{
        opacity: 1,
        y: -20,
        x: 0,
        scale: 1,
        rotate: 0,
      }}
      animate={{
        opacity: [1, 1, 0],
        y: [0, 400 + Math.random() * 200],
        x: [(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 400],
        scale: [1, 1.2, 0.5],
        rotate: [0, Math.random() * 720 - 360],
      }}
      transition={{
        duration: 2.5 + Math.random() * 1.5,
        delay,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        top: '20%',
        left,
        width: `${6 + Math.random() * 8}px`,
        height: `${6 + Math.random() * 8}px`,
        background: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    />
  );
}

/* ─── Main Scratch Date Reveal Component ──────── */
export function ScratchDateReveal({
  day = '11',
  month = '11',
  year = '2026',
}: {
  day?: string;
  month?: string;
  year?: string;
}) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCardRevealed = useCallback(() => {
    setRevealedCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        // All 3 cards revealed — trigger celebration!
        setTimeout(() => setShowCelebration(true), 300);
      }
      return next;
    });
  }, []);

  const allRevealed = revealedCount >= 3;

  // Confetti colors (traditional gold, crimson, saffron)
  const confettiColors = [
    '#d4af37', '#ffe082', '#ff6b35', '#c62828', '#ffd54f',
    '#e57373', '#b8860b', '#fff176', '#ff8a65', '#f8bbd0',
  ];

  const [cardSize, setCardSize] = useState(140);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 420) {
        setCardSize(115);
      } else if (window.innerWidth < 600) {
        setCardSize(125);
      } else {
        setCardSize(140);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Celebration confetti blast */}
      <AnimatePresence>
        {showCelebration && (
          <>
            {Array.from({ length: 50 }).map((_, i) => (
              <ConfettiParticle
                key={i}
                delay={Math.random() * 0.5}
                color={confettiColors[i % confettiColors.length]}
                left={`${10 + Math.random() * 80}%`}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.p
        className="label-text"
        style={{
          marginBottom: '0.5rem',
          letterSpacing: '0.35em',
          fontSize: 'clamp(0.6rem, 1.2vw, 0.72rem)',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        REVEAL THE SACRED DATE
      </motion.p>

      <motion.h2
        className="section-title"
        style={{
          fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)',
          marginBottom: '1.5rem',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        WHEN TWO HEARTS BECOME ONE
      </motion.h2>

      <motion.p
        className="font-accent"
        style={{
          fontStyle: 'italic',
          color: 'var(--gold-antique, #b88a35)',
          fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
          marginBottom: '2.5rem',
          letterSpacing: '0.06em',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Scratch each card to unveil the auspicious date
      </motion.p>

      {/* Three Scratch Cards */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(1.2rem, 4vw, 2.5rem)',
          flexWrap: 'wrap',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ScratchCard
            label="THE DAY"
            value={day}
            subText="DAY"
            size={cardSize}
            onRevealed={handleCardRevealed}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <ScratchCard
            label="THE MONTH"
            value={month}
            subText="NOV"
            size={cardSize}
            onRevealed={handleCardRevealed}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <ScratchCard
            label="THE YEAR"
            value={year}
            subText="2026"
            size={cardSize}
            onRevealed={handleCardRevealed}
          />
        </motion.div>
      </div>

      {/* Celebration Message */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            style={{
              marginTop: '2.5rem',
              textAlign: 'center',
            }}
          >
            <motion.div
              style={{
                display: 'inline-block',
                padding: '0.65rem 2rem',
                borderRadius: '50px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                background: 'rgba(58, 13, 18, 0.8)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.25)',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading, "Cinzel", serif)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'var(--gold-bright, #d4af37)',
                }}
              >
                11 · 11 · 2026
              </span>
            </motion.div>

            <motion.p
              style={{
                fontFamily: 'var(--font-accent, "Cormorant Garamond", serif)',
                fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                fontStyle: 'italic',
                color: 'var(--gold-antique, #b88a35)',
                textShadow: '0 2px 15px rgba(212, 175, 55, 0.4)',
                lineHeight: 1.6,
              }}
            >
              ✨ WEDNESDAY, 11th NOVEMBER 2026 ✨
              <br />
              <span
                style={{
                  fontSize: '0.85em',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading, "Cinzel", serif)',
                  color: 'var(--gold-bright, #d4af37)',
                  opacity: 0.9,
                }}
              >
                A Sacred Union at Meenakshi Amman Temple, Madurai
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
