import React, { useRef, useEffect, useState, useCallback } from 'react';
import { getAsset } from '../lib/imageAssetStore';
import { Layer, ToolType, ShapeType, SublimationProduct, LayerFilters } from '../types';
import { drawWarpedText } from '../utils/textWarp';
import { drawVectorShape } from '../utils/shapeDrawer';
import { ImageAdjustmentModal } from './ImageAdjustmentModal';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move,
  Grid,
  FlipHorizontal,
  FlipVertical,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  RotateCw,
  ArrowUpToLine,
  ArrowDownToLine,
  ChevronUp,
  ChevronDown,
  Lock,
  Unlock,
  AlignCenter,
  Layers,
  Square,
  Sparkles,
  Maximize,
  Sliders,
  Crop,
  Wand2,
  Download,
  Scissors,
  Zap,
  RotateCcw,
  Tablet,
  Smartphone,
  Laptop,
  Monitor,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Target,
  X,
  Clipboard,
  Type,
  Edit3,
  AlignLeft,
  AlignRight,
  Check,
  CheckSquare,
  RefreshCw,
  ImagePlus,
  MoveHorizontal
} from 'lucide-react';

interface CanvasAreaProps {
  product: SublimationProduct;
  layers: Layer[];
  activeLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayer: (updatedLayer: Layer) => void;
  onDeleteLayer?: (id: string) => void;
  onDuplicateLayer?: (id: string) => void;
  onReorderLayers?: (reorderedLayers: Layer[]) => void;
  onToggleLock?: (id: string) => void;
  onToggleVisibility?: (id: string) => void;
  onChangeColor?: (color: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  pushHistoryStep?: (description: string, toolName: string, updatedLayers: Layer[]) => void;
  activeTool: ToolType;
  selectedShape: ShapeType;
  activeColor: string;
  brushSize: number;
  mirrorSublimation: boolean;
  showGrid: boolean;
  showRulers: boolean;
  onCanvasRendered: (canvas: HTMLCanvasElement) => void;
  theme?: 'dark' | 'light';
  onPasteFromClipboard?: () => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  product,
  layers,
  activeLayerId,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onReorderLayers,
  onToggleLock,
  onToggleVisibility,
  onChangeColor,
  onUndo,
  onRedo,
  pushHistoryStep,
  activeTool,
  selectedShape,
  activeColor,
  brushSize,
  mirrorSublimation,
  showGrid,
  showRulers,
  onCanvasRendered,
  theme = 'dark',
  onPasteFromClipboard,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const replaceImageInputRef = useRef<HTMLInputElement>(null);
  const [replaceTargetLayerId, setReplaceTargetLayerId] = useState<string | null>(null);

  // Pan and Zoom infinite canvas transform states
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showTouchPad, setShowTouchPad] = useState<boolean>(true);
  const [showCutLine, setShowCutLine] = useState<boolean>(true);

  // Helper to add a vector cut line layer
  const handleAddCutLineLayer = (shapeType: 'cut_line_rect' | 'cut_line_circle' | 'cut_line_h' | 'cut_line_v' = 'cut_line_rect') => {
    const newId = 'layer-cut-' + Date.now();
    let name = 'Linha de Corte (Retângulo)';
    if (shapeType === 'cut_line_circle') name = 'Linha de Corte (Círculo)';
    if (shapeType === 'cut_line_h') name = 'Linha de Corte Horizontal';
    if (shapeType === 'cut_line_v') name = 'Linha de Corte Vertical';

    const margin = 15;
    const newLayer: Layer = {
      id: newId,
      name,
      type: 'shape',
      shapeType,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: shapeType === 'cut_line_h' ? 0 : margin,
      y: shapeType === 'cut_line_v' ? 0 : margin,
      width: shapeType === 'cut_line_v' ? 2 : baseCanvasWidth - margin * 2,
      height: shapeType === 'cut_line_h' ? 2 : baseCanvasHeight - margin * 2,
      rotation: 0,
      content: '',
      color: 'transparent',
      strokeColor: '#ef4444',
      strokeWidth: 2,
    };

    if (onUpdateLayer) onUpdateLayer(newLayer);
    if (onSelectLayer) onSelectLayer(newId);
    if (pushHistoryStep && layersRef.current) {
      pushHistoryStep(`Adicionou ${name}`, 'Linha de Corte', [...layersRef.current, newLayer]);
    }
  };

  // Canva Page Controls Handlers
  const handleToggleLockPage = () => {
    if (!layers || layers.length === 0) return;
    const allLocked = layers.every((l) => l.locked);
    const updated = layers.map((l) => ({ ...l, locked: !allLocked }));
    if (onReorderLayers) {
      onReorderLayers(updated);
    } else {
      updated.forEach((l) => onUpdateLayer(l));
    }
    if (pushHistoryStep) {
      pushHistoryStep(allLocked ? 'Desbloquear Página' : 'Bloquear Página', 'Canva Page', updated);
    }
  };

  const handleDuplicatePage = () => {
    if (!layers || layers.length === 0) return;
    const duplicated = layers.map((l) => ({
      ...l,
      id: 'dup-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      x: Math.min(baseCanvasWidth - 40, l.x + 15),
      y: Math.min(baseCanvasHeight - 40, l.y + 15),
    }));
    const newLayers = [...layers, ...duplicated];
    if (onReorderLayers) {
      onReorderLayers(newLayers);
    } else {
      duplicated.forEach((l) => onUpdateLayer(l));
    }
    if (pushHistoryStep) {
      pushHistoryStep('Duplicar Página', 'Canva Page', newLayers);
    }
  };

  const handleAddPage = () => {
    if (onReorderLayers) {
      onReorderLayers([]);
      if (onSelectLayer) onSelectLayer(null);
      if (pushHistoryStep) {
        pushHistoryStep('Adicionar Nova Página (Limpar)', 'Canva Page', []);
      }
    }
  };

  // Mouse interaction state
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  const hasTransformedRef = useRef(false);
  const latestTransformedLayersRef = useRef<Layer[] | null>(null);
  const layersRef = useRef(layers);
  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  const isDrawingRef = useRef(false);
  const currentPathRef = useRef<{ x: number; y: number }[]>([]);

  // Dragging or Transforming an Active Layer
  const isDraggingLayerRef = useRef(false);
  const layerDragOffsetRef = useRef({ x: 0, y: 0 });
  const isResizingModeRef = useRef<'tl' | 'tr' | 'bl' | 'br' | 'tc' | 'bc' | 'lc' | 'rc' | 'rotate' | null>(null);
  const resizeStartRef = useRef<{ mouseX: number; mouseY: number; x: number; y: number; w: number; h: number; rot: number; aspect: number } | null>(null);

  // Smart Alignment Guides State
  const activeGuidesRef = useRef<{ x?: number; y?: number }>({});

  // Touch Gesture & Multi-Touch State
  const activeTouchesRef = useRef<{ id: number; x: number; y: number }[]>([]);
  const initialPinchDistRef = useRef<number | null>(null);
  const initialPinchAngleRef = useRef<number | null>(null);
  const initialPinchCenterRef = useRef<{ x: number; y: number } | null>(null);
  const initialTouchLayerRotRef = useRef<number | null>(null);
  const longPressTimerRef = useRef<any>(null);
  const lastTapTimeRef = useRef<number>(0);
  const lastTapLayerIdRef = useRef<string | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);

  // Multi-Selection & Marquee Box Selection State
  const [selectedLayerIds, setSelectedLayerIds] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState<boolean>(false);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  const isSelectingBoxRef = useRef<boolean>(false);
  const selectionBoxStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const multiDragStartPositionsRef = useRef<{ id: string; x: number; y: number }[]>([]);
  const multiDragMouseStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isGroupResizingRef = useRef<string | null>(null);
  const groupResizeStartRef = useRef<{
    mouseX: number;
    mouseY: number;
    minX: number;
    minY: number;
    groupW: number;
    groupH: number;
    initialLayers: { id: string; x: number; y: number; w: number; h: number; fontSize?: number }[];
  } | null>(null);

  // Sync selectedLayerIds with activeLayerId when changed from parent or single selection
  useEffect(() => {
    if (activeLayerId) {
      if (!selectedLayerIds.includes(activeLayerId) && selectedLayerIds.length <= 1) {
        setSelectedLayerIds([activeLayerId]);
      }
    } else {
      if (selectedLayerIds.length <= 1) {
        setSelectedLayerIds([]);
      }
    }
  }, [activeLayerId]);

  // Image Adjustment Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [modalDefaultTab, setModalDefaultTab] = useState<'adjustments' | 'crop' | 'filters' | 'smart' | 'words'>('adjustments');

  useEffect(() => {
    const handleOpenModal = (e: any) => {
      const tab = e.detail?.tab || 'adjustments';
      setModalDefaultTab(tab);
      setIsImageModalOpen(true);
    };
    window.addEventListener('openImageAdjustmentModal', handleOpenModal);
    (window as any).openImageAdjustmentModal = (tab?: 'adjustments' | 'crop' | 'filters' | 'smart' | 'words') => {
      setModalDefaultTab(tab || 'adjustments');
      setIsImageModalOpen(true);
    };
    return () => {
      window.removeEventListener('openImageAdjustmentModal', handleOpenModal);
      delete (window as any).openImageAdjustmentModal;
    };
  }, []);

  // Dynamic Mouse Cursor State
  const [cursorStyle, setCursorStyle] = useState<string>('crosshair');

  // Inline Canvas Text Editing State
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  useEffect(() => {
    if (activeLayerId) {
      const l = layers.find((layer) => layer.id === activeLayerId);
      if (!l || l.type !== 'text') {
        setEditingTextId(null);
      }
    } else {
      setEditingTextId(null);
    }
  }, [activeLayerId, layers]);

  // Image Lightbox Preview State
  const [previewImageModal, setPreviewImageModal] = useState<{
    url: string;
    title: string;
    width: number;
    height: number;
  } | null>(null);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    layerId: string | null;
  } | null>(null);

  useEffect(() => {
    const handleGlobalClick = () => {
      if (contextMenu) {
        setContextMenu(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement;

      if (e.key === 'Escape') {
        setContextMenu(null);
        setEditingTextId(null);
        setPreviewImageModal(null);
        setSelectedLayerIds([]);
        onSelectLayer(null);
      } else if (e.key === 'F2' || e.key === 'f2') {
        if (activeLayerId) {
          const activeL = layers.find((l) => l.id === activeLayerId);
          if (activeL && activeL.type === 'text') {
            e.preventDefault();
            setEditingTextId(activeL.id);
          }
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A')) {
        if (!isInput) {
          e.preventDefault();
          const selectable = layers.filter((l) => l.visible && !l.locked).map((l) => l.id);
          if (selectable.length > 0) {
            setSelectedLayerIds(selectable);
            onSelectLayer(selectable[selectable.length - 1]);
          }
        }
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedLayerIds.length > 1) {
        if (!isInput) {
          e.preventDefault();
          deleteSelectedLayers();
        }
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && selectedLayerIds.length > 0) {
        if (!isInput) {
          e.preventDefault();
          const step = e.shiftKey ? 10 : 2;
          let dx = 0, dy = 0;
          if (e.key === 'ArrowLeft') dx = -step;
          if (e.key === 'ArrowRight') dx = step;
          if (e.key === 'ArrowUp') dy = -step;
          if (e.key === 'ArrowDown') dy = step;
          handleMoveActiveLayer(dx, dy);
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu, activeLayerId, layers]);

  // Context Menu Action Handlers
  const handleBringToFront = (id: string) => {
    if (!onReorderLayers) return;
    const index = layers.findIndex((l) => l.id === id);
    if (index === -1 || index === layers.length - 1) return;
    const newLayers = [...layers];
    const [removed] = newLayers.splice(index, 1);
    newLayers.push(removed);
    onReorderLayers(newLayers);
    setContextMenu(null);
  };

  const handleSendToBack = (id: string) => {
    if (!onReorderLayers) return;
    const index = layers.findIndex((l) => l.id === id);
    if (index === -1 || index === 0) return;
    const newLayers = [...layers];
    const [removed] = newLayers.splice(index, 1);
    newLayers.unshift(removed);
    onReorderLayers(newLayers);
    setContextMenu(null);
  };

  const handleBringForward = (id: string) => {
    if (!onReorderLayers) return;
    const index = layers.findIndex((l) => l.id === id);
    if (index === -1 || index === layers.length - 1) return;
    const newLayers = [...layers];
    const temp = newLayers[index];
    newLayers[index] = newLayers[index + 1];
    newLayers[index + 1] = temp;
    onReorderLayers(newLayers);
    setContextMenu(null);
  };

  const handleSendBackward = (id: string) => {
    if (!onReorderLayers) return;
    const index = layers.findIndex((l) => l.id === id);
    if (index === -1 || index === 0) return;
    const newLayers = [...layers];
    const temp = newLayers[index];
    newLayers[index] = newLayers[index - 1];
    newLayers[index - 1] = temp;
    onReorderLayers(newLayers);
    setContextMenu(null);
  };

  const handleCenterLayer = (id: string) => {
    const layer = layers.find((l) => l.id === id);
    if (!layer) return;
    const printWidth = Math.round((product.defaultWidthCm / 2.54) * 150);
    const printHeight = Math.round((product.defaultHeightCm / 2.54) * 150);
    onUpdateLayer({
      ...layer,
      x: Math.round((printWidth - layer.width) / 2),
      y: Math.round((printHeight - layer.height) / 2),
    });
    setContextMenu(null);
  };

  const handleFlipHorizontal = (id: string) => {
    const layer = layers.find((l) => l.id === id);
    if (!layer) return;
    onUpdateLayer({
      ...layer,
      flipX: !layer.flipX,
    });
    setContextMenu(null);
  };

  const handleFlipVertical = (id: string) => {
    const layer = layers.find((l) => l.id === id);
    if (!layer) return;
    onUpdateLayer({
      ...layer,
      flipY: !layer.flipY,
    });
    setContextMenu(null);
  };

  const handleFillPrintArea = (id: string) => {
    const layer = layers.find((l) => l.id === id);
    if (!layer) return;
    const printWidth = Math.round((product.defaultWidthCm / 2.54) * 150);
    const printHeight = Math.round((product.defaultHeightCm / 2.54) * 150);
    const updated = {
      ...layer,
      x: 0,
      y: 0,
      width: printWidth,
      height: printHeight,
    };
    onUpdateLayer(updated);
    if (pushHistoryStep) {
      pushHistoryStep('Preencher Área Total da Estampa', 'Preencher Estampa', layers.map((l) => (l.id === updated.id ? updated : l)));
    }
    setContextMenu(null);
  };

  // Adjust specific layer to fit the full width of the canvas page proportionally
  const handleFitLayerToWidth = (id: string) => {
    const layer = layers.find((l) => l.id === id);
    if (!layer) return;
    const printWidth = Math.round((product.defaultWidthCm / 2.54) * 150);
    const printHeight = Math.round((product.defaultHeightCm / 2.54) * 150);

    if (layer.type === 'text') {
      const scale = (printWidth * 0.94) / Math.max(10, layer.width || 100);
      const newFontSize = layer.fontSize ? Math.max(10, Math.min(240, Math.round(layer.fontSize * scale))) : 36;
      const newW = Math.round(printWidth * 0.94);
      const newH = Math.round((layer.height || 40) * scale);
      const newX = Math.round((printWidth - newW) / 2);
      const updated: Layer = {
        ...layer,
        x: newX,
        width: newW,
        height: newH,
        fontSize: newFontSize,
      };
      onUpdateLayer(updated);
      if (pushHistoryStep) {
        pushHistoryStep('Ajustou Texto na Largura da Página', 'Ajustar Largura', layers.map((l) => (l.id === updated.id ? updated : l)));
      }
    } else {
      const aspect = (layer.width || 1) / Math.max(1, layer.height || 1);
      let newW = printWidth;
      let newH = Math.round(printWidth / aspect);
      let newY = Math.round((printHeight - newH) / 2);
      if (newH > printHeight * 1.05) {
        newH = printHeight;
        newW = Math.round(printHeight * aspect);
        newY = 0;
      }
      const newX = Math.round((printWidth - newW) / 2);
      const updated: Layer = {
        ...layer,
        x: newX,
        y: newY,
        width: Math.max(20, newW),
        height: Math.max(20, newH),
      };
      onUpdateLayer(updated);
      if (pushHistoryStep) {
        pushHistoryStep('Ajustou na Largura da Página', 'Ajustar Largura', layers.map((l) => (l.id === updated.id ? updated : l)));
      }
    }
    setContextMenu(null);
  };

  // Adjust all layers in the design/template to fit page width and height
  const handleFitAllLayersToPageWidth = () => {
    if (!layers || layers.length === 0) return;
    const printWidth = Math.round((product.defaultWidthCm / 2.54) * 150);
    const printHeight = Math.round((product.defaultHeightCm / 2.54) * 150);

    const bgLayer = layers.find(
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
      const minX = Math.min(...layers.map((l) => l.x));
      const minY = Math.min(...layers.map((l) => l.y));
      const maxX = Math.max(...layers.map((l) => l.x + (l.width || 0)));
      const maxY = Math.max(...layers.map((l) => l.y + (l.height || 0)));

      refWidth = maxX > minX ? maxX : printWidth;
      refHeight = maxY > minY ? maxY : printHeight;
    }

    if (refWidth < 200) refWidth = 756;
    if (refHeight < 100) refHeight = 359;

    const scaleX = printWidth / refWidth;
    const scaleY = printHeight / refHeight;
    const avgScale = (scaleX + scaleY) / 2;

    const updatedLayers: Layer[] = layers.map((layer) => {
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
          width: printWidth,
          height: printHeight,
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

    if (onReorderLayers) {
      onReorderLayers(updatedLayers);
    } else {
      updatedLayers.forEach((l) => onUpdateLayer(l));
    }
    if (pushHistoryStep) {
      pushHistoryStep('Ajustou Modelo na Largura da Página', 'Ajustar Modelo', updatedLayers);
    }
  };

  // Adjust multi-selected layers to fit page width
  const handleFitSelectedToPageWidth = () => {
    const targetLayers = layers.filter((l) => selectedLayerIds.includes(l.id));
    if (targetLayers.length === 0) return;
    const printWidth = Math.round((product.defaultWidthCm / 2.54) * 150);

    const minX = Math.min(...targetLayers.map((l) => l.x));
    const maxX = Math.max(...targetLayers.map((l) => l.x + l.width));
    const currentGroupW = Math.max(10, maxX - minX);

    const scale = (printWidth * 0.96) / currentGroupW;

    targetLayers.forEach((l) => {
      const relX = l.x - minX;
      const newX = Math.round(printWidth * 0.02 + relX * scale);
      const newW = Math.max(10, Math.round(l.width * scale));
      const newH = Math.max(10, Math.round(l.height * scale));
      const updated: Layer = {
        ...l,
        x: newX,
        width: newW,
        height: newH,
      };
      if (l.type === 'text' && l.fontSize) {
        updated.fontSize = Math.max(8, Math.round(l.fontSize * scale));
      }
      onUpdateLayer(updated);
    });

    if (pushHistoryStep) {
      pushHistoryStep('Ajustou Seleção na Largura da Página', 'Ajustar Largura', layers);
    }
  };

  // Device-Specific Image / Layer Resizing Handlers (Tablet, Android, macOS)
  const handleResizeForDevice = (id: string, device: 'tablet' | 'android' | 'macos' | 'fit') => {
    const layer = layers.find((l) => l.id === id);
    if (!layer) return;

    const printWidth = Math.round((product.defaultWidthCm / 2.54) * 150);
    const printHeight = Math.round((product.defaultHeightCm / 2.54) * 150);

    let targetW = layer.width;
    let targetH = layer.height;

    // Preserve aspect ratio if layer has valid dimensions
    const currentAspect = layer.width / (layer.height || 1);

    if (device === 'tablet') {
      // Tablet format (iPad / Android Tablet 4:3 target)
      targetW = Math.min(800, Math.round(printWidth * 0.65));
      targetH = Math.round(targetW / (currentAspect || (4 / 3)));
      if (targetH > printHeight * 0.8) {
        targetH = Math.round(printHeight * 0.8);
        targetW = Math.round(targetH * (currentAspect || (4 / 3)));
      }
    } else if (device === 'android') {
      // Android Mobile format (9:16 vertical ratio)
      targetW = Math.min(480, Math.round(printWidth * 0.45));
      targetH = Math.round(targetW / (currentAspect || (9 / 16)));
      if (targetH > printHeight * 0.85) {
        targetH = Math.round(printHeight * 0.85);
        targetW = Math.round(targetH * (currentAspect || (9 / 16)));
      }
    } else if (device === 'macos') {
      // macOS / Laptop Retina format (16:10 or desktop ratio)
      targetW = Math.min(1280, Math.round(printWidth * 0.90));
      targetH = Math.round(targetW / (currentAspect || (16 / 10)));
      if (targetH > printHeight * 0.9) {
        targetH = Math.round(printHeight * 0.9);
        targetW = Math.round(targetH * (currentAspect || (16 / 10)));
      }
    } else if (device === 'fit') {
      // Fit completely within print canvas
      targetW = printWidth;
      targetH = printHeight;
    }

    // Center resized layer in print canvas
    const newX = Math.round((printWidth - targetW) / 2);
    const newY = Math.round((printHeight - targetH) / 2);

    const updated = {
      ...layer,
      x: newX,
      y: newY,
      width: Math.max(50, targetW),
      height: Math.max(50, targetH),
    };

    onUpdateLayer(updated);
    if (pushHistoryStep) {
      const label = device === 'tablet' ? 'Tablet (iPad)' : device === 'android' ? 'Android Mobile' : device === 'macos' ? 'macOS Retina' : 'Área Total';
      const newLayers = layers.map((l) => (l.id === updated.id ? updated : l));
      pushHistoryStep(`Redimensionado para ${label}`, 'Redimensionar', newLayers);
    }
    setContextMenu(null);
  };

  // Multi-Selection Helper Actions (Alignment, Duplicate, Delete)
  const alignSelectedLayers = (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    const targetLayers = layers.filter((l) => selectedLayerIds.includes(l.id));
    if (targetLayers.length < 2) return;

    let minX = Math.min(...targetLayers.map((l) => l.x));
    let maxX = Math.max(...targetLayers.map((l) => l.x + l.width));
    let minY = Math.min(...targetLayers.map((l) => l.y));
    let maxY = Math.max(...targetLayers.map((l) => l.y + l.height));

    const groupCenterX = (minX + maxX) / 2;
    const groupCenterY = (minY + maxY) / 2;

    const newLayers = layers.map((l) => {
      if (!selectedLayerIds.includes(l.id)) return l;
      let newX = l.x;
      let newY = l.y;

      if (alignment === 'left') newX = minX;
      if (alignment === 'right') newX = maxX - l.width;
      if (alignment === 'center') newX = Math.round(groupCenterX - l.width / 2);

      if (alignment === 'top') newY = minY;
      if (alignment === 'bottom') newY = maxY - l.height;
      if (alignment === 'middle') newY = Math.round(groupCenterY - l.height / 2);

      return { ...l, x: newX, y: newY };
    });

    if (onReorderLayers) {
      onReorderLayers(newLayers);
    } else {
      newLayers.filter((l) => selectedLayerIds.includes(l.id)).forEach((l) => onUpdateLayer(l));
    }

    if (pushHistoryStep) {
      pushHistoryStep(`Alinhamento de ${targetLayers.length} itens (${alignment})`, 'Alinhar Múltiplos', newLayers);
    }
  };

  const duplicateSelectedLayers = () => {
    if (selectedLayerIds.length === 0) return;
    const newIds: string[] = [];
    const duplicatedLayers: Layer[] = [];

    selectedLayerIds.forEach((id) => {
      const layer = layers.find((l) => l.id === id);
      if (layer) {
        const newId = 'layer-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
        const duplicated: Layer = {
          ...layer,
          id: newId,
          name: layer.name + ' (Cópia)',
          x: layer.x + 20,
          y: layer.y + 20,
        };
        duplicatedLayers.push(duplicated);
        newIds.push(newId);
      }
    });

    if (duplicatedLayers.length > 0) {
      const allLayers = [...layers, ...duplicatedLayers];
      if (onReorderLayers) {
        onReorderLayers(allLayers);
      } else {
        duplicatedLayers.forEach((l) => onUpdateLayer(l));
      }
      setSelectedLayerIds(newIds);
      onSelectLayer(newIds[newIds.length - 1]);
    }
  };

  const deleteSelectedLayers = () => {
    if (selectedLayerIds.length === 0) return;

    const remaining = layers.filter((l) => !selectedLayerIds.includes(l.id));
    if (onReorderLayers) {
      onReorderLayers(remaining);
    } else {
      selectedLayerIds.forEach((id) => {
        if (onDeleteLayer) onDeleteLayer(id);
      });
    }

    setSelectedLayerIds([]);
    onSelectLayer(null);
  };

  // Incremental Scale Handler (+ and - buttons) for selected layer/element or multi-selection
  const handleScaleActiveLayer = (deltaPercent: number) => {
    const targetIds = selectedLayerIds.length > 0 ? selectedLayerIds : (activeLayerId ? [activeLayerId] : []);
    if (targetIds.length === 0) return;

    const factor = 1 + deltaPercent / 100;
    const newLayers = layers.map((layer) => {
      if (!targetIds.includes(layer.id)) return layer;

      const newW = Math.max(20, Math.round(layer.width * factor));
      const newH = Math.max(20, Math.round(layer.height * factor));

      // Center expansion / contraction
      const dx = Math.round((newW - layer.width) / 2);
      const dy = Math.round((newH - layer.height) / 2);

      const updated: Layer = {
        ...layer,
        width: newW,
        height: newH,
        x: Math.round(layer.x - dx),
        y: Math.round(layer.y - dy),
      };

      if (layer.type === 'text' && layer.fontSize) {
        updated.fontSize = Math.max(8, Math.round(layer.fontSize * factor));
      }

      return updated;
    });

    if (onReorderLayers) {
      onReorderLayers(newLayers);
    } else {
      newLayers.filter((l) => targetIds.includes(l.id)).forEach((l) => onUpdateLayer(l));
    }
  };

  // Directional Position Nudge Handler for Mobile Touch / Arrow Buttons or Multi-Selection Move
  const handleMoveActiveLayer = (dx: number, dy: number) => {
    const targetIds = selectedLayerIds.length > 0 ? selectedLayerIds : (activeLayerId ? [activeLayerId] : []);
    if (targetIds.length === 0) return;

    const newLayers = layers.map((layer) => {
      if (!targetIds.includes(layer.id)) return layer;

      return {
        ...layer,
        x: Math.round(layer.x + dx),
        y: Math.round(layer.y + dy),
      };
    });

    if (onReorderLayers) {
      onReorderLayers(newLayers);
    } else {
      newLayers.filter((l) => targetIds.includes(l.id)).forEach((l) => onUpdateLayer(l));
    }
  };

  // Export selected layer object as PNG
  const handleExportLayerAsImage = (id: string) => {
    const layer = layers.find((l) => l.id === id);
    if (!layer) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = layer.width;
    exportCanvas.height = layer.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    if (layer.content && (layer.type === 'image' || layer.type === 'smart')) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = layer.content;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, layer.width, layer.height);
        const link = document.createElement('a');
        link.download = `${layer.name.toLowerCase().replace(/\s+/g, '_')}.png`;
        link.href = exportCanvas.toDataURL('image/png');
        link.click();
      };
    }
  };

  // Trigger file dialog to replace current image layer
  const handleTriggerReplaceImage = (id: string) => {
    setReplaceTargetLayerId(id);
    setContextMenu(null);
    if (replaceImageInputRef.current) {
      replaceImageInputRef.current.value = '';
      replaceImageInputRef.current.click();
    }
  };

  // Handle new image file chosen to replace layer
  const handleReplaceImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replaceTargetLayerId) return;

    const targetLayer = layers.find((l) => l.id === replaceTargetLayerId);
    if (!targetLayer) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const resultUrl = event.target?.result as string;
      if (!resultUrl) return;

      const img = new Image();
      img.onload = () => {
        const currentCenterX = targetLayer.x + targetLayer.width / 2;
        const currentCenterY = targetLayer.y + targetLayer.height / 2;
        
        const aspectRatio = (img.naturalWidth || targetLayer.width) / (img.naturalHeight || targetLayer.height);
        let newWidth = targetLayer.width;
        let newHeight = targetLayer.height;

        if (aspectRatio > 0 && Math.abs(newWidth / newHeight - aspectRatio) > 0.05) {
          // Adjust height to preserve original aspect ratio of incoming image
          newHeight = Math.round(newWidth / aspectRatio);
        }

        const newName = file.name.replace(/\.[^/.]+$/, '');
        const updated: Layer = {
          ...targetLayer,
          content: resultUrl,
          name: `Foto: ${newName}`,
          width: newWidth,
          height: newHeight,
          x: Math.round(currentCenterX - newWidth / 2),
          y: Math.round(currentCenterY - newHeight / 2),
        };

        onUpdateLayer(updated);
        const newLayers = layers.map((l) => (l.id === updated.id ? updated : l));
        if (pushHistoryStep) {
          pushHistoryStep(`Substituiu Imagem: ${newName}`, 'replace_image', newLayers);
        }
      };
      img.src = resultUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Search top-to-bottom for layer clicked
    const clickedLayer = [...layers].reverse().find((layer) => {
      if (!layer.visible) return false;
      return (
        mouseX >= layer.x &&
        mouseX <= layer.x + layer.width &&
        mouseY >= layer.y &&
        mouseY <= layer.y + layer.height
      );
    });

    if (clickedLayer) {
      onSelectLayer(clickedLayer.id);
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        layerId: clickedLayer.id,
      });
    } else {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        layerId: activeLayerId,
      });
    }
  };

  const handleDoubleClickCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const clickedLayer = [...layers].reverse().find((layer) => {
      if (!layer.visible) return false;
      return (
        mouseX >= layer.x &&
        mouseX <= layer.x + layer.width &&
        mouseY >= layer.y &&
        mouseY <= layer.y + layer.height
      );
    });

    if (clickedLayer) {
      onSelectLayer(clickedLayer.id);
      if (clickedLayer.type === 'text') {
        setEditingTextId(clickedLayer.id);
      } else if (clickedLayer.type === 'image' || clickedLayer.type === 'smart') {
        setModalDefaultTab('adjustments');
        setIsImageModalOpen(true);
      }
    }
  };

  // Physical Printable Area Dimensions mapped to pixel canvas
  const baseCanvasWidth = Math.round((product.defaultWidthCm / 2.54) * 150); // High res canvas
  const baseCanvasHeight = Math.round((product.defaultHeightCm / 2.54) * 150);

  // Image cache to prevent recreating HTMLImageElement on every render
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Auto-Fit canvas to viewport container
  const fitToScreen = useCallback(() => {
    if (!containerRef.current) return;
    const isMobileScreen = containerRef.current.clientWidth < 640;
    const padding = isMobileScreen ? 16 : 60;
    const cWidth = containerRef.current.clientWidth - padding;
    const cHeight = containerRef.current.clientHeight - padding;
    if (cWidth <= 0 || cHeight <= 0) return;

    const scaleX = cWidth / baseCanvasWidth;
    const scaleY = cHeight / baseCanvasHeight;
    const fitZoom = Math.min(scaleX, scaleY, 1.2);

    setZoom(Math.max(0.15, Math.round(fitZoom * 100) / 100));
    setPan({ x: 0, y: 0 });
  }, [baseCanvasWidth, baseCanvasHeight]);

  const handleWheelContainer = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.cancelable) e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((prev) => {
        const next = Math.min(4.0, Math.max(0.1, prev * zoomFactor));
        return Math.round(next * 100) / 100;
      });
    }
  };

  // TOUCH GESTURE HANDLERS (1, 2, 3 fingers)
  const handleTouchStartContainer = (e: React.TouchEvent<HTMLDivElement>) => {
    const touches = Array.from(e.touches) as React.Touch[];

    if (touches.length >= 2) {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      if (e.cancelable) e.preventDefault();
    }

    // 3 Finger Touch -> Undo or Reset Zoom
    if (touches.length === 3) {
      if (onUndo) {
        onUndo();
      } else {
        fitToScreen();
      }
      if ('vibrate' in navigator) navigator.vibrate?.([30, 20, 30]);
      return;
    }

    // 2 Finger Touch -> Pinch Zoom + 2-Finger Pan + 2-Finger Layer Rotation
    if (touches.length === 2) {
      const t1 = touches[0];
      const t2 = touches[1];

      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const angle = Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * (180 / Math.PI);
      const center = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };

      initialPinchDistRef.current = dist;
      initialPinchAngleRef.current = angle;
      initialPinchCenterRef.current = center;

      const activeL = layers.find((l) => l.id === activeLayerId);
      initialTouchLayerRotRef.current = activeL ? activeL.rotation : null;
      return;
    }

    // 1 Finger Touch -> Selection, Dragging, Long-Press Timer, Double Tap Check
    if (touches.length === 1) {
      const touch = touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const touchX = (touch.clientX - rect.left) * scaleX;
      const touchY = (touch.clientY - rect.top) * scaleY;

      touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };

      // Check handle hit on active layer first
      if (activeLayerId) {
        const activeL = layers.find((l) => l.id === activeLayerId);
        if (activeL && activeL.visible) {
          const centerX = activeL.x + activeL.width / 2;
          const centerY = activeL.y + activeL.height / 2;
          const rad = (-activeL.rotation * Math.PI) / 180;
          const dx = touchX - centerX;
          const dy = touchY - centerY;
          const localX = dx * Math.cos(rad) - dy * Math.sin(rad) + activeL.width / 2;
          const localY = dx * Math.sin(rad) + dy * Math.cos(rad) + activeL.height / 2;

          const hitHandle = getHandleAtLocalPos(localX, localY, activeL.width, activeL.height);
          if (hitHandle) {
            isResizingModeRef.current = hitHandle;
            resizeStartRef.current = {
              mouseX: touchX,
              mouseY: touchY,
              x: activeL.x,
              y: activeL.y,
              w: activeL.width,
              h: activeL.height,
              rot: activeL.rotation,
              aspect: activeL.width / (activeL.height || 1),
            };
            return;
          }
        }
      }

      // Find touched layer top-to-bottom
      const touchedLayer = [...layers].reverse().find((l) => {
        if (!l.visible) return false;
        return (
          touchX >= l.x &&
          touchX <= l.x + l.width &&
          touchY >= l.y &&
          touchY <= l.y + l.height
        );
      });

      if (touchedLayer) {
        onSelectLayer(touchedLayer.id);
        isDraggingLayerRef.current = true;
        layerDragOffsetRef.current = {
          x: touchX - touchedLayer.x,
          y: touchY - touchedLayer.y,
        };
      }

      // Start Long-Press Timer (500ms for Context Menu)
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = setTimeout(() => {
        if ('vibrate' in navigator) navigator.vibrate?.(40);
        setContextMenu({
          x: touch.clientX,
          y: touch.clientY,
          layerId: touchedLayer ? touchedLayer.id : activeLayerId,
        });
      }, 500);

      // Check Double Tap (<300ms) for Image Editing Modal
      const now = Date.now();
      if (
        touchedLayer &&
        touchedLayer.id === lastTapLayerIdRef.current &&
        now - lastTapTimeRef.current < 300
      ) {
        if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
        if (touchedLayer.type === 'image' || touchedLayer.type === 'smart') {
          onSelectLayer(touchedLayer.id);
          setModalDefaultTab('adjustments');
          setIsImageModalOpen(true);
          if ('vibrate' in navigator) navigator.vibrate?.(25);
        } else if (touchedLayer.type === 'text') {
          onSelectLayer(touchedLayer.id);
          setEditingTextId(touchedLayer.id);
          if ('vibrate' in navigator) navigator.vibrate?.(25);
        }
      }

      lastTapTimeRef.current = now;
      lastTapLayerIdRef.current = touchedLayer ? touchedLayer.id : null;
    }
  };

  const handleTouchMoveContainer = (e: React.TouchEvent<HTMLDivElement>) => {
    const touches = Array.from(e.touches) as React.Touch[];

    if (touches.length > 1) {
      if (e.cancelable) e.preventDefault();
    }

    // If moved > 8px, cancel long press context menu
    if (touches.length === 1 && touchStartPosRef.current) {
      const touch = touches[0];
      const distMoved = Math.hypot(
        touch.clientX - touchStartPosRef.current.x,
        touch.clientY - touchStartPosRef.current.y
      );
      if (distMoved > 8 && longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }

    // 2 Finger Pinch / Pan / Rotate
    if (touches.length === 2 && initialPinchDistRef.current !== null) {
      const t1 = touches[0];
      const t2 = touches[1];
      const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const currentAngle = Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * (180 / Math.PI);
      const center = {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2,
      };

      const deltaDist = currentDist - initialPinchDistRef.current;
      if (Math.abs(deltaDist) > 3) {
        const factor = deltaDist > 0 ? 1.025 : 0.975;
        setZoom((prev) => Math.min(4.0, Math.max(0.1, Math.round(prev * factor * 100) / 100)));
        initialPinchDistRef.current = currentDist;
      }

      if (initialPinchCenterRef.current) {
        const deltaX = center.x - initialPinchCenterRef.current.x;
        const deltaY = center.y - initialPinchCenterRef.current.y;
        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
          setPan((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
          initialPinchCenterRef.current = center;
        }
      } else {
        initialPinchCenterRef.current = center;
      }

      // 2 Finger Active Layer Rotation
      if (activeLayerId && initialPinchAngleRef.current !== null && initialTouchLayerRotRef.current !== null) {
        const activeL = layers.find((l) => l.id === activeLayerId);
        if (activeL) {
          const angleDelta = currentAngle - initialPinchAngleRef.current;
          let newRot = Math.round(initialTouchLayerRotRef.current + angleDelta);
          if (newRot < 0) newRot += 360;
          onUpdateLayer({ ...activeL, rotation: newRot % 360 });
        }
      }
      return;
    }

    // 1 Finger Touch Move -> Resizing via Handle or Dragging Layer
    if (touches.length === 1) {
      const touch = touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const touchX = (touch.clientX - rect.left) * scaleX;
      const touchY = (touch.clientY - rect.top) * scaleY;

      // 1. Resizing active layer via touch handle
      if (isResizingModeRef.current && activeLayerId && resizeStartRef.current) {
        const activeLayer = layers.find((l) => l.id === activeLayerId);
        if (activeLayer) {
          const init = resizeStartRef.current;
          if (isResizingModeRef.current === 'rotate') {
            const centerX = init.x + init.w / 2;
            const centerY = init.y + init.h / 2;
            let angle = Math.atan2(touchY - centerY, touchX - centerX) * (180 / Math.PI) + 90;
            if (angle < 0) angle += 360;
            onUpdateLayer({ ...activeLayer, rotation: Math.round(angle) });
            return;
          }

          const handle = isResizingModeRef.current;
          const rad = (init.rot * Math.PI) / 180;
          const dx = touchX - init.mouseX;
          const dy = touchY - init.mouseY;

          const localDx = dx * Math.cos(-rad) - dy * Math.sin(-rad);
          const localDy = dx * Math.sin(-rad) + dy * Math.cos(-rad);

          let newW = init.w;
          let newH = init.h;
          let localOffsetX = 0;
          let localOffsetY = 0;

          const isImage = activeLayer.type === 'image' || activeLayer.type === 'smart';
          const keepAspect = isImage;

          switch (handle) {
            case 'br': {
              newW = Math.max(20, Math.round(init.w + localDx));
              newH = keepAspect ? Math.max(20, Math.round(newW / init.aspect)) : Math.max(20, Math.round(init.h + localDy));
              break;
            }
            case 'tl': {
              newW = Math.max(20, Math.round(init.w - localDx));
              newH = keepAspect ? Math.max(20, Math.round(newW / init.aspect)) : Math.max(20, Math.round(init.h - localDy));
              localOffsetX = -(newW - init.w);
              localOffsetY = -(newH - init.h);
              break;
            }
            case 'tr': {
              newW = Math.max(20, Math.round(init.w + localDx));
              newH = keepAspect ? Math.max(20, Math.round(newW / init.aspect)) : Math.max(20, Math.round(init.h - localDy));
              localOffsetX = 0;
              localOffsetY = -(newH - init.h);
              break;
            }
            case 'bl': {
              newW = Math.max(20, Math.round(init.w - localDx));
              newH = keepAspect ? Math.max(20, Math.round(newW / init.aspect)) : Math.max(20, Math.round(init.h + localDy));
              localOffsetX = -(newW - init.w);
              localOffsetY = 0;
              break;
            }
            case 'tc': {
              newH = Math.max(20, Math.round(init.h - localDy));
              localOffsetY = -(newH - init.h);
              break;
            }
            case 'bc': {
              newH = Math.max(20, Math.round(init.h + localDy));
              break;
            }
            case 'lc': {
              newW = Math.max(20, Math.round(init.w - localDx));
              localOffsetX = -(newW - init.w);
              break;
            }
            case 'rc': {
              newW = Math.max(20, Math.round(init.w + localDx));
              break;
            }
          }

          const worldDx = localOffsetX * Math.cos(rad) - localOffsetY * Math.sin(rad);
          const worldDy = localOffsetX * Math.sin(rad) + localOffsetY * Math.cos(rad);

          onUpdateLayer({
            ...activeLayer,
            x: Math.round(init.x + worldDx),
            y: Math.round(init.y + worldDy),
            width: newW,
            height: newH,
          });
          return;
        }
      }

      // 2. Dragging active layer on touch move
      if (isDraggingLayerRef.current && activeLayerId) {
        const activeLayer = layers.find((l) => l.id === activeLayerId);
        if (activeLayer) {
          let newX = Math.round(touchX - layerDragOffsetRef.current.x);
          let newY = Math.round(touchY - layerDragOffsetRef.current.y);

          // Snap guidelines
          const centerX = newX + activeLayer.width / 2;
          const centerY = newY + activeLayer.height / 2;
          const canvasCenterX = baseCanvasWidth / 2;
          const canvasCenterY = baseCanvasHeight / 2;

          const snapThreshold = 10;
          const guides: { x?: number; y?: number } = {};

          if (Math.abs(centerX - canvasCenterX) < snapThreshold) {
            newX = Math.round(canvasCenterX - activeLayer.width / 2);
            guides.x = canvasCenterX;
          }
          if (Math.abs(centerY - canvasCenterY) < snapThreshold) {
            newY = Math.round(canvasCenterY - activeLayer.height / 2);
            guides.y = canvasCenterY;
          }

          activeGuidesRef.current = guides;

          onUpdateLayer({
            ...activeLayer,
            x: newX,
            y: newY,
          });
        }
      }
    }
  };

  const handleTouchEndContainer = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    isDraggingLayerRef.current = false;
    isResizingModeRef.current = null;
    resizeStartRef.current = null;
    activeGuidesRef.current = {};
    initialPinchDistRef.current = null;
    initialPinchAngleRef.current = null;
    initialPinchCenterRef.current = null;
    initialTouchLayerRotRef.current = null;
    touchStartPosRef.current = null;
    handleMouseUp();
  };

  useEffect(() => {
    fitToScreen();
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      fitToScreen();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [fitToScreen, product.id]);

  // Render Canvas Layers & Graphics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = baseCanvasWidth;
    canvas.height = baseCanvasHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Product Base background color
    ctx.fillStyle = product.bgColor || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply Sublimation Mirroring if enabled
    ctx.save();
    if (mirrorSublimation) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Render layers from bottom to top
    const visibleLayers = layers.filter((l) => l.visible);

    visibleLayers.forEach((layer) => {
      ctx.save();

      // Opacity & Blend Mode
      ctx.globalAlpha = layer.opacity / 100;
      ctx.globalCompositeOperation = layer.blendMode as GlobalCompositeOperation;

      // Position & Rotation transform
      const centerX = layer.x + layer.width / 2;
      const centerY = layer.y + layer.height / 2;

      ctx.translate(centerX, centerY);
      ctx.rotate((layer.rotation * Math.PI) / 180);
      if (layer.flipX || layer.flipY) {
        ctx.scale(layer.flipX ? -1 : 1, layer.flipY ? -1 : 1);
      }
      ctx.translate(-layer.width / 2, -layer.height / 2);

      // Apply Real-time Image Adjustment Filters if present
      if ((layer.type === 'image' || layer.type === 'smart') && layer.filters) {
        const b = 100 + (layer.filters.brightness || 0) + (layer.filters.exposure || 0);
        const c = 100 + (layer.filters.contrast || 0);
        const s = 100 + (layer.filters.saturation || 0) + ((layer.filters.vibrance || 0) * 0.5);
        const h = layer.filters.hue || 0;
        const blur = layer.filters.blur || 0;
        const sepia = layer.filters.sepia || 0;
        const invert = layer.filters.invert ? 100 : 0;
        const grayscale = layer.filters.grayscale ? 100 : 0;

        let filterString = `brightness(${b}%) contrast(${c}%) saturate(${s}%) hue-rotate(${h}deg) blur(${blur}px) sepia(${sepia}%) invert(${invert}%) grayscale(${grayscale}%)`;

        if (layer.filters.presetFilter && layer.filters.presetFilter !== 'none') {
          const intensity = (layer.filters.filterIntensity ?? 100) / 100;
          switch (layer.filters.presetFilter) {
            case 'vintage': filterString += ` sepia(${50 * intensity}%) contrast(${120 * intensity}%)`; break;
            case 'hdr': filterString += ` contrast(${140 * intensity}%) saturate(${130 * intensity}%)`; break;
            case 'neon': filterString += ` saturate(${200 * intensity}%) contrast(${150 * intensity}%) hue-rotate(${90 * intensity}deg)`; break;
            case 'cinema': filterString += ` contrast(${130 * intensity}%) sepia(${20 * intensity}%) hue-rotate(${-10 * intensity}deg)`; break;
            case 'popart': filterString += ` saturate(${250 * intensity}%) contrast(${160 * intensity}%)`; break;
            case 'cool': filterString += ` hue-rotate(${180 * intensity}deg) saturate(${110 * intensity}%)`; break;
            case 'warm': filterString += ` sepia(${30 * intensity}%) saturate(${120 * intensity}%)`; break;
            case 'duotone': filterString += ` contrast(${180 * intensity}%) grayscale(${80 * intensity}%)`; break;
          }
        }

        try {
          ctx.filter = filterString;
        } catch (e) {
          // ignore
        }
      }

      // Render based on layer type
      if (layer.type === 'text') {
        drawWarpedText(ctx, layer, activeColor);
      } else if (layer.type === 'image' || layer.type === 'smart') {
        if (layer.content) {
          let img = imageCacheRef.current.get(layer.content);
          if (!img) {
            img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = layer.content;
            imageCacheRef.current.set(layer.content, img);
            img.onload = () => {
              if (canvasRef.current) onCanvasRendered(canvasRef.current);
            };
            img.onerror = () => {
              // Fallback gradient pattern
              const fallbackCanvas = document.createElement('canvas');
              fallbackCanvas.width = 400;
              fallbackCanvas.height = 400;
              const fCtx = fallbackCanvas.getContext('2d');
              if (fCtx) {
                const grad = fCtx.createLinearGradient(0, 0, 400, 400);
                grad.addColorStop(0, '#0284c7');
                grad.addColorStop(1, '#7e22ce');
                fCtx.fillStyle = grad;
                fCtx.fillRect(0, 0, 400, 400);
                fCtx.fillStyle = '#ffffff';
                fCtx.font = 'bold 20px sans-serif';
                fCtx.textAlign = 'center';
                fCtx.fillText('Estampa Sublimática', 200, 200);
              }
              img!.src = fallbackCanvas.toDataURL();
            };
          }
          // Prefer ImageBitmap from shared asset store if available
          const asset = getAsset(layer.content);
          if (asset && asset.bitmap) {
            // draw ImageBitmap directly
            try {
              ctx.drawImage(asset.bitmap as ImageBitmap, 0, 0, layer.width, layer.height);
            } catch (e) {
              // fallback to image element if bitmap draw fails
              if (img.complete && img.naturalWidth > 0) {
                ctx.drawImage(img, 0, 0, layer.width, layer.height);
              }
            }
          } else if (img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, 0, 0, layer.width, layer.height);
          }

        }
      } else if (layer.type === 'shape') {
        drawVectorShape(
          ctx,
          layer.shapeType || 'rectangle',
          layer.width,
          layer.height,
          layer.color || activeColor,
          layer.strokeColor,
          layer.strokeWidth
        );
      } else if (layer.type === 'brush') {
        ctx.fillStyle = layer.color || activeColor;
        ctx.strokeStyle = layer.color || activeColor;
        ctx.lineWidth = layer.strokeWidth || brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        try {
          const points: { x: number; y: number }[] = JSON.parse(layer.content || '[]');
          if (points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            points.forEach((pt) => ctx.lineTo(pt.x, pt.y));
            ctx.stroke();
          }
        } catch (e) {
          // Ignore
        }
      }

      ctx.filter = 'none';
      ctx.restore();
    });

    ctx.restore();

    // Snapshot artwork for 3D mapping
    const cleanCanvas = document.createElement('canvas');
    cleanCanvas.width = canvas.width;
    cleanCanvas.height = canvas.height;
    const cleanCtx = cleanCanvas.getContext('2d');
    if (cleanCtx) {
      cleanCtx.drawImage(canvas, 0, 0);
      onCanvasRendered(cleanCanvas);
    }

    // Render Smart Alignment Guides if active
    if (activeGuidesRef.current.x !== undefined) {
      ctx.save();
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(activeGuidesRef.current.x, 0);
      ctx.lineTo(activeGuidesRef.current.x, canvas.height);
      ctx.stroke();
      ctx.restore();
    }
    if (activeGuidesRef.current.y !== undefined) {
      ctx.save();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, activeGuidesRef.current.y);
      ctx.lineTo(canvas.width, activeGuidesRef.current.y);
      ctx.stroke();
      ctx.restore();
    }

    // Render Bounding Box and Transform handles for active layer
    const activeLayer = layers.find((l) => l.id === activeLayerId);
    if (activeLayer && activeLayer.visible) {
      ctx.save();
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);

      const centerX = activeLayer.x + activeLayer.width / 2;
      const centerY = activeLayer.y + activeLayer.height / 2;

      ctx.translate(centerX, centerY);
      ctx.rotate((activeLayer.rotation * Math.PI) / 180);
      ctx.translate(-activeLayer.width / 2, -activeLayer.height / 2);

      ctx.strokeRect(0, 0, activeLayer.width, activeLayer.height);

      // Corner & Side handles rendering for active layer
      ctx.setLineDash([]);
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;

      // Rotation top stem line & handle
      ctx.beginPath();
      ctx.moveTo(activeLayer.width / 2, 0);
      ctx.lineTo(activeLayer.width / 2, -24);
      ctx.stroke();

      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(activeLayer.width / 2, -24, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Corner handles (Squares)
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;

      const cornerSize = 12;
      const corners = [
        { id: 'tl', x: 0, y: 0 },
        { id: 'tr', x: activeLayer.width, y: 0 },
        { id: 'bl', x: 0, y: activeLayer.height },
        { id: 'br', x: activeLayer.width, y: activeLayer.height },
      ];
      corners.forEach((c) => {
        ctx.fillRect(c.x - cornerSize / 2, c.y - cornerSize / 2, cornerSize, cornerSize);
        ctx.strokeRect(c.x - cornerSize / 2, c.y - cornerSize / 2, cornerSize, cornerSize);
      });

      // Side handles (Circles)
      const sideHandles = [
        { id: 'tc', x: activeLayer.width / 2, y: 0 },
        { id: 'bc', x: activeLayer.width / 2, y: activeLayer.height },
        { id: 'lc', x: 0, y: activeLayer.height / 2 },
        { id: 'rc', x: activeLayer.width, y: activeLayer.height / 2 },
      ];
      sideHandles.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      ctx.restore();
    }

    // Render Multi-Selection Outlines and Master Group Bounding Box
    if (selectedLayerIds.length > 1) {
      const selectedLayers = layers.filter((l) => selectedLayerIds.includes(l.id) && l.visible);

      if (selectedLayers.length > 0) {
        // 1. Draw individual highlight outline for each selected item
        selectedLayers.forEach((layer) => {
          ctx.save();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);

          const centerX = layer.x + layer.width / 2;
          const centerY = layer.y + layer.height / 2;
          ctx.translate(centerX, centerY);
          ctx.rotate((layer.rotation * Math.PI) / 180);
          ctx.translate(-layer.width / 2, -layer.height / 2);

          ctx.strokeRect(0, 0, layer.width, layer.height);
          ctx.restore();
        });

        // 2. Draw Master Group Bounding Box
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        selectedLayers.forEach((layer) => {
          minX = Math.min(minX, layer.x);
          minY = Math.min(minY, layer.y);
          maxX = Math.max(maxX, layer.x + layer.width);
          maxY = Math.max(maxY, layer.y + layer.height);
        });

        const groupW = maxX - minX;
        const groupH = maxY - minY;

        ctx.save();
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 3]);
        ctx.strokeRect(minX, minY, groupW, groupH);

        // Group Corner Handles
        ctx.setLineDash([]);
        ctx.fillStyle = '#a855f7';
        const groupCorners = [
          { x: minX, y: minY },
          { x: minX + groupW, y: minY },
          { x: minX, y: minY + groupH },
          { x: minX + groupW, y: minY + groupH },
        ];
        groupCorners.forEach((c) => {
          ctx.fillRect(c.x - 5, c.y - 5, 10, 10);
        });

        // Group Badge Label
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(minX, minY - 22, 175, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`Grupo: ${selectedLayers.length} itens selecionados`, minX + 6, minY - 8);

        ctx.restore();
      }
    }

    // Render Drag Selection Marquee Box
    if (selectionBox) {
      ctx.save();
      const boxX = Math.min(selectionBox.startX, selectionBox.currentX);
      const boxY = Math.min(selectionBox.startY, selectionBox.currentY);
      const boxW = Math.abs(selectionBox.currentX - selectionBox.startX);
      const boxH = Math.abs(selectionBox.currentY - selectionBox.startY);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';

      ctx.fillRect(boxX, boxY, boxW, boxH);
      ctx.strokeRect(boxX, boxY, boxW, boxH);
      ctx.restore();
    }

    // Render Cut Line & Bleed Area Guide Overlay (Linha de Corte / Sangria)
    if (showCutLine) {
      ctx.save();
      const margin = 15; // 15px / 3mm inner cut line margin
      const cutX = margin;
      const cutY = margin;
      const cutW = canvas.width - margin * 2;
      const cutH = canvas.height - margin * 2;

      // Dashed Red Contour Cut Line
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 4]);
      ctx.strokeRect(cutX, cutY, cutW, cutH);

      // Corner Crop Marks (Marcas de Corte)
      const markLength = 10;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(cutX - 5, cutY); ctx.lineTo(cutX + markLength, cutY);
      ctx.moveTo(cutX, cutY - 5); ctx.lineTo(cutX, cutY + markLength);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(cutW + margin + 5, cutY); ctx.lineTo(cutW + margin - markLength, cutY);
      ctx.moveTo(cutW + margin, cutY - 5); ctx.lineTo(cutW + margin, cutY + markLength);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(cutX - 5, cutH + margin); ctx.lineTo(cutX + markLength, cutH + margin);
      ctx.moveTo(cutX, cutH + margin + 5); ctx.lineTo(cutX, cutH + margin - markLength);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(cutW + margin + 5, cutH + margin); ctx.lineTo(cutW + margin - markLength, cutH + margin);
      ctx.moveTo(cutW + margin, cutH + margin + 5); ctx.lineTo(cutW + margin, cutH + margin - markLength);
      ctx.stroke();

      // Label Badge
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.fillRect(cutX + 4, cutY + 4, 160, 16);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText('✂ LINHA DE CORTE / SANGRIA', cutX + 8, cutY + 15);

      ctx.restore();
    }
  }, [layers, activeLayerId, selectedLayerIds, selectionBox, product, mirrorSublimation, baseCanvasWidth, baseCanvasHeight, showCutLine]);

  // Helper to detect handles at local coordinate position
  const getHandleAtLocalPos = (
    localX: number,
    localY: number,
    w: number,
    h: number
  ): 'tl' | 'tr' | 'bl' | 'br' | 'tc' | 'bc' | 'lc' | 'rc' | 'rotate' | null => {
    const r = 16; // Hit tolerance
    if (Math.hypot(localX - w / 2, localY - (-24)) <= r) return 'rotate';
    if (Math.hypot(localX - 0, localY - 0) <= r) return 'tl';
    if (Math.hypot(localX - w, localY - 0) <= r) return 'tr';
    if (Math.hypot(localX - 0, localY - h) <= r) return 'bl';
    if (Math.hypot(localX - w, localY - h) <= r) return 'br';

    if (Math.hypot(localX - w / 2, localY - 0) <= r) return 'tc';
    if (Math.hypot(localX - w / 2, localY - h) <= r) return 'bc';
    if (Math.hypot(localX - 0, localY - h / 2) <= r) return 'lc';
    if (Math.hypot(localX - w, localY - h / 2) <= r) return 'rc';

    return null;
  };

  // Helper to map handle type to cursor CSS
  const getCursorForHandle = (
    handle: 'tl' | 'tr' | 'bl' | 'br' | 'tc' | 'bc' | 'lc' | 'rc' | 'rotate' | null
  ): string => {
    switch (handle) {
      case 'tl':
      case 'br':
        return 'nwse-resize';
      case 'tr':
      case 'bl':
        return 'nesw-resize';
      case 'tc':
      case 'bc':
        return 'ns-resize';
      case 'lc':
      case 'rc':
        return 'ew-resize';
      case 'rotate':
        return 'grab';
      default:
        return 'default';
    }
  };

  // Canvas Mouse Down
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    if (activeTool === 'move' || e.spaceKey) {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      setCursorStyle('grabbing');
      return;
    }

    if (activeTool === 'brush') {
      isDrawingRef.current = true;
      currentPathRef.current = [{ x: mouseX, y: mouseY }];
      setCursorStyle('crosshair');
      return;
    }

    if (activeTool === 'eyedropper') {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const pixel = ctx.getImageData(Math.round(mouseX), Math.round(mouseY), 1, 1).data;
        const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
        if (onChangeColor) onChangeColor(hex);
      }
      return;
    }

    if (activeTool === 'eraser') {
      const clickedLayer = [...layers].reverse().find((layer) => {
        return (
          mouseX >= layer.x &&
          mouseX <= layer.x + layer.width &&
          mouseY >= layer.y &&
          mouseY <= layer.y + layer.height
        );
      });
      if (clickedLayer && onDeleteLayer) {
        onDeleteLayer(clickedLayer.id);
      }
      return;
    }

    if (activeTool === 'text') {
      const newId = 'layer-' + Date.now();
      const newLayer: Layer = {
        id: newId,
        name: 'Texto ' + (layers.length + 1),
        type: 'text',
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: Math.max(20, mouseX - 150),
        y: Math.max(20, mouseY - 30),
        width: 350,
        height: 70,
        rotation: 0,
        content: 'TEXTO PERSONALIZADO',
        color: activeColor,
        fontSize: 36,
        fontFamily: 'Impact',
        fontWeight: 'bold',
      };
      onUpdateLayer(newLayer);
      onSelectLayer(newId);
      return;
    }

    if (activeTool === 'shapes') {
      const newId = 'layer-' + Date.now();
      const newLayer: Layer = {
        id: newId,
        name: 'Forma ' + selectedShape,
        type: 'shape',
        visible: true,
        locked: false,
        opacity: 100,
        blendMode: 'normal',
        x: Math.max(20, mouseX - 100),
        y: Math.max(20, mouseY - 100),
        width: 200,
        height: 200,
        rotation: 0,
        content: '',
        shapeType: selectedShape,
        color: activeColor,
      };
      onUpdateLayer(newLayer);
      onSelectLayer(newId);
      return;
    }

    // Check group corner handles if multiple layers selected
    if (selectedLayerIds.length > 1) {
      const selectedLayers = layers.filter((l) => selectedLayerIds.includes(l.id) && l.visible);
      if (selectedLayers.length > 0) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        selectedLayers.forEach((l) => {
          minX = Math.min(minX, l.x);
          minY = Math.min(minY, l.y);
          maxX = Math.max(maxX, l.x + l.width);
          maxY = Math.max(maxY, l.y + l.height);
        });
        const groupW = maxX - minX;
        const groupH = maxY - minY;

        const groupCorners = [
          { handle: 'tl', x: minX, y: minY },
          { handle: 'tr', x: minX + groupW, y: minY },
          { handle: 'bl', x: minX, y: minY + groupH },
          { handle: 'br', x: minX + groupW, y: minY + groupH },
        ];

        const hitGroupCorner = groupCorners.find((c) => Math.hypot(mouseX - c.x, mouseY - c.y) <= 12);
        if (hitGroupCorner) {
          isGroupResizingRef.current = hitGroupCorner.handle;
          groupResizeStartRef.current = {
            mouseX,
            mouseY,
            minX,
            minY,
            groupW,
            groupH,
            initialLayers: selectedLayers.map((l) => ({
              id: l.id,
              x: l.x,
              y: l.y,
              w: l.width,
              h: l.height,
              fontSize: l.fontSize,
            })),
          };
          setCursorStyle(hitGroupCorner.handle === 'tl' || hitGroupCorner.handle === 'br' ? 'nwse-resize' : 'nesw-resize');
          return;
        }
      }
    }

    // Check corner/side handles or top rotation handle on active layer (when single item)
    if (activeLayerId && selectedLayerIds.length <= 1) {
      const activeLayer = layers.find((l) => l.id === activeLayerId);
      if (activeLayer && activeLayer.visible) {
        const centerX = activeLayer.x + activeLayer.width / 2;
        const centerY = activeLayer.y + activeLayer.height / 2;

        const rad = (-activeLayer.rotation * Math.PI) / 180;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const localX = dx * Math.cos(rad) - dy * Math.sin(rad) + activeLayer.width / 2;
        const localY = dx * Math.sin(rad) + dy * Math.cos(rad) + activeLayer.height / 2;

        const hitHandle = getHandleAtLocalPos(localX, localY, activeLayer.width, activeLayer.height);
        if (hitHandle) {
          isResizingModeRef.current = hitHandle;
          resizeStartRef.current = {
            mouseX,
            mouseY,
            x: activeLayer.x,
            y: activeLayer.y,
            w: activeLayer.width,
            h: activeLayer.height,
            rot: activeLayer.rotation,
            aspect: activeLayer.width / (activeLayer.height || 1),
          };
          setCursorStyle(getCursorForHandle(hitHandle));
          return;
        }
      }
    }

    // Default 'select' tool or click interaction
    const clickedLayer = [...layers].reverse().find((layer) => {
      return (
        layer.visible &&
        !layer.locked &&
        mouseX >= layer.x &&
        mouseX <= layer.x + layer.width &&
        mouseY >= layer.y &&
        mouseY <= layer.y + layer.height
      );
    });

    const isMultiKey = e.shiftKey || e.ctrlKey || e.metaKey || isMultiSelectMode;

    // Check if clicked inside the multi-selection group bounding box
    let clickedInsideGroupArea = false;
    if (selectedLayerIds.length > 1) {
      const selectedLayers = layers.filter((l) => selectedLayerIds.includes(l.id) && l.visible);
      if (selectedLayers.length > 0) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        selectedLayers.forEach((l) => {
          minX = Math.min(minX, l.x);
          minY = Math.min(minY, l.y);
          maxX = Math.max(maxX, l.x + l.width);
          maxY = Math.max(maxY, l.y + l.height);
        });
        if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
          clickedInsideGroupArea = true;
        }
      }
    }

    if (clickedLayer || (clickedInsideGroupArea && !isMultiKey)) {
      let updatedSelectedIds = [...selectedLayerIds];

      if (clickedLayer) {
        if (isMultiKey) {
          if (updatedSelectedIds.includes(clickedLayer.id)) {
            updatedSelectedIds = updatedSelectedIds.filter((id) => id !== clickedLayer.id);
          } else {
            updatedSelectedIds.push(clickedLayer.id);
          }
        } else {
          if (!updatedSelectedIds.includes(clickedLayer.id)) {
            updatedSelectedIds = [clickedLayer.id];
          }
        }
      }

      setSelectedLayerIds(updatedSelectedIds);
      const newActiveId = updatedSelectedIds.length > 0 ? updatedSelectedIds[updatedSelectedIds.length - 1] : null;
      onSelectLayer(newActiveId);

      // Start multi-drag positions for all selected items
      if (updatedSelectedIds.length > 0) {
        isDraggingLayerRef.current = true;
        multiDragMouseStartRef.current = { x: mouseX, y: mouseY };
        multiDragStartPositionsRef.current = layers
          .filter((l) => updatedSelectedIds.includes(l.id))
          .map((l) => ({ id: l.id, x: l.x, y: l.y }));

        if (clickedLayer) {
          layerDragOffsetRef.current = {
            x: mouseX - clickedLayer.x,
            y: mouseY - clickedLayer.y,
          };
        }
        setCursorStyle('move');
      }
    } else {
      // Clicked empty background
      if (!isMultiKey) {
        setSelectedLayerIds([]);
        onSelectLayer(null);
      }
      // Start marquee drag selection box
      isSelectingBoxRef.current = true;
      selectionBoxStartRef.current = { x: mouseX, y: mouseY };
      setSelectionBox({
        startX: mouseX,
        startY: mouseY,
        currentX: mouseX,
        currentY: mouseY,
      });
      setCursorStyle('crosshair');
    }
  };

  // Canvas Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isPanningRef.current) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
      setCursorStyle('grabbing');
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Update Drag Selection Marquee Box
    if (isSelectingBoxRef.current) {
      setSelectionBox({
        startX: selectionBoxStartRef.current.x,
        startY: selectionBoxStartRef.current.y,
        currentX: mouseX,
        currentY: mouseY,
      });
      return;
    }

    // Resizing Group as temporary bounding box
    if (isGroupResizingRef.current && groupResizeStartRef.current) {
      const init = groupResizeStartRef.current;
      const handle = isGroupResizingRef.current;
      const dx = mouseX - init.mouseX;
      const dy = mouseY - init.mouseY;

      let newGroupW = init.groupW;
      let newGroupH = init.groupH;
      let anchorX = init.minX;
      let anchorY = init.minY;

      if (handle === 'br') {
        newGroupW = Math.max(20, init.groupW + dx);
        newGroupH = Math.max(20, init.groupH + dy);
        anchorX = init.minX;
        anchorY = init.minY;
      } else if (handle === 'tl') {
        newGroupW = Math.max(20, init.groupW - dx);
        newGroupH = Math.max(20, init.groupH - dy);
        anchorX = init.minX + init.groupW;
        anchorY = init.minY + init.groupH;
      } else if (handle === 'tr') {
        newGroupW = Math.max(20, init.groupW + dx);
        newGroupH = Math.max(20, init.groupH - dy);
        anchorX = init.minX;
        anchorY = init.minY + init.groupH;
      } else if (handle === 'bl') {
        newGroupW = Math.max(20, init.groupW - dx);
        newGroupH = Math.max(20, init.groupH + dy);
        anchorX = init.minX + init.groupW;
        anchorY = init.minY;
      }

      const scaleX = newGroupW / (init.groupW || 1);
      const scaleY = newGroupH / (init.groupH || 1);

      const targetIds = init.initialLayers.map((l) => l.id);
      const newLayers = layers.map((layer) => {
        const lInit = init.initialLayers.find((item) => item.id === layer.id);
        if (lInit) {
          const newW = Math.max(10, Math.round(lInit.w * scaleX));
          const newH = Math.max(10, Math.round(lInit.h * scaleY));
          let newX = lInit.x;
          let newY = lInit.y;

          if (handle === 'br' || handle === 'tr') {
            newX = Math.round(anchorX + (lInit.x - anchorX) * scaleX);
          } else {
            newX = Math.round(anchorX - (anchorX - lInit.x) * scaleX);
          }

          if (handle === 'br' || handle === 'bl') {
            newY = Math.round(anchorY + (lInit.y - anchorY) * scaleY);
          } else {
            newY = Math.round(anchorY - (anchorY - lInit.y) * scaleY);
          }

          const updated: Layer = {
            ...layer,
            x: newX,
            y: newY,
            width: newW,
            height: newH,
          };
          if (layer.type === 'text' && lInit.fontSize) {
            updated.fontSize = Math.max(8, Math.round(lInit.fontSize * scaleX));
          }
          return updated;
        }
        return layer;
      });

      if (onReorderLayers) {
        hasTransformedRef.current = true;
        onReorderLayers(newLayers);
      } else {
        hasTransformedRef.current = true;
        newLayers.filter((l) => targetIds.includes(l.id)).forEach((l) => onUpdateLayer(l));
      }

      setCursorStyle(handle === 'tl' || handle === 'br' ? 'nwse-resize' : 'nesw-resize');
      return;
    }

    // Resizing or Rotating active layer
    if (isResizingModeRef.current && activeLayerId && resizeStartRef.current) {
      const activeLayer = layers.find((l) => l.id === activeLayerId);
      if (activeLayer) {
        const init = resizeStartRef.current;
        if (isResizingModeRef.current === 'rotate') {
          const centerX = init.x + init.w / 2;
          const centerY = init.y + init.h / 2;
          let angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI) + 90;
          if (angle < 0) angle += 360;
          hasTransformedRef.current = true;
          onUpdateLayer({ ...activeLayer, rotation: Math.round(angle) });
          setCursorStyle('grabbing');
          return;
        }

        const handle = isResizingModeRef.current;
        const rad = (init.rot * Math.PI) / 180;
        const dx = mouseX - init.mouseX;
        const dy = mouseY - init.mouseY;

        // Convert mouse delta into layer's local axes
        const localDx = dx * Math.cos(-rad) - dy * Math.sin(-rad);
        const localDy = dx * Math.sin(-rad) + dy * Math.cos(-rad);

        let newW = init.w;
        let newH = init.h;
        let localOffsetX = 0;
        let localOffsetY = 0;

        const isImage = activeLayer.type === 'image' || activeLayer.type === 'smart';
        const keepAspect = isImage || e.shiftKey;

        switch (handle) {
          case 'br': {
            newW = Math.max(20, Math.round(init.w + localDx));
            newH = keepAspect
              ? Math.max(20, Math.round(newW / init.aspect))
              : Math.max(20, Math.round(init.h + localDy));
            break;
          }
          case 'tl': {
            newW = Math.max(20, Math.round(init.w - localDx));
            newH = keepAspect
              ? Math.max(20, Math.round(newW / init.aspect))
              : Math.max(20, Math.round(init.h - localDy));
            localOffsetX = -(newW - init.w);
            localOffsetY = -(newH - init.h);
            break;
          }
          case 'tr': {
            newW = Math.max(20, Math.round(init.w + localDx));
            newH = keepAspect
              ? Math.max(20, Math.round(newW / init.aspect))
              : Math.max(20, Math.round(init.h - localDy));
            localOffsetX = 0;
            localOffsetY = -(newH - init.h);
            break;
          }
          case 'bl': {
            newW = Math.max(20, Math.round(init.w - localDx));
            newH = keepAspect
              ? Math.max(20, Math.round(newW / init.aspect))
              : Math.max(20, Math.round(init.h + localDy));
            localOffsetX = -(newW - init.w);
            localOffsetY = 0;
            break;
          }
          case 'tc': {
            newH = Math.max(20, Math.round(init.h - localDy));
            localOffsetY = -(newH - init.h);
            break;
          }
          case 'bc': {
            newH = Math.max(20, Math.round(init.h + localDy));
            break;
          }
          case 'lc': {
            newW = Math.max(20, Math.round(init.w - localDx));
            localOffsetX = -(newW - init.w);
            break;
          }
          case 'rc': {
            newW = Math.max(20, Math.round(init.w + localDx));
            break;
          }
        }

        // Convert local offset back to world space
        const worldDx = localOffsetX * Math.cos(rad) - localOffsetY * Math.sin(rad);
        const worldDy = localOffsetX * Math.sin(rad) + localOffsetY * Math.cos(rad);

        hasTransformedRef.current = true;
        onUpdateLayer({
          ...activeLayer,
          x: Math.round(init.x + worldDx),
          y: Math.round(init.y + worldDy),
          width: newW,
          height: newH,
        });
        setCursorStyle(getCursorForHandle(handle));
        return;
      }
    }

    if (isDrawingRef.current && activeTool === 'brush') {
      currentPathRef.current.push({ x: mouseX, y: mouseY });
      setCursorStyle('crosshair');
      return;
    }

    // Dragging Selected Multi-Layer Group
    if (isDraggingLayerRef.current && multiDragStartPositionsRef.current.length > 0) {
      const deltaX = Math.round(mouseX - multiDragMouseStartRef.current.x);
      const deltaY = Math.round(mouseY - multiDragMouseStartRef.current.y);

      const dragIds = multiDragStartPositionsRef.current.map((sp) => sp.id);
      const newLayers = layers.map((layer) => {
        const startPos = multiDragStartPositionsRef.current.find((sp) => sp.id === layer.id);
        if (startPos) {
          return {
            ...layer,
            x: Math.round(startPos.x + deltaX),
            y: Math.round(startPos.y + deltaY),
          };
        }
        return layer;
      });

      hasTransformedRef.current = true;
      if (onReorderLayers) {
        onReorderLayers(newLayers);
      } else {
        newLayers.filter((l) => dragIds.includes(l.id)).forEach((l) => onUpdateLayer(l));
      }
      setCursorStyle('move');
      return;
    } else {
      activeGuidesRef.current = {};
    }

    // Hover mouse cursor calculation
    if (activeTool === 'move') {
      setCursorStyle('grab');
      return;
    }
    if (activeTool === 'brush') {
      setCursorStyle('crosshair');
      return;
    }
    if (activeTool === 'text') {
      setCursorStyle('text');
      return;
    }
    if (activeTool === 'eyedropper') {
      setCursorStyle('copy');
      return;
    }
    if (activeTool === 'eraser') {
      setCursorStyle('not-allowed');
      return;
    }

    // Check handle hover on active layer
    if (activeLayerId) {
      const activeLayer = layers.find((l) => l.id === activeLayerId);
      if (activeLayer && activeLayer.visible) {
        const centerX = activeLayer.x + activeLayer.width / 2;
        const centerY = activeLayer.y + activeLayer.height / 2;

        const rad = (-activeLayer.rotation * Math.PI) / 180;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const localX = dx * Math.cos(rad) - dy * Math.sin(rad) + activeLayer.width / 2;
        const localY = dx * Math.sin(rad) + dy * Math.cos(rad) + activeLayer.height / 2;

        const hitHandle = getHandleAtLocalPos(localX, localY, activeLayer.width, activeLayer.height);
        if (hitHandle) {
          setCursorStyle(getCursorForHandle(hitHandle));
          return;
        }
      }
    }

    // Check layer hover
    const hoverLayer = [...layers].reverse().find((layer) => {
      return (
        mouseX >= layer.x &&
        mouseX <= layer.x + layer.width &&
        mouseY >= layer.y &&
        mouseY <= layer.y + layer.height
      );
    });

    if (hoverLayer) {
      setCursorStyle('move');
    } else {
      setCursorStyle('default');
    }
  };

  // Canvas Mouse Up
  const handleMouseUp = () => {
    // Finish Drag Selection Marquee Box Intersections
    if (isSelectingBoxRef.current && selectionBox) {
      const boxX = Math.min(selectionBox.startX, selectionBox.currentX);
      const boxY = Math.min(selectionBox.startY, selectionBox.currentY);
      const boxW = Math.abs(selectionBox.currentX - selectionBox.startX);
      const boxH = Math.abs(selectionBox.currentY - selectionBox.startY);

      if (boxW > 5 || boxH > 5) {
        const hitLayers = layers.filter((layer) => {
          if (!layer.visible || layer.locked) return false;
          return (
            layer.x < boxX + boxW &&
            layer.x + layer.width > boxX &&
            layer.y < boxY + boxH &&
            layer.y + layer.height > boxY
          );
        });

        const hitIds = hitLayers.map((l) => l.id);
        if (hitIds.length > 0) {
          setSelectedLayerIds(hitIds);
          onSelectLayer(hitIds[hitIds.length - 1]);
        }
      }

      isSelectingBoxRef.current = false;
      setSelectionBox(null);
    }

    multiDragStartPositionsRef.current = [];
    isResizingModeRef.current = null;
    resizeStartRef.current = null;
    isGroupResizingRef.current = null;
    groupResizeStartRef.current = null;
    activeGuidesRef.current = {};

    if (isDrawingRef.current && activeTool === 'brush') {
      isDrawingRef.current = false;
      if (currentPathRef.current.length > 0) {
        const newLayer: Layer = {
          id: 'layer-' + Date.now(),
          name: 'Traço Pincel ' + (layers.length + 1),
          type: 'brush',
          visible: true,
          locked: false,
          opacity: 100,
          blendMode: 'normal',
          x: 0,
          y: 0,
          width: baseCanvasWidth,
          height: baseCanvasHeight,
          rotation: 0,
          content: JSON.stringify(currentPathRef.current),
          color: activeColor,
          strokeWidth: brushSize,
        };
        onUpdateLayer(newLayer);
        currentPathRef.current = [];
      }
    }

    isPanningRef.current = false;
    isDraggingLayerRef.current = false;

    if (hasTransformedRef.current) {
      hasTransformedRef.current = false;
      if (pushHistoryStep && layersRef.current) {
        pushHistoryStep('Mover / Alterar elemento', 'Canvas', layersRef.current);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheelContainer}
      onTouchStart={handleTouchStartContainer}
      onTouchMove={handleTouchMoveContainer}
      onTouchEnd={handleTouchEndContainer}
      onTouchCancel={handleTouchEndContainer}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          Array.from(e.dataTransfer.files).forEach((file: File) => {
            if (file.type.startsWith('image/') || file.name.endsWith('.svg')) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const url = event.target?.result as string;
                if (url) {
                  const img = new Image();
                  img.onload = () => {
                    const naturalW = img.naturalWidth || 400;
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
                      id: 'layer-img-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
                      name: file.name,
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
                      content: url,
                    };
                    onUpdateLayer(newLayer);
                    onSelectLayer(newLayer.id);
                  };
                  img.src = url;
                }
              };
              reader.readAsDataURL(file);
            }
          });
        }
      }}
      className={`relative flex-1 w-full h-full overflow-hidden flex items-center justify-center select-none transition-colors ${
        theme === 'light' ? 'bg-slate-200' : 'bg-[#121214]'
      }`}
    >
      {/* Rulers Overlay */}
      {showRulers && (
        <>
          <div className={`absolute top-0 left-0 right-0 h-5 border-b z-20 flex items-center text-[9px] font-mono px-6 ${
            theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-[#1a1a1c] border-[#2d2d30] text-gray-500'
          }`}>
            <span className="mr-8">0mm</span>
            <span className="mr-8">50mm</span>
            <span className="mr-8">100mm</span>
            <span className="mr-8">150mm</span>
            <span className="mr-8">200mm</span>
            <span>250mm</span>
          </div>
          <div className={`absolute top-0 left-0 bottom-0 w-5 border-r z-20 flex flex-col items-center text-[9px] font-mono py-6 ${
            theme === 'light' ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-[#1a1a1c] border-[#2d2d30] text-gray-500'
          }`}>
            <span className="mb-8">0</span>
            <span className="mb-8">50</span>
            <span className="mb-8">100</span>
            <span className="mb-8">150</span>
          </div>
        </>
      )}

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: showGrid
            ? `radial-gradient(circle, ${theme === 'light' ? '#64748b' : '#475569'} 1px, transparent 1px)`
            : 'none',
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* Infinite Canvas Container Transform wrapper */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: isPanningRef.current ? 'none' : 'transform 0.1s ease-out',
          touchAction: 'none',
        }}
        className={`relative shadow-2xl rounded-sm border bg-white ${
          theme === 'light' ? 'border-purple-300 shadow-slate-400/50' : 'border-sky-500/30'
        }`}
      >
        {/* Canva Page Controls Header Bar */}
        <div className="absolute -top-12 left-0 right-0 flex items-center justify-between pointer-events-auto select-none z-10">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
              theme === 'light' ? 'bg-white/90 text-slate-700 border-slate-300 shadow-sm' : 'bg-[#1e1f29]/90 text-gray-200 border-[#323342]'
            }`}>
              Página 1 • {product.name}
            </span>
            <span className={`text-[10px] font-mono font-medium ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
              {product.printAspect} (300 DPI)
            </span>
          </div>

          <div className={`flex items-center gap-1 p-1 rounded-xl border backdrop-blur-md shadow-md ${
            theme === 'light' ? 'bg-white/95 border-slate-200 text-slate-700' : 'bg-[#181922]/95 border-[#2c2d3c] text-gray-200'
          }`} role="group" aria-label="Controles da página">
            {/* Bloquear Página */}
            <button
              type="button"
              onClick={handleToggleLockPage}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                layers.length > 0 && layers.every((l) => l.locked)
                  ? 'bg-amber-500/20 text-amber-400'
                  : theme === 'light' ? 'hover:bg-slate-100 text-slate-600 hover:text-slate-900' : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
              aria-label="Bloquear página"
              title={layers.length > 0 && layers.every((l) => l.locked) ? 'Desbloquear Página' : 'Bloquear Página'}
            >
              {layers.length > 0 && layers.every((l) => l.locked) ? (
                <Lock className="w-4 h-4 text-amber-400" />
              ) : (
                <Unlock className="w-4 h-4" />
              )}
            </button>

            {/* Duplicar Página */}
            <button
              type="button"
              onClick={handleDuplicatePage}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                theme === 'light' ? 'hover:bg-slate-100 text-slate-600 hover:text-slate-900' : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
              aria-label="Duplicar página"
              title="Duplicar Elementos da Página"
            >
              <Copy className="w-4 h-4" />
            </button>

            {/* Adicionar Página */}
            <button
              type="button"
              onClick={handleAddPage}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                theme === 'light' ? 'hover:bg-slate-100 text-slate-600 hover:text-slate-900' : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
              aria-label="Adicionar página"
              title="Limpar / Nova Página em Branco"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Primary HTML5 2D Canvas */}
        <canvas
          id="sublimation-main-canvas"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClickCanvas}
          onContextMenu={handleContextMenu}
          className="shadow-2xl block touch-gesture-canvas"
          style={{ cursor: cursorStyle, touchAction: 'none' }}
        />

        {/* On-Canvas Direct Inline Text Box Editor Overlay */}
        {(() => {
          if (!editingTextId) return null;
          const editingLayer = layers.find((l) => l.id === editingTextId);
          if (!editingLayer || editingLayer.type !== 'text') return null;

          const boxX = Math.min(baseCanvasWidth - 320, Math.max(10, editingLayer.x));
          const boxY = Math.max(10, editingLayer.y - 140 > 10 ? editingLayer.y - 140 : editingLayer.y + editingLayer.height + 10);

          return (
            <div
              className="absolute z-40 p-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl bg-[#14151c]/95 border-purple-500/60 text-white w-[320px] animate-in fade-in zoom-in-95 duration-150"
              style={{
                left: `${boxX}px`,
                top: `${boxY}px`,
                pointerEvents: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-500/20 text-xs font-extrabold text-purple-300">
                <div className="flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-purple-400" />
                  <span>Editar Texto no Canvas</span>
                </div>
                <button
                  onClick={() => setEditingTextId(null)}
                  className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Text Input */}
              <div className="space-y-2.5">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Conteúdo do Texto
                  </label>
                  <input
                    type="text"
                    value={editingLayer.content}
                    onChange={(e) => {
                      const updated = { ...editingLayer, content: e.target.value };
                      onUpdateLayer(updated);
                    }}
                    autoFocus
                    className="w-full px-3 py-2 bg-[#0a0b0e] border border-purple-500/50 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 shadow-inner"
                    placeholder="Digite seu texto aqui..."
                  />
                </div>

                {/* Font & Size Row */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                      Fonte
                    </label>
                    <select
                      value={editingLayer.fontFamily || 'Impact'}
                      onChange={(e) => onUpdateLayer({ ...editingLayer, fontFamily: e.target.value })}
                      className="w-full px-2 py-1.5 bg-[#0a0b0e] border border-gray-700 rounded-lg text-white text-xs font-bold focus:outline-none focus:border-purple-400"
                    >
                      <option value="Impact">Impact</option>
                      <option value="Arial">Arial Bold</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Pacifico">Pacifico</option>
                      <option value="Lobster">Lobster</option>
                      <option value="Great Vibes">Great Vibes</option>
                      <option value="Courier New">Courier</option>
                      <option value="Anton">Anton</option>
                      <option value="Oswald">Oswald</option>
                      <option value="Bungee">Bungee</option>
                      <option value="Permanent Marker">Permanent Marker</option>
                      <option value="Comic Sans MS">Comic Sans</option>
                      <option value="Bebas Neue">Bebas Neue</option>
                      <option value="Dancing Script">Dancing Script</option>
                      <option value="Cinzel">Cinzel</option>
                      <option value="Satisfy">Satisfy</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                      Tamanho (pt)
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={200}
                      value={editingLayer.fontSize || 36}
                      onChange={(e) => onUpdateLayer({ ...editingLayer, fontSize: Number(e.target.value) || 36 })}
                      className="w-full px-2 py-1.5 bg-[#0a0b0e] border border-gray-700 rounded-lg text-white text-xs font-mono font-bold focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Styles & Colors Row */}
                <div className="flex items-center justify-between gap-1 pt-1">
                  <div className="flex items-center gap-1 bg-[#0a0b0e] p-1 rounded-lg border border-gray-800">
                    <button
                      onClick={() =>
                        onUpdateLayer({
                          ...editingLayer,
                          fontWeight: editingLayer.fontWeight === 'bold' ? 'normal' : 'bold',
                        })
                      }
                      className={`px-2 py-1 rounded text-xs font-black transition-colors cursor-pointer ${
                        editingLayer.fontWeight === 'bold'
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      title="Negrito"
                    >
                      B
                    </button>
                    <button
                      onClick={() => onUpdateLayer({ ...editingLayer, textAlign: 'left' })}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        editingLayer.textAlign === 'left' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                      title="Alinhar à Esquerda"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onUpdateLayer({ ...editingLayer, textAlign: 'center' })}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        editingLayer.textAlign === 'center' || !editingLayer.textAlign
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      title="Centralizar Texto"
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onUpdateLayer({ ...editingLayer, textAlign: 'right' })}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        editingLayer.textAlign === 'right' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                      title="Alinhar à Direita"
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Colors */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1" title="Cor de Preenchimento">
                      <span className="text-[9px] text-gray-400 uppercase font-bold">Cor</span>
                      <div
                        className="relative w-6 h-6 rounded-full border border-white/60 shadow overflow-hidden cursor-pointer"
                        style={{ backgroundColor: editingLayer.color || '#00D9FF' }}
                      >
                        <input
                          type="color"
                          value={editingLayer.color || '#00D9FF'}
                          onChange={(e) => onUpdateLayer({ ...editingLayer, color: e.target.value })}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1" title="Cor do Contorno">
                      <span className="text-[9px] text-gray-400 uppercase font-bold">Borda</span>
                      <div
                        className="relative w-6 h-6 rounded-full border border-white/60 shadow overflow-hidden cursor-pointer"
                        style={{ backgroundColor: editingLayer.strokeColor || '#000000' }}
                      >
                        <input
                          type="color"
                          value={editingLayer.strokeColor || '#000000'}
                          onChange={(e) =>
                            onUpdateLayer({
                              ...editingLayer,
                              strokeColor: e.target.value,
                              strokeWidth: editingLayer.strokeWidth || 2,
                            })
                          }
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setEditingTextId(null)}
                  className="w-full mt-1 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Concluir Edição</span>
                </button>
              </div>
            </div>
          );
        })()}

        {/* Canva Page Controls Footer Bar */}
        <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-between pointer-events-auto z-10">
          <button
            type="button"
            onClick={handleAddPage}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md shadow-sm transition-all cursor-pointer active:scale-95 ${
              theme === 'light'
                ? 'bg-white/90 border-slate-300 text-slate-700 hover:bg-slate-100'
                : 'bg-[#1a1b24]/90 border-[#303140] text-gray-300 hover:bg-[#242633] hover:text-white'
            }`}
            aria-label="Adicionar página"
          >
            <Plus className="w-3.5 h-3.5 text-purple-400" />
            <span>Adicionar página</span>
          </button>
        </div>
      </div>

      {/* Canva Floating Contextual Formatting Bar */}
      {activeLayerId && (
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 backdrop-blur-xl border rounded-2xl shadow-2xl z-30 text-xs animate-in fade-in slide-in-from-top-3 duration-200 max-w-[95vw] overflow-x-auto ${
          theme === 'light'
            ? 'bg-white/95 border-purple-200 text-slate-800 shadow-slate-300/60'
            : 'bg-[#181920]/95 border-purple-500/40 text-gray-200 shadow-black/90'
        }`}>
          {(() => {
            const activeL = layers.find((l) => l.id === activeLayerId);
            if (!activeL) return null;

            const isImage = activeL.type === 'image' || activeL.type === 'smart';

            return (
              <div className="flex items-center gap-2 shrink-0">
                {/* Layer Title Badge */}
                <span className="text-[11px] font-bold text-purple-300 max-w-[100px] truncate bg-purple-950/70 px-2.5 py-1 rounded-lg border border-purple-500/30 shrink-0">
                  {activeL.name}
                </span>

                <div className="w-[1px] h-4 bg-white/20 shrink-0"></div>

                {/* IMAGE SPECIFIC ADVANCED TOOL BUTTONS */}
                {isImage && (
                  <>
                    <button
                      onClick={() => {
                        setModalDefaultTab('adjustments');
                        setIsImageModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center gap-1.5 text-[11px] shadow-sm transition-all cursor-pointer shrink-0"
                      title="Abrir Painel de Ajuste de Cores, Luz e Filtros"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => {
                        setModalDefaultTab('crop');
                        setIsImageModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 bg-[#23242e] hover:bg-[#2e2f3d] text-gray-200 hover:text-white rounded-xl font-semibold flex items-center gap-1.5 text-[11px] transition-all cursor-pointer shrink-0"
                      title="Recortar Imagem"
                    >
                      <Crop className="w-3.5 h-3.5 text-sky-400" />
                      <span>Cortar</span>
                    </button>

                    <button
                      onClick={() => {
                        setModalDefaultTab('filters');
                        setIsImageModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 bg-[#23242e] hover:bg-[#2e2f3d] text-gray-200 hover:text-white rounded-xl font-semibold flex items-center gap-1.5 text-[11px] transition-all cursor-pointer shrink-0"
                      title="Aplicar Filtro Estético"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>Filtros</span>
                    </button>

                    <button
                      onClick={() => {
                        setModalDefaultTab('smart');
                        setIsImageModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 bg-[#23242e] hover:bg-[#2e2f3d] text-gray-200 hover:text-white rounded-xl font-semibold flex items-center gap-1.5 text-[11px] transition-all cursor-pointer shrink-0"
                      title="Ferramentas IA (Remover Fundo, Vetorizar, Upscale)"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>IA Smart</span>
                    </button>

                    <button
                      onClick={() => handleTriggerReplaceImage(activeL.id)}
                      className="px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold flex items-center gap-1.5 text-[11px] transition-all cursor-pointer shrink-0 shadow-xs"
                      title="Substituir por outra imagem mantendo posição e tamanho"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Substituir</span>
                    </button>

                  </>
                )}

                {/* TEXT CONTROLS */}
                {activeL.type === 'text' && (
                  <>
                    {/* Direct Text Content Input */}
                    <div className="flex items-center bg-[#23242e] rounded-xl border border-[#383945] px-2 py-0.5 shrink-0 max-w-[180px] focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                      <Type className="w-3.5 h-3.5 text-purple-400 shrink-0 mr-1.5" />
                      <input
                        type="text"
                        value={activeL.content}
                        onChange={(e) => onUpdateLayer({ ...activeL, content: e.target.value })}
                        className="bg-transparent text-white text-[11px] font-semibold w-full focus:outline-none placeholder-gray-500"
                        placeholder="Texto..."
                        title="Editar Conteúdo do Texto"
                      />
                    </div>

                    {/* Canvas Overlay Direct Editor Toggle Button */}
                    <button
                      onClick={() => setEditingTextId(editingTextId === activeL.id ? null : activeL.id)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
                        editingTextId === activeL.id
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-[#23242e] text-purple-300 hover:bg-purple-900/40 border border-purple-500/30'
                      }`}
                      title="Abrir Caixa de Edição de Texto Direto no Canvas"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">Editar no Canvas</span>
                    </button>

                    {/* Font Dropdown */}
                    <select
                      value={activeL.fontFamily || 'Impact'}
                      onChange={(e) =>
                        onUpdateLayer({ ...activeL, fontFamily: e.target.value })
                      }
                      className="bg-[#23242e] text-white text-[11px] font-bold px-2 py-1 rounded-lg border border-[#383945] focus:outline-none focus:border-purple-500 cursor-pointer shrink-0"
                      title="Fonte do Texto"
                    >
                      <option value="Impact">Impact</option>
                      <option value="Arial">Arial Bold</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Pacifico">Pacifico</option>
                      <option value="Lobster">Lobster</option>
                      <option value="Great Vibes">Great Vibes</option>
                      <option value="Courier New">Courier</option>
                      <option value="Anton">Anton</option>
                      <option value="Oswald">Oswald</option>
                      <option value="Bungee">Bungee</option>
                      <option value="Permanent Marker">Permanent Marker</option>
                      <option value="Comic Sans MS">Comic Sans</option>
                      <option value="Bebas Neue">Bebas Neue</option>
                      <option value="Dancing Script">Dancing Script</option>
                      <option value="Cinzel">Cinzel</option>
                      <option value="Satisfy">Satisfy</option>
                    </select>

                    {/* Font Size (+ / -) */}
                    <div className="flex items-center bg-[#23242e] rounded-lg border border-[#383945] p-0.5 shrink-0" title="Tamanho da Fonte">
                      <button
                        onClick={() =>
                          onUpdateLayer({
                            ...activeL,
                            fontSize: Math.max(10, (activeL.fontSize || 36) - 4),
                          })
                        }
                        className="px-1.5 py-0.5 hover:bg-white/10 rounded font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="px-1.5 text-[11px] font-mono font-bold text-purple-300">
                        {activeL.fontSize || 36}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateLayer({
                            ...activeL,
                            fontSize: Math.min(200, (activeL.fontSize || 36) + 4),
                          })
                        }
                        className="px-1.5 py-0.5 hover:bg-white/10 rounded font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    {/* Bold Toggle */}
                    <button
                      onClick={() =>
                        onUpdateLayer({
                          ...activeL,
                          fontWeight: activeL.fontWeight === 'bold' ? 'normal' : 'bold',
                        })
                      }
                      className={`px-2 py-0.5 rounded-lg text-xs font-black transition-colors cursor-pointer shrink-0 ${
                        activeL.fontWeight === 'bold'
                          ? 'bg-purple-600 text-white'
                          : 'bg-[#23242e] text-gray-400 hover:text-white border border-[#383945]'
                      }`}
                      title="Negrito (Bold)"
                    >
                      B
                    </button>

                    {/* Text Alignment */}
                    <div className="flex items-center bg-[#23242e] rounded-lg border border-[#383945] p-0.5 shrink-0">
                      <button
                        onClick={() => onUpdateLayer({ ...activeL, textAlign: 'left' })}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          activeL.textAlign === 'left' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                        title="Alinhar à Esquerda"
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateLayer({ ...activeL, textAlign: 'center' })}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          activeL.textAlign === 'center' || !activeL.textAlign
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                        title="Centralizar Texto"
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateLayer({ ...activeL, textAlign: 'right' })}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          activeL.textAlign === 'right' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                        title="Alinhar à Direita"
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}

                {/* Universal Size Scale Controls (- / +) for active layer */}
                <div className="flex items-center bg-[#23242e] rounded-xl border border-[#383945] p-0.5 shrink-0" title="Aumentar ou Diminuir Tamanho do Item Selecionado">
                  <button
                    onClick={() => handleScaleActiveLayer(-10)}
                    className="p-1.5 hover:bg-rose-500/20 text-rose-300 hover:text-white rounded-lg flex items-center justify-center font-bold text-xs transition-all cursor-pointer"
                    title="Diminuir Tamanho do Item (-10%)"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1 text-[10px] font-bold text-purple-300 uppercase shrink-0">
                    Tamanho
                  </span>
                  <button
                    onClick={() => handleScaleActiveLayer(10)}
                    className="p-1.5 hover:bg-emerald-500/20 text-emerald-300 hover:text-white rounded-lg flex items-center justify-center font-bold text-xs transition-all cursor-pointer"
                    title="Aumentar Tamanho do Item (+10%)"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-[1px] h-4 bg-white/20 shrink-0"></div>

                {/* Fill Color Circle (Preenchimento) */}
                <div
                  className="relative w-6 h-6 rounded-full border-2 border-white/60 shadow-md flex items-center justify-center shrink-0 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: activeL.color || activeColor || '#00D9FF' }}
                  title={`Preenchimento (${activeL.color || activeColor || '#00D9FF'})`}
                >
                  <input
                    type="color"
                    value={activeL.color || activeColor || '#00D9FF'}
                    onChange={(e) => {
                      const newCol = e.target.value;
                      const updated = { ...activeL, color: newCol };
                      onUpdateLayer(updated);
                      if (onChangeColor) onChangeColor(newCol);
                      if (pushHistoryStep) pushHistoryStep('Cor de Preenchimento Alterada', 'Cor', layers.map(l => l.id === updated.id ? updated : l));
                    }}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>

                {/* Stroke/Border Color Circle & Width Controls (Linha) */}
                <div className="flex items-center gap-1 shrink-0">
                  <div
                    className="relative w-6 h-6 rounded-full border-2 border-white/80 shadow-md flex items-center justify-center shrink-0 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: activeL.strokeColor || '#000000' }}
                    title={`Linha/Borda (${activeL.strokeColor || '#000000'})`}
                  >
                    <input
                      type="color"
                      value={activeL.strokeColor || '#000000'}
                      onChange={(e) => {
                        const newStroke = e.target.value;
                        const updated = { ...activeL, strokeColor: newStroke, strokeWidth: activeL.strokeWidth || 2 };
                        onUpdateLayer(updated);
                        if (pushHistoryStep) pushHistoryStep('Cor de Linha Alterada', 'Linha', layers.map(l => l.id === updated.id ? updated : l));
                      }}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </div>
                  <select
                    value={activeL.strokeWidth ?? 0}
                    onChange={(e) => {
                      const sw = parseInt(e.target.value, 10);
                      const updated = { ...activeL, strokeWidth: sw };
                      onUpdateLayer(updated);
                      if (pushHistoryStep) pushHistoryStep('Espessura da Linha Alterada', 'Linha', layers.map(l => l.id === updated.id ? updated : l));
                    }}
                    className="bg-[#181920] text-sky-300 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-lg border border-[#383945] focus:outline-none cursor-pointer shrink-0"
                    title="Espessura da Linha em Pixels"
                  >
                    <option value="0">0px</option>
                    <option value="1">1px</option>
                    <option value="2">2px</option>
                    <option value="4">4px</option>
                    <option value="6">6px</option>
                    <option value="8">8px</option>
                    <option value="12">12px</option>
                  </select>
                </div>

                {/* Align Center Button */}
                <button
                  onClick={() => handleCenterLayer(activeL.id)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-200 hover:text-white flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                  title="Centralizar na Estampa"
                >
                  <AlignCenter className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Centralizar</span>
                </button>

                {/* Fit to Page Width Button (Ajustar na Largura) */}
                <button
                  onClick={() => handleFitLayerToWidth(activeL.id)}
                  className="p-1.5 hover:bg-cyan-500/20 text-cyan-300 hover:text-white rounded-lg flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                  title="Ajustar Camada na Largura da Página / Estampa"
                >
                  <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Ajustar Largura</span>
                </button>

                {/* Mirror / Flip H & V */}
                <button
                  onClick={() => handleFlipHorizontal(activeL.id)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-200 hover:text-white flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                  title="Espelhar Horizontalmente"
                >
                  <FlipHorizontal className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Espelhar</span>
                </button>

                {/* Rotate Button */}
                <button
                  onClick={() =>
                    onUpdateLayer({
                      ...activeL,
                      rotation: (activeL.rotation + 90) % 360,
                    })
                  }
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-200 hover:text-white flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                  title="Girar 90°"
                >
                  <RotateCw className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">Girar</span>
                </button>

                {/* Duplicate Button */}
                {onDuplicateLayer && (
                  <button
                    onClick={() => onDuplicateLayer(activeL.id)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-200 hover:text-white flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                    title="Duplicar elemento"
                  >
                    <Copy className="w-3.5 h-3.5 text-purple-400" />
                    <span className="hidden sm:inline">Duplicar</span>
                  </button>
                )}

                {/* Paste Button */}
                {onPasteFromClipboard && (
                  <button
                    onClick={onPasteFromClipboard}
                    className="p-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 rounded-lg font-bold flex items-center gap-1 text-[11px] transition-colors cursor-pointer shrink-0"
                    title="Colar Imagem com Transparência PNG (Ctrl + V)"
                  >
                    <Clipboard className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Colar</span>
                  </button>
                )}

                {/* Export Object */}
                <button
                  onClick={() => handleExportLayerAsImage(activeL.id)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-200 hover:text-white flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
                  title="Exportar Objeto em PNG"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Baixar PNG</span>
                </button>

                <div className="w-[1px] h-4 bg-white/20 shrink-0"></div>

                {/* Delete Button */}
                {onDeleteLayer && (
                  <button
                    onClick={() => onDeleteLayer(activeL.id)}
                    className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg font-bold flex items-center gap-1 text-[11px] transition-colors cursor-pointer shrink-0"
                    title="Excluir Elemento Selecionado (Del)"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Excluir</span>
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Floating Multi-Selection Action Toolbar */}
      {selectedLayerIds.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-2 bg-[#181920]/95 backdrop-blur-xl border border-purple-500/60 rounded-2xl shadow-2xl z-30 animate-in fade-in slide-in-from-top-3 max-w-[95vw] overflow-x-auto text-xs">
          {/* Group badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-600/30 text-purple-200 border border-purple-500/40 rounded-xl font-bold text-[11px] shrink-0">
            <CheckSquare className="w-4 h-4 text-purple-400" />
            <span>{selectedLayerIds.length} Selecionados</span>
          </div>

          <div className="w-[1px] h-5 bg-white/20 shrink-0"></div>

          {/* Alignment Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => alignSelectedLayers('left')}
              className="p-1.5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
              title="Alinhar à Esquerda"
            >
              <AlignLeft className="w-4 h-4 text-sky-400" />
            </button>
            <button
              onClick={() => alignSelectedLayers('center')}
              className="p-1.5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
              title="Centralizar Horizontalmente"
            >
              <AlignCenter className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              onClick={() => alignSelectedLayers('right')}
              className="p-1.5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
              title="Alinhar à Direita"
            >
              <AlignRight className="w-4 h-4 text-sky-400" />
            </button>
          </div>

          <div className="w-[1px] h-5 bg-white/20 shrink-0"></div>

          {/* Vertical Alignments */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => alignSelectedLayers('top')}
              className="p-1.5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
              title="Alinhar ao Topo"
            >
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={() => alignSelectedLayers('middle')}
              className="p-1.5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
              title="Centralizar Verticalmente"
            >
              <AlignLeft className="w-4 h-4 text-purple-400 rotate-90" />
            </button>
            <button
              onClick={() => alignSelectedLayers('bottom')}
              className="p-1.5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
              title="Alinhar à Base"
            >
              <ChevronDown className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          <div className="w-[1px] h-5 bg-white/20 shrink-0"></div>

          {/* Scale Helpers */}
          <div className="flex items-center gap-1 shrink-0 bg-[#23242e] rounded-lg p-0.5 border border-[#383945]">
            <button
              onClick={() => handleScaleActiveLayer(-10)}
              className="p-1 hover:bg-rose-500/20 text-rose-300 hover:text-white rounded transition-all cursor-pointer"
              title="Diminuir Grupo (-10%)"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[10px] font-bold text-purple-300">Tamanho</span>
            <button
              onClick={() => handleScaleActiveLayer(10)}
              className="p-1 hover:bg-emerald-500/20 text-emerald-300 hover:text-white rounded transition-all cursor-pointer"
              title="Aumentar Grupo (+10%)"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-[1px] h-5 bg-white/20 shrink-0"></div>

          {/* Fit Group to Width */}
          <button
            onClick={handleFitSelectedToPageWidth}
            className="flex items-center gap-1 px-2.5 py-1 bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 rounded-xl font-bold transition-colors cursor-pointer shrink-0"
            title="Ajustar Seleção na Largura da Página"
          >
            <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ajustar Largura</span>
          </button>

          <div className="w-[1px] h-5 bg-white/20 shrink-0"></div>

          {/* Group Duplicate */}
          <button
            onClick={duplicateSelectedLayers}
            className="flex items-center gap-1 px-2.5 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 rounded-xl font-bold transition-colors cursor-pointer shrink-0"
            title="Duplicar Todos os Selecionados"
          >
            <Copy className="w-3.5 h-3.5 text-purple-400" />
            <span>Duplicar</span>
          </button>

          {/* Group Delete */}
          <button
            onClick={deleteSelectedLayers}
            className="flex items-center gap-1 px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-xl font-bold transition-colors cursor-pointer shrink-0"
            title="Excluir Todos os Elementos Selecionados"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>Excluir Todos</span>
          </button>

          {/* Deselect All */}
          <button
            onClick={() => {
              setSelectedLayerIds([]);
              onSelectLayer(null);
            }}
            className="p-1.5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
            title="Desfazer Seleção (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Zoom & View Controls */}
      <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 p-1.5 backdrop-blur-md border rounded-2xl shadow-2xl z-30 text-xs ${
        theme === 'light'
          ? 'bg-white/95 border-slate-300 text-slate-800 shadow-slate-300/60'
          : 'bg-[#1e1e20]/95 border-[#38383c] text-gray-300 shadow-black/80'
      }`}>
        {/* Zoom Out (-) */}
        <button
          onClick={() => setZoom((z) => Math.max(0.1, Math.round((z - 0.1) * 10) / 10))}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            theme === 'light' ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900' : 'hover:bg-white/10 text-gray-300 hover:text-white'
          }`}
          title="Diminuir Zoom (-10%)"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Level Select Dropdown */}
        <select
          value={Math.round(zoom * 100)}
          onChange={(e) => setZoom(parseInt(e.target.value) / 100)}
          className={`font-mono text-[11px] font-bold px-1.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
            theme === 'light'
              ? 'bg-slate-100 border-slate-300 text-purple-700'
              : 'bg-[#141416] border-[#38383c] text-sky-400'
          }`}
          title="Selecionar Porcentagem de Zoom"
        >
          <option value="25">25%</option>
          <option value="50">50%</option>
          <option value="75">75%</option>
          <option value="100">100%</option>
          <option value="125">125%</option>
          <option value="150">150%</option>
          <option value="200">200%</option>
          <option value="300">300%</option>
          <option value="400">400%</option>
        </select>

        {/* Zoom In (+) */}
        <button
          onClick={() => setZoom((z) => Math.min(4.0, Math.round((z + 0.1) * 10) / 10))}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            theme === 'light' ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900' : 'hover:bg-white/10 text-gray-300 hover:text-white'
          }`}
          title="Aumentar Zoom (+10%)"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className={`w-[1px] h-4 my-auto ${theme === 'light' ? 'bg-slate-300' : 'bg-[#38383c]'}`}></div>

        {/* Fit to Screen (Ajustar Tela) */}
        <button
          onClick={fitToScreen}
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
            theme === 'light'
              ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              : 'bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 hover:text-white'
          }`}
          title="Ajustar Estampa Automaticamente à Tela"
        >
          <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Ajustar Tela</span>
        </button>

        {/* Fit Template / Model to Page Width */}
        <button
          onClick={handleFitAllLayersToPageWidth}
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
            theme === 'light'
              ? 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-300'
              : 'bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900/80 border border-cyan-500/40'
          }`}
          title="Ajustar todas as camadas do modelo na largura da página"
        >
          <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Ajustar Modelo na Largura</span>
        </button>

        {/* Reset Pan / Center */}
        <button
          onClick={() => setPan({ x: 0, y: 0 })}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            theme === 'light' ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900' : 'hover:bg-white/10 text-gray-300 hover:text-white'
          }`}
          title="Centralizar Posição da Tela"
        >
          <Move className="w-3.5 h-3.5" />
        </button>

        <div className={`w-[1px] h-4 my-auto ${theme === 'light' ? 'bg-slate-300' : 'bg-[#38383c]'}`}></div>

        {/* Linha de Corte Visual Toggle Button */}
        <button
          onClick={() => setShowCutLine((prev) => !prev)}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
            showCutLine
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
              : theme === 'light'
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              : 'bg-[#23242e] text-rose-300 hover:bg-rose-950/40 border border-rose-500/30'
          }`}
          title="Exibir/Ocultar Linha de Corte e Sangria de Impressão no Canvas"
        >
          <Scissors className="w-3.5 h-3.5 text-rose-300" />
          <span className="hidden xs:inline">{showCutLine ? 'Linha de Corte ON' : 'Linha de Corte'}</span>
        </button>

        {/* Inserir Linha de Corte Camada Button */}
        <button
          onClick={() => handleAddCutLineLayer('cut_line_rect')}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-sm ${
            theme === 'light'
              ? 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-300'
              : 'bg-rose-950/50 text-rose-200 hover:bg-rose-900/80 border border-rose-500/40'
          }`}
          title="Inserir Camada de Linha de Corte na Estampa"
        >
          <Plus className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="hidden sm:inline">+ Inserir Corte</span>
        </button>

        {/* Toggle Floating Mover & Ajustar Panel */}
        <button
          onClick={() => setShowTouchPad((prev) => !prev)}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
            showTouchPad && activeLayerId
              ? 'bg-purple-600 text-white shadow-md'
              : theme === 'light'
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              : 'bg-[#23242e] text-purple-300 hover:bg-purple-900/40 border border-purple-500/30'
          }`}
          title="Mover e Ajustar Item (Teclado Touch / D-Pad)"
        >
          <Target className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden xs:inline">Mover & Ajustar</span>
        </button>

        {/* Multi-Selection Mode Toggle Button */}
        <button
          onClick={() => setIsMultiSelectMode((prev) => !prev)}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
            isMultiSelectMode || selectedLayerIds.length > 1
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 border border-purple-400'
              : theme === 'light'
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              : 'bg-[#23242e] text-purple-300 hover:bg-purple-900/40 border border-purple-500/30'
          }`}
          title="Ativar/Desativar Modo de Seleção Múltipla (Clique em vários elementos ou arraste a caixa)"
        >
          <CheckSquare className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden xs:inline">{isMultiSelectMode ? 'Seleção Múltipla ON' : 'Seleção Múltipla'}</span>
        </button>

        {/* Paste from Clipboard Button */}
        {onPasteFromClipboard && (
          <button
            onClick={onPasteFromClipboard}
            className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-sm ${
              theme === 'light'
                ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/80 border border-emerald-500/40'
            }`}
            title="Colar Imagem da Área de Transparência (Ctrl + V)"
          >
            <Clipboard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden xs:inline">Colar (Ctrl+V)</span>
          </button>
        )}
      </div>

      {/* Floating Touch Controls (Mover & Redimensionar) for Selected Element - Works in Portrait & Landscape */}
      {activeLayerId && showTouchPad && (
        <div className="absolute bottom-14 right-3 max-h-[85vh] flex flex-col items-center gap-2 bg-[#181920]/95 backdrop-blur-xl border border-purple-500/50 p-2.5 rounded-2xl shadow-2xl z-30 animate-in fade-in slide-in-from-right-3">
          <div className="flex items-center justify-between w-full text-[9px] font-extrabold text-purple-300 uppercase tracking-wider px-0.5 border-b border-purple-500/20 pb-1">
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3 text-emerald-400" />
              <span>Mover & Ajustar</span>
            </div>
            <button
              onClick={() => setShowTouchPad(false)}
              className="text-gray-400 hover:text-white p-0.5 rounded cursor-pointer transition-colors"
              title="Minimizar Painel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scale Buttons (+ / -) */}
          <div className="flex items-center gap-1.5 w-full">
            <button
              onClick={() => handleScaleActiveLayer(10)}
              className="flex-1 h-9 bg-purple-600 active:bg-purple-700 text-white rounded-xl flex items-center justify-center font-bold shadow-md transition-transform active:scale-95 cursor-pointer"
              title="Aumentar Tamanho (+10%)"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScaleActiveLayer(-10)}
              className="flex-1 h-9 bg-[#23242e] active:bg-purple-900/50 text-rose-400 border border-[#383945] rounded-xl flex items-center justify-center font-bold shadow-md transition-transform active:scale-95 cursor-pointer"
              title="Diminuir Tamanho (-10%)"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* D-Pad Directional Move Arrows */}
          <div className="grid grid-cols-3 gap-1 w-28 h-28 bg-[#121318] border border-[#2d2e38] p-1 rounded-xl items-center justify-center">
            <div></div>
            <button
              onClick={() => handleMoveActiveLayer(0, -15)}
              className="w-8 h-8 bg-[#23242e] active:bg-purple-600 text-purple-300 active:text-white rounded-lg flex items-center justify-center shadow transition-all active:scale-90 cursor-pointer mx-auto"
              title="Mover para Cima (15px)"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <div></div>

            <button
              onClick={() => handleMoveActiveLayer(-15, 0)}
              className="w-8 h-8 bg-[#23242e] active:bg-purple-600 text-purple-300 active:text-white rounded-lg flex items-center justify-center shadow transition-all active:scale-90 cursor-pointer mx-auto"
              title="Mover para Esquerda (15px)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleCenterLayer(activeLayerId)}
              className="w-8 h-8 bg-purple-600/30 active:bg-purple-600 text-sky-400 active:text-white border border-sky-500/30 rounded-lg flex items-center justify-center shadow transition-all active:scale-90 cursor-pointer mx-auto"
              title="Centralizar Item"
            >
              <Target className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleMoveActiveLayer(15, 0)}
              className="w-8 h-8 bg-[#23242e] active:bg-purple-600 text-purple-300 active:text-white rounded-lg flex items-center justify-center shadow transition-all active:scale-90 cursor-pointer mx-auto"
              title="Mover para Direita (15px)"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <div></div>
            <button
              onClick={() => handleMoveActiveLayer(0, 15)}
              className="w-8 h-8 bg-[#23242e] active:bg-purple-600 text-purple-300 active:text-white rounded-lg flex items-center justify-center shadow transition-all active:scale-90 cursor-pointer mx-auto"
              title="Mover para Baixo (15px)"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <div></div>
          </div>
        </div>
      )}

      {/* Floating Pill when minimized */}
      {activeLayerId && !showTouchPad && (
        <button
          onClick={() => setShowTouchPad(true)}
          className="absolute bottom-14 right-3 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white px-3 py-1.5 rounded-full shadow-2xl border border-purple-400 flex items-center gap-1.5 text-xs font-bold z-30 animate-in fade-in cursor-pointer"
          title="Abrir Painel Mover & Ajustar"
        >
          <Target className="w-4 h-4 text-emerald-300" />
          <span>Mover & Ajustar</span>
        </button>
      )}

      {/* Canva Floating Right-Click / Touch Context Menu */}
      {contextMenu && (
        <div
          className={`fixed z-50 w-72 rounded-2xl border shadow-2xl backdrop-blur-md text-xs flex flex-col select-none animate-in fade-in zoom-in-95 duration-150 max-h-[82vh] overflow-y-auto scrollbar-thin ${
            theme === 'light'
              ? 'bg-white/95 border-slate-300 text-slate-800 shadow-slate-400/50'
              : 'bg-[#18181c]/95 border-[#383842] text-gray-200 shadow-black/90'
          }`}
          style={{
            left: Math.min(Math.max(10, contextMenu.x), window.innerWidth - 300),
            top: Math.min(Math.max(10, contextMenu.y), window.innerHeight - 520),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {(() => {
            const activeL = layers.find((l) => l.id === contextMenu.layerId);
            if (activeL) {
              const isTop = layers.length > 0 && layers[layers.length - 1].id === activeL.id;
              const isBottom = layers.length > 0 && layers[0].id === activeL.id;
              const isImage = activeL.type === 'image' || activeL.type === 'smart';

              return (
                <>
                  {/* Layer Header Card with Image Thumbnail Preview */}
                  <div className={`p-2.5 border-b text-[11px] font-semibold flex items-center gap-2.5 ${
                    theme === 'light' ? 'border-slate-100 bg-slate-50/80 text-slate-800' : 'border-[#2e2e36] bg-[#121215] text-gray-200'
                  }`}>
                    {isImage && activeL.content ? (
                      <div className="w-11 h-11 rounded-lg border border-purple-500/30 bg-[#0d0d10] overflow-hidden shrink-0 flex items-center justify-center p-0.5 shadow-inner">
                        <img src={activeL.content} alt={activeL.name} className="max-w-full max-h-full object-contain rounded" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-bold">
                        {activeL.type === 'text' ? <Type className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-bold text-xs text-purple-400">{activeL.name}</div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <span className="uppercase px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono font-bold text-[9px]">
                          {activeL.type}
                        </span>
                        <span>{activeL.width}x{activeL.height}px</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Visual Action: Replace Image (SUBSTITUIR IMAGEM) */}
                  {isImage && (
                    <div className="p-1.5 border-b border-[#2e2e36]/60 bg-emerald-950/20 space-y-1">
                      {/* Opção: Substituir Imagem */}
                      <button
                        onClick={() => handleTriggerReplaceImage(activeL.id)}
                        className={`w-full p-2 rounded-xl text-left flex items-center gap-2.5 transition-all cursor-pointer font-bold border ${
                          theme === 'light'
                            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200 shadow-xs'
                            : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30 shadow-xs'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                          <RefreshCw className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-xs font-bold leading-tight">Substituir Imagem...</span>
                          <span className="text-[10px] font-normal text-emerald-400/80 truncate">Trocar arquivo mantendo tamanho e posição</span>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          handleExportLayerAsImage(activeL.id);
                          setContextMenu(null);
                        }}
                        className={`w-full px-2.5 py-1.5 text-left flex items-center gap-2 transition-colors rounded-lg cursor-pointer text-[11px] ${
                          theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-[#25252c] text-gray-300'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Baixar Imagem PNG Isolada</span>
                      </button>
                    </div>
                  )}

                  {/* Layer Z-Index Ordering Actions */}
                  <div className="py-1">
                    <div className="px-3 py-1 text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                      Ordem da Camada
                    </div>
                    <button
                      disabled={isTop}
                      onClick={() => handleBringToFront(activeL.id)}
                      className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isTop
                          ? 'opacity-40 cursor-not-allowed'
                          : theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <ArrowUpToLine className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span>Trazer para o Topo (Frente)</span>
                    </button>
                    <button
                      disabled={isTop}
                      onClick={() => handleBringForward(activeL.id)}
                      className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isTop
                          ? 'opacity-40 cursor-not-allowed'
                          : theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <ChevronUp className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Avançar 1 Nível</span>
                    </button>
                    <button
                      disabled={isBottom}
                      onClick={() => handleSendBackward(activeL.id)}
                      className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isBottom
                          ? 'opacity-40 cursor-not-allowed'
                          : theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Recuar 1 Nível</span>
                    </button>
                    <button
                      disabled={isBottom}
                      onClick={() => handleSendToBack(activeL.id)}
                      className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        isBottom
                          ? 'opacity-40 cursor-not-allowed'
                          : theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span>Enviar para o Fundo (Trás)</span>
                    </button>
                  </div>

                  <div className={`my-1 border-t ${theme === 'light' ? 'border-slate-100' : 'border-[#2e2e36]'}`} />

                  {/* Alignment & Transform Actions */}
                  <div className="py-1">
                    <div className="px-3 py-1 text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                      Alinhamento & Transformação
                    </div>
                    <button
                      onClick={() => {
                        handleScaleActiveLayer(10);
                        setContextMenu(null);
                      }}
                      className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Aumentar Tamanho (+10%)</span>
                    </button>
                    <button
                      onClick={() => {
                        handleScaleActiveLayer(-10);
                        setContextMenu(null);
                      }}
                      className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <Minus className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Diminuir Tamanho (-10%)</span>
                    </button>

                    <button
                      onClick={() => handleCenterLayer(activeL.id)}
                      className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <AlignCenter className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>Centralizar na Estampa</span>
                    </button>
                    <button
                      onClick={() => handleFlipHorizontal(activeL.id)}
                      className={`w-full px-3 py-1.5 text-left flex items-center justify-between transition-colors cursor-pointer ${
                        theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FlipHorizontal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Espelhar Horizontalmente</span>
                      </div>
                      {activeL.flipX && <span className="text-[10px] font-bold text-sky-400">ON</span>}
                    </button>
                    <button
                      onClick={() => handleFlipVertical(activeL.id)}
                      className={`w-full px-3 py-1.5 text-left flex items-center justify-between transition-colors cursor-pointer ${
                        theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FlipVertical className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>Espelhar Verticalmente</span>
                      </div>
                      {activeL.flipY && <span className="text-[10px] font-bold text-sky-400">ON</span>}
                    </button>

                    {activeL.type === 'text' && (
                      <button
                        onClick={() => {
                          setEditingTextId(activeL.id);
                          setContextMenu(null);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer font-bold ${
                          theme === 'light' ? 'hover:bg-purple-50 text-purple-700' : 'hover:bg-[#2a2a32] text-purple-400'
                        }`}
                      >
                        <Type className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>Editar Texto no Canvas</span>
                      </button>
                    )}

                    {isImage && (
                      <>
                        <button
                          onClick={() => {
                            const isWordArt = activeL.name.toLowerCase().includes('wordart') || activeL.name.toLowerCase().includes('nuvem');
                            setModalDefaultTab(isWordArt ? 'words' : 'adjustments');
                            setIsImageModalOpen(true);
                            setContextMenu(null);
                          }}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer font-bold ${
                            theme === 'light' ? 'hover:bg-purple-50 text-purple-700' : 'hover:bg-[#2a2a32] text-pink-400'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                          <span>
                            {activeL.name.toLowerCase().includes('wordart') || activeL.name.toLowerCase().includes('nuvem')
                              ? 'Editar Palavras do WordArt'
                              : 'Edição Avançada de Imagem'}
                          </span>
                        </button>

                        <button
                          onClick={() => handleResizeForDevice(activeL.id, 'tablet')}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                            theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                          }`}
                        >
                          <Tablet className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span>Redimensionar p/ Tablet (iPad 4:3)</span>
                        </button>
                        <button
                          onClick={() => handleResizeForDevice(activeL.id, 'android')}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                            theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Redimensionar p/ Android Mobile (9:16)</span>
                        </button>
                        <button
                          onClick={() => handleResizeForDevice(activeL.id, 'macos')}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                            theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                          }`}
                        >
                          <Laptop className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Redimensionar p/ macOS (Retina 16:10)</span>
                        </button>
                        <button
                          onClick={() => handleFitLayerToWidth(activeL.id)}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer font-semibold ${
                            theme === 'light' ? 'hover:bg-cyan-50 text-cyan-800' : 'hover:bg-[#2a2a32] text-cyan-300 hover:text-white'
                          }`}
                        >
                          <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>Ajustar na Largura da Página</span>
                        </button>
                        <button
                          onClick={() => handleFillPrintArea(activeL.id)}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                            theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                          }`}
                        >
                          <Maximize className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Preencher Área de Estampa</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className={`my-1 border-t ${theme === 'light' ? 'border-slate-100' : 'border-[#2e2e36]'}`} />

                  {/* Actions: Duplicate, Lock, Hide, Delete */}
                  <div className="py-1">
                    {onDuplicateLayer && (
                      <button
                        onClick={() => {
                          onDuplicateLayer(activeL.id);
                          setContextMenu(null);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                          theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                        }`}
                      >
                        <Copy className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Duplicar Elemento</span>
                      </button>
                    )}

                    {onPasteFromClipboard && (
                      <button
                        onClick={() => {
                          onPasteFromClipboard();
                          setContextMenu(null);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer font-bold ${
                          theme === 'light' ? 'hover:bg-emerald-50 text-emerald-700' : 'hover:bg-[#2a2a32] text-emerald-400'
                        }`}
                      >
                        <Clipboard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Colar Transparência (Ctrl+V)</span>
                      </button>
                    )}

                    {onToggleLock && (
                      <button
                        onClick={() => {
                          onToggleLock(activeL.id);
                          setContextMenu(null);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between transition-colors cursor-pointer ${
                          theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {activeL.locked ? <Unlock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          <span>{activeL.locked ? 'Desbloquear Camada' : 'Bloquear Camada'}</span>
                        </div>
                      </button>
                    )}

                    {onToggleVisibility && (
                      <button
                        onClick={() => {
                          onToggleVisibility(activeL.id);
                          setContextMenu(null);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between transition-colors cursor-pointer ${
                          theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {activeL.visible ? <EyeOff className="w-3.5 h-3.5 text-gray-400 shrink-0" /> : <Eye className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                          <span>{activeL.visible ? 'Ocultar Camada' : 'Mostrar Camada'}</span>
                        </div>
                      </button>
                    )}

                    {onDeleteLayer && (
                      <button
                        onClick={() => {
                          onDeleteLayer(activeL.id);
                          setContextMenu(null);
                        }}
                        className="w-full px-3 py-1.5 text-left flex items-center gap-2.5 text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Excluir Elemento</span>
                      </button>
                    )}
                  </div>
                </>
              );
            }

            return (
              <div className="py-1">
                <div className="px-3 py-1 border-b text-[11px] font-semibold text-gray-400">
                  Ações da Tela
                </div>
                {onPasteFromClipboard && (
                  <button
                    onClick={() => {
                      onPasteFromClipboard();
                      setContextMenu(null);
                    }}
                    className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer font-bold ${
                      theme === 'light' ? 'hover:bg-emerald-50 text-emerald-700' : 'hover:bg-[#2a2a32] text-emerald-400'
                    }`}
                  >
                    <Clipboard className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Colar Transparência (Ctrl+V)</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    handleFitAllLayersToPageWidth();
                    setContextMenu(null);
                  }}
                  className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer font-semibold ${
                    theme === 'light' ? 'hover:bg-cyan-50 text-cyan-800' : 'hover:bg-[#2a2a32] text-cyan-300 hover:text-white'
                  }`}
                >
                  <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Ajustar Modelo na Largura da Página</span>
                </button>
                <button
                  onClick={() => {
                    onSelectLayer(null);
                    setContextMenu(null);
                  }}
                  className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                    theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                  }`}
                >
                  <Square className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>Deselecionar Tudo</span>
                </button>
                <button
                  onClick={() => {
                    setPan({ x: 0, y: 0 });
                    setZoom(1.0);
                    setContextMenu(null);
                  }}
                  className={`w-full px-3 py-1.5 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                    theme === 'light' ? 'hover:bg-purple-50 hover:text-purple-700' : 'hover:bg-[#2a2a32] hover:text-white'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Redefinir Posição / Zoom</span>
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* Advanced Image Adjustment & Filter Modal */}
      <ImageAdjustmentModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        activeLayer={layers.find((l) => l.id === activeLayerId) || null}
        onUpdateLayer={onUpdateLayer}
        pushHistoryStep={pushHistoryStep}
        allLayers={layers}
        theme={theme}
        defaultTab={modalDefaultTab}
      />

      {/* Lightbox High-Resolution Image Preview Modal */}
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

      {/* Hidden File Input for Replace Image */}
      <input
        type="file"
        ref={replaceImageInputRef}
        onChange={handleReplaceImageFileChange}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
};