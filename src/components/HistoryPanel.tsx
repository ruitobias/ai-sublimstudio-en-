import React from 'react';
import { HistoryStep } from '../types';
import { History, RotateCcw, Clock, Sparkles, Paintbrush, Type, Trash2, Plus } from 'lucide-react';

interface HistoryPanelProps {
  historySteps: HistoryStep[];
  currentHistoryIndex: number;
  onJumpToHistoryStep: (index: number) => void;
  theme?: 'dark' | 'light';
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  historySteps,
  currentHistoryIndex,
  onJumpToHistoryStep,
  theme = 'dark',
}) => {
  return (
    <div className={`flex flex-col h-full text-xs select-none border-l transition-colors ${
      theme === 'light' ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#1e1e20] text-gray-300 border-[#2d2d30]'
    }`}>
      <div className={`px-3 py-2 border-b flex items-center gap-2 font-semibold ${
        theme === 'light' ? 'border-slate-200 bg-slate-50 text-purple-700' : 'border-[#2d2d30] bg-[#18181a] text-sky-400'
      }`}>
        <History className="w-4 h-4" />
        <span>Histórico de Edições ({historySteps.length})</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1">
        {historySteps.length === 0 ? (
          <div className="p-4 text-center text-gray-500 font-mono text-[11px]">
            Nenhuma ação registrada no histórico.
          </div>
        ) : (
          historySteps.map((step, idx) => {
            const isCurrent = idx === currentHistoryIndex;
            const isFuture = idx > currentHistoryIndex;

            return (
              <button
                key={step.id}
                onClick={() => onJumpToHistoryStep(idx)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left transition-all ${
                  isCurrent
                    ? 'bg-sky-600/30 border-sky-500 text-white font-semibold shadow-sm'
                    : isFuture
                    ? 'bg-[#18181a]/40 border-[#2b2b2e] text-gray-500 hover:text-gray-300'
                    : 'bg-[#18181a] border-[#2d2d30] text-gray-300 hover:bg-[#252528]'
                }`}
              >
                <div className="w-5 h-5 rounded bg-[#121214] border border-[#38383c] flex items-center justify-center shrink-0">
                  {step.toolName.includes('IA') ? (
                    <Sparkles className="w-3 h-3 text-purple-400" />
                  ) : step.toolName.includes('Texto') ? (
                    <Type className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Clock className="w-3 h-3 text-sky-400" />
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <span className="truncate text-[11px]">{step.description}</span>
                  <span className="text-[9px] text-gray-500 font-mono">
                    {new Date(step.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
