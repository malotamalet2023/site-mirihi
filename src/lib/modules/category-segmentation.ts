import { DiagnosticModule, DiagnosticCategory, VisualizationType } from '../diagnostic-types';

export const categorySegmentationModule: DiagnosticModule = {
  id: 'category-segmentation',
  name: 'Diagnostic de Segmentation des Catégories',
  description: 'Évalue et optimise la segmentation de vos catégories d\'achat selon la matrice de Kraljic et les meilleures pratiques du Category Management',
  category: DiagnosticCategory.CATEGORY_MANAGEMENT,
  estimatedDuration: '12-15 minutes',
  questions: [
    {
      id: 'category_mapping_1',
      category: 'Cartographie des Catégories',
      question: 'Combien de catégories d\'achat avez-vous identifiées dans votre organisation ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2,
      options: [
        {
          text: 'Aucune catégorisation formelle',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Moins de 10 catégories très larges',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Entre 10 et 30 catégories bien définies',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Plus de 30 catégories avec sous-catégories détaillées',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'kraljic_understanding_1',
      category: 'Connaissance Matrice Kraljic',
      question: 'Utilisez-vous la matrice de Kraljic (Impact Business vs Complexité Marché) pour segmenter vos catégories ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2,
      options: [
        {
          text: 'Non, je ne connais pas cette matrice',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Je connais le concept mais ne l\'applique pas',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'J\'utilise une version simplifiée de cette matrice',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'J\'applique rigoureusement la matrice de Kraljic avec critères détaillés',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'strategic_categories_1',
      category: 'Catégories Stratégiques',
      question: 'Pour vos catégories stratégiques (fort impact business + complexité marché élevée), quelle approche adoptez-vous ?',
      questionType: 'multiple-choice',
      priority: 'high',
      options: [
        { text: 'Partenariats stratégiques à long terme', score: 4 },
        { text: 'Innovation collaborative et co-développement', score: 4 },
        { text: 'Diversification des sources d\'approvisionnement', score: 3 },
        { text: 'Veille marché approfondie et intelligence économique', score: 4 },
        { text: 'Négociation basée sur la valeur totale', score: 3 },
        { text: 'Gestion des risques proactive', score: 4 }
      ]
    },
    {
      id: 'leverage_categories_1',
      category: 'Catégories Levier',
      question: 'Pour vos catégories levier (fort impact business + faible complexité marché), quelles tactiques privilégiez-vous ?',
      questionType: 'multiple-choice',
      priority: 'high',
      options: [
        { text: 'Négociation agressive sur les prix', score: 3 },
        { text: 'Appels d\'offres concurrentiels fréquents', score: 4 },
        { text: 'Consolidation des volumes', score: 4 },
        { text: 'Benchmarking prix régulier', score: 3 },
        { text: 'Contrats à court terme pour flexibilité', score: 2 },
        { text: 'Substitution produits/fournisseurs', score: 3 }
      ]
    },
    {
      id: 'bottleneck_categories_1',
      category: 'Catégories Goulot',
      question: 'Comment gérez-vous vos catégories goulot d\'étranglement (faible impact business + forte complexité marché) ?',
      questionType: 'multiple-choice',
      priority: 'medium',
      options: [
        { text: 'Simplification des spécifications', score: 4 },
        { text: 'Recherche de fournisseurs alternatifs', score: 3 },
        { text: 'Standardisation des produits', score: 4 },
        { text: 'Contrats à long terme pour sécuriser l\'approvisionnement', score: 3 },
        { text: 'Développement de nouveaux fournisseurs', score: 4 },
        { text: 'Réduction du nombre de références', score: 3 }
      ]
    },
    {
      id: 'routine_categories_1',
      category: 'Catégories Routine',
      question: 'Pour vos catégories routine (faible impact business + faible complexité marché), quelle est votre stratégie ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Gestion manuelle au cas par cas',
          score: 1
        },
        {
          text: 'Processus standardisés basiques',
          score: 2
        },
        {
          text: 'Automatisation avec e-procurement',
          score: 3
        },
        {
          text: 'Délégation complète aux utilisateurs avec catalogue',
          score: 4
        }
      ]
    },
    {
      id: 'category_analysis_1',
      category: 'Analyse des Catégories',
      question: 'Quels critères utilisez-vous pour évaluer l\'impact business de vos catégories ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Montant des dépenses annuelles',
          'Impact sur la qualité produit/service final',
          'Impact sur les délais de production',
          'Criticité pour l\'activité',
          'Potentiel d\'innovation',
          'Impact image/réputation'
        ],
        columns: ['Pas utilisé', 'Occasionnellement', 'Systématiquement', 'Avec pondération'],
        scoringType: 'weighted'
      }
    },
    {
      id: 'market_complexity_1',
      category: 'Complexité Marché',
      question: 'Comment évaluez-vous la complexité du marché fournisseurs pour chaque catégorie ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Nombre de fournisseurs disponibles',
          'Barrières à l\'entrée pour nouveaux fournisseurs',
          'Volatilité des prix',
          'Complexité technique du produit/service',
          'Réglementations et certifications requises',
          'Géopolitique et risques géographiques'
        ],
        columns: ['Non évalué', 'Évaluation basique', 'Analyse détaillée', 'Monitoring continu'],
        scoringType: 'average'
      }
    },
    {
      id: 'category_strategy_1',
      category: 'Stratégies par Catégorie',
      question: 'Avez-vous défini des stratégies d\'achat spécifiques pour chaque catégorie ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2,
      options: [
        {
          text: 'Aucune stratégie formalisée par catégorie',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Quelques orientations générales par grande famille',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Stratégies documentées pour les catégories principales',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Plans stratégiques détaillés et mis à jour annuellement pour toutes les catégories',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'category_ownership_1',
      category: 'Propriété des Catégories',
      question: 'Comment est organisée la responsabilité de vos catégories d\'achat ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Aucune attribution claire de responsabilité',
          score: 1
        },
        {
          text: 'Responsabilité par équipe géographique ou business unit',
          score: 2
        },
        {
          text: 'Category Managers dédiés pour les catégories principales',
          score: 3
        },
        {
          text: 'Centre d\'excellence avec experts spécialisés par catégorie',
          score: 4
        }
      ]
    },
    {
      id: 'performance_tracking_1',
      category: 'Suivi Performance',
      question: 'Quels KPIs suivez-vous spécifiquement par catégorie ?',
      questionType: 'multiple-choice',
      priority: 'medium',
      options: [
        { text: 'Savings réalisés', score: 2 },
        { text: 'Évolution des prix du marché', score: 3 },
        { text: 'Performance fournisseurs (qualité, délais)', score: 3 },
        { text: 'Niveau de risque de la catégorie', score: 4 },
        { text: 'Innovation apportée par les fournisseurs', score: 4 },
        { text: 'Satisfaction des clients internes', score: 3 },
        { text: 'TCO (Total Cost of Ownership)', score: 4 }
      ]
    },
    {
      id: 'spend_analysis_1',
      category: 'Analyse des Dépenses',
      question: 'À quelle fréquence analysez-vous vos dépenses par catégorie ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Aucune analyse régulière',
          score: 1
        },
        {
          text: 'Analyse annuelle basique',
          score: 2
        },
        {
          text: 'Analyse trimestrielle avec tendances',
          score: 3
        },
        {
          text: 'Monitoring continu avec dashboards temps réel',
          score: 4
        }
      ]
    }
  ],
  scoringModel: {
    type: 'matrix',
    categories: [
      {
        id: 'category_mapping',
        name: 'Cartographie des Catégories',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'kraljic_application',
        name: 'Application Matrice Kraljic',
        weight: 3,
        maxScore: 4
      },
      {
        id: 'strategic_approach',
        name: 'Approche Stratégique',
        weight: 2.5,
        maxScore: 4
      },
      {
        id: 'category_analysis',
        name: 'Analyse des Catégories',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'category_management',
        name: 'Gestion des Catégories',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'performance_measurement',
        name: 'Mesure de la Performance',
        weight: 1.5,
        maxScore: 4
      }
    ],
    segmentationMatrix: {
      xAxis: {
        name: 'Impact Business',
        criteria: ['Montant dépenses', 'Criticité activité', 'Impact qualité', 'Potentiel innovation']
      },
      yAxis: {
        name: 'Complexité Marché',
        criteria: ['Nombre fournisseurs', 'Volatilité prix', 'Complexité technique', 'Barrières entrée']
      },
      quadrants: [
        {
          name: 'Stratégique',
          description: 'Fort impact business + Forte complexité marché',
          strategies: [
            'Partenariats stratégiques long terme',
            'Innovation collaborative',
            'Gestion proactive des risques',
            'Intelligence marché approfondie'
          ],
          color: '#dc2626'
        },
        {
          name: 'Levier',
          description: 'Fort impact business + Faible complexité marché',
          strategies: [
            'Négociation agressive',
            'Appels d\'offres concurrentiels',
            'Consolidation volumes',
            'Benchmarking prix'
          ],
          color: '#ea580c'
        },
        {
          name: 'Goulot',
          description: 'Faible impact business + Forte complexité marché',
          strategies: [
            'Simplification spécifications',
            'Standardisation produits',
            'Sécurisation approvisionnement',
            'Développement fournisseurs alternatifs'
          ],
          color: '#ca8a04'
        },
        {
          name: 'Routine',
          description: 'Faible impact business + Faible complexité marché',
          strategies: [
            'Automatisation processus',
            'E-procurement',
            'Délégation aux utilisateurs',
            'Optimisation administrative'
          ],
          color: '#16a34a'
        }
      ]
    },
    maturityLevels: [
      {
        level: 1,
        name: 'Catégorisation Basique',
        description: 'Segmentation rudimentaire sans méthodologie',
        minPercentage: 0,
        maxPercentage: 35,
        color: '#ef4444',
        icon: '📊'
      },
      {
        level: 2,
        name: 'Segmentation Structurée',
        description: 'Application partielle de la matrice de Kraljic',
        minPercentage: 36,
        maxPercentage: 55,
        color: '#f97316',
        icon: '🎯'
      },
      {
        level: 3,
        name: 'Category Management',
        description: 'Gestion structurée avec stratégies différenciées',
        minPercentage: 56,
        maxPercentage: 75,
        color: '#eab308',
        icon: '⚡'
      },
      {
        level: 4,
        name: 'Excellence Catégorielle',
        description: 'Optimisation avancée et innovation par catégorie',
        minPercentage: 76,
        maxPercentage: 100,
        color: '#22c55e',
        icon: '🏆'
      }
    ]
  },
  reportTemplate: {
    type: 'segmentation',
    sections: [
      {
        id: 'segmentation_overview',
        title: 'Vue d\'Ensemble de la Segmentation',
        type: 'summary',
        content: 'Analyse globale de votre approche de segmentation',
        order: 1
      },
      {
        id: 'kraljic_matrix',
        title: 'Matrice de Kraljic',
        type: 'chart',
        content: 'Positionnement de vos catégories sur la matrice',
        order: 2
      },
      {
        id: 'category_strategies',
        title: 'Stratégies par Quadrant',
        type: 'detailed',
        content: 'Recommandations spécifiques par type de catégorie',
        order: 3
      },
      {
        id: 'optimization_opportunities',
        title: 'Opportunités d\'Optimisation',
        type: 'recommendations',
        content: 'Actions prioritaires par catégorie',
        order: 4
      },
      {
        id: 'implementation_plan',
        title: 'Plan d\'Implémentation',
        type: 'action-plan',
        content: 'Feuille de route pour améliorer la segmentation',
        order: 5
      }
    ],
    visualizations: [
      VisualizationType.MATRIX,
      VisualizationType.SCATTER_PLOT,
      VisualizationType.HEATMAP,
      VisualizationType.TREEMAP
    ],
    exportFormats: ['pdf', 'excel', 'powerpoint']
  }
};
