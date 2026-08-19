import { PrintSettings, PrinterCapabilities } from './PrinterTypes';

export class PrinterSettingsService {
  public static createDefaultSettings(printerId: string, capabilities?: PrinterCapabilities): PrintSettings {
    const supportedDpi = capabilities?.supportedDpis?.length ? capabilities.supportedDpis[0] : 300;
    const paper = capabilities?.supportedPaperSizes?.length ? capabilities.supportedPaperSizes[0].id : 'A4';

    return {
      printerId,
      paperSize: paper,
      orientation: 'portrait',
      quality: 'high',
      dpi: supportedDpi >= 300 ? supportedDpi : 300,
      colorMode: 'color',
      colorManagement: 'icc',
      iccProfile: 'subli_vibrant_hd',
      mediaType: capabilities?.supportedMediaTypes?.[0] || 'Papel Sublimático',
      paperSource: capabilities?.supportedPaperSources?.[0] || 'Bandeja Principal',
      scaling: 100,
      fitToPage: false,
      borderless: capabilities?.supportsBorderless ?? true,
      mirror: true, // Sublimation default is TRUE
      copies: 1,
      renderingIntent: 'relative',
      blackPointCompensation: true,
      preserveOriginalResolution: true,
      disableAutoResize: true,
      maintainAspectRatio: true,
    };
  }

  public static validateSettings(settings: PrintSettings, capabilities?: PrinterCapabilities): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!settings.printerId) {
      errors.push('Impressora não foi selecionada.');
    }

    if (capabilities) {
      if (settings.dpi && !capabilities.supportedDpis.includes(settings.dpi)) {
        errors.push(`A resolução de ${settings.dpi} DPI não é suportada por esta impressora. Resoluções válidas: ${capabilities.supportedDpis.join(', ')} DPI.`);
      }

      if (settings.borderless && !capabilities.supportsBorderless) {
        errors.push('A impressora selecionada não suporta impressão sem bordas.');
      }
    }

    if (settings.copies < 1 || settings.copies > 999) {
      errors.push('Número de cópias deve ser entre 1 e 999.');
    }

    if (settings.scaling < 10 || settings.scaling > 500) {
      errors.push('Escala deve estar entre 10% e 500%.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
