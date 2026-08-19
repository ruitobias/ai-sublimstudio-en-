/**
 * AI Engine - SubliStudio Pro
 * Generates sublimation art using Pollinations Flux model & utilities
 */

export class AIEngine {
  /**
   * Generates high-res sublimation print image via Pollinations Flux AI model
   */
  static generateSublimationArtUrl(prompt: string, width = 1080, height = 1350): string {
    const encodedPrompt = encodeURIComponent(
      `${prompt}, sublimation print design, 8k resolution, vibrant colors, ultra detailed, sharp vector art, isolated background`
    );
    const seed = Math.floor(Math.random() * 1000000);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;
  }

  /**
   * Extracts prominent 5-color palette from an image canvas
   */
  static extractColorPalette(canvas: HTMLCanvasElement): string[] {
    const ctx = canvas.getContext('2d');
    if (!ctx) return ['#00D9FF', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const colorMap: Record<string, number> = {};

    for (let i = 0; i < imageData.length; i += 16) {
      const r = Math.round(imageData[i] / 32) * 32;
      const g = Math.round(imageData[i + 1] / 32) * 32;
      const b = Math.round(imageData[i + 2] / 32) * 32;
      const a = imageData[i + 3];

      if (a > 128) {
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }
    }

    const sortedColors = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);
    return sortedColors.slice(0, 5).length >= 5
      ? sortedColors.slice(0, 5)
      : ['#00D9FF', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
  }

  /**
   * Removes white or uniform background from an image on canvas (Chroma-key)
   */
  static removeBackground(canvas: HTMLCanvasElement, tolerance = 35): HTMLCanvasElement {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Check if pixel is near white
      if (r > 255 - tolerance && g > 255 - tolerance && b > 255 - tolerance) {
        data[i + 3] = 0; // Set alpha to 0
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }
}
