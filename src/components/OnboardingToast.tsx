import { useEffect, useState, type JSX } from 'react';
import { isMobileUserAgent } from '../utils/device';

/**
 * First-run hint shown when the tour starts, explaining how to look
 * around. Dismisses on the very first pointer interaction anywhere on
 * screen - including the same gesture that starts panning the
 * panorama, since the toast never intercepts pointer events
 * (`pointer-events: none`) and just listens globally.
 */
export default function OnboardingToast(): JSX.Element | null {
    const [visible, setVisible] = useState(true);
    const isMobile = isMobileUserAgent();

    useEffect(() => {
        const dismiss = () => setVisible(false);
        window.addEventListener('pointerdown', dismiss, { once: true, capture: true });
        return () => window.removeEventListener('pointerdown', dismiss, { capture: true });
    }, []);

    if (!visible) return null;

    return (
        <div className="onboarding-toast" aria-live="polite">
            <span className="onboarding-arrow onboarding-arrow--left" aria-hidden="true">
                ‹‹
            </span>
            <p>{isMobile ? 'Desliza para explorar' : 'Haz clic y arrastra para explorar'}</p>
            <span className="onboarding-arrow onboarding-arrow--right" aria-hidden="true">
                ››
            </span>
        </div>
    );
}