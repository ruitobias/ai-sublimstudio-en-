import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Box, Sun, Sparkles, RefreshCw } from 'lucide-react';
import { VectorElement, PrintableProduct } from '../types';
import { WarpEngine } from '../utils/warpEngine';

interface Realtime3DMockupProps {
  elements: VectorElement[];
  canvasWidth: number;
  canvasHeight: number;
  currentProduct: PrintableProduct;
  setProduct: (product: PrintableProduct) => void;
  onClose?: () => void;
  darkMode?: boolean;
}

export const Realtime3DMockup: React.FC<Realtime3DMockupProps> = ({
  elements,
  canvasWidth,
  canvasHeight,
  currentProduct,
  setProduct,
  onClose,
  darkMode = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [materialFinish, setMaterialFinish] = useState<'glossy' | 'matte' | 'metallic'>('glossy');
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'warm' | 'neon'>('studio');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  // Sync 2D canvas SVG content to Three.js 3D Mesh Texture
  const updateTextureFromElements = async () => {
    if (!textureRef.current || !meshRef.current) return;

    // Generate SVG string from vector elements
    const svgElementsStr = elements
      .map((el) => {
        if (!el.visible) return '';
        if (el.type === 'shape' && el.shapeType === 'rectangle') {
          return `<rect x="${el.x}" y="${el.y}" width="${el.w}" height="${el.h}" fill="${el.fill}" stroke="${el.stroke}" stroke-width="${el.strokeWidth}" rx="8"/>`;
        }
        if (el.type === 'shape' && el.shapeType === 'circle') {
          return `<ellipse cx="${el.x + el.w / 2}" cy="${el.y + el.h / 2}" rx="${el.w / 2}" ry="${el.h / 2}" fill="${el.fill}" stroke="${el.stroke}" stroke-width="${el.strokeWidth}"/>`;
        }
        if (el.type === 'text') {
          return `<text x="${el.x + el.w / 2}" y="${el.y + el.h / 2}" fill="${el.fill}" stroke="${el.stroke}" stroke-width="${el.strokeWidth}" font-size="${el.fontSize || 36}" font-family="${el.fontFamily || 'Montserrat'}" font-weight="bold" text-anchor="middle">${el.content}</text>`;
        }
        if (el.type === 'image') {
          return `<image href="${el.content}" x="${el.x}" y="${el.y}" width="${el.w}" height="${el.h}" preserveAspectRatio="none"/>`;
        }
        return '';
      })
      .join('');

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}"><rect width="100%" height="100%" fill="#ffffff"/>${svgElementsStr}</svg>`;

    const textureCanvas = await WarpEngine.svgToTextureCanvas(svgString, 1024, 1024);
    textureRef.current.image = textureCanvas;
    textureRef.current.needsUpdate = true;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Setup Three.js Scene, Camera & WebGLRenderer
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(darkMode ? '#0A0E17' : '#f8fafc');
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 2. Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(3, 4, 3);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x00d9ff, 0.8);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    // 3. Create 3D Sublimation Cylinder Geometry (11oz Mug Cylinder)
    const geometry = new THREE.CylinderGeometry(1.0, 1.0, 2.2, 64, 1, true);

    const dummyCanvas = document.createElement('canvas');
    dummyCanvas.width = 1024;
    dummyCanvas.height = 1024;
    const canvasTexture = new THREE.CanvasTexture(dummyCanvas);
    canvasTexture.wrapS = THREE.RepeatWrapping;
    canvasTexture.wrapT = THREE.ClampToEdgeWrapping;
    textureRef.current = canvasTexture;

    const material = new THREE.MeshStandardMaterial({
      map: canvasTexture,
      roughness: materialFinish === 'glossy' ? 0.15 : materialFinish === 'matte' ? 0.8 : 0.2,
      metalness: materialFinish === 'metallic' ? 0.8 : 0.05,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Add Mug Handle
    const handleGeo = new THREE.TorusGeometry(0.65, 0.12, 16, 32, Math.PI);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    handleMesh.position.set(-1.0, 0, 0);
    handleMesh.rotation.z = Math.PI / 2;
    mesh.add(handleMesh);

    // 4. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (meshRef.current && autoRotate) {
        meshRef.current.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    updateTextureFromElements();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [materialFinish, lightingPreset, darkMode]);

  useEffect(() => {
    updateTextureFromElements();
  }, [elements]);

  return (
    <div
      className={`absolute bottom-10 right-4 w-[360px] h-[400px] border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-30 backdrop-blur-md transition-colors ${
        darkMode
          ? 'bg-[#0E131F]/95 border-purple-500/40 text-slate-100'
          : 'bg-white/95 border-purple-300 text-slate-800 shadow-2xl'
      }`}
    >
      {/* Header */}
      <div
        className={`p-2.5 border-b flex items-center justify-between text-xs font-bold ${
          darkMode ? 'bg-[#141A29] border-[#232D3F] text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-1.5 text-purple-500">
          <Box className="w-4 h-4 animate-spin-slow" />
          <span>Simulador 3D HD (Three.js)</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1 rounded-lg border text-[10px] cursor-pointer ${
              autoRotate
                ? 'bg-purple-600 text-white border-purple-500'
                : darkMode
                ? 'bg-[#1E293B] text-slate-400'
                : 'bg-slate-200 text-slate-600'
            }`}
            title="Alternar Auto Rotação"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className={`px-1.5 font-bold ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport Mount */}
      <div ref={mountRef} className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing"></div>

      {/* Material Finish & Controls Bar */}
      <div
        className={`p-2 border-t flex items-center justify-between text-[10px] font-bold ${
          darkMode ? 'bg-[#141A29] border-[#232D3F] text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-1">
          <span>Acabamento:</span>
          {(['glossy', 'matte', 'metallic'] as const).map((finish) => (
            <button
              key={finish}
              onClick={() => setMaterialFinish(finish)}
              className={`px-2 py-0.5 rounded capitalize cursor-pointer ${
                materialFinish === finish
                  ? 'bg-purple-600 text-white'
                  : darkMode
                  ? 'bg-[#1E293B] text-slate-400'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {finish}
            </button>
          ))}
        </div>

        <button
          onClick={updateTextureFromElements}
          className="p-1 bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-500 border border-cyan-500/40 rounded-lg cursor-pointer flex items-center gap-1 font-bold"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Sync</span>
        </button>
      </div>
    </div>
  );
};
