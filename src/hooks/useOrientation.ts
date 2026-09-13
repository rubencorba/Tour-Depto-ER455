import { useEffect, useState } from 'react';
import { PORTRAIT_PHONE_QUERY } from '../utils/device';

/**
 * Tracks whether the viewport currently matches a phone in portrait mode.
 * Re-evaluates on every orientation/viewport change, so the value (and
 * therefore any UI reacting to it, like a "rotate your device" prompt)
 * stays in sync each time the user returns to portrait.
 */
export function useOrientation(): boolean {
  const [isPortraitPhone, setIsPortraitPhone] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia(PORTRAIT_PHONE_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(PORTRAIT_PHONE_QUERY);

    const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsPortraitPhone(event.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isPortraitPhone;
}
