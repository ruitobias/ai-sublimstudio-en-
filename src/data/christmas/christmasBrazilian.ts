/**
 * christmasBrazilian.ts | Brazilian - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasBrazilian.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type BrazilianTemplateId = 'brazilian-01' | 'brazilian-02' | 'brazilian-03' | 'brazilian-04' | 'brazilian-05' | 'brazilian-06' | 'brazilian-07' | 'brazilian-08' | 'brazilian-09' | 'brazilian-10';
 
export const brazilianTemplates = [
  { id: 'brazilian-01', title: 'Brazilian Tropical Capivara Praia', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-02', title: 'Brazilian Verão Dourado Coqueiros', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-03', title: 'Brazilian Samba Noel Tropical', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-04', title: 'Brazilian Capivara Biquíni Festivo', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-05', title: 'Brazilian Floresta Amazônica Luz', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-06', title: 'Brazilian Sol Brilha no Natal', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-07', title: 'Brazilian Rio Luzes Copacabana', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-08', title: 'Brazilian Capivara Caipirinha Luxo', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-09', title: 'Brazilian Folhagem Monstera Ouro', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] },
  { id: 'brazilian-10', title: 'Brazilian Carnaval Natalino Chic', category: 'brazilian' as const, premium: true, tags: ['natal','brazilian','premium','sublistudio'] }
] as const;
 
export function getBrazilianLayers(templateId: BrazilianTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#102A1A');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'brazilian-01':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#009B3A"/><path d="M5 71 Q102 20 187 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 01</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN TROPICAL', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Capivara Praia', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="30" cy="28" rx="22" ry="10" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="18" ry="12" fill="#A67C52"/><circle cx="22" cy="16" r="2" fill="#111"/><circle cx="38" cy="16" r="2" fill="#111"/><path d="M26 24 Q30 27 34 24" stroke="#111" fill="none" stroke-width="1"/><rect x="12" y="4" width="36" height="8" rx="4" fill="#C41E3A"/></svg>`, 132, 28, 46, 32, 12),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-02':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#009B3A"/><path d="M10 72 Q104 20 184 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 02</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN VERÃO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Dourado Coqueiros', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 24, 8, 8, '#009B3A'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-03':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#009B3A"/><path d="M15 73 Q106 20 181 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 03</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN SAMBA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Noel Tropical', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 26, 18, 9, '#009B3A'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-04':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#009B3A"/><path d="M20 74 Q108 20 178 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 04</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN CAPIVARA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Biquíni Festivo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="30" cy="28" rx="22" ry="10" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="18" ry="12" fill="#A67C52"/><circle cx="22" cy="16" r="2" fill="#111"/><circle cx="38" cy="16" r="2" fill="#111"/><path d="M26 24 Q30 27 34 24" stroke="#111" fill="none" stroke-width="1"/><rect x="12" y="4" width="36" height="8" rx="4" fill="#C41E3A"/></svg>`, 132, 28, 46, 32, 12),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-05':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#009B3A"/><path d="M25 75 Q110 20 175 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 05</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN FLORESTA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Amazônica Luz', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 30, 18, 9, '#009B3A'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-06':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#009B3A"/><path d="M30 76 Q112 20 172 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 06</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN SOL', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Brilha no Natal', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 32, 8, 8, '#009B3A'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-07':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#009B3A"/><path d="M35 77 Q114 20 169 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 07</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN RIO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Luzes Copacabana', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 34, 18, 9, '#009B3A'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-08':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#009B3A"/><path d="M40 78 Q116 20 166 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 08</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN CAPIVARA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Caipirinha Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="30" cy="28" rx="22" ry="10" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="18" ry="12" fill="#A67C52"/><circle cx="22" cy="16" r="2" fill="#111"/><circle cx="38" cy="16" r="2" fill="#111"/><path d="M26 24 Q30 27 34 24" stroke="#111" fill="none" stroke-width="1"/><rect x="12" y="4" width="36" height="8" rx="4" fill="#C41E3A"/></svg>`, 132, 28, 46, 32, 12),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-09':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#009B3A"/><path d="M45 79 Q118 20 163 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 09</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN FOLHAGEM', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Monstera Ouro', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 38, 18, 9, '#009B3A'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'brazilian-10':
      return [
        createBg('#102A1A', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#102A1A"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#009B3A"/><path d="M50 70 Q120 20 160 60" stroke="#009B3A" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#009B3A" letter-spacing="1.2">BRAZILIAN 10</text></svg>`)}`, 0.18),
        createText({ text: 'BRAZILIAN CARNAVAL', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#009B3A', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Natalino Chic', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 40, 8, 8, '#009B3A'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'BRAZILIAN', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#009B3A', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Brazilian layers flattened
export const getAllBrazilianLayers = () =>
