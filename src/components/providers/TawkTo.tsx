'use client'

import { useEffect } from 'react'

// Set these in .env.local:
//   NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
//   NEXT_PUBLIC_TAWK_WIDGET_ID=default   (or your widget id)
const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? 'default'

export default function TawkTo() {
  useEffect(() => {
    if (!PROPERTY_ID) return
    if (typeof window === 'undefined') return
    if (document.getElementById('tawkto-script')) return

    // Tawk.to standard embed
    ;(window as any).Tawk_API = (window as any).Tawk_API || {}
    ;(window as any).Tawk_LoadStart = new Date()

    const s1 = document.createElement('script')
    s1.id = 'tawkto-script'
    s1.async = true
    s1.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')

    const s0 = document.getElementsByTagName('script')[0]
    s0.parentNode?.insertBefore(s1, s0)
  }, [])

  return null
}
