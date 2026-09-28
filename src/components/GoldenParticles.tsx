'use client';

import { useEffect, useRef, useState, useCallback, memo } from 'react';

interface GoldenParticlesProps {
  count?: number;
  active?: boolean;
  area?: { width: number; height: number };
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  delay: number;
  phase: number;
}

function GoldenParticlesComponent({ count = 30, active = true, className = '' }: GoldenParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        opacity: 0,
        speed: 0.1 + Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 0.2,
        delay: Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, [count]);

  useEffect(() => {
    if (!active) return;
    initParticles();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      ctx.clearRect(0, 0, rect.width, rect.height);
      const t = Date.now() * 0.001;

      particlesRef.current.forEach((p) => {
        const age = (t - p.delay) % 8;
        if (age < 0) return;

        const progress = age / 8;
        p.opacity = progress < 0.15
          ? progress / 0.15
          : progress > 0.7
            ? (1 - progress) / 0.3
            : 0.7 + Math.sin(t * 2 + p.phase) * 0.3;

        const px = (p.x + Math.sin(t * 0.5 + p.phase) * 3 + p.drift * age * 10) * rect.width / 100;
        const py = (p.y - p.speed * age * 12) * rect.height / 100;

        if (py < 0 || py > rect.height) return;

        ctx.save();
        ctx.globalAlpha = p.opacity * 0.6;
        ctx.fillStyle = `hsl(${42 + Math.sin(t + p.phase) * 10}, 80%, ${65 + Math.sin(t * 1.5 + p.phase) * 15}%)`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.globalAlpha = p.opacity * 0.2;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
        grad.addColorStop(0, `hsla(42, 80%, 70%, 0.4)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}

export const GoldenParticles = memo(GoldenParticlesComponent);
