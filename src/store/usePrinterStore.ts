import { useState, useEffect } from 'react';
import { PrinterService } from '../services/printer/PrinterService';
import { Printer, PrinterCapabilities } from '../services/printer/PrinterTypes';

export interface PrinterState {
  printers: Printer[];
  selectedPrinter: Printer | null;
  isLoading: boolean;
  capabilities: PrinterCapabilities | null;
  refreshPrinters: () => Promise<void>;
  selectPrinter: (printerId: string) => Promise<void>;
  setAsAppDefault: (printerId: string) => Promise<void>;
}

export function usePrinterStore(): PrinterState {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [capabilities, setCapabilities] = useState<PrinterCapabilities | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const printerService = PrinterService.getInstance();

  const refreshPrinters = async () => {
    setIsLoading(true);
    try {
      const list = await printerService.listPrinters();
      setPrinters(list);
      const def = list.find((p) => p.isAppDefault) || list[0] || null;
      setSelectedPrinter(def);

      if (def) {
        const caps = await printerService.getCapabilities(def.id);
        setCapabilities(caps);
      }
    } catch (err) {
      console.warn('usePrinterStore refreshPrinters failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectPrinter = async (printerId: string) => {
    const match = printers.find((p) => p.id === printerId);
    if (match) {
      setSelectedPrinter(match);
      const caps = await printerService.getCapabilities(printerId);
      setCapabilities(caps);
    }
  };

  const setAsAppDefault = async (printerId: string) => {
    printerService.setAppDefaultPrinter(printerId);
    await refreshPrinters();
  };

  useEffect(() => {
    refreshPrinters();
  }, []);

  return {
    printers,
    selectedPrinter,
    isLoading,
    capabilities,
    refreshPrinters,
    selectPrinter,
    setAsAppDefault,
  };
}
