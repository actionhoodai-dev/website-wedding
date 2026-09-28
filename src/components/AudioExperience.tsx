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

  // Pause/Mute audio
  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // Cute speaker button toggle (mute / unmute)
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
    // Primary track: /final-web-song.mp3 with fallback to /audio.mp3
    const audio = new Audio('/final-web-song.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.75;
    audioRef.current = audio;

    audio.addEventListener('error', () => {
      if (audio.src.includes('final-web-song.mp3')) {
        // Fallback to secondary track
        audio.src = '/audio.mp3';
        audio.load();
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        setHasError(true);
      }
    });

    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));

    // Attempt audio playback immediately or on first user interaction
    const startAudio = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          cleanupGestureListeners();
        })
        .catch(() => {
          // Waiting for user gesture
        });
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('pointerdown', startAudio);
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      window.removeEventListener('touchend', startAudio);
      window.removeEventListener('scroll', startAudio);
      window.removeEventListener('keydown', startAudio);
    };

    // Attempt immediate autoplay on load
    startAudio();

    // Register user gesture listeners for seamless auto-start on first touch/click/scroll
    window.addEventListener('pointerdown', startAudio, { passive: true });
    window.addEventListener('click', startAudio, { passive: true });
    window.addEventListener('touchstart', startAudio, { passive: true });
    window.addEventListener('touchend', startAudio, { passive: true });
    window.addEventListener('scroll', startAudio, { passive: true, once: true });
    window.addEventListener('keydown', startAudio, { passive: true });

    // Custom programmatic event to trigger audio
    const handleGlobalPlay = () => startAudio();
    window.addEventListener('wedding-play-audio', handleGlobalPlay);

    return () => {
      cleanupGestureListeners();
      window.removeEventListener('wedding-play-audio', handleGlobalPlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  if (hasError) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(1.2rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.2rem + env(safe-area-inset-right, 0px))',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Mute wedding music' : 'Play wedding music'}
        title={isPlaying ? 'Mute music' : 'Play music'}
        className={`cute-speaker-btn ${isPlaying ? 'playing' : 'muted'}`}
      >
        {/* Cute Speaker Icon */}
        <div className="speaker-icon-wrap">
          {isPlaying ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffe082"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="speaker-svg"
            >
              {/* Speaker body */}
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(255, 224, 130, 0.25)" />
              {/* Inner sound wave arc */}
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="wave-inner" />
              {/* Outer sound wave arc */}
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="wave-outer" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(212, 175, 55, 0.7)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="speaker-svg"
            >
              {/* Muted speaker with strike-through line */}
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(212, 175, 55, 0.1)" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </div>
      </button>

      <style jsx global>{`
        .cute-speaker-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(45, 10, 18, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(212, 175, 55, 0.65);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45), 0 0 10px rgba(212, 175, 55, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          outline: none;
        }

        .cute-speaker-btn.playing {
          background: linear-gradient(135deg, rgba(65, 12, 22, 0.94) 0%, rgba(95, 20, 32, 0.94) 100%);
          border-color: rgba(255, 224, 130, 0.85);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5), 0 0 14px rgba(212, 175, 55, 0.4);
          animation: cuteSpeakerPulse 3s infinite ease-in-out;
        }

        .cute-speaker-btn:hover {
          transform: scale(1.1) translateY(-2px);
          border-color: #ffd700;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6), 0 0 18px rgba(255, 215, 0, 0.6);
        }

        .cute-speaker-btn:active {
          transform: scale(0.92);
        }

        .speaker-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        @keyframes cuteSpeakerPulse {
          0%, 100% {
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5), 0 0 12px rgba(212, 175, 55, 0.35);
          }
          50% {
            box-shadow: 0 4px 22px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 224, 130, 0.6);
          }
        }

        .wave-inner {
          animation: wavePulse 1.8s infinite ease-in-out;
        }

        .wave-outer {
          animation: wavePulse 1.8s infinite ease-in-out 0.3s;
        }

        @keyframes wavePulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
