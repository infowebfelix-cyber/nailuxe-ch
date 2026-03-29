import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // INTEGRATION POINT: Send via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: process.env.RESEND_FROM_EMAIL!,
    //   to: 'hello@nailuxe.ch',
    //   subject: `Neue Kontaktanfrage von ${data.name}`,
    //   text: `Name: ${data.name}\nE-Mail: ${data.email}\n\n${data.message}`,
    // })

    // Log for now — replace with real email send above
    console.log('Contact form submission:', { name: data.name, email: data.email })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ungültige Eingabe.' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 })
  }
}
