import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

export function Reflection() {
  const { state, actions } = useAppState();
  const stop = state.stops[state.currentStopIndex];
  const c = COPY.reflection;
  const prompt = stop?.reflectionPrompt ?? c.defaultPrompt;

  return (
    <div className="screen">
      <p className="screen__body">{prompt}</p>
      <textarea
        className="input"
        placeholder={c.placeholder}
        value={state.reflectionText}
        onChange={(e) => actions.setReflectionText(e.target.value)}
        rows={4}
      />
      <button type="button" className="btn btn--primary" onClick={actions.skipReflection}>
        {c.continueButton}
      </button>
      <button type="button" className="btn btn--ghost" onClick={actions.skipReflection}>
        {c.skipButton}
      </button>
    </div>
  );
}
