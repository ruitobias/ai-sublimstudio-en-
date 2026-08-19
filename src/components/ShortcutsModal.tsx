import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface ShortcutsModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

const SHORTCUTS = [
  { key: 'F2', desc: 'Editar Texto no Canvas (Caixa Selecionada)' },
  { key: 'Ctrl + V', desc: 'Colar Imagem com Transparência PNG' },
  { key: 'V', desc: 'Ferramenta de Seleção & Mover' },
  { key: 'A', desc: 'Mover Objeto Direto' },
  { key: 'P', desc: 'Caneta Vetorial' },
  { key: 'M', desc: 'Retângulo / Forma' },
  { key: 'L', desc: 'Círculo / Elipse' },
  { key: 'T', desc: 'Texto Artístico' },
  { key: 'H', desc: 'Ferramenta Mão (Pan)' },
  { key: 'Z', desc: 'Zoom In / Out' },
  { key: 'Ctrl + Z', desc: 'Desfazer ação (Undo)' },
  { key: 'Ctrl + Y', desc: 'Refazer ação (Redo)' },
  { key: 'Ctrl + S', desc: 'Salvar Projeto' },
  { key: 'Ctrl + Shift + E', desc: 'Exportar PNG Sublimático' }
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ onClose, darkMode = true }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Atalhos de Teclado"
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 select-none p-4 animate-fade-in"
    >
      <div
        className={`w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl p-4 shadow-2xl space-y-4 border transition-colors ${
          darkMode ? 'bg-[#101522] border-[#232D3F] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-3 ${darkMode ? 'border-[#1F2937]' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm">
            <Keyboard className="w-4 h-4" />
            <span>Atalhos de Teclado IDE</span>
          </div>
          <button onClick={onClose} className={`p-1 rounded-lg ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="space-y-1.5 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
          {SHORTCUTS.map((sc, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs ${
                darkMode ? 'bg-[#161B26] border-[#232D3F] text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span className="font-medium">{sc.desc}</span>
              <kbd
                className={`px-2 py-0.5 font-mono font-bold rounded border ${
                  darkMode
                    ? 'bg-[#1F2937] text-cyan-300 border-cyan-500/30'
                    : 'bg-white text-cyan-700 border-cyan-300'
                }`}
              >
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className={`w-full py-2 font-bold rounded-xl cursor-pointer ${
            darkMode ? 'bg-[#1E293B] hover:bg-[#2A3447] text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
          }`}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
