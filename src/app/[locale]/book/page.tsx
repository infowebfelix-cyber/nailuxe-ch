import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.booking' })
  return { title: t('title'), description: t('description') }
}

export default async function BookPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'booking' })

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-obsidian">
        <div className="container-luxury text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60">Online</span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h1
            className="font-display font-light text-ivory text-balance mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            {t('title')}
          </h1>
          <p className="font-body text-ivory/50 text-lg max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Booking embed */}
      <div className="bg-ivory section-padding">
        <div className="container-luxury max-w-3xl">
          {/* Acuity Scheduling embed — replace with real scheduling URL */}
          <div className="bg-ivory-light border border-ivory-dark p-8 md:p-12 text-center">
            <p className="label-luxury text-stone/50 mb-4">Online-Buchungssystem</p>
            <p className="font-display italic text-stone text-xl mb-8">
              Das Buchungssystem wird in Kürze aktiviert.
            </p>
            <p className="font-body text-sm text-stone/60 mb-10">
              {t('note')}
            </p>
            {/*
              INTEGRATION POINT: Replace this div with the Acuity embed:
              <iframe
                src={process.env.NEXT_PUBLIC_ACUITY_SCHEDULING_URL}
                title="Online-Buchung Nailuxe"
                width="100%"
                height="800"
                frameBorder="0"
              />
            */}
            <a
              href={`mailto:hello@nailuxe.ch?subject=Terminanfrage`}
              className="btn-primary"
            >
              Per E-Mail anfragen
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
