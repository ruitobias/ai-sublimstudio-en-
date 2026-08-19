import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SublimationProduct, Environment3DConfig } from '../types';
import { Maximize2, RotateCw, RotateCcw, Play, Pause, Box, Sun } from 'lucide-react';
import { useTranslation } from '../i18n';

interface ThreeDViewportProps {
  product?: SublimationProduct;
  canvasElement: HTMLCanvasElement | null;
  canvasVersion: number;
}

// Helper to dynamically scale vertical FOV in narrow viewports (e.g. sidebars or collapsed mode)
// so the 3D model maintains a constant horizontal field of view, preventing over-zoom/clipping
const fitCameraToViewport = (camera: THREE.PerspectiveCamera, aspect: number) => {
  const baseVFOV = 40;
  if (aspect < 1.0) {
    const hFOVRad = 2 * Math.atan(Math.tan((baseVFOV * Math.PI / 180) / 2) * 1.0);
    const requiredVFOVRad = 2 * Math.atan(Math.tan(hFOVRad / 2) / aspect);
    camera.fov = Math.min(80, (requiredVFOVRad * 180) / Math.PI);
  } else {
    camera.fov = baseVFOV;
  }
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
};

export const ThreeDViewport: React.FC<ThreeDViewportProps> = ({
  product,
  canvasElement,
  canvasVersion,
}) => {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const productMeshGroupRef = useRef<THREE.Group | null>(null);
  const shadowPlaneRef = useRef<THREE.Mesh | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const initialTouchDistanceRef = useRef<number | null>(null);
  const initialCameraZRef = useRef<number | null>(null);

  // Mouse drag state for 360 degree rotation
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  const [mugAccentColor, setMugAccentColor] = useState<string>('#ffffff');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [envConfig, setEnvConfig] = useState<Environment3DConfig>({
    hdri: 'studio',
    showShadows: true,
    showReflections: true,
    ambientOcclusion: true,
    depthOfField: 0,
    autoRotate: true,
    showBleedLine: false,
    roughness: 0.1,
    metalness: 0.05,
  });

  const [activePresetView, setActivePresetView] = useState<'front' | 'back' | 'side' | 'top' | 'iso'>('front');

  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync autoRotate state in a ref so animate() loop reads the latest value without stale closure
  const autoRotateRef = useRef(envConfig.autoRotate);
  useEffect(() => {
    autoRotateRef.current = envConfig.autoRotate;
  }, [envConfig.autoRotate]);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#141415');
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.0);
    fitCameraToViewport(camera, width / height);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    const initialW = Math.max(width, 200);
    const initialH = Math.max(height, 200);
    renderer.setSize(initialW, initialH, true);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear any existing children before appending to prevent duplicate canvases
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting setup (Studio Key, Fill, Rim, Ambient)
    setupLighting(scene, envConfig.hdri);

    // 5. Floor shadow plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(10, 10);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.0;
    shadowPlane.receiveShadow = true;
    shadowPlaneRef.current = shadowPlane;
    scene.add(shadowPlane);

    // 6. Build initial product mesh
    rebuildProduct3DMesh();

    // 7. Animation loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (productMeshGroupRef.current && autoRotateRef.current && !isDraggingRef.current) {
        productMeshGroupRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer for smooth panel size changes & sidebar camera framing
    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = null;
        if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
        const newW = mountRef.current.clientWidth;
        const newH = mountRef.current.clientHeight;
        if (newW <= 0 || newH <= 0) return;

        const aspect = newW / newH;
        fitCameraToViewport(cameraRef.current, aspect);
        rendererRef.current.setSize(newW, newH, true);
        rendererRef.current.domElement.style.width = '100%';
        rendererRef.current.domElement.style.height = '100%';

        if (sceneRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      });
    };

    handleResize();

    // Trigger multiple resize recalculations to sync perfectly with 300ms CSS sidebar transitions
    const transitionTimers = [
      setTimeout(handleResize, 50),
      setTimeout(handleResize, 150),
      setTimeout(handleResize, 300),
      setTimeout(handleResize, 450),
      setTimeout(handleResize, 600),
    ];

    const resizeObserver = new ResizeObserver(handleResize);
    if (mountRef.current) {
      resizeObserver.observe(mountRef.current);
    }

    return () => {
      transitionTimers.forEach(clearTimeout);
      resizeObserver.disconnect();
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) {
        if (rendererRef.current.domElement && mountRef.current?.contains(rendererRef.current.domElement)) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
    };
  }, []);

  // Re-build 3D geometry when product model changes, env config, or accent color changes
  useEffect(() => {
    rebuildProduct3DMesh();
  }, [product, envConfig.roughness, envConfig.metalness, envConfig.showBleedLine, mugAccentColor]);

  // Update lighting when HDRI preset changes
  useEffect(() => {
    if (sceneRef.current) {
      setupLighting(sceneRef.current, envConfig.hdri);
    }
  }, [envConfig.hdri]);

  // Update canvas texture dynamically whenever canvas changes
  useEffect(() => {
    if (!productMeshGroupRef.current) return;

    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const offCanvas = offscreenCanvasRef.current;

    // Use minimum safe dimensions (16x16) to avoid WebGL 0x0 or negative copy bounds
    const srcW = canvasElement && canvasElement.width > 0 ? canvasElement.width : 1024;
    const srcH = canvasElement && canvasElement.height > 0 ? canvasElement.height : 512;

    if (offCanvas.width !== srcW || offCanvas.height !== srcH) {
      offCanvas.width = srcW;
      offCanvas.height = srcH;
      // If canvas dimension changed, recreate texture to keep WebGL internal texture bounds in sync
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
    }

    const ctx = offCanvas.getContext('2d');
    if (ctx) {
      if (canvasElement && canvasElement.width > 0 && canvasElement.height > 0) {
        ctx.clearRect(0, 0, srcW, srcH);
        ctx.drawImage(canvasElement, 0, 0);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, srcW, srcH);
      }
    }

    if (!textureRef.current) {
      const tex = new THREE.CanvasTexture(offCanvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = rendererRef.current?.capabilities.getMaxAnisotropy() || 8;
      tex.needsUpdate = true;
      textureRef.current = tex;

      applyTextureToProduct(tex);
    } else {
      textureRef.current.needsUpdate = true;
      applyTextureToProduct(textureRef.current);
    }
  }, [canvasVersion, canvasElement, product]);

  const applyTextureToProduct = (tex: THREE.CanvasTexture) => {
    if (!productMeshGroupRef.current) return;
    productMeshGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.userData.isPrintArea) {
        child.material.map = tex;
        child.material.needsUpdate = true;
      }
    });
  };

  const setupLighting = (scene: THREE.Scene, hdri: Environment3DConfig['hdri']) => {
    // Remove previous lights
    const lightsToRemove: THREE.Light[] = [];
    scene.traverse((obj) => {
      if (obj instanceof THREE.Light) lightsToRemove.push(obj);
    });
    lightsToRemove.forEach((light) => scene.remove(light));

    let mainColor = 0xffffff;
    let fillColor = 0xe0e7ff;
    let bgHex = '#141415';

    if (hdri === 'outdoor') {
      mainColor = 0xfffaed;
      fillColor = 0xdbeafe;
      bgHex = '#181d28';
    } else if (hdri === 'neon') {
      mainColor = 0xf43f5e;
      fillColor = 0x06b6d4;
      bgHex = '#0b0c10';
    } else if (hdri === 'warm') {
      mainColor = 0xfde047;
      fillColor = 0xf97316;
      bgHex = '#1c1917';
    }

    scene.background = new THREE.Color(bgHex);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(mainColor, 1.8);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(fillColor, 0.9);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);
  };

  const rebuildProduct3DMesh = () => {
    if (!sceneRef.current) return;

    // Safely remove any and all previous product groups/meshes to guarantee exactly ONE 3D product exists
    const objectsToRemove: THREE.Object3D[] = [];
    sceneRef.current.children.forEach((child) => {
      if (!(child instanceof THREE.Light) && child !== shadowPlaneRef.current) {
        objectsToRemove.push(child);
      }
    });
    objectsToRemove.forEach((obj) => {
      sceneRef.current?.remove(obj);
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    });
    productMeshGroupRef.current = null;

    const group = new THREE.Group();
    group.userData.isProductGroup = true;
    const matProps = {
      roughness: envConfig.roughness,
      metalness: envConfig.metalness,
      side: THREE.DoubleSide,
    };

    // Shared material for base body
    const baseBodyMaterial = new THREE.MeshStandardMaterial({
      color: product?.bgColor || 0xffffff,
      ...matProps,
    });

    // Sublimation Print Area Material
    const printMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: textureRef.current || null,
      roughness: envConfig.roughness * 0.8,
      metalness: envConfig.metalness,
      side: THREE.DoubleSide,
    });

    switch (product?.model3D || 'mug') {
      case 'mug': {
        // High-Fidelity Ceramic Sublimation Mug 11oz (325ml)
        const mugBodyColor = product?.bgColor || '#ffffff';
        const accentColorHex = mugAccentColor || '#ffffff';

        // Base porcelain material for unprinted areas
        const porcelainMaterial = new THREE.MeshStandardMaterial({
          color: mugBodyColor,
          roughness: 0.1,
          metalness: 0.05,
        });

        // Accent material for inner cavity & handle (Caneca com Alça e Interior Colorido)
        const accentMaterial = new THREE.MeshStandardMaterial({
          color: accentColorHex,
          roughness: 0.12,
          metalness: 0.04,
        });

        // 1. Outer Ceramic Wall with Sublimation Print Area Mapping
        const outerGeo = new THREE.CylinderGeometry(0.84, 0.84, 1.95, 64, 1, true);
        const mugMesh = new THREE.Mesh(outerGeo, printMaterial);
        mugMesh.userData.isPrintArea = true;
        mugMesh.castShadow = true;
        mugMesh.receiveShadow = true;
        mugMesh.rotation.y = Math.PI; // Aligns center of 2D canvas (u=0.5) to the front (+Z)
        group.add(mugMesh);

        // 2. Inner Ceramic Cavity
        const innerGeo = new THREE.CylinderGeometry(0.76, 0.76, 1.88, 64, 1, false);
        const innerMesh = new THREE.Mesh(innerGeo, accentMaterial);
        innerMesh.position.y = 0.035;
        group.add(innerMesh);

        // 3. Smooth Rounded Ceramic Top Lip / Rim
        const rimGeo = new THREE.TorusGeometry(0.80, 0.04, 16, 64);
        const rimMesh = new THREE.Mesh(rimGeo, accentMaterial);
        rimMesh.rotation.x = Math.PI / 2;
        rimMesh.position.y = 0.975;
        group.add(rimMesh);

        // 4. Outer Bottom Ceramic Base Disc
        const bottomGeo = new THREE.CircleGeometry(0.84, 64);
        const bottomMesh = new THREE.Mesh(bottomGeo, porcelainMaterial);
        bottomMesh.rotation.x = Math.PI / 2;
        bottomMesh.position.y = -0.975;
        group.add(bottomMesh);

        // 5. Ergonomic Ceramic C-Handle positioned at the back seam (-Z)
        const handleCurve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(0, 0.58, -0.80),
          new THREE.Vector3(0, 0.72, -1.52),
          new THREE.Vector3(0, -0.72, -1.52),
          new THREE.Vector3(0, -0.58, -0.80)
        );
        const handleGeo = new THREE.TubeGeometry(handleCurve, 36, 0.095, 16, false);
        const handleMesh = new THREE.Mesh(handleGeo, accentMaterial);
        handleMesh.castShadow = true;
        handleMesh.receiveShadow = true;
        group.add(handleMesh);

        break;
      }

      case 'tshirt': {
        // T-Shirt Torso + Sleeves
        const torsoGeo = new THREE.BoxGeometry(1.6, 2.1, 0.25, 16, 16, 4);
        const torsoMesh = new THREE.Mesh(torsoGeo, printMaterial);
        torsoMesh.userData.isPrintArea = true;
        torsoMesh.castShadow = true;
        group.add(torsoMesh);

        // Left Sleeve
        const sleeveLGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.6, 16);
        const sleeveL = new THREE.Mesh(sleeveLGeo, baseBodyMaterial);
        sleeveL.position.set(-0.98, 0.75, 0);
        sleeveL.rotation.z = Math.PI / 4;
        group.add(sleeveL);

        // Right Sleeve
        const sleeveRGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.6, 16);
        const sleeveR = new THREE.Mesh(sleeveRGeo, baseBodyMaterial);
        sleeveR.position.set(0.98, 0.75, 0);
        sleeveR.rotation.z = -Math.PI / 4;
        group.add(sleeveR);

        // Neck Collar
        const neckGeo = new THREE.TorusGeometry(0.32, 0.05, 12, 24);
        const neckMesh = new THREE.Mesh(neckGeo, baseBodyMaterial);
        neckMesh.position.set(0, 1.0, 0);
        neckMesh.rotation.x = Math.PI / 2;
        group.add(neckMesh);

        break;
      }

      case 'bottle':
      case 'tumbler': {
        // Skinny Tumbler / Inox Bottle
        const bottleHeight = product?.model3D === 'tumbler' ? 2.2 : 2.0;
        const bodyGeo = new THREE.CylinderGeometry(0.6, 0.6, bottleHeight, 48);
        const bodyMesh = new THREE.Mesh(bodyGeo, printMaterial);
        bodyMesh.userData.isPrintArea = true;
        bodyMesh.castShadow = true;
        group.add(bodyMesh);

        // Metallic Cap / Straw
        const capGeo = new THREE.CylinderGeometry(0.5, 0.58, 0.3, 32);
        const capMat = new THREE.MeshStandardMaterial({
          color: 0xd1d5db,
          metalness: 0.9,
          roughness: 0.1,
        });
        const capMesh = new THREE.Mesh(capGeo, capMat);
        capMesh.position.y = bottleHeight / 2 + 0.15;
        group.add(capMesh);

        if (product?.model3D === 'tumbler') {
          // Clear Straw
          const strawGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 12);
          const strawMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.9,
            opacity: 1,
            transparent: true,
            roughness: 0,
          });
          const strawMesh = new THREE.Mesh(strawGeo, strawMat);
          strawMesh.position.set(0.15, bottleHeight / 2 + 0.5, 0);
          group.add(strawMesh);
        }

        break;
      }

      case 'mousepad': {
        // Gaming Desk Mousepad XL
        const padGeo = new THREE.BoxGeometry(2.8, 1.4, 0.04);
        const padMesh = new THREE.Mesh(padGeo, printMaterial);
        padMesh.userData.isPrintArea = true;
        padMesh.rotation.x = 0.3; // slightly angled up
        padMesh.castShadow = true;
        group.add(padMesh);
        break;
      }

      case 'ecobag': {
        // Tote Bag
        const bagGeo = new THREE.BoxGeometry(1.6, 2.0, 0.15);
        const bagMesh = new THREE.Mesh(bagGeo, printMaterial);
        bagMesh.userData.isPrintArea = true;
        bagMesh.castShadow = true;
        group.add(bagMesh);

        // Handles
        const handleCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.4, 1.0, 0),
          new THREE.Vector3(0, 1.8, 0),
          new THREE.Vector3(0.4, 1.0, 0)
        );
        const handleTubeGeo = new THREE.TubeGeometry(handleCurve, 20, 0.04, 8, false);
        const handleMesh1 = new THREE.Mesh(handleTubeGeo, baseBodyMaterial);
        handleMesh1.position.z = 0.08;
        group.add(handleMesh1);

        const handleMesh2 = new THREE.Mesh(handleTubeGeo, baseBodyMaterial);
        handleMesh2.position.z = -0.08;
        group.add(handleMesh2);

        break;
      }

      case 'tile':
      case 'puzzle':
      case 'coaster': {
        // Flat Plate Tile / Puzzle
        const tileGeo = new THREE.BoxGeometry(1.8, 1.8, 0.08);
        const tileMesh = new THREE.Mesh(tileGeo, printMaterial);
        tileMesh.userData.isPrintArea = true;
        tileMesh.rotation.x = 0.2;
        tileMesh.castShadow = true;
        group.add(tileMesh);
        break;
      }

      case 'pillow': {
        // Throw Pillow
        const pillowGeo = new THREE.BoxGeometry(1.8, 1.8, 0.5, 12, 12, 6);
        const pillowMesh = new THREE.Mesh(pillowGeo, printMaterial);
        pillowMesh.userData.isPrintArea = true;
        pillowMesh.castShadow = true;
        group.add(pillowMesh);
        break;
      }

      case 'phonecase': {
        // Slim Curved Smartphone Case
        const phoneGeo = new THREE.BoxGeometry(1.1, 2.1, 0.12, 16, 16, 4);
        const phoneMesh = new THREE.Mesh(phoneGeo, printMaterial);
        phoneMesh.userData.isPrintArea = true;
        phoneMesh.castShadow = true;
        group.add(phoneMesh);

        // Camera Bump
        const camGeo = new THREE.BoxGeometry(0.35, 0.35, 0.05);
        const camMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2 });
        const camMesh = new THREE.Mesh(camGeo, camMat);
        camMesh.position.set(-0.28, 0.72, 0.07);
        group.add(camMesh);
        break;
      }

      case 'cap': {
        // Trucker / Baseball Cap Crown + Visor
        const crownGeo = new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const crownMesh = new THREE.Mesh(crownGeo, printMaterial);
        crownMesh.userData.isPrintArea = true;
        crownMesh.castShadow = true;
        group.add(crownMesh);

        const visorGeo = new THREE.BoxGeometry(1.2, 0.04, 0.7);
        const visorMesh = new THREE.Mesh(visorGeo, baseBodyMaterial);
        visorMesh.position.set(0, -0.02, 0.65);
        visorMesh.rotation.x = 0.2;
        group.add(visorMesh);
        break;
      }

      case 'cup': {
        // Travel Coffee Cup / Paper Cup
        const cupGeo = new THREE.CylinderGeometry(0.75, 0.55, 1.8, 48);
        const cupMesh = new THREE.Mesh(cupGeo, printMaterial);
        cupMesh.userData.isPrintArea = true;
        cupMesh.castShadow = true;
        group.add(cupMesh);

        // Plastic Lid
        const lidGeo = new THREE.CylinderGeometry(0.78, 0.78, 0.15, 32);
        const lidMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
        const lidMesh = new THREE.Mesh(lidGeo, lidMat);
        lidMesh.position.y = 0.95;
        group.add(lidMesh);
        break;
      }

      default: {
        // Fallback Box
        const defaultGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        const defaultMesh = new THREE.Mesh(defaultGeo, printMaterial);
        defaultMesh.userData.isPrintArea = true;
        defaultMesh.castShadow = true;
        group.add(defaultMesh);
      }
    }

    // Bleed Line Wireframe Guide
    if (envConfig.showBleedLine) {
      const bbox = new THREE.BoxHelper(group, 0xef4444);
      group.add(bbox);
    }

    group.position.y = 0;
    group.rotation.y = -0.35; // Slight initial angle to showcase front design + handle silhouette
    productMeshGroupRef.current = group;
    sceneRef.current.add(group);
    if (textureRef.current) {
      applyTextureToProduct(textureRef.current);
    }
  };

  // Mouse Interaction for 360 degree product view
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !productMeshGroupRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    productMeshGroupRef.current.rotation.y += deltaX * 0.01;
    productMeshGroupRef.current.rotation.x += deltaY * 0.01;

    // Limit pitch to prevent extreme unnatural flips/cutoff
    productMeshGroupRef.current.rotation.x = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, productMeshGroupRef.current.rotation.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch support for mobile / touchpads
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }

    if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      initialTouchDistanceRef.current = Math.hypot(dx, dy);
      initialCameraZRef.current = cameraRef.current?.position.z ?? null;
    }

    if (e.touches.length > 1) {
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialTouchDistanceRef.current !== null && cameraRef.current && initialCameraZRef.current !== null) {
      if (e.cancelable) e.preventDefault();
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      const currentDistance = Math.hypot(dx, dy);
      const zoomFactor = initialTouchDistanceRef.current / Math.max(1, currentDistance);
      cameraRef.current.position.z = Math.max(2.2, Math.min(7.0, initialCameraZRef.current * zoomFactor));
      cameraRef.current.updateProjectionMatrix();
      return;
    }

    if (!isDraggingRef.current || !productMeshGroupRef.current || e.touches.length !== 1) return;

    if (e.cancelable) e.preventDefault();
    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    productMeshGroupRef.current.rotation.y += deltaX * 0.01;
    productMeshGroupRef.current.rotation.x += deltaY * 0.01;

    productMeshGroupRef.current.rotation.x = Math.max(
      -Math.PI / 6,
      Math.min(Math.PI / 6, productMeshGroupRef.current.rotation.x)
    );

    previousMousePositionRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    initialTouchDistanceRef.current = null;
    initialCameraZRef.current = null;
  };

  // Preset Views Reset
  const setPresetView = (view: 'front' | 'back' | 'side' | 'top' | 'iso') => {
    setActivePresetView(view);
    // Pause auto rotation when user clicks a specific view angle
    setEnvConfig((prev) => ({ ...prev, autoRotate: false }));

    if (!productMeshGroupRef.current || !cameraRef.current) return;

    productMeshGroupRef.current.rotation.set(0, 0, 0);

    const dist = 4.0;
    switch (view) {
      case 'front':
        productMeshGroupRef.current.rotation.y = -0.30;
        cameraRef.current.position.set(0, 0, dist);
        break;
      case 'back':
        productMeshGroupRef.current.rotation.y = Math.PI;
        cameraRef.current.position.set(0, 0, dist);
        break;
      case 'side':
        productMeshGroupRef.current.rotation.y = -Math.PI / 2;
        cameraRef.current.position.set(0, 0, dist);
        break;
      case 'top':
        productMeshGroupRef.current.rotation.y = -0.30;
        cameraRef.current.position.set(0, dist, 0.1);
        break;
      case 'iso':
        productMeshGroupRef.current.rotation.y = -0.55;
        productMeshGroupRef.current.rotation.x = 0.22;
        cameraRef.current.position.set(0, 0, dist);
        break;
    }

    fitCameraToViewport(cameraRef.current, cameraRef.current.aspect);
    cameraRef.current.lookAt(0, 0, 0);
  };

  // Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    const zoomDelta = e.deltaY * 0.0025;
    cameraRef.current.position.z = Math.max(2.2, Math.min(7.0, cameraRef.current.position.z + zoomDelta));
  };

  return (
    <div
      className={`relative flex flex-col bg-[#141415] border border-[#2d2d30] rounded-xl overflow-hidden select-none transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'w-full h-full min-h-[360px]'
      }`}
    >
      {/* Viewport Header Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1e1e20] border-b border-[#2d2d30] text-xs text-gray-300 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-sky-400" />
          <span className="font-semibold tracking-wide text-white">{t('threeD.realisticMockup')}</span>
          <span className="px-2 py-0.5 text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full font-mono">
            {product?.name || 'Produto'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Quick Preset Views */}
          <div className="flex items-center bg-[#121214] p-0.5 rounded-lg border border-[#2d2d30]">
            {(['front', 'side', 'back', 'top', 'iso'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setPresetView(view)}
                className={`px-2 py-1 text-[10px] font-medium rounded transition-all cursor-pointer ${
                  activePresetView === view
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {view === 'front' ? t('threeD.front') : view === 'side' ? t('threeD.side') : view === 'back' ? t('threeD.back') : view === 'top' ? t('threeD.top') : t('threeD.iso')}
              </button>
            ))}
          </div>

          {/* Manual Step Rotate 45° Left/Right */}
          <button
            onClick={() => {
              if (productMeshGroupRef.current) {
                productMeshGroupRef.current.rotation.y -= Math.PI / 4;
              }
              setEnvConfig((prev) => ({ ...prev, autoRotate: false }));
            }}
            className="p-1.5 rounded-md border border-[#38383c] text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
            title={t('threeD.rotateLeft')}
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
          </button>

          <button
            onClick={() => {
              if (productMeshGroupRef.current) {
                productMeshGroupRef.current.rotation.y += Math.PI / 4;
              }
              setEnvConfig((prev) => ({ ...prev, autoRotate: false }));
            }}
            className="p-1.5 rounded-md border border-[#38383c] text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
            title={t('threeD.rotateRight')}
          >
            <RotateCw className="w-3.5 h-3.5 text-sky-400" />
          </button>

          {/* Auto Rotate 360 Play/Pause Button */}
          <button
            onClick={() => setEnvConfig((prev) => ({ ...prev, autoRotate: !prev.autoRotate }))}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md border transition-all cursor-pointer ${
              envConfig.autoRotate
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                : 'bg-white/5 border-[#38383c] text-gray-400 hover:text-white'
            }`}
            title={envConfig.autoRotate ? t('threeD.pauseRotation') : t('threeD.autoRotate')}
          >
            {envConfig.autoRotate ? (
              <>
                <Pause className="w-3 h-3 text-sky-400 fill-sky-400" />
                <span>{t('threeD.pause')}</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-sky-400 fill-sky-400" />
                <span>{t('threeD.rotate360')}</span>
              </>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md border border-[#38383c] text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
            title={t('threeD.fullscreen')}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        {/* Lighting & Material Settings Bar Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 p-2 bg-[#18181c]/80 backdrop-blur-md rounded-lg border border-white/10 text-xs text-gray-300">
          <div className="flex items-center gap-3">
            {/* HDRI Environment Preset */}
            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={envConfig.hdri}
                onChange={(e) =>
                  setEnvConfig((prev) => ({ ...prev, hdri: e.target.value as Environment3DConfig['hdri'] }))
                }
                className="bg-[#121214] text-white text-[11px] px-2 py-1 rounded border border-[#2d2d30] focus:outline-none"
              >
                <option value="studio">{t('threeD.studioLight')}</option>
                <option value="outdoor">{t('threeD.naturalLight')}</option>
                <option value="neon">{t('threeD.neonLight')}</option>
                <option value="warm">{t('threeD.warmLight')}</option>
              </select>
            </div>

            {/* Mug Interior & Handle Color Accent Selector */}
            {product?.model3D === 'mug' && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
                <span className="text-[10px] text-gray-400 hidden md:inline">{t('threeD.interiorHandle')}</span>
                <div className="flex items-center gap-1">
                  {[
                    { color: '#ffffff', label: 'White' },
                    { color: '#1e293b', label: 'Black' },
                    { color: '#ef4444', label: 'Red' },
                    { color: '#2563eb', label: 'Blue' },
                    { color: '#ec4899', label: 'Pink' },
                    { color: '#eab308', label: 'Yellow' },
                    { color: '#10b981', label: 'Green' },
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setMugAccentColor(c.color)}
                      className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                        mugAccentColor === c.color ? 'ring-2 ring-sky-400 scale-110 border-white' : 'border-black/30'
                      }`}
                      style={{ backgroundColor: c.color }}
                      title={`${t('threeD.interiorHandle')}: ${c.label}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Roughness Slider */}
            <div className="hidden lg:flex items-center gap-2 text-[11px]">
              <span className="text-gray-400">{t('threeD.glossFinish')}</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={1 - envConfig.roughness}
                onChange={(e) =>
                  setEnvConfig((prev) => ({ ...prev, roughness: 1 - parseFloat(e.target.value) }))
                }
                className="w-16 accent-sky-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bleed Wireframe toggle */}
            <button
              onClick={() => setEnvConfig((prev) => ({ ...prev, showBleedLine: !prev.showBleedLine }))}
              className={`px-2 py-1 text-[10px] rounded border transition-all cursor-pointer ${
                envConfig.showBleedLine
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {t('threeD.bleedArea')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
