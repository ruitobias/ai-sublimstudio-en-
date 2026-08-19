import { GangItem, GangPlacedBox } from '../types';

export interface GangSheetResult {
  sheetWidthMm: number;
  sheetHeightMm: number;
  placedBoxes: GangPlacedBox[];
  totalOccupancyPercent: number;
  totalWastePercent: number;
  unplacedCount: number;
}

export class GangEngine {
  /**
   * Calculates optimal 2D nesting of sublimation design items on a print sheet (MaxRects algorithm)
   */
  static packItemsOnSheet(
    items: GangItem[],
    sheetWidthMm = 297, // A3 width or A4
    sheetHeightMm = 420, // A3 height
    spacingMm = 3
  ): GangSheetResult {
    const placedBoxes: GangPlacedBox[] = [];
    let freeRects = [{ x: spacingMm, y: spacingMm, w: sheetWidthMm - spacingMm * 2, h: sheetHeightMm - spacingMm * 2 }];

    // Flatten item list based on quantities
    const expandedItems: { id: string; name: string; w: number; h: number }[] = [];
    items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        expandedItems.push({
          id: `${item.id}-${i}`,
          name: item.name,
          w: item.widthMm + spacingMm,
          h: item.heightMm + spacingMm
        });
      }
    });

    // Sort items by area descending (Best Short Side Fit)
    expandedItems.sort((a, b) => b.w * b.h - a.w * a.h);

    let unplacedCount = 0;

    for (const item of expandedItems) {
      let bestRectIdx = -1;
      let bestRotated = false;
      let bestShortSideFit = Infinity;

      for (let r = 0; r < freeRects.length; r++) {
        const rect = freeRects[r];

        // Try normal rotation
        if (rect.w >= item.w && rect.h >= item.h) {
          const leftoverX = rect.w - item.w;
          const leftoverY = rect.h - item.h;
          const shortSideFit = Math.min(leftoverX, leftoverY);
          if (shortSideFit < bestShortSideFit) {
            bestShortSideFit = shortSideFit;
            bestRectIdx = r;
            bestRotated = false;
          }
        }

        // Try 90 degree rotation
        if (rect.w >= item.h && rect.h >= item.w) {
          const leftoverX = rect.w - item.h;
          const leftoverY = rect.h - item.w;
          const shortSideFit = Math.min(leftoverX, leftoverY);
          if (shortSideFit < bestShortSideFit) {
            bestShortSideFit = shortSideFit;
            bestRectIdx = r;
            bestRotated = true;
          }
        }
      }

      if (bestRectIdx !== -1) {
        const targetRect = freeRects[bestRectIdx];
        const w = bestRotated ? item.h : item.w;
        const h = bestRotated ? item.w : item.h;

        placedBoxes.push({
          id: item.id,
          name: item.name,
          x: targetRect.x,
          y: targetRect.y,
          w: w - spacingMm,
          h: h - spacingMm,
          rotated: bestRotated
        });

        // Split target rectangle into remaining free rects
        const rightRect = {
          x: targetRect.x + w,
          y: targetRect.y,
          w: targetRect.w - w,
          h: h
        };

        const bottomRect = {
          x: targetRect.x,
          y: targetRect.y + h,
          w: targetRect.w,
          h: targetRect.h - h
        };

        freeRects.splice(bestRectIdx, 1);
        if (rightRect.w > 10 && rightRect.h > 10) freeRects.push(rightRect);
        if (bottomRect.w > 10 && bottomRect.h > 10) freeRects.push(bottomRect);
      } else {
        unplacedCount++;
      }
    }

    const totalSheetArea = sheetWidthMm * sheetHeightMm;
    const placedArea = placedBoxes.reduce((acc, b) => acc + b.w * b.h, 0);
    const totalOccupancyPercent = Math.min(100, Math.round((placedArea / totalSheetArea) * 100));
    const totalWastePercent = 100 - totalOccupancyPercent;

    return {
      sheetWidthMm,
      sheetHeightMm,
      placedBoxes,
      totalOccupancyPercent,
      totalWastePercent,
      unplacedCount
    };
  }
}
