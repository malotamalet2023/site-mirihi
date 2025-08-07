import { GoogleGenerativeAI } from "@google/generative-ai";

interface OrientationResults {
  category: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

interface GeminiOrientationAnalysis {
  personalizedAnalysis: string;
  careerRecommendations: string[];
  skillsDevelopment: string[];
  industryInsights: string[];
  nextSteps: string[];
  resources: {
    title: string;
    url: string;
    description: string;
  }[];
}

export class GeminiOrientationService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async analyzeOrientationResults(
    diagnosticResults: OrientationResults[],
    userAnswers: Record<string, any>
  ): Promise<GeminiOrientationAnalysis> {
    const prompt = this.buildOrientationPrompt(diagnosticResults, userAnswers);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeminiResponse(text);
    } catch (error) {
      console.error("Erreur lors de l'analyse Gemini:", error);
      throw new Error("Impossible de générer l'analyse Gemini");
    }
  }

  private buildOrientationPrompt(
    results: OrientationResults[],
    userAnswers: Record<string, any>
  ): string {
    const topCategories = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(r => `${r.category} (${r.score}%)`);

    return `
Tu es un expert en orientation professionnelle et développement de carrière. 
Analyse les résultats de ce diagnostic d'orientation professionnelle et fournis une analyse humaine, personnalisée et actionnable.

## Résultats du diagnostic :
${JSON.stringify(results, null, 2)}

## Réponses de l'utilisateur :
${JSON.stringify(userAnswers, null, 2)}

## Catégories principales identifiées :
${topCategories.join(", ")}

Fournis une analyse structurée en JSON avec les sections suivantes :

{
  "personalizedAnalysis": "Une analyse personnalisée et humaine du profil professionnel basée sur les résultats (200-300 mots). Utilise un ton bienveillant et motivant.",
  "careerRecommendations": [
    "Recommandation spécifique de carrière 1",
    "Recommandation spécifique de carrière 2",
    "Recommandation spécifique de carrière 3"
  ],
  "skillsDevelopment": [
    "Compétence à développer 1 avec justification",
    "Compétence à développer 2 avec justification",
    "Compétence à développer 3 avec justification"
  ],
  "industryInsights": [
    "Insight sur le marché du travail 1",
    "Insight sur le marché du travail 2",
    "Tendance ou opportunité dans le secteur"
  ],
  "nextSteps": [
    "Action concrète à entreprendre dans les 30 jours",
    "Action à moyen terme (3-6 mois)",
    "Action à long terme (6-12 mois)"
  ],
  "resources": [
    {
      "title": "Titre de la ressource 1",
      "url": "https://exemple.com",
      "description": "Description de la ressource"
    }
  ]
}

IMPORTANT : 
- Sois spécifique et actionnable dans tes recommandations
- Utilise des données récentes sur le marché du travail français/international
- Adapte ton analyse au profil unique de l'utilisateur
- Propose des ressources réelles et pertinentes
- Garde un ton professionnel mais humain et encourageant
`;
  }

  private parseGeminiResponse(text: string): GeminiOrientationAnalysis {
    try {
      // Nettoyer le texte pour extraire le JSON
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      // Validation des champs requis
      if (!parsed.personalizedAnalysis || !parsed.careerRecommendations) {
        throw new Error("Réponse Gemini incomplète");
      }

      return {
        personalizedAnalysis: parsed.personalizedAnalysis || "",
        careerRecommendations: parsed.careerRecommendations || [],
        skillsDevelopment: parsed.skillsDevelopment || [],
        industryInsights: parsed.industryInsights || [],
        nextSteps: parsed.nextSteps || [],
        resources: parsed.resources || []
      };
    } catch (error) {
      console.error("Erreur lors du parsing de la réponse Gemini:", error);
      // Retourner une analyse de base en cas d'erreur
      return this.getFallbackAnalysis();
    }
  }

  private getFallbackAnalysis(): GeminiOrientationAnalysis {
    return {
      personalizedAnalysis: "Votre profil montre des aptitudes diversifiées qui peuvent être valorisées dans plusieurs domaines professionnels. Une analyse plus approfondie permettrait d'affiner ces recommandations.",
      careerRecommendations: [
        "Explorer les métiers alignés avec vos principales compétences",
        "Considérer une formation complémentaire dans vos domaines de force",
        "Rechercher des opportunités de stage ou de mentorat"
      ],
      skillsDevelopment: [
        "Développer les compétences techniques spécifiques à votre domaine",
        "Renforcer vos compétences en communication",
        "Améliorer votre réseau professionnel"
      ],
      industryInsights: [
        "Le marché du travail évolue rapidement avec la digitalisation",
        "Les compétences transversales sont de plus en plus valorisées",
        "L'adaptabilité est une qualité clé pour l'avenir"
      ],
      nextSteps: [
        "Définir vos objectifs professionnels à court terme",
        "Identifier les formations ou certifications pertinentes",
        "Commencer à développer votre réseau professionnel"
      ],
      resources: [
        {
          title: "Pôle Emploi - Orientation",
          url: "https://www.pole-emploi.fr",
          description: "Ressources officielles pour l'orientation professionnelle"
        }
      ]
    };
  }
}
