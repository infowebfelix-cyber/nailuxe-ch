import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import BookingCTA from '@/components/sections/BookingCTA'

const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  technique: ['Atelier', 'Premium', 'Signature', 'Atelier', 'Premium', 'Atelier'][i % 6],
  style: ['Nude', 'French', 'Art', 'Chrome', 'Minimalist', 'Bespoke'][i % 6],
  artist: ['Sofia', 'Lena', 'Maya', 'Sofia', 'Lena', 'Maya'][i % 3],
}))

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Galerie — Nailuxe',
    description: 'Kunstfertigkeit, die für sich spricht. Entdecken Sie unsere Nailuxe-Designs.',
  }
}

export default async function GalleryPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'gallery' })
  const prefix = `/${locale}`

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-obsidian">
        <div className="container-luxury text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60">Portfolio</span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h1
            className="font-sans font-light text-ivory text-balance mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            {t('title')}
          </h1>
          <p className="font-sans italic text-ivory/50 text-xl">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-ivory-light border-b border-ivory-dark sticky top-20 z-40">
        <div className="container-luxury">
          <div className="flex items-center gap-8 py-5 overflow-x-auto">
            {['Alle', 'Signature', 'Premium', 'Atelier', 'Nude', 'French', 'Art', 'Chrome'].map((filter) => (
              <button
                key={filter}
                className={`label-luxury whitespace-nowrap transition-colors duration-200 ${
                  filter === 'Alle' ? 'text-gold' : 'text-stone/50 hover:text-obsidian'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery masonry grid */}
      <div className="bg-ivory section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={item.id}
                className={`relative overflow-hidden bg-ivory-dark group cursor-pointer ${
                  i % 5 === 0 ? 'row-span-2' : ''
                }`}
                style={{ aspectRatio: i % 5 === 0 ? '3/4' : '1/1' }}
              >
                {/* Placeholder — replace with real Image component */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: i % 3 === 0
                      ? 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)'
                      : i % 3 === 1
                      ? 'linear-gradient(135deg, #EDE6D8 0%, #C9A96E20 100%)'
                      : 'linear-gradient(135deg, #C4A09A20 0%, #F5F0E8 100%)',
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/50 transition-colors duration-400 flex flex-col justify-end p-4">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="label-luxury text-gold block mb-1">{item.technique}</span>
                    <span className="font-sans italic text-ivory text-sm">{item.style}</span>
                    <span className="label-luxury text-ivory/50 block mt-1">von {item.artist}</span>
                  </div>
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
