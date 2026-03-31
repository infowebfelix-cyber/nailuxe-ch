export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[100dvh] flex flex-col bg-obsidian overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Glow blobs — ruby + gold, like gridonic's color orbs ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ruby glow — top-left */}
        <div
          className="absolute rounded-full"
          style={{
            width: '60vw', height: '60vw',
            top: '-18%', left: '-18%',
            background: 'radial-gradient(circle, rgba(224,17,95,0.38) 0%, rgba(160,13,68,0.14) 50%, transparent 75%)',
            filter: 'blur(72px)',
          }}
        />
        {/* Gold glow — bottom-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: '50vw', height: '50vw',
            bottom: '-8%', right: '-12%',
            background: 'radial-gradient(circle, rgba(201,169,110,0.22) 0%, rgba(148,107,45,0.08) 50%, transparent 75%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Deep ruby accent — center-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: '35vw', height: '35vw',
            top: '28%', left: '42%',
            background: 'radial-gradient(circle, rgba(160,13,68,0.16) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* ── NAILUXE watermark background ── */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ contain: 'strict' }}
      >
        <span
          className="font-sans font-medium text-ivory"
          style={{
            /* 24vw ≈ fills viewport width at all breakpoints — no hard min floor */
            fontSize: 'clamp(4rem, 24vw, 32rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            opacity: 0.022,
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          NAILUXE
        </span>
      </div>

      {/* ── Noise grain ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col justify-between min-h-[100dvh] container-luxury pt-28 pb-14 md:pt-36 md:pb-16">

        {/* Top spacer */}
        <div />

        {/* Headline — vertically centered */}
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
              fontSize: 'clamp(0.825rem, 1.15vw, 0.925rem)',
              lineHeight: 1.8,
              letterSpacing: '0.01em',
              color: 'rgba(245,240,232,0.36)',
            }}
          >
            Premium-Nagelpflege in Gränichen —<br />
            gestaltet für die Frau, die keine Kompromisse kennt.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="flex items-end justify-end">
          <div className="flex flex-col items-end gap-2" style={{ opacity: 0.18 }}>
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
