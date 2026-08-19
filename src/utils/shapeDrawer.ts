export interface VectorShapeDef {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  svgPath?: string;
}

export const SHAPE_CATEGORIES = [
  { id: 'lines', name: 'Linhas' },
  { id: 'rectangles', name: 'Retângulos' },
  { id: 'basics', name: 'Formas Básicas' },
  { id: 'numbers', name: 'Números 0-9' },
  { id: 'arrows', name: 'Setas Largas' },
  { id: 'equation', name: 'Formas de Equação' },
  { id: 'flowchart', name: 'Fluxograma' },
  { id: 'stars_banners', name: 'Estrelas e Faixas' },
  { id: 'callouts', name: 'Textos Explicativos' },
  { id: 'action_buttons', name: 'Botões de Ação' },
  { id: 'cut_lines', name: 'Linhas de Corte' },
];

export const ALL_VECTOR_SHAPES: VectorShapeDef[] = [
  // --- LINHAS DE CORTE & SANGRIA ---
  { id: 'cut_line_rect', name: 'Linha de Corte (Retângulo)', category: 'cut_lines', categoryName: 'Linhas de Corte' },
  { id: 'cut_line_circle', name: 'Linha de Corte (Círculo)', category: 'cut_lines', categoryName: 'Linhas de Corte' },
  { id: 'cut_line_h', name: 'Linha de Corte Horizontal', category: 'cut_lines', categoryName: 'Linhas de Corte' },
  { id: 'cut_line_v', name: 'Linha de Corte Vertical', category: 'cut_lines', categoryName: 'Linhas de Corte' },

  // --- LINHAS ---
  { id: 'line', name: 'Linha Simples', category: 'lines', categoryName: 'Linhas' },
  { id: 'line_arrow', name: 'Linha com Seta', category: 'lines', categoryName: 'Linhas' },
  { id: 'line_double_arrow', name: 'Linha Seta Dupla', category: 'lines', categoryName: 'Linhas' },
  { id: 'elbow_connector', name: 'Conector Angular', category: 'lines', categoryName: 'Linhas' },
  { id: 'elbow_arrow', name: 'Conector Angular com Seta', category: 'lines', categoryName: 'Linhas' },
  { id: 'curve', name: 'Curva Suave', category: 'lines', categoryName: 'Linhas' },
  { id: 'scribble', name: 'Riscado Livre', category: 'lines', categoryName: 'Linhas' },

  // --- RETÂNGULOS ---
  { id: 'rectangle', name: 'Retângulo', category: 'rectangles', categoryName: 'Retângulos' },
  { id: 'rounded_rectangle', name: 'Canto Arredondado', category: 'rectangles', categoryName: 'Retângulos' },
  { id: 'single_corner_cut', name: 'Canto Cortado (Único)', category: 'rectangles', categoryName: 'Retângulos' },
  { id: 'opposite_corners_cut', name: 'Cantos Cortados Opostos', category: 'rectangles', categoryName: 'Retângulos' },
  { id: 'snip_same_side', name: 'Cantos Cortados Mesmo Lado', category: 'rectangles', categoryName: 'Retângulos' },
  { id: 'snip_round_single', name: 'Canto Arredondado e Cortado', category: 'rectangles', categoryName: 'Retângulos' },
  { id: 'folded_corner', name: 'Canto Dobrado (Documento)', category: 'rectangles', categoryName: 'Retângulos' },
  { id: 'bevel', name: 'Canto Chanfrado (Bisotê)', category: 'rectangles', categoryName: 'Retângulos' },

  // --- FORMAS BÁSICAS ---
  { id: 'circle', name: 'Círculo / Elipse', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'triangle', name: 'Triângulo Isósceles', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'right_triangle', name: 'Triângulo Retângulo', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'parallelogram', name: 'Paralelogramo', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'trapezoid', name: 'Trapézio', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'diamond', name: 'Losango / Diamante', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'pentagon', name: 'Pentágono', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'hexagon', name: 'Hexágono', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'heptagon', name: 'Heptágono (7 Lados)', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'octagon', name: 'Octógono (8 Lados)', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'decagon', name: 'Decágono (10 Lados)', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'dodecagon', name: 'Dodecágono (12 Lados)', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'pie', name: 'Setor Circular (Fatia)', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'donut', name: 'Anel / Rosca', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'arch', name: 'Arco / Portal', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'cross', name: 'Cruz Geométrico', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'can_cylinder', name: 'Cilindro (Lata / Squeeze)', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'cube', name: 'Cubo 3D Wireframe', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'smiley', name: 'Rosto Sorriso', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'heart', name: 'Coração', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'lightning', name: 'Raio de Energia', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'sun', name: 'Sol com Rayos', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'moon', name: 'Lua Crescente', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'cloud', name: 'Nuvem', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'left_bracket', name: 'Chave / Parêntese Esquerdo', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'right_bracket', name: 'Chave / Parêntese Direito', category: 'basics', categoryName: 'Formas Básicas' },
  { id: 'frame', name: 'Moldura Vazada', category: 'basics', categoryName: 'Formas Básicas' },

  // --- NÚMEROS (0 a 9) ---
  { id: 'num_0', name: 'Número 0', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_1', name: 'Número 1', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_2', name: 'Número 2', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_3', name: 'Número 3', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_4', name: 'Número 4', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_5', name: 'Número 5', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_6', name: 'Número 6', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_7', name: 'Número 7', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_8', name: 'Número 8', category: 'numbers', categoryName: 'Números 0-9' },
  { id: 'num_9', name: 'Número 9', category: 'numbers', categoryName: 'Números 0-9' },

  // --- SETAS LARGAS ---
  { id: 'arrow_right', name: 'Seta Direita', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_left', name: 'Seta Esquerda', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_up', name: 'Seta Para Cima', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_down', name: 'Seta Para Baixo', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_left_right', name: 'Seta Dupla Horizontal', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_up_down', name: 'Seta Dupla Vertical', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_quad', name: 'Seta Quadrupla (4 Pontas)', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_curved', name: 'Seta Curva de Retorno', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_uturn', name: 'Seta Retorno U-Turn', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_chevron', name: 'Chevron V', category: 'arrows', categoryName: 'Setas Largas' },
  { id: 'arrow_pentagon', name: 'Seta Pentágono', category: 'arrows', categoryName: 'Setas Largas' },

  // --- FORMAS DE EQUAÇÃO ---
  { id: 'math_plus', name: 'Sinal de Mais (+)', category: 'equation', categoryName: 'Formas de Equação' },
  { id: 'math_minus', name: 'Sinal de Menos (-)', category: 'equation', categoryName: 'Formas de Equação' },
  { id: 'math_multiply', name: 'Multiplicação (X)', category: 'equation', categoryName: 'Formas de Equação' },
  { id: 'math_divide', name: 'Divisão (÷)', category: 'equation', categoryName: 'Formas de Equação' },
  { id: 'math_equal', name: 'Sinal de Igual (=)', category: 'equation', categoryName: 'Formas de Equação' },
  { id: 'math_not_equal', name: 'Diferente (≠)', category: 'equation', categoryName: 'Formas de Equação' },

  // --- FLUXOGRAMA ---
  { id: 'fc_process', name: 'Processo (Retângulo)', category: 'flowchart', categoryName: 'Fluxograma' },
  { id: 'fc_decision', name: 'Decisão (Losango)', category: 'flowchart', categoryName: 'Fluxograma' },
  { id: 'fc_document', name: 'Documento Ondulado', category: 'flowchart', categoryName: 'Fluxograma' },
  { id: 'fc_data', name: 'Dados (E/S)', category: 'flowchart', categoryName: 'Fluxograma' },
  { id: 'fc_terminator', name: 'Início / Término (Cápsula)', category: 'flowchart', categoryName: 'Fluxograma' },
  { id: 'fc_delay', name: 'Atraso / Delay', category: 'flowchart', categoryName: 'Fluxograma' },

  // --- ESTRELAS E FAIXAS ---
  { id: 'star_4', name: 'Estrela 4 Pontas', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'star_5', name: 'Estrela 5 Pontas', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'star_6', name: 'Estrela 6 Pontas (Davi)', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'star_8', name: 'Estrela 8 Pontas', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'star_12', name: 'Estrela 12 Pontas', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'star_16', name: 'Estrela 16 Pontas', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'star_24', name: 'Estrela 24 Pontas', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'star_32', name: 'Estrela 32 Pontas', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'star_explosion', name: 'Explosão / Burst Promocional', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'banner_arc', name: 'Faixa Curvada em Arco', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'banner_down', name: 'Faixa Dobrada Clássica', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'banner_wave', name: 'Faixa Ondulada', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'scroll', name: 'Pergaminho Antigo', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },
  { id: 'flag', name: 'Bandeira Ondulante', category: 'stars_banners', categoryName: 'Estrelas e Faixas' },

  // --- TEXTOS EXPLICATIVOS ---
  { id: 'callout_rect', name: 'Balão Retangular', category: 'callouts', categoryName: 'Textos Explicativos' },
  { id: 'callout_rounded', name: 'Balão Arredondado', category: 'callouts', categoryName: 'Textos Explicativos' },
  { id: 'callout_ellipse', name: 'Balão Oval / Elíptico', category: 'callouts', categoryName: 'Textos Explicativos' },
  { id: 'callout_cloud', name: 'Balão Nuvem (Pensamento)', category: 'callouts', categoryName: 'Textos Explicativos' },

  // --- BOTÕES DE AÇÃO ---
  { id: 'btn_back', name: 'Botão Voltar', category: 'action_buttons', categoryName: 'Botões de Ação' },
  { id: 'btn_next', name: 'Botão Avançar', category: 'action_buttons', categoryName: 'Botões de Ação' },
  { id: 'btn_home', name: 'Botão Início (Home)', category: 'action_buttons', categoryName: 'Botões de Ação' },
  { id: 'btn_info', name: 'Botão Informação', category: 'action_buttons', categoryName: 'Botões de Ação' },
  { id: 'btn_help', name: 'Botão Ajuda (?)', category: 'action_buttons', categoryName: 'Botões de Ação' },
  { id: 'btn_sound', name: 'Botão Áudio / Som', category: 'action_buttons', categoryName: 'Botões de Ação' },
];

/**
 * Main function to draw a vector shape on HTML5 Canvas
 */
export function drawVectorShape(
  ctx: CanvasRenderingContext2D,
  shapeType: string,
  width: number,
  height: number,
  fillColor: string,
  strokeColor?: string,
  strokeWidth?: number
) {
  const isLineType =
    shapeType === 'line' ||
    shapeType.includes('line_') ||
    shapeType.includes('curve') ||
    shapeType.includes('scribble') ||
    shapeType.includes('connector') ||
    shapeType.includes('elbow_');

  const actualStrokeWidth =
    strokeWidth !== undefined && strokeWidth !== null
      ? strokeWidth
      : isLineType
      ? 4
      : 0;

  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor || fillColor;
  ctx.lineWidth = actualStrokeWidth > 0 ? actualStrokeWidth : (isLineType ? 4 : 1);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const w = width;
  const h = height;

  ctx.beginPath();

  switch (shapeType) {
    // --- NÚMEROS (0 a 9) ---
    case 'num_0':
    case 'num_1':
    case 'num_2':
    case 'num_3':
    case 'num_4':
    case 'num_5':
    case 'num_6':
    case 'num_7':
    case 'num_8':
    case 'num_9': {
      const digit = shapeType.replace('num_', '');
      ctx.font = `bold ${Math.round(Math.min(w, h) * 0.9)}px "Impact", "Arial Black", "Trebuchet MS", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = fillColor;
      ctx.fillText(digit, w / 2, h / 2);
      if (strokeColor && strokeWidth && strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeText(digit, w / 2, h / 2);
      }
      ctx.restore();
      return;
    }

    // --- LINHAS ---
    case 'line':
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.restore();
      return;

    case 'line_arrow':
      drawArrowLine(ctx, 0, h / 2, w, h / 2, false, true);
      ctx.restore();
      return;

    case 'line_double_arrow':
      drawArrowLine(ctx, 0, h / 2, w, h / 2, true, true);
      ctx.restore();
      return;

    case 'elbow_connector':
    case 'elbow_arrow':
      ctx.moveTo(0, h * 0.2);
      ctx.lineTo(w * 0.5, h * 0.2);
      ctx.lineTo(w * 0.5, h * 0.8);
      ctx.lineTo(w, h * 0.8);
      ctx.stroke();
      if (shapeType === 'elbow_arrow') {
        drawArrowHead(ctx, w * 0.5, h * 0.8, w, h * 0.8);
      }
      ctx.restore();
      return;

    case 'curve':
      ctx.moveTo(0, h * 0.8);
      ctx.bezierCurveTo(w * 0.3, 0, w * 0.7, h, w, h * 0.2);
      ctx.stroke();
      ctx.restore();
      return;

    case 'scribble':
      ctx.moveTo(0, h * 0.5);
      ctx.quadraticCurveTo(w * 0.25, 0, w * 0.5, h * 0.5);
      ctx.quadraticCurveTo(w * 0.75, h, w, h * 0.5);
      ctx.stroke();
      ctx.restore();
      return;

    // --- RETÂNGULOS ---
    case 'rectangle':
      ctx.rect(0, 0, w, h);
      break;

    case 'rounded_rectangle': {
      const r = Math.min(w, h) * 0.18;
      drawRoundedRectPath(ctx, 0, 0, w, h, r);
      break;
    }

    case 'single_corner_cut': {
      const cut = Math.min(w, h) * 0.25;
      ctx.moveTo(0, 0);
      ctx.lineTo(w - cut, 0);
      ctx.lineTo(w, cut);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;
    }

    case 'opposite_corners_cut': {
      const cut = Math.min(w, h) * 0.25;
      ctx.moveTo(0, 0);
      ctx.lineTo(w - cut, 0);
      ctx.lineTo(w, cut);
      ctx.lineTo(w, h);
      ctx.lineTo(cut, h);
      ctx.lineTo(0, h - cut);
      ctx.closePath();
      break;
    }

    case 'snip_same_side': {
      const cut = Math.min(w, h) * 0.25;
      ctx.moveTo(0, 0);
      ctx.lineTo(w - cut, 0);
      ctx.lineTo(w, cut);
      ctx.lineTo(w - cut, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;
    }

    case 'snip_round_single': {
      const r = Math.min(w, h) * 0.25;
      ctx.moveTo(0, 0);
      ctx.lineTo(w - r, 0);
      ctx.arcTo(w, 0, w, r, r);
      ctx.lineTo(w, h);
      ctx.lineTo(r, h);
      ctx.lineTo(0, h - r);
      ctx.closePath();
      break;
    }

    case 'folded_corner': {
      const fold = Math.min(w, h) * 0.25;
      ctx.moveTo(0, 0);
      ctx.lineTo(w - fold, 0);
      ctx.lineTo(w, fold);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;
    }

    case 'bevel': {
      const c = Math.min(w, h) * 0.18;
      ctx.moveTo(c, 0);
      ctx.lineTo(w - c, 0);
      ctx.lineTo(w, c);
      ctx.lineTo(w, h - c);
      ctx.lineTo(w - c, h);
      ctx.lineTo(c, h);
      ctx.lineTo(0, h - c);
      ctx.lineTo(0, c);
      ctx.closePath();
      break;
    }

    // --- FORMAS BÁSICAS ---
    case 'circle':
    case 'ellipse':
      ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      break;

    case 'triangle':
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;

    case 'right_triangle':
      ctx.moveTo(0, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;

    case 'parallelogram': {
      const offset = w * 0.25;
      ctx.moveTo(offset, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w - offset, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;
    }

    case 'trapezoid': {
      const inset = w * 0.2;
      ctx.moveTo(inset, 0);
      ctx.lineTo(w - inset, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;
    }

    case 'diamond':
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(0, h / 2);
      ctx.closePath();
      break;

    case 'pentagon':
      drawPolygonPath(ctx, w / 2, h / 2, Math.min(w, h) / 2, 5, -Math.PI / 2);
      break;

    case 'hexagon':
    case 'polygon':
      drawPolygonPath(ctx, w / 2, h / 2, Math.min(w, h) / 2, 6, 0);
      break;

    case 'heptagon':
      drawPolygonPath(ctx, w / 2, h / 2, Math.min(w, h) / 2, 7, -Math.PI / 2);
      break;

    case 'octagon':
      drawPolygonPath(ctx, w / 2, h / 2, Math.min(w, h) / 2, 8, Math.PI / 8);
      break;

    case 'decagon':
      drawPolygonPath(ctx, w / 2, h / 2, Math.min(w, h) / 2, 10, 0);
      break;

    case 'dodecagon':
      drawPolygonPath(ctx, w / 2, h / 2, Math.min(w, h) / 2, 12, 0);
      break;

    case 'pie':
      ctx.moveTo(w / 2, h / 2);
      ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, -Math.PI * 0.8, Math.PI * 0.4);
      ctx.closePath();
      break;

    case 'donut': {
      const outerR = Math.min(w, h) / 2;
      const innerR = outerR * 0.5;
      ctx.arc(w / 2, h / 2, outerR, 0, Math.PI * 2, false);
      ctx.arc(w / 2, h / 2, innerR, 0, Math.PI * 2, true);
      break;
    }

    case 'arch':
      ctx.moveTo(0, h);
      ctx.lineTo(0, h * 0.4);
      ctx.arc(w / 2, h * 0.4, w / 2, Math.PI, 0, false);
      ctx.lineTo(w, h);
      ctx.closePath();
      break;

    case 'cross': {
      const t = Math.min(w, h) * 0.3;
      const x1 = (w - t) / 2;
      const x2 = (w + t) / 2;
      const y1 = (h - t) / 2;
      const y2 = (h + t) / 2;
      ctx.moveTo(x1, 0);
      ctx.lineTo(x2, 0);
      ctx.lineTo(x2, y1);
      ctx.lineTo(w, y1);
      ctx.lineTo(w, y2);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2, h);
      ctx.lineTo(x1, h);
      ctx.lineTo(x1, y2);
      ctx.lineTo(0, y2);
      ctx.lineTo(0, y1);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      break;
    }

    case 'can_cylinder': {
      const ry = h * 0.15;
      ctx.ellipse(w / 2, ry, w / 2, ry, 0, 0, Math.PI * 2);
      ctx.moveTo(0, ry);
      ctx.lineTo(0, h - ry);
      ctx.ellipse(w / 2, h - ry, w / 2, ry, 0, Math.PI, 0, true);
      ctx.lineTo(w, ry);
      break;
    }

    case 'cube': {
      const d = Math.min(w, h) * 0.25;
      // Front face
      ctx.rect(0, d, w - d, h - d);
      // Top face
      ctx.moveTo(0, d);
      ctx.lineTo(d, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w - d, d);
      // Side face
      ctx.moveTo(w - d, d);
      ctx.lineTo(w, 0);
      ctx.lineTo(w, h - d);
      ctx.lineTo(w - d, h);
      break;
    }

    case 'smiley': {
      // Circle
      ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      break;
    }

    case 'heart':
      drawHeartPath(ctx, 0, 0, w, h);
      break;

    case 'lightning': {
      ctx.moveTo(w * 0.55, 0);
      ctx.lineTo(w * 0.15, h * 0.55);
      ctx.lineTo(w * 0.5, h * 0.55);
      ctx.lineTo(w * 0.45, h);
      ctx.lineTo(w * 0.85, h * 0.45);
      ctx.lineTo(w * 0.5, h * 0.45);
      ctx.closePath();
      break;
    }

    case 'sun': {
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.28;
      ctx.ellipse(cx, cy, r, r, 0, 0, Math.PI * 2);
      break;
    }

    case 'moon': {
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) / 2;
      ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(cx + r * 0.4, cy, r * 0.8, Math.PI / 2, -Math.PI / 2, true);
      ctx.closePath();
      break;
    }

    case 'cloud':
      drawCloudPath(ctx, 0, 0, w, h);
      break;

    case 'left_bracket':
    case 'left_brace': {
      const t = w * 0.25;
      ctx.moveTo(w, 0);
      ctx.lineTo(t, 0);
      if (shapeType === 'left_brace') {
        ctx.lineTo(t, h * 0.45);
        ctx.lineTo(0, h * 0.5);
        ctx.lineTo(t, h * 0.55);
      }
      ctx.lineTo(t, h);
      ctx.lineTo(w, h);
      break;
    }

    case 'right_bracket':
    case 'right_brace': {
      const t = w * 0.75;
      ctx.moveTo(0, 0);
      ctx.lineTo(t, 0);
      if (shapeType === 'right_brace') {
        ctx.lineTo(t, h * 0.45);
        ctx.lineTo(w, h * 0.5);
        ctx.lineTo(t, h * 0.55);
      }
      ctx.lineTo(t, h);
      ctx.lineTo(0, h);
      break;
    }

    case 'frame': {
      const t = Math.min(w, h) * 0.18;
      ctx.rect(0, 0, w, h);
      ctx.rect(t, t, w - t * 2, h - t * 2);
      break;
    }

    // --- SETAS LARGAS ---
    case 'arrow_right': {
      const ah = h * 0.3;
      const aw = w * 0.4;
      ctx.moveTo(0, ah);
      ctx.lineTo(w - aw, ah);
      ctx.lineTo(w - aw, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w - aw, h);
      ctx.lineTo(w - aw, h - ah);
      ctx.lineTo(0, h - ah);
      ctx.closePath();
      break;
    }

    case 'arrow_left': {
      const ah = h * 0.3;
      const aw = w * 0.4;
      ctx.moveTo(w, ah);
      ctx.lineTo(aw, ah);
      ctx.lineTo(aw, 0);
      ctx.lineTo(0, h / 2);
      ctx.lineTo(aw, h);
      ctx.lineTo(aw, h - ah);
      ctx.lineTo(w, h - ah);
      ctx.closePath();
      break;
    }

    case 'arrow_up': {
      const aw = w * 0.3;
      const ah = h * 0.4;
      ctx.moveTo(aw, h);
      ctx.lineTo(aw, ah);
      ctx.lineTo(0, ah);
      ctx.lineTo(w / 2, 0);
      ctx.lineTo(w, ah);
      ctx.lineTo(w - aw, ah);
      ctx.lineTo(w - aw, h);
      ctx.closePath();
      break;
    }

    case 'arrow_down': {
      const aw = w * 0.3;
      const ah = h * 0.4;
      ctx.moveTo(aw, 0);
      ctx.lineTo(w - aw, 0);
      ctx.lineTo(w - aw, h - ah);
      ctx.lineTo(w, h - ah);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(0, h - ah);
      ctx.lineTo(aw, h - ah);
      ctx.closePath();
      break;
    }

    case 'arrow_left_right': {
      const ah = h * 0.3;
      const aw = w * 0.3;
      ctx.moveTo(aw, ah);
      ctx.lineTo(w - aw, ah);
      ctx.lineTo(w - aw, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w - aw, h);
      ctx.lineTo(w - aw, h - ah);
      ctx.lineTo(aw, h - ah);
      ctx.lineTo(aw, h);
      ctx.lineTo(0, h / 2);
      ctx.lineTo(aw, 0);
      ctx.closePath();
      break;
    }

    case 'arrow_up_down': {
      const aw = w * 0.3;
      const ah = h * 0.3;
      ctx.moveTo(aw, ah);
      ctx.lineTo(w / 2, 0);
      ctx.lineTo(w - aw, ah);
      ctx.lineTo(w - aw, h - ah);
      ctx.lineTo(w, h - ah);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(0, h - ah);
      ctx.lineTo(aw, h - ah);
      ctx.closePath();
      break;
    }

    case 'arrow_quad': {
      const c = Math.min(w, h) * 0.3;
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2 + c / 2, c);
      ctx.lineTo(w / 2 + c / 4, c);
      ctx.lineTo(w / 2 + c / 4, h / 2 - c / 4);
      ctx.lineTo(w - c, h / 2 - c / 4);
      ctx.lineTo(w - c, h / 2 - c / 2);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w - c, h / 2 + c / 2);
      ctx.lineTo(w - c, h / 2 + c / 4);
      ctx.lineTo(w / 2 + c / 4, h / 2 + c / 4);
      ctx.lineTo(w / 2 + c / 4, h - c);
      ctx.lineTo(w / 2 + c / 2, h - c);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(w / 2 - c / 2, h - c);
      ctx.lineTo(w / 2 - c / 4, h - c);
      ctx.lineTo(w / 2 - c / 4, h / 2 + c / 4);
      ctx.lineTo(c, h / 2 + c / 4);
      ctx.lineTo(c, h / 2 + c / 2);
      ctx.lineTo(0, h / 2);
      ctx.lineTo(c, h / 2 - c / 2);
      ctx.lineTo(c, h / 2 - c / 4);
      ctx.lineTo(w / 2 - c / 4, h / 2 - c / 4);
      ctx.lineTo(w / 2 - c / 4, c);
      ctx.lineTo(w / 2 - c / 2, c);
      ctx.closePath();
      break;
    }

    case 'arrow_curved': {
      ctx.moveTo(w * 0.2, h);
      ctx.arcTo(w * 0.2, h * 0.2, w, h * 0.2, w * 0.5);
      ctx.lineTo(w * 0.7, 0);
      ctx.lineTo(w, h * 0.3);
      ctx.lineTo(w * 0.7, h * 0.6);
      ctx.lineTo(w * 0.7, h * 0.4);
      break;
    }

    case 'arrow_uturn': {
      ctx.moveTo(w * 0.2, h);
      ctx.lineTo(w * 0.2, h * 0.4);
      ctx.arc(w * 0.5, h * 0.4, w * 0.3, Math.PI, 0, false);
      ctx.lineTo(w * 0.8, h * 0.7);
      ctx.lineTo(w, h * 0.7);
      ctx.lineTo(w * 0.8, h);
      ctx.lineTo(w * 0.6, h * 0.7);
      break;
    }

    case 'arrow_chevron': {
      const inset = w * 0.25;
      ctx.moveTo(0, 0);
      ctx.lineTo(w - inset, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w - inset, h);
      ctx.lineTo(0, h);
      ctx.lineTo(inset, h / 2);
      ctx.closePath();
      break;
    }

    case 'arrow_pentagon': {
      const point = w * 0.3;
      ctx.moveTo(0, 0);
      ctx.lineTo(w - point, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w - point, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;
    }

    // --- FORMAS DE EQUAÇÃO ---
    case 'math_plus': {
      const t = Math.min(w, h) * 0.3;
      ctx.rect((w - t) / 2, 0, t, h);
      ctx.rect(0, (h - t) / 2, w, t);
      break;
    }

    case 'math_minus': {
      const t = h * 0.25;
      ctx.rect(0, (h - t) / 2, w, t);
      break;
    }

    case 'math_multiply': {
      const t = Math.min(w, h) * 0.25;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(Math.PI / 4);
      ctx.rect(-t / 2, -h / 2, t, h);
      ctx.rect(-w / 2, -t / 2, w, t);
      ctx.restore();
      break;
    }

    case 'math_divide': {
      const r = Math.min(w, h) * 0.12;
      const t = h * 0.15;
      ctx.ellipse(w / 2, h * 0.2, r, r, 0, 0, Math.PI * 2);
      ctx.rect(0, (h - t) / 2, w, t);
      ctx.ellipse(w / 2, h * 0.8, r, r, 0, 0, Math.PI * 2);
      break;
    }

    case 'math_equal': {
      const t = h * 0.2;
      ctx.rect(0, h * 0.2, w, t);
      ctx.rect(0, h * 0.6, w, t);
      break;
    }

    case 'math_not_equal': {
      const t = h * 0.18;
      ctx.rect(0, h * 0.2, w, t);
      ctx.rect(0, h * 0.6, w, t);
      ctx.moveTo(w * 0.7, 0);
      ctx.lineTo(w * 0.3, h);
      break;
    }

    // --- FLUXOGRAMA ---
    case 'fc_process':
      ctx.rect(0, 0, w, h);
      break;

    case 'fc_decision':
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(0, h / 2);
      ctx.closePath();
      break;

    case 'fc_document': {
      ctx.moveTo(0, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w, h * 0.85);
      ctx.quadraticCurveTo(w * 0.75, h, w * 0.5, h * 0.85);
      ctx.quadraticCurveTo(w * 0.25, h * 0.7, 0, h * 0.85);
      ctx.closePath();
      break;
    }

    case 'fc_data': {
      const offset = w * 0.2;
      ctx.moveTo(offset, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w - offset, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;
    }

    case 'fc_terminator': {
      const r = h / 2;
      drawRoundedRectPath(ctx, 0, 0, w, h, r);
      break;
    }

    case 'fc_delay': {
      const r = h / 2;
      ctx.moveTo(0, 0);
      ctx.lineTo(w - r, 0);
      ctx.arc(w - r, h / 2, r, -Math.PI / 2, Math.PI / 2, false);
      ctx.lineTo(0, h);
      ctx.closePath();
      break;
    }

    // --- ESTRELAS E FAIXAS ---
    case 'star_4':
    case 'star':
      drawStarPath(ctx, w / 2, h / 2, 4, Math.min(w, h) / 2, Math.min(w, h) / 4);
      break;

    case 'star_5':
      drawStarPath(ctx, w / 2, h / 2, 5, Math.min(w, h) / 2, Math.min(w, h) / 4);
      break;

    case 'star_6':
      drawStarPath(ctx, w / 2, h / 2, 6, Math.min(w, h) / 2, Math.min(w, h) * 0.3);
      break;

    case 'star_8':
      drawStarPath(ctx, w / 2, h / 2, 8, Math.min(w, h) / 2, Math.min(w, h) * 0.32);
      break;

    case 'star_12':
      drawStarPath(ctx, w / 2, h / 2, 12, Math.min(w, h) / 2, Math.min(w, h) * 0.35);
      break;

    case 'star_16':
      drawStarPath(ctx, w / 2, h / 2, 16, Math.min(w, h) / 2, Math.min(w, h) * 0.38);
      break;

    case 'star_24':
      drawStarPath(ctx, w / 2, h / 2, 24, Math.min(w, h) / 2, Math.min(w, h) * 0.4);
      break;

    case 'star_32':
    case 'badge':
      drawStarPath(ctx, w / 2, h / 2, 32, Math.min(w, h) / 2, Math.min(w, h) * 0.42);
      break;

    case 'star_explosion': {
      const pts = 14;
      const cx = w / 2;
      const cy = h / 2;
      const rOuter = Math.min(w, h) / 2;
      for (let i = 0; i < pts * 2; i++) {
        const a = (i * Math.PI) / pts;
        const r = i % 2 === 0 ? rOuter : rOuter * (0.4 + (i % 3) * 0.15);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      break;
    }

    case 'banner_arc': {
      ctx.moveTo(0, h * 0.6);
      ctx.quadraticCurveTo(w * 0.5, 0, w, h * 0.6);
      ctx.lineTo(w, h);
      ctx.quadraticCurveTo(w * 0.5, h * 0.4, 0, h);
      ctx.closePath();
      break;
    }

    case 'banner_down': {
      const bh = h * 0.6;
      const fold = w * 0.15;
      // Main banner body
      ctx.moveTo(fold, 0);
      ctx.lineTo(w - fold, 0);
      ctx.lineTo(w - fold, bh);
      ctx.lineTo(fold, bh);
      ctx.closePath();
      // Ribbons left & right
      ctx.moveTo(fold, bh * 0.5);
      ctx.lineTo(0, bh * 0.3);
      ctx.lineTo(0, h);
      ctx.lineTo(fold, bh);
      ctx.moveTo(w - fold, bh * 0.5);
      ctx.lineTo(w, bh * 0.3);
      ctx.lineTo(w, h);
      ctx.lineTo(w - fold, bh);
      break;
    }

    case 'banner_wave': {
      ctx.moveTo(0, h * 0.3);
      ctx.bezierCurveTo(w * 0.3, 0, w * 0.7, h * 0.6, w, h * 0.3);
      ctx.lineTo(w, h * 0.7);
      ctx.bezierCurveTo(w * 0.7, h, w * 0.3, h * 0.4, 0, h * 0.7);
      ctx.closePath();
      break;
    }

    case 'scroll': {
      const r = h * 0.15;
      ctx.ellipse(r, r, r, r, 0, 0, Math.PI * 2);
      ctx.rect(r, 0, w - r * 2, h);
      ctx.ellipse(w - r, h - r, r, r, 0, 0, Math.PI * 2);
      break;
    }

    case 'flag': {
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(w * 0.5, h * 0.25, w, 0);
      ctx.lineTo(w, h * 0.75);
      ctx.quadraticCurveTo(w * 0.5, h, 0, h * 0.75);
      ctx.closePath();
      break;
    }

    // --- TEXTOS EXPLICATIVOS ---
    case 'callout_rect': {
      const tailW = w * 0.2;
      ctx.moveTo(0, 0);
      ctx.lineTo(w, 0);
      ctx.lineTo(w, h * 0.75);
      ctx.lineTo(w * 0.4 + tailW, h * 0.75);
      ctx.lineTo(w * 0.2, h);
      ctx.lineTo(w * 0.4, h * 0.75);
      ctx.lineTo(0, h * 0.75);
      ctx.closePath();
      break;
    }

    case 'callout_rounded': {
      const r = Math.min(w, h) * 0.15;
      const mainH = h * 0.75;
      drawRoundedRectPath(ctx, 0, 0, w, mainH, r);
      // Tail
      ctx.moveTo(w * 0.3, mainH);
      ctx.lineTo(w * 0.15, h);
      ctx.lineTo(w * 0.45, mainH);
      break;
    }

    case 'callout_ellipse': {
      const mainH = h * 0.75;
      ctx.ellipse(w / 2, mainH / 2, w / 2, mainH / 2, 0, 0, Math.PI * 2);
      // Tail
      ctx.moveTo(w * 0.3, mainH * 0.85);
      ctx.lineTo(w * 0.15, h);
      ctx.lineTo(w * 0.45, mainH * 0.85);
      break;
    }

    case 'callout_cloud': {
      const mainH = h * 0.75;
      drawCloudPath(ctx, 0, 0, w, mainH);
      // Thought circles
      ctx.ellipse(w * 0.3, h * 0.82, Math.min(w, h) * 0.06, Math.min(w, h) * 0.06, 0, 0, Math.PI * 2);
      ctx.ellipse(w * 0.2, h * 0.95, Math.min(w, h) * 0.03, Math.min(w, h) * 0.03, 0, 0, Math.PI * 2);
      break;
    }

    // --- BOTÕES DE AÇÃO ---
    case 'btn_back':
    case 'btn_next':
    case 'btn_home':
    case 'btn_info':
    case 'btn_help':
    case 'btn_sound': {
      const r = Math.min(w, h) * 0.15;
      drawRoundedRectPath(ctx, 0, 0, w, h, r);
      break;
    }

    // --- LINHAS DE CORTE & SANGRIA ---
    case 'cut_line_rect': {
      ctx.setLineDash([8, 4]);
      ctx.rect(0, 0, w, h);
      break;
    }
    case 'cut_line_circle': {
      ctx.setLineDash([8, 4]);
      ctx.ellipse(w / 2, h / 2, Math.abs(w / 2), Math.abs(h / 2), 0, 0, Math.PI * 2);
      break;
    }
    case 'cut_line_h': {
      ctx.setLineDash([8, 4]);
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      break;
    }
    case 'cut_line_v': {
      ctx.setLineDash([8, 4]);
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      break;
    }

    default:
      ctx.rect(0, 0, w, h);
      break;
  }

  ctx.fill();
  if (actualStrokeWidth > 0) {
    ctx.stroke();
  }

  // Draw extra detail features for action buttons & smiley
  if (shapeType === 'smiley') {
    ctx.fillStyle = strokeColor || '#000000';
    // Eyes
    ctx.beginPath();
    ctx.ellipse(w * 0.35, h * 0.38, w * 0.06, h * 0.08, 0, 0, Math.PI * 2);
    ctx.ellipse(w * 0.65, h * 0.38, w * 0.06, h * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    // Smile arc
    ctx.beginPath();
    ctx.strokeStyle = strokeColor || '#000000';
    ctx.lineWidth = Math.max(2, Math.min(w, h) * 0.05);
    ctx.arc(w / 2, h * 0.48, w * 0.28, Math.PI * 0.15, Math.PI * 0.85, false);
    ctx.stroke();
  } else if (shapeType.startsWith('btn_')) {
    ctx.fillStyle = strokeColor || '#ffffff';
    ctx.strokeStyle = strokeColor || '#ffffff';
    ctx.lineWidth = Math.max(2, Math.min(w, h) * 0.06);

    if (shapeType === 'btn_back') {
      ctx.beginPath();
      ctx.moveTo(w * 0.65, h * 0.25);
      ctx.lineTo(w * 0.35, h * 0.5);
      ctx.lineTo(w * 0.65, h * 0.75);
      ctx.stroke();
    } else if (shapeType === 'btn_next') {
      ctx.beginPath();
      ctx.moveTo(w * 0.35, h * 0.25);
      ctx.lineTo(w * 0.65, h * 0.5);
      ctx.lineTo(w * 0.35, h * 0.75);
      ctx.stroke();
    } else if (shapeType === 'btn_home') {
      ctx.beginPath();
      ctx.moveTo(w * 0.5, h * 0.25);
      ctx.lineTo(w * 0.25, h * 0.5);
      ctx.lineTo(w * 0.32, h * 0.5);
      ctx.lineTo(w * 0.32, h * 0.72);
      ctx.lineTo(w * 0.68, h * 0.72);
      ctx.lineTo(w * 0.68, h * 0.5);
      ctx.lineTo(w * 0.75, h * 0.5);
      ctx.closePath();
      ctx.fill();
    } else if (shapeType === 'btn_info') {
      ctx.font = `bold ${Math.round(h * 0.55)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('i', w / 2, h / 2);
    } else if (shapeType === 'btn_help') {
      ctx.font = `bold ${Math.round(h * 0.5)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', w / 2, h / 2);
    }
  }

  ctx.restore();
}

// Helper drawing routines
function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawPolygonPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotation: number
) {
  for (let i = 0; i < sides; i++) {
    const angle = rotation + (i * 2 * Math.PI) / sides;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawStarPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  points: number,
  outerR: number,
  innerR: number
) {
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawHeartPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const topY = y + h * 0.3;
  ctx.moveTo(x + w / 2, y + h);
  ctx.bezierCurveTo(x, y + h * 0.6, x, topY, x + w / 4, y);
  ctx.bezierCurveTo(x + w / 2, y, x + w / 2, topY, x + w / 2, topY);
  ctx.bezierCurveTo(x + w / 2, topY, x + w / 2, y, x + (3 * w) / 4, y);
  ctx.bezierCurveTo(x + w, topY, x + w, y + h * 0.6, x + w / 2, y + h);
  ctx.closePath();
}

function drawCloudPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.moveTo(x + w * 0.2, y + h * 0.7);
  ctx.bezierCurveTo(x, y + h * 0.7, x, y + h * 0.4, x + w * 0.2, y + h * 0.4);
  ctx.bezierCurveTo(x + w * 0.1, y + h * 0.1, x + w * 0.4, y, x + w * 0.5, y + h * 0.2);
  ctx.bezierCurveTo(x + w * 0.7, y, x + w * 0.9, y + h * 0.2, x + w * 0.8, y + h * 0.4);
  ctx.bezierCurveTo(x + w, y + h * 0.4, x + w, y + h * 0.7, x + w * 0.8, y + h * 0.7);
  ctx.bezierCurveTo(x + w * 0.8, y + h, x + w * 0.2, y + h, x + w * 0.2, y + h * 0.7);
  ctx.closePath();
}

function drawArrowLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  startArrow: boolean,
  endArrow: boolean
) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  if (endArrow) drawArrowHead(ctx, x1, y1, x2, y2);
  if (startArrow) drawArrowHead(ctx, x2, y2, x1, y1);
}

function drawArrowHead(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) {
  const headLen = 12;
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
