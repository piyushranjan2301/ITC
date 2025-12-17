
import React, { useState } from 'react';
import { Question, Language } from '../types';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

interface Props {
  language: Language;
  questions: Question[];
  onComplete: (responses: Record<string, number>) => void;
}

const EngagementScreen: React.FC<Props> = ({ language, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (value: number) => {
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

  const labels = language === 'hi' 
    ? ['बिल्कुल असहमत', 'असहमत', 'तटस्थ', 'सहमत', 'बिल्कुल सहमत']
    : ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

  const emojis = ['😠', '🙁', '😐', '🙂', '🤩'];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-bold text-blue-900 uppercase tracking-wider">
          <span>{language === 'hi' ? 'चरण 1: जुड़ाव सर्वेक्षण' : 'Phase 1: Engagement Survey'}</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 min-h-[400px] flex flex-col">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
              {currentQuestion.dimension}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              {language === 'hi' ? currentQuestion.textHi : currentQuestion.textEn}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {labels.map((label, idx) => {
              const value = idx + 1;
              const active = responses[currentQuestion.id] === value;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(value)}
                  className={`flex items-center gap-6 p-5 rounded-2xl border-2 transition-all text-left group ${
                    active 
                    ? 'bg-blue-50 border-blue-600 shadow-md ring-4 ring-blue-600/10' 
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-white'
                  }`}
                >
                  <span className={`text-4xl transition-transform ${active ? 'scale-110' : 'group-hover:scale-105 opacity-60'}`}>
                    {emojis[idx]}
                  </span>
                  <div className="flex-1">
                    <p className={`font-bold ${active ? 'text-blue-900' : 'text-gray-600'}`}>{label}</p>
                    <p className="text-xs text-gray-400">{language === 'hi' ? `रेटिंग: ${value}` : `Rating: ${value}`}</p>
                  </div>
                  {active && <CheckCircle className="w-6 h-6 text-blue-600 fill-blue-50" />}
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
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
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

export default EngagementScreen;
