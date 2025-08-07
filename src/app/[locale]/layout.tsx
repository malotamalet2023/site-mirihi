import '../globals.css';
import SimpleHeader from '@/components/SimpleHeader';

const locales = ['en', 'es', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Params {
  locale: string;
}

interface Props {
  children: React.ReactNode;
  params: Promise<Params>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <SimpleHeader />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
