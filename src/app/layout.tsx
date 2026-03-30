import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://nailuxe.ch'),
  title: {
    default: 'Nailuxe — Nagelstudio Gränichen',
    template: '%s — Nailuxe',
  },
  description: 'Nailuxe — Ihr Premium-Nagelstudio in Gränichen (AG). Signature, Premium und Atelier-Behandlungen. Termin einfach via WhatsApp buchen.',
  keywords: ['Nagelstudio Gränichen', 'Nagelstudio Aargau', 'Gel Nägel Gränichen', 'Maniküre Gränichen', 'Nail Salon Aarau', 'Nailuxe'],
  authors: [{ name: 'Nailuxe' }],
  creator: 'Nailuxe',
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    alternateLocale: ['fr_CH', 'en_CH'],
    url: 'https://nailuxe.ch',
    siteName: 'Nailuxe',
    title: 'Nailuxe — Nagelstudio Gränichen',
    description: 'Premium-Nagelpflege in Gränichen AG. Präzise Handwerkskunst, erstklassige Produkte.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Nailuxe — Nagelstudio Gränichen' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nailuxe — Nagelstudio Gränichen',
    description: 'Premium-Nagelpflege in Gränichen AG.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
