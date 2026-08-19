import React, { useState } from 'react';
import {
  Palette,
  Box,
  Package,
  Sparkles,
  Layers,
  Smartphone,
  Plus,
  Type,
  Camera,
  ImagePlus,
  Shapes,
  Sliders,
  X,
  Wrench,
} from 'lucide-react';
import { WorkspaceViewMode, ShapeType } from '../types';
import { useTranslation } from '../i18n';

interface AndroidMobileNavProps {
  workspaceViewMode: WorkspaceViewMode;
  setWorkspaceViewMode: (mode: WorkspaceViewMode) => void;
  activeRightTab: '3d' | 'properties' | 'layers' | 'history' | 'ai';
  setActiveRightTab: (tab: '3d' | 'properties' | 'layers' | 'history' | 'ai') => void;
  setIsRightSidebarCollapsed: (collapsed: boolean) => void;
  onOpenProductLibrary: () => void;
  onOpenAndroidModal: () => void;
  onTriggerCameraCapture: () => void;
  onIncludeStamp: () => void;
  onAddTextLayer: () => void;
  onAddShapeLayer: (shape: ShapeType) => void;
  onOpenMobileBottomSheet: (tab: 'properties' | 'layers' | 'ai') => void;
}

export const AndroidMobileNav: React.FC<AndroidMobileNavProps> = ({
  workspaceViewMode,
  setWorkspaceViewMode,
  activeRightTab,
  setActiveRightTab,
  setIsRightSidebarCollapsed,
  onOpenProductLibrary,
  onOpenAndroidModal,
  onTriggerCameraCapture,
  onIncludeStamp,
  onAddTextLayer,
  onAddShapeLayer,
  onOpenMobileBottomSheet,
}) => {
  const { t } = useTranslation();
  const [isFabOpen, setIsFabOpen] = useState(false);

  const triggerHaptic = (ms = 15) => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch (e) {
        // ignore
      }
    }
  };

  const handleNavClick = (action: () => void) => {
    triggerHaptic(15);
    setIsFabOpen(false);
    action();
  };

  return (
    <>
      {/* Speed Dial Menu for FAB */}
      {isFabOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-end pb-24 px-6 animate-fade-in sm:hidden">
          <div className="bg-[#1e293b] border border-slate-700/80 rounded-2xl p-4 shadow-2xl space-y-2 animate-slide-up max-w-sm mx-auto w-full">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 pb-1 border-b border-slate-800">
              Criar no Estúdio
            </div>

            <button
              onClick={() => handleNavClick(onAddTextLayer)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-medium text-xs transition-all active:scale-95"
            >
              <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
                <Type className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-slate-100 font-semibold">Adicionar Texto Personalizado</div>
                <div className="text-[11px] text-slate-400">Inserir nome, frases ou vetor 3D</div>
              </div>
            </button>

            <button
              onClick={() => handleNavClick(onIncludeStamp)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-medium text-xs transition-all active:scale-95"
            >
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <ImagePlus className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-slate-100 font-semibold">Inserir Imagem / Estampa</div>
                <div className="text-[11px] text-slate-400">Importar da galeria do celular</div>
              </div>
            </button>

            <button
              onClick={() => handleNavClick(onTriggerCameraCapture)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-medium text-xs transition-all active:scale-95"
            >
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Camera className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-slate-100 font-semibold">Tirar Foto da Câmera</div>
                <div className="text-[11px] text-slate-400">Usar câmera nativa do Android</div>
              </div>
            </button>

            <button
              onClick={() => handleNavClick(() => onAddShapeLayer('rectangle'))}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-medium text-xs transition-all active:scale-95"
            >
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                <Shapes className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-slate-100 font-semibold">Adicionar Forma Geométrica</div>
                <div className="text-[11px] text-slate-400">Retângulo, Círculo, Estrela, Coração</div>
              </div>
            </button>

            <button
              onClick={() => handleNavClick(() => onOpenMobileBottomSheet('ai'))}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/30 text-emerald-200 font-medium text-xs transition-all active:scale-95"
            >
              <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-emerald-300 font-semibold">Gerar Estampa com IA Studio</div>
                <div className="text-[11px] text-emerald-400/80">Criar fundos e artes inteligentes</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Material Design 3 Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-800/80 px-3 py-1.5 flex items-center justify-between shadow-2xl sm:hidden overflow-x-auto custom-scrollbar">
        
        {/* 1. Estúdio Canvas 2D */}
        <button
          onClick={() =>
            handleNavClick(() => {
              setWorkspaceViewMode('canvas');
            })
          }
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all ${
            workspaceViewMode === 'canvas'
              ? 'text-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 px-3 rounded-full transition-colors ${workspaceViewMode === 'canvas' ? 'bg-sky-500/20' : ''}`}>
            <Palette className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">{t('topBar.studio2d')}</span>
        </button>

        {/* 2. Mockup 3D */}
        <button
          onClick={() =>
            handleNavClick(() => {
              setWorkspaceViewMode('mockup');
              setActiveRightTab('3d');
              setIsRightSidebarCollapsed(false);
            })
          }
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all ${
            workspaceViewMode === 'mockup'
              ? 'text-purple-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 px-3 rounded-full transition-colors ${workspaceViewMode === 'mockup' ? 'bg-purple-500/20' : ''}`}>
            <Box className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">{t('topBar.mockup3d')}</span>
        </button>

        {/* 3. CENTER MATERIAL 3 FLOATING ACTION BUTTON (FAB) */}
        <div className="relative -top-5">
          <button
            onClick={() => {
              triggerHaptic(25);
              setIsFabOpen(!isFabOpen);
            }}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/25 transition-transform active:scale-90 cursor-pointer ${
              isFabOpen
                ? 'bg-rose-500 text-white rotate-45'
                : 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 text-slate-950 font-bold'
            }`}
            title="Adicionar Elemento"
          >
            <Plus className="w-7 h-7 stroke-[2.5]" />
          </button>
        </div>

        {/* 4. Camadas (Opens Bottom Sheet) */}
        <button
          onClick={() => handleNavClick(() => onOpenMobileBottomSheet('layers'))}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all ${
            activeRightTab === 'layers'
              ? 'text-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 px-3 rounded-full transition-colors ${activeRightTab === 'layers' ? 'bg-sky-500/20' : ''}`}>
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">{t('sidebar.layers')}</span>
        </button>

        {/* 5. Propriedades / Ajustes */}
        <button
          onClick={() => handleNavClick(() => onOpenMobileBottomSheet('properties'))}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all ${
            activeRightTab === 'properties'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 px-3 rounded-full transition-colors ${activeRightTab === 'properties' ? 'bg-amber-500/20' : ''}`}>
            <Sliders className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5">{t('sidebar.properties')}</span>
        </button>
      </div>
    </>
  );
};
