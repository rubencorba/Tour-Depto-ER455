import { useEffect, useState, type JSX, type RefObject } from 'react';

interface FullscreenToggleProps {
    targetRef: RefObject<HTMLElement | null>;
}

/**
 * Fullscreens Tour's own wrapper element (not Pannellum's internal
 * container) so everything inside it - panorama, floor plan, our other
 * buttons - stays visible while in fullscreen. Pannellum's own
 * fullscreen button can only fullscreen its own container, which is why
 * we don't use it.
 */
export default function FullscreenToggle({ targetRef }: FullscreenToggleProps): JSX.Element {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(document.fullscreenElement === targetRef.current);
        };

        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, [targetRef]);

    const handleToggle = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => { });
        } else {
            targetRef.current?.requestFullscreen().catch(() => { });
        }
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            aria-pressed={isFullscreen}
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            className="tour-icon-button fullscreen-toggle-button"
        >
            {isFullscreen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
            )}
        </button>
    );
}