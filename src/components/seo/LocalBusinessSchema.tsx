import { STUDIO } from '@/lib/constants'

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: STUDIO.name,
    description: 'Premium-Nagelstudio in Gränichen AG. Signature, Premium und Atelier-Behandlungen.',
    url: 'https://nailuxe.ch',
    telephone: STUDIO.phone,
    email: STUDIO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STUDIO.address.street,
      addressLocality: STUDIO.address.city,
      postalCode: STUDIO.address.zip,
      addressRegion: STUDIO.address.canton,
      addressCountry: STUDIO.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: STUDIO.coordinates.lat,
      longitude: STUDIO.coordinates.lng,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
    ],
    sameAs: [STUDIO.social.instagram, STUDIO.social.tiktok],
    priceRange: 'CHF 120–260',
    servesCuisine: undefined,
    image: 'https://nailuxe.ch/og-image.jpg',
    currenciesAccepted: 'CHF',
    paymentAccepted: 'Cash, Card',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
