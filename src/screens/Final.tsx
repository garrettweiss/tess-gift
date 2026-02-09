import { useAppState } from '../state/context';

export function Final() {
  const { actions } = useAppState();
  return (
    <div className="screen screen--centered">
      <h2 className="screen__header">That was the last stop.</h2>
      <p className="screen__body">
        You didn't see everything.<br />
        You just learned where to look.
      </p>
      <button type="button" className="btn btn--primary" onClick={actions.completeFinal}>
        Complete the Field Guide
      </button>
    </div>
  );
}
