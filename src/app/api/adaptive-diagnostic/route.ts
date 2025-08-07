import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { 
      answers, 
      percentages, 
      strengthAreas, 
      weaknessAreas 
    } = await request.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    // Génération de recommandations de modules basées sur les faiblesses identifiées
    const recommendedModules = weaknessAreas.map((area: string) => ({
      module: `Module ${area}`,
      reason: `Approfondir l'analyse dans ce domaine de faiblesse identifié`
    }));

    // Construction du contexte détaillé pour Gemini
    const contextualPrompt = `
Tu es un expert en procurement et diagnostic achats utilisant un système de diagnostic adaptatif intelligent. 

**CONTEXTE DU DIAGNOSTIC ADAPTATIF:**
Ce diagnostic utilise une logique intelligente qui s'adapte aux réponses :
- Si le client indique des forces (scores élevés), on approfondit moins
- Si le client indique des faiblesses (scores faibles), on creuse plus profondément
- Les questions de suivi sont déclenchées dynamiquement selon les réponses

**DOMAINES ÉVALUÉS:**
1. **Compromiso de la Alta Dirección** - Engagement et soutien de la direction
2. **Relación con Socios Internos** - Collaboration interne et partenariats
3. **Gestión por Categorías** - Maturité de la gestion par catégories
4. **Colaboración e Innovación con Proveedores** - Innovation et collaboration fournisseurs
5. **Organización y Procesos** - Structure organisationnelle et processus
6. **Gestión de Contratos** - Maturité de la gestion contractuelle
7. **Sourcing Estratégico** - Capacités de sourcing stratégique
8. **Gestión del Riesgo** - Maturité de la gestion des risques
9. **Gestión del Talento** - Structure et développement des talents

**RÉSULTATS DU DIAGNOSTIC:**

**Scores par domaine (%):**
${Object.entries(percentages).map(([domain, score]) => `- ${domain.replace(/_/g, ' ')}: ${score}%`).join('\n')}

**Domaines de force identifiés:**
${strengthAreas.length > 0 ? strengthAreas.map((area: string) => `- ${area}`).join('\n') : '- Aucun domaine de force significatif identifié'}

**Domaines de faiblesse identifiés:**
${weaknessAreas.length > 0 ? weaknessAreas.map((area: string) => `- ${area}`).join('\n') : '- Aucun domaine de faiblesse significatif identifié'}

**Modules Mirihi recommandés par priorité:**
${recommendedModules.map((mod: any, index: number) => `${index + 1}. ${mod.module} - ${mod.reason}`).join('\n')}

**RÉPONSES DÉTAILLÉES DU CLIENT:**
${Object.entries(answers).map(([questionId, answer]) => `- ${questionId}: ${answer}`).join('\n')}

**MISSION:**
Génère une analyse experte personnalisée au format JSON avec :

1. **insights** (200-250 mots) : 
   - Analyse approfondie du profil adaptatif
   - Interprétation des forces et faiblesses dans le contexte métier
   - Évaluation de la cohérence entre les domaines
   - Identification des opportunités stratégiques

2. **recommendations** (4-5 recommandations concrètes) :
   - Actions spécifiques et priorisées
   - Basées sur les faiblesses identifiées par le diagnostic adaptatif
   - Mention des modules Mirihi les plus pertinents
   - Focus sur l'impact métier et ROI potentiel

3. **nextSteps** (4-5 étapes d'action) :
   - Plan d'action structuré et progressif
   - Étapes concrètes avec timeline suggérée
   - Intégration des modules diagnostiques recommandés
   - Métriques de suivi suggérées

**RÈGLES IMPORTANTES:**
- Ton professionnel mais accessible
- Personnalisation maximale basée sur le profil unique
- Éviter les généralités, se baser sur les données concrètes
- Mentionner spécifiquement les domaines les plus critiques
- Intégrer la logique adaptative dans l'analyse
- Proposer des gains rapides ET des améliorations long terme

**CONTEXTE MIRIHI:**
Mirihi propose des diagnostics modulaires basés sur des modèles Excel de référence en procurement. Les modules disponibles sont :
- **Orientation Stratégique** : Alignement stratégique et innovation
- **Segmentation Catégories** : Classification et matrice Kraljic
- **Gestion Fournisseurs** : SRM, clustering et performance
- **Maturité MMCM** : Évaluation globale de maturité

Réponds uniquement en JSON valide sans markdown ni backticks.
`;

    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    const analysisText = response.text();

    // Tenter de parser le JSON
    let analysis;
    try {
      // Nettoyer le texte si nécessaire
      const cleanedText = analysisText.replace(/```json\s*|\s*```/g, '').trim();
      analysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Erreur de parsing JSON:', parseError);
      
      // Fallback intelligent basé sur l'analyse
      const avgPercentage = Math.round(
        Object.values(percentages as Record<string, number>)
          .reduce((a: number, b: number) => a + b, 0) / 
        Object.keys(percentages).length
      );

      const criticalWeaknesses = Object.entries(percentages as Record<string, number>)
        .filter(([, score]) => (score as number) < 50)
        .map(([domain]) => domain.replace(/_/g, ' '));

      analysis = {
        insights: `Votre diagnostic adaptatif révèle un niveau de maturité procurement de ${avgPercentage}%. ${
          strengthAreas.length > 0 
            ? `Vos forces principales se situent dans : ${strengthAreas.join(', ')}. ` 
            : ''
        }${
          weaknessAreas.length > 0 
            ? `Les domaines nécessitant une attention prioritaire sont : ${weaknessAreas.join(', ')}. `
            : ''
        }Le caractère adaptatif du diagnostic a permis d'identifier précisément vos besoins spécifiques sans questions superflues dans vos domaines de force. Cette approche personnalisée optimise votre temps tout en maximisant la pertinence des recommandations. ${
          criticalWeaknesses.length > 0
            ? `Les domaines critiques (< 50%) nécessitent une action immédiate : ${criticalWeaknesses.join(', ')}.`
            : 'Votre profil global est équilibré sans faiblesses critiques.'
        }`,
        
        recommendations: [
          ...(weaknessAreas.length > 0 
            ? [`Prioriser l'amélioration du domaine "${weaknessAreas[0]}" identifié comme votre principale opportunité d'amélioration`]
            : []
          ),
          ...(recommendedModules.length > 0 
            ? [`Commencer par le module "${recommendedModules[0].module}" pour adresser vos besoins prioritaires`]
            : []
          ),
          `Capitaliser sur vos forces existantes${strengthAreas.length > 0 ? ` (${strengthAreas[0]})` : ''} comme levier de développement`,
          `Mettre en place des KPIs pour mesurer les progrès dans les domaines à améliorer`,
          `Planifier une approche progressive sur 6-12 mois pour optimiser le retour sur investissement`
        ].slice(0, 5),
        
        nextSteps: [
          `Réaliser le diagnostic détaillé "${recommendedModules[0]?.module || 'Maturité MMCM'}" dans les 30 prochains jours`,
          `Définir un plan d'action avec objectifs SMART pour les 3 domaines prioritaires`,
          `Identifier et allouer les ressources nécessaires (budget, équipe, formation)`,
          `Mettre en place un tableau de bord de suivi avec révision mensuelle`,
          `Planifier la prochaine évaluation dans 6 mois pour mesurer les progrès`
        ]
      };
    }

    // Validation et enrichissement de l'analyse
    if (!analysis.insights || analysis.insights.length < 50) {
      analysis.insights = `Votre diagnostic adaptatif révèle un profil unique avec des opportunités d'amélioration ciblées. L'approche intelligente a permis d'identifier précisément vos besoins sans questions superflues.`;
    }

    if (!analysis.recommendations || analysis.recommendations.length === 0) {
      analysis.recommendations = [
        `Commencer par le module "${recommendedModules[0]?.module || 'Orientation Stratégique'}" identifié comme prioritaire`,
        "Mettre en place un plan d'action structuré basé sur les résultats du diagnostic",
        "Identifier les ressources et compétences nécessaires pour les améliorations",
        "Planifier un suivi régulier pour mesurer les progrès"
      ];
    }

    if (!analysis.nextSteps || analysis.nextSteps.length === 0) {
      analysis.nextSteps = [
        "Réaliser le diagnostic modulaire détaillé recommandé",
        "Définir des objectifs mesurables et un timeline",
        "Communiquer les résultats aux parties prenantes",
        "Commencer par les actions à impact rapide",
        "Planifier la prochaine évaluation"
      ];
    }

    return NextResponse.json(analysis);

  } catch (error) {
    console.error('Erreur dans l\'API adaptive-diagnostic:', error);
    
    // Réponse de fallback en cas d'erreur
    return NextResponse.json({
      insights: "Votre diagnostic adaptatif a été complété avec succès. L'analyse révèle des opportunités d'amélioration spécifiques à votre contexte organisationnel.",
      recommendations: [
        "Prioriser les domaines avec les scores les plus faibles",
        "Utiliser les modules Mirihi pour approfondir l'analyse",
        "Mettre en place un plan d'action progressif",
        "Suivre régulièrement les progrès réalisés"
      ],
      nextSteps: [
        "Choisir le module de diagnostic le plus pertinent",
        "Définir un plan d'action avec objectifs mesurables",
        "Identifier les ressources nécessaires",
        "Commencer par les actions à impact rapide",
        "Planifier un suivi régulier"
      ]
    });
  }
}
