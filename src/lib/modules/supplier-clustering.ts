import { DiagnosticModule, DiagnosticCategory, VisualizationType } from '../diagnostic-types';

export const supplierClusteringModule: DiagnosticModule = {
  id: 'supplier-clustering',
  name: 'Diagnostic de Clusterisation Fournisseurs',
  description: 'Analyse et optimise la segmentation de votre base fournisseurs pour une gestion différenciée et des relations adaptées',
  category: DiagnosticCategory.SUPPLIER_MANAGEMENT,
  estimatedDuration: '10-12 minutes',
  questions: [
    {
      id: 'supplier_base_1',
      category: 'Base Fournisseurs',
      question: 'Quelle est la taille de votre base fournisseurs active ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 1.5,
      options: [
        {
          text: 'Moins de 50 fournisseurs',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Entre 50 et 200 fournisseurs',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Entre 200 et 500 fournisseurs',
          score: 4,
          followUp: 'continue'
        },
        {
          text: 'Plus de 500 fournisseurs',
          score: 3,
          followUp: 'deep_dive'
        }
      ]
    },
    {
      id: 'supplier_segmentation_1',
      category: 'Segmentation Fournisseurs',
      question: 'Comment segmentez-vous actuellement vos fournisseurs ?',
      questionType: 'single-choice',
      priority: 'high',
      weight: 2,
      options: [
        {
          text: 'Aucune segmentation formelle',
          score: 1,
          followUp: 'deep_dive'
        },
        {
          text: 'Segmentation simple par volume d\'achats',
          score: 2,
          followUp: 'continue'
        },
        {
          text: 'Segmentation multicritères (volume, criticité, performance)',
          score: 3,
          followUp: 'continue'
        },
        {
          text: 'Clustering avancé avec algorithmes et analyse prédictive',
          score: 4,
          followUp: 'continue'
        }
      ]
    },
    {
      id: 'supplier_performance_1',
      category: 'Évaluation Performance',
      question: 'Sur quels critères évaluez-vous la performance de vos fournisseurs ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Qualité des produits/services',
          'Respect des délais de livraison',
          'Compétitivité des prix',
          'Capacité d\'innovation',
          'Stabilité financière',
          'Conformité réglementaire',
          'Responsabilité environnementale',
          'Flexibilité et réactivité',
          'Service client et support'
        ],
        columns: ['Non évalué', 'Évaluation basique', 'Suivi régulier', 'Scoring automatisé'],
        scoringType: 'weighted'
      }
    },
    {
      id: 'strategic_suppliers_1',
      category: 'Fournisseurs Stratégiques',
      question: 'Comment identifiez-vous et gérez-vous vos fournisseurs stratégiques ?',
      questionType: 'multiple-choice',
      priority: 'high',
      options: [
        { text: 'Critères de volume et de criticité', score: 3 },
        { text: 'Potentiel d\'innovation et de différenciation', score: 4 },
        { text: 'Capacité de partenariat à long terme', score: 4 },
        { text: 'Exclusivité ou dépendance mutuelle', score: 3 },
        { text: 'Alignement stratégique et valeurs', score: 4 },
        { text: 'Capacité de co-développement', score: 4 }
      ]
    },
    {
      id: 'supplier_development_1',
      category: 'Développement Fournisseurs',
      question: 'Avez-vous des programmes de développement pour vos fournisseurs ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Aucun programme de développement',
          score: 1
        },
        {
          text: 'Actions ponctuelles de support',
          score: 2
        },
        {
          text: 'Programmes structurés pour fournisseurs clés',
          score: 3
        },
        {
          text: 'Écosystème de développement avec KPIs et ROI mesurés',
          score: 4
        }
      ]
    },
    {
      id: 'supplier_risk_1',
      category: 'Gestion Risques Fournisseurs',
      question: 'Comment évaluez-vous et gérez-vous les risques fournisseurs ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Risque financier',
          'Risque opérationnel',
          'Risque géopolitique',
          'Risque environnemental',
          'Risque réputationnel',
          'Risque de dépendance',
          'Risque cyber-sécurité'
        ],
        columns: ['Non géré', 'Évaluation ponctuelle', 'Monitoring régulier', 'Gestion proactive'],
        scoringType: 'average'
      }
    },
    {
      id: 'supplier_innovation_1',
      category: 'Innovation Fournisseurs',
      question: 'Comment capitalisez-vous sur l\'innovation de vos fournisseurs ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Aucune démarche d\'innovation avec les fournisseurs',
          score: 1
        },
        {
          text: 'Veille occasionnelle sur les nouveautés',
          score: 2
        },
        {
          text: 'Programmes d\'innovation avec fournisseurs sélectionnés',
          score: 3
        },
        {
          text: 'Écosystème d\'innovation ouvert et co-création systématique',
          score: 4
        }
      ]
    },
    {
      id: 'supplier_lifecycle_1',
      category: 'Cycle de Vie Fournisseurs',
      question: 'Comment gérez-vous le cycle de vie complet de vos relations fournisseurs ?',
      questionType: 'matrix',
      priority: 'medium',
      matrixConfig: {
        rows: [
          'Sourcing et sélection',
          'Intégration et onboarding',
          'Gestion quotidienne',
          'Évaluation performance',
          'Développement et amélioration',
          'Fin de relation'
        ],
        columns: ['Processus informel', 'Processus basique', 'Processus structuré', 'Processus optimisé'],
        scoringType: 'average'
      }
    },
    {
      id: 'supplier_data_1',
      category: 'Données Fournisseurs',
      question: 'Quel niveau de données collectez-vous et analysez-vous sur vos fournisseurs ?',
      questionType: 'multiple-choice',
      priority: 'medium',
      options: [
        { text: 'Données contractuelles de base', score: 2 },
        { text: 'Données de performance opérationnelle', score: 3 },
        { text: 'Données financières et de santé', score: 3 },
        { text: 'Données d\'innovation et R&D', score: 4 },
        { text: 'Données ESG et durabilité', score: 4 },
        { text: 'Analytics prédictifs et intelligence artificielle', score: 4 }
      ]
    },
    {
      id: 'supplier_relationship_1',
      category: 'Relations Fournisseurs',
      question: 'Comment caractériseriez-vous vos relations avec vos différents types de fournisseurs ?',
      questionType: 'matrix',
      priority: 'high',
      matrixConfig: {
        rows: [
          'Fournisseurs commodités',
          'Fournisseurs tactiques',
          'Fournisseurs préférés',
          'Partenaires stratégiques'
        ],
        columns: ['Transactionnelle', 'Collaborative', 'Partenariale', 'Intégrée'],
        scoringType: 'weighted'
      }
    },
    {
      id: 'supplier_consolidation_1',
      category: 'Consolidation Base',
      question: 'Avez-vous une stratégie de consolidation de votre base fournisseurs ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Aucune stratégie, croissance organique de la base',
          score: 1
        },
        {
          text: 'Réduction occasionnelle du nombre de fournisseurs',
          score: 2
        },
        {
          text: 'Stratégie claire de rationalisation par catégorie',
          score: 3
        },
        {
          text: 'Optimisation continue avec équilibre risque/performance',
          score: 4
        }
      ]
    },
    {
      id: 'supplier_digitalization_1',
      category: 'Digitalisation Relations',
      question: 'Quel est votre niveau de digitalisation des relations fournisseurs ?',
      questionType: 'single-choice',
      priority: 'medium',
      options: [
        {
          text: 'Communications et processus manuels',
          score: 1
        },
        {
          text: 'Portail fournisseurs basique',
          score: 2
        },
        {
          text: 'Plateforme intégrée avec workflow automatisés',
          score: 3
        },
        {
          text: 'Écosystème digital avec API, IoT et analytics temps réel',
          score: 4
        }
      ]
    }
  ],
  scoringModel: {
    type: 'cluster',
    categories: [
      {
        id: 'supplier_segmentation',
        name: 'Segmentation et Classification',
        weight: 3,
        maxScore: 4
      },
      {
        id: 'performance_evaluation',
        name: 'Évaluation de la Performance',
        weight: 2.5,
        maxScore: 4
      },
      {
        id: 'risk_management',
        name: 'Gestion des Risques',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'relationship_management',
        name: 'Gestion des Relations',
        weight: 2.5,
        maxScore: 4
      },
      {
        id: 'innovation_development',
        name: 'Innovation et Développement',
        weight: 2,
        maxScore: 4
      },
      {
        id: 'lifecycle_management',
        name: 'Gestion du Cycle de Vie',
        weight: 1.5,
        maxScore: 4
      },
      {
        id: 'digitalization',
        name: 'Digitalisation',
        weight: 1.5,
        maxScore: 4
      }
    ],
    clusteringAlgorithm: {
      algorithm: 'custom',
      dimensions: [
        'Volume d\'achats',
        'Criticité business',
        'Performance',
        'Potentiel innovation',
        'Niveau de risque',
        'Qualité relation'
      ],
      clusterCount: 5,
      clusters: [
        {
          name: 'Partenaires Stratégiques',
          description: 'Fournisseurs critiques avec forte valeur ajoutée et relation privilégiée',
          characteristics: [
            'Volume élevé ou criticité forte',
            'Performance excellente',
            'Innovation forte',
            'Relation partenariale',
            'Risque maîtrisé'
          ],
          recommendations: [
            'Contrats long terme avec clauses innovation',
            'Gouvernance dédiée et executive sponsorship',
            'Co-développement et roadmaps partagées',
            'Partage de risques et de bénéfices',
            'Intégration dans les processus stratégiques'
          ],
          color: '#dc2626'
        },
        {
          name: 'Fournisseurs Préférés',
          description: 'Fournisseurs performants avec potentiel de développement',
          characteristics: [
            'Performance bonne à très bonne',
            'Potentiel d\'évolution',
            'Relation collaborative',
            'Risque faible à modéré'
          ],
          recommendations: [
            'Programmes de développement ciblés',
            'Augmentation progressive du volume',
            'Évaluation régulière des performances',
            'Opportunités d\'innovation ponctuelle'
          ],
          color: '#ea580c'
        },
        {
          name: 'Fournisseurs Transactionnels',
          description: 'Fournisseurs standards avec relation commerciale classique',
          characteristics: [
            'Performance correcte',
            'Relation transactionnelle',
            'Standardisation possible',
            'Risque standard'
          ],
          recommendations: [
            'Optimisation des processus',
            'Négociation prix/conditions',
            'Évaluation périodique',
            'Possibilité de consolidation'
          ],
          color: '#ca8a04'
        },
        {
          name: 'Fournisseurs à Développer',
          description: 'Fournisseurs avec potentiel mais nécessitant des améliorations',
          characteristics: [
            'Performance insuffisante',
            'Potentiel identifié',
            'Nécessité d\'accompagnement',
            'Risque modéré'
          ],
          recommendations: [
            'Plans d\'amélioration structurés',
            'Support et formation',
            'Objectifs de performance clairs',
            'Monitoring renforcé'
          ],
          color: '#16a34a'
        },
        {
          name: 'Fournisseurs à Risque',
          description: 'Fournisseurs problématiques nécessitant une action urgente',
          characteristics: [
            'Performance défaillante',
            'Risques élevés',
            'Relation dégradée',
            'Impact business négatif'
          ],
          recommendations: [
            'Plan de sortie ou de remplacement',
            'Mitigation des risques immédiats',
            'Recherche d\'alternatives',
            'Gestion de crise si nécessaire'
          ],
          color: '#7c2d12'
        }
      ]
    },
    maturityLevels: [
      {
        level: 1,
        name: 'Gestion Basique',
        description: 'Approche transactionnelle sans segmentation',
        minPercentage: 0,
        maxPercentage: 35,
        color: '#ef4444',
        icon: '📋'
      },
      {
        level: 2,
        name: 'Segmentation Simple',
        description: 'Classification basique avec quelques différenciations',
        minPercentage: 36,
        maxPercentage: 55,
        color: '#f97316',
        icon: '📊'
      },
      {
        level: 3,
        name: 'SRM Structuré',
        description: 'Gestion différenciée avec programmes dédiés',
        minPercentage: 56,
        maxPercentage: 75,
        color: '#eab308',
        icon: '🤝'
      },
      {
        level: 4,
        name: 'Écosystème Optimisé',
        description: 'Gestion avancée avec innovation et intelligence artificielle',
        minPercentage: 76,
        maxPercentage: 100,
        color: '#22c55e',
        icon: '🌟'
      }
    ]
  },
  reportTemplate: {
    type: 'clustering',
    sections: [
      {
        id: 'clustering_overview',
        title: 'Vue d\'Ensemble de la Clusterisation',
        type: 'summary',
        content: 'Analyse de votre approche de segmentation fournisseurs',
        order: 1
      },
      {
        id: 'supplier_clusters',
        title: 'Clusters Fournisseurs',
        type: 'chart',
        content: 'Répartition et caractéristiques des clusters',
        order: 2
      },
      {
        id: 'cluster_strategies',
        title: 'Stratégies par Cluster',
        type: 'detailed',
        content: 'Approches recommandées pour chaque type de fournisseur',
        order: 3
      },
      {
        id: 'portfolio_optimization',
        title: 'Optimisation du Portefeuille',
        type: 'recommendations',
        content: 'Actions pour optimiser votre base fournisseurs',
        order: 4
      },
      {
        id: 'srm_roadmap',
        title: 'Roadmap SRM',
        type: 'action-plan',
        content: 'Plan de développement de la gestion fournisseurs',
        order: 5
      }
    ],
    visualizations: [
      VisualizationType.SCATTER_PLOT,
      VisualizationType.HEATMAP,
      VisualizationType.TREEMAP,
      VisualizationType.BAR_CHART
    ],
    exportFormats: ['pdf', 'excel', 'powerpoint']
  }
};
