import { PrinterPlatformAdapter } from '../PrinterPlatformAdapter';
import { Printer, PrinterCapabilities, PrintJob } from '../PrinterTypes';

export class WebPwaPrinterAdapter implements PrinterPlatformAdapter {
  readonly platformName = 'webpwa';

  private defaultWebPrinters: Printer[] = [
    {
      id: 'pwa_epson_l3250',
      name: 'Epson EcoTank L3250 (Driver PWA Sublimação)',
      displayName: 'Epson EcoTank L3250 (Driver PWA Sublimação)',
      manufacturer: 'Epson',
      model: 'EcoTank L3250 Sublimation',
      status: 'idle',
      isSystemDefault: true,
      isAppDefault: true,
      isAvailable: true,
      port: 'USB / Wi-Fi Direct',
      driverVersion: '4.10 PWA Bridge',
      capabilities: {
        supportedDpis: [300, 600, 1200, 5760],
        supportedPaperSizes: [
          { id: 'A4', name: 'A4 (210 x 297 mm)', widthMm: 210, heightMm: 297, isBorderlessSupported: true },
          { id: 'A3', name: 'A3 (297 x 420 mm)', widthMm: 297, heightMm: 420, isBorderlessSupported: true },
          { id: 'MUG_WRAP', name: 'Faixa Caneca (204 x 90 mm)', widthMm: 204, heightMm: 90, isBorderlessSupported: true },
          { id: 'SQUEEZE_WRAP', name: 'Faixa Squeeze (220 x 120 mm)', widthMm: 220, heightMm: 120, isBorderlessSupported: true },
          { id: 'TILE_15X15', name: 'Azulejo 15 x 15 cm', widthMm: 150, heightMm: 150, isBorderlessSupported: true },
          { id: 'LETTER', name: 'Carta (216 x 279 mm)', widthMm: 216, heightMm: 279, isBorderlessSupported: false }
        ],
        supportsColor: true,
        supportsDuplex: false,
        supportsBorderless: true,
        supportedMediaTypes: ['Papel Sublimático Tratado 100g', 'Papel Glossy Sublimação', 'Papel Comum Matte'],
        supportedPaperSources: ['Bandeja Traseira Principal', 'Alimentação Manual'],
        maxResolutionDpi: 5760
      }
    },
    {
      id: 'pwa_pdf_export',
      name: 'Gerador PDF / Spooler do Navegador',
      displayName: 'Gerador PDF / Spooler do Navegador',
      manufacturer: 'Web Browser System',
      model: 'HTML5 Print Engine',
      status: 'idle',
      isSystemDefault: false,
      isAppDefault: false,
      isAvailable: true,
      port: 'SYSTEM_DIALOG',
      driverVersion: '1.0 Web',
      capabilities: {
        supportedDpis: [300, 600, 1200],
        supportedPaperSizes: [
          { id: 'A4', name: 'A4 (210 x 297 mm)', widthMm: 210, heightMm: 297, isBorderlessSupported: true },
          { id: 'A3', name: 'A3 (297 x 420 mm)', widthMm: 297, heightMm: 420, isBorderlessSupported: true }
        ],
        supportsColor: true,
        supportsDuplex: true,
        supportsBorderless: true,
        supportedMediaTypes: ['Impressora Padrão do Sistema'],
        supportedPaperSources: ['Diálogo Padrão'],
        maxResolutionDpi: 1200
      }
    }
  ];

  async getPrinters(): Promise<Printer[]> {
    return this.defaultWebPrinters;
  }

  async getSystemDefaultPrinter(): Promise<Printer | null> {
    return this.defaultWebPrinters[0];
  }

  async getCapabilities(printerId: string): Promise<PrinterCapabilities> {
    const match = this.defaultWebPrinters.find((p) => p.id === printerId);
    return match ? match.capabilities : this.defaultWebPrinters[0].capabilities;
  }

  async print(job: PrintJob, canvasElement?: HTMLCanvasElement): Promise<boolean> {
    if (canvasElement) {
      try {
        const dataUrl = canvasElement.toDataURL('image/png');
        const printWin = window.open('', '_blank');
        if (printWin) {
          printWin.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${job.documentTitle} - Sublim Studio</title>
                <style>
                  @page { size: auto; margin: 0mm; }
                  body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #fff; }
                  img { max-width: 100%; max-height: 100%; ${job.settingsUsed.mirror ? 'transform: scaleX(-1);' : ''} }
                </style>
              </head>
              <body>
                <img src="${dataUrl}" />
                <script>
                  window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 500);
                  };
                </script>
              </body>
            </html>
          `);
          printWin.document.close();
          return true;
        }
      } catch (err) {
        console.warn('WebPwa print popup failed:', err);
      }
    }
    window.print();
    return true;
  }

  async openPrinterSettings(): Promise<boolean> {
    window.print();
    return true;
  }

  async checkPrinterStatus(): Promise<Printer['status']> {
    return 'idle';
  }
}
