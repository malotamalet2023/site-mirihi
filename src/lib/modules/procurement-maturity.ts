import { DiagnosticModule, DiagnosticCategory, VisualizationType } from '../diagnostic-types';

export const procurementMaturityModule: DiagnosticModule = {
  id: 'procurement-maturity',
  name: 'Diagnostic de Maturité Achats Global',
  description: 'Évaluation complète de la maturité de votre fonction Achats basée sur le modèle MMCM Mirihi et les meilleures pratiques internationales',
  category: DiagnosticCategory.MATURITY,
  estimatedDuration: '15-20 minutes',
  questions: [
    {
      id: 'leadership_commitment_1',
      category: 'Engagement de la Direction',
      question: 'Quel est le niveau d\'engagement de votre direction générale envers la fonction Achats ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 3,
      options: [
        {
          text: 'Les Achats sont vus comme un centre de coût à minimiser',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Reconnaissance du rôle mais implication limitée',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Support actif avec ressources allouées',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Champion stratégique avec vision partagée et sponsorship exécutif',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'organizational_structure_1',
      category: 'Structure Organisationnelle',
      question: 'Comment votre fonction Achats est-elle structurée ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2.5,
      options: [
        {
          text: 'Décentralisée sans coordination, chacun achète selon ses besoins',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Semi-centralisée avec coordination limitée',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Centralisée avec expertise par catégorie',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Centre d\'excellence hybride avec expertise transverse et spécialisée',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'talent_management_1',
      category: 'Gestion des Talents',
      question: 'Comment gérez-vous le développement des compétences de votre équipe Achats ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Recrutement de profils qualifiés',
          'Formation continue et certification',
          'Plans de carrière définis',
          'Mobilité interne et externe',
          'Reconnaissance et rémunération',
          'Diversité et inclusion'
        ],
        columns: ['Inexistant', 'Basique', 'Structuré', 'Excellence'],
        scoringType: 'weighted'
      }
    },
    {
      id: 'processes_methodologies_1',
      category: 'Processus et Méthodologies',
      question: 'Quel est le niveau de standardisation et d\'optimisation de vos processus Achats ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Processus de sourcing',
          'Évaluation et sélection fournisseurs',
          'Négociation et contractualisation',
          'Gestion des commandes',
          'Réception et contrôle',
          'Gestion des litiges',
          'Évaluation de la performance'
        ],
        columns: ['Informel', 'Documenté', 'Standardisé', 'Optimisé'],
        scoringType: 'average'
      }
    },
    {
      id: 'technology_digitalization_1',
      category: 'Technologie et Digitalisation',
      question: 'Quel est votre niveau de maturité technologique ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2,
      options: [
        {
          text: 'Processus manuels avec outils bureautiques basiques',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Quelques outils spécialisés non intégrés',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Plateforme e-procurement avec intégrations ERP',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Écosystème digital complet avec IA, RPA et analytics avancés',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'supplier_management_1',
      category: 'Gestion des Fournisseurs',
      question: 'Comment qualifiez-vous votre approche de gestion des relations fournisseurs ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Base fournisseurs qualifiée',
          'Segmentation et classification',
          'Évaluation de la performance',
          'Programmes de développement',
          'Gestion des risques',
          'Innovation collaborative'
        ],
        columns: ['Ad-hoc', 'Basique', 'Structuré', 'Avancé'],
        scoringType: 'weighted'
      }
    },
    {
      id: 'strategy_planning_1',
      category: 'Stratégie et Planification',
      question: 'Disposez-vous d\'une stratégie Achats formalisée et alignée ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2.5,
      options: [
        {
          text: 'Aucune stratégie formalisée, approche réactive',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Orientations générales mais peu détaillées',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Stratégie claire avec plans d\'action par catégorie',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Stratégie intégrée avec roadmap transformation et KPIs',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'measurement_control_1',
      category: 'Mesure et Contrôle',
      question: 'Quels types de KPIs et de reporting utilisez-vous ?',
      questionType: 'multiple-choice',
      priority: 'high',
      options: [
        { text: 'Savings et réductions de coût', score: 2 },
        { text: 'Qualité et performance fournisseurs', score: 3 },
        { text: 'Délais et respect des plannings', score: 2 },
        { text: 'ROI et valeur créée', score: 4 },
        { text: 'Innovation et nouveaux produits', score: 4 },
        { text: 'Satisfaction client interne', score: 3 },
        { text: 'Impact RSE et durabilité', score: 4 },
        { text: 'Efficacité des processus', score: 3 }
      ]
    },
    {
      id: 'risk_compliance_1',
      category: 'Risques et Conformité',
      question: 'Comment gérez-vous les risques et la conformité dans vos Achats ?',
      questionType: 'matrix',
      priority: 'medium',
      matrixConfig: {
        rows: [
          'Identification des risques',
          'Évaluation et cartographie',
          'Plans de mitigation',
          'Monitoring et alertes',
          'Conformité réglementaire',
          'Audit et contrôle'
        ],
        columns: ['Minimal', 'Réactif', 'Proactif', 'Prédictif'],
        scoringType: 'average'
      }
    },
    {
      id: 'sustainability_ethics_1',
      category: 'Durabilité et Éthique',
      question: 'Quel est votre niveau d\'intégration des critères ESG et d\'éthique ?',
      questionType: 'scale',
      priority: 'medium',
      scaleConfig: {
        min: 1,
        max: 5,
        step: 1,
        labels: [
          { value: 1, label: 'Aucune considération ESG' },
          { value: 2, label: 'Sensibilisation basique' },
          { value: 3, label: 'Critères ESG formalisés' },
          { value: 4, label: 'ESG intégré dans les processus' },
          { value: 5, label: 'Leadership ESG avec impact mesurable' }
        ]
      }
    },
    {
      id: 'innovation_collaboration_1',
      category: 'Innovation et Collaboration',
      question: 'Comment développez-vous l\'innovation avec vos parties prenantes ?',
      questionType: 'multiple-choice',
      priority: 'medium',
      options: [
        { text: 'Collaboration avec fournisseurs stratégiques', score: 3 },
        { text: 'Co-développement de nouveaux produits/services', score: 4 },
        { text: 'Programmes d\'innovation ouverte', score: 4 },
        { text: 'Participation à des écosystèmes d\'innovation', score: 4 },
        { text: 'Partenariats avec startups et scale-ups', score: 3 },
        { text: 'Laboratoires d\'innovation internes', score: 4 }
      ]
    },
    {
      id: 'continuous_improvement_1',
      category: 'Amélioration Continue',
      question: 'Quelle est votre approche de l\'amélioration continue ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Aucune démarche formalisée',
          score: 1
        },
        {
          text: 'Initiatives ponctuelles d\'amélioration',
          score: 2
        },
        {
          text: 'Processus structuré avec indicateurs de suivi',
          score: 3
        },
        {
          text: 'Culture d\'amélioration continue avec innovation méthodologique',
          score: 4
        }
      ]
    }
  ],
  scoringModel: {
    type: 'weighted',
    categories: [
      {
        id: 'leadership',
        name: 'Engagement de la Direction',
        weight: 3,
        maxScore: 4
      },
      {
        id: 'organization',
        name: 'Structure Organisationnelle',
        weight: 2.5,
        maxScore: 4
      },
      {
        id: 'talent',
        name: 'Gestion des Talents',
        weight: 2.5,
        maxScore: 4
      },
      {
        id: 'processes',
        name: 'Processus et Méthodologies',
        weight: 3,
        maxScore: 4
      },
      {
        id: 'technology',
        name: 'Technologie et Digitalisation',
        weight: 2.5,
        maxScore: 4
      },
      {
        id: 'suppliers',
        name: 'Gestion des Fournisseurs',
        weight: 2.5,
        maxScore: 4
      },
      {
        id: 'strategy',
        name: 'Stratégie et Planification',
        weight: 3,
        maxScore: 4
      },
      {
        id: 'measurement',
        name: 'Mesure et Contrôle',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'risk',
        name: 'Risques et Conformité',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'sustainability',
        name: 'Durabilité et Éthique',
        weight: 1.5,
        maxScore: 5
      },
      {
        id: 'innovation',
        name: 'Innovation et Collaboration',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'improvement',
        name: 'Amélioration Continue',
        weight: 1.5,
        maxScore: 4
      }
    ],
    maturityLevels: [
      {
        level: 1,
        name: 'Initial - Réactif',
        description: 'Processus informels, approche réactive, focus sur la conformité de base',
        minPercentage: 0,
        maxPercentage: 25,
        color: '#dc2626',
        icon: '🔴'
      },
      {
        level: 2,
        name: 'Géré - Structuré',
        description: 'Processus documentés, approche structurée, performance mesurée',
        minPercentage: 26,
        maxPercentage: 45,
        color: '#ea580c',
        icon: '🟠'
      },
      {
        level: 3,
        name: 'Défini - Standardisé',
        description: 'Processus standardisés, approche proactive, amélioration continue',
        minPercentage: 46,
        maxPercentage: 65,
        color: '#ca8a04',
        icon: '🟡'
      },
      {
        level: 4,
        name: 'Quantitatif - Optimisé',
        description: 'Processus mesurés et contrôlés, optimisation basée sur les données',
        minPercentage: 66,
        maxPercentage: 80,
        color: '#16a34a',
        icon: '🟢'
      },
      {
        level: 5,
        name: 'Optimisant - Innovant',
        description: 'Innovation continue, adaptation agile, leadership dans l\'industrie',
        minPercentage: 81,
        maxPercentage: 100,
        color: '#2563eb',
        icon: '🔵'
      }
    ]
  },
  reportTemplate: {
    type: 'maturity',
    sections: [
      {
        id: 'maturity_overview',
        title: 'Vue d\'Ensemble de la Maturité',
        type: 'summary',
        content: 'Évaluation globale de votre niveau de maturité Achats',
        order: 1
      },
      {
        id: 'maturity_radar',
        title: 'Radar de Maturité',
        type: 'chart',
        content: 'Visualisation des niveaux par dimension',
        order: 2
      },
      {
        id: 'gap_analysis',
        title: 'Analyse des Écarts',
        type: 'detailed',
        content: 'Identification des domaines d\'amélioration prioritaires',
        order: 3
      },
      {
        id: 'maturity_roadmap',
        title: 'Roadmap de Maturité',
        type: 'recommendations',
        content: 'Plan de progression vers l\'excellence',
        order: 4
      },
      {
        id: 'quick_wins',
        title: 'Quick Wins et Actions Prioritaires',
        type: 'action-plan',
        content: 'Actions immédiates pour améliorer la performance',
        order: 5
      },
      {
        id: 'benchmarking',
        title: 'Benchmarking Sectoriel',
        type: 'detailed',
        content: 'Comparaison avec les meilleures pratiques du secteur',
        order: 6
      }
    ],
    visualizations: [
      VisualizationType.RADAR_CHART,
      VisualizationType.BAR_CHART,
      VisualizationType.HEATMAP,
      VisualizationType.SCATTER_PLOT
    ],
    exportFormats: ['pdf', 'excel', 'powerpoint']
  }
};
