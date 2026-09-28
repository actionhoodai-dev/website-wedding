'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScratchCardProps {
  label: string;
  value: string;
  size?: number;
  onRevealed: () => void;
}

/* ─── Individual Scratch Card ──────────────────── */
function ScratchCard({ label, value, size = 140, onRevealed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const revealedRef = useRef(false);

  // Draw the gold foil scratch overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }

    if (transparent / total > 0.45) {
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
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const x = (clientX - rect.left) * dpr;
      const y = (clientY - rect.top) * dpr;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    },
    []
  );

  // Mouse events
  const handleMouseDown = () => {
    isDrawingRef.current = true;
  };
  const handleMouseUp = () => {
    isDrawingRef.current = false;
    checkRevealPercentage();
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawingRef.current) scratch(e.clientX, e.clientY);
  };

  // Touch events
  const handleTouchStart = () => {
    isDrawingRef.current = true;
  };
  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    checkRevealPercentage();
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDrawingRef.current && e.touches[0]) {
      e.preventDefault();
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

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
          fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)',
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
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle, rgba(58, 13, 18, 0.95) 0%, rgba(35, 7, 10, 1) 100%)',
            borderRadius: '50%',
          }}
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              fontFamily: 'var(--font-heading, "Cinzel", serif)',
              fontSize: `clamp(${size * 0.22}px, 5vw, ${size * 0.3}px)`,
              fontWeight: 700,
              color: 'var(--gold-bright, #d4af37)',
              textShadow: '0 2px 20px rgba(212, 175, 55, 0.5)',
              letterSpacing: '0.05em',
            }}
          >
            {value}
          </motion.span>
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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          style={{
            position: 'absolute',
            inset: 0,
            width: size,
            height: size,
            borderRadius: '50%',
            cursor: isRevealed ? 'default' : 'grab',
            opacity: isRevealed ? 0 : 1,
            transition: 'opacity 0.8s ease',
            touchAction: 'none',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Confetti Particle ──────────────────── */
function ConfettiParticle({ delay, color, left }: { delay: number; color: string; left: string }) {
  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: [0, -120, 400],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [1, 1, 0],
        rotate: [0, 360 + Math.random() * 360],
        scale: [0.5, 1.2, 0.3],
      }}
      transition={{ duration: 2.5 + Math.random(), delay, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left,
        top: '50%',
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
  day,
  month,
  year,
}: {
  day: string;
  month: string;
  year: string;
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

  const cardSize = typeof window !== 'undefined' && window.innerWidth < 500 ? 110 : 140;

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
          fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)',
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
            <motion.p
              style={{
                fontFamily: 'var(--font-accent, "Cormorant Garamond", serif)',
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                fontStyle: 'italic',
                color: 'var(--gold-bright, #d4af37)',
                textShadow: '0 2px 15px rgba(212, 175, 55, 0.4)',
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              ✨ Save the Date ✨
              <br />
              <span style={{ fontSize: '0.85em', opacity: 0.8 }}>
                A sacred beginning awaits
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
