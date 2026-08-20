/**
 * christmasPhoto.ts | Photo - 10 Templates Premium
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasPhoto.ts
 */
 
import { TemplateLayer, createBg, createText, createImage, createPhoto, createOrnament, svgDataUri } from './christmasElements';
import { getBaseFestiveLayers, createGoldenBorder } from './christmasLayers';
 
export type PhotoTemplateId = 'photo-01' | 'photo-02' | 'photo-03' | 'photo-04' | 'photo-05' | 'photo-06' | 'photo-07' | 'photo-08' | 'photo-09' | 'photo-10';
 
export const photoTemplates = [
  { id: 'photo-01', title: 'Photo Polaroid Moldura Dourada', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-02', title: 'Photo Filme Analógico Granulado', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-03', title: 'Photo Grade 9 Fotos Memória', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-04', title: 'Photo Coração Fotos Família', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-05', title: 'Photo Letreiro Neon 2024', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-06', title: 'Photo Sombra Suave Estúdio', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-07', title: 'Photo Bordas Rasgadas Vintage', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-08', title: 'Photo Dupla Exposição Neve', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-09', title: 'Photo Moldura Instax Premium', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] },
  { id: 'photo-10', title: 'Photo Colagem Editorial Luxo', category: 'photo' as const, premium: true, tags: ['natal','photo','premium','sublistudio'] }
] as const;
 
export function getPhotoLayers(templateId: PhotoTemplateId): TemplateLayer[] {
  const base = getBaseFestiveLayers('#1C1C1C');
  const border = createGoldenBorder();
 
  switch (templateId) {
    case 'photo-01':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="32" cy="20" r="5" fill="#D4AF37"/><path d="M5 71 Q102 20 187 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 01</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO POLAROID', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Moldura Dourada', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-02':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="44" cy="20" r="6" fill="#D4AF37"/><path d="M10 72 Q104 20 184 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 02</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO FILME', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Analógico Granulado', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-03':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="56" cy="20" r="4" fill="#D4AF37"/><path d="M15 73 Q106 20 181 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 03</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO GRADE', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: '9 Fotos Memória', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-04':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="68" cy="20" r="5" fill="#D4AF37"/><path d="M20 74 Q108 20 178 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 04</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO CORAÇÃO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Fotos Família', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-05':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="80" cy="20" r="6" fill="#D4AF37"/><path d="M25 75 Q110 20 175 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 05</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO LETREIRO', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Neon 2024', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-06':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="92" cy="20" r="4" fill="#D4AF37"/><path d="M30 76 Q112 20 172 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 06</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO SOMBRA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Suave Estúdio', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-07':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="104" cy="20" r="5" fill="#D4AF37"/><path d="M35 77 Q114 20 169 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 07</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO BORDAS', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Rasgadas Vintage', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-08':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="116" cy="20" r="6" fill="#D4AF37"/><path d="M40 78 Q116 20 166 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 08</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO DUPLA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Exposição Neve', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-09':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="128" cy="20" r="4" fill="#D4AF37"/><path d="M45 79 Q118 20 163 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 09</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO MOLDURA', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Instax Premium', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
      ];
    case 'photo-10':
      return [
        createBg('#1C1C1C', `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="95"><rect width="200" height="95" fill="#1C1C1C"/><g opacity="0.2"><circle cx="140" cy="20" r="5" fill="#D4AF37"/><path d="M50 70 Q120 20 160 60" stroke="#D4AF37" fill="none" stroke-width="0.6"/></g><text x="100" y="52" text-anchor="middle" font-family="Playfair Display" font-size="9" fill="#D4AF37" letter-spacing="1.2">PHOTO 10</text></svg>`)}`, 0.18),
        createText({ text: 'PHOTO COLAGEM', fontFamily: 'Playfair Display', fontSize: 13, fontWeight: 700, color: '#D4AF37', x: 12, y: 12, w: 120, letterSpacing: 0.8 }),
        createText({ text: 'Editorial Luxo', fontFamily: 'JetBrains Mono', fontSize: 5.5, fontWeight: 400, color: 'rgba(255,255,255,0.85)', x: 12, y: 34, w: 100, lineHeight: 1.2 }),
        createPhoto('family-${idx}', 112, 12, 28, 28, 'polaroid'),
        createPhoto('family-${idx}-2', 148, 18, 22, 22, 'circle'),
        createText({ text: 'dibiTECh®', fontFamily: 'JetBrains Mono', fontSize: 3.2, fontWeight: 600, color: 'rgba(212,175,55,0.6)', x: 12, y: 82, w: 50 }),
