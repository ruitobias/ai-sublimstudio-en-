/**
 * christmasLuxury.ts | Luxury - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasLuxury.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type LuxuryTemplateId = 'luxury-01' | 'luxury-02' | 'luxury-03' | 'luxury-04' | 'luxury-05' | 'luxury-06' | 'luxury-07' | 'luxury-08' | 'luxury-09' | 'luxury-10';
 
export const luxuryTemplates = [
  { id: 'luxury-01', title: 'Luxury Preto Dourado Elegante', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-02', title: 'Luxury Champagne Brilho Festivo', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-03', title: 'Luxury Veludo Noir Cristal', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-04', title: 'Luxury Mármore Dourado Noel', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-05', title: 'Luxury Monograma Dourado', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-06', title: 'Luxury Black Tie Natal', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-07', title: 'Luxury Glamour Cristal Neve', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-08', title: 'Luxury Ouro Rosé Festivo', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-09', title: 'Luxury Seda Preta Laço Ouro', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] },
  { id: 'luxury-10', title: 'Luxury Alta Costura Festas', category: 'luxury' as const, premium: true, tags: ['natal','luxury','premium','sublistudio'] }
] as const;
 
export function getLuxuryLayers(templateId: LuxuryTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#111111');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'luxury-01':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#D4AF37"/><path d="M5 71 Q102 20 187 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 01</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY PRETO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourado Elegante', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 22, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-02':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#D4AF37"/><path d="M10 72 Q104 20 184 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 02</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY CHAMPAGNE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Brilho Festivo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 24, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-03':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#D4AF37"/><path d="M15 73 Q106 20 181 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 03</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY VELUDO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Noir Cristal', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 26, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-04':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#D4AF37"/><path d="M20 74 Q108 20 178 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 04</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY MÁRMORE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourado Noel', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 28, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-05':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#D4AF37"/><path d="M25 75 Q110 20 175 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 05</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY MONOGRAMA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourado', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 30, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-06':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#D4AF37"/><path d="M30 76 Q112 20 172 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 06</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY BLACK', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Tie Natal', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 32, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-07':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#D4AF37"/><path d="M35 77 Q114 20 169 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 07</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY GLAMOUR', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Cristal Neve', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 34, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-08':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#D4AF37"/><path d="M40 78 Q116 20 166 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 08</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY OURO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Rosé Festivo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 36, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-09':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#D4AF37"/><path d="M45 79 Q118 20 163 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 09</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY SEDA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Preta Laço Ouro', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 38, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'luxury-10':
      return [
        createBg('#111111', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#111111"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#D4AF37"/><path d="M50 70 Q120 20 160 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">LUXURY 10</text></svg>`)}`, 0.18),
        createText({ text: 'LUXURY ALTA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Costura Festas', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 40, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'LUXURY', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#D4AF37', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Luxury layers flattened
export const getAllLuxuryLayers = () =>
