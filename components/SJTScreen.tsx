
import React, { useState } from 'react';
import { SJTQuestion, Language } from '../types';
import { ChevronRight, ChevronLeft, ShieldAlert } from 'lucide-react';

interface Props {
  language: Language;
  questions: SJTQuestion[];
  onComplete: (responses: Record<string, 'A' | 'B' | 'C' | 'D'>) => void;
}

const SJTScreen: React.FC<Props> = ({ language, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (value: 'A' | 'B' | 'C' | 'D') => {
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
        <div className="flex justify-between text-sm font-bold text-amber-900 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            {language === 'hi' ? 'चरण 3: कार्य सिमुलेशन' : 'Phase 3: Work Simulations'}
          </span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div 
            className="h-full bg-amber-500 transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
        <div className="space-y-8">
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <h3 className="text-xl font-bold text-amber-900 leading-relaxed italic">
              "{language === 'hi' ? currentQuestion.scenarioHi : currentQuestion.scenarioEn}"
            </h3>
          </div>

          <p className="text-sm font-bold text-gray-500 uppercase">
            {language === 'hi' ? 'आप क्या करेंगे?' : 'What would you do?'}
          </p>

          <div className="grid grid-cols-1 gap-4">
            {(['A', 'B', 'C', 'D'] as const).map((key) => {
              const option = currentQuestion.options[key];
              const active = responses[currentQuestion.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                    active 
                    ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-500/10' 
                    : 'bg-white border-gray-200 hover:border-amber-200'
                  }`}
                >
                  <span className={`mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors ${
                    active ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {key}
                  </span>
                  <p className={`font-medium leading-relaxed ${active ? 'text-amber-900' : 'text-gray-600'}`}>
                    {language === 'hi' ? option.textHi : option.textEn}
                  </p>
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
              ? 'bg-amber-500 text-white hover:bg-amber-600' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentIndex === questions.length - 1 
              ? (language === 'hi' ? 'परिणाम देखें' : 'View Results')
              : (language === 'hi' ? 'अगला' : 'Next')
            }
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SJTScreen;
