'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein.'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  message: z.string().min(10, 'Ihre Nachricht ist zu kurz.').max(1000),
})

type FormData = z.infer<typeof schema>

interface ContactFormProps {
  locale: string
}

const messages = {
  de: {
    name: 'Ihr Name',
    email: 'Ihre E-Mail-Adresse',
    message: 'Ihre Nachricht',
    submit: 'Nachricht senden',
    success: 'Vielen Dank. Wir antworten Ihnen innerhalb von 24 Stunden.',
    error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
  },
  fr: {
    name: 'Votre nom',
    email: 'Votre adresse e-mail',
    message: 'Votre message',
    submit: 'Envoyer le message',
    success: 'Merci. Nous vous répondrons dans les 24 heures.',
    error: 'Une erreur s\'est produite. Veuillez réessayer.',
  },
  en: {
    name: 'Your name',
    email: 'Your email address',
    message: 'Your message',
    submit: 'Send message',
    success: 'Thank you. We will respond within 24 hours.',
    error: 'Something went wrong. Please try again.',
  },
}

export default function ContactForm({ locale }: ContactFormProps) {
  const m = messages[locale as keyof typeof messages] ?? messages.de
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-12 text-center">
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <p className="font-display italic text-obsidian text-xl">{m.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
      <div>
        <input
          {...register('name')}
          type="text"
          placeholder={m.name}
          autoComplete="name"
          className={cn('input-luxury', errors.name && 'border-red-400')}
        />
        {errors.name && (
          <p className="mt-2 font-body text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          placeholder={m.email}
          autoComplete="email"
          className={cn('input-luxury', errors.email && 'border-red-400')}
        />
        {errors.email && (
          <p className="mt-2 font-body text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('message')}
          placeholder={m.message}
          rows={5}
          className={cn('textarea-luxury', errors.message && 'border-red-400')}
        />
        {errors.message && (
          <p className="mt-2 font-body text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-500">{m.error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary self-start flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={14} />
        {status === 'loading' ? '...' : m.submit}
      </button>
    </form>
  )
}
