'use client'

/**
 * GalleryCanvas — Nailuxe Galerie
 *
 * Architecture: Gridonic-style dimensional gallery
 * Brand palette:
 *   Ruby  #E0115F · Gold  #C9A96E · Null Black #0B0C10
 *   Deep Purple #4A0072 (ambient orb accent)
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import BookingCTA from '@/components/sections/BookingCTA'

const RUBY = '#E0115F'
const GOLD = '#C9A96E'

// ─── Gallery items ───────────────────────────────────────────────
const galleryItems = [
  {
    id: 1, num: '01',
    category: 'Signature',
    name: 'Nude Élégance',
    year: '2025',
    cardBg: 'linear-gradient(135deg, #1c1614 0%, #2a1e1a 100%)',
  },
  {
    id: 2, num: '02',
    category: 'Atelier',
    name: 'Ruby Chrome',
    year: '2025',
    cardBg: 'linear-gradient(135deg, #1a0a10 0%, #280d18 100%)',
  },
  {
    id: 3, num: '03',
    category: 'Premium',
    name: 'Minimalist Gel',
    year: '2025',
    cardBg: 'linear-gradient(135deg, #141620 0%, #1a1c2c 100%)',
  },
  {
    id: 4, num: '04',
    category: 'Atelier',
    name: 'Floral Art Noir',
    year: '2024',
    cardBg: 'linear-gradient(135deg, #0d1010 0%, #121a1a 100%)',
  },
  {
    id: 5, num: '05',
    category: 'Premium',
    name: 'Crystal French',
    year: '2024',
    cardBg: 'linear-gradient(135deg, #181818 0%, #0e0e14 100%)',
  },
  {
    id: 6, num: '06',
    category: 'Atelier',
    name: 'Abstract Luxe',
    year: '2024',
    cardBg: 'linear-gradient(135deg, #140810 0%, #1c0c1a 100%)',
  },
]

const categories = ['Alle', 'Signature', 'Premium', 'Atelier', 'Gel', 'Nail Art']

// ─── Component ───────────────────────────────────────────────────
export default function GalleryCanvas() {
  const cursorRef    = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const mousePos     = useRef({ x: 0, y: 0 })
  const cursorPos    = useRef({ x: 0, y: 0 })
  const dotPos       = useRef({ x: 0, y: 0 })
  const rafRef       = useRef<number>()

  const [activeFilter, setActiveFilter] = useState('Alle')

  // ── Custom cursor animation loop ──────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener('mousemove', onMove)

    const tick = () => {
      const cx = cursorRef.current
      const cd = cursorDotRef.current
      if (cx && cd) {
        cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.1
        cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.1
        dotPos.current.x    += (mousePos.current.x - dotPos.current.x)    * 0.5
        dotPos.current.y    += (mousePos.current.y - dotPos.current.y)    * 0.5
        cx.style.left = cursorPos.current.x + 'px'
        cx.style.top  = cursorPos.current.y + 'px'
        cd.style.left = dotPos.current.x + 'px'
        cd.style.top  = dotPos.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── Card reveal via IntersectionObserver ──────────────────────
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el    = entry.target as HTMLElement
          const delay = parseFloat(el.dataset.delay ?? '0')
          setTimeout(() => el.classList.add('nlg-visible'), delay * 1000)
        })
      },
      { threshold: 0.08 },
    )
    document.querySelectorAll('.nlg-card').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // ── 3D tilt ────────────────────────────────────────────────────
  const handleTilt = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const rx   = ((e.clientY - rect.top)  - rect.height / 2) / 18
    const ry   = (rect.width / 2 - (e.clientX - rect.left)) / 18
    e.currentTarget.style.transform =
      `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(28px) scale(1.02)`
  }, [])

  const resetTilt = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform =
      'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)'
  }, [])

  const onHoverEnter = () => cursorRef.current?.classList.add('nlg-cursor-hover')
  const onHoverLeave = () => cursorRef.current?.classList.remove('nlg-cursor-hover')

  return (
    <>
      {/* ── Injected styles ────────────────────────────────────── */}
      <style>{`
        body { cursor: none; }
        @media (max-width: 768px) { body { cursor: auto; } }

        /* ── Custom cursor ── */
        .nlg-cursor {
          position: fixed;
          width: 20px; height: 20px;
          border: 1px solid ${RUBY};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          transition: width 0.18s ease, height 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }
        .nlg-cursor.nlg-cursor-hover {
          width: 58px; height: 58px;
          background: rgba(224,17,95,0.08);
          border-color: ${GOLD};
        }
        .nlg-cursor-dot {
          position: fixed;
          width: 4px; height: 4px;
          background: ${RUBY};
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
        }
        @media (max-width: 768px) { .nlg-cursor, .nlg-cursor-dot { display: none; } }

        /* ── Ambient orb float ── */
        @keyframes nlgOrb {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(50px,-30px) scale(1.1); }
          66%      { transform: translate(-30px,50px) scale(0.95); }
        }

        /* ── Stats slide-up ── */
        @keyframes nlgStatsUp {
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── Card reveal ── */
        .nlg-card {
          opacity: 0;
          transform: translateY(60px) rotateX(12deg);
          transition:
            opacity   0.65s cubic-bezier(0.23,1,0.32,1),
            transform 0.65s cubic-bezier(0.23,1,0.32,1),
            box-shadow 0.45s ease,
            border-color 0.3s ease;
          transform-style: preserve-3d;
        }
        .nlg-card.nlg-visible {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }
        .nlg-card:hover {
          border-color: rgba(224,17,95,0.28) !important;
          box-shadow: 0 28px 56px -14px rgba(0,0,0,0.85), 0 0 0 1px rgba(224,17,95,0.10);
        }

        /* ── Glitch shimmer on hover ── */
        .nlg-glitch {
          position: absolute; inset: 0; z-index: 3;
          background: linear-gradient(105deg,
            transparent 40%,
            rgba(255,255,255,0.04) 46%,
            rgba(255,255,255,0.09) 50%,
            rgba(255,255,255,0.04) 54%,
            transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.75s ease;
          pointer-events: none;
        }
        .nlg-card:hover .nlg-glitch { transform: translateX(100%); }

        /* ── Arrow action circle ── */
        .nlg-action {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 70px; height: 70px;
          border: 1px solid rgba(247,249,251,0.65);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.38);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.42s cubic-bezier(0.34,1.5,0.64,1);
          z-index: 5; pointer-events: none;
        }
        .nlg-card:hover .nlg-action { transform: translate(-50%, -50%) scale(1); }

        /* ── Filter buttons ── */
        .nlg-filter {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.06);
          color: #4a4a55;
          padding: 0.6rem 1.35rem;
          font-family: 'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          position: relative; overflow: hidden;
          transition: color 0.28s ease, border-color 0.28s ease;
        }
        .nlg-filter::before {
          content: '';
          position: absolute; inset: 0;
          background: ${RUBY};
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1);
          z-index: -1;
        }
        .nlg-filter:hover,
        .nlg-filter.nlg-active { color: #fff; border-color: ${RUBY}; }
        .nlg-filter:hover::before,
        .nlg-filter.nlg-active::before { transform: translateY(0); }

        /* ── Stats bar ── */
        .nlg-stats {
          position: fixed;
          bottom: 110px; left: 50%;
          transform: translateX(-50%) translateY(18px);
          background: rgba(11,12,16,0.88);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 100px;
          padding: 0.85rem 2.2rem;
          display: flex; gap: 2.8rem;
          z-index: 40;
          opacity: 0;
          animation: nlgStatsUp 0.9s cubic-bezier(0.23,1,0.32,1) 1.3s forwards;
        }
        @media (max-width: 768px) { .nlg-stats { display: none; } }

        /* ── Responsive grid ── */
        @media (max-width: 768px) {
          .nlg-grid { grid-template-columns: 1fr !important; }
          .nlg-card { aspect-ratio: 3/4 !important; }
        }
      `}</style>

      {/* ── Custom cursor ─────────────────────────────────────── */}
      <div ref={cursorRef}    className="nlg-cursor"     />
      <div ref={cursorDotRef} className="nlg-cursor-dot" />

      {/* ── Ambient orbs ─────────────────────────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden>
        {/* Ruby — top-right */}
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: '700px', height: '700px',
          top: '-20%', right: '-10%',
          background: 'radial-gradient(circle, rgba(224,17,95,0.17) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'nlgOrb 28s ease-in-out infinite',
        }}/>
        {/* Gold — bottom-left */}
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: '520px', height: '520px',
          bottom: '-12%', left: '-6%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.13) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'nlgOrb 22s ease-in-out infinite',
          animationDelay: '-8s',
        }}/>
        {/* Deep purple — center drift */}
        <div style={{
          position: 'absolute', borderRadius: '50%',
          width: '380px', height: '380px',
          top: '36%', left: '33%',
          background: 'radial-gradient(circle, rgba(74,0,114,0.11) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'nlgOrb 19s ease-in-out infinite',
          animationDelay: '-14s',
        }}/>
      </div>

      {/* ── Grid overlay ─────────────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        opacity: 0.022,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }} aria-hidden/>

      {/* ── Main content ─────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh',
        padding: '8rem 2rem 14rem',
        maxWidth: '1800px', margin: '0 auto',
      }}>

        {/* Header */}
        <header style={{ marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.42em',
            color: '#35353f', marginBottom: '1.6rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            fontFamily: "'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
          }}>
            <span>Nailuxe</span>
            <span style={{
              display: 'inline-block', width: '55px', height: '1px',
              background: `linear-gradient(90deg, ${RUBY}, transparent)`,
            }}/>
            <span>Ausgewählte Designs</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            background: 'linear-gradient(135deg, #F7F9FB 0%, #45454f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            fontFamily: "'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
          }}>
            Galerie
          </h1>
        </header>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: '0.7rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`nlg-filter${activeFilter === cat ? ' nlg-active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              onMouseEnter={onHoverEnter}
              onMouseLeave={onHoverLeave}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div
          className="nlg-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '1.75rem',
            perspective: '2000px',
          }}
        >
          {galleryItems.map((item, i) => (
            <article
              key={item.id}
              className="nlg-card"
              data-delay={String(0.1 + i * 0.1)}
              style={{
                position: 'relative',
                background: '#0D0E12',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '4/3',
              }}
              onMouseMove={handleTilt}
              onMouseLeave={(e) => { resetTilt(e); onHoverLeave() }}
              onMouseEnter={onHoverEnter}
            >
              {/* Image placeholder */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: item.cardBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: '3.5rem', fontWeight: 500,
                  color: 'rgba(255,255,255,0.055)',
                  letterSpacing: '-0.04em',
                  fontFamily: "'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
                }}>
                  {item.num}
                </span>
              </div>

              {/* Content overlay */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                padding: '2rem',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.84) 100%)',
              }}>
                <span style={{
                  fontSize: '0.6rem', textTransform: 'uppercase',
                  letterSpacing: '0.2em', color: RUBY,
                  marginBottom: '0.4rem', fontWeight: 600,
                  fontFamily: "'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
                }}>
                  {item.category}
                </span>
                <h2 style={{
                  fontSize: '1.6rem', fontWeight: 500,
                  letterSpacing: '-0.022em',
                  color: '#F7F9FB', margin: 0,
                  fontFamily: "'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
                }}>
                  {item.name}
                </h2>
                {/* Year — top-right */}
                <span style={{
                  position: 'absolute', top: '1.75rem', right: '1.75rem',
                  fontSize: '0.72rem', color: '#2e2e38',
                  fontFamily: 'monospace',
                }}>
                  {item.year}
                </span>
              </div>

              {/* Glitch shimmer */}
              <div className="nlg-glitch"/>

              {/* Hover arrow */}
              <div className="nlg-action">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F7F9FB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Floating stats bar ───────────────────────────────── */}
      <div className="nlg-stats">
        {[
          { value: '800+', label: 'Designs' },
          { value: '340',  label: 'Kundinnen' },
          { value: '3',    label: 'Jahre' },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <span style={{
              display: 'block', fontSize: '1.4rem', fontWeight: 600,
              color: '#F7F9FB',
              fontFamily: "'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
            }}>
              {s.value}
            </span>
            <span style={{
              fontSize: '0.6rem', textTransform: 'uppercase',
              letterSpacing: '0.12em', color: '#3a3a44',
              fontFamily: "'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <BookingCTA />
    </>
  )
}
