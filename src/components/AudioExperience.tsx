'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface AudioExperienceProps {
  autoPlayOnReveal?: boolean;
  visible?: boolean;
}

export function AudioExperience({ autoPlayOnReveal = true, visible = true }: AudioExperienceProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth fade-in helper
  const fadeIn = useCallback((audio: HTMLAudioElement, targetVol = 0.65, duration = 1500) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audio.volume = 0;
    const stepTime = 50;
    const steps = duration / stepTime;
    const stepVol = targetVol / steps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }
      if (audio.volume + stepVol >= targetVol) {
        audio.volume = targetVol;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audio.volume = Math.min(targetVol, audio.volume + stepVol);
      }
    }, stepTime);
  }, []);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          fadeIn(audio, 0.65, 1200);
        })
        .catch(() => {
          // Autoplay was prevented by browser policy
          setIsPlaying(false);
        });
    }
  }, [fadeIn]);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggleAudio = useCallback(() => {
    setHasInteracted(true);
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  // Initialize and attempt autoplay on user interaction
  useEffect(() => {
    const audio = new Audio('/audio.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Try initial play
    if (autoPlayOnReveal) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            fadeIn(audio, 0.65, 1500);
          })
          .catch(() => {
            // Autoplay blocked — wait for first user gesture
            const handleFirstGesture = () => {
              if (!hasInteracted && audioRef.current) {
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    fadeIn(audioRef.current!, 0.65, 1200);
                  })
                  .catch(() => {});
              }
              window.removeEventListener('click', handleFirstGesture);
              window.removeEventListener('touchstart', handleFirstGesture);
              window.removeEventListener('keydown', handleFirstGesture);
            };

            window.addEventListener('click', handleFirstGesture, { once: true });
            window.addEventListener('touchstart', handleFirstGesture, { once: true });
            window.addEventListener('keydown', handleFirstGesture, { once: true });
          });
      }
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = '';
    };
  }, [autoPlayOnReveal, fadeIn, hasInteracted]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 'clamp(1rem, 3vw, 1.5rem)',
        left: 'clamp(1rem, 3vw, 1.5rem)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.6s ease',
      }}
    >
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Pause wedding soundtrack (Aasaimugam)' : 'Play wedding soundtrack (Aasaimugam)'}
        title={isPlaying ? 'Pause Music — Aasaimugam' : 'Play Music — Aasaimugam'}
        style={{
          background: 'rgba(75, 17, 24, 0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(184, 138, 53, 0.55)',
          borderRadius: '24px',
          padding: '0.45rem 0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          cursor: 'pointer',
          boxShadow: isPlaying
            ? '0 0 20px rgba(184, 138, 53, 0.4), inset 0 0 10px rgba(184, 138, 53, 0.15)'
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Animated Equalizer Wave Bars */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '2.5px',
            height: '14px',
            width: '16px',
          }}
        >
          {[0.6, 0.9, 0.5, 0.8].map((speed, i) => (
            <span
              key={i}
              style={{
                width: '2px',
                background: isPlaying ? 'var(--gold-bright, #d4af37)' : 'rgba(212, 175, 55, 0.5)',
                borderRadius: '1px',
                height: isPlaying ? '14px' : '4px',
                animation: isPlaying ? `audioWavePulse ${speed}s infinite alternate ease-in-out` : 'none',
                animationDelay: `${i * 0.15}s`,
                transition: 'height 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Music Label */}
        <span
          style={{
            fontFamily: 'var(--font-heading, "Cinzel", serif)',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--gold-bright, #d4af37)',
            fontWeight: 600,
          }}
        >
          {isPlaying ? 'Music' : 'Play Music'}
        </span>
      </button>

      <style jsx global>{`
        @keyframes audioWavePulse {
          0% {
            height: 3px;
            opacity: 0.6;
          }
          50% {
            height: 14px;
            opacity: 1;
          }
          100% {
            height: 7px;
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
