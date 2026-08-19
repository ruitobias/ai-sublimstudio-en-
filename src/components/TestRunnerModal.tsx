import React, { useState } from 'react';
import { runFullEditorTestSuite, TestResult } from '../utils/__tests__/editorSuite.test';
import { CheckCircle2, XCircle, Play, ShieldCheck, Cpu, Zap, X } from 'lucide-react';

interface TestRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export const TestRunnerModal: React.FC<TestRunnerModalProps> = ({
  isOpen,
  onClose,
  darkMode = true,
}) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  if (!isOpen) return null;

  const handleExecuteTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      const results = runFullEditorTestSuite();
      setTestResults(results);
      setIsRunning(false);
      setHasRun(true);
    }, 150);
  };

  const totalTests = testResults.length;
  const passedCount = testResults.filter((r) => r.passed).length;
  const failedCount = totalTests - passedCount;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 select-none p-4 animate-fade-in">
      <div
        className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl p-5 shadow-2xl border transition-colors ${
          darkMode ? 'bg-[#101522] border-[#232D3F] text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">Bateria de Testes Automatizados & QA</h2>
              <p className="text-xs text-slate-400">Validação de Segurança, Prensas, Formas e Algoritmos de Canvas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar touch-scroll-y py-4 space-y-4 min-h-0">
          {!hasRun && !isRunning && (
            <div className="text-center py-10 space-y-4">
              <ShieldCheck className="w-12 h-12 text-purple-400 mx-auto opacity-80 animate-bounce" />
              <div>
                <h3 className="text-sm font-semibold">Pronto para Auditar a Aplicação</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Clique no botão abaixo para executar testes de unidade automatizados cobrindo segurança XSS, validação de arquivos, cálculos de prensa sublimática e geometria vetorial.
                </p>
              </div>
            </div>
          )}

          {isRunning && (
            <div className="text-center py-12 space-y-3">
              <Zap className="w-10 h-10 text-amber-400 mx-auto animate-spin" />
              <p className="text-sm font-medium">Executando testes automatizados...</p>
            </div>
          )}

          {hasRun && !isRunning && (
            <div className="space-y-4">
              {/* Summary Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className={`p-3 rounded-xl border text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs text-slate-400">Total Executados</div>
                  <div className="text-xl font-bold text-slate-200">{totalTests}</div>
                </div>
                <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center">
                  <div className="text-xs text-emerald-400 font-medium">Aprovados</div>
                  <div className="text-xl font-bold text-emerald-400">{passedCount}</div>
                </div>
                <div className={`p-3 rounded-xl border text-center ${failedCount > 0 ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-slate-900/50 border-slate-800 text-slate-500'}`}>
                  <div className="text-xs text-slate-400">Falhas</div>
                  <div className="text-xl font-bold">{failedCount}</div>
                </div>
              </div>

              {/* Test Items List */}
              <div className="space-y-2">
                {testResults.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      t.passed
                        ? darkMode
                          ? 'bg-slate-900/60 border-emerald-500/20 text-slate-200'
                          : 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {t.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <div>
                        <span className="font-semibold">{t.name}</span>
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {t.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-[11px] font-mono opacity-70">
                      {t.durationMs}ms
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between">
          <span className="text-xs text-slate-400">QA Engine v2.5 • Suíte Completa</span>
          <button
            onClick={handleExecuteTests}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {hasRun ? 'Re-executar Testes' : 'Rodar Bateria de Testes'}
          </button>
        </div>
      </div>
    </div>
  );
};
