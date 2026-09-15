import { useLayoutEffect, useState, type RefObject } from 'react';

const MIN_SIZE_REM = 12;
const MAX_SIZE_REM_DESKTOP = 16;
const MAX_SIZE_REM_MOBILE = 12;
const GAP_REM = 0.6; // matches .tour-controls-stack / .tour-buttons-group gap
const BOTTOM_MARGIN_REM = 0.5; // breathing room at the bottom of the viewport

interface FloorPlanLayout {
  /** Below the buttons (normal case) or beside them, to the left (cramped vertical space). */
  placement: 'below' | 'beside';
  /** The floor plan's side length in pixels - it's always square. */
  sizePx: number;
}

function remToPx(rem: number): number {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return rem * rootFontSize;
}

/**
 * Decides where the floor plan panel should sit and how big it can be,
 * by measuring the actual rendered height of the control buttons above
 * it (via ResizeObserver) rather than guessing from CSS. If there isn't
 * enough vertical space left below the buttons to show the plan at at
 * least MIN_SIZE_REM, it moves beside them instead of shrinking further.
 */
export function useFloorPlanLayout(buttonsRef: RefObject<HTMLDivElement | null>, isMobile: boolean): FloorPlanLayout {
  const [layout, setLayout] = useState<FloorPlanLayout>({
    placement: 'below',
    sizePx: remToPx(isMobile ? MAX_SIZE_REM_MOBILE : MAX_SIZE_REM_DESKTOP),
  });

  useLayoutEffect(() => {
    const buttons = buttonsRef.current;
    if (!buttons) return;

    const recalculate = () => {
      const buttonsRect = buttons.getBoundingClientRect();
      const minPx = remToPx(MIN_SIZE_REM);
      const maxPx = remToPx(isMobile ? MAX_SIZE_REM_MOBILE : MAX_SIZE_REM_DESKTOP);
      const gapPx = remToPx(GAP_REM);
      const bottomMarginPx = remToPx(BOTTOM_MARGIN_REM);
      // Keep a horizontal ceiling too, same fractions the panel used to
      // rely on, so it never gets wider than makes sense either.
      const widthCapPx = window.innerWidth * (isMobile ? 0.6 : 0.8);

      const availablePx = window.innerHeight - buttonsRect.bottom - gapPx - bottomMarginPx;

      if (availablePx >= minPx) {
        setLayout({ placement: 'below', sizePx: Math.min(availablePx, maxPx, widthCapPx) });
      } else {
        setLayout({ placement: 'beside', sizePx: minPx });
      }
    };

    recalculate();

    const resizeObserver = new ResizeObserver(recalculate);
    resizeObserver.observe(buttons);
    window.addEventListener('resize', recalculate);
    window.addEventListener('orientationchange', recalculate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', recalculate);
      window.removeEventListener('orientationchange', recalculate);
    };
  }, [buttonsRef, isMobile]);

  return layout;
}