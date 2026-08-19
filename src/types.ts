export type WorkspaceViewMode = 'split' | 'canvas' | 'mockup';

export type ToolType = 
  | 'select'
  | 'move'
  | 'crop'
  | 'pen'
  | 'brush'
  | 'eraser'
  | 'stamp'
  | 'text'
  | 'shapes'
  | 'gradient'
  | 'eyedropper'
  | 'masks'
  | 'layers'
  | 'smart_object'
  | 'vectorize'
  | 'remove_bg'
  | 'upscale'
  | 'generative_fill'
  | 'object_replace'
  | 'direct'
  | 'rectangle'
  | 'circle'
  | 'polygon'
  | 'star'
  | 'line'
  | 'hand'
  | 'zoom'
  | 'ai';

export type ShapeType = string;

export type BlendMode = 
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'soft-light'
  | 'hard-light'
  | 'color-burn'
  | 'color-dodge'
  | 'darken'
  | 'lighten'
  | 'difference';

export type TextWarpCategory = 'basics' | 'curves' | 'shapes' | 'perspective' | 'effects' | 'decorative';

export type TextWarpStyle =
  | 'straight'
  | 'arc_upper'
  | 'arc_lower'
  | 'circle'
  | 'semi_circle'
  | 'wave'
  | 'smile'
  | 'frown'
  | 's_curve'
  | 'spiral'
  | 'heart'
  | 'star'
  | 'oval'
  | 'vertical_ellipse'
  | 'diamond'
  | 'trapezoid'
  | 'perspective_left'
  | 'perspective_right'
  | 'perspective_center'
  | 'arc_3d'
  | 'flag'
  | 'bulge'
  | 'pinch'
  | 'fish_eye'
  | 'flex_arc'
  | 'logo_circle'
  | 'seal'
  | 'stamp_style'
  | 'emblem'
  | 'ribbon'
  | 'cylinder';

export type LayerType = 'image' | 'text' | 'shape' | 'brush' | 'smart' | 'group' | 'path';

export interface WordItem {
  id: string;
  text: string;
  weight: number; // 1 to 10
}

export interface WordArtConfig {
  words: WordItem[];
  shape: string;
  font: string;
  paletteId: string;
  layoutMode: 'horizontal' | 'mixed' | 'angles';
  density: number;
  wordArtType?: 'wordart1' | 'wordart2';
}

export interface LayerFilters {
  brightness: number;  // -100 to 100
  contrast: number;    // -100 to 100
  saturation: number;  // -100 to 100
  hue: number;         // -180 to 180
  blur: number;        // 0 to 50
  vibrance: number;    // -100 to 100
  temperature?: number; // -100 to 100
  exposure?: number;   // -100 to 100
  shadows?: number;    // -100 to 100
  highlights?: number; // -100 to 100
  sharpen?: number;    // 0 to 100
  gamma?: number;      // 0.2 to 3.0
  sepia?: number;      // 0 to 100
  invert?: boolean;
  grayscale?: boolean;
  presetFilter?: string; // vintage, hdr, cartoon, sketch, neon, cinema, popart, sharpen, blur, emboss, glow, duotone, cool, warm
  filterIntensity?: number; // 0 to 100
}

export interface Layer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'left' | 'center' | 'right';
  textCurved?: boolean;
  curveRadius?: number;
  textWarpStyle?: TextWarpStyle;
  warpIntensity?: number;
  shapeType?: ShapeType;
  strokeColor?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  gradient?: {
    type: 'linear' | 'radial';
    colors: string[];
    angle: number;
  };
  maskUrl?: string;
  isSmartObject?: boolean;
  flipX?: boolean;
  flipY?: boolean;
  children?: Layer[];
  filters?: LayerFilters;
  wordArtConfig?: WordArtConfig;
  wordArtType?: 'wordart1' | 'wordart2';
}

export interface VectorElement {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
  opacity: number;
  x: number;
  y: number;
  w?: number;
  h?: number;
  width?: number;
  height?: number;
  rotation: number;
  content: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  color?: string;
  strokeColor?: string;
  blendMode?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  textWarpStyle?: TextWarpStyle;
  warpIntensity?: number;
  shapeType?: 'rectangle' | 'circle' | 'star' | 'polygon' | 'heart' | 'triangle' | string;
  shadowColor?: string;
  shadowBlur?: number;
  filterBrightness?: number;
  filterContrast?: number;
  filterSaturation?: number;
}

export interface SublimationProduct {
  id: string;
  name: string;
  category: string;
  defaultWidthCm: number;
  defaultHeightCm: number;
  printAspect: string;
  model3D: 'mug' | 'tshirt' | 'bottle' | 'tumbler' | 'mousepad' | 'ecobag' | 'cap' | 'tile' | 'pillow' | 'puzzle' | 'phonecase' | 'coaster' | 'cup';
  description: string;
  bgColor: string;
  material: string;
  samplePrints: string[];
}

export interface PrintableProduct {
  id: string;
  name: string;
  category: string;
  widthMm: number;
  heightMm: number;
  printAspect: string;
  model3D: 'mug' | 'tshirt' | 'bottle' | 'tumbler' | 'mousepad' | 'pillow' | 'tile' | 'phonecase' | 'puzzle' | 'cup';
  description: string;
  bgColor: string;
  material: string;
  cylinderRadiusMm?: number;
  cylinderArcDegrees?: number;
}

export interface SublimationPressPreset {
  id: string;
  productName: string;
  temperatureC: number;
  temperatureF: number;
  timeSeconds: number;
  pressure: 'Leve' | 'Média' | 'Alta';
  paperType: string;
  inkType: string;
  notes: string;
}

export interface TemplatePreset {
  id: string;
  title: string;
  category: 'Tropical' | 'Sunset' | 'Vintage' | 'Neon' | 'Floral' | 'Minimal' | 'Geométrico' | 'Aquarela';
  previewUrl: string;
  elements: VectorElement[];
}

export interface GangItem {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  quantity: number;
  color?: string;
}

export interface GangPlacedBox {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotated: boolean;
}

export interface HistoryCommand {
  id: string;
  action: string;
  timestamp: string;
  elements: VectorElement[];
}

export interface HistoryStep {
  id: string;
  description: string;
  toolName: string;
  timestamp: Date;
  layers: Layer[];
}

export interface ExportSettings {
  format: 'png' | 'svg' | 'pdf' | 'json';
  dpi: 300 | 150 | 72;
  mirrorHorizontal: boolean;
  includeBleed: boolean;
  bleedMm: number;
  cmykProfile: 'Fogra39' | 'sRGB' | 'USWebCoated';
}

export interface ExportConfig {
  format: 'png' | 'jpg' | 'pdf' | 'svg' | 'psd' | 'tiff';
  colorSpace: 'CMYK' | 'RGB';
  dpi: 300 | 150 | 72;
  transparentBg: boolean;
  mirrorHorizontal: boolean;
  physicalWidthCm: number;
  physicalHeightCm: number;
}

export interface AIModelConfig {
  id: string;
  name: string;
  provider: string;
  type: 'image' | 'text' | 'multimodal';
  isFree: boolean;
  active: boolean;
  badge?: string;
  description?: string;
}

export interface AIPromptParams {
  prompt: string;
  negativePrompt: string;
  model: string;
  guidanceScale: number;
  seed: number;
  upscaleFactor: number;
  creativity: number;
  seamlessPattern: boolean;
  colorReplaceFrom?: string;
  colorReplaceTo?: string;
}

export interface Environment3DConfig {
  hdri: 'studio' | 'outdoor' | 'neon' | 'warm';
  showShadows: boolean;
  showReflections: boolean;
  ambientOcclusion: boolean;
  depthOfField: number;
  autoRotate: boolean;
  showBleedLine: boolean;
  roughness: number;
  metalness: number;
}

export interface PresetTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  theme: string;
  character: string;
  style: string;
  colors: string;
  lighting: string;
  background: string;
  suggestedText?: string;
  imageUrl: string;
}

export interface MugDesignConfigText {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  xPercent: number;
  yPercent: number;
  curveAmount: number;
  alignment: 'left' | 'center' | 'right';
  shadow: boolean;
}

export interface MugDesignConfig {
  theme: string;
  character: string;
  style: string;
  colors: string;
  lighting: string;
  background: string;
  negativePrompt: string;
  imageUrl?: string;
  texts: MugDesignConfigText[];
}

