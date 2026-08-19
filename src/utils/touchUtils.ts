export interface TouchPoint {
  x: number;
  y: number;
}

export function getTouchDistance(a: TouchPoint, b: TouchPoint): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function getTouchMidpoint(a: TouchPoint, b: TouchPoint): TouchPoint {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

export function calculatePinchZoomFactor(initialDistance: number, currentDistance: number): number {
  if (initialDistance <= 0 || currentDistance <= 0) {
    return 1;
  }
  return currentDistance / initialDistance;
}

export function normalizeRotationDelta(initialAngle: number, currentAngle: number): number {
  let delta = currentAngle - initialAngle;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}
