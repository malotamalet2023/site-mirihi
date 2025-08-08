import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n-config';

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true
});

export const config = {
  matcher: ['/', '/(fr|en|es)(/.*)?', '/((?!api|_next|_vercel|favicon.ico|apple-touch-icon|.*\\..*).*)']
};
