import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import BookingCTA from '@/components/sections/BookingCTA'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' })
  return { title: t('title'), description: t('description') }
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <BookingCTA />
    </>
  )
}
