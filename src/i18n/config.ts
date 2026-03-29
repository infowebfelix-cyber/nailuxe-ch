export const locales = ['de', 'fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'de'

// All locales prefixed: /de/, /fr/, /en/
export const localePrefix = 'always' as const

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  fr: 'Français',
  en: 'English',
}

export const localeFlags: Record<Locale, string> = {
  de: 'DE',
  fr: 'FR',
  en: 'EN',
}
