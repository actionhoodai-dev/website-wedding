'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'showcase' | 'grid'>('showcase');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automated Showcase progression (advances every 3.8s when active)
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== 'showcase' || total <= 1) return;

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, viewMode, nextSlide, total, currentIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const activeItem = items[currentIndex];

  return (
    <section
      className="ceremonial-gallery-section"
      style={{
        minHeight: '90vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1rem, 3.5vw, 2.5rem)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at center, rgba(212,160,23,0.06) 0%, transparent 70%),
            linear-gradient(180deg, var(--dark-bg, #0a0503) 0%, rgba(26,14,8,0.75) 50%, var(--dark-bg, #0a0503) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          maxWidth: 680,
          marginBottom: '2rem',
          width: '100%',
        }}
      >
        <p
          className="font-poppins"
          style={{
            fontSize: 'clamp(0.65rem, 1.4vw, 0.78rem)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#b8860b',
            fontWeight: 600,
            marginBottom: '0.6rem',
          }}
        >
          GLIMPSES OF DEVOTION &amp; CELEBRATION
        </p>

        <h2
          className="section-title"
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            marginBottom: '0.8rem',
            letterSpacing: '0.12em',
          }}
        >
          THE SACRED MOMENTS
        </h2>

        <OrnamentalDivider variant="elaborate" />

        {/* View Mode Switcher Pills */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(28, 12, 16, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '9999px',
            padding: '3px',
            marginTop: '1.2rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}
        >
          <button
            type="button"
            onClick={() => setViewMode('showcase')}
            style={{
              background:
                viewMode === 'showcase'
                  ? 'linear-gradient(135deg, #d4a017 0%, #b8860b 100%)'
                  : 'transparent',
              color: viewMode === 'showcase' ? '#1a0b06' : 'rgba(255, 235, 180, 0.75)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.35rem 0.9rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              fontFamily: 'var(--font-poppins)',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span>✦</span> Showcase {isAutoPlaying && viewMode === 'showcase' ? '(Auto)' : ''}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            style={{
              background:
                viewMode === 'grid'
                  ? 'linear-gradient(135deg, #d4a017 0%, #b8860b 100%)'
                  : 'transparent',
              color: viewMode === 'grid' ? '#1a0b06' : 'rgba(255, 235, 180, 0.75)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.35rem 0.9rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              fontFamily: 'var(--font-poppins)',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span>▦</span> Grid View
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODE 1: MODERN AUTOMATIC SHOWCASE (Mobile-Optimized & Fluid)
          ───────────────────────────────────────────────────────────── */}
      {viewMode === 'showcase' ? (
        <div
          className="gallery-showcase-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Main Showcase Frame */}
          <div
            className="showcase-card"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #b8860b 0%, #8b6914 45%, #5c4409 100%)',
              padding: 'clamp(8px, 2.5vw, 14px)',
              borderRadius: '16px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(212, 175, 55, 0.3)',
              border: '1.5px solid rgba(255, 224, 130, 0.6)',
              position: 'relative',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            {/* Inner Velvet Liner */}
            <div
              style={{
                background: '#150805',
                padding: 'clamp(5px, 1.8vw, 8px)',
                borderRadius: '12px',
                border: '1px dashed rgba(212, 160, 23, 0.45)',
                position: 'relative',
              }}
            >
              {/* Image Viewport */}
              <div
                onClick={() => onSelectImage(activeItem.src)}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#090403',
                }}
              >
                <Image
                  key={activeItem.id}
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 95vw, 650px"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    animation: 'galleryFadeSlide 0.6s ease-out forwards',
                  }}
                  className="showcase-img"
                />

                {/* Subtle Vignette Gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(10,5,3,0.75) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* "Tap to Enlarge" badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(20, 7, 10, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(212, 175, 55, 0.5)',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: '#ffe082',
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-poppins)',
                    letterSpacing: '0.04em',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                    pointerEvents: 'none',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Tap to Enlarge</span>
                </div>

                {/* Left navigation chevron */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Previous photo"
                  className="showcase-nav-btn prev"
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(25, 8, 12, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.6)',
                    color: '#ffe082',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 20,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Right navigation chevron */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Next photo"
                  className="showcase-nav-btn next"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(25, 8, 12, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.6)',
                    color: '#ffe082',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 20,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slide Title & Counter Footer */}
            <div
              style={{
                marginTop: '0.85rem',
                padding: '0 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div style={{ textAlign: 'left', flex: 1, minWidth: '180px' }}>
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-poppins)',
                    color: '#ffe082',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '2px',
                    opacity: 0.85,
                  }}
                >
                  MOMENT {String(currentIndex + 1).padStart(2, '0')} OF {String(total).padStart(2, '0')}
                </span>
                <h4
                  className="font-poppins"
                  style={{
                    fontSize: 'clamp(0.85rem, 2.2vw, 1.05rem)',
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '0.02em',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {activeItem.alt}
                </h4>
              </div>

              {/* Pause / Play auto progression toggle */}
              <button
                type="button"
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                title={isAutoPlaying ? 'Pause automatic slideshow' : 'Resume automatic slideshow'}
                style={{
                  background: 'rgba(25, 8, 12, 0.7)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  color: isAutoPlaying ? '#ffe082' : 'rgba(255, 235, 180, 0.6)',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-poppins)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                }}
              >
                <span>{isAutoPlaying ? '⏸ Pause' : '▶ Play'}</span>
              </button>
            </div>
          </div>

          {/* Dots Indicator with active progress */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '1.2rem',
            }}
          >
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background:
                    idx === currentIndex
                      ? 'linear-gradient(90deg, #ffe082 0%, #d4a017 100%)'
                      : 'rgba(212, 175, 55, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow:
                    idx === currentIndex
                      ? '0 0 10px rgba(255, 224, 130, 0.6)'
                      : 'none',
                }}
              />
            ))}
          </div>

          {/* Mobile Swipe Guidance */}
          <p
            className="font-poppins"
            style={{
              fontSize: '0.68rem',
              color: 'rgba(212, 175, 55, 0.6)',
              letterSpacing: '0.08em',
              marginTop: '0.75rem',
              textAlign: 'center',
            }}
          >
            Swipe left or right to browse moments • Tap photo to view full size
          </p>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────
            MODE 2: RESPONSIVE GRID VIEW (Mobile Friendly 2-col / 3-col)
            ───────────────────────────────────────────────────────────── */
        <div
          className="gallery-responsive-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(145px, 44vw, 320px), 1fr))',
            gap: 'clamp(0.85rem, 2.5vw, 2rem)',
            maxWidth: '1160px',
            width: '100%',
            position: 'relative',
            zIndex: 10,
            boxSizing: 'border-box',
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onSelectImage(item.src)}
              className="gallery-grid-card"
              style={{
                position: 'relative',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #b8860b 0%, #8b6914 50%, #5c4409 100%)',
                padding: 'clamp(6px, 1.5vw, 10px)',
                borderRadius: '10px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(212, 160, 23, 0.35)',
                transition: 'all 0.35s ease',
              }}
            >
              <div
                style={{
                  background: '#150805',
                  padding: '4px',
                  borderRadius: '6px',
                  border: '1px dashed rgba(212, 160, 23, 0.3)',
                }}
              >
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
                    sizes="(max-width: 640px) 48vw, (max-width: 1024px) 33vw, 360px"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="grid-photo-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 60%, rgba(10,6,4,0.7) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '0.45rem', padding: '0 2px', textAlign: 'center' }}>
                <span
                  className="font-poppins"
                  style={{
                    fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)',
                    color: 'rgba(255, 235, 180, 0.9)',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.25,
                  }}
                >
                  {item.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes galleryFadeSlide {
          0% {
            opacity: 0.4;
            transform: scale(0.97);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .showcase-card:hover .showcase-img {
          transform: scale(1.03);
        }

        .showcase-nav-btn:hover {
          background: rgba(50, 15, 24, 0.95) !important;
          border-color: #ffd700 !important;
          transform: translateY(-50%) scale(1.1) !important;
        }

        .gallery-grid-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 224, 130, 0.8) !important;
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.85), 0 0 20px rgba(212, 175, 55, 0.3) !important;
        }

        .gallery-grid-card:hover .grid-photo-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
