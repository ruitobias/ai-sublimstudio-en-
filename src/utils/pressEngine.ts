import { SublimationPressPreset } from '../types';

export const SUBLIMATION_PRESS_PRESETS: SublimationPressPreset[] = [
  {
    id: 'mug_ceramic',
    productName: 'Caneca de Cerâmica (11oz / 325ml)',
    temperatureC: 195,
    temperatureF: 383,
    timeSeconds: 180,
    pressure: 'Alta',
    paperType: 'Papel Sublimático Resinado Premium (100g/m²)',
    inkType: 'Tinta Sublimática HD Cyan/Magenta/Yellow/Black',
    notes: 'Aquecer a prensa a 190°C. Pressionar firmemente por 180s. Resfriar em água morna se necessário.'
  },
  {
    id: 'tshirt_poly',
    productName: 'Camiseta Poliéster 100% Branca',
    temperatureC: 200,
    temperatureF: 392,
    timeSeconds: 25,
    pressure: 'Média',
    paperType: 'Papel Sublimático Fundo Azul / Rosa',
    inkType: 'Tinta Sublimática Hi-Fi',
    notes: 'Usar teflon por cima da estampa. Prensa a 200°C por 25s com pressão média-alta.'
  },
  {
    id: 'squeeze_aluminum',
    productName: 'Garrafa / Squeeze de Alumínio 600ml',
    temperatureC: 185,
    temperatureF: 365,
    timeSeconds: 160,
    pressure: 'Média',
    paperType: 'Papel Sublimático High-Release',
    inkType: 'Tinta Sublimática HD',
    notes: 'Ajustar a manta cilíndrica. Pressão uniforme sem dobrar o fundo da garrafa.'
  },
  {
    id: 'mousepad_rubber',
    productName: 'Mousepad Neoprene / Borracha 3mm',
    temperatureC: 195,
    temperatureF: 383,
    timeSeconds: 40,
    pressure: 'Média',
    paperType: 'Papel Sublimático Multiuso',
    inkType: 'Tinta Sublimática HD',
    notes: 'Pré-prensar por 5s para retirar umidade do tecido do mousepad.'
  },
  {
    id: 'pillow_cushion',
    productName: 'Almofada / Capa de Almofada 40x40cm',
    temperatureC: 200,
    temperatureF: 392,
    timeSeconds: 35,
    pressure: 'Média',
    paperType: 'Papel Sublimático Fundo Azul',
    inkType: 'Tinta Sublimática HD',
    notes: 'Retirar o enchimento. Prensar apenas a capa plana.'
  },
  {
    id: 'ceramic_tile',
    productName: 'Azulejo de Cerâmica Resinado 15x15cm',
    temperatureC: 195,
    temperatureF: 383,
    timeSeconds: 240,
    pressure: 'Média',
    paperType: 'Papel Sublimático Premium',
    inkType: 'Tinta Sublimática HD',
    notes: 'Prensar virado para baixo sob manta de silicone ou espuma de borracha.'
  },
  {
    id: 'phonecase_3d',
    productName: 'Capa de Celular 3D Vacuum',
    temperatureC: 190,
    temperatureF: 374,
    timeSeconds: 300,
    pressure: 'Alta',
    paperType: 'Filme Sublimático 3D / Papel Resinado',
    inkType: 'Tinta Sublimática HD',
    notes: 'Usar prensa 3D a vácuo com gabarito de alumínio interno.'
  },
  {
    id: 'glass_tumbler',
    productName: 'Copo / Caneca de Vidro Jateado',
    temperatureC: 190,
    temperatureF: 374,
    timeSeconds: 190,
    pressure: 'Média',
    paperType: 'Papel Sublimático Resinado',
    inkType: 'Tinta Sublimática HD',
    notes: 'Cuidado com choque térmico. Deixar esfriar gradualmente ao ar livre.'
  }
];

export function calculateInkAndCost(widthMm: number, heightMm: number, coveragePercent = 65) {
  const areaM2 = (widthMm / 1000) * (heightMm / 1000); // area in m^2
  const mlPerM2FullCoverage = 12; // 12ml per m^2 for 100% ink coverage
  const inkMl = areaM2 * mlPerM2FullCoverage * (coveragePercent / 100);
  const costPerMlBrl = 1.25; // R$ 1.25 per ml of sublimation ink
  const paperCostBrl = areaM2 * 2.50; // R$ 2.50 per m^2 of sublimation paper
  const powerCostBrl = 0.45; // R$ 0.45 press electrical cost per cycle

  const totalCostBrl = inkMl * costPerMlBrl + paperCostBrl + powerCostBrl;

  return {
    areaM2: Number(areaM2.toFixed(3)),
    inkMl: Number(inkMl.toFixed(2)),
    costBrl: Number(totalCostBrl.toFixed(2)),
    cmykBreakdown: {
      cyanMl: Number((inkMl * 0.28).toFixed(2)),
      magentaMl: Number((inkMl * 0.32).toFixed(2)),
      yellowMl: Number((inkMl * 0.22).toFixed(2)),
      blackMl: Number((inkMl * 0.18).toFixed(2))
    }
  };
}
