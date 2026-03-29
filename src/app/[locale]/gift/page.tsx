import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GIFT_AMOUNTS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Geschenkkarte — Nailuxe',
    description: 'Das schönste Geschenk: ein Nailuxe-Erlebnis. Geschenkkarten online kaufen.',
  }
}

export default async function GiftPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'gift' })

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
            className="font-display font-light text-ivory text-balance mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08 }}
          >
            {t('subtitle')}
          </h1>
        </div>
      </div>

      {/* Gift card section */}
      <div className="bg-ivory section-padding">
        <div className="container-luxury max-w-3xl">
          {/* Gift card preview */}
          <div
            className="relative w-full aspect-video mb-16 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2C2420 60%, #C9A96E15 100%)' }}
          >
            <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-gold/40" />
            <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-gold/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="font-display font-light text-ivory tracking-[0.3em] text-2xl uppercase">
                Nailuxe
              </span>
              <div className="w-12 h-px bg-gold/50" />
              <span className="font-display italic text-ivory/50 text-sm">
                Precision. Elegance. Care.
              </span>
            </div>
          </div>

          {/* Amount selection */}
          <h2 className="font-heading text-xl text-obsidian mb-8">Betrag wählen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {GIFT_AMOUNTS.map((amount) => (
              <button
                key={amount}
                className="py-5 border border-ivory-dark hover:border-gold hover:text-gold font-heading text-xl text-obsidian transition-all duration-300 text-center"
              >
                {formatPrice(amount)}
              </button>
            ))}
          </div>

          {/*
            INTEGRATION POINT: Connect to Stripe for gift card purchase
            - Custom amount input
            - Recipient name & message
            - Delivery method (email or physical)
          */}
          <button className="btn-gold w-full justify-center py-5 text-sm">
            {t('cta')}
          </button>

          <p className="text-center font-body text-sm text-stone/50 mt-6">
            {t('note')}
          </p>
        </div>
      </div>
    </>
  )
}
