'use client'

/**
 * BottomNav — Gridonic-style floating navigation
 *
 * LAYOUT
 *  Mobile  : pill left | FAB right  (justify-between)
 *  Desktop : pill + FAB centered side-by-side (justify-center gap-3)
 *
 * HOW TO CHANGE LINKS (note for owner):
 *  Pill nav links  → edit the `navLinks` array below (href values)
 *  Arch item links → edit the `archItems` array below (href / path values)
 *    - "book"      → internal page, change `path` (e.g. '/book')
 *    - "whatsapp"  → change `href` to your WhatsApp number URL
 *    - "instagram" → change `href` to your Instagram profile URL
 *    - "email"     → change `href` to your email mailto: link
 */

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Image, Users, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STUDIO } from '@/lib/constants'

// ── Arch action items ────────────────────────────────────────────
const archItems = [
  {
    id: 'book',
    label: 'Termin',
    isInternal: true,
    path: '/book',            // ← change this path to update booking page
    bg: '#C9A96E',
    color: '#1A1A1A',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    isInternal: false,
    href: `https://wa.me/${STUDIO.whatsapp}`, // ← change number in src/lib/constants.ts
    bg: '#25D366',
    color: '#fff',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    isInternal: false,
    href: STUDIO.social.instagram, // ← change in src/lib/constants.ts → social.instagram
    bg: '#2C2C2C',
    color: '#F5F0E8',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'E-Mail',
    isInternal: false,
    href: `mailto:${STUDIO.email}`, // ← change email in src/lib/constants.ts
    bg: '#2C2C2C',
    color: '#C9A96E',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

// ── Arch positions: quarter-circle from straight-UP to straight-LEFT ──
// angle goes from -90° (up) to -180° (left) in CSS coords
function arcPos(i: number, total: number, r: number) {
  const start = -Math.PI / 2
  const end   = -Math.PI
  const a     = start + (i / (total - 1)) * (end - start)
  return { x: Math.round(Math.cos(a) * r), y: Math.round(Math.sin(a) * r) }
}

// ── Pill nav items ───────────────────────────────────────────────
const navLinks = [
  { key: 'home',     path: '/',         label: 'Home',       icon: null },     // renders "N"
  { key: 'services', path: '/services', label: 'Leistungen', icon: Briefcase },
  { key: 'gallery',  path: '/gallery',  label: 'Galerie',    icon: Image },
  { key: 'artists',  path: '/artists',  label: 'Artists',    icon: Users },
] as const

// ── Component ────────────────────────────────────────────────────
export default function BottomNav() {
  const pathname  = usePathname()
  const locale    = useLocale()
  const prefix    = `/${locale}`
  const [open, setOpen] = useState(false)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const R         = 88  // arc radius in px

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

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div
        className="flex items-end justify-between sm:justify-center sm:gap-3 px-4 sm:px-6"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))' }}
      >

        {/* ── Pill nav ─────────────────────────────────── */}
        <nav
          className={cn(
            'pointer-events-auto flex items-center gap-0.5',
            'bg-obsidian/40 backdrop-blur-2xl',
            'border border-white/[0.07]',
            'rounded-full p-1',
            'shadow-[0_2px_20px_rgba(0,0,0,0.4)]'
          )}
          aria-label="Hauptnavigation"
        >
          {navLinks.map(({ key, path, label, icon: Icon }) => {
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
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'transition-all duration-200',
                  isActive
                    ? 'bg-white/[0.09] text-gold'
                    : 'text-ivory/30 hover:text-ivory/75 hover:bg-white/[0.05]'
                )}
              >
                {key === 'home' ? (
                  <span className="font-sans text-[11px] font-medium tracking-[0.18em]">N</span>
                ) : Icon ? (
                  <Icon size={14} strokeWidth={isActive ? 2 : 1.5} />
                ) : null}
              </Link>
            )
          })}
        </nav>

        {/* ── FAB + radial arch ────────────────────────── */}
        <div
          ref={wrapRef}
          className="pointer-events-auto relative sm:ml-1"
          style={{ width: 56, height: 56 }}
        >
          {/* Arch items — icons ONLY, no labels */}
          {archItems.map((item, i) => {
            const { x, y }  = arcPos(i, archItems.length, R)
            const oDelay    = i * 55
            const cDelay    = (archItems.length - 1 - i) * 35

            const style: React.CSSProperties = {
              position:   'absolute',
              bottom: 0, right: 0,
              width: 44, height: 44,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: item.bg,
              color: item.color,
              boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
              transform: open
                ? `translate(${x}px, ${y}px) scale(1)`
                : 'translate(0,0) scale(0.3)',
              opacity: open ? 1 : 0,
              transition: `transform 430ms cubic-bezier(0.34,1.5,0.64,1) ${open ? oDelay : cDelay}ms, opacity 220ms ease ${open ? oDelay : cDelay}ms`,
              pointerEvents: open ? 'auto' : 'none',
            }

            return item.isInternal ? (
              <Link
                key={item.id}
                href={`${prefix}${item.path}`}
                aria-label={item.label}
                onClick={() => setOpen(false)}
                style={style}
                className="active:scale-90 transition-transform duration-100"
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
                style={style}
                className="active:scale-90 transition-transform duration-100"
              >
                {item.icon}
              </a>
            )
          })}

          {/* FAB */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Schließen' : 'Kontakt & Buchung'}
            aria-expanded={open}
            style={{ position: 'absolute', bottom: 0, right: 0 }}
            className={cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center',
              'shadow-[0_4px_24px_rgba(0,0,0,0.5)]',
              'transition-all duration-300 ease-[cubic-bezier(0.34,1.5,0.64,1)]',
              open
                ? 'bg-ivory/95 text-obsidian scale-[0.92]'
                : 'bg-obsidian/50 backdrop-blur-2xl border border-white/[0.09] text-ivory/65 hover:text-ivory hover:bg-obsidian/75'
            )}
          >
            <span
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{ opacity: open ? 0 : 1, transform: open ? 'scale(0.4) rotate(90deg)' : 'scale(1) rotate(0deg)' }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center transition-all duration-300"
              style={{ opacity: open ? 1 : 0, transform: open ? 'scale(1) rotate(0deg)' : 'scale(0.4) rotate(-90deg)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}
