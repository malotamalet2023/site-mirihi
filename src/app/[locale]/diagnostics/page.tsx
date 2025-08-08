import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DiagnosticsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const modules = [
    {
      id: 'strategic-orientation',
      title: t('resources.diagnostics.strategicOrientation.title'),
      description: t('resources.diagnostics.strategicOrientation.description'),
      icon: '🎯',
      duration: '15-20 min',
      questions: '25-30',
      color: 'blue'
    },
    {
      id: 'category-segmentation',
      title: t('resources.diagnostics.categorySegmentation.title'),
      description: t('resources.diagnostics.categorySegmentation.description'),
      icon: '📊',
      duration: '20-25 min',
      questions: '30-35',
      color: 'green'
    },
    {
      id: 'supplier-management',
      title: t('resources.diagnostics.supplierManagement.title'),
      description: t('resources.diagnostics.supplierManagement.description'),
      icon: '🤝',
      duration: '18-22 min',
      questions: '28-32',
      color: 'purple'
    },
    {
      id: 'procurement-maturity',
      title: t('resources.diagnostics.maturityMmcm.title'),
      description: t('resources.diagnostics.maturityMmcm.description'),
      icon: '📈',
      duration: '25-30 min',
      questions: '35-40',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700' },
      green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100', text: 'text-purple-600', button: 'bg-purple-600 hover:bg-purple-700' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100', text: 'text-orange-600', button: 'bg-orange-600 hover:bg-orange-700' }
    } as const;
    return (colors as any)[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header avec retour */}
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center space-x-2 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{t('diagnostic.back')}</span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('modules.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('modules.subtitle')}
            </p>
          </div>
        </div>

        {/* Diagnostic d'orientation en premier */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{t('modules.intelligentDiagnostic.title')}</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-mirihi-blue-1/20">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-mirihi-blue-1 to-mirihi-teal rounded-xl flex items-center justify-center text-3xl">
                    🧭
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{t('diagnostic.title')}</h3>
                    <p className="text-gray-600">{t('home.orientationDiagnostic')}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{t('home.description')}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>⏱️ 5-8 min</span>
                  <span>❓ 12 {t('diagnostic.questions')}</span>
                  <span>🎯 {t('diagnostic.recommendations')}</span>
                </div>
              </div>
              <div className="ml-8">
                <Link
                  href={`/${locale}/orientation`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-mirihi-blue-1 to-mirihi-teal text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  {t('home.startDiagnostic')}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Modules détaillés */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">{t('modules.seeAllDiagnostics')}</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {modules.map((module) => {
              const colors = getColorClasses(module.color);
              return (
                <div
                  key={module.id}
                  className={`${colors.bg} ${colors.border} border rounded-2xl p-6 hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`${colors.icon} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                      <p className="text-gray-700 mb-4">{module.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <span>⏱️ {module.duration}</span>
                    <span>❓ {module.questions} {t('diagnostic.questions')}</span>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/${locale}/diagnostics/modular`}
                      className={`flex-1 ${colors.button} text-white font-semibold py-2 px-4 rounded-lg transition-colors text-center`}
                    >
                      {t('resources.startDiagnostic')}
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      {t('diagnostic.learnMore')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note explicative */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">{t('modules.intelligentDiagnostic.title')}</h3>
          <p className="text-gray-700">{t('home.description')}</p>
        </div>
      </div>
    </div>
  );
}