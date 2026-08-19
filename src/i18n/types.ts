export type SupportedLanguage = 'pt' | 'en' | 'es';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'pt',
    name: 'Português (Brasil)',
    nativeName: 'Português (Brasil)',
    flag: '🇧🇷',
    locale: 'pt-BR',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    locale: 'en-US',
  },
  {
    code: 'es',
    name: 'Español',
    nativeName: 'Español',
    flag: '🇪🇸',
    locale: 'es-ES',
  },
];

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}
