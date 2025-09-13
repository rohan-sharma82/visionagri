
'use client';
import { createContext, useState, useEffect, useCallback, ReactNode, useContext } from 'react';
import en from '@/locales/en.json';
import pa from '@/locales/pa.json';
import ta from '@/locales/ta.json';
import te from '@/locales/te.json';
import bn from '@/locales/bn.json';
import mr from '@/locales/mr.json';
import hi from '@/locales/hi.json';

const translations: Record<string, any> = {
  en,
  pa,
  ta,
  te,
  bn,
  mr,
  hi,
};

type AppContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  location: string | null;
  setLocation: (location: string | null) => void;
  isLocationDialogOpen: boolean;
  setLocationDialogOpen: (isOpen: boolean) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('en');
  const [location, setLocationState] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLocationDialogOpen, setLocationDialogOpen] = useState(false);


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
    const savedLocation = sessionStorage.getItem('user-location');
    if (savedLocation) {
        setLocationState(savedLocation);
        setLocationDialogOpen(false);
    } else {
        setLocationDialogOpen(true);
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
        sessionStorage.setItem('user-location', loc);
    } else {
        sessionStorage.removeItem('user-location');
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

  const value = {
    language,
    setLanguage,
    t,
    location,
    setLocation,
    isLocationDialogOpen,
    setLocationDialogOpen,
  };

  return (
    <AppContext.Provider value={value}>
      {isMounted ? children : null}
    </AppContext.Provider>
  );
};


export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
