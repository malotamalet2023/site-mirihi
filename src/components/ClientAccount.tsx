'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DiagnosticModuleRegistry from '@/lib/diagnostic-registry';
import { useTranslations } from 'next-intl';

interface StoredDiagnosticEntry {
  type: string;
  savedAt: string;
  overallPercentage: number;
  overallLevel: string;
  result: any;
}

export default function ClientAccount() {
  const t = useTranslations();
  const [accessCode, setAccessCode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [diagnostics, setDiagnostics] = useState<StoredDiagnosticEntry[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [recommended, setRecommended] = useState<any[]>([]);

  useEffect(() => {
    if (authenticated) {
      try {
        const data: StoredDiagnosticEntry[] = JSON.parse(localStorage.getItem('mirihi_diagnostics') || '[]');
        setDiagnostics(data.sort((a,b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()));
      } catch {}
      // Charger recommandations modules (simplement les modules triés par priorité registry)
      try {
        const registry = DiagnosticModuleRegistry.getInstance();
        setRecommended(registry.getRecommendedModules().slice(0,4));
      } catch {}
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim().length >= 4) {
      setAuthenticated(true);
    }
  };

  const filteredDiagnostics = diagnostics.filter(d => filter === 'all' || d.type === filter);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {!authenticated ? (
        <form onSubmit={handleLogin} className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('account.secureAccessTitle')}</h2>
          <p className="text-gray-600 mb-6 text-sm">{t('account.loginDescription')}</p>
          <input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder={t('account.placeholderCodeOrEmail')}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-mirihi-blue-1 focus:outline-none mb-4"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-mirihi-blue-1 text-white font-semibold rounded-xl hover:bg-mirihi-blue-2 transition-colors"
          >
            {t('account.continue')}
          </button>
          <p className="text-xs text-gray-500 mt-4">{t('account.prototypeNote')}</p>
        </form>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t('account.myDiagnostics')}</h2>
              <p className="text-sm text-gray-500">{t('account.localResultsCount', { count: filteredDiagnostics.length })}</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mirihi-blue-1"
              >
                <option value="all">{t('account.filterAllTypes')}</option>
                <option value="orientation">{t('account.filterOrientation')}</option>
              </select>
              <button
                onClick={() => { localStorage.removeItem('mirihi_diagnostics'); setDiagnostics([]); }}
                className="text-sm text-red-600 hover:underline"
              >
                {t('account.clear')}
              </button>
            </div>
          </div>
          {filteredDiagnostics.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">{t('account.noDiagnostics')}</p>
              <Link href="../orientation" className="inline-flex items-center px-5 py-3 bg-mirihi-blue-1 text-white rounded-xl text-sm font-semibold hover:bg-mirihi-blue-2">
                {t('account.launchDiagnostic')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDiagnostics.map((d, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        🧭 {t('account.orientationDiagnosticShort')}
                      </h3>
                      <p className="text-xs text-gray-500">{new Date(d.savedAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-mirihi-blue-1">{d.overallPercentage}%</div>
                        <div className="text-xs text-gray-500">{t('account.score')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold">{t(`levels.${d.overallLevel}`) || d.overallLevel}</div>
                        <div className="text-xs text-gray-500">{t('account.level')}</div>
                      </div>
                    </div>
                  </div>
                  <details className="group">
                    <summary className="cursor-pointer text-sm text-mirihi-blue-1 font-medium mb-2 flex items-center">{t('account.viewReport')} <span className="ml-1 group-open:rotate-90 transition-transform">›</span></summary>
                    <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-3">
                      <div className="grid sm:grid-cols-2 gap-2">
                        {Object.entries(d.result.categoryScores).map(([cat, data]: any) => (
                          <div key={cat} className="bg-white border border-gray-200 rounded-md p-2 flex items-center justify-between">
                            <span className="text-gray-700 text-xs font-medium mr-2 truncate">{cat}</span>
                            <span className="text-xs font-semibold">{(data as any).percentage}%</span>
                          </div>
                        ))}
                      </div>
                      {d.result.recommendations?.length > 0 && (
                        <div>
                          <p className="font-semibold text-gray-700 mb-1">{t('account.recommendationsLabel')}</p>
                          <ul className="list-disc pl-4 space-y-1">
                            {d.result.recommendations.slice(0,3).map((r: string, i: number) => (
                              <li key={i} className="text-gray-600 text-xs">{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
          {filteredDiagnostics.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">🎯 {t('account.recommendationsTitle')}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommended.map(mod => (
                  <div key={mod.id} className="border border-gray-200 rounded-xl p-4 flex flex-col">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1 truncate" title={mod.name}>{mod.name}</h4>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-3">{mod.description}</p>
                    <div className="mt-auto flex gap-2">
                      <Link href={`../modules/${mod.id}`} className="flex-1 px-3 py-2 bg-mirihi-blue-1 text-white rounded-lg text-xs font-medium hover:bg-mirihi-blue-2 transition-colors">{t('account.launch')}</Link>
                      <Link href={`../diagnostics/modular?id=${mod.id}`} className="px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50">{t('account.details')}</Link>
                    </div>
                  </div>
                ))}
                {recommended.length === 0 && (
                  <div className="col-span-full text-xs text-gray-500 italic">{t('account.noRecommendations')}</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
