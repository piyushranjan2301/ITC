
import { Question, ForcedChoiceQuestion, SJTQuestion } from './types';

export const ENGAGEMENT_QUESTIONS: Question[] = [
  {
    id: 'e1',
    textEn: 'Do you feel your work has a purpose?',
    textHi: 'क्या आपको लगता है कि आपके काम का कोई उद्देश्य है?',
    dimension: 'Organizational Engagement',
    purpose: 'Engagement',
    framework: 'Gallup Q12'
  },
  {
    id: 'e2',
    textEn: 'Do you clearly understand your role and responsibilities?',
    textHi: 'क्या आप अपनी भूमिका और जिम्मेदारियों को स्पष्ट रूप से समझते हैं?',
    dimension: 'Job Engagement',
    purpose: 'Engagement',
    framework: 'Gallup Q12'
  },
  {
    id: 'e3',
    textEn: 'Does your work energize you?',
    textHi: 'क्या आपका काम आपको ऊर्जा देता है?',
    dimension: 'Vigor',
    purpose: 'Engagement',
    framework: 'UWES-9'
  },
  {
    id: 'e4',
    textEn: 'Do you persist even when work is challenging?',
    textHi: 'क्या आप काम चुनौतीपूर्ण होने पर भी डटे रहते हैं?',
    dimension: 'Dedication',
    purpose: 'Engagement',
    framework: 'UWES-9'
  },
  {
    id: 'e5',
    textEn: 'Do you have all the tools and resources needed to do your job?',
    textHi: 'क्या आपके पास अपना काम करने के लिए आवश्यक सभी उपकरण और संसाधन हैं?',
    dimension: 'Organizational Support',
    purpose: 'Engagement',
    framework: 'Gallup Q12'
  },
  {
    id: 'e6',
    textEn: 'Have you received recognition for good work recently?',
    textHi: 'क्या आपको हाल ही में अच्छे काम के लिए पहचान मिली है?',
    dimension: 'Recognition',
    purpose: 'Engagement',
    framework: 'Gallup Q12'
  },
  {
    id: 'e7',
    textEn: 'Do your team members help one another?',
    textHi: 'क्या आपके टीम के सदस्य एक-दूसरे की मदद करते हैं?',
    dimension: 'Teamwork',
    purpose: 'Engagement',
    framework: 'Gallup Q12'
  },
  {
    id: 'e8',
    textEn: 'Do you understand management’s decisions?',
    textHi: 'क्या आप प्रबंधन के निर्णयों को समझते हैं?',
    dimension: 'Communication',
    purpose: 'Engagement',
    framework: 'Gallup Q12'
  },
  {
    id: 'e9',
    textEn: 'Do you share new ideas and suggestions regularly?',
    textHi: 'क्या आप नियमित रूप से नए विचार और सुझाव साझा करते हैं?',
    dimension: 'Communication/Innovation',
    purpose: 'Engagement',
    framework: 'Gallup Q12'
  },
  {
    id: 'e10',
    textEn: 'Do you ever get so involved in your work that you lose track of time?',
    textHi: 'क्या आप कभी अपने काम में इतने व्यस्त हो जाते हैं कि आपको समय का पता ही नहीं चलता?',
    dimension: 'Absorption',
    purpose: 'Engagement',
    framework: 'UWES-9'
  },
  {
    id: 'e11',
    textEn: 'Do you feel your work brings balance to your life?',
    textHi: 'क्या आपको लगता है कि आपका काम आपके जीवन में संतुलन लाता है?',
    dimension: 'Well-being',
    purpose: 'Engagement',
    framework: 'Custom Indian'
  },
  {
    id: 'e12',
    textEn: 'Do you receive timely safety updates and instructions?',
    textHi: 'क्या आपको समय पर सुरक्षा अपडेट और निर्देश मिलते हैं?',
    dimension: 'Welfare/Environment',
    purpose: 'Engagement',
    framework: 'Gallup Q12'
  }
];

export const BEHAVIORAL_QUESTIONS: ForcedChoiceQuestion[] = [
  {
    id: 'b1',
    scenarioEn: 'When under pressure at work, which is more likely true for you?',
    scenarioHi: 'काम पर दबाव होने पर, आपके लिए क्या अधिक सच होने की संभावना है?',
    options: {
      A: { textEn: 'I tend to complete tasks faster, even if they are not perfect.', textHi: 'मैं कार्यों को तेज़ी से पूरा करता हूँ, भले ही वे सही न हों।', trait: 'Executor' },
      B: { textEn: 'I slow down to ensure every detail is correct.', textHi: 'मैं हर विवरण सही सुनिश्चित करने के लिए गति धीमी कर देता हूँ।', trait: 'Guardian' }
    }
  },
  {
    id: 'b2',
    scenarioEn: 'If your coworker isn’t performing well, what would you most likely do?',
    scenarioHi: 'यदि आपका सहकर्मी अच्छा प्रदर्शन नहीं कर रहा है, तो आप सबसे अधिक क्या करेंगे?',
    options: {
      A: { textEn: 'Take on extra work myself without making a fuss.', textHi: 'बिना शोर मचाए खुद अतिरिक्त काम ले लूँगा।', trait: 'Harmonizer' },
      B: { textEn: 'Tell the supervisor so they can intervene.', textHi: 'सुपरवाइजर को बताऊँगा ताकि वे हस्तक्षेप कर सकें।', trait: 'Informer' }
    }
  },
  {
    id: 'b3',
    scenarioEn: 'Which of these best matches your natural work style?',
    scenarioHi: 'इनमें से कौन सा आपकी स्वाभाविक कार्य शैली से सबसे अच्छा मेल खाता है?',
    options: {
      A: { textEn: 'I prefer to strictly follow routines and rules.', textHi: 'मैं दिनचर्या और नियमों का सख्ती से पालन करना पसंद करता हूँ।', trait: 'Guardian' },
      B: { textEn: 'I like to adapt and try new ways to do my tasks.', textHi: 'मुझे अपने कार्यों को करने के नए तरीके अपनाना और आज़माना पसंद है।', trait: 'Executor' }
    }
  },
  {
    id: 'b4',
    scenarioEn: 'If you make a mistake during your shift, how do you usually react?',
    scenarioHi: 'यदि आप अपनी शिफ्ट के दौरान कोई गलती करते हैं, तो आप आम तौर पर कैसी प्रतिक्रिया देते हैं?',
    options: {
      A: { textEn: 'I quietly fix it and move on.', textHi: 'मैं इसे चुपचाप ठीक कर देता हूँ और आगे बढ़ जाता हूँ।', trait: 'Guardian' },
      B: { textEn: 'I discuss it with the team to ensure it doesn’t happen again.', textHi: 'मैं टीम के साथ इस पर चर्चा करता हूँ ताकि यह दोबारा न हो।', trait: 'Informer' }
    }
  },
  {
    id: 'b5',
    scenarioEn: 'What motivates you more at work?',
    scenarioHi: 'काम पर आपको क्या अधिक प्रेरित करता है?',
    options: {
      A: { textEn: 'Receiving praise from supervisors.', textHi: 'सुपरवाइजरों से प्रशंसा प्राप्त करना।', trait: 'Executor' },
      B: { textEn: 'Knowing that my work helps the team succeed.', textHi: 'यह जानना कि मेरा काम टीम को सफल होने में मदद करता है।', trait: 'Harmonizer' }
    }
  }
];

export const SJT_QUESTIONS: SJTQuestion[] = [
  {
    id: 's1',
    scenarioEn: 'Scenario 1: You notice your colleague using outdated tools, which might affect quality. What would you do?',
    scenarioHi: 'परिदृश्य 1: आप देखते हैं कि आपका सहकर्मी पुराने उपकरणों का उपयोग कर रहा है, जो गुणवत्ता को प्रभावित कर सकता है। आप क्या करेंगे?',
    options: {
      A: { textEn: 'Inform the supervisor immediately to avoid defects.', textHi: 'खामियों से बचने के लिए तुरंत सुपरवाइजर को सूचित करें।', alignment: 'High Initiative' },
      B: { textEn: 'Quietly give your own tools for the day and report later.', textHi: 'दिन भर के लिए चुपचाप अपने उपकरण दें और बाद में रिपोर्ट करें।', alignment: 'Balanced Adaptability' },
      C: { textEn: 'Wait and see if the quality actually suffers before acting.', textHi: 'कार्य करने से पहले प्रतीक्षा करें और देखें कि क्या गुणवत्ता वास्तव में खराब होती है।', alignment: 'Risk-Averse' },
      D: { textEn: 'Raise the issue in the next team meeting as a process improvement point.', textHi: 'अगली टीम मीटिंग में प्रक्रिया सुधार बिंदु के रूप में मुद्दा उठाएं।', alignment: 'Strategic' }
    }
  },
  {
    id: 's2',
    scenarioEn: 'Scenario 2: Your manager forgets to inform your team about a sudden schedule change. Half your team misses the shift.',
    scenarioHi: 'परिदृश्य 2: आपका मैनेजर अचानक शेड्यूल परिवर्तन के बारे में आपकी टीम को सूचित करना भूल जाता है। आपकी आधी टीम शिफ्ट में नहीं आती।',
    options: {
      A: { textEn: 'Tell the team individually about future alerts.', textHi: 'भविष्य के अलर्ट के बारे में टीम को व्यक्तिगत रूप से बताएं।', alignment: 'High Initiative' },
      B: { textEn: 'Raise it in the next feedback session with the manager.', textHi: 'मैनेजर के साथ अगले फीडबैक सत्र में इसे उठाएं।', alignment: 'Balanced Adaptability' },
      C: { textEn: 'Escalate to HR and demand accountability.', textHi: 'एचआर से संपर्क करें और जवाबदेही की मांग करें।', alignment: 'Risk-Averse' },
      D: { textEn: 'Remind the manager to create a WhatsApp group for timely updates.', textHi: 'मैनेजर को समय पर अपडेट के लिए व्हाट्सएप ग्रुप बनाने की याद दिलाएं।', alignment: 'Strategic' }
    }
  },
  {
    id: 's3',
    scenarioEn: 'Scenario 3: Your teammate is constantly late but performs well otherwise. Others start complaining.',
    scenarioHi: 'परिदृश्य 3: आपका साथी लगातार देर से आता है लेकिन अन्यथा अच्छा प्रदर्शन करता है। दूसरे शिकायत करने लगते हैं।',
    options: {
      A: { textEn: 'Talk to your teammate and understand their challenges.', textHi: 'अपने साथी से बात करें और उनकी चुनौतियों को समझें।', alignment: 'High Initiative' },
      B: { textEn: 'Support your teammate, assuming the manager will handle it.', textHi: 'अपने साथी का समर्थन करें, यह मानकर कि मैनेजर इसे संभाल लेगा।', alignment: 'Balanced Adaptability' },
      C: { textEn: 'Report it anonymously in the suggestion box.', textHi: 'सुझाव पेटी में गुमनाम रूप से इसकी रिपोर्ट करें।', alignment: 'Risk-Averse' },
      D: { textEn: 'Ask the manager to address it in a general team talk.', textHi: 'मैनेजर से इसे सामान्य टीम वार्ता में संबोधित करने के लिए कहें।', alignment: 'Strategic' }
    }
  },
  {
    id: 's4',
    scenarioEn: 'Scenario 4: There’s a new worker in your team who is quiet and doesn’t ask questions. They are falling behind.',
    scenarioHi: 'परिदृश्य 4: आपकी टीम में एक नया कार्यकर्ता है जो शांत है और सवाल नहीं पूछता। वे पिछड़ रहे हैं।',
    options: {
      A: { textEn: 'Assign a buddy to them without waiting for HR.', textHi: 'एचआर की प्रतीक्षा किए बिना उन्हें एक साथी (बडी) सौंपें।', alignment: 'High Initiative' },
      B: { textEn: 'Personally train them during breaks.', textHi: 'ब्रेक के दौरान उन्हें व्यक्तिगत रूप से प्रशिक्षित करें।', alignment: 'Balanced Adaptability' },
      C: { textEn: 'Let them adjust on their own—it’s part of learning.', textHi: 'उन्हें अपने आप तालमेल बिठाने दें—यह सीखने का हिस्सा है।', alignment: 'Risk-Averse' },
      D: { textEn: 'Inform the supervisor and ask for structured training.', textHi: 'सुपरवाइजर को सूचित करें और व्यवस्थित प्रशिक्षण के लिए कहें।', alignment: 'Strategic' }
    }
  },
  {
    id: 's5',
    scenarioEn: 'Scenario 5: Your team is not meeting output targets. The manager increases shift pressure.',
    scenarioHi: 'परिदृश्य 5: आपकी टीम उत्पादन लक्ष्यों को पूरा नहीं कर रही है। मैनेजर शिफ्ट का दबाव बढ़ाता है।',
    options: {
      A: { textEn: 'Suggest a feedback loop with the team to understand bottlenecks.', textHi: 'अवरोधों को समझने के लिए टीम के साथ फीडबैक लूप का सुझाव दें।', alignment: 'High Initiative' },
      B: { textEn: 'Ask for temporary workforce support.', textHi: 'अस्थायी कार्यबल सहायता के लिए कहें।', alignment: 'Balanced Adaptability' },
      C: { textEn: 'Accept the pressure—results matter most.', textHi: 'दबाव स्वीकार करें—परिणाम सबसे ज्यादा मायने रखते हैं।', alignment: 'Risk-Averse' },
      D: { textEn: 'Quietly improve your own productivity.', textHi: 'चुपचाप अपनी खुद की उत्पादकता में सुधार करें।', alignment: 'Strategic' }
    }
  }
];
