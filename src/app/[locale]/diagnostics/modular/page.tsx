import { setRequestLocale, getTranslations } from 'next-intl/server';
import DiagnosticModuleRegistry from '@/lib/diagnostic-registry';
import Link from 'next/link';
import ModuleDiagnosticRunner from '@/components/ModuleDiagnosticRunner';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return ['fr','en','es'].map(locale => ({ locale }));
}

type Props = { params: Promise<{ locale: string }>; searchParams?: Promise<{ id?: string }> };

export default async function ModularDiagnosticsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const registry = DiagnosticModuleRegistry.getInstance();
  const modules = registry.getAllModules();
  const resolvedSearchParams = await searchParams;
  const activeId = resolvedSearchParams?.id;
  const activeModule = activeId ? registry.getModule(activeId) : undefined;

  if (activeId && !activeModule) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!activeModule && (
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('modules.title')}</h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t('modules.subtitle')}</p>
          </div>
        )}

        {activeModule ? (
          <div className="max-w-4xl mx-auto">
            <Link href={`/${locale}/diagnostics/modular`} className="inline-flex items-center text-mirihi-blue-1 hover:text-mirihi-blue-2 mb-6 text-sm font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {t('diagnostic.back')}
            </Link>
            <ModuleDiagnosticRunner moduleData={activeModule} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {modules.map(mod => (
              <div key={mod.id} className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{mod.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{mod.description}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-4 mb-4">
                    <span>❓ {mod.questions.length} {t('diagnostic.questions')}</span>
                    <span>⏱️ {mod.estimatedDuration}</span>
                    <span>🗂️ {mod.category}</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link href={`/${locale}/diagnostics/modular?id=${mod.id}`} className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-mirihi-blue-1 text-white font-semibold rounded-lg hover:bg-mirihi-blue-2 transition-colors">
                    {t('resources.startDiagnostic')}
                  </Link>
                  <Link href={`/${locale}/modules/${mod.id}`} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
                    {t('diagnostic.learnMore')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
