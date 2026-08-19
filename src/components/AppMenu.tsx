import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu as MenuIcon,
  FolderPlus,
  FolderOpen,
  ImagePlus,
  Eye,
  Save,
  Settings,
  Download,
  Smartphone,
  HelpCircle,
  Info,
  Sun,
  Moon,
  Printer,
  Sparkles,
  Type,
  Clipboard,
  Grid,
  Sliders,
  Layers,
  Box,
  Share2,
} from 'lucide-react';
import { useTranslation, LanguageSelector } from '../i18n';

interface AppMenuProps {
  theme?: 'light' | 'dark' | string;
  onExport: () => void;
  onOpenPrintModal?: () => void;
  onOpenMug3In1?: () => void;
  onNewProject?: () => void;
  onOpenProject?: () => void;
  onIncludeStamp?: () => void;
  onViewImage?: () => void;
  onPasteFromClipboard?: () => void;
  onSaveLayout?: () => void;
  onOpenSettings?: () => void;
  onOpenPrinterSettings?: () => void;
  onOpenAndroidModal?: () => void;
  onOpenPresetGallery?: () => void;
  onOpenProductLibrary?: () => void;
  onOpenHelp?: () => void;
  onOpenAbout?: () => void;
  onToggleTheme?: () => void;
  onOpenWordArt2?: () => void;
  onOpenAISettings?: () => void;
  onOpenCanva?: () => void;
}

export function AppMenu({
  theme = 'dark',
  onExport,
  onOpenPrintModal,
  onOpenMug3In1,
  onNewProject,
  onOpenProject,
  onIncludeStamp,
  onViewImage,
  onPasteFromClipboard,
  onSaveLayout,
  onOpenSettings,
  onOpenPrinterSettings,
  onOpenAndroidModal,
  onOpenPresetGallery,
  onOpenProductLibrary,
  onOpenHelp,
  onOpenAbout,
  onToggleTheme,
  onOpenWordArt2,
  onOpenAISettings,
  onOpenCanva,
}: AppMenuProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 52, left: 16 });

  const updatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 296;
      const left = Math.max(8, Math.min(rect.left, window.innerWidth - menuWidth - 12));
      const top = Math.min(rect.bottom + 6, window.innerHeight - 200);
      setCoords({
        top: Math.max(48, Math.round(top)),
        left: Math.round(left),
      });
    }
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updatePosition();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    // Immediate position update upon open
    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, updatePosition]);

  const isLight = theme === 'light';

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        id="btn-menu-arquivo"
        onClick={handleToggle}
        className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-black text-xs cursor-pointer shadow-xs active:scale-95 select-none ${
          isOpen
            ? 'bg-purple-600 border-purple-500 text-white shadow-purple-600/30 ring-2 ring-purple-400/40'
            : isLight
            ? 'bg-slate-100 border-slate-300 hover:bg-purple-50 hover:border-purple-300 text-slate-800'
            : 'bg-[#181920] border-[#2b2c36] hover:bg-[#22232e] hover:border-purple-500/50 text-gray-200'
        }`}
        title={t('topbar.menu')}
      >
        <MenuIcon className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-purple-400'} shrink-0`} />
        <span>{t('topbar.menu')}</span>
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropdownRef}
          id="dropdown-menu-arquivo"
          style={{
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            zIndex: 999999,
          }}
          className={`w-74 rounded-2xl shadow-2xl border overflow-y-auto max-h-[calc(100vh-4.5rem)] animate-in fade-in zoom-in-95 duration-150 select-none ${
            isLight
              ? 'bg-white/98 border-slate-200 text-slate-800 shadow-slate-400/50 backdrop-blur-xl'
              : 'bg-[#14151e]/98 border-[#2d2f40] text-gray-200 shadow-black/95 backdrop-blur-xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col py-1.5 divide-y divide-slate-100 dark:divide-[#262836]">
            {/* Quick Language Switcher Inside Menu */}
            <div className="pb-1">
              <LanguageSelector variant="menu-item" theme={theme} onSelect={() => setIsOpen(false)} />
            </div>

            {/* SEÇÃO 1: ARQUIVO & PROJETO */}
            <div className="py-1">
              <div className="px-3 pt-1.5 pb-1 text-[10px] font-black uppercase tracking-wider text-purple-400 flex items-center justify-between">
                <span>{t('menu.file') || 'Arquivo & Projeto'}</span>
              </div>

              {/* Novo Projeto */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNewProject?.();
                }}
                className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                  isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderPlus className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{t('menu.newProject')}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-black/10 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  Ctrl+N
                </span>
              </button>

              {/* Abrir Projeto */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenProject?.();
                }}
                className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                  isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderOpen className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{t('menu.openProject')}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-black/10 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  Ctrl+O
                </span>
              </button>

              {/* Incluir Estampa */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onIncludeStamp?.();
                }}
                className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                  isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ImagePlus className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('menu.includeStamp')}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-black/10 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  Upload
                </span>
              </button>

              {/* Ver Imagem / Visualizador HD */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onViewImage?.();
                }}
                className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                  isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Eye className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{t('menu.viewImage')}</span>
                </div>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                  HD
                </span>
              </button>

              {/* Colar Imagem da Área de Transferência */}
              {onPasteFromClipboard && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onPasteFromClipboard();
                  }}
                  className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clipboard className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{t('menu.pasteClipboard')}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-black/10 dark:bg-white/5 px-1.5 py-0.5 rounded">
                    Ctrl+V
                  </span>
                </button>
              )}

              {/* Salvar Projeto */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onSaveLayout?.();
                }}
                className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                  isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Save className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t('menu.saveLayout')}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-black/10 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  Ctrl+S
                </span>
              </button>

              {/* Exportar Imagem / Arte */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onExport();
                }}
                className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                  isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{t('menu.exportImage')}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-black/10 dark:bg-white/5 px-1.5 py-0.5 rounded">
                  Ctrl+E
                </span>
              </button>
            </div>

            {/* SEÇÃO 2: CRIAÇÃO & DESIGN */}
            <div className="py-1">
              <div className="px-3 pt-1.5 pb-1 text-[10px] font-black uppercase tracking-wider text-purple-400">
                <span>Criação & Ferramentas</span>
              </div>

              {/* Canva Hub */}
              {onOpenCanva && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCanva();
                  }}
                  className="flex items-center justify-between px-3.5 py-2 mx-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 via-cyan-500/15 to-purple-500/20 hover:from-teal-500/30 hover:to-purple-500/30 text-teal-300 transition-all text-xs font-bold text-left cursor-pointer border border-teal-500/30 my-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white font-black text-xs italic flex items-center justify-center shadow-xs">
                      C
                    </div>
                    <span className="text-teal-200 font-extrabold">{t('menu.canvaConnect')}</span>
                  </div>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#00c4cc]/30 text-cyan-200 border border-[#00c4cc]/40">
                    HUB
                  </span>
                </button>
              )}

              {/* Galeria de Modelos */}
              {onOpenPresetGallery && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPresetGallery();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t('menu.presetGalleryOption')}</span>
                </button>
              )}

              {/* WordArt Studio Pro */}
              {onOpenWordArt2 && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenWordArt2();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <Type className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>{t('menu.wordartPro')}</span>
                </button>
              )}

              {/* Trocar Produto / Gabarito */}
              {onOpenProductLibrary && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenProductLibrary();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <Box className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{t('menu.changeProduct') || 'Trocar Produto / Gabarito'}</span>
                </button>
              )}
            </div>

            {/* SEÇÃO 3: IMPRESSÃO SUBLIMÁTICA RIP */}
            <div className="py-1">
              <div className="px-3 pt-1.5 pb-1 text-[10px] font-black uppercase tracking-wider text-emerald-400">
                <span>Impressão Sublimática RIP</span>
              </div>

              {/* Central de Impressão */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenPrintModal) {
                    onOpenPrintModal();
                  } else if (onOpenPrinterSettings) {
                    onOpenPrinterSettings();
                  }
                }}
                className="flex items-center justify-between px-3.5 py-2 mx-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 transition-all text-xs font-extrabold text-left cursor-pointer border border-emerald-500/35 my-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <Printer className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-emerald-200 font-extrabold">{t('print.title')}</span>
                    <span className="text-[9px] text-emerald-300/80 font-normal">
                      RIP 1200 DPI • ICC • Spooler
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-200 font-mono border border-emerald-500/30">
                  Ctrl+P
                </span>
              </button>

              {/* Folha 3 em 1 (Canecas) */}
              {onOpenMug3In1 && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenMug3In1();
                  }}
                  className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-emerald-50 text-slate-700' : 'hover:bg-emerald-600/20 text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Grid className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t('mug3in1.title')} (Folha 3 em 1)</span>
                  </div>
                  <span className="text-[10px] px-1 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-mono">
                    A4
                  </span>
                </button>
              )}
            </div>

            {/* SEÇÃO 4: CONFIGURAÇÕES & SISTEMA */}
            <div className="py-1">
              <div className="px-3 pt-1.5 pb-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <span>Sistema & Preferências</span>
              </div>

              {onOpenPrinterSettings && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenPrinterSettings();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{t('menu.printerSettings')}</span>
                </button>
              )}

              {onOpenAISettings && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAISettings();
                  }}
                  className={`flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{t('menu.aiSettings')}</span>
                  </div>
                  <span className="text-[9px] bg-purple-500/20 px-1 py-0.2 rounded text-purple-300 font-mono">
                    IA
                  </span>
                </button>
              )}

              {onOpenAndroidModal && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAndroidModal();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('menu.androidInstall')}</span>
                </button>
              )}

              {onToggleTheme && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onToggleTheme();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  {isLight ? (
                    <>
                      <Moon className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{t('topbar.themeDark')}</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{t('topbar.themeLight')}</span>
                    </>
                  )}
                </button>
              )}

              {onOpenHelp && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenHelp();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t('help.title')}</span>
                </button>
              )}

              {onOpenAbout && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAbout();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <Info className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{t('about.title')}</span>
                </button>
              )}

              {onOpenSettings && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenSettings();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer w-full text-left ${
                    isLight ? 'hover:bg-purple-50 text-slate-700' : 'hover:bg-purple-600/20 text-gray-200'
                  }`}
                >
                  <Settings className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{t('settings.title')}</span>
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
