import '../globals.css';
import SimpleHeader from '@/components/SimpleHeader';
import { locales } from '@/lib/i18n-config';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = params;

  if (!locales.includes(locale as any)) {
    console.error('[i18n] Locale invalide:', locale);
    notFound();
  }

  let messages;
  try {
    console.log('[i18n] Chargement messages pour', locale);
    messages = (await import(`@/messages/${locale}.json`)).default;
    if (!messages || Object.keys(messages).length === 0) {
      console.error('[i18n] Fichier de messages vide pour', locale);
      notFound();
    }
  } catch (e) {
    console.error('[i18n] Erreur import messages', locale, e);
    notFound();
  }

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
