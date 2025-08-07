import { HeroSection } from '@/components/HeroSection';
import { ModulesSection } from '@/components/ModulesSection';
import { ServicesSection } from '@/components/ServicesSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10">
      <HeroSection />
      <ModulesSection />
      <ServicesSection />
    </div>
  );
}
