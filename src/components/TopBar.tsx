import React, { useState, useEffect } from 'react';
import { logoSublimStudioSvg, logoSublimStudioPng, faviconPng } from '../assets/logos';
import {
  Sparkles,
  RotateCcw,
  RotateCw,
  CheckCircle2,
  Share2,
  Box,
  Columns,
  Square,
  ChevronDown,
  FlipHorizontal,
  Sun,
  Moon,
  Printer,
  LogIn,
  LogOut,
  Edit3,
} from 'lucide-react';
import { SublimationProduct, WorkspaceViewMode } from '../types';
import { AppMenu } from './AppMenu';
import { ProductIcon } from './ProductIcon';
import { useTranslation } from '../i18n';

export interface TopBarProps {
  currentProduct?: SublimationProduct;
  onOpenProductLibrary: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onOpenExportModal: () => void;
  onOpenPrintModal?: () => void;
  onOpenMug3In1?: () => void;
  onOpenAIPanel?: () => void;
  onOpenWordArtModal?: () => void;
  onOpenWordArt2?: () => void;
  onOpenPresetGallery?: () => void;
  onOpenAndroidModal?: () => void;
  onOpenHelp?: () => void;
  onOpenAbout?: () => void;
  mirrorSublimation: boolean;
  onToggleMirrorSublimation: () => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  showRulers?: boolean;
  onToggleRulers?: () => void;
  zoomLevel?: number;
  onZoomChange?: (zoom: number) => void;
  workspaceViewMode: WorkspaceViewMode;
  onChangeWorkspaceViewMode: (mode: WorkspaceViewMode) => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onNewProject?: () => void;
  onOpenProject?: () => void;
  onIncludeStamp?: () => void;
  onViewImage?: () => void;
  onSaveLayout?: () => void;
  onOpenSettings?: () => void;
  onOpenPrinterSettings?: () => void;
  onOpenAISettings?: () => void;
  onOpenCanva?: () => void;
  onPasteFromClipboard?: () => void;
  projectName?: string;
  onChangeProjectName?: (name: string) => void;
  currentUser?: { name: string; email: string; isPro?: boolean } | null;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentProduct,
  onOpenProductLibrary,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onOpenExportModal,
  onOpenPrintModal,
  onOpenMug3In1,
  onOpenPresetGallery,
  onOpenAndroidModal,
  onOpenHelp,
  onOpenAbout,
  mirrorSublimation,
  onToggleMirrorSublimation,
  workspaceViewMode,
  onChangeWorkspaceViewMode,
  theme = 'dark',
  onToggleTheme,
  onNewProject,
  onOpenProject,
  onIncludeStamp,
  onViewImage,
  onSaveLayout,
  onOpenSettings,
  onOpenPrinterSettings,
  onOpenAISettings,
  onOpenCanva,
  onOpenWordArt2,
  onPasteFromClipboard,
  projectName = 'Arte Sublimação - Caneca 325ml',
  onChangeProjectName,
  currentUser = null,
  onOpenAuthModal,
}) => {
  const { t } = useTranslation();
  const [internalProjectName, setInternalProjectName] = useState<string>(projectName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const isLight = theme === 'light';

  useEffect(() => {
    setInternalProjectName(projectName);
  }, [projectName]);

  const handleNameChange = (newName: string) => {
    setInternalProjectName(newName);
    if (onChangeProjectName) {
      onChangeProjectName(newName);
    }
  };

  const productDimensions = currentProduct
    ? `${currentProduct.defaultWidthCm || 20}×${currentProduct.defaultHeightCm || 9.5}cm`
    : '';

  return (
    <header
      className={`h-12 w-full border-b select-none text-xs z-40 shadow-sm transition-colors relative overflow-x-auto overflow-y-hidden topbar-scrollbar custom-scrollbar touch-scroll-x shrink-0 ${
        isLight
          ? 'bg-white/95 border-slate-200 text-slate-800 backdrop-blur-md'
          : 'bg-[#0f1015]/95 border-[#23242e] text-gray-200 backdrop-blur-md'
      }`}
    >
      <div className="min-w-max h-full px-3 flex items-center justify-between gap-4 w-full">
        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: LEFT - BRAND, APP MENU, PROJECT NAME & PRODUCT
        ───────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 mr-1">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 shadow-xs">
            {!logoError ? (
              <img
                src={logoSublimStudioSvg}
                alt="SublimStudio"
                className="w-5 h-5 object-contain rounded shrink-0"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  if (!target.dataset.triedPng) {
                    target.dataset.triedPng = 'true';
                    target.src = logoSublimStudioPng;
                  } else if (!target.dataset.triedFavicon) {
                    target.dataset.triedFavicon = 'true';
                    target.src = faviconPng;
                  } else {
                    setLogoError(true);
                  }
                }}
              />
            ) : (
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            )}
            <span className="font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-xs">
              SublimStudio
            </span>
            <span className="text-[9px] font-black px-1 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
              RIP
            </span>
          </div>
        </div>

        {/* Global App Menu (File / Edit / Tools / Presets / Printer / Settings) */}
        <AppMenu
          theme={theme}
          onExport={onOpenExportModal}
          onOpenPrintModal={onOpenPrintModal}
          onOpenMug3In1={onOpenMug3In1}
          onNewProject={onNewProject}
          onOpenProject={onOpenProject}
          onIncludeStamp={onIncludeStamp}
          onViewImage={onViewImage}
          onPasteFromClipboard={onPasteFromClipboard}
          onSaveLayout={onSaveLayout}
          onOpenSettings={onOpenSettings}
          onOpenPrinterSettings={onOpenPrinterSettings}
          onOpenAndroidModal={onOpenAndroidModal}
          onOpenPresetGallery={onOpenPresetGallery}
          onOpenProductLibrary={onOpenProductLibrary}
          onOpenHelp={onOpenHelp}
          onOpenAbout={onOpenAbout}
          onToggleTheme={onToggleTheme}
          onOpenWordArt2={onOpenWordArt2}
          onOpenAISettings={onOpenAISettings}
          onOpenCanva={onOpenCanva}
        />

        {/* Undo / Redo Group */}
        <div
          className={`flex items-center rounded-xl p-0.5 border shrink-0 ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#181922] border-[#292a36]'
          }`}
        >
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 disabled:opacity-30 rounded-lg transition-colors cursor-pointer ${
              isLight
                ? 'text-slate-700 hover:text-black hover:bg-slate-200'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            title={t('topbar.undo') + ' (Ctrl+Z)'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 disabled:opacity-30 rounded-lg transition-colors cursor-pointer ${
              isLight
                ? 'text-slate-700 hover:text-black hover:bg-slate-200'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            title={t('topbar.redo') + ' (Ctrl+Y)'}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className={`h-4 w-px mx-0.5 ${isLight ? 'bg-slate-200' : 'bg-[#292a36]'}`} />

        {/* Project Name & Product Selector */}
        <div className="flex items-center gap-1.5">
          {/* Editable Project Name */}
          <div
            className={`hidden md:flex items-center gap-1 px-2 py-1 rounded-xl border transition-all ${
              isLight
                ? 'bg-slate-50 border-slate-200 hover:border-purple-300 text-slate-800'
                : 'bg-[#181922] border-[#292a36] hover:border-purple-500/40 text-gray-200'
            }`}
          >
            <Edit3 className="w-3 h-3 text-purple-400 shrink-0 opacity-70" />
            <input
              type="text"
              value={internalProjectName}
              onChange={(e) => handleNameChange(e.target.value)}
              onFocus={() => setIsEditingName(true)}
              onBlur={() => setIsEditingName(false)}
              placeholder={t('topbar.projectNamePlaceholder')}
              className={`bg-transparent text-xs font-semibold focus:outline-none transition-all w-28 lg:w-36 truncate ${
                isEditingName ? 'w-48 ring-1 ring-purple-500 rounded px-1' : ''
              }`}
              title="Nome do Projeto Sublimático"
            />
          </div>

          {/* Product Badge / Switcher */}
          <button
            onClick={onOpenProductLibrary}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-semibold transition-all group cursor-pointer shrink-0 ${
              isLight
                ? 'bg-purple-50/80 hover:bg-purple-100/80 border-purple-200 text-purple-900'
                : 'bg-purple-950/20 hover:bg-purple-950/40 border-purple-500/30 text-purple-200'
            }`}
            title="Trocar Produto Sublimático / Gabarito"
          >
            <ProductIcon product={currentProduct} className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="font-bold max-w-[120px] truncate">
              {currentProduct?.name || t('products.mugs')}
            </span>
            {productDimensions && (
              <span className={`text-[10px] opacity-75 font-mono hidden lg:inline`}>
                ({productDimensions})
              </span>
            )}
            <ChevronDown className="w-3 h-3 text-purple-400 group-hover:translate-y-0.5 transition-transform shrink-0" />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: CENTER - VIEW MODE SWITCHER & SUBLIMATION CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Workspace View Mode (2D / Dividida / 3D) */}
        <div
          className={`flex items-center p-0.5 rounded-xl border shadow-2xs ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#161720] border-[#282936]'
          }`}
        >
          <button
            onClick={() => onChangeWorkspaceViewMode('canvas')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              workspaceViewMode === 'canvas'
                ? 'bg-purple-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title={t('topbar.viewMode.canvas') + ' (Gabarito 2D)'}
          >
            <Square className="w-3.5 h-3.5 shrink-0" />
            <span>2D</span>
          </button>

          <button
            onClick={() => onChangeWorkspaceViewMode('split')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              workspaceViewMode === 'split'
                ? 'bg-purple-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title={t('topbar.viewMode.split') + ' (2D + 3D Lado a Lado)'}
          >
            <Columns className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Dividida</span>
          </button>

          <button
            onClick={() => onChangeWorkspaceViewMode('mockup')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              workspaceViewMode === 'mockup'
                ? 'bg-purple-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title={t('topbar.viewMode.mockup') + ' (Mockup 3D Interativo)'}
          >
            <Box className="w-3.5 h-3.5 shrink-0" />
            <span>3D</span>
          </button>
        </div>

        {/* Sublimation Mirror Mode Toggle (Critical for Sublimation Printing) */}
        <button
          onClick={onToggleMirrorSublimation}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-bold transition-all cursor-pointer active:scale-95 ${
            mirrorSublimation
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-xs shadow-amber-500/10'
              : isLight
              ? 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800'
              : 'bg-[#181922] border-[#292a36] text-gray-400 hover:text-gray-200'
          }`}
          title={t('topbar.mirrorTooltip')}
        >
          <FlipHorizontal className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden lg:inline">{t('topbar.mirror')}:</span>
          <span className={mirrorSublimation ? 'font-black text-amber-300' : ''}>
            {mirrorSublimation ? t('common.yes') : t('common.no')}
          </span>
        </button>

        {/* Cloud Auto-Saved Indicator */}
        <div
          className={`hidden 2xl:flex items-center gap-1 text-[11px] font-medium text-emerald-400/90 pl-1`}
          title="Todas as alterações são salvas automaticamente"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[10px]">{t('common.saved')}</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: RIGHT - INTEGRATIONS, PREFERENCES & PRIMARY ACTIONS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Canva Hub Quick Launcher */}
        {onOpenCanva && (
          <button
            onClick={onOpenCanva}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] hover:brightness-110 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer active:scale-95 border border-cyan-300/30"
            title="Conectar com Canva / Importar Artes e Gabaritos"
          >
            <div className="w-3.5 h-3.5 rounded bg-white/25 text-white font-black text-[10px] italic flex items-center justify-center">
              C
            </div>
            <span className="hidden sm:inline">Canva</span>
          </button>
        )}

        {/* 3-in-1 Mug Sheet Imposition Shortcut */}
        {onOpenMug3In1 && (
          <button
            onClick={onOpenMug3In1}
            className="hidden xl:flex items-center gap-1 px-2 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 font-extrabold text-xs transition-all cursor-pointer"
            title={t('topbar.mug3in1')}
          >
            <span className="text-[10px] px-1 py-0.2 bg-emerald-950/60 rounded text-emerald-200">
              A4
            </span>
            <span>3 em 1</span>
          </button>
        )}

        <div className={`h-4 w-px mx-0.5 ${isLight ? 'bg-slate-200' : 'bg-[#292a36]'}`} />

        {/* Theme Toggle (Light / Dark) */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              isLight
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                : 'bg-purple-950/30 text-purple-300 border-purple-500/30 hover:bg-purple-900/50 hover:text-white'
            }`}
            title={isLight ? t('topbar.themeDark') : t('topbar.themeLight')}
          >
            {isLight ? (
              <Sun className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-purple-300 shrink-0" />
            )}
          </button>
        )}

        <div className={`h-4 w-px mx-0.5 ${isLight ? 'bg-slate-200' : 'bg-[#292a36]'}`} />

        {/* Export Art Button (Secondary Action) */}
        <button
          onClick={onOpenExportModal}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-bold text-xs transition-all cursor-pointer active:scale-95 ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              : 'bg-[#1b1c26] hover:bg-[#232532] border-[#313344] text-gray-200 hover:text-white'
          }`}
          title={t('topbar.exportArt')}
        >
          <Share2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="hidden sm:inline">{t('common.export')}</span>
        </button>

        {/* Main Sublimation Print RIP Button (Primary Illuminated CTA) */}
        <button
          onClick={() => {
            if (onOpenPrintModal) {
              onOpenPrintModal();
            } else if (onOpenPrinterSettings) {
              onOpenPrinterSettings();
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer active:scale-95 text-xs uppercase tracking-wide border border-emerald-300/40"
          title={t('topbar.printStudio')}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
          </span>
          <Printer className="w-3.5 h-3.5 text-slate-950 shrink-0" />
          <span>{t('common.print')}</span>
        </button>

        {/* User Account / Login Button */}
        {currentUser ? (
          <button
            onClick={onOpenAuthModal}
            className={`flex items-center gap-1.5 p-1 sm:px-2 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isLight
                ? 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                : 'bg-purple-950/30 text-purple-200 border-purple-500/30 hover:bg-purple-900/50'
            }`}
            title={`Conectado como ${currentUser.name}`}
          >
            <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px] font-black uppercase shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <span className="hidden xl:inline max-w-[70px] truncate">{currentUser.name}</span>
            <LogOut className="w-3 h-3 text-rose-400 shrink-0" />
          </button>
        ) : (
          onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className={`p-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-[#181922] hover:bg-[#20212d] border-[#2b2c3a] text-gray-300 hover:text-white'
              }`}
              title={t('topbar.login')}
            >
              <LogIn className="w-3.5 h-3.5 shrink-0" />
            </button>
          )
        )}
      </div>
    </div>
  </header>
  );
};
