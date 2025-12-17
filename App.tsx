
import React, { useState, useCallback, useMemo } from 'react';
import { Phase, Language, AssessmentState, ScoringResult } from './types';
import { 
  ENGAGEMENT_QUESTIONS, 
  BEHAVIORAL_QUESTIONS, 
  SJT_QUESTIONS 
} from './constants';
import IntroScreen from './components/IntroScreen';
import EngagementScreen from './components/EngagementScreen';
import BehavioralScreen from './components/BehavioralScreen';
import SJTScreen from './components/SJTScreen';
import ResultsScreen from './components/ResultsScreen';
import { ClipboardCheck, LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AssessmentState>({
    language: 'hi',
    currentPhase: Phase.Intro,
    currentQuestionIndex: 0,
    engagementResponses: {},
    behavioralResponses: {},
    sjtResponses: {}
  });

  const setLanguage = (lang: Language) => setState(prev => ({ ...prev, language: lang }));
  const startAssessment = () => setState(prev => ({ ...prev, currentPhase: Phase.Engagement }));

  const handleEngagementSubmit = (responses: Record<string, number>) => {
    setState(prev => ({
      ...prev,
      engagementResponses: responses,
      currentPhase: Phase.Behavioral,
      currentQuestionIndex: 0
    }));
  };

  const handleBehavioralSubmit = (responses: Record<string, 'A' | 'B'>) => {
    setState(prev => ({
      ...prev,
      behavioralResponses: responses,
      currentPhase: Phase.SJT,
      currentQuestionIndex: 0
    }));
  };

  const handleSJTSubmit = (responses: Record<string, 'A' | 'B' | 'C' | 'D'>) => {
    setState(prev => ({
      ...prev,
      sjtResponses: responses,
      currentPhase: Phase.Results
    }));
  };

  const calculateResults = useCallback((): ScoringResult => {
    // Phase 1: Engagement (Likert 1-5)
    const eValues = Object.values(state.engagementResponses);
    // Fix: Explicitly type reduce parameters to resolve unknown type inference errors during arithmetic operations
    const avgE = eValues.length > 0 ? eValues.reduce((a: number, b: number) => a + b, 0) / eValues.length : 0;
    const eLevel = avgE >= 4.0 ? 'High' : avgE >= 3.0 ? 'Moderate' : 'Low';

    // Phase 2: Behavioral
    const bProfile: Record<string, number> = {};
    BEHAVIORAL_QUESTIONS.forEach(q => {
      const choice = state.behavioralResponses[q.id];
      if (choice) {
        const trait = q.options[choice].trait;
        bProfile[trait] = (bProfile[trait] || 0) + 1;
      }
    });

    // Phase 3: SJT
    const sjtAlignment: Record<string, number> = {};
    SJT_QUESTIONS.forEach(q => {
      const choice = state.sjtResponses[q.id];
      if (choice) {
        const align = q.options[choice].alignment;
        sjtAlignment[align] = (sjtAlignment[align] || 0) + 1;
      }
    });

    // Final Categorization
    let category = 'Awaiting Support';
    const isHighEngaged = eLevel === 'High';
    const dominantTraits = Object.entries(bProfile).sort((a, b) => b[1] - a[1]);
    const topTrait = dominantTraits[0]?.[0];

    if (isHighEngaged && (topTrait === 'Executor' || topTrait === 'Harmonizer')) {
      category = 'Leadership Pool';
    } else if (isHighEngaged && (topTrait === 'Guardian' || topTrait === 'Informer')) {
      category = 'Mentor Candidate';
    } else if (eLevel === 'Low' || topTrait === 'Resistor') {
      category = 'Needs Support';
    } else {
      category = 'Skilled Operator';
    }

    return {
      engagementScore: avgE,
      engagementLevel: eLevel as any,
      behavioralProfile: bProfile,
      sjtAlignment: sjtAlignment,
      category
    };
  }, [state.engagementResponses, state.behavioralResponses, state.sjtResponses]);

  const results = useMemo(() => {
    if (state.currentPhase === Phase.Results) return calculateResults();
    return null;
  }, [state.currentPhase, calculateResults]);

  const renderContent = () => {
    switch (state.currentPhase) {
      case Phase.Intro:
        return (
          <IntroScreen 
            language={state.language} 
            onLanguageChange={setLanguage} 
            onStart={startAssessment} 
          />
        );
      case Phase.Engagement:
        return (
          <EngagementScreen 
            language={state.language}
            questions={ENGAGEMENT_QUESTIONS}
            onComplete={handleEngagementSubmit}
          />
        );
      case Phase.Behavioral:
        return (
          <BehavioralScreen 
            language={state.language}
            questions={BEHAVIORAL_QUESTIONS}
            onComplete={handleBehavioralSubmit}
          />
        );
      case Phase.SJT:
        return (
          <SJTScreen 
            language={state.language}
            questions={SJT_QUESTIONS}
            onComplete={handleSJTSubmit}
          />
        );
      case Phase.Results:
        return results && (
          <ResultsScreen 
            language={state.language}
            results={results}
            responses={state}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-8 h-8 text-blue-300" />
            <div>
              <h1 className="text-xl font-bold leading-tight">ITC Limited</h1>
              <p className="text-xs text-blue-200 uppercase tracking-widest">Worker Assessment System</p>
            </div>
          </div>
          {state.currentPhase !== Phase.Intro && (
             <div className="text-sm font-medium bg-blue-800 px-3 py-1 rounded-full border border-blue-700">
               {state.currentPhase === Phase.Results ? (
                 <span className="flex items-center gap-1"><LayoutDashboard className="w-4 h-4" /> Profile Generated</span>
               ) : (
                 `Phase ${Object.values(Phase).indexOf(state.currentPhase)}: ${state.currentPhase}`
               )}
             </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        <p>&copy; 2024 ITC Limited - Cigarette Division. Localized for Hindi Speaking Workforce.</p>
      </footer>
    </div>
  );
};

export default App;
