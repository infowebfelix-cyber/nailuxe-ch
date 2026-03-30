import Link from 'next/link'
import { useLocale } from 'next-intl'
import { STUDIO } from '@/lib/constants'

export default function Footer() {
  const locale = useLocale()
  const prefix = `/${locale}`

  return (
    <footer className="relative bg-transparent" aria-label="Footer">
      {/* Thin top separator */}
      <div className="border-t border-white/[0.05]" />

      <div className="container-luxury py-8 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

          {/* Left — address */}
          <div>
            <p className="font-sans font-medium text-ivory tracking-[0.18em] text-xs mb-2">
              NAILUXE
            </p>
            <address className="not-italic font-sans text-xs leading-relaxed" style={{ color: 'rgba(245,240,232,0.25)' }}>
              {STUDIO.address.street}<br />
              {STUDIO.address.zip} {STUDIO.address.city}
            </address>
          </div>

          {/* Right — legal + copyright */}
          <div className="flex items-center gap-5">
            <span className="font-sans text-xs" style={{ color: 'rgba(245,240,232,0.18)' }}>
              © 2026 Nailuxe
            </span>
            <Link
              href={`${prefix}/datenschutz`}
              className="font-sans text-xs transition-colors duration-200"
              style={{ color: 'rgba(245,240,232,0.22)' }}
            >
              Datenschutz
            </Link>
            <Link
              href={`${prefix}/impressum`}
              className="font-sans text-xs transition-colors duration-200"
              style={{ color: 'rgba(245,240,232,0.22)' }}
            >
              Impressum
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}
