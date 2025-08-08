'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import type { AdaptiveQuestion, DiagnosticModule, DiagnosticResult, CategoryResult } from '@/lib/diagnostic-types';
import Link from 'next/link';

interface ModuleDiagnosticRunnerProps {
  moduleData: DiagnosticModule;
}

interface AnswerRecord {
  question: AdaptiveQuestion;
  optionScores: number[]; // scores selected (multi or single)
}

export default function ModuleDiagnosticRunner({ moduleData }: ModuleDiagnosticRunnerProps) {
  const t = useTranslations();
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [skippedCategories, setSkippedCategories] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [multiSelections, setMultiSelections] = useState<Record<string, Set<number>>>({});
  const [scaleSelections, setScaleSelections] = useState<Record<string, number>>({});
  const [matrixSelections, setMatrixSelections] = useState<Record<string, Record<string, number>>>({}); // questionId -> {row -> colIndex}
  const [enhanceRequested, setEnhanceRequested] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [enhanced, setEnhanced] = useState<any | null>(null);
  const [enhanceError, setEnhanceError] = useState<string | null>(null);

  const questions: AdaptiveQuestion[] = useMemo(() => moduleData.questions, [moduleData]);
  const currentQuestion = questions[currentIndex];

  const handleSingleChoice = (optionIdx: number) => {
    if (!currentQuestion || !currentQuestion.options) return;
    const option = currentQuestion.options[optionIdx];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: { question: currentQuestion, optionScores: [option.score] }
    }));

    // Adaptation simple
    if (option.followUp === 'skip_category') {
      setSkippedCategories(prev => new Set(prev).add(currentQuestion.category));
    }
    if (option.followUp === 'deep_dive') {
      // ne saute rien, assure qu'on ne skip pas la catégorie
      setSkippedCategories(prev => new Set([...prev].filter(c => c !== currentQuestion.category)));
    }

    goToNext();
  };

  const toggleMultiChoice = (question: AdaptiveQuestion, optionIdx: number) => {
    setMultiSelections(prev => {
      const current = new Set(prev[question.id] || []);
      if (current.has(optionIdx)) current.delete(optionIdx); else current.add(optionIdx);
      return { ...prev, [question.id]: current };
    });
  };

  const validateMultiChoice = () => {
    if (!currentQuestion || !currentQuestion.options) return;
    const selected = Array.from(multiSelections[currentQuestion.id] || []);
    const optionScores = selected.map(i => currentQuestion.options![i].score);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: { question: currentQuestion, optionScores } }));
    goToNext();
  };

  const handleScaleSelect = (value: number) => {
    if (!currentQuestion) return;
    setScaleSelections(prev => ({ ...prev, [currentQuestion.id]: value }));
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: { question: currentQuestion, optionScores: [value] } }));
    goToNext();
  };

  const handleMatrixSelect = (row: string, colIndex: number) => {
    if (!currentQuestion) return;
    setMatrixSelections(prev => {
      const q = { ...(prev[currentQuestion.id] || {}) };
      q[row] = colIndex;
      return { ...prev, [currentQuestion.id]: q };
    });
  };

  const validateMatrix = () => {
    if (!currentQuestion) return;
    const matrix = matrixSelections[currentQuestion.id] || {};
    const rows = currentQuestion.matrixConfig?.rows || [];
    // Score: sum(selectedIndex+1) ; Max = rows * colsCount
    let score = 0;
    rows.forEach(r => { if (matrix[r] !== undefined) score += (matrix[r] + 1); });
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: { question: currentQuestion, optionScores: [score] } }));
    goToNext();
  };

  const goToNext = () => {
    // Find next index respecting skipped categories
    let next = currentIndex + 1;
    while (next < questions.length && skippedCategories.has(questions[next].category) && !questions[next].isFollowUp) {
      next += 1;
    }
    if (next >= questions.length) return setCurrentIndex(next); // déclenchera computeResults
    setCurrentIndex(next);
  };

  const computeResults = useCallback(() => {
    // Aggregate scores avec prise en compte scale et matrix
    const categoryMap: Record<string, { score: number; max: number }> = {};
    questions.forEach(q => {
      if (!categoryMap[q.category]) categoryMap[q.category] = { score: 0, max: 0 };
      const ans = answers[q.id];
      if (q.questionType === 'single-choice' && q.options) {
        categoryMap[q.category].max += Math.max(...q.options.map(o => o.score));
      } else if (q.questionType === 'multiple-choice' && q.options) {
        categoryMap[q.category].max += q.options.reduce((acc, o) => acc + o.score, 0);
      } else if (q.questionType === 'scale' && q.scaleConfig) {
        categoryMap[q.category].max += q.scaleConfig.max; // score = valeur choisie
      } else if (q.questionType === 'matrix' && q.matrixConfig) {
        const cols = q.matrixConfig.columns.length;
        const rows = q.matrixConfig.rows.length;
        categoryMap[q.category].max += rows * cols; // chaque ligne max = indexColMax+1
      }
      if (ans) {
        categoryMap[q.category].score += ans.optionScores.reduce((a,b) => a+b, 0);
      }
    });

    const categoryScores: Record<string, CategoryResult> = {};
    let totalScore = 0; let totalMax = 0;
    Object.entries(categoryMap).forEach(([cat, { score, max }]) => {
      const percentage = max > 0 ? Math.round((score / max) * 100) : 0;
      const level = percentage >= 80 ? 'leader' : percentage >= 60 ? 'advanced' : percentage >= 40 ? 'intermediate' : 'basic';
      categoryScores[cat] = {
        name: cat,
        score,
        maxScore: max,
        percentage,
        level,
        recommendations: []
      };
      totalScore += score; totalMax += max;
    });

    const overallPercentage = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
    const overallLevel = overallPercentage >= 80 ? 'leader' : overallPercentage >= 60 ? 'advanced' : overallPercentage >= 40 ? 'intermediate' : 'basic';

    const strengths = Object.entries(categoryScores).filter(([, categoryData]) => categoryData.percentage >= 70).map(([categoryName]) => categoryName);
    const weaknesses = Object.entries(categoryScores).filter(([, categoryData]) => categoryData.percentage < 40).map(([categoryName]) => categoryName);

    const res: DiagnosticResult = {
      sessionId: crypto.randomUUID(),
      timestamp: new Date(),
      diagnosticId: moduleData.id,
      overallScore: totalScore,
      overallPercentage,
      overallLevel,
      categoryScores,
      recommendations: [],
      actionPlan: [],
      nextSteps: [],
      strengths,
      weaknesses,
      areasForImprovement: weaknesses,
      insights: '',
      recommendedDiagnostics: []
    } as DiagnosticResult;

    setResult(res);

    try {
      const existing = JSON.parse(localStorage.getItem('mirihi_diagnostics') || '[]');
      existing.push({
        type: `module:${moduleData.id}`,
        savedAt: new Date().toISOString(),
        overallPercentage: res.overallPercentage,
        overallLevel: res.overallLevel,
        result: res
      });
      localStorage.setItem('mirihi_diagnostics', JSON.stringify(existing));
    } catch {}

    // Enrichissement IA (appel API module) - déclenché après setResult via useEffect
    setTimeout(() => setEnhanceRequested(true), 50);
  }, [questions, answers, moduleData.id]);

  useEffect(() => {
    if (started && currentIndex >= questions.length && !result) {
      computeResults();
    }
  }, [started, currentIndex, questions.length, result, computeResults]);

  useEffect(() => {
    if (result && enhanceRequested && !enhanced && !enhancing) {
      (async () => {
        try {
          setEnhancing(true); setEnhanceError(null);
          const payload = {
            moduleId: moduleData.id,
            answers: Object.fromEntries(Object.entries(answers).map(([k,v]) => [k, v.optionScores])),
            categoryScores: Object.fromEntries(Object.entries(result.categoryScores).map(([k,v]) => [k, v.percentage]))
          };
          const r = await fetch('/api/modular-analysis', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          if (!r.ok) throw new Error('HTTP '+r.status);
          const data = await r.json();
          setEnhanced(data);
        } catch (e:any) {
          setEnhanceError(e.message || 'Error');
        } finally { setEnhancing(false); }
      })();
    }
  }, [result, enhanceRequested, enhanced, enhancing, moduleData.id, answers]);

  if (result) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{moduleData.name}</h2>
          <p className="text-gray-600 mb-6">{moduleData.description}</p>
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div>
              <div className="text-5xl font-bold text-mirihi-blue-1">{result.overallPercentage}%</div>
              <div className="text-sm text-gray-500">Score</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{t(`levels.${result.overallLevel}`) || result.overallLevel}</div>
              <div className="text-sm text-gray-500">Niveau</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(result.categoryScores).map(([cat, data]) => (
            <div key={cat} className="border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800 text-sm mr-2 truncate">{cat}</span>
                <span className="text-sm font-bold">{data.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="h-2 bg-mirihi-blue-1" style={{ width: `${data.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>Analyse IA (module)</span>
            {enhancing && <span className="text-xs text-blue-600 animate-pulse">Enrichissement...</span>}
          </h3>
          {!enhanced && !enhancing && !enhanceError && (
            <button onClick={() => setEnhanceRequested(true)} className="px-4 py-2 bg-mirihi-blue-1 text-white rounded-lg text-sm font-medium hover:bg-mirihi-blue-2 transition-colors">Générer l'analyse IA</button>
          )}
          {enhanceError && (
            <div className="text-sm text-red-600">Erreur: {enhanceError}</div>
          )}
          {enhanced && (
            <div className="space-y-4 text-sm text-gray-700">
              <p className="leading-relaxed whitespace-pre-line">{enhanced.humanizedAnalysis}</p>
              {enhanced.personalizedInsights && (
                <div>
                  <p className="font-semibold mb-1">Insights personnalisés</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {enhanced.personalizedInsights.map((i:string, idx:number) => <li key={idx}>{i}</li>)}
                  </ul>
                </div>
              )}
              {enhanced.actionPlan && (
                <div className="grid md:grid-cols-3 gap-4">
                  {['immediate','shortTerm','longTerm'].map(phase => (
                    <div key={phase} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-xs uppercase tracking-wide mb-2">{phase === 'immediate' ? 'Immédiat' : phase === 'shortTerm' ? 'Court Terme' : 'Long Terme'}</p>
                      <ul className="list-disc pl-4 space-y-1 text-xs">
                        {enhanced.actionPlan[phase].map((a:string, i:number) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center space-x-4">
          <button onClick={() => { setResult(null); setAnswers({}); setCurrentIndex(0); setSkippedCategories(new Set()); setStarted(false); setEnhanced(null); setEnhanceRequested(false); }} className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">{t('diagnostic.newDiagnostic')}</button>
          <Link href="../resources" className="px-6 py-3 bg-mirihi-blue-1 text-white rounded-xl hover:bg-mirihi-blue-2 transition-colors">{t('modules.seeAllDiagnostics')}</Link>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{moduleData.name}</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{moduleData.description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left max-w-2xl mx-auto">
          <p className="text-sm text-blue-700">{questions.length} questions. Adaptation basique (skip category, deep dive) selon vos réponses.</p>
        </div>
        <button onClick={() => setStarted(true)} className="inline-flex items-center px-8 py-4 bg-mirihi-blue-1 text-white font-bold text-lg rounded-2xl hover:bg-mirihi-blue-2 transition-all shadow-lg">
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          {t('diagnostic.start')}
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="text-center text-gray-600 py-10">Chargement...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{moduleData.name}</h2>
          <div className="text-sm text-gray-500">{currentIndex + 1} / {questions.length}</div>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="h-2 bg-mirihi-blue-1 rounded-full" style={{ width: `${Math.round(((currentIndex) / questions.length) * 100)}%` }} />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{currentQuestion.category}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{currentQuestion.question}</h3>
        {currentQuestion.questionType === 'single-choice' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleSingleChoice(idx)} className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-mirihi-blue-1 hover:bg-blue-50 transition-all">
                <div className="flex justify-between">
                  <span className="text-gray-800">{opt.text}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{opt.score} pts</span>
                </div>
              </button>
            ))}
          </div>
        )}
        {currentQuestion.questionType === 'multiple-choice' && currentQuestion.options && (
          <div className="space-y-4">
            <div className="space-y-2">
              {currentQuestion.options.map((opt, idx) => {
                const selected = multiSelections[currentQuestion.id]?.has(idx);
                return (
                  <button key={idx} onClick={() => toggleMultiChoice(currentQuestion, idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selected ? 'border-mirihi-blue-1 bg-blue-50' : 'border-gray-200 hover:border-mirihi-blue-1 hover:bg-blue-50'}`}>
                    <div className="flex justify-between">
                      <span className="text-gray-800">{opt.text}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{opt.score} pts</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-right">
              <button disabled={!multiSelections[currentQuestion.id] || multiSelections[currentQuestion.id]?.size === 0}
                onClick={validateMultiChoice}
                className="px-6 py-3 bg-mirihi-blue-1 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold hover:bg-mirihi-blue-2 transition-colors">
                {t('diagnostic.next')}
              </button>
            </div>
          </div>
        )}
        {currentQuestion.questionType === 'scale' && currentQuestion.scaleConfig && (
          <div className="space-y-6">
            <div className="flex justify-between text-xs text-gray-500">
              {currentQuestion.scaleConfig.labels.map(l => (
                <span key={l.value} className="w-1/5 text-center px-1">{l.label}</span>
              ))}
            </div>
            <input type="range" min={currentQuestion.scaleConfig.min} max={currentQuestion.scaleConfig.max} step={currentQuestion.scaleConfig.step}
              value={scaleSelections[currentQuestion.id] || currentQuestion.scaleConfig.min}
              onChange={e => handleScaleSelect(Number(e.target.value))}
              className="w-full" />
            <div className="text-center text-sm text-gray-700 font-medium">
              {scaleSelections[currentQuestion.id] ? `${t('diagnostic.scoreGlobal')}: ${scaleSelections[currentQuestion.id]}` : t('diagnostic.chooseOption')}
            </div>
          </div>
        )}
        {currentQuestion.questionType === 'matrix' && currentQuestion.matrixConfig && (
          <div className="space-y-4">
            <div className="overflow-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left"></th>
                    {currentQuestion.matrixConfig.columns.map((col, ci) => (
                      <th key={ci} className="p-2 text-center font-medium text-gray-700">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentQuestion.matrixConfig.rows.map(row => {
                    const selectedCol = matrixSelections[currentQuestion.id]?.[row];
                    return (
                      <tr key={row} className="border-t">
                        <td className="p-2 pr-4 text-gray-700 font-medium text-left align-middle">{row}</td>
                        {currentQuestion.matrixConfig!.columns.map((_, ci) => {
                          const active = selectedCol === ci;
                          return (
                            <td key={ci} className="p-1 text-center">
                              <button type="button" onClick={() => handleMatrixSelect(row, ci)}
                                className={`w-7 h-7 rounded-full border text-[10px] font-semibold ${active ? 'bg-mirihi-blue-1 text-white border-mirihi-blue-1' : 'border-gray-300 text-gray-500 hover:border-mirihi-blue-1'}`}>{ci+1}</button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-right">
              <button onClick={validateMatrix}
                disabled={Object.keys(matrixSelections[currentQuestion.id] || {}).length === 0}
                className="px-6 py-3 bg-mirihi-blue-1 text-white rounded-xl font-semibold hover:bg-mirihi-blue-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                {t('diagnostic.next')}
              </button>
            </div>
          </div>
        )}
        {['single-choice','multiple-choice','scale','matrix'].includes(currentQuestion.questionType) ? null : (
          <div className="text-sm text-gray-500">Type de question non encore pris en charge dans ce prototype.</div>
        )}
      </div>
    </div>
  );
}
