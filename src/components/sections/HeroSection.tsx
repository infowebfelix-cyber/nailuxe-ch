import { useLocale } from 'next-intl'

export default function HeroSection() {
  // locale used for potential future i18n of subtitle
  useLocale()

  return (
    <section
      className="relative w-full min-h-[100dvh] flex flex-col bg-obsidian overflow-hidden"
      aria-label="Hero"
    >
      {/* Subtle noise grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.02,
        }}
      />

      {/* Right accent line */}
      <div aria-hidden className="absolute right-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none hidden lg:block" />

      {/* Content grid */}
      <div className="relative z-10 flex flex-col justify-between min-h-[100dvh] container-luxury pt-28 pb-14 md:pt-36 md:pb-16">

        {/* Spacer — header is transparent/fixed */}
        <div />

        {/* Main headline — the ONLY content */}
        <div>
          <h1
            className="font-sans font-light text-ivory"
            style={{
              fontSize: 'clamp(4.5rem, 14vw, 13rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.035em',
            }}
          >
            <span className="block">Präzision.</span>
            <span className="block" style={{ color: 'rgba(245,240,232,0.15)' }}>Nägel.</span>
          </h1>

          <p
            className="font-sans font-light mt-8 md:mt-10 max-w-xs md:max-w-sm"
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              lineHeight: 1.75,
              letterSpacing: '0.01em',
              color: 'rgba(245,240,232,0.38)',
            }}
          >
            Premium-Nagelpflege in Gränichen —<br />
            gestaltet für die Frau, die keine Kompromisse kennt.
          </p>
        </div>

        {/* Bottom — scroll marker */}
        <div className="flex items-end justify-between">
          <div />
          <div className="flex flex-col items-end gap-2" style={{ opacity: 0.2 }}>
            <span
              className="font-sans font-light text-ivory"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              01
            </span>
            <div className="w-px h-7 bg-gradient-to-b from-ivory/40 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  )
}
