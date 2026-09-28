'use client';

import { memo } from 'react';

interface OrnamentalDividerProps {
  variant?: 'simple' | 'elaborate' | 'lotus';
  width?: string;
  className?: string;
  animated?: boolean;
}

function OrnamentalDividerComponent({ variant = 'simple', width = '100%', className = '', animated = true }: OrnamentalDividerProps) {
  if (variant === 'elaborate') {
    return (
      <div className={className} style={{ width, maxWidth: 600, margin: '2rem auto', position: 'relative' }}>
        <svg viewBox="0 0 600 50" fill="none" style={{ width: '100%', height: 'auto' }}>
          {/* Left line */}
          <line x1="0" y1="25" x2="220" y2="25" stroke="url(#goldGrad)" strokeWidth="0.5">
            {animated && <animate attributeName="x2" from="0" to="220" dur="1.5s" fill="freeze" />}
          </line>
          {/* Right line */}
          <line x1="380" y1="25" x2="600" y2="25" stroke="url(#goldGrad)" strokeWidth="0.5">
            {animated && <animate attributeName="x1" from="600" to="380" dur="1.5s" fill="freeze" />}
          </line>
          {/* Center diamond */}
          <path d="M300 10 L315 25 L300 40 L285 25 Z" stroke="url(#goldGrad)" strokeWidth="1" fill="none">
            {animated && <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.5s" fill="freeze" />}
          </path>
          <path d="M300 15 L310 25 L300 35 L290 25 Z" fill="url(#goldGrad)">
            {animated && <animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="0.8s" fill="freeze" />}
          </path>
          {/* Left lotus petal */}
          <path d="M240 25 Q250 15 260 25 Q250 35 240 25 Z" stroke="url(#goldGrad)" strokeWidth="0.5" fill="none">
            {animated && <animate attributeName="opacity" from="0" to="0.6" dur="0.5s" begin="1s" fill="freeze" />}
          </path>
          {/* Right lotus petal */}
          <path d="M340 25 Q350 15 360 25 Q350 35 340 25 Z" stroke="url(#goldGrad)" strokeWidth="0.5" fill="none">
            {animated && <animate attributeName="opacity" from="0" to="0.6" dur="0.5s" begin="1s" fill="freeze" />}
          </path>
          {/* Inner dots */}
          <circle cx="270" cy="25" r="2" fill="url(#goldGrad)">
            {animated && <animate attributeName="opacity" from="0" to="0.8" dur="0.3s" begin="1.2s" fill="freeze" />}
          </circle>
          <circle cx="330" cy="25" r="2" fill="url(#goldGrad)">
            {animated && <animate attributeName="opacity" from="0" to="0.8" dur="0.3s" begin="1.2s" fill="freeze" />}
          </circle>
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9a6f0b" />
              <stop offset="25%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#f5d680" />
              <stop offset="75%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#9a6f0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === 'lotus') {
    return (
      <div className={className} style={{ width, maxWidth: 400, margin: '1.5rem auto', position: 'relative' }}>
        <svg viewBox="0 0 400 60" fill="none" style={{ width: '100%', height: 'auto' }}>
          {/* Lines */}
          <line x1="0" y1="30" x2="140" y2="30" stroke="url(#goldGrad2)" strokeWidth="0.5" />
          <line x1="260" y1="30" x2="400" y2="30" stroke="url(#goldGrad2)" strokeWidth="0.5" />
          {/* Lotus */}
          <g transform="translate(200, 30)">
            {/* Center petal up */}
            <ellipse cx="0" cy="-12" rx="6" ry="14" fill="none" stroke="url(#goldGrad2)" strokeWidth="0.7" opacity="0.8" />
            {/* Left petal */}
            <ellipse cx="-14" cy="-6" rx="5" ry="12" transform="rotate(30)" fill="none" stroke="url(#goldGrad2)" strokeWidth="0.5" opacity="0.6" />
            {/* Right petal */}
            <ellipse cx="14" cy="-6" rx="5" ry="12" transform="rotate(-30)" fill="none" stroke="url(#goldGrad2)" strokeWidth="0.5" opacity="0.6" />
            {/* Far left */}
            <ellipse cx="-22" cy="0" rx="4" ry="10" transform="rotate(55)" fill="none" stroke="url(#goldGrad2)" strokeWidth="0.4" opacity="0.4" />
            {/* Far right */}
            <ellipse cx="22" cy="0" rx="4" ry="10" transform="rotate(-55)" fill="none" stroke="url(#goldGrad2)" strokeWidth="0.4" opacity="0.4" />
            {/* Center dot */}
            <circle cx="0" cy="-2" r="3" fill="url(#goldGrad2)" opacity="0.7" />
          </g>
          <defs>
            <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9a6f0b" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#9a6f0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Simple divider
  return (
    <div className={`ornament-divider ${className}`} style={{ width, maxWidth: 500 }}>
      <div className="ornament-line" />
      <div className="ornament-center" />
      <div className="ornament-line" />
    </div>
  );
}

export const OrnamentalDivider = memo(OrnamentalDividerComponent);
