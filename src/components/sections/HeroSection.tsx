'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const prefix = `/${locale}`
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.65
    }
  }, [])

  return (
    <section
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background — replace src with actual brand video or image */}
      <div className="absolute inset-0 bg-obsidian">
        {/* Placeholder gradient until real media is added */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1A1A1A 0%, #2C2420 40%, #1A1A1A 100%)',
          }}
        />
        {/* Gold grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container-luxury flex flex-col items-center text-center">
        {/* Eyebrow label */}
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="w-10 h-px bg-gold/60" />
          <span className="label-luxury text-ivory/50 tracking-[0.3em]">
            Zürich
          </span>
          <div className="w-10 h-px bg-gold/60" />
        </div>

        {/* Main tagline */}
        <h1
          className="font-display font-light text-ivory text-balance animate-fade-up"
          style={{
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            animationDelay: '0.2s',
            animationFillMode: 'both',
          }}
        >
          {t('tagline').split('. ').map((part, i, arr) => (
            <span key={i}>
              {part}{i < arr.length - 1 ? '.' : ''}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Gold divider */}
        <div
          className="w-12 h-px bg-gold my-8 animate-fade-in"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        />

        {/* Subtitle */}
        <p
          className="font-display font-light italic text-ivory/60 animate-fade-in"
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            animationDelay: '0.6s',
            animationFillMode: 'both',
          }}
        >
          {t('subtitle')}
        </p>

        {/* CTA */}
        <div
          className="mt-12 animate-fade-up"
          style={{ animationDelay: '0.85s', animationFillMode: 'both' }}
        >
          <Link href={`${prefix}/book`} className="btn-outline-ivory">
            {t('cta')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in-slow z-10"
        style={{ animationDelay: '1.5s', animationFillMode: 'both' }}
      >
        <span className="label-luxury text-ivory/30 tracking-[0.25em]">
          {t('scroll')}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
