'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface CategoryResult {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: string;
  recommendations: string[];
}

interface DiagnosticResult {
  overallScore: number;
  overallPercentage: number;
  overallLevel: string;
  categories: Record<string, CategoryResult>;
  recommendedModules: string[];
  nextSteps: string[];
  strengths: string[];
  areasForImprovement: string[];
}

interface ProfessionalDiagnosticReportProps {
  result: DiagnosticResult;
  duration: string;
  questionsCount: number;
  onReset?: () => void;
}

const ProfessionalDiagnosticReport: React.FC<ProfessionalDiagnosticReportProps> = ({ 
  result, 
  duration, 
  questionsCount,
  onReset 
}) => {
  // Transformation des données pour le diagramme radar
  const radarData = Object.entries(result.categories).map(([, category]) => ({
    category: getCategoryDisplayName(category.name),
    score: Math.min(category.percentage, 100), // Limiter à 100% pour le graphique
    fullMark: 100
  }));

  // Données pour le graphique en barres des scores détaillés
  const barData = Object.entries(result.categories).map(([, category]) => ({
    name: getCategoryDisplayName(category.name),
    score: category.score,
    maxScore: category.maxScore,
    percentage: category.percentage
  }));

  // Couleurs pour les niveaux de performance
  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return '#10B981'; // Vert excellent
    if (percentage >= 60) return '#3B82F6'; // Bleu bon
    if (percentage >= 40) return '#F59E0B'; // Orange moyen
    return '#EF4444'; // Rouge faible
  };

  const getMaturityBadgeColor = (level: string) => {
    switch (level) {
      case 'Excellence': return 'bg-green-100 text-green-800 border-green-200';
      case 'Avancé': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Basique': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white">
      {/* En-tête du rapport */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Rapport de Maturité Achats MMCM
            </h1>
            <p className="text-lg text-gray-600">
              Analyse détaillée de votre organisation achats
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-2">
              Durée: {duration} • {questionsCount} questions analysées
            </div>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getMaturityBadgeColor(result.overallLevel)}`}>
              Niveau {result.overallLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Score global et visualisation radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Score global */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Globale</h2>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke={getPerformanceColor(result.overallPercentage)}
                  strokeWidth="8"
                  strokeDasharray={`${(result.overallPercentage / 100) * 351.86} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{result.overallPercentage}%</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900 mb-1">
              {result.overallScore} / {Object.values(result.categories).reduce((sum, cat) => sum + cat.maxScore, 0)} points
            </div>
            <div className="text-sm text-gray-600">
              {getMaturityDescription(result.overallPercentage)}
            </div>
          </div>
        </div>

        {/* Diagramme radar */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profil de Maturité</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="category" 
                tick={{ fontSize: 11, fill: '#374151' }}
              />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#6B7280' }}
                angle={90}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analyse détaillée par catégorie */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analyse Détaillée par Domaine</h2>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 11 }}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'score' ? `${value} points` : `${value}%`,
                  name === 'score' ? 'Score obtenu' : 'Pourcentage'
                ]}
              />
              <Bar dataKey="score" fill="#3B82F6" name="score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tableau de synthèse */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Synthèse des Résultats</h2>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domaine
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pourcentage
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(result.categories).map(([key, category]) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getCategoryDisplayName(category.name)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {category.score}/{category.maxScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    <div className="flex items-center justify-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.min(category.percentage, 100)}%`,
                            backgroundColor: getPerformanceColor(category.percentage)
                          }}
                        />
                      </div>
                      <span className="font-medium">{category.percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {category.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(category.percentage)}`}>
                      {getStatusText(category.percentage)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Points forts et axes d'amélioration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Points forts */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Points Forts Identifiés</h3>
          {getStrengthsFromCategories(result.categories).length > 0 ? (
            <div className="space-y-3">
              {getStrengthsFromCategories(result.categories).map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-green-900">{item.name}</div>
                    <div className="text-sm text-green-700">{item.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-green-700 italic">
              Aucun domaine n&apos;atteint encore le niveau d&apos;excellence (≥80%). 
              Concentrez-vous sur les améliorations prioritaires.
            </p>
          )}
        </div>

        {/* Axes d'amélioration */}
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-900 mb-4">Axes d&apos;Amélioration Prioritaires</h3>
          <div className="space-y-3">
            {getImprovementAreasFromCategories(result.categories).map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-orange-900">{item.name} ({item.percentage}%)</div>
                  <div className="text-sm text-orange-700">{item.comment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan d'action et recommandations */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Plan d&apos;Action Recommandé</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Priorité immédiate */}
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <h4 className="font-semibold text-red-900 mb-3">Priorité Immédiate (0-3 mois)</h4>
            <ul className="space-y-2 text-sm text-red-800">
              {getPriorityActions(result.categories).immediate.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>

          {/* Développement */}
          <div className="bg-white rounded-lg p-4 border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-3">Développement (3-6 mois)</h4>
            <ul className="space-y-2 text-sm text-yellow-800">
              {getPriorityActions(result.categories).medium.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>

          {/* Optimisation */}
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Optimisation (6-12 mois)</h4>
            <ul className="space-y-2 text-sm text-green-800">
              {getPriorityActions(result.categories).longTerm.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modules de formation recommandés */}
      {result.recommendedModules.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">Formation Recommandée</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.recommendedModules.map((module, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-2">{module}</h4>
                <p className="text-sm text-blue-700">{getModuleDescription(module)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bouton de reset */}
      {onReset && (
        <div className="text-center mt-8">
          <button
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Refaire le diagnostic
          </button>
        </div>
      )}
    </div>
  );
};

// Fonctions utilitaires
function getCategoryDisplayName(categoryName: string): string {
  const displayNames: Record<string, string> = {
    'Estructura y Gestión del Talento': 'Talents & Organisation',
    'Procesos y Metodologías': 'Processus & Méthodes',
    'Tecnología y Digitalización': 'Tech & Digital',
    'Gestión de Proveedores': 'Fournisseurs',
    'Estrategia y Planificación': 'Stratégie',
    'Medición y Control': 'Pilotage & Contrôle'
  };
  return displayNames[categoryName] || categoryName;
}

function getMaturityDescription(percentage: number): string {
  if (percentage >= 80) return "Organisation achats mature et performante";
  if (percentage >= 60) return "Bonnes fondations avec potentiel d'excellence";
  if (percentage >= 40) return "Structure en développement";
  return "Phase de structuration nécessaire";
}

function getStatusBadge(percentage: number): string {
  if (percentage >= 80) return 'bg-green-100 text-green-800';
  if (percentage >= 60) return 'bg-blue-100 text-blue-800';
  if (percentage >= 40) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function getStatusText(percentage: number): string {
  if (percentage >= 80) return 'Excellence';
  if (percentage >= 60) return 'Satisfaisant';
  if (percentage >= 40) return 'À améliorer';
  return 'Critique';
}

function getStrengthsFromCategories(categories: Record<string, CategoryResult>) {
  return Object.entries(categories)
    .filter(([, cat]) => cat.percentage >= 80)
    .map(([, cat]) => ({
      name: getCategoryDisplayName(cat.name),
      percentage: cat.percentage,
      comment: getStrengthComment(cat.name)
    }));
}

function getImprovementAreasFromCategories(categories: Record<string, CategoryResult>) {
  return Object.entries(categories)
    .filter(([, cat]) => cat.percentage < 70)
    .sort(([,a], [,b]) => a.percentage - b.percentage)
    .slice(0, 3)
    .map(([, cat]) => ({
      name: getCategoryDisplayName(cat.name),
      percentage: cat.percentage,
      comment: getImprovementComment(cat.name)
    }));
}

function getStrengthComment(categoryName: string): string {
  const comments: Record<string, string> = {
    'Estructura y Gestión del Talento': 'Organisation optimale des équipes achats',
    'Procesos y Metodologías': 'Processus mature et efficace',
    'Tecnología y Digitalización': 'Digitalisation avancée et performante',
    'Gestión de Proveedores': 'Excellence dans la gestion fournisseurs',
    'Estrategia y Planificación': 'Vision stratégique remarquable',
    'Medición y Control': 'Système de pilotage optimal'
  };
  return comments[categoryName] || 'Performance remarquable dans ce domaine';
}

function getImprovementComment(categoryName: string): string {
  const comments: Record<string, string> = {
    'Estructura y Gestión del Talento': 'Structurer l\'organisation et développer les compétences',
    'Procesos y Metodologías': 'Optimiser et documenter les processus',
    'Tecnología y Digitalización': 'Accélérer la transformation digitale',
    'Gestión de Proveedores': 'Développer la stratégie fournisseurs',
    'Estrategia y Planificación': 'Renforcer l\'alignement stratégique',
    'Medición y Control': 'Améliorer le système de mesure et contrôle'
  };
  return comments[categoryName] || 'Potentiel d\'amélioration significatif';
}

function getPriorityActions(categories: Record<string, CategoryResult>) {
  const weakest = Object.entries(categories)
    .sort(([,a], [,b]) => a.percentage - b.percentage)
    .slice(0, 2);

  return {
    immediate: weakest.map(([, cat]) => `Structurer ${getCategoryDisplayName(cat.name)}`),
    medium: [
      'Développer les processus existants',
      'Former les équipes aux meilleures pratiques',
      'Mettre en place des indicateurs de performance'
    ],
    longTerm: [
      'Viser l\'excellence opérationnelle',
      'Développer l\'innovation collaborative',
      'Optimiser la création de valeur'
    ]
  };
}

function getModuleDescription(moduleName: string): string {
  const descriptions: Record<string, string> = {
    'Fondamentaux des Achats': 'Maîtriser les bases et processus fondamentaux',
    'Excellence Opérationnelle': 'Optimiser la performance et l\'efficacité',
    'Transformation Digitale': 'Digitaliser et automatiser les processus',
    'Leadership Achats': 'Développer le leadership et la stratégie',
    'Innovation & Partenariats': 'Créer de la valeur par l\'innovation'
  };
  return descriptions[moduleName] || 'Formation spécialisée adaptée à vos besoins';
}

export default ProfessionalDiagnosticReport;
