'use client';

import { memo } from 'react';

interface TemplePillarProps {
  side: 'left' | 'right';
  height?: string;
  className?: string;
  opacity?: number;
}

function TemplePillarComponent({ side, height = '100%', className = '', opacity = 0.7 }: TemplePillarProps) {
  const isLeft = side === 'left';

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        [isLeft ? 'left' : 'right']: 0,
        bottom: 0,
        width: 'clamp(60px, 10vw, 120px)',
        height,
        zIndex: 3,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 120 800" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id={`pillarGold-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5c4409" />
            <stop offset="20%" stopColor="#b8860b" />
            <stop offset="40%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#f5d680" />
            <stop offset="60%" stopColor="#ffd700" />
            <stop offset="80%" stopColor="#b8860b" />
            <stop offset="100%" stopColor="#5c4409" />
          </linearGradient>
          <linearGradient id={`pillarStone-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3a2a15" />
            <stop offset="30%" stopColor="#8b6914" />
            <stop offset="50%" stopColor="#c4a882" />
            <stop offset="70%" stopColor="#8b6914" />
            <stop offset="100%" stopColor="#3a2a15" />
          </linearGradient>
        </defs>

        {/* Capital / Top ornament */}
        <rect x="5" y="0" width="110" height="40" rx="3" fill={`url(#pillarGold-${side})`} opacity="0.9" />
        <rect x="0" y="35" width="120" height="12" rx="2" fill={`url(#pillarGold-${side})`} opacity="0.8" />

        {/* Ornamental band 1 */}
        <rect x="10" y="52" width="100" height="30" rx="2" fill={`url(#pillarStone-${side})`} opacity="0.6" />
        {/* Carved lotus pattern */}
        <ellipse cx="60" cy="67" rx="18" ry="10" stroke="#ffd700" strokeWidth="0.5" fill="none" opacity="0.4" />
        <ellipse cx="60" cy="67" rx="8" ry="5" fill="#ffd700" opacity="0.15" />

        {/* Main shaft */}
        <rect x="18" y="85" width="84" height="600" fill={`url(#pillarStone-${side})`} opacity="0.7" />

        {/* Shaft vertical lines (fluting) */}
        <line x1="35" y1="85" x2="35" y2="685" stroke="rgba(255,215,0,0.1)" strokeWidth="0.5" />
        <line x1="60" y1="85" x2="60" y2="685" stroke="rgba(255,215,0,0.08)" strokeWidth="0.3" />
        <line x1="85" y1="85" x2="85" y2="685" stroke="rgba(255,215,0,0.1)" strokeWidth="0.5" />

        {/* Mid band */}
        <rect x="12" y="350" width="96" height="25" rx="2" fill={`url(#pillarGold-${side})`} opacity="0.5" />
        <ellipse cx="60" cy="362" rx="12" ry="7" stroke="#ffd700" strokeWidth="0.4" fill="none" opacity="0.3" />

        {/* Base ornament */}
        <rect x="10" y="690" width="100" height="30" rx="2" fill={`url(#pillarStone-${side})`} opacity="0.6" />
        <rect x="0" y="720" width="120" height="15" rx="2" fill={`url(#pillarGold-${side})`} opacity="0.8" />
        <rect x="-5" y="735" width="130" height="20" rx="3" fill={`url(#pillarGold-${side})`} opacity="0.7" />

        {/* Base platform */}
        <rect x="-10" y="755" width="140" height="45" rx="4" fill={`url(#pillarStone-${side})`} opacity="0.5" />
      </svg>
    </div>
  );
}

export const TemplePillar = memo(TemplePillarComponent);
