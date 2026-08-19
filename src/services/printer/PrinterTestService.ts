import { Printer, PrintSettings } from './PrinterTypes';

export class PrinterTestService {
  /**
   * Generates a high-definition calibration test page canvas.
   */
  public static generateTestPageCanvas(printer: Printer, settings: PrintSettings): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const dpi = settings.dpi || 300;
    
    // A4 dimensions in inches: 8.27 x 11.69
    const widthPx = Math.round(8.27 * dpi);
    const heightPx = Math.round(11.69 * dpi);

    canvas.width = widthPx;
    canvas.height = heightPx;

    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Fill white canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, widthPx, heightPx);

    // Header banner
    const bannerH = Math.round(dpi * 0.8);
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, widthPx, bannerH);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.round(dpi * 0.22)}px sans-serif`;
    ctx.fillText('Sublim Studio v4.0 — PÁGINA DE TESTE SUBLIMÁTICA', Math.round(dpi * 0.4), Math.round(dpi * 0.35));

    ctx.fillStyle = '#c084fc';
    ctx.font = `bold ${Math.round(dpi * 0.12)}px sans-serif`;
    ctx.fillText(`Impressora: ${printer.displayName} | Driver: ${printer.driverVersion || 'WinSpooler'} | Porta: ${printer.port || 'USB'}`, Math.round(dpi * 0.4), Math.round(dpi * 0.58));

    // Draw CMYK Calibration Blocks
    const cmykY = bannerH + Math.round(dpi * 0.3);
    const boxW = Math.round(dpi * 1.2);
    const boxH = Math.round(dpi * 0.6);
    const colors = [
      { name: 'Cyan 100%', code: '#00FFFF' },
      { name: 'Magenta 100%', code: '#FF00FF' },
      { name: 'Yellow 100%', code: '#FFFF00' },
      { name: 'Black 100%', code: '#000000' },
      { name: 'Pure Red', code: '#FF0000' },
      { name: 'Pure Green', code: '#00FF00' },
    ];

    colors.forEach((col, idx) => {
      const x = Math.round(dpi * 0.4) + idx * (boxW + Math.round(dpi * 0.15));
      ctx.fillStyle = col.code;
      ctx.fillRect(x, cmykY, boxW, boxH);
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(x, cmykY, boxW, boxH);

      ctx.fillStyle = '#1e293b';
      ctx.font = `bold ${Math.round(dpi * 0.08)}px sans-serif`;
      ctx.fillText(col.name, x, cmykY + boxH + Math.round(dpi * 0.12));
    });

    // Draw Sublimation Test Info Grid
    const infoY = cmykY + boxH + Math.round(dpi * 0.5);
    ctx.fillStyle = '#0f172a';
    ctx.font = `bold ${Math.round(dpi * 0.15)}px sans-serif`;
    ctx.fillText('PARÂMETROS DE IMPRESSÃO CONFIGURADOS:', Math.round(dpi * 0.4), infoY);

    const details = [
      `• Resolução / DPI: ${settings.dpi} DPI`,
      `• Tamanho do Papel: ${settings.paperSize}`,
      `• Orientação: ${settings.orientation.toUpperCase()}`,
      `• Perfil ICC: ${settings.iccProfile || 'Sem Perfil ICC (Direto)'}`,
      `• Espelhamento Horizontal: ${settings.mirror ? 'ATIVADO (Sublimação)' : 'DESATIVADO'}`,
      `• Gerenciamento de Cor: ${settings.colorManagement.toUpperCase()}`,
      `• Data e Hora do Teste: ${new Date().toLocaleString('pt-BR')}`
    ];

    ctx.font = `${Math.round(dpi * 0.11)}px sans-serif`;
    ctx.fillStyle = '#334155';
    details.forEach((line, idx) => {
      ctx.fillText(line, Math.round(dpi * 0.4), infoY + Math.round(dpi * 0.22) * (idx + 1));
    });

    // 100mm Physical Precision Ruler Test
    const rulerY = infoY + Math.round(dpi * 2.2);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;

    const rulerWidthMm = 100;
    const rulerWidthPx = Math.round((rulerWidthMm / 25.4) * dpi);
    const startX = Math.round(dpi * 0.4);

    ctx.beginPath();
    ctx.moveTo(startX, rulerY);
    ctx.lineTo(startX + rulerWidthPx, rulerY);
    ctx.stroke();

    ctx.font = `bold ${Math.round(dpi * 0.09)}px sans-serif`;
    ctx.fillStyle = '#0f172a';
    ctx.fillText('RÉGUA DE PRECISÃO FÍSICA (100 mm = 10 cm exactos na prensa):', startX, rulerY - Math.round(dpi * 0.1));

    for (let mm = 0; mm <= 100; mm += 5) {
      const curX = startX + Math.round((mm / 25.4) * dpi);
      const markH = mm % 10 === 0 ? Math.round(dpi * 0.15) : Math.round(dpi * 0.08);
      ctx.beginPath();
      ctx.moveTo(curX, rulerY);
      ctx.lineTo(curX, rulerY + markH);
      ctx.stroke();

      if (mm % 10 === 0) {
        ctx.fillText(`${mm / 10}cm`, curX - 8, rulerY + markH + Math.round(dpi * 0.12));
      }
    }

    return canvas;
  }
}
