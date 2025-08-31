
'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import en from '@/locales/en.json';
import pa from '@/locales/pa.json';
import ta from '@/locales/ta.json';
import te from '@/locales/te.json';
import bn from '@/locales/bn.json';
import mr from '@/locales/mr.json';

const translations: Record<string, any> = {
  en,
  pa,
  ta,
  te,
  bn,
  mr,
};

type TranslationContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: { html: boolean }) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('en');
  const [loadedTranslations, setLoadedTranslations] = useState(translations.en);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    setLoadedTranslations(translations[language]);
  }, [language]);
  
  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    } else {
      console.warn(`Language '${lang}' not found. Falling back to English.`);
      setLanguageState('en');
      localStorage.setItem('language', 'en');
    }
  };


  const t = useCallback((key: string, options?: { html: boolean }) => {
    const keys = key.split('.');
    let result = loadedTranslations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if key not found in current language
        let enResult = translations.en;
        for (const enK of keys) {
          enResult = enResult?.[enK];
          if (enResult === undefined) {
            return key; // Return key if not found in English either
          }
        }
        return enResult;
      }
    }
    return result || key;
  }, [loadedTranslations, language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
