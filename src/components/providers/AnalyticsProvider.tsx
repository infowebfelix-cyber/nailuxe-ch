'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Lightweight analytics provider — extend with GA4 / Mixpanel as needed
export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    // Page view tracking — GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '', {
        page_path: pathname,
      })
    }
  }, [pathname])

  return <>{children}</>
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
