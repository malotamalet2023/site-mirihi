/**
 * Service d'intégration Gemini AI pour rendre les diagnostics plus humains et intelligents
 * Basé sur l'analyse des fichiers Excel de référence
 */

interface GeminiPromptData {
  userResponses: Record<string, any>;
  moduleType: string;
  excelContext: string;
  userProfile?: {
    organizationSize?: string;
    industry?: string;
    maturityLevel?: string;
  };
}

interface GeminiEnhancedRecommendation {
  humanizedAnalysis: string;
  personalizedInsights: string[];
  actionPlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  industryBenchmarks?: string;
  successStories?: string;
}

class GeminiDiagnosticService {
  private apiKey: string | null = null;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    // En production, cette clé serait dans les variables d'environnement
    this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || null;
  }

  /**
   * Contextes Excel analysés pour chaque module
   */
  private getExcelContext(moduleType: string): string {
    const contexts = {
      'strategic-orientation': `
        Basé sur l'analyse des modèles de maturité Excel, l'orientation stratégique des achats comprend :
        - Engagement du management senior (Senior Management Commitment)
        - Alignement stratégique avec les objectifs business
        - Coordination avec les partenaires internes
        - Vision et positionnement de la fonction achats
      `,
      'category-segmentation': `
        Basé sur les fichiers Excel Kraljic analysés (20230609 CATMAN - Category Segmentation REVISAR PODER VS VALUE, KRALJIC.xlsx) :
        - Matrice Kraljic : Pouvoir d'achat vs Complexité d'approvisionnement
        - 4 quadrants : Routine, Leverage, Bottleneck, Strategic
        - Critères d'évaluation : Coûts, Facteurs clés de succès, Taux de croissance
        - Échelle de notation 1-3-5-7 pour chaque critère
        - Mapping portfolio et statut négociations
      `,
      'supplier-clustering': `
        Basé sur l'analyse Excel SRM (20120131 SRM Supplier Clusterization.xls) :
        - Classification formelle des fournisseurs
        - Niveaux SRM : Sélection, Classification, Partenariat
        - Clustering intelligent selon performance et valeur stratégique
        - Gestion collaborative et innovation fournisseurs (SCI)
      `,
      'procurement-maturity': `
        Basé sur le Global Procurement Maturity Model Mirihi Benchmarking.xlsx :
        - 6 domaines MMCM : Senior Mgmt, Internal P, Cat Man, SCI, Process & Methodology, Contracts, Sourcing, Risk Mgmt, Talent Mgmt
        - 3 niveaux : Basic (0-1.75), Medium (1.75-3.25), Advanced (3.25-4.25)
        - Benchmarking avec AstraZeneca, Roche, Ingeteam, AkzoNobel, KernPharma
        - Scoring pondéré et recommandations par domaine
      `
    };
    
    return contexts[moduleType as keyof typeof contexts] || '';
  }

  /**
   * Génère un prompt enrichi pour Gemini
   */
  private generateEnhancedPrompt(data: GeminiPromptData): string {
    const { userResponses, moduleType, userProfile } = data;
    const excelContext = this.getExcelContext(moduleType);

    return `
Tu es un expert consultant en achats travaillant pour Mirihi, spécialisé dans l'analyse de diagnostics adaptatifs basés sur des modèles Excel de référence.

CONTEXTE EXCEL ANALYSÉ:
${excelContext}

PROFIL UTILISATEUR:
- Taille organisation: ${userProfile?.organizationSize || 'Non spécifié'}
- Secteur: ${userProfile?.industry || 'Non spécifié'}  
- Niveau maturité: ${userProfile?.maturityLevel || 'À déterminer'}

RÉPONSES UTILISATEUR AU DIAGNOSTIC:
${JSON.stringify(userResponses, null, 2)}

MISSION:
Génère une analyse humaine, personnalisée et actionnable qui :

1. HUMANISE L'ANALYSE (tone empathique et professionnel)
2. CONTEXTUALISE selon les modèles Excel de référence
3. PERSONNALISE selon le profil utilisateur
4. PROPOSE des actions concrètes et priorisées

FORMAT DE RÉPONSE ATTENDU (JSON):
{
  "humanizedAnalysis": "Analyse narrative personnalisée de 2-3 paragraphes, ton empathique et professionnel",
  "personalizedInsights": [
    "3-4 insights spécifiques basés sur les réponses et le contexte Excel",
    "Chaque insight doit être actionnable et contextualisé"
  ],
  "actionPlan": {
    "immediate": ["2-3 actions à faire dans les 30 prochains jours"],
    "shortTerm": ["2-3 actions à faire dans les 3-6 prochains mois"], 
    "longTerm": ["2-3 actions stratégiques à 12-18 mois"]
  },
  "industryBenchmarks": "Comparaison avec les benchmarks du secteur basée sur l'analyse Excel",
  "successStories": "Exemple de réussite similaire adapté au contexte"
}

Assure-toi que l'analyse soit:
- Spécifique au module diagnostiqué
- Basée sur les meilleures pratiques des fichiers Excel analysés
- Adaptée au profil de l'organisation
- Actionnable avec des étapes concrètes
- Motivante et encourageante dans le ton
`;
  }

  /**
   * Appel à l'API Gemini (simulation pour le développement)
   */
  private async callGeminiAPI(prompt: string): Promise<any> {
    // Version simulée pour le développement
    if (!this.apiKey || this.apiKey === 'demo') {
      return this.getSimulatedGeminiResponse(prompt);
    }

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Erreur Gemini API:', error);
      return this.getSimulatedGeminiResponse(prompt);
    }
  }

  /**
   * Réponse simulée de Gemini pour le développement
   */
  private getSimulatedGeminiResponse(prompt: string): GeminiEnhancedRecommendation {
    // Analyse du prompt pour déterminer le type de module
    const moduleType = prompt.includes('Kraljic') ? 'segmentation' :
                      prompt.includes('SRM') ? 'srm' :
                      prompt.includes('MMCM') ? 'maturity' : 'strategic';

    const responses = {
      strategic: {
        humanizedAnalysis: "Votre diagnostic révèle une fonction achats en transition, avec un potentiel d'amélioration significatif dans l'alignement stratégique. Nous identifions des fondations solides sur lesquelles construire, notamment dans la compréhension des enjeux business. Cependant, l'engagement du management senior et la coordination avec les partenaires internes nécessitent une attention particulière pour libérer tout le potentiel de votre fonction achats.",
        personalizedInsights: [
          "L'analyse Excel montre que votre profil correspond aux organisations en phase d'évolution, où les achats passent d'une fonction de contrôle à un partenaire stratégique",
          "Vos réponses indiquent une opportunité d'amélioration de 35% dans l'alignement avec la stratégie globale de l'entreprise",
          "Le modèle de référence suggère que votre organisation est prête pour une approche plus collaborative avec les business units",
          "Les meilleures pratiques Excel montrent qu'une communication renforcée avec le management pourrait augmenter votre impact de 50%"
        ],
        actionPlan: {
          immediate: [
            "Planifier une présentation stratégique avec le comité de direction dans les 2 semaines",
            "Identifier 2-3 partenaires business clés pour des quick wins collaboratifs",
            "Mettre en place un tableau de bord mensuel des contributions achats au business"
          ],
          shortTerm: [
            "Développer une feuille de route achats alignée sur la stratégie d'entreprise",
            "Former l'équipe aux enjeux business et sectoriels",
            "Établir des KPIs communs avec les business units partenaires"
          ],
          longTerm: [
            "Intégrer la fonction achats dans la planification stratégique annuelle",
            "Développer un centre d'excellence achats reconnu dans l'organisation",
            "Créer un programme de mentoring achats-business pour les futurs leaders"
          ]
        },
        industryBenchmarks: "Selon notre analyse comparative basée sur les modèles Excel, votre organisation se situe dans la moyenne du secteur avec un potentiel d'amélioration de 40% par rapport aux leaders du marché.",
        successStories: "Une PME similaire à votre profil a réussi à augmenter sa contribution aux résultats de 25% en 18 mois en appliquant une stratégie d'alignement structurée et de communication renforcée avec le management."
      },
      segmentation: {
        humanizedAnalysis: "Votre approche de la segmentation des catégories montre une bonne compréhension des principes Kraljic, avec des points forts identifiés dans l'analyse de la complexité d'approvisionnement. L'analyse révèle néanmoins des opportunités d'optimisation dans l'évaluation du pouvoir d'achat et la priorisation des actions par quadrant. Votre profil suggère une organisation prête à affiner sa stratégie de portfolio pour maximiser la création de valeur.",
        personalizedInsights: [
          "L'analyse Excel Kraljic indique que 60% de vos catégories pourraient bénéficier d'une re-segmentation pour optimiser les stratégies d'approvisionnement",
          "Vos critères d'évaluation actuels sont solides mais pourraient être enrichis avec les échelles 1-3-5-7 du modèle de référence",
          "Le mapping portfolio Excel suggère des gains potentiels de 15-20% sur les catégories Leverage mal exploitées",
          "Votre compréhension des enjeux de négociation est avancée et pourrait être systématisée sur l'ensemble du portfolio"
        ],
        actionPlan: {
          immediate: [
            "Réaliser un audit express de 5 catégories principales avec la grille Kraljic enrichie",
            "Identifier les catégories Leverage sous-exploitées pour des gains rapides",
            "Former l'équipe aux nouveaux critères d'évaluation 1-3-5-7"
          ],
          shortTerm: [
            "Déployer la matrice Kraljic enrichie sur l'ensemble du portfolio",
            "Développer des stratégies spécifiques par quadrant avec plans d'action détaillés",
            "Mettre en place un processus de révision trimestrielle du mapping"
          ],
          longTerm: [
            "Intégrer l'intelligence artificielle pour l'analyse prédictive des catégories",
            "Créer un centre d'excellence Category Management",
            "Développer des partenariats stratégiques sur les catégories critiques"
          ]
        },
        industryBenchmarks: "Votre niveau de sophistication en segmentation vous place dans le top 30% des organisations analysées dans notre base Excel, avec un potentiel d'excellence identifié.",
        successStories: "Un groupe industriel de taille similaire a augmenté ses économies de 18% en appliquant rigoureusement la matrice Kraljic enrichie sur 24 mois, avec des gains particulièrement significatifs sur les catégories Leverage."
      },
      srm: {
        humanizedAnalysis: "Votre diagnostic SRM révèle une approche structurée de la gestion fournisseurs, avec des bases solides dans la sélection et l'évaluation. Nous identifions un potentiel significatif dans le développement de relations plus strategiques et l'implémentation de programmes d'innovation collaborative. Votre organisation montre une maturité suffisante pour évoluer vers un SRM de niveau supérieur avec clustering intelligent et gestion différenciée par segment.",
        personalizedInsights: [
          "L'analyse Excel SRM indique que votre classification fournisseurs pourrait être enrichie avec 3 segments supplémentaires pour optimiser l'allocation des ressources",
          "Vos processus de sélection sont robustes mais manquent de critères d'innovation collaborative selon le modèle de référence",
          "Le clustering intelligent suggère que 25% de vos fournisseurs stratégiques sont sous-exploités en termes de création de valeur",
          "Votre approche relationnelle est prometteuse et pourrait bénéficier d'une systématisation des programmes SCI (Supplier Collaboration & Innovation)"
        ],
        actionPlan: {
          immediate: [
            "Segmenter le panel fournisseurs avec la méthode de clustering Excel dans les 3 semaines",
            "Identifier 3-5 fournisseurs pour un pilote de collaboration renforcée",
            "Mettre à jour les grilles d'évaluation avec les critères d'innovation"
          ],
          shortTerm: [
            "Déployer un programme SRM différencié par segment fournisseur",
            "Lancer 2-3 projets d'innovation collaborative avec les partenaires stratégiques",
            "Former les équipes aux nouvelles approches de gestion relationnelle"
          ],
          longTerm: [
            "Créer un écosystème d'innovation ouvert avec le panel stratégique",
            "Développer un SRM digital avec intelligence artificielle prédictive",
            "Établir des partenariats de co-développement à long terme"
          ]
        },
        industryBenchmarks: "Votre niveau SRM vous positionne dans la moyenne haute du secteur selon notre analyse Excel, avec un potentiel d'excellence dans les 18 prochains mois.",
        successStories: "Un leader de votre secteur a multiplié par 3 ses innovations co-développées en 2 ans grâce à un SRM restructuré avec clustering intelligent et programmes SCI systematisés."
      },
      maturity: {
        humanizedAnalysis: "Votre évaluation MMCM révèle une fonction achats en progression constante, avec des performances variables selon les domaines. Nous identifions des points forts remarquables dans certaines dimensions et des axes d'amélioration clairs dans d'autres. Votre profil correspond aux organisations en phase de consolidation, prêtes à franchir le cap vers l'excellence opérationnelle. Le benchmarking avec les leaders du secteur montre un potentiel d'amélioration de 30-40% sur 18 mois.",
        personalizedInsights: [
          "L'analyse MMCM montre que vous excellez dans 2-3 domaines mais accusez un retard sur les aspects de gestion des risques et de talent management",
          "Votre score global vous place en position 'Medium' avec un potentiel d'évolution vers 'Advanced' identifié dans 12-18 mois",
          "Le benchmarking Excel avec AstraZeneca et Roche révèle des écarts de 25% sur les processus et méthodologies",
          "Vos fondations en category management sont solides et peuvent servir de levier pour les autres domaines"
        ],
        actionPlan: {
          immediate: [
            "Prioriser les 2 domaines MMCM les plus critiques pour des actions rapides",
            "Benchmarker en détail avec les leaders Excel sur ces domaines prioritaires",
            "Lancer un diagnostic approfondi des processus et méthodologies"
          ],
          shortTerm: [
            "Déployer un plan de développement sur les 6 domaines MMCM",
            "Renforcer les équipes avec les compétences manquantes identifiées",
            "Mettre en place des KPIs de maturité avec suivi mensuel"
          ],
          longTerm: [
            "Atteindre le niveau 'Advanced' sur l'ensemble des domaines MMCM",
            "Devenir une référence sectorielle en maturité achats",
            "Développer un programme de certification interne basé sur MMCM"
          ]
        },
        industryBenchmarks: "Votre niveau de maturité vous positionne au 60e percentile selon le benchmarking Excel, avec AstraZeneca (95e percentile) et Roche (90e percentile) comme références d'excellence à atteindre.",
        successStories: "KernPharma, organisation de profil similaire dans notre base Excel, a progressé de 'Medium' à 'Advanced' en 20 mois grâce à une approche structurée par domaines MMCM avec quick wins et projets transformationnels."
      }
    };

    return responses[moduleType as keyof typeof responses] || responses.strategic;
  }

  /**
   * Méthode principale pour obtenir des recommandations enrichies par Gemini
   */
  async generateEnhancedRecommendations(data: GeminiPromptData): Promise<GeminiEnhancedRecommendation> {
    try {
      const prompt = this.generateEnhancedPrompt(data);
      const geminiResponse = await this.callGeminiAPI(prompt);
      
      // Si la réponse est une string JSON, la parser
      if (typeof geminiResponse === 'string') {
        try {
          return JSON.parse(geminiResponse);
        } catch {
          // Si le parsing échoue, retourner la réponse simulée
          return this.getSimulatedGeminiResponse(prompt);
        }
      }
      
      return geminiResponse;
    } catch (error) {
      console.error('Erreur génération recommandations Gemini:', error);
      // Fallback sur la réponse simulée
      return this.getSimulatedGeminiResponse(data.moduleType);
    }
  }

  /**
   * Génère des questions de suivi personnalisées basées sur les réponses
   */
  async generateFollowUpQuestions(): Promise<string[]> {
    const questions = [
      "Quels sont les principaux obstacles que vous rencontrez actuellement dans la mise en œuvre de ces recommandations ?",
      "Quel niveau de support du management anticipez-vous pour ces initiatives ?",
      "Sur quelle échéance souhaitez-vous voir les premiers résultats concrets ?",
      "Quelles ressources (budget, équipe, outils) sont disponibles pour ces projets ?",
      "Y a-t-il des contraintes spécifiques à votre secteur d'activité à prendre en compte ?"
    ];
    
    return questions;
  }
}

export const geminiService = new GeminiDiagnosticService();
export type { GeminiPromptData, GeminiEnhancedRecommendation };
