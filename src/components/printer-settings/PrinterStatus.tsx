import React from 'react';
import { Printer } from '../../services/printer/PrinterTypes';

interface PrinterStatusProps {
  printer: Printer | null;
  isDark?: boolean;
}

export const PrinterStatusView: React.FC<PrinterStatusProps> = ({ printer, isDark = true }) => {
  if (!printer) return null;

  return (
    <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
      isDark ? 'bg-[#0d0e14] border-slate-800' : 'bg-slate-100 border-slate-200'
    }`}>
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            printer.status === 'idle'
              ? 'bg-emerald-400 animate-pulse'
              : printer.status === 'printing'
              ? 'bg-amber-400'
              : 'bg-red-400'
          }`}
        />
        <span className={`font-bold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>{printer.displayName}</span>
      </div>

      <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
        Porta: {printer.port || 'USB/Local'} | Driver: {printer.driverVersion || 'WinSpooler'}
      </span>
    </div>
  );
};
