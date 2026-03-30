export const STUDIO = {
  name: 'Nailuxe',
  tagline: 'Präzision. Eleganz. Pflege.',
  email: 'info@nailuxe.ch',
  phone: '+41 76 628 71 71',
  whatsapp: '41766287171',
  address: {
    street: 'Lindenplatz 7',
    city: 'Gränichen',
    zip: '5722',
    canton: 'AG',
    country: 'Schweiz',
    countryCode: 'CH',
  },
  hours: {
    'Mo–Fr': '09:00–19:00',
    'Sa': '09:00–18:00',
    'So': 'Geschlossen',
  },
  social: {
    instagram: 'https://instagram.com/nailuxe.ch',
    tiktok: 'https://tiktok.com/@nailuxe.ch',
  },
  coordinates: {
    lat: 47.3609,
    lng: 8.1078,
  },
} as const

export const SERVICE_TIERS = [
  {
    id: 'signature',
    name: 'Signature',
    priceFrom: 120,
    durationMin: 60,
    durationMax: 75,
    color: '#8C8C8C',
  },
  {
    id: 'premium',
    name: 'Premium',
    priceFrom: 180,
    durationMin: 75,
    durationMax: 90,
    color: '#C9A96E',
  },
  {
    id: 'atelier',
    name: 'Atelier',
    priceFrom: 260,
    durationMin: 90,
    durationMax: 120,
    color: '#1A1A1A',
  },
] as const

export const LOYALTY_TIERS = [
  { id: 'blanc', name: 'Blanc', threshold: 1 },
  { id: 'or', name: 'Or', threshold: 5 },
  { id: 'platine', name: 'Platine', threshold: 12 },
] as const

export const GIFT_AMOUNTS = [120, 180, 260, 350] as const
