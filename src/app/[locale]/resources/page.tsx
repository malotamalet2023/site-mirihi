import { getTranslations } from 'next-intl/server';

type Props = { params: { locale: string } };

export default async function ResourcesPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10">
      {/* En-tête */}
      <section className="bg-gradient-to-br from-mirihi-blue-1 via-mirihi-blue-2 to-mirihi-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-mirihi-lime-1">{t('resources.title')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100 max-w-3xl mx-auto">
              {t('resources.subtitle')}
            </p>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto">
              {t('resources.comingSoon')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}