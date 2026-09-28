'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { AudioExperience } from '@/components/AudioExperience';

/* ============================================================
   UTILITY — Countdown Hook
   ============================================================ */
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return timeLeft;
}

/* ============================================================
   REUSABLE — Ornamental Divider
   ============================================================ */
function GoldDivider({ width = 200 }: { width?: number }) {
  return (
    <div className="ornament-divider" style={{ maxWidth: width }}>
      <div className="ornament-line" />
      <div className="ornament-diamond" />
      <div className="ornament-line" />
    </div>
  );
}

function GoldLine() {
  return <div className="ornament-gold-line" />;
}

/* ============================================================
   REUSABLE — Section Reveal Animation Wrapper
   ============================================================ */
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   REUSABLE — Staggered Text Reveal
   ============================================================ */
function StaggeredText({
  lines,
  className = '',
  lineClassName = '',
  staggerDelay = 0.15,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className={lineClassName}
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{
            duration: 0.9,
            delay: i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   REUSABLE — Temple Arch SVG Ornament
   ============================================================ */
function TempleArchOrnament({ color = 'var(--gold-antique)', opacity = 0.25 }: { color?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 400 80" fill="none" style={{ width: '100%', maxWidth: 380, opacity, margin: '0 auto', display: 'block' }}>
      {/* Arch */}
      <path d="M50 78 Q50 20 200 10 Q350 20 350 78" stroke={color} strokeWidth="1" fill="none" />
      <path d="M70 78 Q70 30 200 22 Q330 30 330 78" stroke={color} strokeWidth="0.5" fill="none" />
      {/* Finial */}
      <circle cx="200" cy="6" r="4" stroke={color} strokeWidth="0.8" fill="none" />
      <circle cx="200" cy="6" r="1.5" fill={color} />
      {/* Corner ornaments */}
      <line x1="10" y1="78" x2="50" y2="78" stroke={color} strokeWidth="0.5" />
      <line x1="350" y1="78" x2="390" y2="78" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}

/* ============================================================
   COMPONENT — Navigation Menu
   ============================================================ */
function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <button
        className={`nav-menu-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
        id="nav-menu-button"
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-overlay open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GoldDivider width={160} />
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
              {WEDDING_CONFIG.navigation.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div style={{ marginTop: '1.5rem' }}>
              <GoldDivider width={120} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   COMPONENT — Event Chapter (Wedding / Reception)
   ============================================================ */
function EventChapter({
  id,
  title,
  dateNumber,
  monthYear,
  day,
  time,
  venueName,
  venueAddress,
  venueCity,
  mapUrl,
  bgVariant = 'ivory',
}: {
  id: string;
  title: string;
  dateNumber: string;
  monthYear: string;
  day: string;
  time: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  mapUrl?: string;
  bgVariant?: 'ivory' | 'cream';
}) {
  return (
    <section
      id={id}
      className={`event-section event-section--${bgVariant}`}
      style={{ textAlign: 'center' }}
    >
      <div className="section-border-top" />

      <RevealSection>
        <p className="label-text" style={{ marginBottom: '0.75rem' }}>{title}</p>
        <GoldDivider width={160} />
      </RevealSection>

      <RevealSection delay={0.15}>
        <div style={{ marginTop: '2rem' }}>
          <div className="event-date-number">{dateNumber}</div>
          <div className="event-month-year">{monthYear}</div>
          <div className="event-day">{day}</div>
        </div>
      </RevealSection>

      <RevealSection delay={0.3}>
        <GoldLine />
        <div className="event-time">{time}</div>
      </RevealSection>

      <RevealSection delay={0.45}>
        <GoldLine />
        <div className="event-venue-name">{venueName}</div>
        <div className="event-venue-address">{venueAddress}</div>
        <div className="event-venue-address">{venueCity}</div>
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            View Location
          </a>
        )}
      </RevealSection>

      <div className="section-border-bottom" />
    </section>
  );
}

/* ============================================================
   MAIN COMPONENT — The Wedding Invitation Experience
   ============================================================ */
export default function WeddingExperience() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoFadeDone, setVideoFadeDone] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '1',
    message: '',
  });
  const [viewerImage, setViewerImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const countdown = useCountdown(WEDDING_CONFIG.ceremony.dateISO);

  // ─── Video end handler ─────────────
  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true);
    // After opacity transition (1.2s), remove the video overlay entirely
    setTimeout(() => setVideoFadeDone(true), 1400);
  }, []);

  // Safety fallback: ensure page reveals even if browser blocks autoplay or video fails
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoEnded) {
        handleVideoEnd();
      }
    }, 7500);
    return () => clearTimeout(timer);
  }, [handleVideoEnd, videoEnded]);

  // ─── Lenis smooth scroll ─────────────
  useEffect(() => {
    if (!videoFadeDone) return;
    let lenis: InstanceType<typeof import('lenis').default> | null = null;

    import('lenis').then((mod) => {
      const Lenis = mod.default;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => {
      lenis?.destroy();
    };
  }, [videoFadeDone]);

  // ─── GSAP ScrollTrigger animations ─────────────
  useEffect(() => {
    if (!videoFadeDone) return;

    let ctx: ReturnType<typeof import('gsap').gsap.context> | null = null;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // Parallax on hero background ornament
          gsap.to('.hero-ornament-bg', {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: '#invitation',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });

          // Each event section: date number scales in
          gsap.utils.toArray<HTMLElement>('.event-date-number').forEach((el) => {
            gsap.from(el, {
              scale: 0.7,
              opacity: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            });
          });

          // Story section: pinned parallax
          const storyItems = gsap.utils.toArray<HTMLElement>('.story-item');
          if (storyItems.length > 0) {
            storyItems.forEach((item, i) => {
              gsap.from(item, {
                opacity: 0,
                y: 60,
                scale: 0.95,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 82%',
                  toggleActions: 'play none none none',
                },
                delay: i * 0.08,
              });
            });
          }

          // Gold ornamental lines draw on scroll
          gsap.utils.toArray<HTMLElement>('.ornament-gold-line').forEach((line) => {
            gsap.from(line, {
              scaleX: 0,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            });
          });

          // Gallery items: staggered reveal
          gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, i) => {
            gsap.from(item, {
              opacity: 0,
              y: 40,
              scale: 0.96,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.08,
            });
          });
        });
      });
    });

    return () => {
      ctx?.revert();
    };
  }, [videoFadeDone]);

  // ─── RSVP handler ─────────────
  const handleRsvpSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  }, []);

  const { ceremony, receptionOne, receptionTwo } = WEDDING_CONFIG;

  return (
    <>
      {/* ═══════════════════════════════════════════
          OPENING VIDEO — Full-screen cinematic intro
          ═══════════════════════════════════════════ */}
      {!videoFadeDone && (
        <div className={`video-opening ${videoEnded ? 'fade-out' : ''}`}>
          <video
            ref={videoRef}
            src="/final_header_video.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            className="video-skip-btn"
            onClick={handleVideoEnd}
            aria-label="Skip to invitation"
          >
            Skip Intro &rarr;
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          NAVIGATION & SACRED AUDIO
          ═══════════════════════════════════════════ */}
      {videoFadeDone && (
        <>
          <AudioExperience />
          <NavigationMenu />
        </>
      )}

      {/* ═══════════════════════════════════════════
          MAIN INVITATION CONTENT
          ═══════════════════════════════════════════ */}
      <main style={{ opacity: videoFadeDone ? 1 : 0, transition: 'opacity 0.8s ease' }}>

        {/* ══════════════════════════════════════
            SECTION: TEMPLE REVEAL / BLESSING
            ══════════════════════════════════════ */}
        <section
          id="invitation"
          className="event-section event-section--ivory"
          style={{ position: 'relative', textAlign: 'center' }}
        >
          {/* Background ornamental architecture */}
          <div
            className="hero-ornament-bg"
            style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(280px, 55vw, 500px)',
              opacity: 0.06,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <svg viewBox="0 0 500 600" fill="none" style={{ width: '100%' }}>
              {/* Gopuram silhouette */}
              <rect x="150" y="450" width="200" height="120" fill="var(--gold-antique)" opacity="0.5" />
              <path d="M170 450 L170 370 L330 370 L330 450 Z" fill="var(--gold-antique)" opacity="0.4" />
              <path d="M185 370 L185 300 L315 300 L315 370 Z" fill="var(--gold-antique)" opacity="0.35" />
              <path d="M200 300 L200 240 L300 240 L300 300 Z" fill="var(--gold-antique)" opacity="0.3" />
              <path d="M215 240 L215 190 L285 190 L285 240 Z" fill="var(--gold-antique)" opacity="0.25" />
              <path d="M230 190 L230 140 L270 140 L270 190 Z" fill="var(--gold-antique)" opacity="0.2" />
              <path d="M240 140 L250 80 L260 140 Z" fill="var(--gold-antique)" opacity="0.25" />
              {/* Kalasam */}
              <circle cx="250" cy="72" r="10" fill="var(--gold-antique)" opacity="0.2" />
            </svg>
          </div>

          <RevealSection>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <TempleArchOrnament opacity={0.3} />

              <div style={{ marginTop: '2rem' }}>
                <p className="label-text">{WEDDING_CONFIG.blessing.blessingText}</p>
                <h2
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    color: 'var(--gold-antique)',
                    marginTop: '0.5rem',
                  }}
                >
                  {WEDDING_CONFIG.blessing.deityDisplayName}
                </h2>
              </div>

              <GoldDivider width={220} />

              <div style={{ marginTop: '2.5rem' }}>
                <h1
                  className="couple-name"
                  style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}
                >
                  {WEDDING_CONFIG.couple.groom.displayName}
                </h1>

                <div
                  className="weds-text"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                    margin: '1rem 0',
                  }}
                >
                  Weds
                </div>

                <h1
                  className="couple-name"
                  style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}
                >
                  {WEDDING_CONFIG.couple.bride.displayName}
                </h1>
              </div>

              <GoldDivider width={180} />

              <p
                className="label-text"
                style={{ marginTop: '1.5rem', letterSpacing: '0.3em', fontSize: 'clamp(0.6rem, 1.1vw, 0.7rem)' }}
              >
                {WEDDING_CONFIG.ceremony.date} · {WEDDING_CONFIG.ceremony.venue.city}
              </p>
            </div>
          </RevealSection>

          {/* Scroll hint */}
          {videoFadeDone && (
            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <span className="scroll-indicator-text">Scroll</span>
              <div className="scroll-indicator-line" />
            </motion.div>
          )}
        </section>

        {/* ══════════════════════════════════════
            SECTION: THE COUPLE
            ══════════════════════════════════════ */}
        <section
          id="couple"
          className="event-section event-section--cream"
          style={{ textAlign: 'center' }}
        >
          <div className="section-border-top" />

          <RevealSection>
            <p className="label-text" style={{ marginBottom: '0.75rem' }}>TOGETHER WITH THEIR FAMILIES</p>
            <GoldDivider width={200} />
          </RevealSection>

          <RevealSection delay={0.2}>
            <div
              style={{
                width: 'clamp(200px, 55vw, 320px)',
                height: 'clamp(260px, 70vw, 420px)',
                margin: '2rem auto',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(184, 138, 53, 0.3)',
              }}
            >
              <img
                src={WEDDING_CONFIG.couple.portrait}
                alt={`${WEDDING_CONFIG.couple.groom.name} & ${WEDDING_CONFIG.couple.bride.name}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Gold corner accents */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: 30, height: 30,
                borderTop: '2px solid var(--gold-antique)', borderLeft: '2px solid var(--gold-antique)',
              }} />
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 30, height: 30,
                borderTop: '2px solid var(--gold-antique)', borderRight: '2px solid var(--gold-antique)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: 30, height: 30,
                borderBottom: '2px solid var(--gold-antique)', borderLeft: '2px solid var(--gold-antique)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, right: 0, width: 30, height: 30,
                borderBottom: '2px solid var(--gold-antique)', borderRight: '2px solid var(--gold-antique)',
              }} />
            </div>
          </RevealSection>

          <RevealSection delay={0.3}>
            <h2 className="couple-name" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', marginTop: '1rem' }}>
              {WEDDING_CONFIG.couple.groom.displayName}
            </h2>
            <div className="weds-text" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', margin: '0.75rem 0' }}>
              &amp;
            </div>
            <h2 className="couple-name" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)' }}>
              {WEDDING_CONFIG.couple.bride.displayName}
            </h2>
          </RevealSection>

          <RevealSection delay={0.45}>
            <GoldLine />
            <p
              className="font-accent"
              style={{
                fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
                fontStyle: 'italic',
                color: 'var(--brown-text)',
                letterSpacing: '0.08em',
                marginTop: '0.5rem',
              }}
            >
              Request the honour of your gracious presence
            </p>
          </RevealSection>
        </section>

        {/* ══════════════════════════════════════
            SECTION: COUNTDOWN
            ══════════════════════════════════════ */}
        <section className="event-section event-section--ivory" style={{ minHeight: '50vh', textAlign: 'center' }}>
          <div className="section-border-top" />

          <RevealSection>
            <p className="label-text" style={{ marginBottom: '1rem' }}>THE AUSPICIOUS DAY ARRIVES IN</p>
            <GoldDivider width={160} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(1.5rem, 5vw, 3rem)',
                marginTop: '2rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: countdown.days, label: 'Days' },
                { value: countdown.hours, label: 'Hours' },
                { value: countdown.minutes, label: 'Minutes' },
                { value: countdown.seconds, label: 'Seconds' },
              ].map((unit) => (
                <div key={unit.label} className="countdown-unit">
                  <span className="countdown-value">{String(unit.value).padStart(2, '0')}</span>
                  <span className="countdown-label">{unit.label}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ══════════════════════════════════════
            SECTION: THE WEDDING
            ══════════════════════════════════════ */}
        <EventChapter
          id="wedding"
          title={ceremony.title}
          dateNumber={ceremony.dateNumber}
          monthYear={ceremony.monthYear}
          day={ceremony.day}
          time={ceremony.time}
          venueName={ceremony.venue.name}
          venueAddress={ceremony.venue.address}
          venueCity={ceremony.venue.city}
          mapUrl={ceremony.venue.mapUrl}
          bgVariant="cream"
        />

        {/* ══════════════════════════════════════
            SECTION: RECEPTION I
            ══════════════════════════════════════ */}
        <EventChapter
          id="reception-1"
          title={receptionOne.title}
          dateNumber={receptionOne.dateNumber}
          monthYear={receptionOne.monthYear}
          day={receptionOne.day}
          time={receptionOne.time}
          venueName={receptionOne.venue.name}
          venueAddress={receptionOne.venue.address}
          venueCity={receptionOne.venue.city}
          mapUrl={receptionOne.venue.mapUrl}
          bgVariant="ivory"
        />

        {/* ══════════════════════════════════════
            SECTION: RECEPTION II
            ══════════════════════════════════════ */}
        <EventChapter
          id="reception-2"
          title={receptionTwo.title}
          dateNumber={receptionTwo.dateNumber}
          monthYear={receptionTwo.monthYear}
          day={receptionTwo.day}
          time={receptionTwo.time}
          venueName={receptionTwo.venue.name}
          venueAddress={receptionTwo.venue.address}
          venueCity={receptionTwo.venue.city}
          mapUrl={receptionTwo.venue.mapUrl}
          bgVariant="cream"
        />

        {/* ══════════════════════════════════════
            SECTION: OUR STORY
            ══════════════════════════════════════ */}
        <section
          id="story"
          className="event-section event-section--ivory"
          style={{ textAlign: 'center' }}
        >
          <div className="section-border-top" />

          <RevealSection>
            <p className="label-text" style={{ marginBottom: '0.75rem' }}>OUR STORY</p>
            <GoldDivider width={180} />
          </RevealSection>

          <div style={{ marginTop: '3rem', maxWidth: 600, margin: '3rem auto 0' }}>
            {WEDDING_CONFIG.story.narrative.map((item, i) => (
              <div key={i} className="story-item" style={{ marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
                <RevealSection delay={i * 0.1}>
                  <div className="story-word">{item.label}</div>
                  {item.detail && <div className="story-detail">{item.detail}</div>}
                  {i < WEDDING_CONFIG.story.narrative.length - 1 && (
                    <div className="ornament-gold-line" style={{ marginTop: '2rem' }} />
                  )}
                </RevealSection>
              </div>
            ))}
          </div>

          <RevealSection delay={0.3}>
            <TempleArchOrnament opacity={0.2} />
          </RevealSection>
        </section>

        {/* ══════════════════════════════════════
            SECTION: MEMORIES / GALLERY
            ══════════════════════════════════════ */}
        <section
          id="memories"
          className="event-section event-section--cream"
          style={{ textAlign: 'center' }}
        >
          <div className="section-border-top" />

          <RevealSection>
            <p className="label-text" style={{ marginBottom: '0.75rem' }}>MEMORIES</p>
            <GoldDivider width={180} />
          </RevealSection>

          <div
            className="gallery-grid"
            style={{
              marginTop: '2.5rem',
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {WEDDING_CONFIG.gallery.map((photo, i) => (
              <div
                key={photo.id}
                className="gallery-item"
                style={{
                  aspectRatio: photo.layout === 'portrait' ? '3/4' : '4/3',
                  gridColumn: i === 0 ? 'span 2' : undefined,
                }}
                onClick={() => setViewerImage(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                />
                <div className="gallery-item-overlay" />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION: RSVP
            ══════════════════════════════════════ */}
        <section
          id="rsvp"
          className="event-section event-section--ivory"
          style={{ textAlign: 'center' }}
        >
          <div className="section-border-top" />

          <RevealSection>
            <TempleArchOrnament opacity={0.2} />

            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)',
                lineHeight: 1.4,
                marginTop: '2rem',
                marginBottom: '0.5rem',
              }}
            >
              {WEDDING_CONFIG.rsvp.heading}
            </h2>
            <p
              className="font-accent"
              style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                fontStyle: 'italic',
                color: 'var(--brown-text)',
                letterSpacing: '0.06em',
                marginBottom: '2rem',
              }}
            >
              {WEDDING_CONFIG.rsvp.subheading}
            </p>

            <GoldDivider width={200} />
          </RevealSection>

          <RevealSection delay={0.2}>
            <AnimatePresence mode="wait">
              {!rsvpSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleRsvpSubmit}
                  style={{ maxWidth: 420, margin: '2rem auto 0', padding: '0 1rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="rsvp-input"
                      id="rsvp-name"
                      value={rsvpForm.name}
                      onChange={(e) => setRsvpForm((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="rsvp-input"
                      id="rsvp-email"
                      value={rsvpForm.email}
                      onChange={(e) => setRsvpForm((prev) => ({ ...prev, email: e.target.value }))}
                    />

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <select
                        className="rsvp-input"
                        id="rsvp-attending"
                        value={rsvpForm.attending}
                        onChange={(e) => setRsvpForm((prev) => ({ ...prev, attending: e.target.value }))}
                        style={{ flex: 1, cursor: 'pointer' }}
                      >
                        <option value="yes">Joyfully Attending</option>
                        <option value="no">Regretfully Declining</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Guests"
                        className="rsvp-input"
                        id="rsvp-guests"
                        min="1"
                        max="10"
                        value={rsvpForm.guests}
                        onChange={(e) => setRsvpForm((prev) => ({ ...prev, guests: e.target.value }))}
                        style={{ flex: 0.4 }}
                      />
                    </div>

                    <textarea
                      placeholder="Your Blessings & Message"
                      className="rsvp-input"
                      id="rsvp-message"
                      rows={3}
                      value={rsvpForm.message}
                      onChange={(e) => setRsvpForm((prev) => ({ ...prev, message: e.target.value }))}
                      style={{ resize: 'none' }}
                    />

                    <button type="submit" className="rsvp-button" id="rsvp-submit" style={{ marginTop: '0.5rem' }}>
                      {WEDDING_CONFIG.rsvp.ctaText}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  style={{ marginTop: '2rem', padding: '2rem' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3
                    className="section-title"
                    style={{
                      fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    THANK YOU
                  </h3>
                  <p
                    className="font-accent"
                    style={{
                      color: 'var(--brown-text)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                    }}
                  >
                    Your blessings mean everything to us
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </RevealSection>
        </section>

        {/* ══════════════════════════════════════
            SECTION: FINAL BLESSING
            ══════════════════════════════════════ */}
        <section
          className="event-section event-section--cream"
          style={{ textAlign: 'center', minHeight: '80vh' }}
        >
          <div className="section-border-top" />

          <RevealSection>
            <TempleArchOrnament opacity={0.3} />
          </RevealSection>

          <RevealSection delay={0.15}>
            <p className="label-text" style={{ marginTop: '2rem' }}>
              {WEDDING_CONFIG.blessing.blessingText}
            </p>
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                fontWeight: 600,
                letterSpacing: '0.25em',
                color: 'var(--gold-antique)',
                marginTop: '0.5rem',
                marginBottom: '2rem',
              }}
            >
              {WEDDING_CONFIG.blessing.deityDisplayName}
            </h2>
          </RevealSection>

          <RevealSection delay={0.3}>
            <GoldDivider width={200} />

            <h1
              className="couple-name"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 2.8rem)', marginTop: '1.5rem' }}
            >
              {WEDDING_CONFIG.couple.groom.displayName}
            </h1>
            <div
              className="weds-text"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', margin: '0.75rem 0' }}
            >
              &amp;
            </div>
            <h1
              className="couple-name"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 2.8rem)' }}
            >
              {WEDDING_CONFIG.couple.bride.displayName}
            </h1>
          </RevealSection>

          <RevealSection delay={0.45}>
            <GoldDivider width={160} />
            <p className="label-text" style={{ marginTop: '1rem' }}>
              {WEDDING_CONFIG.ceremony.date}
            </p>
          </RevealSection>
        </section>
      </main>

      {/* ═══════════════════════════════════════════
          FULLSCREEN GALLERY VIEWER
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {viewerImage && (
          <motion.div
            className="gallery-viewer"
            onClick={() => setViewerImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={viewerImage}
              alt="Gallery"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <button
              className="gallery-viewer-close"
              onClick={() => setViewerImage(null)}
              id="gallery-close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
