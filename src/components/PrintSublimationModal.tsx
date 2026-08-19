import React, { useState, useEffect, useRef } from 'react';
import {
  Printer,
  Flame,
  Clock,
  Play,
  Pause,
  RotateCcw,
  X,
  Check,
  Wifi,
  Sliders,
  Sparkles,
  Droplets,
  Layers,
  Wrench,
  HelpCircle,
  FileText,
  Download,
  FlipHorizontal,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  AlertTriangle,
  Zap,
  Volume2,
  VolumeX,
  ShieldCheck,
  CheckCircle2,
  Award,
  ChevronRight,
  Save,
  Grid,
  Search,
  Bookmark,
  Settings,
  BookOpen,
  Scissors,
  CheckSquare,
  ArrowRight
} from 'lucide-react';
import { Mug3In1SheetView } from './Mug3In1SheetModal';
import { SUBLIMATION_PRESS_PRESETS, calculateInkAndCost } from '../utils/pressEngine';
import { PrintableProduct } from '../types';
import { usePrinterStore } from '../store/usePrinterStore';
import { usePrintSettingsStore } from '../store/usePrintSettingsStore';
import { usePrintPresetStore } from '../store/usePrintPresetStore';
import { StorageService } from '../services/storage/StorageService';
import { PrintPreset, PrintSettings } from '../services/printer/PrinterTypes';

interface PrintSublimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'rip' | 'mug3in1' | 'press' | 'icc' | 'status' | 'support';
  initialA4DataUrl?: string;
  onExportMirrorPNG?: () => void;
  currentProduct?: PrintableProduct | any;
  darkMode?: boolean;
  canvasElement?: HTMLCanvasElement | null;
  mirrorSublimation?: boolean;
  onShowSnackbar?: (msg: string, type: 'success' | 'info' | 'error') => void;
  onOpenPrinterSettings?: () => void;
  onOpenMug3In1?: () => void;
}

export const PrintSublimationModal: React.FC<PrintSublimationModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'rip',
  initialA4DataUrl,
  onExportMirrorPNG,
  currentProduct,
  darkMode = true,
  canvasElement,
  mirrorSublimation = true,
  onShowSnackbar,
  onOpenPrinterSettings,
  onOpenMug3In1,
}) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'rip' | 'mug3in1' | 'press' | 'icc' | 'status' | 'support'>(initialTab || 'rip');

  // Sync initialTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || 'rip');
    }
  }, [isOpen, initialTab]);

  // Printer & Settings Stores
  const { selectedPrinter, printers, selectPrinter } = usePrinterStore();
  const { settings, updateSettings } = usePrintSettingsStore(selectedPrinter?.id || 'pwa_epson_l3250');
  const { presets } = usePrintPresetStore();

  // Substrate / Press State
  const [selectedPresetId, setSelectedPresetId] = useState('mug_ceramic');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'fabric' | 'rigid' | 'glass' | '3d'>('all');
  const [tempC, setTempC] = useState(195);
  const [timeSec, setTimeSec] = useState(180);
  const [pressureLevel, setPressureLevel] = useState<'Leve' | 'Média' | 'Alta'>('Alta');
  const [paperType, setPaperType] = useState('Papel Sublimático Resinado Premium (100g/m²)');

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // RIP & Preview Options
  const [resolutionDpi, setResolutionDpi] = useState<300 | 600 | 1200>(1200);
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | 'tiff' | 'svg' | 'jpg'>('png');
  const [mirrorEnabled, setMirrorEnabled] = useState(mirrorSublimation);
  const [showBleedLines, setShowBleedLines] = useState(true);
  const [showCropMarks, setShowCropMarks] = useState(true);
  const [showRulerGrid, setShowRulerGrid] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string | null>(null);
  const [isA43In1Active, setIsA43In1Active] = useState<boolean>(false);

  // Fetch & Apply Saved Printer Settings
  const handleLoadSavedSettings = (presetToApply?: PrintPreset) => {
    let targetSettings = settings;
    let label = selectedPrinter?.displayName || 'Epson Subli-Pro L3250';

    if (presetToApply) {
      targetSettings = presetToApply.settings;
      if (presetToApply.printerId) {
        selectPrinter(presetToApply.printerId);
      }
      updateSettings(targetSettings);
      label = presetToApply.name;
    } else {
      const saved = StorageService.getItem<PrintSettings | null>('currentPrintSettings', null);
      if (saved) {
        targetSettings = saved;
        updateSettings(saved);
      }
    }

    if (targetSettings) {
      if (targetSettings.dpi && [300, 600, 1200].includes(targetSettings.dpi)) {
        setResolutionDpi(targetSettings.dpi as 300 | 600 | 1200);
      }
      if (targetSettings.mirror !== undefined) {
        setMirrorEnabled(targetSettings.mirror);
      }
      if (targetSettings.iccProfile) {
        setSelectedIccProfile(targetSettings.iccProfile);
      }
      if (targetSettings.mediaType) {
        setPaperType(targetSettings.mediaType);
      }
    }

    if (onShowSnackbar) {
      onShowSnackbar(
        `Configurações salvas de "${label}" carregadas! (${targetSettings.dpi || 1200} DPI, Espelho: ${targetSettings.mirror ? 'Sim' : 'Não'}, Profile: ${targetSettings.iccProfile || 'subli_vibrant_hd'})`,
        'success'
      );
    }
  };

  // Auto-sync saved printer settings when opening modal
  useEffect(() => {
    if (isOpen) {
      const saved = StorageService.getItem<PrintSettings | null>('currentPrintSettings', null);
      if (saved) {
        if (saved.dpi && [300, 600, 1200].includes(saved.dpi)) {
          setResolutionDpi(saved.dpi as any);
        }
        if (saved.mirror !== undefined) {
          setMirrorEnabled(saved.mirror);
        }
        if (saved.iccProfile) {
          setSelectedIccProfile(saved.iccProfile);
        }
        if (saved.mediaType) {
          setPaperType(saved.mediaType);
        }
      }
    }
  }, [isOpen]);

  // Capture canvas data URL on open or apply initialA4DataUrl
  useEffect(() => {
    if (isOpen) {
      if (initialA4DataUrl) {
        setCanvasDataUrl(initialA4DataUrl);
        setIsA43In1Active(true);
        if (initialTab) setActiveTab(initialTab);
      } else {
        if (initialTab) setActiveTab(initialTab);
        if (!isA43In1Active) {
          const c = canvasElement || (document.querySelector('canvas') as HTMLCanvasElement);
          if (c) {
            try {
              setCanvasDataUrl(c.toDataURL('image/png'));
            } catch (e) {
              console.warn('Canvas toDataURL failed:', e);
            }
          }
        }
      }
    }
  }, [isOpen, canvasElement, initialA4DataUrl, initialTab]);

  // ICC Color Profile State
  const [selectedIccProfile, setSelectedIccProfile] = useState('subli_vibrant_hd');
  const [pureBlackBooster, setPureBlackBooster] = useState(true);
  const [colorSaturation, setColorSaturation] = useState(115); // +15% default for vibrant sublimation
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(105);

  // Wireless & Ink Maintenance State
  const [wifiConnected, setWifiConnected] = useState(true);
  const [isCleaningHead, setIsCleaningHead] = useState(false);
  const [maintenanceSuccess, setMaintenanceSuccess] = useState<string | null>(null);
  const [customPresets, setCustomPresets] = useState<{ name: string; temp: number; time: number }[]>([]);
  const [newPresetName, setNewPresetName] = useState('');

  // Tutorial checklist state
  const [tutorialChecklist, setTutorialChecklist] = useState({
    printer: true,
    paper: true,
    montagem: true,
    mirror: true,
    crop: true,
    icc: true,
    tape: false,
    press: false
  });

  const activePreset = SUBLIMATION_PRESS_PRESETS.find((p) => p.id === selectedPresetId) || SUBLIMATION_PRESS_PRESETS[0];

  // Ink levels simulation
  const [inkLevels, setInkLevels] = useState({
    cyan: 82,
    magenta: 18, // Low ink alert
    yellow: 75,
    black: 91,
    lightCyan: 65,
    lightMagenta: 70
  });

  // Sync preset settings when selected
  useEffect(() => {
    if (activePreset) {
      setTempC(activePreset.temperatureC);
      setTimeSec(activePreset.timeSeconds);
      setPressureLevel(activePreset.pressure);
      setPaperType(activePreset.paperType);
      setTimerSeconds(activePreset.timeSeconds);
      setIsTimerRunning(false);
    }
  }, [selectedPresetId]);

  // Live Timer Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (soundEnabled) {
        playCompletionBeep();
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, soundEnabled]);

  // Web Audio Synth Beep on Timer Complete
  const playCompletionBeep = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playTone = (freq: number, startSec: number, durationSec: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startSec);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + startSec);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startSec + durationSec);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + startSec);
        osc.stop(ctx.currentTime + startSec + durationSec);
      };

      playTone(880, 0, 0.2);
      playTone(1174, 0.25, 0.3);
      playTone(1760, 0.6, 0.5);
    } catch (err) {
      console.log('Audio notification skipped');
    }
  };

  // Perform nozzle clean / maintenance simulation
  const handleRunMaintenance = (actionName: string) => {
    setIsCleaningHead(true);
    setMaintenanceSuccess(null);
    setTimeout(() => {
      setIsCleaningHead(false);
      setMaintenanceSuccess(`Manutenção "${actionName}" concluída com sucesso! Cabeçote desentupido e calibrado.`);
      setTimeout(() => setMaintenanceSuccess(null), 5000);
    }, 2500);
  };

  // Save custom preset
  const handleSaveCustomPreset = () => {
    if (!newPresetName.trim()) return;
    setCustomPresets([...customPresets, { name: newPresetName.trim(), temp: tempC, time: timeSec }]);
    setNewPresetName('');
  };

  // High-Resolution Export Handler
  const handlePerformExport = (formatOverride?: string) => {
    const fmt = formatOverride || exportFormat;
    const c = canvasElement || (document.querySelector('canvas') as HTMLCanvasElement);
    setIsExporting(true);

    const widthMm = isA43In1Active ? 210 : (currentProduct?.widthMm || 204);
    const heightMm = isA43In1Active ? 297 : (currentProduct?.heightMm || 90);

    // Convert mm to inches -> pixels at selected DPI
    const widthInches = widthMm / 25.4;
    const heightInches = heightMm / 25.4;
    const pixelWidth = Math.round(widthInches * resolutionDpi);
    const pixelHeight = Math.round(heightInches * resolutionDpi);

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = pixelWidth;
    exportCanvas.height = pixelHeight;
    const ctx = exportCanvas.getContext('2d');

    const renderAndDownload = (sourceImgOrCanvas: CanvasImageSource | null) => {
      if (ctx) {
        // White background for non-transparent formats
        if (fmt !== 'png' && fmt !== 'svg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        }

        ctx.save();
        // Handle Horizontal Mirroring
        if (mirrorEnabled) {
          ctx.translate(exportCanvas.width, 0);
          ctx.scale(-1, 1);
        }

        if (sourceImgOrCanvas) {
          ctx.drawImage(sourceImgOrCanvas, 0, 0, exportCanvas.width, exportCanvas.height);
        } else if (c) {
          ctx.drawImage(c, 0, 0, exportCanvas.width, exportCanvas.height);
        } else {
          ctx.fillStyle = '#6b21a8';
          ctx.font = 'bold 32px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(currentProduct?.name || 'Estampa Sublimática', exportCanvas.width / 2, exportCanvas.height / 2);
        }

        ctx.restore();

        // Add 3mm Bleed lines overlay if enabled
        if (showBleedLines) {
          const bleedPx = Math.round((3 / 25.4) * resolutionDpi);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.lineWidth = Math.max(2, resolutionDpi / 150);
          ctx.strokeRect(bleedPx, bleedPx, exportCanvas.width - bleedPx * 2, exportCanvas.height - bleedPx * 2);
        }
      }

      // Download generated file
      const link = document.createElement('a');
      const prodName = isA43In1Active ? 'Folha_A4_3_em_1' : (currentProduct?.name || 'Estampa').replace(/\s+/g, '_');
      const ext = fmt === 'jpg' ? 'jpg' : fmt;
      link.download = `Sublim_Studio_${prodName}_${resolutionDpi}DPI_${mirrorEnabled ? 'Espelhado' : 'Normal'}.${ext}`;

      const mimeType = fmt === 'jpg' ? 'image/jpeg' : fmt === 'pdf' ? 'application/pdf' : 'image/png';
      link.href = exportCanvas.toDataURL(mimeType, 0.95);
      link.click();

      setIsExporting(false);
      if (onShowSnackbar) {
        onShowSnackbar(`Arquivo (${fmt.toUpperCase()} ${resolutionDpi} DPI) exportado com sucesso!`, 'success');
      } else if (onExportMirrorPNG) {
        onExportMirrorPNG();
      }
    };

    if (canvasDataUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => renderAndDownload(img);
      img.onerror = () => renderAndDownload(c);
      img.src = canvasDataUrl;
    } else {
      renderAndDownload(c);
    }
  };

  // Direct Hardware Printer Trigger
  const handleTriggerDirectPrint = () => {
    const c = canvasElement || (document.querySelector('canvas') as HTMLCanvasElement);
    const printDataUrl = canvasDataUrl || (c ? c.toDataURL('image/png') : null);

    if (!printDataUrl) {
      window.print();
      return;
    }

    try {
      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Imprimir Estampa - Sublim Studio</title>
              <style>
                body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: #fff; }
                img { max-width: 100%; max-height: 100%; object-fit: contain; ${mirrorEnabled ? 'transform: scaleX(-1);' : ''} }
                @page { size: ${isA43In1Active ? 'A4 portrait' : 'auto'}; margin: 5mm; }
              </style>
            </head>
            <body>
              <img src="${printDataUrl}" />
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
    } catch (err) {
      window.print();
    }

    if (onShowSnackbar) {
      onShowSnackbar(
        isA43In1Active
          ? 'Comando de impressão enviado para a Folha A4 (3 em 1)!'
          : 'Comando de impressão enviado para a impressora!',
        'success'
      );
    }
  };

  if (!isOpen) return null;

  // Calculate ink coverage cost
  const costEstimation = calculateInkAndCost(
    isA43In1Active ? 210 : (currentProduct?.widthMm || 204),
    isA43In1Active ? 297 : (currentProduct?.heightMm || 90),
    65
  );

  return (
    <div
      className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 select-none p-2 sm:p-4 animate-fade-in touch-scroll-y"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full max-w-5xl rounded-3xl shadow-2xl border flex flex-col max-h-[92dvh] overflow-hidden transition-all pb-[env(safe-area-inset-bottom,0px)] ${
          darkMode
            ? 'bg-[#0f1118] border-[#222638] text-slate-100 shadow-purple-950/40'
            : 'bg-white border-slate-200 text-slate-800 shadow-slate-400/30'
        }`}
      >
        {/* Top Ergonomic Control Bar with Animated LED Status */}
        <div className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between gap-3 shrink-0 ${
          darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            {/* Ergonomic LED Illuminated Badge */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-emerald-500/40 px-3 py-1.5 rounded-2xl shadow-inner">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-sm shadow-emerald-400"></span>
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-wider uppercase text-emerald-400 leading-none flex items-center gap-1">
                  <span>PRONTA</span>
                  <span>•</span>
                  <span>{selectedPrinter?.displayName || 'IMPRESSORA HQ CONNECTED'}</span>
                </span>
                <span className="text-[9px] text-slate-400 font-mono leading-none mt-0.5">
                  {selectedPrinter ? `${selectedPrinter.displayName} (${resolutionDpi} DPI - ${selectedPrinter.port || 'Wi-Fi 5GHz'})` : 'Epson Subli-Pro L3250 (1200 DPI Wi-Fi 5GHz)'}
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-xs font-extrabold text-purple-400">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Central de Impressão & Prensa Sublimática</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Button to Fetch Saved Printer Settings */}
            <button
              onClick={() => handleLoadSavedSettings()}
              title="Carregar Configurações Salvas da Impressora"
              className="flex items-center gap-1.5 px-3 py-2 bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 font-bold rounded-2xl transition-all cursor-pointer text-xs"
            >
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Buscar Configs Salvas</span>
            </button>

            {onOpenPrinterSettings && (
              <button
                onClick={onOpenPrinterSettings}
                title="Configurações Avançadas da Impressora"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}

            {/* Quick LED Print Button */}
            <button
              onClick={handleTriggerDirectPrint}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black rounded-2xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer active:scale-95 text-xs uppercase tracking-wide"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>IMPRIMIR AGORA</span>
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                darkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories / Navigation Tabs */}
        <div className={`px-4 sm:px-6 py-2 border-b flex items-center gap-1.5 overflow-x-auto custom-scrollbar shrink-0 text-xs font-bold ${
          darkMode ? 'bg-[#11131f] border-[#222638]' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('rip')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'rip'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>RIP & Visualizador Touchscreen</span>
          </button>

          <button
            onClick={() => setActiveTab('mug3in1')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'mug3in1'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Grid className="w-4 h-4 text-emerald-400" />
            <span>Montagem 3 em 1 A4</span>
          </button>

          <button
            onClick={() => setActiveTab('press')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'press'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Prensa & Substratos ({SUBLIMATION_PRESS_PRESETS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('icc')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'icc'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Perfis ICC & Cores Vibrantes</span>
          </button>

          <button
            onClick={() => setActiveTab('status')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Droplets className="w-4 h-4 text-pink-400" />
            <span>Tinta ({inkLevels.magenta}%) & Sem Fio</span>
            {inkLevels.magenta < 20 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'support'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Guia Técnico & Dicas</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar touch-scroll-y min-h-0 p-4 sm:p-6 space-y-6">
          {/* TAB 1: RIP & Preview Touchscreen */}
          {activeTab === 'rip' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Touchscreen Simulator Canvas Preview */}
              <div className="lg:col-span-7 flex flex-col space-y-3">
                <div className={`relative border rounded-2xl p-4 flex flex-col items-center justify-center min-h-[340px] overflow-hidden ${
                  darkMode ? 'bg-[#0a0c13] border-[#222638]' : 'bg-slate-100 border-slate-300'
                }`}>
                  {/* Ruler Grid Overlay */}
                  {showRulerGrid && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                  )}

                  {/* Printable Paper Mockup */}
                  {isA43In1Active && (
                    <div className="absolute top-3 left-3 bg-purple-600/90 text-white px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow border border-purple-400 flex items-center gap-1.5 z-10">
                      <Grid className="w-3.5 h-3.5 text-amber-300" />
                      <span>FOLHA A4 3 EM 1 (3 CANECAS) CARREGADA NO RIP</span>
                    </div>
                  )}

                  {isA43In1Active && (
                    <button
                      onClick={() => {
                        setIsA43In1Active(false);
                        const c = canvasElement || (document.querySelector('canvas') as HTMLCanvasElement);
                        if (c) {
                          try {
                            setCanvasDataUrl(c.toDataURL('image/png'));
                          } catch (e) {
                            console.warn('Canvas restore failed:', e);
                          }
                        }
                      }}
                      className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-xl text-[10px] font-extrabold z-10 transition-all cursor-pointer flex items-center gap-1 shadow"
                      title="Voltar para a arte individual do projeto"
                    >
                      <RotateCcw className="w-3 h-3 text-purple-400" />
                      <span>Restaurar Arte Única</span>
                    </button>
                  )}

                  <div
                    className="relative transition-all shadow-2xl flex items-center justify-center border-2 border-purple-500/50 bg-white text-slate-900 rounded-sm overflow-hidden"
                    style={{
                      width: `${(isA43In1Active ? 240 : Math.min(360, (currentProduct?.widthMm || 204) * 1.5)) * (zoomLevel / 100)}px`,
                      height: `${(isA43In1Active ? 339 : Math.min(220, (currentProduct?.heightMm || 90) * 1.5)) * (zoomLevel / 100)}px`,
                      transform: `rotate(${rotation}deg) scaleX(${mirrorEnabled ? -1 : 1})`
                    }}
                  >
                    {canvasDataUrl ? (
                      <img src={canvasDataUrl} alt="Estampa Preview" className="w-full h-full object-contain pointer-events-none" />
                    ) : (
                      /* Simulated Print Sample Design */
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-amber-500/10">
                        <Sparkles className="w-8 h-8 text-purple-600 mb-1 animate-pulse" />
                        <span className="font-black text-xs text-purple-900 uppercase tracking-wider">
                          {currentProduct?.name || 'Estampa Sublimática Pro'}
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono mt-1">
                          {currentProduct?.printAspect || '204 x 90 mm (300 DPI)'}
                        </span>
                      </div>
                    )}

                    {/* Bleed Lines 3mm */}
                    {showBleedLines && (
                      <div className="absolute inset-2 border-2 border-dashed border-red-500/70 pointer-events-none flex items-start justify-end p-1">
                        <span className="text-[8px] bg-red-500 text-white font-bold px-1 rounded opacity-75">Sangria 3mm</span>
                      </div>
                    )}

                    {/* Safe Zone */}
                    <div className="absolute inset-4 border border-emerald-500/60 pointer-events-none"></div>
                  </div>

                  {/* Crop Marks Overlay */}
                  {showCropMarks && (
                    <>
                      <div className="absolute top-2 left-2 text-[9px] font-mono font-bold text-slate-400">┌ 0mm</div>
                      <div className="absolute top-2 right-2 text-[9px] font-mono font-bold text-slate-400">
                        ┐ {isA43In1Active ? 210 : (currentProduct?.widthMm || 204)}mm
                      </div>
                      <div className="absolute bottom-2 left-2 text-[9px] font-mono font-bold text-slate-400">
                        └ {isA43In1Active ? 297 : (currentProduct?.heightMm || 90)}mm
                      </div>
                      <div className="absolute bottom-2 right-2 text-[9px] font-mono font-bold text-slate-400">┘</div>
                    </>
                  )}

                  {/* Mirror Watermark Indicator */}
                  {mirrorEnabled && (
                    <div className="absolute bottom-3 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase shadow-md flex items-center gap-1">
                      <FlipHorizontal className="w-3 h-3" />
                      <span>Espelhado para Transfer</span>
                    </div>
                  )}
                </div>

                {/* Touchscreen Visualizer Controls */}
                <div className={`p-3 rounded-2xl border flex flex-wrap items-center justify-between gap-2 ${
                  darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setZoomLevel(Math.max(50, zoomLevel - 15))}
                      className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                        darkMode ? 'bg-[#1d2133] border-[#2b304a] text-slate-200' : 'bg-white border-slate-300'
                      }`}
                      title="Diminuir Zoom"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold w-12 text-center">{zoomLevel}%</span>
                    <button
                      onClick={() => setZoomLevel(Math.min(180, zoomLevel + 15))}
                      className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                        darkMode ? 'bg-[#1d2133] border-[#2b304a] text-slate-200' : 'bg-white border-slate-300'
                      }`}
                      title="Aumentar Zoom"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRotation((prev) => (prev + 90) % 360)}
                      className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer flex items-center gap-1 ${
                        darkMode ? 'bg-[#1d2133] border-[#2b304a] text-purple-300' : 'bg-white border-slate-300 text-purple-700'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{rotation}° Rotação</span>
                    </button>

                    <button
                      onClick={() => setMirrorEnabled(!mirrorEnabled)}
                      className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer flex items-center gap-1 ${
                        mirrorEnabled
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : darkMode ? 'bg-[#1d2133] border-[#2b304a] text-slate-400' : 'bg-white border-slate-300 text-slate-600'
                      }`}
                    >
                      <FlipHorizontal className="w-3.5 h-3.5" />
                      <span>Espelhar</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showBleedLines}
                        onChange={(e) => setShowBleedLines(e.target.checked)}
                        className="rounded accent-purple-600"
                      />
                      <span>Sangria</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCropMarks}
                        onChange={(e) => setShowCropMarks(e.target.checked)}
                        className="rounded accent-purple-600"
                      />
                      <span>Marcas Corte</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* RIP Output Format & Resolution Parameters */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                      <Printer className="w-4 h-4" />
                      <span>Configurações do Arquivo RIP</span>
                    </h4>
                    
                    <button
                      onClick={() => handleLoadSavedSettings()}
                      className="px-2 py-1 bg-purple-600/30 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Search className="w-3 h-3" />
                      <span>Buscar Salvas</span>
                    </button>
                  </div>

                  {/* Active A4 3-in-1 Banner */}
                  {isA43In1Active && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-900/40 via-purple-800/30 to-slate-900/40 border border-purple-500/50 flex items-center justify-between gap-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-purple-500/20 rounded-lg text-purple-300 border border-purple-500/30">
                          <Grid className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-purple-200 uppercase tracking-tight">Modo Ativo: Folha A4 3 em 1</p>
                          <p className="text-[10px] text-purple-300">Folha com 3 faixas de caneca pronta para aplicação de Perfil ICC e impressão.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('mug3in1')}
                        className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-extrabold rounded-lg transition-all cursor-pointer shrink-0 shadow"
                      >
                        Editar Slots
                      </button>
                    </div>
                  )}

                  {/* Quick Select Saved Preset or Saved Printer Config */}
                  <div className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                    darkMode ? 'bg-[#0e101a] border-[#1d2133]' : 'bg-purple-50 border-purple-200'
                  }`}>
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                      <span>Perfil / Preset de Impressora Salvo</span>
                    </label>
                    <select
                      onChange={(e) => {
                        if (e.target.value === 'current_saved') {
                          handleLoadSavedSettings();
                        } else {
                          const found = presets.find((p) => p.id === e.target.value);
                          if (found) {
                            handleLoadSavedSettings(found);
                          }
                        }
                      }}
                      className={`w-full p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        darkMode ? 'bg-[#141724] border-[#222638] text-purple-200' : 'bg-white border-purple-300 text-purple-900'
                      }`}
                    >
                      <option value="current_saved">
                        🖨️ {selectedPrinter?.displayName || 'Epson L3250'} (Configuração Salva Padrão)
                      </option>
                      {presets.map((preset) => (
                        <option key={preset.id} value={preset.id}>
                          ⭐ {preset.name} ({preset.settings.dpi} DPI - {preset.settings.mirror ? 'Espelhado' : 'Normal'})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Resolution DPI selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400">Resolução de Impressão (DPI)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[300, 600, 1200].map((dpi) => (
                        <button
                          key={dpi}
                          onClick={() => setResolutionDpi(dpi as any)}
                          className={`py-2 rounded-xl border text-xs font-extrabold cursor-pointer transition-all ${
                            resolutionDpi === dpi
                              ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                              : darkMode ? 'bg-[#1d2133] border-[#2b304a] text-slate-300' : 'bg-white border-slate-300'
                          }`}
                        >
                          {dpi} DPI
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Format Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400">Formato de Saída Profissional</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'png', name: 'PNG 300DPI', desc: 'Fundo Transparente' },
                        { id: 'pdf', name: 'PDF Sublimação', desc: 'Vetor + Sangria' },
                        { id: 'tiff', name: 'TIFF CMYK', desc: '16-bit Fidelidade' },
                        { id: 'svg', name: 'SVG Vetorial', desc: 'Escala Infinita' }
                      ].map((fmt) => (
                        <button
                          key={fmt.id}
                          onClick={() => setExportFormat(fmt.id as any)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            exportFormat === fmt.id
                              ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                              : darkMode ? 'bg-[#1d2133] border-[#2b304a] text-slate-300' : 'bg-white border-slate-300'
                          }`}
                        >
                          <div className="font-extrabold text-xs">{fmt.name}</div>
                          <div className="text-[10px] text-slate-400">{fmt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estimation summary */}
                  <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                    darkMode ? 'bg-[#0e101a] border-[#1d2133]' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex justify-between font-extrabold">
                      <span className="text-slate-400">Estimativa de Tinta:</span>
                      <span className="text-cyan-400">{costEstimation.inkMl} ml</span>
                    </div>
                    <div className="flex justify-between font-extrabold">
                      <span className="text-slate-400">Custo Estimado Insumo:</span>
                      <span className="text-emerald-400">R$ {costEstimation.costBrl.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Substrato Recomendado:</span>
                      <span className="font-bold text-slate-200 truncate max-w-[150px]">{paperType}</span>
                    </div>
                  </div>

                  {/* Montagem 3 em 1 A4 Button */}
                  <button
                    onClick={() => setActiveTab('mug3in1')}
                    className="w-full py-2.5 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:brightness-110 text-white font-black text-xs rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider border border-emerald-400/40"
                  >
                    <Grid className="w-4 h-4 text-emerald-200" />
                    <span>Montar 3 Canecas na Folha A4 (Layout 3 em 1)</span>
                  </button>

                  {/* Export / Print Action Button */}
                  <button
                    disabled={isExporting}
                    onClick={() => handlePerformExport()}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExporting ? 'EXPORTANDO ARQUIVO...' : `EXPORTAR & IMPRIMIR (${resolutionDpi} DPI)`}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Montagem 3 em 1 A4 */}
          {activeTab === 'mug3in1' && (
            <div className="-m-4 sm:-m-6">
              <Mug3In1SheetView
                canvasElement={canvasElement}
                currentProduct={currentProduct}
                mirrorSublimation={mirrorSublimation}
                darkMode={darkMode}
                onShowSnackbar={onShowSnackbar}
                onSendToRip={(a4DataUrl) => {
                  setCanvasDataUrl(a4DataUrl);
                  setIsA43In1Active(true);
                  setActiveTab('rip');
                  if (onShowSnackbar) {
                    onShowSnackbar('Folha A4 3 em 1 enviada para a Central RIP com perfil ICC!', 'success');
                  }
                }}
              />
            </div>
          )}

          {/* TAB 2: Prensa Térmica & Substratos */}
          {activeTab === 'press' && (
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-extrabold">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] shrink-0">Filtrar:</span>
                {[
                  { id: 'all', label: 'Todos Substratos' },
                  { id: 'fabric', label: '👕 Tecidos / Poliéster' },
                  { id: 'rigid', label: '☕ Canecas & Rígidos' },
                  { id: 'glass', label: '🖼️ Azulejo & Vidro' },
                  { id: '3d', label: '📱 Capas & 3D' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id as any)}
                    className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                      categoryFilter === cat.id
                        ? 'bg-amber-500 text-slate-950 font-black border-amber-400'
                        : darkMode ? 'bg-[#141724] border-[#222638] text-slate-300 hover:bg-white/5' : 'bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Substrate Selector & Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SUBLIMATION_PRESS_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPresetId === preset.id
                        ? 'bg-purple-600/15 border-purple-500 ring-2 ring-purple-500/50 shadow-lg'
                        : darkMode ? 'bg-[#141724] border-[#222638] hover:border-slate-600' : 'bg-slate-50 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-extrabold text-xs leading-snug">{preset.productName}</span>
                        {selectedPresetId === preset.id && (
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono font-bold mb-2">
                        <span className="text-amber-400 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" /> {preset.temperatureC}°C
                        </span>
                        <span className="text-cyan-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {preset.timeSeconds}s
                        </span>
                        <span className="text-purple-400">Pressão: {preset.pressure}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 border-t pt-2 border-slate-700/40">
                      {preset.notes}
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Press Fine-Tuning Controls */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>Ajuste Fino de Parâmetros de Prensa Térmica</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Temperatura */}
                  <div className={`p-3.5 rounded-xl border space-y-2 ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-400 uppercase">Temperatura (°C)</span>
                      <span className="text-xs font-mono text-slate-400">({Math.round((tempC * 9) / 5 + 32)}°F)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setTempC(Math.max(100, tempC - 5))}
                        className="px-3 py-1 bg-amber-500/20 text-amber-400 font-extrabold rounded-lg hover:bg-amber-500/30 cursor-pointer"
                      >
                        -5°C
                      </button>
                      <span className="text-2xl font-black font-mono text-amber-400">{tempC}°C</span>
                      <button
                        onClick={() => setTempC(Math.min(230, tempC + 5))}
                        className="px-3 py-1 bg-amber-500/20 text-amber-400 font-extrabold rounded-lg hover:bg-amber-500/30 cursor-pointer"
                      >
                        +5°C
                      </button>
                    </div>
                  </div>

                  {/* Tempo */}
                  <div className={`p-3.5 rounded-xl border space-y-2 ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-cyan-400 uppercase">Tempo (Segundos)</span>
                      <span className="text-xs font-mono text-slate-400">Segundos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          const newTime = Math.max(5, timeSec - 5);
                          setTimeSec(newTime);
                          setTimerSeconds(newTime);
                        }}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 font-extrabold rounded-lg hover:bg-cyan-500/30 cursor-pointer"
                      >
                        -5s
                      </button>
                      <span className="text-2xl font-black font-mono text-cyan-400">{timeSec}s</span>
                      <button
                        onClick={() => {
                          const newTime = Math.min(600, timeSec + 5);
                          setTimeSec(newTime);
                          setTimerSeconds(newTime);
                        }}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 font-extrabold rounded-lg hover:bg-cyan-500/30 cursor-pointer"
                      >
                        +5s
                      </button>
                    </div>
                  </div>

                  {/* Pressão */}
                  <div className={`p-3.5 rounded-xl border space-y-2 ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <span className="text-xs font-bold text-purple-400 uppercase block">Pressão Manta</span>
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      {(['Leve', 'Média', 'Alta'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPressureLevel(p)}
                          className={`py-1.5 rounded-lg text-xs font-extrabold cursor-pointer border transition-all ${
                            pressureLevel === p
                              ? 'bg-purple-600 text-white border-purple-500'
                              : darkMode ? 'bg-[#181a28] border-[#2a2d45] text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-700'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Countdown Press Timer */}
                <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
                  darkMode ? 'bg-[#0a0c13] border-[#222638]' : 'bg-slate-100 border-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                      <Clock className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block">Timer Live de Prensagem</span>
                      <span className="text-3xl font-mono font-black text-cyan-400">{timerSeconds}s</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`p-2.5 rounded-xl border cursor-pointer ${
                        soundEnabled ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-slate-800 text-slate-500'
                      }`}
                      title="Ativar/Desativar Alerta Sonoro Beep"
                    >
                      {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`px-5 py-2.5 rounded-xl font-black flex items-center gap-2 cursor-pointer shadow-lg text-xs uppercase tracking-wider ${
                        isTimerRunning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                      }`}
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isTimerRunning ? 'PAUSAR' : 'INICIAR PRENSA'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(timeSec);
                      }}
                      className={`p-2.5 rounded-xl border cursor-pointer ${
                        darkMode ? 'bg-[#181a28] border-[#2a2d45] text-slate-300' : 'bg-slate-200 border-slate-300 text-slate-700'
                      }`}
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Perfis ICC & Cores Vibrantes */}
          {activeTab === 'icc' && (
            <div className="space-y-6">
              <div className={`p-5 rounded-2xl border space-y-4 ${
                darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  <span>Perfil de Cor ICC para Sublimação Profissional</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'subli_vibrant_hd', name: 'SubliVibrant HD (Ultra Vivid - Padrão)', desc: 'Maximiza brilho de cores para tecidos poliéster e canecas.' },
                    { id: 'epson_subli_vivid', name: 'Epson Subli-Vivid 1200DPI', desc: 'Perfeito para impressoras Epson EcoTank com tinta sublimática.' },
                    { id: 'sawgrass_virtuoso', name: 'Sawgrass Virtuoso Standard', desc: 'Fidelidade de cor internacional para papéis transfer premium.' },
                    { id: 'subli_black_deep', name: 'SubliTextil Deep Black (Preto Absoluto)', desc: 'Elimina o tom esverdeado do preto em prensagens de alta temperatura.' },
                    { id: 'rigid_glossy_hd', name: 'Rigid Glossy HD (Cerâmica & Vidro)', desc: 'Otimizado para alto brilho e verniz de azulejos e copos.' }
                  ].map((icc) => (
                    <div
                      key={icc.id}
                      onClick={() => setSelectedIccProfile(icc.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selectedIccProfile === icc.id
                          ? 'bg-cyan-600/15 border-cyan-500 ring-2 ring-cyan-500/40'
                          : darkMode ? 'bg-[#0f1118] border-[#222638] hover:border-slate-600' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs text-cyan-300">{icc.name}</span>
                        {selectedIccProfile === icc.id && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400">{icc.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Booster Black Switch */}
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'
                }`}>
                  <div className="space-y-0.5">
                    <span className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      Booster Anti-Esverdeamento (Preto Puro K100)
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Ajusta o equilíbrio de pretos para transferência sem manchas verdes ou castanhas na fumaça.
                    </span>
                  </div>
                  <button
                    onClick={() => setPureBlackBooster(!pureBlackBooster)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                      pureBlackBooster ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      pureBlackBooster ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>

                {/* Color Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Saturação de Cor:</span>
                      <span className="text-purple-400">{colorSaturation}%</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="150"
                      value={colorSaturation}
                      onChange={(e) => setColorSaturation(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Brilho da Estampa:</span>
                      <span className="text-cyan-400">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="130"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Contraste de Tinta:</span>
                      <span className="text-amber-400">{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="130"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Sem Fio & Status de Tinta */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              {/* Wireless Connection Card */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                    <Wifi className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-emerald-400 block">Rede Sem Fio Wi-Fi 5GHz Ativa</span>
                    <span className="text-xs text-slate-400 font-mono">IP: 192.168.1.150 • Latência: 4ms • Status: Excelente (98%)</span>
                  </div>
                </div>

                <button
                  onClick={() => setWifiConnected(!wifiConnected)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                    wifiConnected ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'
                  }`}
                >
                  {wifiConnected ? 'CONECTADO' : 'RECONECTAR'}
                </button>
              </div>

              {/* Ink Level Monitors */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-pink-400 flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    <span>Níveis de Tinta de Sublimação em Tempo Real</span>
                  </h4>
                  <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Magenta com Alerta de Tinta Baixa (18%)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    { color: 'Ciano (C)', val: inkLevels.cyan, barColor: 'bg-cyan-500' },
                    { color: 'Magenta (M)', val: inkLevels.magenta, barColor: 'bg-pink-500', alert: true },
                    { color: 'Amarelo (Y)', val: inkLevels.yellow, barColor: 'bg-amber-400' },
                    { color: 'Preto (K)', val: inkLevels.black, barColor: 'bg-slate-100' },
                    { color: 'Light Cyan', val: inkLevels.lightCyan, barColor: 'bg-sky-400' },
                    { color: 'Light Mag.', val: inkLevels.lightMagenta, barColor: 'bg-rose-400' }
                  ].map((ink, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border space-y-2 text-center ${
                      darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'
                    }`}>
                      <span className="text-[10px] font-bold text-slate-400 block truncate">{ink.color}</span>
                      <div className="relative w-full h-20 bg-slate-800 rounded-lg overflow-hidden flex flex-col justify-end p-0.5 border border-slate-700">
                        <div
                          className={`w-full ${ink.barColor} transition-all duration-500 rounded-sm`}
                          style={{ height: `${ink.val}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-mono font-black block ${ink.alert ? 'text-amber-400 animate-pulse' : 'text-slate-200'}`}>
                        {ink.val}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Maintenance Actions */}
                <div className="border-t pt-4 border-slate-800 space-y-3">
                  <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider block">
                    Manutenção Automática de Cabeçote (1-Clique)
                  </span>

                  {maintenanceSuccess && (
                    <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{maintenanceSuccess}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      disabled={isCleaningHead}
                      onClick={() => handleRunMaintenance('Verificação de Bicos (Nozzle Check)')}
                      className="p-2.5 rounded-xl border text-xs font-extrabold bg-purple-600/10 border-purple-500/40 text-purple-300 hover:bg-purple-600/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Teste de Bicos</span>
                    </button>

                    <button
                      disabled={isCleaningHead}
                      onClick={() => handleRunMaintenance('Limpeza Profunda de Cabeçote')}
                      className="p-2.5 rounded-xl border text-xs font-extrabold bg-cyan-600/10 border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isCleaningHead ? 'animate-spin' : ''}`} />
                      <span>Limpeza Profunda</span>
                    </button>

                    <button
                      disabled={isCleaningHead}
                      onClick={() => handleRunMaintenance('Alinhamento de Passada')}
                      className="p-2.5 rounded-xl border text-xs font-extrabold bg-amber-600/10 border-amber-500/40 text-amber-300 hover:bg-amber-600/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Alinhar Passada</span>
                    </button>

                    <button
                      disabled={isCleaningHead}
                      onClick={() => handleRunMaintenance('Modo Anti-Ressecamento')}
                      className="p-2.5 rounded-xl border text-xs font-extrabold bg-emerald-600/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>Anti-Ressecamento</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Guia Técnico, Tutorial 3 em 1 & Dicas de Sublimação */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              {/* Header Hero Banner */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900/80 border border-purple-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> TUTORIAL COMPLETO PASSO A PASSO
                  </span>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    Configuração de Impressora & Montagem 3 em 1 para Canecas
                  </h3>
                  <p className="text-xs text-purple-200/80 max-w-2xl leading-relaxed">
                    Aprenda a otimizar o fluxo de sublimação, aplicar perfil ICC, configurar espelhamento correto e utilizar a <strong>Montagem 3 em 1 A4</strong> para imprimir 3 canecas por folha com máxima economia de papel.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('mug3in1')}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer shrink-0 flex items-center gap-2 transition-all"
                >
                  <Grid className="w-4 h-4" />
                  <span>Abrir Montagem 3 em 1 A4</span>
                </button>
              </div>

              {/* Economic Advantage Card */}
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                    <Grid className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wide">
                      Por que usar a Montagem 3 em 1 A4? (Economia de 66% de Papel)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Entenda como o aproveitamento matemático da folha A4 reduz custos e agiliza a produção.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Capacidade por Folha A4</span>
                    <span className="text-sm font-black text-white block mt-0.5">3 Artes de Caneca</span>
                    <span className="text-[11px] text-emerald-400 font-semibold block mt-1">204 × 95 mm por faixa</span>
                  </div>

                  <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Economia por Produto</span>
                    <span className="text-sm font-black text-purple-300 block mt-0.5">Redução de ~66%</span>
                    <span className="text-[11px] text-purple-400 font-semibold block mt-1">De R$ 1,50 para R$ 0,50 / papel</span>
                  </div>

                  <div className={`p-3.5 rounded-xl border ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Aproveitamento Físico A4</span>
                    <span className="text-sm font-black text-cyan-300 block mt-0.5">95,9% da Área Útil</span>
                    <span className="text-[11px] text-cyan-400 font-semibold block mt-1">285 mm dos 297 mm de altura</span>
                  </div>
                </div>
              </div>

              {/* 8-Step Tutorial Cards Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Passo a Passo de Produção: Da Arte à Prensagem Final</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Step 1 */}
                  <div className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">1</span>
                      <h5 className="font-extrabold text-white text-sm">Dimensionar a Arte da Caneca</h5>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      A dimensão padrão para caneca de cerâmica de 11 oz (325 ml) é de aproximadamente <strong>204 × 95 mm</strong>. Deixe 2 mm de sangria nas bordas superiores e inferiores para evitar margens brancas ao recortar.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">2</span>
                      <h5 className="font-extrabold text-white text-sm">Configuração da Impressora Sublimática</h5>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Escolha sua impressora sublimática (ex: <strong>Epson EcoTank L3250</strong>). Defina o tamanho do papel como <strong>A4 (210 × 297 mm)</strong>, orientação Retrato e qualidade de impressão em <strong>300 DPI</strong> (ou 600 DPI para fotos detalhadas).
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">3</span>
                      <h5 className="font-extrabold text-white text-sm">Aplicar Perfil de Cor ICC</h5>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Na aba <strong>Perfis ICC & Cores</strong>, selecione o perfil calibrado para sua tinta (ex: <code>subli_vibrant_hd</code>). Isso garante pretos intensos e cores vivas após a transferência térmica.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">4</span>
                      <h5 className="font-extrabold text-white text-sm">Carregar a Montagem 3 em 1 A4</h5>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Acesse a aba <strong>Montagem 3 em 1 A4</strong>. O sistema organizará 3 slots verticais (Topo, Meio, Base). Você pode usar 3 artes diferentes para clientes distintos ou clicar em <strong>"Repetir Arte nas 3 Posições"</strong> para lotes iguais.
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">5</span>
                      <h5 className="font-extrabold text-white text-sm">Espelhamento Sublimático (Efeito Espelho)</h5>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Ative a opção <strong>☑ Espelhar Impressão</strong> no Sublim Studio. <span className="text-amber-300 font-bold">Atenção:</span> Desative o espelhamento no driver do Windows/Epson para evitar espelhamento duplo.
                    </p>
                  </div>

                  {/* Step 6 */}
                  <div className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">6</span>
                      <h5 className="font-extrabold text-white text-sm">Marcas de Corte e Envio ao RIP</h5>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Mantenha ativado <strong>☑ Marcas de Corte (Tesoura)</strong>. Em seguida, clique em <strong>ENVIAR PARA CENTRAL RIP</strong> para revisar o arquivo unificado pronto para impressão.
                    </p>
                  </div>

                  {/* Step 7 */}
                  <div className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">7</span>
                      <h5 className="font-extrabold text-white text-sm">Impressão e Recorte das Tiras</h5>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Imprima no papel sublimático (lado resinado/liso voltado para a impressão). Após secar 1-2 minutos, utilize guilhotina ou tesoura seguindo as marcas pontilhadas para obter 3 faixas perfeitas.
                    </p>
                  </div>

                  {/* Step 8 */}
                  <div className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">8</span>
                      <h5 className="font-extrabold text-white text-sm">Fixação e Prensagem Térmica</h5>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Fixe a faixa impressa na caneca com <strong>fita térmica de poliarmida</strong>. Prense na prensa de caneca ajustada para <strong>200°C por 180 a 200 segundos</strong> com pressão média.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Checklist Panel */}
              <div className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Checklist de Verificação Rápida Antes de Imprimir</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">Clique para marcar os itens concluídos</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'printer', label: 'Impressora Sublimática selecionada (Epson EcoTank)' },
                    { id: 'paper', label: 'Papel Sublimático A4 carregado no alimentador' },
                    { id: 'montagem', label: 'Montagem 3 em 1 preenchida (3 faixas de 204×95 mm)' },
                    { id: 'mirror', label: 'Espelhamento Sublimático ativado no Sublim Studio' },
                    { id: 'crop', label: 'Marcas de Corte (Tesoura) ativadas para guia' },
                    { id: 'icc', label: 'Perfil de Cor ICC aplicado (subli_vibrant_hd)' },
                    { id: 'tape', label: 'Fita Térmica de Poliarmida pronta para fixar' },
                    { id: 'press', label: 'Prensa Térmica aquecida a 200°C (180s - 200s)' }
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                        tutorialChecklist[item.id as keyof typeof tutorialChecklist]
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : darkMode ? 'bg-[#0f1118] border-[#222638] text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={tutorialChecklist[item.id as keyof typeof tutorialChecklist]}
                        onChange={(e) =>
                          setTutorialChecklist((prev) => ({ ...prev, [item.id]: e.target.checked }))
                        }
                        className="rounded accent-emerald-500 w-4 h-4"
                      />
                      <span className="font-bold text-[11px]">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sublimation Press Parameters Reference Table */}
              <div className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>Tabela de Referência de Temperatura & Tempo para Prensa de Caneca</span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b text-[10px] uppercase font-bold text-slate-400 ${darkMode ? 'border-[#222638]' : 'border-slate-200'}`}>
                        <th className="py-2 px-3">Substrato / Produto</th>
                        <th className="py-2 px-3">Temperatura (°C)</th>
                        <th className="py-2 px-3">Tempo (segundos)</th>
                        <th className="py-2 px-3">Pressão Recomendada</th>
                        <th className="py-2 px-3">Observação Técnica</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-[11px]">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-purple-300">Caneca Cerâmica (11 oz / 325 ml)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">200°C</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">180s - 200s</td>
                        <td className="py-2.5 px-3 font-bold text-slate-300">Média a Forte</td>
                        <td className="py-2.5 px-3 text-slate-400">Padrão Ouro Sublimação. Usar fita térmica.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-purple-300">Caneca de Polímero (Plástico)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-400">180°C</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-400">180s</td>
                        <td className="py-2.5 px-3 font-bold text-slate-300">Média</td>
                        <td className="py-2.5 px-3 text-slate-400">Obrigatório uso do culote interno para não deformar.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-purple-300">Squeeze Alumínio / Inox</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">190°C</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">160s - 180s</td>
                        <td className="py-2.5 px-3 font-bold text-slate-300">Média</td>
                        <td className="py-2.5 px-3 text-slate-400">Ajustar manta para diâmetro do squeeze.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-purple-300">Caneca de Vidro / Mágica</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-rose-400">195°C</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-rose-400">200s - 220s</td>
                        <td className="py-2.5 px-3 font-bold text-slate-300">Média</td>
                        <td className="py-2.5 px-3 text-slate-400">Aquecimento gradual. Evitar choque térmico.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Custom Presets Form */}
              <div className={`p-5 rounded-2xl border space-y-3 ${
                darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Salvar Novo Perfil Personalizado do Usuário</span>
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Minha Caneca Mágica (200°C - 190s)"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    className={`flex-1 p-2.5 rounded-xl border text-xs font-bold outline-none ${
                      darkMode ? 'bg-[#0f1118] border-[#222638] text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                  <button
                    onClick={handleSaveCustomPreset}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl cursor-pointer"
                  >
                    Salvar Perfil
                  </button>
                </div>

                {customPresets.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {customPresets.map((cp, i) => (
                      <div key={i} className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-xs font-bold text-purple-300 flex justify-between">
                        <span>{cp.name}</span>
                        <span>{cp.temp}°C / {cp.time}s</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Troubleshooting Guide */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Guia Rápido de Solução de Problemas em Sublimação</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3.5 rounded-xl border space-y-1 ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <span className="font-extrabold text-amber-400 block">Estampa apagada ou cores fracas?</span>
                    <p className="text-slate-400 text-[11px]">
                      Aumente o tempo de prensa em +15 segundos ou garanta que o lado correto do papel sublimático (lado resinado/liso) está em contato direto com o produto.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-1 ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <span className="font-extrabold text-purple-400 block">Manchas fantasmas ou contornos duplicados?</span>
                    <p className="text-slate-400 text-[11px]">
                      O papel se moveu durante a abertura da prensa. Fixe o papel firmemente com fita térmica de poliarmida resistente a 220°C.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-1 ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <span className="font-extrabold text-cyan-400 block">Manchas amareladas no tecido?</span>
                    <p className="text-slate-400 text-[11px]">
                      Temperatura excessiva queimando as fibras sintéticas. Reduza a temperatura de 200°C para 190°C e use manta de teflon por cima.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border space-y-1 ${darkMode ? 'bg-[#0f1118] border-[#222638]' : 'bg-white border-slate-200'}`}>
                    <span className="font-extrabold text-emerald-400 block">Papel grudando na caneca ou tecido?</span>
                    <p className="text-slate-400 text-[11px]">
                      Retire o papel imediatamente enquanto o produto ainda está bem quente. Para canecas, resfrie ligeiramente em água morna após retirar a fita.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className={`px-4 sm:px-6 py-3 border-t flex flex-wrap items-center justify-between gap-3 shrink-0 ${
          darkMode ? 'bg-[#141724] border-[#222638]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-emerald-400 font-extrabold">● Conectado:</span>
            <span>Perfil: {SUBLIMATION_PRESS_PRESETS.find(p=>p.id===selectedPresetId)?.productName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-colors ${
                darkMode ? 'bg-[#222638] hover:bg-[#2e334a] text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              Fechar
            </button>

            <button
              onClick={() => {
                if (onExportMirrorPNG) onExportMirrorPNG();
                onClose();
              }}
              className="px-5 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center gap-2 uppercase tracking-wide"
            >
              <Printer className="w-4 h-4" />
              <span>IMPRIMIR EM ALTA RESOLUÇÃO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
