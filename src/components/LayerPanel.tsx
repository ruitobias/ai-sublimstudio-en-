import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  FolderPlus,
  Layers,
  Box,
  SlidersHorizontal,
  Type,
  Square,
  Paintbrush,
  Image as ImageIcon,
  Scissors,
  Wand2
} from 'lucide-react';
import { Layer, BlendMode, LayerFilters } from '../types';
import { useTranslation } from '../i18n';

interface LayerPanelProps {
  layers: Layer[];
  activeLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onAddLayer: (type: 'text' | 'shape' | 'image') => void;
  onDeleteLayer: (id: string) => void;
  onDuplicateLayer: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onUpdateLayer: (updatedLayer: Layer) => void;
  onReorderLayers: (reorderedLayers: Layer[]) => void;
  theme?: 'dark' | 'light';
}

export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  activeLayerId,
  onSelectLayer,
  onAddLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onToggleVisibility,
  onToggleLock,
  onUpdateLayer,
  onReorderLayers,
  theme = 'dark',
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'layers' | 'adjustments'>('layers');

  const activeLayer = layers.find((l) => l.id === activeLayerId);

  const blendModes: { value: BlendMode; label: string }[] = [
    { value: 'normal', label: 'Normal' },
    { value: 'multiply', label: 'Multiply / Multiplicação' },
    { value: 'screen', label: 'Screen / Divisão' },
    { value: 'overlay', label: 'Overlay / Sobrepor' },
    { value: 'soft-light', label: 'Soft Light / Luz Suave' },
    { value: 'hard-light', label: 'Hard Light / Luz Direta' },
    { value: 'color-burn', label: 'Color Burn' },
    { value: 'color-dodge', label: 'Color Dodge' },
    { value: 'darken', label: 'Darken' },
    { value: 'lighten', label: 'Lighten' },
    { value: 'difference', label: 'Difference' },
  ];

  const moveLayerUp = (index: number) => {
    if (index >= layers.length - 1) return;
    const newLayers = [...layers];
    const temp = newLayers[index];
    newLayers[index] = newLayers[index + 1];
    newLayers[index + 1] = temp;
    onReorderLayers(newLayers);
  };

  const moveLayerDown = (index: number) => {
    if (index <= 0) return;
    const newLayers = [...layers];
    const temp = newLayers[index];
    newLayers[index] = newLayers[index - 1];
    newLayers[index - 1] = temp;
    onReorderLayers(newLayers);
  };

  const updateFilters = (key: keyof LayerFilters, val: number) => {
    if (!activeLayer) return;
    const currentFilters = activeLayer.filters || {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      hue: 0,
      blur: 0,
      vibrance: 0,
    };

    onUpdateLayer({
      ...activeLayer,
      filters: {
        ...currentFilters,
        [key]: val,
      },
    });
  };

  return (
    <div className={`flex flex-col h-full text-xs select-none border-l transition-colors ${
      theme === 'light' ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#1e1e20] text-gray-300 border-[#2d2d30]'
    }`}>
      {/* Panel Tab Switcher */}
      <div className={`flex items-center border-b ${
        theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-[#2d2d30] bg-[#18181a]'
      }`}>
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-2 text-center font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'layers'
              ? theme === 'light' ? 'text-purple-700 border-b-2 border-purple-600 bg-white' : 'text-sky-400 border-b-2 border-sky-500 bg-[#1e1e20]'
              : theme === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t('layers.tabLayers')} ({layers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('adjustments')}
          className={`flex-1 py-2 text-center font-semibold transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'adjustments'
              ? 'text-sky-400 border-b-2 border-sky-500 bg-[#1e1e20]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{t('layers.tabAdjustments')}</span>
        </button>
      </div>

      {activeTab === 'layers' ? (
        <>
          {/* Top Layer Controls (Blend Mode & Opacity) */}
          <div className="p-2.5 border-b border-[#2d2d30] flex flex-col gap-2 bg-[#18181a]/50">
            {/* Blend Mode Dropdown */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-gray-400">{t('layers.blendMode')}</span>
              <select
                disabled={!activeLayer}
                value={activeLayer?.blendMode || 'normal'}
                onChange={(e) =>
                  activeLayer &&
                  onUpdateLayer({ ...activeLayer, blendMode: e.target.value as BlendMode })
                }
                className="bg-[#121214] text-white text-[11px] px-2 py-1 rounded-md border border-[#38383c] focus:outline-none flex-1 font-medium disabled:opacity-40"
              >
                {blendModes.map((bm) => (
                  <option key={bm.value} value={bm.value}>
                    {bm.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Opacity Slider */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-gray-400">{t('layers.opacity')}</span>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  disabled={!activeLayer}
                  value={activeLayer?.opacity ?? 100}
                  onChange={(e) =>
                    activeLayer &&
                    onUpdateLayer({ ...activeLayer, opacity: parseInt(e.target.value) })
                  }
                  className="w-full accent-sky-500 cursor-pointer disabled:opacity-40"
                />
                <span className="font-mono text-[10px] w-8 text-right text-sky-400">
                  {activeLayer?.opacity ?? 100}%
                </span>
              </div>
            </div>
          </div>

          {/* Layer Items List Stack (Top to Bottom) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar touch-scroll-y p-2 flex flex-col gap-1">
            {layers.length === 0 ? (
              <div className="p-4 text-center text-gray-500 font-mono text-[11px]">
                {t('layers.emptyNotice')}
              </div>
            ) : (
              [...layers].reverse().map((layer, reversedIdx) => {
                const actualIndex = layers.length - 1 - reversedIdx;
                const isSelected = activeLayerId === layer.id;

                return (
                  <div
                    key={layer.id}
                    onClick={() => onSelectLayer(layer.id)}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-600/20 border-sky-500 text-white font-semibold shadow-sm'
                        : 'bg-[#18181a] border-[#2d2d30] hover:bg-[#252528] text-gray-300'
                    }`}
                  >
                    {/* Layer Visibility Eye */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleVisibility(layer.id);
                      }}
                      className="text-gray-400 hover:text-white"
                      title={t('layers.visibility')}
                    >
                      {layer.visible ? (
                        <Eye className="w-3.5 h-3.5 text-sky-400" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-rose-400 opacity-60" />
                      )}
                    </button>

                    {/* Layer Icon Type Badge */}
                    <div className="w-6 h-6 rounded bg-[#121214] border border-[#38383c] flex items-center justify-center text-gray-300 shrink-0">
                      {layer.type === 'text' && <Type className="w-3.5 h-3.5 text-emerald-400" />}
                      {layer.type === 'shape' && <Square className="w-3.5 h-3.5 text-amber-400" />}
                      {layer.type === 'brush' && <Paintbrush className="w-3.5 h-3.5 text-indigo-400" />}
                      {layer.type === 'image' && <ImageIcon className="w-3.5 h-3.5 text-purple-400" />}
                      {layer.type === 'smart' && <Box className="w-3.5 h-3.5 text-sky-400" />}
                    </div>

                    {/* Layer Name & Details */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="truncate text-[12px]">{layer.name}</span>
                        {layer.isSmartObject && (
                          <span className="px-1 py-0.2 bg-sky-500/20 text-sky-300 text-[8px] rounded font-mono">
                            SMART
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-gray-500 font-mono capitalize">
                        {layer.type} • {layer.blendMode}
                      </span>
                    </div>

                    {/* Lock Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLock(layer.id);
                      }}
                      className="text-gray-400 hover:text-white"
                      title={t('layers.lock')}
                    >
                      {layer.locked ? (
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300" />
                      )}
                    </button>

                    {/* Reorder Up/Down */}
                    <div className="flex flex-col gap-0.5 opacity-60 hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveLayerUp(actualIndex);
                        }}
                        className="text-gray-400 hover:text-white"
                        title={t('layers.moveUp')}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveLayerDown(actualIndex);
                        }}
                        className="text-gray-400 hover:text-white"
                        title={t('layers.moveDown')}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Layer Action Bottom Bar */}
          <div className="p-2 border-t border-[#2d2d30] bg-[#18181a] flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => onAddLayer('text')}
                className="px-2 py-1 bg-[#252528] hover:bg-[#323236] border border-[#38383c] rounded text-gray-200 flex items-center gap-1"
                title={t('layers.addText')}
              >
                <Plus className="w-3 h-3 text-sky-400" />
                <span>{t('layers.text')}</span>
              </button>
              <button
                onClick={() => onAddLayer('shape')}
                className="px-2 py-1 bg-[#252528] hover:bg-[#323236] border border-[#38383c] rounded text-gray-200 flex items-center gap-1"
                title={t('layers.addShape')}
              >
                <Plus className="w-3 h-3 text-amber-400" />
                <span>{t('layers.shape')}</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={!activeLayerId}
                onClick={() => activeLayerId && onDuplicateLayer(activeLayerId)}
                className="p-1.5 bg-[#252528] hover:bg-[#323236] border border-[#38383c] rounded text-gray-300 hover:text-white disabled:opacity-30"
                title={t('layers.duplicate')}
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={!activeLayerId}
                onClick={() => activeLayerId && onDeleteLayer(activeLayerId)}
                className="p-1.5 bg-[#252528] hover:bg-rose-900/40 border border-[#38383c] rounded text-rose-400 hover:text-rose-200 disabled:opacity-30"
                title={t('layers.delete')}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Adjustments Tab (Brightness, Contrast, Saturation, Hue, Blur, Vibrance) */
        <div className="p-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-1">
          {!activeLayer ? (
            <div className="p-4 text-center text-gray-500 font-mono text-[11px]">
              {t('layers.selectLayerPrompt')}
            </div>
          ) : (
            <>
              <div className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
                {t('layers.layerAdjustments', { name: activeLayer.name })}
              </div>

              {/* Brightness */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span>{t('layers.brightness')}</span>
                  <span className="font-mono text-sky-400">
                    {activeLayer.filters?.brightness || 0}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={activeLayer.filters?.brightness || 0}
                  onChange={(e) => updateFilters('brightness', parseInt(e.target.value))}
                  className="accent-sky-500 cursor-pointer"
                />
              </div>

              {/* Contrast */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span>{t('layers.contrast')}</span>
                  <span className="font-mono text-sky-400">
                    {activeLayer.filters?.contrast || 0}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={activeLayer.filters?.contrast || 0}
                  onChange={(e) => updateFilters('contrast', parseInt(e.target.value))}
                  className="accent-sky-500 cursor-pointer"
                />
              </div>

              {/* Saturation */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span>{t('layers.sublimationSaturation')}</span>
                  <span className="font-mono text-sky-400">
                    {activeLayer.filters?.saturation || 0}
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={activeLayer.filters?.saturation || 0}
                  onChange={(e) => updateFilters('saturation', parseInt(e.target.value))}
                  className="accent-sky-500 cursor-pointer"
                />
              </div>

              {/* Hue Rotation */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span>{t('layers.hueRotation')}</span>
                  <span className="font-mono text-sky-400">
                    {activeLayer.filters?.hue || 0}°
                  </span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={activeLayer.filters?.hue || 0}
                  onChange={(e) => updateFilters('hue', parseInt(e.target.value))}
                  className="accent-sky-500 cursor-pointer"
                />
              </div>

              {/* Convert to Smart Object Button */}
              <button
                onClick={() =>
                  onUpdateLayer({ ...activeLayer, isSmartObject: !activeLayer.isSmartObject })
                }
                className="mt-2 py-2 px-3 bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 rounded-lg text-sky-300 font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>
                  {activeLayer.isSmartObject
                    ? t('layers.rasterizeSmart')
                    : t('layers.convertToSmart')}
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
