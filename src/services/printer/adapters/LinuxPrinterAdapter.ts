import { PrinterPlatformAdapter } from '../PrinterPlatformAdapter';
import { Printer, PrinterCapabilities, PrintJob } from '../PrinterTypes';

export class LinuxPrinterAdapter implements PrinterPlatformAdapter {
  readonly platformName = 'linux';

  async getPrinters(): Promise<Printer[]> {
    return [
      {
        id: 'linux_cups_epson',
        name: 'Epson_L3250_CUPS',
        displayName: 'Epson L3250 (CUPS Linux Daemon)',
        manufacturer: 'Epson',
        model: 'EcoTank L3250',
        status: 'idle',
        isSystemDefault: true,
        isAppDefault: false,
        isAvailable: true,
        capabilities: {
          supportedDpis: [300, 600, 1200],
          supportedPaperSizes: [
            { id: 'A4', name: 'A4 (210 x 297 mm)', widthMm: 210, heightMm: 297, isBorderlessSupported: true }
          ],
          supportsColor: true,
          supportsDuplex: false,
          supportsBorderless: true,
          supportedMediaTypes: ['Sublimation Paper'],
          supportedPaperSources: ['Main Tray'],
          maxResolutionDpi: 1200
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

  async print(job: PrintJob): Promise<boolean> {
    window.print();
    return true;
  }

  async openPrinterSettings(): Promise<boolean> {
    return false;
  }

  async checkPrinterStatus(): Promise<Printer['status']> {
    return 'idle';
  }
}
