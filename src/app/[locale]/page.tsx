import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import PhilosophySection from '@/components/sections/PhilosophySection'
import GalleryTeaser from '@/components/sections/GalleryTeaser'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import StudioTeaser from '@/components/sections/StudioTeaser'
import BookingCTA from '@/components/sections/BookingCTA'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' })
  return { title: t('title'), description: t('description') }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <PhilosophySection />
      <GalleryTeaser />
      <TestimonialsSection />
      <StudioTeaser />
      <BookingCTA />
    </>
  )
}
