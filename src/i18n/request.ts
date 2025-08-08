import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async (params) => {
  const requestLocale = await params.requestLocale;
  const locale = routing.locales.includes(requestLocale as any) ? (requestLocale as string) : routing.defaultLocale;
  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});
