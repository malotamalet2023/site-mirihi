'use client';

import React from 'react';
import Link from 'next/link';

export default function ModularDiagnosticInterface() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Diagnostics Modulaires
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Les diagnostics modulaires détaillés seront bientôt disponibles
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-blue-800 mb-3">
              🚧 En Développement
            </h3>
            <p className="text-blue-700">
              Cette section contiendra les diagnostics approfondis par module : 
              Orientation Stratégique, Segmentation Catégories, Gestion Fournisseurs, et Maturité MMCM.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/fr/orientation-diagnostic"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Commencer par le Diagnostic d&apos;Orientation
            </Link>
            
            <p className="text-sm text-gray-500">
              Ou retourner à la <Link href="/fr/resources" className="text-blue-600 hover:underline">page des ressources</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
