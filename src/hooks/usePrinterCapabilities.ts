import { usePrinterStore } from '../store/usePrinterStore';

export function usePrinterCapabilities() {
  const { capabilities, selectedPrinter } = usePrinterStore();
  return { capabilities, selectedPrinter };
}
