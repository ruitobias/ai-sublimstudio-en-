import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeChoice = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  choice: ThemeChoice;
  setChoice: (c: ThemeChoice) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'sublimstudio_theme_choice';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyThemeToDOM(theme: 'light' | 'dark') {
  try {
    document.documentElement.setAttribute('data-theme', theme);
    // Add a short transition class for smoother change
    document.documentElement.classList.add('theme-transition');
    window.setTimeout(() => document.documentElement.classList.remove('theme-transition'), 300);
  } catch (e) {
    // swallow
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [choice, setChoiceState] = useState<ThemeChoice>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved as ThemeChoice;
    } catch (e) {}
    return 'system';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (choice === 'system') return getSystemTheme();
    return choice === 'light' ? 'light' : 'dark';
  });

  // keep theme derived from choice
  useEffect(() => {
    let activeTheme: 'light' | 'dark' = 'dark';
    if (choice === 'system') activeTheme = getSystemTheme();
    else activeTheme = choice === 'light' ? 'light' : 'dark';
    setTheme(activeTheme);
    applyThemeToDOM(activeTheme);
  }, [choice]);

  // Listen to system preference changes when choice === 'system'
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (choice !== 'system') return;
      const newTheme = mq.matches ? 'dark' : 'light';
      setTheme(newTheme);
      applyThemeToDOM(newTheme);
    };
    try {
      mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler);
    } catch (e) {}
    return () => {
      try {
        mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler);
      } catch (e) {}
    };
  }, [choice]);

  // Persist choice and sync across tabs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch (e) {}
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      if (!e.newValue) return;
      if (e.newValue === 'light' || e.newValue === 'dark' || e.newValue === 'system') {
        setChoiceState(e.newValue as ThemeChoice);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [choice]);

  const setChoice = (c: ThemeChoice) => {
    setChoiceState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch (e) {}
  };

  const toggle = () => {
    if (choice === 'light') setChoice('dark');
    else if (choice === 'dark') setChoice('system');
    else setChoice('light');
  };

  return (
    <ThemeContext.Provider value={{ theme, choice, setChoice, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
