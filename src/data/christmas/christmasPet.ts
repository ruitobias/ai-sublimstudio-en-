/**
 * christmasPet.ts | Pet - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasPet.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type PetTemplateId = 'pet-01' | 'pet-02' | 'pet-03' | 'pet-04' | 'pet-05' | 'pet-06' | 'pet-07' | 'pet-08' | 'pet-09' | 'pet-10';
 
export const petTemplates = [
  { id: 'pet-01', title: 'Pet Capivara Família Premium', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-02', title: 'Pet Capivara Gorro Noel Tropical', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-03', title: 'Pet Doguinho Presente Luxo', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-04', title: 'Pet Gatinho Lareira Aconchego', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-05', title: 'Pet Capivara Lagoa Natalina', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-06', title: 'Pet Patinhas Douradas Amor', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-07', title: 'Pet Melhor Amigo Noel', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-08', title: 'Pet Capivara Óculos Sol Festivo', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-09', title: 'Pet Família Completa Patas', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] },
  { id: 'pet-10', title: 'Pet Capivara Churrasco Natal', category: 'pet' as const, premium: true, tags: ['natal','pet','premium','sublistudio'] }
] as const;
 
export function getPetLayers(templateId: PetTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#2C1E13');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'pet-01':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#D4AF37"/><path d="M5 71 Q102 20 187 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 01</text></svg>`)}`, 0.18),
        createText({ text: 'PET CAPIVARA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Família Premium', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="30" cy="28" rx="22" ry="10" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="18" ry="12" fill="#A67C52"/><circle cx="22" cy="16" r="2" fill="#111"/><circle cx="38" cy="16" r="2" fill="#111"/><path d="M26 24 Q30 27 34 24" stroke="#111" fill="none" stroke-width="1"/><rect x="12" y="4" width="36" height="8" rx="4" fill="#C41E3A"/></svg>`, 132, 28, 46, 32, 12),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-02':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#D4AF37"/><path d="M10 72 Q104 20 184 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 02</text></svg>`)}`, 0.18),
        createText({ text: 'PET CAPIVARA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Gorro Noel Tropical', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="30" cy="28" rx="22" ry="10" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="18" ry="12" fill="#A67C52"/><circle cx="22" cy="16" r="2" fill="#111"/><circle cx="38" cy="16" r="2" fill="#111"/><path d="M26 24 Q30 27 34 24" stroke="#111" fill="none" stroke-width="1"/><rect x="12" y="4" width="36" height="8" rx="4" fill="#C41E3A"/></svg>`, 132, 28, 46, 32, 12),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-03':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#D4AF37"/><path d="M15 73 Q106 20 181 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 03</text></svg>`)}`, 0.18),
        createText({ text: 'PET DOGUINHO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Presente Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 26, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-04':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#D4AF37"/><path d="M20 74 Q108 20 178 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 04</text></svg>`)}`, 0.18),
        createText({ text: 'PET GATINHO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Lareira Aconchego', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 28, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-05':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#D4AF37"/><path d="M25 75 Q110 20 175 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 05</text></svg>`)}`, 0.18),
        createText({ text: 'PET CAPIVARA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Lagoa Natalina', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="30" cy="28" rx="22" ry="10" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="18" ry="12" fill="#A67C52"/><circle cx="22" cy="16" r="2" fill="#111"/><circle cx="38" cy="16" r="2" fill="#111"/><path d="M26 24 Q30 27 34 24" stroke="#111" fill="none" stroke-width="1"/><rect x="12" y="4" width="36" height="8" rx="4" fill="#C41E3A"/></svg>`, 132, 28, 46, 32, 12),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-06':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#D4AF37"/><path d="M30 76 Q112 20 172 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 06</text></svg>`)}`, 0.18),
        createText({ text: 'PET PATINHAS', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Douradas Amor', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 32, 8, 8, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-07':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#D4AF37"/><path d="M35 77 Q114 20 169 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 07</text></svg>`)}`, 0.18),
        createText({ text: 'PET MELHOR', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Amigo Noel', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 34, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-08':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#D4AF37"/><path d="M40 78 Q116 20 166 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 08</text></svg>`)}`, 0.18),
        createText({ text: 'PET CAPIVARA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Óculos Sol Festivo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="30" cy="28" rx="22" ry="10" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="18" ry="12" fill="#A67C52"/><circle cx="22" cy="16" r="2" fill="#111"/><circle cx="38" cy="16" r="2" fill="#111"/><path d="M26 24 Q30 27 34 24" stroke="#111" fill="none" stroke-width="1"/><rect x="12" y="4" width="36" height="8" rx="4" fill="#C41E3A"/></svg>`, 132, 28, 46, 32, 12),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-09':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#D4AF37"/><path d="M45 79 Q118 20 163 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 09</text></svg>`)}`, 0.18),
        createText({ text: 'PET FAMÍLIA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Completa Patas', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createOrnament(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L13.5 8.5 L20 9 L14.5 13.5 L16 20 L12 16 L8 20 L9.5 13.5 L4 9 L10.5 8.5 Z" fill="{{COLOR}}"/></svg>`, 38, 18, 9, '#D4AF37'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'pet-10':
      return [
        createBg('#2C1E13', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#2C1E13"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#D4AF37"/><path d="M50 70 Q120 20 160 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PET 10</text></svg>`)}`, 0.18),
        createText({ text: 'PET CAPIVARA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Churrasco Natal', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
              createImage(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="30" cy="28" rx="22" ry="10" fill="#8B5A2B"/><ellipse cx="30" cy="18" rx="18" ry="12" fill="#A67C52"/><circle cx="22" cy="16" r="2" fill="#111"/><circle cx="38" cy="16" r="2" fill="#111"/><path d="M26 24 Q30 27 34 24" stroke="#111" fill="none" stroke-width="1"/><rect x="12" y="4" width="36" height="8" rx="4" fill="#C41E3A"/></svg>`, 132, 28, 46, 32, 12),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    default:
      return [...base, border,
        createText({ text: 'PET', fontFamily: 'Playfair Display', fontSize: 14, fontWeight: 700, color: '#D4AF37', x: 20, y: 30, w: 160, align: 'center' })
      ];
  }
}
 
// Helper: get all Pet layers flattened
export const getAllPetLayers = () =>
