import React, { useRef, useEffect } from 'react';
import { drawVectorShape } from '../utils/shapeDrawer';

interface ShapePreviewCanvasProps {
  shapeId: string;
  size?: number;
  color?: string;
}

export const ShapePreviewCanvas: React.FC<ShapePreviewCanvasProps> = ({
  shapeId,
  size = 32,
  color = '#c084fc',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    const pad = 3;
    const drawW = size - pad * 2;
    const drawH = size - pad * 2;

    ctx.save();
    ctx.translate(pad, pad);
    drawVectorShape(ctx, shapeId, drawW, drawH, color, '#e9d5ff', 1);
    ctx.restore();
  }, [shapeId, size, color]);

  return <canvas ref={canvasRef} width={size} height={size} className="pointer-events-none" />;
};
