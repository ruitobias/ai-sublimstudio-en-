import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../lib/theme';
import {
  Type,
  Plus,
  Trash2,
  Download,
  RefreshCw,
  Palette,
  Layout,
  Shapes,
  Send,
  CheckCircle2,
  Coffee,
  Shirt,
  Heart,
  Star,
  Circle,
  Crown,
  Flame,
  Shield,
  Copy,
  FileType,
  X,
  Sparkles
} from 'lucide-react';

import { WordItem, WordArtConfig } from '../types';

export interface WordArtStudioProps {
  onAddWordArtImage?: (dataUrl: string, title?: string, config?: WordArtConfig, wordArtType?: 'wordart1' | 'wordart2') => void;
  onClose?: () => void;
  darkMode?: boolean;
  initialConfig?: WordArtConfig;
  isEditing?: boolean;
}

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
}

const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'vibrant',
    name: 'Sublimação Vibrante',
    colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
  },
  {
    id: 'neon',
    name: 'Cyber Neon',
    colors: ['#00f5d4', '#7b2cbf', '#f72585', '#4cc9f0', '#7209b7', '#ff9e00']
  },
  {
    id: 'gold_luxury',
    name: 'Dourado & Luxo',
    colors: ['#d4af37', '#f3e5ab', '#aa7c11', '#1e293b', '#e2e8f0', '#b8860b']
  },
  {
    id: 'pastel',
    name: 'Maca & Pastel',
    colors: ['#ffb5a7', '#fcd5ce', '#f8edeb', '#f8ad9d', '#f4978e', '#b5e2fa']
  },
  {
    id: 'monochrome',
    name: 'Preto & Branco',
    colors: ['#0f172a', '#334155', '#475569', '#64748b', '#94a3b8', '#000000']
  },
  {
    id: 'ocean',
    name: 'Oceano Profundo',
    colors: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8', '#0096c7']
  }
];

const SHAPE_PRESETS = [
  { id: 'caneca', name: 'Caneca ☕', icon: Coffee },
  { id: 'camiseta', name: 'Camiseta 👕', icon: Shirt },
  { id: 'coracao', name: 'Coração ❤️', icon: Heart },
  { id: 'estrela', name: 'Estrela ⭐', icon: Star },
  { id: 'circulo', name: 'Círculo 🟠', icon: Circle },
  { id: 'coroa', name: 'Coroa 👑', icon: Crown },
  { id: 'fogo', name: 'Chama 🔥', icon: Flame },
  { id: 'escudo', name: 'Escudo 🛡️', icon: Shield },
];

const FONTS = [
  'Impact',
  'Montserrat',
  'Arial Black',
  'Playfair Display',
  'Pacifico',
  'Orbitron',
  'Lobster',
  'Trebuchet MS',
  'Georgia',
  'Courier New'
];

export const WordArtStudio: React.FC<WordArtStudioProps> = ({
  onAddWordArtImage,
  onClose,
  darkMode,
  initialConfig,
  isEditing = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Determine effective theme: prefer explicit prop, else read app theme via useTheme
  let isDark: boolean;
  try {
    const appTheme = useTheme();
    isDark = typeof darkMode === 'boolean' ? darkMode : appTheme.theme === 'dark';
  } catch (e) {
    // Not wrapped in ThemeProvider? fall back to prop or default to true
    isDark = typeof darkMode === 'boolean' ? darkMode : true;
  }

  // Words State
  const [words, setWords] = useState<WordItem[]>(() => {
    if (initialConfig?.words && initialConfig.words.length > 0) {
      return initialConfig.words;
    }
    return [
      { id: '1', text: 'SUBLIMAÇÃO', weight: 10 },
      { id: '2', text: 'ESTAMPARIA', weight: 9 },
      { id: '3', text: 'QUALIDADE', weight: 8 },
      { id: '4', text: 'ARTE', weight: 7 },
      { id: '5', text: 'DESIGN', weight: 7 },
      { id: '6', text: 'DTF', weight: 6 },
      { id: '7', text: 'CANECA', weight: 6 },
      { id: '8', text: 'CAMISETA', weight: 6 },
      { id: '9', text: 'ALMOFADA', weight: 5 },
      { id: '10', text: '300 DPI', weight: 5 },
      { id: '11', text: 'IMPRESSÃO', weight: 5 },
      { id: '12', text: 'CORES', weight: 4 },
      { id: '13', text: 'AMOR', weight: 4 },
      { id: '14', text: 'CRIATIVIDADE', weight: 4 },
      { id: '15', text: 'PERSONALIZADO', weight: 3 },
    ];
  });

  const [newWordText, setNewWordText] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Settings
  const [selectedShape, setSelectedShape] = useState<string>(initialConfig?.shape || 'caneca');
  const [selectedFont, setSelectedFont] = useState<string>(initialConfig?.font || 'Impact');
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(() => {
    if (initialConfig?.paletteId) {
      const found = COLOR_PALETTES.find((p) => p.id === initialConfig.paletteId);
      if (found) return found;
    }
    return COLOR_PALETTES[0];
  });
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'mixed' | 'angles'>(
    initialConfig?.layoutMode || 'mixed'
  );
  const [density, setDensity] = useState<number>(initialConfig?.density ?? 75);
  const [textCasing] = useState<'uppercase' | 'lowercase' | 'original'>('uppercase');
  const [bgColor] = useState<string>('transparent');
  const [isRendering, setIsRendering] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialConfig) {
      if (initialConfig.words && initialConfig.words.length > 0) {
        setWords(initialConfig.words);
      }
      if (initialConfig.shape) setSelectedShape(initialConfig.shape);
      if (initialConfig.font) setSelectedFont(initialConfig.font);
      if (initialConfig.paletteId) {
        const found = COLOR_PALETTES.find((p) => p.id === initialConfig.paletteId);
        if (found) setSelectedPalette(found);
      }
      if (initialConfig.layoutMode) setLayoutMode(initialConfig.layoutMode);
      if (initialConfig.density !== undefined) setDensity(initialConfig.density);
    }
  }, [initialConfig]);

  // Generate Word Art onto Canvas
  const generateWordArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRendering(true);

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    // Clear Canvas
    ctx.clearRect(0, 0, W, H);
    if (bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);
    }

    // 1. Create In-Memory Mask for Selected Shape
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = W;
    maskCanvas.height = H;
    const mCtx = maskCanvas.getContext('2d');
    if (!mCtx) return;

    mCtx.fillStyle = '#000000';

    if (selectedShape === 'caneca') {
      // Draw Mug silhouette
      mCtx.beginPath();
      if ('roundRect' in mCtx && typeof mCtx.roundRect === 'function') {
        mCtx.roundRect(W * 0.22, H * 0.2, W * 0.52, H * 0.62, 30);
      } else {
        mCtx.rect(W * 0.22, H * 0.2, W * 0.52, H * 0.62);
      }
      mCtx.fill();

      // Handle
      mCtx.lineWidth = 45;
      mCtx.strokeStyle = '#000000';
      mCtx.beginPath();
      mCtx.arc(W * 0.74, H * 0.51, H * 0.18, -Math.PI / 2.2, Math.PI / 2.2);
      mCtx.stroke();
    } else if (selectedShape === 'camiseta') {
      // Draw T-Shirt silhouette
      mCtx.beginPath();
      mCtx.moveTo(W * 0.35, H * 0.15);
      mCtx.quadraticCurveTo(W * 0.5, H * 0.25, W * 0.65, H * 0.15);
      mCtx.lineTo(W * 0.88, H * 0.3);
      mCtx.lineTo(W * 0.76, H * 0.44);
      mCtx.lineTo(W * 0.72, H * 0.38);
      mCtx.lineTo(W * 0.72, H * 0.88);
      mCtx.lineTo(W * 0.28, H * 0.88);
      mCtx.lineTo(W * 0.28, H * 0.38);
      mCtx.lineTo(W * 0.24, H * 0.44);
      mCtx.lineTo(W * 0.12, H * 0.3);
      mCtx.closePath();
      mCtx.fill();
    } else if (selectedShape === 'coracao') {
      // Heart Silhouette
      mCtx.beginPath();
      mCtx.moveTo(W * 0.5, H * 0.82);
      mCtx.bezierCurveTo(W * 0.15, H * 0.55, W * 0.1, H * 0.2, W * 0.32, H * 0.18);
      mCtx.bezierCurveTo(W * 0.44, H * 0.18, W * 0.5, H * 0.28, W * 0.5, H * 0.32);
      mCtx.bezierCurveTo(W * 0.5, H * 0.28, W * 0.56, H * 0.18, W * 0.68, H * 0.18);
      mCtx.bezierCurveTo(W * 0.9, H * 0.2, W * 0.85, H * 0.55, W * 0.5, H * 0.82);
      mCtx.closePath();
      mCtx.fill();
    } else if (selectedShape === 'estrela') {
      // Star Silhouette
      mCtx.beginPath();
      const cx = W * 0.5;
      const cy = H * 0.5;
      const outerR = W * 0.42;
      const innerR = W * 0.18;
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / 5 - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) mCtx.moveTo(x, y);
        else mCtx.lineTo(x, y);
      }
      mCtx.closePath();
      mCtx.fill();
    } else if (selectedShape === 'coroa') {
      // Crown Silhouette
      mCtx.beginPath();
      mCtx.moveTo(W * 0.18, H * 0.75);
      mCtx.lineTo(W * 0.12, H * 0.32);
      mCtx.lineTo(W * 0.32, H * 0.52);
      mCtx.lineTo(W * 0.5, H * 0.22);
      mCtx.lineTo(W * 0.68, H * 0.52);
      mCtx.lineTo(W * 0.88, H * 0.32);
      mCtx.lineTo(W * 0.82, H * 0.75);
      mCtx.closePath();
      mCtx.fill();
    } else if (selectedShape === 'fogo') {
      // Flame Silhouette
      mCtx.beginPath();
      mCtx.moveTo(W * 0.5, H * 0.12);
      mCtx.quadraticCurveTo(W * 0.8, H * 0.4, W * 0.8, H * 0.65);
      mCtx.arc(W * 0.5, H * 0.65, W * 0.3, 0, Math.PI);
      mCtx.quadraticCurveTo(W * 0.2, H * 0.4, W * 0.5, H * 0.12);
      mCtx.closePath();
      mCtx.fill();
    } else {
      // Circle Default
      mCtx.beginPath();
      mCtx.arc(W * 0.5, H * 0.5, W * 0.42, 0, Math.PI * 2);
      mCtx.fill();
    }

    const maskData = mCtx.getImageData(0, 0, W, H).data;

    // Helper: Check if pixel is inside shape mask
    const isInsideMask = (px: number, py: number) => {
      if (px < 0 || px >= W || py < 0 || py >= H) return false;
      const idx = (Math.floor(py) * W + Math.floor(px)) * 4;
      return maskData[idx + 3] > 100;
    };

    // 2. Prepare Formatted Words List sorted by Weight Descending
    const processedWords = [...words]
      .filter((w) => w.text.trim().length > 0)
      .sort((a, b) => b.weight - a.weight);

    if (processedWords.length === 0) {
      setIsRendering(false);
      return;
    }

    // Grid collision map
    const gridSize = 16;
    const occupied = new Set<string>();

    const checkCollision = (
      boxX: number,
      boxY: number,
      boxW: number,
      boxH: number
    ) => {
      const minGX = Math.floor(boxX / gridSize);
      const maxGX = Math.floor((boxX + boxW) / gridSize);
      const minGY = Math.floor(boxY / gridSize);
      const maxGY = Math.floor((boxY + boxH) / gridSize);

      for (let gx = minGX; gx <= maxGX; gx++) {
        for (let gy = minGY; gy <= maxGY; gy++) {
          if (occupied.has(`${gx},${gy}`)) return true;
        }
      }
      return false;
    };

    const markOccupied = (
      boxX: number,
      boxY: number,
      boxW: number,
      boxH: number
    ) => {
      const minGX = Math.floor(boxX / gridSize);
      const maxGX = Math.floor((boxX + boxW) / gridSize);
      const minGY = Math.floor(boxY / gridSize);
      const maxGY = Math.floor((boxY + boxH) / gridSize);

      for (let gx = minGX; gx <= maxGX; gx++) {
        for (let gy = minGY; gy <= maxGY; gy++) {
          occupied.add(`${gx},${gy}`);
        }
      }
    };

    // 3. Placement Loop
    const totalItemsToPlace = Math.min(120, Math.floor((density / 100) * 100));
    let paletteIdx = 0;

    for (let i = 0; i < totalItemsToPlace; i++) {
      const item = processedWords[i % processedWords.length];
      let wordText = item.text.trim();

      if (textCasing === 'uppercase') wordText = wordText.toUpperCase();
      else if (textCasing === 'lowercase') wordText = wordText.toLowerCase();

      const baseFontSize = 18 + item.weight * 7;
      ctx.font = `bold ${baseFontSize}px ${selectedFont}`;

      const textMetrics = ctx.measureText(wordText);
      const textWidth = textMetrics.width;
      const textHeight = baseFontSize * 0.9;

      let angle = 0;
      if (layoutMode === 'mixed') {
        angle = Math.random() < 0.3 ? -Math.PI / 2 : 0;
      } else if (layoutMode === 'angles') {
        const choices = [0, -Math.PI / 4, Math.PI / 4, -Math.PI / 2];
        angle = choices[Math.floor(Math.random() * choices.length)];
      }

      const cx = W / 2;
      const cy = H / 2;
      let radius = 0;
      let spiralAngle = Math.random() * Math.PI * 2;

      for (let attempt = 0; attempt < 350; attempt++) {
        spiralAngle += 0.35;
        radius += 1.8;

        const posX = cx + radius * Math.cos(spiralAngle);
        const posY = cy + radius * Math.sin(spiralAngle);

        if (
          isInsideMask(posX, posY) &&
          isInsideMask(posX + textWidth, posY) &&
          isInsideMask(posX, posY + textHeight) &&
          isInsideMask(posX + textWidth, posY + textHeight)
        ) {
          if (!checkCollision(posX - 4, posY - 4, textWidth + 8, textHeight + 8)) {
            ctx.save();
            ctx.translate(posX + textWidth / 2, posY + textHeight / 2);
            ctx.rotate(angle);

            const color =
              selectedPalette.colors[
                paletteIdx % selectedPalette.colors.length
              ];
            paletteIdx++;

            ctx.fillStyle = color;
            ctx.font = `bold ${baseFontSize}px ${selectedFont}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetY = 2;

            ctx.fillText(wordText, 0, 0);
            ctx.restore();

            markOccupied(posX - 4, posY - 4, textWidth + 8, textHeight + 8);
            break;
          }
        }
      }
    }

    setIsRendering(false);
  };

  useEffect(() => {
    generateWordArt();
  }, [
    words,
    selectedShape,
    selectedFont,
    selectedPalette,
    layoutMode,
    density,
    textCasing,
    bgColor
  ]);

  const handleAddWord = () => {
    if (!newWordText.trim()) return;
    const newWord: WordItem = {
      id: Math.random().toString(36).substring(2, 9),
      text: newWordText.trim(),
      weight: 6
    };
    setWords((prev) => [newWord, ...prev]);
    setNewWordText('');
  };

  const handleApplyBulkWords = () => {
    if (!bulkInput.trim()) return;
    const lines = bulkInput.split(/[\n,]+/);
    const parsedWords: WordItem[] = lines
      .map((line) => line.trim())
      .filter((w) => w.length > 0)
      .map((w, idx) => ({
        id: Math.random().toString(36).substring(2, 9),
        text: w,
        weight: Math.max(2, 10 - Math.floor(idx / 3))
      }));

    setWords(parsedWords);
    setShowBulkModal(false);
    setBulkInput('');
  };

  const handleDeleteWord = (id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
  };

  const handleSendToStudio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentConfig: WordArtConfig = {
      words,
      shape: selectedShape,
      font: selectedFont,
      paletteId: selectedPalette.id,
      layoutMode,
      density,
      wordArtType: 'wordart2',
    };

    const dataUrl = canvas.toDataURL('image/png');
    if (onAddWordArtImage) {
      onAddWordArtImage(dataUrl, `WordArt 2 ${selectedShape.toUpperCase()}`, currentConfig, 'wordart2');
    }
    setStatusMsg('Word Art adicionado com sucesso à área de trabalho!');
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `WORD_ART_${selectedShape.toUpperCase()}_300DPI.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={`w-full h-full flex flex-col select-none overflow-hidden ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
      {/* TOP HEADER CONTROL BAR */}
      <div className={`px-4 py-3 flex items-center justify-between shrink-0 border-b shadow-md ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
            <FileType className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-black text-sm flex items-center gap-2">
              Gerador de WordArt & Nuvem de Palavras
              <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded-full font-mono font-bold">
                Silhuetas Tipográficas Pro
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Crie estampas com palavras moldadas em canecas, camisetas, corações e estrelas.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={generateWordArt}
            className={`px-3 py-1.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`} 
            title="Recalcular posição das palavras"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isRendering ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Regerar</span>
          </button>

          <button
            onClick={handleDownloadPNG}
            className={`px-3 py-1.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }` }
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Baixar PNG</span>
          </button>

          {onAddWordArtImage && (
            <button
              onClick={handleSendToStudio}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inserir na Estampa</span>
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl transition ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* STATUS NOTIFICATION BANNER */}
      {statusMsg && (
        <div className="bg-emerald-950/90 border-b border-emerald-800 px-4 py-2 flex items-center justify-between text-xs text-emerald-300 font-medium animate-fade-in shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMsg}</span>
          </div>
          <button onClick={() => setStatusMsg(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden min-h-0">
        {/* LEFT PANEL: WORDS LIST & WEIGHTS */}
        <aside className={`w-full md:w-[320px] shrink-0 border-r p-3.5 flex flex-col gap-3 md:h-full overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <Type className="w-4 h-4" />
              Palavras ({words.length})
            </h3>
            <button
              onClick={() => setShowBulkModal(true)}
              className="text-[10px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 border border-rose-900/50 bg-rose-950/40 px-2 py-0.5 rounded-lg cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              Colar Lista
            </button>
          </div>

          {/* Quick Add Word Form */}
          <div className="flex gap-1.5">
            <input
              type="text"
              value={newWordText}
              onChange={(e) => setNewWordText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
              placeholder="Nova palavra..."
              className={`flex-1 border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-rose-500 ${
                isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            />
            <button
              onClick={handleAddWord}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Words List Table */}
          <div className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar touch-scroll-y pr-1 min-h-[200px]">
            {words.map((item) => (
              <div
                key={item.id}
                className={`border p-2 rounded-xl flex items-center justify-between gap-2 text-xs ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const val = e.target.value;
                    setWords((prev) =>
                      prev.map((w) => (w.id === item.id ? { ...w, text: val } : w))
                    );
                  }}
                  className="flex-1 bg-transparent font-bold focus:outline-none border-b border-transparent focus:border-purple-500 text-xs"
                />

                {/* Weight Slider */}
                <div className="flex items-center gap-1 w-20">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={item.weight}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setWords((prev) =>
                        prev.map((w) => (w.id === item.id ? { ...w, weight: val } : w))
                      );
                    }}
                    className="w-12 accent-purple-500 cursor-pointer"
                  />
                  <span className="text-[10px] font-extrabold text-purple-400 w-3">{item.weight}</span>
                </div>

                <button
                  onClick={() => handleDeleteWord(item.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER CANVAS DISPLAY */}
        <main className={`flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden ${
          isDark ? 'bg-slate-950' : 'bg-slate-200'
        }`}>
          <div className={`relative border-2 rounded-2xl p-2 shadow-2xl flex items-center justify-center max-w-full ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-300'
          }`}>
            <canvas
              ref={canvasRef}
              className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] rounded-xl object-contain shadow-inner bg-transparent"
            />

            {isRendering && (
              <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex flex-col items-center justify-center gap-2 text-purple-400">
                <RefreshCw className="w-8 h-8 animate-spin" />
                <span className="text-xs font-bold">Gerando Nuvem Tipográfica...</span>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT PANEL: SHAPES, FONTS, PALETTES & LAYOUT CONTROLS */}
        <aside className={`w-full md:w-[300px] shrink-0 border-l p-3.5 flex flex-col gap-4 overflow-y-auto custom-scrollbar text-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* 1. Shape Silhouette Selector */}
          <div className="space-y-1.5">
            <label className="font-extrabold uppercase text-purple-400 flex items-center gap-1.5 text-[11px]">
              <Shapes className="w-3.5 h-3.5" />
              1. Silhueta do Formato
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {SHAPE_PRESETS.map((shape) => {
                const Icon = shape.icon;
                const active = selectedShape === shape.id;
                return (
                  <button
                    key={shape.id}
                    onClick={() => setSelectedShape(shape.id)}
                    className={`p-2 rounded-xl border flex items-center gap-1.5 transition cursor-pointer text-xs ${
                      active
                        ? 'bg-purple-950/80 border-purple-500 text-white font-bold shadow-sm'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-purple-400" />
                    <span className="truncate">{shape.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Color Palette Selector */}
          <div className="space-y-1.5">
            <label className="font-extrabold uppercase text-amber-400 flex items-center gap-1.5 text-[11px]">
              <Palette className="w-3.5 h-3.5" />
              2. Cores Sublimáticas
            </label>
            <div className="space-y-1">
              {COLOR_PALETTES.map((pal) => {
                const active = selectedPalette.id === pal.id;
                return (
                  <button
                    key={pal.id}
                    onClick={() => setSelectedPalette(pal)}
                    className={`w-full p-1.5 rounded-xl border flex items-center justify-between transition cursor-pointer ${
                      active
                        ? 'bg-purple-950/40 border-purple-500 shadow-sm'
                        : isDark
                        ? 'bg-slate-950/50 border-slate-800 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-semibold text-[11px] truncate">{pal.name}</span>
                    <div className="flex gap-0.5 shrink-0">
                      {pal.colors.slice(0, 5).map((col, idx) => (
                        <span
                          key={idx}
                          style={{ backgroundColor: col }}
                          className="w-3 h-3 rounded-full border border-slate-800"
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Font Family Selector */}
          <div className="space-y-1.5">
            <label className="font-extrabold uppercase text-indigo-400 flex items-center gap-1.5 text-[11px]">
              <FileType className="w-3.5 h-3.5" />
              3. Fonte Tipográfica
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className={`w-full border rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-purple-500 cursor-pointer ${
                isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* 4. Layout Angles & Density */}
          <div className={`space-y-2.5 border-t pt-2.5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <label className="font-extrabold uppercase text-emerald-400 flex items-center gap-1.5 text-[11px]">
              <Layout className="w-3.5 h-3.5" />
              4. Orientação & Densidade
            </label>

            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setLayoutMode('horizontal')}
                className={`py-1.5 px-1 rounded-xl font-bold border transition text-[10px] cursor-pointer ${
                  layoutMode === 'horizontal'
                    ? 'bg-purple-600 text-white border-purple-500'
                  : isDark
                    ? 'bg-slate-950 text-slate-400 border-slate-800'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                Horizontal
              </button>
              <button
                onClick={() => setLayoutMode('mixed')}
                className={`py-1.5 px-1 rounded-xl font-bold border transition text-[10px] cursor-pointer ${
                  layoutMode === 'mixed'
                    ? 'bg-purple-600 text-white border-purple-500'
                  : isDark
                    ? 'bg-slate-950 text-slate-400 border-slate-800'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                Misto 90°
              </button>
              <button
                onClick={() => setLayoutMode('angles')}
                className={`py-1.5 px-1 rounded-xl font-bold border transition text-[10px] cursor-pointer ${
                  layoutMode === 'angles'
                    ? 'bg-purple-600 text-white border-purple-500'
                  : isDark
                    ? 'bg-slate-950 text-slate-400 border-slate-800'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                Ângulos
              </button>
            </div>

            {/* Density Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-400 text-[10px]">
                <span>Preenchimento</span>
                <span className="text-purple-400">{density}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={density}
                onChange={(e) => setDensity(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>
        </aside>
      </div>

      {/* BULK WORDS IMPORT MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-2xl p-5 w-full max-w-lg space-y-4 shadow-2xl ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-sm font-extrabold flex items-center gap-2 text-purple-400">
              <Sparkles className="w-4 h-4" />
              Colar Palavras em Lote
            </h3>
            <p className="text-xs text-slate-400">
              Cole sua lista de palavras separadas por vírgula ou por linha.
            </p>

            <textarea
              rows={6}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder="AMOR, FAMÍLIA, GRATIDÃO, SUCESSO, FÉ, CORAGEM..."
              className={`w-full border rounded-xl p-3 text-xs focus:outline-none focus:border-purple-500 font-mono ${
                isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                }`}
              >
                Cancelar
              </button>
              <button
                onClick={handleApplyBulkWords}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs cursor-pointer"
              >
                Gerar WordArt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
