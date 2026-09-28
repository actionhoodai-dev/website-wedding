'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function AudioExperience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio safely handling browser autoplay policies
  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser until user gesture
          setIsPlaying(false);
        });
    }
  }, []);

  // Pause audio
  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // Toggle button handler (turn on / off)
  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    },
    [isPlaying, pauseAudio, playAudio]
  );

  useEffect(() => {
    // Create and configure audio instance with final-web-song.mp3
    const audio = new Audio('/final-web-song.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.75;
    audioRef.current = audio;

    audio.addEventListener('error', () => {
      setHasError(true);
    });

    // 1. Attempt default autoplay immediately on page load
    const initialPlay = audio.play();
    if (initialPlay !== undefined) {
      initialPlay
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser blocked unmuted autoplay, listen for the very first interaction
          const handleFirstGesture = () => {
            if (audioRef.current) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(() => {});
            }
            cleanupGestureListeners();
          };

          const cleanupGestureListeners = () => {
            window.removeEventListener('pointerdown', handleFirstGesture);
            window.removeEventListener('click', handleFirstGesture);
            window.removeEventListener('touchstart', handleFirstGesture);
            window.removeEventListener('scroll', handleFirstGesture, { capture: true });
            window.removeEventListener('keydown', handleFirstGesture);
          };

          window.addEventListener('pointerdown', handleFirstGesture, { once: true });
          window.addEventListener('click', handleFirstGesture, { once: true });
          window.addEventListener('touchstart', handleFirstGesture, { once: true });
          window.addEventListener('scroll', handleFirstGesture, { once: true, capture: true });
          window.addEventListener('keydown', handleFirstGesture, { once: true });
        });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  if (hasError) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 'clamp(1rem, 2.5vw, 1.4rem)',
        left: 'clamp(1rem, 2.5vw, 1.4rem)',
        zIndex: 1100, // Above video overlay and navbar
        pointerEvents: 'auto',
      }}
    >
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Turn off music' : 'Turn on music'}
        title={isPlaying ? 'Click to turn off music' : 'Click to turn on music'}
        className="cute-music-btn"
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, rgba(60, 8, 16, 0.92) 0%, rgba(95, 18, 28, 0.92) 100%)'
            : 'rgba(25, 6, 10, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: isPlaying
            ? '1.5px solid rgba(212, 175, 55, 0.85)'
            : '1.5px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '9999px',
          padding: '0.45rem 0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          cursor: 'pointer',
          boxShadow: isPlaying
            ? '0 4px 20px rgba(212, 175, 55, 0.35), 0 0 12px rgba(95, 18, 28, 0.5)'
            : '0 4px 12px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Cute spinning vinyl disc or muted icon */}
        <div
          style={{
            position: 'relative',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isPlaying ? (
            <div
              className="spinning-vinyl"
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #d4af37, #ffe082, #b8860b, #d4af37)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 6px rgba(212, 175, 55, 0.6)',
              }}
            >
              {/* Inner Vinyl Groove */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3c0810',
                  border: '1.5px solid #d4af37',
                }}
              />
            </div>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.7 }}
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(212, 175, 55, 0.2)" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </div>

        {/* Cute Equalizer Sound Waves when playing */}
        {isPlaying ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '2px',
              height: '13px',
              width: '14px',
            }}
          >
            {[0.5, 0.8, 0.6, 0.9].map((dur, idx) => (
              <span
                key={idx}
                style={{
                  width: '2px',
                  background: '#ffe082',
                  borderRadius: '2px',
                  height: '100%',
                  animation: `cuteWavePulse ${dur}s infinite alternate ease-in-out`,
                  animationDelay: `${idx * 0.12}s`,
                }}
              />
            ))}
          </div>
        ) : null}

        {/* Cute label */}
        <span
          style={{
            fontFamily: 'var(--font-heading, "Cinzel", serif)',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: isPlaying ? '#ffe082' : 'rgba(212, 175, 55, 0.75)',
            userSelect: 'none',
          }}
        >
          {isPlaying ? 'Music ON' : 'Turn On'}
        </span>
      </button>

      <style jsx global>{`
        .cute-music-btn:hover {
          transform: scale(1.06) translateY(-1px);
        }
        .cute-music-btn:active {
          transform: scale(0.96);
        }
        .spinning-vinyl {
          animation: spinRecord 3s linear infinite;
        }
        @keyframes spinRecord {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes cuteWavePulse {
          0% {
            height: 2px;
            opacity: 0.5;
          }
          50% {
            height: 12px;
            opacity: 1;
          }
          100% {
            height: 5px;
            opacity: 0.75;
          }
        }
      `}</style>
    </div>
  );
}
