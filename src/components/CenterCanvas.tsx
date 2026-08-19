import React, { useRef, useState, useEffect } from 'react';
import { VectorElement, ToolType } from '../types';

interface CenterCanvasProps {
  elements: VectorElement[];
  setElements: React.Dispatch<React.SetStateAction<VectorElement[]>>;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  canvasWidth: number;
  canvasHeight: number;
  activeTool: ToolType;
  fillColor: string;
  strokeColor: string;
  onMouseMoveCoords?: (x: number, y: number) => void;
  zoomLevel?: number;
  showBleedAndSafeOverlay?: boolean;
  darkMode?: boolean;
}

export const CenterCanvas: React.FC<CenterCanvasProps> = ({
  elements,
  setElements,
  selectedIds,
  setSelectedIds,
  canvasWidth,
  canvasHeight,
  activeTool,
  fillColor,
  strokeColor,
  onMouseMoveCoords,
  zoomLevel = 100,
  showBleedAndSafeOverlay = true,
  darkMode = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeHandle, setActiveHandle] = useState<string | null>(null);

  // Mouse move tracker for Rulers & Footer Coordinates
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * canvasWidth);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * canvasHeight);
    if (onMouseMoveCoords) {
      onMouseMoveCoords(x, y);
    }

    if (isDragging && selectedIds.length > 0 && !activeHandle) {
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;
      setDragStart({ x, y });

      setElements((prev) =>
        prev.map((el) => {
          if (selectedIds.includes(el.id) && !el.locked) {
            return { ...el, x: el.x + dx, y: el.y + dy };
          }
          return el;
        })
      );
    }
  };

  const handleMouseDownOnElement = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIds([id]);
    setIsDragging(true);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * canvasWidth);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * canvasHeight);
      setDragStart({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle(null);
  };

  const handleCanvasBackgroundClick = () => {
    setSelectedIds([]);
  };

  const selectedElement = elements.find((el) => selectedIds.includes(el.id));

  return (
    <div
      className={`flex-1 relative flex items-center justify-center p-4 overflow-hidden select-none transition-colors ${
        darkMode ? 'bg-[#0F141F]' : 'bg-slate-200'
      }`}
      onMouseUp={handleMouseUp}
    >
      {/* 2D Vector Canvas Wrapper */}
      <div
        ref={containerRef}
        className={`relative bg-white shadow-2xl rounded-sm transition-all duration-100 border ${
          darkMode ? 'border-[#2A3447]' : 'border-slate-300'
        }`}
        style={{
          width: `${(canvasWidth * zoomLevel) / 100}px`,
          height: `${(canvasHeight * zoomLevel) / 100}px`,
          aspectRatio: `${canvasWidth} / ${canvasHeight}`
        }}
      >
        {/* SVG Canvas Content Engine */}
        <svg
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          className="w-full h-full cursor-crosshair overflow-visible"
          onMouseMove={handleMouseMove}
          onClick={handleCanvasBackgroundClick}
        >
          {/* Background Grid Lines (24px Grid) */}
          <defs>
            <pattern id="canvas-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke={darkMode ? '#e2e8f0' : '#cbd5e1'}
                strokeWidth="0.8"
                opacity="0.6"
              />
            </pattern>
          </defs>
          <rect width={canvasWidth} height={canvasHeight} fill="url(#canvas-grid)" />

          {/* Sublimation 3mm Bleed Margin Line (Red Dashed) */}
          {showBleedAndSafeOverlay && (
            <rect
              x="12"
              y="12"
              width={canvasWidth - 24}
              height={canvasHeight - 24}
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.8"
            />
          )}

          {/* Sublimation Safe Print Zone Line (Green Solid) */}
          {showBleedAndSafeOverlay && (
            <rect
              x="28"
              y="28"
              width={canvasWidth - 56}
              height={canvasHeight - 56}
              fill="none"
              stroke="#10b981"
              strokeWidth="1.2"
              opacity="0.7"
            />
          )}

          {/* Render Vector Elements */}
          {elements.map((el) => {
            if (!el.visible) return null;
            const isSelected = selectedIds.includes(el.id);

            return (
              <g
                key={el.id}
                transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation}, ${el.w / 2}, ${el.h / 2})`}
                onClick={(e) => handleMouseDownOnElement(e, el.id)}
                className="cursor-pointer"
                opacity={el.opacity / 100}
              >
                {/* Shape: Rectangle */}
                {el.type === 'shape' && el.shapeType === 'rectangle' && (
                  <rect
                    width={el.w}
                    height={el.h}
                    fill={el.fill}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth}
                    rx="8"
                  />
                )}

                {/* Shape: Circle */}
                {el.type === 'shape' && el.shapeType === 'circle' && (
                  <ellipse
                    cx={el.w / 2}
                    cy={el.h / 2}
                    rx={el.w / 2}
                    ry={el.h / 2}
                    fill={el.fill}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth}
                  />
                )}

                {/* Shape: Star */}
                {el.type === 'shape' && el.shapeType === 'star' && (
                  <polygon
                    points={`${el.w / 2},0 ${el.w * 0.65},${el.h * 0.35} ${el.w},${el.h * 0.38} ${el.w * 0.75},${
                      el.h * 0.65
                    } ${el.w * 0.82},${el.h} ${el.w / 2},${el.h * 0.8} ${el.w * 0.18},${el.h} ${el.w * 0.25},${
                      el.h * 0.65
                    } 0,${el.h * 0.38} ${el.w * 0.35},${el.h * 0.35}`}
                    fill={el.fill}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth}
                  />
                )}

                {/* Image Element */}
                {el.type === 'image' && (
                  <image href={el.content} width={el.w} height={el.h} preserveAspectRatio="none" />
                )}

                {/* Text Element */}
                {el.type === 'text' && (
                  <text
                    x={el.w / 2}
                    y={el.h / 2 + (el.fontSize || 36) / 3}
                    fill={el.fill}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth}
                    fontSize={el.fontSize || 36}
                    fontFamily={el.fontFamily || 'Montserrat'}
                    fontWeight={el.fontWeight || 'bold'}
                    textAnchor="middle"
                  >
                    {el.content}
                  </text>
                )}

                {/* Selection Bounding Box with Cyan #00D9FF Handles */}
                {isSelected && (
                  <g>
                    <rect
                      x="-4"
                      y="-4"
                      width={el.w + 8}
                      height={el.h + 8}
                      fill="none"
                      stroke="#00D9FF"
                      strokeWidth="2"
                    />

                    {/* 8 Transform Corner & Edge Handles */}
                    {/* Top-Left */}
                    <rect x="-8" y="-8" width="8" height="8" fill="#00D9FF" stroke="#ffffff" strokeWidth="1" />
                    {/* Top-Right */}
                    <rect x={el.w} y="-8" width="8" height="8" fill="#00D9FF" stroke="#ffffff" strokeWidth="1" />
                    {/* Bottom-Left */}
                    <rect x="-8" y={el.h} width="8" height="8" fill="#00D9FF" stroke="#ffffff" strokeWidth="1" />
                    {/* Bottom-Right */}
                    <rect x={el.w} y={el.h} width="8" height="8" fill="#00D9FF" stroke="#ffffff" strokeWidth="1" />

                    {/* Top Rotation Handle Line */}
                    <line x1={el.w / 2} y1="-8" x2={el.w / 2} y2="-24" stroke="#00D9FF" strokeWidth="1.5" />
                    <circle cx={el.w / 2} cy="-24" r="5" fill="#00D9FF" stroke="#ffffff" strokeWidth="1" />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
