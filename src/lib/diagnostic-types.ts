// Types et interfaces pour les différents diagnostics
export interface DiagnosticModule {
  id: string;
  name: string;
  description: string;
  category: DiagnosticCategory;
  estimatedDuration: string;
  questions: AdaptiveQuestion[];
  scoringModel: ScoringModel;
  reportTemplate: ReportTemplate;
}

export enum DiagnosticCategory {
  MATURITY = 'maturity',
  SEGMENTATION = 'segmentation', 
  SUPPLIER_MANAGEMENT = 'supplier-management',
  STRATEGIC_ORIENTATION = 'strategic-orientation',
  CATEGORY_MANAGEMENT = 'category-management'
}

export interface AdaptiveQuestion {
  id: string;
  category: string;
  question: string;
  questionType: 'single-choice' | 'multiple-choice' | 'scale' | 'matrix' | 'text';
  options?: QuestionOption[];
  scaleConfig?: ScaleConfig;
  matrixConfig?: MatrixConfig;
  priority: 'high' | 'medium' | 'low';
  isFollowUp?: boolean;
  parentQuestionId?: string;
  conditionalLogic?: ConditionalLogic;
  weight?: number;
}

export interface QuestionOption {
  text: string;
  score: number;
  value?: string;
  followUp?: 'continue' | 'skip_category' | 'deep_dive' | 'custom';
  nextQuestionId?: string;
}

export interface ScaleConfig {
  min: number;
  max: number;
  step: number;
  labels: { value: number; label: string }[];
}

export interface MatrixConfig {
  rows: string[];
  columns: string[];
  scoringType: 'sum' | 'weighted' | 'average';
}

export interface ConditionalLogic {
  condition: string; // ex: "previous_score > 3"
  action: 'show' | 'hide' | 'modify';
  targetQuestionId?: string;
}

export interface ScoringModel {
  type: 'weighted' | 'matrix' | 'segment' | 'cluster';
  categories: ScoringCategory[];
  maturityLevels?: MaturityLevel[];
  segmentationMatrix?: SegmentationMatrix;
  clusteringAlgorithm?: ClusteringConfig;
}

export interface ScoringCategory {
  id: string;
  name: string;
  weight: number;
  maxScore: number;
  subcategories?: ScoringCategory[];
}

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  minPercentage: number;
  maxPercentage: number;
  color: string;
  icon: string;
}

export interface SegmentationMatrix {
  xAxis: { name: string; criteria: string[] };
  yAxis: { name: string; criteria: string[] };
  quadrants: {
    name: string;
    description: string;
    strategies: string[];
    color: string;
  }[];
}

export interface ClusteringConfig {
  algorithm: 'k-means' | 'hierarchical' | 'custom';
  dimensions: string[];
  clusterCount?: number;
  clusters: {
    name: string;
    description: string;
    characteristics: string[];
    recommendations: string[];
    color: string;
  }[];
}

export interface ReportTemplate {
  type: 'maturity' | 'segmentation' | 'clustering' | 'strategic';
  sections: ReportSection[];
  visualizations: VisualizationType[];
  exportFormats: ('pdf' | 'excel' | 'powerpoint')[];
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'summary' | 'detailed' | 'chart' | 'recommendations' | 'action-plan';
  content: string;
  order: number;
}

export enum VisualizationType {
  RADAR_CHART = 'radar-chart',
  BAR_CHART = 'bar-chart',
  MATRIX = 'matrix',
  SCATTER_PLOT = 'scatter-plot',
  HEATMAP = 'heatmap',
  TREEMAP = 'treemap'
}

export interface DiagnosticResult {
  diagnosticId: string;
  sessionId: string;
  timestamp: Date;
  overallScore: number;
  overallLevel: string;
  categories: Record<string, CategoryResult>;
  segmentationResults?: SegmentationResult;
  clusteringResults?: ClusteringResult;
  recommendations: Recommendation[];
  actionPlan: ActionItem[];
  nextSteps: string[];
  strengths: string[];
  areasForImprovement: string[];
}

export interface CategoryResult {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: string;
  recommendations: string[];
  subCategories?: Record<string, CategoryResult>;
}

export interface SegmentationResult {
  segments: {
    name: string;
    items: SegmentItem[];
    strategies: string[];
    priority: 'high' | 'medium' | 'low';
  }[];
  matrix: number[][];
  insights: string[];
}

export interface SegmentItem {
  name: string;
  x: number;
  y: number;
  segment: string;
  characteristics: string[];
}

export interface ClusteringResult {
  clusters: {
    name: string;
    items: ClusterItem[];
    centroid: number[];
    characteristics: string[];
    recommendations: string[];
  }[];
  insights: string[];
  qualityMetrics: {
    silhouetteScore: number;
    inertia: number;
  };
}

export interface ClusterItem {
  name: string;
  cluster: string;
  features: number[];
  distance: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  timeframe: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  dependencies: string[];
  resources: string[];
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  responsible: string;
  deadline: string;
  status: 'todo' | 'in-progress' | 'completed';
  milestones: string[];
}
