/**
 * christmasFunny.ts | Funny - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasFunny.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type FunnyTemplateId = 'funny-01' | 'funny-02' | 'funny-03' | 'funny-04' | 'funny-05' | 'funny-06' | 'funny-07' | 'funny-08' | 'funny-09' | 'funny-10';
 
export const funnyTemplates = [
  { id: 'funny-01', title: 'Funny HO HO HO Tipografia Bold', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-02', title: 'Funny Grinch Roubou Presentes', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-03', title: 'Funny Papai Noel Fitness', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-04', title: 'Funny Vinho Mais Uma Taça', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-05', title: 'Funny Lista Travessos Premium', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-06', title: 'Funny Pisca Pisca Enrolado', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-07', title: 'Funny Dieta Começa Janeiro', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-08', title: 'Funny Sonequinha Noel Preguiça', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-09', title: 'Funny Meme Natal Brasileiro', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] },
  { id: 'funny-10', title: 'Funny Socorro Família Chegando', category: 'funny' as const, premium: true, tags: ['natal','funny','premium','sublistudio'] }
] as const;
 
export function getFunnyLayers(templateId: FunnyTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#0F3D0F');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'funny-01':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#FFE135"/><path d="M5 71 Q102 20 187 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 01</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY HO', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'HO HO Tipografia Bold', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 22, 18, 9, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-02':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#FFE135"/><path d="M10 72 Q104 20 184 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 02</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY GRINCH', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Roubou Presentes', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 24, 8, 8, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-03':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#FFE135"/><path d="M15 73 Q106 20 181 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 03</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY PAPAI', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Noel Fitness', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 26, 18, 9, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-04':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#FFE135"/><path d="M20 74 Q108 20 178 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 04</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY VINHO', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Mais Uma Taça', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 28, 8, 8, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-05':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#FFE135"/><path d="M25 75 Q110 20 175 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 05</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY LISTA', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Travessos Premium', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 30, 18, 9, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-06':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#FFE135"/><path d="M30 76 Q112 20 172 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 06</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY PISCA', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Pisca Enrolado', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 32, 8, 8, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-07':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#FFE135"/><path d="M35 77 Q114 20 169 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 07</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY DIETA', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Começa Janeiro', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 34, 18, 9, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-08':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#FFE135"/><path d="M40 78 Q116 20 166 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 08</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY SONEQUINHA', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Noel Preguiça', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 36, 8, 8, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-09':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#FFE135"/><path d="M45 79 Q118 20 163 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 09</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY MEME', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Natal Brasileiro', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 38, 18, 9, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'funny-10':
      return [
        createBg('#0F3D0F', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#0F3D0F"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#FFE135"/><path d="M50 70 Q120 20 160 60" stroke="#FFE135" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FFE135" letter-spacing="1.2">FUNNY 10</text></svg>`)}`, 0.18),
        createText({ text: 'FUNNY SOCORRO', fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: '#FFE135', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Família Chegando', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 40, 8, 8, '#FFE135'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'FUNNY', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#FFE135', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Funny layers flattened
export const getAllFunnyLayers = () =>
