import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-blue-800">Bienvenue chez Mirihi</h1>
        <p className="text-xl text-gray-600 mt-4">Votre partenaire en diagnostic</p>
        <Link href="/resources" className="text-blue-600 underline">
          Ressources
        </Link>
      </div>
    </div>
  );
}
