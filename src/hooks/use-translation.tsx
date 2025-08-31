
'use client';
import { useContext } from 'react';
import { AppContext } from '@/hooks/use-app-provider';

export const useTranslation = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an AppProvider');
  }
  return {
    t: context.t,
    setLanguage: context.setLanguage,
    language: context.language,
  };
};

export const useLocation = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useLocation must be used within an AppProvider');
    }
    return {
      location: context.location,
      setLocation: context.setLocation,
    };
  };
