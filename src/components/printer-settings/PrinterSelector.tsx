import React from 'react';
import { Printer } from '../../services/printer/PrinterTypes';
import { Printer as PrinterIcon } from 'lucide-react';

interface PrinterSelectorProps {
  printers: Printer[];
  selectedPrinterId: string;
  onSelectPrinter: (printerId: string) => void;
  isDark?: boolean;
}

export const PrinterSelector: React.FC<PrinterSelectorProps> = ({
  printers,
  selectedPrinterId,
  onSelectPrinter,
  isDark = true,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={`text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider ${
        isDark ? 'text-purple-300' : 'text-purple-700'
      }`}>
        <PrinterIcon className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
        Impressora Ativa no Sublim Studio
      </label>
      <select
        value={selectedPrinterId}
        onChange={(e) => onSelectPrinter(e.target.value)}
        className={`w-full border rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-purple-500 transition-colors ${
          isDark
            ? 'bg-[#0a0b10] border-slate-700 text-white'
            : 'bg-slate-100 border-slate-300 text-slate-800'
        }`}
      >
        {printers.map((p) => (
          <option key={p.id} value={p.id}>
            {p.displayName} {p.isAppDefault ? '(Padrão do App)' : p.isSystemDefault ? '(Padrão do Windows)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
};
