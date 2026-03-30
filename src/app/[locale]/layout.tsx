import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnalyticsProvider from '@/components/providers/AnalyticsProvider'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'de' ? '/' : `/${locale}`,
      languages: {
        de: '/',
        fr: '/fr',
        en: '/en',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AnalyticsProvider>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </AnalyticsProvider>
    </NextIntlClientProvider>
  )
}
