import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function BookingCTA() {
  const locale = useLocale()
  const prefix = `/${locale}`

  const messages = {
    de: {
      label: 'Termin',
      title: 'Bereit für Ihr\nNailuxe-Erlebnis?',
      subtitle: 'Reservieren Sie Ihren Wunschtermin online — in weniger als zwei Minuten.',
      cta: 'Termin buchen',
      gift: 'Geschenkkarte',
    },
    fr: {
      label: 'Rendez-vous',
      title: 'Prête pour votre\nexpérience Nailuxe?',
      subtitle: 'Réservez votre séance en ligne — en moins de deux minutes.',
      cta: 'Prendre rendez-vous',
      gift: 'Carte cadeau',
    },
    en: {
      label: 'Appointment',
      title: 'Ready for your\nNailuxe experience?',
      subtitle: 'Reserve your session online — in under two minutes.',
      cta: 'Book a session',
      gift: 'Gift card',
    },
  }

  const m = messages[locale as keyof typeof messages] ?? messages.de

  return (
    <section
      className="section-padding bg-obsidian relative overflow-hidden"
      aria-label="Termin buchen"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9A96E 0px,
            #C9A96E 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />

      <div className="container-luxury relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60 tracking-[0.25em]">
              {m.label}
            </span>
            <div className="w-8 h-px bg-gold/40" />
          </div>

          <h2
            className="font-display font-light text-ivory text-balance mb-6"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              whiteSpace: 'pre-line',
            }}
          >
            {m.title}
          </h2>

          <p className="font-body text-ivory/50 text-lg mb-12 text-balance">
            {m.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`${prefix}/book`} className="btn-gold">
              {m.cta}
            </Link>
            <Link href={`${prefix}/gift`} className="btn-outline-ivory">
              {m.gift}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
