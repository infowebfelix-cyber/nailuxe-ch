import Link from 'next/link'
import { useLocale } from 'next-intl'
import { STUDIO } from '@/lib/constants'

export default function Footer() {
  const locale = useLocale()
  const prefix = `/${locale}`

  const navLinks = [
    { href: `${prefix}/services`, label: 'Leistungen' },
    { href: `${prefix}/gallery`,  label: 'Galerie' },
    { href: `${prefix}/artists`,  label: 'Artists' },
    { href: `${prefix}/book`,     label: 'Termin buchen' },
  ]

  return (
    <footer className="bg-obsidian text-ivory border-t border-white/[0.05]">
      {/* Main */}
      <div className="container-luxury py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

          {/* Brand */}
          <div>
            <p className="font-sans text-ivory tracking-[0.2em] text-sm font-medium mb-4">
              NAILUXE
            </p>
            <p className="font-sans text-ivory/28 text-sm leading-relaxed mb-6" style={{ color: 'rgba(245,240,232,0.28)' }}>
              {STUDIO.tagline}
            </p>
            <address className="not-italic">
              <p className="font-sans text-xs text-ivory/25 leading-relaxed">
                {STUDIO.address.street}<br />
                {STUDIO.address.zip} {STUDIO.address.city}<br />
                {STUDIO.address.country}
              </p>
            </address>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer-Navigation">
            <p className="label-luxury text-ivory/20 mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-ivory/35 hover:text-ivory transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="label-luxury text-ivory/20 mb-5">Kontakt</p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${STUDIO.phone}`}
                className="font-sans text-sm text-ivory/35 hover:text-ivory transition-colors duration-200"
              >
                {STUDIO.phone}
              </a>
              <a
                href={`mailto:${STUDIO.email}`}
                className="font-sans text-sm text-ivory/35 hover:text-ivory transition-colors duration-200"
              >
                {STUDIO.email}
              </a>
              <a
                href={`https://wa.me/${STUDIO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-gold/50 hover:text-gold transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="container-luxury py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-sans text-xs text-ivory/18" style={{ color: 'rgba(245,240,232,0.18)' }}>
            © 2026 Nailuxe. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-5">
            <Link href={`${prefix}/datenschutz`} className="font-sans text-xs text-ivory/18 hover:text-ivory/45 transition-colors duration-200" style={{ color: 'rgba(245,240,232,0.18)' }}>
              Datenschutz
            </Link>
            <Link href={`${prefix}/impressum`} className="font-sans text-xs text-ivory/18 hover:text-ivory/45 transition-colors duration-200" style={{ color: 'rgba(245,240,232,0.18)' }}>
              Impressum
            </Link>
            <a
              href={STUDIO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs transition-colors duration-200"
              style={{ color: 'rgba(245,240,232,0.18)' }}
              aria-label="Instagram"
            >
              IG
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
