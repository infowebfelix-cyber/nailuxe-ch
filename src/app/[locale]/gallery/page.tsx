import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import GalleryCanvas from '@/components/sections/GalleryCanvas'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Galerie — Nailuxe',
    description:
      'Kunstfertigkeit, die für sich spricht. Entdecken Sie unsere exklusiven Nailuxe-Designs — von Signature bis Atelier.',
  }
}

export default async function GalleryPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  return <GalleryCanvas />
}
