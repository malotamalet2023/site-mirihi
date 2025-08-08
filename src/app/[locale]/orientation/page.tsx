import { OrientationDiagnostic } from '@/components';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/lib/i18n-config';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function OrientationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <OrientationDiagnostic autoStart />;
}
