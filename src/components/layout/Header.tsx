import Link from 'next/link'

// Header: German only — no language switcher
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container-luxury">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/de"
            className="pointer-events-auto font-sans text-ivory tracking-[0.2em] text-xs font-medium hover:text-ivory/60 transition-colors duration-200"
            aria-label="Nailuxe — Home"
          >
            NAILUXE
          </Link>
        </div>
      </div>
    </header>
  )
}
