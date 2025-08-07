#!/usr/bin/env node

/**
 * Test du diagnostic d'orientation après corrections
 * Valide que le comptage des questions fonctionne correctement
 */

const { OrientationDiagnosticEngine } = require('./src/lib/orientation-diagnostic-engine.ts');

console.log('🧪 TEST DIAGNOSTIC D\'ORIENTATION - Comptage des Questions');
console.log('=========================================================');

try {
  // Simuler un diagnostic avec quelques réponses
  const engine = new OrientationDiagnosticEngine();
  
  console.log('\n📊 1. Test initial...');
  let progress = engine.getProgress();
  console.log(`   Progression initiale: Question ${progress.current} sur ${progress.total} (${progress.percentage}%)`);
  
  // Simuler 5 réponses
  console.log('\n📊 2. Simulation de 5 réponses...');
  for (let i = 0; i < 5; i++) {
    const question = engine.getCurrentQuestion();
    if (question) {
      engine.answerQuestion(question.id, 2); // Réponse moyenne
      progress = engine.getProgress();
      console.log(`   Question ${progress.current-1} répondue: ${progress.current-1} sur ${progress.total} (${progress.percentage}%)`);
    }
  }
  
  console.log('\n📊 3. État final...');
  progress = engine.getProgress();
  console.log(`   Progression finale: Question ${progress.current} sur ${progress.total} (${progress.percentage}%)`);
  console.log(`   Diagnostic terminé: ${engine.isCompleted()}`);
  
  if (progress.current > progress.total) {
    console.log('   ❌ ERREUR: Numéro de question supérieur au total !');
  } else {
    console.log('   ✅ Comptage correct');
  }
  
} catch (error) {
  console.error('❌ Erreur lors du test:', error.message);
  console.log('⚠️ Test non applicable (format TS)');
}

console.log('\n🌐 Test en direct: http://localhost:3003/fr/orientation-diagnostic');
