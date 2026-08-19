import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageInfo } from './types';
import { pt } from './locales/pt';
import { en } from './locales/en';
import { es } from './locales/es';

const LOCAL_STORAGE_KEY = 'sublim_studio_lang';

const translations: Record<SupportedLanguage, any> = {
  pt,
  en,
  es,
};

interface LanguageContextType {
  language: SupportedLanguage;
  currentLanguageInfo: LanguageInfo;
  availableLanguages: LanguageInfo[];
  setLanguage: (lang: SupportedLanguage) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'pt';

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as SupportedLanguage;
    if (saved && (saved === 'pt' || saved === 'en' || saved === 'es')) {
      return saved;
    }

    const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (browserLang.startsWith('en')) {
      return 'en';
    }
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    if (browserLang.startsWith('pt')) {
      return 'pt';
    }
  } catch (e) {
    console.warn('Could not read saved language from localStorage', e);
  }

  return 'pt';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectInitialLanguage);

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang === 'pt' ? 'pt-BR' : newLang === 'es' ? 'es' : 'en';
    } catch (e) {
      console.warn('Could not persist language to localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en';
    } catch {
      // ignore in non-browser envs
    }
  }, [language]);

  const currentLanguageInfo = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  const t = useCallback(
    (path: string, params?: Record<string, string | number>): string => {
      const keys = path.split('.');
      
      // Helper to traverse object
      const getNested = (obj: any, keyPath: string[]): any => {
        let current = obj;
        for (const k of keyPath) {
          if (!current || typeof current !== 'object') return undefined;
          current = current[k];
        }
        return current;
      };

      // Try current language
      let result = getNested(translations[language], keys);

      // Fallback to Portuguese if missing
      if (result === undefined && language !== 'pt') {
        result = getNested(translations.pt, keys);
      }

      // If still missing, return the last key segment or full path
      if (result === undefined) {
        return keys[keys.length - 1] || path;
      }

      if (typeof result !== 'string') {
        return path;
      }

      // Interpolate parameters {name}, {count}, {percent}, etc.
      if (params) {
        return Object.entries(params).reduce((acc, [key, val]) => {
          return acc.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
        }, result);
      }

      return result;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      currentLanguageInfo,
      availableLanguages: SUPPORTED_LANGUAGES,
      setLanguage,
      t,
    }),
    [language, currentLanguageInfo, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

export const useI18n = useTranslation;
