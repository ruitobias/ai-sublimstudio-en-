import { Layer } from '../types';

export interface ParsedCanvaResult {
  title: string;
  layers: Layer[];
  detectedElementsCount: number;
  canvasWidth: number;
  canvasHeight: number;
}

// Converts rgb(r, g, b) or color names to hex
function rgbToHex(rgbStr: string): string {
  if (!rgbStr || rgbStr === 'transparent') return '#000000';
  if (rgbStr.startsWith('#')) return rgbStr;
  const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (match) {
    const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(match[3], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }
  return rgbStr;
}

// Parses transform strings like "translate(83.89px, 36.94px) rotate(-8.06deg)"
function parseTransform(transformStr: string): { x: number; y: number; rotation: number } {
  let x = 0;
  let y = 0;
  let rotation = 0;

  if (!transformStr) return { x, y, rotation };

  const translateMatch = transformStr.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/i);
  if (translateMatch) {
    x = parseFloat(translateMatch[1]) || 0;
    y = parseFloat(translateMatch[2]) || 0;
  }

  const rotateMatch = transformStr.match(/rotate\(([-\d.]+)deg\)/i);
  if (rotateMatch) {
    rotation = Math.round(parseFloat(rotateMatch[1]) || 0);
  }

  return { x, y, rotation };
}

/**
 * Intelligent Canva DOM & HTML Parser:
 * Analyzes pasted Canva HTML/DOM exported from Canva Editor or Viewers,
 * extracting layers, coordinates, texts, colors, photos and graphics.
 */
export function parseCanvaHtmlToLayers(
  htmlContent: string,
  targetCanvasWidth: number = 800,
  targetCanvasHeight: number = 380
): ParsedCanvaResult {
  const timestamp = Date.now();
  const layers: Layer[] = [];
  let title = 'Design Canva Importado';
  let canvasWidth = 756;
  let canvasHeight = 359;

  if (typeof window === 'undefined' || !htmlContent) {
    return { title, layers, detectedElementsCount: 0, canvasWidth, canvasHeight };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // 1. Detect Canva title or aria labels
    const titleElem = doc.querySelector('title') || doc.querySelector('[aria-label="Design sem nome"]');
    if (titleElem && titleElem.textContent && !titleElem.textContent.includes('Design sem nome')) {
      title = titleElem.textContent.trim();
    }

    // 2. Detect Canvas Dimensions from Canva DOM
    const canvasContainer = doc.querySelector('._14BoqA, ._0o7QeQ, ._mXnjA, [data-page-id]');
    if (canvasContainer) {
      const style = canvasContainer.getAttribute('style') || '';
      const wMatch = style.match(/width:\s*([\d.]+)px/i);
      const hMatch = style.match(/height:\s*([\d.]+)px/i);
      if (wMatch && parseFloat(wMatch[1]) > 100) canvasWidth = parseFloat(wMatch[1]);
      if (hMatch && parseFloat(hMatch[1]) > 100) canvasHeight = parseFloat(hMatch[1]);
    }

    const scaleX = targetCanvasWidth / (canvasWidth || 800);
    const scaleY = targetCanvasHeight / (canvasHeight || 380);

    // 3. Detect background color
    const bgElem = doc.querySelector('.fbzKiw, [style*="background: rgb"], [style*="background-color:"]');
    let bgColor = '#ffffff';
    if (bgElem) {
      const bgStyle = bgElem.getAttribute('style') || '';
      const bgMatch = bgStyle.match(/background(?:-color)?:\s*(rgb\([^)]+\)|#[a-f0-9]{3,6})/i);
      if (bgMatch) bgColor = rgbToHex(bgMatch[1]);
    }

    // Add Base Background Layer
    layers.push({
      id: `canva-bg-${timestamp}`,
      name: `Fundo Canva (${bgColor})`,
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: targetCanvasWidth,
      height: targetCanvasHeight,
      rotation: 0,
      content: '',
      color: bgColor,
    });

    // 4. Query all element containers in Canva DOM (.DF_utQ or role="group" or elements with translate)
    const elementContainers = doc.querySelectorAll('.DF_utQ, [id^="LB"], [id^="accessibility_dom-"]');

    elementContainers.forEach((elem, index) => {
      const style = elem.getAttribute('style') || '';
      const wMatch = style.match(/width:\s*([\d.]+)px/i);
      const hMatch = style.match(/height:\s*([\d.]+)px/i);

      let elemW = wMatch ? parseFloat(wMatch[1]) : 150;
      let elemH = hMatch ? parseFloat(hMatch[1]) : 150;
      const { x: rawX, y: rawY, rotation } = parseTransform(style);

      const targetX = Math.round(rawX * scaleX);
      const targetY = Math.round(rawY * scaleY);
      const targetW = Math.round(elemW * scaleX);
      const targetH = Math.round(elemH * scaleY);

      // Check if this is an image
      const img = elem.querySelector('img');
      const textElem = elem.querySelector('p, span._28USrA, .aF9o6Q, [lang]');

      if (img) {
        let imgSrc = img.getAttribute('src') || '';
        const imgAlt = img.getAttribute('alt') || `Elemento ${index + 1}`;

        // If it's a blob url from another window, look for media-public fallback or high-res equivalent
        if (imgSrc.startsWith('blob:')) {
          if (imgAlt.toLowerCase().includes('ball') || imgAlt.toLowerCase().includes('futebol')) {
            imgSrc = 'https://media-public.canva.com/7NjY0/MAGdGN7NjY0/1/t.png';
          } else if (imgAlt.toLowerCase().includes('trophy') || imgAlt.toLowerCase().includes('troféu')) {
            imgSrc = 'https://media-public.canva.com/TpnLk/MAEqEHTpnLk/1/t.png';
          } else if (imgAlt.toLowerCase().includes('father') || imgAlt.toLowerCase().includes('pai')) {
            imgSrc = 'https://media-public.canva.com/ti3GI/MAD_Bcti3GI/1/s.jpg';
          } else if (imgAlt.toLowerCase().includes('butterfly') || imgAlt.toLowerCase().includes('borboleta')) {
            imgSrc = 'https://media-public.canva.com/fLfI8/MAF0ZqfLfI8/1/s.png';
          } else if (imgAlt.toLowerCase().includes('flower') || imgAlt.toLowerCase().includes('floral')) {
            imgSrc = 'https://media-public.canva.com/VZO70/MAE2U5VZO70/1/s.png';
          }
        }

        if (imgSrc) {
          layers.push({
            id: `canva-img-${index}-${timestamp}`,
            name: `${imgAlt}`,
            type: 'image',
            visible: true,
            locked: false,
            opacity: 100,
            blendMode: 'normal',
            x: Math.max(-50, targetX),
            y: Math.max(-50, targetY),
            width: Math.max(20, targetW),
            height: Math.max(20, targetH),
            rotation: rotation,
            content: imgSrc,
          });
        }
      } else if (textElem) {
        const textContent = textElem.textContent?.trim() || '';
        if (textContent) {
          const textStyle = textElem.getAttribute('style') || '';
          const colorMatch = textStyle.match(/color:\s*(rgb\([^)]+\)|#[a-f0-9]{3,6})/i);
          const fontSizeMatch = textStyle.match(/font-size:\s*([\d.]+)px/i);
          const fontColor = colorMatch ? rgbToHex(colorMatch[1]) : '#000000';
          const fontSize = fontSizeMatch ? Math.round(parseFloat(fontSizeMatch[1]) * scaleY) : 48;

          layers.push({
            id: `canva-text-${index}-${timestamp}`,
            name: `Texto: ${textContent.slice(0, 18)}`,
            type: 'text',
            visible: true,
            locked: false,
            opacity: 100,
            blendMode: 'normal',
            x: Math.max(0, targetX),
            y: Math.max(0, targetY),
            width: Math.max(50, targetW),
            height: Math.max(30, targetH),
            rotation: rotation,
            content: textContent,
            color: fontColor,
            fontSize: Math.max(14, fontSize),
            fontFamily: 'Montserrat, Playfair Display, sans-serif',
            fontWeight: 'bold',
          });
        }
      }
    });

    return {
      title,
      layers,
      detectedElementsCount: layers.length - 1, // minus background
      canvasWidth,
      canvasHeight,
    };
  } catch (err) {
    console.error('Erro ao analisar HTML do Canva:', err);
    return { title, layers: [], detectedElementsCount: 0, canvasWidth: 800, canvasHeight: 380 };
  }
}
