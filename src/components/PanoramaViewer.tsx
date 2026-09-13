import type { JSX, RefObject } from 'react';

interface PanoramaViewerProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

/**
 * Renders the full-bleed container Pannellum mounts into. Viewer
 * lifecycle and tour config live in the parent (Tour.tsx) via
 * usePannellumViewer, since the current room needs to be shared with
 * sibling UI (e.g. the floor plan).
 */
export default function PanoramaViewer({ containerRef }: PanoramaViewerProps): JSX.Element {
  return <div ref={containerRef} className="h-full w-full" data-testid="panorama-viewer" />;
}