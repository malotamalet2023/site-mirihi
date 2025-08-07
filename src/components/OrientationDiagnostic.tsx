'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  OrientationDiagnosticEngine, 
  DiagnosticQuestion, 
  DiagnosticResult 
} from '@/lib/orientation-diagnostic-engine';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface OrientationDiagnosticProps {
  onComplete?: (result: DiagnosticResult) => void;
  autoStart?: boolean;
}

export default function OrientationDiagnostic({ onComplete, autoStart = false }: OrientationDiagnosticProps) {
  const [engine] = useState(() => new OrientationDiagnosticEngine());
  const [currentQuestion, setCurrentQuestion] = useState<DiagnosticQuestion | null>(null);
  const [isStarted, setIsStarted] = useState(autoStart);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });

  const updateProgress = useCallback(() => {
    setProgress(engine.getProgress());
  }, [engine]);

  useEffect(() => {
    if (isStarted && !currentQuestion) {
      setCurrentQuestion(engine.getCurrentQuestion());
      updateProgress();
    }
  }, [isStarted, engine, currentQuestion, updateProgress]);

  const startDiagnostic = () => {
    setIsStarted(true);
    setCurrentQuestion(engine.getCurrentQuestion());
    updateProgress();
  };

  const handleAnswer = async (optionIndex: number) => {
    if (!currentQuestion) return;

    const success = engine.answerQuestion(currentQuestion.id, optionIndex);
    if (!success) return;

    updateProgress();

    if (engine.isCompleted()) {
      setIsCompleted(true);
      await analyzeResults();
    } else {
      setCurrentQuestion(engine.getCurrentQuestion());
    }
  };

  const analyzeResults = async () => {
    setIsAnalyzing(true);
    
    try {
      const basicResult = engine.getResults();
      
      // Appeler l'API pour l'analyse Gemini
      const response = await fetch('/api/orientation-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: basicResult.sessionId,
          answers: Array.from(engine.getAnswers().entries()).map(([id, data]) => ({
            questionId: id,
            question: data.question.question,
            category: data.question.category,
            answer: data.option.text,
            score: data.option.score
          })),
          categoryScores: basicResult.categoryScores,
          overallScore: basicResult.overallPercentage,
          strengths: basicResult.strengths,
          weaknesses: basicResult.weaknesses
        }),
      });

      if (response.ok) {
        const analysis = await response.json();
        const enhancedResult: DiagnosticResult = {
          ...basicResult,
          insights: analysis.insights || '',
          recommendations: analysis.recommendations || [],
          nextSteps: analysis.nextSteps || []
        };
        
        setResult(enhancedResult);
        onComplete?.(enhancedResult);
      } else {
        // Fallback si l'API échoue
        setResult(basicResult);
        onComplete?.(basicResult);
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
      const basicResult = engine.getResults();
      setResult(basicResult);
      onComplete?.(basicResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDiagnostic = () => {
    setIsStarted(false);
    setIsCompleted(false);
    setResult(null);
    setCurrentQuestion(null);
    setProgress({ current: 0, total: 0, percentage: 0 });
    // Créer un nouveau moteur
    window.location.reload();
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Analyse en cours...
          </h3>
          <p className="text-gray-600 mb-4">
            Notre IA analyse vos réponses et génère vos recommandations personnalisées
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              🤖 Utilisation de Gemini AI pour une analyse approfondie
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted && result) {
    return <ResultsDisplay result={result} onRestart={resetDiagnostic} />;
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Diagnostic d'Orientation Adaptatif
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                Évaluez 12 domaines clés d'excellence achats en 5 minutes avec notre IA
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center justify-center">
                  <span className="mr-2">🧠</span>
                  Diagnostic Intelligent & Adaptatif
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                    <div>
                      <p className="text-blue-800 font-semibold">Questions adaptées</p>
                      <p className="text-blue-600 text-sm">Le diagnostic s'adapte à vos réponses</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                    <div>
                      <p className="text-blue-800 font-semibold">Analyse IA</p>
                      <p className="text-blue-600 text-sm">Gemini AI analyse vos réponses</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                    <div>
                      <p className="text-blue-800 font-semibold">Recommandations</p>
                      <p className="text-blue-600 text-sm">Diagnostics personnalisés suggérés</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={startDiagnostic}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Commencer le diagnostic
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                ⏱️ Durée estimée : 5 minutes • 🎯 12 catégories d'évaluation • 📊 Analyse IA
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-gray-600">Chargement de la question suivante...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* En-tête avec progression */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Diagnostic d'Orientation
              </h2>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  Question {progress.current} sur {progress.total}
                </div>
                <div className="text-sm text-gray-500">
                  Temps estimé restant : {Math.max(1, Math.ceil((progress.total - progress.current + 1) * 0.8))} min
                </div>
              </div>
            </div>
            
            {/* Barre de progression */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-blue-700 text-sm">
                💡 <strong>Diagnostic adaptatif :</strong> Les questions suivantes s'adapteront selon vos réponses. 
                Si vous montrez des forces, nous approfondirons moins. Si nous détectons des faiblesses, nous creuserons davantage.
              </p>
            </div>
          </div>

          {/* Catégorie */}
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 group-hover:text-blue-800 transition-colors">
                      {option.text}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.score}/5 pts
                      </span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Information adaptative */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">
              🎯 <strong>Diagnostic intelligent :</strong> Ce diagnostic s'adapte en temps réel à vos réponses pour optimiser votre temps et identifier précisément vos besoins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResultsDisplayProps {
  result: DiagnosticResult;
  onRestart: () => void;
}

function ResultsDisplay({ result, onRestart }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'radar' | 'recommendations'>('overview');

  // Préparer les données pour le graphique radar
  const radarData = Object.entries(result.categoryScores).map(([category, data]: [string, any]) => ({
    category: category.length > 18 ? category.substring(0, 18) + '...' : category,
    fullCategory: category,
    score: data.percentage,
    level: data.level
  }));

  // Préparer les données pour le graphique en barres
  const barData = Object.entries(result.categoryScores)
    .map(([category, data]: [string, any]) => ({
      name: category.length > 30 ? category.substring(0, 30) + '...' : category,
      fullName: category,
      percentage: data.percentage || 0,
      score: data.score || 0,
      maxScore: data.maxScore || 0,
      level: data.level
    }))
    .sort((a, b) => b.percentage - a.percentage); // Trier par score décroissant

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête des résultats */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Résultats de votre Diagnostic d'Orientation
            </h1>
            
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {result.overallPercentage}%
                </div>
                <div className="text-sm text-gray-600">Score Global</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 capitalize">
                  {result.overallLevel}
                </div>
                <div className="text-sm text-gray-600">Niveau de Maturité</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="text-lg font-bold text-green-700">{result.strengths.length}</div>
                <div className="text-sm text-green-600">Points Forts</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl">
                <div className="text-lg font-bold text-orange-700">{result.weaknesses.length}</div>
                <div className="text-sm text-orange-600">Axes d'Amélioration</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-lg font-bold text-blue-700">{result.recommendedDiagnostics.length}</div>
                <div className="text-sm text-blue-600">Diagnostics Recommandés</div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8 pt-6">
              {[
                { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
                { id: 'radar', label: 'Graphiques', icon: '📈' },
                { id: 'recommendations', label: 'Recommandations', icon: '🎯' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  data-tab={tab.id}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && <OverviewTab result={result} setActiveTab={setActiveTab} />}
            {activeTab === 'radar' && <ChartsTab radarData={radarData} barData={barData} />}
            {activeTab === 'recommendations' && <RecommendationsTab result={result} />}
          </div>
        </div>

        {/* Actions */}
        <div className="text-center mt-8 space-x-4">
          <button
            onClick={onRestart}
            className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
          >
            Nouveau Diagnostic
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Imprimer les Résultats
          </button>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ result, setActiveTab }: { 
  result: DiagnosticResult; 
  setActiveTab: (tab: 'overview' | 'radar' | 'recommendations') => void;
}) {
  return (
    <div className="space-y-8">
      {/* Forces et Faiblesses */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            ✅ Vos Points Forts
          </h3>
          {result.strengths.length > 0 ? (
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-green-800">{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic bg-gray-50 p-4 rounded-lg">
              Aucun point fort significatif identifié. Opportunité d'amélioration globale.
            </p>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-orange-700 mb-4">
            🎯 Axes d'Amélioration
          </h3>
          {result.weaknesses.length > 0 ? (
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-center space-x-2 bg-orange-50 p-3 rounded-lg">
                  <span className="text-orange-500 font-bold">⚡</span>
                  <span className="text-orange-800">{weakness}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic bg-gray-50 p-4 rounded-lg">
              Excellente performance globale ! Continuez sur cette lancée.
            </p>
          )}
        </div>
      </div>

      {/* Insights IA */}
      {result.insights && result.insights.trim() && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                Analyse Experte par Intelligence Artificielle
                <span className="ml-2 text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Gemini AI</span>
              </h3>
              <p className="text-sm text-purple-600 font-medium mb-4">
                Analyse contextuelle enrichie avec recherche sur les tendances achats actuelles
              </p>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-purple-100">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {result.insights}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span>Recherche contextuelle avec benchmarks sectoriels</span>
                </div>
                <button 
                  onClick={() => setActiveTab('recommendations')}
                  className="text-sm bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Voir l'analyse complète →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Détail des scores par catégorie */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📈 Détail par Catégorie
        </h3>
        <div className="grid gap-4">
          {Object.entries(result.categoryScores).map(([category, data]: [string, any]) => (
            <div key={category} className="border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800">{category}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    data.percentage >= 80 ? 'bg-green-100 text-green-800' :
                    data.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    data.percentage >= 40 ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {data.level}
                  </span>
                  <span className="font-bold text-gray-700">{data.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    data.percentage >= 80 ? 'bg-green-500' :
                    data.percentage >= 60 ? 'bg-yellow-500' :
                    data.percentage >= 40 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartsTab({ radarData, barData }: { radarData: any[], barData: any[] }) {
  return (
    <div className="space-y-8">
      {/* Graphique Radar */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🎯 Graphique Radar - Vue d'ensemble
        </h3>
        <div className="bg-gray-50 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={450}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip 
                formatter={(value: any, name: any, props: any) => [
                  `${value}%`, 
                  props.payload.fullCategory
                ]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Graphique en Barres */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📊 Graphique en Barres - Détail des scores
        </h3>
        <div className="bg-gray-50 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={barData} 
              layout="vertical" 
              margin={{ left: 180, right: 30, top: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={170}
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <Tooltip 
                formatter={(value: any) => [
                  `${value}%`, 
                  'Score'
                ]}
                labelFormatter={(label) => label}
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="percentage" 
                fill="#3b82f6" 
                radius={[0, 4, 4, 0]}
                name="Score"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function RecommendationsTab({ result }: { result: DiagnosticResult }) {
  return (
    <div className="space-y-8">
      {/* Analyse Approfondie IA Gemini */}
      {result.insights && result.insights.trim() && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                🤖 Analyse Approfondie par Intelligence Artificielle
              </h3>
              <p className="text-sm text-purple-600 font-medium">
                Analyse contextuelle enrichie avec recherche sur les tendances actuelles
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              {result.insights}
            </p>
          </div>
          
          <div className="mt-4 flex items-center space-x-2 text-sm text-purple-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Analyse générée par Gemini AI avec contexte sectoriel et tendances 2025</span>
          </div>
        </div>
      )}

      {/* Diagnostics Recommandés */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🎯 Diagnostics Recommandés pour Vous
        </h3>
        {result.recommendedDiagnostics.length > 0 ? (
          <div className="grid gap-4">
            {result.recommendedDiagnostics.map((diagnostic, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">{diagnostic.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    diagnostic.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    diagnostic.priority === 'important' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {diagnostic.priority}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{diagnostic.reason}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Commencer ce diagnostic
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic bg-gray-50 p-4 rounded-lg">
            Aucun diagnostic spécifique requis. Votre niveau est satisfaisant dans tous les domaines.
          </p>
        )}
      </div>

      {/* Recommandations IA */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💡 Recommandations Personnalisées
          </h3>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </span>
                <p className="text-blue-800">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prochaines Étapes */}
      {result.nextSteps && result.nextSteps.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🚀 Prochaines Étapes Suggérées
          </h3>
          <div className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 bg-green-50 p-4 rounded-lg">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </span>
                <p className="text-green-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
