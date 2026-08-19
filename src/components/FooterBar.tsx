import React from 'react';
import { ZoomIn, ZoomOut, Maximize2, Droplets, DollarSign, Activity } from 'lucide-react';
import { calculateInkAndCost } from '../utils/pressEngine';
import { useTranslation } from '../i18n';

interface FooterBarProps {
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  mouseX?: number;
  mouseY?: number;
  objectCount: number;
  canvasWidthMm?: number;
  canvasHeightMm?: number;
  darkMode?: boolean;
}

export const FooterBar: React.FC<FooterBarProps> = ({
  zoomLevel,
  setZoomLevel,
  mouseX = 0,
  mouseY = 0,
  objectCount,
  canvasWidthMm = 297,
  canvasHeightMm = 420,
  darkMode = true
}) => {
  const { t } = useTranslation();
  const inkAndCost = calculateInkAndCost(canvasWidthMm, canvasHeightMm);

  return (
    <footer
      className={`h-7 border-t text-[10px] font-mono px-3 flex items-center justify-between select-none z-40 shrink-0 transition-colors ${
        darkMode ? 'bg-[#0B0F17] border-[#1F2937] text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}
    >
      {/* Left: Zoom Controls & Cursor Coords */}
      <div className="flex items-center gap-3">
        {/* Zoom */}
        <div
          className={`flex items-center gap-1 border px-1.5 py-0.5 rounded-md ${
            darkMode ? 'bg-[#131822] border-[#232D3F]' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            onClick={() => setZoomLevel(Math.max(25, zoomLevel - 10))}
            className={`p-0.5 cursor-pointer ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
            title={t('footer.zoomOut')}
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className="font-bold text-cyan-500 w-9 text-center">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
            className={`p-0.5 cursor-pointer ${darkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}
            title={t('footer.zoomIn')}
          >
            <ZoomIn className="w-3 h-3" />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className={`p-0.5 cursor-pointer ml-1 text-[9px] font-bold ${
              darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
            title={t('footer.zoomFit')}
          >
            100%
          </button>
        </div>

        {/* Cursor Coords */}
        <div className={`hidden sm:flex items-center gap-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <span>
            X: <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{mouseX}px</strong>
          </span>
          <span>
            Y: <strong className={darkMode ? 'text-slate-200' : 'text-slate-800'}>{mouseY}px</strong>
          </span>
        </div>
      </div>

      {/* Center: Area & Sublimation Ink Cost Stats */}
      <div className={`hidden md:flex items-center gap-4 font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
        <span>📄 {objectCount} {t('footer.objects')}</span>
        <span>📐 {inkAndCost.areaM2} m²</span>
        <span className="flex items-center gap-1 text-cyan-500">
          <Droplets className="w-3 h-3 text-cyan-500" />
          {inkAndCost.inkMl} ml {t('footer.ink')}
        </span>
        <span className="flex items-center gap-1 text-emerald-500">
          <DollarSign className="w-3 h-3 text-emerald-500" />
          R$ {inkAndCost.costBrl} {t('footer.costEst')}
        </span>
      </div>

      {/* Right: Color Space & FPS indicator */}
      <div className="flex items-center gap-2.5">
        <span
          className={`px-1.5 py-0.5 border rounded font-bold text-[9px] ${
            darkMode
              ? 'bg-purple-950/60 border-purple-500/40 text-purple-300'
              : 'bg-purple-50 border-purple-300 text-purple-700'
          }`}
        >
          CMYK Fogra39
        </span>

        <span className="flex items-center gap-1 text-emerald-500 font-bold">
          <Activity className="w-3 h-3 animate-pulse" /> 60 FPS
        </span>
      </div>
    </footer>
  );
};
