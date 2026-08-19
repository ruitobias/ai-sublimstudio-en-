import React from 'react';
import { Printer } from '../../services/printer/PrinterTypes';
import { PrinterCard } from './PrinterCard';
import { RefreshCw, Search } from 'lucide-react';

interface PrinterListProps {
  printers: Printer[];
  selectedPrinter: Printer | null;
  isLoading: boolean;
  onRefresh: () => void;
  onSelect: (printerId: string) => void;
  onSetAppDefault: (printerId: string) => void;
  onOpenNativeProperties: (printerId: string) => void;
  onRunTest: (printer: Printer) => void;
  isDark?: boolean;
}

export const PrinterList: React.FC<PrinterListProps> = ({
  printers,
  selectedPrinter,
  isLoading,
  onRefresh,
  onSelect,
  onSetAppDefault,
  onOpenNativeProperties,
  onRunTest,
  isDark = true,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPrinters = printers.filter((p) =>
    p.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search & Refresh Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar impressora por nome ou modelo..."
            className={`w-full border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-purple-500 transition-colors ${
              isDark
                ? 'bg-[#0a0b10] border-slate-800 text-white placeholder:text-gray-500'
                : 'bg-slate-100 border-slate-300 text-slate-800 placeholder:text-slate-400'
            }`}
          />
        </div>

        <button
          disabled={isLoading}
          onClick={onRefresh}
          className={`py-2 px-3.5 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer active:scale-95 transition-all disabled:opacity-50 border ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-gray-200 border-slate-700'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Atualizando...' : 'Atualizar Lista'}</span>
        </button>
      </div>

      {/* Grid of Printers */}
      {filteredPrinters.length === 0 ? (
        <div className={`p-8 text-center rounded-2xl border text-xs ${
          isDark ? 'bg-[#0a0b10] border-slate-800 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          Nenhuma impressora encontrada. Verifique a conexão do cabo USB ou Wi-Fi Direct.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrinters.map((printer) => (
            <PrinterCard
              key={printer.id}
              printer={printer}
              isSelected={selectedPrinter?.id === printer.id}
              onSelect={() => onSelect(printer.id)}
              onSetAppDefault={() => onSetAppDefault(printer.id)}
              onOpenNativeProperties={() => onOpenNativeProperties(printer.id)}
              onRunTest={() => onRunTest(printer)}
              isDark={isDark}
            />
          ))}
        </div>
      )}
    </div>
  );
};
