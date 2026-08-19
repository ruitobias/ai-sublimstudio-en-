import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from './LanguageContext';
import { SupportedLanguage } from './types';

interface LanguageSelectorProps {
  variant?: 'compact' | 'dropdown' | 'inline' | 'menu-item';
  theme?: 'light' | 'dark' | string;
  onSelect?: () => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'compact',
  theme = 'dark',
  onSelect,
  className = '',
}) => {
  const { language, setLanguage, availableLanguages, currentLanguageInfo, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 48, left: 0 });

  const updatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 176;
      const left = Math.max(8, Math.min(rect.right - dropdownWidth, window.innerWidth - dropdownWidth - 8));
      setCoords({
        top: rect.bottom + 6,
        left,
      });
    }
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      updatePosition();
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, updatePosition]);

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
    if (onSelect) onSelect();
  };

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {availableLanguages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-600/30'
                  : theme === 'light'
                  ? 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-700'
                  : 'bg-[#1c1d27] border-[#2e3040] hover:bg-[#252636] text-gray-300'
              }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span>{lang.nativeName}</span>
              {isSelected && <Check className="w-3.5 h-3.5 ml-1 text-white" />}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'menu-item') {
    return (
      <div className={`px-2.5 py-2 border-t border-b my-1 ${
        theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-[#2d2f3e] bg-[#12131b]'
      } ${className}`}>
        <div className="flex items-center gap-2 px-1 py-0.5 text-[10px] font-black uppercase tracking-wider text-purple-400">
          <Globe className="w-3 h-3" />
          <span>{t('common.language')}</span>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-1.5">
          {availableLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 border-purple-500 text-white shadow-xs'
                    : theme === 'light'
                    ? 'bg-white border-slate-200 hover:bg-purple-50 text-slate-700'
                    : 'bg-[#181924] border-[#2b2d3d] hover:bg-[#212332] text-gray-300'
                }`}
                title={lang.name}
              >
                <span className="text-sm leading-none mb-0.5">{lang.flag}</span>
                <span className="truncate max-w-full text-[10px]">
                  {lang.code === 'pt' ? 'PT-BR' : lang.code === 'en' ? 'EN' : 'ES'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default compact dropdown (for TopBar and toolbars)
  return (
    <div className={`relative shrink-0 ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
          theme === 'light'
            ? 'bg-slate-100 hover:bg-purple-50 border-slate-300 hover:border-purple-300 text-slate-800'
            : 'bg-[#181922] hover:bg-[#212330] border-[#2b2c3a] hover:border-purple-500/50 text-gray-200'
        }`}
        title={`${t('common.language')}: ${currentLanguageInfo.name}`}
      >
        <span className="text-sm leading-none">{currentLanguageInfo.flag}</span>
        <span className="font-extrabold uppercase tracking-wide text-[11px] hidden sm:inline">
          {language === 'pt' ? 'PT-BR' : language === 'en' ? 'EN' : 'ES'}
        </span>
        <ChevronDown className={`w-3 h-3 text-purple-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          className={`fixed w-44 rounded-2xl shadow-2xl border py-1.5 z-[9999] animate-fade-in ${
            theme === 'light'
              ? 'bg-white/98 border-slate-200 text-slate-800 shadow-slate-400/40 backdrop-blur-xl'
              : 'bg-[#161722]/98 border-[#2d2f40] text-gray-200 shadow-black/90 backdrop-blur-xl'
          }`}
        >
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-purple-400 border-b border-gray-500/10 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3" />
            {t('common.selectLanguage')}
          </div>
          {availableLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-purple-600/20 text-purple-400 font-bold'
                    : theme === 'light'
                    ? 'hover:bg-purple-50 text-slate-700'
                    : 'hover:bg-[#212332] text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-purple-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
