import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Printer,
  Download,
  FlipHorizontal,
  Grid,
  Layers,
  Copy,
  Upload,
  Sparkles,
  Check,
  RotateCw,
  Sliders,
  Maximize2,
  FileText,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { Layer, SublimationProduct } from '../types';
import { PRESET_TEMPLATES } from '../data/presets';
import { drawVectorShape } from '../utils/shapeDrawer';
import { drawWarpedText } from '../utils/textWarp';

// Helper function to render a loaded .sublimation project JSON onto a high-res image
const renderSublimationProjectToDataUrl = async (
  layers: Layer[],
  product?: SublimationProduct
): Promise<string> => {
  const canvasWidth = product?.defaultWidthCm ? Math.round((product.defaultWidthCm / 2.54) * 150) : 1200;
  const canvasHeight = product?.defaultHeightCm ? Math.round((product.defaultHeightCm / 2.54) * 150) : 560;

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(600, canvasWidth);
  canvas.height = Math.max(280, canvasHeight);
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // White printable canvas background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Preload all image assets across layers
  const imagePromises: Promise<{ id: string; img: HTMLImageElement | null }>[] = layers.map((layer) => {
    if (
      layer.content &&
      (layer.type === 'image' ||
        layer.type === 'smart' ||
        layer.content.startsWith('data:') ||
        layer.content.startsWith('http') ||
        layer.content.startsWith('/'))
    ) {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve({ id: layer.id, img });
        img.onerror = () => resolve({ id: layer.id, img: null });
        img.src = layer.content;
      });
    }
    return Promise.resolve({ id: layer.id, img: null });
  });

  const loadedImages = await Promise.all(imagePromises);
  const imageMap = new Map<string, HTMLImageElement>();
  loadedImages.forEach((item) => {
    if (item.img) imageMap.set(item.id, item.img);
  });

  // Render each layer in array sequence
  for (const layer of layers) {
    if (layer.visible === false) continue;

    ctx.save();
    ctx.translate(layer.x, layer.y);

    if (layer.rotation) {
      ctx.translate(layer.width / 2, layer.height / 2);
      ctx.rotate((layer.rotation * Math.PI) / 180);
      ctx.translate(-layer.width / 2, -layer.height / 2);
    }

    if (layer.flipX || layer.flipY) {
      ctx.translate(layer.width / 2, layer.height / 2);
      ctx.scale(layer.flipX ? -1 : 1, layer.flipY ? -1 : 1);
      ctx.translate(-layer.width / 2, -layer.height / 2);
    }

    if (layer.opacity !== undefined) {
      ctx.globalAlpha = Math.max(0, Math.min(1, layer.opacity / 100));
    }

    const img = imageMap.get(layer.id);
    if (img) {
      ctx.drawImage(img, 0, 0, layer.width, layer.height);
    } else if (layer.type === 'shape') {
      const shapeType = layer.shapeType || 'rectangle';
      drawVectorShape(
        ctx,
        shapeType,
        layer.width,
        layer.height,
        layer.color || '#38bdf8',
        layer.strokeColor,
        layer.strokeWidth
      );
    } else if (layer.type === 'text') {
      drawWarpedText(ctx, layer, layer.color || '#000000');
    }

    ctx.restore();
  }

  return canvas.toDataURL('image/png');
};

interface Mug3In1SheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasElement: HTMLCanvasElement | null;
  currentProduct?: SublimationProduct;
  mirrorSublimation?: boolean;
  darkMode?: boolean;
  onShowSnackbar?: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export interface Mug3In1SheetViewProps {
  canvasElement: HTMLCanvasElement | null;
  currentProduct?: SublimationProduct;
  mirrorSublimation?: boolean;
  darkMode?: boolean;
  onShowSnackbar?: (msg: string, type: 'success' | 'info' | 'error') => void;
  onSendToRip?: (dataUrl: string) => void;
  onCloseModal?: () => void;
}

export interface MugSlotData {
  id: number;
  label: string;
  sourceType: 'current' | 'preset' | 'custom';
  dataUrl: string | null;
  title: string;
}

export const Mug3In1SheetView: React.FC<Mug3In1SheetViewProps> = ({
  canvasElement,
  currentProduct,
  mirrorSublimation = true,
  darkMode = true,
  onShowSnackbar,
  onSendToRip,
  onCloseModal,
}) => {
  const [currentCanvasDataUrl, setCurrentCanvasDataUrl] = useState<string | null>(null);
  const [isMirror, setIsMirror] = useState<boolean>(mirrorSublimation);
  const [showCropMarks, setShowCropMarks] = useState<boolean>(true);
  const [showDottedGuides, setShowDottedGuides] = useState<boolean>(true);
  const [resolutionDpi, setResolutionDpi] = useState<300 | 600>(300);

  // Spacing & Margins in millimeters
  const [topMarginMm, setTopMarginMm] = useState<number>(6);
  const [leftMarginMm, setLeftMarginMm] = useState<number>(3);
  const [gapBetweenSlotsMm, setGapBetweenSlotsMm] = useState<number>(2);

  // Slot states
  const [slots, setSlots] = useState<MugSlotData[]>([
    { id: 1, label: 'Caneca 1 (Topo)', sourceType: 'current', dataUrl: null, title: 'Arte Atual do Projeto' },
    { id: 2, label: 'Caneca 2 (Meio)', sourceType: 'current', dataUrl: null, title: 'Arte Atual do Projeto' },
    { id: 3, label: 'Caneca 3 (Base)', sourceType: 'current', dataUrl: null, title: 'Arte Atual do Projeto' },
  ]);

  const [activeSlotToSelect, setActiveSlotToSelect] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Capture canvas data URL on mount or change
  useEffect(() => {
    const c = canvasElement || (document.querySelector('canvas') as HTMLCanvasElement);
    if (c) {
      try {
        const url = c.toDataURL('image/png');
        setCurrentCanvasDataUrl(url);
        setSlots((prev) =>
          prev.map((slot) =>
            slot.sourceType === 'current' ? { ...slot, dataUrl: url } : slot
          )
        );
      } catch (e) {
        console.warn('Canvas toDataURL failed:', e);
      }
    }
  }, [canvasElement]);

  // Replicate current project to all 3 slots
  const handleReplicateCurrentToAll = () => {
    const c = canvasElement || (document.querySelector('canvas') as HTMLCanvasElement);
    const url = c ? c.toDataURL('image/png') : currentCanvasDataUrl;
    setSlots([
      { id: 1, label: 'Caneca 1 (Topo)', sourceType: 'current', dataUrl: url, title: 'Arte Atual do Projeto' },
      { id: 2, label: 'Caneca 2 (Meio)', sourceType: 'current', dataUrl: url, title: 'Arte Atual do Projeto' },
      { id: 3, label: 'Caneca 3 (Base)', sourceType: 'current', dataUrl: url, title: 'Arte Atual do Projeto' },
    ]);
    if (onShowSnackbar) {
      onShowSnackbar('Arte do projeto repetida nas 3 posições da folha A4!', 'info');
    }
  };

  // Apply preset to active slot
  const handleSelectPresetForSlot = (slotId: number, presetUrl: string, presetTitle: string) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId
          ? { ...s, sourceType: 'preset', dataUrl: presetUrl, title: presetTitle }
          : s
      )
    );
    setActiveSlotToSelect(null);
    if (onShowSnackbar) {
      onShowSnackbar(`Modelo "${presetTitle}" aplicado ao Slot ${slotId}!`, 'success');
    }
  };

  // Handle custom file upload for slot (Supports both images and .sublimation project files)
  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSlotId = activeSlotToSelect;
    if (!targetSlotId || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const isSublimation =
      file.name.toLowerCase().endsWith('.sublimation') ||
      file.name.toLowerCase().endsWith('.json') ||
      file.type === 'application/json';

    if (isSublimation) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const jsonText = event.target?.result as string;
          const projectData = JSON.parse(jsonText);

          if (projectData && Array.isArray(projectData.layers)) {
            const projectTitle =
              projectData.projectName ||
              file.name.replace(/\.sublimation$/i, '').replace(/\.json$/i, '');
            const renderedDataUrl = await renderSublimationProjectToDataUrl(
              projectData.layers,
              projectData.product || currentProduct
            );

            setSlots((prev) =>
              prev.map((s) =>
                s.id === targetSlotId
                  ? {
                      ...s,
                      sourceType: 'custom',
                      dataUrl: renderedDataUrl,
                      title: `${projectTitle} (.sublimation)`,
                    }
                  : s
              )
            );
            setActiveSlotToSelect(null);
            if (onShowSnackbar) {
              onShowSnackbar(
                `Projeto "${projectTitle}" (.sublimation) renderizado com sucesso na posição ${targetSlotId}!`,
                'success'
              );
            }
          } else {
            throw new Error('Arquivo de projeto inválido');
          }
        } catch (err) {
          console.error('Erro ao renderizar .sublimation:', err);
          if (onShowSnackbar) {
            onShowSnackbar('Não foi possível renderizar o arquivo .sublimation selecionado.', 'error');
          }
        }
      };
      reader.readAsText(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setSlots((prev) =>
            prev.map((s) =>
              s.id === targetSlotId
                ? { ...s, sourceType: 'custom', dataUrl: result, title: file.name }
                : s
            )
          );
          setActiveSlotToSelect(null);
          if (onShowSnackbar) {
            onShowSnackbar(`Imagem personalizada "${file.name}" carregada no Slot ${targetSlotId}!`, 'success');
          }
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  // Render Full A4 Canvas at High Resolution with preloaded images
  const generateFullA4Canvas = async (): Promise<HTMLCanvasElement> => {
    const dpi = resolutionDpi;
    const mmToPx = (mm: number) => Math.round((mm / 25.4) * dpi);

    const a4WidthPx = mmToPx(210); // ~2480px at 300DPI
    const a4HeightPx = mmToPx(297); // ~3508px at 300DPI

    const canvas = document.createElement('canvas');
    canvas.width = a4WidthPx;
    canvas.height = a4HeightPx;
    const ctx = canvas.getContext('2d');

    if (!ctx) return canvas;

    // Preload all slot images concurrently to ensure complete rendering
    const loadedSlotImages = await Promise.all(
      slots.map((slot) => {
        if (!slot.dataUrl) return Promise.resolve(null);
        return new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = (err) => {
            console.warn('Failed to load slot image', slot.id, err);
            resolve(null);
          };
          img.src = slot.dataUrl;
        });
      })
    );

    // White paper background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, a4WidthPx, a4HeightPx);

    // Mug strip dimensions
    const mugWidthMm = currentProduct?.widthMm || 204;
    const mugHeightMm = currentProduct?.heightMm || 95;

    const mugW = mmToPx(mugWidthMm);
    const mugH = mmToPx(mugHeightMm);

    const leftX = mmToPx(leftMarginMm);
    const topStartY = mmToPx(topMarginMm);
    const gapY = mmToPx(gapBetweenSlotsMm);

    slots.forEach((slot, index) => {
      const slotY = topStartY + index * (mugH + gapY);
      const img = loadedSlotImages[index];

      // Render image or placeholder
      ctx.save();

      if (img) {
        // If mirror is enabled, flip horizontally per mug wrap strip
        if (isMirror) {
          ctx.translate(leftX + mugW, slotY);
          ctx.scale(-1, 1);
          ctx.drawImage(img, 0, 0, mugW, mugH);
        } else {
          ctx.drawImage(img, leftX, slotY, mugW, mugH);
        }
      } else {
        // Placeholder rectangle
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(leftX, slotY, mugW, mugH);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(leftX, slotY, mugW, mugH);

        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Posição ${slot.id} - Sem Arte`, leftX + mugW / 2, slotY + mugH / 2);
      }

      ctx.restore();

      // Draw Crop marks / Cut line boundaries
      if (showCropMarks) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = Math.max(1, dpi / 150);
        ctx.setLineDash([8, 8]);
        ctx.strokeRect(leftX, slotY, mugW, mugH);
        ctx.setLineDash([]);

        // Cut indicator text
        ctx.fillStyle = '#ef4444';
        ctx.font = `${Math.max(12, Math.round(dpi / 25))}px monospace`;
        ctx.fillText(`✂️ Corte Caneca ${slot.id}`, leftX + 10, slotY - 4 > 12 ? slotY - 4 : slotY + 20);
      }
    });

    return canvas;
  };

  // Send High-Res A4 Sheet Directly to Central RIP
  const handleSendToRip = async () => {
    setIsExporting(true);
    try {
      const a4Canvas = await generateFullA4Canvas();
      const dataUrl = a4Canvas.toDataURL('image/png');
      setIsExporting(false);
      if (onSendToRip) {
        onSendToRip(dataUrl);
      } else if (onShowSnackbar) {
        onShowSnackbar('Folha A4 3 em 1 enviada para a Central RIP!', 'success');
      }
    } catch (err) {
      console.error('Erro ao enviar folha A4 para RIP:', err);
      setIsExporting(false);
    }
  };

  // Export A4 PNG / PDF
  const handleExportA4 = async () => {
    setIsExporting(true);
    try {
      const a4Canvas = await generateFullA4Canvas();
      const link = document.createElement('a');
      link.download = `Folha_A4_3_Canecas_${resolutionDpi}DPI_${isMirror ? 'Espelhado' : 'Normal'}.png`;
      link.href = a4Canvas.toDataURL('image/png', 0.95);
      link.click();
      setIsExporting(false);

      if (onShowSnackbar) {
        onShowSnackbar(`Folha A4 com 3 Canecas (${resolutionDpi} DPI) exportada com sucesso!`, 'success');
      }
    } catch (err) {
      console.error('Erro ao exportar A4:', err);
      setIsExporting(false);
    }
  };

  // Direct Hardware Print A4
  const handlePrintA4 = async () => {
    setIsExporting(true);
    try {
      const a4Canvas = await generateFullA4Canvas();
      const dataUrl = a4Canvas.toDataURL('image/png');
      setIsExporting(false);

      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Imprimir Folha A4 - 3 Canecas Sublimação</title>
              <style>
                @page { size: A4 portrait; margin: 0; }
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: #fff; }
                img { width: 210mm; height: 297mm; object-fit: contain; }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" />
              <script>
                window.onload = function() { window.print(); window.close(); };
              </script>
            </body>
          </html>
        `);
        printWin.document.close();
      } else {
        window.print();
      }

      if (onShowSnackbar) {
        onShowSnackbar('Comando de impressão enviado para a folha A4 (3 em 1)!', 'success');
      }
    } catch (err) {
      console.error('Erro ao imprimir A4:', err);
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCustomFileUpload}
        accept="image/*,.sublimation,.json"
        className="hidden"
      />

      {/* Header Bar within View */}
      <div className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between gap-3 shrink-0 ${
        darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-2xl">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 uppercase tracking-tight">
                Montagem 3 em 1 A4 — Impressão de 3 Canecas na Folha
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Economia de Papel Sublimático
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Aproveitamento total da folha A4 (210 x 297 mm) para imprimir até 3 faixas de caneca (204 x 95 mm) simultaneamente.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReplicateCurrentToAll}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-bold rounded-2xl transition-all cursor-pointer"
            title="Repetir a arte do projeto atual em todos os 3 espaços da folha"
          >
            <Copy className="w-4 h-4 text-purple-300" />
            <span className="hidden sm:inline">Repetir Arte nas 3 Posições</span>
          </button>

          <button
            onClick={handleSendToRip}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:brightness-110 text-white font-black text-xs rounded-2xl shadow-lg shadow-purple-600/25 transition-all cursor-pointer uppercase tracking-wider active:scale-95"
          >
            <Printer className="w-4 h-4 text-purple-200" />
            <span>ENVIAR PARA CENTRAL RIP</span>
          </button>

          {onCloseModal && (
            <button
              onClick={onCloseModal}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                darkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar touch-scroll-y min-h-0 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Interactive A4 Sheet Visualizer */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className={`relative border rounded-2xl p-4 flex flex-col items-center justify-center min-h-[440px] overflow-hidden ${
            darkMode ? 'bg-[#090b12] border-[#222638]' : 'bg-slate-200 border-slate-300'
          }`}>
            {/* Background Page Label */}
            <div className="absolute top-3 left-3 bg-slate-900/80 text-purple-300 px-3 py-1 rounded-xl text-[10px] font-mono font-bold border border-purple-500/30 flex items-center gap-1.5 z-10 shadow-md">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>FOLHA A4 (210 x 297 mm) — 3 CANECAS</span>
            </div>

            {/* A4 Sheet Container */}
            <div
              className="relative bg-white shadow-2xl rounded-sm border-2 border-slate-300 p-2 flex flex-col items-center justify-between transition-all overflow-hidden"
              style={{
                width: '280px',
                height: '396px',
              }}
            >
              {/* 3 Mug Slots Stacked Vertically */}
              {slots.map((slot) => {
                return (
                  <div
                    key={slot.id}
                    onClick={() => setActiveSlotToSelect(slot.id)}
                    className={`relative w-[260px] h-[115px] border-2 rounded-md flex flex-col items-center justify-center overflow-hidden transition-all cursor-pointer group ${
                      activeSlotToSelect === slot.id
                        ? 'border-purple-500 ring-2 ring-purple-500/50 shadow-lg'
                        : 'border-slate-300 hover:border-purple-400 bg-slate-50/80'
                    }`}
                  >
                    {slot.dataUrl ? (
                      <img
                        src={slot.dataUrl}
                        alt={slot.label}
                        className={`w-full h-full object-cover transition-transform ${
                          isMirror ? 'scale-x-[-1]' : ''
                        }`}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400">
                        <ImageIcon className="w-6 h-6 mb-1 text-slate-300" />
                        <span className="text-[10px] font-bold">Clique para Adicionar Arte</span>
                      </div>
                    )}

                    {/* Directional Up Arrow + Slot ID Badge */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-30 group-hover:opacity-70 transition-opacity">
                      <div className="flex flex-col items-center justify-center text-slate-800/80 font-black font-mono">
                        <span className="text-xl leading-none">▲</span>
                        <span className="text-2xl font-black leading-none">{slot.id}</span>
                      </div>
                    </div>

                    {/* Top Right Slot Label */}
                    <div className="absolute top-1.5 right-1.5 bg-slate-900/80 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wide backdrop-blur-sm shadow">
                      {slot.id} • {slot.sourceType === 'current' ? 'Projeto Atual' : 'Arte Selecionada'}
                    </div>

                    {/* Cut Line Guide Overlay */}
                    {showCropMarks && (
                      <div className="absolute inset-0 border border-dashed border-red-500/70 pointer-events-none">
                        <span className="absolute bottom-1 left-1 text-[8px] bg-red-600 text-white font-bold px-1 rounded opacity-80">
                          ✂️ Linha de Corte
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mirror Indicator */}
            {isMirror && (
              <div className="absolute bottom-3 bg-amber-500 text-slate-950 px-3 py-1 rounded-full font-black text-[10px] uppercase shadow-md flex items-center gap-1.5">
                <FlipHorizontal className="w-3.5 h-3.5" />
                <span>Espelhado para Sublimação (Transfer)</span>
              </div>
            )}
          </div>

          {/* Quick Layout Controls */}
          <div className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-2 text-xs font-bold ${
            darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
          }`}>
            <button
              onClick={() => setIsMirror(!isMirror)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all ${
                isMirror
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : darkMode ? 'bg-[#1d2133] border-[#2b304a] text-slate-400' : 'bg-white border-slate-300 text-slate-600'
              }`}
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
              <span>Espelhar Impressão: {isMirror ? 'SIM' : 'NÃO'}</span>
            </button>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showCropMarks}
                onChange={(e) => setShowCropMarks(e.target.checked)}
                className="rounded accent-purple-600"
              />
              <span>Marcas de Corte (Tesoura)</span>
            </label>

            <div className="flex items-center gap-1 text-[11px] font-mono text-purple-300">
              <span>DPI:</span>
              {[300, 600].map((dpi) => (
                <button
                  key={dpi}
                  onClick={() => setResolutionDpi(dpi as any)}
                  className={`px-2 py-0.5 rounded border ${
                    resolutionDpi === dpi
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {dpi}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Slot Editors & Preset Picker */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className={`p-4 rounded-2xl border space-y-4 ${
            darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Configuração dos 3 Espaços de Caneca</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Tam. Faixa: {currentProduct?.widthMm || 204} x {currentProduct?.heightMm || 95} mm
              </span>
            </h4>

            {/* Slots List */}
            <div className="space-y-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    activeSlotToSelect === slot.id
                      ? 'bg-purple-600/15 border-purple-500 ring-1 ring-purple-500'
                      : darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-purple-500/40 flex items-center justify-center font-mono font-black text-purple-300 shrink-0 overflow-hidden">
                      {slot.dataUrl ? (
                        <img src={slot.dataUrl} alt={slot.title} className="w-full h-full object-cover" />
                      ) : (
                        <span>{slot.id}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-200">{slot.label}</span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[180px]">{slot.title}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        const c = canvasElement || (document.querySelector('canvas') as HTMLCanvasElement);
                        const url = c ? c.toDataURL('image/png') : currentCanvasDataUrl;
                        setSlots((prev) =>
                          prev.map((s) =>
                            s.id === slot.id
                              ? { ...s, sourceType: 'current', dataUrl: url, title: 'Arte Atual do Projeto' }
                              : s
                          )
                        );
                      }}
                      className="px-2 py-1 bg-purple-600/30 hover:bg-purple-600 text-purple-200 text-[10px] font-bold rounded-lg border border-purple-500/40 transition-all cursor-pointer"
                      title="Usar arte do projeto atual"
                    >
                      Arte Atual
                    </button>

                    <button
                      onClick={() => {
                        setActiveSlotToSelect(slot.id);
                        if (fileInputRef.current) fileInputRef.current.click();
                      }}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg border border-slate-700 transition-all cursor-pointer flex items-center gap-1"
                      title="Carregar imagem ou projeto .sublimation"
                    >
                      <Upload className="w-3 h-3 text-cyan-400" />
                      <span>Carregar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Export / Print / RIP Buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleSendToRip}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:brightness-110 text-white font-black text-xs rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider active:scale-98"
              >
                <Printer className="w-4 h-4 text-purple-200" />
                <span>ENVIAR PARA CENTRAL RIP (IMPRESSÃO COM ICC)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={isExporting}
                  onClick={handleExportA4}
                  className="py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isExporting ? 'GERANDO...' : `EXPORTAR PNG/PDF`}</span>
                </button>

                <button
                  onClick={handlePrintA4}
                  className="py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>IMPRIMIR DIRETO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Mug3In1SheetModal: React.FC<Mug3In1SheetModalProps> = ({
  isOpen,
  onClose,
  canvasElement,
  currentProduct,
  mirrorSublimation = true,
  darkMode = true,
  onShowSnackbar,
  onSendToRip,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 select-none p-2 sm:p-4 animate-fade-in touch-scroll-y"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full max-w-6xl rounded-3xl shadow-2xl border flex flex-col max-h-[94dvh] overflow-hidden transition-all pb-[env(safe-area-inset-bottom,0px)] ${
          darkMode
            ? 'bg-[#0f1118] border-[#222638] text-slate-100 shadow-purple-950/40'
            : 'bg-white border-slate-200 text-slate-800 shadow-slate-400/30'
        }`}
      >
        <Mug3In1SheetView
          canvasElement={canvasElement}
          currentProduct={currentProduct}
          mirrorSublimation={mirrorSublimation}
          darkMode={darkMode}
          onShowSnackbar={onShowSnackbar}
          onSendToRip={(dataUrl) => {
            if (onSendToRip) {
              onSendToRip(dataUrl);
            }
            onClose();
          }}
          onCloseModal={onClose}
        />
      </div>
    </div>
  );
};

