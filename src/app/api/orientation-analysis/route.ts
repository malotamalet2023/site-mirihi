import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Configuration API avec support de multiples variables d'environnement
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || 
                process.env.GOOGLE_GEMINI_API_KEY || 
                process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ Clé API Gemini non configurée. L\'analyse IA utilisera le fallback.');
}

// Initialisation du client Google GenAI pour Gemini 2.5 Flash avec Google Search
let genAI: GoogleGenAI | null = null;
try {
  genAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;
} catch (error) {
  console.error('❌ Erreur d\'initialisation Google GenAI:', error);
}

// Types et interfaces
interface CategoryScore {
  score: number;
  maxScore: number;
  percentage: number;
  level: string;
}

interface DiagnosticData {
  overallScore: number;
  categoryScores: Record<string, CategoryScore>;
  answers: Record<string, any>;
  timestamp: string;
}

interface AIAnalysisResult {
  insights: string;
  recommendations: string[];
  priorityActions: string[];
  industryBenchmark: string;
  resourceSuggestions: string[];
  roadmapSuggestions: string[];
}

// Fonctions utilitaires avancées
function getMaturityLevel(score: number): string {
  if (score >= 85) return 'Expert';
  if (score >= 70) return 'Avancé';
  if (score >= 55) return 'Intermédiaire+';
  if (score >= 40) return 'Intermédiaire';
  if (score >= 25) return 'Débutant+';
  return 'Débutant';
}

function formatCategoryName(category: string): string {
  const categoryMappings: Record<string, string> = {
    'engagementDirection': 'Engagement Direction & Stratégie',
    'relationsPartenaires': 'Relations avec Partenaires Internes',
    'gestionCategories': 'Gestion par Catégories',
    'collaborationInnovation': 'Collaboration et Innovation Fournisseurs',
    'organisationProcessus': 'Organisation et Processus',
    'gestionContrats': 'Gestion des Contrats',
    'sourcingStrategique': 'Sourcing Stratégique',
    'gestionRisques': 'Gestion des Risques',
    'gestionTalents': 'Gestion des Talents',
    'achatsResponsables': 'Achats Responsables',
    'digitalisationAchats': 'Digitalisation des Achats',
    'gestionPerformance': 'Gestion de la Performance'
  };
  
  return categoryMappings[category] || category
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();;
}

function getPerformanceIndicator(score: number): string {
  if (score >= 80) return '🟢 Excellent';
  if (score >= 65) return '🟡 Bon';
  if (score >= 50) return '🟠 Satisfaisant';
  if (score >= 35) return '🔴 À améliorer';
  return '❌ Critique';
}

function generateContextualPrompt(data: DiagnosticData): string {
  const { overallScore, categoryScores } = data;
  
  // Analyse des domaines critiques et excellents
  const categoryAnalysis = Object.entries(categoryScores)
    .map(([category, score]) => ({
      name: formatCategoryName(category),
      percentage: score.percentage,
      level: score.level
    }))
    .sort((a, b) => b.percentage - a.percentage);
  
  const excellentDomains = categoryAnalysis.filter(c => c.percentage >= 75);
  const goodDomains = categoryAnalysis.filter(c => c.percentage >= 50 && c.percentage < 75);
  const criticalDomains = categoryAnalysis.filter(c => c.percentage < 50);
  
  const prompt = `Tu es un consultant senior expert en procurement et achats stratégiques avec plus de 15 ans d'expérience. 
  
Tu analyses le diagnostic d'orientation achats d'un professionnel qui a obtenu un score global de ${overallScore}% (niveau ${getMaturityLevel(overallScore)}).

ANALYSE DÉTAILLÉE PAR DOMAINE:

Domaines d'excellence (≥75%):
${excellentDomains.map(d => `• ${d.name}: ${d.percentage}% (${d.level})`).join('\n') || 'Aucun domaine d\'excellence identifié'}

Domaines satisfaisants (50-74%):
${goodDomains.map(d => `• ${d.name}: ${d.percentage}% (${d.level})`).join('\n') || 'Aucun domaine satisfaisant'}

Domaines à améliorer (<50%):
${criticalDomains.map(d => `• ${d.name}: ${d.percentage}% (${d.level})`).join('\n') || 'Aucun domaine critique'}

MISSION AVEC RECHERCHE CONTEXTUALISÉE:
Utilise Google Search pour rechercher les dernières tendances en procurement et achats ${new Date().getFullYear()}, 
les meilleures pratiques actuelles, les benchmarks de performance, et les innovations technologiques en cours.

Recherche spécifiquement :
- "meilleures pratiques achats ${new Date().getFullYear()}" 
- "transformation digitale procurement tendances"
- "ESG achats responsables nouvelles réglementations"
- "KPIs performance achats modernes"
- "technologies émergentes supply chain"

Intègre ces informations actualisées dans ton analyse pour fournir des recommandations ultra-pertinentes.

Génère une analyse JSON structurée avec:
{
  "insights": "Analyse qualitative personnalisée de 250-350 mots intégrant les dernières tendances trouvées via recherche Google",
  "recommendations": ["3-4 recommandations basées sur les meilleures pratiques actuelles trouvées en ligne"],
  "priorityActions": ["3 actions prioritaires 30-90 jours utilisant les outils/méthodologies les plus récents"],
  "industryBenchmark": "Positionnement vs standards actuels avec références aux leaders du marché trouvés en ligne",
  "resourceSuggestions": ["3-4 ressources/outils/formations les plus récents et pertinents trouvés via recherche"],
  "roadmapSuggestions": ["3-4 étapes évolution 6-12 mois alignées sur les tendances sectorielles actuelles"]
}
  "roadmapSuggestions": ["3-4 étapes d'évolution sur 6-12 mois intégrant les technologies et pratiques émergentes"]
}

Assure-toi que l'analyse soit:
- Personnalisée selon le profil spécifique
- Orientée business et ROI avec données quantifiées quand possible
- Basée sur les meilleures pratiques et technologies 2025
- Actionnable et pragmatique avec des étapes concrètes
- Professionnelle mais accessible
- Enrichie par des références sectorielles actuelles`;

  return prompt;
}

async function performGeminiAnalysis(data: DiagnosticData): Promise<AIAnalysisResult> {
  if (!genAI) {
    throw new Error('Service Gemini non disponible');
  }

  try {
    // Configuration du grounding tool pour Google Search
    const groundingTool = {
      googleSearch: {},
    };

    // Configuration de génération avec Google Search
    const config = {
      tools: [groundingTool],
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    };

    const prompt = generateContextualPrompt(data);
    console.log('🚀 Envoi de la requête à Gemini 2.5 Flash avec Google Search...');
    
    // Utilisation de la nouvelle API avec Google Search intégré
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config,
    });

    const text = response.text || '';
    console.log('📄 Réponse Gemini avec recherche Google reçue:', text.substring(0, 200) + '...');

    // Extraction et validation du JSON
    let analysisResult: AIAnalysisResult;
    
    try {
      // Nettoyage de la réponse pour extraire le JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Format JSON non trouvé dans la réponse');
      }
      
      const jsonText = jsonMatch[0];
      const parsedResult = JSON.parse(jsonText);
      
      // Validation et enrichissement des données
      analysisResult = {
        insights: parsedResult.insights || 'Analyse non disponible',
        recommendations: Array.isArray(parsedResult.recommendations) 
          ? parsedResult.recommendations 
          : ['Recommandations en cours de génération'],
        priorityActions: Array.isArray(parsedResult.priorityActions) 
          ? parsedResult.priorityActions 
          : ['Actions prioritaires en cours d\'identification'],
        industryBenchmark: parsedResult.industryBenchmark || 'Benchmark sectoriel en cours d\'analyse',
        resourceSuggestions: Array.isArray(parsedResult.resourceSuggestions) 
          ? parsedResult.resourceSuggestions 
          : ['Ressources en cours de sélection'],
        roadmapSuggestions: Array.isArray(parsedResult.roadmapSuggestions) 
          ? parsedResult.roadmapSuggestions 
          : ['Feuille de route en cours d\'élaboration']
      };

    } catch (parseError) {
      console.error('❌ Erreur de parsing JSON:', parseError);
      throw new Error('Réponse AI invalide');
    }

    console.log('✅ Analyse Gemini complétée avec succès');
    return analysisResult;

  } catch (error) {
    console.error('❌ Erreur Gemini:', error);
    throw error;
  }
}

function generateFallbackAnalysis(data: DiagnosticData): AIAnalysisResult {
  const { overallScore, categoryScores } = data;
  
  const categoryAnalysis = Object.entries(categoryScores)
    .map(([category, score]) => ({
      name: formatCategoryName(category),
      percentage: score.percentage
    }))
    .sort((a, b) => b.percentage - a.percentage);
  
  const topCategory = categoryAnalysis[0];
  const bottomCategory = categoryAnalysis[categoryAnalysis.length - 1];
  const maturityLevel = getMaturityLevel(overallScore);

  return {
    insights: `Votre diagnostic révèle un profil achats avec un score global de ${overallScore}% (niveau ${maturityLevel}). 
    Votre point fort principal est "${topCategory.name}" (${topCategory.percentage}%), démontrant une expertise solide dans ce domaine. 
    L'axe d'amélioration prioritaire concerne "${bottomCategory.name}" (${bottomCategory.percentage}%), représentant une opportunité d'optimisation significative. 
    Cette combinaison de forces et d'opportunités vous positionne favorablement pour une progression structurée et efficace.`,
    
    recommendations: [
      `Capitaliser sur votre expertise en "${topCategory.name}" pour créer de la valeur`,
      `Développer des compétences ciblées en "${bottomCategory.name}"`,
      `Mettre en place des KPIs pour mesurer la progression`,
      `Établir un plan de formation personnalisé`
    ],
    
    priorityActions: [
      `Audit approfondi du domaine "${bottomCategory.name}"`,
      `Formation spécialisée dans les 30 jours`,
      `Mise en place d'outils de suivi de performance`
    ],
    
    industryBenchmark: `Avec ${overallScore}%, vous vous situez ${overallScore >= 70 ? 'au-dessus' : overallScore >= 50 ? 'dans' : 'en-dessous de'} la moyenne sectorielle. Les entreprises performantes affichent généralement 75%+.`,
    
    resourceSuggestions: [
      `Formation "${bottomCategory.name}" niveau ${maturityLevel}`,
      'Certification procurement stratégique',
      'Outils de gestion de la performance achats',
      'Benchmarking sectoriel spécialisé'
    ],
    
    roadmapSuggestions: [
      `Mois 1-2: Consolidation "${topCategory.name}"`,
      `Mois 3-4: Amélioration "${bottomCategory.name}"`,
      'Mois 5-6: Optimisation des processus',
      'Mois 7-12: Montée en expertise et leadership'
    ]
  };
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Réception de la demande d\'analyse...');
    
    const body = await request.json();
    const { diagnosticData } = body;

    if (!diagnosticData) {
      return NextResponse.json(
        { error: 'Données de diagnostic manquantes' },
        { status: 400 }
      );
    }

    console.log('📊 Données diagnostic reçues:', {
      score: diagnosticData.overallScore,
      categories: Object.keys(diagnosticData.categoryScores).length
    });

    let analysisResult: AIAnalysisResult;

    // Tentative d'analyse Gemini avec fallback intelligent
    if (genAI && API_KEY) {
      try {
        console.log('🤖 Utilisation de l\'IA Gemini pour l\'analyse...');
        analysisResult = await performGeminiAnalysis(diagnosticData);
      } catch (geminiError) {
        console.warn('⚠️ Erreur Gemini, utilisation du fallback:', geminiError);
        analysisResult = generateFallbackAnalysis(diagnosticData);
      }
    } else {
      console.log('📋 Utilisation de l\'analyse fallback (pas d\'API key)');
      analysisResult = generateFallbackAnalysis(diagnosticData);
    }

    // Transformation pour compatibilité avec le format attendu par le frontend
    const responseData = {
      success: true,
      insights: analysisResult.insights,
      recommendations: analysisResult.recommendations,
      nextSteps: analysisResult.priorityActions,
      industryBenchmark: analysisResult.industryBenchmark,
      resourceSuggestions: analysisResult.resourceSuggestions,
      roadmapSuggestions: analysisResult.roadmapSuggestions,
      metadata: {
        analysisTimestamp: new Date().toISOString(),
        scoreGlobal: diagnosticData.overallScore,
        niveauMaturite: getMaturityLevel(diagnosticData.overallScore),
        indicateurPerformance: getPerformanceIndicator(diagnosticData.overallScore),
        aiPowered: !!genAI,
        version: '2.0'
      }
    };

    console.log('✅ Analyse complétée avec succès');

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'analyse',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Orientation Analysis API',
    version: '2.5',
    status: 'active',
    geminiAvailable: !!genAI,
    timestamp: new Date().toISOString()
  });
}