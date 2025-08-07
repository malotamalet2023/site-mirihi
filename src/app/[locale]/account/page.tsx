'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Codes d'accès valides (en production, ceci serait géré côté serveur)
  const validCodes = ['MIRIHI2025', 'DEMO123', 'ADMIN'];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'une vérification
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (validCodes.includes(accessCode.toUpperCase())) {
      setIsLoggedIn(true);
      localStorage.setItem('mirihi_access_code', accessCode.toUpperCase());
    } else {
      setError('Code d\'accès invalide');
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessCode('');
    localStorage.removeItem('mirihi_access_code');
  };

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const savedCode = localStorage.getItem('mirihi_access_code');
    if (savedCode && validCodes.includes(savedCode)) {
      setIsLoggedIn(true);
      setAccessCode(savedCode);
    }
  }, [validCodes]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10">
        <div className="flex items-center justify-center min-h-screen py-12">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Accès à Mon Compte
                </h1>
                <p className="text-gray-600">
                  Entrez votre code d&apos;accès pour consulter vos diagnostics
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Code d&apos;accès
                  </label>
                  <input
                    type="text"
                    id="accessCode"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Entrez votre code"
                    required
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Vérification...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </button>
              </form>

              <div className="mt-8 border-t pt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">
                    💡 Codes de démonstration
                  </h3>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p><code className="bg-blue-100 px-2 py-1 rounded">DEMO123</code> - Accès démonstration</p>
                    <p><code className="bg-blue-100 px-2 py-1 rounded">MIRIHI2025</code> - Accès complet</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link 
                  href="/fr" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ← Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10">
      {/* En-tête */}
      <section className="bg-gradient-to-br from-mirihi-blue-1 via-mirihi-blue-2 to-mirihi-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mon <span className="text-mirihi-lime-1">Compte</span>
              </h1>
              <p className="text-xl text-blue-100">
                Bienvenue ! Accès avec le code : <span className="font-mono bg-blue-700 px-2 py-1 rounded">{accessCode}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-medium transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            
            {/* Navigation */}
            <div className="mb-8">
              <nav className="flex space-x-8">
                <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-semibold">
                  Mes Diagnostics
                </button>
                <button className="text-gray-500 hover:text-gray-700 pb-2">
                  Progression
                </button>
                <button className="text-gray-500 hover:text-gray-700 pb-2">
                  Recommandations
                </button>
              </nav>
            </div>

            {/* Diagnostics disponibles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Diagnostic d&apos;Orientation</h3>
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                    Disponible
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Diagnostic adaptatif intelligent pour identifier vos besoins spécifiques.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    5 minutes
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    IA Gemini
                  </div>
                </div>
                <Link
                  href="/fr/orientation-diagnostic"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors block"
                >
                  Commencer le diagnostic
                </Link>
              </div>

              {/* Diagnostics futurs */}
              {[
                { name: 'Orientation Stratégique', status: 'Bientôt', color: 'gray' },
                { name: 'Gestion Fournisseurs', status: 'Bientôt', color: 'gray' },
                { name: 'Segmentation Kraljic', status: 'Bientôt', color: 'gray' },
                { name: 'Maturité MMCM', status: 'Bientôt', color: 'gray' },
                { name: 'Mesure Performance', status: 'Bientôt', color: 'gray' }
              ].map((diagnostic, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-6 opacity-75">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{diagnostic.name}</h3>
                    <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                      {diagnostic.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Diagnostic spécialisé en cours de développement.
                  </p>
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 text-center py-3 rounded-xl font-semibold cursor-not-allowed"
                  >
                    Bientôt disponible
                  </button>
                </div>
              ))}
            </div>

            {/* Historique */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Historique des Diagnostics
              </h2>
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Aucun diagnostic effectué
                </h3>
                <p className="text-gray-600 mb-6">
                  Commencez par le diagnostic d&apos;orientation pour voir vos résultats ici.
                </p>
                <Link
                  href="/fr/orientation-diagnostic"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Commencer mon premier diagnostic
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}