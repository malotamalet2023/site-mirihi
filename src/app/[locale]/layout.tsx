import '../globals.css';
import SimpleHeader from '@/components/SimpleHeader';
import { locales } from '@/lib/i18n-config';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SimpleHeader />
          <main className="pt-20">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
