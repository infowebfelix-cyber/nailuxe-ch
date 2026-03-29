import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import Logo from '@/components/ui/Logo'
import { STUDIO } from '@/lib/constants'
import { Instagram } from 'lucide-react'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const prefix = `/${locale}`

  const serviceLinks = [
    { href: `${prefix}/services/signature`, label: 'Signature' },
    { href: `${prefix}/services/premium`, label: 'Premium' },
    { href: `${prefix}/services/atelier`, label: 'Atelier' },
    { href: `${prefix}/gift`, label: t('nav.gift') },
  ]

  const studioLinks = [
    { href: `${prefix}/studio`, label: t('nav.studio') },
    { href: `${prefix}/artists`, label: t('nav.artists') },
    { href: `${prefix}/gallery`, label: t('nav.gallery') },
    { href: `${prefix}/journal`, label: t('nav.journal') },
    { href: `${prefix}/loyalty`, label: t('nav.loyalty') },
    { href: `${prefix}/contact`, label: t('nav.contact') },
  ]

  return (
    <footer className="bg-obsidian text-ivory">
      {/* Main footer */}
      <div className="container-luxury py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo className="text-ivory mb-6" />
            <p className="font-display font-light italic text-ivory/60 text-lg leading-relaxed mb-8">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={STUDIO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/40 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={STUDIO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/40 hover:text-gold transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="label-luxury text-ivory/40 mb-6">Services</p>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <p className="label-luxury text-ivory/40 mb-6">Studio</p>
            <ul className="flex flex-col gap-3">
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label-luxury text-ivory/40 mb-6">{t('contact.title')}</p>
            <address className="not-italic flex flex-col gap-3">
              <div>
                <p className="font-body text-sm text-ivory/60">
                  {STUDIO.address.street}
                </p>
                <p className="font-body text-sm text-ivory/60">
                  {STUDIO.address.zip} {STUDIO.address.city}
                </p>
              </div>
              <a
                href={`tel:${STUDIO.phone}`}
                className="font-body text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
              >
                {STUDIO.phone}
              </a>
              <a
                href={`mailto:${STUDIO.email}`}
                className="font-body text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
              >
                {STUDIO.email}
              </a>
            </address>
            <div className="mt-8">
              <p className="label-luxury text-ivory/40 mb-3">{t('contact.hours')}</p>
              {Object.entries(STUDIO.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between gap-4 font-body text-sm text-ivory/60 mb-1">
                  <span>{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="container-luxury py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-ivory/30">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={`${prefix}/datenschutz`}
              className="font-body text-xs text-ivory/30 hover:text-ivory/60 transition-colors"
            >
              {t('footer.legal.privacy')}
            </Link>
            <Link
              href={`${prefix}/agb`}
              className="font-body text-xs text-ivory/30 hover:text-ivory/60 transition-colors"
            >
              {t('footer.legal.terms')}
            </Link>
            <Link
              href={`${prefix}/impressum`}
              className="font-body text-xs text-ivory/30 hover:text-ivory/60 transition-colors"
            >
              {t('footer.legal.imprint')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
