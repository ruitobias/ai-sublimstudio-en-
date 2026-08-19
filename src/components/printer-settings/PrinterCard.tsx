import React from 'react';
import { Printer } from '../../services/printer/PrinterTypes';
import { Printer as PrinterIcon, CheckCircle2, Star, Settings2, TestTube2, Cpu } from 'lucide-react';

interface PrinterCardProps {
  printer: Printer;
  isSelected: boolean;
  onSelect: () => void;
  onSetAppDefault: () => void;
  onOpenNativeProperties: () => void;
  onRunTest: () => void;
  isDark?: boolean;
}

export const PrinterCard: React.FC<PrinterCardProps> = ({
  printer,
  isSelected,
  onSelect,
  onSetAppDefault,
  onOpenNativeProperties,
  onRunTest,
  isDark = true,
}) => {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
        isSelected
          ? isDark
            ? 'bg-purple-950/20 border-purple-500 shadow-lg shadow-purple-500/10'
            : 'bg-purple-50 border-purple-400 shadow-md shadow-purple-100'
          : isDark
          ? 'bg-[#12131b] border-slate-800 hover:border-slate-700'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border ${
              isSelected
                ? isDark
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                  : 'bg-purple-100 text-purple-600 border-purple-200'
                : isDark
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <PrinterIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className={`font-bold text-sm flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {printer.displayName}
            </h4>
            <span className={`text-[11px] block font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {printer.manufacturer || 'Fabricante Desconhecido'} {printer.model ? `• ${printer.model}` : ''}
            </span>
          </div>
        </div>

        {/* Status indicator */}
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
            printer.status === 'idle'
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : printer.status === 'printing'
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              : 'bg-red-500/20 text-red-400 border-red-500/30'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {printer.status === 'idle' ? 'Disponível' : printer.status === 'printing' ? 'Imprimindo' : 'Offline / Erro'}
        </span>
      </div>

      {/* Defaults Flags */}
      <div className={`grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl border ${
        isDark ? 'bg-[#0a0b10] border-slate-800/80 text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-1.5">
          <Star className={`w-3.5 h-3.5 ${printer.isSystemDefault ? 'text-amber-400 fill-amber-400' : isDark ? 'text-gray-500' : 'text-slate-400'}`} />
          <span>Sistema: {printer.isSystemDefault ? '★ Padrão do OS' : 'Secundária'}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <CheckCircle2 className={`w-3.5 h-3.5 ${printer.isAppDefault ? 'text-emerald-400' : isDark ? 'text-gray-500' : 'text-slate-400'}`} />
          <span>App: {printer.isAppDefault ? '✓ Selecionada no Sublima' : 'Secundária'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`flex items-center gap-2 pt-1 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
        <button
          onClick={onSelect}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isSelected
              ? 'bg-purple-600 text-white shadow'
              : isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
          }`}
        >
          {isSelected ? 'Selecionada' : 'Selecionar'}
        </button>

        {!printer.isAppDefault && (
          <button
            onClick={onSetAppDefault}
            className="py-1.5 px-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
            title="Tornar impressora padrão do Sublim Studio"
          >
            Tornar Padrão
          </button>
        )}

        <button
          onClick={onOpenNativeProperties}
          className={`p-2 rounded-xl cursor-pointer border transition-colors ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-gray-300 hover:text-white'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600 hover:text-slate-900'
          }`}
          title="Propriedades do Sistema"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onRunTest}
          className={`p-2 rounded-xl cursor-pointer border transition-colors ${
            isDark
              ? 'bg-indigo-950/60 hover:bg-indigo-900/80 border-indigo-500/40 text-indigo-300'
              : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700'
          }`}
          title="Imprimir Teste de Calibração"
        >
          <TestTube2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
