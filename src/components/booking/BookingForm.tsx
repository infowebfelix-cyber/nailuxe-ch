'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { STUDIO } from '@/lib/constants'

type Service = 'signature' | 'premium' | 'atelier' | null

const services = [
  {
    id: 'signature' as const,
    name: 'Signature',
    tagline: 'Luxury im Alltag.',
    price: 'ab CHF 120',
    duration: '60–75 Min.',
    accent: '#8C8C8C',
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    tagline: 'Erweiterte Kunstfertigkeit.',
    price: 'ab CHF 180',
    duration: '75–90 Min.',
    accent: '#C9A96E',
  },
  {
    id: 'atelier' as const,
    name: 'Atelier',
    tagline: 'Maßgefertigte Kreation.',
    price: 'ab CHF 260',
    duration: '90–120 Min.',
    accent: '#F5F0E8',
  },
]

export default function BookingForm({ defaultService }: { defaultService?: string }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [service, setService] = useState<Service>(
    (defaultService as Service) ?? null
  )
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')

  function buildWhatsApp() {
    const svc = services.find((s) => s.id === service)
    const msg = [
      `Hallo Nailuxe! Ich möchte einen Termin buchen.`,
      ``,
      `Leistung: ${svc?.name ?? '—'} (${svc?.price ?? ''})`,
      `Name: ${name}`,
      `Wunschdatum: ${date}`,
      note ? `Anmerkung: ${note}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    return `https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  const canProceed = service !== null
  const canSubmit = name.trim().length > 1 && date.trim().length > 0

  return (
    <div className="w-full">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-10">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <button
              onClick={() => s < step && setStep(s as 1 | 2)}
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium tracking-widest transition-all duration-300',
                s === step
                  ? 'bg-gold text-obsidian'
                  : s < step
                  ? 'bg-gold/30 text-gold cursor-pointer hover:bg-gold/50'
                  : 'bg-white/[0.06] text-ivory/20 cursor-default'
              )}
            >
              {s < step ? '✓' : s}
            </button>
            {s === 1 && (
              <div
                className={cn(
                  'w-12 h-px transition-colors duration-500',
                  step > 1 ? 'bg-gold/40' : 'bg-white/[0.06]'
                )}
              />
            )}
          </div>
        ))}
        <span className="label-luxury text-ivory/30 ml-2">
          {step === 1 ? 'Leistung wählen' : 'Ihre Details'}
        </span>
      </div>

      {/* ── STEP 1: Service selection ── */}
      {step === 1 && (
        <div className="space-y-3">
          {services.map((svc) => {
            const active = service === svc.id
            return (
              <button
                key={svc.id}
                onClick={() => setService(svc.id)}
                className={cn(
                  'w-full text-left transition-all duration-200',
                  'border rounded-sm px-6 py-5 group',
                  active
                    ? 'border-gold/50 bg-gold/[0.04]'
                    : 'border-white/[0.06] hover:border-white/[0.14] bg-transparent'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className="w-5 h-px flex-shrink-0"
                        style={{ backgroundColor: svc.accent }}
                      />
                      <span
                        className={cn(
                          'font-heading text-lg transition-colors duration-200',
                          active ? 'text-ivory' : 'text-ivory/70 group-hover:text-ivory'
                        )}
                      >
                        {svc.name}
                      </span>
                    </div>
                    <p className="font-display italic text-ivory/40 text-sm ml-8">
                      {svc.tagline}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 pt-0.5">
                    <p
                      className="font-heading text-base"
                      style={{ color: active ? svc.accent : '#8C8C8C' }}
                    >
                      {svc.price}
                    </p>
                    <p className="label-luxury text-ivory/20 mt-1">{svc.duration}</p>
                  </div>
                </div>

                {/* Selection indicator */}
                <div
                  className={cn(
                    'flex items-center justify-between mt-4 pt-4 border-t border-white/[0.04] transition-all duration-200',
                    active ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <span className="label-luxury text-gold/70">Ausgewählt</span>
                  <div className="w-4 h-4 rounded-full border border-gold/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </div>
                </div>
              </button>
            )
          })}

          <div className="pt-4">
            <button
              onClick={() => canProceed && setStep(2)}
              disabled={!canProceed}
              className={cn(
                'w-full py-4 rounded-sm text-sm font-medium tracking-[0.06em] transition-all duration-200',
                canProceed
                  ? 'bg-ivory text-obsidian hover:bg-ivory/90 active:scale-[0.99]'
                  : 'bg-white/[0.04] text-ivory/20 cursor-not-allowed'
              )}
            >
              Weiter →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Details + WhatsApp ── */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Selected service recap */}
          {service && (
            <div className="flex items-center justify-between px-5 py-3 border border-gold/20 rounded-sm bg-gold/[0.03] mb-8">
              <span className="font-heading text-ivory text-sm">
                {services.find((s) => s.id === service)?.name}
              </span>
              <button
                onClick={() => setStep(1)}
                className="label-luxury text-gold/50 hover:text-gold transition-colors"
              >
                Ändern
              </button>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="label-luxury text-ivory/40 block mb-2">
                Ihr Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vorname Nachname"
                className={cn(
                  'w-full bg-transparent border border-white/[0.08] rounded-sm',
                  'px-4 py-3 text-sm text-ivory placeholder:text-ivory/20',
                  'focus:outline-none focus:border-gold/40 transition-colors duration-200'
                )}
              />
            </div>

            <div>
              <label className="label-luxury text-ivory/40 block mb-2">
                Wunschdatum *
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="z.B. Mi 15. April, nachmittags"
                className={cn(
                  'w-full bg-transparent border border-white/[0.08] rounded-sm',
                  'px-4 py-3 text-sm text-ivory placeholder:text-ivory/20',
                  'focus:outline-none focus:border-gold/40 transition-colors duration-200'
                )}
              />
            </div>

            <div>
              <label className="label-luxury text-ivory/40 block mb-2">
                Telefon / WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+41 79 000 00 00"
                className={cn(
                  'w-full bg-transparent border border-white/[0.08] rounded-sm',
                  'px-4 py-3 text-sm text-ivory placeholder:text-ivory/20',
                  'focus:outline-none focus:border-gold/40 transition-colors duration-200'
                )}
              />
            </div>

            <div>
              <label className="label-luxury text-ivory/40 block mb-2">
                Anmerkung
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Besondere Wünsche, Allergien, etc."
                rows={3}
                className={cn(
                  'w-full bg-transparent border border-white/[0.08] rounded-sm',
                  'px-4 py-3 text-sm text-ivory placeholder:text-ivory/20',
                  'focus:outline-none focus:border-gold/40 transition-colors duration-200',
                  'resize-none'
                )}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 space-y-3">
            <a
              href={buildWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center gap-3 w-full py-4 rounded-sm',
                'text-sm font-medium tracking-[0.04em] transition-all duration-200',
                canSubmit
                  ? 'bg-[#25D366] text-white hover:bg-[#1ebe5d] active:scale-[0.99]'
                  : 'bg-white/[0.04] text-ivory/20 pointer-events-none'
              )}
            >
              {/* WhatsApp icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Termin via WhatsApp anfragen
            </a>

            <p className="text-center label-luxury text-ivory/20">
              Wir antworten innerhalb von 2 Stunden · Mo–Sa 09–19 Uhr
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
