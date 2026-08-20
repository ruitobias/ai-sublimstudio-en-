import { Layer } from '../types';
import { CanvaTemplateItem } from './canvaTemplates';

// =======================================================
// 1. DIA DOS PAIS - VECTOR SVG PREVIEWS (200x95mm 756x359px)
// =======================================================

// 1. Papai Coração Recortado & Foto com Amor
export const CANVA_PAIS_CORACAO_RECORTADO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="paperBg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <filter id="heartShadow1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#paperBg1)" />

  <!-- Confetti Hearts Background -->
  <g fill="#EF4444" opacity="0.25">
    <path d="M 50 40 Q 55 30 60 40 Q 65 30 70 40 Q 70 50 60 60 Q 50 50 50 40 Z" transform="scale(0.8)" />
    <path d="M 370 20 Q 375 10 380 20 Q 385 10 390 20 Q 390 30 380 40 Q 370 30 370 20 Z" transform="scale(0.7)" />
    <path d="M 680 50 Q 685 40 690 50 Q 695 40 700 50 Q 700 60 690 70 Q 680 60 680 50 Z" transform="scale(0.8)" />
    <path d="M 690 180 Q 695 170 700 180 Q 705 170 710 180 Q 710 190 700 200 Q 690 190 690 180 Z" transform="scale(0.6)" />
    <path d="M 670 290 Q 675 280 680 290 Q 685 280 690 290 Q 690 300 680 310 Q 670 300 670 290 Z" transform="scale(0.9)" />
  </g>

  <!-- Left: Red Paper Cut Heart Frame with Photo -->
  <g transform="translate(60, 40)" filter="url(#heartShadow1)">
    <!-- Red Outer Heart -->
    <path d="M 140 30 C 140 -10 90 -20 60 15 C 30 -20 -20 -10 -20 30 C -20 80 40 140 60 170 C 80 140 140 80 140 30 Z" transform="scale(1.5) translate(10, 10)" fill="#DC2626" />
    <!-- Photo inside Heart Frame -->
    <circle cx="100" cy="115" r="75" fill="#CBD5E1" stroke="#FFFFFF" stroke-width="4" />
    <circle cx="100" cy="95" r="28" fill="#94A3B8" />
    <path d="M 65 160 C 65 125 85 120 100 120 C 115 120 135 125 135 160 Z" fill="#94A3B8" />
  </g>

  <!-- Left Badge: Blue Circle with Curved Stamp & Heart -->
  <g transform="translate(260, 200)">
    <circle cx="40" cy="40" r="40" fill="#305CA9" filter="drop-shadow(0 4px 6px rgba(48,92,169,0.3))" />
    <path d="M 40 22 C 34 16 26 18 26 24 C 26 32 40 42 40 46 C 40 42 54 32 54 24 C 54 18 46 16 40 22 Z" fill="#FFFFFF" />
    <text x="40" y="65" font-family="'Montserrat', sans-serif" font-size="7.5" font-weight="bold" fill="#FFFFFF" text-anchor="middle">MELHOR PAI</text>
  </g>

  <!-- Right Side: Elegant Typography -->
  <g transform="translate(420, 70)">
    <!-- Pill Badge: FELIZ DIA -->
    <rect x="0" y="20" width="130" height="26" rx="13" fill="none" stroke="#305CA9" stroke-width="2" />
    <text x="65" y="37" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="#214074" text-anchor="middle">FELIZ DIA</text>

    <!-- Big Script "papai" -->
    <text x="0" y="115" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="64" font-weight="900" fill="#386BC5">papai</text>

    <!-- Emotional Subtitle -->
    <text x="0" y="155" font-family="'Montserrat', sans-serif" font-size="12" font-weight="500" fill="#214074">Seu carinho me acolhe, sua força me protege,</text>
    <text x="0" y="175" font-family="'Montserrat', sans-serif" font-size="12" font-weight="700" fill="#305CA9">sua fé me inspira. Que bênção ter você!</text>

    <!-- Dedication -->
    <text x="0" y="220" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="14" fill="#386BC5">com todo meu amor • 12.agosto</text>
  </g>
</svg>
`)}`;

// 2. Meu Herói de Todos os Dias • Bluey Style & Tripla Foto Circular
export const CANVA_PAIS_MEU_HEROI_BLUEY_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="blueyBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0f9ff" />
      <stop offset="100%" stop-color="#e0f2fe" />
    </linearGradient>
    <filter id="photoCircleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-opacity="0.2" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#blueyBg)" />

  <!-- Playful Scribble Hearts Background -->
  <g stroke="#38BDF8" stroke-width="2" fill="none" opacity="0.4">
    <path d="M 30 50 Q 50 30 70 50 Q 90 70 50 100 Q 10 70 30 50 Z" />
    <path d="M 350 20 Q 365 5 380 20 Q 395 35 365 55 Q 335 35 350 20 Z" />
    <path d="M 370 280 Q 385 265 400 280 Q 415 295 385 315 Q 355 295 370 280 Z" />
    <path d="M 700 40 Q 715 25 730 40 Q 745 55 715 75 Q 685 55 700 40 Z" />
  </g>

  <!-- Left: Bluey-Style Playful Typography -->
  <g transform="translate(60, 60)">
    <!-- Big Bold "PAI" Bluey Alphabet Font -->
    <g transform="translate(0, 0)">
      <rect x="0" y="10" width="60" height="85" rx="14" fill="#0284C7" stroke="#000000" stroke-width="4" />
      <rect x="15" y="25" width="30" height="25" rx="6" fill="#BAE6FD" stroke="#000000" stroke-width="3" />
      <text x="30" y="70" font-family="'Impact', sans-serif" font-size="28" fill="#FFFFFF" text-anchor="middle">P</text>

      <rect x="70" y="10" width="65" height="85" rx="14" fill="#38BDF8" stroke="#000000" stroke-width="4" />
      <text x="102" y="70" font-family="'Impact', sans-serif" font-size="48" font-weight="900" fill="#FFFFFF" stroke="#000000" stroke-width="2" text-anchor="middle">A</text>

      <rect x="145" y="10" width="35" height="85" rx="12" fill="#0284C7" stroke="#000000" stroke-width="4" />
      <text x="162" y="70" font-family="'Impact', sans-serif" font-size="48" font-weight="900" fill="#FFFFFF" stroke="#000000" stroke-width="2" text-anchor="middle">I</text>
    </g>

    <!-- Orange Highlight Marker under text -->
    <rect x="-10" y="120" width="220" height="35" rx="6" fill="#FDBA74" opacity="0.8" />
    <text x="100" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="900" fill="#000000" text-anchor="middle">meu herói</text>

    <!-- Blue text: de todos os dias -->
    <text x="100" y="195" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="26" font-weight="bold" fill="#0284C7" text-anchor="middle">de todos os dias</text>
    <!-- Yellow Crown -->
    <path d="M 80 215 L 90 235 L 100 220 L 110 235 L 120 215 L 120 245 L 80 245 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2" />
  </g>

  <!-- Right: 3 Overlapping Circular Photo Frames with Crown & Mascot -->
  <g transform="translate(380, 40)">
    <!-- Photo 1: Top Center -->
    <g transform="translate(40, 20)" filter="url(#photoCircleShadow)">
      <circle cx="65" cy="65" r="65" fill="#FFFFFF" stroke="#000000" stroke-width="4" />
      <circle cx="65" cy="65" r="58" fill="#CBD5E1" />
      <circle cx="65" cy="50" r="22" fill="#94A3B8" />
      <path d="M 35 105 C 35 80 50 75 65 75 C 80 75 95 80 95 105 Z" fill="#94A3B8" />
    </g>

    <!-- Photo 2: Bottom Left -->
    <g transform="translate(0, 130) rotate(-6)" filter="url(#photoCircleShadow)">
      <circle cx="60" cy="60" r="60" fill="#FFFFFF" stroke="#000000" stroke-width="4" />
      <circle cx="60" cy="60" r="53" fill="#94A3B8" />
      <circle cx="60" cy="45" r="18" fill="#64748B" />
      <path d="M 35 95 C 35 75 48 70 60 70 C 72 70 85 75 85 95 Z" fill="#64748B" />
    </g>

    <!-- Photo 3: Bottom Right -->
    <g transform="translate(140, 110) rotate(8)" filter="url(#photoCircleShadow)">
      <circle cx="75" cy="75" r="75" fill="#FFFFFF" stroke="#000000" stroke-width="4" />
      <circle cx="75" cy="75" r="67" fill="#CBD5E1" />
      <circle cx="75" cy="60" r="24" fill="#94A3B8" />
      <path d="M 45 120 C 45 90 60 85 75 85 C 90 85 105 90 105 120 Z" fill="#94A3B8" />
    </g>

    <!-- Cartoon Eyes & Smile on the Big Photo -->
    <g transform="translate(190, 80)">
      <circle cx="15" cy="15" r="4" fill="#000000" />
      <circle cx="35" cy="15" r="4" fill="#000000" />
      <path d="M 18 26 Q 25 34 32 26" stroke="#000000" stroke-width="3" fill="none" stroke-linecap="round" />
    </g>
  </g>
</svg>
`)}`;

// 3. Tira de Fotos Vintage Ripped Paper & Splashes (6 Fotos)
export const CANVA_PAIS_TIRA_FOTOS_VINTAGE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="grungeBg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <filter id="stripShadow3" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-opacity="0.25" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#grungeBg3)" />

  <!-- Grunge ink splashes -->
  <g fill="#0F172A" opacity="0.12">
    <circle cx="100" cy="80" r="4" /><circle cx="120" cy="60" r="2.5" />
    <circle cx="280" cy="300" r="6" /><circle cx="650" cy="50" r="3" />
    <path d="M 60 280 Q 80 260 100 290 T 140 270 Q 160 300 190 280 Z" />
  </g>

  <!-- Left: Photo Strip 1 (Tilted Left) with 3 Photos -->
  <g transform="translate(100, 20) rotate(-6)" filter="url(#stripShadow3)">
    <rect width="130" height="320" rx="4" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
    <!-- Photo Slot 1 -->
    <rect x="10" y="10" width="110" height="90" rx="3" fill="#CBD5E1" />
    <!-- Photo Slot 2 -->
    <rect x="10" y="110" width="110" height="90" rx="3" fill="#94A3B8" />
    <!-- Photo Slot 3 -->
    <rect x="10" y="210" width="110" height="90" rx="3" fill="#64748B" />
  </g>

  <!-- Center-Left: Photo Strip 2 (Tilted Right) with 3 Photos -->
  <g transform="translate(240, 15) rotate(4)" filter="url(#stripShadow3)">
    <rect width="130" height="320" rx="4" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
    <!-- Photo Slot 1 -->
    <rect x="10" y="10" width="110" height="90" rx="3" fill="#94A3B8" />
    <!-- Photo Slot 2 -->
    <rect x="10" y="110" width="110" height="90" rx="3" fill="#CBD5E1" />
    <!-- Photo Slot 3 -->
    <rect x="10" y="210" width="110" height="90" rx="3" fill="#94A3B8" />
  </g>

  <!-- Right: Emotional Calligraphy & Message -->
  <g transform="translate(420, 80)">
    <text x="0" y="40" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="900" fill="#0F172A">PAI &amp; AMOR</text>
    <text x="0" y="80" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="22" fill="#3B82F6">Momentos que guardo no coração</text>
    <line x1="0" y1="100" x2="280" y2="100" stroke="#0F172A" stroke-width="2" stroke-dasharray="6,4" />
    <text x="0" y="135" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#475569">Obrigado por ser meu guia, minha força</text>
    <text x="0" y="155" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#475569">e meu maior exemplo de vida! Te amo.</text>
    <!-- Red Brush Heart -->
    <path d="M 220 180 C 210 160 180 165 180 185 C 180 205 220 230 220 230 C 220 230 260 205 260 185 C 260 165 230 160 220 180 Z" fill="#DC2626" opacity="0.85" />
  </g>
</svg>
`)}`;

// 4. Pais Eu Te Amo • Big Bold Lettering & Corações 3D
export const CANVA_PAIS_EU_TE_AMO_BOLD_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="lovePaisBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fff5f5" />
    </linearGradient>
    <filter id="heart3dShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.3" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#lovePaisBg)" />

  <!-- Background Watercolor Hearts -->
  <g fill="#990629" opacity="0.15">
    <path d="M 360 40 C 350 20 320 25 320 45 C 320 65 360 90 360 90 C 360 90 400 65 400 45 C 400 25 370 20 360 40 Z" transform="scale(0.8)" />
    <path d="M 680 190 C 670 170 640 175 640 195 C 640 215 680 240 680 240 C 680 240 720 215 720 195 C 720 175 690 170 680 190 Z" transform="scale(0.8)" />
  </g>

  <!-- Left: Big 3D Heart & Double Photo Slots -->
  <g transform="translate(60, 40)">
    <!-- Photo 1 (Tilted Right) -->
    <g transform="translate(130, 15) rotate(18)" filter="url(#heart3dShadow)">
      <rect width="115" height="115" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3" />
      <rect x="8" y="8" width="99" height="99" rx="3" fill="#CBD5E1" />
    </g>

    <!-- Photo 2 (Tilted Left) -->
    <g transform="translate(20, 100) rotate(-8)" filter="url(#heart3dShadow)">
      <rect width="140" height="140" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3" />
      <rect x="10" y="10" width="120" height="120" rx="4" fill="#94A3B8" />
    </g>

    <!-- Big 3D Red Glossy Heart on Corner -->
    <g transform="translate(-30, -30) scale(1.1)" filter="url(#heart3dShadow)">
      <path d="M 80 30 C 80 -10 30 -20 0 15 C -30 -20 -80 -10 -80 30 C -80 80 -20 140 0 170 C 20 140 80 80 80 30 Z" fill="#990629" />
      <ellipse cx="-25" cy="25" rx="16" ry="9" transform="rotate(-30 -25 25)" fill="#FFFFFF" opacity="0.6" />
    </g>
  </g>

  <!-- Right: Massive Bold Lettering & Emotion -->
  <g transform="translate(380, 50)">
    <text x="0" y="35" font-family="'Playfair Display', Georgia, serif" font-size="24" font-weight="bold" fill="#000000">Feliz dia dos</text>
    <text x="0" y="105" font-family="'Playfair Display', Georgia, serif" font-size="76" font-weight="900" fill="#990629">PAIS</text>
    <text x="0" y="180" font-family="'Playfair Display', Georgia, serif" font-size="64" font-weight="900" fill="#990629">eu te amo!</text>

    <!-- Circular Badge Stamp -->
    <g transform="translate(230, 20)">
      <circle cx="35" cy="35" r="35" fill="none" stroke="#990629" stroke-width="2" stroke-dasharray="4,3" />
      <text x="35" y="32" font-family="'Montserrat', sans-serif" font-size="9" font-weight="bold" fill="#990629" text-anchor="middle">12 AGOSTO</text>
      <text x="35" y="46" font-family="'Montserrat', sans-serif" font-size="8" fill="#000000" text-anchor="middle">DIA DOS PAIS</text>
    </g>

    <text x="0" y="225" font-family="'Montserrat', sans-serif" font-size="12" font-weight="600" fill="#000000">Pai, seu amor me guia e sua fé inspira minha vida.</text>
    <text x="0" y="248" font-family="'Montserrat', sans-serif" font-size="12" font-weight="bold" fill="#990629">Com amor, Helena ♡</text>
  </g>
</svg>
`)}`;

// 5. Pai Monoline Minimalista • Arte Contínua Pai e Filhos
export const CANVA_PAIS_MONOLINE_MINIMALISTA_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <rect width="756" height="359" fill="#F4F1EE" />

  <!-- Organic Background Line Shapes -->
  <g stroke="#D1C7BD" stroke-width="2" fill="none" opacity="0.6">
    <path d="M 50 180 Q 200 40 400 120 T 700 80" />
    <path d="M 0 280 Q 250 350 500 270 T 756 310" />
  </g>

  <!-- Center Left 1: Monoline Father Lifting Boy -->
  <g transform="translate(60, 50)" stroke="#1F4072" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- Dad Head & Body -->
    <circle cx="80" cy="110" r="16" />
    <path d="M 80 126 L 80 200 L 60 260 M 80 200 L 100 260" />
    <!-- Arms lifting boy -->
    <path d="M 80 145 L 40 100 L 40 50 M 80 145 L 120 100 L 120 50" />
    <!-- Boy in Air -->
    <circle cx="80" cy="30" r="12" />
    <path d="M 80 42 L 80 80 L 65 110 M 80 80 L 95 110" />
  </g>

  <!-- Center: Monoline Child Running to Father -->
  <g transform="translate(290, 50)" stroke="#1F4072" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- Dad waiting with open arms -->
    <circle cx="140" cy="110" r="16" />
    <path d="M 140 126 L 140 210 L 125 260 M 140 210 L 155 260" />
    <path d="M 140 145 L 90 140 M 140 145 L 190 150" />
    <!-- Child Running -->
    <circle cx="40" cy="150" r="12" />
    <path d="M 40 162 L 40 210 L 25 250 M 40 210 L 60 240" />
    <path d="M 40 175 L 70 160" />
  </g>

  <!-- Right: Monoline Father Holding Baby -->
  <g transform="translate(540, 50)" stroke="#1F4072" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="70" cy="90" r="16" />
    <path d="M 70 106 L 70 210 L 50 260 M 70 210 L 90 260" />
    <!-- Arms cradling baby -->
    <path d="M 70 130 C 40 130 40 170 70 170 C 100 170 100 130 70 130" />
    <circle cx="70" cy="145" r="9" fill="#1F4072" />
  </g>

  <!-- Bottom: Calligraphy "Feliz dia dos Pais" -->
  <g transform="translate(378, 305)">
    <text x="0" y="0" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="40" font-weight="900" fill="#1F4072" text-anchor="middle">Feliz dia dos Pais</text>
  </g>
</svg>
`)}`;

// 6. Super Pai • Você é Conselho, Proteção e Amor!
export const CANVA_PAIS_SUPER_HEROI_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="heroBg6" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <filter id="heroShadow6" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.25" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#heroBg6)" />

  <!-- Doodled Hearts around -->
  <g fill="#EF4444" opacity="0.3">
    <circle cx="60" cy="50" r="8" />
    <circle cx="340" cy="300" r="10" />
    <circle cx="680" cy="60" r="12" />
    <circle cx="710" cy="310" r="8" />
  </g>

  <!-- Left: Massive Typography "PAI" -->
  <g transform="translate(60, 50)">
    <text x="0" y="160" font-family="'Impact', 'Arial Black', sans-serif" font-size="190" font-weight="900" fill="#000000" letter-spacing="-4">PAI</text>
    <text x="5" y="220" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="800" fill="#000000">Você é conselho,</text>
    <text x="5" y="250" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="800" fill="#EF4444">proteção e amor!</text>
  </g>

  <!-- Right: Superhero Dad Illustration with Cape -->
  <g transform="translate(420, 40)" filter="url(#heroShadow6)">
    <!-- Red Flowing Cape -->
    <path d="M 120 80 Q 240 100 270 240 Q 180 200 120 150 Z" fill="#DC2626" />
    <!-- Dad Body Flying / Posing -->
    <circle cx="110" cy="60" r="28" fill="#FBBF24" stroke="#000000" stroke-width="4" />
    <!-- Hair -->
    <path d="M 85 55 Q 110 30 135 50 Z" fill="#1E293B" />
    <!-- Superhero Suit -->
    <path d="M 85 88 L 135 88 L 145 190 L 75 190 Z" fill="#0284C7" stroke="#000000" stroke-width="4" />
    <!-- Emblem Shield on Chest -->
    <polygon points="110,105 125,115 120,135 110,145 100,135 95,115" fill="#FBBF24" stroke="#000000" stroke-width="2" />
    <text x="110" y="132" font-family="'Impact', sans-serif" font-size="18" fill="#DC2626" text-anchor="middle">S</text>
    <!-- Flying Fist -->
    <path d="M 135 100 L 190 60 L 205 75 L 145 120 Z" fill="#0284C7" stroke="#000000" stroke-width="3" />
    <circle cx="205" cy="70" r="14" fill="#FBBF24" stroke="#000000" stroke-width="3" />
    <!-- Legs -->
    <path d="M 85 190 L 70 270 M 135 190 L 150 270" stroke="#000000" stroke-width="12" stroke-linecap="round" />
    <path d="M 70 270 L 50 280 M 150 270 L 170 280" stroke="#DC2626" stroke-width="14" stroke-linecap="round" />
  </g>
</svg>
`)}`;

// 7a. Canva Pill Border (Capsule Outline)
export const CANVA_PAIS_PILL_BORDER_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.64 18.43" width="65.64" height="18.43">
  <rect x="1" y="1" width="63.64" height="16.43" rx="8.21" fill="none" stroke="#000000" stroke-width="2"/>
</svg>
`)}`;

// 7b. Canva Square Attribute Box
export const CANVA_PAIS_SQUARE_BOX_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.71 41.71" width="41.71" height="41.71">
  <rect x="1" y="1" width="39.71" height="39.71" fill="none" stroke="#000000" stroke-width="2"/>
</svg>
`)}`;

// 7c. Canva Classic Father's Day Mustache
export const CANVA_PAIS_MUSTACHE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90" width="300" height="90">
  <path d="M 150 40 C 130 15 90 2 50 8 C 15 14 0 38 0 55 C 0 72 22 84 52 82 C 90 80 130 52 150 42 C 170 52 210 80 248 82 C 278 84 300 72 300 55 C 300 38 285 14 250 8 C 210 2 170 15 150 40 Z" fill="#000000"/>
</svg>
`)}`;

// 7d. Canva Circular Curved Stamp "papai do ano • papai do ano • papai do ano •"
export const CANVA_PAIS_CIRCULAR_PAPAI_ANO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" width="360" height="360">
  <defs>
    <path id="circleTextPath" d="M 180, 180 m -125, 0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0" fill="none" />
  </defs>
  <text font-family="'Montserrat', sans-serif" font-size="30" font-weight="600" fill="#000000" letter-spacing="1.5">
    <textPath href="#circleTextPath" startOffset="0%">
      papai do ano • papai do ano • papai do ano •
    </textPath>
  </text>
</svg>
`)}`;

// 7e. Canva Dumbbell Icon
export const CANVA_PAIS_DUMBBELL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 45" width="60" height="45">
  <rect x="8" y="20" width="44" height="5" rx="2" fill="#000000"/>
  <rect x="3" y="10" width="6" height="25" rx="3" fill="#000000"/>
  <rect x="10" y="14" width="5" height="17" rx="2" fill="#000000"/>
  <rect x="51" y="10" width="6" height="25" rx="3" fill="#000000"/>
  <rect x="45" y="14" width="5" height="17" rx="2" fill="#000000"/>
</svg>
`)}`;

// 7f. Canva Flat Heart
export const CANVA_PAIS_FLAT_HEART_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 45" width="50" height="45">
  <path d="M 25 14 C 20 4 8 8 8 18 C 8 28 25 39 25 39 C 25 39 42 28 42 18 C 42 8 30 4 25 14 Z" fill="#000000"/>
</svg>
`)}`;

// 7g. Canva Warm Coffee Cup
export const CANVA_PAIS_COFFEE_CUP_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
  <rect x="8" y="18" width="26" height="22" rx="4" fill="none" stroke="#000000" stroke-width="2.5"/>
  <path d="M 34 23 C 40 23 40 33 34 33" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="5" y1="43" x2="37" y2="43" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 15 12 Q 13 8 16 4" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <path d="M 21 12 Q 19 8 22 4" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
</svg>
`)}`;

// 7h. Canva Smiling Face
export const CANVA_PAIS_SMILING_ICON_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50">
  <circle cx="25" cy="25" r="20" fill="none" stroke="#000000" stroke-width="2.5"/>
  <circle cx="18" cy="20" r="2.5" fill="#000000"/>
  <circle cx="32" cy="20" r="2.5" fill="#000000"/>
  <path d="M 16 28 Q 25 38 34 28" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
</svg>
`)}`;

// 7. Tabela Nutricional do Papai • 100% Incrível & Super Pai (Oficial Canva Model)
export const CANVA_PAIS_TABELA_NUTRICIONAL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <rect width="756" height="359" fill="#FFFFFF" />

  <!-- Horizontal Divider Lines (Left Column) -->
  <line x1="32.34" y1="95.89" x2="354.04" y2="95.89" stroke="#000000" stroke-width="1" />
  <line x1="32.34" y1="305.24" x2="354.04" y2="305.24" stroke="#000000" stroke-width="1" />

  <!-- Top Badges -->
  <!-- 100% -->
  <text x="32.34" y="55" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="20" font-weight="900" fill="#000000">100%</text>

  <!-- Capsule 1: INCRÍVEL -->
  <rect x="32.34" y="63.95" width="65.20" height="18.30" rx="9.15" fill="none" stroke="#000000" stroke-width="2" />
  <text x="64.94" y="76.5" font-family="'Montserrat', sans-serif" font-size="10" font-weight="500" fill="#000000" text-anchor="middle">INCRÍVEL</text>

  <!-- AUTÊNTICO -->
  <text x="141.15" y="55" font-family="'Montserrat', sans-serif" font-size="10" font-weight="700" fill="#000000" text-anchor="middle">AUTÊNTICO</text>

  <!-- Capsule 2: BONITO -->
  <rect x="108.55" y="63.95" width="65.20" height="18.30" rx="9.15" fill="none" stroke="#000000" stroke-width="2" />
  <text x="141.15" y="76.5" font-family="'Montserrat', sans-serif" font-size="10" font-weight="500" fill="#000000" text-anchor="middle">BONITO</text>

  <!-- Contém o melhor pai do mundo -->
  <text x="205.81" y="63" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" fill="#000000">Contém o melhor</text>
  <text x="205.81" y="79" font-family="'Montserrat', sans-serif" font-size="13" font-weight="700" fill="#000000">pai do mundo</text>

  <!-- Center Left Hero: "Super" + Mustache + "pai" -->
  <text x="31.70" y="178" font-family="'Playfair Display', Georgia, serif" font-size="88" font-weight="900" fill="#000000">Super</text>

  <!-- Mustache Graphic -->
  <g transform="translate(56.56, 140.35) scale(0.791, 0.786)">
    <path d="M 150 40 C 130 15 90 2 50 8 C 15 14 0 38 0 55 C 0 72 22 84 52 82 C 90 80 130 52 150 42 C 170 52 210 80 248 82 C 278 84 300 72 300 55 C 300 38 285 14 250 8 C 210 2 170 15 150 40 Z" fill="#000000"/>
  </g>

  <!-- "pai" -->
  <text x="181.07" y="260" font-family="'Playfair Display', Georgia, serif" font-size="94" font-weight="900" fill="#000000">pai</text>

  <!-- Right: Circular Stamp "papai do ano" -->
  <g transform="translate(656.84, 87.64) scale(0.212)">
    <defs>
      <path id="previewStampPath" d="M 180, 180 m -125, 0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0" fill="none" />
    </defs>
    <text font-family="'Montserrat', sans-serif" font-size="32" font-weight="600" fill="#000000" letter-spacing="1.5">
      <textPath href="#previewStampPath" startOffset="0%">
        papai do ano • papai do ano • papai do ano •
      </textPath>
    </text>
  </g>

  <!-- Right: Secret Ingredients -->
  <text x="412.37" y="100" font-family="'Montserrat', sans-serif" font-size="14" font-weight="900" fill="#000000" letter-spacing="0.5">SEGREDO:</text>
  <foreignObject x="412.37" y="111.03" width="225" height="95">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Montserrat', sans-serif; font-size: 10px; line-height: 1.4; color: #000000;">
      30% teimosia, 20% piadas sem graça, 15% habilidades questionáveis de consertar coisas, 10% broncas educativas, 10% conselhos dados enquanto assiste TV, 10% amor em silêncio, 5% "só descanso os olhos"
    </div>
  </foreignObject>

  <!-- 4 Square Attribute Boxes -->
  <!-- Box 1: Dumbbell / Pessoa Saudável -->
  <g transform="translate(412.37, 218.03)">
    <rect x="0" y="0" width="66.29" height="66.29" fill="none" stroke="#000000" stroke-width="2" />
    <!-- Dumbbell -->
    <g transform="translate(6, 12) scale(0.9, 0.9)">
      <rect x="8" y="20" width="44" height="5" rx="2" fill="#000000"/>
      <rect x="3" y="10" width="6" height="25" rx="3" fill="#000000"/>
      <rect x="10" y="14" width="5" height="17" rx="2" fill="#000000"/>
      <rect x="51" y="10" width="6" height="25" rx="3" fill="#000000"/>
      <rect x="45" y="14" width="5" height="17" rx="2" fill="#000000"/>
    </g>
    <text x="33.15" y="80" font-family="'Montserrat', sans-serif" font-size="8" font-weight="900" fill="#000000" text-anchor="middle">PESSOA</text>
    <text x="33.15" y="90" font-family="'Montserrat', sans-serif" font-size="8" font-weight="900" fill="#000000" text-anchor="middle">SAUDÁVEL</text>
  </g>

  <!-- Box 2: Heart / Feito com Amor -->
  <g transform="translate(495.54, 218.03)">
    <rect x="0" y="0" width="66.29" height="66.29" fill="none" stroke="#000000" stroke-width="2" />
    <!-- Heart -->
    <g transform="translate(10, 12) scale(0.9, 0.9)">
      <path d="M 25 14 C 20 4 8 8 8 18 C 8 28 25 39 25 39 C 25 39 42 28 42 18 C 42 8 30 4 25 14 Z" fill="#000000"/>
    </g>
    <text x="33.15" y="80" font-family="'Montserrat', sans-serif" font-size="8" font-weight="900" fill="#000000" text-anchor="middle">FEITO COM</text>
    <text x="33.15" y="90" font-family="'Montserrat', sans-serif" font-size="8" font-weight="900" fill="#000000" text-anchor="middle">AMOR</text>
  </g>

  <!-- Box 3: Coffee / Precisa de Cafeína -->
  <g transform="translate(578.70, 218.03)">
    <rect x="0" y="0" width="66.29" height="66.29" fill="none" stroke="#000000" stroke-width="2" />
    <!-- Coffee -->
    <g transform="translate(9, 10) scale(0.95, 0.95)">
      <rect x="8" y="18" width="26" height="22" rx="4" fill="none" stroke="#000000" stroke-width="2.5"/>
      <path d="M 34 23 C 40 23 40 33 34 33" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="5" y1="43" x2="37" y2="43" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 15 12 Q 13 8 16 4" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
      <path d="M 21 12 Q 19 8 22 4" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
    </g>
    <text x="33.15" y="80" font-family="'Montserrat', sans-serif" font-size="8" font-weight="900" fill="#000000" text-anchor="middle">PRECISA DE</text>
    <text x="33.15" y="90" font-family="'Montserrat', sans-serif" font-size="8" font-weight="900" fill="#000000" text-anchor="middle">CAFEÍNA</text>
  </g>

  <!-- Box 4: Smile / Emocionado -->
  <g transform="translate(661.87, 218.03)">
    <rect x="0" y="0" width="66.29" height="66.29" fill="none" stroke="#000000" stroke-width="2" />
    <!-- Smile -->
    <g transform="translate(11, 11) scale(0.9, 0.9)">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#000000" stroke-width="2.5"/>
      <circle cx="18" cy="20" r="2.5" fill="#000000"/>
      <circle cx="32" cy="20" r="2.5" fill="#000000"/>
      <path d="M 16 28 Q 25 38 34 28" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
    </g>
    <text x="33.15" y="82" font-family="'Montserrat', sans-serif" font-size="8" font-weight="900" fill="#000000" text-anchor="middle">EMOCIONADO</text>
  </g>
</svg>
`)}`;

// 8. Pai Eu Te Amo • Tira de Fotos Dupla & Ripped Paper
export const CANVA_PAIS_TIRA_DUPLA_RIPPED_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <filter id="rippedShadow8" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.25" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="#F6F4F1" />

  <!-- Left: Lettering & Emotional Message -->
  <g transform="translate(60, 60)">
    <text x="0" y="35" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="28" fill="#171617">feliz dia dos pais</text>
    <text x="0" y="100" font-family="'Playfair Display', Georgia, serif" font-size="52" font-weight="900" fill="#171617">pai eu te amo</text>

    <!-- White text pill highlight -->
    <rect x="0" y="130" width="340" height="32" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
    <text x="170" y="151" font-family="'Montserrat', sans-serif" font-size="11" font-weight="500" fill="#000000" text-anchor="middle">Obrigado por ser exemplo de amor, companheirismo e fé.</text>

    <rect x="0" y="175" width="310" height="32" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
    <text x="155" y="196" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" fill="#000000" text-anchor="middle">Deus me abençoou com o melhor pai do mundo!</text>
  </g>

  <!-- Right: 2 Vertical Photo Strips with 4 Photos total -->
  <g transform="translate(460, 20)">
    <!-- Strip 1 (Left) -->
    <g transform="translate(0, 10)" filter="url(#rippedShadow8)">
      <rect width="125" height="300" rx="5" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
      <rect x="10" y="12" width="105" height="130" rx="3" fill="#CBD5E1" />
      <rect x="10" y="155" width="105" height="130" rx="3" fill="#94A3B8" />
    </g>

    <!-- Strip 2 (Right) -->
    <g transform="translate(140, 10)" filter="url(#rippedShadow8)">
      <rect width="125" height="300" rx="5" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
      <rect x="10" y="12" width="105" height="130" rx="3" fill="#94A3B8" />
      <rect x="10" y="155" width="105" height="130" rx="3" fill="#CBD5E1" />
    </g>

    <!-- 3D Speech Bubble Badge -->
    <g transform="translate(100, 120)">
      <circle cx="30" cy="30" r="28" fill="#3B82F6" stroke="#FFFFFF" stroke-width="3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
      <text x="30" y="27" font-family="'Montserrat', sans-serif" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle">12 AGOSTO</text>
      <text x="30" y="39" font-family="'Montserrat', sans-serif" font-size="7" font-weight="bold" fill="#FFFFFF" text-anchor="middle">DIA DOS PAIS</text>
    </g>
  </g>
</svg>
`)}`;

// 10a. Abstract Irregular Shape (Organic Soft Cyan Blob)
export const CANVA_PAIS_TE_AMO_BLOB_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 210" width="240" height="210">
  <path d="M 60 20 C 120 -10 190 20 220 70 C 250 120 220 180 170 200 C 120 220 50 200 20 150 C -10 100 0 50 60 20 Z" fill="#D8F1FA" opacity="0.85"/>
</svg>
`)}`;

// 10b. Halftone Circle Dots Texture
export const CANVA_PAIS_TE_AMO_HALFTONE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 195 155" width="195" height="155">
  <g fill="#61C1E2" opacity="0.45">
    <circle cx="20" cy="20" r="2" />
    <circle cx="40" cy="20" r="3" />
    <circle cx="60" cy="20" r="4" />
    <circle cx="80" cy="20" r="5" />
    <circle cx="100" cy="20" r="5.5" />
    <circle cx="120" cy="20" r="4.5" />
    <circle cx="140" cy="20" r="3" />
    <circle cx="160" cy="20" r="2" />
    
    <circle cx="20" cy="45" r="2.5" />
    <circle cx="40" cy="45" r="4" />
    <circle cx="60" cy="45" r="5.5" />
    <circle cx="80" cy="45" r="7" />
    <circle cx="100" cy="45" r="7.5" />
    <circle cx="120" cy="45" r="5.5" />
    <circle cx="140" cy="45" r="4" />
    <circle cx="160" cy="45" r="2.5" />

    <circle cx="20" cy="70" r="3" />
    <circle cx="40" cy="70" r="5" />
    <circle cx="60" cy="70" r="7" />
    <circle cx="80" cy="70" r="8.5" />
    <circle cx="100" cy="70" r="8" />
    <circle cx="120" cy="70" r="6" />
    <circle cx="140" cy="70" r="4" />
    <circle cx="160" cy="70" r="2.5" />

    <circle cx="20" cy="95" r="2.5" />
    <circle cx="40" cy="95" r="4" />
    <circle cx="60" cy="95" r="6" />
    <circle cx="80" cy="95" r="7" />
    <circle cx="100" cy="95" r="6.5" />
    <circle cx="120" cy="95" r="4.5" />
    <circle cx="140" cy="95" r="3" />

    <circle cx="20" cy="120" r="2" />
    <circle cx="40" cy="120" r="3" />
    <circle cx="60" cy="120" r="4" />
    <circle cx="80" cy="120" r="5" />
    <circle cx="100" cy="120" r="4.5" />
    <circle cx="120" cy="120" r="3" />
  </g>
</svg>
`)}`;

// 10c. 9-Slice Decorative Line Frame for Photos
export const CANVA_PAIS_TE_AMO_FRAME_LINE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178 176" width="178" height="176">
  <rect x="2" y="2" width="174" height="172" rx="16" fill="none" stroke="#274E8B" stroke-width="2.5" />
</svg>
`)}`;

// 10d. Father Decorative Text Lettering (Pai Calligraphy)
export const CANVA_PAIS_TE_AMO_PAI_LETTERING_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333 129" width="333" height="129">
  <g transform="translate(15, 15) rotate(-6.5)">
    <text x="10" y="85" font-family="'Brush Script MT', 'Dancing Script', 'Pacifico', 'Caveat', cursive" font-size="115" font-weight="bold" font-style="italic" fill="#274E8B" letter-spacing="2">
      Pai
    </text>
    <!-- Flourish swash underline -->
    <path d="M 25 96 C 70 102 180 110 260 88 C 280 82 295 78 300 80 C 302 82 290 88 270 94 C 200 115 90 108 20 100 Z" fill="#274E8B" />
  </g>
</svg>
`)}`;

// 10e. Abstract Flat Shape Sparkle
export const CANVA_PAIS_TE_AMO_SPARKLE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 18" width="22" height="18">
  <path d="M 11 0 Q 11 9 22 9 Q 11 9 11 18 Q 11 9 0 9 Q 11 9 11 0 Z" fill="#61C1E2"/>
</svg>
`)}`;

// 10. Te Amo Pai • Você é Força, Sabedoria e Amor (Official Canva Model)
export const CANVA_PAIS_TE_AMO_FORCA_SABEDORIA_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <clipPath id="framePhoto1">
      <rect x="0" y="0" width="155.43" height="155.43" rx="14" />
    </clipPath>
    <clipPath id="framePhoto2">
      <rect x="0" y="0" width="155.43" height="155.43" rx="14" />
    </clipPath>
  </defs>
  <rect width="756" height="359" fill="#FFFFFF" />

  <!-- Background Abstract Shapes & Halftones -->
  <!-- Top Left Blob -->
  <g transform="translate(-91.35, -104.38) rotate(40.95)">
    <path d="M 60 20 C 120 -10 190 20 220 70 C 250 120 220 180 170 200 C 120 220 50 200 20 150 C -10 100 0 50 60 20 Z" fill="#E2F5FC" opacity="0.85" transform="scale(0.96, 0.99)"/>
  </g>

  <!-- Top Right Halftone -->
  <g transform="translate(475.03, -112.35)" fill="#61C1E2" opacity="0.45">
    <circle cx="40" cy="130" r="3" />
    <circle cx="60" cy="130" r="4.5" />
    <circle cx="80" cy="130" r="6" />
    <circle cx="100" cy="130" r="7" />
    <circle cx="120" cy="130" r="6" />
    <circle cx="140" cy="130" r="4.5" />
    <circle cx="160" cy="130" r="3" />
    <circle cx="40" cy="155" r="4" />
    <circle cx="60" cy="155" r="5.5" />
    <circle cx="80" cy="155" r="7" />
    <circle cx="100" cy="155" r="8" />
    <circle cx="120" cy="155" r="6.5" />
    <circle cx="140" cy="155" r="5" />
  </g>

  <!-- Bottom Left Halftone -->
  <g transform="translate(90.61, 311.47)" fill="#61C1E2" opacity="0.45">
    <circle cx="20" cy="20" r="3" />
    <circle cx="40" cy="20" r="4.5" />
    <circle cx="60" cy="20" r="6" />
    <circle cx="80" cy="20" r="7" />
    <circle cx="100" cy="20" r="6" />
    <circle cx="120" cy="20" r="4.5" />
    <circle cx="140" cy="20" r="3" />
    <circle cx="40" cy="45" r="4" />
    <circle cx="60" cy="45" r="5.5" />
    <circle cx="80" cy="45" r="7" />
  </g>

  <!-- Bottom Right Blob -->
  <g transform="translate(595.98, 225.48) rotate(-45)">
    <path d="M 60 20 C 120 -10 190 20 220 70 C 250 120 220 180 170 200 C 120 220 50 200 20 150 C -10 100 0 50 60 20 Z" fill="#E2F5FC" opacity="0.85" transform="scale(1.01, 0.76)"/>
  </g>

  <!-- Left: Message to Father -->
  <g transform="translate(52.91, 59.94)">
    <text font-family="'Montserrat', sans-serif" font-size="12.5" fill="#274E8B" line-height="1.3">
      <tspan x="0" y="14" font-weight="900">Pai,</tspan>
      <tspan font-weight="400"> você é </tspan>
      <tspan font-weight="900">força</tspan>
      <tspan x="0" y="32" font-weight="400">que acolhe, </tspan>
      <tspan font-weight="900">sabedoria</tspan>
      <tspan font-weight="400"> que guia e </tspan>
      <tspan font-weight="900">amor</tspan>
      <tspan font-weight="400"> que</tspan>
      <tspan x="0" y="50" font-weight="400">não mede.</tspan>
    </text>
  </g>

  <!-- Photo 1: Decorative Line Frame & Photo -->
  <g transform="translate(41.71, 126.43)">
    <rect x="0" y="0" width="177.82" height="176.13" rx="16" fill="none" stroke="#274E8B" stroke-width="2" />
  </g>
  <g transform="translate(52.91, 136.78)" clip-path="url(#framePhoto1)">
    <image href="https://media-public.canva.com/UQr44/MAEJJdUQr44/1/t.jpg" width="155.43" height="155.43" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- Photo 2: Decorative Line Frame & Photo -->
  <g transform="translate(231.91, 74.72)">
    <rect x="0" y="0" width="177.82" height="176.13" rx="16" fill="none" stroke="#274E8B" stroke-width="2" />
  </g>
  <g transform="translate(243.11, 85.07)" clip-path="url(#framePhoto2)">
    <image href="https://media-public.canva.com/lfc_I/MAEE6Glfc_I/1/t.jpg" width="155.43" height="155.43" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- Text: FELIZ DIA DOS PAIS -->
  <text x="243.11" y="273" font-family="'Montserrat', sans-serif" font-size="12" font-weight="900" fill="#274E8B" letter-spacing="1">
    FELIZ DIA <tspan font-weight="500">DOS PAIS</tspan>
  </text>

  <!-- Right: Big Bold "TE AMO" -->
  <g transform="translate(409.73, 36.06)">
    <text x="0" y="72" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="82" font-weight="900" fill="#61C1E2" letter-spacing="2">TE</text>
    <text x="0" y="152" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="82" font-weight="900" fill="#61C1E2" letter-spacing="2">AMO</text>
  </g>

  <!-- Decorative Script Lettering: "Pai" -->
  <g transform="translate(384.91, 190.60) rotate(-6.56)">
    <text x="20" y="90" font-family="'Brush Script MT', 'Dancing Script', 'Pacifico', cursive" font-size="115" font-weight="bold" font-style="italic" fill="#274E8B">Pai</text>
    <path d="M 30 100 C 80 106 200 114 270 94 C 290 88 300 84 305 86 C 307 88 295 94 275 100 C 210 120 100 112 30 104 Z" fill="#274E8B" />
  </g>

  <!-- Sparkles -->
  <g transform="translate(657.97, 229.02) rotate(12.54)">
    <path d="M 10.5 0 Q 10.5 8.4 21 8.4 Q 10.5 8.4 10.5 16.8 Q 10.5 8.4 0 8.4 Q 10.5 8.4 10.5 0 Z" fill="#61C1E2"/>
  </g>
  <g transform="translate(482.27, 268.89) rotate(-44.75)">
    <path d="M 9.9 0 Q 9.9 7.9 19.8 7.9 Q 9.9 7.9 9.9 15.8 Q 9.9 7.9 0 7.9 Q 9.9 7.9 9.9 0 Z" fill="#61C1E2"/>
  </g>
</svg>
`)}`;

// 9. Sou do Time Café • Mascote Retrô 70s para Papai Café
export const CANVA_PAIS_TIME_CAFE_RETRO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="coffeeBg9" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8eb" />
      <stop offset="100%" stop-color="#fef3c7" />
    </linearGradient>
    <filter id="coffeeMascotShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-opacity="0.2" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#coffeeBg9)" />

  <!-- Coffee beans along top and bottom -->
  <g fill="#78350F" opacity="0.35">
    <ellipse cx="100" cy="20" rx="14" ry="9" transform="rotate(-30 100 20)" />
    <ellipse cx="280" cy="25" rx="14" ry="9" transform="rotate(45 280 25)" />
    <ellipse cx="650" cy="20" rx="14" ry="9" transform="rotate(-15 650 20)" />
    <ellipse cx="80" cy="340" rx="14" ry="9" transform="rotate(30 80 340)" />
    <ellipse cx="320" cy="335" rx="14" ry="9" transform="rotate(-40 320 335)" />
    <ellipse cx="680" cy="340" rx="14" ry="9" transform="rotate(25 680 340)" />
  </g>

  <!-- Left: 70s Vintage Typography -->
  <g transform="translate(60, 70)">
    <text x="0" y="30" font-family="'Montserrat', sans-serif" font-size="22" font-weight="900" fill="#924D03">SOU DO TIME:</text>
    <text x="0" y="125" font-family="'Playfair Display', Georgia, serif" font-size="94" font-weight="900" fill="#5C3107">Café</text>
    <text x="0" y="175" font-family="'Montserrat', sans-serif" font-size="20" font-weight="700" fill="#924D03">FRESQUINHO PARA ACORDAR</text>
    <text x="0" y="215" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="16" fill="#78350F">O combustível do melhor papai do mundo ♡</text>
  </g>

  <!-- Right: Retro 70s Cartoon Mascot Coffee Cup with boots -->
  <g transform="translate(460, 50)" filter="url(#coffeeMascotShadow)">
    <!-- Cup Body -->
    <rect x="40" y="40" width="160" height="170" rx="28" fill="#F97316" stroke="#5C3107" stroke-width="6" />
    <ellipse cx="120" cy="40" rx="80" ry="18" fill="#78350F" stroke="#5C3107" stroke-width="5" />
    <!-- Steam Lines -->
    <path d="M 90 15 Q 85 -5 100 -20" stroke="#924D03" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M 120 15 Q 115 -10 130 -25" stroke="#924D03" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M 150 15 Q 145 -5 160 -20" stroke="#924D03" stroke-width="4" fill="none" stroke-linecap="round" />
    <!-- Handle -->
    <path d="M 200 80 C 250 80 250 160 200 160" stroke="#5C3107" stroke-width="16" fill="none" stroke-linecap="round" />
    <path d="M 200 80 C 250 80 250 160 200 160" stroke="#F97316" stroke-width="8" fill="none" stroke-linecap="round" />
    <!-- Cute Eyes & Big Smile -->
    <circle cx="95" cy="110" r="10" fill="#5C3107" />
    <circle cx="98" cy="107" r="3" fill="#FFFFFF" />
    <circle cx="145" cy="110" r="10" fill="#5C3107" />
    <circle cx="148" cy="107" r="3" fill="#FFFFFF" />
    <path d="M 100 140 Q 120 165 140 140" stroke="#5C3107" stroke-width="5" fill="#EF4444" stroke-linecap="round" />
    <!-- Rosy Cheeks -->
    <circle cx="80" cy="125" r="8" fill="#FECACA" opacity="0.8" />
    <circle cx="160" cy="125" r="8" fill="#FECACA" opacity="0.8" />
    <!-- Boots -->
    <rect x="75" y="210" width="16" height="40" fill="#5C3107" />
    <rect x="145" y="210" width="16" height="40" fill="#5C3107" />
    <ellipse cx="70" cy="250" rx="22" ry="12" fill="#5C3107" />
    <ellipse cx="165" cy="250" rx="22" ry="12" fill="#5C3107" />
  </g>
</svg>
`)}`;

// 10. Oficial Canva: Azure Escuro 5-Point Star (Canva Element)
export const CANVA_AZURE_STAR_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.689 258" width="270.689" height="258">
  <path d="M135.34426229508196,0L167.2948131147541,98.54711803278688L270.6885245901639,98.54711803278688L187.0411180327869,159.4528819672131L218.991668852459,258L135.34426229508196,197.09465901639342L51.696855737704915,258L83.64740655737705,159.4528819672131L0,98.54711803278688L103.39371147540983,98.54711803278688L135.34426229508196,0Z" fill="#002F46"/>
</svg>
`)}`;

// 10b. Father and Child illustration (Canva Father's Day Illustration)
export const CANVA_FATHERS_DAY_ILLUSTRATION_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 590 800" width="590" height="800">
  <defs>
    <linearGradient id="dadSkin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>
    <linearGradient id="dadHair" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="dadShirt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="100%" stop-color="#002F46" />
    </linearGradient>
    <linearGradient id="childShirt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>
    <filter id="dadGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#002F46" flood-opacity="0.12" />
    </filter>
  </defs>

  <g filter="url(#dadGlow)">
    <!-- Decorative Soft Backdrop Circle -->
    <circle cx="295" cy="400" r="260" fill="#E0F2FE" opacity="0.6" />
    
    <!-- Hearts Floating -->
    <g fill="#EF4444" opacity="0.85">
      <path d="M 120 180 C 110 160 80 165 80 185 C 80 205 120 230 120 230 C 120 230 160 205 160 185 C 160 165 130 160 120 180 Z" transform="scale(0.8) translate(20, 20)" />
      <path d="M 450 140 C 440 120 410 125 410 145 C 410 165 450 190 450 190 C 450 190 490 165 490 145 C 490 125 460 120 450 140 Z" transform="scale(0.6) translate(150, 40)" />
    </g>

    <!-- Dad Torso / Shirt -->
    <path d="M 170 480 C 170 380 240 370 295 370 C 350 370 420 380 420 480 L 440 760 L 150 760 Z" fill="url(#dadShirt)" />
    
    <!-- Dad Collar & Tie / Details -->
    <polygon points="295,440 270,380 320,380" fill="#FFFFFF" opacity="0.9" />
    <polygon points="295,385 285,480 295,500 305,480" fill="#0369A1" />

    <!-- Dad Neck & Head -->
    <rect x="265" y="320" width="60" height="70" rx="10" fill="#FBBF24" />
    <ellipse cx="295" cy="270" rx="75" ry="85" fill="#FDE68A" />
    
    <!-- Dad Ears -->
    <circle cx="218" cy="270" r="16" fill="#FBBF24" />
    <circle cx="372" cy="270" r="16" fill="#FBBF24" />

    <!-- Dad Hair & Beard -->
    <path d="M 220 250 C 215 180 260 170 295 170 C 330 170 375 180 370 250 C 355 220 335 210 295 210 C 255 210 235 220 220 250 Z" fill="url(#dadHair)" />
    <path d="M 235 280 C 235 345 270 355 295 355 C 320 355 355 345 355 280 C 340 315 320 325 295 325 C 270 325 250 315 235 280 Z" fill="url(#dadHair)" />

    <!-- Dad Facial Features -->
    <ellipse cx="265" cy="260" rx="6" ry="7" fill="#0F172A" />
    <ellipse cx="325" cy="260" rx="6" ry="7" fill="#0F172A" />
    <path d="M 255 248 Q 265 242 275 248" stroke="#0F172A" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M 315 248 Q 325 242 335 248" stroke="#0F172A" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M 290 265 Q 295 275 300 265" stroke="#D97706" stroke-width="3" fill="none" stroke-linecap="round" />
    <!-- Big Gentle Smile -->
    <path d="M 275 285 Q 295 305 315 285" stroke="#0F172A" stroke-width="4" fill="#FFFFFF" stroke-linecap="round" />

    <!-- Rosy Cheeks -->
    <ellipse cx="250" cy="275" rx="12" ry="7" fill="#FCA5A5" opacity="0.6" />
    <ellipse cx="340" cy="275" rx="12" ry="7" fill="#FCA5A5" opacity="0.6" />

    <!-- Child / Kid Hugging Dad -->
    <!-- Child Torso / Shirt -->
    <path d="M 340 460 C 340 390 380 380 410 380 C 440 380 480 390 480 460 L 490 620 L 330 620 Z" fill="url(#childShirt)" />
    
    <!-- Child Head -->
    <ellipse cx="400" cy="320" rx="55" ry="60" fill="#FEF3C7" />
    <!-- Child Hair with playful tuft -->
    <path d="M 345 300 C 345 240 380 235 405 235 C 430 235 455 240 455 300 C 445 270 425 265 400 265 C 375 265 355 270 345 300 Z" fill="#78350F" />
    <path d="M 390 235 Q 400 215 410 235" stroke="#78350F" stroke-width="6" fill="none" stroke-linecap="round" />

    <!-- Child Eyes (Happy Closed Curves) & Smile -->
    <path d="M 375 315 Q 385 325 395 315" stroke="#0F172A" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M 415 315 Q 425 325 435 315" stroke="#0F172A" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M 395 335 Q 405 350 415 335" stroke="#0F172A" stroke-width="3.5" fill="#EF4444" stroke-linecap="round" />
    <!-- Child Rosy Cheeks -->
    <ellipse cx="370" cy="330" rx="10" ry="6" fill="#F87171" opacity="0.7" />
    <ellipse cx="435" cy="330" rx="10" ry="6" fill="#F87171" opacity="0.7" />

    <!-- Child Arms Hugging Dad -->
    <path d="M 340 440 C 300 420 280 440 260 460" stroke="#FDE68A" stroke-width="26" stroke-linecap="round" fill="none" />
    
    <!-- Dad Arms Embracing Child Safely -->
    <path d="M 180 520 C 180 590 320 620 440 550" stroke="#002F46" stroke-width="40" stroke-linecap="round" fill="none" />
    <path d="M 420 545 C 445 535 460 520 450 500" stroke="#FDE68A" stroke-width="26" stroke-linecap="round" fill="none" />
  </g>
</svg>
`)}`;

// 10c. Complete Vector Preview for the Father's Day Azure Stars template (756x359px)
export const CANVA_PAIS_ILUSTRACAO_ESTRELAS_AZURE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <rect width="756" height="359" fill="#FFFFFF" />

  <!-- 15 Azure Escuro 5-Point Stars with refined delicate sizes -->
  <g fill="#002F46">
    <!-- Star 1: (x: 43, y: 38, w: 26, h: 24, rot: -11) -->
    <g transform="translate(43, 38) rotate(-11) scale(0.096)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 2: (x: 684, y: 293, w: 26, h: 24, rot: -11) -->
    <g transform="translate(684, 293) rotate(-11) scale(0.096)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 3: (x: 101, y: 284, w: 26, h: 24, rot: 23.85) -->
    <g transform="translate(101, 284) rotate(23.85) scale(0.096)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 4: (x: 320, y: 35, w: 18, h: 17, rot: 23.85) -->
    <g transform="translate(320, 35) rotate(23.85) scale(0.066)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 5: (x: 48, y: 173, w: 18, h: 17, rot: 23.85) -->
    <g transform="translate(48, 173) rotate(23.85) scale(0.066)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 6: (x: 696, y: 37, w: 14, h: 13, rot: 23.85) -->
    <g transform="translate(696, 37) rotate(23.85) scale(0.051)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 7: (x: 367, y: 308, w: 14, h: 13, rot: 12.11) -->
    <g transform="translate(367, 308) rotate(12.11) scale(0.051)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 8: (x: 346, y: 209, w: 14, h: 13, rot: -25.16) -->
    <g transform="translate(346, 209) rotate(-25.16) scale(0.051)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 9: (x: 42, y: 247, w: 9, h: 9, rot: -25.16) -->
    <g transform="translate(42, 247) rotate(-25.16) scale(0.033)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 10: (x: 100, y: 96, w: 9, h: 9, rot: -25.16) -->
    <g transform="translate(100, 96) rotate(-25.16) scale(0.033)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 11: (x: 33, y: 325, w: 9, h: 9, rot: -25.16) -->
    <g transform="translate(33, 325) rotate(-25.16) scale(0.033)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 12: (x: 251, y: 63, w: 9, h: 9, rot: -25.16) -->
    <g transform="translate(251, 63) rotate(-25.16) scale(0.033)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 13: (x: 488, y: 15, w: 9, h: 9, rot: -25.16) -->
    <g transform="translate(488, 15) rotate(-25.16) scale(0.033)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 14: (x: 700, y: 153, w: 9, h: 9, rot: -25.16) -->
    <g transform="translate(700, 153) rotate(-25.16) scale(0.033)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
    <!-- Star 15: (x: 590, y: 332, w: 9, h: 9, rot: -25.16) -->
    <g transform="translate(590, 332) rotate(-25.16) scale(0.033)">
      <path d="M135.344,0 L167.295,98.547 L270.689,98.547 L187.041,159.453 L218.992,258 L135.344,197.095 L51.697,258 L83.647,159.453 L0,98.547 L103.394,98.547 Z"/>
    </g>
  </g>

  <!-- Left: Father & Child Illustration (translate: 132.83, 35.91, w: 215, h: 291) -->
  <g transform="translate(132.83, 35.91)">
    <!-- Scale 590x800 illustration into 215x291 -->
    <g transform="scale(0.3644)">
      <!-- Soft Backdrop Circle -->
      <circle cx="295" cy="400" r="260" fill="#E0F2FE" opacity="0.6" />
      
      <!-- Floating Red Hearts -->
      <g fill="#EF4444" opacity="0.85">
        <path d="M 120 180 C 110 160 80 165 80 185 C 80 205 120 230 120 230 C 120 230 160 205 160 185 C 160 165 130 160 120 180 Z" transform="scale(0.8) translate(20, 20)" />
        <path d="M 450 140 C 440 120 410 125 410 145 C 410 165 450 190 450 190 C 450 190 490 165 490 145 C 490 125 460 120 450 140 Z" transform="scale(0.6) translate(150, 40)" />
      </g>

      <!-- Dad Torso -->
      <path d="M 170 480 C 170 380 240 370 295 370 C 350 370 420 380 420 480 L 440 760 L 150 760 Z" fill="#002F46" />
      <polygon points="295,440 270,380 320,380" fill="#FFFFFF" opacity="0.9" />
      <polygon points="295,385 285,480 295,500 305,480" fill="#0284C7" />

      <!-- Dad Head & Neck -->
      <rect x="265" y="320" width="60" height="70" rx="10" fill="#FBBF24" />
      <ellipse cx="295" cy="270" rx="75" ry="85" fill="#FDE68A" />
      <circle cx="218" cy="270" r="16" fill="#FBBF24" />
      <circle cx="372" cy="270" r="16" fill="#FBBF24" />

      <!-- Dad Hair & Beard -->
      <path d="M 220 250 C 215 180 260 170 295 170 C 330 170 375 180 370 250 C 355 220 335 210 295 210 C 255 210 235 220 220 250 Z" fill="#0F172A" />
      <path d="M 235 280 C 235 345 270 355 295 355 C 320 355 355 345 355 280 C 340 315 320 325 295 325 C 270 325 250 315 235 280 Z" fill="#0F172A" />

      <ellipse cx="265" cy="260" rx="6" ry="7" fill="#0F172A" />
      <ellipse cx="325" cy="260" rx="6" ry="7" fill="#0F172A" />
      <path d="M 255 248 Q 265 242 275 248" stroke="#0F172A" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 315 248 Q 325 242 335 248" stroke="#0F172A" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 275 285 Q 295 305 315 285" stroke="#0F172A" stroke-width="4" fill="#FFFFFF" stroke-linecap="round" />
      <ellipse cx="250" cy="275" rx="12" ry="7" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="340" cy="275" rx="12" ry="7" fill="#FCA5A5" opacity="0.6" />

      <!-- Child Hugging -->
      <path d="M 340 460 C 340 390 380 380 410 380 C 440 380 480 390 480 460 L 490 620 L 330 620 Z" fill="#F59E0B" />
      <ellipse cx="400" cy="320" rx="55" ry="60" fill="#FEF3C7" />
      <path d="M 345 300 C 345 240 380 235 405 235 C 430 235 455 240 455 300 C 445 270 425 265 400 265 C 375 265 355 270 345 300 Z" fill="#78350F" />
      <path d="M 390 235 Q 400 215 410 235" stroke="#78350F" stroke-width="6" fill="none" stroke-linecap="round" />
      <path d="M 375 315 Q 385 325 395 315" stroke="#0F172A" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 415 315 Q 425 325 435 315" stroke="#0F172A" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 395 335 Q 405 350 415 335" stroke="#0F172A" stroke-width="3.5" fill="#EF4444" stroke-linecap="round" />
      <ellipse cx="370" cy="330" rx="10" ry="6" fill="#F87171" opacity="0.7" />
      <ellipse cx="435" cy="330" rx="10" ry="6" fill="#F87171" opacity="0.7" />

      <!-- Arms -->
      <path d="M 340 440 C 300 420 280 440 260 460" stroke="#FDE68A" stroke-width="26" stroke-linecap="round" fill="none" />
      <path d="M 180 520 C 180 590 320 620 440 550" stroke="#002F46" stroke-width="40" stroke-linecap="round" fill="none" />
      <path d="M 420 545 C 445 535 460 520 450 500" stroke="#FDE68A" stroke-width="26" stroke-linecap="round" fill="none" />
    </g>
  </g>

  <!-- Right: Decorative Lettering "Feliz Dia dos Pais" (translate: 391.49, 37.15, w: 274, h: 285) -->
  <g transform="translate(391.49, 37.15)">
    <!-- Decorative Frame Flourishes -->
    <path d="M 20 50 Q 137 10 254 50" stroke="#002F46" stroke-width="2" fill="none" opacity="0.4" />
    <path d="M 20 240 Q 137 280 254 240" stroke="#002F46" stroke-width="2" fill="none" opacity="0.4" />
    
    <!-- Script "Feliz" -->
    <text x="137" y="80" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="44" font-weight="bold" fill="#002F46" text-anchor="middle">Feliz</text>
    
    <!-- Big Bold "DIA DOS" -->
    <text x="137" y="145" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="34" font-weight="900" letter-spacing="4" fill="#0284C7" text-anchor="middle">DIA DOS</text>
    
    <!-- Big Serif "PAIS" -->
    <text x="137" y="215" font-family="'Playfair Display', Georgia, serif" font-size="56" font-weight="900" letter-spacing="3" fill="#002F46" text-anchor="middle">PAIS</text>
    
    <!-- Small Subtitle -->
    <text x="137" y="250" font-family="'Montserrat', sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="#64748B" text-anchor="middle">★ COM AMOR &amp; GRATIDÃO ★</text>
  </g>
</svg>
`)}`;

// 12. Caneca do Melhor Pai do Mundo • Medalha Super Pai & Coroa Dourada (Canva Model)
export const CANVA_MEDALHA_SUPER_PAI_ILUSTRACAO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315 252" width="315" height="252">
  <defs>
    <linearGradient id="goldGradMedal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="25%" stop-color="#FCD34D" />
      <stop offset="60%" stop-color="#F59E0B" />
      <stop offset="90%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="blueRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A" />
      <stop offset="50%" stop-color="#172554" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <filter id="medalShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Ribbons Behind Medal -->
  <g filter="url(#medalShadow)">
    <polygon points="120,130 85,245 115,225 145,245 150,130" fill="url(#blueRibbonGrad)" stroke="#F59E0B" stroke-width="2.5" />
    <polyline points="100,130 95,235" stroke="#FBBF24" stroke-width="2" stroke-dasharray="4,4" />
    <polygon points="165,130 170,245 200,225 230,245 195,130" fill="url(#blueRibbonGrad)" stroke="#F59E0B" stroke-width="2.5" />
    <polyline points="215,130 220,235" stroke="#FBBF24" stroke-width="2" stroke-dasharray="4,4" />
  </g>

  <!-- Medal Body (Outer Gold Gear / Sunburst Star Rim) -->
  <g transform="translate(157.5, 110)" filter="url(#medalShadow)">
    <circle cx="0" cy="0" r="98" fill="url(#goldGradMedal)" stroke="#B45309" stroke-width="2.5" />
    <circle cx="0" cy="0" r="90" fill="#F59E0B" opacity="0.3" />
    <circle cx="0" cy="0" r="84" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />
    <circle cx="0" cy="0" r="80" fill="url(#goldGradMedal)" />
    <!-- Laurel Wreath Leaves Around Rim -->
    <g fill="#D97706" opacity="0.7">
      <ellipse cx="-60" cy="-35" rx="5" ry="10" transform="rotate(-30 -60 -35)" />
      <ellipse cx="-72" cy="-10" rx="5" ry="10" transform="rotate(-15 -72 -10)" />
      <ellipse cx="-74" cy="18" rx="5" ry="10" transform="rotate(10 -74 18)" />
      <ellipse cx="-62" cy="45" rx="5" ry="10" transform="rotate(35 -62 45)" />
      <ellipse cx="60" cy="-35" rx="5" ry="10" transform="rotate(30 60 -35)" />
      <ellipse cx="72" cy="-10" rx="5" ry="10" transform="rotate(15 72 -10)" />
      <ellipse cx="74" cy="18" rx="5" ry="10" transform="rotate(-10 74 18)" />
      <ellipse cx="62" cy="45" rx="5" ry="10" transform="rotate(-35 62 45)" />
    </g>
    <!-- Little Stars in gold perimeter -->
    <g fill="#FEF3C7">
      <path d="M 0 -72 L 2 -67 L 7 -67 L 3 -64 L 5 -59 L 0 -62 L -5 -59 L -3 -64 L -7 -67 L -2 -67 Z" />
      <path d="M -50 -50 L -48 -45 L -43 -45 L -47 -42 L -45 -37 L -50 -40 L -55 -37 L -53 -42 L -57 -45 L -52 -45 Z" />
      <path d="M 50 -50 L 52 -45 L 57 -45 L 53 -42 L 55 -37 L 50 -40 L 45 -37 L 47 -42 L 43 -45 L 48 -45 Z" />
    </g>
  </g>
</svg>
`)}`;

export const CANVA_SELO_CIRCULAR_SUPER_PAI_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181 181" width="181" height="181">
  <defs>
    <filter id="sealInnerShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
    </filter>
  </defs>
  <!-- Clean Crisp White Core Badge -->
  <circle cx="90.5" cy="90.5" r="88" fill="#FFFFFF" filter="url(#sealInnerShadow)" />
  <!-- Delicate Inner Ring Stitching -->
  <circle cx="90.5" cy="90.5" r="80" fill="none" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="4,3" />
  <circle cx="90.5" cy="90.5" r="74" fill="none" stroke="#CBD5E1" stroke-width="1" />
  <!-- 5-Point Decorative Accent Stars -->
  <g fill="#F59E0B">
    <polygon points="90.5,18 92.5,23 98,23 93.5,26.5 95.5,32 90.5,28.5 85.5,32 87.5,26.5 83,23 88.5,23" />
    <polygon points="90.5,163 92.5,158 98,158 93.5,154.5 95.5,149 90.5,152.5 85.5,149 87.5,154.5 83,158 88.5,158" />
  </g>
</svg>
`)}`;

export const CANVA_TEXTO_ARCO_MELHOR_PAI_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273 125" width="273" height="125">
  <defs>
    <path id="archPathCanva" d="M 12 118 A 148 148 0 0 1 261 118" fill="none" />
  </defs>
  <text fill="#FFFFFF">
    <textPath href="#archPathCanva" startOffset="50%" text-anchor="middle" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="14.2" font-weight="900" letter-spacing="2.8px">
      CANECA DO MELHOR PAI DO MUNDO
    </textPath>
  </text>
</svg>
`)}`;

export const CANVA_COROA_DOODLE_DOURADA_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 72" width="121" height="72">
  <g fill="#FBBF24" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 15 58 L 106 58 L 112 24 L 84 40 L 60 12 L 36 40 L 9 24 Z" fill="#FBBF24" />
    <circle cx="9" cy="20" r="5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" />
    <circle cx="60" cy="8" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" />
    <circle cx="112" cy="20" r="5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" />
    <circle cx="36" cy="36" r="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2" />
    <circle cx="84" cy="36" r="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2" />
    <path d="M 15 58 Q 60 63 106 58" stroke="#D97706" stroke-width="3.5" fill="none" />
  </g>
</svg>
`)}`;

export const CANVA_FELIZ_DIA_DOS_PAIS_LETTERING_AZUL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 262" width="310" height="262">
  <defs>
    <filter id="letteringGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.25" flood-color="#000000" />
    </filter>
  </defs>

  <g stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round">
    <path d="M 30 35 Q 80 15 155 35 T 280 35" />
    <path d="M 30 235 Q 155 255 280 235" />
    <path d="M 40 32 Q 50 22 60 30 Q 50 38 40 32 Z" fill="#FFFFFF" opacity="0.8" />
    <path d="M 270 32 Q 260 22 250 30 Q 260 38 270 32 Z" fill="#FFFFFF" opacity="0.8" />
  </g>

  <g filter="url(#letteringGlow)">
    <text x="155" y="78" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="52" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">Feliz</text>

    <g transform="translate(65, 98)">
      <rect x="0" y="0" width="180" height="36" rx="18" fill="#FFFFFF" stroke="#F59E0B" stroke-width="2" />
      <text x="90" y="24" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="20" font-weight="900" letter-spacing="4" fill="#0F2547" text-anchor="middle">DIA DOS</text>
    </g>

    <text x="155" y="202" font-family="'Playfair Display', Georgia, serif" font-size="74" font-weight="900" letter-spacing="6" fill="#FFFFFF" text-anchor="middle">PAIS</text>

    <g fill="#FBBF24">
      <polygon points="155,214 157.5,219.5 163,219.5 158.5,223 160.5,228.5 155,225 149.5,228.5 151.5,223 147,219.5 152.5,219.5" />
      <circle cx="130" cy="221" r="3" fill="#FBBF24" />
      <circle cx="180" cy="221" r="3" fill="#FBBF24" />
      <polygon points="35,115 37,119 41,119 38,121.5 39.5,125.5 35,123 30.5,125.5 32,121.5 29,119 33,119" />
      <polygon points="275,115 277,119 281,119 278,121.5 279.5,125.5 275,123 270.5,125.5 272,121.5 269,119 273,119" />
    </g>
  </g>
</svg>
`)}`;

export const CANVA_PAIS_MEDALHA_SUPER_PAI_AZUL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="royalBlueBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2A599E" />
      <stop offset="100%" stop-color="#1E4482" />
    </linearGradient>
    <linearGradient id="goldMedalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="25%" stop-color="#FCD34D" />
      <stop offset="60%" stop-color="#F59E0B" />
      <stop offset="90%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <path id="archPrevPath" d="M 12 118 A 148 148 0 0 1 261 118" fill="none" />
    <filter id="previewDrop" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- 1. Background: Royal Blue #2A599E -->
  <rect width="756" height="359" fill="url(#royalBlueBg)" />

  <!-- Subtle Frosted Glass Texture Pattern -->
  <g opacity="0.08" stroke="#FFFFFF" stroke-width="1.5" fill="none">
    <circle cx="200" cy="180" r="160" />
    <circle cx="550" cy="180" r="160" />
    <line x1="0" y1="90" x2="756" y2="90" stroke-dasharray="6,8" />
    <line x1="0" y1="270" x2="756" y2="270" stroke-dasharray="6,8" />
  </g>

  <!-- 2. Left Side: Curved Arch Text (x: 63, y: 36, w: 273, h: 125) -->
  <g transform="translate(62.75, 35.91)">
    <text fill="#FFFFFF">
      <textPath href="#archPrevPath" startOffset="50%" text-anchor="middle" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="14.2" font-weight="900" letter-spacing="2.8px">
        CANECA DO MELHOR PAI DO MUNDO
      </textPath>
    </text>
  </g>

  <!-- 3. Left Side: Medal Illustration (x: 42, y: 71, w: 315, h: 252) -->
  <g transform="translate(41.71, 70.74)">
    <polygon points="120,130 85,245 115,225 145,245 150,130" fill="#0F172A" stroke="#F59E0B" stroke-width="2.5" />
    <polygon points="165,130 170,245 200,225 230,245 195,130" fill="#0F172A" stroke="#F59E0B" stroke-width="2.5" />
    <circle cx="157.5" cy="110" r="98" fill="url(#goldMedalGrad)" stroke="#B45309" stroke-width="2.5" filter="url(#previewDrop)" />
    <circle cx="157.5" cy="110" r="84" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />
    <circle cx="157.5" cy="110" r="80" fill="url(#goldMedalGrad)" />
  </g>

  <!-- 4. Left Side: Circular White Seal (x: 109, y: 87, w: 181, h: 181) -->
  <g transform="translate(109.21, 87.18)">
    <circle cx="90.5" cy="90.5" r="86" fill="#FFFFFF" filter="url(#previewDrop)" />
    <circle cx="90.5" cy="90.5" r="78" fill="none" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="4,3" />
    <polygon points="90.5,18 92.5,23 98,23 93.5,26.5 95.5,32 90.5,28.5 85.5,32 87.5,26.5 83,23 88.5,23" fill="#F59E0B" />
    <polygon points="90.5,163 92.5,158 98,158 93.5,154.5 95.5,149 90.5,152.5 85.5,149 87.5,154.5 83,158 88.5,158" fill="#F59E0B" />
  </g>

  <!-- 5. Left Side: Text "SUPER PAI" (x: 130, y: 125, w: 138, h: 120) -->
  <g transform="translate(130.40, 124.50)">
    <text x="69" y="58" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="24" font-weight="900" fill="#0F2547" text-anchor="middle" letter-spacing="1">SUPER PAI</text>
  </g>

  <!-- 6. Right Side: Lettering "Feliz Dia dos Pais" (x: 397, y: 53, w: 310, h: 262) -->
  <g transform="translate(396.75, 53.32)" filter="url(#previewDrop)">
    <text x="155" y="78" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="52" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Feliz</text>
    <g transform="translate(65, 98)">
      <rect x="0" y="0" width="180" height="36" rx="18" fill="#FFFFFF" stroke="#F59E0B" stroke-width="2" />
      <text x="90" y="24" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="20" font-weight="900" letter-spacing="4" fill="#0F2547" text-anchor="middle">DIA DOS</text>
    </g>
    <text x="155" y="202" font-family="'Playfair Display', Georgia, serif" font-size="74" font-weight="900" letter-spacing="6" fill="#FFFFFF" text-anchor="middle">PAIS</text>
    <polygon points="155,214 157.5,219.5 163,219.5 158.5,223 160.5,228.5 155,225 149.5,228.5 151.5,223 147,219.5 152.5,219.5" fill="#FBBF24" />
    <circle cx="130" cy="221" r="3" fill="#FBBF24" />
    <circle cx="180" cy="221" r="3" fill="#FBBF24" />
  </g>

  <!-- 7. Right Side: Doodle Gold Crown (x: 542, y: 17, w: 121, h: 72, rot: 19.22deg) -->
  <g transform="translate(541.82, 17.42) rotate(19.22)">
    <path d="M 15 58 L 106 58 L 112 24 L 84 40 L 60 12 L 36 40 L 9 24 Z" fill="#FBBF24" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="9" cy="20" r="5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" />
    <circle cx="60" cy="8" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" />
    <circle cx="112" cy="20" r="5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" />
    <circle cx="36" cy="36" r="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2" />
    <circle cx="84" cy="36" r="4" fill="#FEF3C7" stroke="#D97706" stroke-width="2" />
    <path d="M 15 58 Q 60 63 106 58" stroke="#D97706" stroke-width="3.5" fill="none" />
  </g>
</svg>
`)}`;


// =======================================================
// 2. LAYER GENERATOR FUNCTIONS (100% EDITABLE MULTI-LAYER)
// =======================================================

export function getPaisCoracaoRecortadoTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `pais-cor-bg-${timestamp}`,
      name: 'Fundo: Clean Branco Puro (#FFFFFF)',
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
      id: `pais-cor-photo-${timestamp}`,
      name: 'Foto com Papai (Moldura de Coração)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 50,
      width: 220,
      height: 220,
      rotation: 0,
      content: 'https://media-public.canva.com/MADCMCQnwxk/1/thumbnail-1.jpg',
      strokeColor: '#DC2626',
      strokeWidth: 6,
    },
    {
      id: `pais-cor-badge-${timestamp}`,
      name: 'Selo: Melhor Pai (#305CA9)',
      type: 'shape',
      shapeType: 'circle',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 255,
      y: 190,
      width: 80,
      height: 80,
      rotation: 0,
      content: '',
      color: '#305CA9',
    },
    {
      id: `pais-cor-badge-txt-${timestamp}`,
      name: 'Texto Selo: Papai você é o melhor!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 255,
      y: 215,
      width: 80,
      height: 40,
      rotation: 0,
      content: 'MELHOR PAI!',
      color: '#FFFFFF',
      fontSize: 10,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `pais-cor-txt-feliz-${timestamp}`,
      name: 'Texto: FELIZ DIA',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 440,
      y: 75,
      width: 220,
      height: 35,
      rotation: 0,
      content: 'FELIZ DIA',
      color: '#214074',
      fontSize: 18,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `pais-cor-txt-papai-${timestamp}`,
      name: 'Texto: papai',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 430,
      y: 110,
      width: 280,
      height: 75,
      rotation: 0,
      content: 'papai',
      color: '#386BC5',
      fontSize: 58,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
    {
      id: `pais-cor-txt-msg-${timestamp}`,
      name: 'Texto: Mensagem Carinho & Fé',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 430,
      y: 195,
      width: 290,
      height: 55,
      rotation: 0,
      content: 'Seu carinho me acolhe, sua força me protege, sua fé me inspira. Que bênção ter você!',
      color: '#214074',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `pais-cor-txt-dedic-${timestamp}`,
      name: 'Texto: com todo meu amor, Estela',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 430,
      y: 265,
      width: 280,
      height: 35,
      rotation: 0,
      content: 'com todo meu amor • 12 de Agosto ♡',
      color: '#386BC5',
      fontSize: 13,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
  ];
}

export function getPaisMeuHeroiBlueyTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `hero-bg-${timestamp}`,
      name: 'Fundo: Azul Céu Pastel (#F0F9FF)',
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
      color: '#F0F9FF',
    },
    {
      id: `hero-photo1-${timestamp}`,
      name: 'Foto 1: Abraço com Papai',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 400,
      y: 60,
      width: 145,
      height: 145,
      rotation: 6,
      content: 'https://media-public.canva.com/MADavuEeN1Q/1/thumbnail-1.jpg',
      strokeColor: '#000000',
      strokeWidth: 4,
    },
    {
      id: `hero-photo2-${timestamp}`,
      name: 'Foto 2: Sorriso em Família',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 550,
      y: 110,
      width: 155,
      height: 155,
      rotation: -8,
      content: 'https://media-public.canva.com/bsiqE/MAEhVjbsiqE/1/t.jpg',
      strokeColor: '#000000',
      strokeWidth: 4,
    },
    {
      id: `hero-photo3-${timestamp}`,
      name: 'Foto 3: Momentos Especiais',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 420,
      y: 155,
      width: 160,
      height: 160,
      rotation: 12,
      content: 'https://media-public.canva.com/MADakUbt-bQ/1/thumbnail_large-1.jpg',
      strokeColor: '#000000',
      strokeWidth: 4,
    },
    {
      id: `hero-txt-pai-${timestamp}`,
      name: 'Texto: PAI (Bluey Style)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 60,
      width: 250,
      height: 80,
      rotation: 0,
      content: 'PAI',
      color: '#0284C7',
      fontSize: 72,
      fontFamily: 'Impact, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `hero-txt-heroi-${timestamp}`,
      name: 'Texto: meu herói',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 150,
      width: 250,
      height: 45,
      rotation: 0,
      content: 'meu herói',
      color: '#000000',
      fontSize: 34,
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `hero-txt-dias-${timestamp}`,
      name: 'Texto: de todos os dias',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 205,
      width: 250,
      height: 40,
      rotation: 0,
      content: 'de todos os dias ♡',
      color: '#45769B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
  ];
}

export function getPaisTiraFotosVintageTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `strip-bg-${timestamp}`,
      name: 'Fundo: Clean Branco (#FFFFFF)',
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
      id: `strip-photo1-${timestamp}`,
      name: 'Foto 1: Papai e Bebê',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 80,
      y: 35,
      width: 120,
      height: 120,
      rotation: -7,
      content: 'https://media-public.canva.com/MADasCPKOw4/1/thumbnail-1.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `strip-photo2-${timestamp}`,
      name: 'Foto 2: Conversa de Pai e Filha',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 100,
      y: 155,
      width: 120,
      height: 120,
      rotation: -7,
      content: 'https://media-public.canva.com/fdpg8/MAEJNLfdpg8/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `strip-photo3-${timestamp}`,
      name: 'Foto 3: Abraço Pai e Filho Adulto',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 230,
      y: 35,
      width: 120,
      height: 120,
      rotation: 5,
      content: 'https://media-public.canva.com/UQr44/MAEJJdUQr44/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `strip-photo4-${timestamp}`,
      name: 'Foto 4: Leitura Juntos',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 250,
      y: 155,
      width: 120,
      height: 120,
      rotation: 5,
      content: 'https://media-public.canva.com/MAChiROUsN0/1/thumbnail-1.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `strip-txt-title-${timestamp}`,
      name: 'Texto: PAI & AMOR',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 430,
      y: 80,
      width: 300,
      height: 55,
      rotation: 0,
      content: 'PAI & AMOR',
      color: '#0F172A',
      fontSize: 42,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `strip-txt-sub-${timestamp}`,
      name: 'Texto: Momentos no Coração',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 430,
      y: 140,
      width: 300,
      height: 40,
      rotation: 0,
      content: 'Momentos que guardo no coração',
      color: '#3B82F6',
      fontSize: 18,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
    {
      id: `strip-txt-msg-${timestamp}`,
      name: 'Texto: Mensagem de Gratidão',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 430,
      y: 195,
      width: 290,
      height: 60,
      rotation: 0,
      content: 'Obrigado por ser meu guia, minha força e meu maior exemplo de vida! Te amo.',
      color: '#475569',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
    },
  ];
}

export function getPaisEuTeAmoBoldTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `amo-bg-${timestamp}`,
      name: 'Fundo: Branco Pérola (#FFF8F8)',
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
      color: '#FFF8F8',
    },
    {
      id: `amo-photo1-${timestamp}`,
      name: 'Foto 1: Papai e Filha',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 50,
      width: 125,
      height: 125,
      rotation: 18,
      content: 'https://media-public.canva.com/Omghg/MAFGXNOmghg/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `amo-photo2-${timestamp}`,
      name: 'Foto 2: Abraço Carinhoso',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 75,
      y: 140,
      width: 150,
      height: 150,
      rotation: -8,
      content: 'https://media-public.canva.com/MADQ4_io5bU/1/thumbnail-1.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 5,
    },
    {
      id: `amo-txt-pais-${timestamp}`,
      name: 'Texto: PAIS',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 390,
      y: 75,
      width: 320,
      height: 80,
      rotation: 0,
      content: 'PAIS',
      color: '#990629',
      fontSize: 70,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `amo-txt-euteamo-${timestamp}`,
      name: 'Texto: eu te amo!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 390,
      y: 155,
      width: 340,
      height: 70,
      rotation: 0,
      content: 'eu te amo!',
      color: '#990629',
      fontSize: 54,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `amo-txt-msg-${timestamp}`,
      name: 'Texto: Dedicação Filha',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 390,
      y: 235,
      width: 320,
      height: 45,
      rotation: 0,
      content: 'Pai, seu amor me guia e sua fé inspira minha vida. Com amor, Helena ♡',
      color: '#000000',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

export function getPaisMonolineMinimalistaTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `mono-bg-${timestamp}`,
      name: 'Fundo: Linho Creme (#F4F1EE)',
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
      color: '#F4F1EE',
    },
    {
      id: `mono-title-${timestamp}`,
      name: 'Texto: Feliz dia dos Pais',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 260,
      width: 400,
      height: 60,
      rotation: 0,
      content: 'Feliz dia dos Pais',
      color: '#1F4072',
      fontSize: 42,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `mono-msg-${timestamp}`,
      name: 'Texto: Frase de Afeto',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 180,
      y: 40,
      width: 400,
      height: 40,
      rotation: 0,
      content: 'O amor de pai é a raiz mais forte da nossa vida.',
      color: '#475569',
      fontSize: 14,
      fontFamily: 'Montserrat, sans-serif',
      textAlign: 'center',
    },
  ];
}

export function getPaisSuperHeroiTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `super-bg-${timestamp}`,
      name: 'Fundo: Clean Branco (#FFFFFF)',
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
      id: `super-title-${timestamp}`,
      name: 'Texto: PAI (Impact)',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 30,
      width: 320,
      height: 170,
      rotation: 0,
      content: 'PAI',
      color: '#000000',
      fontSize: 160,
      fontFamily: 'Impact, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `super-msg1-${timestamp}`,
      name: 'Texto: Você é conselho',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 220,
      width: 300,
      height: 40,
      rotation: 0,
      content: 'Você é conselho,',
      color: '#000000',
      fontSize: 26,
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `super-msg2-${timestamp}`,
      name: 'Texto: proteção e amor!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 265,
      width: 300,
      height: 40,
      rotation: 0,
      content: 'proteção e amor!',
      color: '#EF4444',
      fontSize: 26,
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

export function getPaisTabelaNutricionalTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `nutri-bg-${timestamp}`,
      name: 'Fundo: Clean Branco (#FFFFFF)',
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
      id: `LBzkLNvTlGVMV4wz-${timestamp}`,
      name: 'Linha Superior (Divisor)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 32,
      y: 96,
      width: 322,
      height: 1.5,
      rotation: 0,
      content: '',
      color: '#000000',
    },
    {
      id: `LBQdYtNqGcV8dMwn-${timestamp}`,
      name: 'Linha Inferior (Divisor)',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 32,
      y: 305,
      width: 322,
      height: 1.5,
      rotation: 0,
      content: '',
      color: '#000000',
    },
    {
      id: `LBNNFFJBf4JQ1TWG-${timestamp}`,
      name: 'Texto: 100%',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 32,
      y: 36,
      width: 65,
      height: 26,
      rotation: 0,
      content: '100%',
      color: '#000000',
      fontSize: 22,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `LBBhL0z4MQJVKY0y-${timestamp}`,
      name: 'Moldura Cápsula 1 (Incrível)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 32,
      y: 64,
      width: 65,
      height: 18,
      rotation: 0,
      content: CANVA_PAIS_PILL_BORDER_SVG,
    },
    {
      id: `LBPV6hSRMXg7sjZQ-${timestamp}`,
      name: 'Texto: INCRÍVEL',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 32,
      y: 65,
      width: 65,
      height: 16,
      rotation: 0,
      content: 'INCRÍVEL',
      color: '#000000',
      fontSize: 10,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `LBLFcwqtjxz8zJCs-${timestamp}`,
      name: 'Texto: AUTÊNTICO',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 109,
      y: 43,
      width: 65,
      height: 16,
      rotation: 0,
      content: 'AUTÊNTICO',
      color: '#000000',
      fontSize: 10,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `LB748SkxQcqSdwCC-${timestamp}`,
      name: 'Moldura Cápsula 2 (Bonito)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 109,
      y: 64,
      width: 65,
      height: 18,
      rotation: 0,
      content: CANVA_PAIS_PILL_BORDER_SVG,
    },
    {
      id: `LBVh0F0shx9FDjbV-${timestamp}`,
      name: 'Texto: BONITO',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 109,
      y: 65,
      width: 65,
      height: 16,
      rotation: 0,
      content: 'BONITO',
      color: '#000000',
      fontSize: 10,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'normal',
      textAlign: 'center',
    },
    {
      id: `LBLZM9JnTgj1ZTsW-${timestamp}`,
      name: 'Texto: Contém o melhor pai do mundo',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 206,
      y: 50,
      width: 148,
      height: 35,
      rotation: 0,
      content: 'Contém o melhor pai do mundo',
      color: '#000000',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `LBpzHbY3yZSVRdXt-${timestamp}`,
      name: 'Texto: Super',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 32,
      y: 95,
      width: 284,
      height: 108,
      rotation: 0,
      content: 'Super',
      color: '#000000',
      fontSize: 88,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `LBsM8k8LYhWJwk18-${timestamp}`,
      name: 'Símbolo: Bigode do Papai (Mustache)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 57,
      y: 140,
      width: 237,
      height: 71,
      rotation: 0,
      content: CANVA_PAIS_MUSTACHE_SVG,
    },
    {
      id: `LBJHYGBFV5zmstRx-${timestamp}`,
      name: 'Texto: pai',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 181,
      y: 177,
      width: 186,
      height: 108,
      rotation: 0,
      content: 'pai',
      color: '#000000',
      fontSize: 94,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `LBm19yzvcw4Lg5Gm-${timestamp}`,
      name: 'Selo Circular: papai do ano •',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 657,
      y: 88,
      width: 76,
      height: 76,
      rotation: 0,
      content: CANVA_PAIS_CIRCULAR_PAPAI_ANO_SVG,
    },
    {
      id: `LBKlnn4LlDX4Gy5z-${timestamp}`,
      name: 'Texto: SEGREDO:',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 412,
      y: 88,
      width: 88,
      height: 18,
      rotation: 0,
      content: 'SEGREDO:',
      color: '#000000',
      fontSize: 14,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `LB7Z9x18CYtdcfFg-${timestamp}`,
      name: 'Texto: Composição Nutricional do Papai',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 412,
      y: 111,
      width: 220,
      height: 60,
      rotation: 0,
      content: '30% teimosia, 20% piadas sem graça, 15% habilidades questionáveis de consertar coisas, 10% broncas educativas, 10% conselhos dados enquanto assiste TV, 10% amor em silêncio, 5% "só descanso os olhos"',
      color: '#000000',
      fontSize: 9.5,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'normal',
    },
    {
      id: `LBgX5KZ2zNmwjFNg-${timestamp}`,
      name: 'Caixa 1: Moldura Haltere',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 412,
      y: 218,
      width: 66,
      height: 66,
      rotation: 0,
      content: CANVA_PAIS_SQUARE_BOX_SVG,
    },
    {
      id: `LBJvxNjCN6V2lKwb-${timestamp}`,
      name: 'Ícone: Haltere / Dumbbell',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 418,
      y: 227,
      width: 55,
      height: 41,
      rotation: 0,
      content: CANVA_PAIS_DUMBBELL_SVG,
    },
    {
      id: `LBhfXbPj77yjtDWs-${timestamp}`,
      name: 'Texto: PESSOA SAUDÁVEL',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 412,
      y: 287,
      width: 66,
      height: 26,
      rotation: 0,
      content: 'PESSOA\nSAUDÁVEL',
      color: '#000000',
      fontSize: 8.5,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `LBqgbhrBMJdPnY6K-${timestamp}`,
      name: 'Caixa 2: Moldura Coração',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 496,
      y: 218,
      width: 66,
      height: 66,
      rotation: 0,
      content: CANVA_PAIS_SQUARE_BOX_SVG,
    },
    {
      id: `LBMnYrJlMKlzKWQZ-${timestamp}`,
      name: 'Ícone: Coração Flat',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 507,
      y: 231,
      width: 47,
      height: 41,
      rotation: 0,
      content: CANVA_PAIS_FLAT_HEART_SVG,
    },
    {
      id: `LBpls3bsC7T1pBKp-${timestamp}`,
      name: 'Texto: FEITO COM AMOR',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 496,
      y: 287,
      width: 66,
      height: 26,
      rotation: 0,
      content: 'FEITO COM\nAMOR',
      color: '#000000',
      fontSize: 8.5,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `LBSHgg2cq4nYsTS1-${timestamp}`,
      name: 'Caixa 3: Moldura Café',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 579,
      y: 218,
      width: 66,
      height: 66,
      rotation: 0,
      content: CANVA_PAIS_SQUARE_BOX_SVG,
    },
    {
      id: `LB0FK4MVZc1nBPjY-${timestamp}`,
      name: 'Ícone: Xícara de Café',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 590,
      y: 227,
      width: 47,
      height: 48,
      rotation: 0,
      content: CANVA_PAIS_COFFEE_CUP_SVG,
    },
    {
      id: `LBG7lpYg662CywMZ-${timestamp}`,
      name: 'Texto: PRECISA DE CAFEÍNA',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 579,
      y: 287,
      width: 66,
      height: 26,
      rotation: 0,
      content: 'PRECISA DE\nCAFEÍNA',
      color: '#000000',
      fontSize: 8.5,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `LBVbSBmD3qQz5P1f-${timestamp}`,
      name: 'Caixa 4: Moldura Sorriso',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 662,
      y: 218,
      width: 66,
      height: 66,
      rotation: 0,
      content: CANVA_PAIS_SQUARE_BOX_SVG,
    },
    {
      id: `LBTLCNbQ9SkdsGFt-${timestamp}`,
      name: 'Ícone: Sorriso Emocionado',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 673,
      y: 232,
      width: 44,
      height: 44,
      rotation: 0,
      content: CANVA_PAIS_SMILING_ICON_SVG,
    },
    {
      id: `LBk893CDC5kmjXXg-${timestamp}`,
      name: 'Texto: EMOCIONADO',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 662,
      y: 287,
      width: 66,
      height: 18,
      rotation: 0,
      content: 'EMOCIONADO',
      color: '#000000',
      fontSize: 8.5,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  ];
}

export function getPaisTiraDuplaRippedTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `rip-bg-${timestamp}`,
      name: 'Fundo: Papel Rústico (#F6F4F1)',
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
      color: '#F6F4F1',
    },
    {
      id: `rip-photo1-${timestamp}`,
      name: 'Foto 1: Cozinhando Juntos',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 470,
      y: 35,
      width: 105,
      height: 130,
      rotation: 0,
      content: 'https://media-public.canva.com/PKxqg/MAGuMoPKxqg/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `rip-photo2-${timestamp}`,
      name: 'Foto 2: Conversa Afetuosa',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 470,
      y: 185,
      width: 105,
      height: 130,
      rotation: 0,
      content: 'https://media-public.canva.com/H3Ff0/MAGuMuH3Ff0/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `rip-photo3-${timestamp}`,
      name: 'Foto 3: Alegria e Diversão',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 600,
      y: 35,
      width: 105,
      height: 130,
      rotation: 0,
      content: 'https://media-public.canva.com/sWJy0/MAGuMqsWJy0/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `rip-photo4-${timestamp}`,
      name: 'Foto 4: Assistindo Juntos',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 600,
      y: 185,
      width: 105,
      height: 130,
      rotation: 0,
      content: 'https://media-public.canva.com/kKDNE/MAGuMqkKDNE/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `rip-txt-feliz-${timestamp}`,
      name: 'Texto: feliz dia dos pais',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 60,
      width: 350,
      height: 40,
      rotation: 0,
      content: 'feliz dia dos pais',
      color: '#171617',
      fontSize: 26,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
    {
      id: `rip-txt-amo-${timestamp}`,
      name: 'Texto: pai eu te amo',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 110,
      width: 380,
      height: 65,
      rotation: 0,
      content: 'pai eu te amo',
      color: '#171617',
      fontSize: 52,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `rip-txt-msg-${timestamp}`,
      name: 'Texto: Mensagem Exemplo de Amor',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 195,
      width: 370,
      height: 50,
      rotation: 0,
      content: 'Obrigado por ser exemplo de amor, companheirismo e fé. Deus me abençoou com você!',
      color: '#000000',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

export function getPaisTimeCafeRetroTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `cafe-bg-${timestamp}`,
      name: 'Fundo: Creme Vintage (#FFF8EB)',
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
      color: '#FFF8EB',
    },
    {
      id: `cafe-txt-time-${timestamp}`,
      name: 'Texto: SOU DO TIME:',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 70,
      width: 300,
      height: 35,
      rotation: 0,
      content: 'SOU DO TIME:',
      color: '#924D03',
      fontSize: 22,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `cafe-txt-cafe-${timestamp}`,
      name: 'Texto: Café',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 110,
      width: 350,
      height: 100,
      rotation: 0,
      content: 'Café',
      color: '#5C3107',
      fontSize: 92,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `cafe-txt-fresquinho-${timestamp}`,
      name: 'Texto: FRESQUINHO PARA ACORDAR',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 220,
      width: 350,
      height: 40,
      rotation: 0,
      content: 'FRESQUINHO PARA ACORDAR',
      color: '#924D03',
      fontSize: 18,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `cafe-txt-combustivel-${timestamp}`,
      name: 'Texto: O combustível do melhor pai',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 60,
      y: 270,
      width: 350,
      height: 35,
      rotation: 0,
      content: 'O combustível do melhor papai do mundo ♡',
      color: '#78350F',
      fontSize: 14,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
  ];
}

// 10. Generates 17-layer editable layout for "Dia dos Pais • Ilustração Afeto & Estrelas Azure Escuro" (Oficial Canva Model)
export function getFathersDayAzureStarsTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    // 1. Background (Clean White #FFFFFF)
    {
      id: `pais-azure-bg-${timestamp}`,
      name: 'Fundo: Branco Puro (#FFFFFF)',
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
    // 2. Father & Child Illustration (LBZGKnm6RVwpvPbQ)
    {
      id: `LBZGKnm6RVwpvPbQ-${timestamp}`,
      name: 'Ilustração: Pai e Filho(a) • Dia dos Pais',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 133,
      y: 36,
      width: 215,
      height: 291,
      rotation: 0,
      content: CANVA_FATHERS_DAY_ILLUSTRATION_SVG,
    },
    // 3. Decorative Text Portuguese (LB6RjrLNqPN04stS)
    {
      id: `LB6RjrLNqPN04stS-${timestamp}`,
      name: 'Lettering: Feliz Dia dos Pais Decorativo',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 391,
      y: 37,
      width: 274,
      height: 285,
      rotation: 0,
      content: 'https://media-public.canva.com/HCHws/MAGIq5HCHws/1/t.png',
    },
    // 4. Stars (15 azure escuro #002F46 5-pointed stars with refined delicate sizes)
    {
      id: `LBybMHKm83VxKNqH-${timestamp}`,
      name: 'Estrela Azure Escuro (Topo Esquerda)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 43,
      y: 38,
      width: 26,
      height: 24,
      rotation: -11,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBMDSzYdlqpl99W9-${timestamp}`,
      name: 'Estrela Azure Escuro (Base Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 684,
      y: 293,
      width: 26,
      height: 24,
      rotation: -11,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBVhqv3HslRKCy3L-${timestamp}`,
      name: 'Estrela Azure Escuro (Base Esquerda)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 101,
      y: 284,
      width: 26,
      height: 24,
      rotation: 24,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBCf48xHVRkfC0k1-${timestamp}`,
      name: 'Estrela Azure Escuro (Topo Centro-Esq)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 320,
      y: 35,
      width: 18,
      height: 17,
      rotation: 24,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBNPMwmfxxCRNpjV-${timestamp}`,
      name: 'Estrela Azure Escuro (Centro Esquerda)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 48,
      y: 173,
      width: 18,
      height: 17,
      rotation: 24,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBd2dypvxhxChQXT-${timestamp}`,
      name: 'Estrela Azure Escuro (Topo Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 696,
      y: 37,
      width: 14,
      height: 13,
      rotation: 24,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LB5LtBtjFqyHPPxV-${timestamp}`,
      name: 'Estrela Azure Escuro (Base Centro)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 367,
      y: 308,
      width: 14,
      height: 13,
      rotation: 12,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LB3NSq2PslkWK4Vz-${timestamp}`,
      name: 'Estrela Azure Escuro (Centro-Base)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 346,
      y: 209,
      width: 14,
      height: 13,
      rotation: -25,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBywB7L06SCFXKf2-${timestamp}`,
      name: 'Mini Estrela Azure (Esquerda Baixa)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 42,
      y: 247,
      width: 9,
      height: 9,
      rotation: -25,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBbyfCtDBMwHLH0R-${timestamp}`,
      name: 'Mini Estrela Azure (Esquerda Alta)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 100,
      y: 96,
      width: 9,
      height: 9,
      rotation: -25,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBvlTpVtq3DDtM10-${timestamp}`,
      name: 'Mini Estrela Azure (Canto Inferior Esq)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 33,
      y: 325,
      width: 9,
      height: 9,
      rotation: -25,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBT4TLv6MY1NtKpN-${timestamp}`,
      name: 'Mini Estrela Azure (Topo Esq-Centro)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 251,
      y: 63,
      width: 9,
      height: 9,
      rotation: -25,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBKTHtfd8zzPL8YM-${timestamp}`,
      name: 'Mini Estrela Azure (Topo Centro-Dir)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 488,
      y: 15,
      width: 9,
      height: 9,
      rotation: -25,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBw8hRf959Hm802V-${timestamp}`,
      name: 'Mini Estrela Azure (Lateral Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 700,
      y: 153,
      width: 9,
      height: 9,
      rotation: -25,
      content: CANVA_AZURE_STAR_SVG,
    },
    {
      id: `LBn2Kmxw0K8GFcCq-${timestamp}`,
      name: 'Mini Estrela Azure (Base Direita-Centro)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 590,
      y: 332,
      width: 9,
      height: 9,
      rotation: -25,
      content: CANVA_AZURE_STAR_SVG,
    },
  ];
}


// 11. Generates 15-layer editable layout for "Te Amo Pai • Você é Força, Sabedoria e Amor (Canva Model)"
export function getPaisTeAmoForcaSabedoriaTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    // Background (Clean White #FFFFFF)
    {
      id: `teamo-bg-${timestamp}`,
      name: 'Fundo: Branco Puro (#FFFFFF)',
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
    // Top-Left Abstract Blob
    {
      id: `LBZs2Xdg8LFL4zq5-${timestamp}`,
      name: 'Forma Abstrata Orgânica (Topo Esquerdo)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: -91,
      y: -104,
      width: 231,
      height: 209,
      rotation: 41,
      content: CANVA_PAIS_TE_AMO_BLOB_SVG,
    },
    // Top-Right Halftone Dots
    {
      id: `LBYlgbk3zPTXVR7F-${timestamp}`,
      name: 'Textura Halftone (Topo Direito)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 475,
      y: -112,
      width: 195,
      height: 155,
      rotation: 0,
      content: CANVA_PAIS_TE_AMO_HALFTONE_SVG,
    },
    // Bottom-Left Halftone Dots
    {
      id: `LBD62q31JywFN3YP-${timestamp}`,
      name: 'Textura Halftone (Base Esquerda)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 91,
      y: 311,
      width: 195,
      height: 155,
      rotation: 0,
      content: CANVA_PAIS_TE_AMO_HALFTONE_SVG,
    },
    // Bottom-Right Abstract Blob
    {
      id: `LBMKdZNytZhjbw9C-${timestamp}`,
      name: 'Forma Abstrata Orgânica (Base Direita)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 596,
      y: 225,
      width: 244,
      height: 160,
      rotation: -45,
      content: CANVA_PAIS_TE_AMO_BLOB_SVG,
    },
    // Message Text Top Left
    {
      id: `LBHdLbdHdxQvFbW6-${timestamp}`,
      name: 'Mensagem: Pai, você é força...',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 53,
      y: 60,
      width: 155,
      height: 62,
      rotation: 0,
      content: 'Pai, você é força que acolhe, sabedoria que guia e amor que não mede.',
      color: '#274E8B',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    // Decorative Frame Outline 1 (Photo 1)
    {
      id: `LBZWxRb9ZxtcM0CF-${timestamp}`,
      name: 'Moldura Decorativa Traço Foto 1',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 42,
      y: 126,
      width: 178,
      height: 176,
      rotation: 0,
      content: CANVA_PAIS_TE_AMO_FRAME_LINE_SVG,
    },
    // Photo 1
    {
      id: `LBy03RQplkPwQ4nB-${timestamp}`,
      name: 'Foto 1: Momentos com o Pai',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 53,
      y: 137,
      width: 155,
      height: 155,
      rotation: 0,
      content: 'https://media-public.canva.com/UQr44/MAEJJdUQr44/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 2,
    },
    // Decorative Frame Outline 2 (Photo 2)
    {
      id: `LByhZ9gPCB1Gbwj3-${timestamp}`,
      name: 'Moldura Decorativa Traço Foto 2',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 232,
      y: 75,
      width: 178,
      height: 176,
      rotation: 0,
      content: CANVA_PAIS_TE_AMO_FRAME_LINE_SVG,
    },
    // Photo 2
    {
      id: `LBlMFb1MsXJ8nHsg-${timestamp}`,
      name: 'Foto 2: Amor de Pai e Filho',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 243,
      y: 85,
      width: 155,
      height: 155,
      rotation: 0,
      content: 'https://media-public.canva.com/lfc_I/MAEE6Glfc_I/1/t.jpg',
      strokeColor: '#FFFFFF',
      strokeWidth: 2,
    },
    // Text: Feliz Dia dos Pais
    {
      id: `LBXcf3zzwFlJV0fw-${timestamp}`,
      name: 'Texto: Feliz Dia dos Pais',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 243,
      y: 260,
      width: 155,
      height: 18,
      rotation: 0,
      content: 'Feliz Dia dos Pais',
      color: '#274E8B',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    // Text: TE AMO (Cyan Bold Stacked)
    {
      id: `LBspQNKnrcDPkfYN-${timestamp}`,
      name: 'Texto: TE AMO',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 410,
      y: 36,
      width: 325,
      height: 204,
      rotation: 0,
      content: 'TE\nAMO',
      color: '#61C1E2',
      fontSize: 76,
      fontFamily: 'Montserrat, Arial Black, sans-serif',
      fontWeight: '900',
    },
    // Lettering: Pai
    {
      id: `LBrcwC50WRgDJ4RW-${timestamp}`,
      name: 'Lettering Decorativo: Pai',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 385,
      y: 191,
      width: 333,
      height: 129,
      rotation: -6.5,
      content: CANVA_PAIS_TE_AMO_PAI_LETTERING_SVG,
    },
    // Sparkle 1
    {
      id: `LB7ccxNCkWvRmpfk-${timestamp}`,
      name: 'Elemento Flat / Estrela 1',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 658,
      y: 229,
      width: 21,
      height: 17,
      rotation: 12.5,
      content: CANVA_PAIS_TE_AMO_SPARKLE_SVG,
    },
    // Sparkle 2
    {
      id: `LBjJWMnwHySJ92lC-${timestamp}`,
      name: 'Elemento Flat / Estrela 2',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 482,
      y: 269,
      width: 20,
      height: 16,
      rotation: -44.8,
      content: CANVA_PAIS_TE_AMO_SPARKLE_SVG,
    },
  ];
}

export function getPaisMedalhaSuperPaiAzulTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    // 1. Background: Royal Blue Rectangle (#2A599E)
    {
      id: `pais-medalha-bg-${timestamp}`,
      name: 'Fundo: Azul Royal (#2A599E)',
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
      color: '#2A599E',
    },
    // 2. Background Texture: Frosted Matte Glass
    {
      id: `pais-medalha-glass-texture-${timestamp}`,
      name: 'Textura: Frosted Glass Overlay',
      type: 'image',
      visible: true,
      locked: true,
      opacity: 12,
      blendMode: 'normal',
      x: -12,
      y: -113,
      width: 780,
      height: 585,
      rotation: 0,
      content: 'https://media-public.canva.com/UNP0w/MAFtd3UNP0w/1/tl.jpg',
    },
    // 3. Left: Honor Medal & Ribbon Illustration
    {
      id: `LBw74mbN5hnS5fK3-${timestamp}`,
      name: 'Ilustração: Medalha de Honra e Fitas do Dia dos Pais',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 42,
      y: 71,
      width: 315,
      height: 252,
      rotation: 0,
      content: CANVA_MEDALHA_SUPER_PAI_ILUSTRACAO_SVG,
    },
    // 4. Left: Circular Decoration Seal Badge
    {
      id: `LBS5q7zhFVwPrMl9-${timestamp}`,
      name: 'Selo: Condecoração Circular Simples',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 109,
      y: 87,
      width: 181,
      height: 181,
      rotation: 0,
      content: CANVA_SELO_CIRCULAR_SUPER_PAI_SVG,
    },
    // 5. Left: Curved Arch Text "CANECA DO MELHOR PAI DO MUNDO"
    {
      id: `LBwRWWGrc8JTvY4b-${timestamp}`,
      name: 'Texto em Arco: CANECA DO MELHOR PAI DO MUNDO',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 63,
      y: 36,
      width: 273,
      height: 125,
      rotation: 0,
      content: CANVA_TEXTO_ARCO_MELHOR_PAI_SVG,
    },
    // 6. Left: Center Text "SUPER PAI"
    {
      id: `LBMhdC7kvSlLhSYH-${timestamp}`,
      name: 'Texto: SUPER PAI',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 130,
      y: 155,
      width: 138,
      height: 40,
      rotation: 0,
      content: 'SUPER PAI',
      color: '#0F2547',
      fontSize: 22,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    // 7. Right: Lettering Illustration "Feliz Dia dos Pais"
    {
      id: `LBTg0NvzzqLKYp76-${timestamp}`,
      name: 'Lettering: Feliz Dia dos Pais Caligrafia',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 397,
      y: 53,
      width: 310,
      height: 262,
      rotation: 0,
      content: CANVA_FELIZ_DIA_DOS_PAIS_LETTERING_AZUL_SVG,
    },
    // 8. Right: Doodle Crown
    {
      id: `LBMQmXM3d4JzYbcp-${timestamp}`,
      name: 'Ícone: Coroa Doodle Dourada Inclinada',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 542,
      y: 17,
      width: 121,
      height: 72,
      rotation: 19.22,
      content: CANVA_COROA_DOODLE_DOURADA_SVG,
    },
  ];
}


// =======================================================
// 3. FATHER'S DAY CANVA TEMPLATES ARRAY
// =======================================================

export const FATHERS_DAY_CANVA_TEMPLATES: CanvaTemplateItem[] = [
  {
    id: 'canva-pais-medalha-super-pai-azul',
    title: 'Caneca do Melhor Pai do Mundo • Medalha Super Pai & Coroa Dourada (Canva Model)',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_MEDALHA_SUPER_PAI_AZUL_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'super pai', 'melhor pai', 'medalha', 'coroa', 'caneca do melhor pai do mundo', 'azul', 'ouro', 'dourado', 'caneca', 'sublimacao', 'canva', '8 camadas'],
    description: 'Estampa oficial Canva de Dia dos Pais com 8 camadas editáveis: medalha de condecoração em ouro e fitas azuis, selo circular, texto em arco "CANECA DO MELHOR PAI DO MUNDO", texto central "SUPER PAI", coroa doodle e caligrafia "Feliz Dia dos Pais".',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-pais-te-amo-forca-sabedoria',
    title: 'Te Amo Pai • Você é Força, Sabedoria e Amor (Canva Model)',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_TE_AMO_FORCA_SABEDORIA_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'te amo', '2 fotos', 'forca sabedoria amor', 'azul', 'ciano', 'caneca', 'sublimacao', 'canva', '15 camadas'],
    description: 'Estampa oficial Canva de Dia dos Pais com 15 camadas editáveis: 2 fotos com molduras de traço decorativo, mensagem inspiradora, lettering "TE AMO" gigante e caligrafia "Pai" em azul marinho.',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-pais-ilustracao-estrelas-azure',
    title: 'Dia dos Pais • Ilustração Afeto & Estrelas Azure Escuro (Canva Model)',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_ILUSTRACAO_ESTRELAS_AZURE_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'estrelas', 'azure escuro', 'happy fathers day', 'portuguese', 'ilustracao', 'afeto', 'caneca', 'sublimacao', 'canva', 'decorativo', 'azul'],
    description: 'Estampa oficial Canva de Dia dos Pais com 17 camadas editáveis: ilustração de pai e filho(a), lettering decorativo em português e constelação de 15 estrelas Azure Escuro.',
    author: 'Canva Design Hub',
  },
  {
    id: 'canva-pais-coracao-recortado',
    title: 'Dia dos Pais • Coração Recortado & Foto com Amor',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_CORACAO_RECORTADO_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'papai', 'coracao', 'coracao recortado', 'foto', 'vermelho', 'azul', 'estela', 'amor', 'caneca', 'sublimacao', 'canva'],
    description: 'Estampa oficial Canva de Dia dos Pais com moldura em formato de coração recortado para foto da família, lettering Papai e selo de melhor pai.',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-pais-meu-heroi-bluey',
    title: 'Meu Herói de Todos os Dias • Bluey Style & Tripla Foto Circular',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_MEU_HEROI_BLUEY_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'meu heroi', 'heroi', 'bluey', 'infantil', 'coroa', '3 fotos', 'fotos circulares', 'aquarela', 'caneca', 'sublimacao'],
    description: 'Composição alegre e moderna inspirada no estilo Bluey com 3 slots circulares para fotos, coroa divertida e lettering "Meu herói de todos os dias".',
    author: 'Canva Pro Designer',
  },
  {
    id: 'canva-pais-tira-fotos-vintage',
    title: 'Dia dos Pais • Tira de Fotos Vintage Ripped Paper (6 Fotos)',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_TIRA_FOTOS_VINTAGE_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'tira de fotos', '6 fotos', 'vintage', 'ripped paper', 'grunge', 'aquarela', 'caneca', 'sublimacao'],
    description: 'Design retrô sofisticado com 2 tiras verticais de filme contendo 6 fotos da família, respingos de tinta e tipografia elegante.',
    author: 'Canva Pro Studio',
  },
  {
    id: 'canva-pais-eu-te-amo-bold',
    title: 'Pais Eu Te Amo • Big Bold Lettering & Corações 3D',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_EU_TE_AMO_BOLD_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'eu te amo', 'vermelho', 'vinho', 'coracao 3d', '2 fotos', 'polaroid', 'helena', 'caneca', 'sublimacao'],
    description: 'Estampa de impacto com lettering gigante "PAIS eu te amo!", dois slots para fotos com moldura branca e corações 3D.',
    author: 'Canva Pro Studio',
  },
  {
    id: 'canva-pais-monoline-minimalista',
    title: 'Dia dos Pais • Arte Monoline Minimalista Pai e Filhos',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_MONOLINE_MINIMALISTA_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'monoline', 'minimalista', 'linha continua', 'elegante', 'azul marinho', 'linho', 'caneca', 'sublimacao'],
    description: 'Arte clean e sofisticada em linha contínua ilustrando 3 momentos de conexão entre pai e filhos com caligrafia refinada.',
    author: 'Canva Design Collection',
  },
  {
    id: 'canva-pais-super-heroi',
    title: 'Super Pai • Você é Conselho, Proteção e Amor!',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_SUPER_HEROI_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'super heroi', 'super pai', 'heroi', 'capa', 'protecao', 'amor', 'caneca', 'sublimacao'],
    description: 'Design vibrante com tipografia Impact "PAI", mensagem de admiração e ilustração do papai super-herói de capa.',
    author: 'Canva Pro Designer',
  },
  {
    id: 'canva-pais-tabela-nutricional',
    title: 'Tabela Nutricional do Papai • 100% Incrível & Super Pai (Canva Model)',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_TABELA_NUTRICIONAL_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'tabela nutricional', 'super pai', 'bigode', 'engracado', 'humor', 'cafe', 'caneca', 'sublimacao', 'canva', '28 camadas', 'papai do ano'],
    description: 'Estampa oficial Canva de Dia dos Pais com 28 camadas editáveis: lettering "Super pai", bigode clássico, selo circular "papai do ano", receita secreta com porcentagens e 4 caixas de atributos com ícones.',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-pais-tira-dupla-ripped',
    title: 'Pai Eu Te Amo • Tira de Fotos Dupla Ripped Paper (4 Fotos)',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_TIRA_DUPLA_RIPPED_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'pai eu te amo', '4 fotos', 'tira de fotos', 'ripped paper', 'papel rasgado', 'balao 3d', 'caneca', 'sublimacao'],
    description: 'Composição nobre em textura de papel rasgado com 2 tiras verticais para 4 fotos da família, lettering elegante e balão 3D.',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-pais-time-cafe-retro',
    title: 'Sou do Time Café • Mascote Retrô 70s para o Papai',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_TIME_CAFE_RETRO_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'cafe', 'sou do time cafe', 'mascote', 'retro', 'anos 70', 'vintage', 'graos de cafe', 'caneca', 'sublimacao'],
    description: 'Estampa vintage nostálgica dos anos 70 para papais apaixonados por café, com mascote fofinho de caneca e grãos de café.',
    author: 'Canva Retro Apparel',
  },
];
