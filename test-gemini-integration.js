#!/usr/bin/env node
/**
 * Script de test automatisé pour l'intégration Gemini AI
 * Teste les fonctionnalités complètes du diagnostic d'orientation
 */

const API_BASE = 'http://localhost:3002';

// Données de test simulant un diagnostic complet
const testDiagnosticData = {
  overallScore: 68,
  categoryScores: {
    engagementDirection: { score: 15, maxScore: 20, percentage: 75, level: "Bon" },
    relationsPartenaires: { score: 8, maxScore: 15, percentage: 53, level: "Intermédiaire" },
    gestionCategories: { score: 12, maxScore: 15, percentage: 80, level: "Bon" },
    collaborationInnovation: { score: 6, maxScore: 15, percentage: 40, level: "Débutant" },
    organisationProcessus: { score: 11, maxScore: 15, percentage: 73, level: "Bon" },
    gestionContrats: { score: 7, maxScore: 15, percentage: 47, level: "Débutant" },
    sourcingStrategique: { score: 8, maxScore: 15, percentage: 53, level: "Intermédiaire" },
    gestionRisques: { score: 6, maxScore: 15, percentage: 40, level: "Débutant" },
    gestionTalents: { score: 5, maxScore: 15, percentage: 33, level: "Débutant" }
  },
  answers: {},
  timestamp: new Date().toISOString()
};

async function testGeminiIntegration() {
  console.log('🧪 Test d\'intégration Gemini AI - Diagnostic d\'Orientation');
  console.log('================================================\n');

  try {
    // Test 1: Vérifier que l'API est en ligne
    console.log('1️⃣ Test de connectivité API...');
    const healthResponse = await fetch(`${API_BASE}/api/orientation-analysis`);
    const healthData = await healthResponse.json();
    
    console.log(`   ✅ API Status: ${healthData.status}`);
    console.log(`   🤖 Gemini Available: ${healthData.geminiAvailable}`);
    console.log(`   📅 Version: ${healthData.version}\n`);

    // Test 2: Analyse complète avec Gemini
    console.log('2️⃣ Test d\'analyse Gemini...');
    const analysisResponse = await fetch(`${API_BASE}/api/orientation-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diagnosticData: testDiagnosticData
      })
    });

    if (!analysisResponse.ok) {
      throw new Error(`Erreur HTTP: ${analysisResponse.status}`);
    }

    const analysisResult = await analysisResponse.json();
    
    if (!analysisResult.success) {
      throw new Error(`Analyse échouée: ${analysisResult.error}`);
    }

    const analysis = analysisResult.analysis;
    
    console.log('   ✅ Analyse Gemini réussie !');
    console.log(`   📊 Score global analysé: ${analysis.metadata.scoreGlobal}%`);
    console.log(`   🎯 Niveau maturité: ${analysis.metadata.niveauMaturite}`);
    console.log(`   🤖 IA utilisée: ${analysis.metadata.aiPowered ? 'Oui' : 'Non (Fallback)'}\n`);

    // Test 3: Validation de la qualité de l'analyse
    console.log('3️⃣ Validation qualité de l\'analyse...');
    
    const qualityChecks = [
      {
        name: 'Insights présents',
        check: analysis.insights && analysis.insights.length > 50,
        value: analysis.insights ? `${analysis.insights.length} caractères` : 'Absent'
      },
      {
        name: 'Recommandations (3-5)',
        check: analysis.recommendations && analysis.recommendations.length >= 3 && analysis.recommendations.length <= 5,
        value: analysis.recommendations ? `${analysis.recommendations.length} recommandations` : 'Absent'
      },
      {
        name: 'Actions prioritaires',
        check: analysis.priorityActions && analysis.priorityActions.length >= 2,
        value: analysis.priorityActions ? `${analysis.priorityActions.length} actions` : 'Absent'
      },
      {
        name: 'Benchmark sectoriel',
        check: analysis.industryBenchmark && analysis.industryBenchmark.length > 20,
        value: analysis.industryBenchmark ? 'Présent' : 'Absent'
      },
      {
        name: 'Ressources suggérées',
        check: analysis.resourceSuggestions && analysis.resourceSuggestions.length >= 3,
        value: analysis.resourceSuggestions ? `${analysis.resourceSuggestions.length} ressources` : 'Absent'
      },
      {
        name: 'Feuille de route',
        check: analysis.roadmapSuggestions && analysis.roadmapSuggestions.length >= 3,
        value: analysis.roadmapSuggestions ? `${analysis.roadmapSuggestions.length} étapes` : 'Absent'
      }
    ];

    qualityChecks.forEach(check => {
      const status = check.check ? '✅' : '❌';
      console.log(`   ${status} ${check.name}: ${check.value}`);
    });

    const successfulChecks = qualityChecks.filter(c => c.check).length;
    const qualityScore = Math.round((successfulChecks / qualityChecks.length) * 100);
    
    console.log(`\n   📈 Score qualité: ${qualityScore}% (${successfulChecks}/${qualityChecks.length})\n`);

    // Test 4: Performance et temps de réponse
    console.log('4️⃣ Test de performance...');
    const startTime = Date.now();
    
    await fetch(`${API_BASE}/api/orientation-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diagnosticData: testDiagnosticData
      })
    });
    
    const responseTime = Date.now() - startTime;
    console.log(`   ⚡ Temps de réponse: ${responseTime}ms`);
    console.log(`   ${responseTime < 10000 ? '✅' : '⚠️'} Performance: ${responseTime < 5000 ? 'Excellente' : responseTime < 10000 ? 'Bonne' : 'À optimiser'}\n`);

    // Résumé final
    console.log('🎉 RÉSUMÉ DU TEST');
    console.log('=================');
    console.log(`✅ API fonctionnelle: Oui`);
    console.log(`🤖 Gemini intégré: ${healthData.geminiAvailable ? 'Oui' : 'Non'}`);
    console.log(`📊 Qualité analyse: ${qualityScore}%`);
    console.log(`⚡ Performance: ${responseTime}ms`);
    
    if (qualityScore >= 80 && responseTime < 10000) {
      console.log('\n🎯 STATUS: INTÉGRATION RÉUSSIE ! 🎯');
    } else {
      console.log('\n⚠️ STATUS: AMÉLIORATIONS NÉCESSAIRES');
    }

    // Affichage d'un exemple d'analyse
    console.log('\n📄 EXEMPLE D\'ANALYSE GÉNÉRÉE:');
    console.log('===========================');
    console.log('Insights:', analysis.insights.substring(0, 200) + '...');
    console.log('\nRecommandations:');
    analysis.recommendations.slice(0, 2).forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });

  } catch (error) {
    console.error('❌ ERREUR LORS DU TEST:', error.message);
    console.log('\n🔧 ACTIONS CORRECTIVES SUGGÉRÉES:');
    console.log('- Vérifier que le serveur Next.js est en marche (npm run dev)');
    console.log('- Vérifier la configuration GOOGLE_GEMINI_API_KEY dans .env.local');
    console.log('- Vérifier la connectivité internet pour Gemini AI');
    process.exit(1);
  }
}

// Exécution du test
testGeminiIntegration();
