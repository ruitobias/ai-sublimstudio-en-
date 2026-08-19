/**
 * Warp Engine - SubliStudio Pro
 * Implements cylindrical warping math: theta = asin(x/r)
 * Simulates real 3D cylinder foreshortening on mug surfaces
 */

export class WarpEngine {
  /**
   * Applies cylindrical wrap deformation to canvas pixels
   */
  static applyCylinderWarp(
    srcCanvas: HTMLCanvasElement,
    radiusMm = 41,
    printableWidthMm = 204,
    heightMm = 90
  ): HTMLCanvasElement {
    const destCanvas = document.createElement('canvas');
    destCanvas.width = srcCanvas.width;
    destCanvas.height = srcCanvas.height;

    const ctx = destCanvas.getContext('2d');
    if (!ctx) return srcCanvas;

    const srcCtx = srcCanvas.getContext('2d');
    if (!srcCtx) return srcCanvas;

    const w = srcCanvas.width;
    const h = srcCanvas.height;

    const srcImageData = srcCtx.getImageData(0, 0, w, h);
    const destImageData = ctx.createImageData(w, h);

    const srcData = srcImageData.data;
    const destData = destImageData.data;

    const rPx = (radiusMm / printableWidthMm) * w;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const destIdx = (y * w + x) * 4;

        // Normalized X from -0.5 to 0.5
        const normX = x / w - 0.5;
        const xOffset = normX * printableWidthMm;

        // Theta calculation: asin(x / r)
        const ratio = Math.max(-0.999, Math.min(0.999, xOffset / radiusMm));
        const theta = Math.asin(ratio);

        // Map back to source U coordinate
        const srcU = (theta / (Math.PI * 0.8) + 0.5) * w;
        const srcX = Math.round(srcU);
        const srcY = y;

        if (srcX >= 0 && srcX < w && srcY >= 0 && srcY < h) {
          const srcIdx = (srcY * w + srcX) * 4;

          // Foreshortening factor based on surface angle
          const foreshortening = Math.cos(theta);
          const brightness = 0.8 + foreshortening * 0.2;

          destData[destIdx] = Math.min(255, srcData[srcIdx] * brightness);
          destData[destIdx + 1] = Math.min(255, srcData[srcIdx + 1] * brightness);
          destData[destIdx + 2] = Math.min(255, srcData[srcIdx + 2] * brightness);
          destData[destIdx + 3] = srcData[srcIdx + 3];
        } else {
          destData[destIdx + 3] = 0;
        }
      }
    }

    ctx.putImageData(destImageData, 0, 0);
    return destCanvas;
  }

  /**
   * Generates a 2D Texture Canvas from SVG string for Three.js 3D Texture mapping
   */
  static svgToTextureCanvas(svgString: string, width = 1024, height = 1024): Promise<HTMLCanvasElement> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(canvas);
        return;
      }

      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };

      img.onerror = () => {
        ctx.fillStyle = '#10141e';
        ctx.fillRect(0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };

      img.src = url;
    });
  }
}
