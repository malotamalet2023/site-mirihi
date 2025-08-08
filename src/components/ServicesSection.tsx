import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface ServicesSectionProps { locale: string }

export async function ServicesSection({ locale }: ServicesSectionProps) {
  const t = await getTranslations();
  return (
    <section className="py-20 bg-gradient-to-br from-white to-mirihi-blue-1/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mirihi-text-dark-blue mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-mirihi-text-grey max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border border-gray-100 transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-mirihi-blue rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-mirihi-text-dark-blue">{t('services.resources.title')}</h3>
            </div>
            <p className="text-mirihi-text-grey mb-6 text-lg leading-relaxed">
              {t('services.resources.description')}
            </p>
            <Link 
              href={`/${locale}/resources`} 
              className="inline-flex items-center text-mirihi-blue-1 hover:text-mirihi-blue-2 font-semibold transition-colors group"
            >
              <span>{t('services.resources.cta')}</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border border-gray-100 transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-mirihi-green rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-mirihi-text-dark-blue">{t('services.account.title')}</h3>
            </div>
            <p className="text-mirihi-text-grey mb-6 text-lg leading-relaxed">
              {t('services.account.description')}
            </p>
            <Link 
              href={`/${locale}/account`} 
              className="inline-flex items-center text-mirihi-green-1 hover:text-mirihi-green-2 font-semibold transition-colors group"
            >
              <span>{t('services.account.cta')}</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
