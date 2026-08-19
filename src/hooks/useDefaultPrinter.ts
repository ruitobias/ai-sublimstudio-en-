import { usePrinterStore } from '../store/usePrinterStore';

export function useDefaultPrinter() {
  const { printers, selectedPrinter, setAsAppDefault } = usePrinterStore();
  const systemDefault = printers.find((p) => p.isSystemDefault) || null;
  const appDefault = printers.find((p) => p.isAppDefault) || selectedPrinter || null;

  return {
    systemDefault,
    appDefault,
    setAsAppDefault,
  };
}
