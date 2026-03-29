import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

// Placeholder gallery items — replace with real images from CMS/Sanity
const galleryItems = [
  {
    id: 1,
    src: '/images/gallery/gallery-1.jpg',
    alt: 'Nailuxe Atelier Design — Nude mit Gold-Akzenten',
    technique: 'Atelier',
    aspect: 'portrait',
  },
  {
    id: 2,
    src: '/images/gallery/gallery-2.jpg',
    alt: 'Nailuxe Premium Design — French mit Gel',
    technique: 'Premium',
    aspect: 'square',
  },
  {
    id: 3,
    src: '/images/gallery/gallery-3.jpg',
    alt: 'Nailuxe Signature Design — Klassisch Natur',
    technique: 'Signature',
    aspect: 'square',
  },
  {
    id: 4,
    src: '/images/gallery/gallery-4.jpg',
    alt: 'Nailuxe Atelier Design — Bespoke Art',
    technique: 'Atelier',
    aspect: 'portrait',
  },
]

export default function GalleryTeaser() {
  const t = useTranslations('gallery')
  const locale = useLocale()
  const prefix = `/${locale}`

  return (
    <section className="section-padding bg-ivory-light">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <div className="section-eyebrow">
              <span className="label-luxury">{t('title')}</span>
            </div>
            <h2 className="text-display-sm text-obsidian mt-4 text-balance max-w-md">
              {t('subtitle')}
            </h2>
          </div>
          <Link href={`${prefix}/gallery`} className="btn-outline flex-shrink-0">
            {t('cta')}
          </Link>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <Link
              key={item.id}
              href={`${prefix}/gallery`}
              className={`relative overflow-hidden bg-ivory-dark group block ${
                item.aspect === 'portrait' ? 'row-span-2' : ''
              }`}
              style={{
                aspectRatio: item.aspect === 'portrait' ? '3/4' : '1/1',
              }}
            >
              {/* Image placeholder — replace with real images */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)'
                    : 'linear-gradient(135deg, #EDE6D8 0%, #C9A96E20 100%)',
                }}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/30 transition-colors duration-500" />
              {/* Technique label */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="label-luxury text-ivory bg-obsidian/60 px-3 py-1">
                  {item.technique}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
