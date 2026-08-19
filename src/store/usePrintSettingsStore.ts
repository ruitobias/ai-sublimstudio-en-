import { useState, useEffect } from 'react';
import { StorageService } from '../services/storage/StorageService';
import { PrintSettings } from '../services/printer/PrinterTypes';
import { PrinterSettingsService } from '../services/printer/PrinterSettingsService';

export function usePrintSettingsStore(initialPrinterId: string = 'pwa_epson_l3250') {
  const [settings, setSettings] = useState<PrintSettings>(() => {
    return StorageService.getItem<PrintSettings>(
      'currentPrintSettings',
      PrinterSettingsService.createDefaultSettings(initialPrinterId)
    );
  });

  const updateSettings = (partial: Partial<PrintSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      StorageService.setItem('currentPrintSettings', next);
      return next;
    });
  };

  const resetToDefaults = (printerId: string) => {
    const def = PrinterSettingsService.createDefaultSettings(printerId);
    setSettings(def);
    StorageService.setItem('currentPrintSettings', def);
  };

  return {
    settings,
    updateSettings,
    resetToDefaults,
  };
}
