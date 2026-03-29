import { useTranslations } from 'next-intl'

// Replace with real testimonials from CMS
const testimonials = [
  {
    id: 1,
    quote: {
      de: 'Das beste Nagelstudio, das ich je besucht habe. Die Aufmerksamkeit zum Detail ist bemerkenswert — ich fühle mich jedes Mal wie in einer anderen Welt.',
      fr: 'Le meilleur salon que j\'ai jamais visité. L\'attention aux détails est remarquable.',
      en: 'The finest nail studio I have ever visited. The attention to detail is remarkable — I feel transported every time.',
    },
    name: 'A.M.',
    descriptor: { de: 'Zürich', fr: 'Zurich', en: 'Zürich' },
    tier: 'Platine',
  },
  {
    id: 2,
    quote: {
      de: 'Nailuxe ist nicht einfach ein Termin. Es ist ein Ritual. Ich komme seit Eröffnung — und würde nirgendwo anders hingehen.',
      fr: 'Nailuxe n\'est pas simplement un rendez-vous. C\'est un rituel.',
      en: 'Nailuxe is not just an appointment. It is a ritual. I have been coming since opening and would not go anywhere else.',
    },
    name: 'S.L.',
    descriptor: { de: 'Zürich', fr: 'Zurich', en: 'Zürich' },
    tier: 'Or',
  },
  {
    id: 3,
    quote: {
      de: 'Endlich ein Studio auf dem Niveau, das diese Stadt verdient. Präzise, ruhig, und die Ergebnisse sprechen für sich.',
      fr: 'Enfin un salon au niveau que cette ville mérite.',
      en: 'Finally a studio at the level this city deserves. Precise, calm, and the results speak for themselves.',
    },
    name: 'K.B.',
    descriptor: { de: 'Basel', fr: 'Bâle', en: 'Basel' },
    tier: 'Signature',
  },
]

export default function TestimonialsSection() {
  const t = useTranslations('testimonials')

  return (
    <section className="section-padding-sm bg-ivory">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-eyebrow justify-center">
            <span className="label-luxury">{t('title')}</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="flex flex-col">
              {/* Opening quote mark */}
              <div
                className="font-display text-gold/30 select-none mb-4"
                style={{ fontSize: '5rem', lineHeight: 0.8 }}
                aria-hidden
              >
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote className="font-display font-light italic text-obsidian leading-relaxed text-lg flex-1 mb-8">
                {item.quote.de}
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-6 border-t border-ivory-dark">
                <div className="w-6 h-px bg-gold" />
                <div>
                  <p className="font-body text-sm font-medium text-obsidian">
                    {item.name}
                  </p>
                  <p className="label-luxury text-stone/60 mt-0.5">
                    {item.descriptor.de} · {item.tier}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
