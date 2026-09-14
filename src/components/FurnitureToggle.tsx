import type { JSX } from 'react';

interface FurnitureToggleProps {
  isFurnished: boolean;
  onToggle: () => void;
}

/** Toggles between the empty and furnished variant of the current room. */
export default function FurnitureToggle({ isFurnished, onToggle }: FurnitureToggleProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFurnished}
      className="cursor-pointer rounded-full bg-slate-950/80 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur"
    >
      {isFurnished ? 'Original' : 'Amueblar'}
    </button>
  );
}