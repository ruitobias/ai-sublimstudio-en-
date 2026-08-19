import React, { useState, useRef, useEffect } from 'react';
import { Layer, LayerFilters } from '../types';
import {
  Sliders,
  Crop,
  Sparkles,
  Wand2,
  X,
  Check,
  RotateCw,
  Sun,
  Contrast,
  Droplet,
  Eye,
  EyeOff,
  Zap,
  Scissors,
  Layers,
  Circle,
  Square,
  Maximize2,
  RefreshCw,
  Volume2,
  Image as ImageIcon,
  Tablet,
  Smartphone,
  Laptop,
  Type,
  Plus,
  Trash2,
  FileText,
  Palette,
  Shapes,
  Grid
} from 'lucide-react';

export interface WordItem {
  id: string;
  text: string;
  weight: number;
}

const COLOR_PALETTES = [
  { id: 'vibrant', name: 'Sublimação Vibrante', colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'] },
  { id: 'neon', name: 'Cyber Neon', colors: ['#00f5d4', '#7b2cbf', '#f72585', '#4cc9f0', '#7209b7', '#ff9e00'] },
  { id: 'gold_luxury', name: 'Dourado & Luxo', colors: ['#d4af37', '#f3e5ab', '#aa7c11', '#1e293b', '#e2e8f0', '#b8860b'] },
  { id: 'pastel', name: 'Maca & Pastel', colors: ['#ffb5a7', '#fcd5ce', '#f8edeb', '#f8ad9d', '#f4978e', '#b5e2fa'] },
  { id: 'monochrome', name: 'Preto & Branco', colors: ['#0f172a', '#334155', '#475569', '#64748b', '#94a3b8', '#000000'] },
  { id: 'ocean', name: 'Oceano Profundo', colors: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8', '#0096c7'] },
];

const SHAPE_PRESETS = [
  { id: 'caneca', name: 'Caneca ☕' },
  { id: 'camiseta', name: 'Camiseta 👕' },
  { id: 'coracao', name: 'Coração ❤️' },
  { id: 'estrela', name: 'Estrela ⭐' },
  { id: 'circulo', name: 'Círculo 🟠' },
  { id: 'coroa', name: 'Coroa 👑' },
  { id: 'fogo', name: 'Chama 🔥' },
  { id: 'escudo', name: 'Escudo 🛡️' },
];

const WORD_FONTS = [
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

interface ImageAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLayer: Layer | null;
  onUpdateLayer: (updatedLayer: Layer) => void;
  pushHistoryStep?: (description: string, toolName: string, updatedLayers: Layer[]) => void;
  allLayers?: Layer[];
  theme?: 'dark' | 'light';
  defaultTab?: 'adjustments' | 'crop' | 'filters' | 'smart' | 'words';
  onOpenWordArtStudio?: (layerId?: string, type?: 'wordart1' | 'wordart2') => void;
}

export type TextWarpStyle =
  | 'straight'
  | 'arc_upper'
  | 'arc_lower'
  | 'circle'
  | 'wave'
  | 'smile'
  | 'frown'
  | 'heart'
  | 'star'
  | 'emblem'
  | 'stamp_style'
  | 'ribbon'
  | 'bulge'
  | 'perspective_center';

const WORDART_2_WARP_STYLES: { id: TextWarpStyle; name: string }[] = [
  { id: 'straight', name: 'Reto Normal' },
  { id: 'arc_upper', name: 'Arco Superior' },
  { id: 'arc_lower', name: 'Arco Inferior' },
  { id: 'circle', name: 'Círculo 360°' },
  { id: 'wave', name: 'Onda Senoidal' },
  { id: 'smile', name: 'Sorriso (Parábola)' },
  { id: 'frown', name: 'U Invertido' },
  { id: 'heart', name: 'Coração' },
  { id: 'star', name: 'Estrela' },
  { id: 'stamp_style', name: 'Carimbo / Selo' },
  { id: 'ribbon', name: 'Faixa Banner' },
  { id: 'bulge', name: 'Inchar / Tufado' },
];

const WORDART_2_FONTS = [
  'Cinzel',
  'Impact',
  'Bangers',
  'Bebas Neue',
  'Pacifico',
  'Lobster',
  'Montserrat',
  'Playfair Display',
  'Anton',
  'Great Vibes',
  'Press Start 2P',
  'Satisfy',
  'Bungee',
  'Permanent Marker',
  'Arial Black'
];

const WORDART_2_PRESETS = [
  {
    id: 'gold-royalty',
    name: 'Ouro Real Sublimático',
    content: 'GRATIDÃO & FÉ',
    subwords: '',
    fontFamily: 'Cinzel',
    warpStyle: 'straight' as TextWarpStyle,
    warpIntensity: 0,
    color: '#d4af37',
    strokeColor: '#3a2e05',
    strokeWidth: 2,
    shadowColor: '#8a6d1b',
    shadowBlur: 8,
  },
  {
    id: 'vintage-3d',
    name: 'Retro 3D Sublimation',
    content: 'SUPER MÃE',
    subwords: '',
    fontFamily: 'Impact',
    warpStyle: 'arc_upper' as TextWarpStyle,
    warpIntensity: 45,
    color: '#ff2a75',
    strokeColor: '#2b0018',
    strokeWidth: 4,
    shadowColor: '#ffd700',
    shadowBlur: 10,
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyberpunk 3D',
    content: 'CHAMPION 2026',
    subwords: '',
    fontFamily: 'Bangers',
    warpStyle: 'wave' as TextWarpStyle,
    warpIntensity: 50,
    color: '#00f0ff',
    strokeColor: '#ff007f',
    strokeWidth: 3,
    shadowColor: '#00f0ff',
    shadowBlur: 15,
  },
  {
    id: 'mug-badge',
    name: 'Emblema Caneca Circular',
    content: 'CAFÉ & AMOR • 100% ARTESANAL',
    subwords: '',
    fontFamily: 'Bebas Neue',
    warpStyle: 'circle' as TextWarpStyle,
    warpIntensity: 70,
    color: '#3d2314',
    strokeColor: '#f5e0c3',
    strokeWidth: 2,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowBlur: 4,
  },
  {
    id: 'stamp-seal',
    name: 'Selo Oficial Estampa',
    content: 'EDITION PRO • SUBLIMATION STUDIO',
    subwords: '',
    fontFamily: 'Montserrat',
    warpStyle: 'stamp_style' as TextWarpStyle,
    warpIntensity: 65,
    color: '#1e293b',
    strokeColor: '#3b82f6',
    strokeWidth: 3,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowBlur: 5,
  },
  {
    id: 'comic-pop',
    name: 'PopArt Quadrinhos',
    content: 'POW! HEROI',
    subwords: '',
    fontFamily: 'Bungee',
    warpStyle: 'bulge' as TextWarpStyle,
    warpIntensity: 55,
    color: '#facc15',
    strokeColor: '#000000',
    strokeWidth: 5,
    shadowColor: '#ef4444',
    shadowBlur: 0,
  },
  {
    id: 'ribbon-banner',
    name: 'Faixa Curva de Gala',
    content: 'MEU PRIMEIRO AMOR',
    subwords: '',
    fontFamily: 'Lobster',
    warpStyle: 'ribbon' as TextWarpStyle,
    warpIntensity: 50,
    color: '#8b5cf6',
    strokeColor: '#4c1d95',
    strokeWidth: 2,
    shadowColor: '#c084fc',
    shadowBlur: 8,
  },
  {
    id: 'heart-cloud',
    name: 'Nuvem Coração',
    content: 'AMOR',
    subwords: 'Família, Carinho, União, Afeto, Gratidão, Paz',
    fontFamily: 'Pacifico',
    warpStyle: 'heart' as TextWarpStyle,
    warpIntensity: 60,
    color: '#e11d48',
    strokeColor: '#ffffff',
    strokeWidth: 2,
    shadowColor: 'rgba(225, 29, 72, 0.4)',
    shadowBlur: 12,
  },
];

export const ImageAdjustmentModal: React.FC<ImageAdjustmentModalProps> = ({
  isOpen,
  onClose,
  activeLayer,
  onUpdateLayer,
  pushHistoryStep,
  allLayers = [],
  theme = 'dark',
  defaultTab = 'adjustments',
  onOpenWordArtStudio,
}) => {
  const isWordArtLayer = activeLayer
    ? activeLayer.name.toLowerCase().includes('wordart') || activeLayer.id.toLowerCase().includes('wordart')
    : false;

  const [activeTab, setActiveTab] = useState<'adjustments' | 'crop' | 'filters' | 'smart' | 'words'>(
    isWordArtLayer ? 'words' : defaultTab
  );

  useEffect(() => {
    if (isOpen) {
      if (isWordArtLayer) {
        setActiveTab('words');
      } else if (defaultTab) {
        setActiveTab(defaultTab);
      }
    }
  }, [isOpen, defaultTab, isWordArtLayer]);

  // Modified Layer Image Content (if WordArt regenerated or cropped)
  const [modifiedContent, setModifiedContent] = useState<string | null>(null);

  // Default fallback words matching the sample WordArt image
  const DEFAULT_WORD_ITEMS: WordItem[] = [
    { id: '1', text: 'IRMÃOS', weight: 8 },
    { id: '2', text: 'PAIS', weight: 8 },
    { id: '3', text: 'FAMÍLIA', weight: 9 },
    { id: '4', text: 'AMOR', weight: 9 },
    { id: '5', text: 'ABRAÇO', weight: 8 },
    { id: '6', text: 'PROTEÇÃO', weight: 8 },
    { id: '7', text: 'UNIÃO', weight: 7 },
    { id: '8', text: 'CARINHO', weight: 7 },
    { id: '9', text: 'RESPEITO', weight: 7 },
    { id: '10', text: 'CONFIANÇA', weight: 6 },
    { id: '11', text: 'CUIDADO', weight: 6 },
    { id: '12', text: 'BASE', weight: 5 },
    { id: '13', text: 'LAR', weight: 5 },
    { id: '14', text: 'FELICIDADE', weight: 5 },
    { id: '15', text: 'SEMPRE JUNTOS', weight: 5 },
  ];

  // WordArt Mode: 'wordart1' (Word cloud) or 'wordart2' (Curved 3D styled text)
  const [wordArtMode, setWordArtMode] = useState<'wordart1' | 'wordart2'>('wordart1');

  // WordArt 2 State Variables
  const [w2Content, setW2Content] = useState<string>('GRATIDÃO & FÉ');
  const [w2Subwords, setW2Subwords] = useState<string>('');
  const [w2FontFamily, setW2FontFamily] = useState<string>('Cinzel');
  const [w2WarpStyle, setW2WarpStyle] = useState<TextWarpStyle>('straight');
  const [w2WarpIntensity, setW2WarpIntensity] = useState<number>(0);
  const [w2Color, setW2Color] = useState<string>('#d4af37');
  const [w2StrokeColor, setW2StrokeColor] = useState<string>('#3a2e05');
  const [w2StrokeWidth, setW2StrokeWidth] = useState<number>(2);
  const [w2ShadowColor, setW2ShadowColor] = useState<string>('#8a6d1b');
  const [w2ShadowBlur, setW2ShadowBlur] = useState<number>(8);

  // WordArt Words & Config State (WordArt 1)
  const [wordItems, setWordItems] = useState<WordItem[]>(DEFAULT_WORD_ITEMS);

  const [newWordText, setNewWordText] = useState('');
  const [newWordWeight, setNewWordWeight] = useState<number>(7);
  const [bulkText, setBulkText] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);

  const [editingWordId, setEditingWordId] = useState<string | null>(null);
  const [editingWordText, setEditingWordText] = useState<string>('');

  const [wordShape, setWordShape] = useState<string>('caneca');
  const [wordFont, setWordFont] = useState<string>('Impact');
  const [wordPaletteId, setWordPaletteId] = useState<string>('vibrant');
  const [wordLayout, setWordLayout] = useState<'mixed' | 'horizontal' | 'angles'>('mixed');
  const [wordDensity, setWordDensity] = useState<number>(75);
  const [repeatWords, setRepeatWords] = useState<boolean>(false);

  // AI Theme Word Generator State
  const [aiThemeInputModal, setAiThemeInputModal] = useState('');
  const [isGeneratingAiWordsModal, setIsGeneratingAiWordsModal] = useState(false);

  const getFallbackThemeWordsLocal = (theme: string): { text: string; weight: number }[] => {
    const lower = theme.toLowerCase().trim();
    if (lower.includes('cidade') || lower.includes('viagem') || lower.includes('turism') || lower.includes('lugar') || lower.includes('capital') || lower.includes('metrópole') || lower.includes('metropole') || lower.includes('país') || lower.includes('pais')) {
      return [
        { text: theme.toUpperCase().trim(), weight: 10 },
        { text: 'TURISMO', weight: 9 },
        { text: 'VIAGEM', weight: 9 },
        { text: 'CAPITAL', weight: 8 },
        { text: 'METRÓPOLE', weight: 8 },
        { text: 'MONUMENTOS', weight: 8 },
        { text: 'PASSEIO', weight: 7 },
        { text: 'CULTURA', weight: 7 },
        { text: 'DESTINO', weight: 7 },
        { text: 'HISTÓRIA', weight: 6 },
        { text: 'MEMÓRIAS', weight: 6 },
        { text: 'AVENTURA', weight: 6 },
        { text: 'ROTEIRO', weight: 5 },
        { text: 'PONTOS TURÍSTICOS', weight: 5 }
      ];
    }
    if (lower.includes('barbeiro') || lower.includes('barba') || lower.includes('cabelo') || lower.includes('barbearia')) {
      return [
        { text: 'BARBEARIA', weight: 10 }, { text: 'BARBEIRO', weight: 9 }, { text: 'ESTILO', weight: 8 },
        { text: 'NAVALHA', weight: 8 }, { text: 'TESOURA', weight: 8 }, { text: 'CORTE', weight: 7 },
        { text: 'BIGODE', weight: 7 }, { text: 'CABELO', weight: 7 }, { text: 'BARBA', weight: 6 },
        { text: 'RESPEITO', weight: 6 }, { text: 'TRADIÇÃO', weight: 6 }, { text: 'FADE', weight: 5 }
      ];
    }
    if (lower.includes('pet') || lower.includes('gato') || lower.includes('cachorro') || lower.includes('cão') || lower.includes('cao') || lower.includes('patinha')) {
      return [
        { text: 'AMOR PET', weight: 10 }, { text: 'PATINHAS', weight: 9 }, { text: 'CARINHO', weight: 8 },
        { text: 'FIDELIDADE', weight: 8 }, { text: 'MELHOR AMIGO', weight: 8 }, { text: 'AUAU', weight: 7 },
        { text: 'MIAU', weight: 7 }, { text: 'COMPANHEIRO', weight: 7 }, { text: 'FAMÍLIA', weight: 6 },
        { text: 'ALEGRIA', weight: 6 }, { text: 'AMOR INCONDICIONAL', weight: 6 }
      ];
    }
    if (lower.includes('mãe') || lower.includes('mae') || lower.includes('mother')) {
      return [
        { text: 'MÃE', weight: 10 }, { text: 'AMOR', weight: 9 }, { text: 'CARINHO', weight: 8 },
        { text: 'PROTEÇÃO', weight: 8 }, { text: 'RAINHA', weight: 8 }, { text: 'CUIDADO', weight: 7 },
        { text: 'EXEMPLO', weight: 7 }, { text: 'DEDICAÇÃO', weight: 7 }, { text: 'ABRAÇO', weight: 6 },
        { text: 'FAMÍLIA', weight: 6 }, { text: 'BASE', weight: 6 }, { text: 'GRATIDÃO', weight: 6 },
        { text: 'LUZ', weight: 5 }, { text: 'MINHA VIDA', weight: 5 }, { text: 'ETERNA', weight: 5 }
      ];
    }
    if (lower.includes('pai') || lower.includes('father')) {
      return [
        { text: 'PAI', weight: 10 }, { text: 'HERÓI', weight: 9 }, { text: 'AMOR', weight: 8 },
        { text: 'FORÇA', weight: 8 }, { text: 'EXEMPLO', weight: 8 }, { text: 'SABEDORIA', weight: 7 },
        { text: 'PROTEÇÃO', weight: 7 }, { text: 'COMPANHEIRO', weight: 7 }, { text: 'ORGULHO', weight: 6 },
        { text: 'GUIA', weight: 6 }, { text: 'FAMÍLIA', weight: 6 }, { text: 'GRATIDÃO', weight: 6 },
        { text: 'ABRAÇO', weight: 5 }, { text: 'MEU PORTO SEGURO', weight: 5 }
      ];
    }
    if (lower.includes('futebol') || lower.includes('esporte') || lower.includes('time') || lower.includes('jogo')) {
      return [
        { text: 'FUTEBOL', weight: 10 }, { text: 'GOL', weight: 9 }, { text: 'PAIXÃO', weight: 8 },
        { text: 'CAMPEÃO', weight: 8 }, { text: 'TORCIDA', weight: 8 }, { text: 'VITÓRIA', weight: 7 },
        { text: 'GARRA', weight: 7 }, { text: 'EMOÇÃO', weight: 7 }, { text: 'TÍTULO', weight: 6 },
        { text: 'CAMISA', weight: 6 }, { text: 'BOLA', weight: 6 }, { text: 'RAÇA', weight: 6 },
        { text: 'ESTÁDIO', weight: 5 }, { text: 'SUPERAÇÃO', weight: 5 }
      ];
    }
    if (lower.includes('aniversário') || lower.includes('aniversario') || lower.includes('fest') || lower.includes('bolo')) {
      return [
        { text: 'PARABÉNS', weight: 10 }, { text: 'FESTA', weight: 9 }, { text: 'ALEGRIA', weight: 8 },
        { text: 'DOCES', weight: 8 }, { text: 'BOLO', weight: 8 }, { text: 'DIVERSÃO', weight: 7 },
        { text: 'FELICIDADE', weight: 7 }, { text: 'SORRISOS', weight: 7 }, { text: 'AMIGOS', weight: 6 },
        { text: 'MAGIA', weight: 6 }, { text: 'SONHOS', weight: 6 }, { text: 'VELINHAS', weight: 5 }
      ];
    }
    if (lower.includes('amor') || lower.includes('namorado') || lower.includes('casal') || lower.includes('casamento')) {
      return [
        { text: 'AMOR', weight: 10 }, { text: 'TE AMO', weight: 9 }, { text: 'PAIXÃO', weight: 8 },
        { text: 'CASAL', weight: 8 }, { text: 'ETERNO', weight: 8 }, { text: 'COMPLICIDADE', weight: 7 },
        { text: 'CARINHO', weight: 7 }, { text: 'MEU BEM', weight: 7 }, { text: 'CORAÇÃO', weight: 6 },
        { text: 'BEIJOS', weight: 6 }, { text: 'UNIDOS', weight: 6 }, { text: 'JUNTOS SEMPRE', weight: 5 }
      ];
    }
    if (lower.includes('enferm') || lower.includes('médic') || lower.includes('medic') || lower.includes('saúde') || lower.includes('saude')) {
      return [
        { text: 'ENFERMAGEM', weight: 10 }, { text: 'CUIDADO', weight: 9 }, { text: 'COMPAIXÃO', weight: 8 },
        { text: 'SAÚDE', weight: 8 }, { text: 'DEDICAÇÃO', weight: 8 }, { text: 'VIDA', weight: 7 },
        { text: 'JALECO', weight: 7 }, { text: 'HEROÍNA', weight: 7 }, { text: 'EMPATIA', weight: 6 },
        { text: 'VOCAÇÃO', weight: 6 }, { text: 'AMOR', weight: 6 }, { text: 'RESPEITO', weight: 5 }
      ];
    }
    if (lower.includes('game') || lower.includes('jog') || lower.includes('cyber')) {
      return [
        { text: 'GAMER', weight: 10 }, { text: 'LEVEL UP', weight: 9 }, { text: 'PLAY', weight: 8 },
        { text: 'VICTORY', weight: 8 }, { text: 'PRO PLAYER', weight: 8 }, { text: 'SKILL', weight: 7 },
        { text: 'STREAMER', weight: 7 }, { text: 'HEADSHOT', weight: 7 }, { text: 'SETUP', weight: 6 },
        { text: 'XP', weight: 6 }, { text: 'QUEST', weight: 6 }, { text: 'MULTIPLAYER', weight: 5 }
      ];
    }
    if (lower.includes('fé') || lower.includes('fe') || lower.includes('deus') || lower.includes('religi')) {
      return [
        { text: 'FÉ', weight: 10 }, { text: 'DEUS', weight: 9 }, { text: 'ABENÇOADO', weight: 8 },
        { text: 'ORAÇÃO', weight: 8 }, { text: 'PAZ', weight: 8 }, { text: 'ESPERANÇA', weight: 7 },
        { text: 'BÊNÇÃO', weight: 7 }, { text: 'MILAGRE', weight: 7 }, { text: 'GRATIDÃO', weight: 6 },
        { text: 'LUZ', weight: 6 }, { text: 'JESUS', weight: 6 }, { text: 'AMOR', weight: 5 }
      ];
    }
    if (lower.includes('café') || lower.includes('cafe')) {
      return [
        { text: 'CAFÉ', weight: 10 }, { text: 'ACONCHEGO', weight: 9 }, { text: 'ENERGIA', weight: 8 },
        { text: 'PAUSA', weight: 8 }, { text: 'AROMA', weight: 8 }, { text: 'AMOR', weight: 7 },
        { text: 'CANECA', weight: 7 }, { text: 'QUENTINHO', weight: 7 }, { text: 'SABOR', weight: 6 },
        { text: 'BOM DIA', weight: 6 }, { text: 'FOCO', weight: 6 }, { text: 'MOMENTO', weight: 5 }
      ];
    }

    const cleanTheme = theme.toUpperCase().trim();
    return [
      { text: cleanTheme, weight: 10 },
      { text: `AMO ${cleanTheme}`, weight: 9 },
      { text: `MEU ${cleanTheme}`, weight: 9 },
      { text: 'PAIXÃO', weight: 8 },
      { text: 'ESTILO', weight: 8 },
      { text: 'VIDA', weight: 8 },
      { text: 'MOMENTOS', weight: 7 },
      { text: 'MEMÓRIAS', weight: 7 },
      { text: 'ESPECIAL', weight: 7 },
      { text: 'ALEGRIA', weight: 6 },
      { text: 'INSPIRAÇÃO', weight: 6 },
      { text: 'UNIVERSO', weight: 6 },
      { text: 'ORIGINAL', weight: 5 }
    ];
  };

  const handleGenerateWordsFromAIModal = async (themeName?: string) => {
    const targetTheme = (themeName || aiThemeInputModal).trim();
    if (!targetTheme) return;

    setIsGeneratingAiWordsModal(true);
    try {
      const res = await fetch('/api/gemini/generate-wordart-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: targetTheme }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.words) && data.words.length > 0) {
          const newWordsList = data.words.map((w: any, idx: number) => ({
            id: Date.now().toString() + idx,
            text: String(w.text || '').trim().toUpperCase(),
            weight: typeof w.weight === 'number' ? Math.max(1, Math.min(10, w.weight)) : 7,
          }));
          setWordItems(newWordsList);
          setIsGeneratingAiWordsModal(false);
          setTimeout(() => handleRegenerateWordArtWithList(newWordsList), 50);
          return;
        }
      }
    } catch (err) {
      console.warn('AI word generation online failed, falling back to local theme generator:', err);
    }

    const fallbackList = getFallbackThemeWordsLocal(targetTheme);
    const newWordsList = fallbackList.map((w, idx) => ({
      id: Date.now().toString() + idx,
      text: w.text.toUpperCase(),
      weight: w.weight,
    }));
    setWordItems(newWordsList);
    setIsGeneratingAiWordsModal(false);
    setTimeout(() => handleRegenerateWordArtWithList(newWordsList), 50);
  };

  // Working filter state
  const [filters, setFilters] = useState<LayerFilters>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    blur: 0,
    vibrance: 0,
    temperature: 0,
    exposure: 0,
    shadows: 0,
    highlights: 0,
    sharpen: 0,
    gamma: 1.0,
    sepia: 0,
    invert: false,
    grayscale: false,
    presetFilter: 'none',
    filterIntensity: 100,
  });

  // Crop mode state
  const [cropAspect, setCropAspect] = useState<'free' | '1:1' | '4:3' | '16:9' | 'circle' | 'tablet' | 'android' | 'macos'>('free');
  const [cropRect, setCropRect] = useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 100, h: 100 });
  const [cropRotation, setCropRotation] = useState<number>(0);

  // Preview canvas ref
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImageRef = useRef<HTMLImageElement | HTMLCanvasElement | null>(null);
  const isWordArtGeneratedRef = useRef<boolean>(false);

  // Crop tight transparent bounding box
  const cropTightCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    let minX = width, minY = height, maxX = 0, maxY = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 5) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX <= minX || maxY <= minY) return canvas;

    const pad = 24;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(width - 1, maxX + pad);
    maxY = Math.min(height - 1, maxY + pad);

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;

    const out = document.createElement('canvas');
    out.width = cropW;
    out.height = cropH;
    const outCtx = out.getContext('2d');
    if (outCtx) {
      outCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
    }
    return out;
  };

  // Draw WordArt 2 content onto 2D Context
  const drawWordArt2Content = (
    ctx: CanvasRenderingContext2D,
    renderW: number,
    renderH: number,
    params: {
      content: string;
      subwords?: string;
      fontFamily: string;
      warpStyle: TextWarpStyle;
      warpIntensity: number;
      color: string;
      strokeColor: string;
      strokeWidth: number;
      shadowColor: string;
      shadowBlur: number;
    }
  ) => {
    const {
      content,
      subwords,
      fontFamily,
      warpStyle,
      warpIntensity,
      color,
      strokeColor,
      strokeWidth,
      shadowColor,
      shadowBlur,
    } = params;

    const centerX = renderW / 2;
    const centerY = renderH / 2;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const baseH = 320;
    const scaleFactor = renderH / baseH;

    if (shadowBlur > 0) {
      ctx.shadowColor = shadowColor || 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = shadowBlur * scaleFactor;
      ctx.shadowOffsetX = 3 * scaleFactor;
      ctx.shadowOffsetY = 4 * scaleFactor;
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    const baseFontSize = Math.max(12, Math.round(48 * scaleFactor));
    let fontSize = baseFontSize;

    // Dynamically scale font size according to typed text length so text never overflows renderW
    if (warpStyle === 'straight' && content.length > 0) {
      ctx.font = `bold ${fontSize}px ${fontFamily}, sans-serif`;
      const measuredWidth = ctx.measureText(content).width;
      const maxWidthAllowed = renderW * 0.88;
      if (measuredWidth > maxWidthAllowed && measuredWidth > 0) {
        fontSize = Math.max(12, Math.round(fontSize * (maxWidthAllowed / measuredWidth)));
      }
    }

    ctx.font = `bold ${fontSize}px ${fontFamily}, sans-serif`;

    if (warpStyle === 'arc_upper' || warpStyle === 'arc_lower' || warpStyle === 'smile' || warpStyle === 'frown') {
      const radius = Math.max(80 * scaleFactor, (250 * scaleFactor) - Math.abs(warpIntensity) * 1.5 * scaleFactor);
      const isUpper = warpStyle === 'arc_upper' || warpStyle === 'frown';
      const factor = isUpper ? -1 : 1;
      
      const chars = content.split('');
      const maxTotalAngle = Math.PI * 0.85;
      let angleStep = 0.08 * (Math.max(10, warpIntensity) / 50);
      if (chars.length * angleStep > maxTotalAngle) {
        angleStep = maxTotalAngle / Math.max(1, chars.length);
      }

      const totalAngle = chars.length * angleStep;
      let startAngle = -totalAngle / 2 + angleStep / 2;

      chars.forEach((char, i) => {
        const charAngle = startAngle + i * angleStep;
        ctx.save();
        ctx.translate(
          centerX + Math.sin(charAngle) * radius,
          centerY + factor * Math.cos(charAngle) * radius - factor * radius
        );
        ctx.rotate(factor * charAngle);

        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor || '#000000';
          ctx.lineWidth = strokeWidth * 1.5 * scaleFactor;
          ctx.strokeText(char, 0, 0);
        }
        ctx.fillStyle = color;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    } else if (warpStyle === 'circle' || warpStyle === 'stamp_style') {
      const radius = 100 * scaleFactor;
      const chars = (content + ' ').split('');
      const angleStep = (2 * Math.PI) / chars.length;

      // Adjust circle font size if many characters
      const circlePerimeter = 2 * Math.PI * radius;
      const charWidth = circlePerimeter / chars.length;
      if (charWidth < fontSize) {
        fontSize = Math.max(10, Math.round(charWidth * 0.8));
        ctx.font = `bold ${fontSize}px ${fontFamily}, sans-serif`;
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 25 * scaleFactor, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor || color;
      ctx.lineWidth = 2 * scaleFactor;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 20 * scaleFactor, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1 * scaleFactor;
      ctx.stroke();

      chars.forEach((char, i) => {
        const charAngle = i * angleStep - Math.PI / 2;
        ctx.save();
        ctx.translate(
          centerX + Math.cos(charAngle) * radius,
          centerY + Math.sin(charAngle) * radius
        );
        ctx.rotate(charAngle + Math.PI / 2);

        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor || '#000000';
          ctx.lineWidth = strokeWidth * scaleFactor;
          ctx.strokeText(char, 0, 0);
        }
        ctx.fillStyle = color;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    } else if (warpStyle === 'wave') {
      const chars = content.split('');
      const stepX = Math.min(30 * scaleFactor, (renderW * 0.85) / Math.max(1, chars.length));
      const startX = centerX - (chars.length * stepX) / 2 + stepX / 2;

      chars.forEach((char, i) => {
        const x = startX + i * stepX;
        const offsetY = Math.sin((i / Math.max(1, chars.length)) * Math.PI * 2) * (warpIntensity * 0.5 * scaleFactor);
        ctx.save();
        ctx.translate(x, centerY + offsetY);

        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor || '#000000';
          ctx.lineWidth = strokeWidth * scaleFactor;
          ctx.strokeText(char, 0, 0);
        }
        ctx.fillStyle = color;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    } else if (warpStyle === 'heart' || warpStyle === 'star') {
      ctx.save();
      ctx.translate(centerX, centerY);

      ctx.beginPath();
      ctx.fillStyle = color + '22';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * scaleFactor;
      ctx.scale(1.2 * scaleFactor, 1.2 * scaleFactor);
      ctx.moveTo(0, -20 * scaleFactor);
      ctx.bezierCurveTo(-40 * scaleFactor, -60 * scaleFactor, -80 * scaleFactor, 0, 0, 60 * scaleFactor);
      ctx.bezierCurveTo(80 * scaleFactor, 0, 40 * scaleFactor, -60 * scaleFactor, 0, -20 * scaleFactor);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.font = `bold ${fontSize + Math.round(8 * scaleFactor)}px ${fontFamily}, sans-serif`;
      if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor || '#000000';
        ctx.lineWidth = strokeWidth * scaleFactor;
        ctx.strokeText(content, centerX, centerY - 10 * scaleFactor);
      }
      ctx.fillStyle = color;
      ctx.fillText(content, centerX, centerY - 10 * scaleFactor);

      if (subwords) {
        ctx.font = `bold ${Math.round(14 * scaleFactor)}px ${fontFamily}, sans-serif`;
        ctx.fillStyle = strokeColor || '#ffffff';
        const words = subwords.split(',').map((w) => w.trim());
        words.forEach((w, idx) => {
          const angle = (idx / words.length) * Math.PI * 2;
          const rx = Math.cos(angle) * 75 * scaleFactor;
          const ry = Math.sin(angle) * 45 * scaleFactor;
          ctx.fillText(w, centerX + rx, centerY + ry + 15 * scaleFactor);
        });
      }
    } else {
      if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor || '#000000';
        ctx.lineWidth = strokeWidth * 2 * scaleFactor;
        ctx.strokeText(content, centerX, centerY);
      }
      ctx.fillStyle = color;
      ctx.fillText(content, centerX, centerY);
    }

    ctx.restore();
  };

  const generateWordArt2Canvas = (
    content: string,
    subwords: string,
    fontFamily: string,
    warpStyle: TextWarpStyle,
    warpIntensity: number,
    color: string,
    strokeColor: string,
    strokeWidth: number,
    shadowColor: string,
    shadowBlur: number
  ): HTMLCanvasElement | null => {
    const estimateMeasureCanvas = document.createElement('canvas');
    const estCtx = estimateMeasureCanvas.getContext('2d');
    let textWidth = 300;
    if (estCtx) {
      estCtx.font = `bold 72px ${fontFamily}, sans-serif`;
      textWidth = estCtx.measureText(content || 'WordArt').width;
    }

    let exportRenderW = 1200;
    let exportRenderH = 600;

    if (warpStyle === 'straight' || warpStyle === 'wave' || warpStyle === 'ribbon') {
      exportRenderW = Math.max(1200, Math.round(textWidth * 1.6 + strokeWidth * 20 + shadowBlur * 20));
      exportRenderH = Math.max(500, Math.round(72 * 4 + shadowBlur * 20));
    } else if (warpStyle === 'arc_upper' || warpStyle === 'arc_lower' || warpStyle === 'smile' || warpStyle === 'frown') {
      exportRenderW = Math.max(1200, Math.round(textWidth * 1.5 + 200));
      exportRenderH = Math.max(600, Math.round(72 * 5 + warpIntensity * 4));
    } else {
      exportRenderW = 1200;
      exportRenderH = 1200;
    }

    const canvas = document.createElement('canvas');
    canvas.width = exportRenderW;
    canvas.height = exportRenderH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    drawWordArt2Content(ctx, exportRenderW, exportRenderH, {
      content,
      subwords,
      fontFamily,
      warpStyle,
      warpIntensity,
      color,
      strokeColor,
      strokeWidth,
      shadowColor,
      shadowBlur,
    });

    return cropTightCanvas(canvas);
  };

  const renderWordArt2Preview = () => {
    const cropped = generateWordArt2Canvas(
      w2Content,
      w2Subwords,
      w2FontFamily,
      w2WarpStyle,
      w2WarpIntensity,
      w2Color,
      w2StrokeColor,
      w2StrokeWidth,
      w2ShadowColor,
      w2ShadowBlur
    );
    if (!cropped) return;

    sourceImageRef.current = cropped;
    isWordArtGeneratedRef.current = true;
    setModifiedContent(cropped.toDataURL('image/png'));
    renderPreview();
  };

  // Sync state when modal opens or activeLayer changes
  useEffect(() => {
    if (activeLayer) {
      isWordArtGeneratedRef.current = false;

      // Auto-detect WordArt 2 vs WordArt 1
      const isW2 =
        activeLayer.wordArtType === 'wordart2' ||
        activeLayer.wordArtConfig?.wordArtType === 'wordart2' ||
        (activeLayer.name && /wordart\s*2/i.test(activeLayer.name)) ||
        (activeLayer.id && /wordart-?2/i.test(activeLayer.id)) ||
        (activeLayer.name && /GRATIDÃO|SUPER MÃE|CHAMPION|OURO REAL|NEON|RETRO|EMBLEMA|SELOS/i.test(activeLayer.name));

      if (isW2) {
        setWordArtMode('wordart2');
        const conf = activeLayer.wordArtConfig;
        const textFromLayer = conf?.words?.[0]?.text || activeLayer.name.replace(/^WordArt\s*2?:?\s*/i, '').replace(/^Estampa:\s*/i, '').trim();
        setW2Content(textFromLayer || 'GRATIDÃO & FÉ');
        setW2Subwords(conf?.subwords || '');
        setW2FontFamily(conf?.font || activeLayer.wordFont || 'Cinzel');
        setW2WarpStyle((conf?.warpStyle as TextWarpStyle) || 'straight');
        setW2WarpIntensity(conf?.warpIntensity ?? 0);
        setW2Color(conf?.color || '#d4af37');
        setW2StrokeColor(conf?.strokeColor || '#3a2e05');
        setW2StrokeWidth(conf?.strokeWidth ?? 2);
        setW2ShadowColor(conf?.shadowColor || '#8a6d1b');
        setW2ShadowBlur(conf?.shadowBlur ?? 8);
      } else {
        setWordArtMode('wordart1');
      }

      let initialWords = DEFAULT_WORD_ITEMS;
      if (activeLayer.wordItems && Array.isArray(activeLayer.wordItems) && activeLayer.wordItems.length > 0) {
        initialWords = activeLayer.wordItems;
      } else {
        const isWordArt =
          (activeLayer.name && activeLayer.name.toLowerCase().includes('wordart')) ||
          (activeLayer.name && activeLayer.name.toLowerCase().includes('nuvem')) ||
          activeLayer.wordShape !== undefined;
        if (isWordArt) {
          initialWords = DEFAULT_WORD_ITEMS;
        }
      }
      setWordItems(initialWords);

      const shape = activeLayer.wordShape || 'caneca';
      const palette = activeLayer.wordPaletteId || 'vibrant';
      const font = activeLayer.wordFont || 'Impact';
      const layout = activeLayer.wordLayout || 'mixed';

      setWordShape(shape);
      setWordPaletteId(palette);
      setWordFont(font);
      setWordLayout(layout);

      if (activeLayer.filters) {
        setFilters({
          brightness: activeLayer.filters.brightness ?? 0,
          contrast: activeLayer.filters.contrast ?? 0,
          saturation: activeLayer.filters.saturation ?? 0,
          hue: activeLayer.filters.hue ?? 0,
          blur: activeLayer.filters.blur ?? 0,
          vibrance: activeLayer.filters.vibrance ?? 0,
          temperature: activeLayer.filters.temperature ?? 0,
          exposure: activeLayer.filters.exposure ?? 0,
          shadows: activeLayer.filters.shadows ?? 0,
          highlights: activeLayer.filters.highlights ?? 0,
          sharpen: activeLayer.filters.sharpen ?? 0,
          gamma: activeLayer.filters.gamma ?? 1.0,
          sepia: activeLayer.filters.sepia ?? 0,
          invert: activeLayer.filters.invert ?? false,
          grayscale: activeLayer.filters.grayscale ?? false,
          presetFilter: activeLayer.filters.presetFilter ?? 'none',
          filterIntensity: activeLayer.filters.filterIntensity ?? 100,
        });
      }
    } else {
      setFilters({
        brightness: 0,
        contrast: 0,
        saturation: 0,
        hue: 0,
        blur: 0,
        vibrance: 0,
        temperature: 0,
        exposure: 0,
        shadows: 0,
        highlights: 0,
        sharpen: 0,
        gamma: 1.0,
        sepia: 0,
        invert: false,
        grayscale: false,
        presetFilter: 'none',
        filterIntensity: 100,
      });
    }
  }, [activeLayer, isOpen, activeTab]);

  // Re-render WordArt 2 preview when WordArt 2 controls change
  useEffect(() => {
    if (isOpen && activeTab === 'words' && wordArtMode === 'wordart2') {
      renderWordArt2Preview();
    }
  }, [
    isOpen,
    activeTab,
    wordArtMode,
    w2Content,
    w2Subwords,
    w2FontFamily,
    w2WarpStyle,
    w2WarpIntensity,
    w2Color,
    w2StrokeColor,
    w2StrokeWidth,
    w2ShadowColor,
    w2ShadowBlur,
  ]);

  // Load image into ref
  useEffect(() => {
    if (activeLayer && activeLayer.content) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = activeLayer.content;
      img.onload = () => {
        if (!isWordArtGeneratedRef.current) {
          sourceImageRef.current = img;
          renderPreview();
        }
      };
    }
  }, [activeLayer?.content, isOpen]);

  // Re-render preview whenever filters change
  useEffect(() => {
    if (isOpen) {
      renderPreview();
    }
  }, [filters, isOpen, cropRotation]);

  const renderPreview = () => {
    const canvas = previewCanvasRef.current;
    const img = sourceImageRef.current;
    if (!canvas || !img) return;

    const width = ('naturalWidth' in img && img.naturalWidth) ? img.naturalWidth : (img as HTMLCanvasElement).width || 600;
    const height = ('naturalHeight' in img && img.naturalHeight) ? img.naturalHeight : (img as HTMLCanvasElement).height || 600;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Build CSS Filter string
    const b = 100 + filters.brightness + (filters.exposure || 0);
    const c = 100 + filters.contrast;
    const s = 100 + filters.saturation + (filters.vibrance || 0) * 0.5;
    const h = filters.hue;
    const blur = filters.blur;
    const sepia = filters.sepia || 0;
    const invert = filters.invert ? 100 : 0;
    const grayscale = filters.grayscale ? 100 : 0;

    let filterString = `brightness(${b}%) contrast(${c}%) saturate(${s}%) hue-rotate(${h}deg) blur(${blur}px) sepia(${sepia}%) invert(${invert}%) grayscale(${grayscale}%)`;

    // Add preset filters if selected
    if (filters.presetFilter && filters.presetFilter !== 'none') {
      const intensity = (filters.filterIntensity ?? 100) / 100;
      switch (filters.presetFilter) {
        case 'vintage':
          filterString += ` sepia(${50 * intensity}%) contrast(${120 * intensity}%)`;
          break;
        case 'hdr':
          filterString += ` contrast(${140 * intensity}%) saturate(${130 * intensity}%)`;
          break;
        case 'neon':
          filterString += ` saturate(${200 * intensity}%) contrast(${150 * intensity}%) hue-rotate(${90 * intensity}deg)`;
          break;
        case 'cinema':
          filterString += ` contrast(${130 * intensity}%) sepia(${20 * intensity}%) hue-rotate(${-10 * intensity}deg)`;
          break;
        case 'popart':
          filterString += ` saturate(${250 * intensity}%) contrast(${160 * intensity}%)`;
          break;
        case 'cool':
          filterString += ` hue-rotate(${180 * intensity}deg) saturate(${110 * intensity}%)`;
          break;
        case 'warm':
          filterString += ` sepia(${30 * intensity}%) saturate(${120 * intensity}%)`;
          break;
        case 'duotone':
          filterString += ` contrast(${180 * intensity}%) grayscale(${80 * intensity}%)`;
          break;
      }
    }

    ctx.save();
    try {
      ctx.filter = filterString;
    } catch (e) {
      // Fallback if browser filter fails
    }

    // Apply rotation if any
    if (cropRotation !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((cropRotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    ctx.drawImage(img as any, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  if (!isOpen || !activeLayer) return null;

  // Apply Changes to Layer
  const handleApply = () => {
    let finalContent = modifiedContent || activeLayer.content;
    let finalName = activeLayer.name;
    let finalWordArtType = activeLayer.wordArtType;
    let finalWordArtConfig = activeLayer.wordArtConfig;

    let newWidth = activeLayer.width;
    let newHeight = activeLayer.height;

    if (activeTab === 'words' && wordArtMode === 'wordart2') {
      const cropped = generateWordArt2Canvas(
        w2Content,
        w2Subwords,
        w2FontFamily,
        w2WarpStyle,
        w2WarpIntensity,
        w2Color,
        w2StrokeColor,
        w2StrokeWidth,
        w2ShadowColor,
        w2ShadowBlur
      );
      if (cropped) {
        finalContent = cropped.toDataURL('image/png');
        const aspect = cropped.width / cropped.height;
        newWidth = Math.max(200, Math.min(800, activeLayer.width));
        newHeight = Math.max(30, Math.round(newWidth / aspect));
      }

      finalName = w2Content || activeLayer.name;
      finalWordArtType = 'wordart2';
      finalWordArtConfig = {
        words: [{ id: '1', text: w2Content, weight: 10 }],
        subwords: w2Subwords,
        font: w2FontFamily,
        warpStyle: w2WarpStyle,
        warpIntensity: w2WarpIntensity,
        color: w2Color,
        strokeColor: w2StrokeColor,
        strokeWidth: w2StrokeWidth,
        shadowColor: w2ShadowColor,
        shadowBlur: w2ShadowBlur,
        wordArtType: 'wordart2',
      };
    }

    const updated = {
      ...activeLayer,
      width: newWidth,
      height: newHeight,
      content: finalContent,
      name: finalName,
      filters: { ...filters },
      wordItems: wordItems,
      wordShape: wordShape,
      wordPaletteId: wordPaletteId,
      wordFont: wordFont,
      wordLayout: wordLayout,
      wordArtType: finalWordArtType,
      wordArtConfig: finalWordArtConfig,
    };

    onUpdateLayer(updated);

    if (pushHistoryStep) {
      const newLayers = allLayers.map((l) => (l.id === updated.id ? updated : l));
      pushHistoryStep('Edição de Elemento Aplicada', 'Ajustes', newLayers);
    }

    onClose();
  };

  // WordArt Handlers
  const handleAddWord = () => {
    if (!newWordText.trim()) return;
    const item: WordItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      text: newWordText.trim(),
      weight: newWordWeight,
    };
    const updatedWords = [...wordItems, item];
    setWordItems(updatedWords);
    setNewWordText('');
    handleRegenerateWordArtWithList(updatedWords);
  };

  const handleDeleteWord = (id: string) => {
    const updatedWords = wordItems.filter((w) => w.id !== id);
    setWordItems(updatedWords);
    handleRegenerateWordArtWithList(updatedWords);
  };

  const handleUpdateWordWeight = (id: string, delta: number) => {
    const updatedWords = wordItems.map((w) => {
      if (w.id === id) {
        const newWeight = Math.max(1, Math.min(10, w.weight + delta));
        return { ...w, weight: newWeight };
      }
      return w;
    });
    setWordItems(updatedWords);
    handleRegenerateWordArtWithList(updatedWords);
  };

  const handleSaveEditedWord = (id: string) => {
    if (!editingWordText.trim()) {
      setEditingWordId(null);
      return;
    }
    const updatedWords = wordItems.map((w) => {
      if (w.id === id) {
        return { ...w, text: editingWordText.trim() };
      }
      return w;
    });
    setWordItems(updatedWords);
    setEditingWordId(null);
    handleRegenerateWordArtWithList(updatedWords);
  };

  const handleBulkInsertWords = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText.split(/[\n,;]+/);
    const newItems: WordItem[] = lines
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((text, idx) => ({
        id: Date.now().toString() + idx,
        text,
        weight: Math.floor(Math.random() * 5) + 5,
      }));

    if (newItems.length > 0) {
      const updatedWords = [...wordItems, ...newItems];
      setWordItems(updatedWords);
      setBulkText('');
      setShowBulkInput(false);
      handleRegenerateWordArtWithList(updatedWords);
    }
  };

  const handleRegenerateWordArtWithList = (
    wordsList: WordItem[] = wordItems,
    overrideShape?: string,
    overridePaletteId?: string,
    overrideFont?: string,
    overrideLayout?: 'mixed' | 'horizontal' | 'angles',
    overrideRepeat?: boolean
  ) => {
    const activeShape = overrideShape !== undefined ? overrideShape : wordShape;
    const activePaletteId = overridePaletteId !== undefined ? overridePaletteId : wordPaletteId;
    const activeFont = overrideFont !== undefined ? overrideFont : wordFont;
    const activeLayout = overrideLayout !== undefined ? overrideLayout : wordLayout;
    const activeRepeat = overrideRepeat !== undefined ? overrideRepeat : repeatWords;

    if (wordsList.length === 0) {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 600, 600);
      }
      const dataUrl = canvas.toDataURL('image/png');
      setModifiedContent(dataUrl);

      sourceImageRef.current = canvas;
      isWordArtGeneratedRef.current = true;
      renderPreview();
      return;
    }

    const W = 1080;
    const H = 1080;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Mask Canvas
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = W;
    maskCanvas.height = H;
    const mCtx = maskCanvas.getContext('2d');
    if (!mCtx) return;

    mCtx.fillStyle = '#000000';
    if (activeShape === 'caneca') {
      mCtx.beginPath();
      if ('roundRect' in mCtx && typeof mCtx.roundRect === 'function') {
        mCtx.roundRect(W * 0.22, H * 0.2, W * 0.52, H * 0.62, 30);
      } else {
        mCtx.rect(W * 0.22, H * 0.2, W * 0.52, H * 0.62);
      }
      mCtx.fill();
      mCtx.lineWidth = 45;
      mCtx.strokeStyle = '#000000';
      mCtx.beginPath();
      mCtx.arc(W * 0.74, H * 0.51, H * 0.18, -Math.PI / 2.2, Math.PI / 2.2);
      mCtx.stroke();
    } else if (activeShape === 'camiseta') {
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
    } else if (activeShape === 'coracao') {
      mCtx.beginPath();
      mCtx.moveTo(W * 0.5, H * 0.82);
      mCtx.bezierCurveTo(W * 0.15, H * 0.55, W * 0.1, H * 0.2, W * 0.32, H * 0.18);
      mCtx.bezierCurveTo(W * 0.44, H * 0.18, W * 0.5, H * 0.28, W * 0.5, H * 0.32);
      mCtx.bezierCurveTo(W * 0.5, H * 0.28, W * 0.56, H * 0.18, W * 0.68, H * 0.18);
      mCtx.bezierCurveTo(W * 0.9, H * 0.2, W * 0.85, H * 0.55, W * 0.5, H * 0.82);
      mCtx.closePath();
      mCtx.fill();
    } else if (activeShape === 'estrela') {
      mCtx.beginPath();
      const cx = W * 0.5, cy = H * 0.5, outerR = W * 0.42, innerR = W * 0.18;
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
    } else if (activeShape === 'coroa') {
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
    } else if (activeShape === 'fogo') {
      mCtx.beginPath();
      mCtx.moveTo(W * 0.5, H * 0.12);
      mCtx.quadraticCurveTo(W * 0.8, H * 0.4, W * 0.8, H * 0.65);
      mCtx.arc(W * 0.5, H * 0.65, W * 0.3, 0, Math.PI);
      mCtx.quadraticCurveTo(W * 0.2, H * 0.4, W * 0.5, H * 0.12);
      mCtx.closePath();
      mCtx.fill();
    } else if (activeShape === 'escudo') {
      mCtx.beginPath();
      mCtx.moveTo(W * 0.2, H * 0.2);
      mCtx.lineTo(W * 0.8, H * 0.2);
      mCtx.lineTo(W * 0.8, H * 0.5);
      mCtx.quadraticCurveTo(W * 0.8, H * 0.85, W * 0.5, H * 0.92);
      mCtx.quadraticCurveTo(W * 0.2, H * 0.85, W * 0.2, H * 0.5);
      mCtx.closePath();
      mCtx.fill();
    } else {
      mCtx.beginPath();
      mCtx.arc(W * 0.5, H * 0.5, W * 0.42, 0, Math.PI * 2);
      mCtx.fill();
    }

    const maskData = mCtx.getImageData(0, 0, W, H).data;
    const isInsideMask = (px: number, py: number) => {
      if (px < 0 || px >= W || py < 0 || py >= H) return false;
      const idx = (Math.floor(py) * W + Math.floor(px)) * 4;
      return maskData[idx + 3] > 100;
    };

    let processedWords = [...wordsList]
      .filter((w) => w.text && w.text.trim().length > 0)
      .sort((a, b) => b.weight - a.weight);

    if (!activeRepeat) {
      const seen = new Set<string>();
      processedWords = processedWords.filter((w) => {
        const key = w.text.trim().toUpperCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    if (processedWords.length === 0) return;

    const gridSize = 12;
    const occupied = new Set<string>();

    const checkCollisionGrid = (minGX: number, maxGX: number, minGY: number, maxGY: number) => {
      for (let gx = minGX; gx <= maxGX; gx++) {
        for (let gy = minGY; gy <= maxGY; gy++) {
          if (occupied.has(`${gx},${gy}`)) return true;
        }
      }
      return false;
    };

    const markOccupiedGrid = (minGX: number, maxGX: number, minGY: number, maxGY: number) => {
      for (let gx = minGX; gx <= maxGX; gx++) {
        for (let gy = minGY; gy <= maxGY; gy++) {
          occupied.add(`${gx},${gy}`);
        }
      }
    };

    const palette = COLOR_PALETTES.find((p) => p.id === activePaletteId) || COLOR_PALETTES[0];
    const totalItemsToPlace = activeRepeat
      ? Math.min(120, Math.floor((wordDensity / 100) * 100))
      : processedWords.length;

    let paletteIdx = 0;

    for (let i = 0; i < totalItemsToPlace; i++) {
      const item = activeRepeat
        ? processedWords[i % processedWords.length]
        : processedWords[i];
      if (!item) continue;
      const wordText = item.text.trim().toUpperCase();

      let angle = 0;
      if (activeLayout === 'mixed') {
        angle = Math.random() < 0.3 ? -Math.PI / 2 : 0;
      } else if (activeLayout === 'angles') {
        const choices = [0, -Math.PI / 4, Math.PI / 4, -Math.PI / 2];
        angle = choices[Math.floor(Math.random() * choices.length)];
      }

      let fontSize = Math.max(16, 16 + item.weight * 6);
      let placed = false;

      while (!placed && fontSize >= 11) {
        ctx.font = `bold ${fontSize}px ${activeFont}`;
        const textMetrics = ctx.measureText(wordText);
        const textWidth = textMetrics.width;
        const textHeight = fontSize * 0.85;

        const hw = textWidth / 2;
        const hh = textHeight / 2;

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const cornersLocal = [
          { x: -hw, y: -hh },
          { x: hw, y: -hh },
          { x: hw, y: hh },
          { x: -hw, y: hh },
          { x: 0, y: 0 }
        ];

        const cx = W / 2;
        const cy = H / 2;
        let radius = 0;
        let spiralAngle = Math.random() * Math.PI * 2;

        for (let attempt = 0; attempt < 450; attempt++) {
          spiralAngle += 0.28;
          radius += 1.3;

          const posX = cx + radius * Math.cos(spiralAngle);
          const posY = cy + radius * Math.sin(spiralAngle);

          const rotCorners = cornersLocal.map((c) => ({
            x: posX + (c.x * cosA - c.y * sinA),
            y: posY + (c.x * sinA + c.y * cosA)
          }));

          const inside = rotCorners.every((c) => isInsideMask(c.x, c.y));
          if (!inside) continue;

          let minX = rotCorners[0].x;
          let maxX = rotCorners[0].x;
          let minY = rotCorners[0].y;
          let maxY = rotCorners[0].y;
          for (let k = 1; k < 4; k++) {
            if (rotCorners[k].x < minX) minX = rotCorners[k].x;
            if (rotCorners[k].x > maxX) maxX = rotCorners[k].x;
            if (rotCorners[k].y < minY) minY = rotCorners[k].y;
            if (rotCorners[k].y > maxY) maxY = rotCorners[k].y;
          }

          const minGX = Math.floor((minX - 3) / gridSize);
          const maxGX = Math.floor((maxX + 3) / gridSize);
          const minGY = Math.floor((minY - 3) / gridSize);
          const maxGY = Math.floor((maxY + 3) / gridSize);

          if (!checkCollisionGrid(minGX, maxGX, minGY, maxGY)) {
            ctx.save();
            ctx.translate(posX, posY);
            if (angle !== 0) ctx.rotate(angle);

            ctx.fillStyle = palette.colors[paletteIdx % palette.colors.length];
            paletteIdx++;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetY = 2;

            ctx.fillText(wordText, 0, 0);
            ctx.restore();

            markOccupiedGrid(minGX, maxGX, minGY, maxGY);
            placed = true;
            break;
          }
        }

        if (!placed) {
          fontSize = Math.floor(fontSize * 0.82);
        }
      }
    }

    const dataUrl = canvas.toDataURL('image/png');
    setModifiedContent(dataUrl);

    sourceImageRef.current = canvas;
    isWordArtGeneratedRef.current = true;
    renderPreview();
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      hue: 0,
      blur: 0,
      vibrance: 0,
      temperature: 0,
      exposure: 0,
      shadows: 0,
      highlights: 0,
      sharpen: 0,
      gamma: 1.0,
      sepia: 0,
      invert: false,
      grayscale: false,
      presetFilter: 'none',
      filterIntensity: 100,
    });
  };

  // Perform Recorte (Crop)
  const handleApplyCrop = () => {
    const img = sourceImageRef.current;
    if (!img) return;

    const cropCanvas = document.createElement('canvas');
    let width = img.naturalWidth;
    let height = img.naturalHeight;

    if (cropAspect === '1:1') {
      const side = Math.min(width, height);
      cropCanvas.width = side;
      cropCanvas.height = side;
    } else if (cropAspect === '4:3' || cropAspect === 'tablet') {
      cropCanvas.width = width;
      cropCanvas.height = Math.round((width * 3) / 4);
    } else if (cropAspect === '16:9') {
      cropCanvas.width = width;
      cropCanvas.height = Math.round((width * 9) / 16);
    } else if (cropAspect === 'android') {
      cropCanvas.height = height;
      cropCanvas.width = Math.round((height * 9) / 16);
    } else if (cropAspect === 'macos') {
      cropCanvas.width = width;
      cropCanvas.height = Math.round((width * 10) / 16);
    } else {
      cropCanvas.width = width;
      cropCanvas.height = height;
    }

    const ctx = cropCanvas.getContext('2d');
    if (!ctx) return;

    if (cropAspect === 'circle') {
      ctx.beginPath();
      ctx.arc(cropCanvas.width / 2, cropCanvas.height / 2, Math.min(cropCanvas.width, cropCanvas.height) / 2, 0, Math.PI * 2);
      ctx.clip();
    }

    ctx.drawImage(img, 0, 0, cropCanvas.width, cropCanvas.height);
    const newContent = cropCanvas.toDataURL('image/png');

    const updated = {
      ...activeLayer,
      content: newContent,
      width: Math.round(activeLayer.width * (cropCanvas.width / (img.naturalWidth || 1))),
      height: Math.round(activeLayer.height * (cropCanvas.height / (img.naturalHeight || 1))),
    };

    onUpdateLayer(updated);
    if (pushHistoryStep) {
      const newLayers = allLayers.map((l) => (l.id === updated.id ? updated : l));
      pushHistoryStep('Recorte de Imagem Executado', 'Recorte', newLayers);
    }
    onClose();
  };

  // Smart Tools: Remove BG (Chroma / White removal)
  const handleRemoveBackground = () => {
    const img = sourceImageRef.current;
    if (!img) return;

    const processCanvas = document.createElement('canvas');
    processCanvas.width = img.naturalWidth;
    processCanvas.height = img.naturalHeight;

    const ctx = processCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, processCanvas.width, processCanvas.height);
    const data = imageData.data;

    // Detect white/light background or chromakey corner pixels
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Remove near-white pixels (luminance > 230)
      if (r > 225 && g > 225 && b > 225) {
        data[i + 3] = 0; // Set Alpha transparent
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const newContent = processCanvas.toDataURL('image/png');

    const updated = { ...activeLayer, content: newContent };
    onUpdateLayer(updated);

    if (pushHistoryStep) {
      const newLayers = allLayers.map((l) => (l.id === updated.id ? updated : l));
      pushHistoryStep('Remoção de Fundo Inteligente', 'Remover Fundo', newLayers);
    }
    onClose();
  };

  // Smart Tools: Vetorizar / Posterize Sublimação
  const handleVectorize = () => {
    const img = sourceImageRef.current;
    if (!img) return;

    const processCanvas = document.createElement('canvas');
    processCanvas.width = img.naturalWidth;
    processCanvas.height = img.naturalHeight;

    const ctx = processCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, processCanvas.width, processCanvas.height);
    const data = imageData.data;

    // Posterize to 8 crisp color levels for vector-style sublimation print
    const levels = 8;
    const step = 255 / (levels - 1);

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.round(data[i] / step) * step;
      data[i + 1] = Math.round(data[i + 1] / step) * step;
      data[i + 2] = Math.round(data[i + 2] / step) * step;
    }

    ctx.putImageData(imageData, 0, 0);
    const newContent = processCanvas.toDataURL('image/png');

    const updated = { ...activeLayer, content: newContent };
    onUpdateLayer(updated);

    if (pushHistoryStep) {
      const newLayers = allLayers.map((l) => (l.id === updated.id ? updated : l));
      pushHistoryStep('Vetorização de Imagem Sublimática', 'Vetorizar', newLayers);
    }
    onClose();
  };

  // Smart Tools: Upscale 2x / 4x
  const handleUpscale = (factor: 2 | 4) => {
    const img = sourceImageRef.current;
    if (!img) return;

    const scaleCanvas = document.createElement('canvas');
    scaleCanvas.width = img.naturalWidth * factor;
    scaleCanvas.height = img.naturalHeight * factor;

    const ctx = scaleCanvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, scaleCanvas.width, scaleCanvas.height);

    const newContent = scaleCanvas.toDataURL('image/png');
    const updated = { ...activeLayer, content: newContent };
    onUpdateLayer(updated);

    if (pushHistoryStep) {
      const newLayers = allLayers.map((l) => (l.id === updated.id ? updated : l));
      pushHistoryStep(`Upscale ${factor}x HD de Imagem`, 'Upscale', newLayers);
    }
    onClose();
  };

  // Smart Tools: Auto Enquadramento / Trim Transparente
  const handleAutoCropTransparent = () => {
    const img = sourceImageRef.current;
    if (!img) return;

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    let minX = width, minY = height, maxX = 0, maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 5) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX <= minX || maxY <= minY) return;

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;

    const trimmedCanvas = document.createElement('canvas');
    trimmedCanvas.width = cropW;
    trimmedCanvas.height = cropH;

    const tCtx = trimmedCanvas.getContext('2d');
    if (tCtx) {
      tCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
      const newContent = trimmedCanvas.toDataURL('image/png');
      const updated = { ...activeLayer, content: newContent };
      onUpdateLayer(updated);

      if (pushHistoryStep) {
        const newLayers = allLayers.map((l) => (l.id === updated.id ? updated : l));
        pushHistoryStep('Auto Enquadramento Transparente', 'Auto Enquadrar', newLayers);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
        theme === 'light'
          ? 'bg-white border-purple-200 text-slate-800'
          : 'bg-[#14151a] border-purple-500/30 text-gray-100'
      }`}>
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${
          theme === 'light' ? 'border-purple-100 bg-purple-50/50' : 'border-[#282a36] bg-[#1a1b22]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight flex items-center gap-2">
                Edição Avançada de Imagem
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Sublim Studio
                </span>
              </h3>
              <p className="text-xs text-gray-400 truncate max-w-xs">
                Elemento: <strong className="text-purple-300">{activeLayer.name}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-[#282a36] bg-[#121318] px-4 gap-2 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('adjustments')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'adjustments'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Ajustes de Cor & Luz</span>
          </button>

          <button
            onClick={() => setActiveTab('crop')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'crop'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Crop className="w-4 h-4" />
            <span>Recorte & Proporção</span>
          </button>

          <button
            onClick={() => setActiveTab('filters')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'filters'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Filtros Especiais</span>
          </button>

          <button
            onClick={() => setActiveTab('smart')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'smart'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span>Ferramentas Inteligentes</span>
          </button>

          <button
            onClick={() => setActiveTab('words')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'words'
                ? 'border-pink-500 text-pink-400 bg-pink-500/10'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Type className="w-4 h-4 text-pink-400" />
            <span>Editar Palavras</span>
            {isWordArtLayer && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono">
                WordArt
              </span>
            )}
          </button>
        </div>

        {/* Modal Main Content (Preview + Sliders) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-12 p-4 gap-4">
          {/* Left Canvas Live Preview (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#0a0b0e] border border-[#282a36] rounded-2xl relative min-h-[220px]">
            <span className="absolute top-3 left-3 text-[10px] font-mono uppercase font-bold text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-500/30">
              Pré-Visualização ao Vivo
            </span>

            <div className="max-w-full max-h-[300px] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl">
              <canvas ref={previewCanvasRef} className="max-w-full max-h-[280px] object-contain rounded" />
            </div>
          </div>

          {/* Right Controls Panel (7 cols) */}
          <div className="md:col-span-7 flex flex-col overflow-y-auto max-h-[420px] pr-2 space-y-4 text-xs">
            {/* TAB 1: AJUSTES */}
            {activeTab === 'adjustments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#282a36]">
                  <span className="font-bold text-purple-300">Ajustes da Imagem (Real-time)</span>
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Resetar Filtros
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Brilho */}
                  <div className="bg-[#1a1b22] p-2.5 rounded-xl border border-[#282a36] space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                      <span className="flex items-center gap-1">
                        <Sun className="w-3.5 h-3.5 text-amber-400" /> Brilho
                      </span>
                      <span className="font-mono text-purple-400">{filters.brightness}</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={filters.brightness}
                      onChange={(e) => setFilters({ ...filters, brightness: parseInt(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Contraste */}
                  <div className="bg-[#1a1b22] p-2.5 rounded-xl border border-[#282a36] space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                      <span className="flex items-center gap-1">
                        <Contrast className="w-3.5 h-3.5 text-sky-400" /> Contraste
                      </span>
                      <span className="font-mono text-purple-400">{filters.contrast}</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={filters.contrast}
                      onChange={(e) => setFilters({ ...filters, contrast: parseInt(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Saturação */}
                  <div className="bg-[#1a1b22] p-2.5 rounded-xl border border-[#282a36] space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                      <span className="flex items-center gap-1">
                        <Droplet className="w-3.5 h-3.5 text-pink-400" /> Saturação
                      </span>
                      <span className="font-mono text-purple-400">{filters.saturation}</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={filters.saturation}
                      onChange={(e) => setFilters({ ...filters, saturation: parseInt(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Matiz (Hue) */}
                  <div className="bg-[#1a1b22] p-2.5 rounded-xl border border-[#282a36] space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-indigo-400" /> Matiz (Hue)
                      </span>
                      <span className="font-mono text-purple-400">{filters.hue}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={filters.hue}
                      onChange={(e) => setFilters({ ...filters, hue: parseInt(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Temperatura */}
                  <div className="bg-[#1a1b22] p-2.5 rounded-xl border border-[#282a36] space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                      <span>Temperatura de Cor</span>
                      <span className="font-mono text-purple-400">{filters.temperature || 0}</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={filters.temperature || 0}
                      onChange={(e) => setFilters({ ...filters, temperature: parseInt(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Vibrância */}
                  <div className="bg-[#1a1b22] p-2.5 rounded-xl border border-[#282a36] space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                      <span>Vibrância</span>
                      <span className="font-mono text-purple-400">{filters.vibrance}</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={filters.vibrance}
                      onChange={(e) => setFilters({ ...filters, vibrance: parseInt(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Desfoque (Blur) */}
                  <div className="bg-[#1a1b22] p-2.5 rounded-xl border border-[#282a36] space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                      <span>Desfoque (Blur)</span>
                      <span className="font-mono text-purple-400">{filters.blur}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={filters.blur}
                      onChange={(e) => setFilters({ ...filters, blur: parseInt(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  {/* Sépia */}
                  <div className="bg-[#1a1b22] p-2.5 rounded-xl border border-[#282a36] space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-300">
                      <span>Efeito Sépia</span>
                      <span className="font-mono text-purple-400">{filters.sepia || 0}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.sepia || 0}
                      onChange={(e) => setFilters({ ...filters, sepia: parseInt(e.target.value) })}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Toggles Color Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setFilters({ ...filters, grayscale: !filters.grayscale })}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                      filters.grayscale
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-[#1a1b22] text-gray-300 border-[#282a36] hover:bg-[#252732]'
                    }`}
                  >
                    Preto e Branco
                  </button>

                  <button
                    onClick={() => setFilters({ ...filters, invert: !filters.invert })}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                      filters.invert
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-[#1a1b22] text-gray-300 border-[#282a36] hover:bg-[#252732]'
                    }`}
                  >
                    Inverter Cores
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: RECORTE */}
            {activeTab === 'crop' && (
              <div className="space-y-4">
                <div className="font-bold text-purple-300 pb-2 border-b border-[#282a36]">
                  Opções de Recorte (Crop)
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setCropAspect('free')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cropAspect === 'free'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-[#1a1b22] border-[#282a36] text-gray-300 hover:border-purple-500/50'
                    }`}
                  >
                    <Crop className="w-5 h-5 text-purple-400" />
                    <span>Livre</span>
                  </button>

                  <button
                    onClick={() => setCropAspect('1:1')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cropAspect === '1:1'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-[#1a1b22] border-[#282a36] text-gray-300 hover:border-purple-500/50'
                    }`}
                  >
                    <Square className="w-5 h-5 text-sky-400" />
                    <span>Quadrado (1:1)</span>
                  </button>

                  <button
                    onClick={() => setCropAspect('circle')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cropAspect === 'circle'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-[#1a1b22] border-[#282a36] text-gray-300 hover:border-purple-500/50'
                    }`}
                  >
                    <Circle className="w-5 h-5 text-emerald-400" />
                    <span>Circular</span>
                  </button>

                  <button
                    onClick={() => setCropAspect('4:3')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cropAspect === '4:3'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-[#1a1b22] border-[#282a36] text-gray-300 hover:border-purple-500/50'
                    }`}
                  >
                    <Maximize2 className="w-5 h-5 text-pink-400" />
                    <span>4:3 Foto</span>
                  </button>

                  <button
                    onClick={() => setCropAspect('16:9')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cropAspect === '16:9'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-[#1a1b22] border-[#282a36] text-gray-300 hover:border-purple-500/50'
                    }`}
                  >
                    <Maximize2 className="w-5 h-5 text-amber-400" />
                    <span>16:9 Banner</span>
                  </button>

                  <button
                    onClick={() => setCropAspect('tablet')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cropAspect === 'tablet'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-[#1a1b22] border-[#282a36] text-gray-300 hover:border-purple-500/50'
                    }`}
                  >
                    <Tablet className="w-5 h-5 text-sky-400" />
                    <span>Tablet / iPad</span>
                  </button>

                  <button
                    onClick={() => setCropAspect('android')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cropAspect === 'android'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-[#1a1b22] border-[#282a36] text-gray-300 hover:border-purple-500/50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                    <span>Android Mobile</span>
                  </button>

                  <button
                    onClick={() => setCropAspect('macos')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cropAspect === 'macos'
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-[#1a1b22] border-[#282a36] text-gray-300 hover:border-purple-500/50'
                    }`}
                  >
                    <Laptop className="w-5 h-5 text-purple-400" />
                    <span>macOS Desktop</span>
                  </button>
                </div>

                {/* Crop Rotation */}
                <div className="bg-[#1a1b22] p-3 rounded-xl border border-[#282a36] space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-gray-300">
                    <span className="flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5 text-sky-400" /> Rotação do Corte
                    </span>
                    <span className="font-mono text-purple-400">{cropRotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={cropRotation}
                    onChange={(e) => setCropRotation(parseInt(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <button
                  onClick={handleApplyCrop}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Aplicar Recorte na Imagem</span>
                </button>
              </div>
            )}

            {/* TAB 3: FILTROS */}
            {activeTab === 'filters' && (
              <div className="space-y-4">
                <div className="font-bold text-purple-300 pb-2 border-b border-[#282a36]">
                  Filtros Estéticos Não Destrutivos
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'none', label: 'Original / Nenhum', color: 'from-slate-700 to-slate-900' },
                    { id: 'vintage', label: 'Vintage Retro', color: 'from-amber-700 to-yellow-900' },
                    { id: 'hdr', label: 'HDR Vibrante', color: 'from-sky-600 to-blue-900' },
                    { id: 'neon', label: 'Cyberpunk Neon', color: 'from-pink-600 to-purple-900' },
                    { id: 'cinema', label: 'Cinema Mood', color: 'from-teal-700 to-slate-900' },
                    { id: 'popart', label: 'Pop Art', color: 'from-fuchsia-600 to-pink-800' },
                    { id: 'cool', label: 'Tons Frios', color: 'from-cyan-700 to-blue-950' },
                    { id: 'warm', label: 'Tons Quentes', color: 'from-orange-600 to-red-900' },
                    { id: 'duotone', label: 'Duotone Sublimação', color: 'from-purple-800 to-indigo-950' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilters({ ...filters, presetFilter: f.id })}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-20 transition-all cursor-pointer bg-gradient-to-br ${f.color} ${
                        filters.presetFilter === f.id
                          ? 'border-purple-400 ring-2 ring-purple-500/50 shadow-lg scale-[1.02]'
                          : 'border-white/10 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span className="font-bold text-xs text-white">{f.label}</span>
                      {filters.presetFilter === f.id && (
                        <span className="self-end px-1.5 py-0.5 rounded bg-purple-500 text-[9px] font-bold text-white">
                          ATIVO
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Filter Intensity Slider */}
                <div className="bg-[#1a1b22] p-3 rounded-xl border border-[#282a36] space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-gray-300">
                    <span>Intensidade do Filtro</span>
                    <span className="font-mono text-purple-400">{filters.filterIntensity ?? 100}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.filterIntensity ?? 100}
                    onChange={(e) => setFilters({ ...filters, filterIntensity: parseInt(e.target.value) })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: SMART AI TOOLS */}
            {activeTab === 'smart' && (
              <div className="space-y-3">
                <div className="font-bold text-amber-300 pb-2 border-b border-[#282a36] flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4 text-amber-400" />
                  Ferramentas Inteligentes de Edição
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Remove BG */}
                  <button
                    onClick={handleRemoveBackground}
                    className="p-3 bg-[#1a1b22] hover:bg-purple-900/30 border border-[#282a36] hover:border-purple-500/50 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      <Wand2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Remover Fundo</div>
                      <div className="text-[10px] text-gray-400">Remove fundos claros/brancos com transparência</div>
                    </div>
                  </button>

                  {/* Vetorizar */}
                  <button
                    onClick={handleVectorize}
                    className="p-3 bg-[#1a1b22] hover:bg-sky-900/30 border border-[#282a36] hover:border-sky-500/50 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Vetorizar Estampa</div>
                      <div className="text-[10px] text-gray-400">Converte fotos em arte vetorial nítida</div>
                    </div>
                  </button>

                  {/* Upscale 2x */}
                  <button
                    onClick={() => handleUpscale(2)}
                    className="p-3 bg-[#1a1b22] hover:bg-emerald-900/30 border border-[#282a36] hover:border-emerald-500/50 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Upscale 2x HD</div>
                      <div className="text-[10px] text-gray-400">Dobrar resolução para impressão 300 DPI</div>
                    </div>
                  </button>

                  {/* Auto Crop Transparente */}
                  <button
                    onClick={handleAutoCropTransparent}
                    className="p-3 bg-[#1a1b22] hover:bg-pink-900/30 border border-[#282a36] hover:border-pink-500/50 rounded-2xl flex items-center gap-3 text-left transition-all cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      <Crop className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Auto Enquadramento</div>
                      <div className="text-[10px] text-gray-400">Elimina bordas transparentes desnecessárias</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: EDITAR PALAVRAS / WORDART STUDIO */}
            {activeTab === 'words' && (
              <div className="space-y-4">
                {/* Header & Style Selector */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#282a36]">
                  <span className="font-bold text-pink-300 flex items-center gap-1.5 text-sm">
                    <Type className="w-4 h-4 text-pink-400" />
                    Editor de Palavras e Estilos WordArt
                  </span>

                  {/* Mode Switcher */}
                  <div className="flex items-center gap-1 p-1 bg-[#121318] border border-[#2d2e38] rounded-xl self-stretch sm:self-auto">
                    <button
                      onClick={() => setWordArtMode('wordart1')}
                      className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        wordArtMode === 'wordart1'
                          ? 'bg-purple-600 text-white shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      ☁️ WordArt 1 (Nuvem)
                    </button>
                    <button
                      onClick={() => setWordArtMode('wordart2')}
                      className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        wordArtMode === 'wordart2'
                          ? 'bg-pink-600 text-white shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      ✨ WordArt 2 (Texto 3D)
                    </button>
                  </div>
                </div>

                {/* WORDART 2 EDITING CONTROLS */}
                {wordArtMode === 'wordart2' ? (
                  <div className="space-y-4">
                    {/* Primary Text & Subtext Inputs */}
                    <div className="bg-[#181920] p-3 rounded-xl border border-[#2d2e38] space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-pink-300 flex items-center justify-between">
                          <span>Texto Principal do WordArt 2:</span>
                          <span className="text-[10px] font-normal text-gray-400">ex: GRATIDÃO & FÉ, SUPER MÃE...</span>
                        </label>
                        <input
                          type="text"
                          value={w2Content}
                          onChange={(e) => setW2Content(e.target.value)}
                          placeholder="Digite o Texto do WordArt (ex: GRATIDÃO & FÉ)..."
                          className="w-full bg-[#121318] border border-pink-500/50 rounded-lg px-3 py-2 text-sm text-white font-bold placeholder-gray-500 focus:outline-none focus:border-pink-500 shadow-inner"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300 flex items-center justify-between">
                          <span>Subpalavras / Subtexto Secundário (opcional):</span>
                          <span className="text-[10px] text-gray-400">Separados por vírgula</span>
                        </label>
                        <input
                          type="text"
                          value={w2Subwords}
                          onChange={(e) => setW2Subwords(e.target.value)}
                          placeholder="ex: Família, Carinho, União, Afeto, Gratidão..."
                          className="w-full bg-[#121318] border border-[#383945] rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                        />
                      </div>
                    </div>

                    {/* Presets Gallery */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-pink-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Estilos Rápidos do WordArt 2 (Presets):
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {WORDART_2_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => {
                              setW2Content(preset.content);
                              if (preset.subwords !== undefined) setW2Subwords(preset.subwords);
                              setW2FontFamily(preset.fontFamily);
                              setW2WarpStyle(preset.warpStyle);
                              setW2WarpIntensity(preset.warpIntensity);
                              setW2Color(preset.color);
                              setW2StrokeColor(preset.strokeColor);
                              setW2StrokeWidth(preset.strokeWidth);
                              setW2ShadowColor(preset.shadowColor);
                              setW2ShadowBlur(preset.shadowBlur);
                            }}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-16 ${
                              w2FontFamily === preset.fontFamily && w2WarpStyle === preset.warpStyle
                                ? 'bg-pink-900/40 border-pink-500 shadow-lg ring-1 ring-pink-500/50'
                                : 'bg-[#181920] border-[#2d2e38] hover:border-pink-500/40'
                            }`}
                          >
                            <span className="text-[10px] font-bold text-gray-300 truncate">{preset.name}</span>
                            <div
                              className="text-xs font-black truncate"
                              style={{ color: preset.color, fontFamily: preset.fontFamily }}
                            >
                              {preset.content}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Typography & Warp */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#181920] p-3 rounded-xl border border-[#2d2e38]">
                      {/* Font Family */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">Fonte Tipográfica:</label>
                        <select
                          value={w2FontFamily}
                          onChange={(e) => setW2FontFamily(e.target.value)}
                          className="w-full bg-[#121318] border border-[#383945] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-pink-500 cursor-pointer font-semibold"
                        >
                          {WORDART_2_FONTS.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Warp Intensity Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-gray-300">
                          <span>Intensidade da Curva / Arco:</span>
                          <span className="font-mono text-pink-400">{w2WarpIntensity}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={w2WarpIntensity}
                          onChange={(e) => setW2WarpIntensity(parseInt(e.target.value))}
                          className="w-full accent-pink-500 cursor-pointer"
                        />
                      </div>

                      {/* Warp Style Selector */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">Estilo de Curvatura / Deformação:</label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
                          {WORDART_2_WARP_STYLES.map((ws) => (
                            <button
                              key={ws.id}
                              onClick={() => setW2WarpStyle(ws.id)}
                              className={`py-1.5 px-2 rounded-lg border text-[10px] font-bold text-center transition-all cursor-pointer truncate ${
                                w2WarpStyle === ws.id
                                  ? 'bg-pink-600 text-white border-pink-400 shadow'
                                  : 'bg-[#121318] text-gray-300 border-[#2d2e38] hover:border-pink-500/40'
                              }`}
                            >
                              {ws.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Colors & Effects */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#181920] p-3 rounded-xl border border-[#2d2e38]">
                      {/* Main Color */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-300">Cor do Texto:</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={w2Color}
                            onChange={(e) => setW2Color(e.target.value)}
                            className="w-8 h-8 rounded-lg border border-gray-600 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={w2Color}
                            onChange={(e) => setW2Color(e.target.value)}
                            className="w-20 bg-[#121318] border border-[#383945] rounded-lg px-2 py-1 text-xs text-white font-mono uppercase"
                          />
                        </div>
                      </div>

                      {/* Stroke Color & Width */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-gray-300">
                          <span>Contorno:</span>
                          <span className="font-mono text-pink-400">{w2StrokeWidth}px</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={w2StrokeColor}
                            onChange={(e) => setW2StrokeColor(e.target.value)}
                            className="w-8 h-8 rounded-lg border border-gray-600 bg-transparent cursor-pointer"
                          />
                          <input
                            type="range"
                            min={0}
                            max={10}
                            value={w2StrokeWidth}
                            onChange={(e) => setW2StrokeWidth(parseInt(e.target.value))}
                            className="flex-1 accent-pink-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Shadow Color & Blur */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-gray-300">
                          <span>Sombra / Glow:</span>
                          <span className="font-mono text-pink-400">{w2ShadowBlur}px</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={w2ShadowColor.startsWith('#') ? w2ShadowColor : '#8a6d1b'}
                            onChange={(e) => setW2ShadowColor(e.target.value)}
                            className="w-8 h-8 rounded-lg border border-gray-600 bg-transparent cursor-pointer"
                          />
                          <input
                            type="range"
                            min={0}
                            max={30}
                            value={w2ShadowBlur}
                            onChange={(e) => setW2ShadowBlur(parseInt(e.target.value))}
                            className="flex-1 accent-pink-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <button
                        onClick={renderWordArt2Preview}
                        className="flex-1 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-[0.98]"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Atualizar e Renderizar WordArt 2</span>
                      </button>

                      {onOpenWordArtStudio && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenWordArtStudio(activeLayer.id, 'wordart2');
                          }}
                          className="py-2.5 px-4 bg-[#23242e] hover:bg-[#2e2f3d] border border-pink-500/30 text-pink-300 font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Abrir Estúdio WordArt 2 Completo</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* WORDART 1 (WORD CLOUD) CONTROLS */
                  <div className="space-y-4">
                    {/* AI Theme Word Generator Box */}
                    <div className="bg-gradient-to-r from-purple-950/40 to-pink-950/40 p-3 rounded-xl border border-purple-800/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-purple-300 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          Gerar Lista de Palavras por Tema com IA
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={aiThemeInputModal}
                          onChange={(e) => setAiThemeInputModal(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleGenerateWordsFromAIModal();
                          }}
                          placeholder="Digite o Tema (ex: Dia das Mães, Futebol, Enfermagem)..."
                          className="flex-1 bg-[#121318] border border-purple-900/80 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-medium"
                        />
                        <button
                          onClick={() => handleGenerateWordsFromAIModal()}
                          disabled={isGeneratingAiWordsModal || !aiThemeInputModal.trim()}
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap shadow"
                        >
                          {isGeneratingAiWordsModal ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                              <span>Gerar Lista</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {['Dia das Mães', 'Dia dos Pais', 'Futebol', 'Aniversário', 'Enfermagem', 'Gamer', 'Fé'].map((preset) => (
                          <button
                            key={preset}
                            onClick={() => {
                              setAiThemeInputModal(preset);
                              handleGenerateWordsFromAIModal(preset);
                            }}
                            className="px-2 py-0.5 text-[9px] font-semibold rounded border border-purple-800/50 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50 transition cursor-pointer"
                          >
                            + {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add word bar */}
                    <div className="bg-[#181920] p-3 rounded-xl border border-[#2d2e38] space-y-2">
                      <div className="text-[11px] font-semibold text-gray-300 flex items-center justify-between">
                        <span>Adicionar Palavra Individual:</span>
                        <button
                          onClick={() => setShowBulkInput(!showBulkInput)}
                          className="text-purple-400 hover:text-purple-300 text-[10px] underline cursor-pointer"
                        >
                          {showBulkInput ? 'Fechar Inserção em Lote' : 'Inserir Palavras em Lote'}
                        </button>
                      </div>

                      {!showBulkInput ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newWordText}
                            onChange={(e) => setNewWordText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleAddWord();
                            }}
                            placeholder="Digite a palavra (ex: SUBLIMAÇÃO)..."
                            className="flex-1 bg-[#121318] border border-[#383945] rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                          />
                          <div className="flex items-center gap-1 bg-[#121318] border border-[#383945] rounded-lg px-2 py-1">
                            <span className="text-[10px] text-gray-400 font-mono">Peso:</span>
                            <input
                              type="range"
                              min={1}
                              max={10}
                              value={newWordWeight}
                              onChange={(e) => setNewWordWeight(parseInt(e.target.value))}
                              className="w-16 accent-pink-500 cursor-pointer"
                              title="Peso/Tamanho da Palavra"
                            />
                            <span className="text-[10px] font-bold text-pink-400 font-mono w-4 text-center">
                              {newWordWeight}
                            </span>
                          </div>
                          <button
                            onClick={handleAddWord}
                            className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Adicionar</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <textarea
                            value={bulkText}
                            onChange={(e) => setBulkText(e.target.value)}
                            placeholder="Cole aqui a lista de palavras separadas por vírgula ou por linha (ex: AMOR, FAMÍLIA, PAIS, CANECA, ESTAMPA)..."
                            rows={3}
                            className="w-full bg-[#121318] border border-[#383945] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-pink-500"
                          />
                          <button
                            onClick={handleBulkInsertWords}
                            className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Importar Lista de Palavras</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Words list chips */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 px-0.5">
                        <span>Palavras da Nuvem ({wordItems.length}):</span>
                        {wordItems.length > 0 && (
                          <button
                            onClick={() => {
                              setWordItems([]);
                              handleRegenerateWordArtWithList([]);
                            }}
                            className="text-rose-400 hover:text-rose-300 text-[10px] cursor-pointer"
                          >
                            Excluir/Limpar Todas
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 max-h-[130px] overflow-y-auto custom-scrollbar p-2 bg-[#121318] border border-[#2d2e38] rounded-xl">
                        {wordItems.length === 0 ? (
                          <span className="text-gray-500 text-[11px] italic p-1">
                            Nenhuma palavra adicionada. Adicione uma palavra acima ou gere uma lista por tema!
                          </span>
                        ) : (
                          wordItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-1.5 px-2 py-1 bg-[#1d1e28] border border-purple-500/30 rounded-lg text-xs font-semibold text-purple-200 group hover:border-pink-500 transition-colors"
                            >
                              {editingWordId === item.id ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={editingWordText}
                                    onChange={(e) => setEditingWordText(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleSaveEditedWord(item.id);
                                      if (e.key === 'Escape') setEditingWordId(null);
                                    }}
                                    autoFocus
                                    className="bg-[#121318] border border-pink-500 text-white text-xs px-1.5 py-0.5 rounded outline-none max-w-[100px]"
                                  />
                                  <button
                                    onClick={() => handleSaveEditedWord(item.id)}
                                    className="text-emerald-400 hover:text-emerald-300 p-0.5 cursor-pointer"
                                    title="Salvar Texto"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <span
                                  onClick={() => {
                                    setEditingWordId(item.id);
                                    setEditingWordText(item.text);
                                  }}
                                  className="truncate max-w-[120px] cursor-pointer hover:text-pink-300 hover:underline"
                                  title="Clique para editar o texto da palavra"
                                >
                                  {item.text}
                                </span>
                              )}

                              <div className="flex items-center gap-0.5 bg-[#121318] px-1 py-0.5 rounded border border-purple-500/20">
                                <button
                                  onClick={() => handleUpdateWordWeight(item.id, -1)}
                                  className="w-3.5 h-3.5 rounded bg-purple-900/60 hover:bg-purple-800 text-purple-300 flex items-center justify-center text-[10px] cursor-pointer font-extrabold"
                                  title="Diminuir Peso/Tamanho da Palavra"
                                >
                                  -
                                </button>
                                <span className="text-[9px] font-mono px-0.5 text-pink-300 font-bold min-w-3 text-center">
                                  {item.weight}
                                </span>
                                <button
                                  onClick={() => handleUpdateWordWeight(item.id, 1)}
                                  className="w-3.5 h-3.5 rounded bg-purple-900/60 hover:bg-purple-800 text-purple-300 flex items-center justify-center text-[10px] cursor-pointer font-extrabold"
                                  title="Aumentar Peso/Tamanho da Palavra"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => handleDeleteWord(item.id)}
                                className="text-gray-400 hover:text-rose-400 transition-colors cursor-pointer ml-0.5 p-0.5 rounded hover:bg-rose-500/10"
                                title="Excluir esta Palavra"
                              >
                                <X className="w-3.5 h-3.5 text-rose-400" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* WordArt Visual Options (Shape, Palette, Font, Layout) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Shape Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
                          <Shapes className="w-3.5 h-3.5 text-purple-400" />
                          Formato da Estampa (Molde):
                        </label>
                        <div className="grid grid-cols-4 gap-1">
                          {SHAPE_PRESETS.map((shape) => (
                            <button
                              key={shape.id}
                              onClick={() => {
                                setWordShape(shape.id);
                                handleRegenerateWordArtWithList(wordItems, shape.id);
                              }}
                              className={`p-1.5 rounded-lg border text-[10px] font-bold text-center transition-all cursor-pointer ${
                                wordShape === shape.id
                                  ? 'bg-purple-600 text-white border-purple-400 shadow'
                                  : 'bg-[#181920] text-gray-300 border-[#2d2e38] hover:border-purple-500/50'
                              }`}
                            >
                              {shape.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Palette Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
                          <Palette className="w-3.5 h-3.5 text-pink-400" />
                          Paleta de Cores:
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {COLOR_PALETTES.map((pal) => (
                            <button
                              key={pal.id}
                              onClick={() => {
                                setWordPaletteId(pal.id);
                                handleRegenerateWordArtWithList(wordItems, undefined, pal.id);
                              }}
                              className={`p-1.5 rounded-lg border flex flex-col gap-1 transition-all cursor-pointer ${
                                wordPaletteId === pal.id
                                  ? 'bg-purple-900/30 border-pink-500 shadow'
                                  : 'bg-[#181920] border-[#2d2e38] hover:border-gray-500'
                              }`}
                            >
                              <span className="text-[10px] font-bold text-gray-200 truncate">{pal.name}</span>
                              <div className="flex items-center gap-0.5">
                                {pal.colors.map((c, idx) => (
                                  <div key={idx} className="w-3 h-3 rounded-full border border-black/30" style={{ backgroundColor: c }} />
                                ))}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Font Family Selector */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">Fonte Tipográfica:</label>
                        <select
                          value={wordFont}
                          onChange={(e) => {
                            const newFont = e.target.value;
                            setWordFont(newFont);
                            handleRegenerateWordArtWithList(wordItems, undefined, undefined, newFont);
                          }}
                          className="w-full bg-[#181920] border border-[#2d2e38] rounded-lg p-1.5 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                        >
                          {WORD_FONTS.map((font) => (
                            <option key={font} value={font}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Layout Angle Selector */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-300">Disposição do Texto:</label>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            onClick={() => {
                              setWordLayout('mixed');
                              handleRegenerateWordArtWithList(wordItems, undefined, undefined, undefined, 'mixed');
                            }}
                            className={`py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all cursor-pointer ${
                              wordLayout === 'mixed'
                                ? 'bg-purple-600 text-white border-purple-400'
                                : 'bg-[#181920] text-gray-300 border-[#2d2e38]'
                            }`}
                          >
                            Misto (H + V)
                          </button>
                          <button
                            onClick={() => {
                              setWordLayout('horizontal');
                              handleRegenerateWordArtWithList(wordItems, undefined, undefined, undefined, 'horizontal');
                            }}
                            className={`py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all cursor-pointer ${
                              wordLayout === 'horizontal'
                                ? 'bg-purple-600 text-white border-purple-400'
                                : 'bg-[#181920] text-gray-300 border-[#2d2e38]'
                            }`}
                          >
                            Horizontal
                          </button>
                          <button
                            onClick={() => {
                              setWordLayout('angles');
                              handleRegenerateWordArtWithList(wordItems, undefined, undefined, undefined, 'angles');
                            }}
                            className={`py-1.5 rounded-lg border text-[10px] font-bold text-center transition-all cursor-pointer ${
                              wordLayout === 'angles'
                                ? 'bg-purple-600 text-white border-purple-400'
                                : 'bg-[#181920] text-gray-300 border-[#2d2e38]'
                            }`}
                          >
                            Multi-Ângulos
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Repeat Words Toggle */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#181920] border border-[#2d2e38]">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-gray-200">Repetir Palavras na Nuvem</span>
                        <span className="text-[10px] text-gray-400">
                          {repeatWords ? 'Ativado: Palavras se repetem para preencher' : 'Desativado: Cada palavra aparece no máximo 1 vez (sem repetição)'}
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={repeatWords}
                          onChange={(e) => {
                            const newRepeat = e.target.checked;
                            setRepeatWords(newRepeat);
                            handleRegenerateWordArtWithList(wordItems, undefined, undefined, undefined, undefined, newRepeat);
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-[#2d2e38] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
                      </label>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <button
                        onClick={() => handleRegenerateWordArtWithList()}
                        className="flex-1 py-2.5 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all active:scale-[0.98]"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Atualizar e Renderizar Nuvem WordArt</span>
                      </button>

                      {onOpenWordArtStudio && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenWordArtStudio(activeLayer.id, 'wordart1');
                          }}
                          className="py-2.5 px-4 bg-[#23242e] hover:bg-[#2e2f3d] border border-purple-500/30 text-purple-300 font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Abrir Estúdio WordArt 1 Completo</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`flex items-center justify-between px-5 py-3 border-t ${
          theme === 'light' ? 'border-purple-100 bg-purple-50/50' : 'border-[#282a36] bg-[#1a1b22]'
        }`}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={handleApply}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Salvar e Aplicar no Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
