
import React, { useMemo } from 'react';
import { ScoringResult, AssessmentState, Language } from '../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import { Trophy, Users, Shield, Zap, Info, Download } from 'lucide-react';

interface Props {
  language: Language;
  results: ScoringResult;
  responses: AssessmentState;
}

const ResultsScreen: React.FC<Props> = ({ language, results, responses }) => {
  const behavioralData = useMemo(() => 
    Object.entries(results.behavioralProfile).map(([name, value]) => ({ name, value })),
    [results.behavioralProfile]
  );

  const sjtData = useMemo(() => 
    Object.entries(results.sjtAlignment).map(([name, value]) => ({ name, value })),
    [results.sjtAlignment]
  );

  const categoryInfo = {
    'Leadership Pool': {
      icon: <Trophy className="w-12 h-12 text-amber-500" />,
      hi: 'लीडरशिप पूल - भविष्य के पर्यवेक्षक',
      en: 'Leadership Pool - Future Supervisor',
      desc: language === 'hi' 
        ? 'आपके पास नेतृत्व के उत्कृष्ट गुण हैं और आप टीम का मार्गदर्शन कर सकते हैं।' 
        : 'You have excellent leadership qualities and can guide the team.'
    },
    'Mentor Candidate': {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      hi: 'मेंटोर - मार्गदर्शक',
      en: 'Mentor - Guide',
      desc: language === 'hi'
        ? 'आप एक भरोसेमंद कर्मचारी हैं जो दूसरों को सिखाने में निपुण हैं।'
        : 'You are a reliable employee who is skilled at teaching others.'
    },
    'Skilled Operator': {
      icon: <Zap className="w-12 h-12 text-green-500" />,
      hi: 'कुशल ऑपरेटर',
      en: 'Skilled Operator',
      desc: language === 'hi'
        ? 'आप अपने काम में माहिर हैं और प्रक्रिया का पालन बखूबी करते हैं।'
        : 'You are an expert in your work and follow the process perfectly.'
    },
    'Needs Support': {
      icon: <Info className="w-12 h-12 text-red-500" />,
      hi: 'सहायता की आवश्यकता',
      en: 'Support Required',
      desc: language === 'hi'
        ? 'हम आपके कार्य अनुभव को बेहतर बनाने के लिए अतिरिक्त सहायता प्रदान करेंगे।'
        : 'We will provide additional support to improve your work experience.'
    }
  }[results.category] || { 
    icon: <Zap className="w-12 h-12 text-gray-500" />, 
    hi: 'मूल्यांकन पूर्ण', 
    en: 'Assessment Complete', 
    desc: '' 
  };

  return (
    <div className="space-y-8 py-4 animate-in fade-in zoom-in-95 duration-700">
      {/* Top Banner */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-gray-50 p-6 rounded-full border-4 border-white shadow-inner">
          {categoryInfo.icon}
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tight">
            {language === 'hi' ? categoryInfo.hi : categoryInfo.en}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {categoryInfo.desc}
          </p>
        </div>
        <div className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-center">
          <p className="text-xs uppercase font-bold opacity-80">{language === 'hi' ? 'जुड़ाव स्कोर' : 'Engagement Score'}</p>
          <p className="text-4xl font-black">{results.engagementScore.toFixed(1)}</p>
          <p className="text-xs font-bold mt-1 bg-blue-500 rounded px-2 py-0.5">{results.engagementLevel}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Behavioral Radar */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500" />
            {language === 'hi' ? 'व्यवहार प्रोफाइल' : 'Behavioral Profile'}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={behavioralData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SJT Alignment Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            {language === 'hi' ? 'निर्णय लेने की शैली' : 'Decision Making Alignment'}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={sjtData}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {sjtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#f59e0b', '#3b82f6', '#ef4444', '#10b981'][index % 4]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-300" />
          {language === 'hi' ? 'अगले कदम' : 'Next Steps'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-800/50 p-6 rounded-2xl border border-blue-700">
            <h4 className="font-bold text-blue-200 mb-2">{language === 'hi' ? 'विकास योजना' : 'Development Plan'}</h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {language === 'hi' 
                ? 'आपका अगला प्रशिक्षण मॉड्यूल अगले सप्ताह "एडवांस्ड सेफ्टी प्रोसीजर्स" पर केंद्रित होगा।'
                : 'Your next training module will focus on "Advanced Safety Procedures" starting next week.'}
            </p>
          </div>
          <div className="bg-blue-800/50 p-6 rounded-2xl border border-blue-700">
            <h4 className="font-bold text-blue-200 mb-2">{language === 'hi' ? 'डिजिटल बडी सहायता' : 'Digital Buddy Support'}</h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {language === 'hi'
                ? 'यदि आप परिणामों के बारे में और जानना चाहते हैं, तो कृपया अपने शिफ्ट टीजीडब्ल्यू से संपर्क करें।'
                : 'If you want to know more about these results, please contact your shift TGW.'}
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-4">
           <button 
             onClick={() => window.print()}
             className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-xl font-bold transition-all"
           >
             <Download className="w-5 h-5" />
             {language === 'hi' ? 'रिपोर्ट डाउनलोड करें' : 'Download Report'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
