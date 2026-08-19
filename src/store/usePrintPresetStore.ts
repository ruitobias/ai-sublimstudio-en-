import { useState } from 'react';
import { StorageService } from '../services/storage/StorageService';
import { PrintPreset, PrintSettings } from '../services/printer/PrinterTypes';

const DEFAULT_PRESETS: PrintPreset[] = [
  {
    id: 'preset_mug_325ml',
    name: 'Epson L3250 — Sublimação Caneca 325ml',
    printerId: 'pwa_epson_l3250',
    productCategory: 'MUG',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: {
      printerId: 'pwa_epson_l3250',
      paperSize: 'MUG_WRAP',
      orientation: 'landscape',
      quality: 'photo',
      dpi: 1200,
      colorMode: 'color',
      colorManagement: 'icc',
      iccProfile: 'subli_vibrant_hd',
      mediaType: 'Papel Sublimático Tratado 100g',
      paperSource: 'Bandeja Traseira Principal',
      scaling: 100,
      fitToPage: false,
      borderless: true,
      mirror: true,
      copies: 1,
      renderingIntent: 'relative',
      blackPointCompensation: true,
      preserveOriginalResolution: true,
      disableAutoResize: true,
      maintainAspectRatio: true,
    }
  },
  {
    id: 'preset_tshirt_a4',
    name: 'Epson L3250 — Sublimação Camiseta A4',
    printerId: 'pwa_epson_l3250',
    productCategory: 'APPAREL',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: {
      printerId: 'pwa_epson_l3250',
      paperSize: 'A4',
      orientation: 'portrait',
      quality: 'high',
      dpi: 600,
      colorMode: 'color',
      colorManagement: 'icc',
      iccProfile: 'subli_vibrant_hd',
      mediaType: 'Papel Sublimático Tratado 100g',
      paperSource: 'Bandeja Traseira Principal',
      scaling: 100,
      fitToPage: true,
      borderless: true,
      mirror: true,
      copies: 1,
      renderingIntent: 'perceptual',
      blackPointCompensation: true,
      preserveOriginalResolution: true,
      disableAutoResize: false,
      maintainAspectRatio: true,
    }
  }
];

export function usePrintPresetStore() {
  const [presets, setPresets] = useState<PrintPreset[]>(() => {
    return StorageService.getItem<PrintPreset[]>('printPresetsList', DEFAULT_PRESETS);
  });

  const savePreset = (name: string, printerId: string, settings: PrintSettings, productCategory?: string) => {
    const newPreset: PrintPreset = {
      id: 'preset_' + Date.now(),
      name,
      printerId,
      settings,
      productCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPresets((prev) => {
      const next = [newPreset, ...prev];
      StorageService.setItem('printPresetsList', next);
      return next;
    });
  };

  const deletePreset = (presetId: string) => {
    setPresets((prev) => {
      const next = prev.filter((p) => p.id !== presetId);
      StorageService.setItem('printPresetsList', next);
      return next;
    });
  };

  return {
    presets,
    savePreset,
    deletePreset,
  };
}
