import  {  useState  } from "react";
import { LangContext } from './LanguageContext';
import en from "../../locales/en.json";
import ar from "../../locales/ar.json";

import { useEffect } from "react";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const [translations, setTranslations] = useState(language === "en" ? en : ar);
//   const toggleLanguage = (lang) => setLanguage(lang);

  useEffect(()=>{
     setTranslations(language === "en" ? en : ar);
    localStorage.setItem("lang", language);
  },[language])
  const t = (key) => translations[key] || key;
  return (
    <LangContext.Provider value={{ language, setLanguage,t }}>
      {children}
    </LangContext.Provider>
  );
};


