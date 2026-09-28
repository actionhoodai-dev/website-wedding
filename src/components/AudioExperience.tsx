'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function AudioExperience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio Tanpura & Sacred Temple Chimes
  const startSacredAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // ─── Traditional Tanpura Drone (Sa, Pa, Sa', Sa) in Key of C# (approx 138.5 Hz) ───
      // Sa (Tonic): 138.59 Hz
      // Pa (Fifth): 207.65 Hz
      // Tar Sa (Higher Octave): 277.18 Hz
      const droneNotes = [
        { freq: 207.65, type: 'sine' as OscillatorType, gain: 0.12 }, // Pa
        { freq: 277.18, type: 'triangle' as OscillatorType, gain: 0.08 }, // Higher Sa
        { freq: 138.59, type: 'sine' as OscillatorType, gain: 0.15 }, // Mukhya Sa
        { freq: 69.3, type: 'sine' as OscillatorType, gain: 0.1 },  // Kharaj (Deep Sa)
      ];

      droneNotes.forEach((note, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = note.type;
        osc.frequency.setValueAtTime(note.freq, ctx.currentTime);

        // Gentle natural pitch shimmer (vibrato/chorus)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        noteGain.gain.setValueAtTime(note.gain, ctx.currentTime);
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start();
      });

      // ─── Periodic Auspicious Temple Bell (Mani) Chime ───
      const playTempleBell = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const bellCtx = audioCtxRef.current;
        const bellOsc = bellCtx.createOscillator();
        const bellGain = bellCtx.createGain();

        // High harmonic brass temple bell frequency ~1100Hz with overtones
        bellOsc.type = 'sine';
        bellOsc.frequency.setValueAtTime(1108, bellCtx.currentTime);
        bellGain.gain.setValueAtTime(0.04, bellCtx.currentTime);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, bellCtx.currentTime + 3.5);

        bellOsc.connect(bellGain);
        bellGain.connect(bellCtx.destination);
        bellOsc.start();
        bellOsc.stop(bellCtx.currentTime + 3.6);
      };

      // Play chime initially and every 14 seconds
      setTimeout(playTempleBell, 2000);
      const bellInterval = setInterval(playTempleBell, 14000);
      timerRef.current = bellInterval;

      setIsPlaying(true);
    } catch {
      // Audio autoplay policy handled gracefully
    }
  }, []);

  const stopSacredAudio = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
      }, 900);
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      stopSacredAudio();
    } else {
      startSacredAudio();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 'clamp(1rem, 3vw, 1.5rem)',
        left: 'clamp(1rem, 3vw, 1.5rem)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
      }}
    >
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Mute sacred wedding audio' : 'Play sacred wedding audio'}
        style={{
          background: 'rgba(255, 249, 234, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(184, 138, 53, 0.45)',
          borderRadius: '24px',
          padding: '0.45rem 0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          cursor: 'pointer',
          boxShadow: isPlaying ? '0 0 18px rgba(184, 138, 53, 0.35)' : '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Equalizer animation when playing */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '14px', width: '16px' }}>
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              style={{
                width: '2px',
                background: 'var(--gold-antique, #b88a35)',
                borderRadius: '1px',
                height: isPlaying ? `${Math.sin(i * 1.5) * 8 + 9}px` : '4px',
                animation: isPlaying ? `equalizerPulse ${0.6 + i * 0.2}s infinite alternate ease-in-out` : 'none',
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-heading, "Cinzel", serif)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--red-deep, #7a1c1c)',
            fontWeight: 600,
          }}
        >
          {isPlaying ? 'Sacred Melody' : 'Music'}
        </span>
      </button>

      <style jsx global>{`
        @keyframes equalizerPulse {
          0% { height: 3px; }
          100% { height: 14px; }
        }
      `}</style>
    </div>
  );
}
