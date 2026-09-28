'use client';

import { memo, useMemo } from 'react';

interface FloralDecorProps {
  type: 'jasmine-string' | 'mango-leaves' | 'marigold-garland' | 'lotus' | 'banana-leaf' | 'corner-floral';
  position?: 'top' | 'left' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  opacity?: number;
  scale?: number;
}

function JasmineString({ opacity = 0.7 }: { opacity: number }) {
  const buds = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: 20 + i * 30,
      y: 15 + Math.sin(i * 0.8) * 8,
      size: 3 + Math.random() * 2,
      rotation: Math.random() * 30 - 15,
    })),
    []
  );

  return (
    <svg viewBox="0 0 400 40" style={{ width: '100%', height: 'auto', opacity }}>
      {/* String */}
      <path
        d="M0 20 Q50 28, 100 18 Q150 28, 200 15 Q250 25, 300 18 Q350 28, 400 20"
        stroke="#2d5a1e"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      {/* Jasmine buds */}
      {buds.map((bud, i) => (
        <g key={i} transform={`translate(${bud.x}, ${bud.y}) rotate(${bud.rotation})`}>
          <ellipse rx={bud.size} ry={bud.size * 1.2} fill="#fff8e7" stroke="#e8dcc0" strokeWidth="0.3" opacity="0.9" />
          <ellipse rx={bud.size * 0.4} ry={bud.size * 0.5} fill="#fef9c3" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

function MangoLeaves({ opacity = 0.6 }: { opacity: number }) {
  return (
    <svg viewBox="0 0 400 80" style={{ width: '100%', height: 'auto', opacity }}>
      {/* String */}
      <path d="M0 10 Q200 5, 400 10" stroke="#5a3e1e" strokeWidth="2" fill="none" />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 25 + i * 50;
        const angle = -20 + (i % 2 === 0 ? -15 : 15);
        return (
          <g key={i} transform={`translate(${x}, 12) rotate(${angle})`}>
            <path
              d="M0 0 Q8 -15, 3 -35 Q-2 -15, 0 0 Z"
              fill="#2d5a1e"
              stroke="#1a3a10"
              strokeWidth="0.3"
              opacity="0.8"
            />
            {/* Leaf vein */}
            <line x1="1.5" y1="-2" x2="1.5" y2="-30" stroke="#1a3a10" strokeWidth="0.3" opacity="0.4" />
          </g>
        );
      })}
    </svg>
  );
}

function MarigoldGarland({ opacity = 0.7 }: { opacity: number }) {
  return (
    <svg viewBox="0 0 400 100" style={{ width: '100%', height: 'auto', opacity }}>
      {/* Garland curve */}
      <path
        d="M0 20 Q100 70, 200 60 Q300 70, 400 20"
        stroke="#b8860b"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
      {Array.from({ length: 14 }, (_, i) => {
        const t = i / 13;
        const x = t * 400;
        const y = 20 + Math.sin(t * Math.PI) * 45;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {/* Marigold flower */}
            {Array.from({ length: 8 }, (_, j) => {
              const angle = (j / 8) * Math.PI * 2;
              const px = Math.cos(angle) * 6;
              const py = Math.sin(angle) * 6;
              return (
                <ellipse
                  key={j}
                  cx={px}
                  cy={py}
                  rx="4"
                  ry="3"
                  fill={j % 2 === 0 ? '#ff8c00' : '#ffa500'}
                  opacity="0.8"
                  transform={`rotate(${(j / 8) * 360})`}
                />
              );
            })}
            <circle r="3" fill="#ff6600" opacity="0.9" />
          </g>
        );
      })}
    </svg>
  );
}

function Lotus({ opacity = 0.8, scale = 1 }: { opacity: number; scale: number }) {
  return (
    <svg viewBox="0 0 100 80" style={{ width: `${80 * scale}px`, height: 'auto', opacity }}>
      <g transform="translate(50, 50)">
        {/* Outer petals */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * 360 - 90;
          return (
            <ellipse
              key={`outer-${i}`}
              cx="0"
              cy="-22"
              rx="8"
              ry="18"
              fill="none"
              stroke="#e8a0b0"
              strokeWidth="0.6"
              opacity="0.5"
              transform={`rotate(${angle})`}
            />
          );
        })}
        {/* Inner petals */}
        {Array.from({ length: 6 }, (_, i) => {
          const angle = (i / 6) * 360 - 60;
          return (
            <ellipse
              key={`inner-${i}`}
              cx="0"
              cy="-14"
              rx="5"
              ry="12"
              fill="rgba(232,160,176,0.15)"
              stroke="#e8a0b0"
              strokeWidth="0.5"
              opacity="0.7"
              transform={`rotate(${angle})`}
            />
          );
        })}
        {/* Center */}
        <circle r="5" fill="#ffd700" opacity="0.4" />
        <circle r="3" fill="#ffd700" opacity="0.6" />
      </g>
    </svg>
  );
}

function BananaLeaf({ opacity = 0.5 }: { opacity: number }) {
  return (
    <svg viewBox="0 0 200 400" style={{ width: '100px', height: 'auto', opacity }}>
      <path
        d="M100 380 Q95 300, 80 220 Q60 140, 40 80 Q30 40, 50 10 Q70 40, 60 80 Q80 140, 95 220 Q100 300, 100 380 Z"
        fill="#2d5a1e"
        stroke="#1a3a10"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <path
        d="M100 380 Q105 300, 120 220 Q140 140, 160 80 Q170 40, 150 10 Q130 40, 140 80 Q120 140, 105 220 Q100 300, 100 380 Z"
        fill="#3a7a25"
        stroke="#1a3a10"
        strokeWidth="0.5"
        opacity="0.6"
      />
      {/* Central vein */}
      <line x1="100" y1="380" x2="100" y2="20" stroke="#1a3a10" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function CornerFloral({ opacity = 0.5 }: { opacity: number }) {
  return (
    <svg viewBox="0 0 200 200" style={{ width: '150px', height: 'auto', opacity }}>
      <g>
        {/* Swirling vine */}
        <path
          d="M0 0 Q30 20, 50 60 Q60 90, 80 110 Q100 130, 130 140 Q160 150, 200 150"
          stroke="#ffd700"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        {/* Small leaves along vine */}
        <path d="M40 50 Q50 35, 55 50 Q45 55, 40 50 Z" fill="#ffd700" opacity="0.2" />
        <path d="M70 95 Q80 80, 85 95 Q75 100, 70 95 Z" fill="#ffd700" opacity="0.2" />
        <path d="M110 125 Q120 112, 125 125 Q115 130, 110 125 Z" fill="#ffd700" opacity="0.2" />
        {/* Small flower */}
        <g transform="translate(90, 110)">
          {Array.from({ length: 5 }, (_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-6"
              rx="3"
              ry="5"
              fill="none"
              stroke="#ffd700"
              strokeWidth="0.4"
              opacity="0.3"
              transform={`rotate(${(i / 5) * 360})`}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

function FloralDecorComponent({ type, position = 'top', className = '', opacity = 0.7, scale = 1 }: FloralDecorProps) {
  const positionStyles: Record<string, React.CSSProperties> = {
    'top': { position: 'absolute', top: 0, left: 0, right: 0 },
    'bottom': { position: 'absolute', bottom: 0, left: 0, right: 0 },
    'left': { position: 'absolute', top: 0, left: 0, bottom: 0 },
    'right': { position: 'absolute', top: 0, right: 0, bottom: 0 },
    'top-left': { position: 'absolute', top: 0, left: 0 },
    'top-right': { position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' },
    'bottom-left': { position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' },
    'bottom-right': { position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1)' },
  };

  return (
    <div
      className={className}
      style={{
        ...positionStyles[position],
        pointerEvents: 'none',
        zIndex: 4,
        transform: `${positionStyles[position]?.transform || ''} scale(${scale})`.trim(),
      }}
    >
      {type === 'jasmine-string' && <JasmineString opacity={opacity} />}
      {type === 'mango-leaves' && <MangoLeaves opacity={opacity} />}
      {type === 'marigold-garland' && <MarigoldGarland opacity={opacity} />}
      {type === 'lotus' && <Lotus opacity={opacity} scale={scale} />}
      {type === 'banana-leaf' && <BananaLeaf opacity={opacity} />}
      {type === 'corner-floral' && <CornerFloral opacity={opacity} />}
    </div>
  );
}

export const FloralDecor = memo(FloralDecorComponent);
