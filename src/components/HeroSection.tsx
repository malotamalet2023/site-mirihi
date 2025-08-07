import { getTranslations } from 'next-intl/server';

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative bg-gradient-to-br from-mirihi-blue-1 via-mirihi-blue-2 to-mirihi-teal text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mirihi-lime-1/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mirihi-green-1/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-mirihi-lime-1 drop-shadow-lg">{t('home.title')}</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {t('home.subtitle')}
              </p>
              <p className="text-lg mb-8 text-blue-200 max-w-4xl mx-auto leading-relaxed">
                {t('home.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
