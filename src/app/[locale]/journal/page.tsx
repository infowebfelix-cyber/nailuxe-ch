import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import BookingCTA from '@/components/sections/BookingCTA'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Journal — Nailuxe',
    description: 'Einblicke in Handwerkskunst, Nagelpflege und das Nailuxe-Universum.',
  }
}

// Placeholder articles — replace with Sanity CMS in production
const articles = [
  {
    slug: 'die-kunst-der-perfekten-maniküre',
    category: 'Handwerkskunst',
    title: 'Die Kunst der perfekten Maniküre',
    excerpt: 'Was einen echten Nail Artist von einem Techniker unterscheidet — und warum dieser Unterschied in jeder Linie sichtbar ist.',
    date: '2026-03-15',
    readTime: '5 Min.',
  },
  {
    slug: 'frühling-nageldesign-trends-2026',
    category: 'Trends',
    title: 'Frühling 2026: Was wir sehen, was bleibt',
    excerpt: 'Unser Blick auf die relevanten Nageldesign-Tendenzen des Frühjahrs — gefiltert durch den Nailuxe-Standard.',
    date: '2026-03-01',
    readTime: '4 Min.',
  },
  {
    slug: 'nagelpflege-zuhause',
    category: 'Pflege',
    title: 'Nagelpflege zuhause: Was wirklich funktioniert',
    excerpt: 'Unsere Nail Artists verraten, welche drei Schritte zwischen den Terminen den größten Unterschied machen.',
    date: '2026-02-14',
    readTime: '6 Min.',
  },
]

export default async function JournalPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const prefix = `/${locale}`

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28 bg-obsidian">
        <div className="container-luxury text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="label-luxury text-gold/60">Journal</span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
          <h1
            className="font-sans font-light text-ivory"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08 }}
          >
            Einblicke
          </h1>
        </div>
      </div>

      {/* Articles */}
      <div className="bg-ivory section-padding">
        <div className="container-luxury max-w-4xl">
          <div className="flex flex-col divide-y divide-ivory-dark">
            {articles.map((article) => (
              <article key={article.slug} className="py-12 group">
                <Link href={`${prefix}/journal/${article.slug}`} className="block">
                  <div className="flex items-center gap-6 mb-5">
                    <span className="label-luxury text-gold/70">{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-stone/30" aria-hidden />
                    <span className="label-luxury text-stone/40">{article.readTime}</span>
                  </div>
                  <h2 className="font-sans text-2xl md:text-3xl text-obsidian group-hover:text-gold transition-colors duration-300 mb-4 text-balance">
                    {article.title}
                  </h2>
                  <p className="font-sans text-stone/70 leading-relaxed max-w-2xl mb-6">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 label-luxury text-stone/40">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('de-CH', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <span className="font-sans group-hover:translate-x-1 transition-transform duration-300 inline-block">
                      →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>

      <BookingCTA />
    </>
  )
}
