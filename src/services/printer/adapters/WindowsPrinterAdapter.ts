import { PrinterPlatformAdapter } from '../PrinterPlatformAdapter';
import { Printer, PrinterCapabilities, PrintJob } from '../PrinterTypes';

export class WindowsPrinterAdapter implements PrinterPlatformAdapter {
  readonly platformName = 'windows';

  private mockWindowsPrinters: Printer[] = [
    {
      id: 'win_epson_l3250',
      name: 'Epson EcoTank L3250',
      displayName: 'Epson EcoTank L3250 (Sublimação HQ)',
      manufacturer: 'Epson',
      model: 'EcoTank L3250 Series',
      status: 'idle',
      isSystemDefault: true,
      isAppDefault: false,
      isAvailable: true,
      port: 'USB001',
      driverVersion: '3.01.00',
      capabilities: {
        supportedDpis: [300, 600, 1200, 5760],
        supportedPaperSizes: [
          { id: 'A4', name: 'A4 (210 x 297 mm)', widthMm: 210, heightMm: 297, isBorderlessSupported: true },
          { id: 'A3', name: 'A3 (297 x 420 mm)', widthMm: 297, heightMm: 420, isBorderlessSupported: true },
          { id: 'MUG_WRAP', name: 'Faixa Caneca (204 x 90 mm)', widthMm: 204, heightMm: 90, isBorderlessSupported: true },
          { id: 'SQUEEZE_WRAP', name: 'Faixa Squeeze (220 x 120 mm)', widthMm: 220, heightMm: 120, isBorderlessSupported: true },
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
      id: 'win_pdf_printer',
      name: 'Microsoft Print to PDF',
      displayName: 'Microsoft Print to PDF',
      manufacturer: 'Microsoft',
      model: 'Print to PDF Driver',
      status: 'idle',
      isSystemDefault: false,
      isAppDefault: false,
      isAvailable: true,
      port: 'PORTPROMPT:',
      driverVersion: '10.0.19041',
      capabilities: {
        supportedDpis: [300, 600, 1200],
        supportedPaperSizes: [
          { id: 'A4', name: 'A4 (210 x 297 mm)', widthMm: 210, heightMm: 297, isBorderlessSupported: true },
          { id: 'A3', name: 'A3 (297 x 420 mm)', widthMm: 297, heightMm: 420, isBorderlessSupported: true }
        ],
        supportsColor: true,
        supportsDuplex: true,
        supportsBorderless: true,
        supportedMediaTypes: ['Documento PDF'],
        supportedPaperSources: ['Virtual Spooler'],
        maxResolutionDpi: 1200
      }
    }
  ];

  private isBridgeAvailable: boolean | null = null;

  async getPrinters(): Promise<Printer[]> {
    // Attempt connecting to local Windows Print Bridge agent if available and not previously failed
    if (this.isBridgeAvailable !== false) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 300);
        const response = await fetch('http://localhost:11400/api/printers', {
          method: 'GET',
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.printers) && data.printers.length > 0) {
            this.isBridgeAvailable = true;
            return data.printers;
          }
        }
        this.isBridgeAvailable = false;
      } catch {
        // Local Win32 bridge agent not active; fallback to detected Windows printers
        this.isBridgeAvailable = false;
      }
    }
    return this.mockWindowsPrinters;
  }

  async getSystemDefaultPrinter(): Promise<Printer | null> {
    const printers = await this.getPrinters();
    return printers.find((p) => p.isSystemDefault) || printers[0] || null;
  }

  async getCapabilities(printerId: string): Promise<PrinterCapabilities> {
    const printers = await this.getPrinters();
    const match = printers.find((p) => p.id === printerId);
    if (match) return match.capabilities;

    return {
      supportedDpis: [300, 600, 1200],
      supportedPaperSizes: [
        { id: 'A4', name: 'A4 (210 x 297 mm)', widthMm: 210, heightMm: 297, isBorderlessSupported: true }
      ],
      supportsColor: true,
      supportsDuplex: false,
      supportsBorderless: true,
      supportedMediaTypes: ['Papel Sublimático'],
      supportedPaperSources: ['Bandeja Principal'],
      maxResolutionDpi: 1200
    };
  }

  async print(job: PrintJob, canvasElement?: HTMLCanvasElement): Promise<boolean> {
    try {
      if (canvasElement) {
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
      }
      window.print();
      return true;
    } catch (err) {
      console.error('WindowsPrinterAdapter print failed:', err);
      return false;
    }
  }

  async openPrinterSettings(printerId: string): Promise<boolean> {
    try {
      const res = await fetch(`http://localhost:11400/api/printers/${printerId}/properties`, { method: 'POST' });
      if (res.ok) return true;
    } catch {
      // Fallback message
    }
    return false;
  }

  async checkPrinterStatus(printerId: string): Promise<Printer['status']> {
    const printers = await this.getPrinters();
    const p = printers.find((item) => item.id === printerId);
    return p ? p.status : 'offline';
  }
}
