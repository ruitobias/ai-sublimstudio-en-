/**
 * christmasCute.ts | Cute - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasCute.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type CuteTemplateId = 'cute-01' | 'cute-02' | 'cute-03' | 'cute-04' | 'cute-05' | 'cute-06' | 'cute-07' | 'cute-08' | 'cute-09' | 'cute-10';
 
export const cuteTemplates = [
  { id: 'cute-01', title: 'Cute Rena Fofa Nariz Vermelho', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-02', title: 'Cute Pinguim Cachecol Listrado', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-03', title: 'Cute Urso Polar Gorro Fofo', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-04', title: 'Cute Boneco Neve Sorriso', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-05', title: 'Cute Gatinho Caixa Presente', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-06', title: 'Cute Elfo Oficina Brinquedos', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-07', title: 'Cute Biscoito Gengibre Kawaii', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-08', title: 'Cute Trenó Ursinhos Carinhosos', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-09', title: 'Cute Árvore Olhinhos Brilhantes', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] },
  { id: 'cute-10', title: 'Cute Papai Noel Baby Fofo', category: 'cute' as const, premium: true, tags: ['natal','cute','premium','sublistudio'] }
] as const;
 
export function getCuteLayers(templateId: CuteTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#FFF5F5');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'cute-01':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#FF8FA3"/><path d="M5 71 Q102 20 187 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 01</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE RENA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Fofa Nariz Vermelho', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 22, 18, 9, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-02':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#FF8FA3"/><path d="M10 72 Q104 20 184 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 02</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE PINGUIM', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Cachecol Listrado', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 24, 8, 8, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-03':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#FF8FA3"/><path d="M15 73 Q106 20 181 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 03</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE URSO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Polar Gorro Fofo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 26, 18, 9, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-04':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#FF8FA3"/><path d="M20 74 Q108 20 178 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 04</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE BONECO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Neve Sorriso', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 28, 8, 8, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-05':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#FF8FA3"/><path d="M25 75 Q110 20 175 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 05</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE GATINHO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Caixa Presente', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 30, 18, 9, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-06':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#FF8FA3"/><path d="M30 76 Q112 20 172 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 06</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE ELFO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Oficina Brinquedos', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 32, 8, 8, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-07':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#FF8FA3"/><path d="M35 77 Q114 20 169 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 07</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE BISCOITO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Gengibre Kawaii', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 34, 18, 9, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-08':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#FF8FA3"/><path d="M40 78 Q116 20 166 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 08</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE TRENÓ', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Ursinhos Carinhosos', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 36, 8, 8, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-09':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#FF8FA3"/><path d="M45 79 Q118 20 163 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 09</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE ÁRVORE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Olhinhos Brilhantes', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 38, 18, 9, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'cute-10':
      return [
        createBg('#FFF5F5', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#FFF5F5"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#FF8FA3"/><path d="M50 70 Q120 20 160 60" stroke="#FF8FA3" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#FF8FA3" letter-spacing="1.2">CUTE 10</text></svg>`)}`, 0.18),
        createText({ text: 'CUTE PAPAI', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#FF8FA3', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Noel Baby Fofo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: '#111', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 40, 8, 8, '#FF8FA3'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'CUTE', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#FF8FA3', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Cute layers flattened
export const getAllCuteLayers = () =>
