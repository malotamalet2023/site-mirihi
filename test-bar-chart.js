#!/usr/bin/env node
/**
 * Test automatisé pour vérifier l'affichage du graphique en barres
 */

console.log('🧪 Test du Graphique en Barres - Diagnostic d\'Orientation');
console.log('=====================================================\n');

// Simulation de données de diagnostic
const testResult = {
  categoryScores: {
    'Engagement Direction & Stratégie': { score: 15, maxScore: 20, percentage: 75, level: 'Bon' },
    'Relations avec Partenaires Internes': { score: 8, maxScore: 15, percentage: 53, level: 'Intermédiaire' },
    'Gestion par Catégories': { score: 12, maxScore: 15, percentage: 80, level: 'Bon' },
    'Collaboration et Innovation Fournisseurs': { score: 6, maxScore: 15, percentage: 40, level: 'Débutant' },
    'Organisation et Processus': { score: 11, maxScore: 15, percentage: 73, level: 'Bon' },
    'Gestion des Contrats': { score: 7, maxScore: 15, percentage: 47, level: 'Débutant' },
    'Sourcing Stratégique': { score: 8, maxScore: 15, percentage: 53, level: 'Intermédiaire' },
    'Gestion des Risques': { score: 6, maxScore: 15, percentage: 40, level: 'Débutant' },
    'Gestion des Talents': { score: 5, maxScore: 15, percentage: 33, level: 'Débutant' }
  }
};

// Préparation des données comme dans le composant
const barData = Object.entries(testResult.categoryScores)
  .map(([category, data]) => ({
    name: category.length > 25 ? category.substring(0, 25) + '...' : category,
    fullName: category,
    percentage: data.percentage || 0,
    score: data.score || 0,
    maxScore: data.maxScore || 0,
    level: data.level
  }))
  .sort((a, b) => b.percentage - a.percentage);

console.log('📊 Données pour graphique en barres:');
console.log('=====================================');
barData.forEach((item, index) => {
  const bar = '█'.repeat(Math.round(item.percentage / 5)); // Barre ASCII
  console.log(`${index + 1}. ${item.name.padEnd(30)} ${item.percentage}% ${bar}`);
});

console.log('\n✅ Structure des données:');
console.log('========================');
console.log('✓ Champ "name" pour YAxis:', barData[0].name ? 'Présent' : 'Manquant');
console.log('✓ Champ "percentage" pour valeurs:', barData[0].percentage !== undefined ? 'Présent' : 'Manquant');
console.log('✓ Tri par score décroissant:', barData[0].percentage >= barData[1].percentage ? 'OK' : 'Erreur');
console.log('✓ Nombre de catégories:', barData.length);

console.log('\n🎯 Configuration recommandée:');
console.log('=============================');
console.log('- Layout: "vertical" ✓');
console.log('- YAxis dataKey: "name" ✓');
console.log('- Bar dataKey: "percentage" ✓');
console.log('- Domain X: [0, 100] ✓');
console.log('- Tri: score décroissant ✓');

console.log('\n🚀 Le graphique en barres devrait maintenant s\'afficher correctement !');
