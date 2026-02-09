import { useAppState } from '../state/context';
import { COPY } from '../data/copy';

function splitParagraphs(text: string): string[] {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

export function Reveal() {
  const { state, actions } = useAppState();
  const idx = state.currentStopIndex;
  const stop = state.stops[idx];
  const c = COPY.reveal;
  if (!stop) return null;

  const paragraphs = splitParagraphs(stop.storyText);
  const photo = stop.photo;

  return (
    <div className="screen">
      <h2 className="screen__title">{stop.hiddenName}</h2>
      <p className="screen__body" style={{ marginBottom: 8 }}>{c.detailSubtext}</p>
      <div className="story-text">
        {paragraphs.map((para, i) => (
          <span key={i}>
            <p>{para}</p>
            {i === 0 && photo && (
              <>
                <img src={photo} alt="" className="reveal-photo" />
                <p className="reveal-caption">{c.youWereHere}</p>
              </>
            )}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="btn btn--primary mt-2"
        onClick={() => {
          // #region agent log
          fetch('http://127.0.0.1:7244/ingest/ba18e457-6701-445c-8871-c4576ed0b5fa',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Reveal.tsx:Continue click',message:'Continue clicked',data:{currentStopIndex:state.currentStopIndex,phase:state.phase},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
          // #endregion
          actions.setPhase('reflection');
        }}
      >
        {c.continueButton}
      </button>
    </div>
  );
}
