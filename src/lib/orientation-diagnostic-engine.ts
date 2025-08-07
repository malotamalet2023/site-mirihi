/**
 * Moteur de diagnostic d'orientation adaptatif en français
 * Diagnostic intelligent qui s'adapte aux réponses de l'utilisateur
 * Durée cible: 5 minutes
 */

export interface DiagnosticQuestion {
  id: string;
  category: string;
  question: string;
  options: DiagnosticOption[];
  priority: 'high' | 'medium' | 'low';
  isFollowUp?: boolean;
  parentQuestionId?: string;
}

export interface DiagnosticOption {
  text: string;
  score: number; // 1-5
  action: 'continue' | 'skip_category' | 'deep_dive';
}

export interface DiagnosticResult {
  sessionId: string;
  timestamp: Date;
  categoryScores: Record<string, {
    score: number;
    maxScore: number;
    percentage: number;
    level: 'faible' | 'moyen' | 'bon' | 'excellent';
  }>;
  overallScore: number;
  overallPercentage: number;
  overallLevel: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
  strengths: string[];
  weaknesses: string[];
  recommendedDiagnostics: Array<{
    id: string;
    name: string;
    priority: 'urgent' | 'important' | 'utile';
    reason: string;
  }>;
  insights: string;
  recommendations: string[];
  nextSteps: string[];
}

// Questions d'orientation adaptatives en français - Version étendue avec questions approfondies
export const orientationQuestions: DiagnosticQuestion[] = [
  // ===========================================
  // 1. ENGAGEMENT DIRECTION & STRATÉGIE
  // ===========================================
  
  // Question principale
  {
    id: 'strategy_main',
    category: 'Engagement Direction & Stratégie',
    priority: 'high',
    question: "Quel est le niveau d'engagement de votre direction vis-à-vis de la fonction achats ?",
    options: [
      { 
        text: "La direction considère les achats uniquement comme une fonction de contrôle des coûts", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "La direction comprend l'importance des achats mais sans engagement stratégique", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "La direction soutient modérément les initiatives achats", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "La direction considère les achats comme un partenaire stratégique", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "La direction fait des achats un pilier stratégique avec ressources dédiées", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  // Questions approfondies STRATÉGIE
  {
    id: 'strategy_resources',
    category: 'Engagement Direction & Stratégie',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'strategy_main',
    question: "La direction fournit-elle des ressources financières, humaines et techniques adéquates pour la fonction achats ?",
    options: [
      { text: "Ressources très limitées, fonction achats sous-financée", score: 1, action: 'continue' },
      { text: "Ressources basiques, budget serré pour les initiatives", score: 2, action: 'continue' },
      { text: "Ressources correctes mais parfois insuffisantes", score: 3, action: 'continue' },
      { text: "Ressources adéquates pour la plupart des projets", score: 4, action: 'continue' },
      { text: "Ressources excellentes, investissements stratégiques réguliers", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'strategy_mission_vision',
    category: 'Engagement Direction & Stratégie',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'strategy_main',
    question: "Avez-vous établi une mission, vision et feuille de route stratégique claire pour les achats ?",
    options: [
      { text: "Aucune mission ni vision formalisée", score: 1, action: 'continue' },
      { text: "Mission/vision existante mais peu communiquée", score: 2, action: 'continue' },
      { text: "Mission/vision claire mais feuille de route floue", score: 3, action: 'continue' },
      { text: "Mission, vision et roadmap bien définies et communiquées", score: 4, action: 'continue' },
      { text: "Stratégie achats complète, approuvée et pilotée par la direction", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'strategy_governance',
    category: 'Engagement Direction & Stratégie',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'strategy_main',
    question: "Comment est organisée la gouvernance des achats dans votre organisation ?",
    options: [
      { text: "Aucune gouvernance formelle, décisions ad-hoc", score: 1, action: 'continue' },
      { text: "Gouvernance basique, comité informel occasionnel", score: 2, action: 'continue' },
      { text: "Comité achats régulier avec processus de décision défini", score: 3, action: 'continue' },
      { text: "Gouvernance structurée avec représentation exécutive", score: 4, action: 'continue' },
      { text: "Gouvernance d'excellence avec pilotage stratégique et opérationnel", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 2. RELATIONS PARTENAIRES INTERNES
  // ===========================================
  
  {
    id: 'internal_partners_main',
    category: 'Relations avec Partenaires Internes',
    priority: 'high',
    question: "Comment qualifiez-vous vos relations avec les clients internes (métiers, finance, juridique...) ?",
    options: [
      { 
        text: "Relations conflictuelles, achats perçus comme un frein", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "Relations correctes mais manque de collaboration", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "Bonnes relations avec collaboration ponctuelle", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "Très bonnes relations, partenariat reconnu", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "Relations exemplaires, achats vus comme business partner", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  {
    id: 'internal_communication',
    category: 'Relations avec Partenaires Internes',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'internal_partners_main',
    question: "Avez-vous mis en place des canaux de communication efficaces avec vos clients internes ?",
    options: [
      { text: "Communication informelle et réactive", score: 1, action: 'continue' },
      { text: "Quelques points de contact réguliers", score: 2, action: 'continue' },
      { text: "Réunions périodiques et reporting établis", score: 3, action: 'continue' },
      { text: "Communication structurée avec outils collaboratifs", score: 4, action: 'continue' },
      { text: "Écosystème de communication digital et proactif", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'internal_sla',
    category: 'Relations avec Partenaires Internes',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'internal_partners_main',
    question: "Avez-vous défini des accords de service (SLA) avec vos clients internes ?",
    options: [
      { text: "Aucun SLA formalisé", score: 1, action: 'continue' },
      { text: "Engagements informels non documentés", score: 2, action: 'continue' },
      { text: "SLA basiques documentés mais peu suivis", score: 3, action: 'continue' },
      { text: "SLA détaillés avec suivi de performance", score: 4, action: 'continue' },
      { text: "SLA sophistiqués avec amélioration continue", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 3. GESTION PAR CATÉGORIES
  // ===========================================
  
  {
    id: 'category_management_main',
    category: 'Gestion par Catégories',
    priority: 'high',
    question: "Comment organisez-vous la gestion de vos catégories d'achats ?",
    options: [
      { 
        text: "Aucune segmentation, approche généraliste", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "Segmentation basique par famille de produits", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "Organisation par catégories avec responsables identifiés", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "Category management structuré avec stratégies dédiées", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "Excellence en category management avec innovation continue", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  {
    id: 'category_strategies',
    category: 'Gestion par Catégories',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'category_management_main',
    question: "Développez-vous des stratégies spécifiques par catégorie d'achats ?",
    options: [
      { text: "Aucune stratégie catégorielle", score: 1, action: 'continue' },
      { text: "Quelques approches différenciées informelles", score: 2, action: 'continue' },
      { text: "Stratégies documentées pour les catégories principales", score: 3, action: 'continue' },
      { text: "Stratégies complètes avec plans d'action détaillés", score: 4, action: 'continue' },
      { text: "Roadmaps stratégiques par catégorie avec innovation", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'category_market_intelligence',
    category: 'Gestion par Catégories',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'category_management_main',
    question: "Réalisez-vous de la veille marché et intelligence économique par catégorie ?",
    options: [
      { text: "Aucune veille systématique", score: 1, action: 'continue' },
      { text: "Veille occasionnelle et réactive", score: 2, action: 'continue' },
      { text: "Veille régulière sur les catégories stratégiques", score: 3, action: 'continue' },
      { text: "Intelligence marché structurée avec outils dédiés", score: 4, action: 'continue' },
      { text: "Veille prédictive et anticipation des tendances", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 4. COLLABORATION ET INNOVATION FOURNISSEURS
  // ===========================================
  
  {
    id: 'supplier_innovation_main',
    category: 'Collaboration et Innovation Fournisseurs',
    priority: 'high',
    question: "Comment développez-vous l'innovation avec vos fournisseurs ?",
    options: [
      { 
        text: "Aucune démarche d'innovation collaborative", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "Quelques initiatives ponctuelles d'innovation", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "Programme d'innovation avec fournisseurs clés", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "Écosystème d'innovation structuré et performant", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "Leadership en co-innovation avec impact business majeur", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  {
    id: 'supplier_early_involvement',
    category: 'Collaboration et Innovation Fournisseurs',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'supplier_innovation_main',
    question: "Impliquez-vous vos fournisseurs en amont dans vos projets de développement ?",
    options: [
      { text: "Fournisseurs consultés uniquement en phase d'achat", score: 1, action: 'continue' },
      { text: "Implication occasionnelle sur projets stratégiques", score: 2, action: 'continue' },
      { text: "ESI (Early Supplier Involvement) sur catégories clés", score: 3, action: 'continue' },
      { text: "ESI systématique avec processus formalisé", score: 4, action: 'continue' },
      { text: "Co-développement avancé dès la conception", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'supplier_ecosystems',
    category: 'Collaboration et Innovation Fournisseurs',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'supplier_innovation_main',
    question: "Animez-vous des écosystèmes fournisseurs (startups, PME, grands groupes) ?",
    options: [
      { text: "Relations bilatérales exclusivement", score: 1, action: 'continue' },
      { text: "Quelques événements fournisseurs ponctuels", score: 2, action: 'continue' },
      { text: "Communauté fournisseurs avec événements réguliers", score: 3, action: 'continue' },
      { text: "Écosystème actif avec plateformes d'échange", score: 4, action: 'continue' },
      { text: "Orchestration d'écosystèmes innovants multi-acteurs", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 5. ORGANISATION ET PROCESSUS
  // ===========================================
  
  {
    id: 'organization_processes_main',
    category: 'Organisation et Processus',
    priority: 'high',
    question: "Comment évaluez-vous la maturité de votre organisation et processus achats ?",
    options: [
      { 
        text: "Organisation ad-hoc, processus informels", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "Organisation basique, processus partiellement documentés", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "Organisation structurée, processus documentés et suivis", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "Organisation optimisée, processus d'excellence", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "Organisation agile, processus adaptatifs et automatisés", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  {
    id: 'process_standardization',
    category: 'Organisation et Processus',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'organization_processes_main',
    question: "Vos processus achats sont-ils standardisés à travers l'organisation ?",
    options: [
      { text: "Chaque site/entité fonctionne différemment", score: 1, action: 'continue' },
      { text: "Tentatives de standardisation avec résistances", score: 2, action: 'continue' },
      { text: "Processus standardisés sur le cœur de métier", score: 3, action: 'continue' },
      { text: "Standardisation avancée avec adaptations locales", score: 4, action: 'continue' },
      { text: "Processus globaux unifiés et optimisés", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'process_continuous_improvement',
    category: 'Organisation et Processus',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'organization_processes_main',
    question: "Avez-vous mis en place une démarche d'amélioration continue des processus ?",
    options: [
      { text: "Aucune démarche d'amélioration systématique", score: 1, action: 'continue' },
      { text: "Améliorations ponctuelles selon les problèmes", score: 2, action: 'continue' },
      { text: "Processus de révision périodique établi", score: 3, action: 'continue' },
      { text: "Démarche Lean/Six Sigma active", score: 4, action: 'continue' },
      { text: "Innovation processus continue avec agilité", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 6. GESTION DES CONTRATS
  // ===========================================
  
  {
    id: 'contract_management_main',
    category: 'Gestion des Contrats',
    priority: 'high',
    question: "Comment gérez-vous le cycle de vie de vos contrats ?",
    options: [
      { 
        text: "Gestion manuelle, contrats éparpillés", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "Centralisation partielle, suivi basique", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "Gestion centralisée avec outils de suivi", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "CLM (Contract Lifecycle Management) sophistiqué", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "Gestion contractuelle intelligente et prédictive", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  {
    id: 'contract_compliance',
    category: 'Gestion des Contrats',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'contract_management_main',
    question: "Comment assurez-vous le respect des termes contractuels ?",
    options: [
      { text: "Aucun suivi systématique de compliance", score: 1, action: 'continue' },
      { text: "Contrôles ponctuels et réactifs", score: 2, action: 'continue' },
      { text: "Processus de suivi défini avec alertes", score: 3, action: 'continue' },
      { text: "Monitoring automatisé avec tableaux de bord", score: 4, action: 'continue' },
      { text: "Intelligence contractuelle avec prévention proactive", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'contract_value_capture',
    category: 'Gestion des Contrats',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'contract_management_main',
    question: "Mesurez-vous et optimisez-vous la valeur générée par vos contrats ?",
    options: [
      { text: "Aucune mesure de valeur contractuelle", score: 1, action: 'continue' },
      { text: "Suivi basique des économies réalisées", score: 2, action: 'continue' },
      { text: "Mesure de la valeur sur contrats stratégiques", score: 3, action: 'continue' },
      { text: "Analytics avancés sur performance contractuelle", score: 4, action: 'continue' },
      { text: "Optimisation continue avec IA prédictive", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 7. SOURCING STRATÉGIQUE
  // ===========================================
  
  {
    id: 'strategic_sourcing_main',
    category: 'Sourcing Stratégique',
    priority: 'high',
    question: "Quelle est votre approche du sourcing stratégique ?",
    options: [
      { 
        text: "Achats opportunistes, pas de stratégie sourcing", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "Sourcing basique avec appels d'offres ponctuels", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "Démarche sourcing structurée sur catégories clés", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "Sourcing stratégique avancé avec analyses sophistiquées", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "Excellence en sourcing avec innovation méthodologique", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  {
    id: 'sourcing_analysis',
    category: 'Sourcing Stratégique',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'strategic_sourcing_main',
    question: "Réalisez-vous des analyses TCO (Total Cost of Ownership) et should-cost ?",
    options: [
      { text: "Focus uniquement sur le prix d'achat", score: 1, action: 'continue' },
      { text: "Prise en compte occasionnelle des coûts indirects", score: 2, action: 'continue' },
      { text: "Analyses TCO sur achats stratégiques", score: 3, action: 'continue' },
      { text: "TCO et should-cost systématiques", score: 4, action: 'continue' },
      { text: "Modélisation avancée avec simulation de scénarios", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'sourcing_portfolio',
    category: 'Sourcing Stratégique',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'strategic_sourcing_main',
    question: "Utilisez-vous des matrices de portefeuille (type Kraljic) pour vos décisions sourcing ?",
    options: [
      { text: "Approche homogène pour tous les achats", score: 1, action: 'continue' },
      { text: "Distinction basique entre achats stratégiques et opérationnels", score: 2, action: 'continue' },
      { text: "Matrice de portefeuille appliquée partiellement", score: 3, action: 'continue' },
      { text: "Analyse portfolio systématique avec stratégies adaptées", score: 4, action: 'continue' },
      { text: "Matrices sophistiquées avec intelligence artificielle", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 8. GESTION DES RISQUES
  // ===========================================
  
  {
    id: 'risk_management_main',
    category: 'Gestion des Risques',
    priority: 'high',
    question: "Comment gérez-vous les risques dans vos achats ?",
    options: [
      { 
        text: "Aucune démarche formalisée de gestion des risques", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "Identification basique des risques majeurs", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "Cartographie des risques avec plans d'action", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "Gestion des risques intégrée et proactive", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "Excellence en risk management avec prédiction", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  {
    id: 'supplier_risk_assessment',
    category: 'Gestion des Risques',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'risk_management_main',
    question: "Évaluez-vous systématiquement les risques fournisseurs ?",
    options: [
      { text: "Aucune évaluation des risques fournisseurs", score: 1, action: 'continue' },
      { text: "Vérifications basiques avant contractualisation", score: 2, action: 'continue' },
      { text: "Due diligence sur fournisseurs stratégiques", score: 3, action: 'continue' },
      { text: "Assessment risques complet et monitoring continu", score: 4, action: 'continue' },
      { text: "Intelligence risques avec alertes prédictives", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'business_continuity',
    category: 'Gestion des Risques',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'risk_management_main',
    question: "Avez-vous des plans de continuité d'activité pour vos achats critiques ?",
    options: [
      { text: "Aucun plan de continuité formalisé", score: 1, action: 'continue' },
      { text: "Plans informels pour quelques fournisseurs critiques", score: 2, action: 'continue' },
      { text: "Plans de continuité documentés et testés", score: 3, action: 'continue' },
      { text: "BCP complets avec suppliers de backup", score: 4, action: 'continue' },
      { text: "Résilience avancée avec redondance intelligente", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 9. GESTION DES TALENTS
  // ===========================================
  
  {
    id: 'talent_management_main',
    category: 'Gestion des Talents',
    priority: 'high',
    question: "Comment développez-vous les compétences de votre équipe achats ?",
    options: [
      { 
        text: "Peu ou pas de formation spécialisée", 
        score: 1, 
        action: 'deep_dive' 
      },
      { 
        text: "Formations ponctuelles selon les besoins", 
        score: 2, 
        action: 'deep_dive' 
      },
      { 
        text: "Plan de formation annuel avec budget dédié", 
        score: 3, 
        action: 'continue' 
      },
      { 
        text: "Développement des talents structuré et personnalisé", 
        score: 4, 
        action: 'skip_category' 
      },
      { 
        text: "Académie achats interne et leadership développement", 
        score: 5, 
        action: 'skip_category' 
      }
    ]
  },

  {
    id: 'skills_matrix',
    category: 'Gestion des Talents',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'talent_management_main',
    question: "Avez-vous défini une matrice de compétences pour les achats ?",
    options: [
      { text: "Aucun référentiel de compétences", score: 1, action: 'continue' },
      { text: "Description de poste basique", score: 2, action: 'continue' },
      { text: "Matrice de compétences par niveau/fonction", score: 3, action: 'continue' },
      { text: "Référentiel complet avec évaluation régulière", score: 4, action: 'continue' },
      { text: "Compétences évolutives avec IA et futurs métiers", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'career_development',
    category: 'Gestion des Talents',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'talent_management_main',
    question: "Proposez-vous des parcours de carrière attractifs dans les achats ?",
    options: [
      { text: "Peu d'évolution possible, turn-over élevé", score: 1, action: 'continue' },
      { text: "Évolutions limitées et peu valorisées", score: 2, action: 'continue' },
      { text: "Parcours de carrière définis avec mobilité", score: 3, action: 'continue' },
      { text: "Développement de carrière attractif et diversifié", score: 4, action: 'continue' },
      { text: "Pépinière de talents achats reconnue dans l'entreprise", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'talent_engagement',
    category: 'Gestion des Talents',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'talent_management_main',
    question: "Mesurez-vous l'engagement et le bien-être de votre équipe achats ?",
    options: [
      { text: "Aucune mesure, ou climat généralement négatif", score: 1, action: 'continue' },
      { text: "Feedbacks informels uniquement, sans évaluation structurée", score: 2, action: 'continue' },
      { text: "Enquête de satisfaction occasionnelle, sans plan d'action suivi", score: 3, action: 'continue' },
      { text: "Sondages réguliers avec actions pour améliorer le bien-être", score: 4, action: 'continue' },
      { text: "Engagement élevé, bien-être piloté avec indicateurs et initiatives dédiées", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 10. ACHATS RESPONSABLES & DÉVELOPPEMENT DURABLE
  // ===========================================
  
  {
    id: 'sustainable_main',
    category: 'Achats Responsables',
    priority: 'high',
    question: "Quel est le niveau d'intégration du développement durable et de la RSE dans vos achats ?",
    options: [
      {
        text: "Aucune considération du développement durable dans les achats, focus uniquement sur le coût",
        score: 1,
        action: 'deep_dive'
      },
      {
        text: "Quelques actions RSE ponctuelles ou respect minimal des obligations légales",
        score: 2,
        action: 'deep_dive'
      },
      {
        text: "Intégration basique de critères RSE (code de conduite, clauses contractuelles) dans les achats",
        score: 3,
        action: 'continue'
      },
      {
        text: "Politique d'achats responsables structurée avec objectifs de durabilité définis",
        score: 4,
        action: 'skip_category'
      },
      {
        text: "Achats responsables au cœur de la stratégie, performance ESG pilotée au plus haut niveau",
        score: 5,
        action: 'skip_category'
      }
    ]
  },

  {
    id: 'sustainable_environment',
    category: 'Achats Responsables',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'sustainable_main',
    question: "Intégrez-vous des critères environnementaux (empreinte carbone, éco-conception) dans vos décisions d'achat ?",
    options: [
      { text: "Aucun critère environnemental pris en compte", score: 1, action: 'continue' },
      { text: "Respect des réglementations minimales uniquement", score: 2, action: 'continue' },
      { text: "Quelques critères écologiques intégrés pour certaines catégories", score: 3, action: 'continue' },
      { text: "Critères environnementaux systématiquement intégrés et suivis", score: 4, action: 'continue' },
      { text: "Approche proactive : réduction de l'empreinte carbone, initiatives d'économie circulaire, etc.", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'sustainable_social',
    category: 'Achats Responsables',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'sustainable_main',
    question: "Exigez-vous de vos fournisseurs des engagements éthiques et sociaux (conditions de travail, inclusion, bien-être) ?",
    options: [
      { text: "Aucun critère social ou éthique particulier", score: 1, action: 'continue' },
      { text: "Charte éthique existante mais sans contrôle effectif", score: 2, action: 'continue' },
      { text: "Critères sociaux de base demandés aux fournisseurs (conformité légale)", score: 3, action: 'continue' },
      { text: "Évaluations RSE régulières des fournisseurs clés, plans d'action suivis", score: 4, action: 'continue' },
      { text: "Excellence sociale : audits éthiques, encouragement de la diversité, programmes de bien-être dans la supply chain", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 11. DIGITALISATION DES ACHATS
  // ===========================================
  
  {
    id: 'digital_main',
    category: 'Digitalisation des Achats',
    priority: 'high',
    question: "Quel est le niveau de digitalisation de vos processus et outils achats ?",
    options: [
      {
        text: "Processus principalement manuels, très peu d'outils numériques déployés",
        score: 1,
        action: 'deep_dive'
      },
      {
        text: "Quelques outils isolés (tableur, e-mail), faible automatisation globale",
        score: 2,
        action: 'deep_dive'
      },
      {
        text: "Outils clés en place (e-sourcing, P2P) mais adoption partielle par l'équipe",
        score: 3,
        action: 'continue'
      },
      {
        text: "Suite d'outils intégrée, processus majoritairement digitalisés",
        score: 4,
        action: 'skip_category'
      },
      {
        text: "Digitalisation avancée de bout en bout (automatisation, IA, chatbot, etc.)",
        score: 5,
        action: 'skip_category'
      }
    ]
  },

  {
    id: 'digital_data',
    category: 'Digitalisation des Achats',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'digital_main',
    question: "Exploitez-vous les données achats pour des analyses avancées (spend analysis, BI) ?",
    options: [
      { text: "Données peu exploitées, analyses manuelles occasionnelles", score: 1, action: 'continue' },
      { text: "Analyses basiques sur les principales dépenses", score: 2, action: 'continue' },
      { text: "Utilisation régulière d'outils de BI pour analyser les dépenses", score: 3, action: 'continue' },
      { text: "Analyses avancées (segmentation, prévisions) à partir de données fiables", score: 4, action: 'continue' },
      { text: "Analytics prédictif (IA) utilisé pour optimiser les décisions en temps réel", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'digital_automation',
    category: 'Digitalisation des Achats',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'digital_main',
    question: "Avez-vous automatisé des processus achats ou adopté des technologies innovantes (RPA, IA) ?",
    options: [
      { text: "Aucune automatisation en place au-delà des tâches manuelles", score: 1, action: 'continue' },
      { text: "Automatisations ponctuelles via outils simples ou macros", score: 2, action: 'continue' },
      { text: "Automatisation débutée sur certains processus standard (ex: commandes)", score: 3, action: 'continue' },
      { text: "Automatisations étendues (RPA sur processus clés, chatbot interne, etc.)", score: 4, action: 'continue' },
      { text: "Innovation continue : automatisation généralisée, laboratoires d'innovation internes", score: 5, action: 'continue' }
    ]
  },

  // ===========================================
  // 12. GESTION DE LA PERFORMANCE
  // ===========================================
  
  {
    id: 'performance_main',
    category: 'Gestion de la Performance',
    priority: 'high',
    question: "Comment pilotez-vous la performance de la fonction achats ?",
    options: [
      {
        text: "Aucun indicateur de performance suivi (aucun KPI défini)",
        score: 1,
        action: 'deep_dive'
      },
      {
        text: "Quelques KPIs de base suivis de manière ad-hoc, focus sur les économies",
        score: 2,
        action: 'deep_dive'
      },
      {
        text: "KPIs principaux définis (économies, qualité, délais) avec suivi régulier",
        score: 3,
        action: 'continue'
      },
      {
        text: "Tableau de bord complet aligné sur la stratégie, revu périodiquement en comité de direction",
        score: 4,
        action: 'skip_category'
      },
      {
        text: "Pilotage en continu : KPIs dynamiques (coût, risque, ESG, satisfaction) partagés en temps réel",
        score: 5,
        action: 'skip_category'
      }
    ]
  },

  {
    id: 'performance_scope',
    category: 'Gestion de la Performance',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'performance_main',
    question: "La performance achats est-elle mesurée au-delà des coûts (qualité, risques, durabilité) ?",
    options: [
      { text: "Focus uniquement sur les économies financières", score: 1, action: 'continue' },
      { text: "Quelques indicateurs non-financiers suivis ponctuellement", score: 2, action: 'continue' },
      { text: "KPIs étendus (qualité, délais) pour certaines catégories critiques", score: 3, action: 'continue' },
      { text: "Tableau de bord équilibré incluant également risques et durabilité", score: 4, action: 'continue' },
      { text: "Approche 360° : satisfaction interne, performance fournisseurs, ESG et innovation également mesurés", score: 5, action: 'continue' }
    ]
  },

  {
    id: 'performance_reporting',
    category: 'Gestion de la Performance',
    priority: 'medium',
    isFollowUp: true,
    parentQuestionId: 'performance_main',
    question: "Comment communiquez-vous les résultats et contributions des achats au sein de l'entreprise ?",
    options: [
      { text: "Communication minimale ou inexistante sur la performance achats", score: 1, action: 'continue' },
      { text: "Rapports occasionnels, uniquement sur demande", score: 2, action: 'continue' },
      { text: "Rapport trimestriel standard adressé à la direction", score: 3, action: 'continue' },
      { text: "Revues de performance mensuelles avec les parties prenantes clés", score: 4, action: 'continue' },
      { text: "Transparence totale : dashboard en libre-service et revues stratégiques régulières", score: 5, action: 'continue' }
    ]
  }
];

export class OrientationDiagnosticEngine {
  private questions: DiagnosticQuestion[] = [];
  private answers: Map<string, { question: DiagnosticQuestion; option: DiagnosticOption }> = new Map();
  private currentQuestionIndex = 0;
  private sessionId: string;
  private skipCategories: Set<string> = new Set();

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeQuestions();
  }

  private generateSessionId(): string {
    return `orientation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeQuestions(): void {
    // Commencer par les questions principales, triées par priorité
    this.questions = orientationQuestions
      .filter(q => !q.isFollowUp)
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  getCurrentQuestion(): DiagnosticQuestion | null {
    // Arrêter si on a atteint le maximum de questions (15)
    if (this.answers.size >= 15) {
      return null;
    }
    
    if (this.currentQuestionIndex >= this.questions.length) {
      return null;
    }

    const question = this.questions[this.currentQuestionIndex];
    
    // Vérifier si cette catégorie doit être ignorée
    if (this.skipCategories.has(question.category)) {
      this.currentQuestionIndex++;
      return this.getCurrentQuestion();
    }

    return question;
  }

  answerQuestion(questionId: string, optionIndex: number): boolean {
    const question = this.questions.find(q => q.id === questionId);
    if (!question || !question.options[optionIndex]) {
      return false;
    }

    const selectedOption = question.options[optionIndex];
    
    // Enregistrer la réponse
    this.answers.set(questionId, { question, option: selectedOption });

    // Traiter l'action de l'option
    switch (selectedOption.action) {
      case 'skip_category':
        // Score élevé, ignorer les autres questions de cette catégorie
        this.skipCategories.add(question.category);
        break;
        
      case 'deep_dive':
        // Score faible, ajouter question de creusement si disponible
        const followUpQuestion = orientationQuestions.find(
          q => q.isFollowUp && q.parentQuestionId === questionId
        );
        if (followUpQuestion && !this.answers.has(followUpQuestion.id)) {
          // Insérer la question de suivi juste après la question actuelle
          this.questions.splice(this.currentQuestionIndex + 1, 0, followUpQuestion);
        }
        break;
        
      default:
        // Continue normalement
        break;
    }

    this.currentQuestionIndex++;
    return true;
  }

  isCompleted(): boolean {
    // Diagnostic terminé si on a répondu à au moins 6 questions ET qu'il n'y a plus de questions
    // OU si on a atteint 15 questions maximum
    const hasMinimumQuestions = this.answers.size >= 6;
    const hasMaximumQuestions = this.answers.size >= 15;
    const noMoreQuestions = this.getCurrentQuestion() === null;
    
    return (hasMinimumQuestions && noMoreQuestions) || hasMaximumQuestions;
  }

  getProgress(): { current: number; total: number; percentage: number } {
    const questionsAnswered = this.answers.size;
    
    // Si le diagnostic est terminé, ajuster le total au nombre réel de questions posées
    if (this.isCompleted()) {
      return {
        current: questionsAnswered,
        total: questionsAnswered,
        percentage: 100
      };
    }
    
    // Calculer le numéro de la question actuelle
    const currentQuestionNumber = questionsAnswered + 1;
    
    // Estimation dynamique basée sur le diagnostic adaptatif
    let estimatedTotal;
    
    if (questionsAnswered === 0) {
      estimatedTotal = 12; // Estimation initiale
    } else if (questionsAnswered <= 3) {
      estimatedTotal = 10; // Après quelques questions, ajuster
    } else {
      // Estimation basée sur le pattern actuel
      const skippedCategories = this.skipCategories.size;
      const remainingMainQuestions = this.questions.length - this.currentQuestionIndex;
      
      // Ajuster selon les catégories sautées et questions restantes
      estimatedTotal = Math.min(
        questionsAnswered + Math.max(remainingMainQuestions - skippedCategories, 2),
        15 // Maximum absolu
      );
      estimatedTotal = Math.max(estimatedTotal, questionsAnswered + 1); // Au moins une question de plus
    }
    
    // Calculer le pourcentage de progression
    const percentage = Math.round((questionsAnswered / estimatedTotal) * 100);
    
    return {
      current: currentQuestionNumber,
      total: estimatedTotal,
      percentage: Math.min(100, percentage)
    };
  }

  getResults(): DiagnosticResult {
    const categoryScores: Record<string, any> = {};
    
    // Calculer les scores par catégorie
    for (const [, answer] of this.answers) {
      const category = answer.question.category;
      if (!categoryScores[category]) {
        categoryScores[category] = {
          totalScore: 0,
          maxScore: 0,
          count: 0
        };
      }
      
      categoryScores[category].totalScore += answer.option.score;
      categoryScores[category].maxScore += 5; // Score maximum par question
      categoryScores[category].count++;
    }

    // Calculer les pourcentages et niveaux
    Object.keys(categoryScores).forEach(category => {
      const data = categoryScores[category];
      data.percentage = Math.round((data.totalScore / data.maxScore) * 100);
      data.level = this.getMaturityLevel(data.percentage);
      data.score = data.totalScore;
      data.maxScore = data.maxScore;
    });

    // Score global
    const totalScore = Object.values(categoryScores).reduce((sum: number, cat: any) => sum + cat.totalScore, 0);
    const totalMaxScore = Object.values(categoryScores).reduce((sum: number, cat: any) => sum + cat.maxScore, 0);
    const overallPercentage = Math.round((totalScore / totalMaxScore) * 100);

    // Identifier forces et faiblesses
    const strengths = Object.entries(categoryScores)
      .filter(([, data]: [string, any]) => data.percentage >= 70)
      .map(([category]) => category);

    const weaknesses = Object.entries(categoryScores)
      .filter(([, data]: [string, any]) => data.percentage < 60)
      .sort(([, a], [, b]) => a.percentage - b.percentage)
      .map(([category]) => category);

    return {
      sessionId: this.sessionId,
      timestamp: new Date(),
      categoryScores,
      overallScore: totalScore,
      overallPercentage,
      overallLevel: this.getMaturityLevel(overallPercentage),
      strengths,
      weaknesses,
      recommendedDiagnostics: this.getRecommendedDiagnostics(categoryScores),
      insights: '', // Sera rempli par Gemini
      recommendations: [], // Sera rempli par Gemini
      nextSteps: [] // Sera rempli par Gemini
    };
  }

  private getMaturityLevel(percentage: number): 'débutant' | 'intermédiaire' | 'avancé' | 'expert' {
    if (percentage >= 85) return 'expert';
    if (percentage >= 70) return 'avancé';
    if (percentage >= 50) return 'intermédiaire';
    return 'débutant';
  }

  private getRecommendedDiagnostics(categoryScores: Record<string, any>): Array<{
    id: string;
    name: string;
    priority: 'urgent' | 'important' | 'utile';
    reason: string;
  }> {
    const recommendations: Array<{
      id: string;
      name: string;
      priority: 'urgent' | 'important' | 'utile';
      reason: string;
    }> = [];
    
    // Mapping des catégories vers les diagnostics
    const categoryDiagnosticMapping = {
      'Engagement Direction & Stratégie': {
        id: 'strategic-orientation',
        name: 'Diagnostic Orientation Stratégique',
        lowScoreReason: 'Votre stratégie achats nécessite un renforcement pour s\'aligner sur les objectifs d\'entreprise'
      },
      'Relations avec Partenaires Internes': {
        id: 'stakeholder-management',
        name: 'Diagnostic Gestion des Parties Prenantes',
        lowScoreReason: 'Vos relations internes doivent être améliorées pour optimiser la collaboration'
      },
      'Gestion par Catégories': {
        id: 'category-management',
        name: 'Diagnostic Category Management',
        lowScoreReason: 'Votre approche catégorielle peut être développée pour maximiser la valeur'
      },
      'Collaboration et Innovation Fournisseurs': {
        id: 'supplier-innovation',
        name: 'Diagnostic Innovation Fournisseurs',
        lowScoreReason: 'Votre potentiel d\'innovation collaborative avec les fournisseurs est sous-exploité'
      },
      'Organisation et Processus': {
        id: 'maturity-mmcm',
        name: 'Diagnostic Maturité MMCM',
        lowScoreReason: 'Vos processus achats ont besoin d\'être formalisés et optimisés'
      },
      'Gestion des Contrats': {
        id: 'contract-management',
        name: 'Diagnostic Gestion Contractuelle',
        lowScoreReason: 'Votre gestion contractuelle nécessite une approche plus structurée'
      },
      'Sourcing Stratégique': {
        id: 'strategic-sourcing',
        name: 'Diagnostic Sourcing Stratégique',
        lowScoreReason: 'Vos méthodes de sourcing peuvent être optimisées pour créer plus de valeur'
      },
      'Gestion des Risques': {
        id: 'risk-management',
        name: 'Diagnostic Gestion des Risques',
        lowScoreReason: 'Votre approche des risques achats doit être renforcée'
      },
      'Gestion des Talents': {
        id: 'talent-development',
        name: 'Diagnostic Développement des Talents',
        lowScoreReason: 'Le développement de vos équipes achats nécessite une attention particulière'
      },
      'Achats Responsables': {
        id: 'sustainable-procurement',
        name: 'Diagnostic Achats Responsables',
        lowScoreReason: 'Votre approche des achats responsables n\'est pas à la hauteur des attentes actuelles en matière de durabilité'
      },
      'Digitalisation des Achats': {
        id: 'digital-transformation',
        name: 'Diagnostic Transformation Digitale des Achats',
        lowScoreReason: 'Vos outils et processus digitaux sont insuffisamment développés, limitant l\'efficacité de la fonction achats'
      },
      'Gestion de la Performance': {
        id: 'performance-management',
        name: 'Diagnostic Performance Achats',
        lowScoreReason: 'Le pilotage de la performance de la fonction achats mérite d\'être renforcé avec des indicateurs clairs et un reporting régulier'
      }
    };

    // Recommander diagnostics selon les faiblesses
    Object.entries(categoryScores).forEach(([category, data]: [string, any]) => {
      const mapping = categoryDiagnosticMapping[category as keyof typeof categoryDiagnosticMapping];
      if (mapping) {
        if (data.percentage < 40) {
          recommendations.push({
            id: mapping.id,
            name: mapping.name,
            priority: 'urgent' as const,
            reason: mapping.lowScoreReason
          });
        } else if (data.percentage < 70) {
          recommendations.push({
            id: mapping.id,
            name: mapping.name,
            priority: 'important' as const,
            reason: `Votre ${category.toLowerCase()} peut être améliorée pour atteindre l'excellence`
          });
        }
      }
    });

    // Limiter à 3 recommandations max, triées par priorité
    return recommendations
      .sort((a, b) => {
        const priorityOrder = { urgent: 3, important: 2, utile: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 3);
  }

  getAnswers(): Map<string, { question: DiagnosticQuestion; option: DiagnosticOption }> {
    return new Map(this.answers);
  }
}
