import { PrinterPlatformAdapter } from '../PrinterPlatformAdapter';
import { Printer, PrinterCapabilities, PrintJob } from '../PrinterTypes';

export class MacOSPrinterAdapter implements PrinterPlatformAdapter {
  readonly platformName = 'macos';

  async getPrinters(): Promise<Printer[]> {
    return [
      {
        id: 'mac_cups_epson',
        name: 'Epson EcoTank L3250 (AirPrint CUPS)',
        displayName: 'Epson EcoTank L3250 (AirPrint / CUPS)',
        manufacturer: 'Epson',
        model: 'L3250 Series',
        status: 'idle',
        isSystemDefault: true,
        isAppDefault: false,
        isAvailable: true,
        capabilities: {
          supportedDpis: [300, 600, 1200, 2400],
          supportedPaperSizes: [
            { id: 'A4', name: 'A4 (210 x 297 mm)', widthMm: 210, heightMm: 297, isBorderlessSupported: true },
            { id: 'A3', name: 'A3 (297 x 420 mm)', widthMm: 297, heightMm: 420, isBorderlessSupported: true }
          ],
          supportsColor: true,
          supportsDuplex: true,
          supportsBorderless: true,
          supportedMediaTypes: ['Papel Sublimático', 'Photo Paper Glossy'],
          supportedPaperSources: ['Rear Feed Tray'],
          maxResolutionDpi: 2400
        }
      }
    ];
  }

  async getSystemDefaultPrinter(): Promise<Printer | null> {
    const list = await this.getPrinters();
    return list[0] || null;
  }

  async getCapabilities(printerId: string): Promise<PrinterCapabilities> {
    const list = await this.getPrinters();
    const p = list.find((item) => item.id === printerId);
    return p ? p.capabilities : list[0].capabilities;
  }

  async print(job: PrintJob, canvasElement?: HTMLCanvasElement): Promise<boolean> {
    if (canvasElement) {
      window.print();
      return true;
    }
    return false;
  }

  async openPrinterSettings(): Promise<boolean> {
    return false;
  }

  async checkPrinterStatus(): Promise<Printer['status']> {
    return 'idle';
  }
}
