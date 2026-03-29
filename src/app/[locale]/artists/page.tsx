import type { Metadata } from 'next'
import Link from 'next/link'
import BookingCTA from '@/components/sections/BookingCTA'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nail Artists — Nailuxe',
    description: 'Unser zertifiziertes Nailuxe-Team. Entdecken Sie unsere Nail Artists und buchen Sie direkt.',
  }
}

// Replace with CMS data in production
const artists = [
  {
    id: 'sofia',
    name: 'Sofia R.',
    title: 'Senior Nail Artist',
    specialty: 'Atelier & Bespoke Design',
    experience: '8 Jahre',
    story: 'Sofia ist spezialisiert auf einzigartige Atelier-Designs mit einem ausgeprägten Sinn für Proportion und Farbe. Ihre Arbeit verbindet Schweizer Präzision mit europäischer Eleganz.',
    signature: 'Minimalist Luxury',
  },
  {
    id: 'lena',
    name: 'Lena K.',
    title: 'Senior Nail Artist',
    specialty: 'Premium Gel & Texturen',
    experience: '6 Jahre',
    story: 'Lenas Expertise liegt in fortgeschrittenen Gel-Techniken und innovativen Oberflächenveredelungen. Sie transformiert jeden Wunsch in ein präzise ausgeführtes Kunstwerk.',
    signature: 'Chrome & Texture',
  },
  {
    id: 'maya',
    name: 'Maya S.',
    title: 'Nail Artist',
    specialty: 'French & Klassik',
    experience: '4 Jahre',
    story: 'Maya hat ihre Leidenschaft für zeitlose Eleganz zur Profession gemacht. Ihre French-Manikür ist makellos — jedes Mal, für jeden Kunden.',
    signature: 'Classic Precision',
  },
]

export default async function ArtistsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const prefix = `/${locale}`

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28 bg-obsidian">
        <div className="container-luxury text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60">Team</span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h1
            className="font-display font-light text-ivory text-balance"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08 }}
          >
            Unsere Nail Artists
          </h1>
        </div>
      </div>

      {/* Artists */}
      <div className="bg-ivory section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {artists.map((artist) => (
              <div key={artist.id} className="flex flex-col group">
                {/* Photo placeholder */}
                <div className="relative aspect-portrait overflow-hidden bg-ivory-dark mb-8">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: 'linear-gradient(160deg, #2C2420 0%, #1A1A1A 100%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-obsidian/50 to-transparent" />
                  {/* Signature style tag */}
                  <div className="absolute bottom-5 left-5">
                    <span className="label-luxury text-gold/80">{artist.signature}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <h2 className="font-heading text-2xl text-obsidian mb-1">{artist.name}</h2>
                  <p className="label-luxury text-gold/70 mb-3">{artist.title}</p>
                  <div className="w-8 h-px bg-gold mb-5" />
                  <p className="label-luxury text-stone/50 mb-1">Spezialgebiet</p>
                  <p className="font-body text-sm text-obsidian mb-4">{artist.specialty}</p>
                  <p className="label-luxury text-stone/50 mb-1">Erfahrung</p>
                  <p className="font-body text-sm text-obsidian mb-6">{artist.experience}</p>
                  <p className="font-body text-sm text-stone/70 leading-relaxed mb-8 flex-1">
                    {artist.story}
                  </p>
                  <Link
                    href={`${prefix}/book?artist=${artist.id}`}
                    className="btn-outline self-start"
                  >
                    Mit {artist.name.split(' ')[0]} buchen
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookingCTA />
    </>
  )
}
