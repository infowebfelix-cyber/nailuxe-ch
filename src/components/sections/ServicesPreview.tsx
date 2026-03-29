import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'

const tiers = ['signature', 'premium', 'atelier'] as const

const tierAccents = {
  signature: 'border-stone/30 hover:border-stone',
  premium: 'border-gold/40 hover:border-gold',
  atelier: 'border-obsidian hover:border-obsidian',
} as const

const tierNumbers = {
  signature: '01',
  premium: '02',
  atelier: '03',
} as const

export default function ServicesPreview() {
  const t = useTranslations('services')
  const locale = useLocale()
  const prefix = `/${locale}`

  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="section-eyebrow justify-center">
            <span className="label-luxury">{t('title')}</span>
          </div>
          <h2 className="text-display-sm text-obsidian mt-4 text-balance">
            {t('subtitle')}
          </h2>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-ivory-dark">
          {tiers.map((tier) => (
            <div
              key={tier}
              className="bg-ivory group relative flex flex-col p-10 md:p-12 transition-colors duration-500 hover:bg-obsidian"
            >
              {/* Tier number */}
              <span className="font-display text-4xl font-light text-ivory-dark group-hover:text-ivory/10 transition-colors duration-500 mb-8 select-none">
                {tierNumbers[tier]}
              </span>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-heading text-2xl text-obsidian group-hover:text-ivory transition-colors duration-500 mb-2">
                  {t(`${tier}.name`)}
                </h3>
                <p className="font-display italic text-stone group-hover:text-ivory/50 transition-colors duration-500 mb-6">
                  {t(`${tier}.tagline`)}
                </p>
                <p className="font-body text-sm text-stone/80 group-hover:text-ivory/60 leading-relaxed transition-colors duration-500 mb-8">
                  {t(`${tier}.description`)}
                </p>
              </div>

              {/* Pricing & CTA */}
              <div className="flex items-end justify-between mt-auto pt-8 border-t border-ivory-dark group-hover:border-ivory/20 transition-colors duration-500">
                <div>
                  <p className="label-luxury text-stone/60 group-hover:text-ivory/40 transition-colors duration-500 mb-1">
                    {t(`${tier}.duration`)}
                  </p>
                  <p className="font-heading text-xl text-obsidian group-hover:text-gold transition-colors duration-500">
                    {t(`${tier}.price`)}
                  </p>
                </div>
                <Link
                  href={`${prefix}/services/${tier}`}
                  className="inline-flex items-center gap-2 label-luxury text-stone group-hover:text-ivory transition-colors duration-500"
                  aria-label={`${t(`${tier}.name`)} entdecken`}
                >
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link href={`${prefix}/services`} className="link-underline text-stone hover:text-obsidian">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
