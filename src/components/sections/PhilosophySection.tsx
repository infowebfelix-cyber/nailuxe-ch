import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function PhilosophySection() {
  const t = useTranslations('philosophy')
  const locale = useLocale()
  const prefix = `/${locale}`

  return (
    <section className="section-padding bg-obsidian overflow-hidden relative">
      {/* Decorative horizontal line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/8 -translate-y-1/2 pointer-events-none" />

      <div className="container-luxury relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60 tracking-[0.25em]">
              Nailuxe
            </span>
            <div className="w-8 h-px bg-gold/40" />
          </div>

          {/* Headline */}
          <h2
            className="font-display font-light text-ivory text-balance mb-2"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="font-display font-light italic text-gold mb-10"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.2 }}
          >
            {t('subtitle')}
          </p>

          {/* Gold divider */}
          <div className="w-12 h-px bg-gold/40 mx-auto mb-10" />

          {/* Body */}
          <p className="font-body text-ivory/55 text-lg leading-relaxed mb-14 text-balance">
            {t('body')}
          </p>

          {/* CTA */}
          <Link href={`${prefix}/studio`} className="btn-outline-ivory">
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
