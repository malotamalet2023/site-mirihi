import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mirihi - Diagnostic et amélioration des processus d\'achat',
  description: 'Votre partenaire en diagnostic et amélioration des processus d\'achat. Outils avancés pour optimiser vos performances.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
