import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Utiliser la variable d'environnement correcte
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ Clé API Gemini non configurée. L\'analyse IA utilisera le fallback.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Fonctions utilitaires
function getMaturityLevel(score: number): string {
  if (score >= 85) return 'Expert';
  if (score >= 70) return 'Avancé';
  if (score >= 50) return 'Intermédiaire';
  return 'Débutant';
}

function formatDomainName(domain: string): string {
  return domain
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

function getPerformanceIndicator(score: number): string {
  if (score >= 80) return '🟢 Excellent';
  if (score >= 60) return '🟡 Satisfaisant';
  if (score >= 40) return '🟠 À améliorer';
  return '🔴 Critique';
}

function generateIntelligentInsights(data: any): string {
  const { overallScore, criticalDomains, excellentDomains } = data;
  
  let insights = `Votre diagnostic révèle un profil achats avec un score global de ${overallScore}% (niveau ${getMaturityLevel(overallScore)}). `;
  
  if (excellentDomains.length > 0) {
    insights += `Vos points forts incluent ${excellentDomains.map(([domain]: [string, number]) => formatDomainName(domain)).join(', ')}, démontrant une maturité remarquable dans ces domaines. `;
  }
  
  if (criticalDomains.length > 0) {
    insights += `Les axes d'amélioration prioritaires concernent ${criticalDomains.map(([domain]: [string, number]) => formatDomainName(domain)).join(', ')}, représentant des opportunités concrètes d'optimisation. `;
  } else {
    insights += 'Aucun domaine critique n\'a été identifié, ce qui témoigne d\'une base solide. ';
  }
  
  insights += `Cette combinaison de forces et d'opportunités vous positionne favorablement pour une montée en maturité progressive et efficace.`;
  
  return insights;
}

function generateSmartRecommendations(data: any): string[] {
  const { criticalDomains, excellentDomains, overallScore } = data;
  const recommendations: string[] = [];
  
  if (criticalDomains.length > 0) {
    const topCritical = criticalDomains[0][0];
    recommendations.push(`Prioriser l'amélioration de ${formatDomainName(topCritical)} pour un impact rapide sur la performance globale`);
  }
  
  if (excellentDomains.length > 0) {
    recommendations.push(`Capitaliser sur vos forces en ${excellentDomains.map(([domain]: [string, number]) => formatDomainName(domain)).join(' et ')} pour créer des synergies`);
  }
  
  if (overallScore < 60) {
    recommendations.push('Commencer par le diagnostic Maturité MMCM pour une évaluation approfondie des fondamentaux');
  } else if (overallScore >= 60 && overallScore < 80) {
    recommendations.push('Utiliser le diagnostic Orientation Stratégique pour affiner l\'alignement avec les objectifs business');
  }
  
  recommendations.push('Définir un plan d\'action avec objectifs SMART et métriques de suivi');
  
  return recommendations.slice(0, 4);
}

function generateActionableSteps(data: any): string[] {
  const { criticalDomains, overallScore } = data;
  const steps: string[] = [];
  
  if (criticalDomains.length > 0) {
    steps.push(`Réaliser un diagnostic détaillé du domaine ${formatDomainName(criticalDomains[0][0])} dans les 30 prochains jours`);
  }
  
  steps.push('Constituer une équipe projet avec sponsor exécutif et ressources dédiées');
  steps.push('Établir un baseline détaillé avec indicateurs de performance actuels');
  
  if (overallScore < 70) {
    steps.push('Planifier des formations ciblées pour développer les compétences critiques');
  } else {
    steps.push('Mettre en place des initiatives d\'innovation collaborative avec les fournisseurs clés');
  }
  
  return steps.slice(0, 4);
}

// Fonction pour préparer les données pour l'analyse
function prepareDataForAnalysis(data: any) {
  const { answers = [], categoryScores = {}, overallScore = 0, strengths = [], weaknesses = [] } = data;

  // Préparer les pourcentages par catégorie
  const percentages = Object.entries(categoryScores).reduce((acc, [category, data]: [string, any]) => {
    acc[category] = data.percentage || 0;
    return acc;
  }, {} as Record<string, number>);

  // Préparer les réponses détaillées
  const answersDetail = answers.map((answer: any) => ({
    category: answer.category,
    question: answer.question,
    response: answer.answer,
    score: answer.score
  }));

  // Identifier les domaines critiques (< 40%) et excellents (> 80%)
  const criticalDomains = Object.entries(percentages).filter(([, score]) => score < 40);
  const excellentDomains = Object.entries(percentages).filter(([, score]) => score > 80);

  return {
    overallScore,
    percentages,
    strengths,
    weaknesses,
    answersDetail: answersDetail.slice(0, 8), // Limiter pour l'API
    criticalDomains,
    excellentDomains,
    avgScore: Object.values(percentages).reduce((a, b) => a + b, 0) / Object.keys(percentages).length
  };
}

// Génération d'analyse avec Gemini enrichie
async function generateGeminiAnalysis(data: any) {
  if (!genAI) throw new Error('Gemini non disponible');

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.8, // Plus créatif pour des insights personnalisés
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 3000, // Plus de tokens pour une analyse approfondie
    }
  });

  // Prompt enrichi et structuré pour Gemini
  const enhancedPrompt = `Tu es un consultant senior expert en procurement avec 15+ ans d'expérience. Analyse ce diagnostic achats et fournis une analyse personnalisée de haute qualité.

📊 **DONNÉES DU DIAGNOSTIC:**

Score Global: ${data.overallScore}% (Niveau: ${getMaturityLevel(data.overallScore)})

Scores par Domaine:
${Object.entries(data.percentages).map(([domain, score]) => 
  `• ${formatDomainName(domain)}: ${score}% ${getPerformanceIndicator(score as number)}`
).join('\n')}

Domaines Critiques (< 40%):
${data.criticalDomains.length > 0 ? 
  data.criticalDomains.map(([domain, score]: [string, number]) => `• ${formatDomainName(domain)}: ${score}%`).join('\n') : 
  '• Aucun domaine critique identifié'}

Domaines d'Excellence (> 80%):
${data.excellentDomains.length > 0 ? 
  data.excellentDomains.map(([domain, score]: [string, number]) => `• ${formatDomainName(domain)}: ${score}%`).join('\n') : 
  '• Aucun domaine d\'excellence identifié'}

Échantillon de Réponses:
${data.answersDetail.slice(0, 3).map((answer: any) => 
  `• ${answer.category}: ${answer.response} (Score: ${answer.score}/5)`
).join('\n')}

🎯 **CONTEXTE MIRIHI:**
Mirihi propose des diagnostics spécialisés pour optimiser les achats :
• **Orientation Stratégique**: Alignement, stakeholders, innovation collaborative
• **Segmentation Catégories**: Matrice Kraljic, stratégies d'approvisionnement  
• **Gestion Fournisseurs**: SRM, clustering, évaluation performance
• **Maturité MMCM**: Assessment global sur 6 domaines de maturité

🚀 **MISSION:**
Génère une analyse JSON personnalisée avec:

{
  "insights": "Analyse narrative personnalisée de 200-250 mots avec diagnostic global du profil, patterns identifiés, opportunités business, ton expert mais accessible",
  "recommendations": [
    "4-5 recommandations concrètes et actionnables",
    "Priorisées par impact business vs effort",
    "Adaptées au niveau de maturité détecté",
    "Avec mention des modules Mirihi pertinents"
  ],
  "nextSteps": [
    "4-5 étapes opérationnelles séquencées",
    "Actions spécifiques avec timeframe suggéré", 
    "Ressources/compétences nécessaires",
    "Métriques de succès proposées"
  ]
}

⚡ **CONTRAINTES:**
- JSON valide uniquement, sans markdown ni balises
- Ton professionnel mais humain
- Insights personnalisés basés sur les données réelles
- Recommandations graduées selon la maturité
- Focus impact business et gains rapides

Analyse maintenant et génère ton expertise JSON:`;

  try {
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const analysisText = response.text().trim();

    // Nettoyer le texte pour extraire le JSON
    let cleanJson = analysisText;
    if (cleanJson.includes('```json')) {
      cleanJson = cleanJson.split('```json')[1].split('```')[0].trim();
    } else if (cleanJson.includes('```')) {
      cleanJson = cleanJson.split('```')[1].split('```')[0].trim();
    }

    // Parser le JSON
    const analysis = JSON.parse(cleanJson);
    
    // Validation et enrichissement
    if (!analysis.insights || !analysis.recommendations || !analysis.nextSteps) {
      throw new Error('Structure JSON incomplète');
    }

    // Enrichir avec des données contextuelles
    analysis.metadata = {
      generatedAt: new Date().toISOString(),
      geminiModel: "gemini-1.5-flash",
      overallScore: data.overallScore,
      maturityLevel: getMaturityLevel(data.overallScore),
      priorityDomains: data.criticalDomains.map(([domain]: [string, number]) => formatDomainName(domain))
    };

    return analysis;

  } catch (parseError) {
    console.error('❌ Erreur parsing Gemini:', parseError);
    throw new Error('Réponse Gemini invalide');
  }
}

// Fallback intelligent en cas d'indisponibilité de Gemini
async function generateFallbackAnalysis(data: any): Promise<any> {
  const analysisData = prepareDataForAnalysis(data);
  
  // Logique intelligente basée sur les scores
  const insights = generateIntelligentInsights(analysisData);
  const recommendations = generateSmartRecommendations(analysisData); 
  const nextSteps = generateActionableSteps(analysisData);

  return {
    insights,
    recommendations,
    nextSteps,
    metadata: {
      generatedAt: new Date().toISOString(),
      source: "fallback-intelligent",
      overallScore: analysisData.overallScore,
      maturityLevel: getMaturityLevel(analysisData.overallScore)
    }
  };
}

export async function POST(request: NextRequest) {
  let data;
  
  try {
    data = await request.json();
    
    console.log('🔍 Démarrage analyse pour score global:', data.overallScore || 'non défini');
    
    // Vérifier si Gemini est disponible
    if (!genAI) {
      console.log('🔄 Gemini non configuré, utilisation du fallback intelligent');
      return NextResponse.json(await generateFallbackAnalysis(data));
    }

    console.log('🤖 Démarrage analyse Gemini...');
    
    // Préparer les données pour Gemini
    const analysisData = prepareDataForAnalysis(data);
    
    // Générer l'analyse avec Gemini
    const analysis = await generateGeminiAnalysis(analysisData);
    
    console.log('✅ Analyse Gemini générée avec succès');
    return NextResponse.json(analysis);

  } catch (error) {
    console.error('❌ Erreur dans l\'analyse:', error);
    
    // Fallback intelligent en cas d'erreur
    if (data) {
      const fallbackAnalysis = await generateFallbackAnalysis(data);
      console.log('🔄 Fallback utilisé en cas d\'erreur');
      return NextResponse.json(fallbackAnalysis);
    } else {
      return NextResponse.json({ 
        error: 'Données de requête invalides' 
      }, { status: 400 });
    }
  }
}
