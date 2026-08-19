import React, { useState } from 'react';
import { Palette, X, Check } from 'lucide-react';

interface ColorPickerModalProps {
  color: string;
  onChangeColor: (color: string) => void;
  onClose: () => void;
  title?: string;
  darkMode?: boolean;
}

const PRESET_SWATCHES = [
  '#00D9FF', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981',
  '#3B82F6', '#6366F1', '#D946EF', '#EF4444', '#84CC16',
  '#06B6D4', '#0f172a', '#1e293b', '#334155', '#475569',
  '#ffffff', '#000000', '#f43f5e', '#a855f7', '#0284c7'
];

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  color,
  onChangeColor,
  onClose,
  title = 'Paleta de Cores',
  darkMode = true
}) => {
  const [hexInput, setHexInput] = useState(color);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSelectSwatch = (swatchHex: string) => {
    setHexInput(swatchHex);
    onChangeColor(swatchHex);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 select-none p-4 animate-fade-in"
    >
      <div
        className={`w-full max-w-sm max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl p-4 shadow-2xl space-y-4 border transition-colors ${
          darkMode ? 'bg-[#101522] border-[#232D3F] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-3 ${darkMode ? 'border-[#1F2937]' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm">
            <Palette className="w-4 h-4" />
            <span>{title}</span>
          </div>
          <button onClick={onClose} className={`p-1 rounded-lg ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Color Preview & Native Input */}
        <div className={`flex items-center gap-3 p-2.5 rounded-xl border ${darkMode ? 'bg-[#161B26] border-[#232D3F]' : 'bg-slate-100 border-slate-200'}`}>
          <input
            type="color"
            value={hexInput.startsWith('#') ? hexInput : '#00D9FF'}
            onChange={(e) => {
              setHexInput(e.target.value);
              onChangeColor(e.target.value);
            }}
            className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0"
          />
          <div className="flex flex-col flex-1">
            <span className={`text-[10px] font-bold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>CÓDIGO HEX</span>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => {
                setHexInput(e.target.value);
                if (e.target.value.length === 7) onChangeColor(e.target.value);
              }}
              className="bg-transparent text-sm font-mono font-bold text-cyan-500 outline-none uppercase"
            />
          </div>
        </div>

        {/* 20 Preset Swatches */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400">AMOSTRAS RÁPIDAS</span>
          <div className="grid grid-cols-5 gap-2">
            {PRESET_SWATCHES.map((swatch) => (
              <button
                key={swatch}
                onClick={() => handleSelectSwatch(swatch)}
                className="w-full h-8 rounded-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer flex items-center justify-center shadow-md"
                style={{ backgroundColor: swatch }}
              >
                {hexInput.toLowerCase() === swatch.toLowerCase() && (
                  <Check className={`w-4 h-4 ${swatch === '#ffffff' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black rounded-xl shadow-lg cursor-pointer hover:brightness-110"
        >
          Confirmar Cor
        </button>
      </div>
    </div>
  );
};
