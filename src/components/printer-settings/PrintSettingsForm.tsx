import React from 'react';
import { PrintSettings, PrinterCapabilities } from '../../services/printer/PrinterTypes';
import { FlipHorizontal, FileText, Sliders, ShieldCheck } from 'lucide-react';

interface PrintSettingsFormProps {
  settings: PrintSettings;
  capabilities: PrinterCapabilities | null;
  onChange: (updated: Partial<PrintSettings>) => void;
  onReset: () => void;
  isDark?: boolean;
}

export const PrintSettingsForm: React.FC<PrintSettingsFormProps> = ({
  settings,
  capabilities,
  onChange,
  onReset,
  isDark = true,
}) => {
  return (
    <div className="space-y-4">
      {/* Sublimation Highlight Mirroring Box */}
      <div className={`p-3.5 border rounded-2xl flex items-center justify-between gap-3 ${
        isDark ? 'bg-purple-950/30 border-purple-500/40' : 'bg-purple-50 border-purple-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
            <FlipHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h5 className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Espelhamento Horizontal para Sublimação (Efeito Espelho)
            </h5>
            <p className={`text-[11px] ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              Inverte a arte horizontalmente para transferência correta na prensa térmica.
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.mirror}
            onChange={(e) => onChange({ mirror: e.target.checked })}
            className="sr-only peer"
          />
          <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 ${
            isDark ? 'bg-slate-800' : 'bg-slate-300'
          }`}></div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Paper Size */}
        <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
          isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <label className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            Tamanho do Papel
          </label>
          <select
            value={settings.paperSize}
            onChange={(e) => onChange({ paperSize: e.target.value })}
            className={`w-full border rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-purple-500 ${
              isDark
                ? 'bg-[#12131b] border-slate-700 text-white'
                : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            {(capabilities?.supportedPaperSizes || [
              { id: 'A4', name: 'A4 (210 x 297 mm)' },
              { id: 'A3', name: 'A3 (297 x 420 mm)' },
              { id: 'MUG_WRAP', name: 'Faixa Caneca (204 x 90 mm)' },
              { id: 'SQUEEZE_WRAP', name: 'Faixa Squeeze (220 x 120 mm)' },
            ]).map((paper) => (
              <option key={paper.id} value={paper.id}>
                {paper.name}
              </option>
            ))}
          </select>
        </div>

        {/* Orientation */}
        <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
          isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <label className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Orientação</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChange({ orientation: 'portrait' })}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                settings.orientation === 'portrait'
                  ? 'bg-purple-600 text-white border-purple-500'
                  : isDark
                  ? 'bg-[#12131b] text-gray-400 border-slate-700 hover:text-white'
                  : 'bg-white text-slate-600 border-slate-300 hover:text-slate-900'
              }`}
            >
              Retrato (Vertical)
            </button>
            <button
              type="button"
              onClick={() => onChange({ orientation: 'landscape' })}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                settings.orientation === 'landscape'
                  ? 'bg-purple-600 text-white border-purple-500'
                  : isDark
                  ? 'bg-[#12131b] text-gray-400 border-slate-700 hover:text-white'
                  : 'bg-white text-slate-600 border-slate-300 hover:text-slate-900'
              }`}
            >
              Paisagem (Horizontal)
            </button>
          </div>
        </div>

        {/* Resolution / DPI */}
        <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
          isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <label className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            Resolução de Impressão (DPI)
          </label>
          <select
            value={settings.dpi}
            onChange={(e) => onChange({ dpi: Number(e.target.value) })}
            className={`w-full border rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-purple-500 ${
              isDark
                ? 'bg-[#12131b] border-slate-700 text-white'
                : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            {(capabilities?.supportedDpis || [300, 600, 1200, 5760]).map((dpi) => (
              <option key={dpi} value={dpi}>
                {dpi} DPI {dpi >= 1200 ? '(Alta Definição Foto Sublimática)' : dpi === 600 ? '(Alta Qualidade Padrão)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Quality Level */}
        <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
          isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <label className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Modo de Qualidade</label>
          <select
            value={settings.quality}
            onChange={(e) => onChange({ quality: e.target.value as any })}
            className={`w-full border rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-purple-500 ${
              isDark
                ? 'bg-[#12131b] border-slate-700 text-white'
                : 'bg-white border-slate-300 text-slate-800'
            }`}
          >
            <option value="photo">Foto Sublimática HQ (Maior Cobertura de Tinta)</option>
            <option value="high">Alta Qualidade (Recomendado)</option>
            <option value="normal">Normal</option>
            <option value="draft">Rascunho Rápido</option>
          </select>
        </div>

        {/* Scaling & Fit to Page */}
        <div className={`p-3.5 rounded-2xl border space-y-2 col-span-1 md:col-span-2 ${
          isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <label className={`text-xs font-bold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Dimensionamento e Escala</label>
            <span className="text-xs font-mono font-bold text-purple-500">{settings.scaling}%</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="10"
              max="200"
              value={settings.scaling}
              onChange={(e) => onChange({ scaling: Number(e.target.value) })}
              className="flex-1 accent-purple-500"
            />

            <label className={`flex items-center gap-1.5 text-xs cursor-pointer ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              <input
                type="checkbox"
                checked={settings.fitToPage}
                onChange={(e) => onChange({ fitToPage: e.target.checked })}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              <span>Ajustar à Página</span>
            </label>

            <label className={`flex items-center gap-1.5 text-xs cursor-pointer ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              <input
                type="checkbox"
                checked={settings.borderless}
                onChange={(e) => onChange({ borderless: e.target.checked })}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              <span>Sem Bordas (Borderless)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onReset}
          className={`py-2 px-4 border font-bold rounded-xl text-xs cursor-pointer transition-colors ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border-slate-700'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300'
          }`}
        >
          Restaurar Padrões de Sublimação
        </button>
      </div>
    </div>
  );
};
