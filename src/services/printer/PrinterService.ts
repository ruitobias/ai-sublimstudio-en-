import { PrinterDiscoveryService } from './PrinterDiscoveryService';
import { StorageService } from '../storage/StorageService';
import { Printer, PrinterCapabilities, PrintJob, PrintSettings } from './PrinterTypes';
import { PrinterSettingsService } from './PrinterSettingsService';

export class PrinterService {
  private static instance: PrinterService;
  private discoveryService: PrinterDiscoveryService;

  private constructor() {
    this.discoveryService = new PrinterDiscoveryService();
  }

  public static getInstance(): PrinterService {
    if (!PrinterService.instance) {
      PrinterService.instance = new PrinterService();
    }
    return PrinterService.instance;
  }

  public async listPrinters(): Promise<Printer[]> {
    const printers = await this.discoveryService.discoverPrinters();
    const storedAppDefaultId = StorageService.getItem<string | null>('appDefaultPrinterId', null);

    return printers.map((p) => ({
      ...p,
      isAppDefault: storedAppDefaultId ? p.id === storedAppDefaultId : p.isSystemDefault,
    }));
  }

  public async getAppDefaultPrinter(): Promise<Printer | null> {
    const printers = await this.listPrinters();
    return printers.find((p) => p.isAppDefault) || printers[0] || null;
  }

  public setAppDefaultPrinter(printerId: string): void {
    StorageService.setItem('appDefaultPrinterId', printerId);
  }

  public async getCapabilities(printerId: string): Promise<PrinterCapabilities> {
    return await this.discoveryService.getAdapter().getCapabilities(printerId);
  }

  public async executePrint(job: PrintJob, canvasElement?: HTMLCanvasElement): Promise<boolean> {
    return await this.discoveryService.getAdapter().print(job, canvasElement);
  }

  public async openNativeProperties(printerId: string): Promise<boolean> {
    return await this.discoveryService.getAdapter().openPrinterSettings(printerId);
  }
}
