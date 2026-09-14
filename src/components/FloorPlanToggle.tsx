import type { JSX } from 'react';

interface FloorPlanToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Mobile-only "Plano" button that shows/hides the floor plan. On desktop
 * (md: and up) the floor plan is always visible, so this button is
 * hidden there.
 */
export default function FloorPlanToggle({ isOpen, onToggle }: FloorPlanToggleProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isOpen}
      aria-label={isOpen ? 'Ocultar plano' : 'Mostrar plano'}
      className="cursor-pointer rounded-full bg-slate-950/80 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur"
    >
      Plano
    </button>
  );
}