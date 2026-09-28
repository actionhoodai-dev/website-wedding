'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { AudioExperience } from '@/components/AudioExperience';
import { ScratchDateReveal } from '@/components/ScratchDateReveal';
import { CoupleSilhouette } from '@/components/CoupleSilhouette';
import { TimelineAirplane } from '@/components/TimelineAirplane';
import { GoldenParticles } from '@/components/GoldenParticles';

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
   REUSABLE — Temple Arch SVG Ornament
   ============================================================ */
function TempleArchOrnament({ color = 'var(--gold-antique)', opacity = 0.25 }: { color?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 400 80" fill="none" style={{ width: '100%', maxWidth: 380, opacity, margin: '0 auto', display: 'block' }}>
      {/* Arch */}
      <path d="M50 78 Q50 20 200 10 Q350 20 350 78" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M70 78 Q70 30 200 22 Q330 30 330 78" stroke={color} strokeWidth="0.8" fill="none" />
      {/* Finial */}
      <circle cx="200" cy="6" r="4" stroke={color} strokeWidth="1" fill="none" />
      <circle cx="200" cy="6" r="1.5" fill={color} />
      {/* Corner ornaments */}
      <line x1="10" y1="78" x2="50" y2="78" stroke={color} strokeWidth="0.8" />
      <line x1="350" y1="78" x2="390" y2="78" stroke={color} strokeWidth="0.8" />
      {/* Additional decorative elements */}
      <circle cx="50" cy="78" r="2" fill={color} opacity="0.5" />
      <circle cx="350" cy="78" r="2" fill={color} opacity="0.5" />
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
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', position: 'relative', zIndex: 1 }}>
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
            <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
              <GoldDivider width={120} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   COMPONENT — Event Chapter (Wedding / Reception) with BG Image
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
  bgImage,
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
  bgImage?: string;
}) {
  return (
    <section
      id={id}
      className="event-section event-section--photo"
      style={{
        textAlign: 'center',
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
      }}
    >
      <div className="section-border-top" />
      <div className="section-gold-frame" />

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
    message: '',
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const countdown = useCountdown(WEDDING_CONFIG.ceremony.dateISO);

  // ─── Video end handler ─────────────
  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true);
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

          // Timeline items: staggered reveal
          gsap.utils.toArray<HTMLElement>('.timeline-event').forEach((item, i) => {
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
          SOUNDTRACK & NAVIGATION
          ═══════════════════════════════════════════ */}
      <AudioExperience />
      {videoFadeDone && (
        <NavigationMenu />
      )}

      {/* ═══════════════════════════════════════════
          MAIN INVITATION CONTENT
          ═══════════════════════════════════════════ */}
      <main style={{ opacity: videoFadeDone ? 1 : 0, transition: 'opacity 0.8s ease' }}>

        {/* ══════════════════════════════════════
            SECTION 1: TEMPLE REVEAL / BLESSING + LORD MURUGAN
            ══════════════════════════════════════ */}
        <section
          id="invitation"
          className="event-section event-section--brocade"
          style={{ position: 'relative', textAlign: 'center' }}
        >
          <div className="section-gold-frame" />
          <GoldenParticles count={25} />

          {/* Background ornamental architecture */}
          <div
            className="hero-ornament-bg"
            style={{
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(280px, 55vw, 500px)',
              opacity: 0.04,
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
              <TempleArchOrnament opacity={0.35} />

              {/* LORD MURUGAN PORTRAIT */}
              <div style={{ marginTop: '1.5rem' }}>
                <img
                  src={WEDDING_CONFIG.blessing.image}
                  alt="Lord Murugan — Sacred Deity"
                  className="deity-portrait"
                />
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <p className="label-text">{WEDDING_CONFIG.blessing.blessingText}</p>
                <h2
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    color: 'var(--gold-bright)',
                    marginTop: '0.5rem',
                    textShadow: '0 2px 15px rgba(184, 138, 53, 0.3)',
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
        </section>

        {/* ══════════════════════════════════════
            DATE REVEAL: INTERACTIVE SCRATCH CARDS
            ══════════════════════════════════════ */}
        <section
          id="date-reveal"
          className="event-section event-section--brocade"
          style={{
            textAlign: 'center',
            minHeight: 'auto',
            padding: '5rem 1.5rem',
            position: 'relative',
          }}
        >
          <div className="section-border-top" />
          <div className="section-gold-frame" />
          <GoldenParticles count={20} />

          <RevealSection>
            <ScratchDateReveal
              day={WEDDING_CONFIG.ceremony.dateNumber}
              month="NOVEMBER"
              year="2026"
            />
          </RevealSection>

          <div className="section-border-bottom" />
        </section>

        {/* ══════════════════════════════════════
            SECTION 2: THE COUPLE
            ══════════════════════════════════════ */}
        <section
          id="couple"
          className="event-section event-section--maroon"
          style={{
            textAlign: 'center',
            backgroundImage: `url(${WEDDING_CONFIG.ceremony.bgImage || '/gallery/photo-2.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Rich Dark silk overlay on top of sacred background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(58,13,18,0.92) 0%, rgba(75,17,24,0.82) 40%, rgba(58,13,18,0.92) 100%)',
            zIndex: 0,
          }} />
          <div className="section-border-top" style={{ zIndex: 1 }} />
          <div className="section-gold-frame" />

          <RevealSection>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <p className="label-text" style={{ marginBottom: '0.75rem' }}>TOGETHER WITH THEIR FAMILIES</p>
              <GoldDivider width={200} />
            </div>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div
              className="couple-portrait-frame"
              style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '480px',
                margin: '2rem auto',
                padding: '0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65), 0 0 35px rgba(212, 175, 55, 0.28)',
                border: '2px solid rgba(212, 175, 55, 0.45)',
              }}
            >
              <CoupleSilhouette />
              <div className="corner-accent corner-accent--tl" />
              <div className="corner-accent corner-accent--tr" />
              <div className="corner-accent corner-accent--bl" />
              <div className="corner-accent corner-accent--br" />
            </div>
          </RevealSection>

          <RevealSection delay={0.3}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 className="couple-name" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', marginTop: '1rem' }}>
                {WEDDING_CONFIG.couple.groom.displayName}
              </h2>
              <div className="weds-text" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', margin: '0.75rem 0' }}>
                &amp;
              </div>
              <h2 className="couple-name" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.8rem)' }}>
                {WEDDING_CONFIG.couple.bride.displayName}
              </h2>
            </div>
          </RevealSection>

          <RevealSection delay={0.45}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <GoldLine />
              <p
                className="font-accent"
                style={{
                  fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
                  fontStyle: 'italic',
                  color: 'var(--gold-antique)',
                  letterSpacing: '0.08em',
                  marginTop: '0.5rem',
                }}
              >
                Request the honour of your gracious presence
              </p>
            </div>
          </RevealSection>
        </section>

        {/* ══════════════════════════════════════
            SECTION 3: COUNTDOWN
            ══════════════════════════════════════ */}
        <section className="event-section event-section--maroon" style={{ minHeight: '50vh', textAlign: 'center' }}>
          <div className="section-border-top" />
          <div className="section-gold-frame" />

          <RevealSection>
            <p className="label-text" style={{ marginBottom: '1rem' }}>THE AUSPICIOUS DAY ARRIVES IN</p>
            <GoldDivider width={160} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(1rem, 4vw, 2rem)',
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
            SECTION 4: THE WEDDING
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
          bgImage={ceremony.bgImage}
        />

        {/* ══════════════════════════════════════
            SECTION 5: RECEPTION I
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
          bgImage={receptionOne.bgImage}
        />

        {/* ══════════════════════════════════════
            SECTION 6: RECEPTION II
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
          bgImage={receptionTwo.bgImage}
        />

        {/* ══════════════════════════════════════
            SECTION 7: OUR LOVE JOURNEY — TIMELINE
            ══════════════════════════════════════ */}
        <section
          id="timeline"
          className="event-section event-section--maroon"
          style={{ textAlign: 'center' }}
        >
          <div className="section-border-top" />
          <div className="section-gold-frame" />

          <RevealSection>
            <p className="label-text" style={{ marginBottom: '0.75rem' }}>OUR JOURNEY</p>
            <h2 className="section-title" style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              marginBottom: '0.5rem',
            }}>
              A LOVE STORY WRITTEN IN THE STARS
            </h2>
            <GoldDivider width={220} />
          </RevealSection>

          <div className="timeline-container" style={{ marginTop: '3rem', position: 'relative' }}>
            <TimelineAirplane timelineLength={WEDDING_CONFIG.timeline.length} />
            {WEDDING_CONFIG.timeline.map((event, i) => (
              <div key={event.year} className="timeline-event">
                <RevealSection delay={i * 0.1}>
                  <div className="timeline-year">{event.year}</div>
                  <div className="timeline-dot" />
                  <div
                    className="timeline-card"
                    style={{ backgroundImage: `url(${event.bgImage})` }}
                  >
                    <div className="timeline-title">{event.title}</div>
                    <div className="timeline-subtitle">{event.subtitle}</div>
                    <div className="timeline-location">📍 {event.location}</div>
                    <GoldLine />
                    <div className="timeline-description">{event.description}</div>
                  </div>
                </RevealSection>
              </div>
            ))}
          </div>

          <RevealSection delay={0.3}>
            <TempleArchOrnament opacity={0.25} />
          </RevealSection>
        </section>

        {/* ══════════════════════════════════════
            SECTION 8: RSVP
            ══════════════════════════════════════ */}
        <section
          id="rsvp"
          className="event-section event-section--brocade"
          style={{ textAlign: 'center' }}
        >
          <div className="section-border-top" />
          <div className="section-gold-frame" />

          <RevealSection>
            <TempleArchOrnament opacity={0.25} />

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
                color: 'var(--gold-antique)',
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

                    <select
                      className="rsvp-input"
                      id="rsvp-attending"
                      value={rsvpForm.attending}
                      onChange={(e) => setRsvpForm((prev) => ({ ...prev, attending: e.target.value }))}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="yes">Joyfully Attending</option>
                      <option value="no">Regretfully Declining</option>
                    </select>

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
                      color: 'var(--gold-antique)',
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
            SECTION 9: HEARTFELT GRATITUDE & BLESSINGS
            ══════════════════════════════════════ */}
        <section
          className="event-section event-section--brocade"
          style={{
            textAlign: 'center',
            minHeight: '60vh',
            padding: '5rem 1.5rem',
            position: 'relative',
          }}
        >
          <div className="section-border-top" />
          <div className="section-gold-frame" />

          <RevealSection>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <TempleArchOrnament opacity={0.35} />
            </div>
          </RevealSection>

          <RevealSection delay={0.15}>
            <div style={{ position: 'relative', zIndex: 2, marginTop: '1.5rem' }}>
              <p className="label-text" style={{ letterSpacing: '0.35em', marginBottom: '0.75rem' }}>
                WITH LOVE &amp; BLESSINGS
              </p>
              <h2
                className="section-title"
                style={{
                  fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)',
                  marginBottom: '1rem',
                }}
              >
                HEARTFELT GRATITUDE
              </h2>
              <GoldDivider width={220} />
            </div>
          </RevealSection>

          <RevealSection delay={0.3}>
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '620px',
                margin: '2rem auto 1rem',
                padding: '0 1rem',
              }}
            >
              <p
                className="font-accent"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  fontStyle: 'italic',
                  color: 'var(--gold-antique)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                }}
              >
                &ldquo;Your presence, affection, and sacred blessings will illuminate our new journey together as one heart and one soul.&rdquo;
              </p>

              <div style={{ margin: '1.5rem 0' }}>
                <GoldLine />
              </div>

              <p
                className="label-text"
                style={{
                  fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
                  letterSpacing: '0.28em',
                  color: 'var(--gold-bright)',
                }}
              >
                WARM REGARDS FROM BOTH FAMILIES
              </p>

              <div
                style={{
                  marginTop: '1.75rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                  letterSpacing: '0.35em',
                  color: 'var(--gold-shine)',
                  textTransform: 'uppercase',
                }}
              >
                நன்றி · வாழ்க வளமுடன்
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={0.45}>
            <div style={{ position: 'relative', zIndex: 2, marginTop: '2rem' }}>
              <GoldDivider width={160} />
              <p
                className="label-text"
                style={{
                  marginTop: '1.25rem',
                  fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
                  letterSpacing: '0.3em',
                  opacity: 0.7,
                }}
              >
                MADURAI · NOVEMBER 2026
              </p>
            </div>
          </RevealSection>

          <div className="section-border-bottom" />
        </section>
      </main>
    </>
  );
}
