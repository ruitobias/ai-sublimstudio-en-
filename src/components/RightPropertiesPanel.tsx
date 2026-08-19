import React, { useState } from 'react';
import { Layer, SublimationProduct, TextWarpStyle, TextWarpCategory } from '../types';
import { TEXT_WARP_CATEGORIES, TEXT_WARP_STYLES } from '../utils/textWarp';
import { VECTOR_FONTS } from '../data/fonts';
import { useTranslation } from '../i18n';
import {
  Sliders,
  Type,
  Maximize2,
  RotateCw,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Zap,
  Box,
  CornerUpRight,
  Trash2,
  Copy,
  Shapes
} from 'lucide-react';

interface RightPropertiesPanelProps {
  activeLayer: Layer | null;
  onUpdateLayer?: (updatedLayer: Layer) => void;
  product?: SublimationProduct;
  onApplyPresetTemplate?: (templateType: 'centered_logo' | 'full_wrap' | 'name_badge') => void;
  onDeleteLayer?: (id: string) => void;
  onDuplicateLayer?: (id: string) => void;
  theme?: 'dark' | 'light';
}

export const RightPropertiesPanel: React.FC<RightPropertiesPanelProps> = ({
  activeLayer,
  onUpdateLayer,
  product,
  onApplyPresetTemplate,
  onDeleteLayer,
  onDuplicateLayer,
  theme = 'dark',
}) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!activeLayer) {
    return (
      <div className={`flex flex-col h-full overflow-y-auto custom-scrollbar text-xs p-4 select-none border-l transition-colors ${
        theme === 'light' ? 'bg-white text-slate-700 border-slate-200' : 'bg-[#1e1e20] text-gray-300 border-[#2d2d30]'
      }`}>
        <div className={`flex items-center gap-2 font-semibold mb-4 pb-2 border-b ${
          theme === 'light' ? 'text-purple-700 border-slate-200' : 'text-sky-400 border-[#2d2d30]'
        }`}>
          <Sliders className="w-4 h-4" />
          <span>{t('properties.objectProperties')}</span>
        </div>

        <div className={`font-mono text-[11px] text-center my-auto ${
          theme === 'light' ? 'text-slate-400' : 'text-gray-500'
        }`}>
          {t('properties.noSelectionHint')}
        </div>

        {/* Quick Sublimation Layout Templates */}
        <div className={`mt-auto border-t pt-3 flex flex-col gap-2 ${
          theme === 'light' ? 'border-slate-200' : 'border-[#2d2d30]'
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${
            theme === 'light' ? 'text-slate-400' : 'text-gray-400'
          }`}>
            {t('properties.quickLayoutShortcuts')}
          </span>
          <button
            onClick={() => onApplyPresetTemplate?.('centered_logo')}
            className={`w-full py-1.5 px-2 border rounded text-left flex items-center gap-2 text-[11px] cursor-pointer transition-colors ${
              theme === 'light'
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-[#252528] hover:bg-[#323236] border-[#38383c] text-gray-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('properties.centerLogoOnProduct', { product: product?.name || 'Produto' })}</span>
          </button>
          <button
            onClick={() => onApplyPresetTemplate?.('full_wrap')}
            className={`w-full py-1.5 px-2 border rounded text-left flex items-center gap-2 text-[11px] cursor-pointer transition-colors ${
              theme === 'light'
                ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-[#252528] hover:bg-[#323236] border-[#38383c] text-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>{t('properties.fullWrapStamp300')}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full overflow-y-auto custom-scrollbar text-xs p-3 touch-scroll-y select-none gap-4 border-l transition-colors ${
      theme === 'light' ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#1e1e20] text-gray-300 border-[#2d2d30]'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between pb-2 border-b ${
        theme === 'light' ? 'border-slate-200' : 'border-[#2d2d30]'
      }`}>
        <div className={`flex items-center gap-2 font-semibold ${
          theme === 'light' ? 'text-purple-700' : 'text-sky-400'
        }`}>
          <Sliders className="w-4 h-4" />
          <span className="truncate max-w-[120px]">{t('properties.propertiesOf', { name: activeLayer.name })}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {onDuplicateLayer && (
            <button
              onClick={() => onDuplicateLayer(activeLayer.id)}
              className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
              title={t('properties.duplicateLayer')}
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          {onDeleteLayer && (
            <button
              onClick={() => onDeleteLayer(activeLayer.id)}
              className="p-1 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded transition-colors"
              title={t('properties.deleteElementDel')}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="px-1.5 py-0.5 bg-sky-500/20 text-sky-300 font-mono text-[9px] rounded uppercase">
            {activeLayer.type}
          </span>
        </div>
      </div>

      {/* Transform Box (X, Y, Width, Height, Rotation) */}
      <div className="flex flex-col gap-2 bg-[#18181a] p-2.5 rounded-lg border border-[#2d2d30]">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <Maximize2 className="w-3 h-3 text-sky-400" />
          {t('properties.transformation')}
        </span>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-mono">X:</span>
            <input
              type="number"
              value={Math.round(activeLayer.x)}
              onChange={(e) => onUpdateLayer?.({ ...activeLayer, x: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#121214] border border-[#38383c] rounded px-2 py-1 text-white font-mono"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-mono">Y:</span>
            <input
              type="number"
              value={Math.round(activeLayer.y)}
              onChange={(e) => onUpdateLayer?.({ ...activeLayer, y: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#121214] border border-[#38383c] rounded px-2 py-1 text-white font-mono"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-mono">L:</span>
            <input
              type="number"
              value={Math.round(activeLayer.width)}
              onChange={(e) =>
                onUpdateLayer?.({ ...activeLayer, width: Math.max(10, parseFloat(e.target.value) || 10) })
              }
              className="w-full bg-[#121214] border border-[#38383c] rounded px-2 py-1 text-white font-mono"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-mono">A:</span>
            <input
              type="number"
              value={Math.round(activeLayer.height)}
              onChange={(e) =>
                onUpdateLayer?.({ ...activeLayer, height: Math.max(10, parseFloat(e.target.value) || 10) })
              }
              className="w-full bg-[#121214] border border-[#38383c] rounded px-2 py-1 text-white font-mono"
            />
          </div>
        </div>

        {/* Rotation Slider */}
        <div className="flex items-center justify-between gap-2 mt-1">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <RotateCw className="w-3 h-3" /> {t('common.rotation')}:
          </span>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="range"
              min="0"
              max="360"
              value={activeLayer.rotation}
              onChange={(e) => onUpdateLayer?.({ ...activeLayer, rotation: parseInt(e.target.value) })}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <span className="font-mono text-[10px] text-sky-400 w-8 text-right">
              {activeLayer.rotation}°
            </span>
          </div>
        </div>

        {/* Quick Image Scale & Advanced Editing Actions */}
        {(activeLayer.type === 'image' || activeLayer.type === 'smart') && (
          <div className="flex flex-col gap-2 pt-2 border-t border-[#2d2d30] mt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                {t('properties.imageActions')}
              </span>
              {(activeLayer.name.toLowerCase().includes('wordart') || activeLayer.name.toLowerCase().includes('nuvem')) && (
                <span className="px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[9px] font-mono border border-pink-500/30">
                  WordArt
                </span>
              )}
            </div>

            {/* Advanced Modal Trigger Button */}
            <button
              onClick={() => {
                if ((window as any).openImageAdjustmentModal) {
                  const isWordArt = activeLayer.name.toLowerCase().includes('wordart') || activeLayer.name.toLowerCase().includes('nuvem');
                  (window as any).openImageAdjustmentModal(isWordArt ? 'words' : 'adjustments');
                }
              }}
              className="w-full py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-extrabold text-xs rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.01]"
              title="Abrir janela de edição avançada"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>
                {activeLayer.name.toLowerCase().includes('wordart') || activeLayer.name.toLowerCase().includes('nuvem')
                  ? t('properties.editWordArtWords')
                  : t('properties.advancedImageEditing')}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-1.5 mt-1">
              <button
                onClick={() => {
                  const printWidth = Math.round(((product?.defaultWidthCm || 20) / 2.54) * 150);
                  const printHeight = Math.round(((product?.defaultHeightCm || 9) / 2.54) * 150);
                  if (onUpdateLayer) {
                    onUpdateLayer({
                      ...activeLayer,
                      x: 0,
                      y: 0,
                      width: printWidth,
                      height: printHeight,
                    });
                  }
                }}
                className="px-2 py-1 bg-[#252528] hover:bg-[#323236] border border-[#38383c] text-sky-300 rounded text-[10px] font-medium transition-colors cursor-pointer"
                title="Redimensionar imagem para cobrir toda a área de estampa"
              >
                {t('properties.fillPrintArea')}
              </button>
              <button
                onClick={() => {
                  const printWidth = Math.round(((product?.defaultWidthCm || 20) / 2.54) * 150);
                  const printHeight = Math.round(((product?.defaultHeightCm || 9) / 2.54) * 150);
                  if (onUpdateLayer) {
                    onUpdateLayer({
                      ...activeLayer,
                      x: Math.round((printWidth - activeLayer.width) / 2),
                      y: Math.round((printHeight - activeLayer.height) / 2),
                    });
                  }
                }}
                className="px-2 py-1 bg-[#252528] hover:bg-[#323236] border border-[#38383c] text-gray-200 rounded text-[10px] font-medium transition-colors cursor-pointer"
                title="Centralizar imagem na área imprimível"
              >
                {t('properties.centerInPrintArea')}
              </button>
              <button
                onClick={() => {
                  onUpdateLayer?.({
                    ...activeLayer,
                    height: activeLayer.width,
                  });
                }}
                className="col-span-2 px-2 py-1 bg-[#252528] hover:bg-[#323236] border border-[#38383c] text-purple-300 rounded text-[10px] font-medium transition-colors cursor-pointer"
                title="Ajustar altura para proporção 1:1"
              >
                {t('properties.adjustSquareRatio')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Typography & Sublimation Text Warp Styles */}
      {activeLayer.type === 'text' && (
        <div className="flex flex-col gap-3 bg-[#18181a] p-3 rounded-lg border border-[#2d2d30]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-emerald-400" />
              {t('properties.typographyAndTextStyles')}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">
              {activeLayer.textWarpStyle ? activeLayer.textWarpStyle : t('properties.straight')}
            </span>
          </div>

          {/* Text String Input */}
          <textarea
            value={activeLayer.content}
            onChange={(e) => onUpdateLayer?.({ ...activeLayer, content: e.target.value })}
            rows={2}
            className="w-full bg-[#121214] border border-[#38383c] rounded p-2 text-white text-xs font-medium focus:outline-none focus:border-emerald-500"
            placeholder={t('properties.customTextPlaceholder')}
          />

          {/* Font Family & Alignment */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-gray-400">{t('properties.fontLabel')}</span>
              <select
                value={activeLayer.fontFamily || 'Arial'}
                onChange={(e) => onUpdateLayer?.({ ...activeLayer, fontFamily: e.target.value })}
                className="bg-[#121214] text-white text-xs p-1.5 rounded border border-[#38383c] focus:outline-none focus:border-purple-500"
              >
                <optgroup label={t('properties.popularSublimationFonts')}>
                  {VECTOR_FONTS.map((font) => (
                    <option key={font.id} value={font.fontFamily}>
                      {font.name} ({font.categoryLabel})
                    </option>
                  ))}
                </optgroup>
                <optgroup label={t('properties.systemFonts')}>
                  <option value="Arial">Arial (Clean)</option>
                  <option value="Impact">Impact (Bold)</option>
                  <option value="'Courier New'">Courier New (Monospaced)</option>
                  <option value="Georgia">Georgia (Serif)</option>
                  <option value="Comic Sans MS">Comic Sans (Festas)</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                  <option value="Verdana">Verdana</option>
                </optgroup>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-gray-400">{t('properties.alignmentLabel')}</span>
              <div className="flex items-center gap-1 bg-[#121214] p-1 rounded border border-[#38383c]">
                <button
                  onClick={() => onUpdateLayer?.({ ...activeLayer, textAlign: 'left' })}
                  className={`flex-1 py-1 rounded flex items-center justify-center transition-colors ${
                    activeLayer.textAlign === 'left' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  title={t('properties.alignLeft')}
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateLayer?.({ ...activeLayer, textAlign: 'center' })}
                  className={`flex-1 py-1 rounded flex items-center justify-center transition-colors ${
                    !activeLayer.textAlign || activeLayer.textAlign === 'center' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  title={t('properties.alignCenter')}
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateLayer?.({ ...activeLayer, textAlign: 'right' })}
                  className={`flex-1 py-1 rounded flex items-center justify-center transition-colors ${
                    activeLayer.textAlign === 'right' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  title={t('properties.alignRight')}
                >
                  <AlignRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Size & Weight */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[11px] text-gray-400">{t('properties.fontSizePt')}</span>
              <input
                type="number"
                value={activeLayer.fontSize || 36}
                onChange={(e) =>
                  onUpdateLayer?.({ ...activeLayer, fontSize: parseInt(e.target.value) || 12 })
                }
                className="bg-[#121214] text-white text-xs p-1 rounded border border-[#38383c] font-mono"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <span className="text-[11px] text-gray-400">{t('properties.weightLabel')}</span>
              <select
                value={activeLayer.fontWeight || 'normal'}
                onChange={(e) => onUpdateLayer?.({ ...activeLayer, fontWeight: e.target.value })}
                className="bg-[#121214] text-white text-xs p-1 rounded border border-[#38383c]"
              >
                <option value="normal">{t('properties.normal')}</option>
                <option value="bold">{t('properties.bold')}</option>
              </select>
            </div>
          </div>

          {/* Cor do Texto & Contorno */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#2d2d30]">
            <span className="text-[11px] font-bold text-gray-300">{t('properties.textColorAndStroke')}</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-400">{t('properties.primaryColor')}</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={activeLayer.color || '#000000'}
                    onChange={(e) => onUpdateLayer?.({ ...activeLayer, color: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer border border-[#38383c]"
                  />
                  <span className="font-mono text-[10px] text-gray-300">
                    {activeLayer.color || '#000000'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-400">{t('properties.strokeColorLabel')}</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={activeLayer.strokeColor || '#000000'}
                    onChange={(e) => onUpdateLayer?.({ ...activeLayer, strokeColor: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer border border-[#38383c]"
                  />
                  <span className="font-mono text-[10px] text-gray-300">
                    {activeLayer.strokeColor || t('common.none')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px]">
              <span className="text-gray-400">{t('properties.strokeWidthLabel')}</span>
              <span className="text-emerald-400 font-mono font-bold">
                {activeLayer.strokeWidth || 0}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={activeLayer.strokeWidth || 0}
              onChange={(e) =>
                onUpdateLayer?.({ ...activeLayer, strokeWidth: parseInt(e.target.value) || 0 })
              }
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-[#252528] rounded-lg"
            />
          </div>

          {/* Sublimation Text Warp Styles Gallery */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#2d2d30]">
            <span className="text-[11px] font-bold text-emerald-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <CornerUpRight className="w-3.5 h-3.5" />
                {t('properties.sublimationStylesCollection')}
              </span>
              <span className="text-[9px] text-gray-400">{t('properties.stylesCount', { count: 30 })}</span>
            </span>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#202127] text-gray-400 hover:text-white'
                }`}
              >
                {t('common.all')}
              </button>
              {TEXT_WARP_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#202127] text-gray-400 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Style Cards Grid */}
            <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto p-1 bg-[#121214] rounded-lg border border-[#2a2b30]">
              {TEXT_WARP_STYLES.filter(
                (s) => selectedCategory === 'all' || s.category === selectedCategory
              ).map((style) => {
                const isActive =
                  activeLayer.textWarpStyle === style.id ||
                  (!activeLayer.textWarpStyle && style.id === 'straight');

                return (
                  <button
                    key={style.id}
                    onClick={() => {
                      const isSpaciousStyle = [
                        'circle',
                        'logo_circle',
                        'seal',
                        'heart',
                        'emblem',
                        'spiral',
                        'star',
                        'diamond',
                        'oval',
                        'vertical_ellipse',
                        'stamp_style',
                        'ribbon',
                      ].includes(style.id);

                      onUpdateLayer?.({
                        ...activeLayer,
                        textWarpStyle: style.id,
                        textCurved: style.id !== 'straight',
                        warpIntensity: activeLayer.warpIntensity ?? style.defaultIntensity,
                        width: isSpaciousStyle ? Math.max(activeLayer.width, 320) : activeLayer.width,
                        height: isSpaciousStyle ? Math.max(activeLayer.height, 220) : activeLayer.height,
                      });
                    }}
                    className={`p-2 rounded-lg text-left flex flex-col justify-between transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-[#18181c] border-[#2c2c34] text-gray-300 hover:border-gray-500 hover:bg-[#202026]'
                    }`}
                    title={style.description}
                  >
                    <span className="text-[10px] font-bold block truncate">{style.name}</span>
                    <span className="text-[8px] text-gray-400 block truncate mt-0.5">
                      {style.categoryName}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Intensity Slider */}
            {activeLayer.textWarpStyle && activeLayer.textWarpStyle !== 'straight' && (
              <div className="flex flex-col gap-2 pt-2 border-t border-[#2d2d30] mt-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-300 font-medium">{t('properties.effectIntensity')}</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {activeLayer.warpIntensity ?? 50}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={activeLayer.warpIntensity ?? 50}
                  onChange={(e) =>
                    onUpdateLayer?.({ ...activeLayer, warpIntensity: parseInt(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-[#252528] rounded-lg"
                />

                <div className="flex items-center justify-between text-[10px] mt-1">
                  <span className="text-gray-300 font-medium">{t('properties.curveRadiusLabel')}</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {activeLayer.curveRadius || 120}px
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="300"
                  value={activeLayer.curveRadius || 120}
                  onChange={(e) =>
                    onUpdateLayer?.({ ...activeLayer, curveRadius: parseInt(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-[#252528] rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* SHAPES, LINES & VECTOR ELEMENTS PROPERTIES (Formas, Linhas, Números) */}
      {activeLayer.type === 'shape' && (
        <div className="flex flex-col gap-3 bg-[#18181a] p-3 rounded-lg border border-purple-500/30">
          <div className="flex items-center justify-between pb-1 border-b border-[#2d2d30]">
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1">
              <Shapes className="w-3.5 h-3.5 text-purple-400" />
              {t('properties.shapeAndLineProperties')}
            </span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono font-bold border border-purple-500/30">
              {activeLayer.shapeType || t('toolbar.shapes')}
            </span>
          </div>

          {/* Preenchimento / Cor da Forma */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-300 font-medium">{t('properties.fillColorLabel')}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={activeLayer.color || '#38bdf8'}
                  onChange={(e) => onUpdateLayer?.({ ...activeLayer, color: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer border border-[#38383c]"
                />
                <span className="font-mono text-[10px] text-gray-400 uppercase">
                  {activeLayer.color || '#38bdf8'}
                </span>
              </div>
            </div>

            {/* Quick Color Palette */}
            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-0.5">
              {['#000000', '#ffffff', '#ef4444', '#3b82f6', '#eab308', '#10b981', '#a855f7', '#f97316', '#ec4899', '#06b6d4'].map((presetColor) => (
                <button
                  key={'fill-' + presetColor}
                  onClick={() => onUpdateLayer?.({ ...activeLayer, color: presetColor })}
                  className={`w-4 h-4 rounded-full border transition-transform hover:scale-125 cursor-pointer flex-shrink-0 ${
                    activeLayer.color === presetColor ? 'ring-2 ring-purple-400 border-white' : 'border-[#38383c]'
                  }`}
                  style={{ backgroundColor: presetColor }}
                  title={`Usar cor ${presetColor}`}
                />
              ))}
            </div>
          </div>

          {/* Cor do Contorno / Linha */}
          <div className="flex flex-col gap-1.5 pt-2.5 border-t border-[#2d2d30]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-300 font-medium">{t('properties.strokeLineColor')}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={activeLayer.strokeColor || activeLayer.color || '#000000'}
                  onChange={(e) => onUpdateLayer?.({ ...activeLayer, strokeColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer border border-[#38383c]"
                />
                <span className="font-mono text-[10px] text-gray-400 uppercase">
                  {activeLayer.strokeColor || activeLayer.color || '#000000'}
                </span>
              </div>
            </div>

            {/* Quick Stroke Color Palette */}
            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-0.5">
              {['#000000', '#ffffff', '#ef4444', '#3b82f6', '#eab308', '#10b981', '#a855f7', '#f97316', '#ec4899', '#06b6d4'].map((presetColor) => (
                <button
                  key={'stroke-' + presetColor}
                  onClick={() => onUpdateLayer?.({ ...activeLayer, strokeColor: presetColor })}
                  className={`w-4 h-4 rounded-full border transition-transform hover:scale-125 cursor-pointer flex-shrink-0 ${
                    activeLayer.strokeColor === presetColor ? 'ring-2 ring-purple-400 border-white' : 'border-[#38383c]'
                  }`}
                  style={{ backgroundColor: presetColor }}
                  title={`Usar contorno ${presetColor}`}
                />
              ))}
            </div>
          </div>

          {/* Grossura e Espessura da Forma / Linha */}
          <div className="flex flex-col gap-2 pt-2.5 border-t border-[#2d2d30]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-200 font-bold flex items-center gap-1">
                <span>{t('properties.thicknessWidth')}</span>
              </span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={activeLayer.strokeWidth ?? 0}
                  onChange={(e) =>
                    onUpdateLayer?.({
                      ...activeLayer,
                      strokeWidth: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="w-12 bg-[#121214] border border-[#38383c] rounded px-1.5 py-0.5 text-right text-purple-300 font-mono text-xs font-bold focus:outline-none focus:border-purple-500"
                />
                <span className="text-[10px] text-gray-400 font-mono">px</span>
              </div>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="0"
              max="50"
              value={activeLayer.strokeWidth ?? 0}
              onChange={(e) =>
                onUpdateLayer?.({ ...activeLayer, strokeWidth: parseInt(e.target.value) || 0 })
              }
              className="w-full accent-purple-500 cursor-pointer h-1.5 bg-[#252528] rounded-lg"
            />

            {/* Quick Thickness Presets */}
            <div className="flex flex-wrap gap-1 mt-1">
              {[
                { label: '0px', value: 0, title: t('properties.noStroke') },
                { label: '2px', value: 2, title: t('properties.thin') },
                { label: '5px', value: 5, title: t('properties.medium') },
                { label: '10px', value: 10, title: t('properties.thick') },
                { label: '20px', value: 20, title: t('properties.thicknessWidth') },
                { label: '35px', value: 35, title: t('properties.extraThick') },
              ].map((preset) => {
                const isActive = (activeLayer.strokeWidth ?? 0) === preset.value;
                return (
                  <button
                    key={'preset-thick-' + preset.value}
                    onClick={() => onUpdateLayer?.({ ...activeLayer, strokeWidth: preset.value })}
                    className={`px-2 py-1 text-[10px] font-bold rounded-md border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-purple-600 text-white border-purple-400 shadow-sm scale-105'
                        : 'bg-[#202127] text-gray-300 hover:text-white border-[#30313a] hover:border-purple-500/50'
                    }`}
                    title={preset.title}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Colors & Fill (General) */}
      <div className="flex flex-col gap-2 bg-[#18181a] p-2.5 rounded-lg border border-[#2d2d30]">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <Palette className="w-3 h-3 text-purple-400" />
          {t('properties.stampColors')}
        </span>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-300">{t('properties.primaryColor')}</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={activeLayer.color || '#000000'}
              onChange={(e) => onUpdateLayer?.({ ...activeLayer, color: e.target.value })}
              className="w-6 h-6 rounded cursor-pointer border border-[#38383c]"
            />
            <span className="font-mono text-[10px] text-gray-400">
              {activeLayer.color || '#000000'}
            </span>
          </div>
        </div>
      </div>

      {/* Delete / Duplicate Layer Action Bar */}
      <div className="mt-auto pt-2 border-t border-[#2d2d30] flex items-center gap-2">
        {onDuplicateLayer && (
          <button
            onClick={() => onDuplicateLayer(activeLayer.id)}
            className="flex-1 py-1.5 px-3 bg-[#252528] hover:bg-[#323236] border border-[#38383c] text-gray-200 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{t('properties.duplicateBtn')}</span>
          </button>
        )}
        {onDeleteLayer && (
          <button
            onClick={() => onDeleteLayer(activeLayer.id)}
            className="flex-1 py-1.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            title={t('properties.deleteElementDel')}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t('properties.deleteElementBtn')}</span>
          </button>
        )}
      </div>
    </div>
  );
};

