'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function CinematicJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Dynamic route line extension
  const pathLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <div
      ref={containerRef}
      id="journey"
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        overflow: 'hidden',
        transition: 'background 0.8s ease',
      }}
    >
      {/* ─── SECTION TITLE & PRELUDE ─── */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-heading, "Cinzel", serif)',
            fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#8c6b2d',
            fontWeight: 700,
            marginBottom: '0.6rem',
          }}
        >
          AN EPIC VOYAGE OF LOVE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-celebratory, "Great Vibes", cursive)',
            fontSize: 'clamp(2.4rem, 6.5vw, 4.2rem)',
            color: '#6f1720',
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: '0.75rem',
          }}
        >
          From Mississauga to Madurai
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-poppins, sans-serif)',
            fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
            color: '#5c4a3a',
            lineHeight: 1.8,
            letterSpacing: '0.015em',
          }}
        >
          Four years across 12,500 kilometers and oceans. A serendipitous connection in Canada blossoming into a sacred marriage in the temple city of Madurai.
        </motion.p>
      </div>

      {/* ─── INTERACTIVE VOYAGE ROADMAP ─── */}
      <div
        style={{
          position: 'relative',
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        {/* Animated Golden Thread SVG */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            bottom: 40,
            left: '28px',
            width: '4px',
            zIndex: 1,
          }}
        >
          {/* Background trace line */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(160, 190, 220, 0.4) 0%, rgba(212, 175, 55, 0.4) 50%, rgba(184, 138, 53, 0.8) 100%)',
              borderRadius: '2px',
            }}
          />
          {/* Animated active gold line */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              originY: 0,
              scaleY: pathLength,
              background: 'linear-gradient(180deg, #90cdf4 0%, #d4af37 60%, #b8860b 100%)',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.7)',
              borderRadius: '2px',
              height: '100%',
            }}
          />
        </div>

        {/* ─── MILESTONE 1: MISSISSAUGA, CANADA ─── */}
        <div style={{ position: 'relative', paddingLeft: '72px', marginBottom: '3.5rem' }}>
          {/* Milestone Pin Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              position: 'absolute',
              left: '14px',
              top: '0',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
              border: '2px solid #64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(100, 116, 139, 0.3)',
              zIndex: 2,
            }}
          >
            🇨🇦
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f4f7fa 100%)',
              border: '1px solid rgba(148, 163, 184, 0.35)',
              borderRadius: '14px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-poppins, sans-serif)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#475569',
                  textTransform: 'uppercase',
                }}
              >
                MISSISSAUGA, ONTARIO
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-poppins, sans-serif)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#64748b',
                  background: 'rgba(100, 116, 139, 0.1)',
                  padding: '2px 10px',
                  borderRadius: '12px',
                }}
              >
                2022 · 43.58° N, 79.64° W
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading, "Cinzel", serif)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: '#1e293b',
                margin: '0.6rem 0 0.4rem',
              }}
            >
              Where Two Worlds Converged
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-poppins, sans-serif)',
                fontSize: '0.9rem',
                color: '#475569',
                lineHeight: 1.7,
              }}
            >
              Amidst crisp Canadian skies, snow-kissed evenings, and tranquil lakeside horizons, destiny sparked the quiet beginning of a lifetime partnership.
            </p>
          </motion.div>
        </div>

        {/* ─── MILESTONE 2: TRANSATLANTIC CROSSING ─── */}
        <div style={{ position: 'relative', paddingLeft: '72px', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              position: 'absolute',
              left: '14px',
              top: '0',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
              border: '2px solid #3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.35)',
              zIndex: 2,
            }}
          >
            ✈️
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f0f7ff 100%)',
              border: '1px solid rgba(147, 197, 253, 0.45)',
              borderRadius: '14px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-poppins, sans-serif)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#1d4ed8',
                  textTransform: 'uppercase',
                }}
              >
                THE ATLANTIC &amp; BEYOND
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-poppins, sans-serif)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#2563eb',
                  background: 'rgba(59, 130, 246, 0.1)',
                  padding: '2px 10px',
                  borderRadius: '12px',
                }}
              >
                12,500 KM VOYAGE
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading, "Cinzel", serif)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: '#1e3a8a',
                margin: '0.6rem 0 0.4rem',
              }}
            >
              Distance Has No Power Over Love
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-poppins, sans-serif)',
                fontSize: '0.9rem',
                color: '#334155',
                lineHeight: 1.7,
              }}
            >
              Through four years of shared dreams, calls across time zones, and unconditional trust, their love proved that home is wherever they are together.
            </p>
          </motion.div>
        </div>

        {/* ─── MILESTONE 3: SACRED MOTHER INDIA ─── */}
        <div style={{ position: 'relative', paddingLeft: '72px', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              position: 'absolute',
              left: '14px',
              top: '0',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)',
              border: '2px solid #ca8a04',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(202, 138, 4, 0.35)',
              zIndex: 2,
            }}
          >
            🇮🇳
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #fffbeb 100%)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              borderRadius: '14px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              boxShadow: '0 10px 30px rgba(202, 138, 4, 0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-poppins, sans-serif)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#a16207',
                  textTransform: 'uppercase',
                }}
              >
                TAMIL NADU, INDIA
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-poppins, sans-serif)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#854d0e',
                  background: 'rgba(202, 138, 4, 0.12)',
                  padding: '2px 10px',
                  borderRadius: '12px',
                }}
              >
                ANCESTRAL BLESSINGS
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading, "Cinzel", serif)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: '#713f12',
                margin: '0.6rem 0 0.4rem',
              }}
            >
              The Uniting of Two Lineages
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-poppins, sans-serif)',
                fontSize: '0.9rem',
                color: '#574127',
                lineHeight: 1.7,
              }}
            >
              Returning to the sacred heritage of Tamil Nadu, welcomed with turmeric, vermilion, nadaswaram melodies, and the joyous blessings of parents and elders.
            </p>
          </motion.div>
        </div>

        {/* ─── MILESTONE 4: MADURAI MEENAKSHI AMMAN TEMPLE ─── */}
        <div style={{ position: 'relative', paddingLeft: '72px' }}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              position: 'absolute',
              left: '14px',
              top: '0',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
              border: '2px solid #78350f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '0 4px 18px rgba(184, 134, 11, 0.5)',
              zIndex: 2,
            }}
          >
            🛕
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'linear-gradient(145deg, #fffcf5 0%, #faecd0 100%)',
              border: '1.5px solid rgba(184, 138, 53, 0.65)',
              borderRadius: '14px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              boxShadow: '0 12px 35px rgba(184, 138, 53, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-poppins, sans-serif)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#6f1720',
                  textTransform: 'uppercase',
                }}
              >
                MADURAI · MEENAKSHI AMMAN TEMPLE
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-poppins, sans-serif)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#6f1720',
                  background: 'rgba(111, 23, 32, 0.1)',
                  padding: '2px 10px',
                  borderRadius: '12px',
                }}
              >
                11 NOVEMBER 2026
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading, "Cinzel", serif)',
                fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
                fontWeight: 700,
                color: '#6f1720',
                margin: '0.6rem 0 0.4rem',
              }}
            >
              The Sacred Thirumaangalyam
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-poppins, sans-serif)',
                fontSize: '0.9rem',
                color: '#4a2810',
                lineHeight: 1.7,
              }}
            >
              Before the divine presence of Lord Murugan and Goddess Meenakshi, taking the sacred seven steps around the holy fire to unite for eternity.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
