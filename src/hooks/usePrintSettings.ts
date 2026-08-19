import { usePrintSettingsStore } from '../store/usePrintSettingsStore';

export function usePrintSettings(initialPrinterId?: string) {
  const { settings, updateSettings, resetToDefaults } = usePrintSettingsStore(initialPrinterId);
  return { settings, updateSettings, resetToDefaults };
}
