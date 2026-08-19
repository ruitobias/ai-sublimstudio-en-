import { usePrinterStore } from '../store/usePrinterStore';

export function usePrinters() {
  const { printers, isLoading, refreshPrinters, selectPrinter } = usePrinterStore();
  return { printers, isLoading, refreshPrinters, selectPrinter };
}
