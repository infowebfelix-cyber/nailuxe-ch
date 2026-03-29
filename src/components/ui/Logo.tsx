import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        'font-display font-light tracking-[0.25em] text-xl uppercase',
        className
      )}
      aria-label="Nailuxe"
    >
      Nailuxe
    </span>
  )
}
