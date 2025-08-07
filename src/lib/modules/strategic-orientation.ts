import { DiagnosticModule, DiagnosticCategory, VisualizationType } from '../diagnostic-types';

export const strategicOrientationModule: DiagnosticModule = {
  id: 'strategic-orientation',
  name: 'Diagnostic d\'Orientation Stratégique Achats',
  description: 'Évalue l\'alignement stratégique et l\'orientation de votre fonction Achats pour identifier les axes de développement prioritaires',
  category: DiagnosticCategory.STRATEGIC_ORIENTATION,
  estimatedDuration: '8-10 minutes',
  questions: [
    {
      id: 'strategic_vision_1',
      category: 'Vision et Alignement Stratégique',
      question: 'Quel est le niveau d\'intégration de la stratégie Achats dans la stratégie globale de votre entreprise ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2,
      options: [
        {
          text: 'Aucune stratégie Achats formalisée ou déconnectée de la stratégie entreprise',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Stratégie Achats basique mais peu alignée avec les objectifs business',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Stratégie Achats claire, partiellement alignée avec la stratégie entreprise',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Stratégie Achats pleinement intégrée et co-construite avec la direction générale',
          score: 4,
          followUp: 'skip_category'
        }
      ]
    },
    {
      id: 'strategic_vision_2',
      category: 'Vision et Alignement Stratégique',
      question: 'Quels sont les principaux obstacles à l\'élaboration d\'une stratégie Achats alignée ?',
      questionType: 'multiple-choice',
      priority: 'high',
      isFollowUp: true,
      parentQuestionId: 'strategic_vision_1',
      options: [
        { text: 'Manque de vision claire de la direction', score: 1 },
        { text: 'Compétences stratégiques insuffisantes dans l\'équipe', score: 1 },
        { text: 'Résistance organisationnelle au changement', score: 2 },
        { text: 'Manque de données pour analyser les enjeux', score: 2 },
        { text: 'Budget insuffisant pour la transformation', score: 1 }
      ]
    },
    {
      id: 'value_positioning_1',
      category: 'Positionnement Valeur',
      question: 'Comment votre organisation perçoit-elle la contribution de la fonction Achats ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2,
      options: [
        {
          text: 'Centre de coût à minimiser',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Fonction support opérationnelle',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Levier d\'optimisation et d\'efficacité',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Partenaire stratégique créateur de valeur',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'value_positioning_2',
      category: 'Positionnement Valeur',
      question: 'Sur quels types de valeur votre fonction Achats se concentre-t-elle principalement ?',
      questionType: 'matrix',
      priority: 'medium',
      matrixConfig: {
        rows: ['Réduction des coûts', 'Optimisation qualité', 'Innovation collaborative', 'Gestion des risques', 'Durabilité/RSE'],
        columns: ['Pas du tout', 'Peu', 'Modérément', 'Fortement'],
        scoringType: 'weighted'
      }
    },
    {
      id: 'digital_maturity_1',
      category: 'Maturité Digitale et Innovation',
      question: 'Quel est votre niveau de maturité en matière de digitalisation des Achats ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 1.5,
      options: [
        {
          text: 'Processus entièrement manuels ou outils basiques (Excel)',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Quelques outils digitaux non intégrés',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Plateforme e-procurement intégrée avec analytics de base',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Écosystème digital avancé avec IA, automation et analytics prédictifs',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'innovation_approach_1',
      category: 'Approche Innovation',
      question: 'Comment abordez-vous l\'innovation avec vos fournisseurs ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Aucune démarche d\'innovation collaborative',
          score: 1
        },
        {
          text: 'Initiatives ponctuelles et non structurées',
          score: 2
        },
        {
          text: 'Programmes d\'innovation avec fournisseurs clés',
          score: 3
        },
        {
          text: 'Écosystème d\'innovation ouvert et co-développement systématique',
          score: 4
        }
      ]
    },
    {
      id: 'sustainability_integration_1',
      category: 'Intégration Durabilité',
      question: 'Quel est le niveau d\'intégration des critères ESG (Environnement, Social, Gouvernance) dans vos décisions d\'achat ?',
      questionType: 'scale',
      priority: 'medium',
      scaleConfig: {
        min: 1,
        max: 5,
        step: 1,
        labels: [
          { value: 1, label: 'Aucune prise en compte' },
          { value: 2, label: 'Prise en compte occasionnelle' },
          { value: 3, label: 'Critères ESG formalisés' },
          { value: 4, label: 'ESG intégré dans tous les processus' },
          { value: 5, label: 'Leadership ESG avec impact mesurable' }
        ]
      }
    },
    {
      id: 'capability_development_1',
      category: 'Développement des Capacités',
      question: 'Comment évaluez-vous les capacités actuelles de votre équipe Achats ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Négociation et sourcing',
          'Analyse de données et analytics',
          'Gestion de projets complexes',
          'Connaissance des marchés fournisseurs',
          'Compétences digitales',
          'Gestion des risques',
          'Intelligence économique'
        ],
        columns: ['Faible', 'Correct', 'Bon', 'Excellent'],
        scoringType: 'average'
      }
    },
    {
      id: 'risk_management_1',
      category: 'Gestion des Risques',
      question: 'Quelle est votre approche de la gestion des risques fournisseurs ?',
      questionType: 'single-choice',
      priority: 'high',
      options: [
        {
          text: 'Aucune démarche formalisée de gestion des risques',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Évaluation basique des risques majeurs',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Cartographie des risques avec plans de contingence',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Gestion proactive des risques avec monitoring continu et early warning',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'performance_measurement_1',
      category: 'Mesure de la Performance',
      question: 'Quels KPIs utilisez-vous pour mesurer la performance de votre fonction Achats ?',
      questionType: 'multiple-choice',
      priority: 'medium',
      options: [
        { text: 'Savings/réductions de coûts', score: 2 },
        { text: 'Qualité et conformité fournisseurs', score: 3 },
        { text: 'Délais et respect des plannings', score: 2 },
        { text: 'Innovation et nouveaux produits/services', score: 4 },
        { text: 'Satisfaction client interne', score: 3 },
        { text: 'Impact RSE et durabilité', score: 4 },
        { text: 'ROI des initiatives Achats', score: 4 }
      ]
    },
    {
      id: 'future_readiness_1',
      category: 'Préparation Futur',
      question: 'Comment votre fonction Achats se prépare-t-elle aux défis futurs ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Aucune vision prospective ou préparation',
          score: 1
        },
        {
          text: 'Réflexion occasionnelle sur les tendances',
          score: 2
        },
        {
          text: 'Veille active et adaptation progressive',
          score: 3
        },
        {
          text: 'Anticipation proactive avec roadmap de transformation',
          score: 4
        }
      ]
    }
  ],
  scoringModel: {
    type: 'weighted',
    categories: [
      {
        id: 'vision_strategy',
        name: 'Vision et Alignement Stratégique',
        weight: 3,
        maxScore: 4
      },
      {
        id: 'value_positioning',
        name: 'Positionnement Valeur',
        weight: 2.5,
        maxScore: 4
      },
      {
        id: 'digital_innovation',
        name: 'Maturité Digitale et Innovation',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'sustainability',
        name: 'Intégration Durabilité',
        weight: 1.5,
        maxScore: 5
      },
      {
        id: 'capabilities',
        name: 'Développement des Capacités',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'risk_management',
        name: 'Gestion des Risques',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'performance',
        name: 'Mesure de la Performance',
        weight: 1.5,
        maxScore: 4
      },
      {
        id: 'future_readiness',
        name: 'Préparation Futur',
        weight: 1.5,
        maxScore: 4
      }
    ],
    maturityLevels: [
      {
        level: 1,
        name: 'Orienté Coût',
        description: 'Focus principal sur la réduction des coûts et l\'efficacité opérationnelle',
        minPercentage: 0,
        maxPercentage: 35,
        color: '#ef4444',
        icon: '💰'
      },
      {
        level: 2,
        name: 'Orienté Processus',
        description: 'Optimisation des processus et amélioration de la qualité',
        minPercentage: 36,
        maxPercentage: 55,
        color: '#f97316',
        icon: '⚙️'
      },
      {
        level: 3,
        name: 'Orienté Valeur',
        description: 'Création de valeur ajoutée et partenariats stratégiques',
        minPercentage: 56,
        maxPercentage: 75,
        color: '#eab308',
        icon: '💎'
      },
      {
        level: 4,
        name: 'Orienté Innovation',
        description: 'Leadership en innovation et avantage concurrentiel durable',
        minPercentage: 76,
        maxPercentage: 100,
        color: '#22c55e',
        icon: '🚀'
      }
    ]
  },
  reportTemplate: {
    type: 'strategic',
    sections: [
      {
        id: 'executive_summary',
        title: 'Résumé Exécutif',
        type: 'summary',
        content: 'Vue d\'ensemble de votre orientation stratégique Achats',
        order: 1
      },
      {
        id: 'strategic_positioning',
        title: 'Positionnement Stratégique',
        type: 'detailed',
        content: 'Analyse détaillée de votre positionnement actuel',
        order: 2
      },
      {
        id: 'capability_assessment',
        title: 'Évaluation des Capacités',
        type: 'chart',
        content: 'Radar des compétences et capacités',
        order: 3
      },
      {
        id: 'transformation_roadmap',
        title: 'Feuille de Route Transformation',
        type: 'recommendations',
        content: 'Recommandations prioritaires pour évoluer',
        order: 4
      },
      {
        id: 'action_plan',
        title: 'Plan d\'Action 12 mois',
        type: 'action-plan',
        content: 'Actions concrètes à mettre en œuvre',
        order: 5
      }
    ],
    visualizations: [
      VisualizationType.RADAR_CHART,
      VisualizationType.BAR_CHART,
      VisualizationType.HEATMAP
    ],
    exportFormats: ['pdf', 'excel', 'powerpoint']
  }
};
