import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import BookingCTA from '@/components/sections/BookingCTA'
import { ArrowRight } from 'lucide-react'

const tiers = [
  {
    id: 'signature',
    number: '01',
    color: '#8C8C8C',
    includes: [
      { de: 'Klassische Maniküre mit Premium-Produkten', en: 'Classic manicure with premium products', fr: 'Manucure classique avec produits premium' },
      { de: 'Cuticula-Behandlung', en: 'Cuticle treatment', fr: 'Traitement cuticules' },
      { de: 'Basis-Nageldesign', en: 'Basic nail art', fr: 'Nail art basique' },
      { de: 'Hand- und Unterarmmassage', en: 'Hand & forearm massage', fr: 'Massage main et avant-bras' },
      { de: 'Auswahl aus 30+ Farben', en: 'Selection from 30+ colours', fr: 'Choix parmi 30+ couleurs' },
    ],
  },
  {
    id: 'premium',
    number: '02',
    color: '#C9A96E',
    includes: [
      { de: 'Alle Signature-Leistungen', en: 'All Signature services', fr: 'Tous les services Signature' },
      { de: 'Gel oder Hard Gel Optionen', en: 'Gel or hard gel options', fr: 'Options gel ou gel dur' },
      { de: 'Erweitertes Nageldesign (Chrome, Textur, 3D)', en: 'Advanced nail art (chrome, texture, 3D)', fr: 'Nail art avancé (chrome, texture, 3D)' },
      { de: 'Verlängerte Massagezusatz', en: 'Extended massage ritual', fr: 'Rituel massage prolongé' },
      { de: 'Auswahl aus 80+ exklusiven Farben', en: 'Selection from 80+ exclusive colours', fr: 'Choix parmi 80+ couleurs exclusives' },
    ],
  },
  {
    id: 'atelier',
    number: '03',
    color: '#1A1A1A',
    includes: [
      { de: 'Persönliche Design-Konsultation', en: 'Personal design consultation', fr: 'Consultation design personnelle' },
      { de: 'Maßgefertigtes Nailuxe-Design', en: 'Bespoke Nailuxe design', fr: 'Design Nailuxe sur mesure' },
      { de: 'Wunsch-Artist-Auswahl', en: 'Artist of choice selection', fr: 'Choix de l\'artist' },
      { de: 'Prioritätsbuchung', en: 'Priority booking', fr: 'Réservation prioritaire' },
      { de: 'Erfrischungen inklusive', en: 'Complimentary refreshments', fr: 'Rafraîchissements offerts' },
      { de: 'Extended Session 90–120 Min.', en: 'Extended session 90–120 min.', fr: 'Séance prolongée 90–120 min.' },
    ],
  },
]

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.services' })
  return { title: t('title'), description: t('description') }
}

export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'services' })
  const prefix = `/${locale}`

  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28 bg-obsidian">
        <div className="container-luxury text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60">Leistungen</span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h1
            className="font-sans font-light text-ivory text-balance"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
          >
            {t('subtitle')}
          </h1>
        </div>
      </div>

      {/* Tiers */}
      <div className="bg-ivory">
        {tiers.map((tier, i) => (
          <div
            key={tier.id}
            className={`border-b border-ivory-dark ${i % 2 === 1 ? 'bg-ivory-light' : 'bg-ivory'}`}
          >
            <div className="container-luxury py-20 md:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Info */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="font-sans text-5xl font-light text-ivory-dark select-none">
                    {tier.number}
                  </span>
                  <h2 className="font-sans text-3xl md:text-4xl text-obsidian mt-4 mb-3">
                    {t(`${tier.id}.name`)}
                  </h2>
                  <p className="font-sans italic text-stone text-xl mb-6">
                    {t(`${tier.id}.tagline`)}
                  </p>
                  <div className="w-10 h-px mb-6" style={{ backgroundColor: tier.color }} />
                  <p className="font-sans text-stone/80 leading-relaxed mb-8">
                    {t(`${tier.id}.description`)}
                  </p>
                  <div className="flex items-baseline gap-4 mb-10">
                    <span className="font-sans text-2xl text-obsidian">
                      {t(`${tier.id}.price`)}
                    </span>
                    <span className="label-luxury text-stone/50">
                      {t(`${tier.id}.duration`)}
                    </span>
                  </div>
                  <Link href={`${prefix}/book?service=${tier.id}`} className="btn-primary">
                    {t(`${tier.id}.cta`)}
                  </Link>
                </div>

                {/* Includes */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="label-luxury text-stone/50 mb-8">Inklusive</p>
                  <ul className="flex flex-col gap-5">
                    {tier.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-4 h-px mt-3"
                          style={{ backgroundColor: tier.color }}
                        />
                        <span className="font-sans text-sm text-obsidian/80 leading-relaxed">
                          {item.de}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BookingCTA />
    </>
  )
}
