import { DiagnosticModule } from './diagnostic-types';
import { strategicOrientationModule } from './modules/strategic-orientation';
import { categorySegmentationModule } from './modules/category-segmentation';
import { supplierClusteringModule } from './modules/supplier-clustering';
import { procurementMaturityModule } from './modules/procurement-maturity';

export class DiagnosticModuleRegistry {
  private static instance: DiagnosticModuleRegistry;
  private modules: Map<string, DiagnosticModule> = new Map();

  private constructor() {
    this.initializeModules();
  }

  public static getInstance(): DiagnosticModuleRegistry {
    if (!DiagnosticModuleRegistry.instance) {
      DiagnosticModuleRegistry.instance = new DiagnosticModuleRegistry();
    }
    return DiagnosticModuleRegistry.instance;
  }

  private initializeModules() {
    // Enregistrer tous les modules disponibles
    this.registerModule(strategicOrientationModule);
    this.registerModule(categorySegmentationModule);
    this.registerModule(supplierClusteringModule);
    this.registerModule(procurementMaturityModule);
  }

  public registerModule(module: DiagnosticModule) {
    this.modules.set(module.id, module);
  }

  public getModule(id: string): DiagnosticModule | undefined {
    return this.modules.get(id);
  }

  public getAllModules(): DiagnosticModule[] {
    return Array.from(this.modules.values());
  }

  public getModulesByCategory(category: string): DiagnosticModule[] {
    return Array.from(this.modules.values())
      .filter(module => module.category === category);
  }

  public getRecommendedModules(): DiagnosticModule[] {
    // Logic pour recommander des modules basés sur le profil utilisateur
    // Pour l'instant, retourner tous les modules triés par priorité
    return this.getAllModules().sort((a, b) => {
      const priority = {
        'strategic-orientation': 1,
        'procurement-maturity': 2,
        'category-segmentation': 3,
        'supplier-clustering': 4
      };
      return (priority[a.id as keyof typeof priority] || 99) - (priority[b.id as keyof typeof priority] || 99);
    });
  }

  public searchModules(query: string): DiagnosticModule[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.modules.values())
      .filter(module => 
        module.name.toLowerCase().includes(lowerQuery) ||
        module.description.toLowerCase().includes(lowerQuery)
      );
  }
}

// Interface pour la configuration des diagnostics adaptatifs
export interface AdaptiveDiagnosticConfig {
  maxQuestions: number;
  timeLimit: number; // en minutes
  adaptationStrategy: 'performance' | 'comprehensive' | 'balanced';
  personalization: {
    industry?: string;
    companySize?: 'startup' | 'sme' | 'large' | 'enterprise';
    maturityLevel?: 'beginner' | 'intermediate' | 'advanced';
    priorities?: string[];
  };
}

// Factory pour créer des sessions de diagnostic adaptées
export class AdaptiveDiagnosticFactory {
  static createAdaptiveSession(
    moduleId: string, 
    config: AdaptiveDiagnosticConfig
  ) {
    const registry = DiagnosticModuleRegistry.getInstance();
    const diagnosticModule = registry.getModule(moduleId);
    
    if (!diagnosticModule) {
      throw new Error(`Module ${moduleId} not found`);
    }

    // Adapter le module selon la configuration
    const adaptedModule = this.adaptModuleForUser(diagnosticModule, config);
    
    return adaptedModule;
  }

  private static adaptModuleForUser(
    module: DiagnosticModule, 
    config: AdaptiveDiagnosticConfig
  ): DiagnosticModule {
    // Cloner le module pour éviter les modifications globales
    const adaptedModule = JSON.parse(JSON.stringify(module));

    // Adapter les questions selon la stratégie
    switch (config.adaptationStrategy) {
      case 'performance':
        // Réduire aux questions les plus critiques
        adaptedModule.questions = this.selectHighPriorityQuestions(
          adaptedModule.questions, 
          Math.min(config.maxQuestions, 8)
        );
        break;
      
      case 'comprehensive':
        // Garder toutes les questions mais optimiser l'ordre
        adaptedModule.questions = this.optimizeQuestionOrder(
          adaptedModule.questions
        );
        break;
      
      case 'balanced':
        // Équilibrer entre rapidité et complétude
        adaptedModule.questions = this.balanceQuestions(
          adaptedModule.questions,
          config.maxQuestions
        );
        break;
    }

    // Personnaliser selon l'industrie et la taille d'entreprise
    if (config.personalization.industry) {
      adaptedModule.questions = this.customizeForIndustry(
        adaptedModule.questions
      );
    }

    if (config.personalization.companySize) {
      adaptedModule.questions = this.customizeForCompanySize(
        adaptedModule.questions,
        config.personalization.companySize
      );
    }

    return adaptedModule;
  }

  private static selectHighPriorityQuestions(questions: any[], maxCount: number): any[] {
    return questions
      .filter(q => q.priority === 'high')
      .sort((a, b) => (b.weight || 1) - (a.weight || 1))
      .slice(0, maxCount);
  }

  private static optimizeQuestionOrder(questions: any[]): any[] {
    // Optimiser l'ordre des questions basé sur le contexte utilisateur
    return questions.sort((a, b) => {
      // Les questions à forte pondération et haute priorité en premier
      const scoreA = (a.weight || 1) * (a.priority === 'high' ? 3 : a.priority === 'medium' ? 2 : 1);
      const scoreB = (b.weight || 1) * (b.priority === 'high' ? 3 : b.priority === 'medium' ? 2 : 1);
      return scoreB - scoreA;
    });
  }

  private static balanceQuestions(questions: any[], maxCount: number): any[] {
    // Sélectionner un équilibre entre toutes les catégories
    const categories = [...new Set(questions.map(q => q.category))];
    const questionsPerCategory = Math.ceil(maxCount / categories.length);
    
    const selectedQuestions: any[] = [];
    
    for (const category of categories) {
      const categoryQuestions = questions
        .filter(q => q.category === category)
        .sort((a, b) => {
          const scoreA = (a.weight || 1) * (a.priority === 'high' ? 3 : a.priority === 'medium' ? 2 : 1);
          const scoreB = (b.weight || 1) * (b.priority === 'high' ? 3 : b.priority === 'medium' ? 2 : 1);
          return scoreB - scoreA;
        })
        .slice(0, questionsPerCategory);
      
      selectedQuestions.push(...categoryQuestions);
    }

    return selectedQuestions.slice(0, maxCount);
  }

  private static customizeForIndustry(questions: any[]): any[] {
    // Personnaliser les questions selon l'industrie
    // Cette logique peut être étendue selon les besoins spécifiques
    return questions;
  }

  private static customizeForCompanySize(questions: any[], companySize: string): any[] {
    // Adapter les questions selon la taille de l'entreprise
    return questions.map(question => {
      const customizedQuestion = { ...question };
      
      // Adapter les options selon la taille de l'entreprise
      if (companySize === 'startup' || companySize === 'sme') {
        // Simplifier certaines options pour les petites entreprises
        if (customizedQuestion.options) {
          customizedQuestion.options = customizedQuestion.options.map((option: any) => {
            return {
              ...option,
              text: option.text.replace('Centre d\'excellence', 'Équipe spécialisée')
                              .replace('Écosystème digital avancé', 'Outils digitaux intégrés')
            };
          });
        }
      }
      
      return customizedQuestion;
    });
  }
}

export default DiagnosticModuleRegistry;
