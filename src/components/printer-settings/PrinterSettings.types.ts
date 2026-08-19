import { Printer, PrintSettings, PrintPreset, ICCProfile } from '../../services/printer/PrinterTypes';

export type PrinterSettingsTab = 
  | 'rip'
  | 'printers'
  | 'settings'
  | 'color'
  | 'icc'
  | 'presets'
  | 'test'
  | 'advanced';

export interface PrinterSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark' | string;
  canvasElement?: HTMLCanvasElement | null;
  onShowSnackbar?: (msg: string, type: 'success' | 'info' | 'error') => void;
  onOpenPrintModal?: () => void;
}
