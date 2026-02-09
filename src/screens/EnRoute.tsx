import { useAppState } from '../state/context';
import { BETWEEN_STOPS_PROMPTS } from '../data/stops';

export function EnRoute() {
  const { state, actions } = useAppState();
  const promptIndex = state.currentStopIndex % BETWEEN_STOPS_PROMPTS.length;
  const prompt = BETWEEN_STOPS_PROMPTS[promptIndex];

  return (
    <div className="screen screen--centered">
      <h2 className="screen__header">On the way</h2>
      <p className="screen__body">
        You don't need to do anything right now.<br />
        The city will let you know when you're close.
      </p>
      <p className="screen__body" style={{ fontStyle: 'italic', marginTop: 24 }}>{prompt}</p>
      <button type="button" className="btn btn--primary mt-3" onClick={actions.arriveAtNextStop}>
        I've arrived
      </button>
    </div>
  );
}
