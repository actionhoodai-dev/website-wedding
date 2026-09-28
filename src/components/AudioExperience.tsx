'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function AudioExperience() {
  // By default, music is intended to play automatically (not muted)
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

  // Play audio safely
  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userMutedRef.current) return;

    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Autoplay blocked until gesture; keep state ready
        });
    }
  }, []);

  // Mute / pause audio
  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    setIsMuted(true);
  }, []);

  // Cute speaker button toggle (mute / unmute)
  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isMuted && isPlaying) {
        userMutedRef.current = true;
        pauseAudio();
      } else {
        userMutedRef.current = false;
        setIsMuted(false);
        playAudio();
      }
    },
    [isMuted, isPlaying, pauseAudio, playAudio]
  );

  useEffect(() => {
    // Primary track: /final-web-song.mp3 with fallback to /audio.mp3
    const audio = new Audio('/final-web-song.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.8;
    audioRef.current = audio;

    audio.addEventListener('error', () => {
      if (audio.src.includes('final-web-song.mp3')) {
        audio.src = '/audio.mp3';
        audio.load();
        if (!userMutedRef.current) {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    });

    audio.addEventListener('play', () => {
      setIsPlaying(true);
      setIsMuted(false);
    });

    audio.addEventListener('pause', () => {
      if (userMutedRef.current) {
        setIsPlaying(false);
        setIsMuted(true);
      }
    });

    // Helper to start playback on interaction if not muted
    const tryStartAudio = () => {
      if (userMutedRef.current || !audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {});
    };

    // Synchronized event: fired 1 second after opening video ends
    const handleSynchronizedPlay = () => {
      setIsVisible(true);
      if (!userMutedRef.current && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {
            // If browser requires gesture, try on next interaction
            tryStartAudio();
          });
      }
    };

    // Unlock audio element early on user interaction
    const handleUnlock = () => {
      setIsVisible(true);
      if (!userMutedRef.current) {
        tryStartAudio();
      }
    };

    window.addEventListener('wedding-play-audio', handleSynchronizedPlay);
    window.addEventListener('pointerdown', handleUnlock, { passive: true });
    window.addEventListener('click', handleUnlock, { passive: true });
    window.addEventListener('touchstart', handleUnlock, { passive: true });
    window.addEventListener('scroll', handleUnlock, { passive: true, once: true });
    window.addEventListener('keydown', handleUnlock, { passive: true });

    return () => {
      window.removeEventListener('wedding-play-audio', handleSynchronizedPlay);
      window.removeEventListener('pointerdown', handleUnlock);
      window.removeEventListener('click', handleUnlock);
      window.removeEventListener('touchstart', handleUnlock);
      window.removeEventListener('scroll', handleUnlock);
      window.removeEventListener('keydown', handleUnlock);
      audio.pause();
      audio.src = '';
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(1.2rem + env(safe-area-inset-bottom, 0px))',
        left: 'calc(1.2rem + env(safe-area-inset-left, 0px))',
        zIndex: 1000,
        pointerEvents: 'auto',
        opacity: isVisible ? 1 : 0.85,
        transition: 'opacity 0.5s ease',
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isMuted ? 'Unmute wedding music' : 'Mute wedding music'}
        title={isMuted ? 'Click to play music' : 'Click to mute music'}
        className={`cute-speaker-btn ${!isMuted ? 'playing' : 'muted'}`}
      >
        {/* Cute Speaker Icon */}
        <div className="speaker-icon-wrap">
          {!isMuted ? (
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
          background: linear-gradient(135deg, rgba(65, 12, 22, 0.95) 0%, rgba(95, 20, 32, 0.95) 100%);
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
