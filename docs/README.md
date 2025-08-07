# Site Mirihi - Documentation Technique

## Vue d'ensemble

Site Mirihi est une plateforme de diagnostic achats développée en Next.js 15 avec TypeScript. Le site propose plusieurs diagnostics spécialisés pour évaluer la maturité des organisations achats.

## Structure du Projet

```
src/
├── app/                          # Pages et API routes (App Router)
│   ├── [locale]/                # Pages internationalisées
│   ├── api/                     # API endpoints
├── components/                   # Composants React
├── lib/                         # Moteurs de diagnostic et utilitaires
├── messages/                    # Fichiers de traduction i18n
└── styles/                      # Styles CSS et Tailwind
```

## Diagnostics Disponibles

### 1. **Diagnostic d'Orientation** (orientation-diagnostic-engine.ts)
**Objectif :** Évaluation rapide (5-10 minutes) pour identifier les axes d'amélioration prioritaires

**Caractéristiques :**
- **12 catégories d'évaluation** avec questions approfondies :
  - Engagement Direction & Stratégie (4 questions)
  - Relations avec Partenaires Internes (3 questions)
  - Gestion par Catégories (3 questions)
  - Collaboration et Innovation Fournisseurs (3 questions)
  - Organisation et Processus (3 questions)
  - Gestion des Contrats (3 questions)
  - Sourcing Stratégique (3 questions)
  - Gestion des Risques (3 questions)
  - Gestion des Talents (3 questions)
  - **Achats Responsables** (3 questions ESG & durabilité)
  - **Digitalisation des Achats** (3 questions transformation digitale)
  - **Gestion de la Performance** (3 questions KPIs & pilotage)

- **Logique adaptative intelligente** :
  - Questions principales pour évaluation rapide
  - Questions de suivi automatiques pour scores faibles (1-2)
  - Skip automatique des catégories pour scores élevés (4-5)
  - Durée optimisée selon les réponses (3-12 questions)

- **Analyse par IA (Gemini)** :
  - Insights personnalisés
  - Recommandations d'actions
  - Identification des forces et faiblesses
  - Priorisation des axes d'amélioration

### 2. **Diagnostic Modulaire** (modular-diagnostic-engine.ts)
Diagnostic détaillé avec modules spécialisés (placeholder pour développement futur)

## Architecture Technique

### Moteur de Diagnostic Adaptatif

Le système utilise une approche intelligente pour optimiser l'expérience utilisateur :

```typescript
// Actions basées sur les scores
action: 'continue'     // Score 3 : continue normalement
action: 'deep_dive'    // Score 1-2 : ajoute questions de suivi
action: 'skip_category' // Score 4-5 : passe à la catégorie suivante
```

### Système de Scoring

- **Échelle 1-5** par question
- **Pourcentages par catégorie** : (score total / score max) × 100
- **Niveaux de maturité** :
  - 85%+ : Expert
  - 70-84% : Avancé  
  - 50-69% : Intermédiaire
  - <50% : Débutant

### Intelligence Artificielle

- **Gemini AI** pour analyse des résultats
- **Fallback gracieux** si API indisponible
- **Prompts optimisés** pour conseils secteur achats
- **Analyse contextuelle** des réponses

## Fonctionnalités Avancées

### Système d'Accès

- **Codes d'accès** pour contrôler l'utilisation
- **Gestion des sessions** pour personnalisation
- **Multi-langues** (FR/EN/ES)

### Interface Utilisateur

- **Design moderne** avec Tailwind CSS
- **Responsive** pour tous appareils
- **Graphiques interactifs** (Chart.js)
- **Navigation intuitive** avec progression

### Performance

- **Build optimisé** Next.js 15
- **Lazy loading** des composants
- **Cache intelligent** des résultats
- **Compression** des assets

## Développement

### Stack Technique

- **Framework :** Next.js 15 (App Router)
- **Langage :** TypeScript
- **Styling :** Tailwind CSS
- **Charts :** Chart.js + react-chartjs-2
- **i18n :** next-intl
- **AI :** Google Gemini API
- **Deploy :** Vercel

### Scripts Disponibles

```bash
npm run dev         # Serveur développement
npm run build       # Build production
npm run start       # Serveur production
npm run lint        # Vérification ESLint
```

### Configuration ESLint

Configuration personnalisée avec règles assouplies pour le développement rapide.

## Déploiement

### Variables d'Environnement

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

### Build Production

Le projet est configuré pour déploiement sur Vercel avec optimisations automatiques.

## Évolutions Récentes

### Version 2.1 - Diagnostic d'Orientation Étendu

**Améliorations majeures :**

1. **Extension des catégories** : 9 domaines d'évaluation au lieu de 6
2. **Questions approfondies** : 3-4 questions de suivi par catégorie pour faible maturité
3. **Logique adaptative renforcée** : Diagnostic personnalisé selon les réponses
4. **Analyse IA enrichie** : Recommandations plus précises et actionnables

**Nouvelles catégories :**
- Relations avec Partenaires Internes
- Gestion par Catégories  
- Collaboration et Innovation Fournisseurs
- Gestion des Contrats
- Sourcing Stratégique
- Gestion des Risques
- Gestion des Talents

**Questions de suivi intelligentes :**
- Déclenchement automatique pour scores 1-2
- Exploration des causes racines
- Identification des obstacles spécifiques
- Recommandations d'actions concrètes

### Architecture de Questions

**Structure en 3 niveaux :**

1. **Questions principales** (priority: 'high')
   - Une par catégorie
   - Évaluation rapide du niveau de maturité
   - Déclenchement de la logique adaptative

2. **Questions de suivi** (isFollowUp: true)
   - Activées pour scores faibles (1-2)
   - Exploration des problématiques spécifiques
   - 2-3 questions par catégorie

3. **Logique de navigation** intelligente
   - Skip automatique si score élevé (4-5)
   - Deep dive si score faible (1-2)
   - Continuation normale si score moyen (3)

Cette approche permet :
- **Diagnostic rapide** (3-5 minutes) pour utilisateurs matures
- **Diagnostic approfondi** (8-12 minutes) pour identification des axes d'amélioration
- **Expérience personnalisée** selon le profil de maturité

## Status du Projet

✅ **Diagnostic d'Orientation Étendu** - Fonctionnel avec 9 catégories et questions approfondies
✅ **Logique Adaptative Avancée** - Questions de suivi intelligentes
✅ **Analyse IA Enrichie** - Gemini avec prompts optimisés
✅ **Interface & Navigation** - Moderne et responsive
✅ **Système d'Accès** - Codes d'accès opérationnels  
✅ **Multi-langues** - FR/EN/ES supportés
✅ **Build Production** - Optimisé et déployable
🔄 **Diagnostic Modulaire** - En développement

---

*Documentation mise à jour - Version 2.1 - Août 2025*
