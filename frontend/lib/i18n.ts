export interface Translation {
  [key: string]: string | Translation;
}

export const translations: Record<string, Translation> = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      aptitudeTest: "Aptitude Test",
      careerMapping: "Career Mapping",
      colleges: "Colleges",
      careerGenie: "Career Genie",
      dashboard: "Dashboard",
      login: "Login",
      signup: "Sign Up"
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      submit: "Submit",
      next: "Next",
      previous: "Previous",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      search: "Search",
      filter: "Filter",
      clear: "Clear",
      apply: "Apply",
      close: "Close",
      back: "Back",
      continue: "Continue",
      finish: "Finish",
      start: "Start",
      retake: "Retake",
      share: "Share",
      download: "Download"
    },
    // Auth
    auth: {
      welcomeBack: "Welcome Back",
      createAccount: "Create Account",
      signInToContinue: "Sign in to continue your career journey",
      joinThousands: "Join thousands of students discovering their perfect career path",
      fullName: "Full Name",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      phone: "Phone Number",
      state: "State",
      city: "City",
      class: "Class",
      stream: "Stream",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      signUp: "Sign up",
      signIn: "Sign in",
      orContinueWith: "Or continue with",
      google: "Google",
      facebook: "Facebook"
    },
    // Classes
    classes: {
      tenth: "10th Grade",
      eleventh: "11th Grade", 
      twelfth: "12th Grade",
      graduation: "Graduation",
      postGraduation: "Post Graduation"
    },
    // Streams
    streams: {
      science: "Science",
      commerce: "Commerce",
      arts: "Arts",
      engineering: "Engineering",
      medical: "Medical",
      other: "Other"
    },
    // Quiz
    quiz: {
      aptitudeTest: "Aptitude & Interest Assessment",
      discoverStrengths: "Discover your strengths and find the perfect career path",
      timeRemaining: "Time Remaining",
      question: "Question",
      of: "of",
      complete: "Complete",
      selectAnswer: "Please select an answer before proceeding",
      testCompleted: "Test Completed!",
      personalizedRecommendations: "Your personalized career recommendations are ready",
      submitTest: "Submit Test",
      retakeTest: "Retake Test"
    },
    // Results
    results: {
      careerProfile: "Your Career Profile",
      primaryInterest: "Primary Interest",
      recommendedStream: "Recommended Stream",
      careerPath: "Career Path",
      recommendedCourses: "Recommended Courses",
      viewCareerMapping: "View Career Mapping",
      findColleges: "Find Colleges",
      topCareers: "Top Career Matches",
      successStories: "Success Stories",
      careerDetails: "Career Details",
      salaryRange: "Salary Range",
      jobGrowth: "Job Growth",
      requiredSkills: "Required Skills",
      educationPath: "Education Path"
    },
    // Colleges
    colleges: {
      governmentColleges: "Government Colleges Directory",
      discoverColleges: "Discover government colleges across India with detailed information about courses, admission criteria, facilities, and more.",
      searchColleges: "Search colleges by name or location...",
      foundColleges: "Found {count} colleges matching your criteria",
      viewDetails: "View Details",
      applyNow: "Apply Now",
      saveToFavorites: "Save to Favorites",
      collegeInformation: "College Information",
      established: "Established",
      totalStudents: "Total Students",
      annualFees: "Annual Fees",
      cutOffPercentage: "Cut-off Percentage",
      contactInformation: "Contact Information",
      availableCourses: "Available Courses",
      facilities: "Facilities",
      admissionScholarships: "Admission & Scholarships",
      admissionDates: "Admission Dates",
      availableScholarships: "Available Scholarships"
    },
    // Career Genie
    careerGenie: {
      title: "Career Genie",
      subtitle: "Your AI-powered career guidance assistant",
      askAnything: "Ask me anything about careers, colleges, or education...",
      quickQuestions: "Quick Questions",
      quickActions: "Quick Actions",
      proTips: "Pro Tips",
      beSpecific: "Be specific about your interests and goals",
      askAboutProspects: "Ask about career prospects and salary ranges",
      inquireAboutSkills: "Inquire about required skills and qualifications",
      getAdmissionInfo: "Get information about admission processes",
      askForAlternatives: "Ask for alternative career paths"
    },
    // Dashboard
    dashboard: {
      welcomeBack: "Welcome back, {name}!",
      careerMatchScore: "Career Match Score",
      yourProgress: "Your Progress",
      interestAreas: "Interest Areas",
      testsCompleted: "Tests Completed",
      collegesShortlisted: "Colleges Shortlisted",
      scholarshipsFound: "Scholarships Found",
      careerMatch: "Career Match",
      recommendedCareerPath: "Recommended Career Path",
      upcomingEvents: "Upcoming Events",
      skillsToDevelop: "Skills to Develop",
      recommendedColleges: "Recommended Colleges",
      notifications: "Notifications"
    }
  },
  hi: {
    // Navigation
    nav: {
      home: "होम",
      aptitudeTest: "योग्यता परीक्षा",
      careerMapping: "करियर मैपिंग",
      colleges: "कॉलेज",
      careerGenie: "करियर जिनी",
      dashboard: "डैशबोर्ड",
      login: "लॉगिन",
      signup: "साइन अप"
    },
    // Common
    common: {
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      submit: "जमा करें",
      next: "अगला",
      previous: "पिछला",
      cancel: "रद्द करें",
      save: "सहेजें",
      edit: "संपादित करें",
      delete: "हटाएं",
      view: "देखें",
      search: "खोजें",
      filter: "फिल्टर",
      clear: "साफ करें",
      apply: "लागू करें",
      close: "बंद करें",
      back: "वापस",
      continue: "जारी रखें",
      finish: "समाप्त करें",
      start: "शुरू करें",
      retake: "फिर से लें",
      share: "साझा करें",
      download: "डाउनलोड करें"
    },
    // Auth
    auth: {
      welcomeBack: "वापस स्वागत है",
      createAccount: "खाता बनाएं",
      signInToContinue: "अपनी करियर यात्रा जारी रखने के लिए साइन इन करें",
      joinThousands: "हजारों छात्रों के साथ जुड़ें जो अपना सही करियर पथ खोज रहे हैं",
      fullName: "पूरा नाम",
      email: "ईमेल पता",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      phone: "फोन नंबर",
      state: "राज्य",
      city: "शहर",
      class: "कक्षा",
      stream: "स्ट्रीम",
      rememberMe: "मुझे याद रखें",
      forgotPassword: "पासवर्ड भूल गए?",
      dontHaveAccount: "खाता नहीं है?",
      alreadyHaveAccount: "पहले से खाता है?",
      signUp: "साइन अप करें",
      signIn: "साइन इन करें",
      orContinueWith: "या इसके साथ जारी रखें",
      google: "गूगल",
      facebook: "फेसबुक"
    },
    // Classes
    classes: {
      tenth: "10वीं कक्षा",
      eleventh: "11वीं कक्षा",
      twelfth: "12वीं कक्षा",
      graduation: "स्नातक",
      postGraduation: "परास्नातक"
    },
    // Streams
    streams: {
      science: "विज्ञान",
      commerce: "वाणिज्य",
      arts: "कला",
      engineering: "इंजीनियरिंग",
      medical: "चिकित्सा",
      other: "अन्य"
    },
    // Quiz
    quiz: {
      aptitudeTest: "योग्यता और रुचि मूल्यांकन",
      discoverStrengths: "अपनी ताकत खोजें और सही करियर पथ खोजें",
      timeRemaining: "शेष समय",
      question: "प्रश्न",
      of: "का",
      complete: "पूर्ण",
      selectAnswer: "आगे बढ़ने से पहले कृपया एक उत्तर चुनें",
      testCompleted: "परीक्षा पूरी!",
      personalizedRecommendations: "आपके व्यक्तिगत करियर सुझाव तैयार हैं",
      submitTest: "परीक्षा जमा करें",
      retakeTest: "परीक्षा फिर से लें"
    },
    // Results
    results: {
      careerProfile: "आपका करियर प्रोफाइल",
      primaryInterest: "प्राथमिक रुचि",
      recommendedStream: "सुझाई गई स्ट्रीम",
      careerPath: "करियर पथ",
      recommendedCourses: "सुझाए गए पाठ्यक्रम",
      viewCareerMapping: "करियर मैपिंग देखें",
      findColleges: "कॉलेज खोजें",
      topCareers: "शीर्ष करियर मैच",
      successStories: "सफलता की कहानियां",
      careerDetails: "करियर विवरण",
      salaryRange: "वेतन सीमा",
      jobGrowth: "नौकरी वृद्धि",
      requiredSkills: "आवश्यक कौशल",
      educationPath: "शिक्षा पथ"
    },
    // Colleges
    colleges: {
      governmentColleges: "सरकारी कॉलेज निर्देशिका",
      discoverColleges: "पाठ्यक्रम, प्रवेश मानदंड, सुविधाओं और अधिक के बारे में विस्तृत जानकारी के साथ भारत भर के सरकारी कॉलेजों की खोज करें।",
      searchColleges: "नाम या स्थान से कॉलेज खोजें...",
      foundColleges: "आपके मानदंडों से मेल खाने वाले {count} कॉलेज मिले",
      viewDetails: "विवरण देखें",
      applyNow: "अभी आवेदन करें",
      saveToFavorites: "पसंदीदा में सहेजें",
      collegeInformation: "कॉलेज जानकारी",
      established: "स्थापित",
      totalStudents: "कुल छात्र",
      annualFees: "वार्षिक शुल्क",
      cutOffPercentage: "कट-ऑफ प्रतिशत",
      contactInformation: "संपर्क जानकारी",
      availableCourses: "उपलब्ध पाठ्यक्रम",
      facilities: "सुविधाएं",
      admissionScholarships: "प्रवेश और छात्रवृत्ति",
      admissionDates: "प्रवेश तिथियां",
      availableScholarships: "उपलब्ध छात्रवृत्ति"
    },
    // Career Genie
    careerGenie: {
      title: "करियर जिनी",
      subtitle: "आपका AI-संचालित करियर मार्गदर्शन सहायक",
      askAnything: "करियर, कॉलेज या शिक्षा के बारे में कुछ भी पूछें...",
      quickQuestions: "त्वरित प्रश्न",
      quickActions: "त्वरित कार्य",
      proTips: "प्रो टिप्स",
      beSpecific: "अपनी रुचियों और लक्ष्यों के बारे में विशिष्ट रहें",
      askAboutProspects: "करियर संभावनाओं और वेतन सीमा के बारे में पूछें",
      inquireAboutSkills: "आवश्यक कौशल और योग्यता के बारे में पूछताछ करें",
      getAdmissionInfo: "प्रवेश प्रक्रियाओं के बारे में जानकारी प्राप्त करें",
      askForAlternatives: "वैकल्पिक करियर पथ के लिए पूछें"
    },
    // Dashboard
    dashboard: {
      welcomeBack: "वापस स्वागत है, {name}!",
      careerMatchScore: "करियर मैच स्कोर",
      yourProgress: "आपकी प्रगति",
      interestAreas: "रुचि क्षेत्र",
      testsCompleted: "पूर्ण परीक्षाएं",
      collegesShortlisted: "शॉर्टलिस्ट कॉलेज",
      scholarshipsFound: "मिली छात्रवृत्ति",
      careerMatch: "करियर मैच",
      recommendedCareerPath: "सुझाया गया करियर पथ",
      upcomingEvents: "आगामी घटनाएं",
      skillsToDevelop: "विकसित करने योग्य कौशल",
      recommendedColleges: "सुझाए गए कॉलेज",
      notifications: "सूचनाएं"
    }
  },
  ta: {
    // Navigation
    nav: {
      home: "முகப்பு",
      aptitudeTest: "திறன் சோதனை",
      careerMapping: "வேலைவாய்ப்பு வரைபடம்",
      colleges: "கல்லூரிகள்",
      careerGenie: "வேலைவாய்ப்பு ஜினி",
      dashboard: "டாஷ்போர்டு",
      login: "உள்நுழைவு",
      signup: "பதிவு"
    },
    // Common
    common: {
      loading: "ஏற்றுகிறது...",
      error: "பிழை",
      success: "வெற்றி",
      submit: "சமர்ப்பி",
      next: "அடுத்து",
      previous: "முந்தைய",
      cancel: "ரத்து",
      save: "சேமி",
      edit: "திருத்து",
      delete: "நீக்கு",
      view: "பார்",
      search: "தேடு",
      filter: "வடிகட்டி",
      clear: "அழி",
      apply: "பயன்படுத்து",
      close: "மூடு",
      back: "திரும்பு",
      continue: "தொடர்",
      finish: "முடி",
      start: "தொடங்கு",
      retake: "மீண்டும் எடு",
      share: "பகிர்",
      download: "பதிவிறக்கு"
    },
    // Auth
    auth: {
      welcomeBack: "மீண்டும் வரவேற்கிறோம்",
      createAccount: "கணக்கு உருவாக்கு",
      signInToContinue: "உங்கள் வேலைவாய்ப்பு பயணத்தைத் தொடர உள்நுழையவும்",
      joinThousands: "ஆயிரக்கணக்கான மாணவர்களுடன் இணைந்து உங்கள் சரியான வேலைவாய்ப்பு பாதையைக் கண்டறியுங்கள்",
      fullName: "முழு பெயர்",
      email: "மின்னஞ்சல் முகவரி",
      password: "கடவுச்சொல்",
      confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்து",
      phone: "தொலைபேசி எண்",
      state: "மாநிலம்",
      city: "நகரம்",
      class: "வகுப்பு",
      stream: "பிரிவு",
      rememberMe: "என்னை நினைவில் வைத்துக்கொள்",
      forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
      dontHaveAccount: "கணக்கு இல்லையா?",
      alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
      signUp: "பதிவு செய்",
      signIn: "உள்நுழை",
      orContinueWith: "அல்லது இதனுடன் தொடரவும்",
      google: "கூகிள்",
      facebook: "பேஸ்புக்"
    },
    // Classes
    classes: {
      tenth: "10வது வகுப்பு",
      eleventh: "11வது வகுப்பு",
      twelfth: "12வது வகுப்பு",
      graduation: "பட்டப்படிப்பு",
      postGraduation: "முதுகலை"
    },
    // Streams
    streams: {
      science: "அறிவியல்",
      commerce: "வணிகம்",
      arts: "கலை",
      engineering: "பொறியியல்",
      medical: "மருத்துவம்",
      other: "மற்றவை"
    },
    // Quiz
    quiz: {
      aptitudeTest: "திறன் மற்றும் ஆர்வ மதிப்பீடு",
      discoverStrengths: "உங்கள் பலங்களைக் கண்டறிந்து சரியான வேலைவாய்ப்பு பாதையைக் கண்டறியுங்கள்",
      timeRemaining: "மீதமுள்ள நேரம்",
      question: "கேள்வி",
      of: "இல்",
      complete: "முழுமை",
      selectAnswer: "தொடர்வதற்கு முன் தயவுசெய்து ஒரு பதிலைத் தேர்ந்தெடுக்கவும்",
      testCompleted: "சோதனை முடிந்தது!",
      personalizedRecommendations: "உங்கள் தனிப்பட்ட வேலைவாய்ப்பு பரிந்துரைகள் தயாராக உள்ளன",
      submitTest: "சோதனையை சமர்ப்பி",
      retakeTest: "சோதனையை மீண்டும் எடு"
    },
    // Results
    results: {
      careerProfile: "உங்கள் வேலைவாய்ப்பு சுயவிவரம்",
      primaryInterest: "முதன்மை ஆர்வம்",
      recommendedStream: "பரிந்துரைக்கப்பட்ட பிரிவு",
      careerPath: "வேலைவாய்ப்பு பாதை",
      recommendedCourses: "பரிந்துரைக்கப்பட்ட படிப்புகள்",
      viewCareerMapping: "வேலைவாய்ப்பு வரைபடத்தைப் பார்",
      findColleges: "கல்லூரிகளைக் கண்டறி",
      topCareers: "சிறந்த வேலைவாய்ப்பு பொருத்தங்கள்",
      successStories: "வெற்றிக் கதைகள்",
      careerDetails: "வேலைவாய்ப்பு விவரங்கள்",
      salaryRange: "சம்பள வரம்பு",
      jobGrowth: "வேலை வளர்ச்சி",
      requiredSkills: "தேவையான திறன்கள்",
      educationPath: "கல்வி பாதை"
    },
    // Colleges
    colleges: {
      governmentColleges: "அரசு கல்லூரி களஞ்சியம்",
      discoverColleges: "படிப்புகள், சேர்க்கை விதிமுறைகள், வசதிகள் மற்றும் பலவற்றைப் பற்றிய விரிவான தகவல்களுடன் இந்தியா முழுவதும் உள்ள அரசு கல்லூரிகளைக் கண்டறியுங்கள்.",
      searchColleges: "பெயர் அல்லது இடம் மூலம் கல்லூரிகளைத் தேடுங்கள்...",
      foundColleges: "உங்கள் விதிமுறைகளுடன் பொருந்தும் {count} கல்லூரிகள் கிடைத்தன",
      viewDetails: "விவரங்களைப் பார்",
      applyNow: "இப்போது விண்ணப்பிக்கவும்",
      saveToFavorites: "பிடித்தவற்றில் சேமி",
      collegeInformation: "கல்லூரி தகவல்",
      established: "நிறுவப்பட்டது",
      totalStudents: "மொத்த மாணவர்கள்",
      annualFees: "ஆண்டு கட்டணம்",
      cutOffPercentage: "வெட்டு சதவீதம்",
      contactInformation: "தொடர்பு தகவல்",
      availableCourses: "கிடைக்கும் படிப்புகள்",
      facilities: "வசதிகள்",
      admissionScholarships: "சேர்க்கை மற்றும் உதவித்தொகை",
      admissionDates: "சேர்க்கை தேதிகள்",
      availableScholarships: "கிடைக்கும் உதவித்தொகைகள்"
    },
    // Career Genie
    careerGenie: {
      title: "வேலைவாய்ப்பு ஜினி",
      subtitle: "உங்கள் AI-இயக்கப்பட்ட வேலைவாய்ப்பு வழிகாட்டி உதவி",
      askAnything: "வேலைவாய்ப்பு, கல்லூரிகள் அல்லது கல்வி பற்றி எதையும் கேளுங்கள்...",
      quickQuestions: "விரைவு கேள்விகள்",
      quickActions: "விரைவு செயல்கள்",
      proTips: "நிபுணர் குறிப்புகள்",
      beSpecific: "உங்கள் ஆர்வங்கள் மற்றும் இலக்குகளைப் பற்றி குறிப்பிட்டு இருங்கள்",
      askAboutProspects: "வேலைவாய்ப்பு வாய்ப்புகள் மற்றும் சம்பள வரம்புகளைப் பற்றி கேளுங்கள்",
      inquireAboutSkills: "தேவையான திறன்கள் மற்றும் தகுதிகளைப் பற்றி விசாரியுங்கள்",
      getAdmissionInfo: "சேர்க்கை செயல்முறைகள் பற்றிய தகவலைப் பெறுங்கள்",
      askForAlternatives: "மாற்று வேலைவாய்ப்பு பாதைகளைக் கேளுங்கள்"
    },
    // Dashboard
    dashboard: {
      welcomeBack: "மீண்டும் வரவேற்கிறோம், {name}!",
      careerMatchScore: "வேலைவாய்ப்பு பொருத்த மதிப்பெண்",
      yourProgress: "உங்கள் முன்னேற்றம்",
      interestAreas: "ஆர்வ பகுதிகள்",
      testsCompleted: "முடிந்த சோதனைகள்",
      collegesShortlisted: "குறுகிய பட்டியலில் உள்ள கல்லூரிகள்",
      scholarshipsFound: "கிடைத்த உதவித்தொகைகள்",
      careerMatch: "வேலைவாய்ப்பு பொருத்தம்",
      recommendedCareerPath: "பரிந்துரைக்கப்பட்ட வேலைவாய்ப்பு பாதை",
      upcomingEvents: "வரவிருக்கும் நிகழ்வுகள்",
      skillsToDevelop: "வளர்த்துக்கொள்ள வேண்டிய திறன்கள்",
      recommendedColleges: "பரிந்துரைக்கப்பட்ட கல்லூரிகள்",
      notifications: "அறிவிப்புகள்"
    }
  }
};

export const getTranslation = (key: string, language: string = 'en'): string => {
  const keys = key.split('.');
  let translation: any = translations[language] || translations['en'];
  
  for (const k of keys) {
    if (translation && typeof translation === 'object' && k in translation) {
      translation = translation[k];
    } else {
      // Fallback to English
      translation = translations['en'];
      for (const fallbackKey of keys) {
        if (translation && typeof translation === 'object' && fallbackKey in translation) {
          translation = translation[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  return typeof translation === 'string' ? translation : key;
};

export const formatTranslation = (key: string, params: Record<string, string>, language: string = 'en'): string => {
  let translation = getTranslation(key, language);
  
  Object.entries(params).forEach(([param, value]) => {
    translation = translation.replace(`{${param}}`, value);
  });
  
  return translation;
};
