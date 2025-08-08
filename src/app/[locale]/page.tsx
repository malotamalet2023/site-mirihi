import { HeroSection } from '@/components/HeroSection';
import { ModulesSection } from '@/components/ModulesSection';
import { ServicesSection } from '@/components/ServicesSection';
import { locales } from '@/lib/i18n-config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: { locale: string } };

export default async function HomePage({ params }: Props) {
  const { locale } = params;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10">
      <HeroSection />
      <ModulesSection params={{ locale }} />
      <ServicesSection />
    </div>
  );
}
