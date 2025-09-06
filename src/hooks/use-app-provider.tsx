
'use client';
import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
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

type AppContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  location: string | null;
  setLocation: (location: string | null) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('en');
  const [location, setLocationState] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only once on the client when the component mounts.
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
    const savedLocation = localStorage.getItem('user-location');
    if (savedLocation) {
        setLocationState(savedLocation);
    } else {
        // If no location is saved, you might want to set a default or leave it null
        // For now, we'll leave it null until the dialog is handled.
    }
    setIsMounted(true);
  }, []);

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

  const setLocation = (loc: string | null) => {
    setLocationState(loc);
    if (loc) {
        localStorage.setItem('user-location', loc);
    } else {
        localStorage.removeItem('user-location');
    }
  }

  const t = useCallback((key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if key not found
        let enResult = translations.en;
        for (const enK of keys) {
          enResult = enResult?.[enK];
          if (enResult === undefined) {
            return key; // Return key if not found in English either
          }
        }
        result = enResult;
        break; // Found in English, stop searching
      }
    }
    
    let translatedString = result || key;

    // Handle replacements for dynamic values like {name}
    if (options && typeof translatedString === 'string') {
        Object.keys(options).forEach(optionKey => {
            translatedString = translatedString.replace(`{${optionKey}}`, String(options[optionKey]));
        });
    }

    return translatedString;
  }, [language]);

  return (
    <AppContext.Provider value={{ language, setLanguage, t, location, setLocation }}>
      {isMounted ? children : null}
    </AppContext.Provider>
  );
};
