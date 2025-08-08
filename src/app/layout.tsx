import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Mirihi - Diagnostic et amélioration des processus d\'achat',
  description: 'Votre partenaire en diagnostic et amélioration des processus d\'achat. Outils avancés pour optimiser vos performances.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Extraire la locale du pathname
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'fr';

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        {children}
      </body>
    </html>
  );
}
