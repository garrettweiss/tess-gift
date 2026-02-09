import { useAppState } from '../state/context';
import { canGoBack } from '../state/stepNavigation';
import type { Phase } from '../types';
import { COPY } from '../data/copy';

interface ProgressionTrackerProps {
  onOpenVisitedPlaces?: () => void;
}

export function ProgressionTracker({ onOpenVisitedPlaces }: ProgressionTrackerProps = {}) {
  const { state, actions } = useAppState();
  const { stops, currentStopIndex, phase } = state;
  const showBack = canGoBack(state);
  const displayIndex = currentStopIndex === -1 ? 0 : currentStopIndex;
  const total = stops.length;
  const completed = stops.filter((s) => s.completed).length;
  const remaining = total - completed;
  const currentStepLabel = COPY.progressionTracker.stepLabels[phase];
  const pt = COPY.progressionTracker;
  const showStepDetail =
    phase !== 'opening' &&
    phase !== 'poster' &&
    !['between-stops', 'navigation', 'en-route'].includes(phase);

  if (phase === 'welcome' || phase === 'opening') return null;

  return (
    <div className="progression-tracker">
      {showBack && (
        <p className="progression-tracker__back">
          <button
            type="button"
            className="progression-tracker__back-btn"
            onClick={actions.goBackToPreviousStep}
          >
            {pt.back}
          </button>
        </p>
      )}
      <div className="progression-tracker__stations">
        <span className="progression-tracker__count">
          {pt.stationOf} {Math.min(displayIndex + 1, total)} {pt.of} {total}
        </span>
        <span className="progression-tracker__remaining">
          {remaining === 0 ? pt.allDone : `${remaining} ${pt.toGo}`}
        </span>
      </div>
      <div className="progression-tracker__line" aria-hidden>
        {stops.map((stop, i) => (
          <span
            key={stop.id}
            className={`progression-tracker__dot ${
              i < displayIndex ? 'is-completed' : i === displayIndex ? 'is-current' : ''
            }`}
          />
        ))}
      </div>
      {showStepDetail && (
        <p className="progression-tracker__step">
          {pt.atLabel} <em>{currentStepLabel}</em>
        </p>
      )}
      {phase === 'poster' && (
        <p className="progression-tracker__step progression-tracker__step--done">
          {pt.allStationsComplete}
        </p>
      )}
      {completed > 0 && onOpenVisitedPlaces && (
        <p className="progression-tracker__step">
          <button
            type="button"
            className="progression-tracker__visited-link"
            onClick={onOpenVisitedPlaces}
          >
            {pt.placesYouveBeen}
          </button>
        </p>
      )}
    </div>
  );
}
