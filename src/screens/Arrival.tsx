import { useAppState } from '../state/context';

export function Arrival() {
  const { state, actions } = useAppState();
  const stop = state.stops[state.currentStopIndex];
  const photoInstruction = stop?.photoInstruction;

  return (
    <div className="screen screen--centered">
      <h2 className="screen__header">You've arrived.</h2>
      <p className="screen__body">Before you go on, be here.</p>
      {photoInstruction && (
        <p className="screen__body screen__body--highlight">{photoInstruction}</p>
      )}
      {stop?.directions && (
        <p className="screen__body screen__body--directions">{stop.directions}</p>
      )}
      <button type="button" className="btn btn--primary" onClick={actions.openCamera}>
        Take the photo
      </button>
      {/* TODO: remove Test photo before production — see src/testPhoto.ts */}
      <button type="button" className="btn btn--ghost" onClick={actions.useTestPhoto}>
        Test photo
      </button>
      <p className="screen__subtext">This isn't for anyone else.</p>
      {stop && (
        <p className="screen__subtext mt-1">
          Coordinates (for manual check): {stop.lat}, {stop.lng}
        </p>
      )}
    </div>
  );
}
