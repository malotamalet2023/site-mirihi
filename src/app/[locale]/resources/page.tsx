import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import DiagnosticModuleRegistry from '@/lib/diagnostic-registry';
import ResourcesModulesList from '@/components/ResourcesModulesList';

export function generateStaticParams() {
  return ['fr','en','es'].map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const registry = DiagnosticModuleRegistry.getInstance();
  const modules = registry.getAllModules();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-mirihi-text-dark-blue">
            {t('resources.title')}
          </h1>
          <p className="text-xl text-mirihi-text-grey max-w-3xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-mirihi-blue-1 to-mirihi-teal text-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center">🧭 {t('modules.intelligentDiagnostic.title')}</h2>
            <p className="text-blue-50 mb-6">{t('home.description')}</p>
            <Link
              href={`/${locale}/orientation`}
              className="inline-flex items-center px-6 py-3 bg-white text-mirihi-blue-1 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow"
            >
              {t('home.startDiagnostic')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 flex items-center">📦 {t('modules.seeAllDiagnostics')}</h2>
            <p className="text-gray-600 mb-4 text-sm">{t('resources.modulesIntro')}</p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
              <li>{t('resources.tipChoose')}</li>
              <li>{t('resources.tipAdaptive')}</li>
              <li>{t('resources.tipReport')}</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6">{t('resources.diagnosticsList')}</h2>
        <ResourcesModulesList locale={locale} initialModules={modules} />
      </div>
    </div>
  );
}