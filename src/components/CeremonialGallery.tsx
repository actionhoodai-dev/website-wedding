'use client';

import { useState } from 'react';
import Image from 'next/image';
import { OrnamentalDivider } from './OrnamentalDivider';

interface GalleryItem {
  readonly id: number;
  readonly src: string;
  readonly alt: string;
}

interface CeremonialGalleryProps {
  items: readonly GalleryItem[];
  onSelectImage: (src: string) => void;
}

export function CeremonialGallery({ items, onSelectImage }: CeremonialGalleryProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at center, rgba(212,160,23,0.05) 0%, transparent 65%),
            linear-gradient(180deg, var(--dark-bg) 0%, rgba(26,14,8,0.7) 50%, var(--dark-bg) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: 650, marginBottom: '3.5rem' }}>
        <p
          className="font-accent"
          style={{
            fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.4em',
            color: 'var(--gold-700)',
            marginBottom: '0.8rem',
          }}
        >
          GLIMPSES OF DEVOTION &amp; CELEBRATION
        </p>

        <h2
          className="section-title"
          style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            marginBottom: '1rem',
          }}
        >
          THE SACRED MOMENTS
        </h2>

        <OrnamentalDivider variant="elaborate" />
      </div>

      {/* 3D Perspective Photo Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.8rem)',
          maxWidth: '1180px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
          perspective: '1200px',
        }}
      >
        {items.map((item, index) => {
          const isHovered = hoveredId === item.id;
          // Alternate slight rotational tilt for authentic gallery depth
          const baseRotation = index % 2 === 0 ? -1.5 : 1.5;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectImage(item.src)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                transform: isHovered
                  ? 'translateY(-14px) scale(1.03) rotateZ(0deg) rotateX(4deg)'
                  : `translateY(0px) scale(1) rotateZ(${baseRotation}deg)`,
                transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
              }}
            >
              {/* Outer Golden Carved Bevel Frame */}
              <div
                style={{
                  background: isHovered
                    ? 'linear-gradient(135deg, #ffe082 0%, #d4a017 35%, #ffd700 70%, #b8860b 100%)'
                    : 'linear-gradient(135deg, #b8860b 0%, #8b6914 50%, #5c4409 100%)',
                  padding: '12px',
                  borderRadius: '12px',
                  boxShadow: isHovered
                    ? '0 25px 45px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 215, 0, 0.45)'
                    : '0 12px 28px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5)',
                  border: isHovered ? '1px solid rgba(255, 235, 150, 0.8)' : '1px solid rgba(212, 160, 23, 0.3)',
                  transition: 'all 0.5s ease',
                }}
              >
                {/* Inner Velvet Liner */}
                <div
                  style={{
                    background: '#1a0b06',
                    padding: '6px',
                    borderRadius: '8px',
                    border: '1px dashed rgba(212, 160, 23, 0.4)',
                  }}
                >
                  {/* Photo Container */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      width: '100%',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      background: '#0a0604',
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      style={{
                        objectFit: 'cover',
                        filter: isHovered ? 'contrast(1.05) saturate(1.1)' : 'contrast(1) saturate(0.95)',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                    />

                    {/* Gradient Overlay for Mood */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 65%, rgba(10,6,4,0.6) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Hover Magnify Icon / Title */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        insetInline: 0,
                        padding: '0.8rem',
                        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                        opacity: isHovered ? 1 : 0,
                        transition: 'all 0.35s ease',
                        background: 'linear-gradient(0deg, rgba(14,8,5,0.95) 0%, transparent 100%)',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        className="font-heading"
                        style={{
                          fontSize: '0.75rem',
                          letterSpacing: '0.15em',
                          color: 'var(--gold-shine)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.alt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
