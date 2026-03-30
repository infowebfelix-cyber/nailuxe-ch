import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

const tiers = [
  { key: 'signature', number: '01', accentColor: '#8C8C8C' },
  { key: 'premium',   number: '02', accentColor: '#C9A96E' },
  { key: 'atelier',   number: '03', accentColor: '#C9A96E' },
] as const

export default function ServicesPreview() {
  const t = useTranslations('services')
  const locale = useLocale()
  const prefix = `/${locale}`

  return (
    <section className="bg-ivory py-24 md:py-32" aria-label="Leistungen">
      <div className="container-luxury">

        {/* Header */}
        <div className="flex items-baseline justify-between mb-14 md:mb-18">
          <h2
            className="font-sans font-light text-obsidian"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
          >
            Leistungen
          </h2>
          <Link
            href={`${prefix}/services`}
            className="font-sans text-sm text-obsidian/35 hover:text-obsidian transition-colors duration-200 hidden md:flex items-center gap-2"
          >
            Alle ansehen
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Service rows */}
        <div className="flex flex-col">
          {tiers.map((tier) => (
            <Link
              key={tier.key}
              href={`${prefix}/services/${tier.key}`}
              className="group relative flex items-center gap-6 md:gap-10 py-6 md:py-8 border-t border-obsidian/[0.08] hover:border-obsidian/[0.15] transition-colors duration-300"
            >
              {/* Animated gold left bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] origin-top transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] scale-y-0 group-hover:scale-y-100"
                style={{ backgroundColor: tier.accentColor }}
              />

              {/* Number */}
              <span className="font-sans text-xs font-medium text-obsidian/20 tabular-nums w-8 flex-shrink-0 tracking-[0.08em]">
                {tier.number}
              </span>

              {/* Name */}
              <span
                className="font-sans font-medium text-obsidian group-hover:translate-x-0.5 transition-transform duration-300 flex-shrink-0"
                style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)', letterSpacing: '-0.015em' }}
              >
                {t(`${tier.key}.name`)}
              </span>

              {/* Tagline */}
              <span className="font-sans text-obsidian/35 text-sm hidden md:block flex-1 font-light">
                {t(`${tier.key}.tagline`)}
              </span>

              {/* Duration */}
              <span className="font-sans label-luxury text-obsidian/25 hidden lg:block">
                {t(`${tier.key}.duration`)}
              </span>

              {/* Price */}
              <span
                className="font-sans text-sm font-medium ml-auto flex-shrink-0 transition-colors duration-300"
                style={{ color: tier.accentColor, opacity: 0.8 }}
              >
                {t(`${tier.key}.price`)}
              </span>

              {/* Arrow */}
              <span className="font-sans text-obsidian/20 group-hover:text-obsidian/60 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
                →
              </span>
            </Link>
          ))}
          <div className="border-t border-obsidian/[0.08]" />
        </div>

        {/* Mobile view all */}
        <div className="mt-8 md:hidden">
          <Link
            href={`${prefix}/services`}
            className="font-sans text-sm text-obsidian/40 hover:text-obsidian transition-colors duration-200"
          >
            Alle Leistungen →
          </Link>
        </div>

      </div>
    </section>
  )
}
