/**
 * christmasClassic.ts | Classic - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasClassic.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type ClassicTemplateId = 'classic-01' | 'classic-02' | 'classic-03' | 'classic-04' | 'classic-05' | 'classic-06' | 'classic-07' | 'classic-08' | 'classic-09' | 'classic-10';
 
export const classicTemplates = [
  { id: 'classic-01', title: 'Classic Vermelho Dourado Luxo', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-02', title: 'Classic Verde Floresta Tradição', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-03', title: 'Classic Tartan Xadrez Premium', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-04', title: 'Classic Poinsétia Dourada Royal', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-05', title: 'Classic Cartas Noel Vintage', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-06', title: 'Classic Guirlanda Ouro Velho', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-07', title: 'Classic Veludo Vermelho Royal', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-08', title: 'Classic Neve Dourada Glamour', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-09', title: 'Classic Presentes Laço Cetim', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] },
  { id: 'classic-10', title: 'Classic Lareira Aconchego Luxo', category: 'classic' as const, premium: true, tags: ['natal','classic','premium','sublistudio'] }
] as const;
 
export function getClassicLayers(templateId: ClassicTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#7A0C10');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'classic-01':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#D4AF37"/><path d="M5 71 Q102 20 187 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 01</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC VERMELHO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourado Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 22, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-02':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#D4AF37"/><path d="M10 72 Q104 20 184 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 02</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC VERDE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Floresta Tradição', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 24, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-03':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#D4AF37"/><path d="M15 73 Q106 20 181 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 03</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC TARTAN', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Xadrez Premium', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 26, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-04':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#D4AF37"/><path d="M20 74 Q108 20 178 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 04</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC POINSÉTIA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourada Royal', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 28, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-05':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#D4AF37"/><path d="M25 75 Q110 20 175 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 05</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC CARTAS', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Noel Vintage', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 30, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-06':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#D4AF37"/><path d="M30 76 Q112 20 172 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 06</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC GUIRLANDA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Ouro Velho', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 32, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-07':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#D4AF37"/><path d="M35 77 Q114 20 169 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 07</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC VELUDO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Vermelho Royal', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 34, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-08':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#D4AF37"/><path d="M40 78 Q116 20 166 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 08</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC NEVE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourada Glamour', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 36, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-09':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#D4AF37"/><path d="M45 79 Q118 20 163 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 09</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC PRESENTES', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Laço Cetim', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 38, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'classic-10':
      return [
        createBg('#7A0C10', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#7A0C10"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#D4AF37"/><path d="M50 70 Q120 20 160 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">CLASSIC 10</text></svg>`)}`, 0.18),
        createText({ text: 'CLASSIC LAREIRA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Aconchego Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 40, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'CLASSIC', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#D4AF37', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Classic layers flattened
export const getAllClassicLayers = () =>
  classicTemplates.map(t => ({ id: t.id, title: t.title, layers: getClassicLayers(t.id as ClassicTemplateId) }));