import type { JSX } from 'react';

interface BackToLandingButtonProps {
  onBack: () => void;
}

/** Exits the tour and returns to the landing page. */
export default function BackToLandingButton({ onBack }: BackToLandingButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label="Volver al inicio"
      className="tour-icon-button back-to-landing-button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </button>
  );
}