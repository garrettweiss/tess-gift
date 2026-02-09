import { useState } from 'react';
import { AppStateProvider, useAppState } from './state/context';
import { ProgressionTracker } from './components/ProgressionTracker';
import { RestartButton } from './components/RestartButton';
import { VisitedPlacesOverlay } from './components/VisitedPlaces';

/** Set to false (or remove RestartButton usage below) to drop the restart button for production. */
const SHOW_RESTART_BUTTON = true;
import { Welcome } from './screens/Welcome';
import { Opening } from './screens/Opening';
import { Arrival } from './screens/Arrival';
import { Camera } from './screens/Camera';
import { ConfirmPhoto } from './screens/ConfirmPhoto';
import { Reveal } from './screens/Reveal';
import { Reflection } from './screens/Reflection';
import { BetweenStops } from './screens/BetweenStops';
import { Navigation } from './screens/Navigation';
import { EnRoute } from './screens/EnRoute';
import { Final } from './screens/Final';
import { Poster } from './screens/Poster';

function AppRouter() {
  const { state } = useAppState();
  const phase = state.phase;
  const [showVisitedPlaces, setShowVisitedPlaces] = useState(false);
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:AppRouter',message:'phase',data:{phase},timestamp:Date.now(),hypothesisId:'H4'})}).catch(()=>{});
  // #endregion
  return (
    <>
      <VisitedPlacesOverlay open={showVisitedPlaces} onClose={() => setShowVisitedPlaces(false)} />
      <div className="app-layout">
        <div className="app-content">
          <ProgressionTracker onOpenVisitedPlaces={() => setShowVisitedPlaces(true)} />
          {phase === 'welcome' && <Welcome />}
          {phase === 'opening' && <Opening />}
          {phase === 'arrival' && <Arrival />}
          {phase === 'camera' && <Camera />}
          {phase === 'confirm-photo' && <ConfirmPhoto />}
          {phase === 'reveal' && <Reveal />}
          {phase === 'reflection' && <Reflection />}
          {phase === 'between-stops' && <BetweenStops />}
          {phase === 'navigation' && <Navigation />}
          {phase === 'en-route' && <EnRoute />}
          {phase === 'final' && <Final />}
          {phase === 'poster' && <Poster />}
        </div>
        {SHOW_RESTART_BUTTON && <RestartButton />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppRouter />
    </AppStateProvider>
  );
}
