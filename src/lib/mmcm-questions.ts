// Questions spécifiques basées sur le modèle MMCM de Mirihi
export const mmcmQuestions = {
  'Estructura y Gestión del Talento': [
    {
      question: "Votre équipe achats dispose-t-elle de descriptions de poste claires avec des responsabilités définies ?",
      options: [
        "Aucune description formelle ou responsabilités floues",
        "Descriptions basiques mais incomplètes",
        "Descriptions structurées avec responsabilités claires",
        "Descriptions optimisées avec évolution de carrière définie"
      ],
      bestPractice: "Requisitos actualizados para cada puesto con responsabilidades claras"
    },
    {
      question: "Comment évaluez-vous l'équilibre économique et de genre dans votre organisation achats ?",
      options: [
        "Aucune attention portée à l'équilibre",
        "Conscience du sujet mais peu d'actions",
        "Politique active d'équilibre avec suivi",
        "Excellence en diversité avec résultats mesurables"
      ],
      bestPractice: "Equilibrio económico y de género entre categorías profesionales"
    },
    {
      question: "Quel niveau de formation et développement offrez-vous à vos équipes achats ?",
      options: [
        "Formation très limitée ou ponctuelle",
        "Formation de base selon les besoins",
        "Programme de formation structuré et régulier",
        "Centre d'excellence avec parcours de développement avancé"
      ],
      bestPractice: "Promoción activa de mejora de habilidades y avance profesional"
    }
  ],
  'Procesos y Metodologías': [
    {
      question: "Vos processus d'achat sont-ils standardisés et documentés ?",
      options: [
        "Processus informels ou non documentés",
        "Documentation basique avec quelques procédures",
        "Processus standardisés et bien documentés",
        "Processus optimisés avec amélioration continue"
      ],
      bestPractice: "Procesos de compra estandarizados y documentados"
    },
    {
      question: "Comment structurez-vous l'évaluation et la sélection de vos fournisseurs ?",
      options: [
        "Évaluation ad-hoc sans méthodologie",
        "Critères de base mais processus informel",
        "Méthodologie structurée avec critères définis",
        "Excellence opérationnelle avec scoring automatisé"
      ],
      bestPractice: "Metodologías de evaluación de proveedores estructuradas"
    }
  ],
  'Tecnología y Digitalización': [
    {
      question: "Disposez-vous d'une plateforme e-procurement intégrée ?",
      options: [
        "Processus manuels ou outils basiques",
        "Outils digitaux dispersés non intégrés",
        "Plateforme e-procurement fonctionnelle",
        "Solution intégrée avancée avec IA et analytics"
      ],
      bestPractice: "Plataformas e-procurement integradas"
    },
    {
      question: "Quel niveau d'automatisation avez-vous pour l'analyse et le reporting achats ?",
      options: [
        "Reporting manuel avec tableaux Excel",
        "Quelques automatisations basiques",
        "Dashboards automatisés avec KPIs",
        "Intelligence artificielle pour analyses prédictives"
      ],
      bestPractice: "Herramientas de análisis y reporting automatizados"
    }
  ],
  'Gestión de Proveedores': [
    {
      question: "Comment qualifiez-vous et segmentez-vous votre base fournisseurs ?",
      options: [
        "Liste basique sans qualification",
        "Segmentation simple par catégorie",
        "Base qualifiée avec critères de performance",
        "Segmentation stratégique avec programmes différenciés"
      ],
      bestPractice: "Base de proveedores calificada y segmentada"
    },
    {
      question: "Avez-vous des programmes de développement pour vos fournisseurs stratégiques ?",
      options: [
        "Aucun programme de développement",
        "Initiatives ponctuelles sans structure",
        "Programmes structurés pour fournisseurs clés",
        "Innovation collaborative et co-développement"
      ],
      bestPractice: "Programas de desarrollo de proveedores"
    }
  ],
  'Estrategia y Planificación': [
    {
      question: "Votre stratégie achats est-elle alignée avec la stratégie globale de l'entreprise ?",
      options: [
        "Aucune stratégie formelle définie",
        "Stratégie basique peu alignée",
        "Stratégie claire et alignée avec l'entreprise",
        "Excellence stratégique avec impact business mesurable"
      ],
      bestPractice: "Estrategia de compras alineada con la estrategia empresarial"
    },
    {
      question: "Disposez-vous de plans d'achats détaillés par catégorie ?",
      options: [
        "Achats réactifs sans planification",
        "Planification de base par grandes catégories",
        "Plans détaillés par catégorie avec objectifs",
        "Planification stratégique avec roadmaps d'innovation"
      ],
      bestPractice: "Planes de compras por categoría definidos"
    }
  ],
  'Medición y Control': [
    {
      question: "Quels KPIs utilisez-vous pour mesurer la performance de vos achats ?",
      options: [
        "Aucun KPI formellement défini",
        "Quelques indicateurs de base (coût, délai)",
        "KPIs structurés couvrant qualité, coût, délai",
        "Tableau de bord avancé avec KPIs stratégiques"
      ],
      bestPractice: "KPIs de compras definidos y seguidos regularmente"
    },
    {
      question: "Comment mesurez-vous et reportez-vous les économies réalisées ?",
      options: [
        "Aucun suivi des économies",
        "Suivi basique des réductions de coût",
        "Analyse structurée des savings avec ROI",
        "Analytics avancées avec impact P&L mesurable"
      ],
      bestPractice: "Análisis de ahorros y ROI"
    }
  ]
};

export const moduleRecommendations = {
  foundational: {
    name: "Fondamentaux des Achats",
    description: "Pour entreprises avec maturité achats limitée nécessitant une structuration de base",
    triggers: ["score global < 40%", "majorité des réponses 'très faible' ou 'faible'"]
  },
  structural: {
    name: "Excellence Opérationnelle", 
    description: "Pour optimiser les processus et méthodologies achats existants",
    triggers: ["problèmes processus", "scores faibles en 'Procesos y Metodologías'"]
  },
  digital: {
    name: "Transformation Digitale",
    description: "Pour accélérer la transformation digitale des achats",
    triggers: ["scores faibles en 'Tecnología y Digitalización'", "processus manuels"]
  },
  strategic: {
    name: "Leadership Achats",
    description: "Pour aligner et optimiser la stratégie achats",
    triggers: ["scores faibles en 'Estrategia y Planificación'", "manque d'alignement stratégique"]
  },
  advanced: {
    name: "Innovation & Partenariats",
    description: "Pour entreprises matures cherchant l'excellence opérationnelle",
    triggers: ["score global > 70%", "optimisations fines nécessaires"]
  }
};
