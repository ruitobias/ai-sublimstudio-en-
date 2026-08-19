import { usePrintPresetStore } from '../store/usePrintPresetStore';

export function usePrintPresets() {
  const { presets, savePreset, deletePreset } = usePrintPresetStore();
  return { presets, savePreset, deletePreset };
}
