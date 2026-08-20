import { Layer } from '../types';
export * from './christmasTemplates';
import { CHRISTMAS_CANVA_TEMPLATES } from './christmasTemplates';
export * from './fathersDayTemplates';
import { FATHERS_DAY_CANVA_TEMPLATES } from './fathersDayTemplates';
export * from './mothersDayTemplates';
import { MOTHERS_DAY_CANVA_TEMPLATES } from './mothersDayTemplates';

// Curated and expansive library of Canva sublimation templates including exact models from Canva showcase
export interface CanvaTemplateItem {
  id: string;
  title: string;
  category: 'mugs' | 'tshirts' | 'mothers' | 'fathers' | 'branding' | 'gamer' | 'pets' | 'faith' | 'christmas' | 'general';
  categoryLabel: string;
  previewUrl: string;
  embedUrl?: string;
  viewUrl?: string;
  templateUrl?: string;
  widthMm: number;
  heightMm: number;
  tags: string[];
  description: string;
  author: string;
  isBlank?: boolean;
}

// Vector SVG Data URIs matching the exact Canva showcase from the user screenshot
export const CANVA_PAIZAO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" width="800" height="380">
  <defs>
    <linearGradient id="paizaoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f0f4f8" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.15" />
    </filter>
  </defs>
  <rect width="800" height="380" fill="url(#paizaoBg)" />

  <!-- Speed / Movement lines -->
  <g stroke="#00BAFF" stroke-width="4" stroke-linecap="round" opacity="0.8">
    <line x1="330" y1="280" x2="430" y2="280" />
    <line x1="350" y1="295" x2="410" y2="295" />
    <line x1="320" y1="310" x2="380" y2="310" />
  </g>

  <!-- Polaroid Frame & Photo -->
  <g transform="translate(90, 45) rotate(-7)" filter="url(#shadow)">
    <!-- White Card Background -->
    <rect width="210" height="260" rx="4" fill="#ffffff" stroke="#000000" stroke-width="3.5" />
    <!-- Photo Area -->
    <rect x="14" y="14" width="182" height="190" fill="#2d3748" rx="2" />
    <!-- Dad and Son Silhouette Illustration in photo -->
    <circle cx="85" cy="80" r="28" fill="#e2e8f0" />
    <path d="M 40 160 C 40 120 70 115 85 115 C 100 115 130 120 130 160 Z" fill="#e2e8f0" />
    <circle cx="135" cy="105" r="18" fill="#cbd5e0" />
    <path d="M 105 170 C 105 140 125 135 135 135 C 145 135 165 140 165 170 Z" fill="#cbd5e0" />
    <!-- Soccer Ball -->
    <circle cx="155" cy="180" r="14" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <polygon points="155,173 150,177 152,183 158,183 160,177" fill="#000000" />
    <text x="105" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="bold" fill="#1a202c" text-anchor="middle">Melhores Momentos</text>
  </g>

  <!-- Championship Trophy -->
  <g transform="translate(15, 185) rotate(-15)">
    <!-- Cup Base -->
    <polygon points="65,140 115,140 110,120 70,120" fill="#2d3748" stroke="#000000" stroke-width="3" />
    <rect x="80" y="95" width="20" height="25" fill="#d97706" stroke="#000000" stroke-width="3" />
    <!-- Cup Bowl -->
    <path d="M 50 20 C 50 85 80 95 90 95 C 100 95 130 85 130 20 Z" fill="#FFC41C" stroke="#000000" stroke-width="3" />
    <!-- Handles -->
    <path d="M 50 30 C 25 30 25 70 55 75" fill="none" stroke="#FFC41C" stroke-width="8" stroke-linecap="round" />
    <path d="M 50 30 C 25 30 25 70 55 75" fill="none" stroke="#000000" stroke-width="3" />
    <path d="M 130 30 C 155 30 155 70 125 75" fill="none" stroke="#FFC41C" stroke-width="8" stroke-linecap="round" />
    <path d="M 130 30 C 155 30 155 70 125 75" fill="none" stroke="#000000" stroke-width="3" />
    <!-- Trophy Star -->
    <polygon points="90,40 94,52 106,52 96,60 100,72 90,64 80,72 84,60 74,52 86,52" fill="#ffffff" />
  </g>

  <!-- Stars -->
  <!-- Top Left Star -->
  <polygon points="45,35 49,47 61,47 51,55 55,67 45,59 35,67 39,55 29,47 41,47" fill="#FFC41C" stroke="#000000" stroke-width="2" />
  <!-- Center Star -->
  <polygon points="560,55 564,67 576,67 566,75 570,87 560,79 550,87 554,75 544,67 556,67" fill="#FFC41C" stroke="#000000" stroke-width="2" />
  <!-- Cyan Star Bottom -->
  <polygon points="460,260 464,272 476,272 466,280 470,292 460,284 450,292 454,280 444,272 456,272" fill="#00BAFF" stroke="#000000" stroke-width="2" />

  <!-- Big Text "Pai" -->
  <text x="440" y="160" font-family="'Impact', 'Arial Black', sans-serif" font-size="115" font-weight="900" fill="#0171D3" stroke="#000000" stroke-width="8" paint-order="stroke fill">Pai</text>

  <!-- Big Text "zão" -->
  <text x="510" y="245" font-family="'Impact', 'Arial Black', sans-serif" font-size="115" font-weight="900" fill="#FFC41C" stroke="#000000" stroke-width="8" paint-order="stroke fill">zão</text>

  <!-- Text "Nº 1" Badge -->
  <g transform="translate(680, 80) rotate(18)">
    <circle cx="20" cy="20" r="38" fill="#FFC41C" stroke="#000000" stroke-width="4" />
    <text x="20" y="32" font-family="'Impact', 'Arial Black', sans-serif" font-size="44" font-weight="900" fill="#ffffff" stroke="#000000" stroke-width="3" text-anchor="middle" paint-order="stroke fill">Nº1</text>
  </g>

  <!-- Subtitle -->
  <text x="550" y="315" font-family="'Plus Jakarta Sans', 'Montserrat', sans-serif" font-size="16" font-weight="900" letter-spacing="3" fill="#1a202c" text-anchor="middle">★ CAMPEÃO DO MEU CORAÇÃO ★</text>
</svg>
`)}`;

export const PAIZAO_TROPHY_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <g transform="translate(20, 10)">
    <polygon points="65,150 115,150 110,130 70,130" fill="#2d3748" stroke="#000000" stroke-width="4" />
    <rect x="80" y="100" width="20" height="30" fill="#d97706" stroke="#000000" stroke-width="4" />
    <path d="M 45 20 C 45 90 75 100 90 100 C 105 100 135 90 135 20 Z" fill="#FFC41C" stroke="#000000" stroke-width="4" />
    <path d="M 45 30 C 15 30 15 75 50 80" fill="none" stroke="#FFC41C" stroke-width="10" stroke-linecap="round" />
    <path d="M 45 30 C 15 30 15 75 50 80" fill="none" stroke="#000000" stroke-width="4" />
    <path d="M 135 30 C 165 30 165 75 130 80" fill="none" stroke="#FFC41C" stroke-width="10" stroke-linecap="round" />
    <path d="M 135 30 C 165 30 165 75 130 80" fill="none" stroke="#000000" stroke-width="4" />
    <polygon points="90,40 94,52 106,52 96,60 100,72 90,64 80,72 84,60 74,52 86,52" fill="#ffffff" stroke="#d97706" stroke-width="1.5" />
  </g>
</svg>
`)}`;

export const PAIZAO_LINES_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" width="150" height="150">
  <g stroke="#00BAFF" stroke-width="5" stroke-linecap="round" opacity="0.9">
    <line x1="10" y1="30" x2="130" y2="30" />
    <line x1="30" y1="60" x2="110" y2="60" />
    <line x1="15" y1="90" x2="85" y2="90" />
  </g>
</svg>
`)}`;

export const CANVA_LION_SHIELD_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect width="800" height="800" fill="#f8fafc"/>
  <!-- Grunge splash effect -->
  <g fill="#0f172a" opacity="0.85">
    <circle cx="280" cy="180" r="4" /><circle cx="320" cy="150" r="2.5" /><circle cx="260" cy="220" r="3.5" />
    <circle cx="340" cy="200" r="5" /><circle cx="230" cy="190" r="2" /><circle cx="500" cy="160" r="3" />
    <circle cx="530" cy="190" r="4.5" /><circle cx="480" cy="220" r="3" /><circle cx="390" cy="130" r="2" />
    <path d="M 220 250 Q 240 230 260 260 T 300 240 Q 320 270 350 250 Q 380 230 400 260 Q 420 240 450 270 Q 480 230 520 260 Q 560 240 580 280 Q 540 290 500 280 Q 450 290 400 280 Q 350 290 300 280 Z" opacity="0.12"/>
  </g>
  <!-- Top Right Shield -->
  <g transform="translate(510, 160) scale(0.65)">
    <path d="M 50 10 Q 100 10 110 30 C 110 90 90 140 50 170 C 10 140 -10 90 -10 30 Q 0 10 50 10 Z" fill="#0f172a"/>
    <path d="M 50 35 Q 65 35 70 50 Q 75 60 70 70 Q 60 75 55 85 Q 50 95 45 85 Q 40 75 30 70 Q 25 60 30 50 Q 35 35 50 35 Z" fill="#f8fafc"/>
  </g>
  <!-- Tribal Lion Head -->
  <g transform="translate(400, 480) scale(1.35)" fill="#0f172a">
    <path d="M 0 -130 C 20 -120 40 -100 50 -80 C 70 -100 90 -90 100 -70 C 110 -50 110 -30 120 -10 C 130 20 120 50 110 80 C 100 100 80 120 60 130 C 40 140 20 145 0 148 C -20 145 -40 140 -60 130 C -80 120 -100 100 -110 80 C -120 50 -130 20 -120 -10 C -110 -30 -110 -50 -100 -70 C -90 -90 -70 -100 -50 -80 C -40 -100 -20 -120 0 -130 Z M 0 -80 C 15 -60 25 -40 25 -20 C 35 -35 50 -35 60 -20 C 70 -5 70 15 65 35 C 55 55 40 70 25 80 C 10 85 0 88 0 88 C 0 88 -10 85 -25 80 C -40 70 -55 55 -65 35 C -70 15 -70 -5 -60 -20 C -50 -35 -35 -35 -25 -20 C -25 -40 -15 -60 0 -80 Z"/>
    <path d="M -30 -20 L -15 -15 L -25 -5 Z M 30 -20 L 15 -15 L 25 -5 Z" fill="#f8fafc"/>
    <polygon points="0,20 -12,5 12,5" fill="#f8fafc"/>
    <path d="M -12 5 Q 0 18 12 5 L 0 35 Z" fill="#0f172a"/>
  </g>
  <text x="400" y="730" font-family="'Montserrat', sans-serif" font-size="24" font-weight="900" letter-spacing="6" text-anchor="middle" fill="#0f172a">URBAN WILD • STREETWEAR</text>
</svg>
`)}`;

export const CANVA_CHERRY_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect width="800" height="800" fill="#fff9f9"/>
  <!-- Sparkles -->
  <g fill="#ff4d6d">
    <path d="M 210 270 Q 220 270 220 260 Q 220 270 230 270 Q 220 270 220 280 Q 220 270 210 270 Z"/>
    <path d="M 590 310 Q 600 310 600 300 Q 600 310 610 310 Q 600 310 600 320 Q 600 310 590 310 Z"/>
    <path d="M 250 560 Q 260 560 260 550 Q 260 560 270 560 Q 260 560 260 570 Q 260 560 250 560 Z"/>
    <path d="M 560 570 Q 570 570 570 560 Q 570 570 580 570 Q 570 570 570 580 Q 570 570 560 570 Z"/>
  </g>
  <!-- Arched Text: VOCÊ É A CEREJA -->
  <defs>
    <path id="cherryCurve" d="M 180 340 A 240 240 0 0 1 620 340" />
  </defs>
  <text fill="#d90429" font-family="'Arial Black', 'Impact', sans-serif" font-size="44" font-weight="900" letter-spacing="3">
    <textPath href="#cherryCurve" startOffset="50%" text-anchor="middle">
      VOCÊ É A CEREJA
    </textPath>
  </text>
  <!-- Stems & Leaves -->
  <g stroke="#2b9348" stroke-width="12" stroke-linecap="round" fill="none">
    <path d="M 400 390 Q 360 440 340 500" />
    <path d="M 400 390 Q 430 430 460 490" />
  </g>
  <path d="M 400 390 C 440 360 480 380 470 410 C 440 420 410 400 400 390 Z" fill="#55a630"/>
  <!-- Cherries -->
  <circle cx="340" cy="520" r="65" fill="#d90429"/>
  <ellipse cx="320" cy="495" rx="18" ry="10" transform="rotate(-30 320 495)" fill="#ffffff" opacity="0.8"/>
  <circle cx="460" cy="510" r="60" fill="#ef233c"/>
  <ellipse cx="445" cy="490" rx="16" ry="8" transform="rotate(-30 445 490)" fill="#ffffff" opacity="0.8"/>
  <text x="400" y="660" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="28" font-weight="bold" text-anchor="middle" fill="#d90429">do meu bolo ♡</text>
</svg>
`)}`;

export const CANVA_ILUMINADO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect width="800" height="800" fill="#0b0b0e"/>
  <!-- Sunburst lines -->
  <g stroke="#e63946" stroke-width="2" opacity="0.35">
    <line x1="400" y1="200" x2="400" y2="80"/>
    <line x1="400" y1="200" x2="320" y2="95"/>
    <line x1="400" y1="200" x2="480" y2="95"/>
    <line x1="400" y1="200" x2="250" y2="130"/>
    <line x1="400" y1="200" x2="550" y2="130"/>
    <line x1="400" y1="200" x2="190" y2="190"/>
    <line x1="400" y1="200" x2="610" y2="190"/>
  </g>
  <!-- Red frame -->
  <rect x="230" y="220" width="340" height="80" fill="none" stroke="#e63946" stroke-width="3"/>
  <!-- Gothic text stacked -->
  <text x="400" y="275" font-family="'Cinzel', 'Times New Roman', serif" font-size="52" font-weight="900" text-anchor="middle" fill="#e63946" letter-spacing="2">Iluminado</text>
  <text x="400" y="340" font-family="'Cinzel', 'Times New Roman', serif" font-size="50" font-weight="900" text-anchor="middle" fill="#e63946" opacity="0.5" letter-spacing="2">Iluminado</text>
  <text x="400" y="400" font-family="'Cinzel', 'Times New Roman', serif" font-size="50" font-weight="900" text-anchor="middle" fill="#e63946" opacity="0.25" letter-spacing="2">Iluminado</text>
  <!-- Angel Statue -->
  <g transform="translate(400, 520) scale(1.15)">
    <path d="M 0 -80 C -60 -180 -160 -190 -190 -120 C -200 -80 -180 0 -130 50 C -90 90 -40 100 0 110 C 40 100 90 90 130 50 C 180 0 200 -80 190 -120 C 160 -190 60 -180 0 -80 Z" fill="#4a4e69" opacity="0.9"/>
    <path d="M -10 -70 C -50 -150 -130 -160 -160 -100 C -170 -60 -150 0 -100 40 C -70 70 -30 80 0 90 C 30 80 70 70 100 40 C 150 0 170 -60 160 -100 C 130 -160 50 -150 10 -70 Z" fill="#9a8c98"/>
    <path d="M 0 -80 C -15 -80 -25 -70 -25 -55 C -25 -40 -15 -35 -15 -20 C -25 0 -40 30 -35 80 C -30 110 -15 130 0 140 C 15 130 30 110 35 80 C 40 30 25 0 15 -20 C 15 -35 25 -40 25 -55 C 25 -70 15 -80 0 -80 Z" fill="#f2e9e4"/>
    <ellipse cx="0" cy="-60" rx="14" ry="18" fill="#f2e9e4"/>
  </g>
  <text x="400" y="740" font-family="'Cinzel', Georgia, serif" font-size="16" letter-spacing="6" text-anchor="middle" fill="#9a8c98">ARCHANGEL • HEAVEN & EARTH</text>
</svg>
`)}`;

export const CANVA_BLANK_TSHIRT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect width="800" height="800" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="4" stroke-dasharray="12,12"/>
  <circle cx="400" cy="380" r="70" fill="#ffffff" stroke="#94a3b8" stroke-width="4"/>
  <line x1="400" y1="340" x2="400" y2="420" stroke="#00c4cc" stroke-width="8" stroke-linecap="round"/>
  <line x1="360" y1="380" x2="440" y2="380" stroke="#00c4cc" stroke-width="8" stroke-linecap="round"/>
  <text x="400" y="510" font-family="'Montserrat', sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="#334155">Criar do Zero</text>
  <text x="400" y="550" font-family="'Montserrat', sans-serif" font-size="18" text-anchor="middle" fill="#64748b">Gabarito Personalizado de Camiseta</text>
</svg>
`)}`;

export const CANVA_GRATIDAO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" width="800" height="380">
  <rect width="800" height="380" fill="#efede9"/>
  <!-- Decorative background stripes -->
  <g opacity="0.2" stroke="#cfc7bc" stroke-width="4" stroke-linecap="round">
    <line x1="40" y1="20" x2="40" y2="360" />
    <line x1="75" y1="35" x2="75" y2="345" />
    <line x1="725" y1="35" x2="725" y2="345" />
    <line x1="760" y1="20" x2="760" y2="360" />
  </g>
  <!-- Center Watercolor Splash Element -->
  <ellipse cx="400" cy="120" rx="165" ry="48" fill="#e2d6c9" opacity="0.65" />
  <!-- Floral Elements -->
  <g stroke="#606c38" stroke-width="2.5" fill="none">
    <path d="M 0 0 Q 50 60 90 120" />
    <path d="M 800 0 Q 750 60 710 120" />
    <path d="M 120 380 Q 180 320 220 280" />
    <path d="M 680 380 Q 620 320 580 280" />
  </g>
  <g fill="#c97a7e" opacity="0.95">
    <circle cx="90" cy="120" r="14" /><circle cx="65" cy="80" r="11" /><circle cx="40" cy="40" r="9" />
    <circle cx="710" cy="120" r="14" /><circle cx="735" cy="80" r="11" /><circle cx="760" cy="40" r="9" />
  </g>
  <!-- Butterflies -->
  <g fill="#e76f51">
    <path d="M 580 80 C 595 65 615 75 605 90 C 615 105 595 115 580 100 C 565 115 545 105 555 90 C 545 75 565 65 580 80 Z" />
    <path d="M 65 170 C 78 158 92 165 85 178 C 92 190 78 198 65 186 C 52 198 38 190 45 178 C 38 165 52 158 65 170 Z" />
  </g>
  <!-- Daisies -->
  <g fill="#ffffff" stroke="#f4a261" stroke-width="1.5">
    <circle cx="400" cy="320" r="16" />
    <circle cx="400" cy="320" r="7" fill="#e9c46a" stroke="none" />
  </g>
  <!-- Doodle Hearts -->
  <path d="M 485 75 C 485 70 490 65 495 70 C 500 65 505 70 505 75 C 505 82 495 90 495 90 C 495 90 485 82 485 75 Z" fill="#b5838d" />
  <!-- Main Title: Gratidão -->
  <text x="400" y="140" font-family="'Playfair Display', Georgia, serif" font-size="58" font-weight="bold" text-anchor="middle" fill="#111111" letter-spacing="1">Gratidão</text>
  <!-- Subtitle Text -->
  <text x="400" y="215" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="19" text-anchor="middle" fill="#222222">a Deus por cada detalhe,</text>
  <text x="400" y="245" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="19" text-anchor="middle" fill="#222222">até os que eu não entendo agora.</text>
</svg>
`)}`;

// 1b. Featured Canva Pro Design by Rui Tobias Carvalho (DAHSwyjx7Qw)
export const CANVA_RUI_TOBIAS_DAHSWYJX7QW_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" width="800" height="380">
  <defs>
    <linearGradient id="bgGradRui" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf6f0" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f5efe6" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37" />
      <stop offset="50%" stop-color="#f3e5ab" />
      <stop offset="100%" stop-color="#aa771c" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="380" fill="url(#bgGradRui)" />
  <!-- Elegant Border Frame -->
  <rect x="20" y="20" width="760" height="340" rx="12" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6" />
  <rect x="28" y="28" width="744" height="324" rx="8" fill="none" stroke="#606c38" stroke-width="1" stroke-dasharray="6,4" opacity="0.4" />
  <!-- Watercolor Wash -->
  <ellipse cx="400" cy="190" rx="220" ry="110" fill="#e8dfd8" opacity="0.55" />
  <!-- Left Polaroid Frame for Photo -->
  <g transform="translate(90, 60) rotate(-6)">
    <rect width="180" height="220" rx="4" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
    <rect x="12" y="12" width="156" height="156" fill="#f3f4f6" />
    <text x="90" y="95" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="bold" fill="#9ca3af" text-anchor="middle">Sua Foto Aqui</text>
    <text x="90" y="198" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="13" fill="#4b5563" text-anchor="middle">Momento Especial</text>
  </g>
  <!-- Botanical & Floral Arches -->
  <g stroke="#606c38" stroke-width="2" fill="none" opacity="0.85">
    <path d="M 500 80 Q 560 60 620 110" />
    <path d="M 540 280 Q 600 320 680 290" />
  </g>
  <g fill="#c97a7e" opacity="0.9">
    <circle cx="620" cy="110" r="10" />
    <circle cx="590" cy="85" r="8" />
    <circle cx="560" cy="70" r="6" />
  </g>
  <!-- Butterfly -->
  <g fill="#d4af37" opacity="0.9" transform="translate(680, 70)">
    <path d="M 0 0 C 15 -15 35 -5 25 10 C 35 25 15 35 0 20 C -15 35 -35 25 -25 10 C -35 -5 -15 -15 0 0 Z" />
  </g>
  <!-- Center / Right Lettering -->
  <text x="520" y="160" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="bold" fill="#1f2937" text-anchor="middle">Design Especial</text>
  <text x="520" y="205" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="20" fill="#4b5563" text-anchor="middle">Feito com carinho para você</text>
  <!-- Author Attribution -->
  <text x="520" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="bold" fill="#d4af37" text-anchor="middle" letter-spacing="2">RUI TOBIAS CARVALHO • CANVA PRO</text>
</svg>
`)}`;

// 1c. Official Canva Template: Feliz Natal • Bolas & Estrelas Douradas
export const CHRISTMAS_BAUBLE_RED_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300">
  <defs>
    <radialGradient id="redBaubleGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ff6b6b" />
      <stop offset="35%" stop-color="#d90429" />
      <stop offset="70%" stop-color="#900c1e" />
      <stop offset="100%" stop-color="#4a000b" />
    </radialGradient>
    <linearGradient id="goldCapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#aa771c" />
      <stop offset="50%" stop-color="#f3e5ab" />
      <stop offset="100%" stop-color="#d4af37" />
    </linearGradient>
  </defs>
  <!-- Hanging Ribbon / String -->
  <line x1="100" y1="0" x2="100" y2="40" stroke="#d4af37" stroke-width="2.5" stroke-dasharray="3,2" />
  <!-- Golden Ring -->
  <circle cx="100" cy="40" r="8" fill="none" stroke="url(#goldCapGrad)" stroke-width="3" />
  <!-- Golden Cap -->
  <path d="M 82 48 Q 100 44 118 48 L 115 62 Q 100 60 85 62 Z" fill="url(#goldCapGrad)" stroke="#aa771c" stroke-width="1" />
  <!-- Bauble Body (Sphere) -->
  <circle cx="100" cy="150" r="88" fill="url(#redBaubleGrad)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.35))" />
  <!-- Detailed Texture Flurries / Glitter Ornaments -->
  <g stroke="#ffffff" stroke-width="1.2" opacity="0.45" fill="none">
    <path d="M 40 130 Q 100 110 160 130" />
    <path d="M 30 150 Q 100 130 170 150" stroke-width="2" stroke-dasharray="6,4" />
    <path d="M 40 170 Q 100 150 160 170" />
  </g>
  <!-- Specular Reflection / Highlight -->
  <ellipse cx="68" cy="115" rx="28" ry="18" transform="rotate(-30 68 115)" fill="#ffffff" opacity="0.65" />
  <circle cx="56" cy="100" r="7" fill="#ffffff" opacity="0.85" />
</svg>
`)}`;

export const CHRISTMAS_BALL_GOLD_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 320" width="260" height="320">
  <defs>
    <radialGradient id="goldBallGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fff8db" />
      <stop offset="25%" stop-color="#fadb68" />
      <stop offset="60%" stop-color="#c99718" />
      <stop offset="90%" stop-color="#805b00" />
      <stop offset="100%" stop-color="#402b00" />
    </radialGradient>
    <linearGradient id="goldBallCap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#aa771c" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#d4af37" />
    </linearGradient>
  </defs>
  <!-- Hanging Loop -->
  <line x1="130" y1="0" x2="130" y2="40" stroke="#fadb68" stroke-width="2.5" />
  <circle cx="130" cy="40" r="10" fill="none" stroke="url(#goldBallCap)" stroke-width="3" />
  <!-- Cap -->
  <path d="M 110 48 Q 130 44 150 48 L 146 64 Q 130 62 114 64 Z" fill="url(#goldBallCap)" />
  <!-- Spherical Ball -->
  <circle cx="130" cy="170" r="105" fill="url(#goldBallGrad)" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.3))" />
  <!-- Geometric Snowflake & Star Texture Pattern -->
  <g fill="#ffffff" opacity="0.35">
    <circle cx="130" cy="170" r="8" />
    <polygon points="130,135 133,148 146,148 135,156 139,169 130,161 121,169 125,156 114,148 127,148" />
    <polygon points="85,160 87,168 95,168 89,173 91,181 85,176 79,181 81,173 75,168 83,168" />
    <polygon points="175,160 177,168 185,168 179,173 181,181 175,176 169,181 171,173 165,168 173,168" />
  </g>
  <!-- Specular Glow -->
  <ellipse cx="90" cy="125" rx="36" ry="22" transform="rotate(-35 90 125)" fill="#ffffff" opacity="0.7" />
  <circle cx="78" cy="108" r="8" fill="#ffffff" opacity="0.9" />
</svg>
`)}`;

export const CHRISTMAS_DIVIDER_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 30" width="210" height="30">
  <g stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))">
    <path d="M 10 15 Q 40 8 75 15 T 100 15" />
    <path d="M 110 15 Q 145 22 180 15 T 200 15" />
    <!-- Center Diamond & Swirls -->
    <polygon points="105,8 110,15 105,22 100,15" fill="#ffffff" stroke="none" />
    <circle cx="85" cy="15" r="2.5" fill="#ffffff" stroke="none" />
    <circle cx="125" cy="15" r="2.5" fill="#ffffff" stroke="none" />
  </g>
</svg>
`)}`;

export const CHRISTMAS_STAR_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <g filter="drop-shadow(0 2px 6px rgba(255,215,0,0.6))">
    <path d="M 20 0 Q 20 20 40 20 Q 20 20 20 40 Q 20 20 0 20 Q 20 20 20 0 Z" fill="#ffd700" />
    <circle cx="20" cy="20" r="5" fill="#ffffff" />
  </g>
</svg>
`)}`;

export const CHRISTMAS_RAYS_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100" width="50" height="100">
  <g stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.9" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
    <line x1="25" y1="10" x2="25" y2="40" stroke-width="3" />
    <line x1="12" y1="18" x2="20" y2="42" />
    <line x1="38" y1="18" x2="30" y2="42" />
    <line x1="5" y1="30" x2="16" y2="46" />
    <line x1="45" y1="30" x2="34" y2="46" />
  </g>
</svg>
`)}`;

export const CANVA_FELIZ_NATAL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="natalBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#faf8f5" />
      <stop offset="100%" stop-color="#f3ede2" />
    </linearGradient>
    <radialGradient id="natalCenterGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8e7" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <filter id="natalShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Clean Background -->
  <rect width="756" height="359" fill="url(#natalBgGrad)" />
  <circle cx="378" cy="180" r="220" fill="url(#natalCenterGlow)" />

  <!-- Hanging Christmas Baubles (Red) -->
  <!-- Top Right Bauble -->
  <g transform="translate(374, -47) rotate(18.6)">
    <circle cx="100" cy="150" r="75" fill="#d90429" filter="url(#natalShadow)" />
    <ellipse cx="75" cy="120" rx="22" ry="14" transform="rotate(-30 75 120)" fill="#ffffff" opacity="0.6" />
  </g>
  <!-- Top Left Bauble -->
  <g transform="translate(-113, -102) rotate(44.1)">
    <circle cx="100" cy="150" r="75" fill="#d90429" filter="url(#natalShadow)" />
    <ellipse cx="75" cy="120" rx="22" ry="14" transform="rotate(-30 75 120)" fill="#ffffff" opacity="0.6" />
  </g>
  <!-- Far Right Bauble -->
  <g transform="translate(681, 60) rotate(18.6)">
    <circle cx="100" cy="150" r="75" fill="#d90429" filter="url(#natalShadow)" />
  </g>
  <!-- Center Left Bauble -->
  <g transform="translate(117, 120) rotate(44.1)">
    <circle cx="105" cy="155" r="80" fill="#d90429" filter="url(#natalShadow)" />
    <ellipse cx="80" cy="125" rx="24" ry="16" transform="rotate(-30 80 125)" fill="#ffffff" opacity="0.65" />
  </g>

  <!-- Textured Gold Balls -->
  <!-- Mid Right Gold Ball -->
  <g transform="translate(467, 101) rotate(29.3)">
    <circle cx="130" cy="160" r="85" fill="#fadb68" stroke="#aa771c" stroke-width="2" filter="url(#natalShadow)" />
    <ellipse cx="100" cy="125" rx="28" ry="18" transform="rotate(-35 100 125)" fill="#ffffff" opacity="0.7" />
  </g>
  <!-- Mid Left Gold Ball -->
  <g transform="translate(-101, 84) rotate(54.8)">
    <circle cx="130" cy="160" r="85" fill="#fadb68" stroke="#aa771c" stroke-width="2" filter="url(#natalShadow)" />
  </g>
  <!-- Top Center Gold Ball -->
  <g transform="translate(76, -109) rotate(-124.5)">
    <circle cx="130" cy="160" r="85" fill="#fadb68" filter="url(#natalShadow)" />
  </g>

  <!-- Center Festive Badge / Ribbon / Tree Frame -->
  <g transform="translate(184, 26)">
    <!-- Elegant Red & Gold Central Badge -->
    <path d="M 70 80 Q 194 40 318 80 Q 360 260 194 360 Q 28 260 70 80 Z" fill="#990000" stroke="#ffd700" stroke-width="4" filter="url(#natalShadow)" />
    <path d="M 85 95 Q 194 60 303 95 Q 340 245 194 335 Q 48 245 85 95 Z" fill="#b30000" opacity="0.9" />
  </g>

  <!-- Organic Star Top -->
  <g transform="translate(360, 1)">
    <path d="M 18 0 Q 18 18 36 18 Q 18 18 18 36 Q 18 18 0 18 Q 18 18 18 0 Z" fill="#ffd700" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
    <circle cx="18" cy="18" r="4" fill="#ffffff" />
  </g>

  <!-- Sun Rays -->
  <g transform="translate(353, 87) rotate(90)" stroke="#ffd700" stroke-width="3" stroke-linecap="round">
    <line x1="24" y1="10" x2="24" y2="40" />
    <line x1="12" y1="18" x2="20" y2="42" />
    <line x1="36" y1="18" x2="28" y2="42" />
  </g>

  <!-- Typography: Feliz -->
  <g transform="translate(266, 141) rotate(-8.18)">
    <text x="112" y="80" font-family="'Playfair Display', 'Brush Script MT', cursive, Georgia, serif" font-size="88" font-weight="900" fill="#ffffff" stroke="#660000" stroke-width="6" paint-order="stroke fill" text-anchor="middle">Feliz</text>
  </g>

  <!-- Typography: Natal -->
  <g transform="translate(281, 214) rotate(-3.78)">
    <text x="99" y="80" font-family="'Playfair Display', 'Brush Script MT', cursive, Georgia, serif" font-size="88" font-weight="900" fill="#ffffff" stroke="#660000" stroke-width="6" paint-order="stroke fill" text-anchor="middle">Natal</text>
  </g>

  <!-- Divider Line -->
  <g transform="translate(273, 289) rotate(-1.59)" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none">
    <path d="M 10 15 Q 50 8 104 15 Q 158 22 198 15" />
    <polygon points="104,8 110,15 104,22 98,15" fill="#ffffff" stroke="none" />
  </g>
</svg>
`)}`;

// 1d. Official Canva Template: Feliz Natal 2025 • Pattern Ho Ho Ho & Borda Verde
export const CANVA_NATAL_HOHO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <pattern id="hohoPattern" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="#c9182b" />
      <text x="15" y="25" font-family="'Montserrat', sans-serif" font-weight="bold" font-size="14" fill="#ffffff" opacity="0.85">HO</text>
      <text x="35" y="45" font-family="'Montserrat', sans-serif" font-weight="bold" font-size="14" fill="#ffffff" opacity="0.85">HO</text>
      <circle cx="50" cy="15" r="2" fill="#ffd700" opacity="0.6" />
      <circle cx="10" cy="50" r="2" fill="#ffd700" opacity="0.6" />
    </pattern>
  </defs>
  <!-- Background Pattern -->
  <rect width="756" height="359" fill="url(#hohoPattern)" />
  <!-- Green Top Header Band -->
  <rect x="0" y="0" width="756" height="32" fill="#046d3b" />
  <!-- Lace Christmas Border -->
  <line x1="0" y1="32" x2="756" y2="32" stroke="#ffffff" stroke-width="2" stroke-dasharray="6,4" />
  <circle cx="378" cy="180" r="160" fill="#ffffff" opacity="0.1" />

  <!-- Typography Grid Elements in White / Green -->
  <g font-family="'Playfair Display', Georgia, serif" font-weight="bold" fill="#046d3b">
    <!-- White Badges Behind Text -->
    <rect x="18" y="310" width="140" height="32" rx="6" fill="#ffffff" opacity="0.95" />
    <text x="88" y="332" font-size="18" text-anchor="middle">Feliz Natal!</text>

    <rect x="385" y="310" width="140" height="32" rx="6" fill="#ffffff" opacity="0.95" />
    <text x="455" y="332" font-size="18" text-anchor="middle">Feliz Natal!</text>

    <rect x="390" y="128" width="140" height="32" rx="6" fill="#ffffff" opacity="0.95" />
    <text x="460" y="150" font-size="18" text-anchor="middle">Feliz Natal!</text>

    <rect x="190" y="218" width="150" height="32" rx="6" fill="#ffffff" opacity="0.95" />
    <text x="265" y="240" font-size="18" text-anchor="middle">Feliz Natal!</text>

    <!-- 2025 Badges -->
    <rect x="235" y="310" width="90" height="32" rx="6" fill="#ffd700" opacity="0.95" />
    <text x="280" y="332" font-size="18" fill="#111111" text-anchor="middle">2025</text>

    <rect x="618" y="310" width="90" height="32" rx="6" fill="#ffd700" opacity="0.95" />
    <text x="663" y="332" font-size="18" fill="#111111" text-anchor="middle">2025</text>

    <rect x="405" y="218" width="90" height="32" rx="6" fill="#ffd700" opacity="0.95" />
    <text x="450" y="240" font-size="18" fill="#111111" text-anchor="middle">2025</text>

    <rect x="38" y="218" width="90" height="32" rx="6" fill="#ffd700" opacity="0.95" />
    <text x="83" y="240" font-size="18" fill="#111111" text-anchor="middle">2025</text>
  </g>
</svg>
`)}`;

// 1e. Official Canva Template: Feliz Natal • Papai Noel Aquarela, Árvore & Foto Polaroid
export const CANVA_NATAL_SANTA_POLAROID_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="santaBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#fdfaf5" />
      <stop offset="100%" stop-color="#f5efe6" />
    </linearGradient>
    <filter id="santaShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.2" />
    </filter>
  </defs>

  <!-- Clean Background -->
  <rect width="756" height="359" fill="url(#santaBgGrad)" />

  <!-- Left Polaroid Frame with Photo -->
  <g transform="translate(65, 36)" filter="url(#santaShadow)">
    <rect width="210" height="260" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="14" y="14" width="182" height="195" rx="4" fill="#cbd5e1" />
    <!-- Family Silhouette Illustration Placeholder -->
    <circle cx="105" cy="85" r="28" fill="#94a3b8" />
    <path d="M 60 170 C 60 130 90 120 105 120 C 120 120 150 130 150 170 Z" fill="#94a3b8" />
    <circle cx="145" cy="105" r="18" fill="#64748b" />
    <path d="M 120 180 C 120 150 135 140 145 140 C 155 140 170 150 170 180 Z" fill="#64748b" />
    <text x="105" y="235" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="14" fill="#334155" text-anchor="middle">Família &amp; Crianças</text>
  </g>

  <!-- Santa Claus Watercolor Illustration (Center) -->
  <g transform="translate(270, 38)">
    <circle cx="90" cy="70" r="42" fill="#ffe4e6" />
    <!-- Santa Hat -->
    <path d="M 45 60 Q 90 15 145 55 L 140 70 Q 90 40 45 70 Z" fill="#e11d48" />
    <circle cx="150" cy="65" r="12" fill="#ffffff" />
    <!-- Beard -->
    <path d="M 48 75 C 40 140 80 180 90 190 C 100 180 140 140 132 75 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5" />
    <!-- Santa Coat -->
    <path d="M 40 170 Q 90 150 140 170 L 155 240 L 25 240 Z" fill="#e11d48" />
  </g>

  <!-- Christmas Tree with Gifts (Right) -->
  <g transform="translate(540, 20)">
    <!-- Tree Triangles -->
    <polygon points="90,30 30,120 150,120" fill="#15803d" />
    <polygon points="90,90 20,190 160,190" fill="#166534" />
    <polygon points="90,150 10,270 170,270" fill="#14532d" />
    <!-- Star on Top -->
    <polygon points="90,15 94,26 106,26 96,33 100,44 90,37 80,44 84,33 74,26 86,26" fill="#fbbf24" />
    <!-- Ornaments -->
    <circle cx="60" cy="110" r="6" fill="#e11d48" />
    <circle cx="120" cy="140" r="6" fill="#fbbf24" />
    <circle cx="50" cy="180" r="7" fill="#38bdf8" />
    <circle cx="130" cy="220" r="7" fill="#e11d48" />
    <!-- Gift Box -->
    <rect x="70" y="270" width="40" height="35" rx="3" fill="#e11d48" />
    <rect x="85" y="270" width="10" height="35" fill="#fbbf24" />
  </g>

  <!-- Typography: Feliz Natal & Date -->
  <g transform="translate(410, 95) rotate(-14)">
    <text x="0" y="45" font-family="'Playfair Display', Georgia, serif" font-size="56" font-weight="900" fill="#b40000" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.15))">Feliz</text>
    <text x="0" y="105" font-family="'Playfair Display', Georgia, serif" font-size="62" font-weight="900" fill="#b40000" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.15))">Natal!</text>
  </g>
  <text x="500" y="260" font-family="'Montserrat', sans-serif" font-size="18" font-weight="bold" fill="#b40000" letter-spacing="2">25/12/2024</text>
</svg>
`)}`;

// 1f. Official Canva Template: Natal Mágico • 3 Selos Postais & Árvore Vintage
export const CANVA_NATAL_VINTAGE_STAMPS_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="vintageStampsBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf8f1" />
      <stop offset="100%" stop-color="#f5ece1" />
    </linearGradient>
    <filter id="stampShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.18" />
    </filter>
  </defs>

  <!-- Warm Vintage Cream Canvas -->
  <rect width="756" height="359" fill="url(#vintageStampsBg)" />

  <!-- Hand Drawn Tree Line Art (Left) -->
  <g transform="translate(70, 30)" stroke="#1a615e" stroke-width="2.5" fill="none" opacity="0.85">
    <path d="M 120 20 L 70 90 L 100 90 L 50 170 L 90 170 L 30 260 L 210 260 L 150 170 L 190 170 L 140 90 L 170 90 Z" />
    <line x1="120" y1="260" x2="120" y2="300" stroke-width="4" stroke="#8c5836" />
    <circle cx="120" cy="18" r="8" fill="#ffd700" stroke="none" />
  </g>

  <!-- 3 Postage Stamps with Family Photos -->
  <!-- Stamp 1 -->
  <g transform="translate(190, 50) rotate(-4)" filter="url(#stampShadow)">
    <rect width="80" height="90" rx="4" fill="#ffffff" stroke="#c2a68c" stroke-width="2" stroke-dasharray="4,2" />
    <rect x="8" y="8" width="64" height="60" fill="#94a3b8" />
    <text x="40" y="82" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="bold" fill="#1a615e" text-anchor="middle">NATAL 2024</text>
  </g>
  <!-- Stamp 2 -->
  <g transform="translate(130, 175) rotate(14)" filter="url(#stampShadow)">
    <rect width="76" height="84" rx="4" fill="#ffffff" stroke="#c2a68c" stroke-width="2" stroke-dasharray="4,2" />
    <rect x="8" y="8" width="60" height="54" fill="#64748b" />
    <text x="38" y="76" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="bold" fill="#1a615e" text-anchor="middle">AMOR &amp; PAZ</text>
  </g>
  <!-- Stamp 3 -->
  <g transform="translate(230, 140) rotate(-6)" filter="url(#stampShadow)">
    <rect width="90" height="100" rx="4" fill="#ffffff" stroke="#c2a68c" stroke-width="2" stroke-dasharray="4,2" />
    <rect x="8" y="8" width="74" height="70" fill="#475569" />
    <text x="45" y="92" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="bold" fill="#1a615e" text-anchor="middle">UNIÃO</text>
  </g>

  <!-- Hanging Christmas Baubles -->
  <circle cx="680" cy="180" r="30" fill="#f43f5e" opacity="0.85" />
  <circle cx="650" cy="50" r="24" fill="#e11d48" opacity="0.85" />

  <!-- Center-Right Elegant Lettering -->
  <g transform="translate(420, 80)">
    <text x="90" y="60" font-family="'Playfair Display', cursive, Georgia, serif" font-size="52" font-weight="900" fill="#1a615e" text-anchor="middle">Feliz Natal</text>
    <text x="90" y="110" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="17" fill="#1a615e" text-anchor="middle">Que seu natal seja repleto</text>
    <text x="90" y="135" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="17" fill="#1a615e" text-anchor="middle">de amor, paz &amp; união</text>
  </g>
</svg>
`)}`;

// 1g. Official Canva Template: Merry Christmas • Árvore Aquarela & Dupla Polaroid
export const CANVA_NATAL_MERRY_CHRISTMAS_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="paperBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8f9fa" />
    </linearGradient>
    <filter id="polaroidShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.22" />
    </filter>
  </defs>

  <!-- Clean Canvas -->
  <rect width="756" height="359" fill="url(#paperBg)" />

  <!-- Left Merry Christmas Hand Lettering -->
  <g transform="translate(40, 70)">
    <text x="0" y="60" font-family="'Playfair Display', cursive, Georgia, serif" font-size="58" font-weight="900" fill="#15803d">Merry</text>
    <text x="0" y="125" font-family="'Playfair Display', cursive, Georgia, serif" font-size="58" font-weight="900" fill="#b91c1c">Christmas</text>
    <text x="0" y="195" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" fill="#65a30d">Que seu natal seja repleto de amor, paz &amp; união</text>
  </g>

  <!-- Christmas Tree Illustration (Center-Right) -->
  <g transform="translate(360, 20)" opacity="0.9">
    <polygon points="120,20 60,110 180,110" fill="#166534" />
    <polygon points="120,80 40,180 200,180" fill="#15803d" />
    <polygon points="120,150 20,270 220,270" fill="#14532d" />
    <polygon points="120,5 124,16 136,16 126,23 130,34 120,27 110,34 114,23 104,16 116,16" fill="#f59e0b" />
  </g>

  <!-- Overlapping Polaroid Photo 1 (Right) -->
  <g transform="translate(490, 85) rotate(13)" filter="url(#polaroidShadow)">
    <rect width="170" height="180" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="12" y="12" width="146" height="125" rx="2" fill="#64748b" />
    <text x="85" y="160" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="13" fill="#334155" text-anchor="middle">Família Unida</text>
  </g>

  <!-- Overlapping Polaroid Photo 2 (Center) -->
  <g transform="translate(430, 150) rotate(-14)" filter="url(#polaroidShadow)">
    <rect width="130" height="140" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="10" y="10" width="110" height="95" rx="2" fill="#475569" />
    <text x="65" y="124" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="11" fill="#334155" text-anchor="middle">Doces Momentos</text>
  </g>
</svg>
`)}`;

export const CANVA_TEMPLATES: CanvaTemplateItem[] = [
  ...MOTHERS_DAY_CANVA_TEMPLATES,
  ...FATHERS_DAY_CANVA_TEMPLATES,
  ...CHRISTMAS_CANVA_TEMPLATES,
  // 0. Featured Canva Official Design with Live Embed and Canva Pro Template Link
  {
    id: 'canva-rui-tobias-dahswgbdg0a',
    title: 'Gratidão a Deus • Flores & Borboletas (Canva Pro Template)',
    category: 'mugs',
    categoryLabel: 'Canecas & Sublimação',
    previewUrl: CANVA_GRATIDAO_SVG,
    embedUrl: 'https://www.canva.com/design/DAHSwGBdG0A/22fPLcjeAV15p-1PKWWj_Q/view?embed',
    viewUrl: 'https://www.canva.com/design/DAHSwGBdG0A/22fPLcjeAV15p-1PKWWj_Q/view?utm_content=DAHSwGBdG0A&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    templateUrl: 'https://www.canva.com/design/DAHSwGBdG0A/22fPLcjeAV15p-1PKWWj_Q/view?utm_content=DAHSwGBdG0A&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    widthMm: 200,
    heightMm: 95,
    tags: ['gratidao', 'gratidão', 'a deus por cada detalhe', 'flores', 'borboletas', 'canva', 'rui tobias', 'rui tobias carvalho', 'caneca', 'sublimacao', 'sublimação', 'design', 'pro', 'template', 'estampa', 'panoramica'],
    description: 'Design oficial Canva de Rui Tobias D B Carvalho com 14 camadas editáveis: lettering Gratidão, aquarela, flores, borboletas e margaridas.',
    author: 'Rui Tobias D B Carvalho (Canva Pro)',
  },
  {
    id: 'canva-rui-tobias-dahswyjx7qw',
    title: 'Cópia de Sem nome • Rui Tobias Carvalho (Canva Pro Embed)',
    category: 'mugs',
    categoryLabel: 'Canecas & Sublimação',
    previewUrl: CANVA_RUI_TOBIAS_DAHSWYJX7QW_SVG,
    embedUrl: 'https://www.canva.com/design/DAHSwyjx7Qw/7n2H-nxYr0rqeOCWbvgrMw/view?embed',
    viewUrl: 'https://www.canva.com/design/DAHSwyjx7Qw/7n2H-nxYr0rqeOCWbvgrMw/view?utm_content=DAHSwyjx7Qw&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    templateUrl: 'https://www.canva.com/design/DAHSwyjx7Qw/7n2H-nxYr0rqeOCWbvgrMw/view?utm_content=DAHSwyjx7Qw&utm_campaign=designshare&utm_medium=embeds&utm_source=link',
    widthMm: 200,
    heightMm: 95,
    tags: ['copia de sem nome', 'cópia de sem nome', 'sem nome', 'rui tobias', 'rui tobias carvalho', 'caneca', 'sublimacao', 'sublimação', 'canva', 'pro', 'template', 'embed', 'estampa', 'panoramica', 'dahswyjx7qw', 'foto', 'polaroid', 'elegante', 'design especial'],
    description: 'Modelo oficial Canva Pro por Rui Tobias Carvalho (DAHSwyjx7Qw - "Cópia de Sem nome"). Caneca panorâmica 200 × 95 mm com moldura polaroid, aquarela e tipografia de luxo.',
    author: 'Rui Tobias Carvalho (Canva Pro)',
  },
  {
    id: 'canva-eahgy0zvwzi-boas-vindas',
    title: 'Colorido Moderno Boas-Vindas Banner',
    category: 'general',
    categoryLabel: 'Banners & Eventos',
    previewUrl: 'https://template.canva.com/EAHGY0zVWzI/1/0/800w-TXCb4fHqkLg.jpg',
    widthMm: 200,
    heightMm: 95,
    tags: ['boas-vindas', 'colorido', 'moderno', 'banner', 'evento', 'canva', 'festa', 'recepcao', 'painel'],
    description: 'Design moderno e colorido de boas-vindas com formas geométricas e tipografia vibrante.',
    author: 'Canva Templates',
  },
  {
    id: 'canva-eahkwinjr3y-marmoraria',
    title: 'Banner Marmoraria Serviços Sofisticado Azul e Bege',
    category: 'branding',
    categoryLabel: 'Corporativo & Serviços',
    previewUrl: 'https://template.canva.com/EAHKWinJr3Y/1/0/400w-3fsJbykwkzA.jpg',
    widthMm: 200,
    heightMm: 95,
    tags: ['marmoraria', 'servicos', 'azul', 'bege', 'sofisticado', 'banner', 'granito', 'empresa', 'pro', 'arquitetura'],
    description: 'Banner profissional elegante para marmoraria, arquitetura e serviços corporativos com tons de azul e bege.',
    author: 'Canva Pro',
  },
  {
    id: 'canva-eagpzbg4yzc-colecao-crista',
    title: 'Banner Nova Coleção Cristã Preto e Branco Moderno',
    category: 'faith',
    categoryLabel: 'Gospel & Fé',
    previewUrl: 'https://template.canva.com/EAGpZBG4yZc/3/0/400w-xhXObU-NANI.jpg',
    widthMm: 200,
    heightMm: 95,
    tags: ['crista', 'cristão', 'gospel', 'fe', 'fé', 'preto e branco', 'minimalista', 'moderno', 'colecao', 'moda', 'streetwear', 'banner'],
    description: 'Composição minimalista moderna em preto e branco para lançamentos de moda cristã e streetwear gospel.',
    author: 'Canva Creator',
  },
  {
    id: 'canva-eag3u79xdbu-estamos-em-obra',
    title: 'Placa Estamos Em Obra Loja Criativo Azul e Cinza',
    category: 'branding',
    categoryLabel: 'Comércio & Sinalização',
    previewUrl: 'https://template.canva.com/EAG3U79XDbU/1/0/400w-qZx_vPpLu9g.jpg',
    widthMm: 200,
    heightMm: 95,
    tags: ['obra', 'em obra', 'reforma', 'loja', 'placa', 'sinalizacao', 'azul', 'cinza', 'comercio', 'banner', 'aviso'],
    description: 'Banner criativo de sinalização "Estamos em Obra" em tons de azul e cinza para vitrines e lojas.',
    author: 'Canva Pro',
  },
  {
    id: 'canva-eagtuznywhm-casamento-verde',
    title: 'Banner Bem-Vindo Casamento Elegante Verde',
    category: 'general',
    categoryLabel: 'Casamento & Recepção',
    previewUrl: 'https://template.canva.com/EAGtUZnywhM/1/0/400w-igK__5Cf_JU.jpg',
    widthMm: 200,
    heightMm: 95,
    tags: ['casamento', 'bem-vindo', 'elegante', 'verde', 'botanico', 'festa', 'noivos', 'banner', 'recepcao', 'decoracao'],
    description: 'Placa de boas-vindas requintada para casamentos e recepções com temática botânica verde e dourada.',
    author: 'Canva Pro',
  },
  {
    id: 'canva-eagfm7teo1c-liquidacao-bege',
    title: 'Banner Bege Liquidação de Moda Minimalista',
    category: 'branding',
    categoryLabel: 'Moda & Vendas',
    previewUrl: 'https://template.canva.com/EAGfm7tEO1c/1/0/400w-vRpeCn_2rXc.jpg',
    widthMm: 200,
    heightMm: 95,
    tags: ['liquidacao', 'promocao', 'moda', 'bege', 'minimalista', 'sale', 'off', 'estilo', 'loja', 'desconto'],
    description: 'Banner promocional e sofisticado de liquidação de moda em tons pastéis e estética clean.',
    author: 'Canva Studio',
  },
  {
    id: 'canva-eahqbiooykk-comunidade-vermelho',
    title: 'Banner Comunidade Moderno Vermelho, Cinza e Branco',
    category: 'general',
    categoryLabel: 'Comunidade & Social',
    previewUrl: 'https://template.canva.com/EAHQBiOoykk/1/0/400w-PsU68iushYE.jpg',
    widthMm: 200,
    heightMm: 95,
    tags: ['comunidade', 'social', 'vermelho', 'cinza', 'branco', 'moderno', 'banner', 'organizacao', 'projeto', 'evento'],
    description: 'Design dinâmico e impactante para eventos comunitários, projetos sociais e encontros.',
    author: 'Canva Pro',
  },
  {
    id: 'canva-paizao-futebol',
    title: 'Pai zão Nº 1 • Futebol & Troféu Campeão (Canva Pro Template)',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIZAO_SVG,
    embedUrl: 'https://www.canva.com/design/DAHSqZ1k1c4/1YdMmCGOMaYkTfEmNLwTYA/view?embed',
    viewUrl: 'https://www.canva.com/design/DAHSqZ1k1c4/1YdMmCGOMaYkTfEmNLwTYA/view',
    templateUrl: 'https://canva.link/179x5423b0re1j7',
    widthMm: 200,
    heightMm: 95,
    tags: ['pai', 'paizao', 'paizão', 'futebol', 'trofeu', 'troféu', 'campeao', 'campeão', 'caneca', 'dia dos pais', '1', 'filho', 'bola', 'rui tobias carvalho', 'pro template'],
    description: 'Design oficial Canva Pro de Rui Tobias Carvalho. Abra o editor oficial do Canva com 1 clique para alterar a foto e nome ou edite no SublimStudio.',
    author: 'Rui Tobias Carvalho (Canva Pro)',
  },
  // 1. Exact models from user screenshot (Camisetas)
  {
    id: 'canva-tshirt-blank',
    title: 'Criar Camiseta em Branco (+)',
    category: 'tshirts',
    categoryLabel: 'Camisetas',
    previewUrl: CANVA_BLANK_TSHIRT_SVG,
    widthMm: 297,
    heightMm: 420,
    tags: ['branco', 'novo', 'criar', 'zero', 'personalizar', 'camisa', 'camiseta', 'estampa', 'a3', 'a4'],
    description: 'Inicie uma arte do zero com gabarito A3/A4 em 300 DPI.',
    author: 'Canva Studio',
    isBlank: true,
  },
  {
    id: 'canva-tshirt-lion-shield',
    title: 'Camiseta Leão Escudo & Splash Grunge',
    category: 'tshirts',
    categoryLabel: 'Camisetas',
    previewUrl: CANVA_LION_SHIELD_SVG,
    widthMm: 297,
    heightMm: 420,
    tags: ['leao', 'leão', 'lion', 'escudo', 'shield', 'splash', 'grunge', 'streetwear', 'camisa', 'camiseta', 'preto e branco', 'masculina', 'estampa', 'canva'],
    description: 'Arte streetwear com leão tribal, brasão heráldico e salpicos de tinta.',
    author: 'Canva Street Collection',
  },
  {
    id: 'canva-tshirt-cherry',
    title: 'Camiseta Você é a Cereja (Retro Cherry)',
    category: 'tshirts',
    categoryLabel: 'Camisetas',
    previewUrl: CANVA_CHERRY_SVG,
    widthMm: 297,
    heightMm: 420,
    tags: ['cereja', 'cherry', 'voce e a cereja', 'você é a cereja', 'frase', 'romantico', 'retro', 'vermelho', 'fofo', 'camisa', 'camiseta', 'feminina', 'canva'],
    description: 'Estampa retrô com cerejas brilhantes e tipografia curva charmosa.',
    author: 'Canva Retro Design',
  },
  {
    id: 'canva-tshirt-iluminado',
    title: 'Camiseta Iluminado - Anjo Dark Gothic',
    category: 'tshirts',
    categoryLabel: 'Camisetas',
    previewUrl: CANVA_ILUMINADO_SVG,
    widthMm: 297,
    heightMm: 420,
    tags: ['iluminado', 'anjo', 'angel', 'gothic', 'streetwear', 'estatua', 'asas', 'vermelho', 'dark', 'religioso', 'camisa', 'camiseta', 'canva'],
    description: 'Composição dark streetwear com estátua de anjo e tipografia gótica neon.',
    author: 'Canva Gothic Wear',
  },
  // 2. High-Demand Sublimation T-Shirts
  {
    id: 'canva-tshirt-tokyo',
    title: 'Camiseta Tokyo Cyberpunk Streetwave',
    category: 'tshirts',
    categoryLabel: 'Camisetas',
    previewUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    widthMm: 297,
    heightMm: 420,
    tags: ['tokyo', 'cyberpunk', 'japao', 'streetwear', 'camisa', 'camiseta', 'neon', 'anime'],
    description: 'Estampa estilizada com estética japonesa contemporânea e cores vibrantes.',
    author: 'Canva Apparel',
  },
  {
    id: 'canva-tshirt-vintage-moto',
    title: 'Camiseta Vintage Garage & Custom Motors',
    category: 'tshirts',
    categoryLabel: 'Camisetas',
    previewUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
    widthMm: 297,
    heightMm: 420,
    tags: ['moto', 'vintage', 'garage', 'rock', 'custom', 'camisa', 'camiseta', 'masculina'],
    description: 'Estilo clássico cafe racer com traços manuais e aspecto envelhecido.',
    author: 'Canva Vintage Garage',
  },

  // 3. Mugs & Ceramic Sublimation (Canecas)
  {
    id: 'canva-mug-01',
    title: 'Caneca Floral Delicada - Dia das Mães',
    category: 'mothers',
    categoryLabel: 'Dia das Mães',
    previewUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    widthMm: 200,
    heightMm: 95,
    tags: ['floral', 'mae', 'mãe', 'amor', 'rosa', 'aquarela', 'caneca', 'familia', 'sublimacao'],
    description: 'Estampa panorâmica floral em aquarela suave para canecas de porcelana.',
    author: 'Canva Sublimation Studio',
  },
  {
    id: 'canva-mug-02',
    title: 'Caneca Minimalista Café & Código Dev',
    category: 'gamer',
    categoryLabel: 'Gamer & Dev',
    previewUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    widthMm: 200,
    heightMm: 95,
    tags: ['cafe', 'café', 'developer', 'codigo', 'código', 'preto', 'minimalista', 'caneca', 'tech'],
    description: 'Tipografia moderna e limpa com ícones minimalistas de café e rotina tech.',
    author: 'Canva Design Team',
  },
  {
    id: 'canva-mug-03',
    title: 'Identidade Corporativa Clean Logo',
    category: 'branding',
    categoryLabel: 'Empresas & Logos',
    previewUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=800&auto=format&fit=crop&q=80',
    widthMm: 200,
    heightMm: 95,
    tags: ['empresa', 'logo', 'branding', 'moderno', 'azul', 'caneca', 'corporativo'],
    description: 'Gabarito corporativo pronto para inserção de logomarca e slogan em 300 DPI.',
    author: 'Canva Brand Kit',
  },
  {
    id: 'canva-mug-04',
    title: 'Pet Lover - Dog & Cat Line Art',
    category: 'pets',
    categoryLabel: 'Pets & Animais',
    previewUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    widthMm: 200,
    heightMm: 95,
    tags: ['cachorro', 'gato', 'pet', 'line art', 'fofo', 'caneca', 'animais'],
    description: 'Ilustração em traço contínuo minimalista elegante para tutores de animais.',
    author: 'Canva Pet Studio',
  },
  {
    id: 'canva-mug-05',
    title: 'Fé & Gratidão - Lettering Dourado',
    category: 'faith',
    categoryLabel: 'Fé & Religioso',
    previewUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop&q=80',
    widthMm: 200,
    heightMm: 95,
    tags: ['fe', 'fé', 'gratidao', 'gratidão', 'dourado', 'lettering', 'religioso', 'paz', 'caneca', 'gospel'],
    description: 'Composição com degradê dourado luminoso e mensagem de inspiração diária.',
    author: 'Canva Inspirational',
  },
  {
    id: 'canva-gamer-01',
    title: 'Level Up Retro Neon Cyber Arcade',
    category: 'gamer',
    categoryLabel: 'Gamer & Dev',
    previewUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    widthMm: 200,
    heightMm: 95,
    tags: ['gamer', 'neon', 'cyberpunk', 'pixel', 'arcade', 'caneca', 'jogos', '8bit'],
    description: 'Arte com efeitos neon vibrantes e tipografia futurista estilo anos 80.',
    author: 'Canva Arcade',
  },
  {
    id: 'canva-general-01',
    title: 'Geometria Abstrata Boho Pastel',
    category: 'general',
    categoryLabel: 'Abstrato & Boho',
    previewUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    widthMm: 200,
    heightMm: 95,
    tags: ['boho', 'pastel', 'formas', 'botanico', 'botânico', 'elegante', 'caneca', 'estampa'],
    description: 'Paleta terrosa e orgânica inspirada nas últimas tendências de decoração.',
    author: 'Canva Bohemian Art',
  },
];

// Helper to normalize and search templates with synonyms
export function searchCanvaTemplates(
  templates: CanvaTemplateItem[],
  query: string,
  category: string
): CanvaTemplateItem[] {
  const cleanCategory = (category || 'all').trim().toLowerCase();
  
  const normalize = (str: string) =>
    (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const cleanQuery = normalize(query);
  const queryTokens = cleanQuery ? cleanQuery.split(/\s+/).filter(Boolean) : [];

  return templates.filter((tpl) => {
    // 1. Category Match
    const categoryMatches =
      cleanCategory === 'all' ||
      tpl.category === cleanCategory ||
      (cleanCategory === 'mothers' && (tpl.category === 'mothers' || tpl.tags.includes('mae') || tpl.tags.includes('mãe') || tpl.tags.includes('maes') || tpl.tags.includes('mães') || tpl.tags.includes('dia das maes') || tpl.tags.includes('dia das mães') || tpl.tags.includes('mother') || tpl.tags.includes('mothers'))) ||
      (cleanCategory === 'fathers' && (tpl.category === 'fathers' || tpl.tags.includes('pai') || tpl.tags.includes('pais') || tpl.tags.includes('papai') || tpl.tags.includes('dia dos pais'))) ||
      (cleanCategory === 'christmas' && (tpl.category === 'christmas' || tpl.tags.includes('natal') || tpl.tags.includes('christmas') || tpl.tags.includes('presepio') || tpl.title.toLowerCase().includes('natal'))) ||
      (cleanCategory === 'tshirts' && (tpl.category === 'tshirts' || tpl.tags.includes('camiseta') || tpl.tags.includes('camisa'))) ||
      (cleanCategory === 'mugs' && (tpl.category === 'mugs' || tpl.tags.includes('caneca')));

    if (!categoryMatches) return false;

    // 2. Query Match
    if (queryTokens.length === 0) return true;

    const searchableText = normalize(
      `${tpl.title} ${tpl.description} ${tpl.author} ${tpl.categoryLabel} ${tpl.tags.join(' ')}`
    );

    return queryTokens.every((token) => {
      // Synonyms handling
      if (token === 'pai' || token === 'pais' || token === 'papai' || token === 'papais' || token === 'paizao' || token === 'paizão' || token === 'father' || token === 'fathers' || token === 'dad') {
        return searchableText.includes('pai') || searchableText.includes('pais') || searchableText.includes('papai') || searchableText.includes('father') || tpl.category === 'fathers';
      }
      if (token === 'natal' || token === 'christmas' || token === 'noel' || token === 'papainoel' || token === 'festas' || token === 'arvore') {
        return searchableText.includes('natal') || searchableText.includes('christmas') || searchableText.includes('noel') || searchableText.includes('festas') || tpl.category === 'christmas';
      }
      if (token === 'camisa' || token === 'camisas' || token === 'camiseta' || token === 'camisetas' || token === 'tshirt' || token === 't-shirt') {
        return searchableText.includes('camisa') || searchableText.includes('camiseta') || searchableText.includes('tshirt') || tpl.category === 'tshirts';
      }
      if (token === 'caneca' || token === 'canecas' || token === 'mug' || token === 'mugs') {
        return searchableText.includes('caneca') || searchableText.includes('mug') || tpl.category === 'mugs';
      }
      if (token === 'leao' || token === 'lion') {
        return searchableText.includes('leao') || searchableText.includes('lion');
      }
      if (token === 'cereja' || token === 'cherry') {
        return searchableText.includes('cereja') || searchableText.includes('cherry');
      }
      if (token === 'iluminado' || token === 'anjo' || token === 'angel') {
        return searchableText.includes('iluminado') || searchableText.includes('anjo') || searchableText.includes('angel');
      }
      if (token === 'mae' || token === 'maes' || token === 'mãe' || token === 'mães' || token === 'mamae' || token === 'mamãe' || token === 'mother' || token === 'mothers') {
        return searchableText.includes('mae') || searchableText.includes('maes') || searchableText.includes('mãe') || searchableText.includes('mães') || searchableText.includes('mamae') || searchableText.includes('mother') || tpl.category === 'mothers';
      }
      if (token === 'fe' || token === 'religioso' || token === 'gospel') {
        return searchableText.includes('fe') || searchableText.includes('religioso') || searchableText.includes('gospel');
      }

      return searchableText.includes(token);
    });
  });
}

// Generates the full 9-layer editable layout for "Paizão Nº 1 • Futebol & Troféu Campeão"
export function getPaizaoTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    // 1. Photo Frame (Happy father and son polaroid)
    {
      id: `paizao-photo-${timestamp}`,
      name: 'Foto: Pai e Filho (Polaroid)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 84,
      y: 37,
      width: 236,
      height: 271,
      rotation: -8,
      content: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
      strokeColor: '#000000',
      strokeWidth: 4,
      filters: { brightness: 0, contrast: 5, saturation: 10, hue: 0, blur: 0, vibrance: 10 },
    },
    // 2. Illustration: Championship Trophy Logo
    {
      id: `paizao-trophy-${timestamp}`,
      name: 'Ilustração: Troféu Campeão',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 10,
      y: 192,
      width: 182,
      height: 198,
      rotation: -19,
      content: PAIZAO_TROPHY_SVG,
      filters: { brightness: 0, contrast: 0, saturation: 0, hue: 0, blur: 0, vibrance: 0 },
    },
    // 3. Illustration: Speed / Line Movement
    {
      id: `paizao-lines-${timestamp}`,
      name: 'Efeito: Linhas de Movimento',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 303,
      y: 270,
      width: 132,
      height: 144,
      rotation: 0,
      content: PAIZAO_LINES_SVG,
      filters: { brightness: 0, contrast: 0, saturation: 0, hue: 0, blur: 0, vibrance: 0 },
    },
    // 4. Text "Pai"
    {
      id: `paizao-text-pai-${timestamp}`,
      name: 'Texto: Pai',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 407,
      y: 94,
      width: 190,
      height: 130,
      rotation: 0,
      content: 'Pai',
      color: '#0171D3',
      fontSize: 100,
      fontFamily: 'Impact, Montserrat, sans-serif',
      fontWeight: 'bold',
      strokeColor: '#000000',
      strokeWidth: 4,
    },
    // 5. Text "zão"
    {
      id: `paizao-text-zao-${timestamp}`,
      name: 'Texto: zão',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 466,
      y: 178,
      width: 240,
      height: 130,
      rotation: 0,
      content: 'zão',
      color: '#FFC41C',
      fontSize: 100,
      fontFamily: 'Impact, Montserrat, sans-serif',
      fontWeight: 'bold',
      strokeColor: '#000000',
      strokeWidth: 4,
    },
    // 6. Text "1" (Nº 1)
    {
      id: `paizao-text-num1-${timestamp}`,
      name: 'Texto: 1 (Nº 1)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 650,
      y: 66,
      width: 50,
      height: 100,
      rotation: 22,
      content: '1',
      color: '#FFFFFF',
      fontSize: 85,
      fontFamily: 'Impact, Montserrat, sans-serif',
      fontWeight: 'bold',
      strokeColor: '#000000',
      strokeWidth: 5,
    },
    // 7. Decorative Star 1
    {
      id: `paizao-star-1-${timestamp}`,
      name: 'Estrela Dourada Top',
      type: 'shape',
      shapeType: 'star',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 543,
      y: 62,
      width: 42,
      height: 37,
      rotation: 0,
      content: '',
      color: '#FFC41C',
      strokeColor: '#000000',
      strokeWidth: 1.5,
    },
    // 8. Decorative Star 2
    {
      id: `paizao-star-2-${timestamp}`,
      name: 'Estrela Dourada Esquerda',
      type: 'shape',
      shapeType: 'star',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 24,
      y: 18,
      width: 42,
      height: 37,
      rotation: 0,
      content: '',
      color: '#FFC41C',
      strokeColor: '#000000',
      strokeWidth: 1.5,
    },
    // 9. Decorative Star 3
    {
      id: `paizao-star-3-${timestamp}`,
      name: 'Estrela Cyan Base',
      type: 'shape',
      shapeType: 'star',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 453,
      y: 249,
      width: 38,
      height: 33,
      rotation: 0,
      content: '',
      color: '#00BAFF',
      strokeColor: '#000000',
      strokeWidth: 1.5,
    },
  ];
}

// Generates the full editable layered layout for "Você é a Cereja do Meu Bolo"
export function getCherryTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `cherry-bg-${timestamp}`,
      name: 'Ilustração: Cerejas Retro',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 250,
      y: 120,
      width: 300,
      height: 300,
      rotation: 0,
      content: CANVA_CHERRY_SVG,
    },
    {
      id: `cherry-txt-1-${timestamp}`,
      name: 'Texto: VOCÊ É A CEREJA',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 60,
      width: 440,
      height: 70,
      rotation: 0,
      content: 'VOCÊ É A CEREJA',
      color: '#d90429',
      fontSize: 48,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textWarpStyle: 'arc_upper',
      textCurved: true,
    },
    {
      id: `cherry-txt-2-${timestamp}`,
      name: 'Texto: do meu bolo ♡',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 260,
      y: 430,
      width: 280,
      height: 60,
      rotation: 0,
      content: 'do meu bolo ♡',
      color: '#ef233c',
      fontSize: 36,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
  ];
}

// 14-Layer Editable Sublimation Composition for "Gratidão a Deus" (Canva DAHSwGBdG0A)
export function getGratidaoTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    // 1. Background Cream Wash
    {
      id: `gratidao-bg-${timestamp}`,
      name: 'Fundo: Linho Creme Pastel (#efede9)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 800,
      height: 380,
      rotation: 0,
      content: '',
      color: '#efede9',
    },
    // 2. Abstract Watercolor Shape Center
    {
      id: `gratidao-watercolor-splash-${timestamp}`,
      name: 'Mancha: Aquarela Orgânica Central',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 85,
      blendMode: 'multiply',
      x: 250,
      y: 65,
      width: 300,
      height: 130,
      rotation: 0,
      content: 'https://media-public.canva.com/rOyag/MAEgHXrOyag/1/s.png',
    },
    // 3. Text: Gratidão
    {
      id: `gratidao-title-${timestamp}`,
      name: 'Texto: Gratidão',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 270,
      y: 95,
      width: 260,
      height: 80,
      rotation: 0,
      content: 'Gratidão',
      color: '#111111',
      fontSize: 64,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    // 4. Text Subtitle
    {
      id: `gratidao-subtitle-${timestamp}`,
      name: 'Texto: a Deus por cada detalhe...',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 200,
      width: 440,
      height: 85,
      rotation: 0,
      content: 'a Deus por cada detalhe, até os que eu não entendo agora.',
      color: '#222222',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    // 5. Crayon Hearts Doodle
    {
      id: `gratidao-hearts-${timestamp}`,
      name: 'Elemento: Corações Doodle',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 470,
      y: 75,
      width: 48,
      height: 32,
      rotation: 0,
      content: 'https://media-public.canva.com/Kybac/MAFlpRKybac/1/s-1.svg',
    },
    // 6. Floral Top Left
    {
      id: `gratidao-flower-tl-${timestamp}`,
      name: 'Floral: Ramo Aquarela Superior Esq',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: -20,
      y: -30,
      width: 140,
      height: 240,
      rotation: 77,
      content: 'https://media-public.canva.com/VZO70/MAE2U5VZO70/1/s.png',
    },
    // 7. Floral Top Right
    {
      id: `gratidao-flower-tr-${timestamp}`,
      name: 'Floral: Ramo Aquarela Superior Dir',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 650,
      y: 0,
      width: 140,
      height: 240,
      rotation: -30,
      content: 'https://media-public.canva.com/VZO70/MAE2U5VZO70/1/s.png',
    },
    // 8. Floral Bottom Left
    {
      id: `gratidao-flower-bl-${timestamp}`,
      name: 'Floral: Ramo Aquarela Inferior Esq',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 170,
      y: 220,
      width: 140,
      height: 240,
      rotation: -56,
      content: 'https://media-public.canva.com/VZO70/MAE2U5VZO70/1/s.png',
    },
    // 9. Floral Bottom Right
    {
      id: `gratidao-flower-br-${timestamp}`,
      name: 'Floral: Ramo Aquarela Inferior Dir',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 440,
      y: 240,
      width: 140,
      height: 240,
      rotation: 54,
      content: 'https://media-public.canva.com/VZO70/MAE2U5VZO70/1/s.png',
    },
    // 10. Butterfly Right
    {
      id: `gratidao-butterfly-r-${timestamp}`,
      name: 'Borboleta: Scenic Colorida Dir',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 580,
      y: 80,
      width: 70,
      height: 60,
      rotation: 0,
      content: 'https://media-public.canva.com/fLfI8/MAF0ZqfLfI8/1/s.png',
    },
    // 11. Butterfly Left
    {
      id: `gratidao-butterfly-l-${timestamp}`,
      name: 'Borboleta: Scenic Colorida Esq',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 55,
      y: 170,
      width: 60,
      height: 52,
      rotation: 0,
      content: 'https://media-public.canva.com/fLfI8/MAF0ZqfLfI8/1/s.png',
    },
    // 12. Daisy Center
    {
      id: `gratidao-daisy-c-${timestamp}`,
      name: 'Margarida: Margarida Delicada Centro',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 350,
      y: 310,
      width: 68,
      height: 66,
      rotation: -21,
      content: 'https://media-public.canva.com/jWx_A/MAEoE-jWx_A/1/s.png',
    },
    // 13. Daisy Right
    {
      id: `gratidao-daisy-r-${timestamp}`,
      name: 'Margarida: Margarida Delicada Dir',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 680,
      y: 260,
      width: 50,
      height: 48,
      rotation: -26,
      content: 'https://media-public.canva.com/jWx_A/MAEoE-jWx_A/1/s.png',
    },
    // 14. Daisy Left
    {
      id: `gratidao-daisy-l-${timestamp}`,
      name: 'Margarida: Margarida Delicada Esq',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 280,
      width: 50,
      height: 48,
      rotation: -26,
      content: 'https://media-public.canva.com/jWx_A/MAEoE-jWx_A/1/s.png',
    },
  ];
}

// Generates the full 10-layer editable layout for "Design Especial Caneca • Rui Tobias Carvalho (DAHSwyjx7Qw)"
export function getRuiTobiasCustomTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    // 1. Background Base
    {
      id: `rui-custom-bg-${timestamp}`,
      name: 'Fundo: Gradiente Suave Marfim',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 800,
      height: 380,
      rotation: 0,
      content: '',
      color: '#FAF6F0',
    },
    // 2. Watercolor Wash
    {
      id: `rui-custom-wash-${timestamp}`,
      name: 'Aquarela: Mancha Pastel Nobre',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 75,
      blendMode: 'multiply',
      x: 240,
      y: 70,
      width: 380,
      height: 220,
      rotation: 0,
      content: 'https://media-public.canva.com/rOyag/MAEgHXrOyag/1/s.png',
    },
    // 3. Polaroid Photo Frame (Left)
    {
      id: `rui-custom-photo-${timestamp}`,
      name: 'Foto: Polaroid Personalizável',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 90,
      y: 60,
      width: 180,
      height: 220,
      rotation: -6,
      content: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      strokeColor: '#FFFFFF',
      strokeWidth: 6,
    },
    // 4. Botanical Arch Left
    {
      id: `rui-custom-floral-l-${timestamp}`,
      name: 'Floral: Ramo Botânico Elegante',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 95,
      blendMode: 'normal',
      x: 480,
      y: 30,
      width: 160,
      height: 220,
      rotation: 25,
      content: 'https://media-public.canva.com/VZO70/MAE2U5VZO70/1/s.png',
    },
    // 5. Butterfly Right
    {
      id: `rui-custom-butterfly-${timestamp}`,
      name: 'Elemento: Borboleta Dourada',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 670,
      y: 60,
      width: 75,
      height: 65,
      rotation: -10,
      content: 'https://media-public.canva.com/fLfI8/MAF0ZqfLfI8/1/s.png',
    },
    // 6. Title Text: Design Especial
    {
      id: `rui-custom-title-${timestamp}`,
      name: 'Texto: Design Especial',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 360,
      y: 120,
      width: 380,
      height: 60,
      rotation: 0,
      content: 'Design Especial',
      color: '#1F2937',
      fontSize: 48,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    // 7. Subtitle Text
    {
      id: `rui-custom-subtitle-${timestamp}`,
      name: 'Texto: Feito com carinho para você',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 360,
      y: 190,
      width: 380,
      height: 45,
      rotation: 0,
      content: 'Feito com carinho para você',
      color: '#4B5563',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    // 8. Doodles Heart
    {
      id: `rui-custom-heart-${timestamp}`,
      name: 'Elemento: Coração Doodle',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 620,
      y: 180,
      width: 40,
      height: 28,
      rotation: 12,
      content: 'https://media-public.canva.com/Kybac/MAFlpRKybac/1/s-1.svg',
    },
    // 9. Frame Border Accent
    {
      id: `rui-custom-border-${timestamp}`,
      name: 'Moldura: Filete Dourado Fino',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 60,
      blendMode: 'normal',
      x: 20,
      y: 20,
      width: 760,
      height: 340,
      rotation: 0,
      content: '',
      color: 'transparent',
      strokeColor: '#D4AF37',
      strokeWidth: 2,
    },
    // 10. Signature
    {
      id: `rui-custom-sig-${timestamp}`,
      name: 'Assinatura: Rui Tobias Carvalho',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 360,
      y: 245,
      width: 380,
      height: 30,
      rotation: 0,
      content: 'RUI TOBIAS CARVALHO • CANVA PRO',
      color: '#AA771C',
      fontSize: 11,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

// Generates 5-layer editable layout for "Leão Streetwear Urban Wild"
export function getLionStreetwearTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `lion-bg-${timestamp}`,
      name: 'Fundo: Dark Grunge',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 800,
      height: 380,
      rotation: 0,
      content: '',
      color: '#0D0E15',
    },
    {
      id: `lion-art-${timestamp}`,
      name: 'Ilustração: Leão Real Escudo',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 275,
      y: 35,
      width: 250,
      height: 250,
      rotation: 0,
      content: CANVA_LION_SHIELD_SVG,
    },
    {
      id: `lion-txt-title-${timestamp}`,
      name: 'Texto: URBAN WILD',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 200,
      y: 290,
      width: 400,
      height: 50,
      rotation: 0,
      content: 'URBAN WILD',
      color: '#F39C12',
      fontSize: 38,
      fontFamily: 'Impact, Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `lion-txt-sub-${timestamp}`,
      name: 'Texto: LIMITED EDITION • STREETWEAR',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 200,
      y: 340,
      width: 400,
      height: 25,
      rotation: 0,
      content: 'LIMITED EDITION • STREETWEAR',
      color: '#A0AEC0',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

// Generates 5-layer editable layout for "Iluminado Archangel Dark Gothic"
export function getIluminadoTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `ilum-bg-${timestamp}`,
      name: 'Fundo: Dark Gótico',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 800,
      height: 380,
      rotation: 0,
      content: '',
      color: '#08090C',
    },
    {
      id: `ilum-art-${timestamp}`,
      name: 'Ilustração: Anjo Guardião',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 280,
      y: 40,
      width: 240,
      height: 240,
      rotation: 0,
      content: CANVA_ILUMINADO_SVG,
    },
    {
      id: `ilum-title-${timestamp}`,
      name: 'Texto: ILUMINADO',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 200,
      y: 290,
      width: 400,
      height: 50,
      rotation: 0,
      content: 'ILUMINADO',
      color: '#FFFFFF',
      fontSize: 42,
      fontFamily: 'Cinzel, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `ilum-sub-${timestamp}`,
      name: 'Texto: DIVINE PROTECTION',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 80,
      blendMode: 'normal',
      x: 200,
      y: 340,
      width: 400,
      height: 25,
      rotation: 0,
      content: 'DIVINE PROTECTION • SACRED LIGHT',
      color: '#E2E8F0',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

// Generates 6-layer editable layout for "Melhor Mãe do Mundo Floral"
export function getMotherDayTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `mae-bg-${timestamp}`,
      name: 'Fundo: Rosé Suave',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 800,
      height: 380,
      rotation: 0,
      content: '',
      color: '#FFF5F5',
    },
    {
      id: `mae-photo-${timestamp}`,
      name: 'Foto da Mãe (Polaroid)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 50,
      width: 220,
      height: 260,
      rotation: -5,
      content: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      strokeColor: '#FFFFFF',
      strokeWidth: 6,
    },
    {
      id: `mae-floral-${timestamp}`,
      name: 'Floral Aquarela Rosa',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 480,
      y: 40,
      width: 180,
      height: 240,
      rotation: 15,
      content: 'https://media-public.canva.com/VZO70/MAE2U5VZO70/1/s.png',
    },
    {
      id: `mae-title-${timestamp}`,
      name: 'Texto: Melhor Mãe',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 350,
      y: 110,
      width: 400,
      height: 60,
      rotation: 0,
      content: 'Melhor Mãe',
      color: '#9B2C2C',
      fontSize: 50,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `mae-sub-${timestamp}`,
      name: 'Texto: do Mundo Inteiro ♡',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 350,
      y: 180,
      width: 400,
      height: 45,
      rotation: 0,
      content: 'do Mundo Inteiro ♡',
      color: '#C53030',
      fontSize: 26,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
    {
      id: `mae-quote-${timestamp}`,
      name: 'Texto: Obrigado por todo amor e carinho',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 350,
      y: 235,
      width: 400,
      height: 35,
      rotation: 0,
      content: 'Obrigado por todo o amor, carinho e dedicação.',
      color: '#742A2A',
      fontSize: 14,
      fontFamily: 'Montserrat, sans-serif',
    },
  ];
}

// Generates 5-layer editable layout for "Café Vintage Premium"
export function getVintageCoffeeTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `coffee-bg-${timestamp}`,
      name: 'Fundo: Rústico Vintage (#2B1E16)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 800,
      height: 380,
      rotation: 0,
      content: '',
      color: '#2B1E16',
    },
    {
      id: `coffee-photo-${timestamp}`,
      name: 'Foto: Café & Grãos Especial',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 70,
      y: 60,
      width: 240,
      height: 250,
      rotation: 0,
      content: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      strokeColor: '#D4AF37',
      strokeWidth: 3,
    },
    {
      id: `coffee-title-${timestamp}`,
      name: 'Texto: VINTAGE COFFEE',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 350,
      y: 100,
      width: 400,
      height: 60,
      rotation: 0,
      content: 'VINTAGE COFFEE',
      color: '#D4AF37',
      fontSize: 44,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `coffee-sub-${timestamp}`,
      name: 'Texto: Fresh Roasted • 100% Arabica',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 350,
      y: 170,
      width: 400,
      height: 40,
      rotation: 0,
      content: 'Fresh Roasted • 100% Arabica Beans',
      color: '#E2E8F0',
      fontSize: 18,
      fontFamily: 'Montserrat, sans-serif',
      fontStyle: 'italic',
    },
    {
      id: `coffee-badge-${timestamp}`,
      name: 'Texto: SINCE 1988',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 350,
      y: 225,
      width: 400,
      height: 30,
      rotation: 0,
      content: '★ ARTISAN ROASTERY & COFFEE BAR ★',
      color: '#A0AEC0',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

// Generates 5-layer editable layout for "Golden Retriever Pet Aquarela"
export function getPetWatercolorTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `pet-bg-${timestamp}`,
      name: 'Fundo: Claro Neutro',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 800,
      height: 380,
      rotation: 0,
      content: '',
      color: '#F7FAFC',
    },
    {
      id: `pet-photo-${timestamp}`,
      name: 'Foto do Pet (Polaroid)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 50,
      width: 230,
      height: 260,
      rotation: -6,
      content: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      strokeColor: '#FFFFFF',
      strokeWidth: 6,
    },
    {
      id: `pet-name-${timestamp}`,
      name: 'Texto: Nome do Seu Pet',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 350,
      y: 110,
      width: 400,
      height: 60,
      rotation: 0,
      content: 'Thor & Amigos',
      color: '#2B6CB0',
      fontSize: 48,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `pet-sub-${timestamp}`,
      name: 'Texto: O Melhor Amigo do Mundo',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 350,
      y: 180,
      width: 400,
      height: 40,
      rotation: 0,
      content: 'O melhor amigo de quatro patas 🐾',
      color: '#4A5568',
      fontSize: 20,
      fontFamily: 'Montserrat, sans-serif',
      fontStyle: 'italic',
    },
    {
      id: `pet-quote-${timestamp}`,
      name: 'Texto: Amor Incondicional',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 85,
      blendMode: 'normal',
      x: 350,
      y: 230,
      width: 400,
      height: 30,
      rotation: 0,
      content: 'Amor incondicional em cada latido e abraço.',
      color: '#718096',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
    },
  ];
}

// Generates 5-layer editable layout for "Cyberpunk Retrowave 80s"
export function getCyberpunkRetrowaveTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `cyber-bg-${timestamp}`,
      name: 'Fundo: Dark Synthwave (#0D0221)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 800,
      height: 380,
      rotation: 0,
      content: '',
      color: '#0D0221',
    },
    {
      id: `cyber-art-${timestamp}`,
      name: 'Ilustração: Sol Neon Synthwave',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 95,
      blendMode: 'screen',
      x: 90,
      y: 50,
      width: 250,
      height: 260,
      rotation: 0,
      content: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: `cyber-title-${timestamp}`,
      name: 'Texto: RETROWAVE',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 370,
      y: 100,
      width: 390,
      height: 60,
      rotation: 0,
      content: 'RETROWAVE',
      color: '#FF007F',
      fontSize: 48,
      fontFamily: 'Impact, Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `cyber-sub-${timestamp}`,
      name: 'Texto: 1984 CYBER DRIVE',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 370,
      y: 170,
      width: 390,
      height: 40,
      rotation: 0,
      content: '1984 • SYNTH CYBER DRIVE',
      color: '#00F0FF',
      fontSize: 22,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `cyber-badge-${timestamp}`,
      name: 'Texto: OUTRUN SPEED & NEON',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 85,
      blendMode: 'normal',
      x: 370,
      y: 225,
      width: 390,
      height: 30,
      rotation: 0,
      content: 'HIGH SPEED ARCADE SOUNDTRACK',
      color: '#FFE600',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

// Generates 16-layer editable layout for "Feliz Natal • Bolas & Estrelas Douradas" (Canva Model)
export function getFelizNatalTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    // 1. Clean White Background
    {
      id: `natal-bg-${timestamp}`,
      name: 'Fundo: Branco Natalino (#FFFFFF)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 756,
      height: 359,
      rotation: 0,
      content: '',
      color: '#FFFFFF',
    },
    // 2. Detailed Textured Christmas Bauble (Top-Right)
    {
      id: `LBmY8c0YqchR3gD7-${timestamp}`,
      name: 'Bolinha de Natal Vermelha (Topo Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 430,
      y: 12,
      width: 135,
      height: 195,
      rotation: 12,
      content: CHRISTMAS_BAUBLE_RED_SVG,
    },
    // 3. Detailed Textured Christmas Bauble (Top-Left)
    {
      id: `LB4MNCnC61b6GxpQ-${timestamp}`,
      name: 'Bolinha de Natal Vermelha (Topo Esquerda)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 185,
      y: 12,
      width: 135,
      height: 195,
      rotation: -12,
      content: CHRISTMAS_BAUBLE_RED_SVG,
    },
    // 4. Detailed Textured Christmas Bauble (Far-Right)
    {
      id: `LBCr4CHdYKwyKzRs-${timestamp}`,
      name: 'Bolinha de Natal Vermelha (Lateral Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 620,
      y: 125,
      width: 125,
      height: 180,
      rotation: 15,
      content: CHRISTMAS_BAUBLE_RED_SVG,
    },
    // 5. Detailed Textured Christmas Bauble (Center-Left)
    {
      id: `LBcS0zkJGHV8XF9N-${timestamp}`,
      name: 'Bolinha de Natal Vermelha (Centro Esquerda)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 12,
      y: 125,
      width: 130,
      height: 190,
      rotation: -15,
      content: CHRISTMAS_BAUBLE_RED_SVG,
    },
    // 6. Detailed Textured Christmas Bauble (Base Direita)
    {
      id: `LBMfL2gLncgYV3lm-${timestamp}`,
      name: 'Bolinha de Natal Vermelha (Base Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 580,
      y: 155,
      width: 130,
      height: 185,
      rotation: 10,
      content: CHRISTMAS_BAUBLE_RED_SVG,
    },
    // 7. Detailed Textured Christmas Ball (Gold Mid-Right)
    {
      id: `LB2djQtgnl67l5yW-${timestamp}`,
      name: 'Bola de Natal Dourada (Centro Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 470,
      y: 105,
      width: 150,
      height: 185,
      rotation: 18,
      content: CHRISTMAS_BALL_GOLD_SVG,
    },
    // 8. Detailed Textured Christmas Ball (Gold Mid-Left)
    {
      id: `LBQjHJLT8R4KsDsG-${timestamp}`,
      name: 'Bola de Natal Dourada (Centro Esquerda)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 130,
      y: 105,
      width: 150,
      height: 185,
      rotation: -18,
      content: CHRISTMAS_BALL_GOLD_SVG,
    },
    // 9. Detailed Textured Christmas Ball (Gold Top-Far-Right)
    {
      id: `LBJG7CPgNy4C1WC1-${timestamp}`,
      name: 'Bola de Natal Dourada (Topo Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 550,
      y: 14,
      width: 140,
      height: 170,
      rotation: 14,
      content: CHRISTMAS_BALL_GOLD_SVG,
    },
    // 10. Detailed Textured Christmas Ball (Gold Top-Center)
    {
      id: `LBqcQTLh1pMZGHsZ-${timestamp}`,
      name: 'Bola de Natal Dourada (Topo Centro)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 68,
      y: 14,
      width: 140,
      height: 170,
      rotation: -14,
      content: CHRISTMAS_BALL_GOLD_SVG,
    },
    // 11. Center Ornament / Festive Tree Badge Canva Asset
    {
      id: `LByxmWrdL06Hp2Bd-${timestamp}`,
      name: 'Guirlanda & Moldura Natalina Central',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 253,
      y: 18,
      width: 250,
      height: 322,
      rotation: 0,
      content: 'https://media-public.canva.com/jJKXY/MAGcTmjJKXY/1/tl.png',
    },
    // 12. Text "Feliz"
    {
      id: `LBZkFf1Q3wBMdYdN-${timestamp}`,
      name: 'Texto: Feliz',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 278,
      y: 128,
      width: 200,
      height: 75,
      rotation: -4,
      content: 'Feliz',
      color: '#FFFFFF',
      fontSize: 60,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
      strokeColor: '#660000',
      strokeWidth: 3,
    },
    // 13. Text "Natal"
    {
      id: `LBxCpZVKTKVS5WRP-${timestamp}`,
      name: 'Texto: Natal',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 286,
      y: 195,
      width: 184,
      height: 75,
      rotation: -2,
      content: 'Natal',
      color: '#FFFFFF',
      fontSize: 60,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
      strokeColor: '#660000',
      strokeWidth: 3,
    },
    // 14. Hand Drawn Line Divider
    {
      id: `LBCQ0fvS9ZhvjvJh-${timestamp}`,
      name: 'Divisor Linha Elegante',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 278,
      y: 275,
      width: 200,
      height: 26,
      rotation: 0,
      content: CHRISTMAS_DIVIDER_SVG,
    },
    // 15. Star Organic
    {
      id: `LBsrdCjRPDrDfNBK-${timestamp}`,
      name: 'Estrela Dourada Orgânica',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 358,
      y: 6,
      width: 40,
      height: 40,
      rotation: 0,
      content: CHRISTMAS_STAR_SVG,
    },
    // 16. Hand Drawn Sun Rays
    {
      id: `LBLkLkvc1MCbBkQ9-${timestamp}`,
      name: 'Raios de Luz / Brilho de Natal',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 355,
      y: 52,
      width: 46,
      height: 75,
      rotation: 90,
      content: CHRISTMAS_RAYS_SVG,
    },
  ];
}

// Generates 18-layer editable layout for "Feliz Natal 2025 • Pattern Ho Ho Ho & Borda Verde"
export function getNatalHoHoPatternTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `hoho-bg-${timestamp}`,
      name: 'Fundo: Branco (#FFFFFF)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 756,
      height: 359,
      rotation: 0,
      content: '',
      color: '#FFFFFF',
    },
    {
      id: `hoho-pattern-left-${timestamp}`,
      name: 'Pattern Ho Ho Ho Vermelho (Esq)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 6,
      y: -4,
      width: 372,
      height: 372,
      rotation: 0,
      content: 'https://media-public.canva.com/bf79E/MAFc5zbf79E/1/tl.jpg',
    },
    {
      id: `hoho-pattern-right-${timestamp}`,
      name: 'Pattern Ho Ho Ho Vermelho (Dir)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 378,
      y: -4,
      width: 372,
      height: 372,
      rotation: 0,
      content: 'https://media-public.canva.com/bf79E/MAFc5zbf79E/1/tl.jpg',
    },
    {
      id: `hoho-top-bar-${timestamp}`,
      name: 'Faixa Superior Verde (#046D3B)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: -15,
      y: -4,
      width: 787,
      height: 31,
      rotation: 0,
      content: '',
      color: '#046D3B',
    },
    // Repeated Typographic Grid
    {
      id: `hoho-fn1-${timestamp}`,
      name: 'Texto: Feliz Natal! (Base Esq)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 32,
      y: 323,
      width: 130,
      height: 28,
      rotation: 0,
      content: 'Feliz Natal!',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-fn2-${timestamp}`,
      name: 'Texto: Feliz Natal! (Base Centro)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 397,
      y: 323,
      width: 135,
      height: 28,
      rotation: 0,
      content: 'Feliz Natal!',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-fn3-${timestamp}`,
      name: 'Texto: Feliz Natal! (Centro)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 403,
      y: 140,
      width: 125,
      height: 28,
      rotation: 0,
      content: 'Feliz Natal!',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-fn4-${timestamp}`,
      name: 'Texto: Feliz Natal! (Meio Esq)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 7,
      y: 140,
      width: 180,
      height: 28,
      rotation: 0,
      content: 'Feliz Natal!',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-fn5-${timestamp}`,
      name: 'Texto: Feliz Natal! (Centro-Esq)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 204,
      y: 232,
      width: 150,
      height: 28,
      rotation: 0,
      content: 'Feliz Natal!',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-fn6-${timestamp}`,
      name: 'Texto: Feliz Natal! (Centro-Dir)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 599,
      y: 232,
      width: 115,
      height: 28,
      rotation: 0,
      content: 'Feliz Natal!',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-fn7-${timestamp}`,
      name: 'Texto: Feliz Natal! (Topo Esq)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 216,
      y: 48,
      width: 125,
      height: 28,
      rotation: 0,
      content: 'Feliz Natal!',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-fn8-${timestamp}`,
      name: 'Texto: Feliz Natal! (Topo Dir)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 591,
      y: 48,
      width: 130,
      height: 28,
      rotation: 0,
      content: 'Feliz Natal!',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    // 2025 Badges
    {
      id: `hoho-yr1-${timestamp}`,
      name: 'Texto: 2025 (Centro)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 415,
      y: 232,
      width: 100,
      height: 28,
      rotation: 0,
      content: '2025',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-yr2-${timestamp}`,
      name: 'Texto: 2025 (Esq)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 48,
      y: 232,
      width: 90,
      height: 28,
      rotation: 0,
      content: '2025',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-yr3-${timestamp}`,
      name: 'Texto: 2025 (Base Centro)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 244,
      y: 323,
      width: 70,
      height: 28,
      rotation: 0,
      content: '2025',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `hoho-yr4-${timestamp}`,
      name: 'Texto: 2025 (Base Dir)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 628,
      y: 323,
      width: 60,
      height: 28,
      rotation: 0,
      content: '2025',
      color: '#046D3B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
  ];
}

// Generates 10-layer editable layout for "Feliz Natal • Papai Noel Aquarela & Foto Polaroid"
export function getNatalSantaWatercolorTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `santa-bg-${timestamp}`,
      name: 'Fundo: Branco (#FFFFFF)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 756,
      height: 359,
      rotation: 0,
      content: '',
      color: '#FFFFFF',
    },
    {
      id: `santa-pat1-${timestamp}`,
      name: 'Fundo: Pattern Papai Noel Suave (Esq)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 15,
      blendMode: 'multiply',
      x: -6,
      y: 0,
      width: 403,
      height: 379,
      rotation: 0,
      content: 'https://media-public.canva.com/vLo4g/MAFzhCvLo4g/1/tl.png',
    },
    {
      id: `santa-pat2-${timestamp}`,
      name: 'Fundo: Pattern Papai Noel Suave (Dir)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 15,
      blendMode: 'multiply',
      x: 357,
      y: -7,
      width: 403,
      height: 379,
      rotation: 0,
      content: 'https://media-public.canva.com/vLo4g/MAFzhCvLo4g/1/tl.png',
    },
    {
      id: `santa-frame-${timestamp}`,
      name: 'Moldura Natalina com Guirlanda',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 65,
      y: 36,
      width: 262,
      height: 277,
      rotation: 0,
      content: 'https://media-public.canva.com/rPopk/MAF2M2rPopk/1/t.png',
    },
    {
      id: `santa-photo-${timestamp}`,
      name: 'Foto da Família (Polaroid)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 79,
      y: 69,
      width: 232,
      height: 229,
      rotation: 0,
      content: 'https://media-public.canva.com/MAC0ixEICAM/1/thumbnail_large-1.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `santa-claus-art-${timestamp}`,
      name: 'Ilustração: Papai Noel em Aquarela',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 267,
      y: 36,
      width: 222,
      height: 287,
      rotation: 0,
      content: 'https://media-public.canva.com/6UVow/MAFssT6UVow/1/t.png',
    },
    {
      id: `santa-tree-art-${timestamp}`,
      name: 'Ilustração: Árvore de Natal com Presentes',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 532,
      y: -19,
      width: 336,
      height: 386,
      rotation: 0,
      content: 'https://media-public.canva.com/76q9A/MAFQCZ76q9A/1/tl.png',
    },
    {
      id: `santa-text-feliz-${timestamp}`,
      name: 'Texto: Feliz',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 413,
      y: 98,
      width: 250,
      height: 67,
      rotation: -14,
      content: 'Feliz',
      color: '#B40000',
      fontSize: 58,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `santa-text-natal-${timestamp}`,
      name: 'Texto: Natal!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 402,
      y: 151,
      width: 295,
      height: 79,
      rotation: -14,
      content: 'Natal!',
      color: '#B40000',
      fontSize: 62,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `santa-text-date-${timestamp}`,
      name: 'Texto: 25/12/2024',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 439,
      y: 247,
      width: 182,
      height: 25,
      rotation: 0,
      content: '25/12/2024',
      color: '#B40000',
      fontSize: 18,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

// Generates 15-layer editable layout for "Natal Mágico • 3 Selos Postais & Árvore Vintage"
export function getNatalVintageStampsTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `stamps-bg-${timestamp}`,
      name: 'Fundo: Creme Vintage (#FDF8F1)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 756,
      height: 359,
      rotation: 0,
      content: '',
      color: '#FDF8F1',
    },
    {
      id: `stamps-tree-${timestamp}`,
      name: 'Ilustração: Árvore de Natal Desenho',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 92,
      y: 26,
      width: 288,
      height: 446,
      rotation: 0,
      content: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: `stamps-pink-bauble-${timestamp}`,
      name: 'Enfeite: Bolinha Rosa',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 659,
      y: 163,
      width: 109,
      height: 149,
      rotation: 22.9,
      content: CHRISTMAS_BAUBLE_RED_SVG,
    },
    {
      id: `stamps-red-bauble-${timestamp}`,
      name: 'Enfeite: Bolinha Vermelha',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: -23,
      y: 91,
      width: 95,
      height: 177,
      rotation: -25.3,
      content: 'https://media-public.canva.com/KrO-4/MAExVAKrO-4/1/t.png',
    },
    {
      id: `stamps-ribbon-${timestamp}`,
      name: 'Fita e Laço Superior',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 62,
      y: -30,
      width: 87,
      height: 166,
      rotation: 0,
      content: 'https://media-public.canva.com/1IuX8/MAGYUn1IuX8/1/t.png',
    },
    // 3 Stamp Photos
    {
      id: `stamps-photo1-${timestamp}`,
      name: 'Selo Postal 1: Foto Família na Árvore',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 240,
      y: 147,
      width: 186,
      height: 195,
      rotation: -4.2,
      content: 'https://media-public.canva.com/Q7zyI/MAGZQcQ7zyI/1/t.jpg',
      strokeColor: '#C2A68C',
      strokeWidth: 4,
    },
    {
      id: `stamps-photo2-${timestamp}`,
      name: 'Selo Postal 2: Foto Abraço de Natal',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 135,
      y: 190,
      width: 64,
      height: 67,
      rotation: 16.1,
      content: 'https://media-public.canva.com/k6llY/MAGZMhk6llY/1/t.jpg',
      strokeColor: '#C2A68C',
      strokeWidth: 3,
    },
    {
      id: `stamps-photo3-${timestamp}`,
      name: 'Selo Postal 3: Foto Presentes',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 194,
      y: 55,
      width: 64,
      height: 67,
      rotation: -3.5,
      content: 'https://media-public.canva.com/eOhvc/MAGZKSeOhvc/1/t.jpg',
      strokeColor: '#C2A68C',
      strokeWidth: 3,
    },
    // Golden Atomic Stars
    {
      id: `stamps-star1-${timestamp}`,
      name: 'Estrela Dourada (Topo)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 307,
      y: 69,
      width: 38,
      height: 51,
      rotation: 0,
      content: CHRISTMAS_STAR_SVG,
    },
    {
      id: `stamps-star2-${timestamp}`,
      name: 'Estrela Dourada (Base)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 417,
      y: 264,
      width: 30,
      height: 40,
      rotation: -12.1,
      content: CHRISTMAS_STAR_SVG,
    },
    {
      id: `stamps-star3-${timestamp}`,
      name: 'Estrela Dourada (Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 530,
      y: 26,
      width: 32,
      height: 43,
      rotation: 0,
      content: CHRISTMAS_STAR_SVG,
    },
    // Lettering & Typography
    {
      id: `stamps-lettering-${timestamp}`,
      name: 'Lettering: Feliz Natal',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 406,
      y: 76,
      width: 217,
      height: 80,
      rotation: 0,
      content: 'Feliz Natal',
      color: '#1A615E',
      fontSize: 52,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `stamps-msg-${timestamp}`,
      name: 'Texto: Mensagem de Amor, Paz & União',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 450,
      y: 180,
      width: 280,
      height: 50,
      rotation: 0,
      content: 'Que seu natal seja repleto de amor, paz & união ✨',
      color: '#1A615E',
      fontSize: 14,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
  ];
}

// Generates 10-layer editable layout for "Merry Christmas • Árvore Aquarela & Dupla Polaroid"
export function getNatalMerryChristmasPolaroidTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `mc-bg-${timestamp}`,
      name: 'Fundo: Textura Suave (#FFFFFF)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: true,
      opacity: 100,
      blendMode: 'normal',
      x: 0,
      y: 0,
      width: 756,
      height: 359,
      rotation: 0,
      content: '',
      color: '#FFFFFF',
    },
    {
      id: `mc-title-merry-${timestamp}`,
      name: 'Texto: Merry',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 42,
      y: 69,
      width: 326,
      height: 70,
      rotation: 0,
      content: 'Merry',
      color: '#15803D',
      fontSize: 60,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `mc-title-christmas-${timestamp}`,
      name: 'Texto: Christmas',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 42,
      y: 135,
      width: 326,
      height: 70,
      rotation: 0,
      content: 'Christmas',
      color: '#B91C1C',
      fontSize: 60,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `mc-msg-${timestamp}`,
      name: 'Texto: Mensagem de União',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 42,
      y: 220,
      width: 330,
      height: 30,
      rotation: 0,
      content: 'Que seu natal seja repleto de amor, paz & união',
      color: '#75A003',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `mc-tree-${timestamp}`,
      name: 'Ilustração: Árvore de Natal',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 356,
      y: -50,
      width: 390,
      height: 480,
      rotation: 0,
      content: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: `mc-polaroid1-${timestamp}`,
      name: 'Foto Polaroid 1 (Família)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 494,
      y: 88,
      width: 183,
      height: 183,
      rotation: 13.2,
      content: 'https://media-public.canva.com/KYv60/MAEIzHKYv60/1/t.jpg',
      strokeColor: '#E2E8F0',
      strokeWidth: 6,
    },
    {
      id: `mc-polaroid2-${timestamp}`,
      name: 'Foto Polaroid 2 (Momentos)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 433,
      y: 156,
      width: 129,
      height: 129,
      rotation: -13.9,
      content: 'https://media-public.canva.com/KYv60/MAEIzHKYv60/1/t.jpg',
      strokeColor: '#E2E8F0',
      strokeWidth: 5,
    },
    {
      id: `mc-bauble1-${timestamp}`,
      name: 'Enfeite Natalino (Lateral)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 690,
      y: 124,
      width: 70,
      height: 110,
      rotation: 15.5,
      content: CHRISTMAS_BAUBLE_RED_SVG,
    },
    {
      id: `mc-bauble2-${timestamp}`,
      name: 'Enfeite Natalino (Topo)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 87,
      y: -38,
      width: 63,
      height: 101,
      rotation: -13.6,
      content: CHRISTMAS_BALL_GOLD_SVG,
    },
  ];
}


