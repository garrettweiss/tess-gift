import { useAppState } from '../state/context';
import { BETWEEN_STOPS_PROMPTS } from '../data/stops';
import { COPY } from '../data/copy';

export function BetweenStops() {
  const { state, actions } = useAppState();
  const promptIndex = state.currentStopIndex % BETWEEN_STOPS_PROMPTS.length;
  const prompt = BETWEEN_STOPS_PROMPTS[promptIndex];
  const c = COPY.betweenStops;

  return (
    <div className="screen screen--centered">
      <h2 className="screen__header">{c.header}</h2>
      <p className="screen__body">{prompt}</p>
      <button type="button" className="btn btn--primary" onClick={actions.goToNavigation}>
        {c.button}
      </button>
    </div>
  );
}
