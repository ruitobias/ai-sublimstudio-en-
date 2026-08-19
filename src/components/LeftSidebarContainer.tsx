import React, { useState } from 'react';
import {
  FolderOpen,
  Layers,
  History,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Plus,
  Sparkles,
  ChevronLeft,
  Search,
  Wand2,
  Scissors,
  Maximize2,
  Upload,
  Type,
  Coffee,
  Check,
  Shapes,
  Square,
  Circle,
  Triangle,
  Star,
  Heart,
  ArrowRight,
  ArrowLeftRight,
  Minus,
  Spline,
  Clipboard
} from 'lucide-react';
import { VectorElement, HistoryCommand, SublimationProduct, Layer } from '../types';
import { setAsset } from '../lib/imageAssetStore';
import { PRESET_TEMPLATES, TEMPLATE_CATEGORIES } from '../utils/libraryEngine';
import { PRODUCTS_LIBRARY } from '../data/products';
import { VECTOR_TEXT_PRESETS, VectorTextPreset } from '../data/vectorTextPresets';
import { SidebarTabType } from './LeftToolbar';
import { AIPanel } from './AIPanel';
import { LayerPanel } from './LayerPanel';

interface LeftSidebarContainerProps {
  elements: VectorElement[];
  setElements: React.Dispatch<React.SetStateAction<VectorElement[]>>;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  historyStack: HistoryCommand[];
  currentHistoryIndex: number;
  onSelectHistoryStep: (index: number) => void;
  onApplyTemplate: (templateElements: VectorElement[]) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  onDuplicateLayer: (id: string) => void;
  currentProduct?: SublimationProduct;
  setProduct?: (product: SublimationProduct) => void;
  onOpenAIConsole?: () => void;
  onOpenPresetGallery?: () => void;
  activeSidebarTab: SidebarTabType | null;
  setActiveSidebarTab: (tab: SidebarTabType | null) => void;
  onPasteFromClipboard?: () => void;
  darkMode?: boolean;
}

const HD_BACKGROUNDS = [
  { id: 'bg_floral', name: 'Floral', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80' },
  { id: 'bg_neon', name: 'Neon', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80' },
  { id: 'bg_aquarela', name: 'Aquarela', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80' },
  { id: 'bg_marmorizado', name: 'Marmorizado', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80' },
  { id: 'bg_arte_moderna', name: 'Arte Moderna', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80' },
  { id: 'bg_praia_tropical', name: 'Praia Tropical', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80' },
  { id: 'bg_cyberpunk', name: 'Cyberpunk Light', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80' },
  { id: 'bg_tiedye', name: 'Tie-Dye Rainbow', url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80' }
];

export const LeftSidebarContainer: React.FC<LeftSidebarContainerProps> = ({
  elements,
  setElements,
  selectedIds,
  setSelectedIds,
  historyStack,
  currentHistoryIndex,
  onSelectHistoryStep,
  onApplyTemplate,
  onToggleVisibility,
  onToggleLock,
  onDeleteLayer,
  onDuplicateLayer,
  currentProduct,
  setProduct,
  onOpenAIConsole,
  onOpenPresetGallery,
  activeSidebarTab,
  setActiveSidebarTab,
  onPasteFromClipboard,
  darkMode = true
}) => {
  // Search query states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModelCategory, setSelectedModelCategory] = useState<string>('Todos');
  const [textSubTab, setTextSubTab] = useState<'estampas' | 'fontes' | 'texto' | 'efeitos'>('estampas');
  const [elementFilter, setElementFilter] = useState<'Todas' | 'Linhas' | 'Retângulos' | 'Formas Básicas'>('Todas');

  if (!activeSidebarTab) return null;

  // Convert VectorElement list to Layer list for LayerPanel
  const layers: Layer[] = elements.map((el) => ({
    id: el.id,
    name: el.name,
    type: el.type,
    visible: el.visible,
    locked: el.locked,
    opacity: el.opacity,
    blendMode: 'normal',
    x: el.x,
    y: el.y,
    width: el.w,
    height: el.h,
    rotation: el.rotation,
    content: el.content,
    color: el.fill,
    fontSize: el.fontSize,
    fontFamily: el.fontFamily,
    fontWeight: el.fontWeight,
    textAlign: el.textAlign,
    textWarpStyle: el.textWarpStyle,
    shapeType: el.shapeType,
    strokeColor: el.stroke,
    strokeWidth: el.strokeWidth,
    filters: {
      brightness: el.filterBrightness || 0,
      contrast: el.filterContrast || 0,
      saturation: el.filterSaturation || 0,
      hue: 0,
      blur: 0,
      vibrance: 0,
    },
  }));

  const activeLayer = layers.find((l) => selectedIds.includes(l.id)) || null;

  const handleUpdateLayer = (updatedLayer: Layer) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === updatedLayer.id) {
          return {
            ...el,
            name: updatedLayer.name,
            visible: updatedLayer.visible,
            locked: updatedLayer.locked,
            opacity: updatedLayer.opacity,
            fill: updatedLayer.color || el.fill,
            stroke: updatedLayer.strokeColor || el.stroke,
            strokeWidth: updatedLayer.strokeWidth ?? el.strokeWidth,
            fontSize: updatedLayer.fontSize || el.fontSize,
            filterBrightness: updatedLayer.filters?.brightness,
            filterContrast: updatedLayer.filters?.contrast,
            filterSaturation: updatedLayer.filters?.saturation,
          };
        }
        return el;
      })
    );
  };

  const handleReorderLayers = (reorderedLayers: Layer[]) => {
    const layerMap = new Map<string, VectorElement>(elements.map((el) => [el.id, el]));
    const newElements: VectorElement[] = [];
    reorderedLayers.forEach((l) => {
      const existing = layerMap.get(l.id);
      if (existing) newElements.push(existing);
    });
    setElements(newElements);
  };

  const handleAddAIGeneratedImage = (imageUrl: string, title: string) => {
    const newEl: VectorElement = {
      id: `el_ai_${Date.now()}`,
      name: `IA: ${title}`,
      type: 'image',
      x: 100,
      y: 100,
      width: 500,
      height: 500,
      rotation: 0,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      content: imageUrl,
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedIds([newEl.id]);
  };

  const handleApplyAITool = (action: 'remove_bg' | 'vectorize' | 'upscale' | 'color_replace') => {
    if (selectedIds.length === 0) return;
    const targetId = selectedIds[0];
    setElements((prev) =>
      prev.map((el) => {
        if (el.id === targetId) {
          if (action === 'remove_bg') {
            return { ...el, name: `${el.name} (Fundo Removido)` };
          }
          if (action === 'vectorize') {
            return { ...el, name: `${el.name} (Vetorizado)` };
          }
          if (action === 'upscale') {
            return { ...el, name: `${el.name} (HQ 300 DPI)` };
          }
        }
        return el;
      })
    );
  };

  // Handler to add custom vector text preset
  const handleAddPresetText = (preset: VectorTextPreset) => {
    const newEl: VectorElement = {
      id: `el_preset_${Date.now()}`,
      name: `Texto ${preset.title}`,
      type: 'text',
      x: 180,
      y: 300,
      width: preset.width || 320,
      height: preset.height || 140,
      rotation: 0,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      color: preset.color,
      strokeColor: preset.strokeColor || 'transparent',
      strokeWidth: preset.strokeWidth || 0,
      content: preset.content,
      fontSize: preset.fontSize || 38,
      fontFamily: preset.fontFamily,
      textAlign: 'center',
      textWarpStyle: preset.warpStyle
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedIds([newEl.id]);
  };

  // Handler to add generic text
  const handleAddGenericText = (text: string, fontSize: number, fontWeight: 'normal' | 'bold' = 'bold') => {
    const newEl: VectorElement = {
      id: `el_txt_${Date.now()}`,
      name: text,
      type: 'text',
      x: 200,
      y: 400,
      width: 400,
      height: 100,
      rotation: 0,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      color: '#00D9FF',
      strokeColor: '#0f172a',
      strokeWidth: 2,
      content: text,
      fontSize,
      fontFamily: 'Montserrat',
      fontWeight,
      textAlign: 'center'
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedIds([newEl.id]);
  };

  // Handler to add shape
  const handleAddShape = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'star' | 'heart' | 'line', name: string) => {
    const newEl: VectorElement = {
      id: `el_shape_${Date.now()}`,
      name,
      type: 'shape',
      shapeType: shapeType === 'line' ? 'rectangle' : shapeType,
      x: 250,
      y: 350,
      width: shapeType === 'line' ? 300 : 180,
      height: shapeType === 'line' ? 8 : 180,
      rotation: 0,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      color: shapeType === 'line' ? '#00D9FF' : '#3b82f6',
      strokeColor: '#ffffff',
      strokeWidth: 2,
      content: ''
    };
    setElements((prev) => [...prev, newEl]);
    setSelectedIds([newEl.id]);
  };

  // Handler for image upload (prefer Blob/objectURL + imageAssetStore)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      try {
        const bitmap = await createImageBitmap(file);
        setAsset(objectUrl, { blob: file, url: objectUrl, bitmap });
      } catch (err) {
        setAsset(objectUrl, { blob: file, url: objectUrl });
      }

      const img = new Image();
      img.onload = () => {
        const naturalW = img.naturalWidth || 400;
        const naturalH = img.naturalHeight || 400;
        const aspect = naturalW / naturalH;

        const maxW = 500;
        const maxH = 500;
        let calcW = naturalW;
        let calcH = naturalH;

        if (calcW > maxW || calcH > maxH) {
          if (calcW / maxW > calcH / maxH) {
            calcW = maxW;
            calcH = Math.round(maxW / aspect);
          } else {
            calcH = maxH;
            calcW = Math.round(maxH * aspect);
          }
        }

        const newEl: VectorElement = {
          id: `el_img_${Date.now()}`,
          name: file.name,
          type: 'image',
          x: 100,
          y: 100,
          width: Math.max(20, calcW),
          height: Math.max(20, calcH),
          rotation: 0,
          visible: true,
          locked: false,
          opacity: 100,
          blendMode: 'normal',
          strokeColor: 'transparent',
          strokeWidth: 0,
          content: objectUrl
        };
        setElements((prev) => [...prev, newEl]);
        setSelectedIds([newEl.id]);
      };
      img.src = objectUrl;
      e.target.value = '';
    }
  };

  // Handler for HD background add
  const handleAddBackground = (bgUrl: string, bgName: string) => {
    const newEl: VectorElement = {
      id: `el_bg_${Date.now()}`,
      name: `Fundo ${bgName}`,
      type: 'image',
      x: 0,
      y: 0,
      width: 1080,
      height: 1350,
      rotation: 0,
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      strokeColor: 'transparent',
      strokeWidth: 0,
      content: bgUrl
    };
    // Put background at the bottom of element stack
    setElements((prev) => [newEl, ...prev]);
  };

  const defaultSublimationProduct: SublimationProduct = currentProduct ? {
    id: currentProduct.id,
    name: currentProduct.name,
    category: currentProduct.category,
    defaultWidthCm: Math.round(currentProduct.widthMm / 10),
    defaultHeightCm: Math.round(currentProduct.heightMm / 10),
    printAspect: currentProduct.printAspect,
    model3D: (currentProduct.model3D as any) || 'mug',
    description: currentProduct.description,
    bgColor: currentProduct.bgColor,
    material: currentProduct.material,
    samplePrints: []
  } : {
    id: 'mug_11oz',
    name: 'Caneca 11oz',
    category: 'Canecas',
    defaultWidthCm: 20,
    defaultHeightCm: 9,
    printAspect: '204 x 90 mm',
    model3D: 'mug',
    description: 'Caneca resinada 325ml',
    bgColor: '#ffffff',
    material: 'Cerâmica',
    samplePrints: []
  };

  return (
    <aside
      className={`w-72 border-r flex flex-col select-none z-20 shrink-0 text-xs transition-colors h-full ${
        darkMode ? 'bg-[#0B0F17] border-[#1F2937] text-slate-200' : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Sidebar Header with Collapse Button */}
      <div
        className={`flex items-center justify-between p-3 border-b font-bold ${
          darkMode ? 'border-[#1F2937] bg-[#0E131F]' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {activeSidebarTab === 'ai' && <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />}
          {activeSidebarTab === 'products' && <Coffee className="w-4 h-4 text-cyan-400" />}
          {activeSidebarTab === 'uploads' && <Upload className="w-4 h-4 text-cyan-400" />}
          {activeSidebarTab === 'text' && <Type className="w-4 h-4 text-cyan-400" />}
          {activeSidebarTab === 'elements' && <Shapes className="w-4 h-4 text-cyan-400" />}
          {activeSidebarTab === 'models' && <FolderOpen className="w-4 h-4 text-cyan-400" />}
          {activeSidebarTab === 'layers' && <Layers className="w-4 h-4 text-cyan-400" />}

          <span className="truncate">
            {activeSidebarTab === 'ai' && 'Estúdio IA Generativo'}
            {activeSidebarTab === 'products' && 'Produtos Sublimáveis'}
            {activeSidebarTab === 'uploads' && 'Fotos E Uploads'}
            {activeSidebarTab === 'text' && 'Adicionar Texto'}
            {activeSidebarTab === 'elements' && 'Elementos & Formas'}
            {activeSidebarTab === 'models' && 'Modelos & Presets'}
            {activeSidebarTab === 'layers' && 'Gerenciador de Camadas'}
          </span>
        </div>

        <button
          onClick={() => setActiveSidebarTab(null)}
          className={`p-1 rounded-lg transition-colors cursor-pointer ${
            darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-500'
          }`}
          title="Fechar Painel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* PANEL 1: ESTÚDIO IA */}
      {activeSidebarTab === 'ai' && (
        <AIPanel
          product={defaultSublimationProduct}
          onAddAIGeneratedImageToCanvas={handleAddAIGeneratedImage}
          onApplyAIToolToActiveLayer={handleApplyAITool}
          activeLayer={activeLayer}
          theme={darkMode ? 'dark' : 'light'}
        />
      )}

      {/* PANEL 2: PRODUTOS SUBLIMÁVEIS */}
      {activeSidebarTab === 'products' && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em produtos..."
              className={`w-full rounded-xl pl-8 pr-3 py-2 text-xs font-medium focus:outline-none border ${
                darkMode
                  ? 'bg-[#131822] border-[#232D3F] text-slate-100 placeholder-slate-500 focus:border-cyan-500'
                  : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
              }`}
            />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            ESCOLHA O PRODUTO PARA CRIAR
          </span>

          <div className="space-y-2">
            {PRODUCTS_LIBRARY.filter((p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((prod) => {
              const isSelected = currentProduct?.id === prod.id;
              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    if (setProduct) {
                      setProduct({
                        id: prod.id,
                        name: prod.name,
                        category: prod.category,
                        widthMm: prod.defaultWidthCm * 10,
                        heightMm: prod.defaultHeightCm * 10,
                        printAspect: prod.printAspect,
                        model3D: (prod.model3D as any) || 'mug',
                        description: prod.description,
                        bgColor: prod.bgColor,
                        material: prod.material
                      });
                    }
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500 text-white shadow-lg ring-1 ring-purple-500'
                      : darkMode
                      ? 'bg-[#131822] border-[#232D3F] hover:border-cyan-500/60 text-slate-200'
                      : 'bg-slate-50 border-slate-200 hover:border-cyan-500 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Coffee className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs truncate">{prod.name}</span>
                      <span className="text-[10px] text-slate-400 truncate">{prod.printAspect}</span>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 ml-2" />
                  ) : (
                    <Check className="w-4 h-4 text-slate-600 opacity-0 hover:opacity-100" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PANEL 3: FOTOS E UPLOADS */}
      {activeSidebarTab === 'uploads' && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em uploads..."
              className={`w-full rounded-xl pl-8 pr-3 py-2 text-xs font-medium focus:outline-none border ${
                darkMode
                  ? 'bg-[#131822] border-[#232D3F] text-slate-100 placeholder-slate-500'
                  : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Upload Button */}
          <label className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95">
            <Upload className="w-4 h-4" />
            <span>Fazer Upload de Imagem</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Paste Transparency Card */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2">
              <Clipboard className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-extrabold text-emerald-200">Área de Transparência (Ctrl + V)</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 leading-snug">
              Cole imagens com fundo transparente copiadas do Photoshop, Canva, navegador ou área de transferência mantendo o canal PNG alpha intacto.
            </p>
            <button
              onClick={() => onPasteFromClipboard?.()}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Colar da Área de Transferência (Ctrl + V)</span>
            </button>
          </div>

          {/* HD Sublimation Backgrounds Gallery */}
          <div className="space-y-2 pt-2 border-t border-[#1F2937]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              GALERIA DE FUNDOS SUBLIMÁTICOS HD
            </span>

            <div className="grid grid-cols-2 gap-2">
              {HD_BACKGROUNDS.map((bg) => (
                <div
                  key={bg.id}
                  onClick={() => handleAddBackground(bg.url, bg.name)}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-[#232D3F] cursor-pointer shadow-md hover:border-cyan-400 transition-all"
                >
                  <img src={bg.url} alt={bg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-1.5">
                    <span className="text-[10px] font-bold text-white truncate">{bg.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PANEL 4: ADICIONAR TEXTO */}
      {activeSidebarTab === 'text' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          {/* Sub-tabs */}
          <div className={`flex items-center p-1 rounded-xl border ${darkMode ? 'bg-[#131822] border-[#232D3F]' : 'bg-slate-100 border-slate-300'}`}>
            {(['estampas', 'fontes', 'texto', 'efeitos'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setTextSubTab(tab)}
                className={`flex-1 py-1.5 text-[10px] font-bold capitalize rounded-lg transition-all cursor-pointer ${
                  textSubTab === tab
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-1.5">
            <button
              onClick={() => handleAddGenericText('SEU TÍTULO AQUI', 48, 'bold')}
              className={`w-full p-2.5 rounded-xl border text-left font-black text-sm transition-all cursor-pointer ${
                darkMode ? 'bg-[#131822] border-[#232D3F] hover:border-cyan-400 text-white' : 'bg-slate-50 border-slate-300 hover:border-cyan-500 text-slate-900'
              }`}
            >
              Adicionar um Título
            </button>
            <button
              onClick={() => handleAddGenericText('Seu Subtítulo Elegante', 32, 'normal')}
              className={`w-full p-2 rounded-xl border text-left font-bold text-xs transition-all cursor-pointer ${
                darkMode ? 'bg-[#131822] border-[#232D3F] hover:border-cyan-400 text-slate-200' : 'bg-slate-50 border-slate-300 hover:border-cyan-500 text-slate-800'
              }`}
            >
              Adicionar um Subtítulo
            </button>
          </div>

          {/* Section: Estampas Tipográficas Vetoriais */}
          <div className="space-y-2 pt-2 border-t border-[#1F2937]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              ESTAMPAS TIPOGRÁFICAS VETORIAIS (1-Clique)
            </span>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar frase (ex: Mãe, Pai, Gamer)..."
                className={`w-full rounded-xl pl-8 pr-3 py-1.5 text-xs font-medium focus:outline-none border ${
                  darkMode ? 'bg-[#131822] border-[#232D3F] text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-2">
              {VECTOR_TEXT_PRESETS.filter((p) =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.content.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleAddPresetText(preset)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col gap-1.5 ${
                    darkMode
                      ? 'bg-[#131822] border-[#232D3F] hover:border-purple-500 text-slate-100'
                      : 'bg-slate-50 border-slate-200 hover:border-purple-500 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase text-purple-400">{preset.categoryLabel}</span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[8px] font-bold">Vetor</span>
                  </div>
                  <div className="py-2 text-center font-black text-lg text-amber-300 tracking-wide font-serif" style={{ color: preset.color }}>
                    {preset.content}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{preset.title}</span>
                    <span className="text-cyan-400 font-bold flex items-center gap-1">Adicionar +</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PANEL 5: ELEMENTOS & FORMAS */}
      {activeSidebarTab === 'elements' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar forma (ex: seta, balão, estrela)..."
              className={`w-full rounded-xl pl-8 pr-3 py-2 text-xs font-medium focus:outline-none border ${
                darkMode ? 'bg-[#131822] border-[#232D3F] text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
            {(['Todas', 'Linhas', 'Retângulos', 'Formas Básicas'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setElementFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer transition-all ${
                  elementFilter === cat
                    ? 'bg-purple-600 text-white shadow'
                    : darkMode
                    ? 'bg-[#131822] text-slate-400 border border-[#232D3F]'
                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Linhas de Corte & Sangria Card */}
          <div className="p-3 bg-gradient-to-r from-rose-950/40 to-purple-950/40 border border-rose-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-rose-300">
              <div className="flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-rose-400" />
                <span>Linhas de Corte & Sangria</span>
              </div>
              <span className="text-[9px] text-rose-400/80 font-mono">Impressão</span>
            </div>

            <p className="text-[10px] text-slate-300 leading-tight">
              Adicione vetores de demarcação e linhas de corte pontilhadas para acabamento perfeito de estampa.
            </p>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={() => handleAddShape('cut_line_rect' as any, 'Linha de Corte (Retângulo)')}
                className="px-2.5 py-1.5 bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-100 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 text-rose-300" />
                <span>Corte Retangular</span>
              </button>
              <button
                onClick={() => handleAddShape('cut_line_circle' as any, 'Linha de Corte (Círculo)')}
                className="px-2.5 py-1.5 bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-100 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Circle className="w-3.5 h-3.5 text-rose-300" />
                <span>Corte Circular</span>
              </button>
              <button
                onClick={() => handleAddShape('cut_line_h' as any, 'Linha de Corte Horizontal')}
                className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/30 text-rose-200 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5 text-rose-300" />
                <span>Linha Horizontal</span>
              </button>
              <button
                onClick={() => handleAddShape('cut_line_v' as any, 'Linha de Corte Vertical')}
                className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/30 text-rose-200 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5 text-rose-300 rotate-90" />
                <span>Linha Vertical</span>
              </button>
            </div>
          </div>

          {/* Formas Usadas Recentemente Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>Formas Usadas Recentemente</span>
              <span className="text-[9px] text-slate-500 font-normal">Auto-salvo</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 p-2 bg-[#131822] rounded-xl border border-[#232D3F]">
              <button onClick={() => handleAddShape('line', 'Linha')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <Minus className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('line', 'Seta')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('rectangle', 'Retângulo')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <Square className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('circle', 'Círculo')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <Circle className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('triangle', 'Triângulo')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <Triangle className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('star', 'Estrela')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <Star className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('heart', 'Coração')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <Heart className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('line', 'Curva')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <Spline className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('line', 'Seta Dupla')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <ArrowLeftRight className="w-4 h-4" />
              </button>
              <button onClick={() => handleAddShape('rectangle', 'Quadrado')} className="p-2 rounded-lg bg-[#182030] hover:bg-purple-600/30 flex items-center justify-center text-slate-200">
                <Square className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Section LINHAS */}
          <div className="space-y-2 pt-2 border-t border-[#1F2937]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">LINHAS</span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleAddShape('line', 'Linha Simples')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-cyan-400 flex items-center gap-2 text-slate-200">
                <Minus className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px]">Linha Simples</span>
              </button>
              <button onClick={() => handleAddShape('line', 'Linha com Seta')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-cyan-400 flex items-center gap-2 text-slate-200">
                <ArrowRight className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px]">Linha com Seta</span>
              </button>
              <button onClick={() => handleAddShape('line', 'Linha Seta Dupla')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-cyan-400 flex items-center gap-2 text-slate-200">
                <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px]">Linha Seta Dupla</span>
              </button>
              <button onClick={() => handleAddShape('line', 'Conector Curvo')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-cyan-400 flex items-center gap-2 text-slate-200">
                <Spline className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px]">Conector Curvo</span>
              </button>
            </div>
          </div>

          {/* Section RETÂNGULOS */}
          <div className="space-y-2 pt-2 border-t border-[#1F2937]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">RETÂNGULOS</span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleAddShape('rectangle', 'Retângulo Simples')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-amber-400 flex items-center gap-2 text-slate-200">
                <Square className="w-4 h-4 text-amber-400" />
                <span className="text-[11px]">Retângulo Simples</span>
              </button>
              <button onClick={() => handleAddShape('rectangle', 'Quadrado Arredondado')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-amber-400 flex items-center gap-2 text-slate-200">
                <Square className="w-4 h-4 text-amber-400 rounded-md" />
                <span className="text-[11px]">Cantos Arredondados</span>
              </button>
            </div>
          </div>

          {/* Section FORMAS BÁSICAS */}
          <div className="space-y-2 pt-2 border-t border-[#1F2937]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">FORMAS BÁSICAS</span>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleAddShape('circle', 'Círculo')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-purple-400 flex items-center gap-2 text-slate-200">
                <Circle className="w-4 h-4 text-purple-400" />
                <span className="text-[11px]">Círculo</span>
              </button>
              <button onClick={() => handleAddShape('triangle', 'Triângulo')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-purple-400 flex items-center gap-2 text-slate-200">
                <Triangle className="w-4 h-4 text-purple-400" />
                <span className="text-[11px]">Triângulo</span>
              </button>
              <button onClick={() => handleAddShape('star', 'Estrela 5 Pontas')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-purple-400 flex items-center gap-2 text-slate-200">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-[11px]">Estrela</span>
              </button>
              <button onClick={() => handleAddShape('heart', 'Coração Sublimação')} className="p-2.5 rounded-xl border border-[#232D3F] bg-[#131822] hover:border-purple-400 flex items-center gap-2 text-slate-200">
                <Heart className="w-4 h-4 text-rose-500" />
                <span className="text-[11px]">Coração</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PANEL 6: MODELOS & PRESETS */}
      {activeSidebarTab === 'models' && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
          {/* Full Preset Gallery Banner Button */}
          {onOpenPresetGallery && (
            <button
              onClick={onOpenPresetGallery}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:brightness-110 text-white font-extrabold rounded-xl shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-xs border border-purple-400/40"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Abrir Galeria de Modelos HD</span>
            </button>
          )}

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedModelCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedModelCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : darkMode
                    ? 'bg-[#161B26] text-slate-400 hover:text-slate-200 border border-[#232D3F]'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Preset Templates Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {PRESET_TEMPLATES.filter(
              (t) => t.category === selectedModelCategory || selectedModelCategory === 'Todos'
            ).map((template) => (
              <div
                key={template.id}
                onClick={() => onApplyTemplate(template.elements)}
                className={`group relative border rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-lg ${
                  darkMode
                    ? 'bg-[#131822] border-[#232D3F] hover:border-cyan-500'
                    : 'bg-slate-50 border-slate-200 hover:border-cyan-500'
                }`}
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#0A0D14] relative">
                  <img
                    src={template.previewUrl}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] font-bold text-slate-100 truncate">{template.title}</span>
                  </div>
                </div>
                <div
                  className={`p-1.5 text-[9px] font-bold flex items-center justify-between ${
                    darkMode ? 'bg-[#161B26] text-cyan-400' : 'bg-slate-100 text-cyan-600'
                  }`}
                >
                  <span>{template.elements.length} camadas</span>
                  <Plus className="w-3 h-3 text-cyan-500 group-hover:scale-125 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PANEL 7: GERENCIADOR DE CAMADAS */}
      {activeSidebarTab === 'layers' && (
        <LayerPanel
          layers={layers}
          activeLayerId={selectedIds[0] || null}
          onSelectLayer={(id) => setSelectedIds([id])}
          onAddLayer={(type) => {
            if (type === 'text') handleAddGenericText('Novo Texto', 36);
            else if (type === 'shape') handleAddShape('rectangle', 'Forma Retângulo');
            else if (type === 'image') {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e: any) => handleFileUpload(e);
              input.click();
            }
          }}
          onDeleteLayer={onDeleteLayer}
          onDuplicateLayer={onDuplicateLayer}
          onToggleVisibility={onToggleVisibility}
          onToggleLock={onToggleLock}
          onUpdateLayer={handleUpdateLayer}
          onReorderLayers={handleReorderLayers}
          theme={darkMode ? 'dark' : 'light'}
        />
      )}
    </aside>
  );
};
