import type { JSX } from 'react';

interface FloorPlanToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function FloorPlanToggle({ isOpen, onToggle }: FloorPlanToggleProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isOpen}
      aria-label={isOpen ? 'Ocultar plano' : 'Mostrar plano'}
      className="tour-pill-button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="1.5" />
        <line x1="12" y1="3" x2="12" y2="13" />
        <line x1="3" y1="13" x2="21" y2="13" />
        <line x1="12" y1="13" x2="12" y2="21" />
      </svg>
      <span>Plano</span>
    </button>
  );
}