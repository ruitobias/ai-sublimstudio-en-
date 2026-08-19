export class StorageService {
  private static prefix = 'sublim_studio_v4_';

  public fontName = 'StorageService';

  public static getItem<T>(key: string, defaultValue: T): T {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      if (!raw) return defaultValue;
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`StorageService.getItem failed for key ${key}:`, e);
      return defaultValue;
    }
  }

  public static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`StorageService.setItem failed for key ${key}:`, e);
    }
  }

  public static removeItem(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (e) {
      console.warn(`StorageService.removeItem failed for key ${key}:`, e);
    }
  }

  public static clearAllAppKeys(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.warn('StorageService.clearAllAppKeys failed:', e);
    }
  }
}
