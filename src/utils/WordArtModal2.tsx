import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Type,
  Wand2,
  Download,
  Plus,
  Layers,
  Palette,
  Sliders,
  Check,
  RefreshCw,
  Zap,
  Shapes,
  Maximize2
} from 'lucide-react';
import { TextWarpStyle, WordArtConfig, WordItem } from '../types';

interface WordArtModalProps {
  isOpen: boolean;
  onClose: () => void;
  // legacy preset callback (keeps backward compatibility)
  onAddWordArt?: (preset: {
    title: string;
    content: string;
    fontFamily: string;
    warpStyle: TextWarpStyle;
    warpIntensity: number;
    color: string;
    strokeColor?: string;
    strokeWidth?: number;
    shadowColor?: string;
    shadowBlur?: number;
    fontSize?: number;
    width?: number;
    height?: number;
  }) => void;
  // new callback that receives a PNG dataURL with transparent background and config
  onAddWordArtImage?: (dataUrl: string, title?: string, config?: WordArtConfig, wordArtType?: 'wordart1' | 'wordart2') => void;
  // new callback that receives a Blob (preferred for large/high-res images)
  onAddWordArtBlob?: (blob: Blob, title?: string) => void;
  theme?: 'dark' | 'light';
  initialConfig?: WordArtConfig;
  isEditing?: boolean;
}

interface WordArtPreset {
  id: string;
  name: string;
  category: 'retro' | 'curved' | '3d' | 'cloud' | 'badge';
  content: string;
  subwords?: string;
  fontFamily: string;
  warpStyle: TextWarpStyle;
  warpIntensity: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  shadowColor: string;
  shadowBlur: number;
  gradient?: string;
  description: string;
}

const WORDART_PRESETS: WordArtPreset[] = [
  {
    id: 'vintage-3d',
    name: 'Retro 3D Sublimation',
    category: 'retro',
    content: 'SUPER MÃE',
    fontFamily: 'Impact',
    warpStyle: 'arc_upper',
    warpIntensity: 45,
    color: '#ff2a75',
    strokeColor: '#2b0018',
    strokeWidth: 4,
    shadowColor: '#ffd700',
    shadowBlur: 10,
    gradient: 'linear-gradient(135deg, #ff2a75 0%, #ff8c00 100%)',
    description: 'Texto tridimensional retrô com arco suave e gradiente vibrante'
  },
  {
    id: 'mug-badge',
    name: 'Emblema Caneca Circular',
    category: 'badge',
    content: 'CAFÉ & AMOR • 100% ARTESANAL •',
    fontFamily: 'Bebas Neue',
    warpStyle: 'circle',
    warpIntensity: 70,
    color: '#3d2314',
    strokeColor: '#f5e0c3',
    strokeWidth: 2,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowBlur: 4,
    description: 'Texto circular perfeito estilo selo vintage para topo de canecas'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyberpunk 3D',
    category: '3d',
    content: 'CHAMPION 2026',
    fontFamily: 'Bangers',
    warpStyle: 'wave',
    warpIntensity: 50,
    color: '#00f0ff',
    strokeColor: '#ff007f',
    strokeWidth: 3,
    shadowColor: '#00f0ff',
    shadowBlur: 15,
    gradient: 'linear-gradient(90deg, #00f0ff, #7000ff, #ff007f)',
    description: 'Onda senoidal neon brilhante com contorno magenta eletrizante'
  },
  {
    id: 'gold-royalty',
    name: 'Ouro Real Sublimático',
    category: 'retro',
    content: 'GRATIDÃO & FÉ',
    fontFamily: 'Cinzel',
    warpStyle: 'straight',
    warpIntensity: 0,
    color: '#d4af37',
    strokeColor: '#3a2e05',
    strokeWidth: 2,
    shadowColor: '#8a6d1b',
    shadowBlur: 8,
    gradient: 'linear-gradient(180deg, #fff2a1 0%, #d4af37 50%, #aa7c11 100%)',
    description: 'Tipografia serifada de luxo com brilho dourado e sombra refinada'
  },
  {
    id: 'heart-cloud',
    name: 'Nuvem de Palavras Coração',
    category: 'cloud',
    content: 'AMOR',
    subwords: 'Família, Carinho, União, Afeto, Gratidão, Paz, Alegria, Vida, Sorriso',
    fontFamily: 'Pacifico',
    warpStyle: 'heart',
    warpIntensity: 60,
    color: '#e11d48',
    strokeColor: '#ffffff',
    strokeWidth: 2,
    shadowColor: 'rgba(225, 29, 72, 0.4)',
    shadowBlur: 12,
    description: 'Palavras entrelaçadas em silhueta de coração para presentes'
  },
  {
    id: 'stamp-seal',
    name: 'Selo Oficial Estampa',
    category: 'badge',
    content: 'EDITION PRO • SUBLIMATION STUDIO •',
    fontFamily: 'Montserrat',
    warpStyle: 'stamp_style',
    warpIntensity: 65,
    color: '#1e293b',
    strokeColor: '#3b82f6',
    strokeWidth: 3,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowBlur: 5,
    description: 'Design de carimbo selado circular com textos em arco'
  },
  {
    id: 'comic-pop',
    name: 'PopArt Quadrinhos',
    category: '3d',
    content: 'POW! HEROI',
    fontFamily: 'Bungee',
    warpStyle: 'bulge',
    warpIntensity: 55,
    color: '#facc15',
    strokeColor: '#000000',
    strokeWidth: 5,
    shadowColor: '#ef4444',
    shadowBlur: 0,
    description: 'Texto tufado com contorno denso estilo quadrinhos vintage'
  },
  {
    id: 'ribbon-banner',
    name: 'Faixa Curva de Gala',
    category: 'curved',
    content: 'MEU PRIMEIRO AMOR',
    fontFamily: 'Lobster',
    warpStyle: 'ribbon',
    warpIntensity: 50,
    color: '#8b5cf6',
    strokeColor: '#4c1d95',
    strokeWidth: 2,
    shadowColor: '#c084fc',
    shadowBlur: 8,
    description: 'Texto elegante em faixa arqueada suave para datas especiais'
  }
];

const FONTS_LIST = [
  'Impact',
  'Bebas Neue',
  'Pacifico',
  'Lobster',
  'Montserrat',
  'Playfair Display',
  'Anton',
  'Great Vibes',
  'Press Start 2P',
  'Satisfy',
  'Cinzel',
  'Bangers',
  'Bungee',
  'Permanent Marker'
];

const WARP_STYLES: { id: TextWarpStyle; name: string }[] = [
  { id: 'straight', name: 'Reto Normal' },
  { id: 'arc_upper', name: 'Arco Superior' },
  { id: 'arc_lower', name: 'Arco Inferior' },
  { id: 'circle', name: 'Círculo 360°' },
  { id: 'wave', name: 'Onda Senoidal' },
  { id: 'smile', name: 'Sorriso (Parábola)' },
  { id: 'frown', name: 'U Invertido' },
  { id: 'heart', name: 'Coração' },
  { id: 'star', name: 'Estrela' },
  { id: 'emblem', name: 'Emblema' },
  { id: 'stamp_style', name: 'Carimbo / Selo' },
  { id: 'ribbon', name: 'Faixa Banner' },
  { id: 'bulge', name: 'Inchar / Tufado' },
  { id: 'perspective_center', name: 'Perspectiva 3D' }
];

export const WordArtModal2: React.FC<WordArtModalProps> = ({
  isOpen,
  onClose,
  onAddWordArt,
  onAddWordArtImage,
  onAddWordArtBlob,
  theme = 'dark',
  initialConfig,
  isEditing = false,
}) => {
  const [activePreset, setActivePreset] = useState<WordArtPreset>(WORDART_PRESETS[0]);
  const [content, setContent] = useState(() => {
    if (initialConfig?.words && initialConfig.words.length > 0) {
      return initialConfig.words[0].text;
    }
    return WORDART_PRESETS[0].content;
  });
  const [subwords, setSubwords] = useState(() => {
    if (initialConfig?.words && initialConfig.words.length > 1) {
      return initialConfig.words.slice(1).map((w) => w.text).join(', ');
    }
    return WORDART_PRESETS[0].subwords || '';
  });
  const [fontFamily, setFontFamily] = useState(initialConfig?.font || WORDART_PRESETS[0].fontFamily);
  const [warpStyle, setWarpStyle] = useState<TextWarpStyle>(
    (initialConfig?.shape as TextWarpStyle) || WORDART_PRESETS[0].warpStyle
  );
  const [warpIntensity, setWarpIntensity] = useState(initialConfig?.density ?? WORDART_PRESETS[0].warpIntensity);
  const [color, setColor] = useState(initialConfig?.paletteId || WORDART_PRESETS[0].color);
  const [strokeColor, setStrokeColor] = useState(WORDART_PRESETS[0].strokeColor);
  const [strokeWidth, setStrokeWidth] = useState(WORDART_PRESETS[0].strokeWidth);
  const [shadowColor, setShadowColor] = useState(WORDART_PRESETS[0].shadowColor);
  const [shadowBlur, setShadowBlur] = useState(WORDART_PRESETS[0].shadowBlur);
  const [activeCategory, setActiveCategory] = useState<'all' | 'retro' | 'curved' | '3d' | 'cloud' | 'badge'>('all');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (initialConfig) {
      if (initialConfig.words && initialConfig.words.length > 0) {
        setContent(initialConfig.words[0].text);
        if (initialConfig.words.length > 1) {
          setSubwords(initialConfig.words.slice(1).map((w) => w.text).join(', '));
        } else {
          setSubwords('');
        }
      }
      if (initialConfig.font) setFontFamily(initialConfig.font);
      if (initialConfig.shape) setWarpStyle(initialConfig.shape as TextWarpStyle);
      if (initialConfig.density !== undefined) setWarpIntensity(initialConfig.density);
      if (initialConfig.paletteId) setColor(initialConfig.paletteId);
    }
  }, [isOpen, initialConfig]);

  useEffect(() => {
    if (!isOpen) return;
    renderWordArtPreview();
  }, [isOpen, content, subwords, fontFamily, warpStyle, warpIntensity, color, strokeColor, strokeWidth, shadowColor, shadowBlur]);

  const selectPreset = (preset: WordArtPreset) => {
    setActivePreset(preset);
    setContent(preset.content);
    setSubwords(preset.subwords || '');
    setFontFamily(preset.fontFamily);
    setWarpStyle(preset.warpStyle);
    setWarpIntensity(preset.warpIntensity);
    setColor(preset.color);
    setStrokeColor(preset.strokeColor);
    setStrokeWidth(preset.strokeWidth);
    setShadowColor(preset.shadowColor);
    setShadowBlur(preset.shadowBlur);
  };

    // draw only the content (no background / grid). Accepts any 2D context.
  // draw only the content (no background / grid). Accepts a 2D context and explicit render dimensions
  const drawWordArtContent = (ctx: CanvasRenderingContext2D, renderW: number, renderH: number) => {
    const centerX = renderW / 2;
    const centerY = renderH / 2;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // scale factor relative to the modal preview base (480x320)
    const baseH = 320;
    const scaleFactor = renderH / baseH;

    // Apply shadow scaled
    if (shadowBlur > 0) {
      ctx.shadowColor = shadowColor as string;
      ctx.shadowBlur = shadowBlur * scaleFactor;
      ctx.shadowOffsetX = 3 * scaleFactor;
      ctx.shadowOffsetY = 4 * scaleFactor;
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    const fontSize = Math.max(10, Math.round(48 * scaleFactor));
    ctx.font = `bold ${fontSize}px ${fontFamily}, sans-serif`;

    if (warpStyle === 'arc_upper' || warpStyle === 'arc_lower' || warpStyle === 'smile' || warpStyle === 'frown') {
      const radius = Math.max(80 * scaleFactor, (250 * scaleFactor) - Math.abs(warpIntensity) * 1.5 * scaleFactor);
      const isUpper = warpStyle === 'arc_upper' || warpStyle === 'frown';
      const factor = isUpper ? -1 : 1;
      const angleStep = 0.08 * (warpIntensity / 50);

      const chars = content.split('');
      const totalAngle = chars.length * angleStep;
      let startAngle = -totalAngle / 2;

      chars.forEach((char, i) => {
        const charAngle = startAngle + i * angleStep;
        ctx.save();
        ctx.translate(
          centerX + Math.sin(charAngle) * radius,
          centerY + factor * Math.cos(charAngle) * radius - factor * radius
        );
        ctx.rotate(factor * charAngle);

        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor as string;
          ctx.lineWidth = strokeWidth * 1.5 * scaleFactor;
          ctx.strokeText(char, 0, 0);
        }
        ctx.fillStyle = color;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    } else if (warpStyle === 'circle' || warpStyle === 'stamp_style') {
      const radius = 100 * scaleFactor;
      const chars = (content + ' ').split('');
      const angleStep = (2 * Math.PI) / chars.length;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 25 * scaleFactor, 0, Math.PI * 2);
      ctx.strokeStyle = (strokeColor as string) || color;
      ctx.lineWidth = 2 * scaleFactor;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 20 * scaleFactor, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1 * scaleFactor;
      ctx.stroke();

      chars.forEach((char, i) => {
        const charAngle = i * angleStep - Math.PI / 2;
        ctx.save();
        ctx.translate(
          centerX + Math.cos(charAngle) * radius,
          centerY + Math.sin(charAngle) * radius
        );
        ctx.rotate(charAngle + Math.PI / 2);

        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor as string;
          ctx.lineWidth = strokeWidth * scaleFactor;
          ctx.strokeText(char, 0, 0);
        }
        ctx.fillStyle = color;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    } else if (warpStyle === 'wave') {
      const chars = content.split('');
      const stepX = Math.min(30 * scaleFactor, (renderW - 100 * scaleFactor) / chars.length);
      const startX = centerX - (chars.length * stepX) / 2;

      chars.forEach((char, i) => {
        const x = startX + i * stepX;
        const offsetY = Math.sin((i / chars.length) * Math.PI * 2) * (warpIntensity * 0.5 * scaleFactor);
        ctx.save();
        ctx.translate(x, centerY + offsetY);

        if (strokeWidth > 0) {
          ctx.strokeStyle = strokeColor as string;
          ctx.lineWidth = strokeWidth * scaleFactor;
          ctx.strokeText(char, 0, 0);
        }
        ctx.fillStyle = color;
        ctx.fillText(char, 0, 0);
        ctx.restore();
      });
    } else if (warpStyle === 'heart' || warpStyle === 'star') {
      ctx.save();
      ctx.translate(centerX, centerY);

      ctx.beginPath();
      ctx.fillStyle = color + '22';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * scaleFactor;
      ctx.scale(1.2 * scaleFactor, 1.2 * scaleFactor);
      ctx.moveTo(0, -20 * scaleFactor);
      ctx.bezierCurveTo(-40 * scaleFactor, -60 * scaleFactor, -80 * scaleFactor, 0, 0, 60 * scaleFactor);
      ctx.bezierCurveTo(80 * scaleFactor, 0, 40 * scaleFactor, -60 * scaleFactor, 0, -20 * scaleFactor);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.font = `bold ${fontSize + Math.round(8 * scaleFactor)}px ${fontFamily}, sans-serif`;
      if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor as string;
        ctx.lineWidth = strokeWidth * scaleFactor;
        ctx.strokeText(content, centerX, centerY - 10 * scaleFactor);
      }
      ctx.fillStyle = color;
      ctx.fillText(content, centerX, centerY - 10 * scaleFactor);

      if (subwords) {
        ctx.font = `bold ${Math.round(14 * scaleFactor)}px ${fontFamily}, sans-serif`;
        ctx.fillStyle = (strokeColor as string) || '#ffffff';
        const words = subwords.split(',').map((w) => w.trim());
        words.forEach((w, idx) => {
          const angle = (idx / words.length) * Math.PI * 2;
          const rx = Math.cos(angle) * 75 * scaleFactor;
          const ry = Math.sin(angle) * 45 * scaleFactor;
          ctx.fillText(w, centerX + rx, centerY + ry + 15 * scaleFactor);
        });
      }
    } else {
      if (strokeWidth > 0) {
        ctx.strokeStyle = strokeColor as string;
        ctx.lineWidth = strokeWidth * 2 * scaleFactor;
        ctx.strokeText(content, centerX, centerY);
      }
      ctx.fillStyle = color;
      ctx.fillText(content, centerX, centerY);
    }

    ctx.restore();
  };

  const renderWordArtPreview = (opts?: { withBackground?: boolean }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isLight = theme === 'light';
    if (opts?.withBackground !== false) {
      // Draw background grid pattern for preview only
      ctx.fillStyle = isLight ? '#f8fafc' : '#121318';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid lines
      ctx.strokeStyle = isLight ? '#e2e8f0' : '#22242e';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // draw the actual wordart content on top (content may include translucent fills)
    drawWordArtContent(ctx, canvas.width, canvas.height);
  };

  const handleApplyToCanvas = () => {
    const srcCanvas = canvasRef.current;
    if (!srcCanvas) {
      if (onAddWordArt) {
        onAddWordArt({
          title: content,
          content,
          fontFamily,
          warpStyle,
          warpIntensity,
          color,
          strokeColor: strokeWidth > 0 ? strokeColor : undefined,
          strokeWidth,
          shadowColor: shadowBlur > 0 ? shadowColor : undefined,
          shadowBlur,
          fontSize: 42,
          width: 420,
          height: 240
        });
      }
      onClose();
      return;
    }

    // Export transparent PNG by drawing only content onto an offscreen canvas (no background/grid)
    // Determine thumbnail max dim dynamically based on device characteristics
    const getThumbnailMaxDim = () => {
      try {
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
        const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
        const hasTouch = typeof navigator !== 'undefined' && (navigator as any).maxTouchPoints && (navigator as any).maxTouchPoints > 0;
        const deviceMemory = typeof navigator !== 'undefined' ? (navigator as any).deviceMemory : undefined;

        const isMobile = isMobileUA || (hasTouch && !/Windows/i.test(ua));

        if (typeof deviceMemory === 'number') {
          if (deviceMemory <= 1) return 256;
          if (deviceMemory <= 2) return isMobile ? 256 : 384;
          if (deviceMemory <= 4) return isMobile ? 320 : 512;
          return isMobile ? 384 : 640;
        }

        return isMobile ? 256 : 512;
      } catch (e) {
        return 256;
      }
    };

    const targetMaxDim = getThumbnailMaxDim();
    const srcW = Math.max(1, srcCanvas.width);
    const srcH = Math.max(1, srcCanvas.height);
    const scaleForThumbnail = Math.min(1, targetMaxDim / Math.max(srcW, srcH));

    // Do not upscale by devicePixelRatio here — render full content to a temp canvas, crop tightly to the typography
    // and then scale the cropped region down to a small 1x thumbnail. This makes the inserted layer size match the
    // visual typography more closely and avoids large transparent margins.
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = srcW;
    tempCanvas.height = srcH;
    const tempCtx = tempCanvas.getContext('2d', { alpha: true });
    if (tempCtx) {
      tempCtx.clearRect(0, 0, srcW, srcH);
      // Render full-size content into temp canvas so we can compute a tight bounding box
      drawWordArtContent(tempCtx, srcW, srcH);

      // Compute opaque pixel bounding box (alpha > 0)
      let minX = srcW, minY = srcH, maxX = -1, maxY = -1;
      try {
        const imgData = tempCtx.getImageData(0, 0, srcW, srcH).data;
        for (let y = 0; y < srcH; y++) {
          for (let x = 0; x < srcW; x++) {
            const a = imgData[(y * srcW + x) * 4 + 3];
            if (a > 0) {
              if (x < minX) minX = x;
              if (y < minY) minY = y;
              if (x > maxX) maxX = x;
              if (y > maxY) maxY = y;
            }
          }
        }
      } catch (e) {
        // getImageData can throw if canvas is tainted; in that case, fallback to whole canvas
        minX = 0; minY = 0; maxX = srcW - 1; maxY = srcH - 1;
      }

      if (maxX < minX || maxY < minY) {
        // No opaque pixels found — fallback to full canvas
        minX = 0; minY = 0; maxX = srcW - 1; maxY = srcH - 1;
      }

      // Add small padding so shadows/antialiasing are not clipped
      const padding = Math.ceil(Math.max(1, Math.min(16, Math.max(maxX - minX, maxY - minY) * 0.02)));
      const cropX = Math.max(0, minX - padding);
      const cropY = Math.max(0, minY - padding);
      const cropW = Math.min(srcW - cropX, (maxX - minX) + 1 + padding * 2);
      const cropH = Math.min(srcH - cropY, (maxY - minY) + 1 + padding * 2);

      const exportW = Math.max(1, Math.round(cropW * scaleForThumbnail));
      const exportH = Math.max(1, Math.round(cropH * scaleForThumbnail));

      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = exportW;
      exportCanvas.height = exportH;
      const ectx = exportCanvas.getContext('2d', { alpha: true });
      if (ectx) {
        ectx.clearRect(0, 0, exportW, exportH);
        // Draw the cropped region from tempCanvas into exportCanvas scaled down
        ectx.drawImage(tempCanvas, cropX, cropY, cropW, cropH, 0, 0, exportW, exportH);

        const allWordItems: WordItem[] = [
          { id: '1', text: content, weight: 10 },
          ...(subwords ? subwords.split(',').map((w, idx) => ({ id: String(idx + 2), text: w.trim(), weight: 6 })) : []),
        ];
        const currentConfig: WordArtConfig = {
          words: allWordItems,
          shape: warpStyle,
          font: fontFamily,
          paletteId: color,
          layoutMode: 'mixed',
          density: warpIntensity,
          wordArtType: 'wordart2',
        };

        // Prefer toBlob -> FileReader for memory/performance and to avoid synchronous large base64 allocations
        if (exportCanvas.toBlob) {
          exportCanvas.toBlob((blob) => {
            if (blob) {
              // Prefer the Blob callback for efficient host-side handling
              if (typeof onAddWordArtBlob === 'function') {
                try {
                  onAddWordArtBlob(blob, content);
                } catch (err) {
                  // swallow host errors here to allow fallback path
                  console.warn('onAddWordArtBlob handler threw:', err);
                }
              }

              // Keep backward-compatible dataURL callback as well (async)
              const reader = new FileReader();
              reader.onloadend = () => {
                const dataUrl = reader.result as string;
                if (typeof onAddWordArtImage === 'function') {
                  onAddWordArtImage(dataUrl, content, currentConfig, 'wordart2');
                }
                if (typeof onAddWordArt === 'function') {
                  onAddWordArt({
                    title: content,
                    content,
                    fontFamily,
                    warpStyle,
                    warpIntensity,
                    color,
                    strokeColor: strokeWidth > 0 ? strokeColor : undefined,
                    strokeWidth,
                    shadowColor: shadowBlur > 0 ? shadowColor : undefined,
                    shadowBlur,
                    fontSize: 42,
                    width: exportCanvas.width,
                    height: exportCanvas.height
                  });
                }
                onClose();
              };
              reader.readAsDataURL(blob);
            } else {
              // fallback to synchronous dataURL if blob failed
              const dataUrl = exportCanvas.toDataURL('image/png');
              if (typeof onAddWordArtImage === 'function') onAddWordArtImage(dataUrl, content, currentConfig, 'wordart2');
              if (typeof onAddWordArt === 'function') onAddWordArt({
                title: content,
                content,
                fontFamily,
                warpStyle,
                warpIntensity,
                color,
                strokeColor: strokeWidth > 0 ? strokeColor : undefined,
                strokeWidth,
                shadowColor: shadowBlur > 0 ? shadowColor : undefined,
                shadowBlur,
                fontSize: 42,
                width: exportCanvas.width,
                height: exportCanvas.height
              });
              onClose();
            }
          }, 'image/png');
        } else {
          // older browsers fallback
          const dataUrl = exportCanvas.toDataURL('image/png');
          if (typeof onAddWordArtImage === 'function') onAddWordArtImage(dataUrl, content);
          if (typeof onAddWordArt === 'function') onAddWordArt({
            title: content,
            content,
            fontFamily,
            warpStyle,
            warpIntensity,
            color,
            strokeColor: strokeWidth > 0 ? strokeColor : undefined,
            strokeWidth,
            shadowColor: shadowBlur > 0 ? shadowColor : undefined,
            shadowBlur,
            fontSize: 42,
            width: exportCanvas.width,
            height: exportCanvas.height
          });
          onClose();
        }
      }
    } else {
      // no context, fallback
      if (typeof onAddWordArt === 'function') {
        onAddWordArt({
          title: content,
          content,
          fontFamily,
          warpStyle,
          warpIntensity,
          color,
          strokeColor: strokeWidth > 0 ? strokeColor : undefined,
          strokeWidth,
          shadowColor: shadowBlur > 0 ? shadowColor : undefined,
          shadowBlur,
          fontSize: 42,
          width: 420,
          height: 240
        });
      }
      onClose();
    }
  };

  const handleDownloadPNG = () => {
    const srcCanvas = canvasRef.current;
    if (!srcCanvas) return;

    const deviceScale = Math.max(1, Math.min(3, Math.round(window.devicePixelRatio || 2)));
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = Math.max(1, Math.round(srcCanvas.width * deviceScale));
    exportCanvas.height = Math.max(1, Math.round(srcCanvas.height * deviceScale));
    const ectx = exportCanvas.getContext('2d', { alpha: true });
    if (!ectx) return;
    ectx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
    drawWordArtContent(ectx, exportCanvas.width, exportCanvas.height);

    if (exportCanvas.toBlob) {
      exportCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `wordart-${content.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      }, 'image/png');
    } else {
      const link = document.createElement('a');
      link.download = `wordart-${content.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    }
  };

  if (!isOpen) return null;

  const filteredPresets =
    activeCategory === 'all'
      ? WORDART_PRESETS
      : WORDART_PRESETS.filter((p) => p.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-5xl h-[92vh] max-h-[850px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors ${
          theme === 'light'
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#121319] border-[#2d2f3a] text-gray-100'
        }`}
      >
        {/* Header Modal */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            theme === 'light'
              ? 'bg-slate-50 border-slate-200'
              : 'bg-[#181920] border-[#282933]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
              <Wand2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">WordArt Studio PRO</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Tipografia 3D & Nuvem
                </span>
              </div>
              <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                Crie títulos tridimensionais, arcos, logos circulares e silhuetas de palavras para sublimação em canecas, camisetas e almofadas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              theme === 'light'
                ? 'hover:bg-slate-200 text-slate-600'
                : 'hover:bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Left Column: Preset Gallery & Customizer (7 Cols) */}
          <div className="md:col-span-7 border-r border-[#282933] overflow-y-auto p-5 space-y-5 custom-scrollbar">
            {/* Presets Categories Filter */}
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
                1. Escolha um Estilo de WordArt Pronto
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
                {(
                  [
                    { id: 'all', label: 'Todos' },
                    { id: 'retro', label: 'Retro 3D' },
                    { id: 'curved', label: 'Arcos' },
                    { id: 'badge', label: 'Selo/Caneca' },
                    { id: 'cloud', label: 'Nuvem' },
                    { id: '3d', label: 'Efeitos 3D' }
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-purple-600 text-white shadow'
                        : theme === 'light'
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-[#1c1d26] text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-2 gap-2.5 mt-3">
                {filteredPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => selectPreset(preset)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer group relative overflow-hidden ${
                      activePreset.id === preset.id
                        ? 'border-purple-500 bg-purple-950/30 ring-2 ring-purple-500/40 shadow-lg'
                        : theme === 'light'
                        ? 'border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-50/50'
                        : 'border-[#262835] bg-[#181922] hover:border-purple-500/50 hover:bg-[#1e202e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold truncate text-purple-300">
                        {preset.name}
                      </span>
                      {activePreset.id === preset.id && (
                        <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 line-clamp-2 leading-tight">
                      {preset.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Customize Content & Styling */}
            <div className="space-y-4 pt-3 border-t border-[#282933]">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                2. Personalizar Texto e Curvatura
              </span>

              {/* Main Text Input */}
              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">
                  Texto Principal / Título da Estampa
                </label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Digite o texto aqui..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    theme === 'light'
                      ? 'bg-white border-slate-300 text-slate-800'
                      : 'bg-[#171822] border-[#2b2d3d] text-white'
                  }`}
                />
              </div>

              {/* Subwords Input (if Cloud or Badge) */}
              {(warpStyle === 'heart' || warpStyle === 'star' || warpStyle === 'circle') && (
                <div>
                  <label className="text-[11px] font-bold text-gray-300 block mb-1">
                    Palavras Secundárias (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={subwords}
                    onChange={(e) => setSubwords(e.target.value)}
                    placeholder="Amor, Carinho, Família, União, Paz..."
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'light'
                        ? 'bg-white border-slate-300 text-slate-800'
                        : 'bg-[#171822] border-[#2b2d3d] text-white'
                    }`}
                  />
                </div>
              )}

              {/* Font & Warp Selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-300 block mb-1">
                    Fonte Tipográfica
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'light'
                        ? 'bg-white border-slate-300 text-slate-800'
                        : 'bg-[#171822] border-[#2b2d3d] text-white'
                    }`}
                  >
                    {FONTS_LIST.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-300 block mb-1">
                    Efeito de Curvatura / Formato
                  </label>
                  <select
                    value={warpStyle}
                    onChange={(e) => setWarpStyle(e.target.value as TextWarpStyle)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      theme === 'light'
                        ? 'bg-white border-slate-300 text-slate-800'
                        : 'bg-[#171822] border-[#2b2d3d] text-white'
                    }`}
                  >
                    {WARP_STYLES.map((ws) => (
                      <option key={ws.id} value={ws.id}>
                        {ws.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Warp Intensity Slider */}
              {warpStyle !== 'straight' && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1 text-gray-300">
                    <span>Intensidade do Arco / Curva</span>
                    <span className="text-purple-400 font-mono">{warpIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={warpIntensity}
                    onChange={(e) => setWarpIntensity(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              )}

              {/* Colors: Text, Stroke, Shadow */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">
                    Cor Principal
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-[11px] font-mono text-gray-300">{color}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">
                    Contorno (Stroke)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(Number(e.target.value))}
                      className={`w-12 px-2 py-1 rounded-lg border text-xs text-center font-mono ${
                        theme === 'light'
                          ? 'bg-white border-slate-300 text-slate-800'
                          : 'bg-[#171822] border-[#2b2d3d] text-white'
                      }`}
                      placeholder="px"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">
                    Sombra / Extrusão 3D
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={shadowColor.startsWith('#') ? shadowColor : '#ff2a75'}
                      onChange={(e) => setShadowColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={shadowBlur}
                      onChange={(e) => setShadowBlur(Number(e.target.value))}
                      className={`w-12 px-2 py-1 rounded-lg border text-xs text-center font-mono ${
                        theme === 'light'
                          ? 'bg-white border-slate-300 text-slate-800'
                          : 'bg-[#171822] border-[#2b2d3d] text-white'
                      }`}
                      placeholder="blur"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Preview Canvas (5 Cols) */}
          <div className="md:col-span-5 bg-[#0e0f14] p-5 flex flex-col justify-between items-center relative min-h-0">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-gray-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Visualização em Tempo Real (300 DPI)
              </span>
              <button
                onClick={renderWordArtPreview}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white cursor-pointer transition-all"
                title="Atualizar renderização"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Canvas Preview Container */}
            <div className="w-full flex-1 flex items-center justify-center relative my-2 overflow-hidden rounded-2xl border border-[#2b2d3a] shadow-inner bg-[#15161e]">
              <canvas
                ref={canvasRef}
                width={480}
                height={320}
                className="w-full h-auto max-h-[300px] object-contain rounded-xl"
              />
            </div>

            {/* Footer Action Buttons */}
            <div className="w-full space-y-2.5 pt-3 border-t border-[#232532]">
              <button
                onClick={handleApplyToCanvas}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:brightness-110 text-white rounded-2xl font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.01]"
              >
                <Plus className="w-5 h-5" />
                Adicionar WordArt à Estampa
              </button>

              <button
                onClick={handleDownloadPNG}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white rounded-xl font-semibold text-xs border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                Baixar PNG Transparente HD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Backwards compat: expose legacy name as alias
export const WordArtModal = WordArtModal2;
