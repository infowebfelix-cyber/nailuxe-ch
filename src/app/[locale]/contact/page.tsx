import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/forms/ContactForm'
import { STUDIO } from '@/lib/constants'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Kontakt — Nailuxe',
    description: 'Nailuxe Studio Zürich — Adresse, Öffnungszeiten, Telefon und Kontaktformular.',
  }
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'contact' })

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
            className="font-display font-light text-ivory"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08 }}
          >
            Wir freuen uns von Ihnen zu hören.
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-ivory section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact info */}
            <div>
              <h2 className="font-heading text-2xl text-obsidian mb-10">
                Studio Informationen
              </h2>

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5">
                  <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="label-luxury text-stone/50 mb-2">{t('address')}</p>
                    <p className="font-body text-obsidian">{STUDIO.address.street}</p>
                    <p className="font-body text-obsidian">{STUDIO.address.zip} {STUDIO.address.city}</p>
                    <p className="font-body text-stone">{STUDIO.address.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <Phone size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="label-luxury text-stone/50 mb-2">{t('phone')}</p>
                    <a href={`tel:${STUDIO.phone}`} className="font-body text-obsidian hover:text-gold transition-colors">
                      {STUDIO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <Mail size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="label-luxury text-stone/50 mb-2">{t('email')}</p>
                    <a href={`mailto:${STUDIO.email}`} className="font-body text-obsidian hover:text-gold transition-colors">
                      {STUDIO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <Clock size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="label-luxury text-stone/50 mb-4">{t('hours')}</p>
                    <div className="flex flex-col gap-2">
                      {Object.entries(STUDIO.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between gap-8">
                          <span className="font-body text-sm font-medium text-obsidian">{day}</span>
                          <span className="font-body text-sm text-stone">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-12 relative aspect-video bg-ivory-dark overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, #EDE6D8 0%, #C9A96E10 100%)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="label-luxury text-stone/40">Karte — Coming Soon</span>
                </div>
                {/*
                  INTEGRATION POINT: Add Google Maps or Mapbox embed here
                  Coordinates: 47.3769, 8.5417
                */}
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-heading text-2xl text-obsidian mb-10">
                Nachricht senden
              </h2>
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
