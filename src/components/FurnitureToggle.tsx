import type { JSX } from 'react';

interface FurnitureToggleProps {
  isFurnished: boolean;
  onToggle: () => void;
}

export default function FurnitureToggle({ isFurnished, onToggle }: FurnitureToggleProps): JSX.Element {
  return (
    <button type="button" onClick={onToggle} aria-pressed={isFurnished} className="tour-pill-button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
        <path d="M3 12h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
        <line x1="5" y1="18" x2="5" y2="21" />
        <line x1="19" y1="18" x2="19" y2="21" />
      </svg>
      <span>{isFurnished ? 'Original' : 'Amueblar'}</span>
    </button>
  );
}