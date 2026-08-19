import { Layer, TextWarpStyle, TextWarpCategory } from '../types';

export interface TextWarpConfig {
  id: TextWarpStyle;
  name: string;
  category: TextWarpCategory;
  categoryName: string;
  description: string;
  defaultIntensity: number;
}

export const TEXT_WARP_CATEGORIES: { id: TextWarpCategory; name: string }[] = [
  { id: 'basics', name: 'Básicos' },
  { id: 'curves', name: 'Curvas' },
  { id: 'shapes', name: 'Formas' },
  { id: 'perspective', name: 'Perspectiva' },
  { id: 'effects', name: 'Efeitos' },
  { id: 'decorative', name: 'Texto Decorativo' },
];

export const TEXT_WARP_STYLES: TextWarpConfig[] = [
  // 1. BÁSICOS
  {
    id: 'straight',
    name: 'Reto (Normal)',
    category: 'basics',
    categoryName: 'Básicos',
    description: 'Texto horizontal padrão sem distorções',
    defaultIntensity: 0,
  },
  {
    id: 'arc_upper',
    name: 'Arco Superior',
    category: 'basics',
    categoryName: 'Básicos',
    description: 'Curvado para cima, ideal para topo de canecas',
    defaultIntensity: 50,
  },
  {
    id: 'arc_lower',
    name: 'Arco Inferior',
    category: 'basics',
    categoryName: 'Básicos',
    description: 'Curvado para baixo, ideal para base de estampas',
    defaultIntensity: 50,
  },
  {
    id: 'circle',
    name: 'Círculo Completo',
    category: 'basics',
    categoryName: 'Básicos',
    description: 'Texto distribuído em 360° em volta do centro',
    defaultIntensity: 60,
  },
  {
    id: 'semi_circle',
    name: 'Semicírculo',
    category: 'basics',
    categoryName: 'Básicos',
    description: 'Arco amplo de 180° para logos e badges',
    defaultIntensity: 50,
  },

  // 2. CURVAS
  {
    id: 'wave',
    name: 'Onda Senoidal',
    category: 'curves',
    categoryName: 'Curvas',
    description: 'Curva fluida estilo onda do mar',
    defaultIntensity: 50,
  },
  {
    id: 'smile',
    name: 'Sorriso',
    category: 'curves',
    categoryName: 'Curvas',
    description: 'Curva suave parabólica em U',
    defaultIntensity: 50,
  },
  {
    id: 'frown',
    name: 'Triste (U Invertido)',
    category: 'curves',
    categoryName: 'Curvas',
    description: 'Curva suave parabólica em U invertido',
    defaultIntensity: 50,
  },
  {
    id: 's_curve',
    name: 'S (Curva Dupla)',
    category: 'curves',
    categoryName: 'Curvas',
    description: 'Onda dupla graciosa em formato de S',
    defaultIntensity: 50,
  },
  {
    id: 'spiral',
    name: 'Espiral',
    category: 'curves',
    categoryName: 'Curvas',
    description: 'Texto girando para o centro em espiral',
    defaultIntensity: 60,
  },

  // 3. FORMAS
  {
    id: 'heart',
    name: 'Coração',
    category: 'shapes',
    categoryName: 'Formas',
    description: 'Texto acompanhando o contorno de coração',
    defaultIntensity: 60,
  },
  {
    id: 'star',
    name: 'Estrela',
    category: 'shapes',
    categoryName: 'Formas',
    description: 'Acompanha os vértices de uma estrela',
    defaultIntensity: 50,
  },
  {
    id: 'oval',
    name: 'Oval Horizontal',
    category: 'shapes',
    categoryName: 'Formas',
    description: 'Curva elíptica para camisetas e almofadas',
    defaultIntensity: 50,
  },
  {
    id: 'vertical_ellipse',
    name: 'Elipse Vertical',
    category: 'shapes',
    categoryName: 'Formas',
    description: 'Contorno oval vertical para garrafas',
    defaultIntensity: 50,
  },
  {
    id: 'diamond',
    name: 'Diamante',
    category: 'shapes',
    categoryName: 'Formas',
    description: 'Formato geométrico em losango',
    defaultIntensity: 50,
  },

  // 4. PERSPECTIVA
  {
    id: 'trapezoid',
    name: 'Trapézio',
    category: 'perspective',
    categoryName: 'Perspectiva',
    description: 'Afunilamento em perspectiva 3D',
    defaultIntensity: 50,
  },
  {
    id: 'perspective_left',
    name: 'Perspectiva Esquerda',
    category: 'perspective',
    categoryName: 'Perspectiva',
    description: 'Grande na esquerda e afunilado à direita',
    defaultIntensity: 50,
  },
  {
    id: 'perspective_right',
    name: 'Perspectiva Direita',
    category: 'perspective',
    categoryName: 'Perspectiva',
    description: 'Pequeno na esquerda e expansivo à direita',
    defaultIntensity: 50,
  },
  {
    id: 'perspective_center',
    name: 'Perspectiva Centro',
    category: 'perspective',
    categoryName: 'Perspectiva',
    description: 'Grande no centro e fino nas extremidades',
    defaultIntensity: 50,
  },
  {
    id: 'arc_3d',
    name: 'Arco 3D',
    category: 'perspective',
    categoryName: 'Perspectiva',
    description: 'Arco tridimensional inclinado com profundidade',
    defaultIntensity: 60,
  },

  // 5. EFEITOS
  {
    id: 'flag',
    name: 'Bandeira (Wave)',
    category: 'effects',
    categoryName: 'Efeitos',
    description: 'Efeito esvoaçante de bandeira',
    defaultIntensity: 50,
  },
  {
    id: 'bulge',
    name: 'Inflar (Bulge)',
    category: 'effects',
    categoryName: 'Efeitos',
    description: 'Inchaço volumétrico no centro do texto',
    defaultIntensity: 50,
  },
  {
    id: 'pinch',
    name: 'Afundar (Pinch)',
    category: 'effects',
    categoryName: 'Efeitos',
    description: 'Afunilamento sutil no centro do texto',
    defaultIntensity: 50,
  },
  {
    id: 'fish_eye',
    name: 'Peixe (Fish Eye)',
    category: 'effects',
    categoryName: 'Efeitos',
    description: 'Efeito esférico estilo olho de peixe',
    defaultIntensity: 60,
  },
  {
    id: 'flex_arc',
    name: 'Arco Flexível',
    category: 'effects',
    categoryName: 'Efeitos',
    description: 'Arco dinâmico com controle total de intensidade',
    defaultIntensity: 50,
  },

  // 6. TEXTO DECORATIVO
  {
    id: 'logo_circle',
    name: 'Circular para Logo',
    category: 'decorative',
    categoryName: 'Texto Decorativo',
    description: 'Texto circular com anel-guia e estrelas para logotipos',
    defaultIntensity: 50,
  },
  {
    id: 'seal',
    name: 'Selo de Garantia',
    category: 'decorative',
    categoryName: 'Texto Decorativo',
    description: 'Estilo selo recortado de qualidade sublimática',
    defaultIntensity: 50,
  },
  {
    id: 'stamp_style',
    name: 'Carimbo Vintage',
    category: 'decorative',
    categoryName: 'Texto Decorativo',
    description: 'Moldura de carimbo clássico com borda dupla',
    defaultIntensity: 50,
  },
  {
    id: 'emblem',
    name: 'Emblema / Escudo',
    category: 'decorative',
    categoryName: 'Texto Decorativo',
    description: 'Texto em formato de escudo para brasões',
    defaultIntensity: 50,
  },
  {
    id: 'ribbon',
    name: 'Faixa de Premiação',
    category: 'decorative',
    categoryName: 'Texto Decorativo',
    description: 'Texto sobre faixa decorativa com dobras',
    defaultIntensity: 50,
  },
];

/**
 * Main function to render warped text on a 2D Canvas context.
 */
export function drawWarpedText(
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  activeColor: string
) {
  const text = layer.content || 'SUBLIMAÇÃO';
  if (!text) return;

  const style: TextWarpStyle = layer.textWarpStyle || (layer.textCurved ? 'arc_upper' : 'straight');
  const rawIntensity = layer.warpIntensity !== undefined ? layer.warpIntensity : 50;
  const intensity = rawIntensity / 50; // 0..2 standard scaling

  const fontSize = layer.fontSize || 36;
  const fontFamily = layer.fontFamily || 'Arial';
  const fontWeight = layer.fontWeight || 'normal';
  const textColor = layer.color || activeColor;

  ctx.save();
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const centerX = layer.width / 2;
  const centerY = layer.height / 2;
  const len = text.length;

  if (style === 'straight') {
    ctx.textAlign = layer.textAlign || 'center';
    ctx.textBaseline = 'middle';
    let x = centerX;
    if (layer.textAlign === 'left') x = 10;
    if (layer.textAlign === 'right') x = layer.width - 10;
    ctx.fillText(text, x, centerY);
    ctx.restore();
    return;
  }

  // Helper for character-by-character transformation rendering
  const renderCharsOnPath = (
    getPathPoint: (t: number, i: number) => {
      x: number;
      y: number;
      rot?: number;
      scaleX?: number;
      scaleY?: number;
      shearY?: number;
    }
  ) => {
    for (let i = 0; i < len; i++) {
      const t = len === 1 ? 0.5 : i / (len - 1);
      const pt = getPathPoint(t, i);

      ctx.save();
      ctx.translate(pt.x, pt.y);

      if (pt.rot) {
        ctx.rotate(pt.rot);
      }

      if (pt.shearY) {
        ctx.transform(1, pt.shearY, 0, 1, 0, 0);
      }

      const sx = pt.scaleX !== undefined ? pt.scaleX : 1;
      const sy = pt.scaleY !== undefined ? pt.scaleY : 1;
      if (sx !== 1 || sy !== 1) {
        ctx.scale(sx, sy);
      }

      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  };

  switch (style) {
    case 'arc_upper': {
      const radius = (layer.curveRadius || 120) * (2.2 - intensity * 0.7);
      const span = Math.min(Math.PI * 1.3, (len * fontSize * 0.55) / radius);

      renderCharsOnPath((t) => {
        const angle = (t - 0.5) * span;
        return {
          x: centerX + radius * Math.sin(angle),
          y: centerY + radius * (1 - Math.cos(angle)) - radius * 0.3,
          rot: angle,
        };
      });
      break;
    }

    case 'arc_lower': {
      const radius = (layer.curveRadius || 120) * (2.2 - intensity * 0.7);
      const span = Math.min(Math.PI * 1.3, (len * fontSize * 0.55) / radius);

      renderCharsOnPath((t) => {
        const angle = (t - 0.5) * span;
        return {
          x: centerX + radius * Math.sin(angle),
          y: centerY - radius * (1 - Math.cos(angle)) + radius * 0.3,
          rot: -angle,
        };
      });
      break;
    }

    case 'circle': {
      const baseDim = Math.max(Math.min(layer.width, layer.height), Math.max(fontSize * 2.5, 180));
      const R = baseDim * 0.38 * (intensity > 0 ? intensity : 1);
      renderCharsOnPath((t) => {
        const angle = t * Math.PI * 2 - Math.PI / 2;
        return {
          x: centerX + R * Math.cos(angle),
          y: centerY + R * Math.sin(angle),
          rot: angle + Math.PI / 2,
        };
      });
      break;
    }

    case 'semi_circle': {
      const baseDim = Math.max(Math.min(layer.width, layer.height), Math.max(fontSize * 2.5, 180));
      const R = baseDim * 0.38 * intensity;
      renderCharsOnPath((t) => {
        const angle = Math.PI - t * Math.PI;
        return {
          x: centerX + R * Math.cos(angle),
          y: centerY - R * Math.sin(angle) + R * 0.4,
          rot: Math.PI / 2 - angle,
        };
      });
      break;
    }

    case 'wave': {
      const amp = 30 * intensity;
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const y = centerY + Math.sin(t * Math.PI * 2) * amp;
        const slope = Math.cos(t * Math.PI * 2) * amp * ((Math.PI * 2) / spanW);
        return {
          x,
          y,
          rot: Math.atan(slope),
        };
      });
      break;
    }

    case 'smile': {
      const amp = 40 * intensity;
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const normT = (t - 0.5) * 2;
        const x = (t - 0.5) * spanW + centerX;
        const y = centerY + normT * normT * amp - amp * 0.4;
        const rot = Math.atan2(2 * normT * amp, spanW);
        return { x, y, rot };
      });
      break;
    }

    case 'frown': {
      const amp = 40 * intensity;
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const normT = (t - 0.5) * 2;
        const x = (t - 0.5) * spanW + centerX;
        const y = centerY - normT * normT * amp + amp * 0.4;
        const rot = Math.atan2(-2 * normT * amp, spanW);
        return { x, y, rot };
      });
      break;
    }

    case 's_curve': {
      const amp = 32 * intensity;
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const y = centerY + Math.sin(t * Math.PI * 3) * amp;
        const slope = Math.cos(t * Math.PI * 3) * amp * ((Math.PI * 3) / spanW);
        return { x, y, rot: Math.atan(slope) };
      });
      break;
    }

    case 'spiral': {
      const baseDim = Math.max(Math.min(layer.width, layer.height), Math.max(fontSize * 2.5, 180));
      const maxR = baseDim * 0.45 * intensity;
      const turns = 1.6;
      renderCharsOnPath((t) => {
        const r = (0.2 + t * 0.8) * maxR;
        const angle = t * Math.PI * 2 * turns;
        return {
          x: centerX + r * Math.cos(angle),
          y: centerY + r * Math.sin(angle),
          rot: angle + Math.PI / 2,
        };
      });
      break;
    }

    case 'heart': {
      const baseDim = Math.max(Math.min(layer.width, layer.height), Math.max(fontSize * 2.5, 180));
      const scale = baseDim * 0.022 * intensity;
      renderCharsOnPath((t) => {
        const a = t * Math.PI * 2 - Math.PI / 2;
        const hx = 16 * Math.pow(Math.sin(a), 3);
        const hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));
        return {
          x: centerX + hx * scale,
          y: centerY + hy * scale,
          rot: a + Math.PI / 2,
        };
      });
      break;
    }

    case 'star': {
      const baseDim = Math.max(Math.min(layer.width, layer.height), Math.max(fontSize * 2.5, 180));
      const rOuter = baseDim * 0.4 * intensity;
      const rInner = rOuter * 0.5;
      renderCharsOnPath((t) => {
        const a = t * Math.PI * 2 - Math.PI / 2;
        const r = rInner + (rOuter - rInner) * (0.5 + 0.5 * Math.cos(a * 5));
        return {
          x: centerX + r * Math.cos(a),
          y: centerY + r * Math.sin(a),
          rot: a + Math.PI / 2,
        };
      });
      break;
    }

    case 'oval': {
      const rx = layer.width * 0.4 * intensity;
      const ry = layer.height * 0.25 * intensity;
      renderCharsOnPath((t) => {
        const a = (t - 0.5) * Math.PI * 1.3;
        return {
          x: centerX + rx * Math.sin(a),
          y: centerY + ry * (1 - Math.cos(a)) - ry * 0.4,
          rot: a,
        };
      });
      break;
    }

    case 'vertical_ellipse': {
      const rx = layer.width * 0.22 * intensity;
      const ry = layer.height * 0.4 * intensity;
      renderCharsOnPath((t) => {
        const a = (t - 0.5) * Math.PI * 1.3;
        return {
          x: centerX + rx * (1 - Math.cos(a)) - rx * 0.4,
          y: centerY + ry * Math.sin(a),
          rot: a,
        };
      });
      break;
    }

    case 'diamond': {
      const w = layer.width * 0.38 * intensity;
      const h = layer.height * 0.38 * intensity;
      renderCharsOnPath((t) => {
        const a = t * Math.PI * 2 - Math.PI / 2;
        const cosA = Math.cos(a);
        const sinA = Math.sin(a);
        const denom = Math.abs(cosA) / (w || 1) + Math.abs(sinA) / (h || 1);
        const r = 1 / (denom || 1);
        return {
          x: centerX + r * cosA,
          y: centerY + r * sinA,
          rot: a + Math.PI / 2,
        };
      });
      break;
    }

    case 'trapezoid': {
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const scaleY = 0.5 + t * 0.9 * intensity;
        return { x, y: centerY, scaleY };
      });
      break;
    }

    case 'perspective_left': {
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const scaleY = Math.max(0.2, 1.5 - t * 0.9 * intensity);
        return { x, y: centerY, scaleY };
      });
      break;
    }

    case 'perspective_right': {
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const scaleY = Math.max(0.2, 0.5 + t * 0.9 * intensity);
        return { x, y: centerY, scaleY };
      });
      break;
    }

    case 'perspective_center': {
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const normT = Math.abs(t - 0.5) * 2;
        const scaleY = Math.max(0.3, 1.4 - normT * 0.8 * intensity);
        return { x, y: centerY, scaleY };
      });
      break;
    }

    case 'arc_3d': {
      const spanW = layer.width * 0.8;
      const amp = 30 * intensity;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const normT = Math.abs(t - 0.5) * 2;
        const y = centerY - Math.sin(t * Math.PI) * amp;
        const scaleY = 1.3 - normT * 0.5 * intensity;
        return { x, y, scaleY };
      });
      break;
    }

    case 'flag': {
      const spanW = layer.width * 0.8;
      const amp = 28 * intensity;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const waveY = Math.sin(t * Math.PI * 2) * amp;
        const shearY = Math.cos(t * Math.PI * 2) * 0.25 * intensity;
        return {
          x,
          y: centerY + waveY,
          shearY,
        };
      });
      break;
    }

    case 'bulge': {
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const centerFactor = Math.sin(t * Math.PI);
        const scaleY = 1 + centerFactor * 0.9 * intensity;
        const scaleX = 1 + centerFactor * 0.2 * intensity;
        return { x, y: centerY, scaleX, scaleY };
      });
      break;
    }

    case 'pinch': {
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const centerFactor = Math.sin(t * Math.PI);
        const scaleY = Math.max(0.2, 1 - centerFactor * 0.65 * intensity);
        return { x, y: centerY, scaleY };
      });
      break;
    }

    case 'fish_eye': {
      const spanW = layer.width * 0.8;
      renderCharsOnPath((t) => {
        const normT = (t - 0.5) * 2;
        const fishT = Math.sign(normT) * Math.pow(Math.abs(normT), 0.7);
        const x = fishT * (spanW * 0.5) + centerX;
        const centerFactor = 1 - Math.abs(normT);
        const scaleY = 1 + centerFactor * 0.8 * intensity;
        const scaleX = 1 + centerFactor * 0.4 * intensity;
        return { x, y: centerY, scaleX, scaleY };
      });
      break;
    }

    case 'flex_arc': {
      const spanW = layer.width * 0.8;
      const amp = (layer.warpIntensity ?? 50) - 50; // allows negative / positive flex
      renderCharsOnPath((t) => {
        const normT = (t - 0.5) * 2;
        const x = (t - 0.5) * spanW + centerX;
        const y = centerY + normT * normT * amp;
        const rot = Math.atan2(2 * normT * amp, spanW);
        return { x, y, rot };
      });
      break;
    }

    // DECORATIVE STYLES
    case 'logo_circle': {
      const baseDim = Math.max(Math.min(layer.width, layer.height), Math.max(fontSize * 2.5, 180));
      const R = baseDim * 0.36 * intensity;

      // Draw guide rings for logo
      ctx.save();
      ctx.strokeStyle = textColor;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.max(10, R + fontSize * 0.8), 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.max(5, R - fontSize * 0.6), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw text around top arc
      renderCharsOnPath((t) => {
        const angle = (t - 0.5) * Math.PI * 1.2 - Math.PI / 2;
        return {
          x: centerX + R * Math.cos(angle),
          y: centerY + R * Math.sin(angle),
          rot: angle + Math.PI / 2,
        };
      });
      break;
    }

    case 'seal': {
      const baseDim = Math.max(Math.min(layer.width, layer.height), Math.max(fontSize * 2.5, 180));
      const R = baseDim * 0.38 * intensity;

      // Draw serrated seal border
      ctx.save();
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const points = 24;
      for (let p = 0; p < points; p++) {
        const a = (p / points) * Math.PI * 2;
        const rCurr = p % 2 === 0 ? R + 8 : R - 2;
        const px = centerX + rCurr * Math.cos(a);
        const py = centerY + rCurr * Math.sin(a);
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      renderCharsOnPath((t) => {
        const angle = t * Math.PI * 2 - Math.PI / 2;
        return {
          x: centerX + R * Math.cos(angle),
          y: centerY + R * Math.sin(angle),
          rot: angle + Math.PI / 2,
        };
      });
      break;
    }

    case 'stamp_style': {
      // Draw rectangular double stamp box
      ctx.save();
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(centerX - layer.width * 0.42, centerY - layer.height * 0.35, layer.width * 0.84, layer.height * 0.7);
      ctx.lineWidth = 1;
      ctx.strokeRect(centerX - layer.width * 0.39, centerY - layer.height * 0.32, layer.width * 0.78, layer.height * 0.64);
      ctx.restore();

      ctx.fillText(text.toUpperCase(), centerX, centerY);
      break;
    }

    case 'emblem': {
      // Draw shield header arc text + subtle shield outline
      const baseDim = Math.max(Math.min(layer.width, layer.height), Math.max(fontSize * 2.5, 180));
      const R = baseDim * 0.4 * intensity;

      ctx.save();
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.moveTo(centerX - layer.width * 0.4, centerY - layer.height * 0.3);
      ctx.lineTo(centerX + layer.width * 0.4, centerY - layer.height * 0.3);
      ctx.lineTo(centerX + layer.width * 0.4, centerY);
      ctx.quadraticCurveTo(centerX + layer.width * 0.4, centerY + layer.height * 0.4, centerX, centerY + layer.height * 0.45);
      ctx.quadraticCurveTo(centerX - layer.width * 0.4, centerY + layer.height * 0.4, centerX - layer.width * 0.4, centerY);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      renderCharsOnPath((t) => {
        const angle = (t - 0.5) * Math.PI * 0.9;
        return {
          x: centerX + R * Math.sin(angle),
          y: centerY + R * (1 - Math.cos(angle)) - R * 0.2,
          rot: angle,
        };
      });
      break;
    }

    case 'ribbon': {
      // Draw ribbon banner background
      ctx.save();
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 2;

      ctx.beginPath();
      const rw = layer.width * 0.85;
      const rh = fontSize * 1.8;
      const rx = centerX - rw / 2;
      const ry = centerY - rh / 2;
      ctx.rect(rx, ry, rw, rh);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      const amp = 15 * intensity;
      const spanW = layer.width * 0.78;
      renderCharsOnPath((t) => {
        const x = (t - 0.5) * spanW + centerX;
        const y = centerY + Math.sin(t * Math.PI * 2) * amp;
        const slope = Math.cos(t * Math.PI * 2) * amp * ((Math.PI * 2) / spanW);
        return { x, y, rot: Math.atan(slope) };
      });
      break;
    }

    default: {
      ctx.fillText(text, centerX, centerY);
      break;
    }
  }

  ctx.restore();
}
