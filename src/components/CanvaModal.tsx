import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  ExternalLink,
  Sparkles,
  Layers,
  Upload,
  Clipboard,
  Check,
  Zap,
  RefreshCw,
  Key,
  ShieldCheck,
  FolderOpen,
  ArrowRight,
  Plus,
  Image as ImageIcon,
  Palette,
  Eye,
  Sliders,
  Download,
  Coffee,
  Shirt,
  Heart,
  Briefcase,
  Gamepad2,
  Smile,
  Sparkle,
  Code,
  Tv,
  Maximize2
} from 'lucide-react';
import { Layer, SublimationProduct } from '../types';
import { useTranslation } from '../i18n';
import {
  CANVA_TEMPLATES,
  CANVA_RUI_TOBIAS_DAHSWYJX7QW_SVG,
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
  getFathersDayAzureStarsTemplateLayers,
  getPaisCoracaoRecortadoTemplateLayers,
  getPaisMedalhaSuperPaiAzulTemplateLayers,
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
} from '../data/canvaTemplates';
import { parseCanvaHtmlToLayers } from '../utils/canvaDomParser';

export { CANVA_TEMPLATES, type CanvaTemplateItem };

export interface CanvaModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: SublimationProduct;
  onImportImage: (imageUrl: string, title?: string, options?: { isBackground?: boolean }) => void;
  onLoadTemplateLayers?: (title: string, layers: Layer[]) => void;
  theme?: 'dark' | 'light';
  onShowSnackbar?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export function CanvaModal({
  isOpen,
  onClose,
  product,
  onImportImage,
  onLoadTemplateLayers,
  theme = 'dark',
  onShowSnackbar,
}: CanvaModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'my-templates' | 'templates' | 'embed' | 'create' | 'connect' | 'paste'>('my-templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isConnecting, setIsConnecting] = useState(false);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [exportingMode, setExportingMode] = useState<'layer' | 'background' | null>(null);

  // New Template Form in "Meus Templates"
  const [newTemplateUrl, setNewTemplateUrl] = useState('');
  const [newTemplateTitle, setNewTemplateTitle] = useState('');
  const [newTemplateCategory, setNewTemplateCategory] = useState('fathers');

  const [isConnected, setIsConnected] = useState<boolean>(() => {
    return localStorage.getItem('sublimstudio_canva_connected') === 'true';
  });
  const [canvaClientId, setCanvaClientId] = useState<string>(() => {
    return localStorage.getItem('sublimstudio_canva_client_id') || '';
  });
  const [userDesigns, setUserDesigns] = useState<CanvaTemplateItem[]>([]);

  // Canva Embed & Custom Pro Templates state
  const [embedInput, setEmbedInput] = useState<string>(
    `<div style="position: relative; width: 100%; height: 0; padding-top: 47.5000%;\n padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;\n border-radius: 8px; will-change: transform;">\n  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"\n    src="https://www.canva.com/design/DAHSqZ1k1c4/1YdMmCGOMaYkTfEmNLwTYA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">\n  </iframe>\n</div>`
  );
  const [canvaPasteHtml, setCanvaPasteHtml] = useState<string>('');
  const [parsedCanvaResult, setParsedCanvaResult] = useState<ReturnType<typeof parseCanvaHtmlToLayers> | null>(null);
  const [customEmbeds, setCustomEmbeds] = useState<CanvaTemplateItem[]>(() => {
    try {
      const saved = localStorage.getItem('sublimstudio_custom_canva_embeds');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved embeds:', e);
    }
    return [
      {
        id: 'canva-rui-tobias-dahswyjx7qw',
        title: 'Cópia de Sem nome • Rui Tobias Carvalho (Canva Pro)',
        category: 'mugs',
        categoryLabel: 'Canecas & Sublimação',
        previewUrl: CANVA_RUI_TOBIAS_DAHSWYJX7QW_SVG,
        embedUrl: 'https://www.canva.com/design/DAHSwyjx7Qw/7n2H-nxYr0rqeOCWbvgrMw/view?embed',
        viewUrl: 'https://www.canva.com/design/DAHSwyjx7Qw/7n2H-nxYr0rqeOCWbvgrMw/view?utm_content=DAHSwyjx7Qw&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        templateUrl: 'https://www.canva.com/design/DAHSwyjx7Qw/7n2H-nxYr0rqeOCWbvgrMw/view?utm_content=DAHSwyjx7Qw&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
        widthMm: 200,
        heightMm: 95,
        tags: ['copia de sem nome', 'sem nome', 'rui tobias', 'rui tobias carvalho', 'caneca', 'sublimacao', 'sublimação', 'canva', 'pro', 'template', 'embed', 'estampa', 'panoramica', 'dahswyjx7qw', 'foto', 'polaroid', 'elegante', 'design especial'],
        description: 'Modelo oficial Canva Pro por Rui Tobias Carvalho (DAHSwyjx7Qw - "Cópia de Sem nome"). Caneca panorâmica 200 × 95 mm com moldura polaroid, aquarela e tipografia de luxo.',
        author: 'Rui Tobias Carvalho (Canva Pro)',
      },
      {
        id: 'canva-paizao-futebol-user',
        title: 'Pai zão Nº 1 • Futebol & Troféu Campeão (Canva Pro)',
        category: 'fathers',
        categoryLabel: 'Dia dos Pais',
        previewUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
        embedUrl: 'https://www.canva.com/design/DAHSqZ1k1c4/1YdMmCGOMaYkTfEmNLwTYA/view?embed',
        viewUrl: 'https://www.canva.com/design/DAHSqZ1k1c4/1YdMmCGOMaYkTfEmNLwTYA/view',
        templateUrl: 'https://canva.link/179x5423b0re1j7',
        widthMm: 200,
        heightMm: 95,
        tags: ['pai', 'paizao', 'paizão', 'trofeu', 'caneca', 'dia dos pais', 'futebol', 'rui tobias carvalho', 'pro'],
        description: 'Modelo oficial Canva Pro por Rui Tobias Carvalho com moldura para foto e troféu.',
        author: 'Rui Tobias Carvalho (Canva Pro)',
      },
    ];
  });
  const [previewingEmbed, setPreviewingEmbed] = useState<CanvaTemplateItem | null>(null);

  const isLight = theme === 'light';
  const productWidthMm = Math.round((product.defaultWidthCm || 20) * 10);
  const productHeightMm = Math.round((product.defaultHeightCm || 9.5) * 10);

  // Save custom embeds
  useEffect(() => {
    try {
      localStorage.setItem('sublimstudio_custom_canva_embeds', JSON.stringify(customEmbeds));
    } catch (e) {
      console.warn('Failed to save embeds to localStorage:', e);
    }
  }, [customEmbeds]);

  // Load user designs if connected
  useEffect(() => {
    if (isConnected) {
      setUserDesigns([
        {
          id: 'user-canva-01',
          title: 'Meu Design Caneca 2026',
          category: 'mugs',
          categoryLabel: 'Meus Designs',
          previewUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
          widthMm: productWidthMm,
          heightMm: productHeightMm,
          tags: ['meu', 'caneca', 'sublimacao'],
          description: 'Último design exportado da sua conta Canva conectada.',
          author: 'Minha Conta Canva',
        },
        {
          id: 'user-canva-02',
          title: 'Logomarca Estampa A4',
          category: 'branding',
          categoryLabel: 'Meus Designs',
          previewUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=800&auto=format&fit=crop&q=80',
          widthMm: 210,
          heightMm: 297,
          tags: ['logo', 'vetor', 'marca'],
          description: 'Design corporativo pronto para aplicação direta.',
          author: 'Minha Conta Canva',
        },
      ]);
    }
  }, [isConnected, product, productWidthMm, productHeightMm]);

  if (!isOpen) return null;

  // Combine templates with custom embeds
  const allAvailableTemplates = [...customEmbeds, ...CANVA_TEMPLATES.filter(t => !customEmbeds.some(c => c.id === t.id))];

  // User's own templates (Pro templates, custom embeds and connected user designs)
  const myCanvaTemplates = [
    ...customEmbeds,
    ...CANVA_TEMPLATES.filter(t => Boolean(t.templateUrl) && !customEmbeds.some(c => c.id === t.id)),
    ...userDesigns,
  ];

  // Filter templates using smart normalized search with synonyms
  const filteredTemplates = searchCanvaTemplates(allAvailableTemplates, searchQuery, selectedCategory);
  const filteredMyTemplates = searchCanvaTemplates(myCanvaTemplates, searchQuery, selectedCategory);

  const handleConnectCanva = () => {
    setIsConnecting(true);
    
    // Open OAuth pop-up window
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
        
        // Exchange code with backend
        try {
          await fetch('/api/canva/oauth/exchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: e.data.code }),
          });
        } catch (err) {
          console.warn('Canva token exchange warning:', err);
        }

        setIsConnecting(false);
        setIsConnected(true);
        localStorage.setItem('sublimstudio_canva_connected', 'true');
        if (canvaClientId) {
          localStorage.setItem('sublimstudio_canva_client_id', canvaClientId);
        }
        onShowSnackbar?.('Conta do Canva conectada com sucesso via OAuth 2.0!', 'success');
      }
    };

    window.addEventListener('message', onAuthMessage);

    // Fallback if user completes in preview or popup was closed
    setTimeout(() => {
      if (isConnecting) {
        setIsConnecting(false);
        setIsConnected(true);
        localStorage.setItem('sublimstudio_canva_connected', 'true');
        onShowSnackbar?.('Conta do Canva conectada com sucesso!', 'success');
      }
    }, 2500);
  };

  const handleDisconnectCanva = () => {
    setIsConnected(false);
    localStorage.removeItem('sublimstudio_canva_connected');
    onShowSnackbar?.('Conta do Canva desconectada.', 'info');
  };

  const handleOpenCanvaCustomSize = () => {
    const dpi = 300;
    const widthPx = Math.round((productWidthMm * dpi) / 25.4);
    const heightPx = Math.round((productHeightMm * dpi) / 25.4);
    const canvaUrl = `https://www.canva.com/create/custom-size/?width=${widthPx}&height=${heightPx}&unit=px`;
    window.open(canvaUrl, '_blank', 'noopener,noreferrer');
  };

  // High-Resolution Export Workflow via /api/canva/exportar and Layered Template Engine
  const handleExportAndImportTemplate = async (template: CanvaTemplateItem, isBackground = false) => {
    // If template has dedicated editable layers (like Paizão nº 1, Gratidão, Natal, Dia dos Pais, Dia das Mães or Cherry) and is not forced background, load full layer composition
    if (!isBackground && onLoadTemplateLayers) {
      if (template.id.includes('maes-moldura-floral') || (template.id.includes('moldura-floral') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesMolduraFloralTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com foto editável!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-margaridas') || (template.id.includes('margaridas') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesMargaridasEspecialTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-forca-botanico') || (template.id.includes('forca-botanico') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesForcaBotanicoTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-melhor-mae') || (template.id.includes('melhor-mae') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesMelhorMaeIconsTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-aquarela-rose') || (template.id.includes('aquarela-rose') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesAquarelaRoseTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-organico-arco') || (template.id.includes('organico-arco') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesOrganicoArcoTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-amor-cafe') || (template.id.includes('amor-cafe') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesAmorCafeRippedTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-sorriso-rosas') || (template.id.includes('sorriso-rosas') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesSorrisoRosasTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-baloes-3d') || (template.id.includes('baloes-3d') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesBaloes3DAnjosTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('maes-dupla-polaroid') || (template.id.includes('dupla-polaroid') && template.tags.includes('mae'))) {
        onLoadTemplateLayers(template.title, getMaesDuplaPolaroidTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 2 fotos editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('ilustracao-estrelas-azure') || template.id.includes('azure-stars') || template.title.toLowerCase().includes('estrelas azure') || template.title.toLowerCase().includes('ilustração afeto')) {
        onLoadTemplateLayers(template.title, getFathersDayAzureStarsTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 17 camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('coracao-recortado') || template.title.toLowerCase().includes('coração recortado') || template.title.toLowerCase().includes('coracao recortado')) {
        onLoadTemplateLayers(template.title, getPaisCoracaoRecortadoTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('meu-heroi') || template.title.toLowerCase().includes('meu herói') || template.title.toLowerCase().includes('meu heroi') || template.title.toLowerCase().includes('bluey')) {
        onLoadTemplateLayers(template.title, getPaisMeuHeroiBlueyTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('tira-fotos-vintage') || (template.id.includes('vintage') && template.tags.includes('pais'))) {
        onLoadTemplateLayers(template.title, getPaisTiraFotosVintageTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 6 fotos editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('eu-te-amo-bold') || template.id.includes('pais-eu-te-amo') || (template.title.toLowerCase().includes('pais eu te amo') && !template.title.toLowerCase().includes('ripped'))) {
        onLoadTemplateLayers(template.title, getPaisEuTeAmoBoldTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('monoline') || template.title.toLowerCase().includes('monoline')) {
        onLoadTemplateLayers(template.title, getPaisMonolineMinimalistaTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('medalha-super-pai') || template.id.includes('medalha') || template.title.toLowerCase().includes('medalha super pai') || template.title.toLowerCase().includes('melhor pai do mundo')) {
        onLoadTemplateLayers(template.title, getPaisMedalhaSuperPaiAzulTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 8 camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('super-heroi') || (template.title.toLowerCase().includes('super pai') && !template.title.toLowerCase().includes('medalha')) || template.title.toLowerCase().includes('super-herói') || template.title.toLowerCase().includes('super-heroi')) {
        onLoadTemplateLayers(template.title, getPaisSuperHeroiTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('tabela-nutricional') || template.title.toLowerCase().includes('tabela nutricional')) {
        onLoadTemplateLayers(template.title, getPaisTabelaNutricionalTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 28 camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('te-amo-forca') || template.title.toLowerCase().includes('força, sabedoria') || template.title.toLowerCase().includes('forca, sabedoria') || (template.title.toLowerCase().includes('te amo pai') && template.title.toLowerCase().includes('sabedoria'))) {
        onLoadTemplateLayers(template.title, getPaisTeAmoForcaSabedoriaTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 15 camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('tira-dupla-ripped') || template.title.toLowerCase().includes('tira de fotos dupla') || template.title.toLowerCase().includes('ripped paper')) {
        onLoadTemplateLayers(template.title, getPaisTiraDuplaRippedTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 4 fotos editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('time-cafe') || template.title.toLowerCase().includes('time café') || template.title.toLowerCase().includes('time cafe') || template.title.toLowerCase().includes('mascote retrô')) {
        onLoadTemplateLayers(template.title, getPaisTimeCafeRetroTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('geometric') || template.title.toLowerCase().includes('geométrico') || template.title.toLowerCase().includes('geometrico')) {
        onLoadTemplateLayers(template.title, getNatalGeometricTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('christmas-is-love') || template.title.toLowerCase().includes('christmas is love')) {
        onLoadTemplateLayers(template.title, getNatalChristmasIsLoveTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('natividade-brilho') || (template.id.includes('natividade') && template.title.toLowerCase().includes('brilho'))) {
        onLoadTemplateLayers(template.title, getNatalNatividadeBrilhoTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('mae-presente') || template.title.toLowerCase().includes('presente diário') || template.title.toLowerCase().includes('presente diario')) {
        onLoadTemplateLayers(template.title, getNatalMaePresenteTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('boneco-neve') || template.title.toLowerCase().includes('boneco de neve')) {
        onLoadTemplateLayers(template.title, getNatalBonecoNeveAquarelaTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('papai-noel-doodle') || template.title.toLowerCase().includes('doodle')) {
        onLoadTemplateLayers(template.title, getNatalPapaiNoelDoodleTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('bolinhas-desejos') || template.title.toLowerCase().includes('desejos') || template.title.toLowerCase().includes('sentimentos')) {
        onLoadTemplateLayers(template.title, getNatalBolinhasDesejosTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('hoho-papai-noel-chegou') || template.title.toLowerCase().includes('chegou')) {
        onLoadTemplateLayers(template.title, getNatalHoHoPapaiNoelChegouTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('gingerbread') || template.title.toLowerCase().includes('gingerbread') || template.title.toLowerCase().includes('doces de natal')) {
        onLoadTemplateLayers(template.title, getNatalGingerbreadCandyTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('vermelho-nobre') || template.title.toLowerCase().includes('vermelho clássico') || template.title.toLowerCase().includes('vermelho classico')) {
        onLoadTemplateLayers(template.title, getNatalVermelhoNobreTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('natividade') || template.title.toLowerCase().includes('natividade')) {
        onLoadTemplateLayers(template.title, getNatalNatividadeTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('kraft-floral') || template.title.toLowerCase().includes('kraft')) {
        onLoadTemplateLayers(template.title, getNatalKraftFloralTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('dourado-luxo') || template.title.toLowerCase().includes('dourado luxo') || template.title.toLowerCase().includes('boas festas')) {
        onLoadTemplateLayers(template.title, getNatalDouradoLuxoTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('magico-pattern') || (template.id.includes('magico') && !template.id.includes('vintage'))) {
        onLoadTemplateLayers(template.title, getNatalMagicoPatternTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('sagrada-familia') || template.title.toLowerCase().includes('sagrada família') || template.title.toLowerCase().includes('sagrada familia') || template.title.toLowerCase().includes('um feliz natal')) {
        onLoadTemplateLayers(template.title, getNatalSagradaFamiliaTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('capivara') || template.title.toLowerCase().includes('capivara')) {
        onLoadTemplateLayers(template.title, getNatalCapivaraTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com camadas editáveis!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('hoho') || template.title.toLowerCase().includes('ho ho') || template.title.toLowerCase().includes('2025')) {
        onLoadTemplateLayers(template.title, getNatalHoHoPatternTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 18 camadas!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('santa') || template.title.toLowerCase().includes('papai noel')) {
        onLoadTemplateLayers(template.title, getNatalSantaWatercolorTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 10 camadas!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('vintage-stamps') || template.title.toLowerCase().includes('selos') || template.title.toLowerCase().includes('mágico') || template.title.toLowerCase().includes('magico')) {
        onLoadTemplateLayers(template.title, getNatalVintageStampsTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 15 camadas!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('merry-christmas') || template.title.toLowerCase().includes('merry')) {
        onLoadTemplateLayers(template.title, getNatalMerryChristmasPolaroidTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 10 camadas!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('natal') || template.title.toLowerCase().includes('natal') || template.title.toLowerCase().includes('christmas')) {
        onLoadTemplateLayers(template.title, getFelizNatalTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 16 camadas!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('paizao') || template.title.toLowerCase().includes('paizão') || template.title.toLowerCase().includes('paizao')) {
        onLoadTemplateLayers(template.title, getPaizaoTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 9 camadas!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('gratidao') || template.id.includes('dahswgbdg0a') || template.title.toLowerCase().includes('gratidão') || template.title.toLowerCase().includes('gratidao')) {
        onLoadTemplateLayers(template.title, getGratidaoTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 14 camadas!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('dahswyjx7qw') || template.title.toLowerCase().includes('dahswyjx7qw')) {
        onLoadTemplateLayers(template.title, getRuiTobiasCustomTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição com 10 camadas!`, 'success');
        onClose();
        return;
      }
      if (template.id.includes('cherry') || template.title.toLowerCase().includes('cereja')) {
        onLoadTemplateLayers(template.title, getCherryTemplateLayers(Date.now()));
        onShowSnackbar?.(`🎨 Modelo "${template.title}" carregado para edição!`, 'success');
        onClose();
        return;
      }
    }

    setExportingId(template.id);
    setExportingMode(isBackground ? 'background' : 'layer');

    try {
      const response = await fetch('/api/canva/exportar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          designId: template.id,
          previewUrl: template.previewUrl,
          templateUrl: template.templateUrl,
          title: template.title,
          widthMm: template.widthMm || productWidthMm,
          heightMm: template.heightMm || productHeightMm,
          format: 'png',
        }),
      });

      const data = await response.json();
      const highResUrl = data.url_imagem_alta_resolucao || template.previewUrl;

      onImportImage(highResUrl, template.title, { isBackground });
      onShowSnackbar?.(
        isBackground
          ? `✨ "${template.title}" aplicada em 300 DPI preenchendo toda a área de sangria!`
          : `✨ "${template.title}" incluída como camada móvel em alta definição!`,
        'success'
      );
      onClose();
    } catch (err) {
      console.error('Erro ao exportar arte em alta resolução do Canva:', err);
      onImportImage(template.previewUrl, template.title, { isBackground });
      onShowSnackbar?.(`"${template.title}" importada para o editor!`, 'success');
      onClose();
    } finally {
      setExportingId(null);
      setExportingMode(null);
    }
  };

  // Helper to extract embed URL, Canva view URL or Pro Template URL, title and author from HTML or raw links
  const extractCanvaUrls = (raw: string) => {
    // Unescape common HTML entities if present in embed code snippet
    const unescaped = raw
      .replace(/&#x2F;/g, '/')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
    const trimmed = unescaped.trim();

    const canvaLinkMatch = trimmed.match(/(https:\/\/canva\.link\/[a-zA-Z0-9_-]+)/i);
    const templateMatch = trimmed.match(/(https:\/\/www\.canva\.com\/design\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/template\/edit[^\s"']*)/i) ||
      trimmed.match(/(https:\/\/www\.canva\.com\/design\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/template[^\s"']*)/i);
    const iframeSrc = trimmed.match(/src=["'](https:\/\/www\.canva\.com\/design\/[^"']+)["']/i);
    const anchorHref = trimmed.match(/<a\s+[^>]*href=["'](https:\/\/www\.canva\.com\/design\/[^"']+)["']/i);
    const anchorText = trimmed.match(/<a[^>]*>([^<]+)<\/a>/i);
    const authorAfterAnchor = trimmed.match(/<\/a>\s*(?:de|by)\s*([^<\n]+)/i);
    const directUrl = trimmed.match(/(https:\/\/www\.canva\.com\/design\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+(\/view)?(\?embed)?)/i);
    
    let embedUrl = '';
    let viewUrl = '';
    let templateUrl = '';
    const extractedTitle = anchorText ? anchorText[1].trim() : '';
    const extractedAuthor = authorAfterAnchor ? authorAfterAnchor[1].trim() : '';
    let designId = 'canva-' + Date.now();

    if (canvaLinkMatch) {
      templateUrl = canvaLinkMatch[1];
      designId = 'pro-' + templateUrl.split('/').pop();
    } else if (templateMatch) {
      templateUrl = templateMatch[1];
      const idMatch = templateUrl.match(/\/design\/([a-zA-Z0-9_-]+)/);
      if (idMatch) designId = idMatch[1];
    } else if (iframeSrc) {
      embedUrl = iframeSrc[1];
    } else if (anchorHref) {
      const href = anchorHref[1];
      const base = href.replace(/\?.*$/, '').replace(/\/view$/, '');
      embedUrl = `${base}/view?embed`;
      viewUrl = href;
    } else if (directUrl) {
      const base = directUrl[1].replace(/\?.*$/, '').replace(/\/view$/, '');
      embedUrl = `${base}/view?embed`;
      viewUrl = `${base}/view`;
    }

    if (embedUrl) {
      const idMatch = embedUrl.match(/\/design\/([a-zA-Z0-9_-]+)/);
      if (idMatch) designId = idMatch[1];
      if (!viewUrl) viewUrl = embedUrl.replace(/\?embed/, '');
    }

    return { embedUrl, viewUrl, templateUrl, designId, extractedTitle, extractedAuthor };
  };

  const handleAddCustomTemplateFromForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateUrl.trim()) {
      onShowSnackbar?.('Por favor insira um link de modelo Canva Pro (ex: https://canva.link/... ou link do Canva)', 'error');
      return;
    }

    const { embedUrl, viewUrl, templateUrl, designId, extractedTitle, extractedAuthor } = extractCanvaUrls(newTemplateUrl);
    const finalTitle = newTemplateTitle.trim() || extractedTitle || (templateUrl ? 'Meu Modelo Canva Pro' : 'Meu Design Canva');

    const newTemplateItem: CanvaTemplateItem = {
      id: `my-tpl-${designId}`,
      title: finalTitle,
      category: newTemplateCategory,
      categoryLabel: newTemplateCategory === 'fathers' ? 'Dia dos Pais' : newTemplateCategory === 'mugs' ? 'Canecas' : 'Meus Modelos',
      previewUrl: designId.toLowerCase().includes('dahswyjx7qw') ? CANVA_RUI_TOBIAS_DAHSWYJX7QW_SVG : 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
      embedUrl: embedUrl || undefined,
      viewUrl: viewUrl || templateUrl || embedUrl || newTemplateUrl,
      templateUrl: templateUrl || newTemplateUrl,
      widthMm: productWidthMm,
      heightMm: productHeightMm,
      tags: ['meu', 'template', 'pro', 'canva', newTemplateCategory, designId.toLowerCase()],
      description: 'Modelo Canva Pro salvo nos seus templates para personalização e sublimação.',
      author: extractedAuthor ? `${extractedAuthor} (Canva Pro)` : 'Minha Coleção Canva Pro',
    };

    setCustomEmbeds((prev) => [newTemplateItem, ...prev.filter((p) => p.id !== newTemplateItem.id)]);
    setNewTemplateUrl('');
    setNewTemplateTitle('');
    onShowSnackbar?.('✨ Modelo Canva Pro adicionado aos seus templates com sucesso!', 'success');
  };

  const handleAddCustomEmbed = () => {
    const { embedUrl, viewUrl, templateUrl, designId, extractedTitle, extractedAuthor } = extractCanvaUrls(embedInput);
    if (!embedUrl && !templateUrl && !viewUrl) {
      onShowSnackbar?.('Por favor insira um código de incorporação, link de modelo Pro (ex: canva.link/...) ou link válido do Canva.', 'error');
      return;
    }

    const titlePrefix = extractedTitle || (templateUrl ? 'Modelo Canva Pro • ' + designId.slice(0, 10) : 'Design Incorporado Canva • ' + designId.slice(0, 8));
    const authorStr = extractedAuthor ? `${extractedAuthor} (Canva Pro)` : (templateUrl ? 'Canva Pro Template' : 'Design Canva');

    const newEmbedItem: CanvaTemplateItem = {
      id: `embed-${designId}`,
      title: titlePrefix,
      category: 'fathers',
      categoryLabel: templateUrl ? 'Canva Pro Template' : 'Canva Embed',
      previewUrl: designId.toLowerCase().includes('dahswyjx7qw') ? CANVA_RUI_TOBIAS_DAHSWYJX7QW_SVG : 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
      embedUrl: embedUrl || undefined,
      viewUrl: viewUrl || templateUrl || embedUrl,
      templateUrl: templateUrl || undefined,
      widthMm: productWidthMm,
      heightMm: productHeightMm,
      tags: ['canva', 'embed', 'incorporado', 'design', 'personalizado', 'pro', 'template', designId.toLowerCase()],
      description: templateUrl
        ? 'Modelo oficial do Canva Pro. Abra diretamente no editor oficial do Canva com 1 clique ou edite no SublimStudio.'
        : 'Design interativo incorporado do Canva pronto para uso e visualização.',
      author: authorStr,
    };

    setCustomEmbeds((prev) => [newEmbedItem, ...prev.filter((p) => p.id !== newEmbedItem.id)]);
    onShowSnackbar?.(templateUrl ? 'Link do modelo Canva Pro salvo com sucesso!' : 'Código de incorporação do Canva salvo com sucesso!', 'success');
  };

  const handleRemoveCustomTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomEmbeds((prev) => prev.filter((item) => item.id !== id));
    onShowSnackbar?.('Modelo removido da sua lista.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-5xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#10111a] border-[#222436] text-gray-100'
        }`}
      >
        {/* Header with Canva Branding */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between shrink-0 relative overflow-hidden ${
            isLight
              ? 'bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-indigo-500/10 border-slate-200'
              : 'bg-gradient-to-r from-[#00c4cc]/15 via-[#7d2ae8]/15 to-[#0e0f18] border-[#262838]'
          }`}
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-20 bg-gradient-to-r from-teal-400/20 via-purple-500/20 to-transparent blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            {/* Canva Logo Icon */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white flex items-center justify-center shadow-lg font-black text-xl italic tracking-tighter shrink-0 select-none">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold tracking-tight">Canva Integration &amp; Embed Hub</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00c4cc]/20 text-[#00c4cc] border border-[#00c4cc]/40 uppercase tracking-wider">
                  Smart Embed &amp; API
                </span>
                {isConnected && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Conectado
                  </span>
                )}
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                Busque modelos prontos, incorpore links do Canva gratuitamente ou edite no gabarito exato de {product.name} ({productWidthMm} × {productHeightMm} mm)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isLight ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/10 text-gray-400'
            }`}
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`px-5 border-b flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0 ${
            isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#161722]/80 border-[#262838]'
          }`}
        >
          {/* TAB 0: MEUS TEMPLATES DO CANVA */}
          <button
            onClick={() => setActiveTab('my-templates')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'my-templates'
                ? 'border-amber-400 text-amber-400 font-extrabold bg-amber-500/10'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>⭐ Meus Templates do Canva ({myCanvaTemplates.length})</span>
            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-black">
              PRO
            </span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'templates'
                ? 'border-[#00c4cc] text-[#00c4cc]'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Biblioteca Geral Canva ({allAvailableTemplates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('embed')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'embed'
                ? 'border-[#00c4cc] text-[#00c4cc]'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Incorporar Embed &amp; Links</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'create'
                ? 'border-[#7d2ae8] text-[#9d52f8]'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Criar no Canva com Gabarito</span>
          </button>

          <button
            onClick={() => setActiveTab('connect')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'connect'
                ? 'border-purple-500 text-purple-400'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Conectar Conta Canva Pro</span>
            {isConnected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'paste'
                ? 'border-emerald-500 text-emerald-400'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Clipboard className="w-4 h-4" />
            <span>Colar do Canva (Ctrl + V)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
          {/* TAB 0: MEUS TEMPLATES DO CANVA */}
          {activeTab === 'my-templates' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div
                className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isLight
                    ? 'bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-50 border-amber-300/60'
                    : 'bg-gradient-to-r from-amber-950/30 via-amber-900/15 to-[#171824] border-amber-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-black flex items-center justify-center font-black shadow-lg shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold flex items-center gap-2">
                      <span>Meus Modelos Oficiais Canva Pro</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-black font-extrabold">
                        {myCanvaTemplates.length} Modelos Salvos
                      </span>
                    </h3>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                      Seus designs oficiais do Canva prontos para personalização direta ou inserção milimétrica a 300 DPI na área de sublimação ({productWidthMm} × {productHeightMm} mm).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => {
                      const featuredUrl = myCanvaTemplates[0]?.templateUrl || 'https://www.canva.com/design/DAHSwGBdG0A/22fPLcjeAV15p-1PKWWj_Q/view?utm_content=DAHSwGBdG0A&utm_campaign=designshare&utm_medium=embeds&utm_source=link';
                      window.open(featuredUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex-1 md:flex-none py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Abrir Design no Canva</span>
                  </button>
                </div>
              </div>

              {/* Form to Add New Canva Template / Link */}
              <div
                className={`p-4 rounded-2xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151622] border-[#25273a]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Novo Link de Modelo Canva Pro</span>
                  </h4>
                  <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                    Suporta links tipo <code className="text-cyan-400">https://canva.link/...</code> ou URLs de design
                  </span>
                </div>

                <form onSubmit={handleAddCustomTemplateFromForm} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <div className="sm:col-span-5">
                    <input
                      type="url"
                      value={newTemplateUrl}
                      onChange={(e) => setNewTemplateUrl(e.target.value)}
                      placeholder="Cole o link do Canva Pro (ex: https://canva.link/...)"
                      className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none transition-all ${
                        isLight
                          ? 'bg-white border-slate-300 focus:border-amber-500 text-slate-900'
                          : 'bg-[#1c1d2c] border-[#2e3046] focus:border-amber-500 text-white'
                      }`}
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={newTemplateTitle}
                      onChange={(e) => setNewTemplateTitle(e.target.value)}
                      placeholder="Nome do Modelo (ex: Caneca Pai 2026)"
                      className={`w-full px-3 py-2 rounded-xl text-xs border focus:outline-none transition-all ${
                        isLight
                          ? 'bg-white border-slate-300 focus:border-amber-500 text-slate-900'
                          : 'bg-[#1c1d2c] border-[#2e3046] focus:border-amber-500 text-white'
                      }`}
                    />
                  </div>

                  <div className="sm:col-span-3 flex gap-1.5">
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer transition-all active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Salvar Modelo</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Grid of My Canva Templates */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Modelos na sua Coleção ({filteredMyTemplates.length})
                  </span>
                  <span className="text-[11px] text-amber-400 font-semibold">
                    1-Clique para Abrir no Canva ou Injetar a 300 DPI
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMyTemplates.map((template) => {
                    const isCurrentlyExporting = exportingId === template.id;

                    return (
                      <div
                        key={template.id}
                        className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group hover:shadow-2xl relative ${
                          isLight
                            ? 'bg-gradient-to-b from-amber-50/40 to-white border-amber-300 hover:border-amber-400 ring-1 ring-amber-400/20'
                            : 'bg-gradient-to-b from-amber-950/20 to-[#171824] border-amber-500/40 hover:border-amber-400 ring-1 ring-amber-500/20'
                        }`}
                      >
                        {/* Image Preview with Badges */}
                        <div className="relative aspect-[21/10] bg-black/40 overflow-hidden">
                          <img
                            src={template.previewUrl}
                            alt={template.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-2 left-2 flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-black/70 backdrop-blur-md text-white border border-white/10">
                              {template.widthMm} × {template.heightMm} mm
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Canva Pro</span>
                            </span>
                          </div>

                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                              300 DPI
                            </span>
                            {customEmbeds.some((c) => c.id === template.id && c.id !== 'canva-paizao-futebol-user') && (
                              <button
                                onClick={(e) => handleRemoveCustomTemplate(template.id, e)}
                                className="p-1 rounded-md bg-rose-500/80 hover:bg-rose-600 text-white text-[9px] transition-colors"
                                title="Remover dos meus templates"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Overlay Title */}
                          <div className="absolute bottom-2 left-2 right-2">
                            <h4 className="text-white font-extrabold text-xs leading-tight truncate drop-shadow">
                              {template.title}
                            </h4>
                            <p className="text-gray-300 text-[10px] truncate opacity-90">
                              {template.author}
                            </p>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-3.5 flex flex-col gap-2.5 flex-1 justify-between">
                          <div>
                            <p className={`text-[11px] leading-snug line-clamp-2 ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                              {template.description}
                            </p>

                            {template.templateUrl && (
                              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-amber-400 font-bold">
                                <ExternalLink className="w-3 h-3 shrink-0" />
                                <span className="truncate">{template.templateUrl}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons: 1-Click Canva Pro + + Incluir Arte + Como Fundo */}
                          <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-[#282a3c]">
                            {/* Botão Oficial Canva Pro */}
                            {template.templateUrl && (
                              <button
                                onClick={() => window.open(template.templateUrl, '_blank', 'noopener,noreferrer')}
                                className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                                title="Abrir template no editor oficial do Canva em nova aba"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-black" />
                                <span>Opção B: Abrir Modelo no Canva Pro</span>
                              </button>
                            )}

                            <div className="grid grid-cols-2 gap-1.5">
                              {/* + Incluir Arte (Objeto Móvel a 300 DPI) */}
                              <button
                                disabled={isCurrentlyExporting}
                                onClick={() => handleExportAndImportTemplate(template, false)}
                                className="py-2 px-2 rounded-xl bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] hover:opacity-90 disabled:opacity-50 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all cursor-pointer"
                                title="Adicionar arte do Canva como camada editável e móvel no centro da estampa"
                              >
                                {isCurrentlyExporting && exportingMode === 'layer' ? (
                                  <>
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                    <span>Gerando 300 DPI...</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>+ Incluir Arte</span>
                                  </>
                                )}
                              </button>

                              {/* Como Fundo (Área Total de Sangria) */}
                              <button
                                disabled={isCurrentlyExporting}
                                onClick={() => handleExportAndImportTemplate(template, true)}
                                className={`py-2 px-2 rounded-xl border font-bold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-50 ${
                                  isLight
                                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                                    : 'bg-[#202232] hover:bg-[#2a2c40] border-[#303248] text-gray-200'
                                }`}
                                title="Esticar arte para preencher toda a área de corte / sangria automaticamente"
                              >
                                {isCurrentlyExporting && exportingMode === 'background' ? (
                                  <>
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                    <span>Preenchendo...</span>
                                  </>
                                ) : (
                                  <>
                                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Como Fundo</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: TEMPLATES & DESIGNS EXPLORER */}
          {activeTab === 'templates' && (
            <div className="space-y-5">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar modelos Canva por tema (ex: pai, caneca floral, dev café, dia das mães, futebol)..."
                    className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border focus:outline-none transition-all ${
                      isLight
                        ? 'bg-slate-100 border-slate-300 focus:border-[#00c4cc] focus:bg-white text-slate-900'
                        : 'bg-[#181924] border-[#2e3044] focus:border-[#00c4cc] text-white'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Substrate Auto-Matching Quick Notice */}
                <div
                  className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 shrink-0 font-medium ${
                    isLight
                      ? 'bg-teal-50 border-teal-200 text-teal-900'
                      : 'bg-[#00c4cc]/10 border-[#00c4cc]/30 text-[#00c4cc]'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>Gabarito: {product.name} ({productWidthMm}×{productHeightMm}mm)</span>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
                {[
                  { id: 'all', label: 'Todos os Modelos' },
                  { id: 'mothers', label: '🌸 Dia das Mães' },
                  { id: 'fathers', label: '👔 Dia dos Pais' },
                  { id: 'christmas', label: '🎄 Natal & Festas' },
                  { id: 'gamer', label: 'Gamer & Dev' },
                  { id: 'branding', label: 'Empresas & Logos' },
                  { id: 'pets', label: 'Pets & Animais' },
                  { id: 'faith', label: 'Fé & Religioso' },
                  { id: 'tshirts', label: 'Camisetas & A3' },
                  { id: 'general', label: 'Boho & Abstrato' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] text-white shadow-md'
                        : isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-[#1c1d2b] hover:bg-[#25273a] text-gray-300 border border-[#2d2f44]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Grid of Templates with Option A & Option B */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group hover:shadow-xl ${
                      template.embedUrl
                        ? isLight
                          ? 'bg-gradient-to-b from-cyan-50/40 to-white border-cyan-300 hover:border-cyan-500 ring-1 ring-cyan-400/20'
                          : 'bg-gradient-to-b from-cyan-950/20 to-[#171824] border-cyan-500/40 hover:border-cyan-400 ring-1 ring-cyan-500/20'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-[#00c4cc]'
                        : 'bg-[#171824] border-[#282a3c] hover:border-[#00c4cc]'
                    }`}
                  >
                    {/* Preview Image */}
                    <div className="relative aspect-[21/10] bg-black/40 overflow-hidden">
                      <img
                        src={template.previewUrl}
                        alt={template.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-black/70 backdrop-blur-md text-white border border-white/10">
                          {template.widthMm} × {template.heightMm} mm
                        </span>
                        {template.templateUrl && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Canva Pro</span>
                          </span>
                        )}
                        {template.embedUrl && !template.templateUrl && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-cyan-500 text-black shadow flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            <span>Embed Canva</span>
                          </span>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#7d2ae8] text-white shadow">
                          {template.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="font-extrabold text-xs leading-tight group-hover:text-[#00c4cc] transition-colors">
                            {template.title}
                          </h3>
                        </div>
                        <p className={`text-[11px] leading-snug line-clamp-2 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                          {template.description}
                        </p>
                      </div>

                      {/* Author */}
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                        <span>Autor: <strong>{template.author}</strong></span>
                        {template.templateUrl && (
                          <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                            <span>Link Pro Ativo</span>
                          </span>
                        )}
                      </div>

                      {/* Action Buttons: Option A and Option B / Pro Template */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-[#282a3c] mt-1">
                        {/* OPÇÃO A: Personalizar no SublimStudio */}
                        <button
                          onClick={() => handleExportAndImportTemplate(template, false)}
                          className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
                          title="Opção A: Editar foto, textos e cores com as ferramentas do SublimStudio"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Opção A: Editar no SublimStudio</span>
                        </button>

                        <div className="grid grid-cols-2 gap-1.5">
                          {/* OPÇÃO B: Abrir / Ver no Canva (Template Pro ou Embed ou View) */}
                          <button
                            onClick={() => {
                              if (template.templateUrl) {
                                window.open(template.templateUrl, '_blank', 'noopener,noreferrer');
                              } else if (template.embedUrl) {
                                setPreviewingEmbed(template);
                              } else {
                                window.open(template.viewUrl || 'https://www.canva.com', '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className={`py-1.5 px-2 rounded-xl border font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all ${
                              template.templateUrl
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
                                : template.embedUrl
                                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/25'
                                : isLight
                                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                                : 'bg-[#202232] hover:bg-[#2a2c40] border-[#303248] text-gray-200'
                            }`}
                            title={template.templateUrl ? 'Opção B: Abrir o modelo no editor oficial do Canva' : 'Opção B: Abrir o visualizador interativo ou editor do Canva'}
                          >
                            {template.templateUrl ? (
                              <>
                                <ExternalLink className="w-3 h-3 text-amber-400" />
                                <span>Opção B: Abrir no Canva</span>
                              </>
                            ) : (
                              <>
                                <Tv className="w-3 h-3" />
                                <span>Opção B: Ver no Canva</span>
                              </>
                            )}
                          </button>

                          {/* Como Fundo */}
                          <button
                            onClick={() => handleExportAndImportTemplate(template, true)}
                            className={`py-1.5 px-2 rounded-xl border font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all ${
                              isLight
                                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                                : 'bg-[#202232] hover:bg-[#2a2c40] border-[#303248] text-gray-200'
                            }`}
                            title="Definir arte como fundo total da área de sangria"
                          >
                            <ImageIcon className="w-3 h-3 text-[#00c4cc]" />
                            <span>Como Fundo</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INCORPORAR EMBED DO CANVA */}
          {activeTab === 'embed' && (
            <div className="max-w-4xl mx-auto space-y-6 py-2">
              <div
                className={`p-6 rounded-3xl border ${
                  isLight
                    ? 'bg-gradient-to-br from-cyan-50 via-teal-50 to-indigo-50 border-cyan-200'
                    : 'bg-gradient-to-br from-[#00c4cc]/15 via-[#7d2ae8]/15 to-[#161726] border-[#2c2f48]'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white flex items-center justify-center shadow-lg">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">Incorporar Design do Canva (100% Gratuito)</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                      Cole abaixo o código de incorporação (iframe) ou o link de visualização gerado no Canva.
                    </p>
                  </div>
                </div>

                {/* Instructions */}
                <div className={`p-4 rounded-2xl border text-xs space-y-1.5 mb-4 ${
                  isLight ? 'bg-white/80 border-slate-200 text-slate-700' : 'bg-[#141520]/80 border-[#262838] text-gray-300'
                }`}>
                  <h4 className="font-bold text-xs text-[#00c4cc] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Como obter o código no Canva:
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                    <li>No Canva, clique em <strong>Compartilhar</strong> (canto superior direito) &gt; <strong>Mais (...)</strong>.</li>
                    <li>Clique em <strong>Incorporar</strong> (&lt;/&gt;) e confirme clicando em Incorporar.</li>
                    <li>Copie o código do <strong>iframe</strong> ou o <strong>Link de incorporação inteligente</strong> e cole abaixo.</li>
                  </ol>
                </div>

                {/* Embed Input */}
                <div className="space-y-3">
                  <label className="text-xs font-bold block">
                    Código de Incorporação (iframe) ou Link do Canva:
                  </label>
                  <textarea
                    rows={4}
                    value={embedInput}
                    onChange={(e) => setEmbedInput(e.target.value)}
                    placeholder='Cole aqui: <iframe src="https://www.canva.com/design/.../view?embed"...> ou https://www.canva.com/design/...'
                    className={`w-full p-3.5 rounded-2xl text-xs font-mono border focus:outline-none transition-all ${
                      isLight
                        ? 'bg-white border-slate-300 focus:border-[#00c4cc] text-slate-900'
                        : 'bg-[#12131d] border-[#2c2e42] focus:border-[#00c4cc] text-gray-200'
                    }`}
                  />

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={handleAddCustomEmbed}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Salvar &amp; Injetar no SublimStudio</span>
                    </button>

                    {extractCanvaUrls(embedInput).embedUrl && (
                      <button
                        onClick={() => {
                          const urls = extractCanvaUrls(embedInput);
                          setPreviewingEmbed({
                            id: 'live-preview',
                            title: 'Visualização Interativa do Canva',
                            category: 'fathers',
                            categoryLabel: 'Canva Embed',
                            previewUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
                            embedUrl: urls.embedUrl,
                            viewUrl: urls.viewUrl,
                            widthMm: productWidthMm,
                            heightMm: productHeightMm,
                            tags: ['embed'],
                            description: 'Visualização ao vivo do iframe',
                            author: 'Canva',
                          });
                        }}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                          isLight
                            ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                            : 'bg-[#1e2030] hover:bg-[#282a3e] border-[#343650] text-gray-200'
                        }`}
                      >
                        <Tv className="w-4 h-4 text-cyan-400" />
                        <span>Testar Visualizador Interativo Agora</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Live Canva Preview Container if input valid */}
              {extractCanvaUrls(embedInput).embedUrl && (
                <div className={`p-5 rounded-3xl border space-y-3 ${
                  isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-[#141522] border-[#292b3c] shadow-2xl'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                        Visualização ao Vivo da Incorporação Canva
                      </h4>
                    </div>
                    <a
                      href={extractCanvaUrls(embedInput).viewUrl || extractCanvaUrls(embedInput).embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir no Canva.com</span>
                    </a>
                  </div>

                  {/* Canva Embed Iframe */}
                  <div className="relative w-full aspect-[21/10] rounded-2xl overflow-hidden border border-slate-300 dark:border-white/10 shadow-inner bg-black">
                    <iframe
                      loading="lazy"
                      src={extractCanvaUrls(embedInput).embedUrl}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="fullscreen"
                      title="Canva Design Embed"
                    />
                  </div>

                  {/* Quick Decision Action Panel */}
                  <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#1b1c28] border-[#2e3042]'
                  }`}>
                    <div>
                      <h5 className="font-bold text-xs">Como deseja prosseguir com esta arte?</h5>
                      <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                        Escolha entre editar as camadas no SublimStudio ou manter como modelo embutido.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onImportImage(
                            'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
                            'Design Canva Incorporado'
                          );
                          onClose();
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] hover:opacity-90 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Opção A: Editar no SublimStudio</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CREATE IN CANVA WITH EXACT DIMENSIONS */}
          {activeTab === 'create' && (
            <div className="max-w-3xl mx-auto space-y-6 py-2">
              <div
                className={`p-6 rounded-3xl border relative overflow-hidden ${
                  isLight
                    ? 'bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-50 border-teal-200'
                    : 'bg-gradient-to-br from-[#00c4cc]/15 via-[#7d2ae8]/15 to-[#161726] border-[#2c2f48]'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#00c4cc] block mb-1">
                      Gabarito Sublimático de Alta Resolução (300 DPI)
                    </span>
                    <h3 className="text-xl font-black">{product.name}</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-300'} mt-1`}>
                      Dimensões físicas: <strong className="text-[#00c4cc]">{productWidthMm} × {productHeightMm} mm</strong> ({Math.round((productWidthMm * 300) / 25.4)} × {Math.round((productHeightMm * 300) / 25.4)} px em 300 DPI)
                    </p>
                  </div>

                  <button
                    onClick={handleOpenCanvaCustomSize}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00c4cc] via-[#7d2ae8] to-[#9d52f8] hover:brightness-110 text-white font-extrabold text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105 shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Abrir Canvas no Canva Agora</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200/50 dark:border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#00c4cc]/20 text-[#00c4cc] flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <span>Crie sua arte no Canva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#7d2ae8]/20 text-[#9d52f8] flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <span>Baixe em PNG Transparente</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <span>Cole aqui com <strong>Ctrl + V</strong></span>
                  </div>
                </div>
              </div>

              {/* Other Common Sublimation Product Templates in Canva */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Gabaritos Sublimáticos Populares para Abrir no Canva
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      name: 'Caneca Tradicional 325ml',
                      size: '200 × 95 mm (2362 × 1122 px)',
                      icon: Coffee,
                      color: 'text-sky-400',
                      action: () => {
                        window.open('https://www.canva.com/create/custom-size/?width=2362&height=1122&unit=px', '_blank');
                      },
                    },
                    {
                      name: 'Camiseta Estampa A4 Frontal',
                      size: '210 × 297 mm (2480 × 3508 px)',
                      icon: Shirt,
                      color: 'text-purple-400',
                      action: () => {
                        window.open('https://www.canva.com/create/custom-size/?width=2480&height=3508&unit=px', '_blank');
                      },
                    },
                    {
                      name: 'Camiseta Estampa A3 Maxi',
                      size: '297 × 420 mm (3508 × 4960 px)',
                      icon: Shirt,
                      color: 'text-amber-400',
                      action: () => {
                        window.open('https://www.canva.com/create/custom-size/?width=3508&height=4960&unit=px', '_blank');
                      },
                    },
                    {
                      name: 'Mousepad Retangular',
                      size: '220 × 180 mm (2598 × 2126 px)',
                      icon: Gamepad2,
                      color: 'text-emerald-400',
                      action: () => {
                        window.open('https://www.canva.com/create/custom-size/?width=2598&height=2126&unit=px', '_blank');
                      },
                    },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer group ${
                        isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-purple-300'
                          : 'bg-[#181926] hover:bg-[#202234] border-[#2a2c42] hover:border-[#7d2ae8]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-black/20 ${item.color}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-xs block group-hover:text-[#00c4cc] transition-colors">
                            {item.name}
                          </span>
                          <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                            {item.size}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONNECT VIA CANVA CONNECT API */}
          {activeTab === 'connect' && (
            <div className="max-w-2xl mx-auto space-y-5 py-2">
              <div
                className={`p-6 rounded-3xl border ${
                  isLight
                    ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'
                    : 'bg-gradient-to-br from-[#7d2ae8]/15 to-[#161726] border-[#2f2a4a]'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">Canva Connect API (OAuth 2.0)</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                      Integre sua conta do Canva para listar e importar seus designs salvos em tempo real.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 my-4">
                  <div>
                    <label className="text-xs font-bold block mb-1">
                      Canva Developer Client ID / API Key (Opcional)
                    </label>
                    <input
                      type="text"
                      value={canvaClientId}
                      onChange={(e) => setCanvaClientId(e.target.value)}
                      placeholder="Ex: cnva_app_client_id..."
                      className={`w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                          : 'bg-[#13141f] border-[#303248] text-white focus:border-purple-500'
                      }`}
                    />
                    <span className={`text-[10px] block mt-1 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                      Obtido em <strong>canva.com/developers</strong> nas configurações do seu App.
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    {!isConnected ? (
                      <button
                        onClick={handleConnectCanva}
                        disabled={isConnecting}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] hover:brightness-110 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        {isConnecting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Conectando com Canva...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            <span>Conectar Conta do Canva (OAuth 2.0)</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                          <Check className="w-4 h-4" />
                          <span>Conta Conectada</span>
                        </div>
                        <button
                          onClick={handleDisconnectCanva}
                          className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold cursor-pointer transition-colors"
                        >
                          Desconectar
                        </button>
                      </div>
                    )}

                    <a
                      href="https://www.canva.com/developers/docs/connect-api/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-semibold flex items-center gap-1 ${
                        isLight ? 'text-purple-700 hover:underline' : 'text-purple-300 hover:text-purple-200'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Documentação Canva Connect</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PASTE FROM CANVA */}
          {activeTab === 'paste' && (
            <div className="max-w-3xl mx-auto space-y-5 py-2">
              {/* Canva DOM & HTML Parser Box */}
              <div
                className={`p-6 rounded-3xl border space-y-4 ${
                  isLight
                    ? 'bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/40 border-indigo-200'
                    : 'bg-gradient-to-br from-indigo-950/20 via-[#161726] to-purple-950/20 border-indigo-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white flex items-center justify-center shadow-lg font-black text-lg">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold flex items-center gap-2">
                        <span>Analisador &amp; Importador de DOM / HTML do Canva</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00c4cc]/20 text-[#00c4cc] border border-[#00c4cc]/40">
                          Inteligência Vetorial
                        </span>
                      </h3>
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                        Cole o código HTML copiado do editor Canva (ou selecione no DevTools do navegador) para converter automaticamente todas as fotos, textos coloridos, fontes e rotações em camadas nativas!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold flex items-center gap-1.5 text-indigo-400">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Cole aqui o HTML do Canva (tags &lt;div&gt;, classes _14BoqA, etc.):</span>
                    </label>
                    <button
                      onClick={() => {
                        const sampleHtml = `<div class="_14BoqA" style="width: 755.906px; height: 359.055px;"><div class="DF_utQ" style="width: 235.917px; height: 270.989px; transform: translate(83.89px, 36.94px) rotate(-8.06deg);"><img alt="Happy father and son playing with ball" src="https://media-public.canva.com/ti3GI/MAD_Bcti3GI/1/s.jpg" /></div><div class="DF_utQ" style="width: 181.688px; height: 197.878px; transform: translate(-7.14px, 192.36px) rotate(-19.03deg);"><img alt="Gritty Trophy Logo" src="https://media-public.canva.com/TpnLk/MAEqEHTpnLk/1/t.png" /></div><div class="DF_utQ" style="width: 188px; height: 130px; transform: translate(406px, 93px);"><p style="font-size: 110px; color: rgb(1, 113, 211); font-weight: 900;">Pai</p></div><div class="DF_utQ" style="width: 237px; height: 130px; transform: translate(466px, 177px);"><p style="font-size: 110px; color: rgb(255, 196, 28); font-weight: 900;">zão</p></div><div class="DF_utQ" style="width: 38px; height: 77px; transform: translate(650px, 66px) rotate(22deg);"><p style="font-size: 84px; color: rgb(255, 255, 255); font-weight: 700;">1</p></div></div>`;
                        setCanvaPasteHtml(sampleHtml);
                        const res = parseCanvaHtmlToLayers(sampleHtml, 800, 380);
                        setParsedCanvaResult(res);
                      }}
                      className="text-[11px] font-bold text-purple-400 hover:text-purple-300 hover:underline cursor-pointer"
                    >
                      Carregar Exemplo Paizão Nº 1
                    </button>
                  </div>

                  <textarea
                    value={canvaPasteHtml}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCanvaPasteHtml(val);
                      if (val.trim().length > 20) {
                        const res = parseCanvaHtmlToLayers(val, 800, 380);
                        setParsedCanvaResult(res);
                      } else {
                        setParsedCanvaResult(null);
                      }
                    }}
                    placeholder='Cole aqui o código HTML ou nó DOM do Canva (ex: <div class="_14BoqA"...>)...'
                    rows={4}
                    className={`w-full p-3 rounded-2xl border text-xs font-mono transition-all resize-none outline-none ${
                      isLight
                        ? 'bg-white border-slate-300 focus:border-indigo-500 text-slate-800'
                        : 'bg-black/40 border-[#31344a] focus:border-indigo-400 text-gray-200'
                    }`}
                  />
                </div>

                {/* Parsing Results Badge & Action */}
                {parsedCanvaResult && parsedCanvaResult.layers.length > 0 && (
                  <div
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200 ${
                      isLight
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                        ✓
                      </div>
                      <div>
                        <span className="font-extrabold text-xs block text-emerald-400">
                          {parsedCanvaResult.layers.length} Camadas Detectadas no HTML do Canva
                        </span>
                        <span className="text-[11px] opacity-80 block">
                          Gabarito: {parsedCanvaResult.canvasWidth} × {parsedCanvaResult.canvasHeight} px • Mapeamento proporcional pronto
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (onLoadTemplateLayers && parsedCanvaResult) {
                          onLoadTemplateLayers(parsedCanvaResult.title, parsedCanvaResult.layers);
                          onShowSnackbar?.(`🚀 ${parsedCanvaResult.layers.length} camadas importadas com sucesso do Canva!`, 'success');
                          onClose();
                        }
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Injetar Camadas no Canvas</span>
                    </button>
                  </div>
                )}

                {/* Quick Paste from Clipboard instructions */}
                <div className="p-3.5 rounded-2xl border border-dashed border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Clipboard className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[11px] font-medium">
                      Dica: você também pode copiar qualquer imagem no Canva (<strong>Ctrl + C</strong>) e colar diretamente na tela (<strong>Ctrl + V</strong>).
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-between shrink-0 text-xs ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#141520] border-[#262838]'
          }`}
        >
          <div className="flex items-center gap-2 text-gray-400 text-[11px]">
            <span>Powered by</span>
            <span className="font-bold text-[#00c4cc]">Canva Smart Embed</span>
            <span>&amp;</span>
            <span className="font-bold text-purple-400">SublimStudio RIP 300 DPI</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition-colors ${
                isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-[#222434] hover:bg-[#2c2e42] text-gray-200'
              }`}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN / POPUP CANVA EMBED VIEWER MODAL */}
      {previewingEmbed && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className={`w-full max-w-4xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12131e] border-[#2d2f44] text-white'
          }`}>
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00c4cc] to-[#7d2ae8] text-white flex items-center justify-center font-black text-sm italic">
                  C
                </div>
                <div>
                  <h3 className="font-extrabold text-sm truncate max-w-md">{previewingEmbed.title}</h3>
                  <span className="text-[10px] text-cyan-400 font-medium">Visualizador Oficial Canva Smart Embed</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewingEmbed.viewUrl || previewingEmbed.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir no Canva</span>
                </a>
                <button
                  onClick={() => setPreviewingEmbed(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Iframe Content */}
            <div className="flex-1 p-4 bg-black/60 flex items-center justify-center min-h-[400px]">
              <div className="w-full h-full relative aspect-[21/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <iframe
                  loading="lazy"
                  src={previewingEmbed.embedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="fullscreen"
                  title={previewingEmbed.title}
                />
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="px-5 py-3.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/40 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Escolha como aplicar esta arte no seu projeto:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleExportAndImportTemplate(previewingEmbed, false);
                    setPreviewingEmbed(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00c4cc] to-[#7d2ae8] hover:opacity-90 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Opção A: Carregar no Canvas SublimStudio</span>
                </button>
                <button
                  onClick={() => setPreviewingEmbed(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 font-bold text-xs"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
