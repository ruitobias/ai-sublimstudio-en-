import React from 'react';
import { PrintPreset } from '../../services/printer/PrinterTypes';
import { Bookmark, Trash2, ArrowRight, Check } from 'lucide-react';

interface PrintPresetListProps {
  presets: PrintPreset[];
  activePresetId?: string;
  onApplyPreset: (preset: PrintPreset) => void;
  onDeletePreset: (presetId: string) => void;
  onCreateNew: () => void;
  isDark?: boolean;
}

export const PrintPresetList: React.FC<PrintPresetListProps> = ({
  presets,
  activePresetId,
  onApplyPreset,
  onDeletePreset,
  onCreateNew,
  isDark = true,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
          isDark ? 'text-gray-300' : 'text-slate-700'
        }`}>
          <Bookmark className="w-4 h-4 text-purple-400" />
          Presets de Impressão Salvos por Produto
        </h4>

        <button
          onClick={onCreateNew}
          className="py-1.5 px-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow"
        >
          + Salvar Configurações Atuais como Preset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <div
              key={preset.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                isActive
                  ? isDark
                    ? 'bg-purple-950/30 border-purple-500 shadow-md'
                    : 'bg-purple-50 border-purple-400 shadow-md'
                  : isDark
                  ? 'bg-[#0a0b10] border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h5 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{preset.name}</h5>
                  {preset.productCategory && (
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                      isDark ? 'bg-slate-800 text-purple-300 border-slate-700' : 'bg-purple-100 text-purple-700 border-purple-200'
                    }`}>
                      {preset.productCategory}
                    </span>
                  )}
                </div>

                <div className={`mt-2 space-y-1 text-[11px] font-mono ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                  <div>• Papel: {preset.settings.paperSize} ({preset.settings.orientation})</div>
                  <div>• Resolução: {preset.settings.dpi} DPI</div>
                  <div>• Espelhamento Sublimático: {preset.settings.mirror ? 'Ativado' : 'Desativado'}</div>
                  <div>• Perfil ICC: {preset.settings.iccProfile || 'Nenhum'}</div>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-2 border-t ${
                isDark ? 'border-slate-800/80' : 'border-slate-200'
              }`}>
                <button
                  onClick={() => onApplyPreset(preset)}
                  className="py-1.5 px-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Aplicar Preset</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeletePreset(preset.id)}
                  className={`p-2 rounded-xl cursor-pointer transition-all ${
                    isDark ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                  }`}
                  title="Excluir Preset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
