/**
 * christmasReligious.ts | Religious - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasReligious.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type ReligiousTemplateId = 'religious-01' | 'religious-02' | 'religious-03' | 'religious-04' | 'religious-05' | 'religious-06' | 'religious-07' | 'religious-08' | 'religious-09' | 'religious-10';
 
export const religiousTemplates = [
  { id: 'religious-01', title: 'Religious Cruz Estrela Belém', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-02', title: 'Religious Natividade Ouro Sagrado', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-03', title: 'Religious Luz Que Guia', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-04', title: 'Religious Menino Jesus Manjedoura', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-05', title: 'Religious Oração de Natal', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-06', title: 'Religious Estrela Guia Dourada', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-07', title: 'Religious Anjos Cantam Glória', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-08', title: 'Religious Fé Esperança Amor', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-09', title: 'Religious Sagrada Família Luxo', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] },
  { id: 'religious-10', title: 'Religious Espírito Natalino', category: 'religious' as const, premium: true, tags: ['natal','religious','premium','sublistudio'] }
] as const;
 
export function getReligiousLayers(templateId: ReligiousTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#1A1A2E');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'religious-01':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#E8D5A3"/><path d="M5 71 Q102 20 187 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 01</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS CRUZ', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Estrela Belém', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 22, 18, 9, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-02':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#E8D5A3"/><path d="M10 72 Q104 20 184 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 02</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS NATIVIDADE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Ouro Sagrado', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 24, 8, 8, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-03':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#E8D5A3"/><path d="M15 73 Q106 20 181 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 03</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS LUZ', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Que Guia', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 26, 18, 9, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-04':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#E8D5A3"/><path d="M20 74 Q108 20 178 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 04</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS MENINO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Jesus Manjedoura', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 28, 8, 8, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-05':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#E8D5A3"/><path d="M25 75 Q110 20 175 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 05</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS ORAÇÃO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'de Natal', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 30, 18, 9, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-06':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#E8D5A3"/><path d="M30 76 Q112 20 172 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 06</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS ESTRELA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Guia Dourada', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 32, 8, 8, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-07':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#E8D5A3"/><path d="M35 77 Q114 20 169 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 07</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS ANJOS', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Cantam Glória', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 34, 18, 9, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-08':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#E8D5A3"/><path d="M40 78 Q116 20 166 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 08</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS FÉ', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Esperança Amor', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 36, 8, 8, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-09':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#E8D5A3"/><path d="M45 79 Q118 20 163 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 09</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS SAGRADA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Família Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 38, 18, 9, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'religious-10':
      return [
        createBg('#1A1A2E', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1A1A2E"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#E8D5A3"/><path d="M50 70 Q120 20 160 60" stroke="#E8D5A3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#E8D5A3" letter-spacing="1.2">RELIGIOUS 10</text></svg>`)}`, 0.18),
        createText({ text: 'RELIGIOUS ESPÍRITO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#E8D5A3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Natalino', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 40, 8, 8, '#E8D5A3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'RELIGIOUS', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#E8D5A3', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Religious layers flattened
export const getAllReligiousLayers = () =>
  religiousTemplates.map(t => ({ id: t.id, title: t.title, layers: getReligiousLayers(t.id as ReligiousTemplateId) }));