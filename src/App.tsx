import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Layer,
  ToolType,
  ShapeType,
  SublimationProduct,
  HistoryStep,
  WorkspaceViewMode,
  TextWarpStyle,
  WordArtConfig,
} from './types';
import { PRODUCTS_LIBRARY } from './data/products';
import { TopBar } from './components/TopBar';
import { LeftToolBar, SidebarTabType } from './components/LeftToolbar';
import { CanvasArea } from './components/CanvasArea';
import { ThreeDViewport } from './components/ThreeDViewport';
import { LayerPanel } from './components/LayerPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { RightPropertiesPanel } from './components/RightPropertiesPanel';
import { AIPanel } from './components/AIPanel';
import { ProductLibrary } from './components/ProductLibrary';
import { ExportModal } from './components/ExportModal';
import { AndroidAppModal } from './components/AndroidAppModal';
import { HelpModal } from './components/HelpModal';
import { AboutModal } from './components/AboutModal';
import { PrintSublimationModal } from './components/PrintSublimationModal';
import { PrinterSettingsModal } from './components/printer-settings';
import { AndroidMobileNav } from './components/AndroidMobileNav';
import { MD3Snackbar, SnackbarMessage } from './components/MD3Snackbar';
import { MD3BottomSheet } from './components/MD3BottomSheet';
import { AuthModal, UserSession } from './components/AuthModal';
import { WordArtModal } from './components/WordArtModal';
import { WordArtModal2 } from './components/WordArtModal2';
import { TestRunnerModal } from './components/TestRunnerModal';
import { AISettingsModal } from './components/AISettingsModal';
import { PasteClipboardModal } from './components/PasteClipboardModal';
import { Mug3In1SheetModal } from './components/Mug3In1SheetModal';
import { CanvaModal } from './components/CanvaModal';

import {
  Layers,
  History,
  Sliders,
  Sparkles,
  Box,
  ChevronRight,
  ChevronLeft,
  X,
  FolderPlus,
  FileText,
  Save,
  Download,
  Eye,
  Settings as SettingsIcon,
  Check,
} from 'lucide-react';

export default function App() {
  // 1. Current Sublimation Product & Project Info
  const [currentProduct, setCurrentProduct] = useState<SublimationProduct>(PRODUCTS_LIBRARY[0]);
  const [projectName, setProjectName] = useState<string>('Arte Sublimação - Caneca 325ml');

  // Workspace View Mode: 'split' | 'canvas' | 'mockup'
  const [workspaceViewMode, setWorkspaceViewMode] = useState<WorkspaceViewMode>('split');
  const [show3DPip, setShow3DPip] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // 2. Layers State Initialization
  const [layers, setLayers] = useState<Layer[]>([]);

  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);

  // 3. Tool & Properties State
  const [activeTool, setActiveTool] = useState<ToolType>('select');
  const [selectedShape, setSelectedShape] = useState<ShapeType>('rectangle');
  const [activeColor, setActiveColor] = useState<string>('#38bdf8');
  const [brushSize, setBrushSize] = useState<number>(12);

  // 4. Studio Settings
  const [mirrorSublimation, setMirrorSublimation] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  // 5. Sidebar Tab states (Default collapsed on mobile)
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTabType | null>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return null;
    }
    return 'templates';
  });
  const [activeRightTab, setActiveRightTab] = useState<'3d' | 'properties' | 'layers' | 'history' | 'ai'>('3d');
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // 6. Modals Open State
  const [isProductLibraryOpen, setIsProductLibraryOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isPrinterSettingsOpen, setIsPrinterSettingsOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isAndroidSimulated, setIsAndroidSimulated] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWordArtModalOpen, setIsWordArtModalOpen] = useState(false);
  const [isWordArtModal2Open, setIsWordArtModal2Open] = useState(false);
  const [editingWordArtLayerId, setEditingWordArtLayerId] = useState<string | null>(null);
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false);
  const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [isCanvaModalOpen, setIsCanvaModalOpen] = useState(false);
  const [isMug3In1Open, setIsMug3In1Open] = useState(false);
  const [previewImageModal, setPreviewImageModal] = useState<{
    url: string;
    title: string;
    width: number;
    height: number;
  } | null>(null);
  const [printModalInitialTab, setPrintModalInitialTab] = useState<'rip' | 'mug3in1' | 'press' | 'icc' | 'status' | 'support'>('rip');
  const [printModalInitialA4DataUrl, setPrintModalInitialA4DataUrl] = useState<string | undefined>(undefined);

  const handleAddWordArtImageToCanvas = (
    dataUrl: string,
    title?: string,
    config?: WordArtConfig,
    wordArtType?: 'wordart1' | 'wordart2'
  ) => {
    const processImageAndAddToCanvas = (imgW: number, imgH: number) => {
      const naturalW = Math.max(10, imgW || 600);
      const naturalH = Math.max(10, imgH || 300);
      const aspect = naturalW / naturalH;

      if (editingWordArtLayerId) {
        setLayers((prevLayers) => {
          const updatedLayers = prevLayers.map((layer) => {
            if (layer.id === editingWordArtLayerId) {
              const currentW = Math.max(160, Math.min(800, layer.width));
              const calcH = Math.max(30, Math.round(currentW / aspect));
              return {
                ...layer,
                content: dataUrl,
                name: title || layer.name,
                width: currentW,
                height: calcH,
                wordArtConfig: config || layer.wordArtConfig,
                wordArtType: wordArtType || layer.wordArtType || 'wordart1',
              };
            }
            return layer;
          });
          pushHistoryStep(`Atualizado ${title || 'WordArt'}`, 'WordArt', updatedLayers);
          return updatedLayers;
        });
        setActiveLayerId(editingWordArtLayerId);
        setCanvasVersion((v) => v + 1);
        showSnackbar('Arte WordArt atualizada com sucesso!', 'success');
        setEditingWordArtLayerId(null);
        return;
      }

      // Calculate initial layer dimensions on canvas matching typed text aspect ratio
      let defaultW = 520;
      if (aspect > 3.5) {
        defaultW = 620;
      } else if (aspect < 0.8) {
        defaultW = 320;
      }
      let defaultH = Math.round(defaultW / aspect);
      if (defaultH > 520) {
        defaultH = 520;
        defaultW = Math.round(defaultH * aspect);
      }

      const calcX = Math.max(20, Math.round((750 - defaultW) / 2));
      const calcY = Math.max(20, Math.round((450 - defaultH) / 2));

      const newLayer: Layer = {
        id: 'layer-wordart-' + Date.now(),
        name: title || 'WordArt Tipográfico',
        type: 'image',
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: calcX,
        y: calcY,
        width: Math.max(100, defaultW),
        height: Math.max(30, defaultH),
        rotation: 0,
        content: dataUrl,
        wordArtConfig: config,
        wordArtType: wordArtType || 'wordart1',
        filters: { brightness: 0, contrast: 0, saturation: 0, hue: 0, blur: 0, vibrance: 0 },
      };

      setLayers((prevLayers) => {
        const updated = [...prevLayers, newLayer];
        pushHistoryStep(`Adicionado ${newLayer.name}`, 'WordArt', updated);
        return updated;
      });
      setActiveLayerId(newLayer.id);
      setCanvasVersion((v) => v + 1);
      showSnackbar('WordArt adicionado com sucesso à estampa!', 'success');
    };

    if (dataUrl) {
      const img = new Image();
      img.onload = () => {
        processImageAndAddToCanvas(img.naturalWidth, img.naturalHeight);
      };
      img.onerror = () => {
        processImageAndAddToCanvas(600, 300);
      };
      img.src = dataUrl;
    }
  };

  const handleOpenWordArtStudio = (layerId?: string, type: 'wordart1' | 'wordart2' = 'wordart1') => {
    if (layerId) {
      const targetLayer = layers.find((l) => l.id === layerId);
      setEditingWordArtLayerId(layerId);
      const targetType = type || targetLayer?.wordArtType || 'wordart1';
      if (targetType === 'wordart2') {
        setIsWordArtModal2Open(true);
      } else {
        setIsWordArtModalOpen(true);
      }
    } else {
      setEditingWordArtLayerId(null);
      if (type === 'wordart2') {
        setIsWordArtModal2Open(true);
      } else {
        setIsWordArtModalOpen(true);
      }
    }
  };
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('sublimstudio_user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: 'Usuário',
      email: 'usuario@meudominio.com',
      isPro: true,
    };
  });

  const handleLogin = (user: UserSession) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('sublimstudio_user_session', JSON.stringify(user));
    } catch (e) {}
    showSnackbar(`Bem-vindo, ${user.name}! Login efetuado com sucesso.`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('sublimstudio_user_session');
    } catch (e) {}
    showSnackbar('Sua sessão foi encerrada com sucesso.', 'info');
  };
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // MD3 Snackbar & Mobile Bottom Sheet state
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);
  const [mobileBottomSheetTab, setMobileBottomSheetTab] = useState<'layers' | 'properties' | 'ai' | null>(null);

  // Auto-collapse all sidebars on mobile or simulated android screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsRightSidebarCollapsed(true);
        setActiveSidebarTab(null);
      }
    };
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || isAndroidSimulated)) {
      setIsRightSidebarCollapsed(true);
      setActiveSidebarTab(null);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAndroidSimulated]);

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setSnackbar({ id: 'sb-' + Date.now(), message, type });
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch (e) {
        // ignore
      }
    }
  };

  // Android Camera Input Ref
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerCamera = () => {
    cameraInputRef.current?.click();
  };

  // Handlers for App Menu
  const handleConfirmNewProject = (type: 'blank' | 'sample' | 'restore') => {
    if (type === 'restore') {
      try {
        const savedRaw = localStorage.getItem('sublimstudio_saved_project');
        if (savedRaw) {
          const data = JSON.parse(savedRaw);
          if (data && Array.isArray(data.layers)) {
            setLayers(data.layers);
            if (data.projectName) setProjectName(data.projectName);
            if (data.product) {
              const foundProduct = PRODUCTS_LIBRARY.find((p) => p.id === data.product.id) || data.product;
              setCurrentProduct(foundProduct);
            }
            if (typeof data.mirrorSublimation === 'boolean') setMirrorSublimation(data.mirrorSublimation);
            if (typeof data.showGrid === 'boolean') setShowGrid(data.showGrid);
            if (typeof data.showRulers === 'boolean') setShowRulers(data.showRulers);
            setActiveLayerId(data.layers.length > 0 ? data.layers[data.layers.length - 1].id : null);

            const initStep: HistoryStep = {
              id: 'hist-restore-' + Date.now(),
              description: 'Restaurado do Backup Salvo',
              toolName: 'Restaurar Projeto',
              timestamp: new Date(),
              layers: data.layers,
            };
            setHistorySteps([initStep]);
            setCurrentHistoryIndex(0);
            setCanvasVersion((v) => v + 1);
            setIsNewProjectModalOpen(false);
            showSnackbar('Rascunho do projeto restaurado com sucesso!', 'success');
            return;
          }
        }
      } catch (e) {
        console.error('Erro ao restaurar rascunho:', e);
      }
    }

    let newLayers: Layer[] = [];

    if (type === 'sample') {
      newLayers = [
        {
          id: 'layer-bg-' + Date.now(),
          name: 'Fundo Neutro',
          type: 'shape',
          shapeType: 'rectangle',
          visible: true,
          locked: false,
          opacity: 100,
          blendMode: 'normal',
          x: 0,
          y: 0,
          width: currentProduct.printWidthMm ? currentProduct.printWidthMm * 5 : 1000,
          height: currentProduct.printHeightMm ? currentProduct.printHeightMm * 5 : 500,
          rotation: 0,
          content: '',
          color: '#f8fafc',
        },
        {
          id: 'layer-text-' + Date.now(),
          name: 'Texto do Projeto',
          type: 'text',
          visible: true,
          locked: false,
          opacity: 100,
          blendMode: 'normal',
          x: 200,
          y: 150,
          width: 500,
          height: 100,
          rotation: 0,
          content: 'MEU NOVO PROJETO',
          color: activeColor || '#38bdf8',
          fontSize: 44,
          fontFamily: 'Impact',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      ];
    }

    setLayers(newLayers);
    setActiveLayerId(newLayers.length > 0 ? newLayers[newLayers.length - 1].id : null);
    const newName = 'Novo Projeto - ' + currentProduct.name;
    setProjectName(newName);

    const initStep: HistoryStep = {
      id: 'hist-new-' + Date.now(),
      description: 'Criado ' + (type === 'blank' ? 'Projeto Limpo' : 'Projeto com Modelo'),
      toolName: 'Novo Projeto',
      timestamp: new Date(),
      layers: newLayers,
    };
    setHistorySteps([initStep]);
    setCurrentHistoryIndex(0);
    setCanvasVersion((v) => v + 1);
    setIsNewProjectModalOpen(false);
    showSnackbar(`Novo projeto "${newName}" iniciado!`, 'success');
  };

  // File input refs for Abrir Projeto e Incluir Estampa
  const projectInputRef = useRef<HTMLInputElement>(null);
  const stampInputRef = useRef<HTMLInputElement>(null);

  const handleOpenProjectClick = () => {
    if (projectInputRef.current) {
      projectInputRef.current.value = '';
      projectInputRef.current.click();
    }
  };

  const handleIncludeStampClick = () => {
    setActiveSidebarTab('uploads');
    if (stampInputRef.current) {
      stampInputRef.current.value = '';
      stampInputRef.current.click();
    }
  };

  const handleViewImage = () => {
    // 1. If an image layer is active and has content
    const activeLayer = layers.find((l) => l.id === activeLayerId);
    if (activeLayer && activeLayer.type === 'image' && activeLayer.content) {
      setPreviewImageModal({
        url: activeLayer.content,
        title: activeLayer.name || 'Estampa Selecionada',
        width: activeLayer.width || 800,
        height: activeLayer.height || 600,
      });
      return;
    }

    // 2. Try to get current canvas render (either state or DOM)
    const currentCanvas = renderedCanvas || (document.getElementById('sublimation-main-canvas') as HTMLCanvasElement | null);
    if (currentCanvas && currentCanvas.width > 0 && currentCanvas.height > 0) {
      try {
        const dataUrl = currentCanvas.toDataURL('image/png');
        setPreviewImageModal({
          url: dataUrl,
          title: projectName || `${currentProduct.name} - Arte HD`,
          width: currentCanvas.width,
          height: currentCanvas.height,
        });
        return;
      } catch (e) {
        console.error('Error generating preview from canvas:', e);
      }
    }

    // 3. Find any image layer in project
    const firstImageLayer = [...layers].reverse().find((l) => l.type === 'image' && l.content);
    if (firstImageLayer && firstImageLayer.content) {
      setPreviewImageModal({
        url: firstImageLayer.content,
        title: firstImageLayer.name || 'Estampa do Projeto',
        width: firstImageLayer.width || 800,
        height: firstImageLayer.height || 600,
      });
      return;
    }

    // 4. If no content at all, notify user and open file selector
    showSnackbar('Nenhuma imagem na tela. Selecione uma imagem para incluir e visualizar!', 'info');
    handleIncludeStampClick();
  };

  const handleIncludeStampFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      if (resultUrl) {
        const stampName = file.name.replace(/\.[^/.]+$/, '');
        const newId = 'layer-stamp-' + Date.now();

        const img = new Image();
        img.onload = () => {
          const naturalW = img.naturalWidth || 500;
          const naturalH = img.naturalHeight || 380;
          const aspect = naturalW / naturalH;

          const maxW = 600;
          const maxH = 450;
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

          const calcX = Math.max(20, Math.round((750 - calcW) / 2));
          const calcY = Math.max(20, Math.round((450 - calcH) / 2));

          const newLayer: Layer = {
            id: newId,
            name: 'Estampa: ' + stampName,
            type: 'image',
            visible: true,
            locked: false,
            opacity: 100,
            blendMode: 'normal',
            x: calcX,
            y: calcY,
            width: Math.max(20, calcW),
            height: Math.max(20, calcH),
            rotation: 0,
            content: resultUrl,
          };

          const updatedLayers = [...layers, newLayer];
          setLayers(updatedLayers);
          setActiveLayerId(newId);
          pushHistoryStep('Incluiu Estampa: ' + stampName, 'Incluir Estampa', updatedLayers);
          setCanvasVersion((v) => v + 1);
          showSnackbar(`Estampa "${stampName}" adicionada com proporção original! (${calcW}x${calcH}px)`, 'success');
        };
        img.src = resultUrl;
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Helper to process and add pasted images with full PNG transparency (Ctrl+V)
  const processAndAddPastedBlob = (fileOrBlob: Blob | File, nameHint?: string) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const img = new Image();
      img.onload = () => {
        const naturalW = img.naturalWidth || 500;
        const naturalH = img.naturalHeight || 500;
        const aspect = naturalW / naturalH;

        let calcW = 520;
        let calcH = Math.round(calcW / aspect);
        if (calcH > 380) {
          calcH = 380;
          calcW = Math.round(calcH * aspect);
        }

        const calcX = Math.max(20, Math.round((750 - calcW) / 2));
        const calcY = Math.max(20, Math.round((450 - calcH) / 2));

        const newId = 'layer-pasted-' + Date.now();
        const stampName = nameHint || `Imagem Colada (${naturalW}x${naturalH}px)`;

        const newLayer: Layer = {
          id: newId,
          name: stampName,
          type: 'image',
          visible: true,
          locked: false,
          opacity: 100,
          blendMode: 'normal',
          x: calcX,
          y: calcY,
          width: Math.max(40, calcW),
          height: Math.max(40, calcH),
          rotation: 0,
          content: dataUrl, // PNG Data URL preserves full alpha transparency
          filters: { brightness: 0, contrast: 0, saturation: 0, hue: 0, blur: 0, vibrance: 0 },
        };

        setLayers((prevLayers) => {
          const updated = [...prevLayers, newLayer];
          pushHistoryStep(`Colou ${stampName} (Área de Transparência)`, 'Colar Transparência (Ctrl+V)', updated);
          return updated;
        });
        setActiveLayerId(newId);
        setCanvasVersion((v) => v + 1);
        showSnackbar(`✨ Imagem colada com canal de transparência PNG! (${naturalW}x${naturalH}px)`, 'success');
      };
      img.onerror = () => {
        showSnackbar('Erro ao carregar a imagem colada.', 'error');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(fileOrBlob);
  };

  const handlePasteFromClipboard = async () => {
    if (navigator.clipboard && navigator.clipboard.read) {
      try {
        const items = await navigator.clipboard.read();
        let found = false;
        for (const item of items) {
          const imageType = item.types.find((t) => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            processAndAddPastedBlob(blob, 'Estampa Colada da Área de Transparência');
            found = true;
            break;
          }
        }
        if (!found) {
          setIsPasteModalOpen(true);
        }
      } catch (err) {
        // Permissions policy restriction or user denied -> open Paste Modal where Ctrl+V or upload works 100%
        setIsPasteModalOpen(true);
      }
    } else {
      setIsPasteModalOpen(true);
    }
  };

  const handleOpenProjectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filename = file.name.toLowerCase();

    // If file is an image, import as stamp/image layer directly
    if (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.webp') || filename.endsWith('.svg') || file.type.startsWith('image/')) {
      handleIncludeStampFile(e);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        if (data && (Array.isArray(data.layers) || Array.isArray(data))) {
          const loadedLayers: Layer[] = Array.isArray(data.layers) ? data.layers : data;
          setLayers(loadedLayers);

          const loadedName = data.projectName || file.name.replace(/\.[^/.]+$/, '');
          setProjectName(loadedName);

          if (data.product) {
            const foundProduct = PRODUCTS_LIBRARY.find((p) => p.id === data.product.id) || data.product;
            setCurrentProduct(foundProduct);
          }

          if (typeof data.mirrorSublimation === 'boolean') {
            setMirrorSublimation(data.mirrorSublimation);
          }
          if (typeof data.showGrid === 'boolean') {
            setShowGrid(data.showGrid);
          }
          if (typeof data.showRulers === 'boolean') {
            setShowRulers(data.showRulers);
          }

          setActiveLayerId(loadedLayers.length > 0 ? loadedLayers[loadedLayers.length - 1].id : null);

          // Reset history stack cleanly for the newly opened project
          const initStep: HistoryStep = {
            id: 'hist-open-' + Date.now(),
            description: 'Abriu Projeto: ' + loadedName,
            toolName: 'Abrir Projeto',
            timestamp: new Date(),
            layers: loadedLayers,
          };
          setHistorySteps([initStep]);
          setCurrentHistoryIndex(0);
          setCanvasVersion((v) => v + 1);

          // Local auto-save backup
          try {
            localStorage.setItem('sublimstudio_saved_project', JSON.stringify(data));
          } catch (err) {
            // ignore
          }

          showSnackbar(`Projeto "${loadedName}" aberto com sucesso!`, 'success');
        } else {
          showSnackbar('Formato de arquivo inválido. Selecione um arquivo .sublimation ou .json válido.', 'error');
        }
      } catch (err) {
        console.error('Erro ao abrir arquivo de projeto:', err);
        showSnackbar('Não foi possível ler o projeto. Verifique o arquivo selecionado.', 'error');
      }
    };

    reader.onerror = () => {
      showSnackbar('Erro ao ler arquivo do dispositivo.', 'error');
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSaveLayout = () => {
    try {
      const projectData = {
        version: '1.0',
        projectName: projectName || 'Arte_Sublimacao',
        product: currentProduct,
        layers,
        mirrorSublimation,
        showGrid,
        showRulers,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const jsonString = JSON.stringify(projectData, null, 2);

      // Save to localStorage as quick auto-save draft
      try {
        localStorage.setItem('sublimstudio_saved_project', jsonString);
      } catch (e) {
        // quota exceeded
      }

      // Download .sublimation file using Blob and ObjectURL
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = url;
      const cleanFileName = (projectName || 'arte_sublimacao')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9_-]/gi, '_');
      downloadAnchor.download = `${cleanFileName}.sublimation`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 2000);

      showSnackbar(`Projeto "${projectName}" salvo com sucesso! (.sublimation)`, 'success');
    } catch (err) {
      console.error('Erro ao salvar projeto:', err);
      showSnackbar('Erro ao gerar arquivo de salvamento do projeto.', 'error');
    }
  };

  // 7. Canvas element ref for 3D mapping & export
  const [renderedCanvas, setRenderedCanvas] = useState<HTMLCanvasElement | null>(null);
  const [canvasVersion, setCanvasVersion] = useState<number>(0);

  // 8. Undo/Redo History Stack
  const [historySteps, setHistorySteps] = useState<HistoryStep[]>([
    {
      id: 'hist-init',
      description: 'Criado Projeto ' + PRODUCTS_LIBRARY[0].name,
      toolName: 'Novo Projeto',
      timestamp: new Date(),
      layers: [],
    },
  ]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  const historyStepsRef = useRef(historySteps);
  useEffect(() => {
    historyStepsRef.current = historySteps;
  }, [historySteps]);

  const currentHistoryIndexRef = useRef(currentHistoryIndex);
  useEffect(() => {
    currentHistoryIndexRef.current = currentHistoryIndex;
  }, [currentHistoryIndex]);

  // Helper to record history step
  const pushHistoryStep = useCallback((description: string, toolName: string, updatedLayers: Layer[]) => {
    const clonedLayers: Layer[] = JSON.parse(JSON.stringify(updatedLayers));
    const newStep: HistoryStep = {
      id: 'hist-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      description,
      toolName,
      timestamp: new Date(),
      layers: clonedLayers,
    };

    const newHistory = [...historyStepsRef.current.slice(0, currentHistoryIndexRef.current + 1), newStep];
    historyStepsRef.current = newHistory;
    currentHistoryIndexRef.current = newHistory.length - 1;
    setHistorySteps(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  }, []);

  const handleUndo = useCallback(() => {
    const history = historyStepsRef.current;
    const currentIdx = currentHistoryIndexRef.current;
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1;
      currentHistoryIndexRef.current = prevIdx;
      setCurrentHistoryIndex(prevIdx);
      setLayers(JSON.parse(JSON.stringify(history[prevIdx].layers)));
      setCanvasVersion((v) => v + 1);
    }
  }, []);

  const handleRedo = useCallback(() => {
    const history = historyStepsRef.current;
    const currentIdx = currentHistoryIndexRef.current;
    if (currentIdx < history.length - 1) {
      const nextIdx = currentIdx + 1;
      currentHistoryIndexRef.current = nextIdx;
      setCurrentHistoryIndex(nextIdx);
      setLayers(JSON.parse(JSON.stringify(history[nextIdx].layers)));
      setCanvasVersion((v) => v + 1);
    }
  }, []);

  const jumpToHistoryStep = useCallback((index: number) => {
    const history = historyStepsRef.current;
    if (index >= 0 && index < history.length) {
      setCurrentHistoryIndex(index);
      setLayers(JSON.parse(JSON.stringify(history[index].layers)));
      setCanvasVersion((v) => v + 1);
    }
  }, []);

  // Layer Mutations
  const handleUpdateLayer = (updatedLayer: Layer) => {
    setLayers((prevLayers) => prevLayers.map((l) => (l.id === updatedLayer.id ? updatedLayer : l)));
    setCanvasVersion((v) => v + 1);
  };

  const handleAddLayer = (
    type: 'text' | 'shape' | 'image',
    customShape?: ShapeType,
    defaultTextWarpStyle?: TextWarpStyle,
    customFontFamily?: string
  ) => {
    const shapeToUse = customShape || selectedShape;
    const newId = 'layer-' + Date.now();
    const isSpaciousStyle =
      defaultTextWarpStyle &&
      [
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
      ].includes(defaultTextWarpStyle);

    const isLineType =
      shapeToUse?.includes('line') ||
      shapeToUse?.includes('curve') ||
      shapeToUse?.includes('scribble') ||
      shapeToUse?.includes('connector') ||
      shapeToUse?.includes('elbow');

    const newLayer: Layer = {
      id: newId,
      name:
        type === 'text'
          ? defaultTextWarpStyle
            ? `Texto (${defaultTextWarpStyle})`
            : 'Novo Texto'
          : type === 'shape'
          ? `Forma ${shapeToUse}`
          : 'Nova Imagem',
      type: type,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 320,
      y: 180,
      width: type === 'text' ? (isSpaciousStyle ? 320 : 380) : 200,
      height: type === 'text' ? (isSpaciousStyle ? 260 : 120) : 200,
      rotation: 0,
      content: type === 'text' ? 'SUBLIMAÇÃO' : '',
      color: activeColor || '#38bdf8',
      strokeColor: activeColor || '#38bdf8',
      strokeWidth: type === 'shape' ? (isLineType ? 6 : 2) : 0,
      shapeType: shapeToUse,
      fontSize: 36,
      fontFamily: customFontFamily || 'Impact',
      fontWeight: 'bold',
      textWarpStyle: defaultTextWarpStyle || 'straight',
      textCurved: defaultTextWarpStyle ? defaultTextWarpStyle !== 'straight' : false,
      warpIntensity: 50,
      curveRadius: 120,
    };

    const updatedLayers = [...layers, newLayer];
    setLayers(updatedLayers);
    setActiveLayerId(newId);
    pushHistoryStep(`Adicionou ${newLayer.name}`, type, updatedLayers);
    setCanvasVersion((v) => v + 1);
  };

  const handleAddVectorTextPreset = (preset: {
    title: string;
    content: string;
    fontFamily: string;
    warpStyle: TextWarpStyle;
    warpIntensity: number;
    color: string;
    strokeColor?: string;
    strokeWidth?: number;
    shadowColor?: string;
    shadowBlur?: number;
    width?: number;
    height?: number;
    fontSize?: number;
  }) => {
    const newId = 'layer-' + Date.now();
    const newLayer: Layer = {
      id: newId,
      name: `Vetor: ${preset.title}`,
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 300,
      y: 180,
      width: preset.width || 360,
      height: preset.height || 220,
      rotation: 0,
      content: preset.content,
      color: preset.color,
      strokeColor: preset.strokeColor,
      strokeWidth: preset.strokeWidth || 0,
      shadowColor: preset.shadowColor,
      shadowBlur: preset.shadowBlur || 0,
      fontSize: preset.fontSize || 38,
      fontFamily: preset.fontFamily,
      fontWeight: 'bold',
      textWarpStyle: preset.warpStyle,
      textCurved: preset.warpStyle !== 'straight',
      warpIntensity: preset.warpIntensity,
      curveRadius: 120,
    };

    const updatedLayers = [...layers, newLayer];
    setLayers(updatedLayers);
    setActiveLayerId(newId);
    pushHistoryStep(`Adicionou Vetor ${preset.title}`, 'text', updatedLayers);
    setCanvasVersion((v) => v + 1);
  };

  const handleSelectTool = (tool: ToolType) => {
    setActiveTool(tool);

    // If user clicked AI tools on lateral sidebar
    if (['vectorize', 'remove_bg', 'upscale', 'generative_fill', 'object_replace'].includes(tool)) {
      setActiveRightTab('ai');
      setIsRightSidebarCollapsed(false);
      if (activeLayerId && ['remove_bg', 'vectorize', 'upscale'].includes(tool)) {
        handleApplyAIToolToActiveLayer(tool as any);
      }
      return;
    }

    // If user clicked Text tool on lateral sidebar
    if (tool === 'text') {
      handleAddLayer('text');
      return;
    }

    // If user clicked Shapes tool on lateral sidebar
    if (tool === 'shapes') {
      handleAddLayer('shape', selectedShape);
      return;
    }

    // Stamp duplicates active layer
    if (tool === 'stamp') {
      if (activeLayerId) {
        handleDuplicateLayer(activeLayerId);
      }
      return;
    }

    // Crop toggles grid & rulers
    if (tool === 'crop') {
      setShowGrid((prev) => !prev);
      setShowRulers((prev) => !prev);
      return;
    }

    // Masks toggles text curvature or mask
    if (tool === 'masks') {
      if (activeLayerId) {
        const activeL = layers.find((l) => l.id === activeLayerId);
        if (activeL && activeL.type === 'text') {
          handleUpdateLayer({
            ...activeL,
            isCurved: !activeL.isCurved,
            curveRadius: activeL.curveRadius || 120,
          });
        }
      }
      return;
    }

    // Smart object adds a branded badge
    if (tool === 'smart_object') {
      handleAddLayer('shape', 'badge');
      return;
    }
  };

  const handleChangeColor = (newColor: string) => {
    setActiveColor(newColor);
    if (activeLayerId) {
      const activeL = layers.find((l) => l.id === activeLayerId);
      if (activeL) {
        handleUpdateLayer({
          ...activeL,
          color: newColor,
          strokeColor: activeL.type === 'shape' ? (activeL.strokeColor || newColor) : activeL.strokeColor,
        });
      }
    }
  };

  const handleSelectShape = (shape: ShapeType) => {
    setSelectedShape(shape);
    const activeL = layers.find((l) => l.id === activeLayerId);
    if (activeL && activeL.type === 'shape') {
      const isLineType =
        shape?.includes('line') ||
        shape?.includes('curve') ||
        shape?.includes('scribble') ||
        shape?.includes('connector') ||
        shape?.includes('elbow');
      handleUpdateLayer({
        ...activeL,
        shapeType: shape,
        name: `Forma ${shape}`,
        strokeWidth: isLineType ? (activeL.strokeWidth || 6) : (activeL.strokeWidth ?? 2),
      });
    } else {
      handleAddLayer('shape', shape);
    }
  };

  const handleDeleteLayer = (id: string) => {
    const updatedLayers = layers.filter((l) => l.id !== id);
    setLayers(updatedLayers);
    if (activeLayerId === id) setActiveLayerId(null);
    pushHistoryStep('Excluiu camada', 'Excluir', updatedLayers);
    setCanvasVersion((v) => v + 1);
  };

  // Global Keyboard Shortcuts: Ctrl+P (Print RIP), Ctrl+E (Export), Ctrl+N (New), Ctrl+O (Open), Ctrl+S (Save), Ctrl+Z/Y (Undo/Redo), Delete, Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.isContentEditable);

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isInput) {
        // Allow default input typing behavior; only catch Ctrl+S / Ctrl+P if desired
        if (isCtrlOrCmd) {
          const keyLower = e.key.toLowerCase();
          if (keyLower === 's') {
            e.preventDefault();
            handleSaveLayout();
          } else if (keyLower === 'p') {
            e.preventDefault();
            setIsPrintModalOpen(true);
          }
        }
        return;
      }

      if (isCtrlOrCmd) {
        const keyLower = e.key.toLowerCase();
        if (keyLower === 'p') {
          e.preventDefault();
          setIsPrintModalOpen(true);
          return;
        }
        if (keyLower === 'e') {
          e.preventDefault();
          setIsExportModalOpen(true);
          return;
        }
        if (keyLower === 'n') {
          e.preventDefault();
          setIsNewProjectModalOpen(true);
          return;
        }
        if (keyLower === 'o') {
          e.preventDefault();
          handleOpenProjectClick();
          return;
        }
        if (keyLower === 's') {
          e.preventDefault();
          handleSaveLayout();
          return;
        }
        if (keyLower === 'z' || e.code === 'KeyZ') {
          e.preventDefault();
          if (e.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
          return;
        }
        if (keyLower === 'y' || e.code === 'KeyY') {
          e.preventDefault();
          handleRedo();
          return;
        }
      }

      if (isInput) return;

      if ((e.key === 'Delete' || e.key === 'Backspace') && activeLayerId) {
        e.preventDefault();
        handleDeleteLayer(activeLayerId);
        return;
      }

      // Arrow keys nudge active layer
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) && activeLayerId) {
        const activeLayer = layers.find((l) => l.id === activeLayerId);
        if (activeLayer && !activeLayer.locked) {
          e.preventDefault();
          const step = e.shiftKey ? 10 : 1;
          let dx = 0;
          let dy = 0;
          if (e.key === 'ArrowLeft') dx = -step;
          if (e.key === 'ArrowRight') dx = step;
          if (e.key === 'ArrowUp') dy = -step;
          if (e.key === 'ArrowDown') dy = step;

          handleUpdateLayer({
            ...activeLayer,
            x: activeLayer.x + dx,
            y: activeLayer.y + dy,
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLayerId, layers, handleUndo, handleRedo]);

  // Global Clipboard Paste Listener (Ctrl+V) for images with transparency
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      const items = e.clipboardData?.items;
      if (items && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
              e.preventDefault();
              processAndAddPastedBlob(file, 'Estampa Colada (Área de Transparência)');
              return;
            }
          }
        }
      }

      // Check if text pasted is an image Data URL or HTTP image URL
      const text = e.clipboardData?.getData('text/plain')?.trim();
      if (text) {
        if (
          text.startsWith('data:image/') ||
          text.match(/^https?:\/\/.*\.(png|jpg|jpeg|webp|svg)(\?.*)?$/i)
        ) {
          if (!isInput) {
            e.preventDefault();
            fetch(text)
              .then((res) => res.blob())
              .then((blob) =>
                processAndAddPastedBlob(blob, 'Estampa Colada de URL')
              )
              .catch(() => {
                showSnackbar('Não foi possível carregar a imagem da URL colada.', 'error');
              });
          }
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, []);

  const handleDuplicateLayer = (id: string) => {
    const target = layers.find((l) => l.id === id);
    if (!target) return;

    const dupLayer: Layer = {
      ...target,
      id: 'layer-' + Date.now(),
      name: target.name + ' (Cópia)',
      x: target.x + 20,
      y: target.y + 20,
    };

    const updatedLayers = [...layers, dupLayer];
    setLayers(updatedLayers);
    setActiveLayerId(dupLayer.id);
    pushHistoryStep('Duplicou camada ' + target.name, 'Duplicar', updatedLayers);
    setCanvasVersion((v) => v + 1);
  };

  const handleToggleVisibility = (id: string) => {
    const updatedLayers = layers.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l));
    setLayers(updatedLayers);
    pushHistoryStep('Alternou visibilidade da camada', 'Camadas', updatedLayers);
    setCanvasVersion((v) => v + 1);
  };

  const handleToggleLock = (id: string) => {
    const updatedLayers = layers.map((l) => (l.id === id ? { ...l, locked: !l.locked } : l));
    setLayers(updatedLayers);
    pushHistoryStep('Alternou bloqueio da camada', 'Camadas', updatedLayers);
  };

  // AI Add Image to Canvas
  const handleAddAIGeneratedImageToCanvas = (imageUrl: string, title: string) => {
    const newId = 'layer-ai-' + Date.now();
    const img = new Image();
    img.onload = () => {
      const naturalW = img.naturalWidth || 600;
      const naturalH = img.naturalHeight || 400;
      const aspect = naturalW / naturalH;

      const maxW = 600;
      const maxH = 450;
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

      const newLayer: Layer = {
        id: newId,
        name: 'Estampa IA: ' + title,
        type: 'image',
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: Math.max(20, Math.round((750 - calcW) / 2)),
        y: Math.max(20, Math.round((450 - calcH) / 2)),
        width: Math.max(20, calcW),
        height: Math.max(20, calcH),
        rotation: 0,
        content: imageUrl,
      };

      const updated = [...layers, newLayer];
      setLayers(updated);
      setActiveLayerId(newId);
      pushHistoryStep('Gerou estampa por IA: ' + title, 'IA Studio', updated);
      setCanvasVersion((v) => v + 1);
    };
    img.onerror = () => {
      const newLayer: Layer = {
        id: newId,
        name: 'Estampa IA: ' + title,
        type: 'image',
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: 100,
        y: 50,
        width: 600,
        height: 400,
        rotation: 0,
        content: imageUrl,
      };

      const updated = [...layers, newLayer];
      setLayers(updated);
      setActiveLayerId(newId);
      pushHistoryStep('Gerou estampa por IA: ' + title, 'IA Studio', updated);
      setCanvasVersion((v) => v + 1);
    };
    img.src = imageUrl;
  };

  // Import Image / Design from Canva Hub
  const handleImportFromCanva = (imageUrl: string, title: string, options?: { isBackground?: boolean }) => {
    const newId = 'layer-canva-' + Date.now();
    const printWidth = Math.round((currentProduct.defaultWidthCm / 2.54) * 150);
    const printHeight = Math.round((currentProduct.defaultHeightCm / 2.54) * 150);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const naturalW = img.naturalWidth || printWidth;
      const naturalH = img.naturalHeight || printHeight;
      const aspect = naturalW / naturalH;
      const productAspect = printWidth / printHeight;

      let calcW: number;
      let calcH: number;
      let calcX: number;
      let calcY: number;

      if (options?.isBackground || Math.abs(aspect - productAspect) < 0.20) {
        // Fits entire page canvas width & height (wrap canvas)
        calcW = printWidth;
        calcH = printHeight;
        calcX = 0;
        calcY = 0;
      } else {
        // Adjust to page width while preserving aspect ratio
        calcW = printWidth;
        calcH = Math.round(printWidth / aspect);
        if (calcH > printHeight * 1.05) {
          calcH = printHeight;
          calcW = Math.round(printHeight * aspect);
        }
        calcX = Math.max(0, Math.round((printWidth - calcW) / 2));
        calcY = Math.max(0, Math.round((printHeight - calcH) / 2));
      }

      const newLayer: Layer = {
        id: newId,
        name: 'Canva: ' + title,
        type: 'image',
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: calcX,
        y: calcY,
        width: Math.max(20, calcW),
        height: Math.max(20, calcH),
        rotation: 0,
        content: imageUrl,
        filters: { brightness: 0, contrast: 0, saturation: 0, hue: 0, blur: 0, vibrance: 0 },
      };

      const updated = options?.isBackground ? [newLayer, ...layers] : [...layers, newLayer];
      setLayers(updated);
      setActiveLayerId(newId);
      pushHistoryStep('Importado do Canva: ' + title, 'Canva Connect', updated);
      setCanvasVersion((v) => v + 1);
      showSnackbar(`🎨 Estampa "${title}" ajustada na largura da página com sucesso!`, 'success');
    };
    img.onerror = () => {
      const newLayer: Layer = {
        id: newId,
        name: 'Canva: ' + title,
        type: 'image',
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: 0,
        y: 0,
        width: printWidth,
        height: printHeight,
        rotation: 0,
        content: imageUrl,
        filters: { brightness: 0, contrast: 0, saturation: 0, hue: 0, blur: 0, vibrance: 0 },
      };
      const updated = [...layers, newLayer];
      setLayers(updated);
      setActiveLayerId(newId);
      pushHistoryStep('Importado do Canva: ' + title, 'Canva Connect', updated);
      setCanvasVersion((v) => v + 1);
      showSnackbar(`🎨 Estampa "${title}" importada do Canva!`, 'success');
    };
    img.src = imageUrl;
  };

  const handleLoadTemplateLayers = (templateName: string, rawLayers: Layer[]) => {
    if (!rawLayers || rawLayers.length === 0) return;

    // Calculate active product canvas dimensions in pixels (at 150 DPI)
    const targetCanvasWidth = Math.round((currentProduct.defaultWidthCm / 2.54) * 150);
    const targetCanvasHeight = Math.round((currentProduct.defaultHeightCm / 2.54) * 150);

    // Find reference dimensions of incoming template
    const bgLayer = rawLayers.find(
      (l) => l.x === 0 && l.y === 0 && (
        l.name?.toLowerCase().includes('fundo') ||
        l.name?.toLowerCase().includes('background') ||
        l.name?.toLowerCase().includes('base') ||
        l.width >= 500
      )
    );

    let refWidth = bgLayer ? bgLayer.width : 0;
    let refHeight = bgLayer ? bgLayer.height : 0;

    if (refWidth < 200 || refHeight < 100) {
      const minX = Math.min(...rawLayers.map((l) => l.x));
      const minY = Math.min(...rawLayers.map((l) => l.y));
      const maxX = Math.max(...rawLayers.map((l) => l.x + (l.width || 0)));
      const maxY = Math.max(...rawLayers.map((l) => l.y + (l.height || 0)));

      refWidth = maxX > minX ? maxX : targetCanvasWidth;
      refHeight = maxY > minY ? maxY : targetCanvasHeight;
    }

    if (refWidth < 200) refWidth = 756;
    if (refHeight < 100) refHeight = 359;

    const scaleX = targetCanvasWidth / refWidth;
    const scaleY = targetCanvasHeight / refHeight;
    const avgScale = (scaleX + scaleY) / 2;

    const adjustedLayers: Layer[] = rawLayers.map((layer) => {
      const isBackground = layer.x === 0 && layer.y === 0 && (
        Math.abs(layer.width - refWidth) <= 15 ||
        layer.name?.toLowerCase().includes('fundo') ||
        layer.name?.toLowerCase().includes('background')
      );

      if (isBackground) {
        return {
          ...layer,
          x: 0,
          y: 0,
          width: targetCanvasWidth,
          height: targetCanvasHeight,
        };
      }

      const newX = Math.round(layer.x * scaleX);
      const newY = Math.round(layer.y * scaleY);
      const newW = Math.max(10, Math.round(layer.width * scaleX));
      const newH = Math.max(10, Math.round(layer.height * scaleY));

      const updated: Layer = {
        ...layer,
        x: newX,
        y: newY,
        width: newW,
        height: newH,
      };

      if (layer.type === 'text') {
        if (layer.fontSize) {
          updated.fontSize = Math.max(8, Math.round(layer.fontSize * avgScale));
        }
        if (layer.curveRadius) {
          updated.curveRadius = Math.round(layer.curveRadius * avgScale);
        }
      }

      if (layer.strokeWidth) {
        updated.strokeWidth = Math.max(1, Math.round(layer.strokeWidth * avgScale));
      }

      return updated;
    });

    setLayers(adjustedLayers);
    pushHistoryStep(`Carregou Modelo: ${templateName}`, 'template', adjustedLayers);
    setCanvasVersion((v) => v + 1);
    if (adjustedLayers.length > 0) {
      setActiveLayerId(adjustedLayers[adjustedLayers.length - 1].id);
    }
    showSnackbar(`🎨 Modelo "${templateName}" ajustado na largura da página (${targetCanvasWidth}x${targetCanvasHeight}px)!`, 'success');
  };

  // Apply AI Edit Tool (Background Remover, Vectorize, Upscale) to active layer
  const handleApplyAIToolToActiveLayer = async (action: 'remove_bg' | 'vectorize' | 'upscale' | 'color_replace') => {
    const activeLayer = layers.find((l) => l.id === activeLayerId);
    if (!activeLayer || !activeLayer.content) return;

    try {
      const res = await fetch('/api/gemini/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: activeLayer.content,
          action,
        }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        const updated = layers.map((l) =>
          l.id === activeLayer.id ? { ...l, content: data.imageUrl } : l
        );
        setLayers(updated);
        pushHistoryStep(`Aplica IA (${action}) na camada`, 'IA Tool', updated);
        setCanvasVersion((v) => v + 1);
      }
    } catch (e) {
      console.error('Error applying AI tool:', e);
    }
  };

  // Quick Preset Layout Templates
  const handleApplyPresetTemplate = (templateType: 'centered_logo' | 'full_wrap' | 'name_badge') => {
    if (templateType === 'centered_logo') {
      const updated = layers.map((l) =>
        l.id === activeLayerId ? { ...l, x: 400, y: 150, width: 300, height: 300 } : l
      );
      setLayers(updated);
      setCanvasVersion((v) => v + 1);
    }
  };

  const activeLayerObj = layers.find((l) => l.id === activeLayerId) || null;

  return (
    <div className={`flex flex-col w-full h-screen h-[100dvh] overflow-hidden select-none font-sans transition-colors ${
      theme === 'light' ? 'bg-slate-100 text-slate-900 light' : 'bg-[#141415] text-white dark'
    }`}>
      {/* Hidden file inputs for opening projects, including stamps, and camera capture */}
      <input
        ref={projectInputRef}
        type="file"
        accept=".sublimation,.json,image/*"
        onChange={handleOpenProjectFile}
        style={{ position: 'fixed', top: -9999, left: -9999, opacity: 0, width: '1px', height: '1px', pointerEvents: 'none' }}
        tabIndex={-1}
        aria-hidden="true"
      />
      <input
        ref={stampInputRef}
        type="file"
        accept="image/*,.svg"
        onChange={handleIncludeStampFile}
        style={{ position: 'fixed', top: -9999, left: -9999, opacity: 0, width: '1px', height: '1px', pointerEvents: 'none' }}
        tabIndex={-1}
        aria-hidden="true"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleIncludeStampFile}
        style={{ position: 'fixed', top: -9999, left: -9999, opacity: 0, width: '1px', height: '1px', pointerEvents: 'none' }}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Recreated & Organized TopBar */}
      <TopBar
        currentProduct={currentProduct}
        onOpenProductLibrary={() => setIsProductLibraryOpen(true)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={currentHistoryIndex > 0}
        canRedo={currentHistoryIndex < historySteps.length - 1}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        onOpenMug3In1={() => setIsMug3In1Open(true)}
        onOpenAIPanel={() => {
          setActiveRightTab('ai');
          setIsRightSidebarCollapsed(false);
        }}
        onOpenWordArtModal={() => setIsWordArtModalOpen(true)}
        onOpenWordArt2={() => setIsWordArtModal2Open(true)}
        onOpenPresetGallery={() => setActiveSidebarTab('templates')}
        onOpenTestRunner={() => setIsTestRunnerOpen(true)}
        onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        mirrorSublimation={mirrorSublimation}
        onToggleMirrorSublimation={() => setMirrorSublimation(!mirrorSublimation)}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        showRulers={showRulers}
        onToggleRulers={() => setShowRulers(!showRulers)}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        workspaceViewMode={workspaceViewMode}
        onChangeWorkspaceViewMode={setWorkspaceViewMode}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        onNewProject={() => setIsNewProjectModalOpen(true)}
        onOpenProject={handleOpenProjectClick}
        onIncludeStamp={handleIncludeStampClick}
        onViewImage={handleViewImage}
        onSaveLayout={handleSaveLayout}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenPrinterSettings={() => setIsPrinterSettingsOpen(true)}
        onOpenAISettings={() => setIsAISettingsOpen(true)}
        onOpenCanva={() => setIsCanvaModalOpen(true)}
        onPasteFromClipboard={handlePasteFromClipboard}
        projectName={projectName}
        onChangeProjectName={setProjectName}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Workspace Grid (Left Toolbar | Central Canvas or 3D Stage | Right Sidepanels) */}
      <div className={`flex-1 w-full overflow-hidden relative transition-all duration-300 ${
        isAndroidSimulated
          ? 'max-w-[420px] max-h-[860px] mx-auto my-auto rounded-[40px] border-[10px] border-slate-900 ring-4 ring-slate-800 shadow-2xl shadow-emerald-500/10 flex flex-col bg-[#090d16] relative'
          : 'flex h-[calc(100vh-3rem)] w-full max-w-full'
      }`}>
        {/* Android Notch & Status bar indicator when in simulated mode */}
        {isAndroidSimulated && (
          <div className="w-full bg-slate-950 px-6 py-2.5 flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 shrink-0">
            <span className="font-bold text-slate-200">14:59</span>
            {/* Camera Hole Notch */}
            <div className="w-4 h-4 bg-black rounded-full ring-2 ring-slate-800"></div>
            <div className="flex items-center gap-1.5 font-medium">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}
        {/* Left Canva Rail and Side Drawer */}
        <LeftToolBar
          activeSidebarTab={activeSidebarTab}
          setActiveSidebarTab={setActiveSidebarTab}
          activeTool={activeTool}
          onSelectTool={handleSelectTool}
          selectedShape={selectedShape}
          onSelectShape={handleSelectShape}
          activeColor={activeColor}
          onChangeColor={handleChangeColor}
          brushSize={brushSize}
          onChangeBrushSize={setBrushSize}
          onAddLayer={handleAddLayer}
          onAddVectorTextPreset={handleAddVectorTextPreset}
          currentProduct={currentProduct}
          onSelectProduct={setCurrentProduct}
          layers={layers}
          activeLayerId={activeLayerId}
          onSelectLayer={setActiveLayerId}
          onUpdateLayer={handleUpdateLayer}
          onDeleteLayer={handleDeleteLayer}
          onDuplicateLayer={handleDuplicateLayer}
          onAddAIGeneratedImage={handleAddAIGeneratedImageToCanvas}
          onOpenAIPanel={() => {
            setActiveRightTab('ai');
            setIsRightSidebarCollapsed(false);
          }}
          onOpenWordArtModal={() => setIsWordArtModalOpen(true)}
          onOpenWordArt2={() => setIsWordArtModal2Open(true)}
          onOpenCanva={() => setIsCanvaModalOpen(true)}
          onImportFromCanva={handleImportFromCanva}
          onLoadTemplateLayers={handleLoadTemplateLayers}
          onOpenProjectFile={() => projectInputRef.current?.click()}
          projectName={projectName}
          onPasteFromClipboard={handlePasteFromClipboard}
          theme={theme}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Center Main Editing Area based on Workspace View Mode */}
        <div className="flex-1 h-full flex relative overflow-hidden">
          {/* Mode 1: Fullscreen 3D Mockup Hero Viewport */}
          {workspaceViewMode === 'mockup' && (
            <div className={`w-full h-full p-3 transition-colors ${
              theme === 'light' ? 'bg-slate-200' : 'bg-[#121214]'
            }`}>
              <ThreeDViewport
                product={currentProduct}
                canvasElement={renderedCanvas}
                canvasVersion={canvasVersion}
              />
            </div>
          )}

          {/* Mode 2 & 3: 2D Canvas Stage (Always mounted so 3D texture is continuously rendered & updated) */}
          <div className={workspaceViewMode === 'mockup' ? 'hidden' : 'relative w-full h-full flex-1 flex'}>
            <CanvasArea
              product={currentProduct}
              layers={layers}
              activeLayerId={activeLayerId}
              onSelectLayer={setActiveLayerId}
              onUpdateLayer={handleUpdateLayer}
              onDeleteLayer={handleDeleteLayer}
              onDuplicateLayer={handleDuplicateLayer}
              onReorderLayers={(reordered) => {
                setLayers(reordered);
                setCanvasVersion((v) => v + 1);
              }}
              onToggleLock={handleToggleLock}
              onToggleVisibility={handleToggleVisibility}
              onChangeColor={handleChangeColor}
              onUndo={handleUndo}
              onRedo={handleRedo}
              pushHistoryStep={pushHistoryStep}
              activeTool={activeTool}
              selectedShape={selectedShape}
              activeColor={activeColor}
              brushSize={brushSize}
              mirrorSublimation={mirrorSublimation}
              showGrid={showGrid}
              showRulers={showRulers}
              onCanvasRendered={(canvas) => setRenderedCanvas(canvas)}
              theme={theme}
              onOpenWordArtStudio={handleOpenWordArtStudio}
              onPasteFromClipboard={handlePasteFromClipboard}
            />

            {/* Optional Floating PIP 3D Thumbnail Card when in 'canvas' focus mode */}
            {workspaceViewMode === 'canvas' && show3DPip && (
              <div className={`absolute bottom-16 right-6 w-72 h-56 border rounded-2xl shadow-2xl overflow-hidden z-30 flex flex-col backdrop-blur-md transition-all hover:scale-105 group ${
                theme === 'light'
                  ? 'bg-white/95 border-slate-300 text-slate-800'
                  : 'bg-[#18181c]/95 border-[#38383c] text-gray-300'
              }`}>
                <div className={`flex items-center justify-between px-3 py-1.5 border-b text-[11px] ${
                  theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-[#222225] border-[#38383c] text-gray-300'
                }`}>
                  <span className="font-semibold text-purple-600 flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5" />
                    Preview 3D
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setWorkspaceViewMode('split')}
                      className="px-2 py-0.5 text-[10px] bg-purple-600 hover:bg-purple-500 text-white rounded font-medium cursor-pointer"
                      title="Expandir para Visualização Dividida"
                    >
                      Expandir
                    </button>
                    <button
                      onClick={() => setShow3DPip(false)}
                      className={`p-1 rounded cursor-pointer ${
                        theme === 'light' ? 'hover:bg-slate-200 text-slate-500 hover:text-slate-900' : 'hover:bg-white/10 text-gray-400 hover:text-white'
                      }`}
                      title="Fechar / Remover Canvas 3D"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 w-full h-full">
                  <ThreeDViewport
                    product={currentProduct}
                    canvasElement={renderedCanvas}
                    canvasVersion={canvasVersion}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Collapsible Dockable Sidepanels (Shown in Split or Mockup mode) */}
        {workspaceViewMode !== 'canvas' && (
          <aside
            className={`flex border-l transition-all duration-300 z-30 ${
              theme === 'light'
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-[#1e1e20] border-[#2d2d30] text-gray-200'
            } ${
              isRightSidebarCollapsed ? 'w-10' : 'w-80 md:w-96'
            }`}
          >
            {/* Vertical Dock Tab Strip */}
            <div className={`w-10 border-r flex flex-col items-center py-2 gap-2 shrink-0 ${
              theme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-[#18181a] border-[#2d2d30] text-gray-400'
            }`}>
              {/* Collapse / Expand Toggle */}
              <button
                onClick={() => setIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
                className={`p-2 rounded-lg mb-2 cursor-pointer ${
                  theme === 'light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:text-white hover:bg-white/5'
                }`}
                title={isRightSidebarCollapsed ? 'Expandir Painel' : 'Recolher Painel'}
              >
                {isRightSidebarCollapsed ? (
                  <ChevronLeft className="w-4 h-4 text-purple-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                )}
              </button>

              <button
                onClick={() => {
                  setActiveRightTab('3d');
                  setIsRightSidebarCollapsed(false);
                }}
                className={`p-2 rounded-lg transition-colors relative cursor-pointer ${
                  activeRightTab === '3d' && !isRightSidebarCollapsed
                    ? 'bg-purple-600 text-white shadow'
                    : theme === 'light' ? 'hover:text-slate-900 hover:bg-slate-200' : 'hover:text-white hover:bg-white/5'
                }`}
                title="Miniatura 3D Interativa"
              >
                <Box className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveRightTab('properties');
                  setIsRightSidebarCollapsed(false);
                }}
                className={`p-2 rounded-lg transition-colors relative cursor-pointer ${
                  activeRightTab === 'properties' && !isRightSidebarCollapsed
                    ? 'bg-purple-600 text-white shadow'
                    : theme === 'light' ? 'hover:text-slate-900 hover:bg-slate-200' : 'hover:text-white hover:bg-white/5'
                }`}
                title="Propriedades do Elemento"
              >
                <Sliders className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveRightTab('layers');
                  setIsRightSidebarCollapsed(false);
                }}
                className={`p-2 rounded-lg transition-colors relative cursor-pointer ${
                  activeRightTab === 'layers' && !isRightSidebarCollapsed
                    ? 'bg-purple-600 text-white shadow'
                    : theme === 'light' ? 'hover:text-slate-900 hover:bg-slate-200' : 'hover:text-white hover:bg-white/5'
                }`}
                title="Gerenciador de Camadas"
              >
                <Layers className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveRightTab('history');
                  setIsRightSidebarCollapsed(false);
                }}
                className={`p-2 rounded-lg transition-colors relative cursor-pointer ${
                  activeRightTab === 'history' && !isRightSidebarCollapsed
                    ? 'bg-purple-600 text-white shadow'
                    : theme === 'light' ? 'hover:text-slate-900 hover:bg-slate-200' : 'hover:text-white hover:bg-white/5'
                }`}
                title="Histórico de Ações"
              >
                <History className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveRightTab('ai');
                  setIsRightSidebarCollapsed(false);
                }}
                className={`p-2 rounded-lg transition-colors relative cursor-pointer ${
                  activeRightTab === 'ai' && !isRightSidebarCollapsed
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
                }`}
                title="Estúdio Generativo por IA"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
              </button>
            </div>

            {/* Expanded Panel Body Container */}
            <div className={`flex-1 h-full overflow-hidden flex flex-col ${isRightSidebarCollapsed ? 'hidden' : ''}`}>
              <div className={activeRightTab === '3d' ? 'w-full h-full p-2 flex flex-col' : 'hidden'}>
                <ThreeDViewport
                  product={currentProduct}
                  canvasElement={renderedCanvas}
                  canvasVersion={canvasVersion}
                />
              </div>

              {activeRightTab === 'properties' && (
                  <RightPropertiesPanel
                    activeLayer={activeLayerObj}
                    onUpdateLayer={handleUpdateLayer}
                    product={currentProduct}
                    onApplyPresetTemplate={handleApplyPresetTemplate}
                    onDeleteLayer={handleDeleteLayer}
                    onDuplicateLayer={handleDuplicateLayer}
                    onOpenWordArtStudio={handleOpenWordArtStudio}
                    theme={theme}
                  />
                )}

                {activeRightTab === 'layers' && (
                  <LayerPanel
                    layers={layers}
                    activeLayerId={activeLayerId}
                    onSelectLayer={setActiveLayerId}
                    onAddLayer={handleAddLayer}
                    onDeleteLayer={handleDeleteLayer}
                    onDuplicateLayer={handleDuplicateLayer}
                    onToggleVisibility={handleToggleVisibility}
                    onToggleLock={handleToggleLock}
                    onUpdateLayer={handleUpdateLayer}
                    onReorderLayers={(reordered) => {
                      setLayers(reordered);
                      pushHistoryStep('Reordenou Camadas', 'Camadas', reordered);
                      setCanvasVersion((v) => v + 1);
                    }}
                    theme={theme}
                  />
                )}

                {activeRightTab === 'history' && (
                  <HistoryPanel
                    historySteps={historySteps}
                    currentHistoryIndex={currentHistoryIndex}
                    onJumpToHistoryStep={jumpToHistoryStep}
                    theme={theme}
                  />
                )}

                {activeRightTab === 'ai' && (
                  <AIPanel
                    product={currentProduct}
                    onAddAIGeneratedImageToCanvas={handleAddAIGeneratedImageToCanvas}
                    onApplyAIToolToActiveLayer={handleApplyAIToolToActiveLayer}
                    activeLayer={activeLayerObj}
                    theme={theme}
                  />
                )}
              </div>
          </aside>
        )}
      </div>

      {/* Modals */}
      <ProductLibrary
        isOpen={isProductLibraryOpen}
        onClose={() => setIsProductLibraryOpen(false)}
        selectedProduct={currentProduct}
        onSelectProduct={(prod) => {
          setCurrentProduct(prod);
          pushHistoryStep('Alterou produto para ' + prod.name, 'Produto', layers);
          setCanvasVersion((v) => v + 1);
        }}
      />

      <PrintSublimationModal
        isOpen={isPrintModalOpen || isExportModalOpen}
        initialTab={printModalInitialTab}
        initialA4DataUrl={printModalInitialA4DataUrl}
        onClose={() => {
          setIsPrintModalOpen(false);
          setIsExportModalOpen(false);
          setPrintModalInitialA4DataUrl(undefined);
        }}
        currentProduct={currentProduct}
        darkMode={theme === 'dark'}
        canvasElement={renderedCanvas}
        mirrorSublimation={mirrorSublimation}
        onShowSnackbar={(msg, type) => showSnackbar(msg, type)}
        onOpenPrinterSettings={() => setIsPrinterSettingsOpen(true)}
        onOpenMug3In1={() => {
          setPrintModalInitialTab('mug3in1');
          setIsPrintModalOpen(true);
        }}
      />

      <Mug3In1SheetModal
        isOpen={isMug3In1Open}
        onClose={() => setIsMug3In1Open(false)}
        canvasElement={renderedCanvas}
        currentProduct={currentProduct}
        mirrorSublimation={mirrorSublimation}
        darkMode={theme === 'dark'}
        onShowSnackbar={(msg, type) => showSnackbar(msg, type)}
        onSendToRip={(a4DataUrl) => {
          setIsMug3In1Open(false);
          setPrintModalInitialA4DataUrl(a4DataUrl);
          setPrintModalInitialTab('rip');
          setIsPrintModalOpen(true);
        }}
      />

      <PrinterSettingsModal
        isOpen={isPrinterSettingsOpen}
        onClose={() => setIsPrinterSettingsOpen(false)}
        theme={theme}
        canvasElement={renderedCanvas}
        onShowSnackbar={(msg, type) => showSnackbar(msg, type)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      <PasteClipboardModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onImagePasted={(blob, nameHint) => processAndAddPastedBlob(blob, nameHint)}
        theme={theme}
      />

      {/* Novo Projeto Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative transition-all ${
            theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#18181b] border-[#2e2e33] text-gray-100'
          }`}>
            <button
              onClick={() => setIsNewProjectModalOpen(false)}
              className={`absolute top-4 right-4 p-1.5 rounded-lg cursor-pointer ${
                theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/10 text-gray-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-600/20 text-purple-600 rounded-xl">
                <FolderPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Criar Novo Projeto</h3>
                <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                  Escolha como deseja iniciar sua nova estampa sublimática.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
              <button
                onClick={() => handleConfirmNewProject('blank')}
                className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer hover:border-purple-500 group ${
                  theme === 'light'
                    ? 'bg-slate-50 border-slate-200 hover:bg-purple-50'
                    : 'bg-[#222226] border-[#303036] hover:bg-[#282338]'
                }`}
              >
                <div className="p-2 rounded-lg bg-purple-600 text-white w-fit group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm">Projeto em Branco</span>
                <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                  Canvas completamente limpo para você criar do zero.
                </span>
              </button>

              <button
                onClick={() => handleConfirmNewProject('sample')}
                className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer hover:border-purple-500 group ${
                  theme === 'light'
                    ? 'bg-slate-50 border-slate-200 hover:bg-purple-50'
                    : 'bg-[#222226] border-[#303036] hover:bg-[#282338]'
                }`}
              >
                <div className="p-2 rounded-lg bg-indigo-600 text-white w-fit group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm">Com Modelo Base</span>
                <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                  Inclui fundo guia e camada de texto inicial para personalizar.
                </span>
              </button>

              {localStorage.getItem('sublimstudio_saved_project') && (
                <button
                  onClick={() => handleConfirmNewProject('restore')}
                  className={`sm:col-span-2 p-4 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer hover:border-emerald-500 group ${
                    theme === 'light'
                      ? 'bg-emerald-50/60 border-emerald-300 hover:bg-emerald-100/80 text-emerald-950'
                      : 'bg-emerald-950/20 border-emerald-500/40 hover:bg-emerald-900/30 text-emerald-100'
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-emerald-600 text-white shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Save className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">Restaurar Rascunho Salvo</span>
                    <span className={`text-xs ${theme === 'light' ? 'text-emerald-800' : 'text-emerald-300/80'}`}>
                      Carregar as camadas e configurações do último projeto salvo neste dispositivo.
                    </span>
                  </div>
                </button>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-[#2e2e33]">
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  theme === 'light' ? 'bg-slate-200 hover:bg-slate-300 text-slate-700' : 'bg-[#28282d] hover:bg-[#34343a] text-gray-300'
                }`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configurações Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl relative transition-all ${
            theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#18181b] border-[#2e2e33] text-gray-100'
          }`}>
            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className={`absolute top-4 right-4 p-1.5 rounded-lg cursor-pointer ${
                theme === 'light' ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/10 text-gray-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-purple-600/20 text-purple-600 rounded-xl">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Configurações do Estúdio</h3>
                <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                  Ajuste as preferências de trabalho e visualização.
                </p>
              </div>
            </div>

            <div className="space-y-4 my-4">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-[#2e2e33]">
                <div>
                  <div className="font-semibold text-xs">Espelhamento Sublimático</div>
                  <div className={`text-[11px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                    Inverter horizontalmente para transferência em papel
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={mirrorSublimation}
                  onChange={(e) => setMirrorSublimation(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-[#2e2e33]">
                <div>
                  <div className="font-semibold text-xs">Exibir Grade de Alinhamento</div>
                  <div className={`text-[11px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                    Linhas de auxílio no canvas 2D
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-[#2e2e33]">
                <div>
                  <div className="font-semibold text-xs">Exibir Réguas em Milímetros</div>
                  <div className={`text-[11px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                    Réguas graduadas nas bordas do editor
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={showRulers}
                  onChange={(e) => setShowRulers(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-[#2e2e33]">
                <div>
                  <div className="font-semibold text-xs">Tema da Interface</div>
                  <div className={`text-[11px] ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                    Alternar entre modo escuro e claro
                  </div>
                </div>
                <button
                  onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-600 text-white cursor-pointer hover:bg-purple-500"
                >
                  {theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-200 dark:border-[#2e2e33]">
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 text-white cursor-pointer hover:bg-purple-500"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Android Bottom Navigation Bar */}
      <AndroidMobileNav
        workspaceViewMode={workspaceViewMode}
        setWorkspaceViewMode={setWorkspaceViewMode}
        activeRightTab={activeRightTab}
        setActiveRightTab={setActiveRightTab}
        setIsRightSidebarCollapsed={setIsRightSidebarCollapsed}
        onOpenProductLibrary={() => setIsProductLibraryOpen(true)}
        onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
        onTriggerCameraCapture={() => {
          handleTriggerCamera();
          showSnackbar('Câmera ativada para captura', 'info');
        }}
        onIncludeStamp={() => {
          handleIncludeStampClick();
          showSnackbar('Selecione uma estampa ou foto', 'info');
        }}
        onAddTextLayer={() => {
          handleAddLayer('text');
          showSnackbar('Novo texto adicionado!', 'success');
        }}
        onAddShapeLayer={(shape) => {
          handleAddLayer('shape', shape);
          showSnackbar(`Forma ${shape} adicionada!`, 'success');
        }}
        onOpenMobileBottomSheet={(tab) => {
          setMobileBottomSheetTab(tab);
        }}
      />

      {/* Material 3 Android Mobile Bottom Sheet */}
      <MD3BottomSheet
        isOpen={mobileBottomSheetTab !== null}
        onClose={() => setMobileBottomSheetTab(null)}
        title={
          mobileBottomSheetTab === 'layers'
            ? 'Gerenciador de Camadas'
            : mobileBottomSheetTab === 'properties'
            ? 'Ajustes e Propriedades'
            : 'IA Studio - Gerar Estampa'
        }
        subtitle={
          mobileBottomSheetTab === 'layers'
            ? 'Organize, bloqueie e ajuste a opacidade dos elementos'
            : mobileBottomSheetTab === 'properties'
            ? 'Ajuste cores, tamanho, fonte e curva do objeto'
            : 'Crie artes e fundos automáticos com IA'
        }
      >
        {mobileBottomSheetTab === 'layers' && (
          <LayerPanel
            layers={layers}
            activeLayerId={activeLayerId}
            onSelectLayer={setActiveLayerId}
            onAddLayer={(type) => {
              handleAddLayer(type);
              showSnackbar(`Camada ${type} criada!`, 'success');
            }}
            onDeleteLayer={(id) => {
              handleDeleteLayer(id);
              showSnackbar('Camada removida', 'info');
            }}
            onDuplicateLayer={(id) => {
              handleDuplicateLayer(id);
              showSnackbar('Camada duplicada', 'success');
            }}
            onToggleVisibility={handleToggleVisibility}
            onToggleLock={handleToggleLock}
            onUpdateLayer={handleUpdateLayer}
            onReorderLayers={(reordered) => {
              setLayers(reordered);
              pushHistoryStep('Reordenou Camadas', 'Camadas', reordered);
              setCanvasVersion((v) => v + 1);
            }}
            theme={theme}
          />
        )}

        {mobileBottomSheetTab === 'properties' && (
          <RightPropertiesPanel
            activeLayer={activeLayerObj}
            onUpdateLayer={handleUpdateLayer}
            product={currentProduct}
            onApplyPresetTemplate={handleApplyPresetTemplate}
            onDeleteLayer={(id) => {
              handleDeleteLayer(id);
              setMobileBottomSheetTab(null);
              showSnackbar('Camada removida', 'info');
            }}
            onDuplicateLayer={(id) => {
              handleDuplicateLayer(id);
              showSnackbar('Camada duplicada', 'success');
            }}
            onOpenWordArtStudio={(layerId, type) => {
              handleOpenWordArtStudio(layerId, type);
              setMobileBottomSheetTab(null);
            }}
            theme={theme}
          />
        )}

        {mobileBottomSheetTab === 'ai' && (
          <AIPanel
            product={currentProduct}
            onAddAIGeneratedImageToCanvas={(url, title) => {
              handleAddAIGeneratedImageToCanvas(url, title);
              setMobileBottomSheetTab(null);
              showSnackbar('Arte IA adicionada à tela!', 'success');
            }}
            onApplyAIToolToActiveLayer={(action) => {
              handleApplyAIToolToActiveLayer(action);
              showSnackbar(`Efeito IA (${action}) aplicado!`, 'success');
            }}
            activeLayer={activeLayerObj}
            theme={theme}
          />
        )}
      </MD3BottomSheet>

      {/* Material Design 3 Toast / Snackbar System */}
      <MD3Snackbar
        snackbar={snackbar}
        onClose={() => setSnackbar(null)}
      />

      {/* Android App APK & PWA Modal */}
      <AndroidAppModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        isAndroidSimulated={isAndroidSimulated}
        setIsAndroidSimulated={setIsAndroidSimulated}
        deferredInstallPrompt={deferredInstallPrompt}
        onShowSnackbar={(msg, type) => showSnackbar(msg, type)}
        theme={theme}
      />

      {/* Tutorial Completo & Ajuda Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        theme={theme}
      />

      {/* Sobre o Sublim Studio Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        theme={theme}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Login / Logout Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        darkMode={theme === 'dark'}
      />

      {/* WordArt & Nuvem de Palavras Modal */}
      {(() => {
        const activeEditingLayer = layers.find((l) => l.id === editingWordArtLayerId);
        let inferredConfig: WordArtConfig | undefined = undefined;

        if (activeEditingLayer) {
          const isBogusText = (txt: string) =>
            !txt || /^layer--?\d+/i.test(txt) || /^layer-wordart/i.test(txt) || /^layer-/i.test(txt);

          if (activeEditingLayer.wordArtConfig && Array.isArray(activeEditingLayer.wordArtConfig.words) && activeEditingLayer.wordArtConfig.words.length > 0) {
            const cleanWords = activeEditingLayer.wordArtConfig.words.filter((w) => w && w.text && !isBogusText(w.text));
            if (cleanWords.length > 0) {
              inferredConfig = {
                ...activeEditingLayer.wordArtConfig,
                words: cleanWords,
              };
            }
          }

          if (!inferredConfig) {
            let cleanedName = (activeEditingLayer.name || '')
              .replace(/WordArt\s*2?\s*/gi, '')
              .replace(/layer-wordart-\d+/gi, '')
              .replace(/layer--?\d+/gi, '')
              .replace(/layer-[a-z0-9_-]+/gi, '')
              .replace(/CANECA|CAMISETA|CORACAO|ESTRELA|COROA|FOGO|CIRCULO/gi, '')
              .trim();

            if (isBogusText(cleanedName)) {
              cleanedName = '';
            }

            const parsedWords = cleanedName
              .split(/[,;\n]+/)
              .map((w) => w.trim())
              .filter((w) => w && !isBogusText(w));

            const defaultWordList = [
              { id: '1', text: 'SUBLIMAÇÃO', weight: 10 },
              { id: '2', text: 'ESTAMPARIA', weight: 9 },
              { id: '3', text: 'QUALIDADE', weight: 8 },
              { id: '4', text: 'DESIGN', weight: 7 },
            ];

            inferredConfig = {
              words: parsedWords.length > 0
                ? parsedWords.map((txt, idx) => ({ id: String(idx + 1), text: txt, weight: Math.max(4, 10 - idx) }))
                : defaultWordList,
              shape: activeEditingLayer.wordArtConfig?.shape || 'caneca',
              font: activeEditingLayer.wordArtConfig?.font || 'Impact',
              paletteId: activeEditingLayer.wordArtConfig?.paletteId || 'vibrant',
              layoutMode: activeEditingLayer.wordArtConfig?.layoutMode || 'mixed',
              density: activeEditingLayer.wordArtConfig?.density || 75,
              wordArtType: activeEditingLayer.wordArtType || 'wordart1',
            };
          }
        }

        return (
          <>
            <WordArtModal
              isOpen={isWordArtModalOpen}
              onClose={() => {
                setIsWordArtModalOpen(false);
                setEditingWordArtLayerId(null);
              }}
              onAddWordArtImage={handleAddWordArtImageToCanvas}
              darkMode={theme === 'dark'}
              initialConfig={inferredConfig}
              isEditing={!!editingWordArtLayerId}
            />

            <WordArtModal2
              isOpen={isWordArtModal2Open}
              onClose={() => {
                setIsWordArtModal2Open(false);
                setEditingWordArtLayerId(null);
              }}
              onAddWordArtImage={handleAddWordArtImageToCanvas}
              theme={theme === 'dark' ? 'dark' : 'light'}
              initialConfig={inferredConfig}
              isEditing={!!editingWordArtLayerId}
            />
          </>
        );
      })()}

      {/* Testes Automatizados QA Modal */}
      <TestRunnerModal
        isOpen={isTestRunnerOpen}
        onClose={() => setIsTestRunnerOpen(false)}
        darkMode={theme === 'dark'}
      />

      {/* Configurações de IA Modal */}
      <AISettingsModal
        isOpen={isAISettingsOpen}
        onClose={() => setIsAISettingsOpen(false)}
        theme={theme}
      />

      {/* Canva Integration & Sublimation Templates Hub Modal */}
      <CanvaModal
        isOpen={isCanvaModalOpen}
        onClose={() => setIsCanvaModalOpen(false)}
        product={currentProduct}
        onImportImage={(imgUrl, title, options) => {
          handleImportFromCanva(imgUrl, title, options);
          setIsCanvaModalOpen(false);
        }}
        onLoadTemplateLayers={(name, templateLayers) => {
          handleLoadTemplateLayers(name, templateLayers);
          setIsCanvaModalOpen(false);
        }}
        theme={theme}
        onShowSnackbar={(msg, type) => showSnackbar(msg, type)}
      />

      {/* Global High-Resolution Image Preview Lightbox Modal */}
      {previewImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImageModal(null)}
        >
          <div
            className={`relative max-w-4xl w-full max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${
              theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#18181c] border-[#2f2f38] text-gray-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#121215] border-[#2f2f38]'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight text-purple-400">{previewImageModal.title}</h3>
                  <p className="text-[11px] text-gray-400">
                    Dimensões da Imagem: {previewImageModal.width} x {previewImageModal.height} px
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.download = `${previewImageModal.title.toLowerCase().replace(/\s+/g, '_')}.png`;
                    link.href = previewImageModal.url;
                    link.click();
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PNG HD</span>
                </button>
                <button
                  onClick={() => setPreviewImageModal(null)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                  title="Fechar (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High Resolution Canvas Checkerboard Image View */}
            <div className="flex-1 min-h-[350px] max-h-[70vh] p-6 flex items-center justify-center bg-[#09090b] relative overflow-auto select-none">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#383848_1px,transparent_1px)] [background-size:16px_16px]" />
              <img
                src={previewImageModal.url}
                alt={previewImageModal.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </div>

            {/* Footer */}
            <div className={`px-4 py-2.5 border-t text-xs flex items-center justify-between text-gray-400 ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#121215] border-[#2f2f38]'
            }`}>
              <span className="text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SublimStudio PRO • Visualizador de Imagem Alta Definição
              </span>
              <button
                onClick={() => setPreviewImageModal(null)}
                className="px-4 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-xs cursor-pointer transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
