import React from 'react';
import { PrinterCapabilities } from '../../services/printer/PrinterTypes';
import { Sliders, Maximize2, Layers, Check, X } from 'lucide-react';

interface PrinterCapabilitiesViewProps {
  capabilities: PrinterCapabilities | null;
  isDark?: boolean;
}

export const PrinterCapabilitiesView: React.FC<PrinterCapabilitiesViewProps> = ({ capabilities, isDark = true }) => {
  if (!capabilities) {
    return (
      <div className={`p-4 border rounded-xl text-xs ${
        isDark ? 'bg-[#0a0b10] border-slate-800 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        Nenhuma capacidade detectada.
      </div>
    );
  }

  return (
    <div className={`border rounded-2xl p-4 space-y-3 ${
      isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
        isDark ? 'text-gray-300' : 'text-slate-700'
      }`}>
        <Sliders className="w-3.5 h-3.5 text-purple-400" />
        Capacidades de Hardware Detectadas
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className={`p-2.5 rounded-xl border ${
          isDark ? 'bg-[#12131b] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className={`text-[10px] block font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Resolução Máxima</span>
          <span className="font-bold text-purple-500 font-mono">{capabilities.maxResolutionDpi} DPI</span>
        </div>

        <div className={`p-2.5 rounded-xl border ${
          isDark ? 'bg-[#12131b] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className={`text-[10px] block font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Sem Bordas (Borderless)</span>
          <span className="font-bold flex items-center gap-1 text-emerald-500">
            {capabilities.supportsBorderless ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-red-400" />}
            {capabilities.supportsBorderless ? 'Suportado' : 'Não'}
          </span>
        </div>

        <div className={`p-2.5 rounded-xl border ${
          isDark ? 'bg-[#12131b] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className={`text-[10px] block font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Impressão Duplex</span>
          <span className={`font-bold ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
            {capabilities.supportsDuplex ? 'Automático' : 'Manual'}
          </span>
        </div>

        <div className={`p-2.5 rounded-xl border ${
          isDark ? 'bg-[#12131b] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className={`text-[10px] block font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Suporte a Cores</span>
          <span className="font-bold text-emerald-500">
            {capabilities.supportsColor ? 'CMYK / Sublimação' : 'Monocromático'}
          </span>
        </div>
      </div>

      {/* Supported Papers */}
      <div>
        <span className={`text-[11px] font-bold block mb-1.5 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Tamanhos de Papel Cadastrados:</span>
        <div className="flex flex-wrap gap-1.5">
          {capabilities.supportedPaperSizes.map((paper) => (
            <span
              key={paper.id}
              className={`text-[10px] font-mono border px-2.5 py-1 rounded-lg ${
                isDark ? 'bg-slate-800 border-slate-700 text-gray-200' : 'bg-slate-200 border-slate-300 text-slate-700'
              }`}
            >
              {paper.name} ({paper.widthMm}x{paper.heightMm}mm)
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
