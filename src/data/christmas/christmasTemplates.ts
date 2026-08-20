/**
 * christmasTemplates.ts | AGREGADOR 100 TEMPLATES - COMPATÍVEL COM NOVO PADRÃO
 * Path: E:\projetos\ai-sublimstudio-en-\src\data\christmas\christmasTemplates.ts
 */
import { CanvaTemplateItem } from '../canvaTemplates';
import { classicTemplates, getClassicLayers, ClassicTemplateId } from './christmasClassic';
import { getBaseFestiveLayers } from './christmasLayers';

// Helper para converter seu novo padrão classic -> CanvaTemplateItem
function classicToCanvaTemplate(t: typeof classicTemplates[number]): CanvaTemplateItem {
  return {
    id: t.id,
    title: t.title,
    category: 'christmas' as any,
    categoryLabel: 'Natal Clássico',
    previewUrl: '', // vai usar layers
    widthMm: 200,
    heightMm: 95,
    tags: [...t.tags],
    description: t.title,
    author: 'SublimStudio',
    // ESSENCIAL: layers dinâmicos
    getLayers: () => getClassicLayers(t.id as ClassicTemplateId) as any,
    layers: getClassicLayers(t.id as ClassicTemplateId) as any
  } as any;
}

export const CHRISTMAS_CLASSIC_TEMPLATES: CanvaTemplateItem[] = classicTemplates.map(classicToCanvaTemplate);

// TODO: Quando você converter os outros arquivos para o mesmo padrão, descomente:
// import { luxuryTemplates, getLuxuryLayers } from './christmasLuxury';
// import { familyTemplates, getFamilyLayers } from './christmasFamily';
//... etc

// Por enquanto stubs para não quebrar o build (100 templates)
const STUB = (prefix: string, label: string, n=10): CanvaTemplateItem[] =>
  Array.from({length:n},(_,i)=>({
    id:`${prefix}-${String(i+1).padStart(2,'0')}`,
    title:`${label} ${i+1}`,
    category:'christmas' as any,
    categoryLabel: label,
    previewUrl: '',
    widthMm: 200,
    heightMm: 95,
    tags:['natal', prefix],
    description: `${label} ${i+1}`,
    author: 'SublimStudio',
    getLayers: () => getBaseFestiveLayers('#7A0C10') as any,
    layers: getBaseFestiveLayers('#7A0C10') as any
  } as any));

export const CHRISTMAS_LUXURY_TEMPLATES = STUB('luxury','Natal Luxo');
export const CHRISTMAS_FAMILY_TEMPLATES = STUB('family','Natal Família');
export const CHRISTMAS_RELIGIOUS_TEMPLATES = STUB('religious','Natal Sagrado');
export const CHRISTMAS_PET_TEMPLATES = STUB('pet','Natal Pet Capivara'); // aqui vai sua capivara
export const CHRISTMAS_BRAZILIAN_TEMPLATES = STUB('brazilian','Natal Tropical BR');
export const CHRISTMAS_FUNNY_TEMPLATES = STUB('funny','Natal Divertido');
export const CHRISTMAS_MINIMAL_TEMPLATES = STUB('minimal','Natal Minimalista');
export const CHRISTMAS_CUTE_TEMPLATES = STUB('cute','Natal Fofinho');
export const CHRISTMAS_PHOTO_TEMPLATES = STUB('photo','Natal com Fotos');

// 100 TEMPLATES FINAIS
export const ALL_CHRISTMAS_100_TEMPLATES: CanvaTemplateItem[] = [
 ...CHRISTMAS_CLASSIC_TEMPLATES, // 01-10 REAL (seu arquivo novo)
 ...CHRISTMAS_LUXURY_TEMPLATES, // 11-20 stub
 ...CHRISTMAS_FAMILY_TEMPLATES, // 21-30 stub
 ...CHRISTMAS_RELIGIOUS_TEMPLATES, // 31-40 stub
 ...CHRISTMAS_PET_TEMPLATES, // 41-50 stub capivara
 ...CHRISTMAS_BRAZILIAN_TEMPLATES, // 51-60 stub
 ...CHRISTMAS_FUNNY_TEMPLATES, // 61-70 stub
 ...CHRISTMAS_MINIMAL_TEMPLATES, // 71-80 stub
 ...CHRISTMAS_CUTE_TEMPLATES, // 81-90 stub
 ...CHRISTMAS_PHOTO_TEMPLATES, // 91-100 stub
];

export const CHRISTMAS_NEW_20_TEMPLATES = ALL_CHRISTMAS_100_TEMPLATES;
export const CHRISTMAS_CANVA_TEMPLATES = ALL_CHRISTMAS_100_TEMPLATES;

export * from './christmasElements';