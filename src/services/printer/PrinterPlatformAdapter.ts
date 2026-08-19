import { Printer, PrinterCapabilities, PrintJob, PrintSettings } from './PrinterTypes';

export interface PrinterPlatformAdapter {
  readonly platformName: 'windows' | 'macos' | 'linux' | 'webpwa';
  
  /**
   * Discovers and lists printers available in the operating system.
   */
  getPrinters(): Promise<Printer[]>;

  /**
   * Retrieves the system default printer.
   */
  getSystemDefaultPrinter(): Promise<Printer | null>;

  /**
   * Queries capabilities for a specific printer.
   */
  getCapabilities(printerId: string): Promise<PrinterCapabilities>;

  /**
   * Triggers a print job for a document or canvas image.
   */
  print(job: PrintJob, canvasElement?: HTMLCanvasElement): Promise<boolean>;

  /**
   * Opens OS-native printer settings or properties dialog if available.
   */
  openPrinterSettings(printerId: string): Promise<boolean>;

  /**
   * Tests connection and status for a specific printer.
   */
  checkPrinterStatus(printerId: string): Promise<Printer['status']>;
}
