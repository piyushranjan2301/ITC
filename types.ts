
export type Language = 'en' | 'hi';

export enum Phase {
  Intro = 'Intro',
  Engagement = 'Engagement',
  Behavioral = 'Behavioral',
  SJT = 'SJT',
  Results = 'Results'
}

export interface Question {
  id: string;
  textEn: string;
  textHi: string;
  dimension: string;
  purpose: string;
  framework: string;
}

export interface ForcedChoiceQuestion {
  id: string;
  scenarioEn: string;
  scenarioHi: string;
  options: {
    A: { textEn: string; textHi: string; trait: string };
    B: { textEn: string; textHi: string; trait: string };
  };
}

export interface SJTQuestion {
  id: string;
  scenarioEn: string;
  scenarioHi: string;
  options: {
    A: { textEn: string; textHi: string; alignment: string };
    B: { textEn: string; textHi: string; alignment: string };
    C: { textEn: string; textHi: string; alignment: string };
    D: { textEn: string; textHi: string; alignment: string };
  };
}

export interface AssessmentState {
  language: Language;
  currentPhase: Phase;
  currentQuestionIndex: number;
  engagementResponses: Record<string, number>;
  behavioralResponses: Record<string, 'A' | 'B'>;
  sjtResponses: Record<string, 'A' | 'B' | 'C' | 'D'>;
}

export interface ScoringResult {
  engagementScore: number;
  engagementLevel: 'High' | 'Moderate' | 'Low';
  behavioralProfile: Record<string, number>;
  sjtAlignment: Record<string, number>;
  category: string;
}
