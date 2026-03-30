import Link from 'next/link'
import { useLocale } from 'next-intl'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

export default function Header() {
  const locale = useLocale()
  const prefix = `/${locale}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <Link
            href={prefix}
            className="text-ivory tracking-[0.18em] text-sm font-medium hover:text-ivory/70 transition-colors duration-200"
            aria-label="Nailuxe — Home"
          >
            NAILUXE
          </Link>

          {/* Language switcher */}
          <LanguageSwitcher isLight={true} />
        </div>
      </div>
    </header>
  )
}
