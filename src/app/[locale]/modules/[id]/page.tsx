import { setRequestLocale } from 'next-intl/server';
import DiagnosticModuleRegistry, { AdaptiveDiagnosticFactory } from '@/lib/diagnostic-registry';
import { locales } from '@/lib/i18n-config';
import { notFound } from 'next/navigation';
import ModuleDiagnosticRunner from '@/components/ModuleDiagnosticRunner';

export function generateStaticParams() {
  const registry = DiagnosticModuleRegistry.getInstance();
  const mods = registry.getAllModules();
  return locales.flatMap(locale => mods.map(m => ({ locale, id: m.id })));
}

type Props = { params: Promise<{ locale: string; id: string }>; searchParams?: Promise<{ strategy?: string; maxQ?: string }> };

export default async function ModuleDiagnosticPage({ params, searchParams }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const registry = DiagnosticModuleRegistry.getInstance();
  const baseModule = registry.getModule(id);
  if (!baseModule) return notFound();

  // Adapter le module via factory
  const resolvedSearchParams = await searchParams;
  const strategy = (resolvedSearchParams?.strategy as any) || 'balanced';
  const maxQuestions = Math.min(Math.max(parseInt(resolvedSearchParams?.maxQ || '12', 10) || 12, 3), baseModule.questions.length);

  let adaptedModule = baseModule;
  try {
    adaptedModule = AdaptiveDiagnosticFactory.createAdaptiveSession(id, {
      maxQuestions,
      timeLimit: 15,
      adaptationStrategy: ['performance','comprehensive','balanced'].includes(strategy) ? strategy : 'balanced',
      personalization: {}
    });
  } catch {
    // fallback baseModule
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/40 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <ModuleDiagnosticRunner moduleData={adaptedModule as any} />
      </div>
    </div>
  );
}
