import { Layer } from '../types';
import { CanvaTemplateItem } from './canvaTemplates';

// =======================================================
// 1. DIA DAS MÃES - VECTOR SVG PREVIEWS (200x95mm 756x359px)
// =======================================================

// 1. Moldura Floral & Foto com Amor (Design 1)
export const CANVA_MAES_MOLDURA_FLORAL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m1Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fdfbf7" />
    </linearGradient>
    <filter id="m1Shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-opacity="0.15" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#m1Bg)" />

  <!-- Botanical corner branches -->
  <g fill="#A8AF74" opacity="0.85">
    <!-- Top Left Floral -->
    <path d="M 10 10 Q 50 15 70 45 Q 90 20 130 30 Q 110 70 80 80 Q 40 90 20 60 Z" />
    <!-- Bottom Right Floral -->
    <path d="M 740 340 Q 700 335 680 305 Q 660 330 620 320 Q 640 280 670 270 Q 710 260 730 290 Z" />
  </g>

  <!-- Photo Frame Left with Olive / Sage Border -->
  <g transform="translate(75, 45)" filter="url(#m1Shadow)">
    <rect width="225" height="235" rx="35" fill="#A8AF74" />
    <rect x="8" y="8" width="209" height="219" rx="28" fill="#F4F5EE" />
    <!-- Photo placeholder -->
    <circle cx="112" cy="95" r="32" fill="#CBD5E1" />
    <path d="M 70 175 C 70 135 95 130 112 130 C 130 130 155 135 155 175 Z" fill="#CBD5E1" />
    <circle cx="140" cy="115" r="20" fill="#94A3B8" />
    <path d="M 115 185 C 115 155 130 150 140 150 C 150 150 165 155 165 185 Z" fill="#94A3B8" />
    <!-- Heart line accent at bottom of frame -->
    <g stroke="#E86A78" stroke-width="2" fill="none" stroke-linecap="round" transform="translate(30, 205)">
      <path d="M 10 5 Q 15 0 20 5 Q 25 0 30 5 L 20 15 Z" fill="#E86A78" />
      <line x1="35" y1="10" x2="135" y2="10" stroke="#A8AF74" stroke-width="1.5" stroke-dasharray="3 3" />
    </g>
  </g>

  <!-- Floating red hearts -->
  <g fill="#E86A78" opacity="0.8">
    <path d="M 305 50 Q 312 40 320 50 Q 328 40 335 50 Q 335 62 320 74 Q 305 62 305 50 Z" transform="scale(0.85) rotate(-12 320 50)" />
    <path d="M 670 70 Q 675 62 680 70 Q 685 62 690 70 Q 690 80 680 90 Q 670 80 670 70 Z" transform="scale(0.8) rotate(15 680 70)" />
  </g>

  <!-- Right: Decorative Calligraphy & Message -->
  <g transform="translate(420, 65)">
    <!-- Happy Mother's Day Script Calligraphy -->
    <text x="50" y="70" font-family="'Playfair Display', 'Brush Script MT', Georgia, serif" font-style="italic" font-size="52" font-weight="bold" fill="#788047" text-anchor="middle">Feliz dia</text>
    <text x="140" y="130" font-family="'Playfair Display', 'Brush Script MT', Georgia, serif" font-style="italic" font-size="56" font-weight="bold" fill="#A8AF74" text-anchor="middle">das mães</text>

    <!-- Subtitle dedication -->
    <text x="100" y="195" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600" fill="#4B5563" text-anchor="middle">Para a mãe mais carinhosa e especial do mundo ♡</text>

    <!-- Botanical flower spray -->
    <g transform="translate(60, 215)" fill="#A8AF74">
      <circle cx="20" cy="15" r="4" /><circle cx="35" cy="10" r="3" /><circle cx="50" cy="18" r="4" />
      <path d="M 0 15 Q 40 8 80 15" stroke="#A8AF74" stroke-width="1.5" fill="none" />
    </g>
  </g>
</svg>
`)}`;

// 2. Margaridas & Para a Pessoa Mais Especial (Design 2)
export const CANVA_MAES_MARGARIDAS_ESPECIAL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m2Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fff5f5" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#m2Bg)" />

  <!-- Daisy Doodles around borders -->
  <!-- Top Left Daisy -->
  <g transform="translate(100, 15) rotate(-45)">
    <g fill="#FDE047" stroke="#CA8A04" stroke-width="1.5">
      <ellipse cx="40" cy="20" rx="10" ry="16" /><ellipse cx="20" cy="40" rx="16" ry="10" />
      <ellipse cx="40" cy="60" rx="10" ry="16" /><ellipse cx="60" cy="40" rx="16" ry="10" />
      <ellipse cx="26" cy="26" rx="12" ry="12" /><ellipse cx="54" cy="26" rx="12" ry="12" />
      <ellipse cx="26" cy="54" rx="12" ry="12" /><ellipse cx="54" cy="54" rx="12" ry="12" />
    </g>
    <circle cx="40" cy="40" r="12" fill="#EAB308" stroke="#CA8A04" stroke-width="2" />
  </g>

  <!-- Top Right Daisy -->
  <g transform="translate(560, -10) scale(0.9)">
    <g fill="#FFFFFF" stroke="#F43F5E" stroke-width="1.5">
      <circle cx="40" cy="20" r="12" /><circle cx="20" cy="40" r="12" /><circle cx="40" cy="60" r="12" /><circle cx="60" cy="40" r="12" />
    </g>
    <circle cx="40" cy="40" r="14" fill="#FDE047" stroke="#E11D48" stroke-width="2" />
  </g>

  <!-- Bottom Left Daisy -->
  <g transform="translate(-20, 140) scale(0.95)">
    <g fill="#FFFFFF" stroke="#FB7185" stroke-width="1.5">
      <circle cx="40" cy="20" r="12" /><circle cx="20" cy="40" r="12" /><circle cx="40" cy="60" r="12" /><circle cx="60" cy="40" r="12" />
    </g>
    <circle cx="40" cy="40" r="14" fill="#FDE047" stroke="#E11D48" stroke-width="2" />
  </g>

  <!-- Bottom Center Daisy -->
  <g transform="translate(340, 270) scale(0.9)">
    <g fill="#FFFFFF" stroke="#FB7185" stroke-width="1.5">
      <circle cx="40" cy="20" r="12" /><circle cx="20" cy="40" r="12" /><circle cx="40" cy="60" r="12" /><circle cx="60" cy="40" r="12" />
    </g>
    <circle cx="40" cy="40" r="14" fill="#FDE047" stroke="#E11D48" stroke-width="2" />
  </g>

  <!-- Pink Crayon Hearts -->
  <g fill="#E86A78" opacity="0.85">
    <path d="M 75 270 C 55 245 85 220 105 240 C 125 220 155 245 135 270 Q 105 310 75 270 Z" transform="scale(0.7) rotate(-21 100 270)" />
    <path d="M 195 195 C 180 175 200 155 215 170 C 230 155 250 175 235 195 Q 215 225 195 195 Z" transform="scale(0.6) rotate(22 215 195)" />
    <path d="M 525 185 C 510 165 530 145 545 160 C 560 145 580 165 565 185 Q 545 215 525 185 Z" transform="scale(0.6) rotate(-24 545 185)" />
  </g>

  <!-- Polka Dots -->
  <circle cx="705" cy="40" r="6" fill="#E86A78" />
  <circle cx="615" cy="210" r="6" fill="#FFBBBB" />
  <circle cx="530" cy="315" r="6" fill="#E86A78" />
  <circle cx="200" cy="295" r="6" fill="#FFBBBB" />
  <circle cx="100" cy="150" r="6" fill="#E86A78" />
  <circle cx="275" cy="35" r="6" fill="#FFBBBB" />
  <circle cx="465" cy="70" r="6" fill="#FFBBBB" />

  <!-- Center Typography -->
  <g transform="translate(378, 120)">
    <!-- "Feliz dia" -->
    <text x="0" y="30" font-family="'Playfair Display', Georgia, serif" font-size="58" font-weight="700" fill="#E86A78" text-anchor="middle">Feliz dia</text>
    <!-- "das mães" -->
    <text x="0" y="90" font-family="'Playfair Display', Georgia, serif" font-size="58" font-weight="700" fill="#E86A78" text-anchor="middle">das mães</text>
    <!-- Subtitle: Para a pessoa mais especial da minha vida -->
    <text x="0" y="140" font-family="'Montserrat', sans-serif" font-size="17" font-weight="600" fill="#CE3D4E" text-anchor="middle">Para a pessoa mais especial</text>
    <text x="0" y="165" font-family="'Montserrat', sans-serif" font-size="17" font-weight="600" fill="#CE3D4E" text-anchor="middle">da minha vida ♡</text>
  </g>
</svg>
`)}`;

// 3. Força, Coragem & Determinação • Botânico Clean (Design 3)
export const CANVA_MAES_FORCA_BOTANICO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m3Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fafafa" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#m3Bg)" />

  <!-- Botanical Line Detail Flowers (Top Right & Bottom Left) -->
  <g stroke="#1F2937" stroke-width="1.8" fill="none" opacity="0.75">
    <!-- Bottom Left Branch -->
    <g transform="translate(-10, 200) rotate(-15)">
      <path d="M 0 100 Q 80 50 180 30" />
      <ellipse cx="60" cy="70" rx="16" ry="7" transform="rotate(-30 60 70)" fill="#F3F4F6" />
      <ellipse cx="110" cy="50" rx="18" ry="8" transform="rotate(25 110 50)" fill="#F3F4F6" />
      <ellipse cx="160" cy="35" rx="14" ry="6" transform="rotate(-15 160 35)" fill="#F3F4F6" />
    </g>
    <!-- Top Right Branch -->
    <g transform="translate(580, -20) rotate(15)">
      <path d="M 0 30 Q 80 50 180 100" />
      <ellipse cx="40" cy="35" rx="14" ry="6" transform="rotate(-25 40 35)" fill="#F3F4F6" />
      <ellipse cx="90" cy="55" rx="18" ry="8" transform="rotate(30 90 55)" fill="#F3F4F6" />
      <ellipse cx="140" cy="80" rx="16" ry="7" transform="rotate(-15 140 80)" fill="#F3F4F6" />
    </g>
    <!-- Top Left Hanging Leaf -->
    <g transform="translate(230, 80) rotate(-10)" opacity="0.6">
      <path d="M 0 0 Q 20 60 10 130" />
      <ellipse cx="5" cy="40" rx="12" ry="5" transform="rotate(30 5 40)" />
      <ellipse cx="12" cy="85" rx="14" ry="6" transform="rotate(-35 12 85)" />
    </g>
    <!-- Top Right Hanging Leaf -->
    <g transform="translate(480, 20) scale(-1, 1) rotate(-10)" opacity="0.6">
      <path d="M 0 0 Q 20 60 10 130" />
      <ellipse cx="5" cy="40" rx="12" ry="5" transform="rotate(30 5 40)" />
      <ellipse cx="12" cy="85" rx="14" ry="6" transform="rotate(-35 12 85)" />
    </g>
  </g>

  <!-- Center Big Cursive "mãe" -->
  <g transform="translate(378, 145)">
    <text x="0" y="40" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="95" font-weight="bold" fill="#111827" text-anchor="middle">mãe</text>
  </g>

  <!-- Emotional Dedication Text Block -->
  <g transform="translate(378, 240)">
    <text x="0" y="0" font-family="'Montserrat', sans-serif" font-size="12.5" font-weight="700" fill="#000000" text-anchor="middle">Sua força, coragem e determinação foram essenciais em todos</text>
    <text x="0" y="20" font-family="'Montserrat', sans-serif" font-size="12.5" font-weight="700" fill="#000000" text-anchor="middle">os meus passos. Tudo que sou hoje é graças a você, mãe!</text>
    <text x="0" y="45" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="15" font-weight="bold" fill="#E11D48" text-anchor="middle">Te amo demais! ♡</text>
  </g>
</svg>
`)}`;

// 4. Melhor Mãe • Pop Like Icons (Design 4)
export const CANVA_MAES_MELHOR_MAE_ICONS_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m4Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f0fdfa" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#m4Bg)" />

  <!-- Floating Thumbs Up / Heart Like Icons in Modern 3D Pastel Style -->
  <!-- Top Left Like -->
  <g transform="translate(45, -15) rotate(-10) scale(0.65)">
    <rect width="120" height="120" rx="30" fill="#67C6C8" />
    <path d="M 60 30 Q 75 15 90 30 Q 105 15 120 30 Q 120 55 90 85 Q 60 55 60 30 Z" fill="#FFFFFF" transform="translate(-30, 10)" />
  </g>

  <!-- Left Bottom Like -->
  <g transform="translate(40, 220) rotate(-24) scale(0.4)">
    <rect width="120" height="120" rx="30" fill="#67C6C8" />
    <path d="M 60 30 Q 75 15 90 30 Q 105 15 120 30 Q 120 55 90 85 Q 60 55 60 30 Z" fill="#FFFFFF" transform="translate(-30, 10)" />
  </g>

  <!-- Center Left Thumbs Up -->
  <g transform="translate(415, 160) rotate(45) scale(0.45)">
    <rect width="120" height="120" rx="30" fill="#F472B6" />
    <path d="M 60 30 Q 75 15 90 30 Q 105 15 120 30 Q 120 55 90 85 Q 60 55 60 30 Z" fill="#FFFFFF" transform="translate(-30, 10)" />
  </g>

  <!-- Top Right Big Like -->
  <g transform="translate(545, 100) rotate(6) scale(0.65)">
    <rect width="120" height="120" rx="30" fill="#67C6C8" />
    <path d="M 60 30 Q 75 15 90 30 Q 105 15 120 30 Q 120 55 90 85 Q 60 55 60 30 Z" fill="#FFFFFF" transform="translate(-30, 10)" />
  </g>

  <!-- Bottom Right Like -->
  <g transform="translate(600, 310) rotate(25) scale(0.7)">
    <rect width="120" height="120" rx="30" fill="#67C6C8" />
    <path d="M 60 30 Q 75 15 90 30 Q 105 15 120 30 Q 120 55 90 85 Q 60 55 60 30 Z" fill="#FFFFFF" transform="translate(-30, 10)" />
  </g>

  <!-- Bottom Center Like -->
  <g transform="translate(350, 305) rotate(-14) scale(0.55)">
    <rect width="120" height="120" rx="30" fill="#F472B6" />
    <path d="M 60 30 Q 75 15 90 30 Q 105 15 120 30 Q 120 55 90 85 Q 60 55 60 30 Z" fill="#FFFFFF" transform="translate(-30, 10)" />
  </g>

  <!-- Left: Big Display "MELHOR MÃE" -->
  <g transform="translate(130, 80)">
    <!-- Custom stylized title -->
    <text x="140" y="70" font-family="'Impact', 'Arial Black', sans-serif" font-size="80" font-weight="900" fill="#67C6C8" text-anchor="middle">MELHOR</text>
    <text x="140" y="165" font-family="'Impact', 'Arial Black', sans-serif" font-size="110" font-weight="900" fill="#F472B6" text-anchor="middle">MÃE</text>
  </g>

  <!-- Right: Message Block in Teal -->
  <g transform="translate(580, 195)">
    <text x="0" y="0" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800" fill="#0D9488" text-anchor="middle">Você é a minha maior</text>
    <text x="0" y="30" font-family="'Montserrat', sans-serif" font-size="20" font-weight="800" fill="#0D9488" text-anchor="middle">inspiração da vida.</text>
    <text x="0" y="65" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="28" font-weight="bold" fill="#E11D48" text-anchor="middle">Te amo! ♡</text>
  </g>
</svg>
`)}`;

// 5. Aquarela Floral Rosé & Inspiração da Minha Vida (Design 5)
export const CANVA_MAES_AQUARELA_ROSE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m5Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff1f2" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#ffe4e6" />
    </linearGradient>
    <filter id="m5Soft" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#m5Bg)" />

  <!-- Watercolor wash splash -->
  <circle cx="378" cy="180" r="160" fill="#FFE4E6" filter="url(#m5Soft)" opacity="0.6" />

  <!-- Lush Watercolor Flower Compositions (Top Left & Bottom Right) -->
  <!-- Top Left Bouquet -->
  <g transform="translate(-40, -100) rotate(14)">
    <circle cx="150" cy="150" r="60" fill="#FB7185" opacity="0.8" />
    <circle cx="210" cy="180" r="45" fill="#FDA4AF" opacity="0.85" />
    <circle cx="130" cy="210" r="50" fill="#F43F5E" opacity="0.75" />
    <!-- Leaves -->
    <ellipse cx="90" cy="130" rx="35" ry="15" transform="rotate(-30 90 130)" fill="#84CC16" opacity="0.7" />
    <ellipse cx="240" cy="140" rx="40" ry="16" transform="rotate(35 240 140)" fill="#65A30D" opacity="0.65" />
  </g>

  <!-- Bottom Right Bouquet -->
  <g transform="translate(560, 160) rotate(14)">
    <circle cx="150" cy="150" r="60" fill="#FB7185" opacity="0.8" />
    <circle cx="90" cy="120" r="45" fill="#FDA4AF" opacity="0.85" />
    <circle cx="170" cy="90" r="50" fill="#F43F5E" opacity="0.75" />
    <!-- Leaves -->
    <ellipse cx="210" cy="170" rx="35" ry="15" transform="rotate(30 210 170)" fill="#84CC16" opacity="0.7" />
    <ellipse cx="60" cy="160" rx="40" ry="16" transform="rotate(-35 60 160)" fill="#65A30D" opacity="0.65" />
  </g>

  <!-- Abstract Splatter Dots -->
  <g fill="#1F2937" opacity="0.4">
    <circle cx="580" cy="35" r="2.5" /><circle cx="595" cy="50" r="1.5" /><circle cx="565" cy="65" r="2" />
    <circle cx="610" cy="30" r="3" /><circle cx="630" cy="55" r="1.8" />
    <circle cx="70" cy="280" r="2.5" /><circle cx="90" cy="295" r="1.5" /><circle cx="55" cy="310" r="2" />
  </g>

  <!-- Hand Drawn Accent Flowers -->
  <g stroke="#BE123C" stroke-width="2" fill="none" opacity="0.7">
    <circle cx="150" cy="320" r="25" /><circle cx="150" cy="320" r="10" />
    <circle cx="715" cy="80" r="20" /><circle cx="715" cy="80" r="8" />
  </g>

  <!-- Center Typography -->
  <g transform="translate(378, 80)">
    <!-- Big Script "Mother / Mãe" -->
    <text x="0" y="80" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="92" font-weight="900" fill="#BE123C" text-anchor="middle">Mãe</text>

    <!-- Message in Berry Pink -->
    <text x="0" y="160" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="23" font-weight="600" fill="#DC5776" text-anchor="middle">Você é a minha maior inspiração, te amo!</text>

    <!-- Subtitle -->
    <text x="0" y="210" font-family="'Montserrat', sans-serif" font-size="14" font-weight="800" letter-spacing="4" fill="#E11D48" text-anchor="middle">FELIZ DIA DAS MÃES</text>
  </g>
</svg>
`)}`;

// 6. A Melhor Mãe do Mundo • Orgânico & No Compasso do Seu Amor (Design 6)
export const CANVA_MAES_ORGANICO_ARCO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m6Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fdfbf7" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#m6Bg)" />

  <!-- Earthy Organic Shapes (Terracotta, Sage, Sand) -->
  <!-- Left Terracotta Blob -->
  <path d="M -80 180 C -30 120 20 190 70 260 C 120 330 30 380 -40 370 C -110 360 -130 240 -80 180 Z" fill="#D97706" opacity="0.25" />
  <!-- Right Terracotta Blob -->
  <path d="M 680 200 C 730 140 780 210 830 280 C 880 350 790 400 720 390 C 650 380 630 260 680 200 Z" fill="#D97706" opacity="0.25" />
  <!-- Top Center Sage Blob -->
  <path d="M 450 -40 C 500 20 580 -20 620 40 C 660 100 580 140 520 120 C 460 100 400 -100 450 -40 Z" fill="#78716C" opacity="0.2" />

  <!-- Organic Rainbow Arches -->
  <g transform="translate(295, 45) rotate(14)" stroke-width="5" fill="none" stroke-linecap="round">
    <path d="M 0 35 A 25 25 0 0 1 50 35" stroke="#AB8567" />
    <path d="M 8 35 A 17 17 0 0 1 42 35" stroke="#746148" />
    <path d="M 16 35 A 9 9 0 0 1 34 35" stroke="#D97706" />
  </g>
  <g transform="translate(560, 70) rotate(-20)" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M 0 30 A 20 20 0 0 1 40 30" stroke="#AB8567" />
    <path d="M 6 30 A 14 14 0 0 1 34 30" stroke="#746148" />
  </g>

  <!-- Green Heart Doodles -->
  <g fill="#15803D" opacity="0.75">
    <path d="M 185 240 Q 192 230 200 240 Q 208 230 215 240 Q 215 252 200 265 Q 185 252 185 240 Z" transform="scale(0.8)" />
    <path d="M 555 260 Q 562 250 570 260 Q 578 250 585 260 Q 585 272 570 285 Q 555 272 555 260 Z" transform="scale(0.85) rotate(6 570 260)" />
  </g>

  <!-- Left: A melhor Mãe do mundo! -->
  <g transform="translate(190, 85)">
    <text x="0" y="35" font-family="'Montserrat', sans-serif" font-size="28" font-weight="600" fill="#AB8567">A melhor</text>
    <text x="0" y="105" font-family="'Playfair Display', Georgia, serif" font-size="75" font-weight="bold" fill="#746148">Mãe</text>
    <text x="0" y="145" font-family="'Montserrat', sans-serif" font-size="24" font-weight="700" letter-spacing="3" fill="#AB8567">DO MUNDO!</text>
  </g>

  <!-- Right: Poetic Message -->
  <g transform="translate(560, 135)">
    <text x="0" y="0" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="19" font-weight="500" fill="#746148" text-anchor="middle">"No compasso do seu amor,</text>
    <text x="0" y="30" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="19" font-weight="500" fill="#746148" text-anchor="middle">encontrei meu lar.</text>
    <text x="0" y="70" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" fill="#AB8567" text-anchor="middle">Feliz Dia das Mães,</text>
    <text x="0" y="90" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" fill="#AB8567" text-anchor="middle">minha inspiração constante."</text>
  </g>
</svg>
`)}`;

// 7. Amor Aquece Mais Que Café • Papel Rasgado & Traço Afetivo (Design 7)
export const CANVA_MAES_AMOR_CAFE_RIPPED_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m7Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fdf2f8" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#m7Bg)" />

  <!-- Pink Paint Splatter & Torn Paper Edges -->
  <!-- Top Pink Torn Edge -->
  <path d="M -20 -10 L 580 -10 L 570 35 L 530 45 L 480 30 L 420 50 L 360 35 L 300 45 L 240 30 L 180 50 L 120 35 L 60 45 L 0 30 L -20 40 Z" fill="#F472B6" opacity="0.35" />
  <!-- Bottom Pink Torn Edge -->
  <path d="M 230 370 L 780 370 L 780 310 L 730 330 L 670 315 L 610 335 L 550 320 L 490 335 L 430 315 L 370 330 L 310 315 L 250 335 L 230 320 Z" fill="#F472B6" opacity="0.35" />

  <!-- Heart Outlines Floating in background -->
  <g stroke="#F472B6" stroke-width="2" fill="none" opacity="0.3">
    <path d="M 60 270 Q 75 250 90 270 Q 105 250 120 270 Q 120 295 90 320 Q 60 295 60 270 Z" transform="scale(0.8) rotate(-20 90 270)" />
    <path d="M 370 160 Q 380 145 390 160 Q 400 145 410 160 Q 410 180 390 200 Q 370 180 370 160 Z" transform="scale(0.7) rotate(15 390 160)" />
    <path d="M 670 180 Q 685 160 700 180 Q 715 160 730 180 Q 730 205 700 230 Q 670 205 670 180 Z" transform="scale(0.7) rotate(-17 700 180)" />
    <path d="M 690 30 Q 700 15 710 30 Q 720 15 730 30 Q 730 50 710 70 Q 690 50 690 30 Z" transform="scale(0.6) rotate(-17 710 30)" />
  </g>

  <!-- Left: Big 3D Styled Script "mãe" -->
  <g transform="translate(225, 75)">
    <!-- Drop Shadow Text -->
    <text x="3" y="93" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="110" font-weight="900" fill="#623A23" opacity="0.35">mãe</text>
    <!-- Foreground Text -->
    <text x="0" y="90" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="110" font-weight="900" fill="#D27FA3">mãe</text>

    <!-- Underline curve doodle -->
    <path d="M -10 115 Q 80 140 180 115" stroke="#D27FA3" stroke-width="4" fill="none" stroke-linecap="round" />

    <!-- Subtitle: seu amor aquece mais que café -->
    <text x="85" y="160" font-family="'Montserrat', sans-serif" font-size="16" font-weight="600" fill="#623A23" text-anchor="middle">seu amor aquece mais que café</text>
    <text x="85" y="185" font-family="'Montserrat', sans-serif" font-size="16" font-weight="600" fill="#623A23" text-anchor="middle">numa manhã fria.</text>

    <!-- Badge: feliz dia das mães! -->
    <text x="85" y="235" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="24" font-weight="bold" fill="#D27FA3" text-anchor="middle">feliz dia das mães!</text>
  </g>

  <!-- Right: Mother and Kid Minimalist Line Drawing Illustration -->
  <g transform="translate(480, 50)" stroke="#374151" stroke-width="2.5" fill="none" stroke-linecap="round">
    <!-- Mother Face & Hair Profile -->
    <path d="M 70 80 Q 90 40 130 50 Q 170 60 160 120 Q 150 170 120 220" />
    <path d="M 80 85 Q 110 80 115 110 Q 110 130 90 135" />
    <!-- Baby / Kid hugging -->
    <path d="M 120 150 Q 140 130 160 150 Q 180 170 160 210 Q 140 230 120 220" />
    <path d="M 135 155 Q 150 150 155 170" />
    <!-- Loving embrace arms -->
    <path d="M 90 170 Q 120 200 170 180" />
  </g>
</svg>
`)}`;

// 8. Sorriso Que Encanta & Buquê de Rosas Watercolor (Design 8)
export const CANVA_MAES_SORRISO_ROSAS_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m8Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fff1f2" />
    </linearGradient>
    <linearGradient id="sideFadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F83080" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="sideFadeRight" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#F83080" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#m8Bg)" />

  <!-- Side Glow Ribbons -->
  <rect x="0" y="0" width="140" height="359" fill="url(#sideFadeLeft)" />
  <rect x="616" y="0" width="140" height="359" fill="url(#sideFadeRight)" />

  <!-- Watercolor Rose Bouquets in Corners -->
  <!-- Top Left Bouquet -->
  <g transform="translate(-40, -40) rotate(56) scale(0.9)">
    <circle cx="120" cy="120" r="50" fill="#FB7185" opacity="0.8" />
    <circle cx="160" cy="90" r="40" fill="#F43F5E" opacity="0.85" />
    <circle cx="90" cy="150" r="45" fill="#FDA4AF" opacity="0.75" />
    <ellipse cx="60" cy="80" rx="30" ry="12" fill="#84CC16" opacity="0.7" />
  </g>
  <!-- Bottom Right Bouquet -->
  <g transform="translate(580, 190) rotate(56) scale(0.85)">
    <circle cx="120" cy="120" r="50" fill="#FB7185" opacity="0.8" />
    <circle cx="160" cy="90" r="40" fill="#F43F5E" opacity="0.85" />
    <circle cx="90" cy="150" r="45" fill="#FDA4AF" opacity="0.75" />
    <ellipse cx="60" cy="80" rx="30" ry="12" fill="#84CC16" opacity="0.7" />
  </g>

  <!-- Big Display Text "Mãe" -->
  <g transform="translate(378, 65)">
    <text x="0" y="105" font-family="'Playfair Display', Georgia, serif" font-size="118" font-weight="900" fill="#231F20" text-anchor="middle" opacity="0.92">Mãe</text>
  </g>

  <!-- Translucent White Center Banner -->
  <g transform="translate(174, 220)">
    <rect width="408" height="75" rx="8" fill="#FFFFFF" fill-opacity="0.85" stroke="#FCE7F3" stroke-width="1.5" />
    <!-- Quote -->
    <text x="204" y="28" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" fill="#231F20" text-anchor="middle">sorriso que encanta, voz que conforta,</text>
    <text x="204" y="48" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" fill="#231F20" text-anchor="middle">presença que transforma.</text>
    <text x="204" y="66" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="14" fill="#BE123C" text-anchor="middle">feliz dia das mães ♡</text>
  </g>
</svg>
`)}`;

// 9. Balões 3D & Deus Mandou Anjos (Design 9)
export const CANVA_MAES_BALOES_3D_ANJOS_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m9Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff5f9" />
      <stop offset="100%" stop-color="#ffe4f1" />
    </linearGradient>
    <linearGradient id="balloonPink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF40A8" />
      <stop offset="40%" stop-color="#FF0891" />
      <stop offset="100%" stop-color="#B80062" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#m9Bg)" />

  <!-- Top Title: FELIZ DIA DAS -->
  <g transform="translate(378, 60)">
    <!-- Left decorative branch line -->
    <path d="M -230 -10 Q -180 -10 -150 -10" stroke="#FF0891" stroke-width="2" fill="none" />
    <circle cx="-230" cy="-10" r="3" fill="#FF0891" />
    <!-- Right decorative branch line -->
    <path d="M 150 -10 Q 180 -10 230 -10" stroke="#FF0891" stroke-width="2" fill="none" />
    <circle cx="230" cy="-10" r="3" fill="#FF0891" />

    <text x="0" y="0" font-family="'Montserrat', sans-serif" font-size="28" font-weight="900" letter-spacing="6" fill="#FF0891" text-anchor="middle">FELIZ DIA DAS</text>
  </g>

  <!-- 3D Metallic Balloons: M Ã E S -->
  <g transform="translate(130, 95)">
    <!-- Letter M -->
    <g transform="translate(30, 0)">
      <rect width="95" height="130" rx="30" fill="url(#balloonPink)" />
      <rect x="12" y="12" width="71" height="106" rx="20" fill="#FF85C8" opacity="0.35" />
      <text x="47" y="95" font-family="'Impact', 'Arial Black', sans-serif" font-size="90" font-weight="bold" fill="#FFFFFF" text-anchor="middle">M</text>
    </g>
    <!-- Letter Ã -->
    <g transform="translate(150, 0)">
      <rect width="95" height="130" rx="30" fill="url(#balloonPink)" />
      <rect x="12" y="12" width="71" height="106" rx="20" fill="#FF85C8" opacity="0.35" />
      <text x="47" y="95" font-family="'Impact', 'Arial Black', sans-serif" font-size="90" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Ã</text>
    </g>
    <!-- Letter E -->
    <g transform="translate(270, 0)">
      <rect width="95" height="130" rx="30" fill="url(#balloonPink)" />
      <rect x="12" y="12" width="71" height="106" rx="20" fill="#FF85C8" opacity="0.35" />
      <text x="47" y="95" font-family="'Impact', 'Arial Black', sans-serif" font-size="90" font-weight="bold" fill="#FFFFFF" text-anchor="middle">E</text>
    </g>
    <!-- Letter S -->
    <g transform="translate(390, 0)">
      <rect width="95" height="130" rx="30" fill="url(#balloonPink)" />
      <rect x="12" y="12" width="71" height="106" rx="20" fill="#FF85C8" opacity="0.35" />
      <text x="47" y="95" font-family="'Impact', 'Arial Black', sans-serif" font-size="90" font-weight="bold" fill="#FFFFFF" text-anchor="middle">S</text>
    </g>
  </g>

  <!-- Quote Bottom: Deus mandou anjos para nos proteger... -->
  <g transform="translate(378, 290)">
    <text x="0" y="0" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" fill="#FF0891" text-anchor="middle">Deus mandou anjos para nos proteger</text>
    <text x="0" y="24" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" fill="#FF0891" text-anchor="middle">e deu a eles o nome de mãe. ♡</text>
  </g>
</svg>
`)}`;

// 10. Dupla Polaroid & Você É a Minha Melhor Parte (Design 10)
export const CANVA_MAES_DUPLA_POLAROID_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m10Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fdfbf7" />
    </linearGradient>
    <filter id="m10Shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.2" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#m10Bg)" />

  <!-- Botanical Floral Accents Top & Bottom -->
  <g fill="#F43F5E" opacity="0.65">
    <circle cx="480" cy="30" r="14" /><circle cx="505" cy="20" r="10" /><circle cx="460" cy="45" r="12" />
    <circle cx="650" cy="320" r="16" /><circle cx="675" cy="300" r="12" />
    <circle cx="70" cy="50" r="12" /><circle cx="230" cy="320" r="14" />
  </g>

  <!-- Left: 2 Overlapping Polaroids with Mother & Baby Photos -->
  <!-- Polaroid 1 (Back, Rotated -6 deg) -->
  <g transform="translate(90, 60) rotate(-6)" filter="url(#m10Shadow)">
    <rect width="145" height="175" rx="4" fill="#F2F1EB" stroke="#3C3333" stroke-width="2" />
    <rect x="9" y="9" width="127" height="125" rx="2" fill="#64748B" />
    <!-- Happy Mother Photo Silhouette -->
    <circle cx="72" cy="65" r="24" fill="#E2E8F0" />
    <path d="M 40 130 C 40 100 60 95 72 95 C 84 95 104 100 104 130 Z" fill="#E2E8F0" />
    <text x="72" y="158" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="12" fill="#3C3333" text-anchor="middle">Amor Eterno</text>
  </g>

  <!-- Polaroid 2 (Front, Rotated 11 deg) -->
  <g transform="translate(150, 115) rotate(11)" filter="url(#m10Shadow)">
    <rect width="145" height="175" rx="4" fill="#F2F1EB" stroke="#3C3333" stroke-width="2" />
    <rect x="9" y="9" width="127" height="125" rx="2" fill="#475569" />
    <!-- Mother carrying baby silhouette -->
    <circle cx="65" cy="60" r="22" fill="#E2E8F0" />
    <path d="M 35 130 C 35 95 55 90 65 90 C 75 90 95 95 95 130 Z" fill="#E2E8F0" />
    <circle cx="92" cy="75" r="14" fill="#CBD5E1" />
    <text x="72" y="158" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="12" fill="#3C3333" text-anchor="middle">Minha Vida</text>
  </g>

  <!-- Right: "Mãe" lettering and loving message -->
  <g transform="translate(540, 95)">
    <!-- Stylized "Mãe" -->
    <text x="0" y="60" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="78" font-weight="bold" fill="#F40F6C" text-anchor="middle">Mãe</text>

    <!-- Message in hot pink -->
    <text x="0" y="130" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" fill="#F40F6C" text-anchor="middle">você é e sempre será</text>
    <text x="0" y="155" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" fill="#F40F6C" text-anchor="middle">a minha melhor parte.</text>
    <text x="0" y="195" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="18" font-weight="bold" fill="#BE123C" text-anchor="middle">Nunca vou te esquecer! ♡</text>
  </g>
</svg>
`)}`;

// 11. Floral Abstrato Moderno & Geometria Afetiva (Design 11)
export const CANVA_MAES_FLORAL_GEOMETRICO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="m11Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff5f5" />
      <stop offset="100%" stop-color="#ffe4e6" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#m11Bg)" />

  <!-- Modern Floral Symmetrical Abstract Shapes (Left & Right) -->
  <!-- Left Shape -->
  <g transform="translate(50, 45) scale(0.9)">
    <path d="M 80 20 C 130 50 170 120 150 200 C 130 280 40 300 20 220 C 0 140 30 -10 80 20 Z" fill="#FB7185" opacity="0.65" />
    <path d="M 60 80 C 100 100 130 150 110 210 C 90 270 30 260 20 210 C 10 160 20 60 60 80 Z" fill="#F43F5E" opacity="0.5" />
    <circle cx="85" cy="160" r="18" fill="#FDE047" stroke="#BE123C" stroke-width="2" />
  </g>
  <!-- Right Shape (Mirrored) -->
  <g transform="translate(706, 45) scale(-0.9, 0.9)">
    <path d="M 80 20 C 130 50 170 120 150 200 C 130 280 40 300 20 220 C 0 140 30 -10 80 20 Z" fill="#FB7185" opacity="0.65" />
    <path d="M 60 80 C 100 100 130 150 110 210 C 90 270 30 260 20 210 C 10 160 20 60 60 80 Z" fill="#F43F5E" opacity="0.5" />
    <circle cx="85" cy="160" r="18" fill="#FDE047" stroke="#BE123C" stroke-width="2" />
  </g>

  <!-- Center Typography: Happy Mother's Day -->
  <g transform="translate(378, 90)">
    <text x="0" y="50" font-family="'Playfair Display', Georgia, serif" font-size="54" font-weight="900" fill="#881337" text-anchor="middle">MÃE</text>
    <text x="0" y="110" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="34" font-weight="700" fill="#E11D48" text-anchor="middle">Feliz Dia das Mães</text>
    <text x="0" y="160" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" fill="#9F1239" text-anchor="middle">Obrigado por seu amor incondicional!</text>
  </g>
</svg>
`)}`;


// =======================================================
// 2. LAYER GENERATOR FUNCTIONS FOR DIA DAS MÃES
// =======================================================

// 1. Moldura Floral & Foto com Amor
export function getMaesMolduraFloralTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m1-bg-${timestamp}`,
      name: 'Fundo: Off-White Suave (#FDFBF7)',
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
      color: '#FDFBF7',
    },
    {
      id: `maes-m1-photo-${timestamp}`,
      name: 'Foto Principal: Mãe e Filha',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 50,
      width: 215,
      height: 225,
      rotation: 0,
      content: 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=600&auto=format&fit=crop&q=80',
      strokeColor: '#A8AF74',
      strokeWidth: 6,
    },
    {
      id: `maes-m1-title-${timestamp}`,
      name: 'Texto: Feliz dia',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 370,
      y: 70,
      width: 320,
      height: 60,
      rotation: 0,
      content: 'Feliz dia',
      color: '#788047',
      fontSize: 52,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m1-subtitle-${timestamp}`,
      name: 'Texto: das mães',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 370,
      y: 130,
      width: 320,
      height: 60,
      rotation: 0,
      content: 'das mães',
      color: '#A8AF74',
      fontSize: 56,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m1-msg-${timestamp}`,
      name: 'Texto: Mensagem de Carinho',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 340,
      y: 205,
      width: 380,
      height: 45,
      rotation: 0,
      content: 'Para a mãe mais carinhosa e especial do mundo ♡',
      color: '#4B5563',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 2. Margaridas & Para a Pessoa Mais Especial
export function getMaesMargaridasEspecialTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m2-bg-${timestamp}`,
      name: 'Fundo: Rosa Bebê Suave (#FFF5F5)',
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
      color: '#FFF5F5',
    },
    {
      id: `maes-m2-title1-${timestamp}`,
      name: 'Texto: Feliz dia',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 215,
      y: 90,
      width: 330,
      height: 65,
      rotation: 0,
      content: 'Feliz dia',
      color: '#E86A78',
      fontSize: 58,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m2-title2-${timestamp}`,
      name: 'Texto: das mães',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 215,
      y: 155,
      width: 330,
      height: 65,
      rotation: 0,
      content: 'das mães',
      color: '#E86A78',
      fontSize: 58,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m2-msg1-${timestamp}`,
      name: 'Texto: Para a pessoa mais especial',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 215,
      y: 230,
      width: 330,
      height: 30,
      rotation: 0,
      content: 'Para a pessoa mais especial',
      color: '#CE3D4E',
      fontSize: 18,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m2-msg2-${timestamp}`,
      name: 'Texto: da minha vida',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 215,
      y: 260,
      width: 330,
      height: 30,
      rotation: 0,
      content: 'da minha vida ♡',
      color: '#CE3D4E',
      fontSize: 18,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 3. Força, Coragem & Determinação
export function getMaesForcaBotanicoTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m3-bg-${timestamp}`,
      name: 'Fundo: Branco Clean (#FFFFFF)',
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
      id: `maes-m3-title-${timestamp}`,
      name: 'Texto: mãe (Caligrafia)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 250,
      y: 85,
      width: 260,
      height: 120,
      rotation: 0,
      content: 'mãe',
      color: '#111827',
      fontSize: 95,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m3-quote-${timestamp}`,
      name: 'Texto: Mensagem Força & Gratidão',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 210,
      y: 220,
      width: 340,
      height: 60,
      rotation: 0,
      content: 'Sua força, coragem e determinação foram essenciais em todos os meus passos. Tudo que sou hoje é graças a você, mãe!',
      color: '#000000',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m3-love-${timestamp}`,
      name: 'Texto: Te amo demais!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 250,
      y: 290,
      width: 260,
      height: 35,
      rotation: 0,
      content: 'Te amo demais! ♡',
      color: '#E11D48',
      fontSize: 16,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 4. Melhor Mãe • Pop Like Icons
export function getMaesMelhorMaeIconsTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m4-bg-${timestamp}`,
      name: 'Fundo: Menta Suave (#F0FDFA)',
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
      color: '#F0FDFA',
    },
    {
      id: `maes-m4-melhor-${timestamp}`,
      name: 'Texto: MELHOR',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 120,
      y: 55,
      width: 300,
      height: 85,
      rotation: 0,
      content: 'MELHOR',
      color: '#67C6C8',
      fontSize: 80,
      fontFamily: 'Impact, Arial Black, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m4-mae-${timestamp}`,
      name: 'Texto: MÃE',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 120,
      y: 145,
      width: 300,
      height: 120,
      rotation: 0,
      content: 'MÃE',
      color: '#F472B6',
      fontSize: 110,
      fontFamily: 'Impact, Arial Black, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m4-msg-${timestamp}`,
      name: 'Texto: Você é a minha maior inspiração da vida. Te amo!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 460,
      y: 190,
      width: 250,
      height: 80,
      rotation: 0,
      content: 'Você é a minha maior inspiração da vida. Te amo!',
      color: '#0D9488',
      fontSize: 21,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 5. Aquarela Floral Rosé & Inspiração da Minha Vida
export function getMaesAquarelaRoseTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m5-bg-${timestamp}`,
      name: 'Fundo: Degradê Rosé Aquarela (#FFF1F2)',
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
      color: '#FFF1F2',
    },
    {
      id: `maes-m5-mae-${timestamp}`,
      name: 'Texto: Mãe (Lettering)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 230,
      y: 60,
      width: 300,
      height: 110,
      rotation: 0,
      content: 'Mãe',
      color: '#BE123C',
      fontSize: 92,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m5-msg-${timestamp}`,
      name: 'Texto: Você é a minha maior inspiração, te amo!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 185,
      width: 400,
      height: 50,
      rotation: 0,
      content: 'Você é a minha maior inspiração, te amo!',
      color: '#DC5776',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m5-sub-${timestamp}`,
      name: 'Texto: FELIZ DIA DAS MÃES',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 230,
      y: 250,
      width: 300,
      height: 30,
      rotation: 0,
      content: 'FELIZ DIA DAS MÃES',
      color: '#E11D48',
      fontSize: 14,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 6. A Melhor Mãe do Mundo • Orgânico & No Compasso do Seu Amor
export function getMaesOrganicoArcoTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m6-bg-${timestamp}`,
      name: 'Fundo: Off-White Orgânico (#FDFBF7)',
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
      color: '#FDFBF7',
    },
    {
      id: `maes-m6-melhor-${timestamp}`,
      name: 'Texto: A melhor',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 85,
      width: 230,
      height: 45,
      rotation: 0,
      content: 'A melhor',
      color: '#AB8567',
      fontSize: 34,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `maes-m6-mae-${timestamp}`,
      name: 'Texto: Mãe',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 130,
      width: 230,
      height: 80,
      rotation: 0,
      content: 'Mãe',
      color: '#746148',
      fontSize: 68,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `maes-m6-mundo-${timestamp}`,
      name: 'Texto: do mundo!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 215,
      width: 230,
      height: 40,
      rotation: 0,
      content: 'DO MUNDO!',
      color: '#AB8567',
      fontSize: 26,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `maes-m6-poema-${timestamp}`,
      name: 'Texto: Poema No Compasso do Amor',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 440,
      y: 120,
      width: 240,
      height: 120,
      rotation: 0,
      content: 'No compasso do seu amor, encontrei meu lar. Feliz Dia das Mães, minha inspiração constante.',
      color: '#746148',
      fontSize: 18,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 7. Amor Aquece Mais Que Café • Papel Rasgado & Traço Afetivo
export function getMaesAmorCafeRippedTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m7-bg-${timestamp}`,
      name: 'Fundo: Rosa Pastel Suave (#FDF2F8)',
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
      color: '#FDF2F8',
    },
    {
      id: `maes-m7-mae-${timestamp}`,
      name: 'Texto: mãe',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 75,
      y: 45,
      width: 300,
      height: 120,
      rotation: 0,
      content: 'mãe',
      color: '#D27FA3',
      fontSize: 90,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m7-cafe-${timestamp}`,
      name: 'Texto: seu amor aquece mais que café numa manhã fria',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 100,
      y: 195,
      width: 250,
      height: 50,
      rotation: 0,
      content: 'seu amor aquece mais que café numa manhã fria.',
      color: '#623A23',
      fontSize: 16,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m7-feliz-${timestamp}`,
      name: 'Texto: feliz dia das mães!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 90,
      y: 265,
      width: 270,
      height: 40,
      rotation: 0,
      content: 'feliz dia das mães!',
      color: '#D27FA3',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 8. Sorriso Que Encanta & Buquê de Rosas Watercolor
export function getMaesSorrisoRosasTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m8-bg-${timestamp}`,
      name: 'Fundo: Rosa Delicado (#FFF1F2)',
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
      color: '#FFF1F2',
    },
    {
      id: `maes-m8-mae-${timestamp}`,
      name: 'Texto: Mãe',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 200,
      y: 65,
      width: 350,
      height: 130,
      rotation: 0,
      content: 'Mãe',
      color: '#231F20',
      fontSize: 110,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m8-frase1-${timestamp}`,
      name: 'Texto: sorriso que encanta, voz que conforta, presença que transforma.',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 215,
      width: 400,
      height: 50,
      rotation: 0,
      content: 'sorriso que encanta, voz que conforta, presença que transforma.',
      color: '#231F20',
      fontSize: 14,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m8-frase2-${timestamp}`,
      name: 'Texto: feliz dia das mães',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 230,
      y: 275,
      width: 300,
      height: 30,
      rotation: 0,
      content: 'feliz dia das mães ♡',
      color: '#BE123C',
      fontSize: 16,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 9. Balões 3D & Deus Mandou Anjos
export function getMaesBaloes3DAnjosTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m9-bg-${timestamp}`,
      name: 'Fundo: Degradê Rosa Chiclete (#FFF5F9)',
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
      color: '#FFF5F9',
    },
    {
      id: `maes-m9-feliz-${timestamp}`,
      name: 'Texto: FELIZ DIA DAS',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 35,
      width: 400,
      height: 45,
      rotation: 0,
      content: 'FELIZ DIA DAS',
      color: '#FF0891',
      fontSize: 32,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m9-maes-${timestamp}`,
      name: 'Texto: MÃES (Balões 3D)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 150,
      y: 95,
      width: 460,
      height: 140,
      rotation: 0,
      content: 'MÃES',
      color: '#FF0891',
      fontSize: 105,
      fontFamily: 'Impact, Arial Black, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m9-anjos-${timestamp}`,
      name: 'Texto: Deus mandou anjos para nos proteger e deu a eles o nome de mãe.',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 140,
      y: 285,
      width: 480,
      height: 50,
      rotation: 0,
      content: 'Deus mandou anjos para nos proteger e deu a eles o nome de mãe. ♡',
      color: '#FF0891',
      fontSize: 15,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

// 10. Dupla Polaroid & Você É a Minha Melhor Parte
export function getMaesDuplaPolaroidTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `maes-m10-bg-${timestamp}`,
      name: 'Fundo: Off-White Suave (#FDFBF7)',
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
      color: '#FDFBF7',
    },
    {
      id: `maes-m10-photo1-${timestamp}`,
      name: 'Foto 1: Polaroid com Mãe',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 95,
      y: 80,
      width: 125,
      height: 140,
      rotation: -6,
      content: 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=600&auto=format&fit=crop&q=80',
      strokeColor: '#3C3333',
      strokeWidth: 3,
    },
    {
      id: `maes-m10-photo2-${timestamp}`,
      name: 'Foto 2: Polaroid Mãe e Bebê',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 160,
      y: 140,
      width: 125,
      height: 140,
      rotation: 11,
      content: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      strokeColor: '#3C3333',
      strokeWidth: 3,
    },
    {
      id: `maes-m10-mae-${timestamp}`,
      name: 'Texto: Mãe',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 430,
      y: 75,
      width: 220,
      height: 90,
      rotation: 0,
      content: 'Mãe',
      color: '#F40F6C',
      fontSize: 78,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `maes-m10-msg-${timestamp}`,
      name: 'Texto: você é e sempre será a minha melhor parte. Nunca vou te esquecer!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 420,
      y: 195,
      width: 250,
      height: 90,
      rotation: 0,
      content: 'você é e sempre será a minha melhor parte. Nunca vou te esquecer! ♡',
      color: '#F40F6C',
      fontSize: 17,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}


// =======================================================
// 3. CANVA TEMPLATES ARRAY FOR DIA DAS MÃES
// =======================================================

export const MOTHERS_DAY_CANVA_TEMPLATES: CanvaTemplateItem[] = [
  {
    id: 'canva-maes-moldura-floral',
    title: 'Dia das Mães • Moldura Floral & Foto com Amor',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_MOLDURA_FLORAL_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay01/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay01/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay01/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'maes', 'mães', 'dia das maes', 'dia das mães', 'mothers', 'mother', 'floral', 'foto', 'caneca', 'sublimacao'],
    description: 'Estampa oficial Canva de Dia das Mães com moldura verde oliva com cantos arredondados para foto da família, lettering Feliz Dia das Mães e corações.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-margaridas-especial',
    title: 'Dia das Mães • Margaridas & Para a Pessoa Mais Especial',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_MARGARIDAS_ESPECIAL_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay02/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay02/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay02/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'maes', 'mães', 'dia das maes', 'dia das mães', 'margaridas', 'daisy', 'especial', 'coracao', 'coração', 'caneca'],
    description: 'Design afetuoso com margaridas desenhadas à mão em estilo doodle, corações em giz de cera e lettering "Para a pessoa mais especial da minha vida".',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-forca-botanico',
    title: 'Mãe • Força, Coragem & Determinação (Floral Botânico Clean)',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_FORCA_BOTANICO_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay03/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay03/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay03/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'maes', 'mães', 'dia das maes', 'botanico', 'botânico', 'forca', 'força', 'determinacao', 'gratidao', 'caneca'],
    description: 'Composição clean minimalista com lettering centralizado "mãe", galhos botânicos pretos e citação emocionante sobre força e coragem maternal.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-melhor-mae-icons',
    title: 'Melhor Mãe • Você é Minha Maior Inspiração (Pop Like Icons)',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_MELHOR_MAE_ICONS_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay04/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay04/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay04/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'melhor mae', 'melhor mãe', 'dia das maes', 'pop', 'like', 'coracao', 'inspiracao', 'caneca'],
    description: 'Arte moderna com tipografia bold de alto impacto "MELHOR MÃE", ícones 3D em tons pastéis e mensagem cheia de carinho.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-aquarela-rose',
    title: 'Mãe • Aquarela Floral Rosé & Inspiração da Minha Vida',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_AQUARELA_ROSE_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay05/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay05/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay05/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'aquarela', 'rose', 'rosé', 'floral', 'dia das maes', 'dia das mães', 'caneca', 'sublimacao'],
    description: 'Estampa sofisticada com fundo rosé em aquarela, buquês de flores nobres nos cantos opostos, respingos artísticos e lettering delicado.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-organico-arco',
    title: 'A Melhor Mãe do Mundo • Orgânico & No Compasso do Seu Amor',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_ORGANICO_ARCO_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay06/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay06/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay06/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'organico', 'orgânico', 'arco-iris', 'terracota', 'dia das maes', 'no compasso do seu amor', 'caneca'],
    description: 'Design boho sofisticado em tons terrosos e terracota com formas orgânicas, arcos de arco-íris, corações e verso poético.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-amor-cafe-ripped',
    title: 'Mãe • Amor Aquece Mais Que Café (Papel Rasgado & Traço Afetivo)',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_AMOR_CAFE_RIPPED_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay07/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay07/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay07/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'cafe', 'café', 'ripped paper', 'papel rasgado', 'linha', 'desenho', 'dia das maes', 'caneca'],
    description: 'Modelo nostálgico com efeito de papel rasgado em rosa suave, ilustração em linha contínua de mãe e filho e lettering acolhedor sobre café.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-sorriso-rosas',
    title: 'Mãe • Sorriso Que Encanta & Buquê de Rosas Watercolor',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_SORRISO_ROSAS_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay08/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay08/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay08/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'rosas', 'buque', 'buquê', 'sorriso que encanta', 'dia das maes', 'caneca', 'sublimacao'],
    description: 'Estampa premium com buquês aquarelados de rosas, degradê lateral, lettering Mãe em alta definição e faixa de mensagem poética.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-baloes-3d-anjos',
    title: 'Feliz Dia das Mães • Balões 3D & Deus Mandou Anjos',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_BALOES_3D_ANJOS_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay09/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay09/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay09/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'baloes', 'balões', '3d', 'anjos', 'deus', 'dia das maes', 'dia das mães', 'caneca'],
    description: 'Design festivo e brilhante com balões 3D rosa metálico soletrando MÃES, ramos decorativos e citação de fé e amor maternal.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-dupla-polaroid',
    title: 'Mãe • Dupla Polaroid & Você É a Minha Melhor Parte',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_DUPLA_POLAROID_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay10/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay10/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay10/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'polaroid', 'foto', 'dupla foto', 'melhor parte', 'dia das maes', 'dia das mães', 'caneca'],
    description: 'Composição elegante com 2 molduras estilo polaroid sobrepostas para fotos da mamãe e filhos, arabescos florais e mensagem carinhosa.',
    author: 'Canva Pro Creators',
  },
  {
    id: 'canva-maes-floral-geometrico',
    title: 'Dia das Mães • Floral Abstrato Moderno & Geometria Afetiva',
    category: 'mothers',
    categoryLabel: 'Dia das Mães & Família',
    previewUrl: CANVA_MAES_FLORAL_GEOMETRICO_SVG,
    embedUrl: 'https://www.canva.com/design/DAGMothersDay11/view?embed',
    viewUrl: 'https://www.canva.com/design/DAGMothersDay11/view',
    templateUrl: 'https://www.canva.com/design/DAGMothersDay11/view',
    widthMm: 200,
    heightMm: 95,
    tags: ['mae', 'mãe', 'floral', 'geometrico', 'geométrico', 'moderno', 'dia das maes', 'caneca'],
    description: 'Estampa contemporânea com simetria floral geométrica em tons de vinho e rosa, fundo aquarelado e mensagem de agradecimento maternal.',
    author: 'Canva Pro Creators',
  },
];
