'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'

interface LanguageSwitcherProps {
  isLight?: boolean
}

export default function LanguageSwitcher({ isLight = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function switchLocale(newLocale: Locale) {
    setOpen(false)
    // Strip current locale prefix, apply new one (always-prefix mode)
    let cleanPath = pathname
    for (const l of locales) {
      if (cleanPath.startsWith(`/${l}/`)) {
        cleanPath = cleanPath.slice(l.length + 1)
        break
      }
      if (cleanPath === `/${l}`) {
        cleanPath = '/'
        break
      }
    }
    const newPath = `/${newLocale}${cleanPath === '/' ? '' : cleanPath}`
    router.push(newPath)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'label-luxury transition-colors duration-300 flex items-center gap-1.5',
          isLight
            ? 'text-ivory/70 hover:text-ivory'
            : 'text-stone hover:text-obsidian'
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Sprache wechseln"
      >
        {locale.toUpperCase()}
        <svg
          className={cn('w-2.5 h-2.5 transition-transform duration-200', open && 'rotate-180')}
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-3 min-w-[120px] bg-ivory border border-ivory-dark shadow-lg py-2 z-50"
          role="listbox"
          aria-label="Sprache auswählen"
        >
          {locales.map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={l === locale}
              onClick={() => switchLocale(l)}
              className={cn(
                'w-full text-left px-4 py-2 label-luxury transition-colors duration-200',
                l === locale
                  ? 'text-gold'
                  : 'text-stone hover:text-obsidian hover:bg-ivory-dark'
              )}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
