# 🎯 Mirihi - Diagnostic Adaptatif Achats

Site web moderne pour le diagnostic et l'amélioration des processus d'achat avec intelligence adaptative.

## ✨ Fonctionnalités

- **Diagnostic Adaptatif** : Questions intelligentes qui s'adaptent aux réponses
- **Rapports Professionnels** : Graphiques radar et visualisations avancées
- **Optimisation UX** : Diagnostic en moins de 5 minutes
- **Responsive Design** : Interface moderne et accessible

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [repo-url]
cd site-mirihi

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le site sera accessible sur http://localhost:3000

## 📁 Structure du Projet

```
├── src/
│   ├── app/                    # Pages Next.js
│   │   ├── [locale]/          # Pages localisées
│   │   └── api/               # API Routes
│   ├── components/            # Composants React
│   ├── lib/                   # Logique métier
│   └── i18n/                  # Internationalisation
├── messages/                  # Traductions
├── docs/                      # Documentation
└── public/                    # Fichiers statiques
```

## 🎯 Diagnostic Adaptatif

Le système de diagnostic utilise un moteur intelligent qui :

1. **Analyse les réponses** en temps réel
2. **Adapte les questions** selon le niveau de maturité
3. **Optimise la durée** (5-8 questions vs 13+ classique)
4. **Génère des rapports** avec graphiques radar professionnels

### Composants Principaux

- `AdaptiveIntelligentDiagnostic.tsx` - Interface utilisateur adaptative
- `ProfessionalDiagnosticReport.tsx` - Rapports avec graphiques
- `adaptive-diagnostic.ts` - Moteur d'intelligence adaptatif
- `/api/adaptive-diagnostic/` - API backend intelligent

## 🛠️ Technologies

- **Frontend** : Next.js 15, React 18, TypeScript
- **Styling** : Tailwind CSS
- **Charts** : Recharts
- **Icons** : Heroicons
- **Internationalisation** : next-intl

## 📊 Performance

- **Temps de diagnostic** : 5 minutes max (vs 15+ avant)
- **Questions adaptatives** : 5-8 questions intelligentes
- **Taux de completion** : Optimisé par l'UX fluide
- **Rapports** : Génération instantanée avec graphiques

## 🔧 Scripts Disponibles

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # Linting
```

## 📚 Documentation

- [Succès Diagnostic Adaptatif](./docs/ADAPTIVE_DIAGNOSTIC_SUCCESS.md)
- [Rapports Professionnels](./docs/PROFESSIONAL_REPORT_SUCCESS.md)
- [Archives](./docs/archives/) - Historique du développement

## 🌍 Langues Supportées

- Français (fr)
- Anglais (en) 
- Espagnol (es)

## 📞 Support

Pour toute question ou support, consultez la documentation dans le dossier `docs/`.

---

**Mirihi** - Optimisez vos processus d'achat avec intelligence 🚀
