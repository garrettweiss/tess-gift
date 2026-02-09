import { useAppState } from '../state/context';
import { canGoBack } from '../state/stepNavigation';
import type { Phase } from '../types';

const STATION_STEP_LABELS: Record<Phase, string> = {
  opening: '—',
  arrival: 'Arrived',
  camera: 'Photo',
  'confirm-photo': 'Photo',
  reveal: 'Reveal',
  reflection: 'Reflect',
  'between-stops': 'Next station…',
  navigation: 'Next station…',
  'en-route': 'En route',
  final: 'Final stop',
  poster: 'Complete',
};

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
  const currentStepLabel = STATION_STEP_LABELS[phase];
  const showStepDetail =
    phase !== 'opening' &&
    phase !== 'poster' &&
    !['between-stops', 'navigation', 'en-route'].includes(phase);

  if (phase === 'opening') return null;

  return (
    <div className="progression-tracker">
      {showBack && (
        <p className="progression-tracker__back">
          <button
            type="button"
            className="progression-tracker__back-btn"
            onClick={actions.goBackToPreviousStep}
          >
            ← Back
          </button>
        </p>
      )}
      <div className="progression-tracker__stations">
        <span className="progression-tracker__count">
          Station {Math.min(displayIndex + 1, total)} of {total}
        </span>
        <span className="progression-tracker__remaining">
          {remaining === 0 ? 'All done' : `${remaining} to go`}
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
          At: <em>{currentStepLabel}</em>
        </p>
      )}
      {phase === 'poster' && (
        <p className="progression-tracker__step progression-tracker__step--done">
          All stations complete
        </p>
      )}
      {completed > 0 && onOpenVisitedPlaces && (
        <p className="progression-tracker__step">
          <button
            type="button"
            className="progression-tracker__visited-link"
            onClick={onOpenVisitedPlaces}
          >
            Places you&apos;ve been
          </button>
        </p>
      )}
    </div>
  );
}
