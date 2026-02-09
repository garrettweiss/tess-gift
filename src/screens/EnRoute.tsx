import { useAppState } from '../state/context';
import { BETWEEN_STOPS_PROMPTS } from '../data/stops';
import { COPY } from '../data/copy';

export function EnRoute() {
  const { state, actions } = useAppState();
  const promptIndex = Math.max(0, state.currentStopIndex) % BETWEEN_STOPS_PROMPTS.length;
  const prompt = BETWEEN_STOPS_PROMPTS[promptIndex];
  const c = COPY.enRoute;

  return (
    <div className="screen screen--centered">
      <h2 className="screen__header">{c.header}</h2>
      <p className="screen__body" style={{ whiteSpace: 'pre-line' }}>
        {c.body1}
        {'\n'}
        {c.body2}
      </p>
      <p className="screen__body" style={{ fontStyle: 'italic', marginTop: 24 }}>{prompt}</p>
      <button type="button" className="btn btn--primary mt-3" onClick={actions.arriveAtNextStop}>
        {c.arrivedButton}
      </button>
    </div>
  );
}
