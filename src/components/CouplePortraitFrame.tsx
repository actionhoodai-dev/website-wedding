'use client';

import Image from 'next/image';

interface CouplePortraitFrameProps {
  imageSrc: string;
  groomName: string;
  brideName: string;
}

export function CouplePortraitFrame({ imageSrc, groomName, brideName }: CouplePortraitFrameProps) {
  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '520px',
        width: '100%',
        margin: '2.5rem auto',
        padding: '16px',
        perspective: '1000px',
      }}
    >
      {/* Outer Sacred Halo Aura */}
      <div
        style={{
          position: 'absolute',
          inset: -15,
          background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.22) 0%, rgba(184, 134, 11, 0.08) 50%, transparent 75%)',
          filter: 'blur(25px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* South Indian Temple Arch & Gold Frame Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '260px 260px 16px 16px',
          padding: '14px',
          background: 'linear-gradient(135deg, #d4a017 0%, #ffe082 25%, #8b6914 50%, #ffd700 75%, #5c4409 100%)',
          boxShadow: `
            0 25px 60px rgba(0, 0, 0, 0.8),
            0 0 35px rgba(212, 160, 23, 0.35),
            inset 0 0 20px rgba(255, 215, 0, 0.6)
          `,
          border: '2px solid rgba(255, 235, 150, 0.6)',
        }}
      >
        {/* Ornate Inner Filigree Border */}
        <div
          style={{
            position: 'relative',
            borderRadius: '246px 246px 12px 12px',
            padding: '10px',
            background: 'linear-gradient(180deg, #1c0f08 0%, #2a160b 100%)',
            border: '2px dashed rgba(212, 160, 23, 0.5)',
          }}
        >
          {/* Top Arch Kalasam Motif */}
          <div
            style={{
              position: 'absolute',
              top: -30,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 3,
            }}
          >
            <svg width="60" height="42" viewBox="0 0 60 42" fill="none">
              <path
                d="M30 2 L38 18 L30 14 L22 18 Z"
                fill="url(#kalasamGold)"
                stroke="#ffd700"
                strokeWidth="1"
              />
              <circle cx="30" cy="24" r="9" fill="url(#kalasamGold)" stroke="#ffd700" strokeWidth="1" />
              <path d="M24 33 C24 31 36 31 36 33 L38 38 L22 38 Z" fill="#b8860b" />
              <defs>
                <linearGradient id="kalasamGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff2a1" />
                  <stop offset="50%" stopColor="#d4a017" />
                  <stop offset="100%" stopColor="#7a5a0a" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Picture Window with Temple Arched Top */}
          <div
            style={{
              position: 'relative',
              borderRadius: '238px 238px 8px 8px',
              overflow: 'hidden',
              aspectRatio: '3/4',
              width: '100%',
              background: '#0d0704',
            }}
          >
            <Image
              src={imageSrc}
              alt={`${groomName} and ${brideName}`}
              fill
              sizes="(max-width: 768px) 90vw, 500px"
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'contrast(1.04) saturate(1.05)',
                transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />

            {/* Subtle Inner Vignette & Silk Warmth */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `
                  radial-gradient(circle at center, transparent 55%, rgba(18, 10, 6, 0.4) 100%),
                  linear-gradient(180deg, transparent 70%, rgba(20, 8, 4, 0.7) 100%)
                `,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Frame Pedestal Banner */}
      <div
        style={{
          marginTop: '-12px',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          background: 'linear-gradient(90deg, transparent, rgba(58, 25, 10, 0.9) 20%, rgba(58, 25, 10, 0.9) 80%, transparent)',
          padding: '0.6rem 1rem',
          borderBottom: '1px solid rgba(212, 160, 23, 0.4)',
        }}
      >
        <span
          className="font-heading"
          style={{
            fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
            letterSpacing: '0.3em',
            color: 'var(--gold-shine)',
            textTransform: 'uppercase',
            textShadow: '0 0 15px rgba(212,160,23,0.5)',
          }}
        >
          {groomName} &amp; {brideName}
        </span>
      </div>
    </div>
  );
}
