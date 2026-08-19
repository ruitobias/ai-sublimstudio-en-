import { calculateInkAndCost, SUBLIMATION_PRESS_PRESETS } from '../pressEngine';
import { GangEngine } from '../gangEngine';
import { PRESET_TEMPLATES, TEMPLATE_CATEGORIES } from '../libraryEngine';
import { TEXT_WARP_STYLES } from '../textWarp';
import { AIEngine } from '../aiEngine';
import { ALL_VECTOR_SHAPES } from '../shapeDrawer';

export function runSuiteTests() {
  const results: { testName: string; passed: boolean; details?: string }[] = [];

  // Test 1: Sublimation Ink and Cost Calculation
  try {
    const calc = calculateInkAndCost(200, 100, 80);
    const valid = Math.abs(calc.areaM2 - 0.02) < 0.0001 && calc.inkMl > 0 && calc.costBrl > 0;
    results.push({ testName: 'calculateInkAndCost calculation', passed: valid });
  } catch (err: any) {
    results.push({ testName: 'calculateInkAndCost calculation', passed: false, details: err.message });
  }

  // Test 2: Press Presets Integrity
  try {
    const validPresets = SUBLIMATION_PRESS_PRESETS.length > 0 && SUBLIMATION_PRESS_PRESETS.every(p => p.temperatureC > 0 && p.timeSeconds > 0);
    results.push({ testName: 'SUBLIMATION_PRESS_PRESETS integrity', passed: validPresets });
  } catch (err: any) {
    results.push({ testName: 'SUBLIMATION_PRESS_PRESETS integrity', passed: false, details: err.message });
  }

  // Test 3: Gang Sheet Packing Engine
  try {
    const items = [
      { id: '1', name: 'Logo 1', widthMm: 100, heightMm: 100, quantity: 2 },
      { id: '2', name: 'Logo 2', widthMm: 150, heightMm: 50, quantity: 1 }
    ];
    const packed = GangEngine.packItemsOnSheet(items, 300, 420);
    const validPacking = packed.placedBoxes.length === 3 && packed.totalOccupancyPercent > 0;
    results.push({ testName: 'GangEngine packing', passed: validPacking });
  } catch (err: any) {
    results.push({ testName: 'GangEngine packing', passed: false, details: err.message });
  }

  // Test 4: Library Templates & Categories
  try {
    const validLib = TEMPLATE_CATEGORIES.length > 0 && PRESET_TEMPLATES.length > 0;
    results.push({ testName: 'Library templates & categories', passed: validLib });
  } catch (err: any) {
    results.push({ testName: 'Library templates & categories', passed: false, details: err.message });
  }

  // Test 5: Text Warp Styles List
  try {
    const validWarp = TEXT_WARP_STYLES.length > 0 && TEXT_WARP_STYLES.some(s => s.id === 'arc_upper');
    results.push({ testName: 'Text Warp Styles definition', passed: validWarp });
  } catch (err: any) {
    results.push({ testName: 'Text Warp Styles definition', passed: false, details: err.message });
  }

  // Test 6: AI Engine Art URL Generation
  try {
    const url = AIEngine.generateSublimationArtUrl('Caneca Floral Vintage');
    const validAI = url.includes('pollinations.ai') && url.includes('flux');
    results.push({ testName: 'AIEngine URL generation', passed: validAI });
  } catch (err: any) {
    results.push({ testName: 'AIEngine URL generation', passed: false, details: err.message });
  }

  // Test 7: Vector Shape Definitions
  try {
    const validShapes = ALL_VECTOR_SHAPES.length > 50 && ALL_VECTOR_SHAPES.some(s => s.id === 'circle');
    results.push({ testName: 'ALL_VECTOR_SHAPES library', passed: validShapes });
  } catch (err: any) {
    results.push({ testName: 'ALL_VECTOR_SHAPES library', passed: false, details: err.message });
  }

  return results;
}

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
  console.log('Running SublimStudio PRO Test Suite...');
  const res = runSuiteTests();
  console.table(res);
}

