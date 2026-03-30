import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import BookingCTA from '@/components/sections/BookingCTA'
import { STUDIO } from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Studio — Nailuxe',
    description: 'Das Nailuxe Studio in Zürich. Entworfen für Ihr Wohlbefinden. Swiss precision, European elegance.',
  }
}

const studioValues = [
  {
    label: 'Ambiente',
    title: 'Jedes Detail ist beabsichtigt.',
    body: 'Von der Lichttemperatur (2700K warm) bis zur Raumakustik — das Nailuxe Studio wurde so gestaltet, dass Sie sich vom ersten Moment an willkommen und ruhig fühlen.',
  },
  {
    label: 'Produkte',
    title: 'Nur das Beste auf Ihrer Haut.',
    body: 'Wir verwenden ausschließlich EU- und Swiss-zertifizierte Produkte, die strenge Sicherheitsstandards erfüllen. Keine Kompromisse bei der Gesundheit unserer Kundinnen.',
  },
  {
    label: 'Hygiene',
    title: 'Swiss Standard. Keine Ausnahmen.',
    body: 'Vollständige Stationsreinigung zwischen jeder Kundin. Autoklavierte Instrumente. Aktive Staubabsaugung. Wir übererfüllen den Schweizer SIA/OFSP-Standard.',
  },
  {
    label: 'Team',
    title: 'Zertifizierte Nail Artists.',
    body: 'Nicht Techniker — Artists. Jedes Nailuxe-Teammitglied absolviert unser internes Zertifizierungsprogramm und wird kontinuierlich weitergebildet.',
  },
]

export default async function StudioPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-0 md:pt-40 bg-obsidian">
        <div className="container-luxury text-center pb-20 md:pb-28">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60">Zürich</span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h1
            className="font-display font-light text-ivory text-balance mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08 }}
          >
            Das Studio
          </h1>
          <p className="font-display italic text-ivory/50 text-xl max-w-xl mx-auto">
            Entworfen für Ihr Wohlbefinden. Gebaut auf Schweizer Präzision.
          </p>
        </div>

        {/* Hero image placeholder */}
        <div className="relative w-full h-[40vw] min-h-[280px] max-h-[560px] overflow-hidden bg-obsidian-light">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #2C2C2C 0%, #1A1A1A 60%, #C9A96E08 100%)',
            }}
          />
          <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="label-luxury text-ivory/20">Studio Photography — Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Studio values */}
      <div className="bg-ivory">
        {studioValues.map((value, i) => (
          <div key={value.label} className={`border-b border-ivory-dark ${i % 2 === 0 ? 'bg-ivory' : 'bg-ivory-light'}`}>
            <div className="container-luxury py-16 md:py-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-start">
                <div>
                  <p className="label-luxury text-gold/70">{value.label}</p>
                </div>
                <div className="md:col-span-2">
                  <h2 className="font-heading text-2xl md:text-3xl text-obsidian mb-5">
                    {value.title}
                  </h2>
                  <p className="font-body text-stone/80 leading-relaxed">
                    {value.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Address & hours */}
      <div className="bg-ivory-dark section-padding-sm">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div>
              <p className="label-luxury text-stone/50 mb-6">Adresse</p>
              <address className="not-italic">
                <p className="font-heading text-xl text-obsidian">{STUDIO.name}</p>
                <p className="font-body text-stone mt-2">{STUDIO.address.street}</p>
                <p className="font-body text-stone">{STUDIO.address.zip} {STUDIO.address.city}</p>
                <p className="font-body text-stone">{STUDIO.address.country}</p>
                <a href={`tel:${STUDIO.phone}`} className="font-body text-stone hover:text-obsidian transition-colors mt-4 block">
                  {STUDIO.phone}
                </a>
              </address>
            </div>
            <div>
              <p className="label-luxury text-stone/50 mb-6">Öffnungszeiten</p>
              <div className="flex flex-col gap-3">
                {Object.entries(STUDIO.hours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between gap-6 pb-3 border-b border-ivory-dark last:border-0">
                    <span className="font-body text-sm font-medium text-obsidian">{day}</span>
                    <span className="font-body text-sm text-stone">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingCTA />
    </>
  )
}
