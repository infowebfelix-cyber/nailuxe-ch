import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function StudioTeaser() {
  const t = useTranslations('studio')
  const locale = useLocale()
  const prefix = `/${locale}`

  return (
    <section className="section-padding-sm bg-ivory-dark overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image placeholder — replace with studio photography */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[520px] overflow-hidden bg-obsidian/10">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(160deg, #2C2C2C 0%, #1A1A1A 50%, #C9A96E15 100%)',
              }}
            />
            {/* Decorative gold corner accent */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-gold/40" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-gold/40" />

            {/* Studio label overlay */}
            <div className="absolute bottom-8 left-8">
              <span className="label-luxury text-ivory/40">
                Zürich · Studio
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="section-eyebrow">
              <span className="label-luxury">{t('title')}</span>
            </div>

            <h2 className="text-display-sm text-obsidian mt-4 mb-6 text-balance">
              {t('tagline')}
            </h2>

            <div className="w-12 h-px bg-gold mb-8" />

            {/* Studio details */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { label: 'Ambiente', value: '100% privat' },
                { label: 'Produkte', value: 'EU-zertifiziert' },
                { label: 'Hygiene', value: 'Swiss Standard' },
                { label: 'Team', value: 'Zertifiziert' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="label-luxury text-stone/50 mb-1">{item.label}</p>
                  <p className="font-heading text-obsidian">{item.value}</p>
                </div>
              ))}
            </div>

            <Link href={`${prefix}/studio`} className="btn-primary self-start">
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
