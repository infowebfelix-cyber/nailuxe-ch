import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import BookingCTA from '@/components/sections/BookingCTA'
import { Check } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mitgliedschaft — Nailuxe',
    description: 'Nailuxe Blanc, Or, Platine — drei Mitgliedschaftsstufen, unbegrenzte Wertschätzung.',
  }
}

export default async function LoyaltyPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'loyalty' })
  const prefix = `/${locale}`

  const tiers = [
    {
      id: 'blanc',
      accent: '#8C8C8C',
      bg: 'bg-ivory',
      threshold: '1. Besuch',
      featured: false,
    },
    {
      id: 'or',
      accent: '#C9A96E',
      bg: 'bg-obsidian',
      threshold: 'Ab 5 Besuchen',
      featured: true,
    },
    {
      id: 'platine',
      accent: '#1A1A1A',
      bg: 'bg-ivory-light',
      threshold: 'Ab 12 Besuchen',
      featured: false,
    },
  ] as const

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28 bg-obsidian">
        <div className="container-luxury text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60">{t('title')}</span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h1
            className="font-display font-light text-ivory text-balance"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08 }}
          >
            {t('subtitle')}
          </h1>
        </div>
      </div>

      {/* Tier cards */}
      <div className="bg-ivory section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col p-10 md:p-12 ${tier.bg} border ${
                  tier.featured ? 'border-gold/20' : 'border-ivory-dark'
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="label-luxury bg-gold text-obsidian px-4 py-1.5 whitespace-nowrap">
                      Beliebt
                    </span>
                  </div>
                )}

                {/* Tier header */}
                <div className="mb-8">
                  <p className="label-luxury mb-3" style={{ color: tier.accent, opacity: tier.featured ? 0.8 : 0.6 }}>
                    {tier.threshold}
                  </p>
                  <h2
                    className={`font-heading text-3xl mb-2 ${tier.featured ? 'text-ivory' : 'text-obsidian'}`}
                  >
                    {t(`${tier.id}.name`)}
                  </h2>
                  <p
                    className={`font-display italic text-lg ${tier.featured ? 'text-ivory/60' : 'text-stone'}`}
                  >
                    {t(`${tier.id}.tagline`)}
                  </p>
                </div>

                <div className="w-10 h-px mb-8" style={{ backgroundColor: tier.accent, opacity: 0.5 }} />

                {/* Benefits */}
                <ul className="flex flex-col gap-4 flex-1 mb-10">
                  {(t.raw(`${tier.id}.benefits`) as string[]).map((benefit: string) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check
                        size={14}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: tier.accent }}
                      />
                      <span
                        className={`font-body text-sm leading-relaxed ${
                          tier.featured ? 'text-ivory/70' : 'text-stone/80'
                        }`}
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`${prefix}/book`}
                  className={tier.featured ? 'btn-gold' : 'btn-outline'}
                >
                  {t('cta')}
                </Link>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center font-body text-sm text-stone/50 mt-12 max-w-xl mx-auto">
            Die Mitgliedschaft wird automatisch auf Basis Ihrer Besuchshistorie vergeben.
            Keine Anmeldung erforderlich — Nailuxe erkennt Sie.
          </p>
        </div>
      </div>

      <BookingCTA />
    </>
  )
}
