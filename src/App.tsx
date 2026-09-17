import { useState, type JSX } from 'react';
import Landing from './pages/Landing';
import Tour from './pages/Tour';

type View = 'landing' | 'tour';

export default function App(): JSX.Element {
  const [view, setView] = useState<View>('landing');

  if (view === 'tour') {
    return <Tour onExitTour={() => setView('landing')} />;
  }

  return <Landing onEnterTour={() => setView('tour')} />;
}