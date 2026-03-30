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
            width: '65vw', height: '65vw',
            top: '-15%', left: '-15%',
            background: 'radial-gradient(circle, rgba(162,28,68,0.45) 0%, rgba(120,20,50,0.18) 50%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Gold glow — bottom-right */}
        <div
          className="absolute rounded-full"
          style={{
            width: '55vw', height: '55vw',
            bottom: '-10%', right: '-10%',
            background: 'radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(180,130,60,0.12) 50%, transparent 75%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Deep rose accent — center */}
        <div
          className="absolute rounded-full"
          style={{
            width: '40vw', height: '40vw',
            top: '30%', left: '40%',
            background: 'radial-gradient(circle, rgba(140,40,80,0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ── NAILUXE watermark background ── */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-sans font-medium text-ivory"
          style={{
            fontSize: 'clamp(12rem, 30vw, 36rem)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            opacity: 0.025,
            whiteSpace: 'nowrap',
            transform: 'translateX(8%)',
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
