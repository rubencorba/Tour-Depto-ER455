import { useEffect, useRef, useState, type JSX, type RefObject } from 'react';

const VISIBLE_DURATION_MS = 3000;

interface GyroscopeToastProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

/**
 * Brief hint shown when the user turns on Pannellum's own gyroscope
 * ("Giroscopio") control. Since that toggle lives inside Pannellum, not
 * our own React state, we detect the transition by watching for the
 * `pnlm-orientation-button-active` class Pannellum itself adds to its
 * button when device orientation tracking starts.
 */
export default function GyroscopeToast({ containerRef }: GyroscopeToastProps): JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const wasActiveRef = useRef(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const target = mutation.target as HTMLElement;
        if (!target.classList?.contains('pnlm-orientation-button')) continue;

        const isActive = target.classList.contains('pnlm-orientation-button-active');
        if (isActive && !wasActiveRef.current) {
          setVisible(true);
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = setTimeout(() => setVisible(false), VISIBLE_DURATION_MS);
        }
        wasActiveRef.current = isActive;
      }
    });

    observer.observe(container, { subtree: true, attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      clearTimeout(hideTimeoutRef.current);
    };
  }, [containerRef]);

  if (!visible) return null;

  return (
    <div className="gyroscope-toast" aria-live="polite">
      <svg viewBox="0 0 40 64" className="gyroscope-toast-icon" aria-hidden="true">
        <g className="gyroscope-phone">
          <rect x="10" y="4" width="20" height="36" rx="4" fill="white" stroke="rgba(15,23,42,0.9)" strokeWidth="1.5" />
          <line x1="17" y1="34" x2="23" y2="34" stroke="rgba(15,23,42,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
      <p>Mueve el dispositivo para mirar alrededor</p>
    </div>
  );
}