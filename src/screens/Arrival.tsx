import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

export function Arrival() {
  const { state, actions } = useAppState();
  const stop = state.stops[state.currentStopIndex];
  const photoInstruction = stop?.photoInstruction;
  const c = COPY.arrival;

  return (
    <div className="screen screen--centered">
      <h2 className="screen__header">{c.header}</h2>
      <p className="screen__body">{c.body}</p>
      {photoInstruction && (
        <p className="screen__body screen__body--highlight">{photoInstruction}</p>
      )}
      {stop?.directions && (
        <p className="screen__body screen__body--directions">{stop.directions}</p>
      )}
      <button type="button" className="btn btn--primary" onClick={actions.openCamera}>
        {c.button}
      </button>
      {/* TODO: remove Test photo before production — see src/testPhoto.ts */}
      <button type="button" className="btn btn--ghost" onClick={actions.useTestPhoto}>
        {c.testPhotoButton}
      </button>
      <p className="screen__subtext">{c.subtext}</p>
      {stop && (
        <p className="screen__subtext mt-1">
          {c.coordinatesLabel} {stop.lat}, {stop.lng}
        </p>
      )}
    </div>
  );
}
