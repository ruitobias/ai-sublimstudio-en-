import { Layer } from '../types';
import { CanvaTemplateItem } from './canvaTemplates';

// ==========================================
// 1. CHRISTMAS VECTOR ASSETS & SVG TEMPLATES
// ==========================================

export const CHRISTMAS_BAUBLE_RED_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300">
  <defs>
    <radialGradient id="redSphere" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ff4d4d" />
      <stop offset="40%" stop-color="#c9182b" />
      <stop offset="85%" stop-color="#800a16" />
      <stop offset="100%" stop-color="#4a0008" />
    </radialGradient>
    <linearGradient id="capGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4af37" />
      <stop offset="50%" stop-color="#fff2a3" />
      <stop offset="100%" stop-color="#997517" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.35" />
    </filter>
  </defs>
  <line x1="100" y1="0" x2="100" y2="40" stroke="#d4af37" stroke-width="2" />
  <circle cx="100" cy="40" r="8" fill="none" stroke="url(#capGold)" stroke-width="3" />
  <rect x="85" y="46" width="30" height="14" rx="2" fill="url(#capGold)" />
  <g filter="url(#shadow)">
    <circle cx="100" cy="150" r="85" fill="url(#redSphere)" />
    <path d="M 40 130 Q 100 110 160 130" stroke="#ffccd2" stroke-width="2" stroke-dasharray="4,6" fill="none" opacity="0.6" />
    <path d="M 35 155 Q 100 135 165 155" stroke="#ffd700" stroke-width="3" fill="none" opacity="0.8" />
    <path d="M 40 180 Q 100 160 160 180" stroke="#ffccd2" stroke-width="2" stroke-dasharray="4,6" fill="none" opacity="0.6" />
    <ellipse cx="70" cy="115" rx="22" ry="14" transform="rotate(-30 70 115)" fill="#ffffff" opacity="0.6" />
    <ellipse cx="60" cy="130" rx="6" ry="4" fill="#ffffff" opacity="0.8" />
  </g>
</svg>
`)}`;

export const CHRISTMAS_BALL_GOLD_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 320" width="250" height="320">
  <defs>
    <radialGradient id="goldSphere" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fff8d1" />
      <stop offset="35%" stop-color="#f7d057" />
      <stop offset="75%" stop-color="#c9971a" />
      <stop offset="100%" stop-color="#7a5503" />
    </radialGradient>
    <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b8860b" />
      <stop offset="50%" stop-color="#ffeb7a" />
      <stop offset="100%" stop-color="#7a5503" />
    </linearGradient>
    <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.3" />
    </filter>
  </defs>
  <line x1="125" y1="0" x2="125" y2="45" stroke="#c9971a" stroke-width="2" />
  <circle cx="125" cy="45" r="9" fill="none" stroke="url(#goldCap)" stroke-width="3" />
  <rect x="110" y="52" width="30" height="15" rx="2" fill="url(#goldCap)" />
  <g filter="url(#goldShadow)">
    <circle cx="125" cy="165" r="90" fill="url(#goldSphere)" />
    <circle cx="125" cy="165" r="70" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,6" opacity="0.5" />
    <path d="M 75 165 Q 125 140 175 165" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.6" />
    <ellipse cx="90" cy="130" rx="25" ry="16" transform="rotate(-30 90 130)" fill="#ffffff" opacity="0.65" />
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

// 1. Geometric Modern Christmas Mug
export const CANVA_NATAL_GEOMETRIC_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="geomBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f4f7f6" />
    </linearGradient>
    <filter id="geoShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#geomBg)" />
  
  <!-- Left Side: Modern Typography -->
  <g transform="translate(50, 60)">
    <text x="0" y="50" font-family="'Playfair Display', Georgia, serif" font-size="52" font-weight="900" fill="#046D3B">Merry</text>
    <text x="0" y="110" font-family="'Playfair Display', Georgia, serif" font-size="52" font-weight="900" fill="#C9182B">Christmas</text>
    <rect x="0" y="130" width="220" height="3" fill="#D4AF37" />
    <text x="0" y="165" font-family="'Montserrat', sans-serif" font-size="14" font-weight="600" fill="#2D3748">Que seu natal seja repleto de</text>
    <text x="0" y="188" font-family="'Montserrat', sans-serif" font-size="14" font-weight="700" fill="#046D3B">AMOR, PAZ &amp; UNIÃO</text>
  </g>

  <!-- Center: Stylized Geometric Pine Trees -->
  <g transform="translate(330, 70)">
    <!-- Tree 1 -->
    <polygon points="60,20 15,120 105,120" fill="#0F4C3A" opacity="0.9" />
    <polygon points="60,60 25,160 95,160" fill="#186E53" opacity="0.9" />
    <polygon points="60,100 35,200 85,200" fill="#248A6A" opacity="0.9" />
    <circle cx="60" cy="15" r="6" fill="#FFD700" />
    <!-- Tree 2 (Smaller Light Green) -->
    <polygon points="120,70 85,170 155,170" fill="#75A003" opacity="0.85" />
    <polygon points="120,110 95,210 145,210" fill="#8BB814" opacity="0.85" />
    <circle cx="120" cy="65" r="5" fill="#FFD700" />
  </g>

  <!-- Right Side: Polaroid Photo Frame with Pine Branch -->
  <g transform="translate(510, 50) rotate(5)" filter="url(#geoShadow)">
    <rect width="190" height="230" rx="6" fill="#ffffff" stroke="#E2E8F0" stroke-width="2" />
    <rect x="15" y="15" width="160" height="155" rx="3" fill="#CBD5E1" />
    <circle cx="95" cy="80" r="28" fill="#94A3B8" />
    <path d="M 55 155 C 55 120 80 110 95 110 C 110 110 135 120 135 155 Z" fill="#94A3B8" />
    <text x="95" y="200" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="14" fill="#334155" text-anchor="middle">Família &amp; Amor</text>
  </g>
</svg>
`)}`;

// 2. Christmas is Love • Dual Polaroid & Santa Hats
export const CANVA_NATAL_CHRISTMAS_IS_LOVE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="loveBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffdfa" />
      <stop offset="100%" stop-color="#fdf4eb" />
    </linearGradient>
    <filter id="polaroidGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#loveBg)" />

  <!-- Sparkles / Snowflakes -->
  <circle cx="100" cy="40" r="3" fill="#D4AF37" opacity="0.6" />
  <circle cx="280" cy="70" r="2" fill="#D4AF37" opacity="0.7" />
  <circle cx="700" cy="80" r="3" fill="#D4AF37" opacity="0.6" />
  <circle cx="50" cy="300" r="2" fill="#D4AF37" opacity="0.5" />

  <!-- Left Side: Lettering Christmas is Love -->
  <g transform="translate(60, 80)">
    <text x="0" y="40" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="32" fill="#C9182B">Christmas</text>
    <text x="0" y="90" font-family="'Playfair Display', Georgia, serif" font-size="48" font-weight="900" fill="#046D3B">IS LOVE</text>
    <text x="0" y="135" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600" fill="#8C6D46">Momentos inesquecíveis em família</text>
    <path d="M 0 160 Q 50 150 100 160 T 200 160" stroke="#C9182B" stroke-width="2" fill="none" stroke-linecap="round" />
  </g>

  <!-- Center Polaroid 1 (Tilted Left) -->
  <g transform="translate(360, 60) rotate(-8)" filter="url(#polaroidGlow)">
    <rect width="165" height="195" rx="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="12" y="12" width="141" height="135" rx="3" fill="#94a3b8" />
    <text x="82" y="172" font-family="'Playfair Display', Georgia, serif" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">Amor de Natal</text>
    <!-- Santa Hat on Corner -->
    <path d="M 10 10 Q 30 -15 60 5 Q 40 20 10 10 Z" fill="#C9182B" />
    <circle cx="60" cy="5" r="7" fill="#ffffff" />
    <rect x="8" y="10" width="35" height="8" rx="4" fill="#ffffff" />
  </g>

  <!-- Right Polaroid 2 (Tilted Right) -->
  <g transform="translate(520, 80) rotate(8)" filter="url(#polaroidGlow)">
    <rect width="165" height="195" rx="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="12" y="12" width="141" height="135" rx="3" fill="#64748b" />
    <text x="82" y="172" font-family="'Playfair Display', Georgia, serif" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">Paz &amp; Alegria</text>
    <!-- Santa Hat on Corner -->
    <path d="M 120 10 Q 140 -15 170 5 Q 150 20 120 10 Z" fill="#C9182B" />
    <circle cx="170" cy="5" r="7" fill="#ffffff" />
    <rect x="118" y="10" width="35" height="8" rx="4" fill="#ffffff" />
  </g>
</svg>
`)}`;

// 3. Ave Maria Sacro • Azul Royal & Rosas Ouro
export const CANVA_NATAL_AVE_MARIA_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <radialGradient id="navyBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#14213d" />
      <stop offset="60%" stop-color="#0b132b" />
      <stop offset="100%" stop-color="#050a17" />
    </radialGradient>
    <filter id="sacredGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#ffd700" flood-opacity="0.6" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#navyBg)" />

  <!-- Gold Ornate Border -->
  <rect x="15" y="15" width="726" height="329" rx="6" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="8,4" opacity="0.7" />
  <rect x="22" y="22" width="712" height="315" rx="4" fill="none" stroke="#D4AF37" stroke-width="0.75" opacity="0.5" />

  <!-- Left: Holy Words -->
  <g transform="translate(60, 90)">
    <text x="0" y="45" font-family="'Playfair Display', Georgia, serif" font-size="54" font-weight="900" fill="#FFD700" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Ave Maria</text>
    <text x="0" y="85" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="20" fill="#E2E8F0">Cheia de Graça</text>
    <text x="0" y="125" font-family="'Montserrat', sans-serif" font-size="12" fill="#D4AF37" opacity="0.9">O Senhor é convosco, bendita sois vós</text>
    <text x="0" y="145" font-family="'Montserrat', sans-serif" font-size="12" fill="#D4AF37" opacity="0.9">entre as mulheres.</text>
  </g>

  <!-- Center-Right: Sacred Silhouette & Halo -->
  <g transform="translate(480, 50)">
    <!-- Radiant Halo -->
    <circle cx="110" cy="110" r="85" fill="none" stroke="#FFD700" stroke-width="2" opacity="0.8" filter="url(#sacredGlow)" />
    <circle cx="110" cy="110" r="95" fill="none" stroke="#FFD700" stroke-width="1" stroke-dasharray="4,6" opacity="0.6" />
    <!-- Radiating Rays -->
    <line x1="110" y1="10" x2="110" y2="25" stroke="#FFD700" stroke-width="2" />
    <line x1="110" y1="195" x2="110" y2="210" stroke="#FFD700" stroke-width="2" />
    <line x1="10" y1="110" x2="25" y2="110" stroke="#FFD700" stroke-width="2" />
    <line x1="195" y1="110" x2="210" y2="110" stroke="#FFD700" stroke-width="2" />
    <!-- Silhouette Profile -->
    <path d="M 90 70 Q 115 55 130 80 Q 140 120 125 150 Q 105 180 80 190 Q 75 150 85 110 Z" fill="#D4AF37" opacity="0.95" />
    <circle cx="110" cy="75" r="14" fill="#FFE57F" />
  </g>
</svg>
`)}`;

// 4. Feliz Natal • Natividade de Jesus & Cantoneiras Ouro
export const CANVA_NATAL_NATIVIDADE_DOURADO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="nativityBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fdfbf7" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#nativityBg)" />

  <!-- Ornate Golden Corners -->
  <g stroke="#D4AF37" stroke-width="2" fill="none">
    <!-- Top Left -->
    <path d="M 20 60 L 20 20 L 60 20" />
    <circle cx="20" cy="20" r="4" fill="#D4AF37" />
    <!-- Top Right -->
    <path d="M 736 60 L 736 20 L 696 20" />
    <circle cx="736" cy="20" r="4" fill="#D4AF37" />
    <!-- Bottom Left -->
    <path d="M 20 299 L 20 339 L 60 339" />
    <circle cx="20" cy="339" r="4" fill="#D4AF37" />
    <!-- Bottom Right -->
    <path d="M 736 299 L 736 339 L 696 339" />
    <circle cx="736" cy="339" r="4" fill="#D4AF37" />
  </g>

  <!-- Top Center: Star of Bethlehem -->
  <g transform="translate(378, 45)">
    <path d="M 0 -25 L 5 -5 L 25 0 L 5 5 L 0 25 L -5 5 L -25 0 L -5 -5 Z" fill="#D4AF37" />
    <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
  </g>

  <!-- Left: Holy Family Line Art -->
  <g transform="translate(100, 80)" stroke="#B8860B" stroke-width="2.5" fill="none" stroke-linecap="round">
    <!-- Manger Arch -->
    <path d="M 20 180 Q 90 30 160 180" stroke-width="3" stroke="#D4AF37" />
    <!-- Joseph -->
    <circle cx="65" cy="90" r="12" fill="#D4AF37" stroke="none" />
    <path d="M 65 105 Q 60 150 50 170" />
    <!-- Mary -->
    <circle cx="115" cy="100" r="10" fill="#D4AF37" stroke="none" />
    <path d="M 115 112 Q 120 150 130 170" />
    <!-- Baby Jesus in Crib -->
    <ellipse cx="90" cy="155" rx="16" ry="10" fill="#FFF2A3" stroke="#B8860B" />
    <circle cx="85" cy="152" r="5" fill="#B8860B" stroke="none" />
  </g>

  <!-- Right: Elegant Typography -->
  <g transform="translate(380, 110)">
    <text x="0" y="40" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="900" fill="#8A1C14">FELIZ NATAL</text>
    <text x="0" y="80" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="20" fill="#B8860B">O Salvador Nasceu!</text>
    <text x="0" y="115" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#4A5568">Glória a Deus nas alturas e paz</text>
    <text x="0" y="135" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#4A5568">na terra aos homens de boa vontade.</text>
  </g>
</svg>
`)}`;

// 5. Feliz Natal Kraft • Foto em Círculo & Renda de Neve
export const CANVA_NATAL_KRAFT_FLORAL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="kraftBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C59B76" />
      <stop offset="50%" stop-color="#B6875E" />
      <stop offset="100%" stop-color="#A5734A" />
    </linearGradient>
    <filter id="kraftShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-opacity="0.3" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#kraftBg)" />

  <!-- Top Lace Snowflake Ribbon -->
  <g stroke="#ffffff" stroke-width="1.5" opacity="0.85" fill="none">
    <line x1="0" y1="28" x2="756" y2="28" stroke-dasharray="6,4" />
    <circle cx="100" cy="15" r="4" fill="#ffffff" />
    <circle cx="200" cy="15" r="4" fill="#ffffff" />
    <circle cx="300" cy="15" r="4" fill="#ffffff" />
    <circle cx="400" cy="15" r="4" fill="#ffffff" />
    <circle cx="500" cy="15" r="4" fill="#ffffff" />
    <circle cx="600" cy="15" r="4" fill="#ffffff" />
    <circle cx="700" cy="15" r="4" fill="#ffffff" />
  </g>

  <!-- Left: Circular Family Photo Slot with Wreath -->
  <g transform="translate(140, 180)" filter="url(#kraftShadow)">
    <!-- Outer Wreath Ring -->
    <circle cx="0" cy="0" r="105" fill="none" stroke="#ffffff" stroke-width="3" />
    <circle cx="0" cy="0" r="95" fill="#fdfbf7" />
    <!-- Silhouette in photo -->
    <circle cx="0" cy="-15" r="30" fill="#cbd5e1" />
    <path d="M -45 55 C -45 15 -20 5 0 5 C 20 5 45 15 45 55 Z" fill="#cbd5e1" />
    <!-- Botanical Pine leaves around circle -->
    <path d="M -90 -30 Q -110 -60 -80 -80" stroke="#046D3B" stroke-width="4" fill="none" />
    <path d="M 80 -80 Q 110 -60 90 -30" stroke="#046D3B" stroke-width="4" fill="none" />
    <circle cx="0" cy="-105" r="6" fill="#C9182B" />
  </g>

  <!-- Right: White Calligraphy Typography -->
  <g transform="translate(360, 100)">
    <text x="0" y="50" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="52" font-weight="bold" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">Feliz Natal</text>
    <text x="0" y="95" font-family="'Montserrat', sans-serif" font-size="16" font-weight="700" fill="#FFF2A3" letter-spacing="2">FAMÍLIA &amp; AMOR</text>
    <text x="0" y="135" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#ffffff" opacity="0.9">Que o verdadeiro espírito natalino</text>
    <text x="0" y="155" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#ffffff" opacity="0.9">habite sempre em nossos lares.</text>
  </g>
</svg>
`)}`;

// 6. Natal Dourado Luxo • Bolas Penduradas & Dupla Foto
export const CANVA_NATAL_DOURADO_LUXO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="luxBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#fbf8f2" />
      <stop offset="100%" stop-color="#f5ede0" />
    </linearGradient>
    <filter id="luxShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.22" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#luxBg)" />

  <!-- Hanging Satin Ribbons & Gold Ornaments (Top Left & Top Right) -->
  <line x1="80" y1="0" x2="80" y2="80" stroke="#D4AF37" stroke-width="2" />
  <circle cx="80" cy="110" r="30" fill="#FFD700" stroke="#B8860B" stroke-width="2" filter="url(#luxShadow)" />
  <ellipse cx="72" cy="100" rx="9" ry="5" transform="rotate(-30 72 100)" fill="#ffffff" opacity="0.7" />

  <line x1="680" y1="0" x2="680" y2="60" stroke="#D4AF37" stroke-width="2" />
  <circle cx="680" cy="90" r="28" fill="#C9182B" stroke="#800a16" stroke-width="2" filter="url(#luxShadow)" />
  <ellipse cx="672" cy="80" rx="8" ry="4" transform="rotate(-30 672 80)" fill="#ffffff" opacity="0.6" />

  <!-- Center Typography -->
  <g transform="translate(180, 70)">
    <text x="190" y="45" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="900" fill="#0F4C3A" text-anchor="middle">BOAS FESTAS</text>
    <text x="190" y="85" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="28" fill="#B8860B" text-anchor="middle">&amp; Feliz Natal</text>
    <line x1="70" y1="105" x2="310" y2="105" stroke="#D4AF37" stroke-width="2" />
  </g>

  <!-- Left Photo Polaroid -->
  <g transform="translate(140, 150) rotate(-6)" filter="url(#luxShadow)">
    <rect width="170" height="175" rx="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="12" y="12" width="146" height="120" rx="3" fill="#94a3b8" />
    <text x="85" y="155" font-family="'Playfair Display', Georgia, serif" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">Família Querida</text>
  </g>

  <!-- Right Photo Polaroid -->
  <g transform="translate(440, 145) rotate(6)" filter="url(#luxShadow)">
    <rect width="170" height="175" rx="5" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
    <rect x="12" y="12" width="146" height="120" rx="3" fill="#64748b" />
    <text x="85" y="155" font-family="'Playfair Display', Georgia, serif" font-size="12" font-style="italic" fill="#475569" text-anchor="middle">Momentos de Luz</text>
  </g>
</svg>
`)}`;

// 7. Natal Mágico • Pattern Natalino & Círculo Esmeralda
export const CANVA_NATAL_MAGICO_PATTERN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <pattern id="magicIcons" width="50" height="50" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1.5" fill="#C9182B" opacity="0.3" />
      <circle cx="35" cy="35" r="1.5" fill="#046D3B" opacity="0.3" />
      <path d="M 25 15 L 28 22 L 22 22 Z" fill="#046D3B" opacity="0.25" />
    </pattern>
    <filter id="badgeShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.25" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="#FDFBF7" />
  <rect width="756" height="359" fill="url(#magicIcons)" />

  <!-- Center-Left: Emerald Circular Badge -->
  <g transform="translate(180, 180)" filter="url(#badgeShadow)">
    <circle cx="0" cy="0" r="115" fill="#046D3B" stroke="#D4AF37" stroke-width="4" />
    <circle cx="0" cy="0" r="105" fill="#ffffff" />
    <circle cx="0" cy="-15" r="32" fill="#94A3B8" />
    <path d="M -45 55 C -45 15 -20 5 0 5 C 20 5 45 15 45 55 Z" fill="#94A3B8" />
    <text x="0" y="80" font-family="'Playfair Display', Georgia, serif" font-size="13" font-style="italic" fill="#046D3B" text-anchor="middle">Família &amp; Crianças</text>
  </g>

  <!-- Right: Magic Christmas Lettering -->
  <g transform="translate(360, 90)">
    <text x="0" y="45" font-family="'Playfair Display', Georgia, serif" font-size="48" font-weight="900" fill="#C9182B">NATAL MÁGICO</text>
    <text x="0" y="90" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="24" fill="#046D3B">Celebrando o Amor</text>
    <rect x="0" y="110" width="180" height="3" fill="#D4AF37" />
    <text x="0" y="145" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600" fill="#4A5568">Que a magia desta noite especial</text>
    <text x="0" y="168" font-family="'Montserrat', sans-serif" font-size="13" font-weight="600" fill="#4A5568">ilumine todos os seus dias!</text>
  </g>
</svg>
`)}`;

// 8. Um Feliz Natal • Presépio One-Line & Estrela Guia
export const CANVA_NATAL_SAGRADA_FAMILIA_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="lineArtBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f7f9fa" />
    </linearGradient>
  </defs>
  <rect width="756" height="359" fill="url(#lineArtBg)" />

  <!-- Continuous One-Line Art Nativity -->
  <g transform="translate(100, 70)" stroke="#8A1C14" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 50 180 Q 50 80 100 80 Q 130 80 140 120 Q 150 160 170 170 Q 190 160 200 120 Q 210 80 240 80 Q 290 80 290 180" />
    <!-- Baby Crib -->
    <path d="M 140 180 Q 170 140 200 180 Z" fill="#FFF2A3" />
    <circle cx="170" cy="155" r="7" fill="#8A1C14" />
  </g>

  <!-- Star of Bethlehem Above -->
  <g transform="translate(270, 45)">
    <path d="M 0 -20 L 4 -4 L 20 0 L 4 4 L 0 20 L -4 4 L -20 0 L -4 -4 Z" fill="#FFD700" />
    <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
  </g>

  <!-- Right Typography -->
  <g transform="translate(420, 100)">
    <text x="0" y="45" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="900" fill="#046D3B">UM FELIZ NATAL</text>
    <text x="0" y="85" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="22" fill="#D4AF37">Glória a Deus nas Alturas</text>
    <text x="0" y="125" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#4A5568">Que a luz do Menino Jesus renove</text>
    <text x="0" y="145" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#4A5568">sua fé, sua esperança e seu amor.</text>
  </g>
</svg>
`)}`;

// 9. Feliz Natal Capivara • Pisca-Pisca & Capivarinhas Fofas
export const CANVA_NATAL_CAPIVARA_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359" width="756" height="359">
  <defs>
    <linearGradient id="capiBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fff8e7" />
    </linearGradient>
    <filter id="bulbGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#ffd700" flood-opacity="0.8" />
    </filter>
  </defs>
  <rect width="756" height="359" fill="url(#capiBg)" />

  <!-- String Lights Garland at the Top -->
  <path d="M 0 35 Q 120 70 240 35 Q 360 70 480 35 Q 600 70 756 35" stroke="#2D3748" stroke-width="2" fill="none" />
  <!-- Colorful Bulbs -->
  <circle cx="60" cy="50" r="7" fill="#E53E3E" filter="url(#bulbGlow)" />
  <circle cx="140" cy="54" r="7" fill="#ECC94B" filter="url(#bulbGlow)" />
  <circle cx="220" cy="40" r="7" fill="#38A169" filter="url(#bulbGlow)" />
  <circle cx="300" cy="54" r="7" fill="#3182CE" filter="url(#bulbGlow)" />
  <circle cx="380" cy="40" r="7" fill="#E53E3E" filter="url(#bulbGlow)" />
  <circle cx="460" cy="54" r="7" fill="#ECC94B" filter="url(#bulbGlow)" />
  <circle cx="540" cy="40" r="7" fill="#38A169" filter="url(#bulbGlow)" />
  <circle cx="620" cy="54" r="7" fill="#3182CE" filter="url(#bulbGlow)" />
  <circle cx="700" cy="42" r="7" fill="#E53E3E" filter="url(#bulbGlow)" />

  <!-- Left: Cute Illustrated Capybara with Santa Hat -->
  <g transform="translate(130, 200)">
    <!-- Body -->
    <ellipse cx="0" cy="0" rx="65" ry="45" fill="#8D5B4C" />
    <!-- Head -->
    <ellipse cx="45" cy="-25" rx="35" ry="25" fill="#9C6644" />
    <!-- Snout -->
    <rect x="60" y="-30" width="20" height="25" rx="8" fill="#7F4F24" />
    <circle cx="72" cy="-20" r="3" fill="#2D3748" />
    <!-- Eye & Smile -->
    <circle cx="45" cy="-30" r="3.5" fill="#1A202C" />
    <path d="M 65 -15 Q 70 -10 75 -15" stroke="#1A202C" stroke-width="2" fill="none" />
    <!-- Santa Hat -->
    <path d="M 30 -45 Q 45 -80 70 -55 Q 55 -35 30 -45 Z" fill="#E53E3E" />
    <circle cx="70" cy="-55" r="7" fill="#ffffff" />
    <rect x="25" y="-47" width="35" height="8" rx="4" fill="#ffffff" />
  </g>

  <!-- Right: Playful Warm Lettering -->
  <g transform="translate(360, 110)">
    <text x="0" y="45" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="900" fill="#E53E3E">FELIZ NATAL!</text>
    <text x="0" y="85" font-family="'Montserrat', sans-serif" font-size="18" font-weight="700" fill="#2F855A">COM MUITO AMOR &amp; PAZ</text>
    <text x="0" y="125" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#4A5568">Que seu fim de ano seja tão relax</text>
    <text x="0" y="145" font-family="'Montserrat', sans-serif" font-size="13" font-weight="500" fill="#4A5568">quanto uma capivara na lagoa! ✨</text>
  </g>
</svg>
`)}`;


// ==========================================
// 2. LAYER GENERATOR FUNCTIONS (100% EDITABLE)
// ==========================================

export function getNatalGeometricTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `geo-bg-${timestamp}`,
      name: 'Fundo: Clean Natalino (#FFFFFF)',
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
      id: `geo-photo-${timestamp}`,
      name: 'Foto da Família (Polaroid)',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 510,
      y: 50,
      width: 190,
      height: 230,
      rotation: 5,
      content: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
      strokeColor: '#E2E8F0',
      strokeWidth: 4,
    },
    {
      id: `geo-tree-${timestamp}`,
      name: 'Árvore de Natal Geométrica',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 95,
      blendMode: 'normal',
      x: 330,
      y: 70,
      width: 150,
      height: 220,
      rotation: 0,
      content: 'https://media-public.canva.com/KYv60/MAEIzHKYv60/1/t.jpg',
    },
    {
      id: `geo-title1-${timestamp}`,
      name: 'Texto: Merry',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 60,
      width: 250,
      height: 60,
      rotation: 0,
      content: 'Merry',
      color: '#046D3B',
      fontSize: 52,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `geo-title2-${timestamp}`,
      name: 'Texto: Christmas',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 120,
      width: 280,
      height: 60,
      rotation: 0,
      content: 'Christmas',
      color: '#C9182B',
      fontSize: 52,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `geo-msg-${timestamp}`,
      name: 'Texto: Mensagem Amor & Paz',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 190,
      width: 260,
      height: 50,
      rotation: 0,
      content: 'Que seu natal seja repleto de amor, paz & união ✨',
      color: '#2D3748',
      fontSize: 14,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `geo-star-${timestamp}`,
      name: 'Estrela Dourada Topo',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 380,
      y: 40,
      width: 35,
      height: 35,
      rotation: 0,
      content: CHRISTMAS_STAR_SVG,
    },
  ];
}

export function getNatalChristmasIsLoveTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `love-bg-${timestamp}`,
      name: 'Fundo: Creme Suave (#FFFDF8)',
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
      color: '#FFFDF8',
    },
    {
      id: `love-photo1-${timestamp}`,
      name: 'Foto 1: Momentos Natalinos',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 360,
      y: 60,
      width: 165,
      height: 195,
      rotation: -8,
      content: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      strokeColor: '#FFFFFF',
      strokeWidth: 5,
    },
    {
      id: `love-photo2-${timestamp}`,
      name: 'Foto 2: Abraço em Família',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 520,
      y: 80,
      width: 165,
      height: 195,
      rotation: 8,
      content: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
      strokeColor: '#FFFFFF',
      strokeWidth: 5,
    },
    {
      id: `love-txt-ch-${timestamp}`,
      name: 'Texto: Christmas',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 70,
      width: 250,
      height: 50,
      rotation: 0,
      content: 'Christmas',
      color: '#C9182B',
      fontSize: 36,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
    {
      id: `love-txt-love-${timestamp}`,
      name: 'Texto: IS LOVE',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 120,
      width: 250,
      height: 60,
      rotation: 0,
      content: 'IS LOVE',
      color: '#046D3B',
      fontSize: 48,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `love-txt-sub-${timestamp}`,
      name: 'Texto: Mensagem Afetuosa',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 60,
      y: 180,
      width: 260,
      height: 40,
      rotation: 0,
      content: 'Momentos inesquecíveis em família ♡',
      color: '#8C6D46',
      fontSize: 14,
      fontFamily: 'Montserrat, sans-serif',
    },
  ];
}

export function getNatalAveMariaTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `ave-bg-${timestamp}`,
      name: 'Fundo: Azul Marinho Real (#0B132B)',
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
      color: '#0B132B',
    },
    {
      id: `ave-title-${timestamp}`,
      name: 'Texto: Ave Maria',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 80,
      width: 380,
      height: 70,
      rotation: 0,
      content: 'Ave Maria',
      color: '#FFD700',
      fontSize: 54,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `ave-sub-${timestamp}`,
      name: 'Texto: Cheia de Graça',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 60,
      y: 155,
      width: 380,
      height: 40,
      rotation: 0,
      content: 'Cheia de Graça, o Senhor é convosco',
      color: '#E2E8F0',
      fontSize: 18,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
    {
      id: `ave-prayer-${timestamp}`,
      name: 'Texto: Oração Sagrada',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 60,
      y: 205,
      width: 380,
      height: 50,
      rotation: 0,
      content: 'Bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus.',
      color: '#D4AF37',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
    },
    {
      id: `ave-halo-${timestamp}`,
      name: 'Elemento: Auréola Sagrada Dourada',
      type: 'shape',
      shapeType: 'circle',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 520,
      y: 80,
      width: 170,
      height: 170,
      rotation: 0,
      content: '',
      color: 'transparent',
      strokeColor: '#FFD700',
      strokeWidth: 3,
    },
  ];
}

export function getNatalNatividadeTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `nat-bg-${timestamp}`,
      name: 'Fundo: Branco Pérola (#FDFBF7)',
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
      id: `nat-title-${timestamp}`,
      name: 'Texto: FELIZ NATAL',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 360,
      y: 80,
      width: 360,
      height: 60,
      rotation: 0,
      content: 'FELIZ NATAL',
      color: '#8A1C14',
      fontSize: 44,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `nat-sub-${timestamp}`,
      name: 'Texto: O Salvador Nasceu',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 360,
      y: 140,
      width: 360,
      height: 40,
      rotation: 0,
      content: 'O Salvador Nasceu!',
      color: '#B8860B',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
    {
      id: `nat-star-${timestamp}`,
      name: 'Estrela Guia de Belém',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 355,
      y: 20,
      width: 45,
      height: 45,
      rotation: 0,
      content: CHRISTMAS_STAR_SVG,
    },
  ];
}

export function getNatalKraftFloralTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `kraft-bg-${timestamp}`,
      name: 'Fundo: Papel Kraft Rústico (#B6875E)',
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
      color: '#B6875E',
    },
    {
      id: `kraft-photo-${timestamp}`,
      name: 'Foto em Moldura Circular',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 70,
      width: 210,
      height: 210,
      rotation: 0,
      content: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
      strokeColor: '#FFFFFF',
      strokeWidth: 6,
    },
    {
      id: `kraft-title-${timestamp}`,
      name: 'Texto: Feliz Natal',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 320,
      y: 80,
      width: 380,
      height: 70,
      rotation: 0,
      content: 'Feliz Natal',
      color: '#FFFFFF',
      fontSize: 54,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
    {
      id: `kraft-msg-${timestamp}`,
      name: 'Texto: Amor & Família',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 320,
      y: 160,
      width: 380,
      height: 40,
      rotation: 0,
      content: 'FAMÍLIA & AMOR ETERNO',
      color: '#FFF2A3',
      fontSize: 16,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
  ];
}

export function getNatalDouradoLuxoTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `lux-bg-${timestamp}`,
      name: 'Fundo: Linho Creme Nobre (#FBF8F2)',
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
      color: '#FBF8F2',
    },
    {
      id: `lux-bauble1-${timestamp}`,
      name: 'Bola de Natal Dourada Suspensa',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 50,
      y: 20,
      width: 90,
      height: 140,
      rotation: 0,
      content: CHRISTMAS_BALL_GOLD_SVG,
    },
    {
      id: `lux-bauble2-${timestamp}`,
      name: 'Bola de Natal Vermelha Suspensa',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 640,
      y: 10,
      width: 80,
      height: 130,
      rotation: 0,
      content: CHRISTMAS_BAUBLE_RED_SVG,
    },
    {
      id: `lux-title-${timestamp}`,
      name: 'Texto: BOAS FESTAS',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 50,
      width: 400,
      height: 60,
      rotation: 0,
      content: 'BOAS FESTAS',
      color: '#0F4C3A',
      fontSize: 44,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `lux-sub-${timestamp}`,
      name: 'Texto: & Feliz Natal',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 180,
      y: 105,
      width: 400,
      height: 45,
      rotation: 0,
      content: '& Feliz Natal',
      color: '#B8860B',
      fontSize: 28,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
    {
      id: `lux-photo1-${timestamp}`,
      name: 'Foto 1: Família',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 150,
      y: 155,
      width: 170,
      height: 175,
      rotation: -6,
      content: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
    {
      id: `lux-photo2-${timestamp}`,
      name: 'Foto 2: Alegria',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 430,
      y: 150,
      width: 170,
      height: 175,
      rotation: 6,
      content: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
      strokeColor: '#FFFFFF',
      strokeWidth: 4,
    },
  ];
}

export function getNatalMagicoPatternTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `mag-bg-${timestamp}`,
      name: 'Fundo: Marfim Natalino (#FDFBF7)',
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
      id: `mag-badge-${timestamp}`,
      name: 'Foto no Círculo Esmeralda',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 70,
      y: 65,
      width: 220,
      height: 220,
      rotation: 0,
      content: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=800&auto=format&fit=crop&q=80',
      strokeColor: '#046D3B',
      strokeWidth: 6,
    },
    {
      id: `mag-title-${timestamp}`,
      name: 'Texto: NATAL MÁGICO',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 340,
      y: 75,
      width: 380,
      height: 60,
      rotation: 0,
      content: 'NATAL MÁGICO',
      color: '#C9182B',
      fontSize: 48,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `mag-sub-${timestamp}`,
      name: 'Texto: Celebrando o Amor',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 340,
      y: 135,
      width: 380,
      height: 40,
      rotation: 0,
      content: 'Celebrando o Amor & União',
      color: '#046D3B',
      fontSize: 24,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
  ];
}

export function getNatalSagradaFamiliaTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `sag-bg-${timestamp}`,
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
      id: `sag-title-${timestamp}`,
      name: 'Texto: UM FELIZ NATAL',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 360,
      y: 80,
      width: 380,
      height: 60,
      rotation: 0,
      content: 'UM FELIZ NATAL',
      color: '#046D3B',
      fontSize: 44,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `sag-sub-${timestamp}`,
      name: 'Texto: Glória a Deus',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 360,
      y: 140,
      width: 380,
      height: 40,
      rotation: 0,
      content: 'Glória a Deus nas Alturas',
      color: '#D4AF37',
      fontSize: 22,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontStyle: 'italic',
    },
    {
      id: `sag-star-${timestamp}`,
      name: 'Estrela Guia',
      type: 'image',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 230,
      y: 35,
      width: 40,
      height: 40,
      rotation: 0,
      content: CHRISTMAS_STAR_SVG,
    },
  ];
}

export function getNatalCapivaraTemplateLayers(timestamp: number = Date.now()): Layer[] {
  return [
    {
      id: `capi-bg-${timestamp}`,
      name: 'Fundo: Bege Festivo (#FFF8E7)',
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
      color: '#FFF8E7',
    },
    {
      id: `capi-title-${timestamp}`,
      name: 'Texto: FELIZ NATAL!',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 340,
      y: 80,
      width: 380,
      height: 60,
      rotation: 0,
      content: 'FELIZ NATAL!',
      color: '#E53E3E',
      fontSize: 44,
      fontFamily: 'Playfair Display, Georgia, serif',
      fontWeight: 'bold',
    },
    {
      id: `capi-sub-${timestamp}`,
      name: 'Texto: Muito Amor & Paz',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      x: 340,
      y: 140,
      width: 380,
      height: 40,
      rotation: 0,
      content: 'COM MUITO AMOR & PAZ',
      color: '#2F855A',
      fontSize: 18,
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
    },
    {
      id: `capi-msg-${timestamp}`,
      name: 'Texto: Desejo Divertido',
      type: 'text',
      visible: true,
      locked: false,
      opacity: 90,
      blendMode: 'normal',
      x: 340,
      y: 190,
      width: 380,
      height: 50,
      rotation: 0,
      content: 'Que seu fim de ano seja tão relax quanto uma capivara na lagoa! ✨',
      color: '#4A5568',
      fontSize: 13,
      fontFamily: 'Montserrat, sans-serif',
    },
  ];
}


// ==========================================
// 3. CHRISTMAS CANVA TEMPLATES ARRAY
// ==========================================

export const CHRISTMAS_CANVA_TEMPLATES: CanvaTemplateItem[] = [
  {
    id: 'canva-natal-feliz-natal',
    title: 'Feliz Natal • Bolas & Estrelas Douradas',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359"><rect width="756" height="359" fill="#ffffff"/><circle cx="378" cy="180" r="120" fill="#990000"/><text x="378" y="160" font-family="serif" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="middle">Feliz</text><text x="378" y="225" font-family="serif" font-size="64" font-weight="bold" fill="#ffd700" text-anchor="middle">Natal</text><circle cx="150" cy="100" r="50" fill="#d90429"/><circle cx="600" cy="100" r="50" fill="#ffd700"/></svg>'),
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'feliz natal', 'christmas', 'bolas de natal', 'estrela', 'dourado', 'vermelho', 'caneca', 'sublimacao', 'estampa'],
    description: 'Modelo oficial Canva de Natal com 16 camadas totalmente editáveis: lettering Feliz Natal, bolas de natal texturizadas, ornamentos dourados e divisores.',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-natal-geometric-family',
    title: 'Natal Geométrico • Moldura Família & Árvores Modernas',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_GEOMETRIC_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'geometrico', 'arvores', 'polaroid', 'foto', 'verde', 'vermelho', 'caneca', 'sublimacao'],
    description: 'Estampa moderna com pinheiros geométricos, lettering Merry Christmas, moldura polaroid e mensagem de união.',
    author: 'Canva Pro Designer',
  },
  {
    id: 'canva-natal-2025-hoho',
    title: 'Feliz Natal 2025 • Pattern Ho Ho Ho & Borda Verde',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359"><rect width="756" height="359" fill="#c9182b"/><rect width="756" height="32" fill="#046d3b"/><text x="378" y="200" font-family="sans-serif" font-size="48" font-weight="bold" fill="#ffffff" text-anchor="middle">HO HO HO 2025</text></svg>'),
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', '2025', 'ho ho ho', 'pattern', 'verde', 'vermelho', 'caneca', 'sublimacao'],
    description: 'Estampa festiva com pattern natalino Ho Ho Ho, borda esmeralda e letterings 2025 / Feliz Natal totalmente editáveis em 18 camadas.',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-natal-christmas-is-love',
    title: 'Christmas is Love • Gorros Noel & Dupla Polaroid',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_CHRISTMAS_IS_LOVE_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'love', 'amor', 'polaroid', 'fotos', 'gorro', 'papai noel', 'caneca'],
    description: 'Composição afetuosa em tons pasteis com 2 molduras para fotos com gorros de Papai Noel e lettering Christmas is Love.',
    author: 'Canva Creator',
  },
  {
    id: 'canva-natal-santa-polaroid',
    title: 'Feliz Natal • Papai Noel Aquarela & Foto Polaroid',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359"><rect width="756" height="359" fill="#fdfaf5"/><rect x="65" y="36" width="210" height="260" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/><text x="500" y="180" font-family="serif" font-size="48" font-weight="bold" fill="#c9182b" text-anchor="middle">Feliz Natal</text></svg>'),
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'papai noel', 'santa claus', 'polaroid', 'foto', 'aquarela', 'caneca'],
    description: 'Composição nobre em aquarela com slot polaroid para foto da família, Papai Noel em aquarela e árvore decorada.',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-natal-ave-maria-sacro',
    title: 'Ave Maria Sacro • Rosas Douradas & Azul Royal',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_AVE_MARIA_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['ave maria', 'natal', 'sacro', 'nossa senhora', 'azul royal', 'dourado', 'religioso', 'caneca'],
    description: 'Design sacro requintado em azul marinho royal profundo com silhueta luminosa, auréola dourada e tipografia de luxo.',
    author: 'Canva Sacred Art',
  },
  {
    id: 'canva-natal-natividade-dourado',
    title: 'Feliz Natal • Natividade de Jesus & Cantoneiras Douradas',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_NATIVIDADE_DOURADO_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'natividade', 'presepio', 'jesus', 'salvador', 'dourado', 'cantoneiras', 'caneca'],
    description: 'Composição clássica e celestial celebrando o nascimento de Jesus com cantoneiras de ouro e estrela de Belém.',
    author: 'Canva Pro Studio',
  },
  {
    id: 'canva-natal-kraft-floral',
    title: 'Feliz Natal Kraft • Foto em Círculo & Renda de Neve',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_KRAFT_FLORAL_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'kraft', 'rustico', 'foto', 'circulo', 'renda', 'neve', 'caneca'],
    description: 'Estética rústica e elegante em papel Kraft com moldura circular botânica para foto da família e caligrafia branca.',
    author: 'Canva Vintage Lab',
  },
  {
    id: 'canva-natal-dourado-luxo',
    title: 'Natal Dourado Luxo • Bolas Penduradas, Laços & Dupla Foto',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_DOURADO_LUXO_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'luxo', 'dourado', 'bolas penduradas', 'fotos', 'polaroid', 'caneca'],
    description: 'Design premium em linho creme com bolas de natal suspensas em fitas douradas, duas molduras de fotos e lettering Boas Festas.',
    author: 'Canva Luxury Line',
  },
  {
    id: 'canva-natal-magico-pattern',
    title: 'Natal Mágico • Pattern Natalino & Círculo Esmeralda',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_MAGICO_PATTERN_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'magico', 'pattern', 'esmeralda', 'verde', 'foto', 'caneca'],
    description: 'Composição lúdica com pattern sutil de ícones natalinos, moldura esmeralda e mensagem festiva.',
    author: 'Canva Modern Studio',
  },
  {
    id: 'canva-natal-sagrada-familia-line',
    title: 'Um Feliz Natal • Presépio One-Line & Estrela Guia',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_SAGRADA_FAMILIA_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'presepio', 'sagrada familia', 'one line', 'minimalista', 'estrela', 'caneca'],
    description: 'Arte minimalista sofisticada com desenho contínuo da Sagrada Família, estrela de Belém e votos de paz.',
    author: 'Canva Line Art',
  },
  {
    id: 'canva-natal-capivaras-luzes',
    title: 'Feliz Natal Capivara • Pisca-Pisca & Capivarinhas Fofas',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: CANVA_NATAL_CAPIVARA_SVG,
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'capivara', 'fofo', 'pisca-pisca', 'luzes', 'divertido', 'caneca', 'pet'],
    description: 'Estampa alegre e viral com varal de luzes natalinas e capivarinha fofa de gorro de Papai Noel.',
    author: 'Canva Cute Art',
  },
  {
    id: 'canva-natal-vintage-stamps',
    title: 'Natal Mágico • 3 Selos Postais com Fotos & Árvore Vintage',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359"><rect width="756" height="359" fill="#fdfbf7"/><text x="450" y="120" font-family="serif" font-size="44" font-weight="bold" fill="#1a615e">Feliz Natal</text><rect x="240" y="147" width="186" height="195" fill="#c2a68c"/></svg>'),
    widthMm: 200,
    heightMm: 95,
    tags: ['natal', 'selos postais', 'vintage', 'fotos', 'arvore vintage', 'caneca'],
    description: 'Design retrô sofisticado em tom creme vintage com 3 selos postais para fotos da família e árvore desenhada à mão.',
    author: 'Canva Design Studio',
  },
  {
    id: 'canva-natal-merry-christmas',
    title: 'Merry Christmas • Árvore Aquarela & Dupla Polaroid',
    category: 'faith',
    categoryLabel: 'Natal & Festas',
    previewUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 756 359"><rect width="756" height="359" fill="#ffffff"/><text x="42" y="100" font-family="serif" font-size="54" font-weight="bold" fill="#15803d">Merry</text><text x="42" y="160" font-family="serif" font-size="54" font-weight="bold" fill="#b91c1c">Christmas</text></svg>'),
    widthMm: 200,
    heightMm: 95,
    tags: ['merry christmas', 'natal', 'polaroid dupla', 'arvore aquarela', 'caneca'],
    description: 'Composição festiva com 2 molduras polaroids sobrepostas para fotos, lettering Merry Christmas e árvore imponente.',
    author: 'Canva Design Studio',
  },
];
