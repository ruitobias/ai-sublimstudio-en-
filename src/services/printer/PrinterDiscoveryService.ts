import { PrinterPlatformAdapter } from './PrinterPlatformAdapter';
import { WindowsPrinterAdapter } from './adapters/WindowsPrinterAdapter';
import { MacOSPrinterAdapter } from './adapters/MacOSPrinterAdapter';
import { LinuxPrinterAdapter } from './adapters/LinuxPrinterAdapter';
import { WebPwaPrinterAdapter } from './adapters/WebPwaPrinterAdapter';
import { Printer } from './PrinterTypes';

export class PrinterDiscoveryService {
  private adapter: PrinterPlatformAdapter;

  constructor() {
    this.adapter = this.resolvePlatformAdapter();
  }

  private resolvePlatformAdapter(): PrinterPlatformAdapter {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    
    if (userAgent.includes('win')) {
      return new WindowsPrinterAdapter();
    } else if (userAgent.includes('mac')) {
      return new MacOSPrinterAdapter();
    } else if (userAgent.includes('linux')) {
      return new LinuxPrinterAdapter();
    } else {
      return new WebPwaPrinterAdapter();
    }
  }

  public getAdapter(): PrinterPlatformAdapter {
    return this.adapter;
  }

  public async discoverPrinters(): Promise<Printer[]> {
    try {
      return await this.adapter.getPrinters();
    } catch (e) {
      console.warn('PrinterDiscoveryService.discoverPrinters failed, using PWA fallback adapter:', e);
      const fallback = new WebPwaPrinterAdapter();
      return await fallback.getPrinters();
    }
  }

  public async getSystemDefault(): Promise<Printer | null> {
    try {
      return await this.adapter.getSystemDefaultPrinter();
    } catch {
      return null;
    }
  }
}
