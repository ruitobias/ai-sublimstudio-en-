import React from 'react';
import { PresetGallery } from './PresetGallery';
import { PresetTemplate } from '../types';
import { Sparkles, X } from 'lucide-react';

interface PresetGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPreset?: (preset: PresetTemplate) => void;
  darkMode?: boolean;
}

export const PresetGalleryModal: React.FC<PresetGalleryModalProps> = ({
  isOpen,
  onClose,
  onApplyPreset,
  darkMode = true,
}) => {
  if (!isOpen) return null;

  const handleApply = (preset: PresetTemplate) => {
    if (onApplyPreset) {
      onApplyPreset(preset);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 select-none p-4 animate-fade-in">
      <div
        className={`w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl p-5 shadow-2xl border transition-colors ${
          darkMode ? 'bg-[#101522] border-[#232D3F] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold">Galeria de Modelos HD & Presets Panorâmicos</h2>
              <p className="text-xs text-slate-400">Escolha um modelo pronto para aplicar na sua estampa ou caneca</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Fechar Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar touch-scroll-y py-4 min-h-0">
          <PresetGallery
            onApplyPreset={handleApply}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};
