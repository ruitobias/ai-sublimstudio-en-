import React from 'react';

interface RulersProps {
  canvasWidth: number;
  canvasHeight: number;
  mouseX?: number;
  mouseY?: number;
  zoomLevel?: number;
  darkMode?: boolean;
}

export const Rulers: React.FC<RulersProps> = ({
  canvasWidth,
  canvasHeight,
  mouseX = 0,
  mouseY = 0,
  zoomLevel = 100,
  darkMode = true
}) => {
  const step = 50; // Every 50px tick
  const ticksX = Math.floor(canvasWidth / step);

  return (
    <div
      className={`relative w-full h-6 border-b flex items-center select-none z-30 shrink-0 text-[9px] font-mono overflow-hidden transition-colors ${
        darkMode ? 'bg-[#0B0F17] border-[#1F2937] text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      {/* Top Left Corner Marker */}
      <div
        className={`w-6 h-6 border-r flex items-center justify-center font-bold text-cyan-500 text-[10px] shrink-0 ${
          darkMode ? 'border-[#1F2937] bg-[#0d121c]' : 'border-slate-200 bg-slate-200'
        }`}
      >
        px
      </div>

      {/* Horizontal Ruler Track */}
      <div className="relative flex-1 h-full overflow-hidden">
        {Array.from({ length: ticksX + 1 }).map((_, i) => {
          const px = i * step;
          return (
            <div
              key={`h-${i}`}
              className={`absolute top-0 h-full border-l flex flex-col justify-between pl-0.5 ${
                darkMode ? 'border-[#222c3d]' : 'border-slate-300'
              }`}
              style={{ left: `${(px / canvasWidth) * 100}%` }}
            >
              <span className={`leading-tight text-[8px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {px}
              </span>
              <div className={`w-full border-b ${darkMode ? 'border-[#1F2937]' : 'border-slate-200'}`}></div>
            </div>
          );
        })}

        {/* Live Mouse Position Indicator */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-cyan-500 z-10 pointer-events-none transition-all duration-75"
          style={{ left: `${Math.max(0, Math.min(100, (mouseX / canvasWidth) * 100))}%` }}
        >
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full -ml-[2.5px] top-0"></div>
        </div>
      </div>
    </div>
  );
};
