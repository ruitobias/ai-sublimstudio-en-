/**
 * christmasFamily.ts | Family - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasFamily.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type FamilyTemplateId = 'family-01' | 'family-02' | 'family-03' | 'family-04' | 'family-05' | 'family-06' | 'family-07' | 'family-08' | 'family-09' | 'family-10';
 
export const familyTemplates = [
  { id: 'family-01', title: 'Family Árvore + 3 Fotos Polaroid', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-02', title: 'Family Nossa Primeira Natal 2024', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-03', title: 'Family 5 Fotos Grade Luxo', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-04', title: 'Family Amor Que Transborda', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-05', title: 'Family Calendário Memórias', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-06', title: 'Family Lettering Manuscrito Ouro', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-07', title: 'Family Aconchego Lareira Fotos', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-08', title: 'Family Mural Afeto Infinito', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-09', title: 'Family Moldura Dourada Clássica', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] },
  { id: 'family-10', title: 'Family Celebração em Casa', category: 'family' as const, premium: true, tags: ['natal','family','premium','sublistudio'] }
] as const;
 
export function getFamilyLayers(templateId: FamilyTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#2D1B0E');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'family-01':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#C9A86A"/><path d="M5 71 Q102 20 187 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 01</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY ÁRVORE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: '+ 3 Fotos Polaroid', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-02':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#C9A86A"/><path d="M10 72 Q104 20 184 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 02</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY NOSSA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Primeira Natal 2024', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-03':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#C9A86A"/><path d="M15 73 Q106 20 181 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 03</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY 5', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Fotos Grade Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-04':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#C9A86A"/><path d="M20 74 Q108 20 178 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 04</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY AMOR', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Que Transborda', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-05':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#C9A86A"/><path d="M25 75 Q110 20 175 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 05</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY CALENDÁRIO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Memórias', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-06':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#C9A86A"/><path d="M30 76 Q112 20 172 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 06</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY LETTERING', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Manuscrito Ouro', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-07':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#C9A86A"/><path d="M35 77 Q114 20 169 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 07</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY ACONCHEGO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Lareira Fotos', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-08':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#C9A86A"/><path d="M40 78 Q116 20 166 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 08</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY MURAL', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Afeto Infinito', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-09':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#C9A86A"/><path d="M45 79 Q118 20 163 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 09</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY MOLDURA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourada Clássica', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'family-10':
      return [
        createBg('#2D1B0E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2D1B0E"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#C9A86A"/><path d="M50 70 Q120 20 160 60" stroke="#C9A86A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#C9A86A" letter-spacing="1.2">FAMILY 10</text></svg>`)}`, 0.18),
        createText({ text: 'FAMILY CELEBRAÇÃO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#C9A86A', x: 12, y: 8, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'em Casa', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'rounded'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'FAMILY', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#C9A86A', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Family layers flattened
export const getAllFamilyLayers = () =>
  familyTemplates.map(t => ({ id: t.id, title: t.title, layers: getFamilyLayers(t.id as FamilyTemplateId) }));