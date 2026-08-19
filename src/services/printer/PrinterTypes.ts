export type PrinterStatus = 'idle' | 'printing' | 'paused' | 'offline' | 'paper_jam' | 'out_of_paper' | 'error' | 'unknown';

export interface PaperSizeCapability {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  isBorderlessSupported: boolean;
}

export interface PrinterCapabilities {
  supportedDpis: number[];
  supportedPaperSizes: PaperSizeCapability[];
  supportsColor: boolean;
  supportsDuplex: boolean;
  supportsBorderless: boolean;
  supportedMediaTypes: string[];
  supportedPaperSources: string[];
  maxResolutionDpi: number;
}

export interface Printer {
  id: string;
  name: string;
  displayName: string;
  manufacturer?: string;
  model?: string;
  status: PrinterStatus;
  isSystemDefault: boolean;
  isAppDefault: boolean;
  isAvailable: boolean;
  port?: string;
  driverVersion?: string;
  capabilities: PrinterCapabilities;
}

export type ColorMode = 'color' | 'grayscale';
export type ColorManagementType = 'printer' | 'application' | 'icc';
export type Orientation = 'portrait' | 'landscape';
export type QualityLevel = 'draft' | 'normal' | 'high' | 'photo';
export type RenderingIntent = 'perceptual' | 'relative' | 'absolute' | 'saturation';

export interface PrintSettings {
  printerId: string;
  paperSize: string;
  orientation: Orientation;
  quality: QualityLevel;
  dpi: number;
  colorMode: ColorMode;
  colorManagement: ColorManagementType;
  iccProfile?: string;
  mediaType?: string;
  paperSource?: string;
  scaling: number;
  fitToPage: boolean;
  borderless: boolean;
  mirror: boolean;
  copies: number;
  renderingIntent: RenderingIntent;
  blackPointCompensation: boolean;
  preserveOriginalResolution: boolean;
  disableAutoResize: boolean;
  maintainAspectRatio: boolean;
}

export interface PrintPreset {
  id: string;
  name: string;
  printerId: string;
  settings: PrintSettings;
  productCategory?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICCProfile {
  id: string;
  name: string;
  filename: string;
  manufacturer?: string;
  colorSpace: 'CMYK' | 'RGB';
  description: string;
  isCustom: boolean;
}

export type PrintJobStatus = 'queued' | 'preparing' | 'printing' | 'completed' | 'failed' | 'cancelled';

export interface PrintJob {
  id: string;
  documentId: string;
  documentTitle: string;
  printerId: string;
  printerName: string;
  presetId?: string;
  status: PrintJobStatus;
  progressPercent: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
  pageCount: number;
  settingsUsed: Partial<PrintSettings>;
}

export interface PrinterCommand<T = void> {
  id: string;
  timestamp: number;
  execute(): Promise<T>;
}
