import React, { useState } from 'react';
import { Grid, X, Check, Box, RefreshCw } from 'lucide-react';
import { GangItem } from '../types';
import { GangEngine } from '../utils/gangEngine';

interface GangModalProps {
  onClose: () => void;
  darkMode?: boolean;
}

export const GangModal: React.FC<GangModalProps> = ({ onClose, darkMode = true }) => {
  const [sheetSize, setSheetSize] = useState<'A3' | 'A4' | 'ROLL60'>('A3');
  const [items, setItems] = useState<GangItem[]>([
    { id: '1', name: 'Caneca Estampa Tucano', widthMm: 204, heightMm: 90, quantity: 3, color: '#00D9FF' },
    { id: '2', name: 'Squeeze Logo 20x16', widthMm: 200, heightMm: 160, quantity: 2, color: '#8B5CF6' },
    { id: '3', name: 'Selo Vintage Café', widthMm: 100, heightMm: 100, quantity: 4, color: '#F59E0B' }
  ]);

  const sheetDims =
    sheetSize === 'A3'
      ? { w: 297, h: 420 }
      : sheetSize === 'A4'
      ? { w: 210, h: 297 }
      : { w: 600, h: 1000 };

  const gangResult = GangEngine.packItemsOnSheet(items, sheetDims.w, sheetDims.h);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 select-none p-4 animate-fade-in">
      <div
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar touch-scroll-y rounded-2xl p-5 shadow-2xl space-y-4 border transition-colors ${
          darkMode ? 'bg-[#101522] border-[#232D3F] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-3 ${darkMode ? 'border-[#1F2937]' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm">
            <Grid className="w-5 h-5" />
            <span>Nesting de Folhas (Gang Sheet Sublimático MaxRects)</span>
          </div>
          <button onClick={onClose} className={`p-1 rounded-lg ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paper Size Selector & Stats */}
        <div className={`flex items-center justify-between border p-3 rounded-xl text-xs font-bold ${darkMode ? 'bg-[#161B26] border-[#232D3F]' : 'bg-slate-100 border-slate-200'}`}>
          <div className="flex items-center gap-2">
            <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Tamanho da Folha:</span>
            {(['A3', 'A4', 'ROLL60'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSheetSize(s)}
                className={`px-3 py-1 rounded-lg cursor-pointer ${
                  sheetSize === s
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : darkMode
                    ? 'bg-[#1E293B] text-slate-300'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className={`flex items-center gap-4 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
            <span>
              Aproveitamento: <strong className="text-emerald-500">{gangResult.totalOccupancyPercent}%</strong>
            </span>
            <span>
              Desperdício: <strong className="text-rose-500">{gangResult.totalWastePercent}%</strong>
            </span>
          </div>
        </div>

        {/* Visual Sheet Preview Box */}
        <div className={`border p-4 rounded-xl flex items-center justify-center h-64 relative overflow-hidden ${darkMode ? 'bg-[#0A0E17] border-[#232D3F]' : 'bg-slate-200 border-slate-300'}`}>
          <div
            className="bg-white/90 border border-cyan-400 relative rounded shadow-inner transition-all"
            style={{
              width: `${(sheetDims.w / sheetDims.h) * 200}px`,
              height: '200px'
            }}
          >
            {gangResult.placedBoxes.map((box) => (
              <div
                key={box.id}
                className="absolute border border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-950 overflow-hidden p-0.5 rounded-sm"
                style={{
                  left: `${(box.x / sheetDims.w) * 100}%`,
                  top: `${(box.y / sheetDims.h) * 100}%`,
                  width: `${(box.w / sheetDims.w) * 100}%`,
                  height: `${(box.h / sheetDims.h) * 100}%`,
                  backgroundColor: '#00D9FF'
                }}
              >
                {box.name}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black rounded-xl shadow-lg cursor-pointer hover:brightness-110"
        >
          Imprimir Folha Gang Sheet
        </button>
      </div>
    </div>
  );
};
