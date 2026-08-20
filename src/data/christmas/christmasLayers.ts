import { Layer } from '../../types';

export function createBg(id: string, color: string, ts: number): Layer {
  return { id: `${id}-${ts}`, name: `Fundo ${color}`, type: 'shape', shapeType: 'rectangle', visible: true, locked: true, opacity: 100, blendMode: 'normal', x: 0, y: 0, width: 756, height: 359, rotation: 0, content: '', color };
}
export function createText(id: string, content: string, x: number, y: number, color: string, size: number, ts: number, font = 'Playfair Display, serif'): Layer {
  return { id: `${id}-${ts}`, name: `Texto ${content.substring(0,15)}`, type: 'text', visible: true, locked: false, opacity: 100, blendMode: 'normal', x, y, width: 350, height: 60, rotation: 0, content, color, fontSize: size, fontFamily: font, fontWeight: 'bold' };
}
export function createImage(id: string, svg: string, x: number, y: number, w: number, h: number, ts: number): Layer {
  return { id: `${id}-${ts}`, name: id, type: 'image', visible: true, locked: false, opacity: 100, blendMode: 'normal', x, y, width: w, height: h, rotation: 0, content: svg };
}
export function createPhoto(id: string, x: number, y: number, w: number, h: number, rot: number, ts: number): Layer {
  return { id: `${id}-${ts}`, name: `Foto ${id}`, type: 'image', visible: true, locked: false, opacity: 100, blendMode: 'normal', x, y, width: w, height: h, rotation: rot, content: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=400&q=80', strokeColor: '#FFF', strokeWidth: 4 };
}