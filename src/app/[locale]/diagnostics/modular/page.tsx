import { ModularDiagnosticInterface } from '@/components';
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function ModularDiagnosticsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <ModularDiagnosticInterface />
    </div>
  );
}
