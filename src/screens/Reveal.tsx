import { useAppState } from '../state/context';

function splitParagraphs(text: string): string[] {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

export function Reveal() {
  const { state, actions } = useAppState();
  const idx = state.currentStopIndex;
  const stop = state.stops[idx];
  if (!stop) return null;

  const paragraphs = splitParagraphs(stop.storyText);
  const photo = stop.photo;

  return (
    <div className="screen">
      <h2 className="screen__title">{stop.hiddenName}</h2>
      <p className="screen__body" style={{ marginBottom: 8 }}>A detail most people never stop for.</p>
      <div className="story-text">
        {paragraphs.map((para, i) => (
          <span key={i}>
            <p>{para}</p>
            {i === 0 && photo && (
              <>
                <img src={photo} alt="" className="reveal-photo" />
                <p className="reveal-caption">You were here.</p>
              </>
            )}
          </span>
        ))}
      </div>
      <button type="button" className="btn btn--primary mt-2" onClick={() => actions.setPhase('reflection')}>
        Continue
      </button>
    </div>
  );
}
