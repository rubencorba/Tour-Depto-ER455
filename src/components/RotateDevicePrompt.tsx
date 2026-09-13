import type { JSX } from 'react';

interface RotateDevicePromptProps {
  /** Whether the prompt should currently be shown. */
  visible: boolean;
}

/**
 * Full-screen overlay asking the user to rotate their phone to landscape.
 * Purely presentational: visibility is driven entirely by the `visible`
 * prop, which the caller derives from the current orientation, so this
 * component re-appears automatically every time the device goes back to
 * portrait.
 */
export default function RotateDevicePrompt({ visible }: RotateDevicePromptProps): JSX.Element | null {
  if (!visible) {
    return null;
  }

  return (
    <div
      role="alertdialog"
      aria-live="assertive"
      className="safe-area-inset fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-slate-950/95 px-8 text-center text-white"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-16 w-16 animate-[spin_2.2s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="11" y1="18" x2="13" y2="18" strokeLinecap="round" />
      </svg>
      <p className="text-lg font-semibold">Girá tu teléfono para continuar</p>
      <p className="max-w-xs text-sm text-slate-300">
        Activá la rotación automática de tu dispositivo para ver el recorrido en horizontal.
      </p>
    </div>
  );
}
