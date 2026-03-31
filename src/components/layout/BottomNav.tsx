'use client'

/**
 * BottomNav — Nailuxe Swiss Premium Edition
 *
 * Architecture adapted from WebFelix floating nav pattern:
 *   Pill nav (left/centered) + FAB with radial arch (right/centered)
 *
 * Brand colors:
 *   Ruby:       #E0115F  (borders, active states, pulse dot, CTA ring)
 *   Null Black: #0B0C10  (pill background base)
 *   Ivory:      #F7F9FB  (text)
 *
 * HOW TO CUSTOMISE:
 *   Pill links  → edit `navLinks` array below
 *   Arch items  → edit `archItems` array below
 *   WhatsApp    → change STUDIO.whatsapp in src/lib/constants.ts
 *   Instagram   → change STUDIO.social.instagram in src/lib/constants.ts
 *   E-Mail      → change STUDIO.email in src/lib/constants.ts
 */

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { STUDIO } from '@/lib/constants'

// ─── Brand tokens ────────────────────────────────────────────────
const RUBY      = '#E0115F'
const RUBY_DEEP = '#9B0D41'
const RUBY_DARK = '#5C0825'
const NULL_BG   = 'rgba(11,12,16,'
const FONT      = "'Neue Haas Grotesk','HelveticaNeue-Light','Helvetica Neue',Helvetica,Arial,sans-serif"

// ─── Arch action items ────────────────────────────────────────────
const archItems = [
  {
    id:         'book',
    label:      'Termin',
    isInternal: true,
    path:       '/book',
    bg:         RUBY,
    color:      '#fff',
    shadowRgb:  '224,17,95',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id:         'whatsapp',
    label:      'WhatsApp',
    isInternal: false,
    href:       `https://wa.me/${STUDIO.whatsapp}`,
    bg:         '#25D366',
    color:      '#fff',
    shadowRgb:  '37,211,102',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    id:         'instagram',
    label:      'Instagram',
    isInternal: false,
    href:       STUDIO.social.instagram,
    bg:         'rgba(14,10,16,0.94)',
    color:      '#F7F9FB',
    shadowRgb:  '0,0,0',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id:         'email',
    label:      'E-Mail',
    isInternal: false,
    href:       `mailto:${STUDIO.email}`,
    bg:         'rgba(14,10,16,0.94)',
    color:      '#C9A96E',
    shadowRgb:  '201,169,110',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

// ─── Pill nav items ───────────────────────────────────────────────
const navLinks = [
  { key: 'home',     path: '/',         label: 'Home' },
  { key: 'services', path: '/services', label: 'Leistungen' },
  { key: 'gallery',  path: '/gallery',  label: 'Galerie' },
  { key: 'book',     path: '/book',     label: 'Buchung' },
] as const

// ─── Arc position calculator ──────────────────────────────────────
// Desktop: -60° → -150° (slight right-sweep + upward arc)
// Mobile:  -90° → -165° (straight up + leftward, avoids right-edge clip)
function arcPos(i: number, total: number, r: number, mobile: boolean) {
  const DEG = Math.PI / 180
  const a0  = mobile ? -90 * DEG : -60 * DEG
  const a1  = mobile ? -165 * DEG : -150 * DEG
  const a   = a0 + (i / (total - 1)) * (a1 - a0)
  return { x: Math.round(Math.cos(a) * r), y: Math.round(Math.sin(a) * r) }
}

// ─── Component ────────────────────────────────────────────────────
export default function BottomNav() {
  const pathname = usePathname()
  const locale   = useLocale()
  const prefix   = `/${locale}`

  const [open,      setOpen]      = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const [isMobile,  setIsMobile]  = useState(false)
  const [visible,   setVisible]   = useState(false)

  const wrapRef = useRef<HTMLDivElement>(null)
  const R = 130  // arc radius — 130px gives ~56px gap between 46px items (no overlap)

  // ── Entry fade-in after hydration ──
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 350)
    return () => clearTimeout(t)
  }, [])

  // ── Mobile breakpoint ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Scroll: transparent pill ──
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      setScrolling(true)
      clearTimeout(timer)
      timer = setTimeout(() => setScrolling(false), 700)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer) }
  }, [])

  // ── Close on outside tap/click ──
  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('touchstart', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('touchstart', close)
    }
  }, [open])

  // ── Close on route change ──
  useEffect(() => { setOpen(false) }, [pathname])

  // ── Derived style values ──
  const alpha      = scrolling ? '0.18' : '0.72'
  const blur       = scrolling ? 'blur(48px) saturate(2.4) brightness(1.08)' : 'blur(30px) saturate(1.9) brightness(1.05)'
  const glowOpacity = scrolling ? 0.10 : 0.28
  const pillBg     = `linear-gradient(135deg, ${NULL_BG}${alpha}) 0%, rgba(22,8,14,${alpha}) 55%, rgba(224,17,95,${scrolling ? '0.03' : '0.10'}) 100%)`
  const borderGlow = `linear-gradient(135deg, ${RUBY} 0%, ${RUBY_DEEP} 50%, ${RUBY_DARK} 100%)`

  return (
    <>
      {/* ── Keyframes injected once ───────────────────────────── */}
      <style>{`
        @keyframes nlBorder {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes nlPulse {
          0%,100% { transform: scale(1);    opacity: 1;    }
          50%      { transform: scale(1.55); opacity: 0.32; }
        }
      `}</style>

      {/* ── Root fixed container ────────────────────────────────── */}
      <div
        role="navigation"
        aria-label="Hauptnavigation"
        style={{
          position:   'fixed',
          bottom:     0,
          left:       0,
          right:      0,
          zIndex:     2147483640,
          pointerEvents: 'none',
          fontFamily: FONT,
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          style={{
            display:        'flex',
            alignItems:     'flex-end',
            justifyContent: isMobile ? 'space-between' : 'center',
            gap:            isMobile ? 0 : '12px',
            padding:        `0 ${isMobile ? '10px' : '24px'} max(${isMobile ? '14px' : '24px'}, calc(env(safe-area-inset-bottom, 0px) + ${isMobile ? '6px' : '10px'}))`,
          }}
        >

          {/* ════════════════════════════════════════════════════
              PILL NAV
              Gradient border ring + glassmorphism inner
          ════════════════════════════════════════════════════ */}
          <div
            style={{
              pointerEvents:   'all',
              position:        'relative',
              borderRadius:    '18px',
              padding:         '1.5px',
              background:      borderGlow,
              backgroundSize:  '300% 300%',
              animation:       'nlBorder 7s ease infinite',
              boxShadow:       `0 8px 32px rgba(224,17,95,${glowOpacity}), 0 0 0 0.5px rgba(224,17,95,0.10)`,
              transition:      'box-shadow 0.6s ease',
              flex:            isMobile ? 1 : 'none',
              marginRight:     isMobile ? '8px' : 0,
            }}
          >
            {/* Pill inner */}
            <div
              style={{
                display:           'flex',
                alignItems:        'center',
                borderRadius:      '16px',
                height:            isMobile ? '58px' : '64px',
                padding:           '6px',
                background:        pillBg,
                backdropFilter:    blur,
                WebkitBackdropFilter: blur,
                transition:        'background 0.6s ease',
              }}
            >
              {navLinks.map(({ key, path, label }) => {
                const href     = key === 'home' ? prefix : `${prefix}${path}`
                const isActive = key === 'home'
                  ? pathname === prefix || pathname === `${prefix}/`
                  : pathname === href || pathname.startsWith(`${href}/`)

                return (
                  <Link
                    key={key}
                    href={href}
                    aria-label={label}
                    title={label}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      flex:           isMobile ? 1 : 'none',
                      padding:        isMobile ? '0 8px' : '0 18px',
                      height:         '46px',
                      fontSize:       isMobile ? '12.5px' : '14px',
                      fontWeight:     500,
                      letterSpacing:  key === 'home' ? '0.22em' : '0.015em',
                      color:          isActive ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.38)',
                      textDecoration: 'none',
                      borderRadius:   '10px',
                      background:     isActive ? 'rgba(224,17,95,0.15)' : 'transparent',
                      whiteSpace:     'nowrap',
                      cursor:         'pointer',
                      transition:     'color 0.22s ease, background 0.22s ease',
                    }}
                  >
                    {key === 'home'
                      ? <span style={{ fontSize: isMobile ? '10px' : '11px', fontWeight: 600, letterSpacing: '0.24em' }}>N</span>
                      : label
                    }
                  </Link>
                )
              })}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════
              FAB + RADIAL ARCH
          ════════════════════════════════════════════════════ */}
          <div
            ref={wrapRef}
            style={{ pointerEvents: 'all', position: 'relative', flexShrink: 0 }}
          >
            {/* Arch items — burst outward from FAB center */}
            {archItems.map((item, i) => {
              const { x, y } = arcPos(i, archItems.length, R, isMobile)
              const oDelay   = i * 60
              const cDelay   = (archItems.length - 1 - i) * 38
              const delay    = open ? oDelay : cDelay
              const size     = isMobile ? 46 : 50

              const itemStyle: React.CSSProperties = {
                position:       'absolute',
                bottom:         0,
                right:          0,
                width:          size,
                height:         size,
                borderRadius:   '50%',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                background:     item.bg,
                color:          item.color,
                boxShadow:      `0 6px 22px rgba(${item.shadowRgb},0.45), inset 0 1px 0 rgba(255,255,255,0.14)`,
                textDecoration: 'none',
                cursor:         'pointer',
                transform:      open
                  ? `translate(${x}px, ${y}px) scale(1)`
                  : 'translate(0,0) scale(0.22)',
                opacity:        open ? 1 : 0,
                transition:     `transform 440ms cubic-bezier(0.34,1.5,0.64,1) ${delay}ms, opacity 200ms ease ${delay}ms`,
                pointerEvents:  open ? 'auto' : 'none',
              }

              return item.isInternal ? (
                <Link
                  key={item.id}
                  href={`${prefix}${item.path}`}
                  aria-label={item.label}
                  onClick={() => setOpen(false)}
                  style={itemStyle}
                >
                  {item.icon}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.id !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  style={itemStyle}
                >
                  {item.icon}
                </a>
              )
            })}

            {/* FAB wrapper — ruby gradient ring */}
            <div
              style={{
                position:       'relative',
                borderRadius:   '18px',
                padding:        '1.5px',
                background:     borderGlow,
                backgroundSize: '300% 300%',
                animation:      'nlBorder 7s ease infinite',
                boxShadow:      `0 8px 32px rgba(224,17,95,${glowOpacity})`,
                transition:     'box-shadow 0.6s ease',
                height:         isMobile ? '58px' : '64px',
                width:          isMobile ? '58px' : '64px',
              }}
            >
              <button
                onClick={() => setOpen(v => !v)}
                aria-label={open ? 'Schließen' : 'Kontakt & Buchung'}
                aria-expanded={open}
                style={{
                  width:             '100%',
                  height:            '100%',
                  borderRadius:      '16px',
                  border:            'none',
                  cursor:            'pointer',
                  display:           'flex',
                  alignItems:        'center',
                  justifyContent:    'center',
                  position:          'relative',
                  overflow:          'hidden',
                  background:        open
                    ? `rgba(224,17,95,0.90)`
                    : pillBg,
                  backdropFilter:    blur,
                  WebkitBackdropFilter: blur,
                  color:             'rgba(255,255,255,0.68)',
                  transition:        'background 0.28s ease, color 0.28s ease',
                }}
              >
                {/* Chat / bubble icon — shown when closed */}
                <span style={{
                  position:   'absolute',
                  inset:      0,
                  display:    'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity:    open ? 0 : 1,
                  transform:  open ? 'scale(0.4) rotate(90deg)' : 'scale(1) rotate(0deg)',
                  transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.5,0.64,1)',
                  zIndex:     1,
                }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <circle cx="9"  cy="11" r="0.9" fill="currentColor"/>
                    <circle cx="12" cy="11" r="0.9" fill="currentColor"/>
                    <circle cx="15" cy="11" r="0.9" fill="currentColor"/>
                  </svg>
                </span>

                {/* Close × — shown when open */}
                <span style={{
                  position:   'absolute',
                  inset:      0,
                  display:    'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity:    open ? 1 : 0,
                  transform:  open ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(-90deg)',
                  transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.5,0.64,1)',
                  zIndex:     1,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6"  x2="6"  y2="18"/>
                    <line x1="6"  y1="6"  x2="18" y2="18"/>
                  </svg>
                </span>

                {/* Ruby pulse dot — hidden when open */}
                {!open && (
                  <span style={{
                    position:     'absolute',
                    top:          '10px',
                    right:        '10px',
                    width:        '7px',
                    height:       '7px',
                    background:   RUBY,
                    borderRadius: '50%',
                    border:       '1.5px solid rgba(11,12,16,0.55)',
                    animation:    'nlPulse 2.5s ease-in-out infinite',
                    zIndex:       2,
                  }}/>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
