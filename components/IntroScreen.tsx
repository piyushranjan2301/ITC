
import React from 'react';
import { Language } from '../types';
import { Languages, Play } from 'lucide-react';

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStart: () => void;
}

const IntroScreen: React.FC<Props> = ({ language, onLanguageChange, onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 py-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-extrabold text-blue-900 leading-tight">
          {language === 'hi' ? 'कार्यकर्ता जुड़ाव और व्यवहार मूल्यांकन' : 'Worker Engagement & Behavioral Assessment'}
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          {language === 'hi' 
            ? 'आपका स्वागत है। इस सर्वेक्षण का उद्देश्य आपके कार्य अनुभव को समझना और कार्यस्थल को बेहतर बनाना है।' 
            : 'Welcome. The purpose of this survey is to understand your work experience and make the workplace better.'}
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md space-y-8">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
            <Languages className="w-4 h-4" />
            {language === 'hi' ? 'अपनी भाषा चुनें' : 'Select your language'}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onLanguageChange('hi')}
              className={`py-4 px-6 rounded-xl font-bold border-2 transition-all ${
                language === 'hi' 
                ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-inner' 
                : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-400'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`py-4 px-6 rounded-xl font-bold border-2 transition-all ${
                language === 'en' 
                ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-inner' 
                : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-400'
              }`}
            >
              English
            </button>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2 group"
        >
          {language === 'hi' ? 'शुरू करें' : 'Get Started'}
          <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
        {[
          { icon: '📝', title: language === 'hi' ? 'आसान सवाल' : 'Simple Questions', desc: language === 'hi' ? 'केवल 5-10 मिनट' : 'Only 5-10 minutes' },
          { icon: '🔒', title: language === 'hi' ? 'सुरक्षित' : 'Confidential', desc: language === 'hi' ? 'आपकी पहचान गुप्त रहेगी' : 'Your identity is protected' },
          { icon: '🚀', title: language === 'hi' ? 'बेहतर कल' : 'Better Future', desc: language === 'hi' ? 'सुझावों पर अमल होगा' : 'Action on feedback' }
        ].map((item, i) => (
          <div key={i} className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-blue-900">{item.title}</h3>
            <p className="text-sm text-blue-700/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroScreen;
