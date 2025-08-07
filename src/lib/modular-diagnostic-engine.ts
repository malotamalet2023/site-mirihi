/**
 * Modular Diagnostic Engine - Basic implementation for compatibility
 */

export interface DiagnosticSession {
  id: string;
  moduleId: string;
  responses: Record<string, any>;
  completed: boolean;
  currentQuestionIndex: number;
  getNextQuestion: () => any;
  getProgress: () => { current: number; total: number; percentage: number };
  answerQuestion: (__answer: any) => void;
  getResults: () => any;
  getAllResponses: () => Record<string, any>;
  processAnswer: (__questionId: string, selectedOptionIndex: number, __textAnswer?: string, matrixAnswers?: any) => string;
}

export class ModularDiagnosticEngine {
  private sessions: Map<string, DiagnosticSession> = new Map();

  createSession(moduleId: string): DiagnosticSession {
    const session: DiagnosticSession = {
      id: this.generateSessionId(),
      moduleId,
      responses: {},
      completed: false,
      currentQuestionIndex: 0,
      getNextQuestion: () => null,
      getProgress: () => ({ current: 0, total: 0, percentage: 0 }),
      answerQuestion: (__answer: any) => {},
      getResults: () => ({}),
      getAllResponses: () => ({}),
      processAnswer: (__questionId: string, selectedOptionIndex: number, __textAnswer?: string, matrixAnswers?: any) => 'continue'
    };
    
    this.sessions.set(session.id, session);
    return session;
  }

  startDiagnostic(module: any, sessionId: string): DiagnosticSession | null {
    return this.createSession(module.id);
  }

  getSession(sessionId: string): DiagnosticSession | undefined {
    return this.sessions.get(sessionId);
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
