import { getTouchDistance, getTouchMidpoint, calculatePinchZoomFactor, normalizeRotationDelta } from '../touchUtils';

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const results: { name: string; ok: boolean; error?: string }[] = [];

try {
  assert(getTouchDistance({ x: 0, y: 0 }, { x: 3, y: 4 }) === 5, 'Distance should be 5 for 3-4-5 triangle');
  results.push({ name: 'getTouchDistance', ok: true });
} catch (err: any) {
  results.push({ name: 'getTouchDistance', ok: false, error: err.message });
}

try {
  const midpoint = getTouchMidpoint({ x: 2, y: 2 }, { x: 4, y: 6 });
  assert(midpoint.x === 3 && midpoint.y === 4, 'Midpoint should be (3,4)');
  results.push({ name: 'getTouchMidpoint', ok: true });
} catch (err: any) {
  results.push({ name: 'getTouchMidpoint', ok: false, error: err.message });
}

try {
  assert(calculatePinchZoomFactor(100, 150) === 1.5, 'Pinch zoom factor should scale by ratio');
  assert(calculatePinchZoomFactor(100, 0) === 1, 'Zero current distance should return 1');
  results.push({ name: 'calculatePinchZoomFactor', ok: true });
} catch (err: any) {
  results.push({ name: 'calculatePinchZoomFactor', ok: false, error: err.message });
}

try {
  assert(normalizeRotationDelta(10, 350) === -20, 'Rotation delta should wrap through 360 correctly');
  assert(normalizeRotationDelta(350, 10) === 20, 'Rotation delta should wrap in the opposite direction');
  results.push({ name: 'normalizeRotationDelta', ok: true });
} catch (err: any) {
  results.push({ name: 'normalizeRotationDelta', ok: false, error: err.message });
}

console.log('Touch utility test results:');
console.table(results);
if (results.some((r) => !r.ok)) {
  process.exit(1);
}
