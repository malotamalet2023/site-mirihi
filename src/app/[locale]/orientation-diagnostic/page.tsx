'use client';

import OrientationDiagnostic from '@/components/OrientationDiagnostic';
import { DiagnosticResult } from '@/lib/orientation-diagnostic-engine';

export default function OrientationDiagnosticPage() {
  const handleDiagnosticComplete = (result: DiagnosticResult) => {
    console.log('Diagnostic terminé:', result);
    // Ici on pourrait sauvegarder les résultats, rediriger vers une page de résultats, etc.
  };

  return (
    <OrientationDiagnostic 
      onComplete={handleDiagnosticComplete}
      autoStart={true}
    />
  );
}
