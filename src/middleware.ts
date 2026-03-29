import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['de', 'fr', 'en'],
  defaultLocale: 'de',
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
