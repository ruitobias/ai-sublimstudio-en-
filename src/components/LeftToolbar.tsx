import React, { useState } from 'react';
import {
  LayoutTemplate,
  Shapes,
  Type,
  ImagePlus,
  Coffee,
  Sparkles,
  Layers,
  Search,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Square,
  Circle,
  Hexagon,
  Star,
  Award,
  Heart,
  Wand2,
  Maximize2,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Plus,
  Upload,
  User,
  LogIn,
  LogOut,
  UserCheck,
  FileType,
  Clipboard,
  ExternalLink,
  Zap,
  Check,
  ShieldCheck,
  FolderOpen,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { setAsset } from '../lib/imageAssetStore';
import { ToolType, ShapeType, SublimationProduct, Layer, TextWarpStyle } from '../types';
import { PRODUCTS_LIBRARY } from '../data/products';
import { ALL_VECTOR_SHAPES, SHAPE_CATEGORIES } from '../utils/shapeDrawer';
import { ShapePreviewCanvas } from './ShapePreviewCanvas';
import { VECTOR_FONTS, FontDefinition } from '../data/fonts';
import { VECTOR_TEXT_PRESETS, VectorTextPreset } from '../data/vectorTextPresets';
import { ProductIcon } from './ProductIcon';
import {
  CANVA_TEMPLATES,
  CanvaTemplateItem,
  searchCanvaTemplates,
  getPaizaoTemplateLayers,
  getCherryTemplateLayers,
  getGratidaoTemplateLayers,
  getRuiTobiasCustomTemplateLayers,
  getFelizNatalTemplateLayers,
  getNatalHoHoPatternTemplateLayers,
  getNatalSantaWatercolorTemplateLayers,
  getNatalVintageStampsTemplateLayers,
  getNatalMerryChristmasPolaroidTemplateLayers,
  getNatalGeometricTemplateLayers,
  getNatalChristmasIsLoveTemplateLayers,
  getNatalNatividadeTemplateLayers,
  getNatalKraftFloralTemplateLayers,
  getNatalDouradoLuxoTemplateLayers,
  getNatalMagicoPatternTemplateLayers,
  getNatalSagradaFamiliaTemplateLayers,
  getNatalCapivaraTemplateLayers,
  getNatalNatividadeBrilhoTemplateLayers,
  getNatalMaePresenteTemplateLayers,
  getNatalBonecoNeveAquarelaTemplateLayers,
  getNatalPapaiNoelDoodleTemplateLayers,
  getNatalBolinhasDesejosTemplateLayers,
  getNatalHoHoPapaiNoelChegouTemplateLayers,
  getNatalGingerbreadCandyTemplateLayers,
  getNatalVermelhoNobreTemplateLayers,
  getPaisCoracaoRecortadoTemplateLayers,
  getPaisMedalhaSuperPaiAzulTemplateLayers,
  getFathersDayAzureStarsTemplateLayers,
  getPaisMeuHeroiBlueyTemplateLayers,
  getPaisTiraFotosVintageTemplateLayers,
  getPaisEuTeAmoBoldTemplateLayers,
  getPaisMonolineMinimalistaTemplateLayers,
  getPaisSuperHeroiTemplateLayers,
  getPaisTabelaNutricionalTemplateLayers,
  getPaisTeAmoForcaSabedoriaTemplateLayers,
  getPaisTiraDuplaRippedTemplateLayers,
  getPaisTimeCafeRetroTemplateLayers,
  getMaesMolduraFloralTemplateLayers,
  getMaesMargaridasEspecialTemplateLayers,
  getMaesForcaBotanicoTemplateLayers,
  getMaesMelhorMaeIconsTemplateLayers,
  getMaesAquarelaRoseTemplateLayers,
  getMaesOrganicoArcoTemplateLayers,
  getMaesAmorCafeRippedTemplateLayers,
  getMaesSorrisoRosasTemplateLayers,
  getMaesBaloes3DAnjosTemplateLayers,
  getMaesDuplaPolaroidTemplateLayers,
  getLionStreetwearTemplateLayers,
  getIluminadoTemplateLayers,
  getMotherDayTemplateLayers,
  getVintageCoffeeTemplateLayers,
  getPetWatercolorTemplateLayers,
  getCyberpunkRetrowaveTemplateLayers,
  CANVA_PAIZAO_SVG,
  CANVA_PAIS_MEDALHA_SUPER_PAI_AZUL_SVG,
  CANVA_PAIS_ILUSTRACAO_ESTRELAS_AZURE_SVG,
  CANVA_PAIS_CORACAO_RECORTADO_SVG,
  CANVA_PAIS_MEU_HEROI_BLUEY_SVG,
  CANVA_PAIS_TIRA_FOTOS_VINTAGE_SVG,
  CANVA_PAIS_EU_TE_AMO_BOLD_SVG,
  CANVA_PAIS_MONOLINE_MINIMALISTA_SVG,
  CANVA_PAIS_SUPER_HEROI_SVG,
  CANVA_PAIS_TABELA_NUTRICIONAL_SVG,
  CANVA_PAIS_TE_AMO_FORCA_SABEDORIA_SVG,
  CANVA_PAIS_TIRA_DUPLA_RIPPED_SVG,
  CANVA_PAIS_TIME_CAFE_RETRO_SVG,
  CANVA_MAES_MOLDURA_FLORAL_SVG,
  CANVA_MAES_MARGARIDAS_ESPECIAL_SVG,
  CANVA_MAES_FORCA_BOTANICO_SVG,
  CANVA_MAES_MELHOR_MAE_ICONS_SVG,
  CANVA_MAES_AQUARELA_ROSE_SVG,
  CANVA_MAES_ORGANICO_ARCO_SVG,
  CANVA_MAES_AMOR_CAFE_RIPPED_SVG,
  CANVA_MAES_SORRISO_ROSAS_SVG,
  CANVA_MAES_BALOES_3D_ANJOS_SVG,
  CANVA_MAES_DUPLA_POLAROID_SVG,
  CANVA_LION_SHIELD_SVG,
  CANVA_CHERRY_SVG,
  CANVA_ILUMINADO_SVG,
  CANVA_GRATIDAO_SVG,
  CANVA_RUI_TOBIAS_DAHSWYJX7QW_SVG,
  CANVA_FELIZ_NATAL_SVG,
  CANVA_NATAL_HOHO_SVG,
  CANVA_NATAL_SANTA_POLAROID_SVG,
  CANVA_NATAL_VINTAGE_STAMPS_SVG,
  CANVA_NATAL_MERRY_CHRISTMAS_SVG,
  CANVA_NATAL_GEOMETRIC_SVG,
  CANVA_NATAL_CHRISTMAS_IS_LOVE_SVG,
  CANVA_NATAL_NATIVIDADE_DOURADO_SVG,
  CANVA_NATAL_KRAFT_FLORAL_SVG,
  CANVA_NATAL_DOURADO_LUXO_SVG,
  CANVA_NATAL_MAGICO_PATTERN_SVG,
  CANVA_NATAL_SAGRADA_FAMILIA_SVG,
  CANVA_NATAL_CAPIVARA_SVG,
  CANVA_NATAL_NATIVIDADE_BRILHO_SVG,
  CANVA_NATAL_MAE_PRESENTE_SVG,
  CANVA_NATAL_BONECO_NEVE_AQUARELA_SVG,
  CANVA_NATAL_PAPAI_NOEL_DOODLE_SVG,
  CANVA_NATAL_BOLINHAS_DESEJOS_SVG,
  CANVA_NATAL_HOHO_PAPAI_NOEL_CHEGOU_SVG,
  CANVA_NATAL_GINGERBREAD_CANDY_SVG,
  CANVA_NATAL_VERMELHO_NOBRE_SVG,
} from '../data/canvaTemplates';
import { useTranslation } from '../i18n';

export type SidebarTabType = 'templates' | 'elements' | 'text' | 'uploads' | 'products' | 'ai' | 'layers' | 'history' | 'presets' | 'vector' | 'canva';

export interface LeftToolbarProps {
  activeTool?: ToolType;
  setActiveTool?: (tool: ToolType) => void;
  onSelectTool?: (tool: ToolType) => void;
  activeSidebarTab?: SidebarTabType | null;
  setActiveSidebarTab?: (tab: SidebarTabType | null) => void;
  selectedShape?: ShapeType;
  onSelectShape?: (shape: ShapeType) => void;
  activeColor?: string;
  onChangeColor?: (color: string) => void;
  fillColor?: string;
  setFillColor?: (color: string) => void;
  strokeColor?: string;
  setStrokeColor?: (color: string) => void;
  onOpenColorPicker?: (type: 'fill' | 'stroke') => void;
  brushSize?: number;
  onChangeBrushSize?: (size: number) => void;
  onAddLayer?: (
    type: 'text' | 'shape' | 'image',
    customShape?: ShapeType,
    defaultWarpStyle?: TextWarpStyle,
    customFontFamily?: string
  ) => void;
  onAddVectorTextPreset?: (preset: VectorTextPreset) => void;
  currentProduct?: SublimationProduct;
  onSelectProduct?: (product: SublimationProduct) => void;
  layers?: Layer[];
  activeLayerId?: string | null;
  onSelectLayer?: (id: string | null) => void;
  onUpdateLayer?: (layer: Layer) => void;
  onDeleteLayer?: (id: string) => void;
  onDuplicateLayer?: (id: string) => void;
  onAddAIGeneratedImage?: (url: string, title: string) => void;
  onOpenAIPanel?: () => void;
  onOpenWordArtModal?: () => void;
  // New: open WordArt2 specifically
  onOpenWordArt2?: () => void;
  onOpenCanva?: () => void;
  onImportFromCanva?: (imageUrl: string, title: string, options?: { isBackground?: boolean }) => void;
  onLoadTemplateLayers?: (templateName: string, layers: Layer[]) => void;
  onOpenProjectFile?: () => void;
  projectName?: string;
  onPasteFromClipboard?: () => void;
  darkMode?: boolean;
  theme?: 'dark' | 'light';
  currentUser?: { name: string; email: string; isPro?: boolean } | null;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
}

export const LeftToolbar: React.FC<LeftToolbarProps> = ({
  activeTool = 'select',
  setActiveTool,
  onSelectTool,
  activeSidebarTab: externalActiveSidebarTab,
  setActiveSidebarTab: externalSetActiveSidebarTab,
  selectedShape = 'rectangle',
  onSelectShape,
  activeColor: externalActiveColor,
  onChangeColor,
  fillColor = '#00D9FF',
  setFillColor,
  strokeColor = '#0F172A',
  setStrokeColor,
  onOpenColorPicker,
  brushSize = 5,
  onChangeBrushSize,
  onAddLayer,
  onAddVectorTextPreset,
  currentProduct,
  onSelectProduct,
  layers = [],
  activeLayerId = null,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onAddAIGeneratedImage,
  onOpenAIPanel,
  onOpenWordArtModal,
  onOpenWordArt2,
  onOpenCanva,
  onImportFromCanva,
  onLoadTemplateLayers,
  onOpenProjectFile,
  projectName = 'Arte Sublimação',
  onPasteFromClipboard,
  darkMode = true,
  theme = darkMode ? 'dark' : 'light',
  currentUser = null,
  onOpenAuthModal,
  onLogout,
}) => {
  const { t } = useTranslation();
  // Active Color
  const activeColor = externalActiveColor || fillColor;

  // Canva Active Drawer Tab
  const [internalActiveTab, setInternalActiveTab] = useState<SidebarTabType | null>('templates');
  const [internalIsDrawerOpen, setInternalIsDrawerOpen] = useState<boolean>(true);
  const [isRailCollapsed, setIsRailCollapsed] = useState<boolean>(false);

  // Canva Integration State
  const [isCanvaConnected, setIsCanvaConnected] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sublimstudio_canva_connected') === 'true';
    } catch {
      return false;
    }
  });
  const [isConnectingCanva, setIsConnectingCanva] = useState<boolean>(false);
  const [canvaCategory, setCanvaCategory] = useState<string>('all');
  const [canvaSearchQuery, setCanvaSearchQuery] = useState<string>('');

  const handleConnectCanvaFromToolbar = () => {
    setIsConnectingCanva(true);
    const width = 580;
    const height = 680;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      '/canva-callback.html',
      'CanvaOAuth',
      `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
    );

    const onAuthMessage = async (e: MessageEvent) => {
      if (e.data?.tipo === 'CANVA_AUTH_SUCCESS') {
        window.removeEventListener('message', onAuthMessage);
        try {
          await fetch('/api/canva/oauth/exchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: e.data.code }),
          });
        } catch (err) {
          console.warn('Canva token exchange warning:', err);
        }
        setIsConnectingCanva(false);
        setIsCanvaConnected(true);
        localStorage.setItem('sublimstudio_canva_connected', 'true');
      }
    };

    window.addEventListener('message', onAuthMessage);

    setTimeout(() => {
      setIsConnectingCanva(false);
      setIsCanvaConnected(true);
      localStorage.setItem('sublimstudio_canva_connected', 'true');
    }, 2500);
  };

  const handleDisconnectCanvaFromToolbar = () => {
    setIsCanvaConnected(false);
    localStorage.removeItem('sublimstudio_canva_connected');
  };

  const handleOpenCanvaCustomSize = () => {
    const widthMm = Math.round((currentProduct?.printWidthMm || currentProduct?.defaultWidthCm ? (currentProduct?.defaultWidthCm || 20) * 10 : 200));
    const heightMm = Math.round((currentProduct?.printHeightMm || currentProduct?.defaultHeightCm ? (currentProduct?.defaultHeightCm || 9.5) * 10 : 95));
    const dpi = 300;
    const widthPx = Math.round((widthMm * dpi) / 25.4);
    const heightPx = Math.round((heightMm * dpi) / 25.4);
    window.open(`https://www.canva.com/create/custom-size/?width=${widthPx}&height=${heightPx}&unit=px`, '_blank', 'noopener,noreferrer');
  };

  const handleInsertCanvaTemplate = (tpl: CanvaTemplateItem, isBackground = false) => {
    if (!isBackground && onLoadTemplateLayers) {
      if (tpl.id.includes('hoho') || tpl.title.toLowerCase().includes('ho ho') || tpl.title.toLowerCase().includes('2025')) {
        onLoadTemplateLayers(tpl.title, getNatalHoHoPatternTemplateLayers(Date.now()));
        return;
      }
      if (tpl.id.includes('santa') || tpl.title.toLowerCase().includes('papai noel')) {
        onLoadTemplateLayers(tpl.title, getNatalSantaWatercolorTemplateLayers(Date.now()));
        return;
      }
      if (tpl.id.includes('vintage-stamps') || tpl.title.toLowerCase().includes('selos') || tpl.title.toLowerCase().includes('mágico') || tpl.title.toLowerCase().includes('magico')) {
        onLoadTemplateLayers(tpl.title, getNatalVintageStampsTemplateLayers(Date.now()));
        return;
      }
      if (tpl.id.includes('merry-christmas') || tpl.title.toLowerCase().includes('merry')) {
        onLoadTemplateLayers(tpl.title, getNatalMerryChristmasPolaroidTemplateLayers(Date.now()));
        return;
      }
      if (tpl.id.includes('natal') || tpl.title.toLowerCase().includes('natal') || tpl.title.toLowerCase().includes('christmas')) {
        onLoadTemplateLayers(tpl.title, getFelizNatalTemplateLayers(Date.now()));
        return;
      }
      if (tpl.id.includes('paizao') || tpl.title.toLowerCase().includes('paizão') || tpl.title.toLowerCase().includes('paizao')) {
        onLoadTemplateLayers(tpl.title, getPaizaoTemplateLayers(Date.now()));
        return;
      }
      if (tpl.id.includes('gratidao') || tpl.id.includes('dahswgbdg0a') || tpl.title.toLowerCase().includes('gratidão') || tpl.title.toLowerCase().includes('gratidao')) {
        onLoadTemplateLayers(tpl.title, getGratidaoTemplateLayers(Date.now()));
        return;
      }
      if (tpl.id.includes('cherry') || tpl.title.toLowerCase().includes('cereja')) {
        onLoadTemplateLayers(tpl.title, getCherryTemplateLayers(Date.now()));
        return;
      }
    }

    if (onImportFromCanva) {
      onImportFromCanva(tpl.previewUrl, tpl.title, { isBackground });
    } else if (onAddAIGeneratedImage) {
      onAddAIGeneratedImage(tpl.previewUrl, tpl.title);
    }
  };

  const activeTab = externalActiveSidebarTab !== undefined ? externalActiveSidebarTab : internalActiveTab;
  const isDrawerOpen = externalActiveSidebarTab !== undefined ? Boolean(externalActiveSidebarTab) : internalIsDrawerOpen;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string>('all');
  const [selectedShapeCategory, setSelectedShapeCategory] = useState<string>('all');
  const [shapeSearchQuery, setShapeSearchQuery] = useState<string>('');

  // User Custom Saved Templates (.sublimation / in-app models)
  const [userSavedTemplates, setUserSavedTemplates] = useState<Array<{
    id: string;
    title: string;
    category: string;
    description?: string;
    layers: Layer[];
    layersCount: number;
    createdAt: string;
    badge?: string;
    imageUrl?: string;
  }>>(() => {
    try {
      const raw = localStorage.getItem('sublimstudio_user_templates');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const handleSaveCurrentToTemplates = () => {
    if (!layers || layers.length === 0) {
      alert('Não há camadas no projeto atual para salvar como modelo pronto.');
      return;
    }
    const defaultName = projectName || 'Meu Modelo Sublimação';
    const templateTitle = window.prompt('Digite o nome do seu Modelo Pronto:', defaultName);
    if (!templateTitle || !templateTitle.trim()) return;

    // Use first image layer as thumbnail if present, else fallback
    const firstImgLayer = layers.find((l) => l.type === 'image' && l.content);
    const thumbUrl = firstImgLayer?.content || 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&auto=format&fit=crop&q=80';

    const newTemplate = {
      id: 'usr-tpl-' + Date.now(),
      title: templateTitle.trim(),
      category: 'Meus Modelos',
      description: `Modelo salvo em ${new Date().toLocaleDateString('pt-BR')} com ${layers.length} camadas (${currentProduct.name}).`,
      layers: JSON.parse(JSON.stringify(layers)),
      layersCount: layers.length,
      createdAt: new Date().toISOString(),
      badge: `⭐ ${layers.length} Camadas`,
      imageUrl: thumbUrl,
    };

    const updated = [newTemplate, ...userSavedTemplates];
    setUserSavedTemplates(updated);
    try {
      localStorage.setItem('sublimstudio_user_templates', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage limit reached', e);
    }
    setSelectedTemplateCategory('Meus Modelos');
  };

  const handleDeleteUserTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este modelo salvo?')) return;
    const updated = userSavedTemplates.filter((t) => t.id !== id);
    setUserSavedTemplates(updated);
    try {
      localStorage.setItem('sublimstudio_user_templates', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  // Vector Fonts & Typography State
  const [textSubTab, setTextSubTab] = useState<'presets' | 'fonts' | 'warp' | 'quick'>('presets');
  const [fontSearchQuery, setFontSearchQuery] = useState<string>('');
  const [selectedFontCategory, setSelectedFontCategory] = useState<string>('all');
  const [presetSearchQuery, setPresetSearchQuery] = useState<string>('');
  const [selectedPresetCategory, setSelectedPresetCategory] = useState<string>('all');

  const [recentlyUsedShapes, setRecentlyUsedShapes] = useState<string[]>([
    'line',
    'line_arrow',
    'rectangle',
    'circle',
    'rounded_rectangle',
    'triangle',
    'elbow_connector',
    'arrow_right',
    'star_5',
    'heart',
  ]);

  const handleSelectShapeWithRecent = (shapeId: string) => {
    if (onSelectShape) onSelectShape(shapeId);
    setRecentlyUsedShapes((prev) => [shapeId, ...prev.filter((id) => id !== shapeId)].slice(0, 16));
  };

  const handleApplyTextWarp = (warpStyle: TextWarpStyle) => {
    const activeL = layers.find((l) => l.id === activeLayerId);
    if (activeL && activeL.type === 'text' && onUpdateLayer) {
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
      ].includes(warpStyle);

      onUpdateLayer({
        ...activeL,
        textWarpStyle: warpStyle,
        textCurved: warpStyle !== 'straight',
        warpIntensity: activeL.warpIntensity ?? 50,
        curveRadius: activeL.curveRadius || 120,
        width: isSpaciousStyle ? Math.max(activeL.width, 320) : activeL.width,
        height: isSpaciousStyle ? Math.max(activeL.height, 220) : activeL.height,
      });
    } else if (onAddLayer) {
      onAddLayer('text', undefined, warpStyle);
    }
  };

  // Rich Sublimation Template Models (ready-to-edit multi-layer models & prints)
  const templatePresets = [
    {
      id: 'canva-natal-natividade-brilho',
      title: 'Feliz Natal • Natividade de Jesus & Brilho Dourado',
      category: 'Datas Especiais',
      description: 'Composição sacra e luminosa com traço artístico da Sagrada Família, estrela radiante de Belém e cantoneiras de ouro ornamentadas.',
      imageUrl: CANVA_NATAL_NATIVIDADE_BRILHO_SVG,
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getNatalNatividadeBrilhoTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-mae-presente',
      title: 'Mãe, você é meu presente diário • Dupla Foto & Pinheiros',
      category: 'Datas Especiais',
      description: 'Design afetuoso em verde oliva suave com duas molduras polaroid para fotos de Mãe e Filha e pinheiro natalino decorado.',
      imageUrl: CANVA_NATAL_MAE_PRESENTE_SVG,
      badge: '⭐ 8 Camadas Editáveis',
      layersCount: 8,
      getLayers: () => getNatalMaePresenteTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-boneco-neve-aquarela',
      title: 'Feliz Natal • Boneco de Neve & Árvore em Aquarela',
      category: 'Datas Especiais',
      description: 'Estampa meiga e aconchegante com boneco de neve e pinheiro natalino pintados em aquarela, bola de natal suspensa e lettering curvado.',
      imageUrl: CANVA_NATAL_BONECO_NEVE_AQUARELA_SVG,
      badge: '⭐ 2 Camadas Editáveis',
      layersCount: 2,
      getLayers: () => getNatalBonecoNeveAquarelaTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-papai-noel-doodle',
      title: 'Papai Noel Doodle • Feliz Natal Caligráfico & Enfeites',
      category: 'Datas Especiais',
      description: 'Design alegre em rosa claro com desenho doodle do Papai Noel, bengala doce, corações e tipografia festiva em dois tons.',
      imageUrl: CANVA_NATAL_PAPAI_NOEL_DOODLE_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getNatalPapaiNoelDoodleTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-bolinhas-desejos',
      title: 'Bolinhas de Natal dos Desejos • Fé, Amor, Saúde & Paz',
      category: 'Datas Especiais',
      description: 'Composição harmoniosa com 6 bolas natalinas suspensas trazendo votos de Fé, Amor, Saúde, Felicidade, Paz e Gratidão.',
      imageUrl: CANVA_NATAL_BOLINHAS_DESEJOS_SVG,
      badge: '⭐ 3 Camadas Editáveis',
      layersCount: 3,
      getLayers: () => getNatalBolinhasDesejosTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-hoho-papai-noel-chegou',
      title: 'Ho, Ho, Ho, Papai Noel Chegou • Moldura Fotográfica',
      category: 'Datas Especiais',
      description: 'Design festivo com slot polaroid para foto de família com laço dourado, lettering clássico Ho Ho Ho e caligrafia Feliz Natal.',
      imageUrl: CANVA_NATAL_HOHO_PAPAI_NOEL_CHEGOU_SVG,
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getNatalHoHoPapaiNoelChegouTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-gingerbread-candy',
      title: 'Gingerbread & Doces de Natal Cor-de-Rosa • Candy',
      category: 'Datas Especiais',
      description: 'Estampa meiga e doce em tom rosa pastel com biscoito de gengibre (Gingerbread Man), corações e lettering vibrante.',
      imageUrl: CANVA_NATAL_GINGERBREAD_CANDY_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getNatalGingerbreadCandyTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-vermelho-nobre',
      title: 'Natal Vermelho Clássico • Moldura de Foto & Boas Festas',
      category: 'Datas Especiais',
      description: 'Composição luxuosa em vermelho rubi com moldura para foto da família e lettering Boas Festas & Um Feliz Natal em ouro reluzente.',
      imageUrl: CANVA_NATAL_VERMELHO_NOBRE_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getNatalVermelhoNobreTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-feliz-natal',
      title: 'Feliz Natal • Bolas & Estrelas Douradas',
      category: 'Datas Especiais',
      description: 'Modelo oficial Canva de Natal com 16 camadas editáveis: lettering Feliz Natal, bolas de natal texturizadas, ornamentos dourados e divisores.',
      imageUrl: CANVA_FELIZ_NATAL_SVG,
      badge: '⭐ 16 Camadas Editáveis',
      layersCount: 16,
      getLayers: () => getFelizNatalTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-geometric',
      title: 'Natal Geométrico • Moldura Família & Árvores Modernas',
      category: 'Datas Especiais',
      description: 'Estampa moderna com pinheiros geométricos, lettering Merry Christmas, moldura polaroid e mensagem de união.',
      imageUrl: CANVA_NATAL_GEOMETRIC_SVG,
      badge: '⭐ 7 Camadas Editáveis',
      layersCount: 7,
      getLayers: () => getNatalGeometricTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-2025-hoho',
      title: 'Feliz Natal 2025 • Pattern Ho Ho Ho & Borda Verde',
      category: 'Datas Especiais',
      description: 'Estampa festiva com pattern natalino Ho Ho Ho, borda esmeralda e letterings 2025 / Feliz Natal totalmente editáveis em 18 camadas.',
      imageUrl: CANVA_NATAL_HOHO_SVG,
      badge: '⭐ 18 Camadas Editáveis',
      layersCount: 18,
      getLayers: () => getNatalHoHoPatternTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-christmas-is-love',
      title: 'Christmas is Love • Gorros Noel & Dupla Polaroid',
      category: 'Datas Especiais',
      description: 'Composição afetuosa em tons pasteis com 2 molduras para fotos com gorros de Papai Noel e lettering Christmas is Love.',
      imageUrl: CANVA_NATAL_CHRISTMAS_IS_LOVE_SVG,
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getNatalChristmasIsLoveTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-natividade',
      title: 'Feliz Natal • Natividade de Jesus & Cantoneiras Douradas',
      category: 'Datas Especiais',
      description: 'Composição clássica celebrando o nascimento de Jesus com cantoneiras de ouro e estrela de Belém.',
      imageUrl: CANVA_NATAL_NATIVIDADE_DOURADO_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getNatalNatividadeTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-kraft-floral',
      title: 'Feliz Natal Kraft • Foto em Círculo & Renda de Neve',
      category: 'Datas Especiais',
      description: 'Estética rústica e elegante em papel Kraft com moldura circular botânica para foto da família e caligrafia branca.',
      imageUrl: CANVA_NATAL_KRAFT_FLORAL_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getNatalKraftFloralTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-dourado-luxo',
      title: 'Natal Dourado Luxo • Bolas Penduradas, Laços & Dupla Foto',
      category: 'Datas Especiais',
      description: 'Design premium em linho creme com bolas de natal suspensas em fitas douradas, duas molduras de fotos e lettering Boas Festas.',
      imageUrl: CANVA_NATAL_DOURADO_LUXO_SVG,
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getNatalDouradoLuxoTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-magico-pattern',
      title: 'Natal Mágico • Pattern Natalino & Círculo Esmeralda',
      category: 'Datas Especiais',
      description: 'Composição lúdica com pattern sutil de ícones natalinos, moldura esmeralda e mensagem festiva.',
      imageUrl: CANVA_NATAL_MAGICO_PATTERN_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getNatalMagicoPatternTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-sagrada-familia',
      title: 'Um Feliz Natal • Presépio One-Line & Estrela Guia',
      category: 'Datas Especiais',
      description: 'Arte minimalista sofisticada com desenho contínuo da Sagrada Família, estrela de Belém e votos de paz.',
      imageUrl: CANVA_NATAL_SAGRADA_FAMILIA_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getNatalSagradaFamiliaTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-capivara',
      title: 'Feliz Natal Capivara • Pisca-Pisca & Capivarinhas Fofas',
      category: 'Datas Especiais',
      description: 'Estampa alegre e viral com varal de luzes natalinas e capivarinha fofa de gorro de Papai Noel.',
      imageUrl: CANVA_NATAL_CAPIVARA_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getNatalCapivaraTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-santa-polaroid',
      title: 'Feliz Natal • Papai Noel Aquarela & Foto Polaroid',
      category: 'Datas Especiais',
      description: 'Composição nobre em aquarela com slot polaroid para foto da família, Papai Noel em aquarela, árvore decorada e lettering Feliz Natal.',
      imageUrl: CANVA_NATAL_SANTA_POLAROID_SVG,
      badge: '⭐ 10 Camadas Editáveis',
      layersCount: 10,
      getLayers: () => getNatalSantaWatercolorTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-vintage-stamps',
      title: 'Natal Mágico • 3 Selos Postais com Fotos & Árvore Vintage',
      category: 'Datas Especiais',
      description: 'Design retrô sofisticado em tom creme vintage com 3 selos postais para fotos da família, árvore desenhada à mão e mensagem de paz.',
      imageUrl: CANVA_NATAL_VINTAGE_STAMPS_SVG,
      badge: '⭐ 15 Camadas Editáveis',
      layersCount: 15,
      getLayers: () => getNatalVintageStampsTemplateLayers(Date.now()),
    },
    {
      id: 'canva-natal-merry-christmas',
      title: 'Merry Christmas • Árvore Aquarela & Dupla Polaroid',
      category: 'Datas Especiais',
      description: 'Composição festiva com textura de papel, 2 molduras polaroids sobrepostas para fotos, lettering Merry Christmas e árvore imponente.',
      imageUrl: CANVA_NATAL_MERRY_CHRISTMAS_SVG,
      badge: '⭐ 10 Camadas Editáveis',
      layersCount: 10,
      getLayers: () => getNatalMerryChristmasPolaroidTemplateLayers(Date.now()),
    },
    {
      id: 'canva-gratidao-a-deus',
      title: 'Gratidão a Deus • Flores & Borboletas',
      category: 'Floral & Natureza',
      description: 'Modelo oficial Canva Pro por Rui Tobias D B Carvalho. Composição com 14 camadas editáveis: lettering Gratidão, aquarela, flores e borboletas.',
      imageUrl: CANVA_GRATIDAO_SVG,
      badge: '⭐ 14 Camadas Editáveis',
      layersCount: 14,
      getLayers: () => getGratidaoTemplateLayers(Date.now()),
    },
    {
      id: 'canva-rui-tobias-dahswyjx7qw',
      title: 'Cópia de Sem nome • Rui Tobias Carvalho (Canva Pro)',
      category: 'Canva Pro Embeds',
      description: 'Modelo oficial Canva Pro por Rui Tobias Carvalho (DAHSwyjx7Qw - "Cópia de Sem nome") com 10 camadas editáveis: moldura polaroid para foto, aquarela nobre, borboleta dourada e tipografia elegante.',
      imageUrl: CANVA_RUI_TOBIAS_DAHSWYJX7QW_SVG,
      badge: '⭐ 10 Camadas Editáveis',
      layersCount: 10,
      getLayers: () => getRuiTobiasCustomTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-moldura-floral-preset',
      title: 'Mãe Amor Eterno • Moldura Floral & Foto Central',
      category: 'Dia das Mães',
      description: 'Estampa refinada para o Dia das Mães com moldura floral oval dourada para foto da mamãe, lettering delicado e mensagem de afeto.',
      imageUrl: CANVA_MAES_MOLDURA_FLORAL_SVG,
      badge: '⭐ 7 Camadas Editáveis',
      layersCount: 7,
      getLayers: () => getMaesMolduraFloralTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-margaridas-preset',
      title: 'Mãe Especial • Buquê de Margaridas & Elegância Floral',
      category: 'Dia das Mães',
      description: 'Design primaveril luminoso com buquê de margaridas, lettering dourado com brilho e frase "Você é o jardim da nossa vida".',
      imageUrl: CANVA_MAES_MARGARIDAS_ESPECIAL_SVG,
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getMaesMargaridasEspecialTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-forca-botanico-preset',
      title: 'Mãe Força & Amor • Silhueta Materna & Ramos Dourados',
      category: 'Dia das Mães',
      description: 'Estampa sofisticada com arte botânica, silhueta comovente de mãe abraçando filho e caligrafia nobre.',
      imageUrl: CANVA_MAES_FORCA_BOTANICO_SVG,
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getMaesForcaBotanicoTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-melhor-mae-preset',
      title: 'A Melhor Mãe do Mundo • Medalha Dourada & Ícones de Afeto',
      category: 'Dia das Mães',
      description: 'Estampa premiada com medalha de ouro 3D, certificação oficial de Melhor Mãe do Mundo e selos de amor incondicional.',
      imageUrl: CANVA_MAES_MELHOR_MAE_ICONS_SVG,
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getMaesMelhorMaeIconsTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-aquarela-rose-preset',
      title: 'Mãe • Caligrafia Dourada & Aquarela Rose Gold',
      category: 'Dia das Mães',
      description: 'Design moderno e luxuoso em tons rose gold com manchas aquareladas, tipografia serifada e caligrafia manuscrita.',
      imageUrl: CANVA_MAES_AQUARELA_ROSE_SVG,
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getMaesAquarelaRoseTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-organico-arco-preset',
      title: 'Mãe Meu Maior Amor • Arcos Boho & Formas Orgânicas',
      category: 'Dia das Mães',
      description: 'Composição boho chic contemporânea com arcos terracota/rosa, elementos botânicos minimalistas e lettering expressivo.',
      imageUrl: CANVA_MAES_ORGANICO_ARCO_SVG,
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getMaesOrganicoArcoTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-amor-cafe-preset',
      title: 'Mãe & Café • Tira de Fotos Ripped Paper com 3 Momentos',
      category: 'Dia das Mães',
      description: 'Tira vertical de fotografias estilo papel rasgado para 3 fotos inesquecíveis com a mamãe, lettering aconchegante e caneca retrô.',
      imageUrl: CANVA_MAES_AMOR_CAFE_RIPPED_SVG,
      badge: '⭐ 7 Camadas Editáveis',
      layersCount: 7,
      getLayers: () => getMaesAmorCafeRippedTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-sorriso-rosas-preset',
      title: 'Seu Sorriso Ilumina Tudo • Buquê de Rosas & Corações 3D',
      category: 'Dia das Mães',
      description: 'Linda homenagem com buquê de rosas vermelhas e cor-de-rosa, moldura decorativa e mensagem emocionante de gratidão.',
      imageUrl: CANVA_MAES_SORRISO_ROSAS_SVG,
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getMaesSorrisoRosasTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-baloes-3d-preset',
      title: 'Mãe Te Amo Até o Infinito • Balões 3D Pastel & Asas de Anjo',
      category: 'Dia das Mães',
      description: 'Estampa alegre e mágica com balões infláveis 3D em formato de coração, nuvens fofas e asinhas de anjo.',
      imageUrl: CANVA_MAES_BALOES_3D_ANJOS_SVG,
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getMaesBaloes3DAnjosTemplateLayers(Date.now()),
    },
    {
      id: 'canva-maes-dupla-polaroid-preset',
      title: 'Minha Mãe Querida • Molduras Dupla Polaroid & Flores de Cerejeira',
      category: 'Dia das Mães',
      description: 'Design nostálgico com 2 fotos polaroid inclinadas para momentos especiais com a mamãe e galhos de cerejeira oriental.',
      imageUrl: CANVA_MAES_DUPLA_POLAROID_SVG,
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getMaesDuplaPolaroidTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-medalha-super-pai-azul-preset',
      title: 'Caneca do Melhor Pai do Mundo • Medalha Super Pai & Coroa Dourada',
      category: 'Dia dos Pais',
      description: 'Estampa oficial Canva de Dia dos Pais com 8 camadas editáveis: condecoração em ouro e fitas azuis, selo circular, texto em arco "CANECA DO MELHOR PAI DO MUNDO", texto "SUPER PAI", coroa doodle e caligrafia.',
      imageUrl: CANVA_PAIS_MEDALHA_SUPER_PAI_AZUL_SVG,
      badge: '⭐ 8 Camadas Editáveis',
      layersCount: 8,
      getLayers: () => getPaisMedalhaSuperPaiAzulTemplateLayers(Date.now()),
    },
    {
      id: 'paizao-futebol-campeao',
      title: 'Paizão Nº 1 • Futebol & Troféu Campeão',
      category: 'Dia dos Pais',
      description: 'Modelo oficial Canva com 9 camadas editáveis: troféu, bola, moldura polaroid, estrelas e textos em destaque.',
      imageUrl: CANVA_PAIZAO_SVG,
      badge: '⭐ 9 Camadas Editáveis',
      layersCount: 9,
      getLayers: () => getPaizaoTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-coracao-recortado-preset',
      title: 'Dia dos Pais • Coração Recortado & Foto com Amor',
      category: 'Dia dos Pais',
      description: 'Estampa oficial Canva de Dia dos Pais com moldura em formato de coração recortado para foto da família, lettering Papai e selo de melhor pai.',
      imageUrl: CANVA_PAIS_CORACAO_RECORTADO_SVG,
      badge: '⭐ 8 Camadas Editáveis',
      layersCount: 8,
      getLayers: () => getPaisCoracaoRecortadoTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-meu-heroi-bluey-preset',
      title: 'Meu Herói de Todos os Dias • Bluey Style & Tripla Foto Circular',
      category: 'Dia dos Pais',
      description: 'Composição alegre e moderna inspirada no estilo Bluey com 3 slots circulares para fotos, coroa divertida e lettering "Meu herói de todos os dias".',
      imageUrl: CANVA_PAIS_MEU_HEROI_BLUEY_SVG,
      badge: '⭐ 7 Camadas Editáveis',
      layersCount: 7,
      getLayers: () => getPaisMeuHeroiBlueyTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-tira-fotos-vintage-preset',
      title: 'Dia dos Pais • Tira de Fotos Vintage Ripped Paper (6 Fotos)',
      category: 'Dia dos Pais',
      description: 'Design retrô sofisticado com 2 tiras verticais de filme contendo 6 fotos da família, respingos de tinta e tipografia elegante.',
      imageUrl: CANVA_PAIS_TIRA_FOTOS_VINTAGE_SVG,
      badge: '⭐ 8 Camadas Editáveis',
      layersCount: 8,
      getLayers: () => getPaisTiraFotosVintageTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-eu-te-amo-bold-preset',
      title: 'Pais Eu Te Amo • Big Bold Lettering & Corações 3D',
      category: 'Dia dos Pais',
      description: 'Estampa de impacto com lettering gigante "PAIS eu te amo!", dois slots para fotos com moldura branca e corações 3D.',
      imageUrl: CANVA_PAIS_EU_TE_AMO_BOLD_SVG,
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getPaisEuTeAmoBoldTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-monoline-minimalista-preset',
      title: 'Dia dos Pais • Arte Monoline Minimalista Pai e Filhos',
      category: 'Dia dos Pais',
      description: 'Arte clean e sofisticada em linha contínua ilustrando 3 momentos de conexão entre pai e filhos com caligrafia refinada.',
      imageUrl: CANVA_PAIS_MONOLINE_MINIMALISTA_SVG,
      badge: '⭐ 3 Camadas Editáveis',
      layersCount: 3,
      getLayers: () => getPaisMonolineMinimalistaTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-super-heroi-preset',
      title: 'Super Pai • Você é Conselho, Proteção e Amor!',
      category: 'Dia dos Pais',
      description: 'Design vibrante com tipografia Impact "PAI", mensagem de admiração e ilustração do papai super-herói de capa.',
      imageUrl: CANVA_PAIS_SUPER_HEROI_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getPaisSuperHeroiTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-ilustracao-estrelas-azure-preset',
      title: 'Dia dos Pais • Ilustração Afeto & Estrelas Azure Escuro (Canva Model)',
      category: 'Dia dos Pais',
      description: 'Estampa oficial Canva de Dia dos Pais com 17 camadas editáveis: ilustração de pai e filho(a), lettering decorativo em português e constelação de 15 estrelas Azure Escuro.',
      imageUrl: CANVA_PAIS_ILUSTRACAO_ESTRELAS_AZURE_SVG,
      badge: '⭐ 17 Camadas Editáveis',
      layersCount: 17,
      getLayers: () => getFathersDayAzureStarsTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-te-amo-forca-sabedoria-preset',
      title: 'Te Amo Pai • Você é Força, Sabedoria e Amor (Canva Model)',
      category: 'Dia dos Pais',
      description: 'Estampa oficial Canva de Dia dos Pais com 15 camadas editáveis: 2 fotos com molduras de traço decorativo, mensagem inspiradora, lettering "TE AMO" e caligrafia "Pai".',
      imageUrl: CANVA_PAIS_TE_AMO_FORCA_SABEDORIA_SVG,
      badge: '⭐ 15 Camadas Editáveis',
      layersCount: 15,
      getLayers: () => getPaisTeAmoForcaSabedoriaTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-tabela-nutricional-preset',
      title: 'Tabela Nutricional do Papai • 100% Incrível & Super Pai (Canva Model)',
      category: 'Dia dos Pais',
      description: 'Estampa oficial Canva de Dia dos Pais com 28 camadas editáveis: lettering "Super pai", bigode clássico, selo circular "papai do ano", receita secreta com porcentagens e 4 caixas de qualidades com ícones.',
      imageUrl: CANVA_PAIS_TABELA_NUTRICIONAL_SVG,
      badge: '⭐ 28 Camadas Editáveis',
      layersCount: 28,
      getLayers: () => getPaisTabelaNutricionalTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-tira-dupla-ripped-preset',
      title: 'Pai Eu Te Amo • Tira de Fotos Dupla Ripped Paper (4 Fotos)',
      category: 'Dia dos Pais',
      description: 'Composição nobre em textura de papel rasgado com 2 tiras verticais para 4 fotos da família, lettering elegante e balão 3D.',
      imageUrl: CANVA_PAIS_TIRA_DUPLA_RIPPED_SVG,
      badge: '⭐ 8 Camadas Editáveis',
      layersCount: 8,
      getLayers: () => getPaisTiraDuplaRippedTemplateLayers(Date.now()),
    },
    {
      id: 'canva-pais-time-cafe-retro-preset',
      title: 'Sou do Time Café • Mascote Retrô 70s para o Papai',
      category: 'Dia dos Pais',
      description: 'Estampa vintage nostálgica dos anos 70 para papais apaixonados por café, com mascote fofinho de caneca e grãos de café.',
      imageUrl: CANVA_PAIS_TIME_CAFE_RETRO_SVG,
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getPaisTimeCafeRetroTemplateLayers(Date.now()),
    },
    {
      id: 'voce-e-a-cereja-do-meu-bolo',
      title: 'Você é a Cereja do Meu Bolo',
      category: 'Romântico & Frases',
      description: 'Estampa retrô romântica com cerejas brilhantes e tipografia em arco totalmente personalizável.',
      imageUrl: CANVA_CHERRY_SVG,
      badge: '⭐ 3 Camadas Editáveis',
      layersCount: 3,
      getLayers: () => getCherryTemplateLayers(Date.now()),
    },
    {
      id: 'leao-streetwear-shield',
      title: 'Leão Streetwear Urban Wild',
      category: 'Camisetas & Streetwear',
      description: 'Design de alto impacto com leão tribal, brasão, textos editáveis e estética streetwear urbana.',
      imageUrl: CANVA_LION_SHIELD_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getLionStreetwearTemplateLayers(Date.now()),
    },
    {
      id: 'iluminado-archangel-dark',
      title: 'Iluminado Archangel Dark Gothic',
      category: 'Camisetas & Streetwear',
      description: 'Composição dark gótica com anjo guardião e tipografia imponente totalmente editável.',
      imageUrl: CANVA_ILUMINADO_SVG,
      badge: '⭐ 4 Camadas Editáveis',
      layersCount: 4,
      getLayers: () => getIluminadoTemplateLayers(Date.now()),
    },
    {
      id: 'mother-day',
      title: 'Melhor Mãe do Mundo Floral',
      category: 'Datas Especiais',
      description: 'Moldura floral com lettering rosé, slot polaroid para foto da mãe e frases carinhosas.',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      badge: '⭐ 6 Camadas Editáveis',
      layersCount: 6,
      getLayers: () => getMotherDayTemplateLayers(Date.now()),
    },
    {
      id: 'vintage-coffee',
      title: 'Café Vintage Premium Barista',
      category: 'Canecas & Bar',
      description: 'Design retrô para amantes de café expresso, com foto, selo vintage e textos de cafeteria.',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getVintageCoffeeTemplateLayers(Date.now()),
    },
    {
      id: 'cute-dog-watercolor',
      title: 'Golden Retriever Pet Aquarela',
      category: 'Pets & Animais',
      description: 'Pintura artística de pet com moldura polaroid e textos para personalizar o nome do bichinho.',
      imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getPetWatercolorTemplateLayers(Date.now()),
    },
    {
      id: 'cyberpunk-neon',
      title: 'Cyberpunk Retrowave 80s Synth',
      category: 'Gamer & Geek',
      description: 'Grid futurista com sol neon, estética anos 80, visual arcade e textos retrowave editáveis.',
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
      badge: '⭐ 5 Camadas Editáveis',
      layersCount: 5,
      getLayers: () => getCyberpunkRetrowaveTemplateLayers(Date.now()),
    },
  ];

  // Stock Sublimation Background Photos
  const stockPhotos = [
    { id: 'p1', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80', tag: 'Floral' },
    { id: 'p2', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80', tag: 'Neon' },
    { id: 'p3', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80', tag: 'Aquarela' },
    { id: 'p4', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80', tag: 'Marmorizado' },
    { id: 'p5', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80', tag: 'Arte Moderna' },
    { id: 'p6', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', tag: 'Praia Tropical' },
  ];

  const shapesList: { id: ShapeType; label: string; icon: React.ReactNode }[] = [
    { id: 'rectangle', label: 'Retângulo', icon: <Square className="w-5 h-5" /> },
    { id: 'circle', label: 'Círculo', icon: <Circle className="w-5 h-5" /> },
    { id: 'polygon', label: 'Hexágono', icon: <Hexagon className="w-5 h-5" /> },
    { id: 'star', label: 'Estrela', icon: <Star className="w-5 h-5" /> },
    { id: 'badge', label: 'Selo de Qualidade', icon: <Award className="w-5 h-5" /> },
    { id: 'heart', label: 'Coração', icon: <Heart className="w-5 h-5" /> },
  ];

  // Handle Tab Click
  const handleTabClick = (tab: SidebarTabType) => {
    if (externalSetActiveSidebarTab) {
      if (externalActiveSidebarTab === tab) {
        externalSetActiveSidebarTab(null);
      } else {
        externalSetActiveSidebarTab(tab);
      }
    } else {
      if (internalActiveTab === tab && internalIsDrawerOpen) {
        setInternalIsDrawerOpen(false);
      } else {
        setInternalActiveTab(tab);
        setInternalIsDrawerOpen(true);
      }
    }
  };

  // Image File Upload Handler (prefer Blob/objectURL + imageAssetStore)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    try {
      const bitmap = await createImageBitmap(file);
      setAsset(objectUrl, { blob: file, url: objectUrl, bitmap });
    } catch (err) {
      setAsset(objectUrl, { blob: file, url: objectUrl });
    }

    if (onAddAIGeneratedImage) {
      onAddAIGeneratedImage(objectUrl, file.name.replace(/\.[^/.]+$/, ''));
    }

    e.target.value = '';
  };

  return (
    <div className="flex h-full select-none z-30 relative">
      {/* 1. Canva Left Icon Rail with Scrollbar & Collapse Toggle */}
      <aside className={`border-r flex flex-col items-center py-2.5 gap-2 select-none z-40 transition-all duration-300 overflow-y-auto custom-scrollbar touch-scroll-y shrink-0 ${
        isRailCollapsed ? 'w-12' : 'w-18'
      } ${
        theme === 'light'
          ? 'bg-slate-100 border-slate-300 text-slate-600'
          : 'bg-[#0d0e12] border-[#23242a] text-gray-400'
      }`}>
        {/* Rail Collapse / Expand Toggle Button */}
        <button
          onClick={() => setIsRailCollapsed(!isRailCollapsed)}
          className={`flex items-center justify-center rounded-xl transition-all cursor-pointer ${
            isRailCollapsed ? 'w-9 h-9 my-1' : 'w-10 h-8 mb-1 border border-dashed'
          } ${
            theme === 'light'
              ? 'border-slate-300 hover:bg-slate-200 text-slate-600 hover:text-purple-600'
              : 'border-slate-700 hover:bg-white/10 text-gray-400 hover:text-purple-400'
          }`}
          title={isRailCollapsed ? t('common.open') : t('common.close')}
          aria-label={isRailCollapsed ? t('common.open') : t('common.close')}
        >
          {isRailCollapsed ? (
            <PanelLeftOpen className="w-5 h-5 text-purple-500" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        {!isRailCollapsed && (
          <>
            {/* Templates */}
            <button
              onClick={() => handleTabClick('templates')}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'templates' && isDrawerOpen
                  ? 'bg-purple-600/20 text-purple-600 border border-purple-500/40 shadow-lg'
                  : theme === 'light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/5 hover:text-white'
              }`}
              title={t('toolbar.templates')}
            >
              <LayoutTemplate className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{t('toolbar.templates')}</span>
            </button>

            {/* Elements / Shapes */}
            <button
              onClick={() => handleTabClick('elements')}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'elements' && isDrawerOpen
                  ? 'bg-purple-600/20 text-purple-600 border border-purple-500/40 shadow-lg'
                  : theme === 'light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/5 hover:text-white'
              }`}
              title={t('toolbar.elements')}
            >
              <Shapes className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{t('toolbar.elements')}</span>
            </button>

            {/* Text */}
            <button
              onClick={() => handleTabClick('text')}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'text' && isDrawerOpen
                  ? 'bg-purple-600/20 text-purple-600 border border-purple-500/40 shadow-lg'
                  : theme === 'light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/5 hover:text-white'
              }`}
              title={t('toolbar.text')}
            >
              <Type className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{t('toolbar.text')}</span>
            </button>

            {/* WordArt */}
            <button
              onClick={() => {
                if (onOpenWordArtModal) {
                  onOpenWordArtModal();
                } else {
                  handleTabClick('text');
                }
              }}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer relative group ${
                theme === 'light'
                  ? 'text-rose-600 hover:bg-rose-100'
                  : 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300'
              }`}
              title="WordArt Studio"
            >
              <Wand2 className="w-5 h-5 mb-1 text-rose-500" />
              <span className="text-[10px] font-bold">WordArt</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </button>

            {/* WordArt 2 (Dedicated Icon) */}
            <button
              onClick={() => {
                if (onOpenWordArt2) {
                  onOpenWordArt2();
                } else if (onOpenWordArtModal) {
                  onOpenWordArtModal();
                } else {
                  handleTabClick('text');
                }
              }}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer relative group ${
                theme === 'light'
                  ? 'text-amber-600 hover:bg-amber-100'
                  : 'text-amber-400 hover:bg-amber-950/30 hover:text-amber-300'
              }`}
              title="WordArt Studio 2"
              aria-label="WordArt Studio 2"
            >
              <FileType className="w-5 h-5 mb-1 text-amber-500" />
              <span className="text-[10px] font-bold">WordArt 2</span>
            </button>

            {/* Uploads / Photos */}
            <button
              onClick={() => handleTabClick('uploads')}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'uploads' && isDrawerOpen
                  ? 'bg-purple-600/20 text-purple-600 border border-purple-500/40 shadow-lg'
                  : theme === 'light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/5 hover:text-white'
              }`}
              title={t('toolbar.uploads')}
            >
              <ImagePlus className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{t('toolbar.uploads')}</span>
            </button>

            {/* Products */}
            <button
              onClick={() => handleTabClick('products')}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'products' && isDrawerOpen
                  ? 'bg-purple-600/20 text-purple-600 border border-purple-500/40 shadow-lg'
                  : theme === 'light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/5 hover:text-white'
              }`}
              title={t('toolbar.products')}
            >
              <ProductIcon product={currentProduct} className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{t('toolbar.products')}</span>
            </button>

            {/* Canva Studio Integration */}
            <button
              onClick={() => handleTabClick('canva')}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer relative group ${
                activeTab === 'canva' && isDrawerOpen
                  ? 'bg-gradient-to-tr from-[#00c4cc]/25 to-[#7d2ae8]/25 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : theme === 'light'
                  ? 'hover:bg-cyan-50 text-cyan-800'
                  : 'hover:bg-cyan-950/40 text-cyan-300'
              }`}
              title="Canva Studio - Modelos & Integração"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white flex items-center justify-center text-xs font-black italic shadow mb-0.5 group-hover:scale-110 transition-transform">
                C
              </div>
              <span className="text-[10px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8]">
                Canva
              </span>
              <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${isCanvaConnected ? 'bg-emerald-400' : 'bg-cyan-400 animate-pulse'}`}></span>
            </button>

            {/* AI Studio */}
            <button
              onClick={() => handleTabClick('ai')}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer relative ${
                activeTab === 'ai' && isDrawerOpen
                  ? 'bg-gradient-to-tr from-purple-600/30 to-indigo-600/30 text-purple-600 border border-purple-500/50 shadow-lg'
                  : theme === 'light' ? 'text-purple-600 hover:bg-purple-100 hover:text-purple-700' : 'text-purple-400 hover:bg-purple-950/30 hover:text-purple-200'
              }`}
              title={t('toolbar.aiStudio')}
            >
              <Sparkles className="w-5 h-5 mb-1 text-purple-600" />
              <span className="text-[10px] font-semibold">{t('toolbar.aiStudio')}</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            </button>

            {/* Layers */}
            <button
              onClick={() => handleTabClick('layers')}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer ${
                activeTab === 'layers' && isDrawerOpen
                  ? 'bg-purple-600/20 text-purple-600 border border-purple-500/40 shadow-lg'
                  : theme === 'light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/5 hover:text-white'
              }`}
              title={t('toolbar.layers')}
            >
              <Layers className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{t('toolbar.layers')}</span>
            </button>

            <div className={`mt-auto w-10 h-[1px] ${theme === 'light' ? 'bg-slate-300' : 'bg-[#23242a]'}`}></div>

            {/* Account / Login Button */}
            <div className="flex flex-col items-center gap-2 my-1">
              {currentUser ? (
                <button
                  onClick={onOpenAuthModal}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer relative group ${
                    theme === 'light'
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      : 'bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/50'
                  }`}
                  title={`${currentUser.name} (${currentUser.email})`}
                >
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-black uppercase shadow">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-[9px] font-bold mt-0.5 text-purple-400">{t('topbar.myAccount')}</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-200 text-slate-700 hover:bg-purple-600 hover:text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-purple-600 hover:text-white border border-slate-700'
                  }`}
                  title={t('topbar.login')}
                >
                  <LogIn className="w-4 h-4 mb-0.5 text-purple-400" />
                  <span className="text-[9px] font-bold">{t('topbar.login')}</span>
                </button>
              )}
            </div>
          </>
        )}
      </aside>

      {/* 2. Canva Sliding Side Drawer Panel */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-20 sm:hidden backdrop-blur-[1px]"
            onClick={() => {
              if (externalSetActiveSidebarTab) {
                externalSetActiveSidebarTab(null);
              } else {
                setInternalIsDrawerOpen(false);
              }
            }}
          />
          <div className={`w-[calc(100vw-4.5rem)] sm:w-80 border-r flex flex-col h-full text-xs z-30 shadow-2xl relative animate-in slide-in-from-left duration-200 transition-colors ${
            theme === 'light'
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-[#16171d] border-[#26272e] text-gray-200'
          }`}>
          {/* Drawer Close Button Header */}
          <div className={`p-3.5 border-b flex items-center justify-between ${
            theme === 'light' ? 'border-slate-200' : 'border-[#26272e]'
          }`}>
            <h2 className={`font-bold text-sm capitalize flex items-center gap-2 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              {activeTab === 'templates' && <>🎨 {t('toolbar.templates')}</>}
              {activeTab === 'elements' && <>📐 {t('toolbar.elements')}</>}
              {activeTab === 'text' && <>🔤 {t('toolbar.text')}</>}
              {activeTab === 'uploads' && <>🖼️ {t('toolbar.uploads')}</>}
              {activeTab === 'products' && (
                <span className="flex items-center gap-1.5">
                  <ProductIcon product={currentProduct} className="w-4 h-4 text-purple-400" />
                  {t('toolbar.products')}
                </span>
              )}
              {activeTab === 'canva' && (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white flex items-center justify-center text-[10px] font-black italic shadow">
                    C
                  </div>
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8]">
                    Canva Studio
                  </span>
                  {isCanvaConnected ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/40">
                      Conectado
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/40">
                      Modelos
                    </span>
                  )}
                </span>
              )}
              {activeTab === 'ai' && <>✨ {t('toolbar.aiStudio')}</>}
              {activeTab === 'layers' && <>🥞 {t('toolbar.layers')}</>}
            </h2>

            <div className="flex items-center gap-1">
              {activeTab === 'canva' && onOpenCanva && (
                <button
                  onClick={onOpenCanva}
                  className="p-1.5 rounded-xl cursor-pointer border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all text-xs font-semibold flex items-center gap-1"
                  title="Expandir para Hub Completo do Canva"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Hub</span>
                </button>
              )}
              <button
                onClick={() => {
                  if (externalSetActiveSidebarTab) {
                    externalSetActiveSidebarTab(null);
                  } else {
                    setInternalIsDrawerOpen(false);
                  }
                }}
                className="p-1.5 rounded-xl cursor-pointer border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 transition-all shadow-sm flex items-center justify-center"
                title={t('common.close')}
                aria-label={t('common.close')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Input Box */}
          {activeTab !== 'layers' && activeTab !== 'elements' && activeTab !== 'text' && (
            <div className="px-4 pt-3 pb-2">
              <div className="relative">
                <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                  theme === 'light' ? 'text-slate-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeTab === 'canva'
                      ? 'Busque modelos (ex: camisa, leão, cereja, iluminado)...'
                      : t('toolbar.searchPlaceholder', { tab: activeTab ? t(`toolbar.${activeTab}`) : '' })
                  }
                  className={`w-full rounded-xl pl-9 pr-8 py-2 text-xs border focus:outline-none focus:border-purple-500 transition-colors ${
                    theme === 'light'
                      ? 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white'
                      : 'bg-[#202127] border-[#30313a] text-white placeholder-gray-500'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs p-1"
                    title="Limpar busca"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Drawer Body Content based on Active Tab */}
          <div className="flex-1 overflow-y-auto custom-scrollbar touch-scroll-y p-4 space-y-4 min-h-0">
            {/* TAB 1: TEMPLATES */}
            {activeTab === 'templates' && (
              <div className="space-y-3">
                {/* Category Pills for Templates */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'Dia das Mães', label: '🌸 Dia das Mães' },
                    { id: 'Dia dos Pais', label: '👔 Dia dos Pais' },
                    { id: 'Datas Especiais', label: '🎄 Natal & Especiais' },
                    ...(userSavedTemplates.length > 0
                      ? [{ id: 'Meus Modelos', label: `⭐ Meus Modelos (${userSavedTemplates.length})` }]
                      : []),
                    { id: 'Camisetas & Streetwear', label: 'Camisetas' },
                    { id: 'Romântico & Frases', label: 'Romântico' },
                    { id: 'Gamer & Geek', label: 'Gamer' },
                    { id: 'Pets & Animais', label: 'Pets' },
                    { id: 'Canecas & Bar', label: 'Canecas' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedTemplateCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                        selectedTemplateCategory === cat.id
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-[#202127] text-gray-400 hover:text-gray-200 border border-[#30313a]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    {selectedTemplateCategory === 'Meus Modelos' ? '⭐ Meus Modelos Salvos' : 'Modelos Editáveis em Camadas'}
                  </span>
                  <span className="text-[10px] text-purple-400 font-semibold">
                    {[
                      ...userSavedTemplates.map((ut) => ({
                        ...ut,
                        getLayers: () => ut.layers,
                        layersCount: ut.layers.length,
                        isUserCustom: true,
                      })),
                      ...templatePresets,
                    ].filter((tpl) => {
                      if (!tpl.getLayers) return false;
                      const matchCat = selectedTemplateCategory === 'all' || tpl.category === selectedTemplateCategory;
                      const matchQ = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) || tpl.category.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchCat && matchQ;
                    }).length} modelos
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {[
                    ...userSavedTemplates.map((ut) => ({
                      ...ut,
                      getLayers: () => ut.layers,
                      layersCount: ut.layers.length,
                      isUserCustom: true,
                    })),
                    ...templatePresets,
                  ]
                    .filter((tpl) => {
                      if (!tpl.getLayers) return false;
                      const matchCat = selectedTemplateCategory === 'all' || tpl.category === selectedTemplateCategory;
                      const matchQ = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) || tpl.category.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchCat && matchQ;
                    })
                    .map((tpl) => (
                      <div
                        key={tpl.id}
                        className={`group relative rounded-2xl overflow-hidden border bg-[#1a1b21] shadow-lg transition-all ${
                          tpl.isUserCustom
                            ? 'border-amber-500/50 hover:border-amber-400'
                            : 'border-[#2d2e36] hover:border-purple-500/80'
                        }`}
                      >
                        {/* Image Preview */}
                        <div className="relative w-full h-32 bg-black/40 overflow-hidden">
                          <img
                            src={tpl.imageUrl}
                            alt={tpl.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                          
                          {/* Badge */}
                          {tpl.badge && (
                            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-white text-[10px] font-bold shadow-md backdrop-blur-sm ${
                              tpl.isUserCustom ? 'bg-amber-600/90' : 'bg-purple-600/90'
                            }`}>
                              {tpl.badge}
                            </div>
                          )}

                          {tpl.isUserCustom && (
                            <button
                              onClick={(e) => handleDeleteUserTemplate(tpl.id, e)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-950/80 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 transition-all text-xs"
                              title="Excluir este modelo salvo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <div className="absolute bottom-2 left-3 right-3">
                            <span className="text-white font-bold text-xs block leading-tight">
                              {tpl.title}
                            </span>
                            <span className={`text-[10px] font-medium block mt-0.5 ${
                              tpl.isUserCustom ? 'text-amber-300' : 'text-purple-300'
                            }`}>
                              {tpl.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Info & Actions */}
                        <div className="p-3 space-y-2.5">
                          {tpl.description && (
                            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                              {tpl.description}
                            </p>
                          )}

                          <div className="pt-1">
                            {tpl.getLayers && onLoadTemplateLayers && (
                              <button
                                onClick={() => onLoadTemplateLayers(tpl.title, tpl.getLayers!())}
                                className={`w-full py-2 px-3 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 text-white cursor-pointer ${
                                  tpl.isUserCustom
                                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 active:scale-[0.98]'
                                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98]'
                                }`}
                                title="Carregar modelo no canvas com todas as camadas prontas para editar"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Editar Modelo ({tpl.layersCount || tpl.getLayers().length} Camadas)</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 2: ELEMENTS / SHAPES */}
            {activeTab === 'elements' && (
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('toolbar.searchShapesPlaceholder')}
                    value={shapeSearchQuery}
                    onChange={(e) => setShapeSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-[#202127] border border-[#30313a] focus:border-purple-500 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all"
                  />
                  {shapeSearchQuery && (
                    <button
                      onClick={() => setShapeSearchQuery('')}
                      className="absolute right-2.5 top-2 text-xs text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Category Pills Filter */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[10px]">
                  <button
                    onClick={() => setSelectedShapeCategory('all')}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium ${
                      selectedShapeCategory === 'all'
                        ? 'bg-purple-600 text-white font-bold'
                        : 'bg-[#202127] text-gray-400 hover:text-white border border-[#30313a]'
                    }`}
                  >
                    {t('presetGallery.allCategories')}
                  </button>
                  {SHAPE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedShapeCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium ${
                        selectedShapeCategory === cat.id
                          ? 'bg-purple-600 text-white font-bold'
                          : 'bg-[#202127] text-gray-400 hover:text-white border border-[#30313a]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* SECTION 1: Formas Usadas Recentemente */}
                {!shapeSearchQuery && selectedShapeCategory === 'all' && (
                  <div className="bg-[#18191f] p-3 rounded-2xl border border-[#2d2e36]">
                    <span className="text-[11px] font-bold text-purple-300 block mb-2 flex items-center justify-between">
                      <span>{t('toolbar.recentlyUsedShapes')}</span>
                      <span className="text-[9px] text-gray-500 font-normal">{t('toolbar.autoSaved')}</span>
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {recentlyUsedShapes.map((shapeId) => {
                        const shapeDef = ALL_VECTOR_SHAPES.find((s) => s.id === shapeId);
                        return (
                          <button
                            key={'recent-' + shapeId}
                            onClick={() => handleSelectShapeWithRecent(shapeId)}
                            title={shapeDef?.name || shapeId}
                            className="flex items-center justify-center p-1.5 bg-[#202127] hover:bg-purple-900/30 border border-[#30313a] hover:border-purple-500 rounded-lg transition-all hover:scale-110 cursor-pointer group"
                          >
                            <ShapePreviewCanvas shapeId={shapeId} size={24} color="#c084fc" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CATEGORIZED SHAPES CATALOG */}
                <div className="space-y-4">
                  {SHAPE_CATEGORIES.filter(
                    (cat) => selectedShapeCategory === 'all' || selectedShapeCategory === cat.id
                  ).map((cat) => {
                    const categoryShapes = ALL_VECTOR_SHAPES.filter(
                      (s) =>
                        s.category === cat.id &&
                        (!shapeSearchQuery ||
                          s.name.toLowerCase().includes(shapeSearchQuery.toLowerCase()) ||
                          s.id.toLowerCase().includes(shapeSearchQuery.toLowerCase()))
                    );

                    if (categoryShapes.length === 0) return null;

                    return (
                      <div key={cat.id} className="space-y-2">
                        <span className="text-[11px] font-bold text-gray-300 block uppercase tracking-wider border-b border-[#2d2e36] pb-1">
                          {cat.name}
                        </span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {categoryShapes.map((shape) => (
                            <button
                              key={shape.id}
                              onClick={() => handleSelectShapeWithRecent(shape.id)}
                              title={shape.name}
                              className="flex flex-col items-center justify-center p-2 bg-[#202127] hover:bg-[#2a2b38] border border-[#30313a] hover:border-purple-500 rounded-xl transition-all hover:scale-105 cursor-pointer group text-gray-300 hover:text-white"
                            >
                              <div className="group-hover:scale-110 transition-transform">
                                <ShapePreviewCanvas shapeId={shape.id} size={28} color="#c084fc" />
                              </div>
                              <span className="text-[9px] font-medium text-center truncate w-full mt-1 text-gray-400 group-hover:text-purple-300">
                                {shape.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: TEXT & VECTOR TYPOGRAPHY */}
            {activeTab === 'text' && (
              <div className="space-y-3">
                {/* Featured WordArt Studio Launch Banners */}
                <div className="grid grid-cols-2 gap-2">
                  {onOpenWordArtModal && (
                    <button
                      onClick={onOpenWordArtModal}
                      className="p-2.5 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:via-purple-500 hover:to-indigo-500 text-white rounded-2xl shadow-lg border border-purple-400/30 flex items-center justify-between cursor-pointer group transition-all transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold shrink-0">
                          <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                        </div>
                        <div className="text-left min-w-0">
                          <span className="text-[11px] font-black block leading-tight truncate">{t('toolbar.wordart1Title')}</span>
                          <span className="text-[9px] text-purple-200 font-medium block truncate">{t('toolbar.wordart1Sub')}</span>
                        </div>
                      </div>
                    </button>
                  )}
                  {onOpenWordArt2 && (
                    <button
                      onClick={onOpenWordArt2}
                      className="p-2.5 bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-400 hover:via-orange-500 hover:to-rose-500 text-white rounded-2xl shadow-lg border border-amber-400/30 flex items-center justify-between cursor-pointer group transition-all transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold shrink-0">
                          <FileType className="w-3.5 h-3.5 text-amber-200" />
                        </div>
                        <div className="text-left min-w-0">
                          <span className="text-[11px] font-black block leading-tight truncate">{t('toolbar.wordart2Title')}</span>
                          <span className="text-[9px] text-amber-100 font-medium block truncate">{t('toolbar.wordart2Sub')}</span>
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                {/* Sub-tab Pills Switcher */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-[#18191f] rounded-xl border border-[#2d2e36] text-[10px] font-bold">
                  <button
                    onClick={() => setTextSubTab('presets')}
                    className={`py-1.5 px-1 rounded-lg transition-all text-center cursor-pointer ${
                      textSubTab === 'presets'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {t('toolbar.tabPrints')}
                  </button>
                  <button
                    onClick={() => setTextSubTab('fonts')}
                    className={`py-1.5 px-1 rounded-lg transition-all text-center cursor-pointer ${
                      textSubTab === 'fonts'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {t('toolbar.tabFonts')}
                  </button>
                  <button
                    onClick={() => setTextSubTab('quick')}
                    className={`py-1.5 px-1 rounded-lg transition-all text-center cursor-pointer ${
                      textSubTab === 'quick'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {t('toolbar.tabQuickText')}
                  </button>
                  <button
                    onClick={() => setTextSubTab('warp')}
                    className={`py-1.5 px-1 rounded-lg transition-all text-center cursor-pointer ${
                      textSubTab === 'warp'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {t('toolbar.tabWarpEffects')}
                  </button>
                </div>

                {/* SUB-TAB 1: ESTAMPAS & FRASES VETORIAIS PRONTAS */}
                {textSubTab === 'presets' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">
                        {t('toolbar.vectorTypographyPrints')}
                      </span>
                      <span className="text-[9px] text-gray-500 font-mono font-medium">{t('toolbar.oneClick')}</span>
                    </div>

                    {/* Search & Category filter for presets */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder={t('toolbar.searchPhrasePlaceholder')}
                        value={presetSearchQuery}
                        onChange={(e) => setPresetSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-[#202127] border border-[#30313a] focus:border-purple-500 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Presets List Grid */}
                    <div className="space-y-2">
                      {VECTOR_TEXT_PRESETS.filter(
                        (p) =>
                          !presetSearchQuery ||
                          p.title.toLowerCase().includes(presetSearchQuery.toLowerCase()) ||
                          p.content.toLowerCase().includes(presetSearchQuery.toLowerCase()) ||
                          p.categoryLabel.toLowerCase().includes(presetSearchQuery.toLowerCase())
                      ).map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => onAddVectorTextPreset && onAddVectorTextPreset(preset)}
                          className="w-full p-3 bg-gradient-to-r from-[#202128] to-[#282932] hover:from-[#2a2b38] hover:to-[#323445] border border-[#323440] hover:border-purple-500/60 rounded-2xl transition-all cursor-pointer text-left group flex flex-col justify-between gap-2 shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                              {preset.categoryLabel}
                            </span>
                            <span className="text-[9px] bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                              {t('toolbar.vectorBadge')}
                            </span>
                          </div>

                          {/* Live Visual Typography Preview Box */}
                          <div
                            className="w-full h-16 bg-[#131316] rounded-xl flex items-center justify-center p-2 overflow-hidden border border-[#24252d] group-hover:border-purple-500/40 transition-all"
                            style={{
                              fontFamily: preset.fontFamily,
                              color: preset.color,
                              WebkitTextStroke: preset.strokeWidth
                                ? `${preset.strokeWidth / 2}px ${preset.strokeColor || '#fff'}`
                                : 'none',
                            }}
                          >
                            <span
                              className="text-lg font-bold text-center truncate max-w-full group-hover:scale-105 transition-transform"
                              style={{
                                filter: preset.shadowColor
                                  ? `drop-shadow(0px 2px 4px ${preset.shadowColor})`
                                  : 'none',
                              }}
                            >
                              {preset.content}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-gray-400">
                            <span className="truncate font-medium">{preset.title}</span>
                            <span className="text-purple-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                              <span>{t('toolbar.add')}</span>
                              <Plus className="w-3 h-3" />
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-TAB 2: BIBLIOTECA DE FONTES VETORIAIS */}
                {textSubTab === 'fonts' && (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">
                      {t('toolbar.googleSublimFontsLibrary')}
                    </span>

                    {/* Font Search */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder={t('toolbar.searchFontPlaceholder')}
                        value={fontSearchQuery}
                        onChange={(e) => setFontSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-[#202127] border border-[#30313a] focus:border-purple-500 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-all"
                      />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar text-[10px]">
                      <button
                        onClick={() => setSelectedFontCategory('all')}
                        className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium ${
                          selectedFontCategory === 'all'
                            ? 'bg-purple-600 text-white font-bold'
                            : 'bg-[#202127] text-gray-400 hover:text-white border border-[#30313a]'
                        }`}
                      >
                        {t('presetGallery.allCategories')}
                      </button>
                      {[
                        { id: 'script', name: 'Caligrafia' },
                        { id: 'impact', name: 'Impacto' },
                        { id: 'vintage', name: 'Retro/Fun' },
                        { id: 'serif', name: 'Elegante' },
                        { id: 'clean', name: 'Clean' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedFontCategory(cat.id)}
                          className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-medium ${
                            selectedFontCategory === cat.id
                              ? 'bg-purple-600 text-white font-bold'
                              : 'bg-[#202127] text-gray-400 hover:text-white border border-[#30313a]'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>

                    {/* Font Cards List */}
                    <div className="space-y-2">
                      {VECTOR_FONTS.filter(
                        (f) =>
                          (selectedFontCategory === 'all' || f.category === selectedFontCategory) &&
                          (!fontSearchQuery ||
                            f.name.toLowerCase().includes(fontSearchQuery.toLowerCase()) ||
                            f.sampleText.toLowerCase().includes(fontSearchQuery.toLowerCase()))
                      ).map((font) => (
                        <div
                          key={font.id}
                          className="p-3 bg-[#1e1f26] border border-[#2d2e38] hover:border-purple-500/60 rounded-xl transition-all flex flex-col gap-2 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-gray-200">{font.name}</span>
                            <span className="text-[9px] text-gray-400 bg-[#262732] px-2 py-0.5 rounded-full border border-[#343542]">
                              {font.categoryLabel}
                            </span>
                          </div>

                          {/* Typography Sample Render */}
                          <div
                            className="text-xl font-medium text-white py-2 px-3 bg-[#0d0e12] rounded-xl border border-[#2d2f40] truncate drop-shadow-sm tracking-wide"
                            style={{ fontFamily: font.fontFamily }}
                          >
                            {font.sampleText}
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => {
                              const activeL = layers.find((l) => l.id === activeLayerId);
                              if (activeL && activeL.type === 'text') {
                                onUpdateLayer({ ...activeL, fontFamily: font.fontFamily });
                              } else {
                                onAddLayer('text', undefined, 'straight', font.fontFamily);
                              }
                            }}
                            className="w-full py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-[10px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>
                              {activeLayerId && layers.find((l) => l.id === activeLayerId)?.type === 'text'
                                ? t('toolbar.applyFontToSelected')
                                : t('toolbar.insertTextWithFont')}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-TAB 3: QUICK TEXT ADDITION */}
                {textSubTab === 'quick' && (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      {t('toolbar.insertSimpleTextBlock')}
                    </span>

                    {/* Add Heading Button */}
                    <button
                      onClick={() => onAddLayer('text')}
                      className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-lg rounded-xl shadow-lg transition-all text-left flex items-center justify-between cursor-pointer active:scale-95"
                    >
                      <span>{t('toolbar.addHeading')}</span>
                      <Plus className="w-5 h-5" />
                    </button>

                    {/* Add Subheading Button */}
                    <button
                      onClick={() => onAddLayer('text')}
                      className="w-full py-2.5 px-4 bg-[#202127] hover:bg-[#2a2b33] border border-[#30313a] text-white font-bold text-sm rounded-xl transition-all text-left flex items-center justify-between cursor-pointer"
                    >
                      <span>{t('toolbar.addSubheading')}</span>
                      <Plus className="w-4 h-4 text-purple-400" />
                    </button>

                    {/* Add Body Text */}
                    <button
                      onClick={() => onAddLayer('text')}
                      className="w-full py-2 px-4 bg-[#202127] hover:bg-[#2a2b33] border border-[#30313a] text-gray-300 hover:text-white font-medium text-xs rounded-xl transition-all text-left flex items-center justify-between cursor-pointer"
                    >
                      <span>{t('toolbar.addBodyText')}</span>
                      <Plus className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}

                {/* SUB-TAB 4: SUBLIMATION TEXT WARP & CURVED PRESETS */}
                {textSubTab === 'warp' && (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">
                      {t('toolbar.sublimationStylesAndWarps')}
                    </span>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => handleApplyTextWarp('arc_upper')}
                        className="p-3 bg-[#181922] hover:bg-[#212330] border border-purple-500/40 hover:border-purple-400 rounded-xl text-left flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-white text-xs tracking-wide group-hover:text-purple-300 transition-colors">
                            {t('toolbar.mugArc')}
                          </span>
                          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-bold border border-purple-500/30">
                            Arco
                          </span>
                        </div>
                        <div className="my-1 py-1.5 px-2 bg-[#0d0e14] rounded-lg border border-[#2d2f42] text-center overflow-hidden">
                          <span className="text-sm font-black text-purple-300 inline-block transform -rotate-2 tracking-widest drop-shadow-sm">
                            CANECAS
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium mt-1">{t('toolbar.mugArcSub')}</span>
                      </button>

                      <button
                        onClick={() => handleApplyTextWarp('wave')}
                        className="p-3 bg-[#181922] hover:bg-[#212330] border border-cyan-500/40 hover:border-cyan-400 rounded-xl text-left flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-white text-xs tracking-wide group-hover:text-cyan-300 transition-colors">
                            {t('toolbar.sineWave')}
                          </span>
                          <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold border border-cyan-500/30">
                            Onda
                          </span>
                        </div>
                        <div className="my-1 py-1.5 px-2 bg-[#0d0e14] rounded-lg border border-[#2d2f42] text-center overflow-hidden">
                          <span className="text-sm font-black text-cyan-300 inline-block tracking-widest drop-shadow-sm">
                            W A V E
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium mt-1">{t('toolbar.sineWaveSub')}</span>
                      </button>

                      <button
                        onClick={() => handleApplyTextWarp('logo_circle')}
                        className="p-3 bg-[#181922] hover:bg-[#212330] border border-amber-500/40 hover:border-amber-400 rounded-xl text-left flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-white text-xs tracking-wide group-hover:text-amber-300 transition-colors">
                            {t('toolbar.circularLogo')}
                          </span>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">
                            360°
                          </span>
                        </div>
                        <div className="my-1 py-1.5 px-2 bg-[#0d0e14] rounded-lg border border-[#2d2f42] text-center overflow-hidden">
                          <span className="text-sm font-black text-amber-300 inline-block tracking-widest drop-shadow-sm">
                            CIRCULAR
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium mt-1">{t('toolbar.circularLogoSub')}</span>
                      </button>

                      <button
                        onClick={() => handleApplyTextWarp('stamp_style')}
                        className="p-3 bg-[#181922] hover:bg-[#212330] border border-emerald-500/40 hover:border-emerald-400 rounded-xl text-left flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-white text-xs tracking-wide group-hover:text-emerald-300 transition-colors">
                            {t('toolbar.stampBadge')}
                          </span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold border border-emerald-500/30">
                            Selo
                          </span>
                        </div>
                        <div className="my-1 py-1.5 px-2 bg-[#0d0e14] rounded-lg border border-[#2d2f42] text-center overflow-hidden">
                          <span className="text-sm font-black text-emerald-300 inline-block tracking-widest uppercase drop-shadow-sm">
                            VINTAGE
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium mt-1">{t('toolbar.stampBadgeSub')}</span>
                      </button>

                      <button
                        onClick={() => handleApplyTextWarp('heart')}
                        className="p-3 bg-[#181922] hover:bg-[#212330] border border-rose-500/40 hover:border-rose-400 rounded-xl text-left flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-white text-xs tracking-wide group-hover:text-rose-300 transition-colors">
                            {t('toolbar.heartShape')}
                          </span>
                          <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-bold border border-rose-500/30">
                            Amor
                          </span>
                        </div>
                        <div className="my-1 py-1.5 px-2 bg-[#0d0e14] rounded-lg border border-[#2d2f42] text-center overflow-hidden">
                          <span className="text-sm font-black text-rose-300 inline-block tracking-widest drop-shadow-sm">
                            AMOR
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium mt-1">{t('toolbar.heartShapeSub')}</span>
                      </button>

                      <button
                        onClick={() => handleApplyTextWarp('bulge')}
                        className="p-3 bg-[#181922] hover:bg-[#212330] border border-indigo-500/40 hover:border-indigo-400 rounded-xl text-left flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-white text-xs tracking-wide group-hover:text-indigo-300 transition-colors">
                            {t('toolbar.bulge3d')}
                          </span>
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-bold border border-indigo-500/30">
                            3D
                          </span>
                        </div>
                        <div className="my-1 py-1.5 px-2 bg-[#0d0e14] rounded-lg border border-[#2d2f42] text-center overflow-hidden">
                          <span className="text-sm font-black text-indigo-300 inline-block tracking-widest scale-110 drop-shadow-sm">
                            INFLAR
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium mt-1">{t('toolbar.bulge3dSub')}</span>
                      </button>

                      <button
                        onClick={() => handleApplyTextWarp('emblem')}
                        className="p-3 bg-[#181922] hover:bg-[#212330] border border-yellow-500/40 hover:border-yellow-400 rounded-xl text-left flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-white text-xs tracking-wide group-hover:text-yellow-300 transition-colors">
                            {t('toolbar.emblemShield')}
                          </span>
                          <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded font-bold border border-yellow-500/30">
                            Time
                          </span>
                        </div>
                        <div className="my-1 py-1.5 px-2 bg-[#0d0e14] rounded-lg border border-[#2d2f42] text-center overflow-hidden">
                          <span className="text-sm font-black text-yellow-300 inline-block tracking-widest drop-shadow-sm">
                            BRASÃO
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium mt-1">{t('toolbar.emblemShieldSub')}</span>
                      </button>

                      <button
                        onClick={() => handleApplyTextWarp('ribbon')}
                        className="p-3 bg-[#181922] hover:bg-[#212330] border border-teal-500/40 hover:border-teal-400 rounded-xl text-left flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group shadow-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-white text-xs tracking-wide group-hover:text-teal-300 transition-colors">
                            {t('toolbar.ribbonBand')}
                          </span>
                          <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-bold border border-teal-500/30">
                            Fita
                          </span>
                        </div>
                        <div className="my-1 py-1.5 px-2 bg-[#0d0e14] rounded-lg border border-[#2d2f42] text-center overflow-hidden">
                          <span className="text-sm font-black text-teal-300 inline-block tracking-widest drop-shadow-sm">
                            RIBBON
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 font-medium mt-1">{t('toolbar.ribbonBandSub')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: UPLOADS & PHOTOS */}
            {activeTab === 'uploads' && (
              <div className="space-y-4">
                {/* Upload Image Button */}
                <label className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden">
                  <Upload className="w-4 h-4" />
                  <span>{t('toolbar.uploadImageBtn')}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </label>

                {/* Connect Canva Card */}
                {onOpenCanva && (
                  <button
                    onClick={onOpenCanva}
                    className="w-full p-3 rounded-2xl bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-indigo-500/20 hover:from-teal-500/30 hover:via-purple-500/30 border border-teal-500/40 text-left transition-all hover:scale-[1.02] cursor-pointer shadow-md group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white font-black text-xs italic flex items-center justify-center shadow">
                          C
                        </div>
                        <span className="font-extrabold text-xs text-white group-hover:text-teal-200 transition-colors">
                          Conectar com Canva / Importar
                        </span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00c4cc]/20 text-[#00c4cc] font-extrabold border border-[#00c4cc]/30">
                        CANVA
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300">
                      Importe artes prontas da sua conta ou use templates profissionais para sublimação.
                    </p>
                  </button>
                )}

                {/* Paste Transparency Card (Ctrl+V) */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clipboard className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-extrabold text-emerald-200">{t('toolbar.transparencyArea')}</span>
                  </div>
                  <p className="text-[11px] text-emerald-300/80 leading-snug">
                    {t('toolbar.transparencyAreaDesc')}
                  </p>
                  <button
                    onClick={() => onPasteFromClipboard?.()}
                    className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>{t('toolbar.pasteClipboardBtn')}</span>
                  </button>
                </div>

                <div className="border-t border-[#26272e] pt-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    {t('toolbar.sublimationHdBackgrounds')}
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    {stockPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        onClick={() => {
                          if (onAddAIGeneratedImage) {
                            onAddAIGeneratedImage(photo.url, photo.tag);
                          }
                        }}
                        className="group relative h-24 rounded-xl overflow-hidden border border-[#2d2e36] hover:border-purple-500 cursor-pointer shadow-sm transition-all hover:scale-105"
                      >
                        <img src={photo.url} alt={photo.tag} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors p-2 flex items-end">
                          <span className="text-white text-[10px] font-semibold">{photo.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PRODUCTS */}
            {activeTab === 'products' && (
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  {t('toolbar.chooseProductToCreate')}
                </span>

                <div className="grid grid-cols-1 gap-2">
                  {PRODUCTS_LIBRARY.map((prod) => {
                    const isSelected = currentProduct.id === prod.id;
                    return (
                      <div
                        key={prod.id}
                        onClick={() => onSelectProduct(prod)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                            : 'bg-[#202127] border-[#30313a] text-gray-300 hover:bg-[#2a2b33] hover:text-white'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold shrink-0">
                          <ProductIcon product={prod} className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs truncate">{prod.name}</span>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400 block font-mono">
                            {prod.printAspect}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 6: AI STUDIO */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <div className="p-3 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-sky-900/40 border border-purple-500/40 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>{t('toolbar.aiGenerativeStudio')}</span>
                  </div>
                  <p className="text-[11px] text-gray-300">
                    {t('toolbar.aiStudioDesc')}
                  </p>
                  <button
                    onClick={() => {
                      if (onOpenAIPanel) onOpenAIPanel();
                    }}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>{t('toolbar.openAiFullPanel')}</span>
                  </button>
                </div>

                <div className="space-y-2 border-t border-[#26272e] pt-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    {t('toolbar.aiImageTools')}
                  </span>

                  <button
                    onClick={() => onSelectTool('remove_bg')}
                    className="w-full p-2.5 bg-[#202127] hover:bg-[#2a2b33] border border-[#30313a] rounded-xl text-left flex items-center gap-2.5 transition-all text-xs font-semibold text-gray-200"
                  >
                    <Wand2 className="w-4 h-4 text-purple-400" />
                    <span>{t('toolbar.removeImageBg')}</span>
                  </button>

                  <button
                    onClick={() => onSelectTool('vectorize')}
                    className="w-full p-2.5 bg-[#202127] hover:bg-[#2a2b33] border border-[#30313a] rounded-xl text-left flex items-center gap-2.5 transition-all text-xs font-semibold text-gray-200"
                  >
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <span>{t('toolbar.vectorizeForSublimation')}</span>
                  </button>

                  <button
                    onClick={() => onSelectTool('upscale')}
                    className="w-full p-2.5 bg-[#202127] hover:bg-[#2a2b33] border border-[#30313a] rounded-xl text-left flex items-center gap-2.5 transition-all text-xs font-semibold text-gray-200"
                  >
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>{t('toolbar.upscaleAi300Dpi')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 8: CANVA STUDIO & MODELOS */}
            {activeTab === 'canva' && (
              <div className="space-y-3">
                {/* Header Actions: Status & Quick Launch */}
                <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-cyan-50 to-purple-50 border-cyan-200 text-slate-800'
                    : 'bg-gradient-to-r from-[#00c4cc]/15 to-[#7d2ae8]/15 border-cyan-500/30 text-gray-200'
                }`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white flex items-center justify-center font-black italic text-xs shrink-0 shadow">
                      C
                    </div>
                    <div className="truncate">
                      <div className="font-extrabold text-[11px] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8]">
                        Canva Connect
                      </div>
                      <div className="text-[9px] text-gray-400">
                        {isCanvaConnected ? '✓ Conectado' : 'Pronto para usar'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={handleOpenCanvaCustomSize}
                      className="px-2 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                      title="Criar novo design no Canva com gabarito exato"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Novo Gabarito</span>
                    </button>
                    {onOpenCanva && (
                      <button
                        onClick={onOpenCanva}
                        className="px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                        title="Abrir Hub Completo do Canva"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Hub</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Search Bar for Templates */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar modelos (ex: pai, leão, café, floral...)"
                    className={`w-full pl-8 pr-7 py-1.5 rounded-xl border text-xs transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                      theme === 'light'
                        ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400'
                        : 'bg-[#181922] border-[#292a38] text-gray-200 placeholder-gray-500'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Categories Filter Pills */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold px-0.5">
                    <span>TEMPLATES CANVA</span>
                    <span className="text-cyan-400">
                      {searchCanvaTemplates(CANVA_TEMPLATES, searchQuery, canvaCategory).length} modelos disponíveis
                    </span>
                  </div>

                  <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1">
                    {[
                      { id: 'all', label: 'Todos' },
                      { id: 'fathers', label: '👨 Pais' },
                      { id: 'mugs', label: '☕ Canecas' },
                      { id: 'tshirts', label: '👕 Camisetas' },
                      { id: 'mothers', label: '🌸 Mães' },
                      { id: 'gamer', label: '🎮 Gamer' },
                      { id: 'branding', label: '🏷️ Logos' },
                      { id: 'pets', label: '🐾 Pets' },
                      { id: 'faith', label: '✨ Fé' },
                      { id: 'general', label: '🎨 Geral' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCanvaCategory(cat.id)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                          canvaCategory === cat.id
                            ? 'bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] text-white shadow-xs'
                            : theme === 'light'
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-[#1e1f2a] hover:bg-[#282a38] text-gray-300 border border-[#2d2f3d]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Templates Grid List */}
                <div className="space-y-2.5">
                  {(() => {
                    const filtered = searchCanvaTemplates(CANVA_TEMPLATES, searchQuery, canvaCategory);
                    if (filtered.length === 0) {
                      return (
                        <div className={`p-4 rounded-xl border text-center space-y-2 ${
                          theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#1b1c24] border-[#292a38] text-gray-300'
                        }`}>
                          <p className="text-xs font-semibold">Nenhum modelo local para "{searchQuery}"</p>
                          <button
                            onClick={() => {
                              const canvaUrl = `https://www.canva.com/pt_br/modelos/?query=${encodeURIComponent(searchQuery || 'sublimacao')}`;
                              window.open(canvaUrl, '_blank', 'noopener,noreferrer');
                            }}
                            className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow hover:opacity-90 transition-all cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Buscar "{searchQuery || 'sublimação'}" no Canva.com</span>
                          </button>
                        </div>
                      );
                    }

                    return filtered.map((tpl) => (
                      <div
                        key={tpl.id}
                        className={`group rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md ${
                          theme === 'light'
                            ? 'bg-white border-slate-200 hover:border-cyan-400'
                            : 'bg-[#181922] border-[#262734] hover:border-cyan-500/60'
                        }`}
                      >
                        {/* Image Thumbnail Preview & Direct Click to Insert */}
                        <div
                          className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden cursor-pointer"
                          onClick={() => handleInsertCanvaTemplate(tpl, false)}
                          title="Clique para inserir esta arte no Canvas"
                        >
                          <img
                            src={tpl.previewUrl}
                            alt={tpl.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                            <span className="px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-cyan-300 text-[9px] font-extrabold border border-cyan-500/30">
                              {tpl.categoryLabel}
                            </span>
                          </div>

                          <div className="absolute top-1.5 right-1.5">
                            <span className="px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-gray-200 text-[9px] font-mono">
                              {tpl.widthMm}×{tpl.heightMm}mm
                            </span>
                          </div>

                          {/* Title on Overlay */}
                          <div className="absolute bottom-1.5 left-2 right-2">
                            <h4 className="text-white font-bold text-xs truncate leading-tight drop-shadow">
                              {tpl.title}
                            </h4>
                            <p className="text-gray-300 text-[9px] truncate opacity-85">
                              {tpl.author}
                            </p>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="p-2 space-y-1.5">
                          {/* Primary Inserir Arte Button */}
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              onClick={() => handleInsertCanvaTemplate(tpl, false)}
                              className="py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] hover:opacity-95 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                              title="Inserir como camada de imagem editável no canvas"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Inserir Arte</span>
                            </button>

                            <button
                              onClick={() => handleInsertCanvaTemplate(tpl, true)}
                              className={`py-1.5 px-2 rounded-lg border font-bold text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                theme === 'light'
                                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                                  : 'bg-[#22232e] hover:bg-[#2d2e3c] border-[#323444] text-gray-200'
                              }`}
                              title="Definir arte como plano de fundo completo"
                            >
                              <ImageIcon className="w-3 h-3 text-cyan-400" />
                              <span>Como Fundo</span>
                            </button>
                          </div>

                          {tpl.templateUrl && (
                            <button
                              onClick={() => window.open(tpl.templateUrl, '_blank', 'noopener,noreferrer')}
                              className={`w-full py-1 px-2 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                theme === 'light'
                                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                              title="Abrir o modelo original no Canva"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Abrir no Canva</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ));
                  })()}
                </div>

                {/* Paste from Canva Tip */}
                <div className={`p-3 rounded-2xl border text-center ${
                  theme === 'light'
                    ? 'bg-cyan-50/50 border-cyan-200/60 text-slate-700'
                    : 'bg-cyan-950/20 border-cyan-500/20 text-gray-300'
                }`}>
                  <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-bold text-xs mb-1">
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Colar Direto do Canva (Ctrl + V)</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed mb-2">
                    Copie qualquer elemento no Canva e cole diretamente aqui com transparência PNG automática.
                  </p>
                  {onPasteFromClipboard && (
                    <button
                      onClick={onPasteFromClipboard}
                      className="py-1 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Colar da Área de Transferência
                    </button>
                  )}
                </div>

                {/* Full Modal Trigger */}
                {onOpenCanva && (
                  <button
                    onClick={onOpenCanva}
                    className={`w-full py-2.5 px-3 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                        : 'bg-[#202128] hover:bg-[#2a2c36] border-[#323444] text-gray-200'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                    <span>Abrir Galeria & Hub Completo</span>
                  </button>
                )}
              </div>
            )}

            {/* TAB 7: LAYERS */}
            {activeTab === 'layers' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#26272e]">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {t('toolbar.layersOnScreen')} ({layers.length})
                  </span>
                  <button
                    onClick={() => onAddLayer('text')}
                    className="p-1 hover:bg-white/10 text-purple-400 rounded transition-colors"
                    title={t('toolbar.addNewLayer')}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  {layers.slice().reverse().map((layer) => {
                    const isSelected = activeLayerId === layer.id;
                    return (
                      <div
                        key={layer.id}
                        onClick={() => onSelectLayer(layer.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-purple-600/20 border-purple-500 text-white shadow-md'
                            : 'bg-[#202127] border-[#30313a] text-gray-300 hover:bg-[#2a2b33]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-bold truncate max-w-[140px]">
                            {layer.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {/* Visibility Toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateLayer({ ...layer, visible: !layer.visible });
                            }}
                            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                          >
                            {layer.visible ? <Eye className="w-3.5 h-3.5 text-purple-400" /> : <EyeOff className="w-3.5 h-3.5 text-gray-600" />}
                          </button>

                          {/* Lock Toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateLayer({ ...layer, locked: !layer.locked });
                            }}
                            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                          >
                            {layer.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 text-gray-500" />}
                          </button>

                          {/* Delete */}
                          {onDeleteLayer && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteLayer(layer.id);
                              }}
                              className="p-1 hover:bg-red-500/20 text-gray-400 hover:text-red-300 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export const LeftToolBar = LeftToolbar;
export default LeftToolbar;
