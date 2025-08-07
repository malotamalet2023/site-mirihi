'use client';

import Link from 'next/link';

export default function ResourcesPage() {
  const diagnostics = [
    {
      id: 'orientation',
      title: 'Diagnostic d&apos;Orientation',
      description: 'Identifiez vos besoins spécifiques avec notre diagnostic adaptatif intelligent en 5 minutes.',
      duration: '5 min',
      level: 'Tous niveaux',
      status: 'Disponible',
      color: 'blue',
      href: '/fr/orientation-diagnostic'
    },
    {
      id: 'strategic-orientation',
      title: 'Orientation Stratégique',
      description: 'Évaluez l&apos;alignement de votre stratégie achats avec les objectifs d&apos;entreprise.',
      duration: '8-10 min',
      level: 'Intermédiaire',
      status: 'Bientôt disponible',
      color: 'green',
      href: '#'
    },
    {
      id: 'supplier-management',
      title: 'Gestion Fournisseurs',
      description: 'Analysez votre approche de la gestion des relations fournisseurs et du SRM.',
      duration: '10-12 min',
      level: 'Avancé',
      status: 'Bientôt disponible',
      color: 'purple',
      href: '#'
    },
    {
      id: 'category-segmentation',
      title: 'Segmentation Kraljic',
      description: 'Optimisez votre matrice de segmentation des catégories d&apos;achats.',
      duration: '12-15 min',
      level: 'Expert',
      status: 'Bientôt disponible',
      color: 'orange',
      href: '#'
    },
    {
      id: 'maturity-mmcm',
      title: 'Maturité MMCM',
      description: 'Évaluation complète de la maturité de votre fonction achats selon le modèle MMCM.',
      duration: '15-20 min',
      level: 'Tous niveaux',
      status: 'Bientôt disponible',
      color: 'red',
      href: '#'
    },
    {
      id: 'performance-measurement',
      title: 'Mesure de Performance',
      description: 'Analysez vos KPIs et tableaux de bord achats pour optimiser la performance.',
      duration: '8-10 min',
      level: 'Intermédiaire',
      status: 'Bientôt disponible',
      color: 'teal',
      href: '#'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'from-blue-500 to-blue-600',
        border: 'border-blue-200',
        text: 'text-blue-600',
        bgLight: 'bg-blue-50'
      },
      green: {
        bg: 'from-green-500 to-green-600',
        border: 'border-green-200',
        text: 'text-green-600',
        bgLight: 'bg-green-50'
      },
      purple: {
        bg: 'from-purple-500 to-purple-600',
        border: 'border-purple-200',
        text: 'text-purple-600',
        bgLight: 'bg-purple-50'
      },
      orange: {
        bg: 'from-orange-500 to-orange-600',
        border: 'border-orange-200',
        text: 'text-orange-600',
        bgLight: 'bg-orange-50'
      },
      red: {
        bg: 'from-red-500 to-red-600',
        border: 'border-red-200',
        text: 'text-red-600',
        bgLight: 'bg-red-50'
      },
      teal: {
        bg: 'from-teal-500 to-teal-600',
        border: 'border-teal-200',
        text: 'text-teal-600',
        bgLight: 'bg-teal-50'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-mirihi-blue-1/10">
      {/* En-tête */}
      <section className="bg-gradient-to-br from-mirihi-blue-1 via-mirihi-blue-2 to-mirihi-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="text-mirihi-lime-1">Ressources</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100 max-w-3xl mx-auto">
              Découvrez notre collection de diagnostics spécialisés pour optimiser votre fonction achats
            </p>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto">
              Chaque diagnostic est basé sur les meilleures pratiques et adapté à votre niveau de maturité
            </p>
          </div>
        </div>
      </section>

      {/* Grille des diagnostics */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            
            {/* Diagnostic d'orientation mis en avant */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">🎯 Diagnostic d&apos;Orientation - Recommandé</h2>
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    Gratuit
                  </span>
                </div>
                <p className="text-blue-100 mb-6 text-lg">
                  Commencez ici ! Notre diagnostic adaptatif évalue 12 domaines clés des achats modernes 
                  et vous recommande les diagnostics les plus pertinents pour votre situation.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      5 minutes
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      IA Gemini
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Adaptatif
                    </span>
                  </div>
                  <Link 
                    href="/fr/orientation-diagnostic"
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Commencer maintenant
                  </Link>
                </div>
              </div>
            </div>

            {/* Autres diagnostics */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Diagnostics Spécialisés
              </h2>
              <p className="text-gray-600 mb-8">
                Des diagnostics approfondis pour chaque aspect de votre fonction achats
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diagnostics.slice(1).map((diagnostic) => {
                const colors = getColorClasses(diagnostic.color);
                const isAvailable = diagnostic.status === 'Disponible';
                
                return (
                  <div 
                    key={diagnostic.id}
                    className={`bg-white rounded-2xl border-2 ${colors.border} hover:shadow-lg transition-all duration-300 overflow-hidden ${
                      !isAvailable ? 'opacity-75' : 'hover:-translate-y-1'
                    }`}
                  >
                    <div className={`h-2 bg-gradient-to-r ${colors.bg}`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">
                          {diagnostic.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {diagnostic.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {diagnostic.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {diagnostic.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {diagnostic.level}
                          </div>
                        </div>
                      </div>
                      
                      {isAvailable ? (
                        <Link
                          href={diagnostic.href}
                          className={`w-full bg-gradient-to-r ${colors.bg} text-white text-center py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity block`}
                        >
                          Commencer
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-200 text-gray-500 text-center py-3 rounded-xl font-semibold cursor-not-allowed"
                        >
                          Bientôt disponible
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Information */}
            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                📚 Développement en cours
              </h3>
              <p className="text-blue-700">
                Nous travaillons activement sur les diagnostics spécialisés. Commencez par le diagnostic d&apos;orientation 
                qui vous guidera vers les modules les plus pertinents pour votre situation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}