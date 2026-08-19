import { WordArtConfig, WordItem } from '../types';

export function renderWordArt1Canvas(config: WordArtConfig, width = 800, height = 800): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const W = width;
  const H = height;
  ctx.clearRect(0, 0, W, H);

  // Mask
  const maskCanvas = document.createElement('canvas');
  maskCanvas.width = W;
  maskCanvas.height = H;
  const mCtx = maskCanvas.getContext('2d');
  if (!mCtx) return '';

  mCtx.fillStyle = '#000000';
  const shape = config.shape || 'caneca';

  if (shape === 'caneca') {
    mCtx.beginPath();
    if ('roundRect' in mCtx && typeof mCtx.roundRect === 'function') {
      mCtx.roundRect(W * 0.22, H * 0.2, W * 0.52, H * 0.62, 30);
    } else {
      mCtx.rect(W * 0.22, H * 0.2, W * 0.52, H * 0.62);
    }
    mCtx.fill();
    mCtx.lineWidth = 45 * (W / 1080);
    mCtx.strokeStyle = '#000000';
    mCtx.beginPath();
    mCtx.arc(W * 0.74, H * 0.51, H * 0.18, -Math.PI / 2.2, Math.PI / 2.2);
    mCtx.stroke();
  } else if (shape === 'camiseta') {
    mCtx.beginPath();
    mCtx.moveTo(W * 0.35, H * 0.15);
    mCtx.quadraticCurveTo(W * 0.5, H * 0.25, W * 0.65, H * 0.15);
    mCtx.lineTo(W * 0.88, H * 0.3);
    mCtx.lineTo(W * 0.76, H * 0.44);
    mCtx.lineTo(W * 0.72, H * 0.38);
    mCtx.lineTo(W * 0.72, H * 0.88);
    mCtx.lineTo(W * 0.28, H * 0.88);
    mCtx.lineTo(W * 0.28, H * 0.38);
    mCtx.lineTo(W * 0.24, H * 0.44);
    mCtx.lineTo(W * 0.12, H * 0.3);
    mCtx.closePath();
    mCtx.fill();
  } else if (shape === 'coracao') {
    mCtx.beginPath();
    mCtx.moveTo(W * 0.5, H * 0.82);
    mCtx.bezierCurveTo(W * 0.15, H * 0.55, W * 0.1, H * 0.2, W * 0.32, H * 0.18);
    mCtx.bezierCurveTo(W * 0.44, H * 0.18, W * 0.5, H * 0.28, W * 0.5, H * 0.32);
    mCtx.bezierCurveTo(W * 0.5, H * 0.28, W * 0.56, H * 0.18, W * 0.68, H * 0.18);
    mCtx.bezierCurveTo(W * 0.9, H * 0.2, W * 0.85, H * 0.55, W * 0.5, H * 0.82);
    mCtx.closePath();
    mCtx.fill();
  } else if (shape === 'estrela') {
    mCtx.beginPath();
    const cx = W * 0.5;
    const cy = H * 0.5;
    const outerR = W * 0.42;
    const innerR = W * 0.18;
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      if (i === 0) mCtx.moveTo(x, y);
      else mCtx.lineTo(x, y);
    }
    mCtx.closePath();
    mCtx.fill();
  } else if (shape === 'coroa') {
    mCtx.beginPath();
    mCtx.moveTo(W * 0.18, H * 0.75);
    mCtx.lineTo(W * 0.12, H * 0.32);
    mCtx.lineTo(W * 0.32, H * 0.52);
    mCtx.lineTo(W * 0.5, H * 0.22);
    mCtx.lineTo(W * 0.68, H * 0.52);
    mCtx.lineTo(W * 0.88, H * 0.32);
    mCtx.lineTo(W * 0.82, H * 0.75);
    mCtx.closePath();
    mCtx.fill();
  } else if (shape === 'fogo') {
    mCtx.beginPath();
    mCtx.moveTo(W * 0.5, H * 0.12);
    mCtx.quadraticCurveTo(W * 0.8, H * 0.4, W * 0.8, H * 0.65);
    mCtx.arc(W * 0.5, H * 0.65, W * 0.3, 0, Math.PI);
    mCtx.quadraticCurveTo(W * 0.2, H * 0.4, W * 0.5, H * 0.12);
    mCtx.closePath();
    mCtx.fill();
  } else {
    mCtx.beginPath();
    mCtx.arc(W * 0.5, H * 0.5, W * 0.42, 0, Math.PI * 2);
    mCtx.fill();
  }

  const maskData = mCtx.getImageData(0, 0, W, H).data;
  const isInsideMask = (px: number, py: number) => {
    if (px < 0 || px >= W || py < 0 || py >= H) return false;
    const idx = (Math.floor(py) * W + Math.floor(px)) * 4;
    return maskData[idx + 3] > 100;
  };

  const processedWords = [...(config.words || [])]
    .filter((w) => w.text && w.text.trim().length > 0)
    .sort((a, b) => b.weight - a.weight);

  if (processedWords.length === 0) return canvas.toDataURL('image/png');

  const gridSize = 16;
  const occupied = new Set<string>();

  const checkCollision = (boxX: number, boxY: number, boxW: number, boxH: number) => {
    const minGX = Math.floor(boxX / gridSize);
    const maxGX = Math.floor((boxX + boxW) / gridSize);
    const minGY = Math.floor(boxY / gridSize);
    const maxGY = Math.floor((boxY + boxH) / gridSize);
    for (let gx = minGX; gx <= maxGX; gx++) {
      for (let gy = minGY; gy <= maxGY; gy++) {
        if (occupied.has(`${gx},${gy}`)) return true;
      }
    }
    return false;
  };

  const markOccupied = (boxX: number, boxY: number, boxW: number, boxH: number) => {
    const minGX = Math.floor(boxX / gridSize);
    const maxGX = Math.floor((boxX + boxW) / gridSize);
    const minGY = Math.floor(boxY / gridSize);
    const maxGY = Math.floor((boxY + boxH) / gridSize);
    for (let gx = minGX; gx <= maxGX; gx++) {
      for (let gy = minGY; gy <= maxGY; gy++) {
        occupied.add(`${gx},${gy}`);
      }
    }
  };

  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
  const totalItemsToPlace = Math.min(120, Math.floor(((config.density || 75) / 100) * 100));
  let paletteIdx = 0;

  for (let i = 0; i < totalItemsToPlace; i++) {
    const item = processedWords[i % processedWords.length];
    let wordText = item.text.trim().toUpperCase();

    const baseFontSize = (18 + item.weight * 7) * (W / 1080);
    ctx.font = `bold ${baseFontSize}px ${config.font || 'Impact'}`;

    const textMetrics = ctx.measureText(wordText);
    const textWidth = textMetrics.width;
    const textHeight = baseFontSize * 0.9;

    let angle = 0;
    if (config.layoutMode === 'mixed') {
      angle = (i % 3 === 0) ? -Math.PI / 2 : 0;
    } else if (config.layoutMode === 'angles') {
      const choices = [0, -Math.PI / 4, Math.PI / 4, -Math.PI / 2];
      angle = choices[i % choices.length];
    }

    const cx = W / 2;
    const cy = H / 2;
    let radius = 0;
    let spiralAngle = (i * 1.375) * Math.PI * 2;

    for (let attempt = 0; attempt < 300; attempt++) {
      radius += 4;
      spiralAngle += 0.3;
      const px = cx + radius * Math.cos(spiralAngle);
      const py = cy + radius * Math.sin(spiralAngle);

      if (px < 40 || px > W - 40 || py < 40 || py > H - 40) continue;
      if (!isInsideMask(px, py)) continue;

      const boundingW = Math.abs(textWidth * Math.cos(angle)) + Math.abs(textHeight * Math.sin(angle));
      const boundingH = Math.abs(textWidth * Math.sin(angle)) + Math.abs(textHeight * Math.cos(angle));

      const boxX = px - boundingW / 2;
      const boxY = py - boundingH / 2;

      if (checkCollision(boxX, boxY, boundingW, boundingH)) continue;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      ctx.fillStyle = colors[paletteIdx % colors.length];
      paletteIdx++;

      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 4;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(wordText, 0, 0);
      ctx.restore();

      markOccupied(boxX, boxY, boundingW, boundingH);
      break;
    }
  }

  return canvas.toDataURL('image/png');
}
