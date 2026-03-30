'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Scissors, Image, Users, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STUDIO } from '@/lib/constants'

// ── Radial action items ──────────────────────────────────────────
const actions = [
  {
    id: 'book',
    label: 'Termin buchen',
    isInternal: true,
    path: '/book',
    bg: '#C9A96E',
    color: '#1A1A1A',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    isInternal: false,
    href: `https://wa.me/${STUDIO.whatsapp}`,
    bg: '#25D366',
    color: '#fff',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    isInternal: false,
    href: STUDIO.social.instagram,
    bg: '#1a1a1a',
    color: '#F5F0E8',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'E-Mail',
    isInternal: false,
    href: `mailto:${STUDIO.email}`,
    bg: '#1a1a1a',
    color: '#C9A96E',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

// Quarter-circle arc: from 0° (up) to 90° (left)
// Spreads items across the arc evenly
function getArcOffset(index: number, total: number, radius: number) {
  const startAngle = -Math.PI / 2   // 0° = straight up
  const endAngle   = Math.PI        // 90° = straight left
  const angle = startAngle + (index / (total - 1)) * (endAngle - startAngle)
  return {
    x: Math.round(Math.cos(angle) * radius),
    y: Math.round(Math.sin(angle) * radius),
  }
}

// ── Nav item data ────────────────────────────────────────────────
const navLinks = [
  { key: 'home',     path: '/',         icon: Home,     label: 'Home'         },
  { key: 'services', path: '/services', icon: Scissors, label: 'Leistungen'   },
  { key: 'gallery',  path: '/gallery',  icon: Image,    label: 'Galerie'      },
  { key: 'artists',  path: '/artists',  icon: Users,    label: 'Artists'      },
] as const

// ── Component ────────────────────────────────────────────────────
export default function BottomNav() {
  const pathname = usePathname()
  const locale   = useLocale()
  const prefix   = `/${locale}`
  const [open, setOpen]   = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Radius adapts: 90px mobile, 110px desktop
  const radius = typeof window !== 'undefined' && window.innerWidth >= 640 ? 110 : 90

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <div
      ref={navRef}
      className="fixed bottom-5 left-0 right-0 z-50 flex items-end justify-between px-4 sm:px-6 pointer-events-none"
    >

      {/* ── LEFT: icon-only pill nav ─────────────────────── */}
      <nav
        className={cn(
          'pointer-events-auto flex items-center',
          'bg-white/[0.06] backdrop-blur-2xl',
          'border border-white/[0.07]',
          'rounded-full p-1.5',
          'shadow-[0_2px_24px_rgba(0,0,0,0.4)]',
          'gap-0.5'
        )}
        aria-label="Hauptnavigation"
      >
        {navLinks.map(({ key, path, icon: Icon, label }) => {
          const href     = key === 'home' ? prefix : `${prefix}${path}`
          const isActive = key === 'home'
            ? (pathname === prefix || pathname === `${prefix}/`)
            : (pathname === href || pathname.startsWith(`${href}/`))

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
                  : 'text-ivory/35 hover:text-ivory/80 hover:bg-white/[0.05]'
              )}
            >
              <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
            </Link>
          )
        })}
      </nav>

      {/* ── RIGHT: FAB + radial arch ─────────────────────── */}
      <div className="pointer-events-auto relative flex items-end justify-end">

        {/* Arch items */}
        {actions.map((action, i) => {
          const { x, y } = getArcOffset(i, actions.length, radius)
          const openDelay  = i * 50
          const closeDelay = (actions.length - 1 - i) * 35
          const delay      = open ? openDelay : closeDelay

          const content = (
            <>
              {/* Tooltip */}
              <span
                className={cn(
                  'absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2',
                  'font-sans text-[9px] font-medium tracking-[0.1em] whitespace-nowrap uppercase',
                  'bg-obsidian/75 text-ivory/60 backdrop-blur-md',
                  'px-2 py-0.5 rounded-full pointer-events-none',
                  'transition-opacity duration-150',
                  open ? 'opacity-100' : 'opacity-0'
                )}
                style={{ transitionDelay: open ? `${delay + 100}ms` : '0ms' }}
              >
                {action.label}
              </span>
              {action.icon}
            </>
          )

          const sharedStyle: React.CSSProperties = {
            position:   'absolute',
            bottom:     0,
            right:      0,
            width:      44,
            height:     44,
            borderRadius: '50%',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: action.bg,
            color:      action.color,
            boxShadow:  '0 4px 20px rgba(0,0,0,0.45)',
            transform:  open
              ? `translate(${x}px, ${y}px) scale(1)`
              : 'translate(0px, 0px) scale(0.4)',
            opacity:    open ? 1 : 0,
            transition: `transform 450ms cubic-bezier(0.34, 1.46, 0.64, 1) ${delay}ms, opacity 250ms ease ${delay}ms`,
            pointerEvents: open ? 'auto' : 'none',
          }

          return action.isInternal ? (
            <Link
              key={action.id}
              href={`${prefix}${action.path}`}
              aria-label={action.label}
              onClick={() => setOpen(false)}
              style={sharedStyle}
            >
              {content}
            </Link>
          ) : (
            <a
              key={action.id}
              href={action.href}
              target={action.id !== 'email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={action.label}
              style={sharedStyle}
            >
              {content}
            </a>
          )
        })}

        {/* FAB button */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Schließen' : 'Kontakt & Buchung'}
          aria-expanded={open}
          className={cn(
            'relative w-14 h-14 rounded-2xl flex items-center justify-center',
            'transition-all duration-300 ease-[cubic-bezier(0.34,1.46,0.64,1)]',
            'shadow-[0_4px_28px_rgba(0,0,0,0.55)]',
            open
              ? 'bg-ivory/95 text-obsidian scale-[0.93]'
              : 'bg-obsidian/60 backdrop-blur-2xl border border-white/[0.1] text-ivory/70 hover:text-ivory hover:bg-obsidian/80'
          )}
        >
          <span
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{ opacity: open ? 0 : 1, transform: open ? 'scale(0.5) rotate(90deg)' : 'scale(1) rotate(0deg)' }}
          >
            {/* Contact/chat icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{ opacity: open ? 1 : 0, transform: open ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-90deg)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}
