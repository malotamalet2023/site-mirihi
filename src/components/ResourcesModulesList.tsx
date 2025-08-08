'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
  initialModules: any[];
}

export default function ResourcesModulesList({ locale, initialModules }: Props) {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<'questions'|'alpha'>('questions');

  const filtered = useMemo(() => {
    let list = initialModules.filter(m => 
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase())
    );
    
    if (category !== 'all') {
      list = list.filter(m => m.category === category);
    }
    
    if (sort === 'alpha') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => a.estimatedQuestions - b.estimatedQuestions);
    }
    
    return list;
  }, [initialModules, query, category, sort]);

  const categories = [...new Set(initialModules.map(m => m.category))];

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('resources.searchPlaceholder')}
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('resources.searchModules')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirihi-blue-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('resources.filterByCategory')}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirihi-blue-1"
            >
              <option value="all">{t('resources.allCategories')}</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('resources.sortBy')}
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'questions'|'alpha')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirihi-blue-1"
            >
              <option value="questions">{t('resources.sortByQuestions')}</option>
              <option value="alpha">{t('resources.sortAlphabetically')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(module => (
          <div key={module.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{module.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>📊 ~{module.estimatedQuestions} {t('resources.questions')}</span>
              <span>🏷️ {module.category}</span>
            </div>
            <div className="flex gap-2">
              <Link 
                href={`/${locale}/modules/${module.id}`}
                className="flex-1 px-4 py-2 bg-mirihi-blue-1 text-white rounded-lg text-sm font-medium text-center hover:bg-mirihi-blue-2 transition-colors"
              >
                {t('resources.launch')}
              </Link>
              <Link 
                href={`/${locale}/diagnostics/modular?id=${module.id}`}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {t('resources.details')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
