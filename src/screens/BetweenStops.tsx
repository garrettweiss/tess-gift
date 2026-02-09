import { useAppState } from '../state/context';
import { BETWEEN_STOPS_PROMPTS } from '../data/stops';

export function BetweenStops() {
  const { state, actions } = useAppState();
  const promptIndex = state.currentStopIndex % BETWEEN_STOPS_PROMPTS.length;
  const prompt = BETWEEN_STOPS_PROMPTS[promptIndex];

  return (
    <div className="screen screen--centered">
      <h2 className="screen__header">Between Stops</h2>
      <p className="screen__body">{prompt}</p>
      <button type="button" className="btn btn--primary" onClick={actions.goToNavigation}>
        When you're ready
      </button>
    </div>
  );
}
