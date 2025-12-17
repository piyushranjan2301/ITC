
import React, { useState } from 'react';
import { ForcedChoiceQuestion, Language } from '../types';
import { ChevronRight, ChevronLeft, Target } from 'lucide-react';

interface Props {
  language: Language;
  questions: ForcedChoiceQuestion[];
  onComplete: (responses: Record<string, 'A' | 'B'>) => void;
}

const BehavioralScreen: React.FC<Props> = ({ language, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, 'A' | 'B'>>({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (value: 'A' | 'B') => {
    setResponses(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const isSelected = responses[currentQuestion.id] !== undefined;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-bold text-indigo-900 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            {language === 'hi' ? 'चरण 2: व्यवहार मूल्यांकन' : 'Phase 2: Behavioral Assessment'}
          </span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-bold text-indigo-600/70 uppercase">
              {language === 'hi' ? 'चुनें जो आपको बेहतर दर्शाता है' : 'Pick the one that fits you better'}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 leading-snug">
              {language === 'hi' ? currentQuestion.scenarioHi : currentQuestion.scenarioEn}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {(['A', 'B'] as const).map((key) => {
              const option = currentQuestion.options[key];
              const active = responses[currentQuestion.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`relative p-8 rounded-2xl border-2 text-left transition-all group ${
                    active 
                    ? 'bg-indigo-50 border-indigo-600 ring-4 ring-indigo-600/10' 
                    : 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold transition-colors ${
                      active ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-indigo-200 group-hover:text-indigo-600'
                    }`}>
                      {key}
                    </span>
                    <p className={`text-lg font-semibold leading-relaxed ${active ? 'text-indigo-900' : 'text-gray-700'}`}>
                      {language === 'hi' ? option.textHi : option.textEn}
                    </p>
                  </div>
                  {active && (
                    <div className="absolute top-4 right-4">
                       <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-100">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              currentIndex === 0 
              ? 'opacity-0 pointer-events-none' 
              : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            {language === 'hi' ? 'पीछे' : 'Previous'}
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isSelected}
            className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg ${
              isSelected 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentIndex === questions.length - 1 
              ? (language === 'hi' ? 'अगला चरण' : 'Next Phase')
              : (language === 'hi' ? 'अगला' : 'Next')
            }
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BehavioralScreen;
