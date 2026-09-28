'use client';

import { useRef, useEffect, useState } from 'react';

/* ─── Cute Airplane SVG ──────────────────── */
function AirplaneSVG() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 2px 6px rgba(212, 175, 55, 0.5))' }}
    >
      <path
        d="M21.71 10.29L14 2.59C13.81 2.39 13.55 2.29 13.29 2.29C13.03 2.29 12.77 2.39 12.59 2.59L2.29 12.88C1.9 13.27 1.9 13.9 2.29 14.29L10 22C10.2 22.2 10.45 22.29 10.71 22.29C10.97 22.29 11.22 22.2 11.41 22L21.71 11.71C22.1 11.32 22.1 10.68 21.71 10.29Z"
        fill="none"
        stroke="var(--gold-bright, #d4af37)"
        strokeWidth="0"
      />
      {/* Simplified airplane shape */}
      <path
        d="M2.5 12.5L10.5 4.5L12 6L6 12L12 18L10.5 19.5L2.5 12.5Z"
        fill="var(--gold-bright, #d4af37)"
        opacity="0"
      />
      {/* Clean airplane icon */}
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        fill="var(--gold-bright, #d4af37)"
        fillOpacity="0.9"
      />
      <path
        d="M22 2L11 13"
        stroke="var(--gold-antique, #b88a35)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Trail Dot ──────────────────── */
function TrailDot({ progress, index, total }: { progress: number; index: number; total: number }) {
  const dotProgress = index / total;
  const isVisible = progress > dotProgress;
  const opacity = isVisible ? Math.min(1, (progress - dotProgress) * 5) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${(index / total) * 100}%`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: 'var(--gold-antique, #b88a35)',
        opacity: opacity * 0.6,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}

/* ─── Main Timeline Airplane Component ──────── */
export function TimelineAirplane({ timelineLength }: { timelineLength: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through the timeline section
      const totalHeight = rect.height;
      const scrolled = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (totalHeight + windowHeight * 0.3)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Airplane vertical position along the timeline
  const airplaneY = scrollProgress * 100;
  const airplaneRotation = -10 + Math.sin(scrollProgress * Math.PI * 4) * 15;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        transform: 'translateX(-50%)',
        width: '40px',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Dashed flight path trail */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          transform: 'translateX(-50%)',
          overflow: 'hidden',
        }}
      >
        {/* Animated gold trail behind airplane */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${airplaneY}%`,
            background: 'linear-gradient(180deg, transparent 0%, var(--gold-antique, #b88a35) 20%, var(--gold-bright, #d4af37) 100%)',
            transition: 'height 0.1s linear',
            opacity: 0.6,
          }}
        />

        {/* Trail dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <TrailDot key={i} progress={scrollProgress} index={i} total={30} />
        ))}
      </div>

      {/* The Airplane */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: `${Math.min(95, airplaneY)}%`,
          transform: `translate(-50%, -50%) rotate(${airplaneRotation}deg) ${scrollProgress > 0.95 ? 'scale(1.3)' : 'scale(1)'}`,
          transition: 'top 0.15s linear, transform 0.3s ease',
          opacity: scrollProgress > 0.02 ? 1 : 0,
          zIndex: 15,
        }}
      >
        <AirplaneSVG />

        {/* Sparkle trail particles */}
        {scrollProgress > 0.05 && scrollProgress < 0.95 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '2px',
                  height: '2px',
                  borderRadius: '50%',
                  background: 'var(--gold-bright, #d4af37)',
                  top: `${8 + i * 6}px`,
                  left: `${(i - 1) * 4}px`,
                  opacity: 0.3 + Math.random() * 0.4,
                  animation: `sparkleTrail ${0.6 + i * 0.2}s infinite alternate ease-in-out`,
                }}
              />
            ))}
          </div>
        )}

        {/* Landing celebration at the end */}
        {scrollProgress > 0.93 && (
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
              animation: 'landingPulse 1.5s infinite ease-in-out',
            }}
          />
        )}
      </div>

      <style jsx global>{`
        @keyframes sparkleTrail {
          0% { opacity: 0.2; transform: scale(0.5); }
          100% { opacity: 0.7; transform: scale(1.5); }
        }
        @keyframes landingPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
          50% { transform: translateX(-50%) scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
