import { useState, type JSX } from 'react';
import Landing from './pages/Landing';
import Tour from './pages/Tour';

type View = 'landing' | 'tour';

/**
 * Root component. Owns only the top-level "which page is active" state -
 * everything else (room navigation, orientation handling) lives inside
 * the Tour page and is driven by the centralized room configuration.
 */
export default function App(): JSX.Element {
  const [view, setView] = useState<View>('landing');

  if (view === 'tour') {
    return <Tour />;
  }

  return <Landing onEnterTour={() => setView('tour')} />;
}
