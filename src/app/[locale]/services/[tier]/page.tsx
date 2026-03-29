import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import BookingCTA from '@/components/sections/BookingCTA'

const validTiers = ['signature', 'premium', 'atelier'] as const
type Tier = (typeof validTiers)[number]

export async function generateStaticParams() {
  return validTiers.map((tier) => ({ tier }))
}

export async function generateMetadata({
  params: { locale, tier },
}: {
  params: { locale: string; tier: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' })
  if (!validTiers.includes(tier as Tier)) return {}
  return {
    title: `${t(`${tier as Tier}.name`)} — Nailuxe`,
    description: t(`${tier as Tier}.description`),
  }
}

export default async function TierPage({
  params: { locale, tier },
}: {
  params: { locale: string; tier: string }
}) {
  if (!validTiers.includes(tier as Tier)) notFound()

  const t = await getTranslations({ locale, namespace: 'services' })
  const prefix = `/${locale}`
  const currentTier = tier as Tier

  const tierAccentColor = {
    signature: '#8C8C8C',
    premium: '#C9A96E',
    atelier: '#1A1A1A',
  }[currentTier]

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28 bg-obsidian">
        <div className="container-luxury">
          <Link
            href={`${prefix}/services`}
            className="label-luxury text-gold/50 hover:text-gold transition-colors duration-200 flex items-center gap-2 mb-12"
          >
            ← Services
          </Link>
          <div className="max-w-2xl">
            <p className="label-luxury text-gold/60 mb-4">
              {t(`${currentTier}.duration`)}
            </p>
            <h1
              className="font-display font-light text-ivory text-balance mb-4"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.06 }}
            >
              {t(`${currentTier}.name`)}
            </h1>
            <p className="font-display italic text-ivory/50 text-xl mb-8">
              {t(`${currentTier}.tagline`)}
            </p>
            <div className="flex items-baseline gap-6">
              <span className="font-heading text-2xl" style={{ color: tierAccentColor }}>
                {t(`${currentTier}.price`)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail */}
      <div className="bg-ivory section-padding">
        <div className="container-luxury max-w-2xl">
          <p className="font-body text-stone/80 text-lg leading-relaxed mb-14">
            {t(`${currentTier}.description`)}
          </p>

          <Link href={`${prefix}/book?service=${currentTier}`} className="btn-primary">
            {t(`${currentTier}.cta`)}
          </Link>
        </div>
      </div>

      <BookingCTA />
    </>
  )
}
