import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuration API avec support de multiples variables d'environnement
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || 
                process.env.GOOGLE_GEMINI_API_KEY || 
                process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ Clé API Gemini non configurée. L\'analyse IA utilisera le fallback.');
}

// Initialisation Gemini avec gestion d'erreur
let genAI: GoogleGenerativeAI | null = null;
try {
  genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
} catch (error) {
  console.error('❌ Erreur d\'initialisation Gemini:', error);
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

CONTEXTE SECTORIEL:
Recherche et intègre les tendances actuelles du procurement et des meilleures pratiques en ${new Date().getFullYear()} pour enrichir ton analyse. 
Inclus des benchmarks de performance sectoriels, des technologies émergentes (IA, blockchain, automation), 
des enjeux de durabilité/ESG qui impactent les fonctions achats modernes, et les dernières innovations en digitalisation des achats.

Focus particulier sur :
- Les pratiques d'achats responsables et ESG (Scopes 1,2,3, taxonomie européenne)
- La transformation digitale des achats (RPA, IA prédictive, analytics avancés)
- Les KPIs et méthodes de pilotage de la performance achats modernes
- Les nouvelles réglementations (Due Diligence, CSRD, taxonomie verte)
- Les technologies disruptives (blockchain supply chain, IoT, jumeaux numériques)

INSTRUCTIONS SPÉCIALES:
- Utilise tes connaissances des dernières évolutions du secteur pour contextualiser l'analyse
- Référence les standards et certifications actuels (CIPS, ISM, CDAF)
- Intègre les impacts post-COVID sur les supply chains
- Mentionne les outils technologiques leaders du marché

Génère une analyse JSON structurée avec:
{
  "insights": "Analyse qualitative personnalisée de 200-300 mots sur le profil et les implications stratégiques, enrichie par les tendances sectorielles actuelles",
  "recommendations": ["3-4 recommandations concrètes et actionnables, alignées sur les meilleures pratiques 2025"],
  "priorityActions": ["3 actions prioritaires pour les 30-90 prochains jours, incluant des outils/méthodes modernes"],
  "industryBenchmark": "Positionnement par rapport aux standards sectoriels actuels avec références précises aux leaders du marché",
  "resourceSuggestions": ["3-4 ressources spécifiques ultra-récentes (formations, outils, méthodologies, certifications)"],
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
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });

    const prompt = generateContextualPrompt(data);
    console.log('🚀 Envoi de la requête à Gemini...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('📄 Réponse Gemini reçue:', text.substring(0, 200) + '...');

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

    // Enrichissement avec des métadonnées
    const enrichedResult = {
      ...analysisResult,
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

    return NextResponse.json({
      success: true,
      analysis: enrichedResult
    });

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
    version: '2.0',
    status: 'active',
    geminiAvailable: !!genAI,
    timestamp: new Date().toISOString()
  });
}