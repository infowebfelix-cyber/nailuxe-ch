import type { Metadata } from 'next'
import { Cormorant_Garamond, Playfair_Display, Inter } from 'next/font/google'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nailuxe.ch'),
  title: {
    default: 'Nailuxe — Zürichs feinstes Nagelstudio',
    template: '%s — Nailuxe',
  },
  description: 'Luxuriöse Nagelpflege in Zürich. Präzise Handwerkskunst, erstklassige Produkte und ein Erlebnis, das Sie nie vergessen werden.',
  keywords: ['Nagelstudio Zürich', 'Luxus Nagelstudio', 'Gel Nägel Zürich', 'Nail Salon Zurich', 'Nageldesign'],
  authors: [{ name: 'Nailuxe' }],
  creator: 'Nailuxe',
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    alternateLocale: ['fr_CH', 'en_CH'],
    url: 'https://nailuxe.ch',
    siteName: 'Nailuxe',
    title: 'Nailuxe — Zürichs feinstes Nagelstudio',
    description: 'Luxuriöse Nagelpflege in Zürich. Präzise Handwerkskunst, erstklassige Produkte.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nailuxe — Zürichs feinstes Nagelstudio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nailuxe — Zürichs feinstes Nagelstudio',
    description: 'Luxuriöse Nagelpflege in Zürich.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
