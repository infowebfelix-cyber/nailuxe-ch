'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isHeroPage, setIsHeroPage] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Detect homepage for transparent header
  useEffect(() => {
    const isHome = pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`
    setIsHeroPage(isHome)
  }, [pathname, locale])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const prefix = `/${locale}`

  const navLinks = [
    { href: `${prefix}/services`, label: t('services') },
    { href: `${prefix}/gallery`, label: t('gallery') },
    { href: `${prefix}/studio`, label: t('studio') },
    { href: `${prefix}/artists`, label: t('artists') },
    { href: `${prefix}/loyalty`, label: t('loyalty') },
    { href: `${prefix}/journal`, label: t('journal') },
    { href: `${prefix}/contact`, label: t('contact') },
  ]

  const isTransparent = isHeroPage && !isScrolled && !mobileOpen

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-ivory/95 backdrop-blur-md border-b border-ivory-dark shadow-sm'
      )}
    >
      <div className="container-luxury">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link
            href={prefix}
            className="flex-shrink-0 transition-opacity duration-300 hover:opacity-75"
            aria-label="Nailuxe — Startseite"
          >
            <Logo
              className={cn(
                'h-7 w-auto transition-colors duration-500',
                isTransparent ? 'text-ivory' : 'text-obsidian'
              )}
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Hauptnavigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'label-luxury transition-colors duration-300',
                  isTransparent
                    ? 'text-ivory/80 hover:text-ivory'
                    : 'text-stone hover:text-obsidian',
                  pathname === link.href && 'text-gold!'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher isLight={isTransparent} />

            <Link
              href={`${prefix}/book`}
              className={cn(
                'hidden md:inline-flex items-center gap-2',
                'px-6 py-2.5 font-body text-xs font-medium tracking-[0.15em] uppercase',
                'transition-all duration-300',
                isTransparent
                  ? 'border border-ivory text-ivory hover:bg-ivory hover:text-obsidian'
                  : 'bg-obsidian text-ivory hover:bg-obsidian-light'
              )}
            >
              {t('book')}
            </Link>

            {/* Mobile toggle */}
            <button
              className={cn(
                'lg:hidden p-2 transition-colors duration-300',
                isTransparent ? 'text-ivory' : 'text-obsidian'
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Menü öffnen"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-500 bg-ivory border-t border-ivory-dark',
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="container-luxury py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'label-luxury text-stone hover:text-obsidian transition-colors',
                pathname === link.href && 'text-gold'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${prefix}/book`}
            className="btn-primary mt-4 text-center"
          >
            {t('book')}
          </Link>
          <div className="pt-2">
            <LanguageSwitcher isLight={false} />
          </div>
        </nav>
      </div>
    </header>
  )
}
