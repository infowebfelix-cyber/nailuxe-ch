import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import BookingForm from '@/components/booking/BookingForm'
import { STUDIO } from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Termin buchen — Nailuxe',
    description: 'Termin online anfragen. Signature, Premium oder Atelier — buchen Sie via WhatsApp.',
  }
}

export default async function BookPage({
  params: { locale, ...searchParams },
}: {
  params: { locale: string }
  searchParams?: { service?: string }
}) {
  setRequestLocale(locale)

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-0 md:pt-40 bg-obsidian">
        <div className="container-luxury pb-16 md:pb-20">
          <p className="label-luxury text-gold/60 mb-5">Online</p>
          <h1
            className="font-sans font-light text-ivory text-balance mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}
          >
            Termin buchen
          </h1>
          <p className="font-sans text-ivory/40 text-base max-w-sm">
            Wählen Sie Ihre Leistung und senden Sie uns Ihre Anfrage via WhatsApp.
          </p>
        </div>
      </div>

      {/* Booking form */}
      <div className="bg-obsidian border-t border-white/[0.04]">
        <div className="container-luxury py-16 md:py-20">
          <div className="max-w-xl">
            <BookingForm />
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-obsidian-light border-t border-white/[0.04]">
        <div className="container-luxury py-12 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <p className="label-luxury text-gold/50 mb-3">Adresse</p>
              <p className="font-sans text-sm text-ivory/60 leading-relaxed">
                {STUDIO.address.street}<br />
                {STUDIO.address.zip} {STUDIO.address.city}
              </p>
            </div>
            <div>
              <p className="label-luxury text-gold/50 mb-3">Öffnungszeiten</p>
              <div className="space-y-1">
                {Object.entries(STUDIO.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between gap-6 text-sm font-sans">
                    <span className="text-ivory/40">{day}</span>
                    <span className="text-ivory/60">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="label-luxury text-gold/50 mb-3">Kontakt</p>
              <div className="space-y-2">
                <a
                  href={`tel:${STUDIO.phone}`}
                  className="block font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                >
                  {STUDIO.phone}
                </a>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="block font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                >
                  {STUDIO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
