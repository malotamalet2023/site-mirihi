import { getTranslations, setRequestLocale } from 'next-intl/server';
import ClientAccount from '@/components/ClientAccount';

export function generateStaticParams() { return ['fr','en','es'].map(locale => ({ locale })); }

type Props = { params: Promise<{ locale: string }> };

export default async function AccountPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-mirihi-text-dark-blue">{t('account.title')}</h1>
          <p className="text-lg text-mirihi-text-grey">{t('account.enterCode')}</p>
        </div>
        <ClientAccount />
      </div>
    </div>
  );
}
