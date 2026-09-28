'use client';

import { useEffect, useRef, memo } from 'react';

interface KuthuvilakkuProps {
  size?: 'sm' | 'md' | 'lg';
  lit?: boolean;
  className?: string;
  glowIntensity?: number;
}

const sizeMap = {
  sm: { base: 32, stem: 28, bowl: 24, flame: 10, glow: 60 },
  md: { base: 48, stem: 44, bowl: 36, flame: 16, glow: 100 },
  lg: { base: 72, stem: 64, bowl: 54, flame: 22, glow: 160 },
};

function KuthuvilakkuComponent({ size = 'md', lit = true, className = '', glowIntensity = 1 }: KuthuvilakkuProps) {
  const flameRef = useRef<HTMLDivElement>(null);
  const s = sizeMap[size];

  useEffect(() => {
    if (!lit || !flameRef.current) return;

    let raf: number;
    const animate = () => {
      if (!flameRef.current) return;
      const t = Date.now() * 0.003;
      const sx = 0.9 + Math.sin(t * 2.3) * 0.1;
      const sy = 0.92 + Math.cos(t * 1.7) * 0.08;
      const skew = Math.sin(t * 3.1) * 2;
      const tx = Math.sin(t * 1.5) * 0.5;
      flameRef.current.style.transform = `translateX(calc(-50% + ${tx}px)) scaleX(${sx}) scaleY(${sy}) skewX(${skew}deg)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [lit]);

  return (
    <div className={`kuthuvilakku ${className}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Ambient glow */}
      {lit && (
        <div
          style={{
            position: 'absolute',
            top: -s.glow / 2,
            left: '50%',
            transform: 'translateX(-50%)',
            width: s.glow * 2,
            height: s.glow * 2,
            background: `radial-gradient(circle, rgba(255,165,0,${0.25 * glowIntensity}) 0%, rgba(255,215,0,${0.1 * glowIntensity}) 40%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Flame */}
      {lit && (
        <div
          ref={flameRef}
          style={{
            position: 'relative',
            width: s.flame,
            height: s.flame * 2,
            background: `radial-gradient(ellipse at center bottom, #fff4c2 0%, #ffd700 25%, #ff8c00 55%, #ff4500 80%, transparent 100%)`,
            borderRadius: '50% 50% 20% 20%',
            filter: 'blur(0.5px)',
            zIndex: 2,
            marginBottom: -2,
          }}
        >
          {/* Inner white core */}
          <div
            style={{
              position: 'absolute',
              bottom: 2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: s.flame * 0.4,
              height: s.flame * 0.8,
              background: 'radial-gradient(ellipse at center bottom, #fffef0 0%, rgba(255,253,240,0.5) 50%, transparent 100%)',
              borderRadius: '50% 50% 30% 30%',
            }}
          />
        </div>
      )}

      {/* Wick */}
      <div
        style={{
          width: 3,
          height: s.flame * 0.5,
          background: 'linear-gradient(180deg, #8b6914, #4a3a10)',
          borderRadius: 1,
          zIndex: 1,
        }}
      />

      {/* Bowl */}
      <div
        style={{
          width: s.bowl,
          height: s.bowl * 0.5,
          background: 'linear-gradient(180deg, #ffd700 0%, #b8860b 60%, #9a6f0b 100%)',
          borderRadius: '50% 50% 20% 20%',
          boxShadow: `0 -2px 15px rgba(212,160,23,${0.3 * glowIntensity}), inset 0 2px 4px rgba(255,255,255,0.2)`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Oil surface shine */}
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: '15%',
            width: '70%',
            height: '30%',
            background: 'linear-gradient(180deg, rgba(255,240,180,0.4) 0%, transparent 100%)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Ornamental ring */}
      <div
        style={{
          width: s.bowl * 0.6,
          height: 6,
          background: 'linear-gradient(180deg, #ffd700, #b8860b, #ffd700)',
          borderRadius: 3,
          zIndex: 1,
        }}
      />

      {/* Stem */}
      <div
        style={{
          width: s.bowl * 0.18,
          height: s.stem,
          background: 'linear-gradient(90deg, #9a6f0b, #ffd700, #b8860b, #ffd700, #9a6f0b)',
          zIndex: 1,
        }}
      />

      {/* Mid ornament */}
      <div
        style={{
          width: s.bowl * 0.4,
          height: 8,
          background: 'linear-gradient(180deg, #ffd700, #b8860b, #ffd700)',
          borderRadius: 4,
          zIndex: 1,
        }}
      />

      {/* Lower stem */}
      <div
        style={{
          width: s.bowl * 0.14,
          height: s.stem * 0.3,
          background: 'linear-gradient(90deg, #9a6f0b, #ffd700, #b8860b, #ffd700, #9a6f0b)',
          zIndex: 1,
        }}
      />

      {/* Base */}
      <div
        style={{
          width: s.base,
          height: s.base * 0.25,
          background: 'linear-gradient(180deg, #ffd700 0%, #b8860b 50%, #7a5a0a 100%)',
          borderRadius: '20% 20% 50% 50%',
          boxShadow: `0 4px 20px rgba(212,160,23,${0.2 * glowIntensity})`,
          zIndex: 1,
        }}
      >
        {/* Base shine */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '60%',
            height: '30%',
            background: 'linear-gradient(180deg, rgba(255,240,180,0.3) 0%, transparent 100%)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Circular foot */}
      <div
        style={{
          width: s.base * 1.15,
          height: s.base * 0.12,
          background: 'linear-gradient(180deg, #b8860b 0%, #7a5a0a 50%, #5c4409 100%)',
          borderRadius: '50%',
          zIndex: 1,
        }}
      />
    </div>
  );
}

export const Kuthuvilakku = memo(KuthuvilakkuComponent);
