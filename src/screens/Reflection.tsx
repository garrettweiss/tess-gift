import { useAppState } from '../state/context';

export function Reflection() {
  const { state, actions } = useAppState();
  const stop = state.stops[state.currentStopIndex];
  const prompt = stop?.reflectionPrompt ?? 'What do you think most people walk past here without noticing?';

  return (
    <div className="screen">
      <p className="screen__body">{prompt}</p>
      <textarea
        className="input"
        placeholder="A thought, a detail, a feeling — or nothing at all."
        value={state.reflectionText}
        onChange={(e) => actions.setReflectionText(e.target.value)}
        rows={4}
      />
      <button type="button" className="btn btn--primary" onClick={actions.skipReflection}>
        Continue
      </button>
      <button type="button" className="btn btn--ghost" onClick={actions.skipReflection}>
        Skip
      </button>
    </div>
  );
}
