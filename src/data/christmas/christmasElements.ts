// SVG assets sem dependência externa - padrão data:image/svg+xml
export type TemplateLayer = any;
export const createBg = (color: string, pattern: string, opacity: number) => ({
  id: `bg-${Date.now()}`, type: 'image', name:'Fundo',
  x:0,y:0,width:756,height:359,rotation:0, content: pattern, color, opacity
} as any);
export const createText = (opts: any) => ({
  id: `txt-${opts.x}-${Date.now()}`, type:'text', name: opts.text.slice(0,10),
  x: opts.x*3.78, y: opts.y*3.78, width: opts.w*3.78, height:20,
  content: opts.text, color: opts.color, fontSize: opts.fontSize*3.78,
  fontFamily: opts.fontFamily, fontWeight: opts.fontWeight
} as any);
export const createOrnament = (svg: string, x:number, y:number, size:number, color:string) => ({
  id:`orn-${x}-${Date.now()}`, type:'image', name:'Ornamento',
  x: x*3.78, y: y*3.78, width: size*3.78, height: size*3.78, content: svg.replace('{{COLOR}}',color)
} as any);
export const svgDataUri = (svg:string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
export const createImage = createOrnament;
export const createPhoto = createOrnament;
export const CHRISTMAS_WREATH_LUXO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <circle cx="60" cy="60" r="45" fill="none" stroke="#0A5C36" stroke-width="12"/>
  <circle cx="25" cy="45" r="8" fill="#C1272D"/><circle cx="90" cy="35" r="7" fill="#C1272D"/><circle cx="75" cy="90" r="8" fill="#C1272D"/>
  <circle cx="60" cy="15" r="6" fill="#D4AF37"/>
</svg>
`)}`;

export const CHRISTMAS_TREE_MINI_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 100" width="80" height="100">
  <polygon points="40,5 10,45 70,45" fill="#0F4C3A"/><polygon points="40,25 15,65 65,65" fill="#186E53"/>
  <polygon points="40,45 20,85 60,85" fill="#248A6A"/><rect x="35" y="85" width="10" height="12" fill="#8B4513"/>
  <circle cx="40" cy="5" r="5" fill="#FFD700"/>
</svg>
`)}`;

export const SANTA_MINIMAL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100" height="120">
  <circle cx="50" cy="65" r="28" fill="#FFDAB9"/><circle cx="50" cy="90" r="32" fill="#FFF"/>
  <path d="M 20 55 Q 50 20 80 55 Q 80 35 50 25 Q 20 35 20 55" fill="#C1272D"/>
  <circle cx="80" cy="35" r="8" fill="#FFF"/><circle cx="40" cy="62" r="3" fill="#000"/><circle cx="60" cy="62" r="3" fill="#000"/>
</svg>
`)}`;

export const SNOWFLAKE_LUX_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60">
  <g stroke="#D4AF37" stroke-width="1.5"><line x1="30" y1="5" x2="30" y2="55"/><line x1="5" y1="30" x2="55" y2="30"/>
  <line x1="12" y1="12" x2="48" y2="48"/><line x1="48" y1="12" x2="12" y2="48"/><circle cx="30" cy="30" r="4" fill="#D4AF37"/></g>
</svg>
`)}`;

export const REINDEER_CUTE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <ellipse cx="50" cy="60" rx="30" ry="22" fill="#8B5A2B"/><ellipse cx="50" cy="35" rx="20" ry="18" fill="#A67C52"/>
  <ellipse cx="50" cy="65" rx="12" ry="8" fill="#FFDAB9"/><circle cx="50" cy="62" r="6" fill="#C1272D"/>
  <circle cx="40" cy="38" r="3" fill="#000"/><circle cx="60" cy="38" r="3" fill="#000"/>
</svg>
`)}`;

export const CAPYBARA_NATAL_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80">
  <ellipse cx="60" cy="50" rx="45" ry="25" fill="#8D6E63"/><ellipse cx="85" cy="35" rx="22" ry="18" fill="#A1887F"/>
  <circle cx="90" cy="32" r="2" fill="#000"/><circle cx="100" cy="32" r="2" fill="#000"/>
  <path d="M 80 15 Q 90 -5 105 10 Q 90 20 80 15" fill="#C1272D"/><circle cx="105" cy="10" r="5" fill="#FFF"/>
</svg>
`)}`;

export const PINE_BRANCH_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
  <path d="M 0 20 Q 50 0 100 20 Q 50 40 0 20" stroke="#0A5C36" stroke-width="3" fill="none"/>
</svg>
`)}`;

export const CHRISTMAS_ELEMENTS = {
  wreath: CHRISTMAS_WREATH_LUXO_SVG,
  tree: CHRISTMAS_TREE_MINI_SVG,
  santa: SANTA_MINIMAL_SVG,
  snowflake: SNOWFLAKE_LUX_SVG,
  reindeer: REINDEER_CUTE_SVG,
  capybara: CAPYBARA_NATAL_SVG,
  pine: PINE_BRANCH_SVG,
};