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

// 7. Tabela Nutricional do Papai • 100% Incrível & Super Pai
export const CANVA_PAIS_TABELA_NUTRICIONAL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <rect width="756" height="359" fill="#FFFFFF" />

  <!-- Left: Dashed Square Border with Super Pai -->
  <g transform="translate(60, 40)">
    <rect width="280" height="280" rx="8" fill="#F8FAFC" stroke="#000000" stroke-width="2.5" stroke-dasharray="6,4" />

    <!-- Top Badge: 100% AUTÊNTICO • INCRÍVEL -->
    <text x="20" y="35" font-family="'Impact', sans-serif" font-size="20" fill="#000000">100%</text>
    <rect x="75" y="18" width="85" height="20" rx="4" fill="#000000" />
    <text x="117" y="32" font-family="'Montserrat', sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AUTÊNTICO</text>

    <!-- Subtitle Banner -->
    <text x="140" y="70" font-family="'Montserrat', sans-serif" font-size="11" font-weight="bold" fill="#000000" text-anchor="middle">CONTÉM O MELHOR PAI DO MUNDO</text>
    <line x1="20" y1="80" x2="260" y2="80" stroke="#000000" stroke-width="2" />

    <!-- Huge Bold "Super pai" -->
    <text x="140" y="145" font-family="'Impact', 'Arial Black', sans-serif" font-size="52" font-weight="900" fill="#050C9B" text-anchor="middle">Super</text>
    <text x="140" y="195" font-family="'Impact', 'Arial Black', sans-serif" font-size="52" font-weight="900" fill="#050C9B" text-anchor="middle">PAI</text>

    <!-- Mustache Doodle at Bottom -->
    <g transform="translate(140, 240) scale(0.65)">
      <path d="M 0 0 C -20 -30 -70 -20 -90 10 C -110 -20 -150 -10 -150 20 C -140 50 -80 50 0 10 C 80 50 140 50 150 20 C 150 -10 110 -20 90 10 C 70 -20 20 -30 0 0 Z" fill="#000000" />
    </g>
    <text x="140" y="270" font-family="'Montserrat', sans-serif" font-size="10" font-weight="bold" fill="#000000" text-anchor="middle">DESDE SEMPRE • PAPAI DO ANO</text>
  </g>

  <!-- Divider Line -->
  <line x1="380" y1="40" x2="380" y2="320" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="4,4" />

  <!-- Right: Nutritional Facts / Ingredientes Secretos -->
  <g transform="translate(410, 45)">
    <text x="0" y="25" font-family="'Impact', sans-serif" font-size="20" fill="#000000" letter-spacing="1">SEGREDO / INGREDIENTES:</text>
    <line x1="0" y1="35" x2="310" y2="35" stroke="#000000" stroke-width="3" />

    <!-- List of funny father percentages -->
    <text x="0" y="60" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600" fill="#1E293B">30% Teimosia e piadas sem graça</text>
    <text x="0" y="80" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600" fill="#1E293B">20% Habilidades questionáveis de consertar tudo</text>
    <text x="0" y="100" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600" fill="#1E293B">15% Conselhos dados assistindo TV no sofá</text>
    <text x="0" y="120" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600" fill="#1E293B">15% Broncas que viram ensinamento</text>
    <text x="0" y="140" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600" fill="#1E293B">10% Amor incondicional em silêncio</text>
    <text x="0" y="160" font-family="'Montserrat', sans-serif" font-size="11" font-weight="600" fill="#1E293B">10% "Só estou descansando os olhos"</text>
    <line x1="0" y1="175" x2="310" y2="175" stroke="#000000" stroke-width="2" />

    <!-- 4 Nutritional Badge Blocks -->
    <g transform="translate(0, 190)">
      <!-- Block 1: Dumbbell -->
      <rect x="0" y="0" width="70" height="70" rx="6" fill="#F1F5F9" stroke="#000000" stroke-width="1.5" />
      <circle cx="35" cy="25" r="10" fill="#000000" />
      <text x="35" y="52" font-family="'Montserrat', sans-serif" font-size="7.5" font-weight="bold" fill="#000000" text-anchor="middle">PESSOA</text>
      <text x="35" y="62" font-family="'Montserrat', sans-serif" font-size="7.5" font-weight="bold" fill="#000000" text-anchor="middle">SAUDÁVEL</text>

      <!-- Block 2: Heart -->
      <rect x="80" y="0" width="70" height="70" rx="6" fill="#F1F5F9" stroke="#000000" stroke-width="1.5" />
      <path d="M 35 22 C 30 14 20 18 20 26 C 20 34 35 44 35 44 C 35 44 50 34 50 26 C 50 18 40 14 35 22 Z" transform="translate(80, -2) scale(0.9)" fill="#DC2626" />
      <text x="115" y="52" font-family="'Montserrat', sans-serif" font-size="7.5" font-weight="bold" fill="#000000" text-anchor="middle">FEITO COM</text>
      <text x="115" y="62" font-family="'Montserrat', sans-serif" font-size="7.5" font-weight="bold" fill="#000000" text-anchor="middle">AMOR</text>

      <!-- Block 3: Coffee -->
      <rect x="160" y="0" width="70" height="70" rx="6" fill="#F1F5F9" stroke="#000000" stroke-width="1.5" />
      <rect x="185" y="20" width="18" height="15" rx="3" fill="#78350F" />
      <path d="M 203 23 Q 210 27 203 31" stroke="#78350F" stroke-width="2" fill="none" />
      <text x="195" y="52" font-family="'Montserrat', sans-serif" font-size="7" font-weight="bold" fill="#000000" text-anchor="middle">PRECISA DE</text>
      <text x="195" y="62" font-family="'Montserrat', sans-serif" font-size="7" font-weight="bold" fill="#000000" text-anchor="middle">CAFEÍNA</text>

      <!-- Block 4: Smile -->
      <rect x="240" y="0" width="70" height="70" rx="6" fill="#F1F5F9" stroke="#000000" stroke-width="1.5" />
      <circle cx="275" cy="25" r="10" fill="none" stroke="#000000" stroke-width="2" />
      <path d="M 270 28 Q 275 33 280 28" stroke="#000000" stroke-width="2" fill="none" />
      <text x="275" y="57" font-family="'Montserrat', sans-serif" font-size="7.5" font-weight="bold" fill="#000000" text-anchor="middle">EMOCIONADO</text>
    </g>
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
      id: `nutri-box-${timestamp}`,
      name: 'Caixa: Borda da Tabela',
      type: 'shape',
      shapeType: 'rectangle',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 35,
      width: 280,
      height: 285,
      rotation: 0,
      content: '',
      color: '#F8FAFC',
      strokeColor: '#000000',
      strokeWidth: 2,
    },
    {
      id: `nutri-txt-super-${timestamp}`,
      name: 'Texto: Super PAI',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 110,
      width: 260,
      height: 60,
      rotation: 0,
      content: 'Super PAI',
      color: '#050C9B',
      fontSize: 48,
      fontFamily: 'Impact, sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    {
      id: `nutri-txt-segredo-${timestamp}`,
      name: 'Texto: SEGREDO / INGREDIENTES',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 400,
      y: 40,
      width: 320,
      height: 35,
      rotation: 0,
      content: 'SEGREDO / INGREDIENTES:',
      color: '#000000',
      fontSize: 18,
      fontFamily: 'Impact, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `nutri-txt-items-${timestamp}`,
      name: 'Texto: Porcentagens Nutricionais',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 400,
      y: 85,
      width: 320,
      height: 110,
      rotation: 0,
      content: '30% Teimosia e piadas sem graça\n20% Habilidades de consertar tudo\n15% Conselhos assistindo TV\n10% Amor incondicional\n10% "Só descanso os olhos"',
      color: '#1E293B',
      fontSize: 12,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
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


// =======================================================
// 3. FATHER'S DAY CANVA TEMPLATES ARRAY
// =======================================================

export const FATHERS_DAY_CANVA_TEMPLATES: CanvaTemplateItem[] = [
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
    title: 'Tabela Nutricional do Papai • 100% Incrível & Super Pai',
    category: 'fathers',
    categoryLabel: 'Dia dos Pais',
    previewUrl: CANVA_PAIS_TABELA_NUTRICIONAL_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['pais', 'dia dos pais', 'pai', 'tabela nutricional', 'super pai', 'bigode', 'engracado', 'humor', 'cafe', 'caneca', 'sublimacao'],
    description: 'Modelo campeão de vendas com a tabela nutricional bem-humorada do papai, caixa pontilhada, bigode e ícones de café e coração.',
    author: 'Canva Creative Hub',
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
