/**
 * christmasMinimal.ts | Minimal - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasMinimal.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type MinimalTemplateId = 'minimal-01' | 'minimal-02' | 'minimal-03' | 'minimal-04' | 'minimal-05' | 'minimal-06' | 'minimal-07' | 'minimal-08' | 'minimal-09' | 'minimal-10';
 
export const minimalTemplates = [
  { id: 'minimal-01', title: 'Minimal Escandinavo Linha Ouro', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-02', title: 'Minimal Tipografia Serif Luxo', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-03', title: 'Minimal Ponto Dourado Único', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-04', title: 'Minimal Geometria Neve Nórdica', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-05', title: 'Minimal Branco Gelo Serenidade', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-06', title: 'Minimal Traço Único Árvore', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-07', title: 'Minimal Letter Spacing Luxo', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-08', title: 'Minimal Círculo Ouro Perfeito', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-09', title: 'Minimal Silêncio da Neve', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] },
  { id: 'minimal-10', title: 'Minimal Hygge Natal Clean', category: 'minimal' as const, premium: true, tags: ['natal','minimal','premium','sublistudio'] }
] as const;
 
export function getMinimalLayers(templateId: MinimalTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#FAFAF9');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'minimal-01':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#A3A3A3"/><path d="M5 71 Q102 20 187 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 01</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL ESCANDINAVO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Linha Ouro', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 22, 18, 9, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-02':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#A3A3A3"/><path d="M10 72 Q104 20 184 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 02</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL TIPOGRAFIA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Serif Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 24, 8, 8, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-03':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#A3A3A3"/><path d="M15 73 Q106 20 181 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 03</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL PONTO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourado Único', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 26, 18, 9, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-04':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#A3A3A3"/><path d="M20 74 Q108 20 178 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 04</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL GEOMETRIA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Neve Nórdica', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 28, 8, 8, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-05':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#A3A3A3"/><path d="M25 75 Q110 20 175 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 05</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL BRANCO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Gelo Serenidade', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 30, 18, 9, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-06':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#A3A3A3"/><path d="M30 76 Q112 20 172 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 06</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL TRAÇO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Único Árvore', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 32, 8, 8, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-07':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#A3A3A3"/><path d="M35 77 Q114 20 169 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 07</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL LETTER', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Spacing Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 34, 18, 9, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-08':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#A3A3A3"/><path d="M40 78 Q116 20 166 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 08</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL CÍRCULO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Ouro Perfeito', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 36, 8, 8, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-09':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#A3A3A3"/><path d="M45 79 Q118 20 163 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 09</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL SILÊNCIO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'da Neve', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 38, 18, 9, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'minimal-10':
      return [
        createBg('#FAFAF9', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FAFAF9"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#A3A3A3"/><path d="M50 70 Q120 20 160 60" stroke="#A3A3A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#A3A3A3" letter-spacing="1.2">MINIMAL 10</text></svg>`)}`, 0.18),
        createText({ text: 'MINIMAL HYGGE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#A3A3A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Natal Clean', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 40, 8, 8, '#A3A3A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'MINIMAL', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#A3A3A3', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Minimal layers flattened
export const getAllMinimalLayers = () =>
