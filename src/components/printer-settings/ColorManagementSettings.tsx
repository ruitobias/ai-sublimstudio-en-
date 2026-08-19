import React from 'react';
import { PrintSettings, RenderingIntent } from '../../services/printer/PrinterTypes';
import { Palette, Sparkles, CheckCircle2 } from 'lucide-react';

interface ColorManagementSettingsProps {
  settings: PrintSettings;
  onChange: (updated: Partial<PrintSettings>) => void;
  isDark?: boolean;
}

export const ColorManagementSettings: React.FC<ColorManagementSettingsProps> = ({
  settings,
  onChange,
  isDark = true,
}) => {
  return (
    <div className="space-y-4">
      {/* Color Management Mode */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <h4 className={`text-xs font-bold flex items-center gap-2 uppercase tracking-wider ${
          isDark ? 'text-gray-200' : 'text-slate-800'
        }`}>
          <Palette className="w-4 h-4 text-purple-400" />
          Modo de Gerenciamento de Cor
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onChange({ colorManagement: 'icc' })}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              settings.colorManagement === 'icc'
                ? isDark
                  ? 'bg-purple-950/40 border-purple-500 shadow-md'
                  : 'bg-purple-50 border-purple-400 shadow-md'
                : isDark
                ? 'bg-[#12131b] border-slate-800 text-gray-400 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Perfil ICC do Sublima</span>
              {settings.colorManagement === 'icc' && <CheckCircle2 className="w-4 h-4 text-purple-500" />}
            </div>
            <p className={`text-[10px] leading-tight ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              A aplicação aplica correção cromática rigorosa antes de enviar os dados ao spooler.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ colorManagement: 'printer' })}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              settings.colorManagement === 'printer'
                ? isDark
                  ? 'bg-purple-950/40 border-purple-500 shadow-md'
                  : 'bg-purple-50 border-purple-400 shadow-md'
                : isDark
                ? 'bg-[#12131b] border-slate-800 text-gray-400 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Driver da Impressora</span>
              {settings.colorManagement === 'printer' && <CheckCircle2 className="w-4 h-4 text-purple-500" />}
            </div>
            <p className={`text-[10px] leading-tight ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Deixa a calibração de cor sob responsabilidade do driver Epson/Canon/Brother.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChange({ colorManagement: 'application' })}
            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
              settings.colorManagement === 'application'
                ? isDark
                  ? 'bg-purple-950/40 border-purple-500 shadow-md'
                  : 'bg-purple-50 border-purple-400 shadow-md'
                : isDark
                ? 'bg-[#12131b] border-slate-800 text-gray-400 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>RGB Direto (Sem Perfil)</span>
              {settings.colorManagement === 'application' && <CheckCircle2 className="w-4 h-4 text-purple-500" />}
            </div>
            <p className={`text-[10px] leading-tight ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Envia os pixels RGB nativos sem transformações ICC intermediárias.
            </p>
          </button>
        </div>
      </div>

      {/* Rendering Intent */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        isDark ? 'bg-[#0a0b10] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <h4 className={`text-xs font-bold flex items-center gap-2 uppercase tracking-wider ${
          isDark ? 'text-gray-200' : 'text-slate-800'
        }`}>
          <Sparkles className="w-4 h-4 text-purple-400" />
          Intenção de Renderização (Rendering Intent)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`text-xs font-semibold block mb-1 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Intenção Cromática</label>
            <select
              value={settings.renderingIntent}
              onChange={(e) => onChange({ renderingIntent: e.target.value as RenderingIntent })}
              className={`w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:border-purple-500 ${
                isDark
                  ? 'bg-[#12131b] border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              <option value="relative">Relativo Colorimétrico (Recomendado para Sublimação)</option>
              <option value="perceptual">Perceptual (Suaviza gradientes e fotos)</option>
              <option value="saturation">Saturação (Cores vivas para Logos/Vetores)</option>
              <option value="absolute">Absoluto Colorimétrico</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#12131b] rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-white block">Compensação de Ponto Preto</span>
              <span className="text-[10px] text-gray-400">Evita perda de detalhes nas sombras escuras.</span>
            </div>
            <input
              type="checkbox"
              checked={settings.blackPointCompensation}
              onChange={(e) => onChange({ blackPointCompensation: e.target.checked })}
              className="w-4 h-4 text-purple-600 rounded border-slate-700 focus:ring-purple-500 bg-[#0a0b10]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
