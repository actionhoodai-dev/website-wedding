'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhysicalScratchCardProps {
  onRevealed?: () => void;
}

export function PhysicalScratchCard({ onRevealed }: PhysicalScratchCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const hasTriggeredReveal = useRef(false);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 360,
    height: 260,
  });

  // ─── Initialize / Draw the Metallic Antique Gold Foil ─────────────
  const initFoil = useCallback((width: number, height: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Rich multi-stop metallic gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#d4af37');
    grad.addColorStop(0.18, '#f9e498');
    grad.addColorStop(0.38, '#b8860b');
    grad.addColorStop(0.55, '#ffe58f');
    grad.addColorStop(0.72, '#c59a3f');
    grad.addColorStop(0.88, '#e6c875');
    grad.addColorStop(1, '#996515');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle metallic cross-hatch stipple texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
    for (let i = 0; i < width; i += 4) {
      for (let j = 0; j < height; j += 4) {
        if ((i + j) % 8 === 0) {
          ctx.fillRect(i, j, 1.5, 1.5);
        }
      }
    }

    // Outer and Inner Gold Filigree Borders
    ctx.strokeStyle = '#6e470c';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = '#fceda2';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Corner traditional floral diamonds
    const drawCornerDiamond = (cx: number, cy: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = '#6e470c';
      ctx.fillRect(-5, -5, 10, 10);
      ctx.fillStyle = '#ffe58f';
      ctx.fillRect(-3, -3, 6, 6);
      ctx.restore();
    };
    drawCornerDiamond(14, 14);
    drawCornerDiamond(width - 14, 14);
    drawCornerDiamond(14, height - 14);
    drawCornerDiamond(width - 14, height - 14);

    // Foil Embossed Seal & Instructions
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Top subtle motif
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#5c3d0b';
    ctx.fillText('✦ 🪔 ✦', width / 2, height / 2 - 42);

    // Main Foil Text with 3D Emboss effect
    ctx.font = '700 15px "Poppins", sans-serif';
    ctx.letterSpacing = '0.22em';
    ctx.fillStyle = '#4a2f05';
    ctx.fillText('SCRATCH TO UNVEIL', width / 2 + 1, height / 2 - 14);
    ctx.fillStyle = '#ffeaa7';
    ctx.fillText('SCRATCH TO UNVEIL', width / 2, height / 2 - 15);

    ctx.font = '600 12px "Poppins", sans-serif';
    ctx.letterSpacing = '0.3em';
    ctx.fillStyle = '#5c3a07';
    ctx.fillText('OUR SACRED BLESSING', width / 2, height / 2 + 12);

    ctx.font = 'italic 11px "Poppins", sans-serif';
    ctx.letterSpacing = '0.08em';
    ctx.fillStyle = '#7a5214';
    ctx.fillText('Gently rub surface with finger or mouse', width / 2, height / 2 + 38);

    ctx.restore();
  }, []);

  // ─── Track Container Dimensions with ResizeObserver ─────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDims = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      // Fixed aspect ratio ~ 1.38
      const h = Math.round(Math.min(320, Math.max(220, w * 0.72)));
      setDimensions({ width: w, height: h });
      if (!isRevealed) {
        initFoil(w, h);
      }
    };

    updateDims();
    const ro = new ResizeObserver(updateDims);
    ro.observe(container);

    return () => ro.disconnect();
  }, [initFoil, isRevealed]);

  // ─── Measure Percentage Scratched ─────────────
  const checkProgress = useCallback(() => {
    if (hasTriggeredReveal.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      let cleared = 0;
      // Step sample every 16th pixel for high speed
      const step = 16;
      const totalSamples = (w * h) / (step / 4);

      for (let i = 3; i < data.length; i += step) {
        if (data[i] < 40) {
          cleared++;
        }
      }

      const ratio = cleared / totalSamples;
      setScratchProgress(Math.min(100, Math.round(ratio * 100)));

      // Auto reveal threshold at 52%
      if (ratio >= 0.52) {
        hasTriggeredReveal.current = true;
        setIsRevealed(true);
        if (onRevealed) onRevealed();
      }
    } catch {
      // Fallback
    }
  }, [onRevealed]);

  // ─── Scratch Stamp / Brush ─────────────
  const scratchAt = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || hasTriggeredReveal.current) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const radius = 24 * dpr;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      // Soft natural circular brush
      const radGrad = ctx.createRadialGradient(x * dpr, y * dpr, radius * 0.4, x * dpr, y * dpr, radius);
      radGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      radGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.9)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(x * dpr, y * dpr, radius, 0, Math.PI * 2);
      ctx.fill();

      // If dragging, interpolate points for smooth contiguous stroke
      if (lastPointRef.current) {
        const dist = Math.hypot(x - lastPointRef.current.x, y - lastPointRef.current.y);
        const steps = Math.max(1, Math.floor(dist / 6));
        for (let i = 1; i <= steps; i++) {
          const ix = lastPointRef.current.x + ((x - lastPointRef.current.x) * i) / steps;
          const iy = lastPointRef.current.y + ((y - lastPointRef.current.y) * i) / steps;
          ctx.beginPath();
          ctx.arc(ix * dpr, iy * dpr, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
      lastPointRef.current = { x, y };
    },
    []
  );

  // ─── Pointer Event Handlers ─────────────
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (hasTriggeredReveal.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if unsupported
    }

    isScratchingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPointRef.current = { x, y };
    scratchAt(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || hasTriggeredReveal.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    scratchAt(x, y);

    // Throttle progress check
    if (Math.random() > 0.6) {
      checkProgress();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    isScratchingRef.current = false;
    lastPointRef.current = null;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Ignored
      }
    }
    checkProgress();
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 25px rgba(184, 138, 53, 0.25)',
        border: '2px solid rgba(184, 138, 53, 0.45)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* ─── UNDERLYING REVEALED CONTENT (Meaningful Emotional Revelation) ─── */}
      <div
        style={{
          width: '100%',
          height: `${dimensions.height}px`,
          background: 'linear-gradient(145deg, #fffcf5 0%, #fcf3df 50%, #faecd0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative gold ornamental corners */}
        <div style={{ position: 'absolute', top: 8, left: 8, fontSize: '0.9rem', color: '#b8860b' }}>❖</div>
        <div style={{ position: 'absolute', top: 8, right: 8, fontSize: '0.9rem', color: '#b8860b' }}>❖</div>
        <div style={{ position: 'absolute', bottom: 8, left: 8, fontSize: '0.9rem', color: '#b8860b' }}>❖</div>
        <div style={{ position: 'absolute', bottom: 8, right: 8, fontSize: '0.9rem', color: '#b8860b' }}>❖</div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0.9 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading, "Cinzel", serif)',
              fontSize: 'clamp(0.65rem, 1.8vw, 0.78rem)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#8b1a27',
              fontWeight: 700,
              marginBottom: '0.35rem',
            }}
          >
            ✦ SACRED AUSPICIOUS MOMENT ✦
          </p>

          <h3
            style={{
              fontFamily: 'var(--font-celebratory, "Great Vibes", cursive)',
              fontSize: 'clamp(2rem, 6.5vw, 3.2rem)',
              color: '#6f1720',
              lineHeight: 1.15,
              margin: '0.15rem 0',
              fontWeight: 400,
            }}
          >
            Four Years to Forever
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-poppins, sans-serif)',
              fontSize: 'clamp(0.75rem, 1.9vw, 0.88rem)',
              fontWeight: 500,
              color: '#7a4e1d',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: '0.25rem 0 0.5rem',
            }}
          >
            From Mississauga, Canada → Madurai, India
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, rgba(184, 138, 53, 0.15) 0%, rgba(212, 175, 55, 0.25) 100%)',
              border: '1px solid rgba(184, 138, 53, 0.45)',
              borderRadius: '30px',
              padding: '0.45rem 1.4rem',
              marginTop: '0.4rem',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>🪔</span>
            <span
              style={{
                fontFamily: 'var(--font-poppins, sans-serif)',
                fontWeight: 700,
                fontSize: 'clamp(0.85rem, 2.2vw, 1.05rem)',
                color: '#4b1118',
                letterSpacing: '0.12em',
              }}
            >
              11 NOVEMBER 2026 · 09:00 AM
            </span>
          </div>
        </motion.div>
      </div>

      {/* ─── REAL SCRATCH CANVAS OVERLAY ─── */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: `${dimensions.height}px`,
          cursor: isRevealed ? 'default' : 'crosshair',
          transition: isRevealed ? 'opacity 0.8s ease-out, transform 0.8s ease-out' : 'none',
          opacity: isRevealed ? 0 : 1,
          transform: isRevealed ? 'scale(1.02)' : 'scale(1)',
          pointerEvents: isRevealed ? 'none' : 'auto',
          zIndex: 2,
        }}
      />

      {/* ─── GENTLE CELEBRATION EFFECT UPON COMPLETE REVEAL ─── */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Soft gold light sweep */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '200%', opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '60px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 235, 150, 0.7), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Scratch Status Badge ─── */}
      {!isRevealed && scratchProgress > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: 12,
            background: 'rgba(58, 13, 18, 0.85)',
            color: '#ffe58f',
            fontFamily: 'var(--font-poppins, sans-serif)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            padding: '2px 8px',
            borderRadius: '10px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {scratchProgress}% Unveiled
        </div>
      )}
    </div>
  );
}
