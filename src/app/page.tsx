'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { WEDDING_CONFIG } from '@/config/wedding';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { AudioExperience } from '@/components/AudioExperience';
import { PhysicalScratchCard } from '@/components/PhysicalScratchCard';
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
  sectionClass = 'event-section--wedding',
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
  sectionClass?: string;
}) {
  return (
    <section
      id={id}
      className={`event-section ${sectionClass}`}
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
        {venueCity && !venueAddress.toLowerCase().includes(venueCity.toLowerCase()) && (
          <div className="event-venue-address">{venueCity}</div>
        )}
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const [safetyDuration, setSafetyDuration] = useState(14000);

  const countdown = useCountdown(WEDDING_CONFIG.ceremony.dateISO);

  // ─── Video end handler ─────────────
  const handleVideoEnd = useCallback(() => {
    if (videoEnded) return;
    setVideoEnded(true);
    // Play audio immediately right when the opening video completes / fades out
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('wedding-play-audio'));
    }
    setTimeout(() => setVideoFadeDone(true), 1400);
  }, [videoEnded]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setSafetyDuration(Math.ceil((videoRef.current.duration + 2.5) * 1000));
    }
  }, []);

  // Safety fallback: ensure page reveals even if browser blocks autoplay or video fails
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoEnded) {
        handleVideoEnd();
      }
    }, safetyDuration);
    return () => clearTimeout(timer);
  }, [handleVideoEnd, videoEnded, safetyDuration]);

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

      lenis.on('scroll', () => {
        window.dispatchEvent(new CustomEvent('wedding-scroll-activity'));
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
            title="Rajha Mukilan & Swetha — Wedding Invitation"
            aria-label="Rajha Mukilan & Swetha — Wedding Invitation"
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnd}
            onError={handleVideoEnd}
            style={{ width: '100%', height: '100%' }}
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
        {/* ══════════════════════════════════════
            SECTION 1: THE INVITATION (HERO)
            Warm Luxury Ivory + Celebratory Typography
            ══════════════════════════════════════ */}
        <section
          id="invitation"
          className="event-section event-section--hero-ivory"
          style={{ position: 'relative', textAlign: 'center', minHeight: '100vh', padding: 'clamp(4rem, 8vw, 6.5rem) 1.5rem' }}
        >
          <div className="section-gold-frame" />
          <GoldenParticles count={18} />

          {/* Background subtle architectural silhouette */}
          <div
            className="hero-ornament-bg"
            style={{
              position: 'absolute',
              top: '4%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(280px, 50vw, 480px)',
              opacity: 0.05,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <svg viewBox="0 0 500 600" fill="none" style={{ width: '100%' }}>
              <rect x="150" y="450" width="200" height="120" fill="var(--gold-antique)" opacity="0.6" />
              <path d="M170 450 L170 370 L330 370 L330 450 Z" fill="var(--gold-antique)" opacity="0.5" />
              <path d="M185 370 L185 300 L315 300 L315 370 Z" fill="var(--gold-antique)" opacity="0.45" />
              <path d="M200 300 L200 240 L300 240 L300 300 Z" fill="var(--gold-antique)" opacity="0.4" />
              <circle cx="250" cy="72" r="10" fill="var(--gold-antique)" opacity="0.3" />
            </svg>
          </div>

          <RevealSection>
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px', margin: '0 auto' }}>
              <TempleArchOrnament opacity={0.4} />

              {/* LORD MURUGAN SACRED BLESSING */}
              <div className="deity-portrait-container">
                <div className="deity-portrait-wrap">
                  <Image
                    src={WEDDING_CONFIG.blessing.image}
                    alt="Lord Murugan — Sacred Deity"
                    width={896}
                    height={1200}
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 175px, 230px"
                    className="deity-portrait-img"
                  />
                </div>
              </div>

              <div style={{ marginTop: '0.6rem' }}>
                <p
                  className="font-poppins"
                  style={{
                    fontSize: 'clamp(0.65rem, 1.4vw, 0.78rem)',
                    fontWeight: 600,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: '#8c6b2d',
                  }}
                >
                  {WEDDING_CONFIG.blessing.blessingText}
                </p>
                <h2
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(1.15rem, 2.8vw, 1.6rem)',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    color: '#6f1720',
                    marginTop: '0.35rem',
                  }}
                >
                  {WEDDING_CONFIG.blessing.deityDisplayName}
                </h2>
              </div>

              <GoldDivider width={220} />

              {/* CELEBRATORY COUPLE NAMES (WEDDING DISPLAY FONT) */}
              <div style={{ marginTop: '2.25rem' }}>
                <motion.h1
                  className="couple-name-celebratory"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {WEDDING_CONFIG.couple.groom.name}
                </motion.h1>

                <motion.div
                  className="weds-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  weds
                </motion.div>

                <motion.h1
                  className="couple-name-celebratory"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {WEDDING_CONFIG.couple.bride.name}
                </motion.h1>
              </div>

              <GoldDivider width={180} />

              <p
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: 'clamp(0.75rem, 1.7vw, 0.92rem)',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#6f1720',
                  marginTop: '1.25rem',
                }}
              >
                {WEDDING_CONFIG.ceremony.date} · {WEDDING_CONFIG.ceremony.venue.city}
              </p>
            </div>
          </RevealSection>
        </section>

        {/* ══════════════════════════════════════
            SECTION 2: PHYSICAL METALLIC SCRATCH CARD
            ══════════════════════════════════════ */}
        <section
          id="date-reveal"
          className="event-section event-section--story"
          style={{
            textAlign: 'center',
            minHeight: 'auto',
            padding: 'clamp(4rem, 8vw, 6rem) 1.5rem',
            position: 'relative',
          }}
        >
          <div className="section-border-top" />
          <div className="section-gold-frame" />
          <GoldenParticles count={16} />

          <RevealSection>
            <div style={{ maxWidth: '580px', margin: '0 auto 2.5rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.65rem, 1.4vw, 0.78rem)',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#8c6b2d',
                  marginBottom: '0.5rem',
                }}
              >
                UNVEIL THE AUSPICIOUS DATE
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-celebratory)',
                  fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
                  color: '#6f1720',
                  lineHeight: 1.15,
                  marginBottom: '0.5rem',
                }}
              >
                When Two Hearts Become One
              </h2>
              <GoldDivider width={180} />
            </div>

            <PhysicalScratchCard />
          </RevealSection>

          <div className="section-border-bottom" />
        </section>

        {/* ══════════════════════════════════════
            SECTION 3: THE COUPLE — "THE BEGINNING OF FOREVER"
            (NO DUPLICATE COUPLE NAMES)
            ══════════════════════════════════════ */}
        <section
          id="couple"
          className="event-section event-section--wedding"
          style={{
            textAlign: 'center',
            backgroundImage: `url(${WEDDING_CONFIG.ceremony.bgImage || '/meenakshi-thirukalyanam.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
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
                maxWidth: '460px',
                margin: '2rem auto',
                padding: '0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(212, 175, 55, 0.35)',
                border: '2px solid rgba(212, 175, 55, 0.55)',
              }}
            >
              <img
                src={WEDDING_CONFIG.couple.portrait}
                alt={`${WEDDING_CONFIG.couple.groom.name} & ${WEDDING_CONFIG.couple.bride.name} facing Meenakshi Amman Temple`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  filter: 'contrast(1.03) saturate(1.05)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.45)',
                  pointerEvents: 'none',
                }}
              />
              <div className="corner-accent corner-accent--tl" />
              <div className="corner-accent corner-accent--tr" />
              <div className="corner-accent corner-accent--bl" />
              <div className="corner-accent corner-accent--br" />
            </div>
          </RevealSection>

          {/* MEANINGFUL CONTENT INSTEAD OF DUPLICATE NAMES */}
          <RevealSection delay={0.3}>
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '540px', margin: '1rem auto 0', padding: '0 1rem' }}>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.2rem, 3.2vw, 1.8rem)',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: 'var(--gold-bright)',
                  marginBottom: '1rem',
                }}
              >
                THE BEGINNING OF FOREVER
              </h2>
              <GoldLine />
              <p
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: 'clamp(0.85rem, 1.6vw, 0.98rem)',
                  color: 'rgba(255, 249, 234, 0.85)',
                  lineHeight: 1.75,
                  marginTop: '0.75rem',
                  letterSpacing: '0.015em',
                }}
              >
                With the divine grace of Lord Murugan and the blessings of our beloved parents and elders, we joyfully invite you to witness our holy union.
              </p>
            </div>
          </RevealSection>
        </section>


        {/* ══════════════════════════════════════
            SECTION 5: OUR STORY — "FOUR YEARS. ONE JOURNEY. ONE BEGINNING."
            ══════════════════════════════════════ */}
        <section
          id="story"
          className="event-section event-section--story"
          style={{ textAlign: 'center', padding: 'clamp(4rem, 8vw, 7rem) 1.5rem' }}
        >
          <div className="section-border-top" />
          <div className="section-gold-frame" />

          <RevealSection>
            <h2
              style={{
                fontFamily: 'var(--font-celebratory)',
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                color: '#6f1720',
                lineHeight: 1.15,
                marginBottom: '0.6rem',
              }}
            >
              A Sacred Story Written in the Stars
            </h2>
            <GoldDivider width={220} />
          </RevealSection>

          <div className="timeline-container" style={{ marginTop: '3rem', position: 'relative' }}>
            {WEDDING_CONFIG.timeline.map((event, i) => (
              <div key={event.year} className="timeline-event">
                <RevealSection delay={i * 0.1}>
                  <div className="timeline-year">{event.year}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <div className="timeline-title">{event.title}</div>
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
            SECTION 6: COUNTDOWN TO THE AUSPICIOUS DAY
            ══════════════════════════════════════ */}
        <section className="event-section event-section--wedding" style={{ minHeight: '50vh', textAlign: 'center' }}>
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
            SECTION 7: THE WEDDING (MUHURTHAM)
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
          sectionClass="event-section--wedding"
        />

        {/* ══════════════════════════════════════
            SECTION 8: RECEPTION I — GOBICHETTIPALAYAM
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
          sectionClass="event-section--reception-1"
        />

        {/* ══════════════════════════════════════
            SECTION 9: RECEPTION II — NAMAKKAL
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
          sectionClass="event-section--reception-2"
        />


        {/* ══════════════════════════════════════
            SECTION 12: HEARTFELT GRATITUDE & SACRED BLESSING
            ══════════════════════════════════════ */}
        <section
          id="blessing"
          className="event-section event-section--blessing"
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
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                  color: '#ffe58f',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                }}
              >
                &ldquo;Your presence, affection, and sacred blessings will illuminate our new journey together as one heart and one soul.&rdquo;
              </p>

              <div style={{ margin: '1.5rem 0' }}>
                <GoldLine />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: 'clamp(0.72rem, 1.4vw, 0.88rem)',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
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
