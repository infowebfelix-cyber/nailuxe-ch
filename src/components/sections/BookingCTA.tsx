import Link from 'next/link'
import { useLocale } from 'next-intl'

const copy = {
  de: { headline: ['Bereit für Ihr', 'Nailuxe-Erlebnis?'], cta: 'Termin buchen' },
  fr: { headline: ['Prête pour votre', 'expérience Nailuxe?'], cta: 'Prendre rendez-vous' },
  en: { headline: ['Ready for your', 'Nailuxe experience?'], cta: 'Book a session' },
} as const

export default function BookingCTA() {
  const locale = useLocale()
  const prefix = `/${locale}`
  const m = copy[locale as keyof typeof copy] ?? copy.de

  return (
    <section className="bg-obsidian py-24 md:py-32 border-t border-white/[0.04]" aria-label="Termin buchen">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 md:gap-20">

          {/* Headline */}
          <h2
            className="font-sans font-light text-ivory"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 0.97, letterSpacing: '-0.03em' }}
          >
            {m.headline.map((line, i) => (
              <span key={i} className={`block ${i === 1 ? 'text-ivory/20' : ''}`}>
                {line}
              </span>
            ))}
          </h2>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Link
              href={`${prefix}/book`}
              className="group inline-flex items-center gap-4"
              aria-label={m.cta}
            >
              <span className="h-px bg-gold/60 group-hover:bg-gold transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" style={{ width: '48px' }} />
              <span className="label-luxury text-ivory/50 group-hover:text-ivory transition-colors duration-300 tracking-[0.18em]">
                {m.cta.toUpperCase()}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
